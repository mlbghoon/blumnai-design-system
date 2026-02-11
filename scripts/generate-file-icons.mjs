import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const ICONS_SOURCE_DIR = path.join(ROOT, 'src', 'icons', 'source');
const FILE_ICON_DIR = path.join(ROOT, 'src', 'components', 'icons', 'FileIcon');

const SNAPSHOT_PATH =
  process.argv[2] ?? path.join(ICONS_SOURCE_DIR, 'sortui.file-icons.json');

const OUT_DIR = path.join(FILE_ICON_DIR, 'icons');
const REGISTRY_PATH = path.join(FILE_ICON_DIR, 'file-registry.tsx');
const TYPES_PATH = path.join(FILE_ICON_DIR, 'FileIcon.types.ts');

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

// Convert Figma key to registry key (lowercase)
const toRegistryKey = (raw) => {
  return String(raw).trim().toLowerCase();
};

const toPascalCase = (name) =>
  String(name)
    .trim()
    .split(/[^a-zA-Z0-9]+/g)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
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

  // Remove width/height attributes from root SVG (IconWrapper will control size via size prop)
  // Keep viewBox for proper scaling
  out = out.replace(/<svg([^>]*)\s+width="[^"]*"/gi, '<svg$1');
  out = out.replace(/<svg([^>]*)\s+height="[^"]*"/gi, '<svg$1');

  out = out.replace(/style="mask-type:([^"]+)"/g, (_m, maskType) => {
    return `style={{ maskType: '${String(maskType).trim()}' }}`;
  });

  out = out.replace(/style="mix-blend-mode:([^"]+)"/g, (_m, mode) => {
    return `style={{ mixBlendMode: '${String(mode).trim()}' }}`;
  });

  // Convert fill="white" to style={{ fill: 'white' }} to prevent IconWrapper override
  out = out.replace(/(<(?:path|rect|circle|ellipse|polygon|polyline)[^>]*)\s+fill="white"([^>]*>)/g,
    '$1 style={{ fill: \'white\' }}$2');

  // Convert other fill colors (like #6F6F77) to inline styles to prevent override
  out = out.replace(/(<(?:path|rect|circle|ellipse|polygon|polyline)[^>]*)\s+fill="(#[0-9A-Fa-f]{3,8})"([^>]*>)/g,
    (match, before, color, after) => {
      if (before.includes('style=') || after.includes('style=')) {
        return match;
      }
      return `${before} style={{ fill: '${color}' }}${after}`;
    });

  // For stroke-only paths, ensure fill doesn't get inherited
  out = out.replace(/(<path[^>]*)\s+stroke="([^"]+)"([^>]*)(\/?>)/g, (match, before, strokeVal, after, closing) => {
    if (before.includes('fill=') || before.includes('style=') || after.includes('fill=') || after.includes('style=')) {
      return match;
    }
    return `${before} style={{ fill: 'none' }} stroke="${strokeVal}"${after}${closing}`;
  });

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
  for (const id of ids) map.set(id, `${prefix}__${sanitizeId(id)}`);

  let out = svg;
  for (const [oldId, newId] of map.entries()) {
    out = out.replaceAll(`id="${oldId}"`, `id="${newId}"`);
    out = out.replaceAll(`url(#${oldId})`, `url(#${newId})`);
    out = out.replaceAll(`href="#${oldId}"`, `href="#${newId}"`);
    out = out.replaceAll(`xlink:href="#${oldId}"`, `xlink:href="#${newId}"`);
  }

  return out;
};

const parseSnapshotKey = (key) => {
  const parts = String(key).split('__');
  const variant = parts[0] ?? 'Unknown';
  const size = parts[1] ?? 'md';
  const discriminator = parts[2];

  return { variant, size, discriminator };
};

const normalizeVariantForName = (variant) => {
  const v = String(variant).trim();
  return v.replaceAll('4:3', '43').replaceAll('1:1', '11');
};

const normalizeSizeForName = (size) => {
  const s = String(size).trim().toLowerCase();
  if (s === 'sm') return 'Sm';
  if (s === 'md') return 'Md';
  if (s === 'lg') return 'Lg';
  return toValidIdentifier(s);
};

