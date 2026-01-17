import { useMemo } from 'react';

import { Avatar } from '../Avatar/Avatar';

import * as styles from './AvatarGroup.css';
import type { AvatarGroupProps } from './AvatarGroup.types';

/**
 * AvatarGroup component
 *
 * Displays multiple avatars in a stacked/overlapping layout.
 * Supports different stacking orders and optional +N overlay for remaining avatars.
 */
export const AvatarGroup = ({
  size = 'md',
  stacking = 'last-on-top',
  avatars,
  max,
  darkMode = false,
  className,
  ...props
}: AvatarGroupProps) => {
  // Calculate overlap based on size
  const overlap = useMemo(() => {
    return styles.overlaps[size];
  }, [size]);

  // Calculate visible avatars and remaining count
  const { visibleAvatars, remainingCount } = useMemo(() => {
    if (max && avatars.length > max) {
      return {
        visibleAvatars: avatars.slice(0, max),
        remainingCount: avatars.length - max,
      };
    }
    return {
      visibleAvatars: avatars,
      remainingCount: 0,
    };
  }, [avatars, max]);

  // Build container class names
  const containerClassName = useMemo(() => {
    const classes = [styles.container];
    if (className) {
      classes.push(className);
    }
    return classes.filter(Boolean).join(' ');
  }, [className]);

  // Calculate z-index based on stacking
  const getZIndex = (index: number, total: number) => {
    if (stacking === 'last-on-top') {
      // Last avatar has highest z-index
      return index + 1;
    } else {
      // First avatar has highest z-index
      return total - index;
    }
  };

  // Build overlay class names
  const overlayClassName = useMemo(() => {
    const classes = [styles.overlay];
    const sizeKey = `overlay${size}` as keyof typeof styles;
    const sizeClass = styles[sizeKey];
    if (sizeClass) classes.push(sizeClass as string);
    if (darkMode) {
      classes.push(styles.overlayDark);
    }
    return classes.filter(Boolean).join(' ');
  }, [size, darkMode]);

  return (
    <div className={containerClassName} {...props}>
      {visibleAvatars.map((avatarProps, index) => {
        const zIndex = getZIndex(index, visibleAvatars.length);

        return (
          <div
            key={index}
            className={styles.avatarWrapper}
            style={{
              zIndex,
              marginLeft: index > 0 ? `-${overlap}px` : 0,
            }}
          >
            <Avatar
              {...avatarProps}
              size={size}
              darkMode={darkMode}
            />
          </div>
        );
      })}
      
      {remainingCount > 0 && (
        <div
          className={overlayClassName}
          style={{
            zIndex: getZIndex(visibleAvatars.length, visibleAvatars.length + 1),
            marginLeft: `-${overlap}px`,
          }}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
};
