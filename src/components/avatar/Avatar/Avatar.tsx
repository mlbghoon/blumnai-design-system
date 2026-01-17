import { useMemo } from 'react';

import avatarPlaceholderIcon from '../../../assets/avatar-placeholder-icon.png';
import { color as colorTokens } from '../../../tokens/color';
import { cn } from '../../../utils/cn';

import { sizes, initialsFontSizes } from './Avatar.constants';
import { AvatarBadge } from './AvatarBadge';
import type { AvatarProps } from './Avatar.types';

// Empty variant placeholder icon from Figma
const EMPTY_VARIANT_PLACEHOLDER_ICON = avatarPlaceholderIcon;

/**
 * Avatar component
 *
 * Displays a user avatar with support for initials, images, or empty state.
 * Supports multiple sizes, shapes (circular/rounded), and status indicators.
 */
export const Avatar = ({
  variant = 'initials',
  size = 'md',
  shape = 'circular',
  initials,
  src,
  alt,
  color,
  ring = true,
  status,
  logoImage,
  icon,
  badgeLocation = 'top',
  darkMode = false,
  className,
  ...props
}: AvatarProps) => {
  // Get initials text (first letter of each word, max 2 characters)
  const initialsText = useMemo(() => {
    if (!initials) return '';
    const words = initials.trim().split(/\s+/);
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase().slice(0, 2);
    }
    return initials.toUpperCase().slice(0, 2);
  }, [initials]);

  // Get size values
  const sizeValues = sizes[size];
  const imageSize = sizeValues.image;
  const ringSize = sizeValues.ring;

  // Container styles - dynamic size via inline style
  const containerStyle = useMemo(
    () => ({
      width: `${ringSize}px`,
      height: `${ringSize}px`,
    }),
    [ringSize]
  );

  // Ring styles - dynamic size via inline style
  const ringStyle = useMemo(
    () => ({
      width: `${ringSize}px`,
      height: `${ringSize}px`,
    }),
    [ringSize]
  );

  // Image container styles - dynamic size via inline style
  const imageContainerStyle = useMemo(() => {
    const style: React.CSSProperties = {
      width: `${imageSize}px`,
      height: `${imageSize}px`,
    };

    // Border color: 항상 반투명 rgba(39,39,42,0.1) - darkMode와 무관
    style.borderColor = colorTokens.border.default;

    // Background color for initials variant (if color prop is provided)
    if (variant === 'initials' && color) {
      style.backgroundColor = color;
    }

    return style;
  }, [imageSize, variant, color]);

  // Initials font size - dynamic via inline style
  const initialsStyle = useMemo(
    () => ({
      fontSize: initialsFontSizes[size],
    }),
    [size]
  );

  // Variant background classes
  const imageContainerBgClass = useMemo(() => {
    if (variant === 'initials') {
      return darkMode ? 'bg-[#6f6f77]' : color ? '' : 'bg-[#6f6f77]'; // color.text.muted
    }
    if (variant === 'userpic') {
      return darkMode ? 'bg-[#18181b]' : 'bg-[#f4f4f5]'; // color.bg.inverted : color.bg.muted
    }
    return 'bg-transparent';
  }, [variant, darkMode, color]);

  // Icon color for icon badge - matches imageContainerBgClass logic but returns color value
  const iconColor = useMemo(() => {
    if (color) {
      return color; // Use provided color if available
    }
    // Default to same color as imageContainerBgClass
    if (variant === 'initials') {
      return '#6f6f77'; // color.text.muted
    }
    if (variant === 'userpic') {
      return darkMode ? '#18181b' : '#f4f4f5'; // color.bg.inverted : color.bg.muted
    }
    return '#6f6f77'; // Default fallback
  }, [variant, darkMode, color]);

  return (
    <div
      className={cn('relative inline-flex shrink-0 p-0.5', className)}
      style={containerStyle}
      {...props}
    >
      {/* Ring element - centered, conditional */}
      {ring && (
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 shrink-0"
          style={ringStyle}
        >
          <div
            className={cn(
              'w-full h-full',
              darkMode ? 'bg-[#18181b]' : 'bg-white', // color.bg.inverted : color.bg.default
              shape === 'circular' ? 'rounded-full' : 'rounded-[10px]'
            )}
          />
        </div>
      )}

      {/* Image container - centered, with border */}
      <div
        className={cn(
          'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
          'flex items-center justify-center overflow-hidden shrink-0',
          'border border-solid',
          shape === 'circular' ? 'rounded-full' : 'rounded-[6px]',
          imageContainerBgClass
        )}
        style={imageContainerStyle}
      >
        {/* Initials variant: text only, NO Image wrapper */}
        {variant === 'initials' && initialsText && (
          <span
            className={cn(
              'absolute top-1/2 -translate-y-1/2 left-[calc(0%-1px)] right-[-1px]',
              'text-center leading-none flex flex-col justify-center',
              'text-white font-medium select-none uppercase',
              'font-["Spoqa_Han_Sans_Neo",sans-serif]'
            )}
            style={initialsStyle}
          >
            {initialsText}
          </span>
        )}

        {/* Userpic variant: HAS Image wrapper */}
        {variant === 'userpic' && src && (
          <div className="absolute aspect-square top-1/2 -translate-y-1/2 left-[-1px] right-[-1px] w-full h-full">
            <img src={src} alt={alt || ''} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Empty variant: HAS Image wrapper with placeholder icon */}
        {variant === 'empty' && (
          <div className="absolute aspect-square top-1/2 -translate-y-1/2 left-[-1px] right-[-1px] w-full h-full">
            <img
              src={EMPTY_VARIANT_PLACEHOLDER_ICON}
              alt=""
              className="w-full h-full object-cover"
            />
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
          darkMode={darkMode}
          logoImage={logoImage}
          icon={icon}
          color={iconColor}
        />
      )}
    </div>
  );
};
