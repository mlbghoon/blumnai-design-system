// Internal — pure helpers shared between the v2.0 direct-only `Icon.tsx` and the
// legacy tuple-supporting `legacy/Icon.legacy.tsx`. Centralized here so that
// color-token additions and the registry key normalization don't drift between
// the main and legacy renderers.

import type { IconColor } from './Icon.types';

/** CSS 변수로 변환할 색상 토큰 목록 (DS icon color tokens). */
const COLOR_TOKENS: ReadonlySet<string> = new Set([
  'default', 'default-subtle', 'default-muted', 'default-disabled',
  'inverted-default', 'inverted-subtle', 'inverted-muted', 'inverted-disabled',
  'white-default', 'white-subtle', 'white-muted', 'white-disabled',
  'black-default', 'black-subtle', 'black-muted', 'black-disabled',
  'destructive', 'informative', 'success', 'warning',
]);

/**
 * 색상 해석: 토큰은 CSS 변수로 변환, CSS 색상값은 그대로 전달.
 * - 토큰: `'default'` → `var(--icon-default)`
 * - CSS 색상: `'#fff'`, `'rgb(...)'` → 그대로
 */
export const resolveColor = (color: IconColor | undefined): string | undefined => {
  if (!color) return undefined;
  if (COLOR_TOKENS.has(color)) {
    return `var(--icon-${color})`;
  }
  return color;
};

/**
 * kebab-case를 소문자로 변환 (하이픈 제거).
 * 예: `'arrow-down'` → `'arrowdown'`.
 *
 * Legacy iconType API (`<Icon iconType={['arrows', 'arrow-down']} />`)와 registry
 * lookup, 그리고 codemod의 이름 정규화에서 동일한 정규화 함수가 필요. main entry는
 * 직접 안 쓰지만 stories/legacy/codemod가 import.
 */
export const kebabToRegistryKey = (str: string): string =>
  str.replace(/-/g, '').toLowerCase();
