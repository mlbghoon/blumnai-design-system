import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const ICONS_SOURCE_DIR = path.join(ROOT, 'src', 'icons', 'source');
const CURSOR_ICON_DIR = path.join(ROOT, 'src', 'components', 'icons', 'CursorIcon');

const SNAPSHOT_PATH =
  process.argv[2] ?? path.join(ICONS_SOURCE_DIR, 'sortui.cursors.json');

const OUT_DIR = path.join(CURSOR_ICON_DIR, 'icons');

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

const toPascalCase = (name) =>
  String(name)
    .trim()
    .split(/[^a-zA-Z0-9]+/g)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

const toValidIdentifier = (raw) => {
  const pascal = toPascalCase(raw);
  if (!pascal) return 'Unknown';
  if (/^\d/.test(pascal)) return `_${pascal}`;
  return pascal;
};

const sanitizeId = (value) => String(value).replaceAll(':', '_').replaceAll('-', '_');

const toJsxSafeSvgMarkup = (svg) => {
  let out = String(svg);

  out = out.replace(/style="mask-type:([^"]+)"/g, (_m, maskType) => {
    return `style={{ maskType: '${String(maskType).trim()}' }}`;
  });

  out = out.replace(/style="mix-blend-mode:([^"]+)"/g, (_m, mode) => {
    return `style={{ mixBlendMode: '${String(mode).trim()}' }}`;
  });

  // Convert fill="white" to style={{ fill: 'white' }} to prevent IconWrapper override
  out = out.replace(/(<path[^>]*)\s+fill="white"([^>]*>)/g, '$1 style={{ fill: \'white\' }}$2');

  // For stroke-only paths, ensure fill doesn't get inherited
  out = out.replace(/(<path[^>]*)\s+stroke="([^"]+)"([^>]*)(\/?>)/g, (match, before, strokeVal, after, closing) => {
    if (before.includes('fill=') || before.includes('style=') || after.includes('fill=') || after.includes('style=')) {
      return match;
    }
    return `${before} style={{ fill: 'none' }} stroke="${strokeVal}"${after}${closing}`;
  });

  const attrReplacements = [
    ['clip-rule=', 'clipRule='],
    ['fill-rule=', 'fillRule='],
    ['stroke-linecap=', 'strokeLinecap='],
    ['stroke-linejoin=', 'strokeLinejoin='],
    ['stroke-width=', 'strokeWidth='],
    ['stroke-miterlimit=', 'strokeMiterlimit='],
    ['stroke-dasharray=', 'strokeDasharray='],
    ['stroke-dashoffset=', 'strokeDashoffset='],
    ['stroke-opacity=', 'strokeOpacity='],
    ['fill-opacity=', 'fillOpacity='],
    ['stop-color=', 'stopColor='],
    ['stop-opacity=', 'stopOpacity='],
    ['flood-color=', 'floodColor='],
    ['flood-opacity=', 'floodOpacity='],
    ['color-interpolation-filters=', 'colorInterpolationFilters='],
    ['clip-path=', 'clipPath='],
    ['xmlns:xlink=', 'xmlnsXlink='],
    ['xlink:href=', 'xlinkHref='],
  ];

  for (const [from, to] of attrReplacements) {
    out = out.replaceAll(from, to);
  }

  out = out.replace(/\s*xmlns="http:\/\/www\.w3\.org\/2000\/svg"/, '');

  return out;
};

const prefixSvgIds = (svg, prefix) => {
  const idRegex = /\bid="([^"]+)"/g;
  const ids = new Set();
  for (const match of svg.matchAll(idRegex)) ids.add(match[1]);
  if (ids.size === 0) return svg;

  const map = new Map();
  for (const id of ids) map.set(id, `${prefix}__${sanitizeId(id)}`);

  let out = svg;
  for (const [oldId, newId] of map.entries()) {
    out = out.replaceAll(`id="${oldId}"`, `id="${newId}"`);
    out = out.replaceAll(`url(#${oldId})`, `url(#${newId})`);
    out = out.replaceAll(`href="#${oldId}"`, `href="#${newId}"`);
    out = out.replaceAll(`xlinkHref="#${oldId}"`, `xlinkHref="#${newId}"`);
  }

  return out;
};

if (!fs.existsSync(SNAPSHOT_PATH)) {
  console.error(`Snapshot not found: ${SNAPSHOT_PATH}`);
  process.exit(1);
}

const snapshot = JSON.parse(fs.readFileSync(SNAPSHOT_PATH, 'utf8'));
const entries = Object.entries(snapshot).sort(([a], [b]) => a.localeCompare(b));

cleanOutDir();
fs.mkdirSync(OUT_DIR, { recursive: true });

// Collect all components in memory for consolidated output
const componentDefs = [];

for (const [rawKey, rawSvg] of entries) {
  const key = String(rawKey).trim().replace(/^cursor-?/i, 'cursor-');
  const name = key.replace(/^cursor-/, '');
  const componentName = `Cursor${toValidIdentifier(name)}Icon`;
  const prefixedSvg = prefixSvgIds(toJsxSafeSvgMarkup(String(rawSvg).trim()), componentName);

  componentDefs.push({ componentName, svgMarkup: prefixedSvg });
}

// Write consolidated all.tsx
const sortedDefs = [...componentDefs].sort((a, b) => a.componentName.localeCompare(b.componentName));
const allComponents = sortedDefs.map(({ componentName, svgMarkup }) => {
  return `export const ${componentName} = (props: Props) => {
  return (
    <Icon {...props}>
      ${svgMarkup}
    </Icon>
  );
};`;
}).join('\n\n');

const allTsx = `// This file is auto-generated. Do not edit manually.
import type { Props } from '../../Icon/IconWrapper.types';

import { Icon } from '../../Icon/IconWrapper';

${allComponents}
`;

fs.writeFileSync(path.join(OUT_DIR, 'all.tsx'), allTsx);

// Update index.ts to re-export from all.tsx
const indexContent = sortedDefs
  .map(({ componentName }) => `export { ${componentName} } from './all';`)
  .join('\n') + '\n';

fs.writeFileSync(path.join(OUT_DIR, 'index.ts'), indexContent);

console.log(`Generated ${entries.length} cursor icons into src/components/icons/CursorIcon/icons/all.tsx.`);
