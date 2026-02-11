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
  inner = inner.replace(/fill="white"/g, 'fill={fillStyle}');
  inner = inner.replace(/stroke="#[0-9A-Fa-f]+" stroke-opacity="[^"]+"/g, 'stroke={strokeStyle}');
  inner = inner.replace(/stroke="#[0-9A-Fa-f]+"/g, 'stroke={strokeStyle}');
  inner = inner.replace(/stroke-linecap/g, 'strokeLinecap');
  inner = inner.replace(/stroke-linejoin/g, 'strokeLinejoin');
  inner = inner.replace(/stroke-width/g, 'strokeWidth');
  inner = inner.replace(/fill-rule/g, 'fillRule');
  inner = inner.replace(/clip-rule/g, 'clipRule');
  return { viewBox, inner };
};

const sanitizeDiscriminator = (value) => {
  if (!value) return '';
  return value.replaceAll(':', '_').replaceAll('-', '_');
};

const deriveComponentName = (key) => {
  const [rawBaseKey, rawDiscriminator] = key.split('__');

  const isTop = rawBaseKey.endsWith('-T');
  const isLeft = rawBaseKey.endsWith('-L');

  let base = isTop || isLeft ? rawBaseKey.slice(0, -2) : rawBaseKey;
  const orientation = isTop ? 'Top' : isLeft ? 'Left' : '';

  // Detect double-dash variants (e.g., 'clock-loader-' from 'clock-loader--T')
  // to differentiate from single-dash variants ('clock-loader' from 'clock-loader-T')
  const hasDoubleDash = base.endsWith('-');
  if (hasDoubleDash) {
    base = base.slice(0, -1);
  }
  const altSuffix = hasDoubleDash ? '2' : '';

  const discriminator = sanitizeDiscriminator(rawDiscriminator);
  const discriminatorSuffix = discriminator ? `_${discriminator}` : '';

  return `Iso${toPascalCase(base)}${orientation}${altSuffix}${discriminatorSuffix}Icon`;
};

if (!fs.existsSync(SNAPSHOT_PATH)) {
  console.error(`Snapshot not found: ${SNAPSHOT_PATH}`);
  process.exit(1);
}

const snapshot = JSON.parse(fs.readFileSync(SNAPSHOT_PATH, 'utf8'));
const entries = Object.entries(snapshot).sort(([a], [b]) => a.localeCompare(b));

fs.mkdirSync(OUT_DIR, { recursive: true });

// Clean old .tsx files (but keep isometric.types.ts)
const existingFiles = fs.readdirSync(OUT_DIR);
for (const file of existingFiles) {
  if (file.endsWith('.tsx')) {
    fs.unlinkSync(path.join(OUT_DIR, file));
  }
}

function getChunk(componentName) {
  const afterIso = componentName.slice(3);
  const firstChar = afterIso[0].toLowerCase();
  if ('0123456789ab'.includes(firstChar)) return '1ab';
  if (firstChar === 'c') return 'c';
  if (firstChar === 'd') return 'd';
  if ('efgh'.includes(firstChar)) return 'efgh';
  if ('ijklmn'.includes(firstChar)) return 'ijklmn';
  if ('opqr'.includes(firstChar)) return 'opqr';
  if (firstChar === 's') return 's';
  return 'tuvw';
}

// Collect unique base icon names for data file generation
const baseIconNames = new Map();
const componentDefs = [];

for (const [key, rawSvg] of entries) {
  const componentName = deriveComponentName(key);
  const { viewBox, inner } = parseSvg(rawSvg);

  componentDefs.push({ componentName, viewBox, inner });

  // Extract base name for data file
  const [rawBaseKey] = key.split('__');
  const isTop = rawBaseKey.endsWith('-T');
  const isLeft = rawBaseKey.endsWith('-L');
  const baseName = isTop || isLeft ? rawBaseKey.slice(0, -2) : rawBaseKey;

  const lowercaseKey = baseName.toLowerCase().replace(/[^a-z0-9]/g, '');
  const pascalName = toPascalCase(baseName);

  if (!baseIconNames.has(lowercaseKey)) {
    baseIconNames.set(lowercaseKey, pascalName);
  }
}

// Group components by chunk
const sortedDefs = [...componentDefs].sort((a, b) => a.componentName.localeCompare(b.componentName));

const chunks = new Map();
for (const def of sortedDefs) {
  const chunk = getChunk(def.componentName);
  if (!chunks.has(chunk)) chunks.set(chunk, []);
  chunks.get(chunk).push(def);
}

// Write one .tsx per chunk
for (const [chunkName, defs] of chunks) {
  const components = defs.map(({ componentName, viewBox, inner }) => {
    return `export const ${componentName} = forwardRef<SVGSVGElement, IsometricSvgProps>(
  ({ size = 24, className, fillColor = 'default', strokeColor = 'accent', ...props }, ref) => {
    const fillStyle = \`var(--bg-\${fillColor})\`;
    const strokeStyle = \`var(--border-\${strokeColor})\`;

    return (
      <svg
        ref={ref}
        viewBox="${viewBox}"
        fill="none"
        width={size}
        height={size}
        className={className}
        aria-hidden
        {...props}
      >
        ${inner}
      </svg>
    );
  }
);

${componentName}.displayName = '${componentName}';`;
  }).join('\n\n');

  const chunkTsx = `// This file is auto-generated. Do not edit manually.
import { forwardRef } from 'react';

import type { IsometricSvgProps } from './isometric.types';

${components}
`;

  const fileName = `iso-${chunkName}.tsx`;
  fs.writeFileSync(path.join(OUT_DIR, fileName), chunkTsx);
  console.log(`  ${fileName}: ${defs.length} components`);
}

console.log(`Generated ${entries.length} isometric icon components across ${chunks.size} chunks.`);

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
