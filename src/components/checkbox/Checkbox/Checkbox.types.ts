import type { InputHTMLAttributes, ReactNode } from 'react';

/**
 * Checkbox 크기
 */
export type CheckboxSize = '2xs' | 'xs' | 'sm' | 'md' | 'lg';

/**
 * Checkbox 스타일
 */
export type CheckboxStyle = 'default' | 'with-shadow';

/**
 * Checkbox Props
 */
export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /**
   * Checkbox 라벨 텍스트
   */
  label?: ReactNode;
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