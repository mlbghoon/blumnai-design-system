#!/usr/bin/env node

/**
 * IconLoader 컴포넌트를 위한 아이콘 레지스트리 생성.
 * 
 * 이 스크립트는:
 * 1. 모든 아이콘 컴포넌트 파일을 스캔
 * 2. 케밥 케이스 이름을 지연 로드 컴포넌트에 매핑하는 레지스트리 생성
 * 3. src/icons/icon-registry.tsx 생성
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const ICONS_DIR = path.join(ROOT, 'src', 'icons');
const SOURCE_DIR = path.join(ICONS_DIR, 'source');
const OVERRIDES_PATH = path.join(ROOT, 'scripts', 'flags.overrides.json');
const require = createRequire(import.meta.url);

const EXCLUDE_FILES = [
  'Icon.tsx',
  'Icon.types.ts',
  'index.ts',
  'Icons.stories.tsx',
  'IconLoader.tsx',
  'icon-registry.tsx',
];

const CATEGORIES = [
  'arrows',
  'brands',
  'buildings',
  'business',
  'communication',
  'cursors',
  'design',
  'development',
  'device',
  'document',
  'editor',
  'fileIcons',
  'finance',
  'flags',
  'food',
  'health & medical',
  'isometricIcon',
  'logos',
  'map',
  'media',
  'others',
  'system',
  'user & faces',
  'weather',
];

/**
 * PascalCase 컴포넌트 이름을 "-icon" 접미사가 있는 케밥 케이스로 변환
 * @param {string} componentName - 예: "FileCodeSmIcon", "ArrowDownIcon"
 * @returns {string} - 예: "file-code-sm-icon", "arrow-down-icon"
 */
function componentNameToKebabCase(componentName) {
  let baseName = componentName.replace(/Icon$/, '');
  
  const kebab = baseName
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
  
  return `${kebab}-icon`;
}

/**
 * IconLoader에서 사용 가능한 형식으로 Figma 이름 정규화
 * 공백을 언더스코어로 변환하고 대소문자 등을 처리합니다.
 * @param {string} figmaName - 예: "VIRGIN ISLANDS", "arrow down", "virgin islands"
 * @returns {string} - 예: "virgin_islands", "arrow_down"
 */
function normalizeFigmaName(figmaName) {
  return String(figmaName)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/[^a-z0-9_]/g, '')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '');
}

/**
 * Figma 이름을 잠재적 컴포넌트 이름 패턴으로 변환
 * Figma 이름을 실제 컴포넌트 이름과 매칭하는 데 도움이 됩니다.
 */
function figmaNameToComponentPatterns(figmaName, category) {
  const normalized = normalizeFigmaName(figmaName);
  const patterns = [];
  
  if (category === 'flags') {
    patterns.push(normalized);
    return patterns;
  }
  
  let base = normalized.replace(/_fill$|_line$|_t$/, '');
  
  const kebab = base.replace(/_/g, '-');
  patterns.push(kebab);
  patterns.push(base);
  
  return patterns;
}

/**
 * import를 위한 카테고리 경로 가져오기
 */
function getCategoryPath(category) {
  if (category.includes(' ')) {
    return `'./${category}'`;
  }
  return `'./${category}'`;
}

/**
 * 소스 JSON 파일에서 Figma 이름 로드
 * 정규화된 Figma 이름을 원본 이름에 매핑하는 맵을 반환합니다.
 */
function loadFigmaNames() {
  const figmaNames = new Map();
  
  const categoryToSourcePattern = {
    'arrows': ['remix.arrows.line.json', 'remix.arrows.fill.json'],
    'flags': ['sortui.flags.json'],
    'brands': ['sortui.brands.json'],
    'fileIcons': ['sortui.file-icons.json'],
    'cursors': ['sortui.cursors.json'],
    'buildings': ['remix.buildings.line.json', 'remix.buildings.fill.json'],
    'business': ['remix.business.line.json', 'remix.business.fill.json'],
    'communication': ['remix.communication.line.json', 'remix.communication.fill.json'],
    'design': ['remix.design.line.json', 'remix.design.fill.json'],
    'development': ['remix.development.line.json', 'remix.development.fill.json'],
    'device': ['remix.device.line.json', 'remix.device.fill.json'],
    'document': ['remix.document.line.json', 'remix.document.fill.json'],
    'editor': ['remix.editor.json', 'remix.editor.line.json', 'remix.editor.fill.json'],
    'finance': ['remix.finance.line.json', 'remix.finance.fill.json'],
    'food': ['remix.food.line.json', 'remix.food.fill.json'],
    'health & medical': ['remix.health & medical.line.json', 'remix.health & medical.fill.json'],
    'logos': ['remix.logos.line.json', 'remix.logos.fill.json'],
    'map': ['remix.map.line.json', 'remix.map.fill.json'],
    'media': ['remix.media.line.json', 'remix.media.fill.json'],
    'others': ['remix.others.line.json', 'remix.others.fill.json'],
    'system': ['remix.system.line.json', 'remix.system.fill.json'],
    'user & faces': ['remix.user & faces.line.json', 'remix.user & faces.fill.json'],
    'weather': ['remix.weather.line.json', 'remix.weather.fill.json'],
  };
  
  // Read all source files
  for (const [category, patterns] of Object.entries(categoryToSourcePattern)) {
    for (const pattern of patterns) {
      const sourcePath = path.join(SOURCE_DIR, pattern);
      if (!fs.existsSync(sourcePath)) continue;
      
      try {
        const sourceData = JSON.parse(fs.readFileSync(sourcePath, 'utf-8'));
        for (const [figmaName] of Object.entries(sourceData)) {
          const normalized = normalizeFigmaName(figmaName);
          if (!figmaNames.has(normalized)) {
            figmaNames.set(normalized, { original: figmaName, category });
          }
        }
      } catch (error) {
        console.warn(`⚠️  Could not read ${sourcePath}: ${error.message}`);
      }
    }
  }
  
  return figmaNames;
}

