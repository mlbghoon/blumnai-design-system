import { forwardRef, useMemo } from 'react';

import { IconLoader } from '../../../icons/IconLoader';
import { cn } from '../../../utils/cn';

import type { ControlButtonProps } from './ControlButton.types';

/**
 * ControlButton component
 *
 * A specialized icon-only button for controls (play, pause, skip, etc.).
 * Always square/circular with equal padding.
 */
export const ControlButton = forwardRef<HTMLButtonElement, ControlButtonProps>(({
  size = 'md',
  shape = 'rounded',
  icon,
  disabled = false,
  darkMode = false,
  className,
  'aria-label': ariaLabel,
  ...props
}, ref) => {
  // Size classes - equal padding for square buttons
  const sizeClasses = useMemo(() => {
    switch (size) {
      case 'md':
        return 'p-2.5';
      case 'lg':
        return 'p-3.5';
      default:
        return 'p-2.5';
    }
  }, [size]);

  // Icon size based on button size
  const iconSize = useMemo(() => {
    switch (size) {
      case 'md':
        return 16;
      case 'lg':
        return 18;
      default:
        return 16;
    }
  }, [size]);

  // Shape classes
  const shapeClasses = useMemo(() => {
    return shape === 'circle' ? 'rounded-full' : 'rounded-md';
  }, [shape]);

  const containerClassName = cn(
    'inline-flex items-center justify-center',
    'aspect-square',
    'bg-transparent',
    shapeClasses,
    darkMode ? 'text-[#6f6f77] hover:bg-[#27272a0f]' : 'text-[#6f6f77] hover:bg-[#27272a0f]',
    'transition-all duration-200',
    'focus:outline-none focus:ring-1 focus:ring-[#65a0fd66]',
    sizeClasses,
    disabled && 'bg-[#27272a14] text-[#27272a4d] cursor-not-allowed hover:bg-[#27272a14]',
    className
  );

  const iconColor = disabled ? '#27272a40' : '#6f6f77';

  return (
    <button
      ref={ref}
      type="button"
      disabled={disabled}
      className={containerClassName}
      aria-label={ariaLabel}
      {...props}
    >
      <IconLoader
        type={icon}
        size={iconSize}
        color={iconColor}
      />
    </button>
  );
});

ControlButton.displayName = 'ControlButton';
