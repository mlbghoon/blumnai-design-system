import { forwardRef, useMemo } from 'react';

import { IconLoader } from '../../../icons/IconLoader';
import { cn } from '../../../utils/cn';

import type { FilterButtonProps } from './FilterButton.types';

/**
 * FilterButton component
 *
 * A specialized button for filtering actions, typically with a dashed border and filter icon.
 */
export const FilterButton = forwardRef<HTMLButtonElement, FilterButtonProps>(({
  size = 'md',
  shape = 'rounded',
  selected = false,
  disabled = false,
  darkMode = false,
  label,
  icon = 'filter',
  className,
  ...props
}, ref) => {
  // Size classes - based on Figma padding values (left/right, top/bottom)
  const sizeClasses = useMemo(() => {
    switch (size) {
      case 'xs':
        return 'text-xs leading-4 px-1.5 py-1 gap-1'; // 6px horizontal, 4px vertical
      case 'md':
        return 'text-sm leading-5 px-2 py-1 gap-2'; // 8px horizontal, 4px vertical
      case 'lg':
        return 'text-base leading-6 px-2.5 py-1.5 gap-2'; // 10px horizontal, 6px vertical
      default:
        return 'text-sm leading-5 px-2 py-1 gap-2';
    }
  }, [size]);

  // Icon size based on button size
  const iconSize = useMemo(() => {
    switch (size) {
      case 'xs':
        return 12;
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
    return shape === 'pill' ? 'rounded-full' : 'rounded-md';
  }, [shape]);

  const containerClassName = cn(
    'inline-flex items-center justify-center',
    'font-medium tracking-[-0.6px]',
    shapeClasses,
    darkMode ? 'bg-[#222225]' : 'bg-white',
    darkMode
      ? 'border border-dashed border-[rgba(255,255,255,0.15)]'
      : 'border border-dashed border-[#27272a26]',
    darkMode ? 'text-[rgba(255,255,255,0.8)]' : 'text-[#6f6f77]',
    darkMode ? 'hover:bg-[rgba(255,255,255,0.06)]' : 'hover:bg-[#fafafa]',
    'transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-[#65a0fd66] focus:ring-offset-2',
    selected && 'shadow-[0_1px_2px_rgba(0,0,0,0.05)]',
    sizeClasses,
    disabled && darkMode
      ? 'bg-[rgba(255,255,255,0.06)] text-[rgba(255,255,255,0.3)] border-[rgba(255,255,255,0.1)] cursor-not-allowed hover:bg-[rgba(255,255,255,0.06)]'
      : disabled && 'bg-[#27272a14] text-[#27272a4d] border-[#27272a26] cursor-not-allowed hover:bg-[#27272a14]',
    className
  );

  return (
    <button
      ref={ref}
      type="button"
      disabled={disabled}
      className={containerClassName}
      {...props}
    >
      <IconLoader
        type={icon}
        size={iconSize}
        color={
          disabled
            ? darkMode
              ? 'rgba(255,255,255,0.25)'
              : '#27272a40'
            : darkMode
              ? 'rgba(255,255,255,0.7)'
              : '#6f6f77'
        }
      />
      <span>{label}</span>
    </button>
  );
});

FilterButton.displayName = 'FilterButton';
