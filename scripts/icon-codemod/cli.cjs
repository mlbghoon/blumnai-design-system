#!/usr/bin/env node
/**
 * CLI wrapper for the Icon migration codemod.
 *
 * Spawns `npx jscodeshift` with this package's bundled transform so consumers
 * don't have to know the transform path inside node_modules.
 *
 * Usage (after `npm install @blumnai-studio/blumnai-design-system`):
 *   npx blumnai-icon-codemod ./src
 *   npx blumnai-icon-codemod --dry --print ./src/components/foo.tsx
 *
 * All extra args are forwarded to jscodeshift untouched.
 */

const { spawn } = require('node:child_process');
const path = require('node:path');

const TRANSFORM = path.join(__dirname, 'transform.cjs');
const userArgs = process.argv.slice(2);

if (userArgs.length === 0 || userArgs.includes('--help') || userArgs.includes('-h')) {
  process.stdout.write(
    [
      'Usage: npx blumnai-icon-codemod [jscodeshift options] <files...>',
      '',
      'Converts <Icon iconType={[cat, name]}> -> <Icon icon={Ri*Line|Fill}> for static literal usage.',
      'Dynamic patterns (variables, conditionals) are left untouched and keep working via back-compat.',
      '',
      'Examples:',
      '  npx blumnai-icon-codemod ./src',
      '  npx blumnai-icon-codemod --dry --print ./src/components/foo.tsx',
      '',
    ].join('\n'),
  );
  process.exit(userArgs.length === 0 ? 1 : 0);
}

const args = ['--yes', 'jscodeshift', '-t', TRANSFORM, '--parser=tsx', '--extensions=ts,tsx,js,jsx', ...userArgs];

const child = spawn('npx', args, { stdio: 'inherit' });
child.on('exit', (code) => process.exit(code ?? 1));
child.on('error', (err) => {
  process.stderr.write(`Failed to spawn npx: ${err.message}\n`);
  process.exit(1);
});
