import fs from 'node:fs';
import path from 'node:path';

/**
 * Generate ui-icon-registry.tsx with per-CATEGORY lazy loading.
 *
 * Instead of creating a React.lazy() wrapper per icon (~2500),
 * this generates a lookup table + per-category importers (~18).
 * Once any icon from a category loads, all icons in that category
 * render synchronously.
 */

const ROOT = process.cwd();
const ICONS_DIR = path.join(ROOT, 'src', 'components', 'icons', 'Icon', 'icons');
const OUTPUT_PATH = path.join(ROOT, 'src', 'components', 'icons', 'Icon', 'ui-icon-registry.tsx');

// Categories to exclude (they have their own components)
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
 * Scan consolidated category .tsx files and collect all icon exports
 */
function collectIcons() {
  const icons = [];
  const seenRegistryKeys = new Map();
  const seenComponentNames = new Map();

  const categoryFiles = fs.readdirSync(ICONS_DIR)
    .filter(f => f.endsWith('.tsx'))
    .filter(f => {
      const category = f.replace('.tsx', '');
      return !EXCLUDED_CATEGORIES.includes(category);
    });

  const duplicates = [];

  for (const file of categoryFiles) {
    const category = file.replace('.tsx', '');
    const filePath = path.join(ICONS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');

    // Parse exported component names from the consolidated file
    const exportRegex = /export const (\w+Icon)\b/g;
    let match;
    while ((match = exportRegex.exec(content)) !== null) {
      const componentName = match[1];
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
        importPath: `./icons/${category}`,
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
 * Generate the registry file content with per-category lazy loading
 */
function generateRegistry(icons) {
  // Collect unique categories
  const categories = [...new Set(icons.map(i => i.category))].sort();

  // Build category importers
  const categoryImporterEntries = categories
    .map(cat => `  '${cat}': () => import('./icons/${cat}'),`)
    .join('\n');

  // Build lookup table: registryKey -> [category, componentName]
  const lookupEntries = icons
    .map(({ registryKey, category, componentName }) =>
      `  '${registryKey}': ['${category}', '${componentName}'],`)
    .join('\n');

  return `// This file is auto-generated. Do not edit manually.
// Run: npm run generate:ui-icon-registry

import { lazy } from 'react';
import type { LazyExoticComponent, ComponentType } from 'react';

import type { Props as IconProps } from './IconWrapper.types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CategoryModule = Record<string, ComponentType<any>>;

/** 카테고리 모듈 캐시: 로드된 카테고리 모듈 저장 */
const categoryModuleCache: Record<string, CategoryModule> = {};
const categoryLoadPromises: Record<string, Promise<CategoryModule>> = {};

/** 카테고리별 동적 import 함수 (${categories.length}개) */
const categoryImporters: Record<string, () => Promise<CategoryModule>> = {
${categoryImporterEntries}
};

/** 아이콘 조회 테이블: registryKey -> [category, componentName] */
const iconLookup: Record<string, [string, string]> = {
${lookupEntries}
};

/** 카테고리 모듈을 로드하고 캐시 */
function loadCategory(category: string): Promise<CategoryModule> {
  if (categoryModuleCache[category]) return Promise.resolve(categoryModuleCache[category]);
  if (!categoryLoadPromises[category]) {
    const importer = categoryImporters[category];
    if (!importer) return Promise.reject(new Error(\`Unknown category: \${category}\`));
    categoryLoadPromises[category] = importer().then(mod => {
      categoryModuleCache[category] = mod as CategoryModule;
      return categoryModuleCache[category];
    });
  }
  return categoryLoadPromises[category];
}

/** 동기 조회: 카테고리가 이미 로드된 경우 아이콘 반환 */
export function getIconSync(registryKey: string): ComponentType<IconProps> | null {
  const info = iconLookup[registryKey];
  if (!info) return null;
  const [category, componentName] = info;
  const mod = categoryModuleCache[category];
  if (!mod) return null;
  return (mod[componentName] as ComponentType<IconProps>) || null;
}

/** lazy 컴포넌트 캐시: 동일 아이콘에 대해 stable reference 유지 */
const lazyCache: Record<string, LazyExoticComponent<ComponentType<IconProps>>> = {};

/** lazy 조회: 카테고리가 아직 로드되지 않은 경우 lazy 컴포넌트 반환 */
export function getIconLazy(registryKey: string): LazyExoticComponent<ComponentType<IconProps>> | null {
  const info = iconLookup[registryKey];
  if (!info) return null;

  if (!lazyCache[registryKey]) {
    const [category, componentName] = info;
    lazyCache[registryKey] = lazy(() =>
      loadCategory(category).then(mod => ({
        default: mod[componentName] as ComponentType<IconProps>,
      }))
    );
  }
  return lazyCache[registryKey];
}

/** 아이콘 존재 여부 확인 */
export function hasIcon(registryKey: string): boolean {
  return registryKey in iconLookup;
}

/** ComponentName → kebab display name: 'ArrowDownIcon' → 'arrow-down' */
function toDisplayName(componentName: string): string {
  return componentName
    .replace(/Icon$/, '')
    .replace(/^_/, '')
    .replace(/([a-z])([A-Z0-9])/g, '$1-$2')
    .replace(/([0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

/** 카테고리별 아이콘 display name 목록 (fill 변형 제외) */
let _categoryIconNames: Record<string, string[]> | null = null;
export function getIconNamesByCategory(): Record<string, string[]> {
  if (_categoryIconNames) return _categoryIconNames;
  const result: Record<string, string[]> = {};
  for (const [registryKey, [category, componentName]] of Object.entries(iconLookup)) {
    if (registryKey.endsWith('fill')) continue;
    if (!result[category]) result[category] = [];
    result[category].push(toDisplayName(componentName));
  }
  for (const names of Object.values(result)) names.sort();
  _categoryIconNames = result;
  return result;
}
`;
}

// Main
const icons = collectIcons();
const content = generateRegistry(icons);

fs.writeFileSync(OUTPUT_PATH, content);

const categories = [...new Set(icons.map(i => i.category))];
console.log(`Generated ui-icon-registry.tsx: ${icons.length} icons across ${categories.length} categories (per-category lazy loading).`);
