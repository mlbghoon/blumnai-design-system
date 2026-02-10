/* eslint-disable react-refresh/only-export-components */
import { forwardRef, useMemo } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';

import { Icon } from '../icons/Icon';
import { cn } from '../../lib/utils';

import type { FilterButtonProps, FilterButtonSize, FilterButtonShape } from './FilterButton.types';

const filterButtonVariants = cva(
  'inline-flex items-center justify-center font-medium cursor-pointer transition-all duration-200 focus:outline-none',
  {
    variants: {
      size: {
        xs: 'size-xs line-height-leading-4 gap-4 padding-x-6 padding-y-4 letter-spacing-tracking-tight',
        md: 'size-sm line-height-leading-5 gap-4 padding-x-8 padding-y-4 letter-spacing-tracking-tight',
        lg: 'size-sm line-height-leading-5 gap-4 padding-x-10 padding-y-6 letter-spacing-tracking-tight',
      },
      shape: {
        rounded: 'rounded-sm',
        pill: 'rounded-full',
      },
    },
    defaultVariants: {
      size: 'md',
      shape: 'rounded',
    },
  }
);

const STATE_CONFIG = {
  unselected: {
    bg: 'bg-input',
    border: 'border-dashed [border-width:1px] [border-color:var(--border-darker)]',
    text: 'text-subtle',
    iconColor: 'var(--icon-default-muted)',
  },
  selected: {
    bg: 'bg-input',
    border: 'border-default',
    text: 'text-subtle',
    iconColor: 'var(--icon-default-muted)',
  },
  hover: { bg: 'hover:bg-state-soft-hover' },
  active: { bg: 'active:bg-state-soft-press' },
  focus: { ring: 'focus-visible:shadow-component-focus' },
} as const;

const DISABLED_STYLE = {
  unselected: 'bg-state-disabled border-dashed [border-width:1px] [border-color:var(--border-default)] text-hint cursor-not-allowed',
  selected: 'bg-state-disabled border-default text-hint cursor-not-allowed',
  iconColor: 'var(--icon-default-disabled)',
} as const;

/**
 * FilterButton 컴포넌트
 *
 * 필터 토글 버튼입니다. 선택 상태와 활성 필터 수를 배지로 표시합니다.
 *
 * @example
 * <FilterButton selected={hasFilters} count={3}>필터</FilterButton>
 */
export const FilterButton = forwardRef<HTMLButtonElement, FilterButtonProps>(({
  size = 'md',
  shape = 'rounded',
  selected = false,
  disabled = false,
  label,
  icon = ['system', 'filter'],
  asChild = false,
  width,
  className,
  style,
  ...props
}, ref) => {
  const Comp = asChild ? Slot : 'button';
  const iconSize = 16;

  const getWidthValue = (w: string | number): string => {
    if (typeof w === 'number') return `${w}px`;
    const numericValue = parseFloat(w);
    if (!isNaN(numericValue) && String(numericValue) === w.trim()) {
      return `${numericValue}px`;
    }
    return w;
  };

  const widthStyle = width !== undefined && width !== ''
    ? { width: getWidthValue(width) }
    : undefined;

  const mergedStyle: React.CSSProperties = {
    ...(style || {}),
    ...(widthStyle || {}),
  };

  const stateClasses = useMemo(() => {
    if (disabled) {
      return selected ? DISABLED_STYLE.selected : DISABLED_STYLE.unselected;
    }

    const baseState = selected ? STATE_CONFIG.selected : STATE_CONFIG.unselected;
    return cn(
      baseState.bg,
      baseState.border,
      baseState.text,
      STATE_CONFIG.hover.bg,
      STATE_CONFIG.active.bg,
      STATE_CONFIG.focus.ring
    );
  }, [disabled, selected]);

  const iconColor = useMemo(() => {
    if (disabled) return DISABLED_STYLE.iconColor;
    const baseState = selected ? STATE_CONFIG.selected : STATE_CONFIG.unselected;
    return baseState.iconColor;
  }, [disabled, selected]);

  const containerClassName = cn(
    filterButtonVariants({ size, shape }),
    stateClasses,
    className
  );

  return (
    <Comp
      ref={ref}
      type={asChild ? undefined : 'button'}
      disabled={disabled}
      className={containerClassName}
      style={Object.keys(mergedStyle).length > 0 ? mergedStyle : undefined}
      {...props}
    >
      <Icon
        iconType={icon}
        size={iconSize}
        color={iconColor}
      />
      <span>{label}</span>
    </Comp>
  );
});

FilterButton.displayName = 'FilterButton';

export { filterButtonVariants };
export type { FilterButtonProps, FilterButtonSize, FilterButtonShape };
