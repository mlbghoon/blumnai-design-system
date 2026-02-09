#!/usr/bin/env node

/**
 * 등각 투영 아이콘 레지스트리 생성
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ICONS_DIR = path.join(__dirname, '../src/icons/isometricIcon');
const OUTPUT_FILE = path.join(__dirname, '../src/components/icons/IsometricIcon/isometric-registry.tsx');

function parseComponentName(filename) {
  // IsoAddCircleTopIcon.tsx -> { componentName: "IsoAddCircleTopIcon", baseName: "addcircle", view: "top" }
  const componentName = filename.replace('.tsx', '');
  const match = componentName.match(/^Iso(.+)(Top|Left)Icon$/);
  if (match) {
    const baseName = match[1].toLowerCase();
    const view = match[2].toLowerCase();
    return { componentName, baseName, view };
  }
  return null;
}

async function main() {
  const files = fs.readdirSync(ICONS_DIR)
    .filter(f => f.endsWith('.tsx') && f.startsWith('Iso') && f !== 'index.tsx');

  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log(`${files.length}개 아이콘 파일 발견\n`);

  const components = [];
  for (const file of files) {
    const parsed = parseComponentName(file);
    if (parsed) {
      components.push(parsed);
    }
  }

  // 정렬
  components.sort((a, b) => a.componentName.localeCompare(b.componentName));

  // 레지스트리 생성
  const imports = components
    .map(c => `const ${c.componentName} = lazy(() => import('../../../icons/isometricIcon/${c.componentName}').then(m => ({ default: m.${c.componentName} })));`)
    .join('\n');

  const entries = components
    .map(c => `  '${c.baseName}-${c.view}': ${c.componentName},`)
    .join('\n');

  const registry = `// 이 파일은 자동 생성됩니다 - 직접 수정하지 마세요
import React, { lazy } from 'react';

${imports}

export const isometricRegistry: Record<string, React.LazyExoticComponent<React.ComponentType<any>>> = {
${entries}
};
`;

  fs.writeFileSync(OUTPUT_FILE, registry);
  console.log(`✅ 레지스트리 저장: ${OUTPUT_FILE}`);
  console.log(`   - ${components.length}개 컴포넌트`);
}

main().catch(err => {
  console.error('❌ 오류:', err.message);
  process.exit(1);
});
