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
  // This is needed because IconWrapper sets fill: currentColor which would override the attribute
  out = out.replace(/(<(?:path|rect|circle|ellipse|polygon|polyline)[^>]*)\s+fill="white"([^>]*>)/g,
    '$1 style={{ fill: \'white\' }}$2');

  // Convert other fill colors (like #6F6F77) to inline styles to prevent override
  // Match fill="#{hex}" pattern on shape elements
  out = out.replace(/(<(?:path|rect|circle|ellipse|polygon|polyline)[^>]*)\s+fill="(#[0-9A-Fa-f]{3,8})"([^>]*>)/g,
    (match, before, color, after) => {
      // Skip if already has style attribute
      if (before.includes('style=') || after.includes('style=')) {
        return match;
      }
      return `${before} style={{ fill: '${color}' }}${after}`;
    });

  // For stroke-only paths, ensure fill doesn't get inherited
  out = out.replace(/(<path[^>]*)\s+stroke="([^"]+)"([^>]*)(\/?>)/g, (match, before, strokeVal, after, closing) => {
    // If already has fill or style, leave it alone
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
  // Keys are produced by fetch script:
  // - "<Variant>__<size>" (e.g. "Archive__sm", "Thumbnail 4:3__lg")
  // - or "<Variant>__<size>__<nodeId>" for duplicates (rare)
  const parts = String(key).split('__');
  const variant = parts[0] ?? 'Unknown';
  const size = parts[1] ?? 'md';
  const discriminator = parts[2];

  return { variant, size, discriminator };
};

