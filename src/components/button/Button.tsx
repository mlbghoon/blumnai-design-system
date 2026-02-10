/* eslint-disable react-refresh/only-export-components */
import { forwardRef, isValidElement } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';

import { Icon } from '../icons/Icon';
import type { IconType } from '../icons/Icon/Icon.types';
import { cn } from '../../lib/utils';

import type { ButtonProps, ButtonIconType, ButtonStyle, ButtonVariant, ButtonSize, ButtonShape } from './Button.types';

const buttonVariants = cva(
  'inline-flex items-center justify-center cursor-pointer transition-all duration-200 focus:outline-none font-medium letter-spacing-tracking-normal',
  {
    variants: {
      size: {
        '2xs': 'height-24 size-xs line-height-leading-4 padding-x-6 padding-y-4 gap-4',
        'xs': 'height-28 size-sm line-height-leading-5 padding-x-8 padding-y-4 gap-4',
        'sm': 'height-32 size-sm line-height-leading-5 padding-x-10 padding-y-6 gap-4',
        'md': 'height-36 size-sm line-height-leading-5 padding-x-12 padding-y-8 gap-6',
        'lg': 'height-40 size-sm line-height-leading-5 padding-x-14 padding-y-10 gap-6',
      },
      shape: {
        rounded: 'rounded-md',
        pill: 'rounded-full',
      },
    },
    defaultVariants: {
      size: 'md',
      shape: 'rounded',
    },
  }
);

const BUTTON_COLOR_STYLE = {
  primary: 'bg-state-primary text-white-default border-solid border-[1px] border-transparent hover:bg-state-primary-hover active:bg-state-primary-press focus-visible:shadow-component-focus',
  secondary: 'bg-state-secondary text-default border-default hover:bg-state-secondary-hover active:bg-state-secondary-press focus-visible:shadow-component-focus',
  destructive: 'bg-state-destructive text-white-default border-solid border-[1px] border-transparent hover:bg-state-destructive-hover active:bg-state-destructive-press focus-visible:shadow-component-destructive-focus',
  ghost: 'bg-state-ghost text-subtle border-solid border-[1px] border-transparent hover:bg-state-ghost-hover active:bg-state-ghost-press focus-visible:shadow-component-misc-focus',
  ghostMuted: 'bg-state-ghost text-muted border-solid border-[1px] border-transparent hover:bg-state-ghost-hover active:bg-state-ghost-press focus-visible:shadow-component-misc-focus',
  soft: 'bg-state-soft text-subtle border-solid border-[1px] border-transparent hover:bg-state-soft-hover active:bg-state-soft-press focus-visible:shadow-component-misc-focus',
  dashed: 'bg-state-secondary text-default border-dashed [border-width:1px] [border-color:var(--border-default)] hover:bg-state-secondary-hover active:bg-state-secondary-press focus-visible:shadow-component-misc-focus',
} as const;

