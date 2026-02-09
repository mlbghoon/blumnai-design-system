import { forwardRef, useMemo } from 'react';

import { Avatar } from '../Avatar/Avatar';
import { cn } from '../../../utils/cn';

import { overlaps, overlaySizes } from './AvatarGroup.css';
import type { AvatarGroupProps } from './AvatarGroup.types';

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
  const overlap = useMemo(() => {
    return overlaps[size];
  }, [size]);

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

  const getZIndex = (index: number, total: number) => {
    if (stacking === 'last-on-top') {
      return index + 1;
    } else {
      return total - index;
    }
  };

  const overlaySize = overlaySizes[size];

  return (
    <div ref={ref} className={cn('relative inline-flex items-center shrink-0', className)} {...props}>
      {visibleAvatars.map((avatarProps, index) => {
        const zIndex = getZIndex(index, visibleAvatars.length);

        return (
          <div
            key={index}
            className="relative shrink-0"
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
          className={cn('relative flex items-center justify-center shrink-0 rounded-full font-body font-medium select-none', 'text-muted')}
          style={{
            zIndex: getZIndex(visibleAvatars.length, visibleAvatars.length + 1),
            marginLeft: `-${overlap}px`,
            width: overlaySize.width,
            height: overlaySize.height,
            fontSize: overlaySize.fontSize,
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
