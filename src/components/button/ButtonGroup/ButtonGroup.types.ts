import type { ReactNode } from 'react';

import type { ButtonProps } from '../Button/Button.types';

/**
 * ButtonGroup 크기
 */
export type ButtonGroupSize = '2xs' | 'xs' | 'sm' | 'md' | 'lg';

/**
 * ButtonGroup Item (각 버튼 아이템)
 */
export interface ButtonGroupItem {
  /**
   * 버튼 라벨 텍스트
   */
  label?: ReactNode;
  /**
   * 아이콘 (lead icon)
   */
  icon?: string | ReactNode;
  /**
   * Tail icon (우측 아이콘)
   */
  tailIcon?: string | ReactNode;
  /**
   * Badge 텍스트
   */
  badge?: string;
  /**
   * 버튼이 비활성화되었는지 여부
   */
  disabled?: boolean;
  /**
   * 버튼 클릭 핸들러
   */
  onClick?: () => void;
  /**
   * 기타 Button props
   */
  buttonProps?: Omit<ButtonProps, 'children' | 'icon' | 'iconPosition' | 'iconOnly' | 'size' | 'variant' | 'darkMode'>;
}

/**
 * ButtonGroup Props
 */
export interface ButtonGroupProps {
  /**
   * 버튼 아이템 배열
   */
  items: ButtonGroupItem[];
  /**
   * 크기
   */
  size?: ButtonGroupSize;
  /**
   * 다크 모드
   */
  darkMode?: boolean;
  /**
   * 커스텀 className
   */
  className?: string;
}