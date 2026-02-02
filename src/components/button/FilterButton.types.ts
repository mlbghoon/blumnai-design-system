import type { ButtonHTMLAttributes } from 'react';

import type { IconType } from '../icons/Icon/Icon.types';

export type FilterButtonSize = 'xs' | 'md' | 'lg';

export type FilterButtonShape = 'rounded' | 'pill';

export interface FilterButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /**
   * 필터 버튼의 크기
   * @default 'md'
   */
  size?: FilterButtonSize;
  /**
   * 필터 버튼의 형태
   * @default 'rounded'
   */
  shape?: FilterButtonShape;
  /**
   * 선택 상태 여부
   * @default false
   */
  selected?: boolean;
  /**
   * 비활성화 여부
   * @default false
   */
  disabled?: boolean;
  /**
   * 필터 버튼의 라벨 텍스트
   */
  label: string;
  /**
   * 아이콘 타입
   * @default ['system', 'filter']
   */
  icon?: IconType;
  /**
   * If true, renders the component as its child element using Radix Slot.
   * @default false
   */
  asChild?: boolean;
  /**
   * 버튼의 커스텀 너비
   * @example width={200} - 200px
   * @example width="100%" - 100%
   */
  width?: string | number;
}
