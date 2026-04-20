#!/usr/bin/env node

// Post-build: rename transform-family Tailwind utility classes in dist to
// ds-prefixed versions so they don't collide with consumer Tailwind (v3 or v4).
//
// Why: Tailwind v4 emits transform utilities as individual CSS properties
// (`rotate:`, `translate:`, `scale:`), while v3 composes them via `transform:`.
// When DS (v4-built) and a consumer Tailwind (v3 or v4) both emit the same
// class name with different properties, they set DIFFERENT CSS props on the
// same element — browser composes them, rotation doubles, translate doubles.
//
// This script renames selectors in dist/index.css AND className references
// in dist/**/*.mjs so DS ships `.ds-rotate-180` (etc.) while consumer's
// `.rotate-180` is untouched. No consumer action required.
//
// Scope: ONLY transform-family utilities. Other utility collisions
// (rounded-lg, bg-*, flex, etc.) set the SAME CSS property, so cascade
// resolves them normally — no compound effect.

import fs from 'node:fs';
import path from 'node:path';

const DIST = path.resolve(process.cwd(), 'dist');
const CSS_PATH = path.join(DIST, 'index.css');
const PREFIX = 'ds-';

// Transform-family atomic names (Tailwind v4), split into two sets:
//   - BARE_ATOMS: classes that exist without a numeric/value suffix (e.g. `transform`, `scale-3d`)
//   - SUFFIXED_ATOMS: classes that always require a value suffix (e.g. `rotate-180`, `translate-x-1/2`)
// This split prevents false positives on bare English words like "rotate" that appear in error
// messages, comments-inside-strings, etc. — those would only match if we allowed `rotate` alone.
const BARE_ATOMS = [
  'transform-none', 'transform-cpu', 'transform-gpu', 'transform-3d', 'transform-flat',
  'scale-3d',
  'transform',
];
const SUFFIXED_ATOMS = [
  'rotate-x', 'rotate-y', 'rotate-z', 'rotate',
  'translate-x', 'translate-y', 'translate-z',
  'scale-x', 'scale-y', 'scale-z', 'scale',
  'skew-x', 'skew-y',
];
const ALL_ATOM_NAMES = [...BARE_ATOMS, ...SUFFIXED_ATOMS];
const ATOM = ALL_ATOM_NAMES.join('|');

// CSS selector rewrite. Matches `.` or `\:` (CSS-escaped variant colon) followed
// by optional `-` (negative variant) and a transform-family atom. The atom must
// be followed by a class-token-terminating char so we don't split inside longer
// identifiers.
const CSS_ATOM_RE = new RegExp(
  `(\\.|\\\\:)(-?)(${ATOM})(?=[-\\\\:,{\\s]|$)`,
  'g'
);

function rewriteCss(css) {
  let count = 0;
  const result = css.replace(CSS_ATOM_RE, (_, prefix, neg, atom) => {
    count++;
    return `${prefix}${neg}${PREFIX}${atom}`;
  });
  return { result, count };
}

// JS rewrite: only rename class tokens INSIDE string literals. Minified dist
// JS contains object property keys like `{transform:f,scale:t}` that look
// like Tailwind tokens syntactically but are JS syntax. Walking the source
// character-by-character and rewriting only inside "...", '...', `...` lets
// us reliably distinguish.
function rewriteJs(source) {
  let count = 0;
  let out = '';
  let i = 0;

  while (i < source.length) {
    const ch = source[i];

    // Double/single quoted string
    if (ch === '"' || ch === "'") {
      const quote = ch;
      let j = i + 1;
      while (j < source.length) {
        if (source[j] === '\\') { j += 2; continue; }
        if (source[j] === quote) break;
        j++;
      }
      const content = source.slice(i + 1, j);
      const rewritten = rewriteClassString(content, () => count++);
      out += quote + rewritten + quote;
      i = j + 1;
      continue;
    }

    // Template literal
    if (ch === '`') {
      let j = i + 1;
      let staticStart = j;
      out += '`';
      while (j < source.length && source[j] !== '`') {
        if (source[j] === '\\') { j += 2; continue; }
        if (source[j] === '$' && source[j + 1] === '{') {
          // Emit static segment through the rewriter
          const staticContent = source.slice(staticStart, j);
          out += rewriteClassString(staticContent, () => count++);
          // Copy interpolation verbatim, tracking brace depth
          out += '${';
          j += 2;
          let depth = 1;
          const interpStart = j;
          while (j < source.length && depth > 0) {
            if (source[j] === '{') depth++;
            else if (source[j] === '}') depth--;
            if (depth === 0) break;
            j++;
          }
          out += source.slice(interpStart, j);
          out += '}';
          j++;
          staticStart = j;
          continue;
        }
        j++;
      }
      // Final static segment
      out += rewriteClassString(source.slice(staticStart, j), () => count++);
      out += '`';
      i = j + 1;
      continue;
    }

    // Line comment
    if (ch === '/' && source[i + 1] === '/') {
      const nl = source.indexOf('\n', i);
      const end = nl === -1 ? source.length : nl;
      out += source.slice(i, end);
      i = end;
      continue;
    }

    // Block comment
    if (ch === '/' && source[i + 1] === '*') {
      const endIdx = source.indexOf('*/', i + 2);
      const end = endIdx === -1 ? source.length : endIdx + 2;
      out += source.slice(i, end);
      i = end;
      continue;
    }

    out += ch;
    i++;
  }

  return { result: out, count };
}

