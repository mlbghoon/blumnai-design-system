import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

import { parseSvgToTree, attrToReactProp, nodeToCreateElement, walkTree } from './lib/svg-to-create-element.mjs';

/**
 * Consolidate individual flag icon files into a single all.ts (createElement),
 * then generate flag-registry.tsx and FlagIcon.types.ts.
 *
 * This script:
 * 1. Reads all individual flag icon .tsx files (or existing all.tsx)
 * 2. Extracts SVG content and converts to createElement calls
 * 3. Consolidates into icons/all.ts
 * 4. Generates registry with lazy imports from all.ts
 * 5. Generates FlagIcon.types.ts
 */

const ROOT = process.cwd();
const FLAG_ICON_DIR = path.join(ROOT, 'src', 'components', 'icons', 'FlagIcon');
const FLAGS_DIR = path.join(FLAG_ICON_DIR, 'icons');
const REGISTRY_PATH = path.join(FLAG_ICON_DIR, 'flag-registry.tsx');
const TYPES_PATH = path.join(FLAG_ICON_DIR, 'FlagIcon.types.ts');

const require = createRequire(import.meta.url);
const countries = require('i18n-iso-countries');
const enLocale = require('i18n-iso-countries/langs/en.json');
countries.registerLocale(enLocale);

/**
 * Build a map from ISO alpha-2 codes to country names
 */
const buildAlpha2ToName = () => {
  const map = new Map();
  const names = countries.getNames('en');

  for (const [alpha2, name] of Object.entries(names)) {
    map.set(alpha2.toLowerCase(), name.toLowerCase());
  }

  return map;
};

/**
 * Extract the key part from a flag component name
 * e.g., "FlagAfIcon" -> "Af", "FlagAbkhaziaIcon" -> "Abkhazia"
 */
const extractKeyFromComponentName = (componentName) => {
  const match = componentName.match(/^Flag(.+)Icon$/);
  if (!match) return null;
  return match[1];
};

/**
 * Convert a key to a display name (for use in the registry)
 */
const keyToDisplayName = (key, alpha2ToName) => {
  const lowerKey = key.toLowerCase();

  if (lowerKey.length === 2 && alpha2ToName.has(lowerKey)) {
    return alpha2ToName.get(lowerKey);
  }

  return key
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .toLowerCase();
};

/**
 * Extract SVG content from a flag component's JSX body.
 * @param {string} body - The function body (JSX text)
 * @returns {string} - The <svg>...</svg> markup
 */
function extractSvgFromBody(body) {
  const match = body.match(/<svg[\s\S]*<\/svg>/);
  if (!match) throw new Error('Could not extract <svg> from component body');
  return match[0];
}

/**
 * Parse SVG string, apply React transforms, and render as createElement.
 * @param {string} svgString
 * @returns {string}
 */
function svgToFlagCreateElement(svgString) {
  // Strip xmlns (not needed in React)
  let cleaned = svgString.replace(/\s*xmlns="http:\/\/www\.w3\.org\/2000\/svg"/g, '');

  const nodes = parseSvgToTree(cleaned);
  if (nodes.length !== 1 || nodes[0].tag !== 'svg') {
    throw new Error('Expected single root <svg>');
  }

  // Convert kebab-case attrs to camelCase throughout tree
  walkTree(nodes, (node) => {
    const newAttrs = {};
    for (const [k, v] of Object.entries(node.attrs)) {
      newAttrs[attrToReactProp(k)] = v;
    }
    node.attrs = newAttrs;
  });

  return nodeToCreateElement(nodes[0], 4);
}

// Read all flag icon files
if (!fs.existsSync(FLAGS_DIR)) {
  console.error(`Flags directory not found: ${FLAGS_DIR}`);
  console.error('Run npm run generate:icons first to generate flag icon files.');
  process.exit(1);
}

const flagFiles = fs.readdirSync(FLAGS_DIR)
  .filter(f => f.endsWith('.tsx') && f !== 'index.ts' && f !== 'all.tsx')
  .sort();

const allTsPath = path.join(FLAGS_DIR, 'all.ts');
const allTsxPath = path.join(FLAGS_DIR, 'all.tsx');

