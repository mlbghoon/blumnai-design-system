import type { HTMLAttributes } from 'react';

import type { IconTypeWithFill } from '../../icons/Icon/Icon.types';

export type BadgeVariant = 'default' | 'icon' | 'image' | 'dot';

export type BadgeSize = 'sm' | 'lg';

export type BadgeColor =
  | 'red'
  | 'orange'
  | 'amber'
  | 'yellow'
  | 'lime'
  | 'green'
  | 'emerald'
  | 'teal'
  | 'cyan'
  | 'sky'
  | 'blue'
  | 'indigo'
  | 'violet'
  | 'purple'
  | 'fuchsia'
  | 'pink'
  | 'rose'
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
   * @example icon={['system', 'check']}
   * @example icon={['system', 'star', true]} - filled icon
   */
  icon?: IconTypeWithFill;
  /**
   * The image source URL (for image variant).
   */
  image?: string;
  /**
   * Alt text for the image (for image variant).
   * @default ''
   */
  imageAlt?: string;
  /**
   * Callback when close icon is clicked (only used when closeIcon=true).
   */
  onClose?: () => void;
}
