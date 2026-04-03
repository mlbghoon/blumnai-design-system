#!/usr/bin/env node

/**
 * Generate consolidated .ts icon component files from SVG source files.
 *
 * This script:
 * 1. Scans src/icons/svg-source/ for SVG files
 * 2. Converts kebab-case filenames to PascalCase component names
 * 3. Generates ONE consolidated .ts file per category (e.g., system.ts)
 *    using createElement() instead of JSX to bypass Babel transform in Vite
 * 4. Updates main src/icons/index.ts
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const ICONS_OUTPUT_DIR = path.join(ROOT, 'src', 'components', 'icons', 'Icon', 'icons');
const SVG_SOURCE_DIR = path.join(ROOT, 'src', 'icons', 'svg-source');

/**
 * Convert kebab-case filename to PascalCase component name
 * @param {string} kebabName - e.g., "arrow-down", "collapse-diagonal2fill"
 * @returns {string} - e.g., "ArrowDownIcon", "CollapseDiagonal2FillIcon"
 */
function kebabCaseToComponentName(kebabName) {
  // Remove .svg extension if present
  let baseName = kebabName.replace(/\.svg$/, '');

  // First, split by hyphens
  const parts = baseName.split('-');

  // Process each part, handling cases where numbers/letters are concatenated
  const processedParts = parts.map(part => {
    // Handle parts that contain numbers followed by letters (e.g., "diagonal2fill" -> ["diagonal", "2fill"])
    // Split on boundary between letter and number, or number and letter
    const subParts = part.split(/(?<=[a-z])(?=\d)|(?<=\d)(?=[a-z])/i);

    return subParts.map(subPart => {
      // Handle numbers at the start (e.g., "2" -> "2", "2fill" -> "2Fill")
      if (/^\d/.test(subPart)) {
        // If it's just a number, return as is
        if (/^\d+$/.test(subPart)) {
          return subPart;
        }
        // If it's number followed by letters (e.g., "2fill"), capitalize the first letter after the number
        return subPart.charAt(0) + subPart.charAt(1).toUpperCase() + subPart.slice(2);
      }
      // Handle single letters (e.g., "s" -> "S")
      if (subPart.length === 1) {
        return subPart.toUpperCase();
      }
      // Normal case: capitalize first letter
      return subPart.charAt(0).toUpperCase() + subPart.slice(1);
    }).join('');
  });

  // Capitalize first letter of each part and join
  const pascalCase = processedParts
    .map(part => {
      // If part starts with a number, keep it as is, otherwise capitalize first letter
      if (/^\d/.test(part)) {
        return part;
      }
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join('');

  // Add "Icon" suffix
  return pascalCase + 'Icon';
}

/**
 * Convert SVG kebab-case attributes to React camelCase
 * @param {string} svgContent - SVG content with kebab-case attributes
 * @returns {string} - SVG content with camelCase attributes
 */
function convertSVGAttributesToReact(svgContent) {
  // Map of common SVG kebab-case attributes to React camelCase
  const attributeMap = {
    'clip-path': 'clipPath',
    'fill-rule': 'fillRule',
    'clip-rule': 'clipRule',
    'stroke-width': 'strokeWidth',
    'stroke-linecap': 'strokeLinecap',
    'stroke-linejoin': 'strokeLinejoin',
    'stroke-miterlimit': 'strokeMiterlimit',
    'stroke-dasharray': 'strokeDasharray',
    'stroke-dashoffset': 'strokeDashoffset',
    'font-family': 'fontFamily',
    'font-size': 'fontSize',
    'font-weight': 'fontWeight',
    'font-style': 'fontStyle',
    'text-anchor': 'textAnchor',
    'text-decoration': 'textDecoration',
    'letter-spacing': 'letterSpacing',
    'word-spacing': 'wordSpacing',
    'text-transform': 'textTransform',
    'xml:space': 'xmlSpace',
  };

  let converted = svgContent;

  // Replace kebab-case attributes with camelCase
  for (const [kebab, camel] of Object.entries(attributeMap)) {
    // Match attribute="value" or attribute='value'
    const regex = new RegExp(`\\s${kebab}="([^"]*)"`, 'gi');
    converted = converted.replace(regex, ` ${camel}="$1"`);

    // Also handle single quotes
    const regexSingle = new RegExp(`\\s${kebab}='([^']*)'`, 'gi');
    converted = converted.replace(regexSingle, ` ${camel}='$1'`);
  }

  return converted;
}

/**
 * Normalize SVG IDs to match component name
 * @param {string} svgContent - SVG content
 * @param {string} componentName - Component name (e.g., "FlagAdIcon")
 * @returns {string} - SVG content with normalized IDs
 */
function normalizeSVGIds(svgContent, componentName) {
  const idPattern = /([A-Z][a-zA-Z0-9]*Icon)__([a-zA-Z0-9_]+)/g;

  let normalized = svgContent;

  const oldIds = new Map();
  let match;

  idPattern.lastIndex = 0;
  while ((match = idPattern.exec(svgContent)) !== null) {
    const fullMatch = match[0];
    const suffix = match[2];
    if (!oldIds.has(fullMatch)) {
      oldIds.set(fullMatch, suffix);
    }
  }

  for (const [oldId, suffix] of oldIds) {
    const newId = `${componentName}__${suffix}`;

    const escapedOldId = oldId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    normalized = normalized.replace(new RegExp(`id="${escapedOldId}"`, 'g'), `id="${newId}"`);
    normalized = normalized.replace(new RegExp(`url\\(#${escapedOldId}\\)`, 'g'), `url(#${newId})`);
  }

  return normalized;
}

/**
 * Normalize SVG content for use in TSX
 * @param {string} svgContent - Raw SVG content
 * @param {string} componentName - Component name for ID normalization
 * @returns {string} - Normalized SVG content
 */
function normalizeSVG(svgContent, componentName) {
  let normalized = svgContent.trim();

  if (!normalized.includes('viewBox=')) {
    console.warn('Warning: SVG missing viewBox attribute');
  }

  normalized = normalized.replace(/\s*xmlns="http:\/\/www\.w3\.org\/2000\/svg"/, '');

  const viewBoxMatch = normalized.match(/viewBox="([^"]+)"/);
  if (viewBoxMatch) {
    const viewBox = viewBoxMatch[1].split(/\s+/);
    if (viewBox.length >= 4) {
      const width = viewBox[2];
      const height = viewBox[3];
      normalized = normalized.replace(
        /<rect\s+fill="white"\s*\/?>/g,
        `<rect width="${width}" height="${height}" fill="white"/>`
      );
    }
  }

  normalized = normalized.replace(/<svg([^>]*)\s+width="[^"]*"/gi, '<svg$1');
  normalized = normalized.replace(/<svg([^>]*)\s+height="[^"]*"/gi, '<svg$1');

  normalized = convertSVGAttributesToReact(normalized);

  normalized = normalizeSVGIds(normalized, componentName);

  return normalized;
}

/**
 * Parse an SVG string into a tree of { tag, attrs, children } nodes.
 * Handles self-closing tags, open/close pairs, and nested elements.
 * @param {string} svgString - Normalized SVG markup
 * @returns {{ tag: string, attrs: Record<string, string>, children: object[] }}
 */
function parseSvgToTree(svgString) {
  const s = svgString.trim();
  const nodes = [];
  let pos = 0;

  while (pos < s.length) {
    // skip whitespace between tags
    while (pos < s.length && /\s/.test(s[pos])) pos++;
    if (pos >= s.length) break;

    if (s[pos] !== '<') {
      throw new Error(`Unexpected content at position ${pos}: "${s.slice(pos, pos + 30)}..."`);
    }

    // extract the opening tag
    const tagStart = pos;
    const tagEnd = s.indexOf('>', tagStart);
    if (tagEnd === -1) throw new Error(`Unclosed tag at position ${tagStart}`);

    const tagContent = s.slice(tagStart + 1, tagEnd + (s[tagEnd - 1] === '/' ? 0 : 1));
    const isSelfClosing = s[tagEnd - 1] === '/' || s.slice(tagStart, tagEnd + 1).endsWith('/>');

    // extract tag name
    const rawTag = isSelfClosing ? s.slice(tagStart + 1, tagEnd).replace(/\/$/, '').trim()
      : s.slice(tagStart + 1, tagEnd).trim();
    const tagNameMatch = rawTag.match(/^(\w[\w-]*)/);
    if (!tagNameMatch) throw new Error(`Cannot parse tag name from: "${rawTag}"`);
    const tag = tagNameMatch[1];

    // extract attributes
    const attrString = rawTag.slice(tag.length).trim();
    const attrs = {};
    const attrRegex = /([\w-]+)="([^"]*)"/g;
    let attrMatch;
    let matchedLength = 0;
    while ((attrMatch = attrRegex.exec(attrString)) !== null) {
      attrs[attrMatch[1]] = attrMatch[2];
      matchedLength += attrMatch[0].length;
    }
    // verify we parsed all attributes (allow whitespace)
    const residual = attrString.replace(attrRegex, '').trim();
    if (residual.length > 0) {
      throw new Error(`Unparsed attribute content in <${tag}>: "${residual}"`);
    }

    pos = tagEnd + 1;

    if (isSelfClosing) {
      nodes.push({ tag, attrs, children: [] });
    } else {
      // find matching closing tag, handling nesting
      const closingTag = `</${tag}>`;
      let depth = 1;
      let searchPos = pos;
      while (depth > 0 && searchPos < s.length) {
        const nextOpen = s.indexOf(`<${tag}`, searchPos);
        const nextClose = s.indexOf(closingTag, searchPos);
        if (nextClose === -1) throw new Error(`Missing closing tag for <${tag}>`);
        if (nextOpen !== -1 && nextOpen < nextClose) {
          // check if it's a self-closing instance
          const endOfOpen = s.indexOf('>', nextOpen);
          if (endOfOpen !== -1 && s[endOfOpen - 1] === '/') {
            searchPos = endOfOpen + 1;
          } else {
            depth++;
            searchPos = nextOpen + tag.length + 1;
          }
        } else {
          depth--;
          if (depth === 0) {
            const innerContent = s.slice(pos, nextClose).trim();
            const children = innerContent.length > 0 ? parseSvgToTree(innerContent) : [];
            nodes.push({ tag, attrs, children });
            pos = nextClose + closingTag.length;
          } else {
            searchPos = nextClose + closingTag.length;
          }
        }
      }
      if (depth !== 0) throw new Error(`Unmatched <${tag}> tag`);
    }
  }

  return nodes;
}

