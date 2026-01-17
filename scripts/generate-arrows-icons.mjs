import { execSync } from 'node:child_process';

execSync('node scripts/generate-icons-category.mjs Arrows', { stdio: 'inherit' });
execSync('node scripts/regenerate-icons-index.mjs', { stdio: 'inherit' });

