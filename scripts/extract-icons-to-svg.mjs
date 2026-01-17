#!/usr/bin/env node

/**
 * Extract SVG content from existing TSX icon files and save them as SVG source files.
 * 
 * This script:
 * 1. Scans all category directories in src/icons/
 * 2. Reads each .tsx icon file
 * 3. Extracts the SVG element content
 * 4. Converts component name to kebab-case filename
 * 5. Saves SVG to src/icons/svg-source/{category}/{kebab-name}.svg
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const ICONS_DIR = path.join(ROOT, 'src', 'icons');
const SVG_SOURCE_DIR = path.join(ICONS_DIR, 'svg-source');

// Files to exclude from processing
const EXCLUDE_FILES = [
  'Icon.tsx',
  'Icon.types.ts',
  'index.ts',
  'Icons.stories.tsx',
];

// Root-level re-export files to exclude (they're just re-exports, not actual components)
const ROOT_REEXPORT_PATTERN = /^[A-Z].*Icon\.tsx$/;

/**
 * Convert PascalCase component name to kebab-case filename
 * @param {string} componentName - e.g., "ArrowDownIcon"
 * @returns {string} - e.g., "arrow-down"
 */
function componentNameToKebabCase(componentName) {
  // Remove "Icon" suffix if present
  let baseName = componentName.replace(/Icon$/, '');
  
  // Convert PascalCase to kebab-case
  return baseName
    .replace(/([a-z])([A-Z])/g, '$1-$2') // Insert hyphen between lowercase and uppercase
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2') // Handle consecutive capitals
    .toLowerCase();
}

/**
 * Extract SVG element from TSX file content
 * @param {string} content - TSX file content
 * @returns {string|null} - SVG element as string, or null if not found
 */
function extractSVG(content) {
  // Match <svg>...</svg> including nested content
  // Use a more robust regex that handles multi-line and nested structures
  const svgMatch = content.match(/<svg[^>]*>[\s\S]*?<\/svg>/);
  if (!svgMatch) {
    return null;
  }
  
  let svgContent = svgMatch[0];
  
  // Remove width and height attributes (handled by Icon component)
  svgContent = svgContent.replace(/\s+width="[^"]*"/gi, '');
  svgContent = svgContent.replace(/\s+height="[^"]*"/gi, '');
  
  // Ensure viewBox is present (required)
  if (!svgContent.includes('viewBox=')) {
    console.warn('Warning: SVG missing viewBox attribute');
  }
  
  // Ensure xmlns is present
  if (!svgContent.includes('xmlns=')) {
    svgContent = svgContent.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
  }
  
  return svgContent;
}

/**
 * Extract component name from TSX file
 * @param {string} content - TSX file content
 * @returns {string|null} - Component name, or null if not found
 */
function extractComponentName(content) {
  const match = content.match(/export\s+const\s+(\w+)\s*=/);
  return match ? match[1] : null;
}

/**
 * Process a single TSX icon file
 * @param {string} filePath - Path to TSX file
 * @param {string} category - Category name
 * @returns {boolean} - Success status
 */
function processIconFile(filePath, category) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const componentName = extractComponentName(content);
    
    if (!componentName) {
      console.warn(`⚠️  Could not extract component name from: ${filePath}`);
      return false;
    }
    
    const svgContent = extractSVG(content);
    if (!svgContent) {
      console.warn(`⚠️  Could not extract SVG from: ${filePath}`);
      return false;
    }
    
    // Convert component name to kebab-case filename
    const kebabName = componentNameToKebabCase(componentName);
    const svgFileName = `${kebabName}.svg`;
    const svgFilePath = path.join(SVG_SOURCE_DIR, category, svgFileName);
    
    // Write SVG file
    fs.writeFileSync(svgFilePath, svgContent, 'utf-8');
    
    return true;
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

/**
 * Get all category directories
 * @returns {string[]} - Array of category names
 */
function getCategoryDirectories() {
  const entries = fs.readdirSync(ICONS_DIR, { withFileTypes: true });
  return entries
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name)
    .filter(name => name !== 'source' && name !== 'svg-source'); // Exclude metadata and source dirs
}

/**
 * Process all icons in a category
 * @param {string} category - Category name
 * @returns {{success: number, failed: number}} - Statistics
 */
function processCategory(category) {
  const categoryDir = path.join(ICONS_DIR, category);
  
  if (!fs.existsSync(categoryDir)) {
    console.warn(`⚠️  Category directory not found: ${categoryDir}`);
    return { success: 0, failed: 0 };
  }
  
  // Create corresponding svg-source directory if it doesn't exist
  const svgCategoryDir = path.join(SVG_SOURCE_DIR, category);
  if (!fs.existsSync(svgCategoryDir)) {
    fs.mkdirSync(svgCategoryDir, { recursive: true });
  }
  
  const entries = fs.readdirSync(categoryDir, { withFileTypes: true });
  const tsxFiles = entries.filter(
    entry => entry.isFile() && entry.name.endsWith('.tsx') && !EXCLUDE_FILES.includes(entry.name)
  );
  
  let success = 0;
  let failed = 0;
  
  for (const entry of tsxFiles) {
    const filePath = path.join(categoryDir, entry.name);
    if (processIconFile(filePath, category)) {
      success++;
    } else {
      failed++;
    }
  }
  
  return { success, failed };
}

/**
 * Main execution
 */
function main() {
  console.log('🚀 Starting icon extraction...\n');
  
  // Ensure svg-source directory exists
  if (!fs.existsSync(SVG_SOURCE_DIR)) {
    fs.mkdirSync(SVG_SOURCE_DIR, { recursive: true });
  }
  
  const categories = getCategoryDirectories();
  console.log(`📁 Found ${categories.length} categories\n`);
  
  let totalSuccess = 0;
  let totalFailed = 0;
  
  for (const category of categories) {
    console.log(`📦 Processing category: ${category}`);
    const stats = processCategory(category);
    totalSuccess += stats.success;
    totalFailed += stats.failed;
    console.log(`   ✅ ${stats.success} extracted, ❌ ${stats.failed} failed\n`);
  }
  
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`✨ Extraction complete!`);
  console.log(`   Total: ${totalSuccess + totalFailed} icons`);
  console.log(`   ✅ Success: ${totalSuccess}`);
  console.log(`   ❌ Failed: ${totalFailed}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  if (totalFailed > 0) {
    process.exit(1);
  }
}

main();
