import fs from 'node:fs';
import path from 'node:path';

import { parseSvgToTree, attrToReactProp, nodeToCreateElement, walkTree } from './lib/svg-to-create-element.mjs';

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

/**
 * Parse raw SVG, extract inner children as tree nodes, apply fill/stroke transforms.
 * @param {string} rawSvg
 * @returns {{ viewBox: string, innerNodes: Array }}
 */
const parseSvg = (rawSvg) => {
  // Strip xmlns
  let cleaned = rawSvg.replace(/\s*xmlns="http:\/\/www\.w3\.org\/2000\/svg"/g, '');
  // Remove width/height from root svg (controlled by component props)
  cleaned = cleaned.replace(/<svg([^>]*)\s+width="[^"]*"/gi, '<svg$1');
  cleaned = cleaned.replace(/<svg([^>]*)\s+height="[^"]*"/gi, '<svg$1');

  const nodes = parseSvgToTree(cleaned);
  if (nodes.length !== 1 || nodes[0].tag !== 'svg') throw new Error('SVG parse failed');

  const root = nodes[0];
  const viewBox = root.attrs.viewBox;
  if (!viewBox) throw new Error('SVG missing viewBox');

  // Transform all nodes: camelCase attrs, replace fill/stroke with dynamic values
  walkTree(root.children, (node) => {
    const newAttrs = {};
    let hasStroke = false;

    for (const [k, v] of Object.entries(node.attrs)) {
      const reactKey = attrToReactProp(k);

      if (reactKey === 'fill' && v === 'white') {
        newAttrs.fill = { __dynamic: 'fillStyle' };
      } else if (reactKey === 'stroke' && /^#[0-9A-Fa-f]+$/.test(v)) {
        newAttrs.stroke = { __dynamic: 'strokeStyle' };
        hasStroke = true;
      } else if (reactKey === 'strokeOpacity' && hasStroke) {
        // Skip stroke-opacity when stroke is replaced with dynamic
        continue;
      } else {
        newAttrs[reactKey] = v;
      }
    }

    node.attrs = newAttrs;
  });

  return { viewBox, innerNodes: root.children };
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

// Clean old .tsx and .ts files (but keep types)
const existingFiles = fs.readdirSync(OUT_DIR);
for (const file of existingFiles) {
  if ((file.endsWith('.tsx') || file.endsWith('.ts')) && file !== 'isometric.types.ts') {
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
  const { viewBox, innerNodes } = parseSvg(rawSvg);

  componentDefs.push({ componentName, viewBox, innerNodes });

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

// Write one .ts per chunk
for (const [chunkName, defs] of chunks) {
  const components = defs.map(({ componentName, viewBox, innerNodes }) => {
    const innerCalls = innerNodes.map(n => nodeToCreateElement(n, 6)).join(',\n');

    return `export const ${componentName} = forwardRef<SVGSVGElement, IsometricSvgProps>(
  ({ size = 24, className, fillColor = 'default', strokeColor = 'accent', ...props }, ref) => {
    const fillStyle = \`var(--bg-\${fillColor})\`;
    const strokeStyle = \`var(--border-\${strokeColor})\`;

    return h('svg', { ref, viewBox: '${viewBox}', fill: 'none', width: size, height: size, className, 'aria-hidden': true, ...props },
${innerCalls}
    );
  }
);

${componentName}.displayName = '${componentName}';`;
  }).join('\n\n');

  const chunkTs = `// This file is auto-generated. Do not edit manually.
import { createElement as h, forwardRef } from 'react';

import type { IsometricSvgProps } from './isometric.types';

${components}
`;

  const fileName = `iso-${chunkName}.ts`;
  fs.writeFileSync(path.join(OUT_DIR, fileName), chunkTs);
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