/**
 * 생성 프로세스를 시뮬레이션하여 Figma 이름을 컴포넌트 이름에 매핑하는 맵 생성
 * 플래그의 경우: 국가 코드 조회 사용 (generate-flags-icons.mjs와 동일)
 * 기타의 경우: 케밥 케이스 패턴으로 매칭
 */
function buildFigmaToComponentMap(allIcons, figmaNames) {
  const figmaToComponent = new Map();
  
  const flagsSourcePath = path.join(SOURCE_DIR, 'sortui.flags.json');
  if (fs.existsSync(flagsSourcePath)) {
    try {
      const countries = require('i18n-iso-countries');
      const enLocale = require('i18n-iso-countries/langs/en.json');
      countries.registerLocale(enLocale);
      
      const overrides = fs.existsSync(OVERRIDES_PATH) 
        ? JSON.parse(fs.readFileSync(OVERRIDES_PATH, 'utf-8'))
        : {};
      
      const nameToCode = new Map();
      const countryNames = countries.getNames('en');
      for (const [code, name] of Object.entries(countryNames)) {
        const normalized = normalizeFigmaName(name);
        if (!nameToCode.has(normalized)) {
          nameToCode.set(normalized, code);
        }
      }
      for (const [name, code] of Object.entries(overrides)) {
        const normalized = normalizeFigmaName(name);
        nameToCode.set(normalized, code);
      }
      
      const flagsData = JSON.parse(fs.readFileSync(flagsSourcePath, 'utf-8'));
      for (const [figmaName] of Object.entries(flagsData)) {
        const normalized = normalizeFigmaName(figmaName);
        const code = nameToCode.get(normalized);
        if (code) {
          const codeForComponent = code.replace(/-/g, '');
          const componentName = `Flag${codeForComponent.charAt(0).toUpperCase()}${codeForComponent.slice(1).toLowerCase()}Icon`;
          const icon = allIcons.find(i => i.componentName === componentName);
          if (icon) {
            figmaToComponent.set(normalized, icon.componentName);
          }
        }
      }
    } catch (error) {
      console.warn(`⚠️  Could not build flag mappings: ${error.message}`);
    }
  }
  
  for (const icon of allIcons) {
    if (icon.category === 'flags') continue;
    
    const baseName = icon.componentName.replace(/Icon$/, '').toLowerCase();
    const kebabPattern = baseName.replace(/_/g, '-');
    const underscorePattern = baseName.replace(/-/g, '_');
    
    if (figmaNames.has(kebabPattern)) {
      figmaToComponent.set(kebabPattern, icon.componentName);
    } else if (figmaNames.has(underscorePattern)) {
      figmaToComponent.set(underscorePattern, icon.componentName);
    } else if (figmaNames.has(baseName)) {
      figmaToComponent.set(baseName, icon.componentName);
    }
    
    const withoutSuffix = baseName.replace(/-fill$|-line$|-fill-icon$|-line-icon$/, '');
    if (withoutSuffix !== baseName && figmaNames.has(withoutSuffix)) {
      figmaToComponent.set(withoutSuffix, icon.componentName);
    }
  }
  
  return figmaToComponent;
}

/**
 * 카테고리 디렉토리에서 아이콘 파일 스캔
 */
