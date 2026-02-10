#!/usr/bin/env node

/**
 * Post-build cleanup: remove individual icon .d.ts files from dist.
 * These are emitted by tsc because ui-icon-registry.tsx transitively imports them,
 * but consumers never import individual icon components directly.
 * Type safety comes from IconType union in Icon.types.d.ts.
 */

import fs from 'node:fs';
import path from 'node:path';

const DIST_DIR = path.resolve(process.cwd(), 'dist');

const ICON_DIRS = [
  'components/icons/Icon/icons',
  'components/icons/BrandIcon/icons',
  'components/icons/FlagIcon/icons',
  'components/icons/FileIcon/icons',
  'components/icons/IsometricIcon/icons',
  'components/icons/CursorIcon/icons',
];

let totalRemoved = 0;

for (const dir of ICON_DIRS) {
  const fullPath = path.join(DIST_DIR, dir);
  if (!fs.existsSync(fullPath)) continue;

  const removeDtsRecursive = (dirPath) => {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    for (const entry of entries) {
      const entryPath = path.join(dirPath, entry.name);
      if (entry.isDirectory()) {
        removeDtsRecursive(entryPath);
      } else if (entry.name.endsWith('.d.ts')) {
        fs.unlinkSync(entryPath);
        totalRemoved++;
      }
    }
  };

  removeDtsRecursive(fullPath);
}

console.log(`Cleaned ${totalRemoved} icon .d.ts files from dist.`);