/**
 * Convert SVG attribute names to React camelCase for createElement
 * @param {string} attr - SVG attribute name (e.g., "fill-rule")
 * @returns {string} - React prop name (e.g., "fillRule")
 */
function attrToReactProp(attr) {
  const map = {
    'clip-path': 'clipPath', 'fill-rule': 'fillRule', 'clip-rule': 'clipRule',
    'stroke-width': 'strokeWidth', 'stroke-linecap': 'strokeLinecap',
    'stroke-linejoin': 'strokeLinejoin', 'stroke-miterlimit': 'strokeMiterlimit',
    'stroke-dasharray': 'strokeDasharray', 'stroke-dashoffset': 'strokeDashoffset',
    'font-family': 'fontFamily', 'font-size': 'fontSize', 'font-weight': 'fontWeight',
    'text-anchor': 'textAnchor', 'text-decoration': 'textDecoration',
  };
  return map[attr] || attr;
}

/**
 * Convert a parsed SVG tree node to a nested h() call string
 * @param {{ tag: string, attrs: Record<string, string>, children: object[] }} node
 * @param {number} indent - Current indentation (spaces)
 * @returns {string}
 */
function nodeToCreateElement(node, indent) {
  const pad = ' '.repeat(indent);
  const innerPad = ' '.repeat(indent + 2);

  // build props object
  const entries = Object.entries(node.attrs);
  let propsStr;
  if (entries.length === 0) {
    propsStr = 'null';
  } else {
    const pairs = entries.map(([k, v]) => {
      const key = attrToReactProp(k);
      const escaped = v.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
      return `${key}: '${escaped}'`;
    });
    propsStr = `{ ${pairs.join(', ')} }`;
  }

  if (node.children.length === 0) {
    return `${pad}h('${node.tag}', ${propsStr})`;
  }

  const childStrs = node.children.map(c => nodeToCreateElement(c, indent + 2));
  return `${pad}h('${node.tag}', ${propsStr},\n${childStrs.join(',\n')}\n${pad})`;
}

