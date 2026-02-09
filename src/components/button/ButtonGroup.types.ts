import type { ReactNode } from 'react';

import type { IconType } from '../icons/Icon/Icon.types';

/**
 * ButtonGroup 크기
 */
export type ButtonGroupSize = '2xs' | 'xs' | 'sm' | 'md' | 'lg';

/**
 * ButtonGroup Item (각 버튼 아이템)
 */
export interface ButtonGroupItem {
  /**
   * 고유 식별자 (key로 사용)
   */
  id?: string;
  /**
   * 버튼 라벨 텍스트
   */
  label?: ReactNode;
  /**
   * 아이콘 (lead icon)
   * Can be an IconType tuple or a custom ReactNode.
   * @example icon={['system', 'settings']}
   */
  icon?: IconType | ReactNode;
  /**
   * Tail icon (우측 아이콘)
   * Can be an IconType tuple or a custom ReactNode.
   * @example tailIcon={['arrows', 'chevron-down']}
   */
  tailIcon?: IconType | ReactNode;
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
   * 커스텀 className
   */
  className?: string;
}
