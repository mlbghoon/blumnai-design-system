import type { ButtonHTMLAttributes, ReactNode } from 'react';

import type { IconType } from '../../icons/Icon/Icon.types';

export type DropdownButtonAlign = 'left' | 'center' | 'right';

export interface DropdownButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /**
   * 드롭다운 버튼의 라벨 텍스트
   */
  label: string;
  /**
   * 드롭다운이 열려있는 상태인지 여부
   * @default false
   */
  isOpen?: boolean;
  /**
   * 컨텐츠 정렬 방향
   * @default 'left'
   */
  align?: DropdownButtonAlign;
  /**
   * 라벨 앞에 표시되는 아이콘
   */
  leadIcon?: IconType;
  /**
   * 라벨 뒤에 표시되는 아이콘 (기본: arrow-down-s)
   * @default ['arrows', 'arrow-down-s']
   */
  tailIcon?: IconType;
  /**
   * 단축키 표시 (예: "/")
   */
  shortcut?: string;
  /**
   * 비활성화 여부
   * @default false
   */
  disabled?: boolean;
  /**
   * 커스텀 드롭다운 메뉴 컨텐츠
   */
  children?: ReactNode;
}
