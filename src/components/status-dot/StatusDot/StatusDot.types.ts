import type { HTMLAttributes } from 'react';

/**
 * StatusDot 색상
 */
export type StatusDotColor = 'green' | 'red' | 'orange' | 'gray';

/**
 * StatusDot 크기
 */
export type StatusDotSize = 'sm' | 'md';

/**
 * StatusDot 컴포넌트 Props
 */
export interface StatusDotProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  /**
   * 상태 색상
   * @default 'green'
   */
  color?: StatusDotColor;
  /**
   * 상태 라벨
   */
  label?: string;
  /**
   * 컴포넌트 크기
   * @default 'md'
   */
  size?: StatusDotSize;
}
