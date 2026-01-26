import type { HTMLAttributes, ReactNode } from 'react';

import type { IconType } from '../../icons/Icon/Icon.types';

/**
 * 메뉴 아이템 사이즈 타입
 */
export type DropdownMenuItemSize = 'default' | 'large';

/**
 * DropdownMenu 컴포넌트 Props
 */
export interface DropdownMenuProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * 메뉴 컨텐츠
   */
  children: ReactNode;
  /**
   * 메뉴 너비 (기본값: 자동)
   */
  width?: number | string;
}

/**
 * DropdownMenuItem 컴포넌트 Props
 */
export interface DropdownMenuItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /**
   * 메뉴 아이템 라벨
   */
  label: string;
  /**
   * 아이템 사이즈
   * @default 'default'
   */
  size?: DropdownMenuItemSize;
  /**
   * 라벨 앞에 표시되는 아이콘
   */
  leadIcon?: IconType;
  /**
   * 라벨 뒤에 표시되는 아이콘 (서브메뉴 화살표 등)
   */
  tailIcon?: IconType;
  /**
   * 캡션 텍스트 (라벨 옆에 표시)
   */
  caption?: string;
  /**
   * 설명 텍스트 (라벨 아래에 표시, large 사이즈에서만 표시)
   */
  description?: string;
  /**
   * 단축키 표시
   */
  shortcut?: string;
  /**
   * 비활성화 여부
   * @default false
   */
  disabled?: boolean;
  /**
   * 클릭 이벤트 핸들러
   */
  onClick?: () => void;
}

/**
 * DropdownMenuLabel 컴포넌트 Props
 */
export interface DropdownMenuLabelProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * 섹션 라벨 텍스트
   */
  children: ReactNode;
  /**
   * 라벨 우측에 표시되는 캡션 텍스트
   */
  caption?: string;
}

/**
 * DropdownMenuCaption 컴포넌트 Props
 * 드롭다운 메뉴 내에 설명 텍스트를 표시할 때 사용
 */
export interface DropdownMenuCaptionProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * 캡션 텍스트
   */
  children: ReactNode;
}

/**
 * DropdownMenuAvatar 컴포넌트 Props
 * 드롭다운 메뉴 내에 아바타가 있는 아이템을 표시할 때 사용
 */
export interface DropdownMenuAvatarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /**
   * 아이템 라벨
   */
  label: string;
  /**
   * 아바타 이미지 URL
   */
  avatarSrc?: string;
  /**
   * 아바타 대체 텍스트 (이미지가 없을 때 이니셜로 표시)
   */
  avatarAlt?: string;
  /**
   * 라벨 뒤에 표시되는 아이콘
   */
  tailIcon?: IconType;
  /**
   * 캡션 텍스트
   */
  caption?: string;
  /**
   * 단축키 표시
   */
  shortcut?: string;
  /**
   * 비활성화 여부
   * @default false
   */
  disabled?: boolean;
  /**
   * 클릭 이벤트 핸들러
   */
  onClick?: () => void;
}

/**
 * DropdownMenuUserbar 컴포넌트 Props
 * 드롭다운 메뉴 내에 사용자 정보를 표시할 때 사용
 */
export interface DropdownMenuUserbarProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * 사용자 이름
   */
  name: string;
  /**
   * 사용자 설명 (이메일, 역할 등)
   */
  description?: string;
  /**
   * 아바타 이미지 URL
   */
  avatarSrc?: string;
  /**
   * 아바타 대체 텍스트
   */
  avatarAlt?: string;
  /**
   * 우측에 표시되는 뱃지 텍스트
   */
  badge?: string;
}

/**
 * DropdownMenuDivider 컴포넌트 Props
 */
export interface DropdownMenuDividerProps extends HTMLAttributes<HTMLDivElement> {}

/**
 * DropdownMenuButton 컴포넌트 Props
 * 드롭다운 메뉴 내에 버튼을 배치할 때 사용
 */
export interface DropdownMenuButtonProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * 버튼 라벨
   */
  label: string;
  /**
   * 버튼 앞에 표시되는 아이콘
   */
  leadIcon?: IconType;
  /**
   * 버튼 뒤에 표시되는 아이콘
   */
  tailIcon?: IconType;
  /**
   * 비활성화 여부
   * @default false
   */
  disabled?: boolean;
  /**
   * 클릭 이벤트 핸들러
   */
  onClick?: () => void;
}

/**
 * DropdownMenuButtonGroup 컴포넌트 Props
 * 드롭다운 메뉴 내에 여러 버튼을 그룹으로 배치할 때 사용
 */
export interface DropdownMenuButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * 버튼 그룹 컨텐츠
   */
  children: ReactNode;
}