const normalizeVariantForName = (variant) => {
  // "Thumbnail 4:3" => "Thumbnail43"
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
  // Remove base64 encoded images and related patterns
  let cleaned = String(svg);

  // Strategy: Remove <image> tags that contain base64 data
  // These can be extremely long (16MB+) so we need a robust approach
  let imageStart = cleaned.indexOf('<image');
  while (imageStart !== -1) {
    // Find the end of the opening tag (could be self-closing or have attributes)
    let tagEnd = cleaned.indexOf('>', imageStart);
    if (tagEnd === -1) break;

    // Check the tag content for base64 data
    const tagContent = cleaned.slice(imageStart, tagEnd + 1);
    const hasBase64 = tagContent.includes('data:image') ||
                      tagContent.includes('xlink:href="data:') ||
                      tagContent.includes('href="data:');

    if (hasBase64) {
      // Find the closing </image> tag (could be many lines away due to base64 data)
      let imageEnd = cleaned.indexOf('</image>', imageStart);
      if (imageEnd !== -1) {
        // Remove from <image to </image> inclusive
        cleaned = cleaned.slice(0, imageStart) + cleaned.slice(imageEnd + 8);
      } else {
        // Self-closing tag, remove just the tag
        cleaned = cleaned.slice(0, imageStart) + cleaned.slice(tagEnd + 1);
      }
      // Continue searching from the same position (new content might have shifted)
      imageStart = cleaned.indexOf('<image', imageStart);
    } else {
      // Move past this tag
      imageStart = cleaned.indexOf('<image', tagEnd + 1);
    }
  }

  // Remove pattern definitions that reference images
  // These patterns use <use> tags to reference the image
  cleaned = cleaned.replace(/<pattern[^>]*>[\s\S]*?<\/pattern>/gi, (match) => {
    // Remove patterns that contain image references
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

  // Remove <use> tags that reference image patterns
  cleaned = cleaned.replace(/<use[^>]*xlink:href="#image[^>]*>/gi, '');
  cleaned = cleaned.replace(/<use[^>]*href="#image[^>]*>/gi, '');

  // Also remove any remaining references to image patterns in fill attributes
  cleaned = cleaned.replace(/fill="url\(#pattern[^)]+\)"/gi, 'fill="transparent"');

  return cleaned;
};

/**
 * Check if SVG contains base64 images (quick check without full processing)
 */
const hasBase64Image = (svg) => {
  const svgStr = String(svg);
  return svgStr.includes('data:image') ||
         svgStr.includes('xlink:href="data:') ||
         svgStr.includes('href="data:');
};

const addThumbnailImageSupport = (svg, componentName) => {
  // Only remove base64 images if they exist (optimization: skip if already clean)
  let cleaned = hasBase64Image(svg) ? removeBase64Image(svg) : String(svg);

  // Find the viewBox to determine dimensions
  const viewBoxMatch = cleaned.match(/viewBox="([^"]+)"/);
  if (!viewBoxMatch) return cleaned;

  const viewBox = viewBoxMatch[1].split(/\s+/);
  const width = viewBox[2] || '40';
  const height = viewBox[3] || '40';

  // Find clipPath ID from the SVG (will be prefixed by prefixSvgIds later)
  // Look for clipPath id in defs or clip-path reference
  const clipPathRefMatch = cleaned.match(/clipPath="url\(#([^)]+)\)"/) || cleaned.match(/clip-path="url\(#([^)]+)\)"/);
  const clipPathId = clipPathRefMatch
    ? `${componentName}__${clipPathRefMatch[1]}`
    : null;
  if (!clipPathId) {
    console.warn(`  ⚠️ ${componentName}: no clipPath found in SVG, image will render without clipping`);
  }

  // Find the main rectangle path (the one that should contain the image)
  // Look for path with d starting with "M0 4" or "M0 4C0" which is the main rectangle
  // This path should have fill="transparent" (already cleaned from JSON or after removeBase64Image)
  // Match pattern: <path ... d="M0 4..." ... fill="transparent" ... />
  const mainPathRegex = /<path([^>]*)\s+d="([^"]+)"([^>]*)\s+fill="transparent"([^>]*)\/>/;
  const mainPathMatch = cleaned.match(mainPathRegex);

  if (mainPathMatch) {
    const beforeAttrs = mainPathMatch[1] || '';
    const pathData = mainPathMatch[2];
    const middleAttrs = mainPathMatch[3] || '';
    const afterAttrs = mainPathMatch[4] || '';

    // Only process if this looks like the main rectangle (starts with M0 4)
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

  // Clean up any remaining invalid attributes on <g> tags (like d="...")
  cleaned = cleaned.replace(/<g([^>]*)\s+d="[^"]*"([^>]*)>/g, '<g$1$2>');

  return cleaned;
};

const makeCategoryComponentTsx = (componentName, svgMarkup, isThumbnail = false) => {
  if (isThumbnail) {
    return [
      "import type { Props } from '../../Icon/IconWrapper.types';",
      '',
      "import { Icon } from '../../Icon/IconWrapper';",
      '',
      "interface ThumbnailProps extends Props {",
      "  /** 외부 이미지 URL 또는 경로. 제공되지 않으면 프레임만 표시됩니다. */",
      "  imageSrc?: string;",
      "}",
      '',
      `export const ${componentName} = ({ imageSrc, ...props }: ThumbnailProps) => {`,
      '  return (',
      '    <Icon {...props}>',
      `      ${svgMarkup}`,
      '    </Icon>',
      '  );',
      '};',
      '',
    ].join('\n');
  }

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

// Track file types to component names for registry generation
const registryEntries = [];

for (const [rawKey, rawSvg] of entries) {
  const { variant, size, discriminator } = parseSnapshotKey(rawKey);
  const variantName = toValidIdentifier(normalizeVariantForName(variant));
  const sizeName = normalizeSizeForName(size);
  const disc = discriminator ? `_${toValidIdentifier(discriminator)}` : '';

  // Use Figma name directly for registry key (lowercase)
  const registryKey = toRegistryKey(rawKey);

  const componentName = `File${variantName}${sizeName}${disc}Icon`;
  const isThumbnail = variantName.includes('Thumbnail');

  let processedSvg = String(rawSvg).trim();

  // For Thumbnail icons, remove base64 images and add support for external images
  if (isThumbnail) {
    processedSvg = addThumbnailImageSupport(processedSvg, componentName);
  }

  const prefixedSvg = prefixSvgIds(toJsxSafeSvgMarkup(processedSvg), componentName);

  fs.writeFileSync(
    path.join(OUT_DIR, `${componentName}.tsx`),
    makeCategoryComponentTsx(componentName, prefixedSvg, isThumbnail),
  );

  // Add to registry (Figma name as key -> component name)
  registryEntries.push({ fileType: registryKey, componentName, isThumbnail });
}

// Generate file-registry.tsx
const generateFileRegistry = () => {
  // Sort by file type
  registryEntries.sort((a, b) => a.fileType.localeCompare(b.fileType));

  const imports = registryEntries
    .map(({ componentName }) =>
      `import { ${componentName} } from './icons/${componentName}';`
    )
    .join('\n');

  const registryObject = registryEntries
    .map(({ fileType, componentName }) => `  '${fileType}': ${componentName},`)
    .join('\n');

  return [
    '// This file is auto-generated. Do not edit manually.',
    '// Run: npm run generate:file-icons',
    '',
    "import type { ComponentType } from 'react';",
    '',
    "import type { Props } from '../Icon/IconWrapper.types';",
    '',
    imports,
    '',
    "interface ThumbnailProps extends Props {",
    "  imageSrc?: string;",
    "}",
    '',
    'export const fileRegistry: Record<string, ComponentType<Props> | ComponentType<ThumbnailProps>> = {',
    registryObject,
    '};',
    '',
  ].join('\n');
};

// Generate FileIcon.types.ts
const generateFileTypes = () => {
  // Extract unique variants from registry entries
  const variants = new Set();
  for (const { fileType } of registryEntries) {
    // fileType is like 'archive__lg', 'thumbnail 1:1__md'
    const variant = fileType.split('__')[0];
    // Convert 'thumbnail 1:1' to 'thumbnail-1:1' for cleaner API
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

console.log(`Generated ${entries.length} file icons into src/components/icons/FileIcon/icons.`);
console.log(`Generated file-registry.tsx in src/components/icons/FileIcon/.`);
console.log(`Generated FileIcon.types.ts in src/components/icons/FileIcon/.`);
