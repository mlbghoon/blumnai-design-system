import type { HTMLAttributes } from 'react';

export type BadgeVariant = 'default' | 'icon' | 'image' | 'dot';

export type BadgeSize = 'sm' | 'lg';

export type BadgeColor =
  | 'red'
  | 'orange'
  | 'lime'
  | 'green'
  | 'cyan'
  | 'blue'
  | 'violet'
  | 'fuchsia'
  | 'pink'
  | 'neutral';

export type BadgeShape = 'rounded' | 'pill';

export interface BadgeProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * The variant of the badge.
   * - `default`: Text badge with label
   * - `icon`: Badge with icon
   * - `image`: Badge with image
   * - `dot`: Badge with dot indicator
   * @default 'default'
   */
  variant?: BadgeVariant;
  /**
   * The size of the badge.
   * @default 'sm'
   */
  size?: BadgeSize;
  /**
   * The color of the badge.
   * @default 'neutral'
   */
  color?: BadgeColor;
  /**
   * The shape of the badge.
   * @default 'rounded'
   */
  shape?: BadgeShape;
  /**
   * If true, shows a border around the badge.
   * @default false
   */
  border?: boolean;
  /**
   * If true, shows a close icon button.
   * @default false
   */
  closeIcon?: boolean;
  /**
   * The label text to display (for default variant).
   */
  label?: string;
  /**
   * The icon type to display (for icon variant).
   * Accepts icon type names compatible with IconLoader.
   */
  icon?: string;
  /**
   * The image source URL (for image variant).
   */
  image?: string;
  /**
   * Callback when close icon is clicked (only used when closeIcon=true).
   */
  onClose?: () => void;
  /**
   * If true, applies dark mode styles.
   * @default false
   */
  darkMode?: boolean;
}
