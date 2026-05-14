import type { HTMLAttributes } from 'react';

import type { IconProp } from '../../icons/Icon';

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
  | 'neutral'
  | 'white';

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
   * Icon component reference for icon variant (v2.0+ — direct-import only).
   * @example icon={RiCheckLine}
   * @example icon={RiStarFill} - filled icon
   */
  icon?: IconProp;
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
   * 닫기 아이콘 색상 (closeIcon=true일 때만 적용).
   * 미지정 시 badge color와 동일한 색상 사용.
   */
  closeColor?: BadgeColor;
  /**
   * If true, disables the close icon button (only used when closeIcon=true).
   * @default false
   */
  closeDisabled?: boolean;
  /**
   * Callback when close icon is clicked (only used when closeIcon=true).
   */
  onClose?: () => void;
}
