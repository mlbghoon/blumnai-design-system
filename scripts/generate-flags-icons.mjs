import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

/**
 * Generate flag-registry.tsx and FlagIcon.types.ts based on existing flag icon files.
 *
 * This script reads the actual generated flag icon files from the icons directory
 * and creates a registry that maps country codes/names to components.
 *
 * It does NOT generate the icon files themselves - that's done by generate-icons.mjs
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
  const names = countries.getNames('en'); // { US: 'United States', ... }

  for (const [alpha2, name] of Object.entries(names)) {
    map.set(alpha2.toLowerCase(), name.toLowerCase());
  }

  return map;
};

/**
 * Extract the key part from a flag component name
 * e.g., "FlagAfIcon" -> "af", "FlagAbkhaziaIcon" -> "abkhazia"
 */
const extractKeyFromComponentName = (componentName) => {
  // Remove "Flag" prefix and "Icon" suffix
  const match = componentName.match(/^Flag(.+)Icon$/);
  if (!match) return null;

  // Convert to lowercase
  return match[1].toLowerCase();
};

/**
 * Convert a key to a display name (for use in the registry)
 * - If it's an ISO code, get the full country name
 * - Otherwise, add spaces before capital letters and use as-is
 */
const keyToDisplayName = (key, alpha2ToName) => {
  // Check if it's a 2-letter ISO code
  if (key.length === 2 && alpha2ToName.has(key)) {
    return alpha2ToName.get(key);
  }

  // For non-ISO codes (like "abkhazia", "basquecountry"),
  // add spaces before capital letters in the original and make lowercase
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
  .filter(f => f.endsWith('.tsx') && f !== 'index.ts')
  .sort();

if (flagFiles.length === 0) {
  console.error('No flag icon files found in flags directory.');
  process.exit(1);
}

const alpha2ToName = buildAlpha2ToName();
const registryEntries = [];

for (const file of flagFiles) {
  const componentName = file.replace('.tsx', '');
  const key = extractKeyFromComponentName(componentName);

  if (!key) {
    console.warn(`Could not extract key from: ${componentName}`);
    continue;
  }

  const displayName = keyToDisplayName(key, alpha2ToName);

  registryEntries.push({
    displayName,
    componentName,
    key,
  });
}

// Sort by display name
registryEntries.sort((a, b) => a.displayName.localeCompare(b.displayName));

// Generate flag-registry.tsx
const generateFlagRegistry = () => {
  const lazyImports = registryEntries
    .map(({ componentName }) =>
      `const ${componentName} = lazy(() => import('./icons/${componentName}').then(m => ({ default: m.${componentName} })));`
    )
    .join('\n');

  const registryObject = registryEntries
    .map(({ displayName, componentName }) => `  '${displayName}': ${componentName},`)
    .join('\n');

  return [
    '// This file is auto-generated. Do not edit manually.',
    '// Run: node scripts/generate-flags-icons.mjs',
    '',
    "import React, { lazy } from 'react';",
    '',
    "import type { Props } from '../Icon/IconWrapper.types';",
    '',
    lazyImports,
    '',
    'export const flagRegistry: Record<string, React.LazyExoticComponent<React.ComponentType<Props>>> = {',
    registryObject,
    '};',
    '',
  ].join('\n');
};

// Generate FlagIcon.types.ts
const generateFlagTypes = () => {
  const countryCodes = registryEntries
    .map(({ displayName }) => `  | '${displayName}'`)
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
