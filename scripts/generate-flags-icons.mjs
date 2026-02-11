import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

/**
 * Consolidate individual flag icon files into a single all.tsx,
 * then generate flag-registry.tsx and FlagIcon.types.ts.
 *
 * This script:
 * 1. Reads all individual flag icon .tsx files
 * 2. Extracts component bodies and consolidates into icons/all.tsx
 * 3. Deletes individual .tsx files
 * 4. Generates registry with lazy imports from all.tsx
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

// Read all flag icon files
if (!fs.existsSync(FLAGS_DIR)) {
  console.error(`Flags directory not found: ${FLAGS_DIR}`);
  console.error('Run npm run generate:icons first to generate flag icon files.');
  process.exit(1);
}

const flagFiles = fs.readdirSync(FLAGS_DIR)
  .filter(f => f.endsWith('.tsx') && f !== 'index.ts' && f !== 'all.tsx')
  .sort();

if (flagFiles.length === 0) {
  // Check if all.tsx already exists (already consolidated)
  if (fs.existsSync(path.join(FLAGS_DIR, 'all.tsx'))) {
    console.log('Flag icons already consolidated into all.tsx.');
  } else {
    console.error('No flag icon files found in flags directory.');
    process.exit(1);
  }
}

// Step 1: Consolidate individual files into all.tsx
if (flagFiles.length > 0) {
  const componentBodies = [];

  for (const file of flagFiles) {
    const filePath = path.join(FLAGS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');

    // Extract the component function (everything after imports)
    const exportMatch = content.match(/export const (\w+Icon)\s*=\s*\(props:\s*Props\)\s*=>\s*\{([\s\S]*)\};/);
    if (!exportMatch) {
      console.warn(`Could not extract component from: ${file}`);
      continue;
    }

    const componentName = exportMatch[1];
    let functionBody = exportMatch[2].trim();
    functionBody = functionBody.replace(/\s*xmlns="http:\/\/www\.w3\.org\/2000\/svg"/g, '');

    componentBodies.push({ componentName, functionBody });
  }

  // Sort alphabetically
  componentBodies.sort((a, b) => a.componentName.localeCompare(b.componentName));

  // Generate consolidated all.tsx
  const allComponents = componentBodies.map(({ componentName, functionBody }) => {
    return `export const ${componentName} = (props: Props) => {
  ${functionBody}
};`;
  }).join('\n\n');

  const allTsx = `// This file is auto-generated. Do not edit manually.
import type { Props } from '../../Icon/IconWrapper.types';

import { Icon } from '../../Icon/IconWrapper';

${allComponents}
`;

  fs.writeFileSync(path.join(FLAGS_DIR, 'all.tsx'), allTsx);
  console.log(`Consolidated ${componentBodies.length} flag icons into all.tsx.`);

  // Step 2: Delete individual .tsx files
  for (const file of flagFiles) {
    fs.unlinkSync(path.join(FLAGS_DIR, file));
  }
  console.log(`Deleted ${flagFiles.length} individual flag icon files.`);

  // Delete index.ts if it exists
  const indexPath = path.join(FLAGS_DIR, 'index.ts');
  if (fs.existsSync(indexPath)) {
    fs.unlinkSync(indexPath);
  }
}

// Step 3: Generate registry and types from all.tsx
const allTsxPath = path.join(FLAGS_DIR, 'all.tsx');
if (!fs.existsSync(allTsxPath)) {
  console.error('all.tsx not found after consolidation.');
  process.exit(1);
}

const allContent = fs.readFileSync(allTsxPath, 'utf-8');
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
