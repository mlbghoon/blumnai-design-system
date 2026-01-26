#!/usr/bin/env node

/**
 * Clean base64 images from Thumbnail SVG source files
 * This ensures source files are clean from the start, preventing images
 * from being included during generation
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const SVG_SOURCE_DIR = path.join(ROOT, 'src', 'icons', 'svg-source', 'fileIcons');

/**
 * Remove base64 images from SVG string
 */
function removeBase64FromSvg(svg) {
  let cleaned = String(svg);
  
  // Remove <image> tags with base64 data
  let imageStart = cleaned.indexOf('<image');
  while (imageStart !== -1) {
    const tagEnd = cleaned.indexOf('>', imageStart);
    if (tagEnd === -1) break;
    
    const tagContent = cleaned.slice(imageStart, tagEnd + 1);
    const hasBase64 = tagContent.includes('data:image') || 
                      tagContent.includes('xlink:href="data:') ||
                      tagContent.includes('href="data:') ||
                      tagContent.includes('xlinkHref="data:');
    
    if (hasBase64) {
      const imageEnd = cleaned.indexOf('</image>', imageStart);
      if (imageEnd !== -1) {
        cleaned = cleaned.slice(0, imageStart) + cleaned.slice(imageEnd + 8);
      } else {
        // Self-closing tag
        cleaned = cleaned.slice(0, imageStart) + cleaned.slice(tagEnd + 1);
      }
      imageStart = cleaned.indexOf('<image', imageStart);
    } else {
      imageStart = cleaned.indexOf('<image', tagEnd + 1);
    }
  }
  
  // Remove pattern definitions that reference images
  cleaned = cleaned.replace(/<pattern[^>]*>[\s\S]*?<\/pattern>/gi, (match) => {
    if (match.includes('image0') || 
        match.includes('xlink:href="#image') || 
        match.includes('href="#image') || 
        match.includes('<use')) {
      return '';
    }
    return match;
  });
  
  // Remove <use> tags that reference image patterns
  cleaned = cleaned.replace(/<use[^>]*xlink:href="#image[^>]*>/gi, '');
  cleaned = cleaned.replace(/<use[^>]*href="#image[^>]*>/gi, '');
  
  // Replace pattern fill with transparent
  cleaned = cleaned.replace(/fill="url\(#pattern[^)]+\)"/gi, 'fill="transparent"');
  
  // Also handle JSX-style attributes (xlinkHref)
  cleaned = cleaned.replace(/xlinkHref="data:image[^"]*"/gi, '');
  
  return cleaned;
}

if (!fs.existsSync(SVG_SOURCE_DIR)) {
  console.error(`❌ SVG source directory not found: ${SVG_SOURCE_DIR}`);
  process.exit(1);
}

console.log('🧹 Cleaning base64 images from Thumbnail SVG source files...\n');

const files = fs.readdirSync(SVG_SOURCE_DIR)
  .filter(file => file.includes('thumbnail') && file.endsWith('.svg'))
  .map(file => path.join(SVG_SOURCE_DIR, file));

if (files.length === 0) {
  console.log('✨ No Thumbnail SVG files found');
  process.exit(0);
}

let cleanedCount = 0;
let totalSizeReduction = 0;

for (const filePath of files) {
  const fileName = path.basename(filePath);
  const originalContent = fs.readFileSync(filePath, 'utf-8');
  const originalSize = Buffer.byteLength(originalContent, 'utf8');
  
  // Check if file has base64 images
  if (!originalContent.includes('data:image') && 
      !originalContent.includes('xlink:href="data:') &&
      !originalContent.includes('xlinkHref="data:')) {
    console.log(`  ⏭️  Skipped (already clean): ${fileName}`);
    continue;
  }
  
  const cleanedContent = removeBase64FromSvg(originalContent);
  const cleanedSize = Buffer.byteLength(cleanedContent, 'utf8');
  const sizeReduction = originalSize - cleanedSize;
  
  // Create backup
  const backupPath = `${filePath}.backup`;
  if (!fs.existsSync(backupPath)) {
    fs.writeFileSync(backupPath, originalContent, 'utf-8');
  }
  
  // Write cleaned content
  fs.writeFileSync(filePath, cleanedContent, 'utf-8');
  
  cleanedCount++;
  totalSizeReduction += sizeReduction;
  
  const sizeReductionMB = (sizeReduction / (1024 * 1024)).toFixed(2);
  const originalSizeMB = (originalSize / (1024 * 1024)).toFixed(2);
  const cleanedSizeKB = (cleanedSize / 1024).toFixed(2);
  
  console.log(`  ✅ Cleaned: ${fileName}`);
  console.log(`     ${originalSizeMB}MB → ${cleanedSizeKB}KB (saved ${sizeReductionMB}MB)`);
}

if (cleanedCount > 0) {
  const totalReductionMB = (totalSizeReduction / (1024 * 1024)).toFixed(2);
  console.log(`\n✨ Cleaned ${cleanedCount} Thumbnail SVG source files`);
  console.log(`   Total size reduction: ${totalReductionMB}MB`);
  console.log(`   Backups created: *.svg.backup`);
} else {
  console.log('\n✨ All Thumbnail SVG source files are already clean');
}

console.log('\n✅ Done!\n');