if (flagFiles.length === 0) {
  if (fs.existsSync(allTsPath)) {
    console.log('Flag icons already consolidated into all.ts.');
  } else if (fs.existsSync(allTsxPath)) {
    console.log('Migrating all.tsx → all.ts (createElement)...');
    // Migrate existing all.tsx to all.ts
    const allContent = fs.readFileSync(allTsxPath, 'utf-8');
    const components = allContent.split(/(?=export const \w+Icon)/).filter(s => s.startsWith('export'));

    const converted = [];
    for (const comp of components) {
      const nameMatch = comp.match(/export const (\w+Icon)/);
      if (!nameMatch) continue;
      const componentName = nameMatch[1];
      const svgString = extractSvgFromBody(comp);
      const hCall = svgToFlagCreateElement(svgString);
      converted.push({ componentName, hCall });
    }

    converted.sort((a, b) => a.componentName.localeCompare(b.componentName));

    const allTs = `// This file is auto-generated. Do not edit manually.
import { createElement as h } from 'react';

import type { Props } from '../../Icon/IconWrapper.types';
import { Icon } from '../../Icon/IconWrapper';

${converted.map(({ componentName, hCall }) =>
  `export const ${componentName} = (props: Props) =>\n  h(Icon, { ...props, children:\n${hCall}\n  });`
).join('\n\n')}
`;

    fs.writeFileSync(allTsPath, allTs);
    fs.unlinkSync(allTsxPath);
    console.log(`Migrated ${converted.length} flag icons to all.ts.`);
  } else {
    console.error('No flag icon files found in flags directory.');
    process.exit(1);
  }
}

