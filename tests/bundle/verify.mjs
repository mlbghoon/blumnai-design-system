#!/usr/bin/env node
/**
 * Bundle verification harness driver.
 *
 * Builds `tests/bundle/preflight-direct` and `tests/bundle/preflight-legacy` and
 * asserts:
 *   - direct build: NO async chunk matching /remixicon|index-.*\.js/ over the size threshold
 *     (i.e., main bundle only; no chunk pulling @remixicon/react)
 *   - legacy build: at least one chunk > 1MB (the @remixicon/react chunk must exist)
 *
 * Exit codes:
 *   0 — both projects pass
 *   1 — verification failure (regression)
 *   2 — driver itself failed (install/build error)
 */

import { spawnSync } from 'node:child_process';
import { readdirSync, statSync, existsSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..', '..');

const PROJECTS = [
  {
    name: 'preflight-direct',
    dir: path.join(__dirname, 'preflight-direct'),
    expect: 'no-chunk',
  },
  {
    name: 'preflight-legacy',
    dir: path.join(__dirname, 'preflight-legacy'),
    expect: 'chunk',
  },
];

function run(cmd, args, cwd) {
  const result = spawnSync(cmd, args, {
    cwd,
    stdio: 'inherit',
    env: { ...process.env },
  });
  if (result.status !== 0) {
    console.error(`✗ ${cmd} ${args.join(' ')} failed in ${cwd}`);
    process.exit(2);
  }
}

function listBundleSizes(distAssetsDir) {
  if (!existsSync(distAssetsDir)) return [];
  return readdirSync(distAssetsDir)
    .filter((f) => f.endsWith('.js'))
    .map((f) => ({
      name: f,
      size: statSync(path.join(distAssetsDir, f)).size,
    }));
}

const DIST_FRESH = !!process.env.SKIP_BUILD_LIB ? false : true;
if (DIST_FRESH) {
  console.log('▶ Building DS dist…');
  run('npm', ['run', 'build:lib'], REPO_ROOT);
}

let failed = false;

for (const project of PROJECTS) {
  console.log(`\n▶ Verifying ${project.name}…`);

  // Force fresh install of the file:../../.. dep so the latest dist is picked up.
  const consumedDsDir = path.join(project.dir, 'node_modules', '@blumnai-studio');
  if (existsSync(consumedDsDir)) {
    rmSync(consumedDsDir, { recursive: true, force: true });
  }
  const lockFile = path.join(project.dir, 'package-lock.json');
  if (existsSync(lockFile)) rmSync(lockFile, { force: true });

  run('npm', ['install', '--legacy-peer-deps', '--no-audit', '--no-fund'], project.dir);

  const distDir = path.join(project.dir, 'dist');
  if (existsSync(distDir)) rmSync(distDir, { recursive: true, force: true });

  run('npx', ['vite', 'build'], project.dir);

  const sizes = listBundleSizes(path.join(distDir, 'assets'));
  const totalKB = (sizes.reduce((acc, s) => acc + s.size, 0) / 1024).toFixed(2);
  console.log(`  files: ${sizes.length}, total ${totalKB} KB`);
  for (const s of sizes) {
    console.log(`    ${s.name}: ${(s.size / 1024).toFixed(2)} KB`);
  }

  if (project.expect === 'no-chunk') {
    // 단일 main bundle만 있어야 함. 추가 async chunk가 있거나 총합이 500KB 초과면 regression.
    if (sizes.length !== 1) {
      console.error(
        `  ✗ FAIL — expected exactly 1 bundle file, got ${sizes.length}. ` +
        'Likely cause: `import("@remixicon/react")` re-entered the main entry graph.',
      );
      failed = true;
      continue;
    }
    const onlyFile = sizes[0];
    if (onlyFile.size > 500 * 1024) {
      console.error(
        `  ✗ FAIL — main bundle ${(onlyFile.size / 1024).toFixed(2)} KB > 500 KB threshold. ` +
        'Tree-shaking may have regressed.',
      );
      failed = true;
      continue;
    }
    console.log(`  ✓ PASS — single bundle ${(onlyFile.size / 1024).toFixed(2)} KB, no async chunk`);
  } else if (project.expect === 'chunk') {
    // Legacy 빌드는 @remixicon/react chunk가 있어야 함 (~2.4MB).
    const bigChunk = sizes.find((s) => s.size > 1024 * 1024);
    if (!bigChunk) {
      console.error(
        '  ✗ FAIL — expected legacy build to emit a >1MB async chunk (the @remixicon/react chunk), ' +
        'but none found. The legacy entry may be broken.',
      );
      failed = true;
      continue;
    }
    console.log(`  ✓ PASS — legacy chunk present (${bigChunk.name}, ${(bigChunk.size / 1024).toFixed(2)} KB)`);
  }
}

if (failed) {
  console.error('\n✗ Bundle verification failed.');
  process.exit(1);
}
console.log('\n✓ Bundle verification passed.');
