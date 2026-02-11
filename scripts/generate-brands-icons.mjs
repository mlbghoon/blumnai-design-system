import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const ICONS_SOURCE_DIR = path.join(ROOT, 'src', 'icons', 'source');
const BRAND_ICON_DIR = path.join(ROOT, 'src', 'components', 'icons', 'BrandIcon');

const SNAPSHOT_PATH =
  process.argv[2] ?? path.join(ICONS_SOURCE_DIR, 'sortui.brands.json');

const OUT_DIR = path.join(BRAND_ICON_DIR, 'icons');
const REGISTRY_PATH = path.join(BRAND_ICON_DIR, 'brand-registry.tsx');
const TYPES_PATH = path.join(BRAND_ICON_DIR, 'BrandIcon.types.ts');

const isDirectory = (p) => fs.existsSync(p) && fs.statSync(p).isDirectory();

const cleanOutDir = () => {
  if (!isDirectory(OUT_DIR)) return;
  const entries = fs.readdirSync(OUT_DIR, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isFile()) continue;
    if (!entry.name.endsWith('.tsx')) continue;
    fs.unlinkSync(path.join(OUT_DIR, entry.name));
  }
};

// Convert Figma name to registry key (lowercase with spaces, matching Figma exactly)
const toRegistryKey = (raw) => {
  return String(raw)
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // strip diacritics
    .replace(/[^a-z0-9\s]+/g, '') // keep spaces
    .replace(/\s+/g, ' ')
    .trim();
};

const toPascalCase = (name) =>
  String(name)
    .trim()
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

const toValidIdentifier = (raw) => {
  const pascal = toPascalCase(raw);
  if (!pascal) return 'Unknown';
  if (/^\d/.test(pascal)) return `_${pascal}`;
  return pascal;
};

const sanitizeId = (value) => String(value).replaceAll(':', '_').replaceAll('-', '_');

const toJsxSafeSvgMarkup = (svg) => {
  let out = String(svg);

  // React expects style to be an object; Figma exports commonly include mask-type via style attribute.
  // Example: style="mask-type:luminance" => style={{ maskType: 'luminance' }}
  out = out.replace(/style="mask-type:([^"]+)"/g, (_m, maskType) => {
    return `style={{ maskType: '${String(maskType).trim()}' }}`;
  });

  // Figma also commonly uses mix-blend-mode via style attribute.
  // Example: style="mix-blend-mode:soft-light" => style={{ mixBlendMode: 'soft-light' }}
  out = out.replace(/style="mix-blend-mode:([^"]+)"/g, (_m, mode) => {
    return `style={{ mixBlendMode: '${String(mode).trim()}' }}`;
  });

  // Common SVG attribute name conversions for JSX
  const attrReplacements = [
    ['clip-rule=', 'clipRule='],
    ['fill-rule=', 'fillRule='],
    ['stroke-linecap=', 'strokeLinecap='],
    ['stroke-linejoin=', 'strokeLinejoin='],
    ['stroke-width=', 'strokeWidth='],
    ['stroke-miterlimit=', 'strokeMiterlimit='],
    ['stroke-dasharray=', 'strokeDasharray='],
    ['stroke-dashoffset=', 'strokeDashoffset='],
    ['stroke-opacity=', 'strokeOpacity='],
    ['fill-opacity=', 'fillOpacity='],
    ['stop-color=', 'stopColor='],
    ['stop-opacity=', 'stopOpacity='],
    ['flood-color=', 'floodColor='],
    ['flood-opacity=', 'floodOpacity='],
    ['color-interpolation-filters=', 'colorInterpolationFilters='],
    ['clip-path=', 'clipPath='],
    ['xmlns:xlink=', 'xmlnsXlink='],
    ['xlink:href=', 'xlinkHref='],
  ];

  for (const [from, to] of attrReplacements) {
    out = out.replaceAll(from, to);
  }

  out = out.replace(/\s*xmlns="http:\/\/www\.w3\.org\/2000\/svg"/, '');

  return out;
};

