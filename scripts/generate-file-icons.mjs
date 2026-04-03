import fs from 'node:fs';
import path from 'node:path';

import { parseSvgToTree, attrToReactProp, nodeToCreateElement, walkTree } from './lib/svg-to-create-element.mjs';

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
    if (entry.name.endsWith('.tsx') || (entry.name.endsWith('.ts') && entry.name !== 'index.ts')) {
      fs.unlinkSync(path.join(OUT_DIR, entry.name));
    }
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

const SHAPE_ELEMENTS = new Set(['path', 'rect', 'circle', 'ellipse', 'polygon', 'polyline']);

/**
 * Parse CSS style string into object.
 * e.g., "mask-type:alpha" → { maskType: 'alpha' }
 */
function parseCssStyle(styleStr) {
  const result = {};
  for (const pair of String(styleStr).split(';').filter(Boolean)) {
    const [prop, ...valParts] = pair.split(':');
    if (!prop || valParts.length === 0) continue;
    const key = prop.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    result[key] = valParts.join(':').trim();
  }
  return result;
}

/**
 * Transform parsed SVG tree for file icons:
 * - Remove xmlns, width, height from root svg
 * - CamelCase all attribute names
 * - Promote fill colors on shape elements to style (prevent IconWrapper override)
 * - Convert inline style strings to objects
 * - Ensure stroke-only paths have style.fill = 'none'
 */
function transformFileIconTree(nodes) {
  walkTree(nodes, (node) => {
    const newAttrs = {};
    const isShape = SHAPE_ELEMENTS.has(node.tag);
    let hasFill = false;
    let hasStroke = false;
    let hasStyleFill = false;

    // First pass: collect attrs and detect fill/stroke
    for (const [k, v] of Object.entries(node.attrs)) {
      const reactKey = attrToReactProp(k);

      if (reactKey === 'xmlns') continue;
      if (reactKey === 'style') {
        node.style = { ...(node.style || {}), ...parseCssStyle(v) };
        continue;
      }

      // Promote fill on shape elements to style to prevent IconWrapper override
      if (isShape && reactKey === 'fill') {
        hasFill = true;
        if (v === 'none' || v === 'currentColor') {
          newAttrs[reactKey] = v;
        } else if (v === 'transparent') {
          newAttrs[reactKey] = v;
        } else {
          // Move to style
          node.style = { ...(node.style || {}), fill: v };
          hasStyleFill = true;
        }
        continue;
      }

      if (reactKey === 'stroke') hasStroke = true;

      newAttrs[reactKey] = v;
    }

    // For stroke-only shapes, ensure fill doesn't get inherited
    if (isShape && hasStroke && !hasFill && !hasStyleFill) {
      node.style = { ...(node.style || {}), fill: 'none' };
    }

    node.attrs = newAttrs;
  });

  // Remove width/height from root svg
  if (nodes.length > 0 && nodes[0].tag === 'svg') {
    delete nodes[0].attrs.width;
    delete nodes[0].attrs.height;
  }
}

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

/**
 * For thumbnail SVGs: find the transparent-fill path in the tree and
 * inject a conditional image element after it.
 */
