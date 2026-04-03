#!/usr/bin/env node

/**
 * Post-build: strip @layer wrappers from the built CSS.
 *
 * Tailwind v4 emits @layer blocks (properties, theme, base, utilities).
 * Per the CSS spec, unlayered CSS always beats layered CSS regardless of
 * specificity, so we unwrap every @layer to ensure design-system utilities
 * win over consuming projects' broad element selectors.
 */

import fs from 'node:fs';
import path from 'node:path';

const CSS_PATH = path.resolve(process.cwd(), 'dist/index.css');

if (!fs.existsSync(CSS_PATH)) {
  console.error('dist/index.css not found — skipping layer strip.');
  process.exit(0);
}

const src = fs.readFileSync(CSS_PATH, 'utf8');

/**
 * Strip all `@layer <name> { ... }` wrappers while keeping their contents.
 * Handles nested braces (e.g. @media, @supports, @keyframes inside a layer).
 */
function stripLayers(css) {
  let result = '';
  let i = 0;

  while (i < css.length) {
    const layerMatch = matchLayerAt(css, i);
    if (layerMatch) {
      result += layerMatch.inner;
      i = layerMatch.end;
    } else {
      result += css[i];
      i++;
    }
  }

  return result;
}

/**
 * If position `pos` is the start of `@layer <name> {`, return the inner
 * content and the index just past the closing `}`.  Otherwise return null.
 */
function matchLayerAt(css, pos) {
  if (css.slice(pos, pos + 6) !== '@layer') return null;

  const openBrace = css.indexOf('{', pos);
  if (openBrace === -1) return null;

  const between = css.slice(pos + 6, openBrace).trim();
  if (!between || between.includes('{')) return null;

  let depth = 1;
  let j = openBrace + 1;
  while (j < css.length && depth > 0) {
    if (css[j] === '{') depth++;
    else if (css[j] === '}') depth--;
    j++;
  }

  const inner = css.slice(openBrace + 1, j - 1);
  return { inner, end: j };
}

const out = stripLayers(src);

const layersBefore = (src.match(/@layer\s/g) || []).length;
const layersAfter = (out.match(/@layer\s/g) || []).length;

fs.writeFileSync(CSS_PATH, out, 'utf8');
console.log(
  `Stripped ${layersBefore - layersAfter} @layer wrappers from dist CSS ` +
    `(${layersAfter} remaining references).`
);