const prefixSvgIds = (svg, prefix) => {
  const idRegex = /\bid="([^"]+)"/g;
  const ids = new Set();
  for (const match of svg.matchAll(idRegex)) ids.add(match[1]);
  if (ids.size === 0) return svg;

  const map = new Map();
  for (const id of ids) {
    const safeOld = sanitizeId(id);
    map.set(id, `${prefix}__${safeOld}`);
  }

  let out = svg;
  for (const [oldId, newId] of map.entries()) {
    out = out.replaceAll(`id="${oldId}"`, `id="${newId}"`);
    out = out.replaceAll(`url(#${oldId})`, `url(#${newId})`);
    out = out.replaceAll(`href="#${oldId}"`, `href="#${newId}"`);
    out = out.replaceAll(`xlink:href="#${oldId}"`, `xlink:href="#${newId}"`);
  }

  return out;
};

if (!fs.existsSync(SNAPSHOT_PATH)) {
  console.error(`Snapshot not found: ${SNAPSHOT_PATH}`);
  process.exit(1);
}

const snapshot = JSON.parse(fs.readFileSync(SNAPSHOT_PATH, 'utf8'));
const entries = Object.entries(snapshot).sort(([a], [b]) => a.localeCompare(b));

cleanOutDir();
fs.mkdirSync(OUT_DIR, { recursive: true });

// Collect all components in memory for consolidated output
const registryEntries = [];
const componentDefs = [];

for (const [rawKey, rawSvg] of entries) {
  const [baseKey, discriminator] = String(rawKey).split('__');
  const base = String(baseKey).trim();

  const registryKey = toRegistryKey(base);

  const disc = discriminator ? `_${toValidIdentifier(discriminator)}` : '';
  const componentName = `Brand${toValidIdentifier(base)}${disc}Icon`;
  const prefixedSvg = prefixSvgIds(toJsxSafeSvgMarkup(String(rawSvg).trim()), componentName);

  componentDefs.push({ componentName, svgMarkup: prefixedSvg });

  // Deduplicate registry keys by appending discriminator suffix
  const existingEntry = registryEntries.find(e => e.brandName === registryKey);
  if (existingEntry) {
    const discKey = disc ? `${registryKey} ${disc.replace(/^_/, '').toLowerCase()}` : `${registryKey} alt`;
    registryEntries.push({ brandName: discKey, componentName });
  } else {
    registryEntries.push({ brandName: registryKey, componentName });
  }
}

// Determine chunk key from component name (letter after "Brand" prefix)
const getChunk = (componentName) => {
  const afterBrand = componentName.slice(5);
  const firstChar = afterBrand[0].toLowerCase();
  if (firstChar === 'a') return 'a';
  if (firstChar <= 'c') return 'bc';
  if (firstChar <= 'e') return 'de';
  if (firstChar <= 'g') return 'fg';
  if (firstChar <= 'm') return 'hm';
  if (firstChar <= 'p') return 'np';
  if (firstChar <= 's') return 'rs';
  return 'tz';
};

// Write per-chunk .tsx files
const sortedDefs = [...componentDefs].sort((a, b) => a.componentName.localeCompare(b.componentName));

const chunkMap = new Map();
for (const def of sortedDefs) {
  const chunk = getChunk(def.componentName);
  if (!chunkMap.has(chunk)) chunkMap.set(chunk, []);
  chunkMap.get(chunk).push(def);
}

for (const [chunk, defs] of chunkMap.entries()) {
  const components = defs.map(({ componentName, svgMarkup }) => {
    return `export const ${componentName} = (props: Props) => {
  return (
    <Icon {...props}>
      ${svgMarkup}
    </Icon>
  );
};`;
  }).join('\n\n');

  const chunkTsx = `// This file is auto-generated. Do not edit manually.
import type { Props } from '../../Icon/IconWrapper.types';

import { Icon } from '../../Icon/IconWrapper';

${components}
`;

  fs.writeFileSync(path.join(OUT_DIR, `brands-${chunk}.tsx`), chunkTsx);
}

const chunkKeys = [...chunkMap.keys()].sort();

