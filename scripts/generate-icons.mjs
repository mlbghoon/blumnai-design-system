#!/usr/bin/env node

/**
 * Generate TSX icon component files from SVG source files.
 * 
 * This script:
 * 1. Scans src/icons/svg-source/ for SVG files
 * 2. Converts kebab-case filenames to PascalCase component names
 * 3. Generates TSX component files following the current pattern
 * 4. Generates index.ts files for each category
 * 5. Updates main src/icons/index.ts
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const ICONS_DIR = path.join(ROOT, 'src', 'icons');
const SVG_SOURCE_DIR = path.join(ICONS_DIR, 'svg-source');

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
  // Find all IDs in the SVG (e.g., id="FlagADIcon__clip0_..." or url(#FlagADIcon__clip0_...))
  // These IDs might have different casing than the component name
  // We need to replace them with the component name to ensure they match
  
  // Pattern to match IDs: FlagADIcon__clip0_3811_32411 or similar
  // Match any pattern that looks like a component name (starts with capital, contains Icon) followed by __
  // This pattern matches: ComponentName__suffix
  const idPattern = /([A-Z][a-zA-Z0-9]*Icon)__([a-zA-Z0-9_]+)/g;
  
  let normalized = svgContent;
  
  // Find all unique old IDs that need to be replaced
  const oldIds = new Map(); // Map oldId -> suffix
  let match;
  
  // Reset regex lastIndex to ensure we search from the beginning
  idPattern.lastIndex = 0;
  while ((match = idPattern.exec(svgContent)) !== null) {
    const fullMatch = match[0]; // e.g., "FlagADIcon__clip0_3811_32411"
    const suffix = match[2]; // e.g., "clip0_3811_32411"
    if (!oldIds.has(fullMatch)) {
      oldIds.set(fullMatch, suffix);
    }
  }
  
  // Replace all occurrences of old ID patterns with component name
  for (const [oldId, suffix] of oldIds) {
    const newId = `${componentName}__${suffix}`; // e.g., "FlagAdIcon__clip0_3811_32411"
    
    // Escape special regex characters in oldId for use in regex
    const escapedOldId = oldId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    // Replace in id="..." attributes
    normalized = normalized.replace(new RegExp(`id="${escapedOldId}"`, 'g'), `id="${newId}"`);
    // Replace in url(#...) references (handle both clip-path and clipPath)
    normalized = normalized.replace(new RegExp(`url\\(#${escapedOldId}\\)`, 'g'), `url(#${newId})`);
  }
  
  return normalized;
}

/**
 * Normalize SVG content for use in TSX
 * @param {string} svgContent - Raw SVG content
 * @param {string} componentName - Component name for ID normalization
 * @param {string} category - Category name (e.g., 'fileIcons', 'flags')
 * @returns {string} - Normalized SVG content
 */
function normalizeSVG(svgContent, componentName, category) {
  let normalized = svgContent.trim();
  
  // Ensure viewBox is present
  if (!normalized.includes('viewBox=')) {
    console.warn('Warning: SVG missing viewBox attribute');
  }
  
  // Ensure xmlns is present
  if (!normalized.includes('xmlns=')) {
    normalized = normalized.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
  }
  
  // Fix clipPath rect elements that are missing width/height BEFORE removing width/height
  // Extract viewBox dimensions if available
  const viewBoxMatch = normalized.match(/viewBox="([^"]+)"/);
  if (viewBoxMatch) {
    const viewBox = viewBoxMatch[1].split(/\s+/);
    if (viewBox.length >= 4) {
      const width = viewBox[2];
      const height = viewBox[3];
      // Replace <rect fill="white"/> with proper dimensions in clipPath
      // Match rect elements that only have fill="white" attribute (self-closing or not)
      // This needs to happen before we remove width/height from root SVG
      normalized = normalized.replace(
        /<rect\s+fill="white"\s*\/?>/g,
        `<rect width="${width}" height="${height}" fill="white"/>`
      );
    }
  }
  
  // Remove width/height attributes from root SVG (handled by Icon component)
  // But preserve width/height in clipPath rects (they were just added above)
  normalized = normalized.replace(/<svg([^>]*)\s+width="[^"]*"/gi, '<svg$1');
  normalized = normalized.replace(/<svg([^>]*)\s+height="[^"]*"/gi, '<svg$1');
  
  // Convert SVG kebab-case attributes to React camelCase
  normalized = convertSVGAttributesToReact(normalized);
  
  // Normalize IDs to match component name (fixes casing mismatches)
  normalized = normalizeSVGIds(normalized, componentName);
  
  // Note: We preserve fill attributes on child elements (paths, circles, etc.)
  // as they may be needed for outline icons (fill="none"), brand icons (fill="black"),
  // or file icons (which have their original colors from Figma - red, blue, green, purple, etc.)
  // The Icon component will handle fill on the root SVG element
  
  return normalized;
}

/**
 * Generate TSX component file content
 * @param {string} componentName - Component name (e.g., "ArrowDownIcon")
 * @param {string} svgContent - Normalized SVG content
 * @returns {string} - TSX file content
 */
