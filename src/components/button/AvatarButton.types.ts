import type { ButtonHTMLAttributes, ReactNode } from 'react';

import type { RemixiconLikeComponent } from '../icons/Icon/Icon.types';

/**
 * AvatarButton 아이콘 타입 (v2.0+ — direct-import only).
 *
 * @example RiArrowDownSLine
 * @note v1.x tuple form was removed in v2.0.0.
 */
export type AvatarButtonIconType = RemixiconLikeComponent;

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
   * @example tailIcon={RiArrowDownSLine}
   * @example tailIcon={RiArrowDownSFill} - 채워진 아이콘
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
