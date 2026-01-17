import { forwardRef, useMemo } from 'react';

import { IconLoader } from '../../../icons/IconLoader';
import { cn } from '../../../utils/cn';

import type { LinkButtonProps } from './LinkButton.types';

/**
 * LinkButton component
 *
 * A specialized button for external links, typically with an external link icon.
 */
export const LinkButton = forwardRef<HTMLElement, LinkButtonProps>(({
  size = 'md',
  label,
  href,
  openInNewTab = false,
  icon = 'external-link',
  iconPosition = 'right',
  disabled = false,
  darkMode = false,
  className,
  ...props
}, ref) => {
  // Size classes
  const sizeClasses = useMemo(() => {
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
  }, [size]);

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

  // Text color based on state and darkMode
  const textColor = useMemo(() => {
    if (disabled) return 'text-[#27272a4d]';
    return darkMode ? 'text-[#6f6f77]' : 'text-[#111118]';
  }, [disabled, darkMode]);

  const hoverTextColor = useMemo(() => {
    if (disabled) return '';
    // In hover, text always changes to gray #6f6f77 (even if it was dark before)
    return 'hover:text-[#6f6f77]';
  }, [disabled]);

  // Icon color based on state and darkMode
  const iconColor = useMemo(() => {
    if (disabled) return '#27272a40';
    return '#6f6f77';
  }, [disabled]);

  const containerClassName = cn(
    'inline-flex items-center justify-center',
    'font-medium tracking-[-0.6px]',
    'rounded-full',
    'bg-transparent',
    textColor,
    hoverTextColor,
    !disabled && 'hover:underline hover:decoration-[#27272a27] hover:underline-offset-4',
    'transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-[#65a0fd66] focus:ring-offset-2',
    sizeClasses,
    disabled && 'cursor-not-allowed',
    className
  );

  const content = (
    <>
      {iconPosition === 'left' && (
        <IconLoader
          type={icon}
          size={iconSize}
          color={iconColor}
        />
      )}
      <span className="relative">{label}</span>
      {iconPosition === 'right' && (
        <IconLoader
          type={icon}
          size={iconSize}
          color={iconColor}
        />
      )}
    </>
  );

  if (href && !disabled) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        target={openInNewTab ? '_blank' : undefined}
        rel={openInNewTab ? 'noopener noreferrer' : undefined}
        className={containerClassName}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type="button"
      disabled={disabled}
      className={containerClassName}
      {...props}
    >
      {content}
    </button>
  );
});

LinkButton.displayName = 'LinkButton';
