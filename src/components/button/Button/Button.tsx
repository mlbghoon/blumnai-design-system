import { forwardRef, useMemo } from 'react';

import { IconLoader } from '../../../icons/IconLoader';
import { cn } from '../../../utils/cn';

import type { ButtonProps } from './Button.types';

/**
 * Button component
 *
 * A versatile button component supporting multiple variants, sizes, and types.
 * Supports regular buttons, social buttons, filter buttons, link buttons, and avatar buttons.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'md',
  type = 'button',
  icon,
  iconPosition = 'left',
  avatar,
  shortcut,
  iconOnly = false,
  loading = false,
  disabled = false,
  fullWidth = false,
  darkMode = false,
  className,
  children,
  ...props
}, ref) => {
  // Size classes - using Figma spacing values
  // Icon-only buttons have equal padding on all sides (square)
  const sizeClasses = useMemo(() => {
    if (iconOnly) {
      switch (size) {
        case 'xs':
          return 'p-1';
        case 'sm':
          return 'p-1.5';
        case 'md':
          return 'p-2.5';
        case 'lg':
          return 'p-3.5';
        default:
          return 'p-2.5';
      }
    }

    switch (size) {
      case 'xs':
        return 'text-xs leading-4 px-1 py-0.5 gap-1';
      case 'sm':
        return 'text-sm leading-5 px-1.5 py-1.5 gap-1.5';
      case 'md':
        return 'text-sm leading-5 px-2.5 py-2.5 gap-2';
      case 'lg':
        return 'text-base leading-6 px-3.5 py-3.5 gap-2';
      default:
        return 'text-sm leading-5 px-2.5 py-2.5 gap-2';
    }
  }, [size, iconOnly]);

  // Variant classes with proper hover/press/loading states
  const variantClasses = useMemo(() => {
    // Loading states
    if (loading) {
      switch (variant) {
        case 'primary':
          return 'bg-[#9ac4fe] text-white cursor-wait';
        case 'secondary':
          return 'bg-[#ffffff] text-[#111115] border border-[#27272a1a] cursor-wait';
        case 'destructive':
          return 'bg-[#f4a6a5] text-white cursor-wait';
        case 'soft':
          return 'bg-[#27272a0f] text-[#6f6f77] cursor-wait';
        case 'ghost':
          return 'bg-[#27272a0f] text-[#6f6f77] cursor-wait';
        default:
          return '';
      }
    }

    switch (variant) {
      case 'primary':
        return darkMode
          ? 'bg-[#437dfc] text-white hover:bg-[#65a0fd] active:bg-[#437dfc] focus:ring-2 focus:ring-[#65a0fd66] focus:ring-offset-2 focus:shadow-[0_0_0_3px_rgba(101,160,253,0.4),0_0_0_1px_#ffffff]'
          : 'bg-[#437dfc] text-white hover:bg-[#65a0fd] active:bg-[#437dfc] focus:ring-2 focus:ring-[#65a0fd66] focus:ring-offset-2 focus:shadow-[0_0_0_3px_rgba(101,160,253,0.4),0_0_0_1px_#ffffff]';
      case 'secondary':
        return darkMode
          ? 'bg-[#ffffff] text-[#111115] border border-[#27272a1a] hover:bg-[#fafafa] active:bg-[#f4f4f5] focus:ring-2 focus:ring-[#65a0fd66] focus:ring-offset-2 focus:shadow-[0_0_0_3px_rgba(101,160,253,0.4),0_0_0_1px_#ffffff]'
          : 'bg-[#ffffff] text-[#111115] border border-[#27272a1a] hover:bg-[#fafafa] active:bg-[#f4f4f5] focus:ring-2 focus:ring-[#65a0fd66] focus:ring-offset-2 focus:shadow-[0_0_0_3px_rgba(101,160,253,0.4),0_0_0_1px_#ffffff]';
      case 'destructive':
        return darkMode
          ? 'bg-[#e74341] text-white hover:bg-[#ed6664] active:bg-[#e74341] focus:ring-2 focus:ring-[#ee6e6c66] focus:ring-offset-2 focus:shadow-[0_0_0_3px_rgba(238,110,108,0.4),0_0_0_1px_#ffffff]'
          : 'bg-[#e74341] text-white hover:bg-[#ed6664] active:bg-[#e74341] focus:ring-2 focus:ring-[#ee6e6c66] focus:ring-offset-2 focus:shadow-[0_0_0_3px_rgba(238,110,108,0.4),0_0_0_1px_#ffffff]';
      case 'ghost':
        return darkMode
          ? 'bg-[#27272a00] text-[#6f6f77] hover:bg-[#27272a0f] active:bg-[#27272a14] focus:ring-2 focus:ring-[#65a0fd66] focus:ring-offset-2 focus:shadow-[0_0_0_3px_rgba(101,160,253,0.4),0_0_0_1px_#ffffff]'
          : 'bg-[#27272a00] text-[#6f6f77] hover:bg-[#27272a0f] active:bg-[#27272a14] focus:ring-2 focus:ring-[#65a0fd66] focus:ring-offset-2 focus:shadow-[0_0_0_3px_rgba(101,160,253,0.4),0_0_0_1px_#ffffff]';
      case 'soft':
        return darkMode
          ? 'bg-[#27272a0f] text-[#6f6f77] hover:bg-[#27272a14] active:bg-[#27272a1a] focus:ring-2 focus:ring-[#65a0fd66] focus:ring-offset-2 focus:shadow-[0_0_0_3px_rgba(101,160,253,0.4),0_0_0_1px_#ffffff]'
          : 'bg-[#27272a0f] text-[#6f6f77] hover:bg-[#27272a14] active:bg-[#27272a1a] focus:ring-2 focus:ring-[#65a0fd66] focus:ring-offset-2 focus:shadow-[0_0_0_3px_rgba(101,160,253,0.4),0_0_0_1px_#ffffff]';
      case 'gray':
        return darkMode
          ? 'bg-[#111115] text-white hover:opacity-90'
          : 'bg-[#111115] text-white hover:opacity-90';
      case 'linkedin':
        return 'bg-[#0077b5] text-white hover:opacity-90';
      case 'google':
        return darkMode
          ? 'bg-[#ffffff] text-[#111115] border border-[#27272a1a] hover:bg-[#f5f5f5]'
          : 'bg-[#ffffff] text-[#111115] border border-[#27272a1a] hover:bg-[#f5f5f5]';
      case 'facebook':
        return 'bg-[#1877f2] text-white hover:opacity-90';
      case 'twitter':
        return darkMode
          ? 'bg-[#111115] text-white hover:opacity-90'
          : 'bg-[#111115] text-white hover:opacity-90';
      default:
        return 'bg-[#437dfc] text-white hover:opacity-90';
    }
  }, [variant, darkMode, loading]);

  // Icon size based on button size
  const iconSize = useMemo(() => {
    switch (size) {
      case 'xs':
        return 12;
      case 'sm':
        return 14;
      case 'md':
        return 16;
      case 'lg':
        return 18;
      default:
        return 16;
    }
  }, [size]);

  // Render icon or loading spinner
  const renderIcon = () => {
    if (loading) {
      return (
        <span className="inline-flex items-center">
          <svg
            className="animate-spin"
            width={iconSize}
            height={iconSize}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="32"
              strokeDashoffset="32"
              opacity="0.3"
            />
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="32"
              strokeDashoffset="24"
            />
          </svg>
        </span>
      );
    }

    if (avatar) {
      return (
        <img
          src={avatar}
          alt=""
          className="rounded-full object-cover"
          style={{ width: iconSize, height: iconSize }}
        />
      );
    }

    if (!icon) return null;

    if (typeof icon === 'string') {
      let iconColor = '#ffffff';
      if (disabled) {
        iconColor = '#27272a40';
      } else if (variant === 'primary' || variant === 'destructive' || variant === 'linkedin' || variant === 'facebook' || variant === 'twitter' || variant === 'gray') {
        iconColor = '#ffffff';
      } else if (variant === 'secondary' || variant === 'google') {
        iconColor = '#6f6f77';
      } else {
        iconColor = '#6f6f77';
      }

      return (
        <IconLoader
          type={icon}
          size={iconSize}
          color={iconColor}
        />
      );
    }

    return <span className="inline-flex items-center">{icon}</span>;
  };

  const containerClassName = cn(
    'inline-flex items-center justify-center',
    !iconOnly && 'font-medium tracking-[-0.6px]',
    'rounded-full',
    'transition-all duration-200',
    'focus:outline-none',
    iconOnly && 'aspect-square',
    sizeClasses,
    variantClasses,
    fullWidth && !iconOnly && 'w-full',
    disabled && 'bg-[#27272a14] text-[#27272a4d] cursor-not-allowed hover:bg-[#27272a14]',
    loading && 'cursor-wait',
    className
  );

  // Render keyboard shortcut indicator
  const renderShortcut = () => {
    if (!shortcut) return null;

    const shortcutColor = variant === 'primary' || variant === 'destructive' || variant === 'linkedin' || variant === 'facebook' || variant === 'twitter' || variant === 'gray'
      ? 'bg-[#ffffff1a] border border-[#ffffff33] text-white'
      : variant === 'secondary' || variant === 'google'
      ? 'bg-[#27272a0f] border border-[#27272a1a] text-[#6f6f77]'
      : 'bg-[#27272a0f] border border-[#27272a1a] text-[#6f6f77]';

    return (
      <span
        className={cn(
          'inline-flex items-center justify-center',
          'rounded px-1 py-0.5',
          'text-xs leading-none',
          'border',
          shortcutColor
        )}
      >
        {shortcut}
      </span>
    );
  };

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      className={containerClassName}
      aria-label={iconOnly && typeof icon === 'string' ? icon : undefined}
      {...props}
    >
      {iconOnly ? (
        renderIcon()
      ) : (
        <>
          {iconPosition === 'left' && renderIcon()}
          {children}
          {shortcut && renderShortcut()}
          {iconPosition === 'right' && renderIcon()}
        </>
      )}
    </button>
  );
});

Button.displayName = 'Button';
