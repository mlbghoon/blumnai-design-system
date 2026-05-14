/* eslint-disable react-refresh/only-export-components */
import { forwardRef, useMemo } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';

import { renderIconProp } from '../icons/Icon';
import { cn } from '../../lib/utils';

import type { ControlButtonProps, ControlButtonSize, ControlButtonShape, ControlButtonStyle } from './ControlButton.types';

const controlButtonVariants = cva(
  'inline-flex items-center justify-center cursor-pointer transition-colors duration-200 focus:outline-none',
  {
    variants: {
      buttonStyle: {
        default: 'bg-transparent hover:bg-state-ghost-hover active:bg-state-ghost-press focus-visible:shadow-component-misc-focus',
        inverted: 'bg-transparent hover:bg-white/[0.08] active:bg-white/[0.15] focus-visible:shadow-component-misc-focus',
      },
      size: {
        sm: 'width-16 height-16',
        md: 'width-20 height-20',
        lg: 'width-24 height-24',
        xl: 'width-32 height-32',
      },
      shape: {
        rounded: 'rounded-xs',
        circle: 'rounded-full',
      },
    },
    defaultVariants: {
      buttonStyle: 'default',
      size: 'md',
      shape: 'rounded',
    },
  }
);

const ICON_SIZE = {
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24,
} as const;

const STYLE_CONFIG = {
  default: {
    iconColor: 'var(--icon-default-muted)',
    disabledIconColor: 'var(--icon-default-disabled)',
  },
  inverted: {
    iconColor: 'var(--icon-white-default)',
    disabledIconColor: 'var(--icon-white-disabled)',
  },
} as const;

const DISABLED_STYLE = 'bg-transparent cursor-not-allowed';

/**
 * ControlButton 컴포넌트
 *
 * 아이콘만 표시되는 컴팩트 액션 버튼입니다.
 *
 * @example
 * ```tsx
 * <ControlButton icon={RiEditLine} size="md" />
 * ```
 */
export const ControlButton = forwardRef<HTMLButtonElement, ControlButtonProps>(({
  buttonStyle = 'default',
  size = 'md',
  shape = 'rounded',
  icon,
  colorOverride,
  disabled = false,
  asChild = false,
  className,
  'aria-label': ariaLabel,
  ...props
}, ref) => {
  const Comp = asChild ? Slot : 'button';
  const iconSize = ICON_SIZE[size] ?? 16;

  const containerClassName = cn(
    controlButtonVariants({ ...(disabled ? {} : { buttonStyle }), size, shape }),
    disabled && DISABLED_STYLE,
    className
  );

  const getIconColor = useMemo(() => {
    const config = STYLE_CONFIG[buttonStyle] ?? STYLE_CONFIG.default;
    if (disabled) return config.disabledIconColor;
    if (colorOverride) return `var(--bg-basic-${colorOverride}-accent)`;
    return config.iconColor;
  }, [buttonStyle, disabled, colorOverride]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) { e.preventDefault(); return; }
    props.onClick?.(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (disabled && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); return; }
    props.onKeyDown?.(e);
  };

  return (
    <Comp
      ref={ref}
      type={asChild ? undefined : 'button'}
      disabled={asChild ? undefined : disabled}
      aria-disabled={disabled || undefined}
      tabIndex={asChild && disabled ? -1 : undefined}
      className={containerClassName}
      aria-label={ariaLabel}
      {...props}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {renderIconProp(icon, { size: iconSize, color: getIconColor })}
    </Comp>
  );
});

ControlButton.displayName = 'ControlButton';

export { controlButtonVariants };
export type { ControlButtonProps, ControlButtonSize, ControlButtonShape, ControlButtonStyle };
