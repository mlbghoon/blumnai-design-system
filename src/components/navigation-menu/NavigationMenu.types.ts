import type React from 'react';
import type { ReactNode } from 'react';
import type {
  NavigationMenuProps as RadixNavigationMenuProps,
  NavigationMenuListProps as RadixNavigationMenuListProps,
  NavigationMenuItemProps as RadixNavigationMenuItemProps,
  NavigationMenuTriggerProps as RadixNavigationMenuTriggerProps,
  NavigationMenuContentProps as RadixNavigationMenuContentProps,
  NavigationMenuLinkProps as RadixNavigationMenuLinkProps,
  NavigationMenuViewportProps as RadixNavigationMenuViewportProps,
  NavigationMenuIndicatorProps as RadixNavigationMenuIndicatorProps,
} from '@radix-ui/react-navigation-menu';
import type { IconProp } from '../icons/Icon';

export type NavigationMenuProps = RadixNavigationMenuProps;

export type NavigationMenuListProps = RadixNavigationMenuListProps;

export type NavigationMenuItemProps = RadixNavigationMenuItemProps;

export type NavigationMenuTriggerProps = RadixNavigationMenuTriggerProps;

export interface NavigationMenuContentProps
  extends RadixNavigationMenuContentProps {
  /**
   * 콘텐츠 너비
   */
  width?: string | number;
}

export interface NavigationMenuLinkProps
  extends RadixNavigationMenuLinkProps {
  /**
   * 활성 상태
   */
  active?: boolean;
}

export type NavigationMenuViewportProps = RadixNavigationMenuViewportProps;

export type NavigationMenuIndicatorProps = RadixNavigationMenuIndicatorProps;

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
