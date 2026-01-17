import { forwardRef } from 'react';

import { IconLoader } from '../../../icons/IconLoader';
import { cn } from '../../../utils/cn';

import type { ChipProps } from './Chip.types';

/**
 * Chip 컴포넌트
 *
 * 작은 정보나 태그를 표시하는 컴포넌트입니다.
 * Figma 디자인을 기반으로 구현되었습니다.
 */
export const Chip = forwardRef<HTMLDivElement, ChipProps>(
  (
    {
      label,
      icon,
      iconOnly = false,
      size = 'md',
      variant = 'soft',
      shape = 'rounded',
      darkMode = false,
      className,
      ...props
    },
    ref
  ) => {
    // Size styles
    const sizeStyles = {
      sm: {
        padding: iconOnly ? 'min-h-6 min-w-6' : 'px-1.5 py-1',
        textSize: 'text-xs leading-4',
        iconSize: 16,
      },
      md: {
        padding: iconOnly ? 'min-h-7 min-w-7' : 'px-2 py-1',
        textSize: 'text-sm leading-5',
        iconSize: 16,
      },
      lg: {
        padding: iconOnly ? 'min-h-8 min-w-8' : 'px-2.5 py-1.5',
        textSize: 'text-sm leading-5',
        iconSize: iconOnly ? 20 : 16,
      },
    };

    const currentSize = sizeStyles[size];

    // Variant styles
    const variantStyles = {
      soft: {
        base: darkMode ? 'bg-[rgba(255,255,255,0.06)]' : 'bg-[rgba(39,39,42,0.06)]',
        hover: darkMode ? 'bg-[rgba(255,255,255,0.08)]' : 'bg-[rgba(39,39,42,0.08)]',
        press: darkMode ? 'bg-[rgba(255,255,255,0.10)]' : 'bg-[rgba(39,39,42,0.10)]',
        text: darkMode ? 'text-[rgba(255,255,255,0.7)]' : 'text-[#6F6F77]',
        textHover: darkMode ? 'text-[rgba(255,255,255,0.8)]' : 'text-[#4E4E55]',
        icon: darkMode ? 'text-[rgba(255,255,255,0.7)]' : 'text-[#6F6F77]',
        iconHover: darkMode ? 'text-[rgba(255,255,255,0.8)]' : 'text-[#4E4E55]',
        border: '',
      },
      secondary: {
        base: darkMode ? 'bg-[#222225]' : 'bg-white',
        hover: darkMode ? 'bg-[#2a2a2e]' : 'bg-[#FAFAFA]',
        press: darkMode ? 'bg-[#2f2f33]' : 'bg-[#F4F4F5]',
        text: darkMode ? 'text-[rgba(255,255,255,0.7)]' : 'text-[#6F6F77]',
        textHover: darkMode ? 'text-[rgba(255,255,255,0.8)]' : 'text-[#4E4E55]',
        icon: darkMode ? 'text-[rgba(255,255,255,0.7)]' : 'text-[#6F6F77]',
        iconHover: darkMode ? 'text-[rgba(255,255,255,0.8)]' : 'text-[#4E4E55]',
        border: darkMode
          ? 'outline outline-1 outline-[rgba(255,255,255,0.15)] outline-offset-[-1px]'
          : 'outline outline-1 outline-[rgba(39,39,42,0.15)] outline-offset-[-1px]',
      },
      ghost: {
        base: 'bg-transparent',
        hover: darkMode ? 'bg-[rgba(255,255,255,0.06)]' : 'bg-[rgba(39,39,42,0.06)]',
        press: darkMode ? 'bg-[rgba(255,255,255,0.08)]' : 'bg-[rgba(39,39,42,0.08)]',
        text: darkMode ? 'text-[rgba(255,255,255,0.7)]' : 'text-[#6F6F77]',
        textHover: darkMode ? 'text-[rgba(255,255,255,0.8)]' : 'text-[#4E4E55]',
        icon: darkMode ? 'text-[rgba(255,255,255,0.7)]' : 'text-[#6F6F77]',
        iconHover: darkMode ? 'text-[rgba(255,255,255,0.8)]' : 'text-[#4E4E55]',
        border: '',
      },
      selected: {
        base: darkMode ? 'bg-[rgba(101,160,253,0.15)]' : 'bg-[rgba(101,160,253,0.10)]',
        hover: darkMode ? 'bg-[rgba(101,160,253,0.18)]' : 'bg-[rgba(101,160,253,0.12)]',
        press: darkMode ? 'bg-[rgba(101,160,253,0.20)]' : 'bg-[rgba(101,160,253,0.14)]',
        text: darkMode ? 'text-[#5A9FFF]' : 'text-[#2147DD]',
        textHover: darkMode ? 'text-[#6AAFFF]' : 'text-[#2155ED]',
        icon: '#437DFC',
        iconHover: darkMode ? '#5A9FFF' : '#437DFC',
        border:
          variant === 'secondary'
            ? darkMode
              ? 'outline outline-1 outline-[rgba(101,160,253,0.25)] outline-offset-[-1px]'
              : 'outline outline-1 outline-[rgba(101,160,253,0.20)] outline-offset-[-1px]'
            : '',
      },
    };

    const currentVariant = variantStyles[variant];

    // Shape styles
    const shapeStyles = {
      rounded: 'rounded-md',
      circle: 'rounded-full',
    };

    // Focus ring
    const focusRing = 'focus:outline-none focus:ring-0 focus-visible:shadow-[0_0_0_3px_rgba(101,160,253,0.40)]';

    // Get hover and press background classes (full class names for Tailwind)
    const getHoverBgClass = () => {
      if (variant === 'soft') {
        return darkMode ? 'hover:bg-[rgba(255,255,255,0.08)]' : 'hover:bg-[rgba(39,39,42,0.08)]';
      }
      if (variant === 'secondary') {
        return darkMode ? 'hover:bg-[#2a2a2e]' : 'hover:bg-[#FAFAFA]';
      }
      if (variant === 'ghost') {
        return darkMode ? 'hover:bg-[rgba(255,255,255,0.06)]' : 'hover:bg-[rgba(39,39,42,0.06)]';
      }
      if (variant === 'selected') {
        return darkMode ? 'hover:bg-[rgba(101,160,253,0.18)]' : 'hover:bg-[rgba(101,160,253,0.12)]';
      }
      return '';
    };

    const getPressBgClass = () => {
      if (variant === 'soft') {
        return darkMode ? 'active:bg-[rgba(255,255,255,0.10)]' : 'active:bg-[rgba(39,39,42,0.10)]';
      }
      if (variant === 'secondary') {
        return darkMode ? 'active:bg-[#2f2f33]' : 'active:bg-[#F4F4F5]';
      }
      if (variant === 'ghost') {
        return darkMode ? 'active:bg-[rgba(255,255,255,0.08)]' : 'active:bg-[rgba(39,39,42,0.08)]';
      }
      if (variant === 'selected') {
        return darkMode ? 'active:bg-[rgba(101,160,253,0.20)]' : 'active:bg-[rgba(101,160,253,0.14)]';
      }
      return '';
    };

    // Get hover text color class
    const getHoverTextClass = () => {
      if (variant === 'selected') {
        return darkMode ? 'group-hover:text-[#6AAFFF]' : 'group-hover:text-[#2155ED]';
      }
      return darkMode ? 'group-hover:text-[rgba(255,255,255,0.8)]' : 'group-hover:text-[#4E4E55]';
    };

    // Get hover icon color class
    const getHoverIconClass = () => {
      if (variant === 'selected') {
        return ''; // Icons stay blue in selected variant
      }
      return darkMode ? 'group-hover:text-[rgba(255,255,255,0.8)]' : 'group-hover:text-[#4E4E55]';
    };

    const containerClassName = cn(
      'inline-flex items-center justify-center gap-1',
      'cursor-pointer select-none group',
      'transition-colors duration-150',
      currentSize.padding,
      !iconOnly && 'min-w-8',
      currentVariant.base,
      currentVariant.border,
      shapeStyles[shape],
      getHoverBgClass(),
      getPressBgClass(),
      focusRing,
      className
    );

    return (
      <div ref={ref} className={containerClassName} role="button" tabIndex={0} {...props}>
        {/* Icon */}
        {icon && (
          <span className={cn('inline-flex items-center justify-center shrink-0', iconOnly && 'w-full h-full')}>
            <IconLoader
              type={icon}
              size={currentSize.iconSize}
              color={
                variant === 'selected'
                  ? currentVariant.icon
                  : darkMode
                    ? 'currentColor'
                    : undefined
              }
              className={cn(
                'transition-colors duration-150',
                variant === 'selected' ? '' : currentVariant.icon,
                getHoverIconClass()
              )}
            />
          </span>
        )}

        {/* Label */}
        {!iconOnly && label && (
          <span
            className={cn(
              'shrink-0 transition-colors duration-150',
              currentSize.textSize,
              currentVariant.text,
              getHoverTextClass()
            )}
          >
            {label}
          </span>
        )}
      </div>
    );
  }
);

Chip.displayName = 'Chip';