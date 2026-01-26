import type { SVGProps } from 'react';

/**
 * 등각 투영 아이콘 fill 색상 토큰
 * CSS 변수 `--bg-{token}`으로 변환됩니다.
 */
export type IsometricFillColor =
  // Basic
  | 'default'
  | 'subtle'
  | 'muted'
  | 'inverted'
  | 'accent'
  // Card
  | 'card-default'
  | 'card-subtle'
  | 'card-inverted'
  // Sidebar
  | 'sidebar-default'
  | 'sidebar-subtle'
  // Input
  | 'input-default'
  | 'input-soft'
  | 'input-disabled'
  // Overlay
  | 'overlay'
  // State - Primary
  | 'state-primary'
  | 'state-primary-hover'
  | 'state-primary-press'
  | 'state-primary-loading'
  // State - Secondary
  | 'state-secondary'
  | 'state-secondary-hover'
  | 'state-secondary-press'
  // State - Soft
  | 'state-soft'
  | 'state-soft-hover'
  | 'state-soft-press'
  // State - Ghost
  | 'state-ghost'
  | 'state-ghost-hover'
  | 'state-ghost-press'
  | 'state-ghost-inverted'
  | 'state-ghost-hover-inverted'
  | 'state-ghost-press-inverted'
  // State - Destructive
  | 'state-destructive'
  | 'state-destructive-hover'
  | 'state-destructive-press'
  | 'state-destructive-loading'
  // State - Brand
  | 'state-brand'
  | 'state-brand-hover'
  | 'state-brand-press'
  | 'state-brand-loading'
  // State - Other
  | 'state-gray'
  | 'state-disabled'
  // Checkbox
  | 'checkbox-default'
  | 'checkbox-active'
  | 'checkbox-active-hover'
  | 'checkbox-disabled'
  // Switch
  | 'switch-default'
  | 'switch-default-hover'
  | 'switch-disabled'
  | 'switch-active'
  | 'switch-active-hover'
  | 'switch-active-disabled'
  | 'switch-handle'
  | 'switch-handle-disabled'
  // Basic Colors - Gray
  | 'basic-gray-subtle'
  | 'basic-gray-accent'
  | 'basic-gray-strong'
  | 'basic-gray-contrast'
  // Basic Colors - Red
  | 'basic-red-subtle'
  | 'basic-red-accent'
  | 'basic-red-strong'
  | 'basic-red-contrast'
  // Basic Colors - Orange
  | 'basic-orange-subtle'
  | 'basic-orange-accent'
  | 'basic-orange-strong'
  | 'basic-orange-contrast'
  // Basic Colors - Amber
  | 'basic-amber-subtle'
  | 'basic-amber-accent'
  | 'basic-amber-strong'
  | 'basic-amber-contrast'
  // Basic Colors - Yellow
  | 'basic-yellow-subtle'
  | 'basic-yellow-accent'
  | 'basic-yellow-strong'
  | 'basic-yellow-contrast'
  // Basic Colors - Lime
  | 'basic-lime-subtle'
  | 'basic-lime-accent'
  | 'basic-lime-strong'
  | 'basic-lime-contrast'
  // Basic Colors - Green
  | 'basic-green-subtle'
  | 'basic-green-accent'
  | 'basic-green-strong'
  | 'basic-green-contrast'
  // Basic Colors - Emerald
  | 'basic-emerald-subtle'
  | 'basic-emerald-accent'
  | 'basic-emerald-strong'
  | 'basic-emerald-contrast'
  // Basic Colors - Teal
  | 'basic-teal-subtle'
  | 'basic-teal-accent'
  | 'basic-teal-strong'
  | 'basic-teal-contrast'
  // Basic Colors - Cyan
  | 'basic-cyan-subtle'
  | 'basic-cyan-accent'
  | 'basic-cyan-strong'
  | 'basic-cyan-contrast'
  // Basic Colors - Sky
  | 'basic-sky-subtle'
  | 'basic-sky-accent'
  | 'basic-sky-strong'
  | 'basic-sky-contrast'
  // Basic Colors - Blue
  | 'basic-blue-subtle'
  | 'basic-blue-accent'
  | 'basic-blue-strong'
  | 'basic-blue-contrast'
  // Basic Colors - Indigo
  | 'basic-indigo-subtle'
  | 'basic-indigo-accent'
  | 'basic-indigo-strong'
  | 'basic-indigo-contrast'
  // Basic Colors - Violet
  | 'basic-violet-subtle'
  | 'basic-violet-accent'
  | 'basic-violet-strong'
  | 'basic-violet-contrast'
  // Basic Colors - Purple
  | 'basic-purple-subtle'
  | 'basic-purple-accent'
  | 'basic-purple-strong'
  | 'basic-purple-contrast'
  // Basic Colors - Fuchsia
  | 'basic-fuchsia-subtle'
  | 'basic-fuchsia-accent'
  | 'basic-fuchsia-strong'
  | 'basic-fuchsia-contrast'
  // Basic Colors - Pink
  | 'basic-pink-subtle'
  | 'basic-pink-accent'
  | 'basic-pink-strong'
  | 'basic-pink-contrast'
  // Basic Colors - Rose
  | 'basic-rose-subtle'
  | 'basic-rose-accent'
  | 'basic-rose-strong'
  | 'basic-rose-contrast'
  // Basic Colors - Gray Alpha
  | 'basic-gray-alpha-2'
  | 'basic-gray-alpha-4'
  | 'basic-gray-alpha-10'
  | 'basic-gray-alpha-15';

/**
 * 등각 투영 아이콘 stroke 색상 토큰
 * CSS 변수 `--border-{token}`으로 변환됩니다.
 */
export type IsometricStrokeColor =
  | 'default'
  | 'darker'
  | 'strong'
  | 'inverted'
  | 'accent'
  | 'accent-inverted'
  | 'destructive'
  | 'informative'
  | 'success'
  | 'warning'
  | 'highlight'
  | 'highlight-destructive'
  | 'input-highlight';

/**
 * 등각 투영 아이콘 SVG 컴포넌트의 props
 */
export interface IsometricSvgProps extends Omit<SVGProps<SVGSVGElement>, 'children'> {
  /** 아이콘 크기 (px) */
  size?: number;
  /** CSS 클래스 이름 */
  className?: string;
  /**
   * fill 색상 토큰
   * @default 'default' (--bg-default)
   */
  fillColor?: IsometricFillColor;
  /**
   * stroke 색상 토큰
   * @default 'accent' (--border-accent)
   */
  strokeColor?: IsometricStrokeColor;
}
