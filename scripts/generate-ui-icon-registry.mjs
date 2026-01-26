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

  const categories = fs.readdirSync(ICONS_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory() && !EXCLUDED_CATEGORIES.includes(d.name))
    .map(d => d.name);

  for (const category of categories) {
    const categoryPath = path.join(ICONS_DIR, category);
    const files = fs.readdirSync(categoryPath)
      .filter(f => f.endsWith('.tsx') && f !== 'index.ts');

    for (const file of files) {
      const componentName = file.replace('.tsx', '');
      const registryKey = componentNameToRegistryKey(componentName);

      icons.push({
        componentName,
        registryKey,
        category,
        importPath: `./icons/${category}/${componentName}`,
      });
    }
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
