import type { ButtonHTMLAttributes, ReactNode } from 'react';

import type { IconType } from '../icons/Icon/Icon.types';

/**
 * 아이콘 타입 - isFill 옵션 지원
 * @example ['system', 'add'] - 일반 아이콘
 * @example ['system', 'add', true] - 채워진 아이콘
 */
export type AvatarButtonIconType = IconType | [...IconType, boolean];

export type AvatarButtonSize = 'sm' | 'lg';

export type AvatarButtonStyle = 'default' | 'dashed' | 'soft';

export interface AvatarButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /**
   * 아바타 버튼의 스타일
   * @default 'default'
   */
  buttonStyle?: AvatarButtonStyle;
  /**
   * 아바타 버튼의 크기
   * @default 'lg'
   */
  size?: AvatarButtonSize;
  /**
   * 아바타 이미지 URL
   */
  avatar: string;
  /**
   * 아바타 이미지의 대체 텍스트
   */
  alt?: string;
  /**
   * 아바타 버튼의 라벨 텍스트
   */
  label: string;
  /**
   * 라벨 뒤에 표시되는 아이콘
   * @example tailIcon={['arrows', 'arrow-down-s']}
   * @example tailIcon={['arrows', 'arrow-down-s', true]} - 채워진 아이콘
   */
  tailIcon?: AvatarButtonIconType | ReactNode;
  /**
   * 버튼 비활성화 여부
   * @default false
   */
  disabled?: boolean;
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
