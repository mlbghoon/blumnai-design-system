import type { InputHTMLAttributes, ReactNode } from 'react';

/**
 * Checkbox 스타일
 */
export type CheckboxStyle = 'default' | 'with-shadow';

/**
 * Checkbox Props
 */
export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'style'> {
  /**
   * Checkbox 라벨 텍스트
   */
  label?: ReactNode;
  /**
   * Indeterminate 상태 (부분 선택)
   */
  indeterminate?: boolean;
  /**
   * 스타일 변형
   */
  style?: CheckboxStyle;
}