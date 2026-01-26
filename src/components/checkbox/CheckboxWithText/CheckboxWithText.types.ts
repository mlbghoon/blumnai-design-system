import type { InputHTMLAttributes } from 'react';

import type { CheckboxStyle } from '../Checkbox/Checkbox.types';

/**
 * Checkbox 위치
 */
export type CheckboxPosition = 'left' | 'right';

/**
 * CheckboxWithText Props
 */
export interface CheckboxWithTextProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'style'> {
  /**
   * 제목 텍스트
   */
  title: string;
  /**
   * 설명 텍스트
   */
  description?: string;
  /**
   * Checkbox 위치 (기본값: 'left')
   */
  checkboxPosition?: CheckboxPosition;
  /**
   * Indeterminate 상태 (부분 선택)
   */
  indeterminate?: boolean;
  /**
   * 스타일 변형
   */
  style?: CheckboxStyle;
}