const iconOnlySizeVariants = cva('', {
  variants: {
    size: {
      '2xs': 'width-24 height-24',
      'xs': 'width-28 height-28',
      'sm': 'width-32 height-32',
      'md': 'width-36 height-36',
      'lg': 'width-40 height-40',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const ICON_SIZE = {
  default: { '2xs': 16, 'xs': 16, 'sm': 16, 'md': 16, 'lg': 18 },
  iconOnly: { '2xs': 16, 'xs': 16, 'sm': 20, 'md': 20, 'lg': 20 },
} as const;

const SHORTCUT_SIZE = {
  '2xs': 'min-width-16 height-16 size-xs padding-x-4 rounded-xs',
  'xs': 'min-width-16 height-16 size-xs padding-x-4 rounded-xs',
  'sm': 'min-width-20 height-20 size-xs padding-x-4 rounded-xs',
  'md': 'min-width-20 height-20 size-xs padding-x-4 rounded-xs',
  'lg': 'min-width-20 height-20 size-xs padding-x-4 rounded-xs',
} as const;

const SHORTCUT_STYLE = {
  light: 'bg-muted border-default text-subtle',
  inverted: 'bg-white/10 border-solid border-[1px] border-white/20 text-white-default',
} as const;

const DISABLED_STYLE = 'bg-state-disabled text-hint border-solid border-[1px] border-transparent cursor-not-allowed';

const LOADING_STYLE = {
  primary: 'bg-state-primary-loading text-white-default border-solid border-[1px] border-transparent cursor-wait',
  secondary: 'bg-state-secondary-loading text-default border-default cursor-wait',
  destructive: 'bg-state-destructive-loading text-white-default border-solid border-[1px] border-transparent cursor-wait',
  ghost: 'bg-state-ghost-loading text-subtle border-solid border-[1px] border-transparent cursor-wait',
  ghostMuted: 'bg-state-ghost-loading text-subtle border-solid border-[1px] border-transparent cursor-wait',
  soft: 'bg-state-soft-loading text-subtle border-solid border-[1px] border-transparent cursor-wait',
  dashed: 'bg-state-secondary-loading text-default border-dashed [border-width:1px] [border-color:var(--border-default)] cursor-wait',
} as const;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  buttonStyle = 'primary',
  variant = 'default',
  size = 'md',
  shape = 'rounded',
  type = 'button',
  leadIcon,
  tailIcon,
  shortcut,
  loading = false,
  disabled = false,
  fullWidth = false,
  width,
  asChild = false,
  className,
  children,
  style,
  ...props
}, ref) => {
  const Comp = asChild ? Slot : 'button';
  const isIconOnly = variant === 'iconOnly';
  const isInvertedStyle = buttonStyle === 'primary' || buttonStyle === 'destructive';

  if (import.meta.env.DEV && isIconOnly && !props['aria-label']) {
    console.error('Button: variant="iconOnly" requires an aria-label prop for accessibility.');
  }

  const iconSizeConfig = isIconOnly ? ICON_SIZE.iconOnly : ICON_SIZE.default;
  const iconSize = iconSizeConfig[size] ?? 16;
  const shortcutClasses = SHORTCUT_SIZE[size] ?? SHORTCUT_SIZE.md;
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

  const containerClassName = cn(
    buttonVariants({ size, shape }),
    !disabled && !loading && BUTTON_COLOR_STYLE[buttonStyle],
    disabled && DISABLED_STYLE,
    loading && LOADING_STYLE[buttonStyle],
    isIconOnly && iconOnlySizeVariants({ size }),
    isIconOnly && 'aspect-square padding-0',
    fullWidth && !isIconOnly && 'w-full',
    className
  );

  const getIconColor = () => {
    if (disabled) return 'var(--icon-default-disabled)';
    if (isInvertedStyle) return 'var(--icon-white-default)';
    return 'var(--icon-default-muted)';
  };

  const renderLoadingSpinner = () => (
    <svg
      className="animate-spin shrink-0"
      width={iconSize}
      height={iconSize}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="32" strokeDashoffset="32" opacity="0.3" />
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="32" strokeDashoffset="24" />
    </svg>
  );

  const renderIcon = (icon: ButtonIconType | React.ReactNode) => {
    if (!icon) return null;
    if (typeof icon === 'object' && !Array.isArray(icon) && Object.keys(icon as object).length === 0) return null;

    if (Array.isArray(icon) && (icon.length === 2 || icon.length === 3) && typeof icon[0] === 'string' && typeof icon[1] === 'string') {
      const fillValue = icon[2] as boolean | string | undefined;
      const isFill = icon.length === 3 && (fillValue === true || fillValue === 'true');
      return <Icon iconType={[icon[0], icon[1]] as IconType} isFill={isFill} size={iconSize} color={getIconColor()} />;
    }

    if (!isValidElement(icon)) return null;
    return <span className="inline-flex items-center">{icon}</span>;
  };

  const renderShortcut = () => {
    if (!shortcut) return null;
    return (
      <span className={cn('inline-flex items-center justify-center leading-none', shortcutClasses, isInvertedStyle ? SHORTCUT_STYLE.inverted : SHORTCUT_STYLE.light)}>
        {shortcut}
      </span>
    );
  };

  const mergedStyle: React.CSSProperties = {
    ...(style || {}),
    ...(widthStyle || {}),
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) {
      e.preventDefault();
      return;
    }
    props.onClick?.(e);
  };

  return (
    <Comp
      ref={ref}
      type={asChild ? undefined : type}
      disabled={asChild ? undefined : (disabled || loading)}
      aria-disabled={disabled || loading || undefined}
      aria-busy={loading || undefined}
      className={containerClassName}
      style={Object.keys(mergedStyle).length > 0 ? mergedStyle : undefined}
      {...props}
      onClick={handleClick}
    >
      {isIconOnly ? (
        loading ? renderLoadingSpinner() : renderIcon(leadIcon)
      ) : loading ? (
        leadIcon ? (
          <>
            {renderLoadingSpinner()}
            {children}
            {shortcut && renderShortcut()}
            {tailIcon && renderIcon(tailIcon)}
          </>
        ) : tailIcon ? (
          <>
            {children}
            {shortcut && renderShortcut()}
            {renderLoadingSpinner()}
          </>
        ) : (
          <span className="relative inline-flex items-center">
            <span className="invisible">{children}</span>
            <span className="absolute inset-0 flex items-center justify-center">
              {renderLoadingSpinner()}
            </span>
          </span>
        )
      ) : (
        <>
          {leadIcon && renderIcon(leadIcon)}
          {children}
          {shortcut && renderShortcut()}
          {tailIcon && renderIcon(tailIcon)}
        </>
      )}
    </Comp>
  );
});

Button.displayName = 'Button';

export { buttonVariants };
export type { ButtonProps, ButtonStyle, ButtonVariant, ButtonSize, ButtonShape, ButtonIconType };
