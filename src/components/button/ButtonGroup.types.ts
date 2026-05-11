import type { ReactNode } from 'react';

import type { IconProp } from '../icons/Icon';

/**
 * ButtonGroup 크기
 */
export type ButtonGroupSize = '2xs' | 'xs' | 'sm' | 'md' | 'lg';

/**
 * ButtonGroup Item 공통 속성
 */
interface ButtonGroupItemBase {
  /**
   * 고유 식별자 (가능하면 제공하여 안정적인 key/상태 유지)
   */
  id?: string;
  /**
   * 아이콘 (lead icon)
   * @example icon={['system', 'settings']}
   */
  icon?: IconProp | ReactNode;
  /**
   * Tail icon (우측 아이콘)
   * @example tailIcon={['arrows', 'chevron-down']}
   */
  tailIcon?: IconProp | ReactNode;
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
 * 아이콘 전용 버튼 (label/badge 없이 icon만 표시, ariaLabel 필수)
 */
interface IconOnlyItem extends ButtonGroupItemBase {
  icon: IconProp | ReactNode;
  /**
   * 접근성 라벨 (icon-only 시 필수)
   */
  ariaLabel: string;
  label?: never;
  badge?: never;
}

/**
 * 라벨/뱃지가 있는 일반 버튼
 */
interface RegularItem extends ButtonGroupItemBase {
  /**
   * 버튼 라벨 텍스트
   */
  label?: ReactNode;
  /**
   * Badge 텍스트
   */
  badge?: string;
  /**
   * 접근성 라벨 (선택)
   */
  ariaLabel?: string;
}

/**
 * ButtonGroup Item (각 버튼 아이템)
 */
export type ButtonGroupItem = IconOnlyItem | RegularItem;

/**
 * ButtonGroup Props
 */
export interface ButtonGroupProps extends React.AriaAttributes {
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
