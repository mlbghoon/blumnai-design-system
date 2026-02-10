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

const makeCategoryComponentTsx = (componentName, svgMarkup) => {
  return [
    "import type { Props } from '../../Icon/IconWrapper.types';",
    '',
    "import { Icon } from '../../Icon/IconWrapper';",
    '',
    `export const ${componentName} = (props: Props) => {`,
    '  return (',
    '    <Icon {...props}>',
    `      ${svgMarkup}`,
    '    </Icon>',
    '  );',
    '};',
    '',
  ].join('\n');
};

if (!fs.existsSync(SNAPSHOT_PATH)) {
  console.error(`Snapshot not found: ${SNAPSHOT_PATH}`);
  process.exit(1);
}

const snapshot = JSON.parse(fs.readFileSync(SNAPSHOT_PATH, 'utf8'));
const entries = Object.entries(snapshot).sort(([a], [b]) => a.localeCompare(b));

cleanOutDir();
fs.mkdirSync(OUT_DIR, { recursive: true });

// Track brand names to component names for registry generation
const registryEntries = [];

for (const [rawKey, rawSvg] of entries) {
  const [baseKey, discriminator] = String(rawKey).split('__');
  const base = String(baseKey).trim();

  // Use Figma name directly for registry key (lowercase with spaces)
  const registryKey = toRegistryKey(base);

  const disc = discriminator ? `_${toValidIdentifier(discriminator)}` : '';
  const componentName = `Brand${toValidIdentifier(base)}${disc}Icon`;
  const prefixedSvg = prefixSvgIds(toJsxSafeSvgMarkup(String(rawSvg).trim()), componentName);

  fs.writeFileSync(
    path.join(OUT_DIR, `${componentName}.tsx`),
    makeCategoryComponentTsx(componentName, prefixedSvg),
  );

  // Add to registry (Figma name as key -> component name)
  registryEntries.push({ brandName: registryKey, componentName });
}

// Generate brand-registry.tsx
const generateBrandRegistry = () => {
  // Sort by brand name
  registryEntries.sort((a, b) => a.brandName.localeCompare(b.brandName));

  const lazyImports = registryEntries
    .map(({ componentName }) =>
      `const ${componentName} = lazy(() => import('./icons/${componentName}').then(m => ({ default: m.${componentName} })));`
    )
    .join('\n');

  const registryObject = registryEntries
    .map(({ brandName, componentName }) => `  '${brandName}': ${componentName},`)
    .join('\n');

  return [
    '// This file is auto-generated. Do not edit manually.',
    '// Run: npm run generate:brands',
    '',
    "import { lazy } from 'react';",
    "import type { LazyExoticComponent, ComponentType } from 'react';",
    '',
    "import type { Props } from '../Icon/IconWrapper.types';",
    '',
    lazyImports,
    '',
    'export const brandRegistry: Record<string, LazyExoticComponent<ComponentType<Props>>> = {',
    registryObject,
    '};',
    '',
  ].join('\n');
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

console.log(`Generated ${entries.length} brand icons into src/components/icons/BrandIcon/icons.`);
console.log(`Generated brand-registry.tsx in src/components/icons/BrandIcon/.`);
console.log(`Generated BrandIcon.types.ts in src/components/icons/BrandIcon/.`);