const removeBase64Image = (svg) => {
  let cleaned = String(svg);

  let imageStart = cleaned.indexOf('<image');
  while (imageStart !== -1) {
    let tagEnd = cleaned.indexOf('>', imageStart);
    if (tagEnd === -1) break;

    const tagContent = cleaned.slice(imageStart, tagEnd + 1);
    const hasBase64 = tagContent.includes('data:image') ||
                      tagContent.includes('xlink:href="data:') ||
                      tagContent.includes('href="data:');

    if (hasBase64) {
      let imageEnd = cleaned.indexOf('</image>', imageStart);
      if (imageEnd !== -1) {
        cleaned = cleaned.slice(0, imageStart) + cleaned.slice(imageEnd + 8);
      } else {
        cleaned = cleaned.slice(0, imageStart) + cleaned.slice(tagEnd + 1);
      }
      imageStart = cleaned.indexOf('<image', imageStart);
    } else {
      imageStart = cleaned.indexOf('<image', tagEnd + 1);
    }
  }

  cleaned = cleaned.replace(/<pattern[^>]*>[\s\S]*?<\/pattern>/gi, (match) => {
    if (match.includes('image0') ||
        match.includes('xlink:href="#image') ||
        match.includes('href="#image') ||
        match.includes('<use') ||
        match.includes('use xlink:href') ||
        match.includes('use href')) {
      return '';
    }
    return match;
  });

  cleaned = cleaned.replace(/<use[^>]*xlink:href="#image[^>]*>/gi, '');
  cleaned = cleaned.replace(/<use[^>]*href="#image[^>]*>/gi, '');
  cleaned = cleaned.replace(/fill="url\(#pattern[^)]+\)"/gi, 'fill="transparent"');

  return cleaned;
};

const hasBase64Image = (svg) => {
  const svgStr = String(svg);
  return svgStr.includes('data:image') ||
         svgStr.includes('xlink:href="data:') ||
         svgStr.includes('href="data:');
};

const addThumbnailImageSupport = (svg, componentName) => {
  let cleaned = hasBase64Image(svg) ? removeBase64Image(svg) : String(svg);

  const viewBoxMatch = cleaned.match(/viewBox="([^"]+)"/);
  if (!viewBoxMatch) return cleaned;

  const viewBox = viewBoxMatch[1].split(/\s+/);
  const width = viewBox[2] || '40';
  const height = viewBox[3] || '40';

  const clipPathRefMatch = cleaned.match(/clipPath="url\(#([^)]+)\)"/) || cleaned.match(/clip-path="url\(#([^)]+)\)"/);
  const clipPathId = clipPathRefMatch
    ? `${componentName}__${clipPathRefMatch[1]}`
    : null;
  if (!clipPathId) {
    console.warn(`  ⚠️ ${componentName}: no clipPath found in SVG, image will render without clipping`);
  }

  const mainPathRegex = /<path([^>]*)\s+d="([^"]+)"([^>]*)\s+fill="transparent"([^>]*)\/>/;
  const mainPathMatch = cleaned.match(mainPathRegex);

  if (mainPathMatch) {
    const beforeAttrs = mainPathMatch[1] || '';
    const pathData = mainPathMatch[2];
    const middleAttrs = mainPathMatch[3] || '';
    const afterAttrs = mainPathMatch[4] || '';

    if (pathData.startsWith('M0 4') || pathData.startsWith('M0 4C0')) {
      const allAttrs = beforeAttrs + middleAttrs + afterAttrs;
      const shapeRenderingMatch = allAttrs.match(/shape-rendering="([^"]+)"/);
      const shapeRendering = shapeRenderingMatch ? ` shapeRendering="${shapeRenderingMatch[1]}"` : '';

      const clipPathAttr = clipPathId
        ? `\n            clipPath={\`url(#${clipPathId})\`}`
        : '';

      const replacement = `<g>
        <path d="${pathData}" fill="transparent"${shapeRendering}/>
        {imageSrc ? (
          <image
            x="0"
            y="0"
            width="${width}"
            height="${height}"
            preserveAspectRatio="xMidYMid slice"
            href={imageSrc}${clipPathAttr}
          />
        ) : null}
      </g>`;

      cleaned = cleaned.replace(mainPathRegex, replacement);
    }
  }

  cleaned = cleaned.replace(/<g([^>]*)\s+d="[^"]*"([^>]*)>/g, '<g$1$2>');

  return cleaned;
};

if (!fs.existsSync(SNAPSHOT_PATH)) {
  console.error(`Snapshot not found: ${SNAPSHOT_PATH}`);
  process.exit(1);
}

const snapshot = JSON.parse(fs.readFileSync(SNAPSHOT_PATH, 'utf8'));
const entries = Object.entries(snapshot).sort(([a], [b]) => a.localeCompare(b));

cleanOutDir();
fs.mkdirSync(OUT_DIR, { recursive: true });

// Track file types to component names for registry generation
const registryEntries = [];
const componentDefs = [];
let hasThumbnail = false;

for (const [rawKey, rawSvg] of entries) {
  const { variant, size, discriminator } = parseSnapshotKey(rawKey);
  const variantName = toValidIdentifier(normalizeVariantForName(variant));
  const sizeName = normalizeSizeForName(size);
  const disc = discriminator ? `_${toValidIdentifier(discriminator)}` : '';

  const registryKey = toRegistryKey(rawKey);

  const componentName = `File${variantName}${sizeName}${disc}Icon`;
  const isThumbnail = variantName.includes('Thumbnail');

  let processedSvg = String(rawSvg).trim();

  if (isThumbnail) {
    processedSvg = addThumbnailImageSupport(processedSvg, componentName);
    hasThumbnail = true;
  }

  const prefixedSvg = prefixSvgIds(toJsxSafeSvgMarkup(processedSvg), componentName);

  componentDefs.push({ componentName, svgMarkup: prefixedSvg, isThumbnail });
  registryEntries.push({ fileType: registryKey, componentName, isThumbnail });
}

// Write consolidated all.tsx
const sortedDefs = [...componentDefs].sort((a, b) => a.componentName.localeCompare(b.componentName));