// Generate brand-registry.tsx (per-chunk lazy loading)
const generateBrandRegistry = () => {
  registryEntries.sort((a, b) => a.brandName.localeCompare(b.brandName));

  const chunkImporterEntries = chunkKeys
    .map(ch => `  'brands-${ch}': () => import('./icons/brands-${ch}'),`)
    .join('\n');

  const lookupEntries = registryEntries
    .map(({ brandName, componentName }) => {
      const chunk = `brands-${getChunk(componentName)}`;
      return `  '${brandName}': ['${chunk}', '${componentName}'],`;
    })
    .join('\n');

  return `// This file is auto-generated. Do not edit manually.
// Run: npm run generate:brands

import { lazy } from 'react';
import type { LazyExoticComponent, ComponentType } from 'react';

import type { Props } from '../Icon/IconWrapper.types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ChunkModule = Record<string, ComponentType<any>>;

const chunkModuleCache: Record<string, ChunkModule> = {};
const chunkLoadPromises: Record<string, Promise<ChunkModule>> = {};

const chunkImporters: Record<string, () => Promise<ChunkModule>> = {
${chunkImporterEntries}
};

const iconLookup: Record<string, [string, string]> = {
${lookupEntries}
};

function loadChunk(chunk: string): Promise<ChunkModule> {
  if (chunkModuleCache[chunk]) return Promise.resolve(chunkModuleCache[chunk]);
  if (!chunkLoadPromises[chunk]) {
    const importer = chunkImporters[chunk];
    if (!importer) return Promise.reject(new Error(\`Unknown chunk: \${chunk}\`));
    chunkLoadPromises[chunk] = importer().then(mod => {
      chunkModuleCache[chunk] = mod as ChunkModule;
      return chunkModuleCache[chunk];
    });
  }
  return chunkLoadPromises[chunk];
}

const lazyCache: Record<string, LazyExoticComponent<ComponentType<Props>>> = {};

export function getBrandSync(key: string): ComponentType<Props> | null {
  const info = iconLookup[key];
  if (!info) return null;
  const [chunk, componentName] = info;
  const mod = chunkModuleCache[chunk];
  if (!mod) return null;
  return (mod[componentName] as ComponentType<Props>) || null;
}

export function getBrandLazy(key: string): LazyExoticComponent<ComponentType<Props>> | null {
  const info = iconLookup[key];
  if (!info) return null;
  if (!lazyCache[key]) {
    const [chunk, componentName] = info;
    lazyCache[key] = lazy(() =>
      loadChunk(chunk).then(mod => ({
        default: mod[componentName] as ComponentType<Props>,
      }))
    );
  }
  return lazyCache[key];
}

export function hasBrand(key: string): boolean {
  return key in iconLookup;
}
`;
};

// Generate BrandIcon.types.ts
const generateBrandTypes = () => {
  if (registryEntries.length === 0) {
    console.warn('Warning: No brand icons found. Generating empty types.');
    return [
      "import type { SVGProps } from 'react';",
      '',
      '// No brand icons found',
      'export type BrandType = never;',
      '',
      "export interface BrandIconProps extends Omit<SVGProps<SVGSVGElement>, 'children' | 'cursor' | 'focusable'> {",
      '  brandType: BrandType;',
      '  size?: number;',
      '  className?: string;',
      '}',
      '',
    ].join('\n');
  }

  const brandNames = registryEntries
    .map(({ brandName }) => `  | '${brandName}'`)
    .join('\n');

  return [
    "import type { SVGProps } from 'react';",
    '',
    '/**',
    ' * Available brand/logo types',
    ' * Names match Figma layer names exactly',
    ' */',
    'export type BrandType =',
    brandNames + ';',
    '',
    "export interface BrandIconProps extends Omit<SVGProps<SVGSVGElement>, 'children' | 'cursor' | 'focusable'> {",
    '  /**',
    '   * Brand type (matches Figma)',
    '   */',
    '  brandType: BrandType;',
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

fs.writeFileSync(REGISTRY_PATH, generateBrandRegistry());
fs.writeFileSync(TYPES_PATH, generateBrandTypes());

// Generate icons/index.ts barrel
const indexTs = chunkKeys.map(ch => `export * from './brands-${ch}';`).join('\n') + '\n';
fs.writeFileSync(path.join(OUT_DIR, 'index.ts'), indexTs);

console.log(`Generated ${entries.length} brand icons into ${chunkKeys.length} chunks (${chunkKeys.map(k => `brands-${k}.tsx`).join(', ')}).`);
console.log(`Generated brand-registry.tsx in src/components/icons/BrandIcon/.`);
console.log(`Generated BrandIcon.types.ts in src/components/icons/BrandIcon/.`);
