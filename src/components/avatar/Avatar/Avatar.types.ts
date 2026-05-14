import type { HTMLAttributes } from 'react';

import type { IconProp } from '../../icons/Icon';

export type AvatarSize = '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

export type AvatarShape = 'circular' | 'rounded';

export type AvatarVariant = 'initials' | 'userpic' | 'empty';

export type AvatarStatus = 'online' | 'offline' | 'checkmark' | 'logo' | 'icon' | 'notification';

export type AvatarBadgeLocation = 'top' | 'bottom';

export interface AvatarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'onError' | 'onLoad'> {
  /**
   * The variant of the avatar.
   * - `initials`: Shows initials text
   * - `userpic`: Shows an image
   * - `empty`: Shows no content (empty state)
   * @default 'initials'
   */
  variant?: AvatarVariant;
  /**
   * The size of the avatar.
   * @default 'md'
   */
  size?: AvatarSize;
  /**
   * The shape of the avatar.
   * @default 'circular'
   */
  shape?: AvatarShape;
  /**
   * The initials text to display (only used when variant='initials').
   * Typically 1-2 characters.
   */
  initials?: string;
  /**
   * The image source URL (only used when variant='userpic').
   */
  src?: string;
  /**
   * The alt text for the image (only used when variant='userpic').
   */
  alt?: string;
  /**
   * Color token for initials variant background.
   * Accepts any color token value (e.g., `color.palette.red[500]`).
   * Only used when `variant='initials'`.
   * @default color.text.muted (#6f6f77)
   */
  color?: string;
  /**
   * If true, renders the Ring element (white background ring around avatar).
   * Ring is always 4px larger than image and extends 2px on every side when centered.
   * Primarily used for AvatarGroup where overlapping avatars need visual separation.
   * @default false
   */
  ring?: boolean;
  /**
   * The badge variant to display.
   * - `online`: Green dot badge
   * - `offline`: Gray dot badge
   * - `checkmark`: Checkmark badge
   * - `logo`: Logo badge (requires `logoImage` prop)
   * - `icon`: Icon badge
   * - `notification`: Notification badge
   */
  status?: AvatarStatus;
  /**
   * Logo image URL for logo status badge.
   * Only used when `status='logo'`.
   */
  logoImage?: string;
  /**
   * Icon component for icon status badge (v2.0+ — direct-import only).
   * Only used when `status='icon'`.
   * @example icon={RiCheckLine}
   */
  icon?: IconProp;
  /**
   * The location of the status badge.
   * @default 'top'
   */
  badgeLocation?: AvatarBadgeLocation;
  /**
   * Callback fired when the avatar image fails to load.
   * Only used when `variant='userpic'`.
   */
  onError?: React.ReactEventHandler<HTMLImageElement>;
  /**
   * Callback fired when the avatar image has loaded.
   * Only used when `variant='userpic'`.
   */
  onLoad?: React.ReactEventHandler<HTMLImageElement>;
}
