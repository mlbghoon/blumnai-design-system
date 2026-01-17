import type { HTMLAttributes, ReactNode } from 'react';

export type TooltipVariant = 'default' | 'advanced';

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
   * The icon name (for item type with icon).
   */
  icon?: string;
  /**
   * The text content (for text type).
   */
  text?: string;
}

export interface TooltipProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * The variant of the tooltip.
   * - `default`: Simple tooltip with text and optional badge
   * - `advanced`: Tooltip with multiple items (dividers, labels, icons, captions)
   * @default 'default'
   */
  variant?: TooltipVariant;
  /**
   * The content of the tooltip (for default variant).
   */
  children?: ReactNode;
  /**
   * The badge text to display (for default variant).
   * When provided, shows a badge next to the tooltip text.
   */
  badge?: string;
  /**
   * The items array for advanced variant.
   * Each item can be a divider, label, item (with indicator/icon), or text.
   */
  items?: TooltipItemData[];
  /**
   * If true, applies dark mode styles.
   * @default false
   */
  darkMode?: boolean;
}