// Step 1: Consolidate individual files into all.ts
if (flagFiles.length > 0) {
  const componentData = [];

  for (const file of flagFiles) {
    const filePath = path.join(FLAGS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');

    const exportMatch = content.match(/export const (\w+Icon)\s*=\s*\(props:\s*Props\)\s*=>\s*\{([\s\S]*)\};/);
    if (!exportMatch) {
      console.warn(`Could not extract component from: ${file}`);
      continue;
    }

    const componentName = exportMatch[1];
    const functionBody = exportMatch[2].trim();
    const svgString = extractSvgFromBody(functionBody);
    const hCall = svgToFlagCreateElement(svgString);

    componentData.push({ componentName, hCall });
  }

  componentData.sort((a, b) => a.componentName.localeCompare(b.componentName));

  const allTs = `// This file is auto-generated. Do not edit manually.
import { createElement as h } from 'react';

import type { Props } from '../../Icon/IconWrapper.types';
import { Icon } from '../../Icon/IconWrapper';

${componentData.map(({ componentName, hCall }) =>
  `export const ${componentName} = (props: Props) =>\n  h(Icon, { ...props, children:\n${hCall}\n  });`
).join('\n\n')}
`;

  fs.writeFileSync(allTsPath, allTs);
  console.log(`Consolidated ${componentData.length} flag icons into all.ts.`);

  // Delete individual .tsx files
  for (const file of flagFiles) {
    fs.unlinkSync(path.join(FLAGS_DIR, file));
  }
  console.log(`Deleted ${flagFiles.length} individual flag icon files.`);

  // Delete old all.tsx if it exists
  if (fs.existsSync(allTsxPath)) {
    fs.unlinkSync(allTsxPath);
  }

  // Delete index.ts if it exists
  const indexPath = path.join(FLAGS_DIR, 'index.ts');
  if (fs.existsSync(indexPath)) {
    fs.unlinkSync(indexPath);
  }
}

// Step 2: Generate registry and types from all.ts
const sourceFile = fs.existsSync(allTsPath) ? allTsPath : allTsxPath;
if (!fs.existsSync(sourceFile)) {
  console.error('all.ts not found after consolidation.');
  process.exit(1);
}

const allContent = fs.readFileSync(sourceFile, 'utf-8');
const exportRegex = /export const (\w+Icon)\b/g;
const alpha2ToName = buildAlpha2ToName();
const registryEntries = [];

let match;
while ((match = exportRegex.exec(allContent)) !== null) {
  const componentName = match[1];
  const key = extractKeyFromComponentName(componentName);

  if (!key) {
    console.warn(`Could not extract key from: ${componentName}`);
    continue;
  }

  const displayName = keyToDisplayName(key, alpha2ToName);

  registryEntries.push({
    displayName,
    componentName,
    key: key.toLowerCase(),
  });
}

// Sort by display name
registryEntries.sort((a, b) => a.displayName.localeCompare(b.displayName));

// Generate flag-registry.tsx
const generateFlagRegistry = () => {
  const lookupEntries = registryEntries
    .map(({ displayName, componentName }) => `  '${displayName.replace(/'/g, "\\'")}': '${componentName}',`)
    .join('\n');

  return [
    '// This file is auto-generated. Do not edit manually.',
    '// Run: node scripts/generate-flags-icons.mjs',
    '',
    "import { lazy } from 'react';",
    "import type { LazyExoticComponent, ComponentType } from 'react';",
    '',
    "import type { Props } from '../Icon/IconWrapper.types';",
    '',
    '// eslint-disable-next-line @typescript-eslint/no-explicit-any',
    'type AllModule = Record<string, ComponentType<any>>;',
    '',
    'let moduleCache: AllModule | null = null;',
    'let loadPromise: Promise<AllModule> | null = null;',
    '',
    'function loadModule(): Promise<AllModule> {',
    "  if (moduleCache) return Promise.resolve(moduleCache);",
    '  if (!loadPromise) {',
    "    loadPromise = import('./icons/all').then(m => {",
    '      moduleCache = m as AllModule;',
    '      return moduleCache;',
    '    });',
    '  }',
    '  return loadPromise;',
    '}',
    '',
    'const lookup: Record<string, string> = {',
    lookupEntries,
    '};',
    '',
    'const lazyCache: Record<string, LazyExoticComponent<ComponentType<Props>>> = {};',
    '',
    'export function getFlagSync(key: string): ComponentType<Props> | null {',
    '  const componentName = lookup[key];',
    '  if (!componentName || !moduleCache) return null;',
    '  return (moduleCache[componentName] as ComponentType<Props>) || null;',
    '}',
    '',
    'export function getFlagLazy(key: string): LazyExoticComponent<ComponentType<Props>> | null {',
    '  const componentName = lookup[key];',
    '  if (!componentName) return null;',
    '  if (!lazyCache[key]) {',
    '    lazyCache[key] = lazy(() =>',
    '      loadModule().then(mod => ({',
    '        default: mod[componentName] as ComponentType<Props>,',
    '      }))',
    '    );',
    '  }',
    '  return lazyCache[key];',
    '}',
    '',
    'export function hasFlag(key: string): boolean {',
    '  return key in lookup;',
    '}',
    '',
  ].join('\n');
};

// Generate FlagIcon.types.ts
const generateFlagTypes = () => {
  const countryCodes = registryEntries
    .map(({ displayName }) => `  | '${displayName.replace(/'/g, "\\'")}'`)
    .join('\n');

  return [
    "import type { SVGProps } from 'react';",
    '',
    '/**',
    ' * Available country/region codes for flag icons',
    ' */',
    'export type CountryCode =',
    countryCodes + ';',
    '',
    "export interface FlagIconProps extends Omit<SVGProps<SVGSVGElement>, 'children' | 'cursor' | 'focusable'> {",
    '  /**',
    '   * Country or region name',
    '   */',
    '  country: CountryCode;',
    '  /**',
    '   * Icon size in pixels',
    '   * @default 24',
    '   */',
    '  size?: number;',
    '  /**',
    '   * Additional CSS class name',
    '   */',
    '  className?: string;',
    '}',
    '',
  ].join('\n');
};

fs.mkdirSync(FLAG_ICON_DIR, { recursive: true });
fs.writeFileSync(REGISTRY_PATH, generateFlagRegistry());
fs.writeFileSync(TYPES_PATH, generateFlagTypes());

console.log(`Generated flag-registry.tsx with ${registryEntries.length} flags.`);
console.log(`Generated FlagIcon.types.ts in src/components/icons/FlagIcon/.`);
