import type { HTMLAttributes } from 'react';

import type { AvatarProps, AvatarSize } from '../Avatar/Avatar.types';

export type AvatarGroupStacking = 'last-on-top' | 'first-on-top';

export interface AvatarGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * The size of the avatars in the group.
   * @default 'md'
   */
  size?: AvatarSize;
  /**
   * The stacking order of avatars.
   * - `last-on-top`: Last avatar appears on top (z-index increases with index)
   * - `first-on-top`: First avatar appears on top (z-index decreases with index)
   * @default 'last-on-top'
   */
  stacking?: AvatarGroupStacking;
  /**
   * Array of avatar props. Each item will be rendered as an Avatar component.
   * Note: status badges are not supported in AvatarGroup.
   */
  avatars: Array<Omit<AvatarProps, 'size' | 'ring' | 'status' | 'badgeLocation' | 'logoImage' | 'icon'>>;
  /**
   * Maximum number of avatars to display. If more avatars are provided,
   * the remaining will be shown as a "+N" overlay.
   * If not provided, all avatars will be displayed.
   */
  max?: number;
}
