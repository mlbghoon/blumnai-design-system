#!/usr/bin/env node

/**
 * Remove base64 images from Thumbnail icons in sortui.file-icons.json
 * This prevents base64 images from being included when generating icon components
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const JSON_PATH = path.join(ROOT, 'src', 'icons', 'source', 'sortui.file-icons.json');

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
                      tagContent.includes('href="data:');
    
    if (hasBase64) {
      const imageEnd = cleaned.indexOf('</image>', imageStart);
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
  
  return cleaned;
}

if (!fs.existsSync(JSON_PATH)) {
  console.error(`❌ JSON file not found: ${JSON_PATH}`);
  process.exit(1);
}

console.log('🧹 Cleaning base64 images from Thumbnail icons...\n');

const jsonContent = fs.readFileSync(JSON_PATH, 'utf-8');
const data = JSON.parse(jsonContent);

let cleanedCount = 0;
const thumbnailKeys = Object.keys(data).filter(key => 
  key.toLowerCase().includes('thumbnail')
);

for (const key of thumbnailKeys) {
  const originalSvg = data[key];
  if (typeof originalSvg !== 'string') {
    console.warn(`  ⚠️ Skipped (not a string): ${key}`);
    continue;
  }
  const cleanedSvg = removeBase64FromSvg(originalSvg);

  if (originalSvg !== cleanedSvg) {
    data[key] = cleanedSvg;
    cleanedCount++;
    console.log(`  ✅ Cleaned: ${key}`);
  }
}

if (cleanedCount > 0) {
  // Create backup
  const backupPath = `${JSON_PATH}.backup`;
  fs.writeFileSync(backupPath, jsonContent, 'utf-8');
  console.log(`\n📦 Backup created: ${backupPath}`);
  
  // Write cleaned JSON
  fs.writeFileSync(JSON_PATH, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`\n✨ Cleaned ${cleanedCount} Thumbnail icons`);
  console.log(`   Original JSON updated: ${JSON_PATH}`);
} else {
  console.log('\n✨ No base64 images found in Thumbnail icons');
}

console.log('\n✅ Done!\n');
