import { forwardRef, useMemo } from 'react';

import avatarPlaceholderIcon from '../../../assets/avatar-placeholder-icon.png';
import { Icon } from '../../icons/Icon';
import { cn } from '../../../utils/cn';

import type { BadgeColor, BadgeProps } from './Badge.types';

// Placeholder image for badge image variant
const BADGE_PLACEHOLDER_IMAGE = avatarPlaceholderIcon;

/**
 * Get background class based on badge color
 * Uses CSS variables that adapt to theme (light/dark mode)
 */
const getBgClass = (color: BadgeColor, hasBorder: boolean): string => {
  if (color === 'neutral') {
    return hasBorder ? 'bg-badge-default' : 'bg-badge-gray';
  }
  return `bg-badge-${color}`;
};

/**
 * Get text color CSS variable based on badge color
 * - Colored badges use --bg-basic-{color}-strong
 * - Neutral badges use --text-subtle
 */
const getTextColor = (color: BadgeColor): string => {
  if (color === 'neutral') {
    return 'var(--text-subtle)';
  }
  return `var(--bg-basic-${color}-strong)`;
};

/**
 * Get dot color CSS variable based on badge color
 * - Colored badges use --bg-basic-{color}-accent
 * - Neutral badges use --text-subtle
 */
const getDotColor = (color: BadgeColor): string => {
  if (color === 'neutral') {
    return 'var(--text-subtle)';
  }
  return `var(--bg-basic-${color}-accent)`;
};

/**
 * Get icon color CSS variable based on badge color
 * - Colored badges use same as text (--bg-basic-{color}-strong)
 * - Neutral badges use --icon-default-muted
 */
const getIconColor = (color: BadgeColor): string => {
  if (color === 'neutral') {
    return 'var(--icon-default-muted)';
  }
  return `var(--bg-basic-${color}-strong)`;
};

/**
 * Badge component
 *
 * Displays a small badge with text, icon, image, or dot.
 * Supports multiple variants, sizes, colors, and shapes.
 * Colors automatically adapt to the current theme (light/dark mode).
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
  className,
  style,
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

    // Background color (uses CSS variables for theme support)
    classes.push(getBgClass(color, border));

    // Border
    if (border) {
      classes.push('border border-solid border-badge-default');
    }

    if (className) {
      classes.push(className);
    }

    return cn(...classes);
  }, [size, shape, color, border, className]);

  // Icon size based on badge size
  const iconSize = size === 'sm' ? 12 : 14;

  // Text color style (uses --bg-basic-{color}-strong or --text-subtle for neutral)
  const combinedStyle = { color: getTextColor(color), ...style };

  return (
    <div ref={ref} className={containerClassName} style={combinedStyle} {...props}>
      {/* Icon variant */}
      {variant === 'icon' && icon && (
        <span className="inline-flex items-center shrink-0 leading-none" style={{ marginTop: '-1px' }}>
          <Icon iconType={icon} size={iconSize} color={getIconColor(color)} />
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

      {/* Dot variant - uses --bg-basic-{color}-accent or --text-subtle for neutral */}
      {variant === 'dot' && (
        <span
          className="inline-flex items-center shrink-0 rounded-full leading-none"
          style={{
            width: `${iconSize}px`,
            height: `${iconSize}px`,
            backgroundColor: getDotColor(color),
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
          <Icon iconType={['system', 'close']} size={iconSize} color={getIconColor(color)} />
        </button>
      )}
    </div>
  );
});

Badge.displayName = 'Badge';