// Rewrite a class-list string content. Splits on whitespace, inspects each
// non-empty token, renames transform-family atomics with ds- prefix. Preserves
// variant-chain prefixes (hover:, group-data-[state=open]:, etc.).
function rewriteClassString(content, onRename) {
  // Fast path: if no atom substring appears, skip.
  let hasAtom = false;
  for (const name of ALL_ATOM_NAMES) {
    if (content.includes(name)) { hasAtom = true; break; }
  }
  if (!hasAtom) return content;

  return content.replace(/\S+/g, (token) => renameClassToken(token, onRename));
}

// Rename a single whitespace-delimited token. A token may be a variant-chained
// Tailwind class like `hover:group-data-[state=open]:rotate-180` or a simple
// atomic `rotate-180` / `-translate-x-1/2`. We locate the atomic portion (after
// the last variant-separator colon, ignoring colons inside [...] brackets) and
// prefix it. Returns original token if it's not a transform-family class.
function renameClassToken(token, onRename) {
  // Find the last top-level `:` (variant separator).
  let depth = 0;
  let lastColon = -1;
  for (let k = 0; k < token.length; k++) {
    const c = token[k];
    if (c === '[') depth++;
    else if (c === ']') depth--;
    else if (c === ':' && depth === 0) lastColon = k;
  }

  const prefix = lastColon === -1 ? '' : token.slice(0, lastColon + 1);
  const atomic = lastColon === -1 ? token : token.slice(lastColon + 1);

  const match = matchTransformAtom(atomic);
  if (!match) return token;

  const { neg, atomName, rest } = match;
  onRename();
  return `${prefix}${neg}${PREFIX}${atomName}${rest}`;
}

// Classify an atomic token (already stripped of variant prefix).
// - Bare atoms match as the whole atomic (e.g. `transform`, `transform-gpu`).
// - Suffixed atoms require a `-<value>` tail (e.g. `rotate-180`, `translate-x-1/2`).
// Returns { neg, atomName, rest } or null.
function matchTransformAtom(atomic) {
  const negMatch = atomic.match(/^-(?=[a-z])/);
  const neg = negMatch ? '-' : '';
  const body = atomic.slice(neg.length);

  // Try bare atoms first (longest first) — match must be exact.
  const bareSorted = [...BARE_ATOMS].sort((a, b) => b.length - a.length);
  for (const name of bareSorted) {
    if (body === name) {
      return { neg, atomName: name, rest: '' };
    }
  }

  // Try suffixed atoms — require a `-` followed by at least one char.
  const suffixSorted = [...SUFFIXED_ATOMS].sort((a, b) => b.length - a.length);
  for (const name of suffixSorted) {
    if (body.startsWith(name + '-') && body.length > name.length + 1) {
      return { neg, atomName: name, rest: body.slice(name.length) };
    }
  }

  return null;
}

function collectMjs(dir) {
  const files = [];
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...collectMjs(full));
    else if (entry.isFile() && entry.name.endsWith('.mjs')) files.push(full);
  }
  return files;
}

// --- Run CSS pass ---
if (!fs.existsSync(CSS_PATH)) {
  console.warn('dist/index.css not found — skipping transform class prefix.');
  process.exit(0);
}

const css = fs.readFileSync(CSS_PATH, 'utf8');
const { result: newCss, count: cssCount } = rewriteCss(css);
if (cssCount > 0) fs.writeFileSync(CSS_PATH, newCss, 'utf8');

// --- Run JS pass ---
let jsFilesChanged = 0;
let jsRenames = 0;
for (const file of collectMjs(DIST)) {
  const src = fs.readFileSync(file, 'utf8');
  const { result, count } = rewriteJs(src);
  if (count > 0) {
    fs.writeFileSync(file, result, 'utf8');
    jsFilesChanged++;
    jsRenames += count;
  }
}

console.log(
  `Prefixed transform classes: CSS ${cssCount} selectors in dist/index.css, ` +
    `JS ${jsRenames} references in ${jsFilesChanged} .mjs files.`
);