/**
 * Convert an SVG string to a createElement h() expression
 * @param {string} svgString - Normalized SVG markup (with React-cased attributes)
 * @param {number} [baseIndent=4] - Base indentation
 * @returns {string} - h('svg', {...}, h('path', {...})) expression
 */
function svgToCreateElement(svgString, baseIndent = 4) {
  const nodes = parseSvgToTree(svgString);
  if (nodes.length === 0) throw new Error('Empty SVG content');
  if (nodes.length > 1) throw new Error(`Expected single root <svg>, got ${nodes.length} roots`);
  if (nodes[0].tag !== 'svg') throw new Error(`Expected root <svg>, got <${nodes[0].tag}>`);
  return nodeToCreateElement(nodes[0], baseIndent);
}

/**
 * Process a single SVG file and return its data (without writing to disk)
 * @param {string} svgFilePath - Path to SVG file
 * @returns {{componentName: string, svgContent: string}|null}
 */
function processSVGFile(svgFilePath) {
  try {
    const svgContent = fs.readFileSync(svgFilePath, 'utf-8');

    const fileName = path.basename(svgFilePath, '.svg');
    const componentName = kebabCaseToComponentName(fileName);

    const normalizedSVG = normalizeSVG(svgContent, componentName);

    return { componentName, svgContent: normalizedSVG };
  } catch (error) {
    console.error(`❌ Error processing ${svgFilePath}:`, error.message);
    return null;
  }
}

