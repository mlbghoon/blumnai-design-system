import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

const SNAPSHOT_PATH =
  process.argv[2] ??
  path.join(ROOT, 'src', 'icons', 'source', 'isocons.isometric.subset.json');
const OUT_DIR = path.join(ROOT, 'src', 'components', 'icons', 'IsometricIcon', 'icons');
const DATA_FILE = path.join(ROOT, 'src', 'components', 'icons', 'IsometricIcon', 'isometric-icon-data.ts');

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

  let inner = rawSvg.slice(start + 1, end).trim();
  // Replace fill="white" with fill={fillStyle} for dynamic coloring
  inner = inner.replace(/fill="white"/g, 'fill={fillStyle}');
  // Replace stroke color and opacity with strokeStyle
  inner = inner.replace(/stroke="#[0-9A-Fa-f]+" stroke-opacity="[^"]+"/g, 'stroke={strokeStyle}');
  // Also handle stroke without opacity
  inner = inner.replace(/stroke="#[0-9A-Fa-f]+"/g, 'stroke={strokeStyle}');
  // Convert stroke-linecap and stroke-linejoin to camelCase for JSX
  inner = inner.replace(/stroke-linecap/g, 'strokeLinecap');
  inner = inner.replace(/stroke-linejoin/g, 'strokeLinejoin');
  inner = inner.replace(/stroke-width/g, 'strokeWidth');
  // Convert fill-rule to camelCase
  inner = inner.replace(/fill-rule/g, 'fillRule');
  inner = inner.replace(/clip-rule/g, 'clipRule');
  return { viewBox, inner };
};

const makeComponentTsx = (componentName, viewBox, inner) => {
  return [
    "import { forwardRef } from 'react';",
    '',
    "import type { IsometricSvgProps } from './isometric.types';",
    '',
    `export const ${componentName} = forwardRef<SVGSVGElement, IsometricSvgProps>(`,
    "  ({ size = 24, className, fillColor = 'default', strokeColor = 'accent', ...props }, ref) => {",
    '    const fillStyle = `var(--bg-${fillColor})`;',
    '    const strokeStyle = `var(--border-${strokeColor})`;',
    '',
    '    return (',
    `      <svg`,
    '        ref={ref}',
    `        xmlns="http://www.w3.org/2000/svg"`,
    `        viewBox="${viewBox}"`,
    '        fill="none"',
    '        width={size}',
    '        height={size}',
    '        className={className}',
    '        aria-hidden',
    '        {...props}',
    '      >',
    `        ${inner}`,
    '      </svg>',
    '    );',
    '  }',
    ');',
    '',
    `${componentName}.displayName = '${componentName}';`,
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

// Collect unique base icon names for data file generation
const baseIconNames = new Map(); // lowercase -> PascalCase

for (const [key, rawSvg] of entries) {
  const componentName = deriveComponentName(key);
  const { viewBox, inner } = parseSvg(rawSvg);
  fs.writeFileSync(path.join(OUT_DIR, `${componentName}.tsx`), makeComponentTsx(componentName, viewBox, inner));

  // Extract base name for data file (without -T/-L suffix and discriminator)
  const [rawBaseKey] = key.split('__');
  const isTop = rawBaseKey.endsWith('-T');
  const isLeft = rawBaseKey.endsWith('-L');
  const baseName = isTop || isLeft ? rawBaseKey.slice(0, -2) : rawBaseKey;

  // Convert to lowercase type key (remove all non-alphanumeric)
  const lowercaseKey = baseName.toLowerCase().replace(/[^a-z0-9]/g, '');
  const pascalName = toPascalCase(baseName);

  if (!baseIconNames.has(lowercaseKey)) {
    baseIconNames.set(lowercaseKey, pascalName);
  }
}

console.log(`Generated ${entries.length} isometric icon components into ${path.relative(ROOT, OUT_DIR)}.`);

// Generate isometric-icon-data.ts
const sortedEntries = [...baseIconNames.entries()].sort(([a], [b]) => a.localeCompare(b));

const typeUnion = sortedEntries.map(([key]) => `  | '${key}'`).join('\n');
const mappingEntries = sortedEntries.map(([key, pascal]) => `  '${key}': '${pascal}',`).join('\n');

const dataFileContent = `// This file is auto-generated by generate-isometric-icons.mjs
// Do not edit manually.

export type IsometricIconType =
${typeUnion};

export const iconTypeToName: Record<IsometricIconType, string> = {
${mappingEntries}
};
`;

fs.writeFileSync(DATA_FILE, dataFileContent);
console.log(`Generated isometric-icon-data.ts with ${sortedEntries.length} icon types.`);