function addThumbnailImageToTree(nodes, componentName) {
  const root = nodes[0];
  if (!root || root.tag !== 'svg') return;

  // Get viewBox dimensions for image size
  const viewBox = root.attrs.viewBox;
  if (!viewBox) return;
  const vbParts = viewBox.split(/\s+/);
  const width = vbParts[2] || '40';
  const height = vbParts[3] || '40';

  // Find clipPath ID from the tree
  let clipPathId = null;
  walkTree(root.children, (node) => {
    if (node.tag === 'clipPath' && node.attrs.id) {
      clipPathId = node.attrs.id;
    }
  });

  // Find the transparent path and wrap it with conditional image
  function processChildren(children) {
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (child.tag === 'path' && child.attrs.fill === 'transparent') {
        // Extract shapeRendering from the path if present
        const shapeRendering = child.attrs.shapeRendering || child.attrs['shape-rendering'];

        // Build the replacement group
        const pathNode = {
          tag: 'path',
          attrs: { d: child.attrs.d, fill: 'transparent' },
          children: [],
        };
        if (shapeRendering) pathNode.attrs.shapeRendering = shapeRendering;

        const imageAttrs = {
          x: '0', y: '0',
          width, height,
          preserveAspectRatio: 'xMidYMid slice',
          href: { __dynamic: 'imageSrc' },
        };
        if (clipPathId) {
          imageAttrs.clipPath = `url(#${clipPathId})`;
        }

        const conditionalImage = {
          __conditional: 'imageSrc',
          __trueNode: { tag: 'image', attrs: imageAttrs, children: [] },
        };

        const groupNode = {
          tag: 'g',
          attrs: {},
          children: [pathNode, conditionalImage],
        };

        children[i] = groupNode;
        return true;
      }
      if (child.children && processChildren(child.children)) return true;
    }
    return false;
  }

  processChildren(root.children);
}

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
    processedSvg = hasBase64Image(processedSvg) ? removeBase64Image(processedSvg) : processedSvg;
    hasThumbnail = true;
  }

  // Prefix IDs before parsing
  const prefixedSvg = prefixSvgIds(processedSvg, componentName);

  // Parse SVG into tree
  const nodes = parseSvgToTree(prefixedSvg);

  // Apply file-icon-specific transforms (fill promotion, style conversion, camelCase)
  transformFileIconTree(nodes);

  // For thumbnails: inject conditional image
  if (isThumbnail) {
    addThumbnailImageToTree(nodes, componentName);
  }

  // Remove d attribute from <g> elements (Figma artifact)
  walkTree(nodes, (node) => {
    if (node.tag === 'g') delete node.attrs.d;
  });

  const hCall = nodeToCreateElement(nodes[0], 4);

  componentDefs.push({ componentName, hCall, isThumbnail });
  registryEntries.push({ fileType: registryKey, componentName, isThumbnail });
}

// Write consolidated all.ts
const sortedDefs = [...componentDefs].sort((a, b) => a.componentName.localeCompare(b.componentName));

const regularComponents = sortedDefs.filter(d => !d.isThumbnail);
const thumbnailComponents = sortedDefs.filter(d => d.isThumbnail);

const regularDefs = regularComponents.map(({ componentName, hCall }) => {
  return `export const ${componentName} = (props: Props) =>\n  h(Icon, { ...props, children:\n${hCall}\n  });`;
}).join('\n\n');

const thumbnailDefs = thumbnailComponents.map(({ componentName, hCall }) => {
  return `export const ${componentName} = ({ imageSrc, ...props }: ThumbnailProps) =>\n  h(Icon, { ...props, children:\n${hCall}\n  });`;
}).join('\n\n');

const thumbnailInterface = hasThumbnail ? `
interface ThumbnailProps extends Props {
  /** 외부 이미지 URL 또는 경로. 제공되지 않으면 프레임만 표시됩니다. */
  imageSrc?: string;
}
` : '';

const allTs = `// This file is auto-generated. Do not edit manually.
import { createElement as h } from 'react';

import type { Props } from '../../Icon/IconWrapper.types';
import { Icon } from '../../Icon/IconWrapper';
${thumbnailInterface}
${regularDefs}${thumbnailDefs ? '\n\n' + thumbnailDefs : ''}
`;

fs.writeFileSync(path.join(OUT_DIR, 'all.ts'), allTs);

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

console.log(`Generated ${entries.length} file icons into src/components/icons/FileIcon/icons/all.ts.`);
console.log(`Generated file-registry.tsx in src/components/icons/FileIcon/.`);
console.log(`Generated FileIcon.types.ts in src/components/icons/FileIcon/.`);