/**
 * Categories that have their own dedicated generation scripts and folders.
 * These are excluded from the main generate-icons.mjs script.
 */
const EXCLUDED_CATEGORIES = new Set([
  'brands',        // -> BrandIcon/icons/ via generate-brands-icons.mjs
  'cursors',       // -> CursorIcon/icons/ via generate-cursors-icons.mjs
  'flags',         // -> FlagIcon/icons/ via generate-flags-icons.mjs
  'fileIcons',     // -> FileIcon/icons/ via generate-file-icons.mjs
  'isometricIcon', // -> IsometricIcon/icons/ via generate-isometric-icons.mjs
]);

/**
 * Get all category directories from svg-source
 * @returns {string[]} - Array of category names
 */
function getCategoryDirectories() {
  if (!fs.existsSync(SVG_SOURCE_DIR)) {
    console.error(`❌ SVG source directory not found: ${SVG_SOURCE_DIR}`);
    process.exit(1);
  }

  const entries = fs.readdirSync(SVG_SOURCE_DIR, { withFileTypes: true });
  return entries
    .filter(entry => entry.isDirectory())
    .filter(entry => !EXCLUDED_CATEGORIES.has(entry.name))
    .map(entry => entry.name);
}

/**
 * Clean old category directory (remove subdirectory entirely) and old .tsx/.ts files
 * @param {string} category - Category name
 */
function cleanCategory(category) {
  // Remove old subdirectory (individual files pattern)
  const categoryDir = path.join(ICONS_OUTPUT_DIR, category);
  if (fs.existsSync(categoryDir) && fs.statSync(categoryDir).isDirectory()) {
    fs.rmSync(categoryDir, { recursive: true, force: true });
  }

  // Remove old .tsx and .ts files (handles transition from JSX to createElement)
  for (const ext of ['.tsx', '.ts']) {
    const file = path.join(ICONS_OUTPUT_DIR, `${category}${ext}`);
    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
    }
  }
}

/**
 * Generate a consolidated .ts category file with createElement calls
 * @param {{componentName: string, svgContent: string}[]} icons - Array of icon data
 * @returns {string} - File content
 */
function generateConsolidatedCategoryFile(icons) {
  const sortedIcons = [...icons].sort((a, b) => a.componentName.localeCompare(b.componentName));

  const components = sortedIcons.map(({ componentName, svgContent }) => {
    const hCall = svgToCreateElement(svgContent, 4);
    return `export const ${componentName} = (props: Props) =>\n  h(Icon, { ...props, children:\n${hCall}\n  });`;
  }).join('\n\n');

  return `// This file is auto-generated. Do not edit manually.
import { createElement as h } from 'react';

import type { Props } from '../IconWrapper.types';
import { Icon } from '../IconWrapper';

${components}
`;
}

