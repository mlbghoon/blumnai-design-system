import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const ROOT = process.cwd();
const ICONS_DIR = path.join(ROOT, 'src', 'icons');

const SNAPSHOT_PATH =
  process.argv[2] ?? path.join(ICONS_DIR, 'source', 'sortui.flags.json');

const OUT_DIR = path.join(ICONS_DIR, 'flags');
const OVERRIDES_PATH = path.join(ROOT, 'scripts', 'flags.overrides.json');

const require = createRequire(import.meta.url);
const countries = require('i18n-iso-countries');
const enLocale = require('i18n-iso-countries/langs/en.json');
countries.registerLocale(enLocale);

const isDirectory = (p) => fs.existsSync(p) && fs.statSync(p).isDirectory();

const cleanOutDir = () => {
  if (!isDirectory(OUT_DIR)) return;
  const entries = fs.readdirSync(OUT_DIR, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isFile()) continue;
    if (!entry.name.endsWith('.tsx')) continue;
    fs.unlinkSync(path.join(OUT_DIR, entry.name));
  }
};

const toValidCode = (raw) => {
  const upper = String(raw).trim().toUpperCase();
  // keep alphanumerics only (supports rare numeric codes if any)
  return upper.replace(/[^A-Z0-9]/g, '');
};

const normalizeName = (raw) => {
  return String(raw)
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // strip diacritics
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

const buildNormalizedNameToAlpha2 = () => {
  const map = new Map();
  const names = countries.getNames('en'); // { US: 'United States', ... }

  for (const [alpha2, name] of Object.entries(names)) {
    const normalized = normalizeName(name);
    if (!map.has(normalized)) map.set(normalized, alpha2);

    // Add a slightly “looser” form by removing some stopwords for better matching.
    const loose = normalized
      .split(' ')
      .filter((w) => !['the', 'of', 'and'].includes(w))
      .join(' ');
    if (loose && !map.has(loose)) map.set(loose, alpha2);
  }

  return map;
};

const loadOverrides = () => {
  if (!fs.existsSync(OVERRIDES_PATH)) return {};
  return JSON.parse(fs.readFileSync(OVERRIDES_PATH, 'utf8'));
};

const toValidIdentifierPart = (raw) => {
  const cleaned = String(raw).replace(/[^A-Z0-9]/gi, '');
  if (!cleaned) return 'Unknown';
  if (/^\d/.test(cleaned)) return `_${cleaned}`;
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
};

const sanitizeId = (value) => String(value).replaceAll(':', '_').replaceAll('-', '_');

const prefixSvgIds = (svg, prefix) => {
  // Prefix ids + their references to avoid collisions when multiple flags render on the same page.
  const idRegex = /\bid="([^"]+)"/g;
  const ids = new Set();
  for (const match of svg.matchAll(idRegex)) ids.add(match[1]);

  if (ids.size === 0) return svg;

  const map = new Map();
  for (const id of ids) {
    const safeOld = sanitizeId(id);
    map.set(id, `${prefix}__${safeOld}`);
  }

  let out = svg;
  for (const [oldId, newId] of map.entries()) {
    // id="old"
    out = out.replaceAll(`id="${oldId}"`, `id="${newId}"`);
    // url(#old)
    out = out.replaceAll(`url(#${oldId})`, `url(#${newId})`);
    // href="#old" / xlink:href="#old"
    out = out.replaceAll(`href="#${oldId}"`, `href="#${newId}"`);
    out = out.replaceAll(`xlink:href="#${oldId}"`, `xlink:href="#${newId}"`);
    // clip-path="url(#old)" etc already handled by url(#old)
  }

  return out;
};

const makeCategoryComponentTsx = (componentName, svgMarkup) => {
  return [
    "import type { Props } from '../Icon.types';",
    '',
    "import { Icon } from '../Icon';",
    '',
    `export const ${componentName} = (props: Props) => {`,
    '  return (',
    '    <Icon {...props}>',
    `      ${svgMarkup}`,
    '    </Icon>',
    '  );',
    '};',
    '',
  ].join('\n');
};

if (!fs.existsSync(SNAPSHOT_PATH)) {
  console.error(`Snapshot not found: ${SNAPSHOT_PATH}`);
  process.exit(1);
}

const snapshot = JSON.parse(fs.readFileSync(SNAPSHOT_PATH, 'utf8'));
const entries = Object.entries(snapshot).sort(([a], [b]) => a.localeCompare(b));
const overrides = loadOverrides();
const normalizedNameToAlpha2 = buildNormalizedNameToAlpha2();

cleanOutDir();
fs.mkdirSync(OUT_DIR, { recursive: true });

for (const [rawKey, rawSvg] of entries) {
  const [baseKey, discriminator] = String(rawKey).split('__');
  const rawName = String(baseKey);
  const normalized = normalizeName(rawName);

  const overrideCode = overrides[normalized];
  const alpha2 = normalizedNameToAlpha2.get(normalized) ?? normalizedNameToAlpha2.get(
    normalized
      .split(' ')
      .filter((w) => !['the', 'of', 'and'].includes(w))
      .join(' '),
  );

  const resolvedCode = overrideCode ?? alpha2 ?? rawName;
  const code = toValidCode(resolvedCode);

  const disc = discriminator ? `_${toValidIdentifierPart(discriminator)}` : '';

  const componentName = `Flag${toValidIdentifierPart(code)}${disc}Icon`;
  const prefixedSvg = prefixSvgIds(String(rawSvg).trim(), componentName);

  fs.writeFileSync(
    path.join(OUT_DIR, `${componentName}.tsx`),
    makeCategoryComponentTsx(componentName, prefixedSvg),
  );
}

console.log(`Generated ${entries.length} flag icons into src/icons/flags.`);

