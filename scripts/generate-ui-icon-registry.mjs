import fs from 'node:fs';
import path from 'node:path';

/**
 * Generate ui-icon-registry.tsx with lazy imports for code splitting.
 *
 * This script scans all icon files in the icons directory and creates
 * a registry with React.lazy() imports for each icon.
 */

const ROOT = process.cwd();
const ICONS_DIR = path.join(ROOT, 'src', 'components', 'icons', 'Icon', 'icons');
const OUTPUT_PATH = path.join(ROOT, 'src', 'components', 'icons', 'Icon', 'ui-icon-registry.tsx');

// Categories to include (excluding flags, cursors, fileIcons which have their own components)
const EXCLUDED_CATEGORIES = ['flags', 'cursors', 'fileIcons', 'isometricIcon', 'brands', 'logos'];

/**
 * Convert PascalCase component name to registry key (lowercase, no "Icon" suffix)
 * e.g., "ArrowDownFillIcon" -> "arrowdownfill"
 */
function componentNameToRegistryKey(componentName) {
  return componentName
    .replace(/Icon$/, '')
    .toLowerCase();
}

/**
 * Scan icons directory and collect all icon files
 */
function collectIcons() {
  const icons = [];
  const seenRegistryKeys = new Map();
  const seenComponentNames = new Map();

  const categories = fs.readdirSync(ICONS_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory() && !EXCLUDED_CATEGORIES.includes(d.name))
    .map(d => d.name);

  const duplicates = [];

  for (const category of categories) {
    const categoryPath = path.join(ICONS_DIR, category);
    const files = fs.readdirSync(categoryPath)
      .filter(f => f.endsWith('.tsx') && f !== 'index.ts');

    for (const file of files) {
      const componentName = file.replace('.tsx', '');
      const registryKey = componentNameToRegistryKey(componentName);

      if (seenRegistryKeys.has(registryKey)) {
        const existing = seenRegistryKeys.get(registryKey);
        duplicates.push({
          type: 'registryKey',
          key: registryKey,
          locations: [
            { componentName: existing.componentName, category: existing.category },
            { componentName, category },
          ],
        });
      } else {
        seenRegistryKeys.set(registryKey, { componentName, category });
      }

      if (seenComponentNames.has(componentName)) {
        const existingCategory = seenComponentNames.get(componentName);
        duplicates.push({
          type: 'componentName',
          key: componentName,
          locations: [
            { category: existingCategory },
            { category },
          ],
        });
      } else {
        seenComponentNames.set(componentName, category);
      }

      icons.push({
        componentName,
        registryKey,
        category,
        importPath: `./icons/${category}/${componentName}`,
      });
    }
  }

  if (duplicates.length > 0) {
    console.error('\n❌ Duplicate icons detected:\n');
    for (const dup of duplicates) {
      console.error(`  ${dup.type}: "${dup.key}"`);
      for (const loc of dup.locations) {
        if (loc.componentName) {
          console.error(`    - ${loc.componentName} in category "${loc.category}"`);
        } else {
          console.error(`    - category "${loc.category}"`);
        }
      }
      console.error('');
    }
    console.error('Please rename conflicting icons to have unique names.\n');
    process.exit(1);
  }

  return icons.sort((a, b) => a.registryKey.localeCompare(b.registryKey));
}

/**
 * Generate the registry file content
 */
function generateRegistry(icons) {
  const lazyImports = icons
    .map(({ componentName, importPath }) =>
      `const ${componentName} = lazy(() => import('${importPath}').then(m => ({ default: m.${componentName} })));`
    )
    .join('\n');

  const registryEntries = icons
    .map(({ registryKey, componentName }) => `  "${registryKey}": ${componentName},`)
    .join('\n');

  return `// This file is auto-generated. Do not edit manually.
// Run: npm run generate:ui-icon-registry

import { lazy } from 'react';
import type { LazyExoticComponent, ComponentType } from 'react';

import type { Props as IconProps } from './IconWrapper.types';

${lazyImports}

export const uiIconRegistry: Record<string, LazyExoticComponent<ComponentType<IconProps>>> = {
${registryEntries}
};
`;
}

// Main
const icons = collectIcons();
const content = generateRegistry(icons);

fs.writeFileSync(OUTPUT_PATH, content);

console.log(`Generated ui-icon-registry.tsx with ${icons.length} lazy-loaded icons.`);
