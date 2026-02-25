import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type * as CheckboxPrimitive from '@radix-ui/react-checkbox';

/**
 * Checkbox 스타일
 */
export type CheckboxStyle = 'default' | 'with-shadow';

/**
 * Checkbox 위치
 */
export type CheckboxPosition = 'left' | 'right' | 'off';

/**
 * Checkbox 크기
 */
export type CheckboxSize = 'sm' | 'md' | 'lg';

/**
 * Checkbox 모양
 */
export type CheckboxShape = 'square' | 'round';

/**
 * Checkbox Props
 */
export interface CheckboxProps
  extends Omit<ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>, 'children'> {
  /**
   * Checkbox 라벨 텍스트 (Title)
   */
  label?: ReactNode;
  /**
   * 라벨 아래 설명 텍스트
   */
  description?: ReactNode;
  /**
   * 체크박스 위치 (라벨 기준)
   * @default 'left'
   */
  checkboxPosition?: CheckboxPosition;
  /**
   * 스타일 변형
   * @default 'default'
   */
  checkboxStyle?: CheckboxStyle;
  /**
   * 체크박스 크기
   * @default 'sm'
   */
  size?: CheckboxSize;
  /**
   * 체크박스 모양
   * @default 'square'
   */
  shape?: CheckboxShape;
}
