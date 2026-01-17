import type { InputHTMLAttributes } from 'react';

import type { CheckboxSize, CheckboxStyle } from '../Checkbox/Checkbox.types';

/**
 * Checkbox 위치
 */
export type CheckboxPosition = 'left' | 'right';

/**
 * CheckboxWithText Props
 */
export interface CheckboxWithTextProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
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
   * 크기 (라벨 크기와 간격에만 영향, 체크박스 자체는 항상 16x16px)
   */
  size?: CheckboxSize;
  /**
   * Indeterminate 상태 (부분 선택)
   */
  indeterminate?: boolean;
  /**
   * 스타일 변형
   */
  style?: CheckboxStyle;
  /**
   * 다크 모드
   */
  darkMode?: boolean;
}
