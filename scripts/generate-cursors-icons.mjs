import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const ICONS_DIR = path.join(ROOT, 'src', 'icons');

const SNAPSHOT_PATH =
  process.argv[2] ?? path.join(ICONS_DIR, 'source', 'sortui.cursors.json');

const OUT_DIR = path.join(ICONS_DIR, 'cursors');

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

cleanOutDir();
fs.mkdirSync(OUT_DIR, { recursive: true });

for (const [rawKey, rawSvg] of entries) {
  // snapshot keys are like "cursor-pointer", "cursor-hand-open"
  const key = String(rawKey).trim().replace(/^cursor-?/i, 'cursor-');
  const name = key.replace(/^cursor-/, '');
  const componentName = `Cursor${toValidIdentifier(name)}Icon`;
  const prefixedSvg = prefixSvgIds(toJsxSafeSvgMarkup(String(rawSvg).trim()), componentName);

  fs.writeFileSync(
    path.join(OUT_DIR, `${componentName}.tsx`),
    makeCategoryComponentTsx(componentName, prefixedSvg),
  );
}

console.log(`Generated ${entries.length} cursor icons into src/icons/cursors.`);

