import { forwardRef, useMemo } from 'react';

import { Avatar } from '../Avatar/Avatar';

import * as styles from './AvatarGroup.css';
import type { AvatarGroupProps } from './AvatarGroup.types';

/**
 * AvatarGroup 컴포넌트
 *
 * 여러 아바타를 겹치는 레이아웃으로 표시합니다.
 * 다양한 쌓기 순서와 나머지 아바타를 위한 +N 오버레이를 지원합니다.
 */
export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  (
    {
      size = 'md',
      stacking = 'last-on-top',
      avatars,
      max,
      className,
      ...props
    },
    ref
  ) => {
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
    const classes = [styles.overlay, 'text-muted'];
    const sizeKey = `overlay${size}` as keyof typeof styles;
    const sizeClass = styles[sizeKey];
    if (sizeClass) classes.push(sizeClass as string);
    return classes.filter(Boolean).join(' ');
  }, [size]);

  return (
    <div ref={ref} className={containerClassName} {...props}>
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
              ring={true}
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
  }
);

AvatarGroup.displayName = 'AvatarGroup';
