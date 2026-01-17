import type { HTMLAttributes } from 'react';

/**
 * Chip 크기
 */
export type ChipSize = 'sm' | 'md' | 'lg';

/**
 * Chip 변형
 */
export type ChipVariant = 'soft' | 'secondary' | 'ghost' | 'selected';

/**
 * Chip 모양
 */
export type ChipShape = 'rounded' | 'circle';

/**
 * Chip Props
 */
export interface ChipProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * Chip 텍스트
   */
  label?: string;
  /**
   * 아이콘 타입 (IconLoader에서 사용)
   */
  icon?: string;
  /**
   * 아이콘만 표시 (label 없이)
   */
  iconOnly?: boolean;
  /**
   * 크기
   */
  size?: ChipSize;
  /**
   * 변형
   */
  variant?: ChipVariant;
  /**
   * 모양
   */
  shape?: ChipShape;
  /**
   * 다크 모드
   */
  darkMode?: boolean;
}