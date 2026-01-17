import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const ICONS_DIR = path.join(ROOT, 'src', 'icons');

const keepFiles = new Set([
  'Icon.tsx',
  'Icon.types.ts',
  'index.ts',
  // Compatibility stubs (e.g. Code Connect mappings)
  'ArrowDownCircleIcon.tsx',
  'ArrowDownCircleFillIcon.tsx',
]);

const entries = fs.readdirSync(ICONS_DIR, { withFileTypes: true });
const deleted = [];

for (const entry of entries) {
  if (!entry.isFile()) continue;
  if (!entry.name.endsWith('.tsx')) continue;
  if (keepFiles.has(entry.name)) continue;

  const abs = path.join(ICONS_DIR, entry.name);
  fs.unlinkSync(abs);
  deleted.push(entry.name);
}

console.log(`Deleted ${deleted.length} root icon component files.`);

