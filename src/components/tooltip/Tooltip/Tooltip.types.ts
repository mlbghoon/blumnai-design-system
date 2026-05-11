import type { HTMLAttributes, ReactNode } from 'react';

import type { IconProp } from '../../icons/Icon';

export type TooltipItemType = 'divider' | 'label' | 'item' | 'text';

export interface TooltipItemData {
  /**
   * The type of tooltip item.
   */
  type: TooltipItemType;
  /**
   * The label text (for label and item types).
   */
  label?: string;
  /**
   * The caption text (for label and item types).
   */
  caption?: string;
  /**
   * The indicator color (for item type).
   */
  indicatorColor?: string;
  /**
   * The icon type (for item type with icon).
   * @example icon={['system', 'info']}
   * @example icon={['system', 'star', true]} - filled icon
   */
  icon?: IconProp;
  /**
   * The text content (for text type).
   */
  text?: string;
}

export interface TooltipProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * The content of the tooltip.
   */
  children?: ReactNode;
  /**
   * The badge text to display.
   * When provided, shows a badge next to the tooltip text.
   */
  badge?: string;
  /**
   * The maximum width of the tooltip.
   * @default 240
   */
  maxWidth?: number;
  /**
   * 툴팁 너비 (px)
   */
  width?: number;
  /**
   * 툴팁 최소 너비 (px)
   */
  minWidth?: number;
}

export interface AdvancedTooltipProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The items array for advanced tooltip.
   * Each item can be a divider, label, item (with indicator/icon), or text.
   */
  items: TooltipItemData[];
  /**
   * The minimum width of the tooltip.
   */
  minWidth?: number;
}
