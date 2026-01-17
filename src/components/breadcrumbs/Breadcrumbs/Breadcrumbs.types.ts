import type { HTMLAttributes, ReactNode } from 'react';

export type BreadcrumbsSize = 'sm' | 'lg';

export type BreadcrumbsSeparator = 'slash' | 'chevron' | 'dot' | 'arrow';

export interface BreadcrumbItem {
  /**
   * The label text to display for this breadcrumb item.
   */
  label: string;
  /**
   * The URL or path for this breadcrumb item (optional, makes it a link).
   */
  href?: string;
  /**
   * Icon type for this breadcrumb item (optional).
   * Can be an icon name for IconLoader or a custom ReactNode.
   */
  icon?: string | ReactNode;
  /**
   * Image URL for avatar/image variant (optional).
   */
  image?: string;
  /**
   * If true, this item is disabled.
   */
  disabled?: boolean;
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