function scanCategory(category) {
  const categoryDir = path.join(ICONS_DIR, category);
  if (!fs.existsSync(categoryDir)) {
    return [];
  }

  const files = fs.readdirSync(categoryDir);
  const icons = [];

  for (const file of files) {
    if (EXCLUDE_FILES.includes(file) || !file.endsWith('Icon.tsx')) {
      continue;
    }

    const componentName = file.replace('.tsx', '');
    const kebabName = componentNameToKebabCase(componentName);
    
    icons.push({
      componentName,
      kebabName,
      category,
      file: file.replace('.tsx', ''),
    });
  }

  return icons;
}

/**
 * Generate icon registry file
 */
async function generateRegistry() {
  console.log('🔍 Loading Figma source names...');
  const figmaNames = loadFigmaNames();
  console.log(`✅ Loaded ${figmaNames.size} Figma names from source files`);
  
  console.log('🔍 Scanning icon files...');
  
  const allIcons = [];
  
  for (const category of CATEGORIES) {
    const icons = scanCategory(category);
    allIcons.push(...icons);
  }

  console.log(`✅ Found ${allIcons.length} icons`);

  console.log('🔍 Building Figma name mappings...');
  const figmaToComponent = await buildFigmaToComponentMap(allIcons, figmaNames);
  console.log(`✅ Mapped ${figmaToComponent.size} Figma names to components`);

  allIcons.sort((a, b) => a.kebabName.localeCompare(b.kebabName));

  const imports = new Map();
  const registryEntries = [];

  for (const icon of allIcons) {
    if (!imports.has(icon.category)) {
      imports.set(icon.category, new Set());
    }
    imports.get(icon.category).add(icon.componentName);
    
    registryEntries.push({
      kebabName: icon.kebabName,
      category: icon.category,
      componentName: icon.componentName,
    });
  }

  const lazyImports = [];
  for (const icon of allIcons) {
    const filePath = icon.category.includes(' ') 
      ? `'./${icon.category}/${icon.componentName}.tsx'`
      : `'./${icon.category}/${icon.componentName}.tsx'`;
    
    lazyImports.push(
      `const ${icon.componentName} = lazy(() => import(${filePath}).then(m => ({ default: m.${icon.componentName} })));`
    );
  }
  
  lazyImports.sort();

  const registryMap = new Map();
  
  for (const entry of registryEntries) {
    registryMap.set(entry.kebabName, entry.componentName);
  }
  
  for (const [figmaName, componentName] of figmaToComponent.entries()) {
    if (!registryMap.has(figmaName)) {
      registryMap.set(figmaName, componentName);
    }
  }
  
  const allTypeNames = Array.from(registryMap.keys()).sort();
  const iconTypes = allTypeNames.map(name => `  | '${name}'`).join('\n');
  
  const registryObject = Array.from(registryMap.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([name, component]) => `  '${name}': ${component},`)
    .join('\n');

  const content = `// This file is auto-generated. Do not edit manually.
// Run: npm run generate:icon-registry

import { lazy } from 'react';

${lazyImports.join('\n')}

/**
 * Icon registry mapping icon names to lazy-loaded icon components.
 * 
 * Supports both:
 * - Kebab-case names (e.g., "arrow-down-icon", "file-code-sm-icon")
 * - Figma names with underscores (e.g., "virgin_islands", "arrow_down")
 * 
 * @example
 * import { IconLoader } from 'blumnai-design-system';
 * 
 * // Using kebab-case (current format)
 * <IconLoader type="file-code-sm-icon" size={24} title="Code" />
 * <IconLoader type="arrow-down-icon" size={24} />
 * 
 * // Using Figma names (spaces converted to underscores)
 * <IconLoader type="virgin_islands" size={24} />
 * <IconLoader type="arrow_down" size={24} />
 */
export const iconRegistry = {
${registryObject}
} as const;

/**
 * Type for valid icon type strings.
 */
export type IconType =
${iconTypes};

/**
 * Get all available icon type names.
 */
export function getAvailableIconTypes(): IconType[] {
  return Object.keys(iconRegistry) as IconType[];
}
`;

  const outputPath = path.join(ICONS_DIR, 'icon-registry.tsx');
  fs.writeFileSync(outputPath, content, 'utf-8');
  
  const figmaAliasCount = Array.from(registryMap.keys()).filter(key => 
    !registryEntries.some(e => e.kebabName === key)
  ).length;
  
  console.log(`✅ Generated icon registry: ${outputPath}`);
  console.log(`   - ${allIcons.length} icons registered`);
  console.log(`   - ${registryMap.size} total registry entries (including Figma name aliases)`);
  console.log(`   - ${figmaAliasCount} Figma name aliases added`);
  console.log(`   - ${imports.size} categories`);
}

generateRegistry().catch(error => {
  console.error('❌ Error generating registry:', error);
  process.exit(1);
});
