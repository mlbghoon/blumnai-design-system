#!/usr/bin/env node

// Post-build: prepend "use client" directive to component .mjs files.
//
// Vite/esbuild strips "use client" directives during minification.
// Next.js 13+ App Router requires these directives so React knows
// which modules need the client runtime.
//
// Applied to:
//   - dist/components/ (all .mjs files)
//   - dist/index.mjs
//
// NOT applied to:
//   - dist/hooks/
//   - dist/utils/
//   - dist/constants/
//   - dist/tokens/

import fs from 'node:fs';
import path from 'node:path';

const DIST = path.resolve(process.cwd(), 'dist');
const DIRECTIVE = '"use client";\n';

const SKIP_DIRS = new Set(['hooks', 'utils', 'constants', 'tokens']);

function collectMjsFiles(dir) {
  const files = [];
  if (!fs.existsSync(dir)) return files;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectMjsFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.mjs')) {
      files.push(fullPath);
    }
  }
  return files;
}

function prependDirective(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  if (content.startsWith('"use client"')) return false;
  fs.writeFileSync(filePath, DIRECTIVE + content, 'utf8');
  return true;
}

let injected = 0;
let skipped = 0;

// 1. dist/index.mjs
const indexPath = path.join(DIST, 'index.mjs');
if (fs.existsSync(indexPath)) {
  if (prependDirective(indexPath)) injected++;
  else skipped++;
}

// 2. dist/components/**/*.mjs
const componentsDir = path.join(DIST, 'components');
for (const file of collectMjsFiles(componentsDir)) {
  if (prependDirective(file)) injected++;
  else skipped++;
}

// Verify skip dirs were not touched
for (const dir of SKIP_DIRS) {
  const dirPath = path.join(DIST, dir);
  if (!fs.existsSync(dirPath)) continue;
  for (const file of collectMjsFiles(dirPath)) {
    const content = fs.readFileSync(file, 'utf8');
    if (content.startsWith('"use client"')) {
      console.warn(`WARNING: ${path.relative(DIST, file)} unexpectedly has "use client"`);
    }
  }
}

console.log(
  `Injected "use client" into ${injected} files (${skipped} already had it).`
);
