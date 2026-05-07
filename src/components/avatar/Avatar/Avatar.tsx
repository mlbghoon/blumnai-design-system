import { forwardRef, memo, useMemo, useState } from 'react';

import avatarPlaceholderIcon from '../../../assets/avatar-placeholder-icon.png';
import { AspectRatio } from '../../aspect-ratio';
import {
  CONTAINER_BASE_CLASSES,
  CONTAINER_SIZE_CLASSES,
  IMAGE_CONTAINER_BASE_CLASSES,
  IMAGE_CONTAINER_BG_CLASSES,
  IMAGE_CONTAINER_BORDER_CLASS,
  IMAGE_CONTAINER_SHAPE_CLASSES,
  IMAGE_CLASSES,
  IMAGE_SIZE_CLASSES,
  IMAGE_WRAPPER_CLASSES,
  INITIALS_LETTER_SPACING,
  INITIALS_POSITION_CLASSES,
  INITIALS_TEXT_BASE_CLASSES,
  INITIALS_TYPOGRAPHY_CLASSES,
  INITIALS_VERTICAL_OFFSET,
  RING_BASE_CLASSES,
  RING_BG_CLASS,
  RING_ROUNDED_RADIUS_CLASSES,
  RING_SHAPE_CLASSES_CIRCULAR,
  RING_SIZE_CLASSES,
} from 'constants/avatar/Avatar/Avatar.constants';
import { cn } from '@/lib/utils';

import { AvatarBadge } from './AvatarBadge';
import type { AvatarProps } from './Avatar.types';

// Empty variant placeholder icon from Figma
const EMPTY_VARIANT_PLACEHOLDER_ICON = avatarPlaceholderIcon;

/**
 * Avatar 컴포넌트
 *
 * 이니셜, 이미지 또는 빈 상태를 지원하는 사용자 아바타를 표시합니다.
 * 다양한 크기, 모양(원형/둥근 사각형), 상태 인디케이터를 지원합니다.
 *
 * @example
 * ```tsx
 * <Avatar variant="initials" initials="AB" size="md" />
 * ```
 */
