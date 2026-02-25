/**
 * Skeleton 애니메이션 타입
 * - pulse: 기본 페이드 애니메이션
 * - wave: 시머(shimmer) 효과 애니메이션
 * - none: 애니메이션 없음
 */
export type SkeletonAnimation = 'pulse' | 'wave' | 'none';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** @default 'default' */
  variant?: 'default' | 'circular' | 'text';
  width?: string | number;
  height?: string | number;
  /**
   * Controls the loading animation style.
   * All animations respect `prefers-reduced-motion`.
   * @default 'pulse'
   */
  animation?: SkeletonAnimation;
  /**
   * Renders multiple skeleton lines in a vertical stack with spacing.
   * Useful for text block placeholders.
   * @default 1
   */
  count?: number;
}
