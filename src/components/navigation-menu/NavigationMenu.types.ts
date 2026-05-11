import type React from 'react';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import type { IconProp } from '../icons/Icon';

export type NavigationMenuProps = ComponentPropsWithoutRef<
  typeof NavigationMenuPrimitive.Root
>;

export type NavigationMenuListProps = ComponentPropsWithoutRef<
  typeof NavigationMenuPrimitive.List
>;

export type NavigationMenuItemProps = ComponentPropsWithoutRef<
  typeof NavigationMenuPrimitive.Item
>;

export type NavigationMenuTriggerProps = ComponentPropsWithoutRef<
  typeof NavigationMenuPrimitive.Trigger
>;

export interface NavigationMenuContentProps
  extends ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content> {
  /**
   * 콘텐츠 너비
   */
  width?: string | number;
}

export interface NavigationMenuLinkProps
  extends ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Link> {
  /**
   * 활성 상태
   */
  active?: boolean;
}

export type NavigationMenuViewportProps = ComponentPropsWithoutRef<
  typeof NavigationMenuPrimitive.Viewport
>;

export type NavigationMenuIndicatorProps = ComponentPropsWithoutRef<
  typeof NavigationMenuPrimitive.Indicator
>;

/**
 * 리스트 아이템 컴포넌트 Props (mega-menu용)
 */
export interface NavigationMenuListItemProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'title' | 'children'> {
  /**
   * 제목
   */
  title: string;
  /**
   * 설명
   */
  description?: string;
  /**
   * 링크 URL
   */
  href: string;
  /**
   * 아이콘
   */
  icon?: IconProp;
  /**
   * 아이콘 filled 스타일
   * @default false
   */
  iconFill?: boolean;
  /**
   * 현재 활성 상태 (aria-current="page" 설정)
   */
  active?: boolean;
  /**
   * 추가 CSS 클래스
   */
  className?: string;
  /**
   * 자식 요소 (title/description 대신 커스텀 콘텐츠)
   */
  children?: ReactNode;
}