export const Avatar = memo(forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      variant = 'initials',
      size = 'md',
      shape = 'circular',
      initials,
      src,
      alt,
      color,
      ring = false,
      status,
      logoImage,
      icon,
      badgeLocation = 'top',
      onError: onErrorProp,
      onLoad: onLoadProp,
      className,
      onClick,
      ...props
    },
    ref
  ) => {
  const [imgState, setImgState] = useState<{ src: string | undefined; error: boolean }>({ src, error: false });
  if (imgState.src !== src) {
    setImgState({ src, error: false });
  }
  const imgError = imgState.error;
  const setImgError = (error: boolean) => setImgState((prev) => ({ ...prev, error }));

  // Get initials text - 1 letter for small sizes (2xs~md), 2 letters for large sizes (lg~3xl)
  const initialsText = useMemo(() => {
    if (!initials) return '';
    const trimmed = initials.trim();
    if (!trimmed) return '';
    const smallSizes = ['2xs', 'xs', 'sm', 'md'];
    const maxChars = smallSizes.includes(size) ? 1 : 2;

    const words = trimmed.split(/\s+/);
    if (words.length >= 2 && maxChars === 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return trimmed.toUpperCase().slice(0, maxChars);
  }, [initials, size]);

  // Container classes
  const containerClasses = useMemo(
    () => cn(CONTAINER_BASE_CLASSES, CONTAINER_SIZE_CLASSES[size], onClick && 'cursor-pointer', className),
    [size, onClick, className]
  );

  // Ring wrapper classes
  const ringWrapperClasses = useMemo(
    () => cn(RING_BASE_CLASSES, RING_SIZE_CLASSES[size]),
    [size]
  );

  // Ring inner classes (with background and shape) - matching Figma structure
  const ringInnerClasses = useMemo(() => {
    const shapeClass =
      shape === 'circular'
        ? RING_SHAPE_CLASSES_CIRCULAR
        : RING_ROUNDED_RADIUS_CLASSES[size];
    return cn('w-full h-full', shapeClass, RING_BG_CLASS);
  }, [shape, size]);

  // Image container classes
  const imageContainerClasses = useMemo(() => {
    const bgClasses = IMAGE_CONTAINER_BG_CLASSES[variant];
    let bgClass = bgClasses.default;

    // For initials variant, use custom color if provided, otherwise use default
    if (variant === 'initials' && color) {
      bgClass = bgClasses.withColor || ''; // Will use inline style for custom color
    }

    return cn(
      IMAGE_CONTAINER_BASE_CLASSES,
      IMAGE_SIZE_CLASSES[size],
      IMAGE_CONTAINER_SHAPE_CLASSES[shape],
      IMAGE_CONTAINER_BORDER_CLASS,
      bgClass
    );
  }, [size, shape, variant, color]);

  // Image container inline style (only for custom color in initials variant)
  const imageContainerStyle = useMemo(() => {
    if (variant === 'initials' && color) {
      return { backgroundColor: color };
    }
    return undefined;
  }, [variant, color]);

  // Initials classes - combining base, position, typography, letter spacing, and vertical offset
  const initialsClasses = useMemo(
    () =>
      cn(
        INITIALS_TEXT_BASE_CLASSES,
        INITIALS_POSITION_CLASSES[size],
        INITIALS_TYPOGRAPHY_CLASSES[size],
        INITIALS_LETTER_SPACING[size],
        INITIALS_VERTICAL_OFFSET[size]
      ),
    [size]
  );

  // Icon color for icon badge - matches imageContainerBgClass logic but returns color value
  const iconColor = useMemo(() => {
    if (color) {
      return color; // Use provided color if available
    }
    // Default to same color as imageContainerBgClass
    if (variant === 'initials') {
      return '#6f6f77'; // color.text.muted
    }
    // For userpic, theme will handle the background color, so we return undefined to let theme handle it
    return undefined;
  }, [variant, color]);

  return (
    <div ref={ref} className={containerClasses} onClick={onClick} {...props}>
      {/* Ring element - centered, conditional - matching Figma structure */}
      {ring && (
        <div className={ringWrapperClasses}>
          <div className={ringInnerClasses}>
            {/* Ring inner div matches Figma structure */}
          </div>
        </div>
      )}

      {/* Image container - centered, with border */}
      <div className={imageContainerClasses} style={imageContainerStyle}>
        {/* Initials variant: text only, NO Image wrapper */}
        {variant === 'initials' && initialsText && (
          <span className={initialsClasses}>{initialsText}</span>
        )}

        {/* Userpic variant: HAS Image wrapper */}
        {variant === 'userpic' && src && !imgError && (
          <div className={IMAGE_WRAPPER_CLASSES}>
            <AspectRatio ratio={1}>
              <img
                src={src}
                alt={alt || ''}
                className={IMAGE_CLASSES}
                onError={(e) => {
                  setImgError(true);
                  onErrorProp?.(e);
                }}
                onLoad={onLoadProp}
              />
            </AspectRatio>
          </div>
        )}

        {/* Userpic variant: fallback to initials on image error */}
        {variant === 'userpic' && imgError && initialsText && (
          <span className={initialsClasses}>{initialsText}</span>
        )}

        {/* Empty variant: HAS Image wrapper with placeholder icon */}
        {variant === 'empty' && (
          <div className={IMAGE_WRAPPER_CLASSES}>
            <AspectRatio ratio={1}>
              <img src={EMPTY_VARIANT_PLACEHOLDER_ICON} alt="" className={IMAGE_CLASSES} />
            </AspectRatio>
          </div>
        )}
      </div>

      {/* Status Badge - VARIABLE size based on avatar size */}
      {status && (
        <AvatarBadge
          status={status}
          size={size}
          shape={shape}
          badgeLocation={badgeLocation}
          logoImage={logoImage}
          icon={icon}
          color={iconColor}
        />
      )}
    </div>
  );
  }
));

Avatar.displayName = 'Avatar';
