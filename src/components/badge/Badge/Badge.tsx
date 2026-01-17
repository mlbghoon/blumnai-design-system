import { forwardRef, useMemo } from 'react';

import avatarPlaceholderIcon from '../../../assets/avatar-placeholder-icon.png';
import { IconLoader } from '../../../icons/IconLoader';
import { cn } from '../../../utils/cn';

import type { BadgeColor, BadgeProps } from './Badge.types';

// Placeholder image for badge image variant
const BADGE_PLACEHOLDER_IMAGE = avatarPlaceholderIcon;

/**
 * Get dot color based on badge color and dark mode
 */
const getDotColor = (color: BadgeColor, darkMode: boolean): string => {
  if (darkMode) {
    const darkDotColors: Record<BadgeColor, string> = {
      red: '#ed6664',
      orange: '#f38f36',
      lime: '#90cd22',
      green: '#4fc660',
      cyan: '#3eb5d7',
      blue: '#437dfc',
      violet: '#8655fd',
      fuchsia: '#cf3ff3',
      pink: '#e34798',
      neutral: '#ffffff80',
    };
    return darkDotColors[color];
  }

  const lightDotColors: Record<BadgeColor, string> = {
    red: '#b11e1b',
    orange: '#a73b0c',
    lime: '#90cd22',
    green: '#4fc660',
    cyan: '#3eb5d7',
    blue: '#437dfc',
    violet: '#cf3ff3',
    fuchsia: '#cf3ff3',
    pink: '#cf3ff3',
    neutral: '#6f6f77',
  };
  return lightDotColors[color];
};

/**
 * Get color classes based on badge color and dark mode
 * Special case: neutral color with border uses white background (light mode) or different background (dark mode)
 */
const getColorClasses = (color: BadgeColor, hasBorder: boolean, darkMode: boolean): string => {
  if (darkMode) {
    const darkColorMap: Record<BadgeColor, { bg: string; text: string }> = {
      red: { bg: 'bg-[#ee6e6c1a]', text: 'text-[#ed6664]' },
      orange: { bg: 'bg-[#f38f361a]', text: 'text-[#f38f36]' },
      lime: { bg: 'bg-[#66dc7e1a]', text: 'text-[#66dc7e]' },
      green: { bg: 'bg-[#66dc7e1a]', text: 'text-[#66dc7e]' },
      cyan: { bg: 'bg-[#65a0fd1a]', text: 'text-[#65a0fd]' },
      blue: { bg: 'bg-[#65a0fd1a]', text: 'text-[#65a0fd]' },
      violet: { bg: 'bg-[#dd72fa1a]', text: 'text-[#dd72fa]' },
      fuchsia: { bg: 'bg-[#dd72fa1a]', text: 'text-[#dd72fa]' },
      pink: { bg: 'bg-[#dd72fa1a]', text: 'text-[#dd72fa]' },
      neutral: {
        bg: 'bg-[#ffffff1a]',
        text: 'text-[#ffffffb2]'
      },
    };
    const colors = darkColorMap[color];
    return `${colors.bg} ${colors.text}`;
  }

  const lightColorMap: Record<BadgeColor, { bg: string; text: string }> = {
    red: { bg: 'bg-[#ee6e6c1a]', text: 'text-[#b11e1b]' },
    orange: { bg: 'bg-[#f38f361a]', text: 'text-[#a73b0c]' },
    lime: { bg: 'bg-[#abe4351a]', text: 'text-[#557c18]' },
    green: { bg: 'bg-[#66dc7e1a]', text: 'text-[#33803f]' },
    cyan: { bg: 'bg-[#4ad0ef1a]', text: 'text-[#297392]' },
    blue: { bg: 'bg-[#65a0fd1a]', text: 'text-[#2147dd]' },
    violet: { bg: 'bg-[#a185fd1a]', text: 'text-[#6717de]' },
    fuchsia: { bg: 'bg-[#dd72fa1a]', text: 'text-[#9a15b1]' },
    pink: { bg: 'bg-[#ea6eb31a]', text: 'text-[#b61a5c]' },
    neutral: {
      bg: hasBorder ? 'bg-white' : 'bg-[#27272a0f]',
      text: 'text-[#4e4e55]'
    },
  };
  const colors = lightColorMap[color];
  return `${colors.bg} ${colors.text}`;
};

/**
 * Badge component
 *
 * Displays a small badge with text, icon, image, or dot.
 * Supports multiple variants, sizes, colors, and shapes.
 */
export const Badge = forwardRef<HTMLDivElement, BadgeProps>(({
  variant = 'default',
  size = 'sm',
  color = 'neutral',
  shape = 'rounded',
  border = false,
  closeIcon = false,
  label,
  icon,
  image,
  onClose,
  darkMode = false,
  className,
  ...props
}, ref) => {

  // Build container class names
  const containerClassName = useMemo(() => {
    const classes = [
      'relative inline-flex items-center justify-center gap-1',
      'font-["Spoqa_Han_Sans_Neo",sans-serif] font-medium select-none whitespace-nowrap',
    ];

    // Size
    if (size === 'sm') {
      classes.push('min-h-[20px] py-1 px-2 text-xs leading-4 tracking-[-0.6px]');
    } else {
      classes.push('min-h-[24px] py-1.5 px-2.5 text-sm leading-4 tracking-[-0.6px]');
    }

    // Shape
    if (shape === 'pill') {
      classes.push('rounded-full');
    } else {
      classes.push('rounded-[6px]');
    }

    // Color (neutral with border uses white background in light mode)
    classes.push(getColorClasses(color, border, darkMode));

    // Border
    if (border) {
      if (darkMode) {
        classes.push('border border-solid border-[#ffffff1a]');
      } else {
        classes.push('border border-solid border-[#27272a1a]');
      }
    }

    if (className) {
      classes.push(className);
    }

    return cn(...classes);
  }, [size, shape, color, border, darkMode, className]);

  // Icon size based on badge size
  const iconSize = size === 'sm' ? 12 : 14;

  return (
    <div ref={ref} className={containerClassName} {...props}>
      {/* Icon variant */}
      {variant === 'icon' && icon && (
        <span className="inline-flex items-center shrink-0 leading-none" style={{ marginTop: '-1px' }}>
          <IconLoader type={icon} size={iconSize} />
        </span>
      )}

      {/* Image variant */}
      {variant === 'image' && (
        <span
          className="inline-flex items-center shrink-0 overflow-hidden rounded-full leading-none"
          style={{
            width: `${iconSize}px`,
            height: `${iconSize}px`,
            marginTop: '-1px',
          }}
        >
          <img
            src={image || BADGE_PLACEHOLDER_IMAGE}
            alt=""
            className="w-full h-full object-cover"
          />
        </span>
      )}

      {/* Dot variant */}
      {variant === 'dot' && (
        <span
          className="inline-flex items-center shrink-0 rounded-full leading-none"
          style={{
            width: `${iconSize}px`,
            height: `${iconSize}px`,
            backgroundColor: getDotColor(color, darkMode),
            marginTop: '-1px',
          }}
        />
      )}

      {/* Label (for default variant or when label is provided) */}
      {(variant === 'default' || label) && <span className="shrink-0 leading-none">{label}</span>}

      {/* Close icon */}
      {closeIcon && (
        <button
          type="button"
          className="flex items-center justify-center shrink-0 cursor-pointer p-0 border-0 bg-transparent hover:opacity-80"
          onClick={onClose}
          aria-label="Close badge"
        >
          <IconLoader type="close" size={iconSize} />
        </button>
      )}
    </div>
  );
});

Badge.displayName = 'Badge';
