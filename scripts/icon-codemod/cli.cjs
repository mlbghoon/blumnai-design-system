#!/usr/bin/env node
/**
 * CLI wrapper for the Icon migration codemod.
 *
 * Subcommand dispatch (v2.0+):
 *   migrate <files...>   tuple → component-ref 변환 (권장; chunk 영구 제거)
 *   escape <files...>    import 경로를 .../icons/icon-legacy 로 우회
 *                        (v2.0.x 후속 패치 예정 — 현재는 안내 메시지만 출력)
 *   help                 도움말
 *
 * Backwards-compat: 첫 인자가 서브커맨드가 아니면 기본적으로 `migrate` 로 동작
 * (v1.10.x 시절 `npx blumnai-icon-codemod ./src` 사용 패턴 유지).
 *
 * Usage:
 *   npx blumnai-icon-codemod migrate ./src
 *   npx blumnai-icon-codemod migrate --dry --print ./src/components/foo.tsx
 *   npx blumnai-icon-codemod ./src              # back-compat: migrate 와 동일
 *
 * All jscodeshift options after the subcommand are forwarded untouched.
 */

const { spawn } = require('node:child_process');
const path = require('node:path');

const TRANSFORM = path.join(__dirname, 'transform.cjs');

const SUBCOMMANDS = new Set(['migrate', 'escape', 'help']);
const HELP_FLAGS = new Set(['help', '-h', '--help']);

const userArgs = process.argv.slice(2);

function printHelp() {
  process.stdout.write(
    [
      'blumnai-icon-codemod — Icon tuple-form 마이그레이션 도구',
      '',
      'Usage:',
      '  npx blumnai-icon-codemod migrate <files...>   # tuple → component-ref (권장)',
      '  npx blumnai-icon-codemod escape  <files...>   # icon-legacy 로 import 경로만 변경 (예정)',
      '  npx blumnai-icon-codemod help                 # 도움말',
      '',
      'Back-compat: 첫 인자가 서브커맨드가 아니면 `migrate` 로 처리됩니다.',
      '',
      'Examples:',
      '  npx blumnai-icon-codemod migrate ./src',
      '  npx blumnai-icon-codemod migrate --dry --print ./src/components/foo.tsx',
      '  npx blumnai-icon-codemod ./src                # (= migrate ./src)',
      '',
      '동작:',
      '  migrate: <Icon iconType={[cat, name]}> 와 leadIcon/tailIcon/icon/buttonLeadIcon/',
      '           buttonTailIcon={[cat, name]} 의 static literal tuple 을 Ri* component',
      '           reference 로 변환하고 import 를 자동 추가합니다.',
      '           Dynamic 패턴(변수, 조건부, 함수 반환값)은 변환하지 않고 남깁니다.',
      '',
      '  escape:  현재 미구현. v2.0.x 후속 패치 예정.',
      '           당분간 수동으로 import 경로만 \'@blumnai-studio/blumnai-design-system\'',
      '           에서 \'@blumnai-studio/blumnai-design-system/icons/icon-legacy\' 로',
      '           변경하시면 됩니다 (Icon → LegacyIcon 별칭 권장).',
      '',
      '자세한 마이그레이션 가이드: MIGRATION.md',
      '',
    ].join('\n'),
  );
}

function runMigrate(forwardedArgs) {
  if (forwardedArgs.length === 0) {
    process.stderr.write(
      'blumnai-icon-codemod migrate: 변환할 파일/디렉터리 경로를 적어주세요.\n' +
      '예: npx blumnai-icon-codemod migrate ./src\n',
    );
    process.exit(1);
  }
  const args = [
    '--yes',
    'jscodeshift',
    '-t', TRANSFORM,
    '--parser=tsx',
    '--extensions=ts,tsx,js,jsx',
    ...forwardedArgs,
  ];
  const child = spawn('npx', args, { stdio: 'inherit' });
  child.on('exit', (code) => process.exit(code ?? 1));
  child.on('error', (err) => {
    process.stderr.write(`Failed to spawn npx: ${err.message}\n`);
    process.exit(1);
  });
}

function runEscape() {
  process.stderr.write(
    [
      'blumnai-icon-codemod escape: 현재 미구현 (v2.0.x 후속 패치 예정).',
      '',
      '당분간 수동 작업 안내:',
      '  1) tuple 형 아이콘을 쓰는 파일을 찾으세요:',
      '       grep -rE "iconType=|leadIcon=\\{\\[|tailIcon=\\{\\[" ./src',
      '  2) 각 파일의 import 경로를 변경하세요:',
      '       - import { Icon, … } from \'@blumnai-studio/blumnai-design-system\';',
      '       + import { Icon as LegacyIcon, … } from \'@blumnai-studio/blumnai-design-system/icons/icon-legacy\';',
      '       그리고 해당 파일의 tuple 형 <Icon …> 사용을 <LegacyIcon …> 로 변경.',
      '  3) 또는 더 권장: `npx blumnai-icon-codemod migrate ./src` 로 component-ref 변환.',
      '',
      '자세한 가이드: MIGRATION.md',
      '',
    ].join('\n'),
  );
  process.exit(1);
}

// ────────────────────────────────────────────────────────────────────────────

if (userArgs.length === 0) {
  printHelp();
  process.exit(1);
}

const first = userArgs[0];

if (HELP_FLAGS.has(first)) {
  printHelp();
  process.exit(0);
}

if (first === 'migrate') {
  runMigrate(userArgs.slice(1));
} else if (first === 'escape') {
  runEscape();
} else if (SUBCOMMANDS.has(first)) {
  // Future subcommands fall through to help.
  printHelp();
  process.exit(0);
} else {
  // Back-compat: not a known subcommand → treat as `migrate` (v1.10.x usage).
  runMigrate(userArgs);
}
