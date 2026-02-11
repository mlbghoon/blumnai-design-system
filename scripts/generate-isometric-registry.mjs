#!/usr/bin/env node

/**
 * 등각 투영 아이콘 레지스트리 생성 (per-chunk lazy loading)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ICONS_DIR = path.join(__dirname, '../src/components/icons/IsometricIcon/icons');
const OUTPUT_FILE = path.join(__dirname, '../src/components/icons/IsometricIcon/isometric-registry.tsx');

function collectComponents() {
  const chunkFiles = fs.readdirSync(ICONS_DIR)
    .filter(f => f.startsWith('iso-') && f.endsWith('.tsx'));

  const components = [];

  for (const file of chunkFiles) {
    const chunk = file.replace('.tsx', '');
    const filePath = path.join(ICONS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');

    const exportRegex = /export const (Iso\w+Icon)\b/g;
    let match;
    while ((match = exportRegex.exec(content)) !== null) {
      const componentName = match[1];
      const parsed = componentName.match(/^Iso(.+)(Top|Left)Icon$/);
      if (parsed) {
        const baseName = parsed[1].toLowerCase();
        const view = parsed[2].toLowerCase();
        components.push({ componentName, baseName, view, chunk });
      }
    }
  }

  return { components, chunkFiles };
}

async function main() {
  const { components, chunkFiles } = collectComponents();

  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log(`${components.length}개 아이콘 컴포넌트 발견 (${chunkFiles.length}개 청크)\n`);

  components.sort((a, b) => a.componentName.localeCompare(b.componentName));

  const chunks = [...new Set(components.map(c => c.chunk))].sort();

  const chunkImporterEntries = chunks
    .map(ch => `  '${ch}': () => import('./icons/${ch}'),`)
    .join('\n');

  const lookupEntries = components
    .map(c => `  '${c.baseName}-${c.view}': ['${c.chunk}', '${c.componentName}'],`)
    .join('\n');

  const registry = `// 이 파일은 자동 생성됩니다 - 직접 수정하지 마세요
import { lazy } from 'react';
import type { LazyExoticComponent, ComponentType } from 'react';

import type { IsometricSvgProps } from './icons/isometric.types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ChunkModule = Record<string, ComponentType<any>>;

/** 청크 모듈 캐시: 로드된 청크 모듈 저장 */
const chunkModuleCache: Record<string, ChunkModule> = {};
const chunkLoadPromises: Record<string, Promise<ChunkModule>> = {};

/** 청크별 동적 import 함수 (${chunks.length}개) */
const chunkImporters: Record<string, () => Promise<ChunkModule>> = {
${chunkImporterEntries}
};

/** 아이콘 조회 테이블: registryKey -> [chunk, componentName] */
const iconLookup: Record<string, [string, string]> = {
${lookupEntries}
};

/** 청크 모듈을 로드하고 캐시 */
function loadChunk(chunk: string): Promise<ChunkModule> {
  if (chunkModuleCache[chunk]) return Promise.resolve(chunkModuleCache[chunk]);
  if (!chunkLoadPromises[chunk]) {
    const importer = chunkImporters[chunk];
    if (!importer) return Promise.reject(new Error(\`Unknown chunk: \${chunk}\`));
    chunkLoadPromises[chunk] = importer().then(mod => {
      chunkModuleCache[chunk] = mod as ChunkModule;
      return chunkModuleCache[chunk];
    });
  }
  return chunkLoadPromises[chunk];
}

/** 동기 조회: 청크가 이미 로드된 경우 아이콘 반환 */
export function getIsoSync(key: string): ComponentType<IsometricSvgProps> | null {
  const info = iconLookup[key];
  if (!info) return null;
  const [chunk, componentName] = info;
  const mod = chunkModuleCache[chunk];
  if (!mod) return null;
  return (mod[componentName] as ComponentType<IsometricSvgProps>) || null;
}

const lazyCache: Record<string, LazyExoticComponent<ComponentType<IsometricSvgProps>>> = {};

/** lazy 조회: 청크가 아직 로드되지 않은 경우 lazy 컴포넌트 반환 */
export function getIsoLazy(key: string): LazyExoticComponent<ComponentType<IsometricSvgProps>> | null {
  const info = iconLookup[key];
  if (!info) return null;

  if (!lazyCache[key]) {
    const [chunk, componentName] = info;
    lazyCache[key] = lazy(() =>
      loadChunk(chunk).then(mod => ({
        default: mod[componentName] as ComponentType<IsometricSvgProps>,
      }))
    );
  }
  return lazyCache[key];
}

/** 아이콘 존재 여부 확인 */
export function hasIso(key: string): boolean {
  return key in iconLookup;
}
`;

  fs.writeFileSync(OUTPUT_FILE, registry);
  console.log(`✅ 레지스트리 저장: ${OUTPUT_FILE}`);
  console.log(`   - ${components.length}개 컴포넌트, ${chunks.length}개 청크`);
}

main().catch(err => {
  console.error('❌ 오류:', err.message);
  process.exit(1);
});
