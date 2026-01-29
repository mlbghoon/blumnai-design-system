import type { HTMLAttributes, ReactNode } from 'react';

import type { IconType } from '../../icons/Icon/Icon.types';

export type BreadcrumbsSize = 'sm' | 'lg';

export type BreadcrumbsSeparator = 'slash' | 'chevron' | 'dot' | 'arrow';

export interface BreadcrumbItem {
  /**
   * 브레드크럼 아이템에 표시할 라벨 텍스트
   */
  label: string;
  /**
   * 브레드크럼 아이템의 URL 또는 경로 (선택사항, 링크로 만듦)
   */
  href?: string;
  /**
   * 브레드크럼 아이템의 아이콘 타입 (선택사항)
   * IconType 튜플 또는 커스텀 ReactNode 가능
   * @example icon={['system', 'home']}
   */
  icon?: IconType | ReactNode;
  /**
   * 아바타/이미지 변형용 이미지 URL (선택사항)
   */
  image?: string;
  /**
   * true이면 이 아이템이 비활성화됨
   */
  disabled?: boolean;
  /**
   * 브레드크럼 아이템 클릭 시 호출되는 콜백 함수
   * href가 있어도 onClick이 제공되면 기본 네비게이션이 방지되고 onClick이 호출됨
   */
  onClick?: () => void;
}

export interface BreadcrumbsProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  /**
   * Array of breadcrumb items to display.
   */
  items: BreadcrumbItem[];
  /**
   * The size of the breadcrumbs.
   * @default 'sm'
   */
  size?: BreadcrumbsSize;
  /**
   * The separator type between breadcrumb items.
   * @default 'slash'
   */
  separator?: BreadcrumbsSeparator;
  /**
   * Maximum number of items to show before collapsing (shows "...").
   * If not provided, all items are shown.
   */
  maxItems?: number;
  /**
   * If true, applies dark mode styles.
   * @default false
   */
  darkMode?: boolean;
}