function generateComponentContent(componentName, svgContent) {
  return `// This file is auto-generated. Do not edit manually.
import type { Props } from '../Icon.types';

import { Icon } from '../Icon';

export const ${componentName} = (props: Props) => {
  return (
    <Icon {...props}>
      ${svgContent}
    </Icon>
  );
};
`;
}

/**
 * Generate index.ts file content for a category
 * @param {string[]} componentNames - Array of component names
 * @returns {string} - Index file content
 */
function generateIndexContent(componentNames) {
  const exports = componentNames
    .sort()
    .map(name => `export { ${name} } from './${name}';`)
    .join('\n');
  
  return `${exports}
`;
}

/**
 * Process a single SVG file
 * @param {string} svgFilePath - Path to SVG file
 * @param {string} category - Category name
 * @returns {string|null} - Component name, or null on error
 */
function processSVGFile(svgFilePath, category) {
  try {
    const svgContent = fs.readFileSync(svgFilePath, 'utf-8');
    
    // Get filename without extension and convert to component name
    const fileName = path.basename(svgFilePath, '.svg');
    const componentName = kebabCaseToComponentName(fileName);
    
    // Normalize SVG (pass componentName for ID normalization and category for color conversion)
    const normalizedSVG = normalizeSVG(svgContent, componentName, category);
    
    // Generate TSX file
    const componentContent = generateComponentContent(componentName, normalizedSVG);
    const outputDir = path.join(ICONS_DIR, category);
    const outputPath = path.join(outputDir, `${componentName}.tsx`);
    
    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Write TSX file
    fs.writeFileSync(outputPath, componentContent, 'utf-8');
    
    return componentName;
  } catch (error) {
    console.error(`❌ Error processing ${svgFilePath}:`, error.message);
    return null;
  }
}

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
    .map(entry => entry.name);
}

/**
 * Clean old TSX files from a category directory (except index.ts)
 * @param {string} category - Category name
 */
function cleanCategoryDirectory(category) {
  const categoryDir = path.join(ICONS_DIR, category);
  
  if (!fs.existsSync(categoryDir)) {
    return;
  }
  
  const entries = fs.readdirSync(categoryDir, { withFileTypes: true });
  const tsxFiles = entries.filter(
    entry => entry.isFile() && entry.name.endsWith('.tsx')
  );
  
  for (const entry of tsxFiles) {
    const filePath = path.join(categoryDir, entry.name);
    fs.unlinkSync(filePath);
  }
}

/**
 * Process all SVGs in a category
 * @param {string} category - Category name
 * @returns {{success: number, failed: number, componentNames: string[]}} - Statistics
 */
function processCategory(category) {
  const categoryDir = path.join(SVG_SOURCE_DIR, category);
  
  if (!fs.existsSync(categoryDir)) {
    console.warn(`⚠️  Category directory not found: ${categoryDir}`);
    return { success: 0, failed: 0, componentNames: [] };
  }
  
  // Clean old TSX files first
  cleanCategoryDirectory(category);
  
  const entries = fs.readdirSync(categoryDir, { withFileTypes: true });
  const svgFiles = entries.filter(
    entry => entry.isFile() && entry.name.endsWith('.svg')
  );
  
  let success = 0;
  let failed = 0;
  const componentNames = [];
  
  for (const entry of svgFiles) {
    const svgFilePath = path.join(categoryDir, entry.name);
    const componentName = processSVGFile(svgFilePath, category);
    
    if (componentName) {
      componentNames.push(componentName);
      success++;
    } else {
      failed++;
    }
  }
  
  // Generate index.ts for category
  if (componentNames.length > 0) {
    const indexContent = generateIndexContent(componentNames);
    const indexPath = path.join(ICONS_DIR, category, 'index.ts');
    fs.writeFileSync(indexPath, indexContent, 'utf-8');
  }
  
  return { success, failed, componentNames };
}

/**
 * Update main index.ts file
 * @param {string[]} categories - Array of category names
 */
function updateMainIndex(categories) {
  const indexPath = path.join(ICONS_DIR, 'index.ts');
  
  // Read existing index.ts to preserve Icon and IconProps exports
  let existingContent = '';
  if (fs.existsSync(indexPath)) {
    existingContent = fs.readFileSync(indexPath, 'utf-8');
  }
  
  // Extract existing Icon/IconProps exports (preserve exact format)
  const iconExportLines = [];
  const lines = existingContent.split('\n');
  for (const line of lines) {
    if (line.includes('from') && (line.includes('./Icon') || line.includes("'./Icon") || line.includes('"./Icon'))) {
      iconExportLines.push(line.trim());
    }
  }
  
  // If no existing exports found, use default
  if (iconExportLines.length === 0) {
    iconExportLines.push("export { Icon } from './Icon';");
    iconExportLines.push("export type { Props as IconProps } from './Icon.types';");
  }
  
  // Generate category exports
  const categoryExports = categories
    .sort()
    .map(category => {
      // Use quotes for category names with spaces or special characters
      const needsQuotes = /[ &]/.test(category);
      const categoryPath = needsQuotes ? `'./${category}'` : `'./${category}'`;
      return `export * from ${categoryPath};`;
    })
    .join('\n');
  
  // Combine all exports
  const newContent = `${iconExportLines.join('\n')}

${categoryExports}
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
  
  // Update main index.ts
  console.log('📝 Updating main index.ts...');
  updateMainIndex(allCategories);
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