const regularComponents = sortedDefs.filter(d => !d.isThumbnail);
const thumbnailComponents = sortedDefs.filter(d => d.isThumbnail);

const regularDefs = regularComponents.map(({ componentName, svgMarkup }) => {
  return `export const ${componentName} = (props: Props) => {
  return (
    <Icon {...props}>
      ${svgMarkup}
    </Icon>
  );
};`;
}).join('\n\n');

const thumbnailDefs = thumbnailComponents.map(({ componentName, svgMarkup }) => {
  return `export const ${componentName} = ({ imageSrc, ...props }: ThumbnailProps) => {
  return (
    <Icon {...props}>
      ${svgMarkup}
    </Icon>
  );
};`;
}).join('\n\n');

const thumbnailInterface = hasThumbnail ? `
interface ThumbnailProps extends Props {
  /** 외부 이미지 URL 또는 경로. 제공되지 않으면 프레임만 표시됩니다. */
  imageSrc?: string;
}
` : '';

const allTsx = `// This file is auto-generated. Do not edit manually.
import type { Props } from '../../Icon/IconWrapper.types';

import { Icon } from '../../Icon/IconWrapper';
${thumbnailInterface}
${regularDefs}${thumbnailDefs ? '\n\n' + thumbnailDefs : ''}
`;

fs.writeFileSync(path.join(OUT_DIR, 'all.tsx'), allTsx);

// Generate file-registry.tsx
const generateFileRegistry = () => {
  registryEntries.sort((a, b) => a.fileType.localeCompare(b.fileType));

  const lookupEntries = registryEntries
    .map(({ fileType, componentName }) => `  '${fileType}': '${componentName}',`)
    .join('\n');

  return [
    '// This file is auto-generated. Do not edit manually.',
    '// Run: npm run generate:file-icons',
    '',
    "import { lazy } from 'react';",
    "import type { LazyExoticComponent, ComponentType } from 'react';",
    '',
    "import type { Props } from '../Icon/IconWrapper.types';",
    '',
    "interface ThumbnailProps extends Props {",
    "  imageSrc?: string;",
    "}",
    '',
    'type FileComponent = ComponentType<Props> | ComponentType<ThumbnailProps>;',
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
    'const lazyCache: Record<string, LazyExoticComponent<FileComponent>> = {};',
    '',
    'export function getFileSync(key: string): FileComponent | null {',
    '  const componentName = lookup[key];',
    '  if (!componentName || !moduleCache) return null;',
    '  return (moduleCache[componentName] as FileComponent) || null;',
    '}',
    '',
    'export function getFileLazy(key: string): LazyExoticComponent<FileComponent> | null {',
    '  const componentName = lookup[key];',
    '  if (!componentName) return null;',
    '  if (!lazyCache[key]) {',
    '    lazyCache[key] = lazy(() =>',
    '      loadModule().then(mod => ({',
    '        default: mod[componentName] as FileComponent,',
    '      }))',
    '    );',
    '  }',
    '  return lazyCache[key];',
    '}',
    '',
    'export function hasFile(key: string): boolean {',
    '  return key in lookup;',
    '}',
    '',
  ].join('\n');
};

// Generate FileIcon.types.ts
const generateFileTypes = () => {
  const variants = new Set();
  for (const { fileType } of registryEntries) {
    const variant = fileType.split('__')[0];
    const normalizedVariant = variant.replace('thumbnail ', 'thumbnail-');
    variants.add(normalizedVariant);
  }

  const sortedVariants = Array.from(variants).sort();
  const variantTypes = sortedVariants
    .map((v) => `  | '${v}'`)
    .join('\n');

  return [
    "import type { SVGProps } from 'react';",
    '',
    '/**',
    ' * Available file icon variants',
    ' */',
    'export type FileVariant =',
    variantTypes + ';',
    '',
    '/**',
    ' * Available file icon sizes',
    ' */',
    "export type FileSize = 'sm' | 'md' | 'lg';",
    '',
    "export interface FileIconProps extends Omit<SVGProps<SVGSVGElement>, 'children' | 'cursor' | 'focusable'> {",
    '  /**',
    '   * File type variant',
    '   */',
    '  fileType: FileVariant;',
    '  /**',
    '   * Icon size',
    "   * @default 'md'",
    '   */',
    '  size?: FileSize;',
    '  /**',
    '   * Additional CSS class name',
    '   */',
    '  className?: string;',
    '  /**',
    '   * Image source URL for thumbnail types',
    "   * Only applies to 'thumbnail-1:1' and 'thumbnail-4:3' types",
    '   */',
    '  src?: string;',
    '}',
    '',
  ].join('\n');
};

fs.writeFileSync(REGISTRY_PATH, generateFileRegistry());
fs.writeFileSync(TYPES_PATH, generateFileTypes());

console.log(`Generated ${entries.length} file icons into src/components/icons/FileIcon/icons/all.tsx.`);
console.log(`Generated file-registry.tsx in src/components/icons/FileIcon/.`);
console.log(`Generated FileIcon.types.ts in src/components/icons/FileIcon/.`);
