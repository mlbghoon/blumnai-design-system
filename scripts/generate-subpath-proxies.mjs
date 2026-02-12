#!/usr/bin/env node

/**
 * exports 필드를 지원하지 않는 번들러(webpack 4, Next.js 12 등)를 위해
 * 서브패스 프록시 디렉터리를 생성합니다.
 *
 * 예: ./button/package.json → { "main": "../dist/components/button/index.mjs" }
 *
 * 이렇게 하면 import { Button } from '@pkg/button' 이
 * exports 필드 없이도 동작합니다.
 */

import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));

const exports = pkg.exports || {};

const SKIP = new Set(['.', './*']);

// baseUrl 설정 시 node_modules 패키지와 이름이 충돌하는 프록시 제외
const allDeps = new Set([
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
  ...Object.keys(pkg.optionalDependencies || {}),
]);

const proxyDirs = [];

for (const [subpath, target] of Object.entries(exports)) {
  if (SKIP.has(subpath)) continue;

  const dirPath = subpath.replace(/^\.\//, '');
  if (allDeps.has(dirPath)) {
    console.log(`  Skipping '${dirPath}' (collides with npm dependency)`);
    continue;
  }

  const importPath = typeof target === 'string' ? target : target?.import;
  const typesPath = typeof target === 'object' ? target?.types : undefined;

  if (!importPath) continue;

  const fullDir = path.join(ROOT, dirPath);

  fs.mkdirSync(fullDir, { recursive: true });

  // "../" depth based on nesting
  const depth = dirPath.split('/').length;
  const prefix = '../'.repeat(depth);

  const proxyPkg = {
    main: prefix + importPath.replace(/^\.\//, ''),
    module: prefix + importPath.replace(/^\.\//, ''),
  };

  if (typesPath) {
    proxyPkg.types = prefix + typesPath.replace(/^\.\//, '');
  }

  fs.writeFileSync(
    path.join(fullDir, 'package.json'),
    JSON.stringify(proxyPkg, null, 2) + '\n'
  );

  proxyDirs.push(dirPath);
}

console.log(`Generated ${proxyDirs.length} subpath proxy directories.`);