/**
 * Process all SVGs in a category
 * @param {string} category - Category name
 * @returns {{success: number, failed: number, componentNames: string[]}}
 */
function processCategory(category) {
  const categoryDir = path.join(SVG_SOURCE_DIR, category);

  if (!fs.existsSync(categoryDir)) {
    console.warn(`⚠️  Category directory not found: ${categoryDir}`);
    return { success: 0, failed: 0, componentNames: [] };
  }

  cleanCategory(category);

  const entries = fs.readdirSync(categoryDir, { withFileTypes: true });
  const svgFiles = entries.filter(
    entry => entry.isFile() && entry.name.endsWith('.svg')
  );

  let success = 0;
  let failed = 0;
  const icons = [];

  for (const entry of svgFiles) {
    const svgFilePath = path.join(categoryDir, entry.name);
    const result = processSVGFile(svgFilePath);

    if (result) {
      icons.push(result);
      success++;
    } else {
      failed++;
    }
  }

  if (icons.length > 0) {
    const content = generateConsolidatedCategoryFile(icons);
    const outputPath = path.join(ICONS_OUTPUT_DIR, `${category}.ts`);
    fs.writeFileSync(outputPath, content, 'utf-8');

    // Validate written file
    const written = fs.readFileSync(outputPath, 'utf-8');
    const exportCount = (written.match(/export const /g) || []).length;
    if (exportCount !== icons.length) {
      console.error(`❌ ${category}: expected ${icons.length} exports, found ${exportCount}`);
      process.exit(1);
    }
    for (const { componentName } of icons) {
      if (!written.includes(`export const ${componentName}`)) {
        console.error(`❌ ${category}: missing export for ${componentName}`);
        process.exit(1);
      }
    }
    const hIconCount = (written.match(/h\(Icon, \{ \.\.\.props, children:/g) || []).length;
    if (hIconCount !== icons.length) {
      console.error(`❌ ${category}: expected ${icons.length} h(Icon, ...) calls, found ${hIconCount}`);
      process.exit(1);
    }
  }

  return { success, failed, componentNames: icons.map(i => i.componentName) };
}

/**
 * Update main index.ts file
 *
 * Barrel exports are intentionally removed — icon components are loaded
 * on-demand via ui-icon-registry.tsx (per-category lazy loading).
 * Adding `export * from './category'` here would force all categories
 * into the consumer bundle.
 */
function updateMainIndex() {
  const indexPath = path.join(ICONS_OUTPUT_DIR, 'index.ts');

  const newContent = `// Icon components are loaded on-demand via ui-icon-registry.tsx (per-category lazy loading).
// Do not add barrel exports here — they force all categories into the bundle.
export {};
`;

  fs.writeFileSync(indexPath, newContent, 'utf-8');
}

/**
 * Main execution
 */
function main() {
  console.log('🚀 Starting icon generation...\n');

  if (!fs.existsSync(SVG_SOURCE_DIR)) {
    console.error(`❌ SVG source directory not found: ${SVG_SOURCE_DIR}`);
    console.error('   Please run the extraction script first: npm run extract:icons');
    process.exit(1);
  }

  const categories = getCategoryDirectories();
  console.log(`📁 Found ${categories.length} categories\n`);

  let totalSuccess = 0;
  let totalFailed = 0;
  const allCategories = [];

  for (const category of categories) {
    console.log(`📦 Processing category: ${category}`);
    const stats = processCategory(category);
    totalSuccess += stats.success;
    totalFailed += stats.failed;
    allCategories.push(category);
    console.log(`   ✅ ${stats.success} generated, ❌ ${stats.failed} failed\n`);
  }

  // Update main index.ts (no barrel exports — lazy loading only)
  console.log('📝 Updating main index.ts...');
  updateMainIndex();
  console.log('   ✅ Main index.ts updated\n');

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`✨ Generation complete!`);
  console.log(`   Total: ${totalSuccess + totalFailed} icons`);
  console.log(`   ✅ Success: ${totalSuccess}`);
  console.log(`   ❌ Failed: ${totalFailed}`);
  console.log(`   📁 Categories: ${allCategories.length}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  if (totalFailed > 0) {
    process.exit(1);
  }
}

main();
