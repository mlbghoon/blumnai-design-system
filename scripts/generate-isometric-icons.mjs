import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

const SNAPSHOT_PATH =
  process.argv[2] ??
  path.join(ROOT, 'src', 'icons', 'source', 'isocons.isometric.subset.json');
const OUT_DIR = path.join(ROOT, 'src', 'icons', 'isometricIcon');

const toPascalCase = (name) =>
  name
    // Some Figma icon names contain spaces or multiple separators (e.g. "very unhappy-T", "clock-loader--T")
    .split(/[^a-zA-Z0-9]+/g)
    .filter(Boolean)
    .map((part) => {
      const match = /^(\d+)([a-z].*)$/i.exec(part);
      if (match) {
        const [, digits, rest] = match;
        return `${digits}${rest.charAt(0).toUpperCase()}${rest.slice(1)}`;
      }
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join('');

const parseSvg = (rawSvg) => {
  const viewBox = /viewBox="([^"]+)"/.exec(rawSvg)?.[1];
  if (!viewBox) throw new Error('SVG missing viewBox');

  const start = rawSvg.indexOf('>');
  const end = rawSvg.lastIndexOf('</svg>');
  if (start === -1 || end === -1 || end <= start) throw new Error('SVG parse failed');

  const inner = rawSvg.slice(start + 1, end).trim();
  return { viewBox, inner };
};

const makeComponentTsx = (componentName, viewBox, inner) => {
  return [
    "import type { Props } from '../Icon.types';",
    '',
    "import { Icon } from '../Icon';",
    '',
    `export const ${componentName} = (props: Props) => {`,
    '  return (',
    '    <Icon {...props}>',
    `      <svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}">`,
    `        ${inner}`,
    '      </svg>',
    '    </Icon>',
    '  );',
    '};',
    '',
  ].join('\n');
};

const sanitizeDiscriminator = (value) => {
  if (!value) return '';
  return value.replaceAll(':', '_').replaceAll('-', '_');
};

const deriveComponentName = (key) => {
  // Keys may contain a discriminator to avoid collisions, e.g. "clock-loader-T__3888_16544"
  const [rawBaseKey, rawDiscriminator] = key.split('__');

  const isTop = rawBaseKey.endsWith('-T');
  const isLeft = rawBaseKey.endsWith('-L');

  const base = isTop || isLeft ? rawBaseKey.slice(0, -2) : rawBaseKey;
  const orientation = isTop ? 'Top' : isLeft ? 'Left' : '';

  const discriminator = sanitizeDiscriminator(rawDiscriminator);
  const discriminatorSuffix = discriminator ? `_${discriminator}` : '';

  return `Iso${toPascalCase(base)}${orientation}${discriminatorSuffix}Icon`;
};

if (!fs.existsSync(SNAPSHOT_PATH)) {
  console.error(`Snapshot not found: ${SNAPSHOT_PATH}`);
  process.exit(1);
}

const snapshot = JSON.parse(fs.readFileSync(SNAPSHOT_PATH, 'utf8'));
const entries = Object.entries(snapshot).sort(([a], [b]) => a.localeCompare(b));

fs.mkdirSync(OUT_DIR, { recursive: true });

for (const [key, rawSvg] of entries) {
  const componentName = deriveComponentName(key);
  const { viewBox, inner } = parseSvg(rawSvg);
  fs.writeFileSync(path.join(OUT_DIR, `${componentName}.tsx`), makeComponentTsx(componentName, viewBox, inner));
}

console.log(`Generated ${entries.length} isometric icon components into ${path.relative(ROOT, OUT_DIR)}.`);

