#!/usr/bin/env node

/**
 * Generates `src/components/icons/Icon/remixicon-export-map.ts`:
 *   { [registryKey: string]: 'Ri<Name>{Line|Fill}' }
 *
 * Source of truth: Remixicon `tags.json` (canonical kebab-name → category).
 * Validation: `node_modules/@remixicon/react/index.d.ts` (every predicted name must exist).
 *
 * Per Phase 0 audit, only one explicit alias is needed:
 *   `fontsans` → `RiFontSansSerifLine`
 *   `fontsansfill` → `RiFontSansSerifFill`
 *
 * Reads tags.json from a vendored path or fetches at run time.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const TAGS_PATH_CANDIDATES = [
  '/tmp/remix-tags.json',
  path.join(ROOT, 'scripts', 'data', 'remix-tags.json'),
];
const REMIXICON_DTS = path.join(ROOT, 'node_modules/@remixicon/react/index.d.ts');
const OUTPUT_MAP_PATH = path.join(ROOT, 'src/components/icons/Icon/legacy/remixicon-export-map.ts');

// Explicit aliases (from Phase 0 audit decisions).
// Remixicon's `font-sans-serif` is a single-variant icon (no Line/Fill suffix in export name).
// DS used `font-sans` historically — alias both line + fill registry keys to the single export.
const EXPLICIT_ALIASES = {
  fontsans: 'RiFontSansSerif',
  fontsansfill: 'RiFontSansSerif',
};

// ----- helpers -----

const kebabToRegistryKey = (s) => s.replace(/-/g, '').toLowerCase();

/**
 * Convert kebab-case name to Remixicon's PascalCase export style.
 * Remixicon uses Pascal-cased segments separated by transitions and digits.
 *
 * Examples:
 *   'check' → 'Check'
 *   'arrow-down-s' → 'ArrowDownS'
 *   'arrow-down-line' → 'ArrowDownLine' (already)
 *   '24-hours' → '24Hours'
 *   '4k' → '4k' (Remixicon uses 4k not 4K)
 *
 * Edge cases (handled via validation against d.ts):
 *   - `RiAB` (no segment splitting between A and B because of single-letter words)
 *   - Numbers preserved as-is in segments
 */
