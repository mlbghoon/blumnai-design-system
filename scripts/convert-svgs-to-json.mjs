#!/usr/bin/env node

/**
 * SVG 파일들을 JSON 스냅샷으로 변환
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SVG_DIR = path.join(__dirname, '../src/icons/isometricIcon/svg-source');
const OUTPUT_FILE = path.join(__dirname, '../src/icons/source/isocons.isometric.subset.json');

function parseFilename(filename) {
  // "add-circle-top.svg" -> "add-circle-T"
  // "add-circle-left.svg" -> "add-circle-L"
  const match = filename.replace('.svg', '').match(/^(.+)-(top|left)$/);
  if (match) {
    const view = match[2] === 'top' ? 'T' : 'L';
    return `${match[1]}-${view}`;
  }
  return null;
}

async function main() {
  const svgFiles = fs.readdirSync(SVG_DIR).filter(f => f.endsWith('.svg'));
  console.log(`${svgFiles.length}개 SVG 파일 발견\n`);

  const result = {};

  for (const filename of svgFiles) {
    const key = parseFilename(filename);
    if (!key) {
      console.warn(`⚠ 파일 이름 형식 오류: ${filename}`);
      continue;
    }

    const svgContent = fs.readFileSync(path.join(SVG_DIR, filename), 'utf-8');
    result[key] = svgContent;
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(result, null, 2));
  console.log(`✅ 저장 완료: ${OUTPUT_FILE}`);
  console.log(`   - ${Object.keys(result).length}개 아이콘`);
}

main().catch(err => {
  console.error('❌ 오류:', err.message);
  process.exit(1);
});
