import type { ButtonHTMLAttributes, ReactNode } from 'react';

import type { IconType, RemixiconLikeComponent } from '../icons/Icon/Icon.types';

/**
 * LinkButton 아이콘 타입.
 *
 * - tuple `[category, name]` / `[category, name, isFill]` (dynamic-string back-compat)
 * - Remixicon component (`RiExternalLinkLine` 등; tree-shaking 권장)
 *
 * @example ['system', 'external-link']
 * @example ['system', 'external-link', true]
 * @example RiExternalLinkLine
 */
export type LinkButtonIconType = IconType | [...IconType, boolean] | RemixiconLikeComponent;

export type LinkButtonSize = 'sm' | 'md' | 'lg';

export type LinkButtonType = 'default' | 'muted' | 'informative';

export interface LinkButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /**
   * 링크 버튼의 타입
   * @default 'default'
   */
  linkType?: LinkButtonType;
  /**
   * 링크 버튼의 크기
   * @default 'md'
   */
  size?: LinkButtonSize;
  /**
   * 링크 버튼의 라벨 텍스트
   */
  label: string;
  /**
   * 이동할 URL (제공시 anchor 태그로 렌더링)
   */
  href?: string;
  /**
   * 새 탭에서 링크 열기
   * @default false
   */
  openInNewTab?: boolean;
  /**
   * 라벨 앞에 표시되는 아이콘
   * @example leadIcon={['system', 'link']}
   */
  leadIcon?: LinkButtonIconType | ReactNode;
  /**
   * 라벨 뒤에 표시되는 아이콘
   * @default ['system', 'external-link']
   * @example tailIcon={['system', 'external-link']}
   */
  tailIcon?: LinkButtonIconType | ReactNode;
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