function kebabToPascalSegments(kebab) {
  return kebab
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

/**
 * Predict the Remixicon export name for a given canonical kebab-name and variant.
 * Returns the candidate. Caller must validate against the d.ts.
 */
function predictRemixiconExport(kebabName, isFill) {
  const pascal = kebabToPascalSegments(kebabName);
  return `Ri${pascal}${isFill ? 'Fill' : 'Line'}`;
}

// ----- step 1: load tags.json -----

async function loadTags() {
  for (const candidate of TAGS_PATH_CANDIDATES) {
    if (fs.existsSync(candidate)) return JSON.parse(fs.readFileSync(candidate, 'utf8'));
  }
  throw new Error(
    `No vendored tags.json found. Mapping aborted to keep output deterministic across @remixicon/react versions.\n` +
    `Place a version-matched tags.json at one of:\n` +
    TAGS_PATH_CANDIDATES.map((p) => `  - ${p}`).join('\n') +
    `\n\nFetch the file matching the installed @remixicon/react release tag, not master.`,
  );
}

const tags = await loadTags();

// ----- step 2: parse @remixicon/react index.d.ts → set of valid export names -----

if (!fs.existsSync(REMIXICON_DTS)) {
  throw new Error(`@remixicon/react not installed. Run: npm install @remixicon/react`);
}

const dtsSource = fs.readFileSync(REMIXICON_DTS, 'utf8');
const exportRegex = /declare const (Ri\w+):/g;
const remixiconExports = new Set();
let m;
while ((m = exportRegex.exec(dtsSource)) !== null) {
  remixiconExports.add(m[1]);
}
console.log(`@remixicon/react exports: ${remixiconExports.size}`);

// ----- step 3: build mapping -----

const mapping = {};
const unmatched = [];

for (const [categoryName, entries] of Object.entries(tags)) {
  if (categoryName.startsWith('_') || typeof entries !== 'object') continue;
  for (const baseName of Object.keys(entries)) {
    const key = kebabToRegistryKey(baseName);

    const pascal = kebabToPascalSegments(baseName);
    const singleExport = `Ri${pascal}`;
    const lineExport = `Ri${pascal}Line`;
    const fillExport = `Ri${pascal}Fill`;

    // Line variant: prefer `RiXxxLine`, fall back to `RiXxx` (single-variant icon)
    if (remixiconExports.has(lineExport)) {
      mapping[key] = lineExport;
    } else if (remixiconExports.has(singleExport)) {
      mapping[key] = singleExport;
    } else {
      unmatched.push({ key, predicted: lineExport, baseName, isFill: false });
    }

    // Fill variant: only if `RiXxxFill` exists. Single-variant icons reuse the same export for fill.
    if (remixiconExports.has(fillExport)) {
      mapping[key + 'fill'] = fillExport;
    } else if (remixiconExports.has(singleExport) && !remixiconExports.has(lineExport)) {
      // Single-variant: line and fill point to the same component
      mapping[key + 'fill'] = singleExport;
    }
    // Otherwise: no fill variant. DS consumers calling `iconType={[cat, name]}` with isFill=true
    // will fall through to the line variant (no-fill icon). Acceptable behavior.

    // Numeric-leading: DS uses _ prefix
    if (/^\d/.test(baseName)) {
      if (mapping[key]) mapping['_' + key] = mapping[key];
      if (mapping[key + 'fill']) mapping['_' + key + 'fill'] = mapping[key + 'fill'];
    }
  }
}

// Apply explicit aliases (Phase 0 audit decisions)
for (const [aliasKey, exportName] of Object.entries(EXPLICIT_ALIASES)) {
  if (!remixiconExports.has(exportName)) {
    throw new Error(`Alias target '${exportName}' not found in @remixicon/react d.ts`);
  }
  mapping[aliasKey] = exportName;
}

console.log(`Mapped registry keys: ${Object.keys(mapping).length}`);
console.log(`Unmatched (predicted name not in d.ts): ${unmatched.length}`);
if (unmatched.length > 0) {
  console.log('First 10 unmatched:');
  unmatched.slice(0, 10).forEach((u) => {
    console.log(`  ${u.key} → predicted ${u.predicted} (from tags.json: ${u.baseName})`);
  });
}

// Critical-icon sanity check
const CRITICAL = ['check', 'add', 'close', 'search', 'settings', 'menu'];
for (const key of CRITICAL) {
  if (!mapping[key]) {
    throw new Error(`Critical icon '${key}' missing from mapping. Check naming convention.`);
  }
}

// ----- step 4: write output -----

// Build category manifest (for Storybook catalog and DX) — { categoryName: [iconBaseName, ...] }
// Uses the same DS category folder names that consumers know.
//
// CATEGORY_ALIASES handles tags.json compound names that DS publishes as a shortened
// canonical key (e.g., 'Health & Medical' tags entry → DS 'health' folder). Keep this
// table in sync with the registry generator so Storybook/resolver lookups stay aligned.
const CATEGORY_ALIASES = {
  'health & medical': 'health',
  'user & faces': 'user',
};

const normalizeCategoryName = (raw) => {
  const lower = raw.toLowerCase();
  return CATEGORY_ALIASES[lower] ?? lower;
};

const categoryManifest = {};
for (const [categoryName, entries] of Object.entries(tags)) {
  if (categoryName.startsWith('_') || typeof entries !== 'object') continue;
  const dsCategoryName = normalizeCategoryName(categoryName);
  categoryManifest[dsCategoryName] = Object.keys(entries).sort();
}

const sortedKeys = Object.keys(mapping).sort();
let out = `// THIS FILE IS AUTO-GENERATED by scripts/generate-remixicon-mapping.mjs\n`;
out += `// Source: Remixicon tags.json (master) + @remixicon/react index.d.ts validation\n`;
out += `// Total entries: ${sortedKeys.length}\n\n`;
out += `export const REMIXICON_EXPORT_MAP: Readonly<Record<string, string>> = Object.freeze({\n`;
for (const key of sortedKeys) {
  out += `  ${JSON.stringify(key)}: ${JSON.stringify(mapping[key])},\n`;
}
out += `});\n\n`;

// Category manifest for Storybook catalog: each category lists kebab-case base-names (no -fill, no DS '_' prefix).
const sortedCategories = Object.keys(categoryManifest).sort();
out += `/**\n * Category manifest: kebab-case base-names (no -fill, no underscore-leading prefix) per Remixicon category.\n * Used by the Storybook icon catalog.\n */\n`;
out += `export const REMIXICON_CATEGORY_MANIFEST: Readonly<Record<string, readonly string[]>> = Object.freeze({\n`;
for (const cat of sortedCategories) {
  const items = categoryManifest[cat];
  out += `  ${JSON.stringify(cat)}: Object.freeze([\n`;
  for (const name of items) out += `    ${JSON.stringify(name)},\n`;
  out += `  ]),\n`;
}
out += `});\n`;

fs.writeFileSync(OUTPUT_MAP_PATH, out);
console.log(`\nWrote ${OUTPUT_MAP_PATH}`);
console.log(`Categories: ${sortedCategories.length} (${sortedCategories.join(', ')})`);

// Also emit JSON alongside the TS file so the codemod (and other tooling) can consume the
// mapping without TypeScript compilation.
const JSON_MAP_PATH = path.join(ROOT, 'scripts/icon-codemod/remixicon-export-map.json');
const jsonDir = path.dirname(JSON_MAP_PATH);
if (!fs.existsSync(jsonDir)) fs.mkdirSync(jsonDir, { recursive: true });
const jsonPayload = {
  totalEntries: sortedKeys.length,
  exportMap: mapping,
  categories: categoryManifest,
};
fs.writeFileSync(JSON_MAP_PATH, JSON.stringify(jsonPayload, null, 2));
console.log(`Wrote ${JSON_MAP_PATH}`);
