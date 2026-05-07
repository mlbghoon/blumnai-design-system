/* eslint-disable react-refresh/only-export-components */
import { forwardRef, useRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';

import { cn } from '../../lib/utils';
import { getPixelValue } from '../../lib/css-utils';
import { Spinner } from '../../lib/spinner';
import { useKeyboardShortcut } from '../../hooks/use-keyboard-shortcut';
import { useMergeRefs } from '../../hooks/use-merge-refs';
import { renderButtonIcon } from './buttonUtils';
import { TooltipTrigger } from '../tooltip/Tooltip/TooltipTrigger';

import type { ButtonProps, ButtonIconType, ButtonStyle, ButtonVariant, ButtonSize, ButtonShape, ButtonColor } from './Button.types';

const buttonVariants = cva(
  'inline-flex items-center justify-center shrink-0 whitespace-nowrap cursor-pointer transition-colors duration-200 focus:outline-none font-medium letter-spacing-tracking-normal',
  {
    variants: {
      size: {
        '2xs': 'height-24 size-xs line-height-leading-4 padding-x-6 padding-y-4 ds-gap-4',
        'xs': 'height-28 size-sm line-height-leading-5 padding-x-8 padding-y-4 ds-gap-4',
        'sm': 'height-32 size-sm line-height-leading-5 padding-x-10 padding-y-6 ds-gap-4',
        'md': 'height-36 size-sm line-height-leading-5 padding-x-12 padding-y-8 ds-gap-6',
        'lg': 'height-40 size-sm line-height-leading-5 padding-x-14 padding-y-10 ds-gap-6',
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

const BUTTON_COLOR_STYLE = {
  primary: 'bg-state-primary text-white-default border-solid border-[1px] border-transparent hover:bg-state-primary-hover active:bg-state-primary-press focus-visible:shadow-component-focus',
  secondary: 'bg-state-secondary text-default border-darker hover:bg-state-secondary-hover active:bg-state-secondary-press focus-visible:shadow-component-focus',
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
  secondary: 'bg-state-secondary-loading text-default border-darker cursor-wait',
  destructive: 'bg-state-destructive-loading text-white-default border-solid border-[1px] border-transparent cursor-wait',
  ghost: 'bg-state-ghost-loading text-subtle border-solid border-[1px] border-transparent cursor-wait',
  ghostMuted: 'bg-state-ghost-loading text-subtle border-solid border-[1px] border-transparent cursor-wait',
  soft: 'bg-state-soft-loading text-subtle border-solid border-[1px] border-transparent cursor-wait',
  dashed: 'bg-state-secondary-loading text-default border-dashed [border-width:1px] [border-color:var(--border-default)] cursor-wait',
} as const;

const getColorOverrideVars = (color: ButtonColor): Record<string, string> => {
  if (color === 'white') {
    return {
      '--btn-bg': 'var(--bg-basic-white-accent)',
      '--btn-bg-hover': 'var(--bg-basic-white-strong)',
      '--btn-bg-subtle': 'var(--bg-basic-white-subtle)',
      '--btn-bg-alpha': 'var(--bg-basic-white-alpha-15)',
      '--btn-text': 'var(--text-dark-default)',
      '--btn-text-muted': 'var(--text-dark-subtle)',
      '--btn-border': 'var(--border-default)',
    };
  }
  return {
    '--btn-bg': `var(--bg-basic-${color}-accent)`,
    '--btn-bg-hover': `var(--bg-basic-${color}-strong)`,
    '--btn-bg-subtle': `var(--bg-basic-${color}-subtle)`,
    '--btn-bg-alpha': `var(--bg-basic-${color}-alpha-15)`,
    '--btn-text': `var(--bg-basic-${color}-strong)`,
    '--btn-text-muted': `var(--bg-basic-${color}-accent)`,
  };
};

const WHITE_INVERTED_STYLE = {
  default: '[background-color:var(--btn-bg)] [color:var(--btn-text)] border-solid border-[1px] [border-color:var(--btn-border)] hover:[background-color:var(--btn-bg-hover)] active:[background-color:var(--btn-bg-subtle)] focus-visible:shadow-component-focus',
  disabled: '[background-color:var(--btn-bg-subtle)] text-hint border-solid border-[1px] [border-color:var(--btn-border)] cursor-not-allowed',
  loading: '[background-color:var(--btn-bg-subtle)] [color:var(--btn-text)] border-solid border-[1px] [border-color:var(--btn-border)] cursor-wait',
} as const;

const COLOR_OVERRIDE_STYLE: Record<ButtonStyle, string> = {
  primary: '[background-color:var(--btn-bg)] text-white-default border-solid border-[1px] border-transparent hover:[background-color:var(--btn-bg-hover)] active:[background-color:var(--btn-bg-hover)] focus-visible:shadow-component-focus',
  destructive: '[background-color:var(--btn-bg)] text-white-default border-solid border-[1px] border-transparent hover:[background-color:var(--btn-bg-hover)] active:[background-color:var(--btn-bg-hover)] focus-visible:shadow-component-focus',
  secondary: 'bg-state-secondary [color:var(--btn-text)] border-solid border-[1px] [border-color:var(--btn-text)] hover:bg-state-secondary-hover active:bg-state-secondary-press focus-visible:shadow-component-focus',
  ghost: 'bg-transparent [color:var(--btn-text)] border-solid border-[1px] border-transparent hover:[background-color:var(--btn-bg-alpha)] active:[background-color:var(--btn-bg-alpha)] focus-visible:shadow-component-misc-focus',
  ghostMuted: 'bg-transparent [color:var(--btn-text-muted)] border-solid border-[1px] border-transparent hover:[background-color:var(--btn-bg-alpha)] active:[background-color:var(--btn-bg-alpha)] focus-visible:shadow-component-misc-focus',
  soft: '[background-color:var(--btn-bg-subtle)] [color:var(--btn-text)] border-solid border-[1px] border-transparent hover:[background-color:var(--btn-bg-alpha)] active:[background-color:var(--btn-bg-alpha)] focus-visible:shadow-component-misc-focus',
  dashed: 'bg-state-secondary [color:var(--btn-text)] border-dashed [border-width:1px] [border-color:var(--btn-text)] hover:bg-state-secondary-hover active:bg-state-secondary-press focus-visible:shadow-component-misc-focus',
};

const COLOR_OVERRIDE_LOADING_STYLE: Record<ButtonStyle, string> = {
  primary: '[background-color:var(--btn-bg-subtle)] text-white-default border-solid border-[1px] border-transparent cursor-wait',
  destructive: '[background-color:var(--btn-bg-subtle)] text-white-default border-solid border-[1px] border-transparent cursor-wait',
  secondary: 'bg-state-secondary-loading [color:var(--btn-text)] border-solid border-[1px] [border-color:var(--btn-text)] cursor-wait',
  ghost: '[background-color:var(--btn-bg-alpha)] [color:var(--btn-text)] border-solid border-[1px] border-transparent cursor-wait',
  ghostMuted: '[background-color:var(--btn-bg-alpha)] [color:var(--btn-text-muted)] border-solid border-[1px] border-transparent cursor-wait',
  soft: '[background-color:var(--btn-bg-subtle)] [color:var(--btn-text)] border-solid border-[1px] border-transparent cursor-wait',
  dashed: 'bg-state-secondary-loading [color:var(--btn-text)] border-dashed [border-width:1px] [border-color:var(--btn-text)] cursor-wait',
};

/**
 * Button 컴포넌트
 *
 * 다양한 스타일, 크기, 아이콘을 지원하는 범용 버튼입니다.
 *
 * @example
 * ```tsx
 * <Button buttonStyle="primary" size="md">저장</Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  buttonStyle = 'primary',
  variant = 'default',
  size = 'md',
  shape = 'rounded',
  type = 'button',
  leadIcon,
  tailIcon,
  shortcut,
  color,
  colorOverride,
  loading = false,
  disabled = false,
  fullWidth = false,
  width,
  asChild = false,
  tooltip,
  tooltipPlacement,
  className,
  children,
  style,
  ...props
}, ref) => {
  // `color` is the canonical form (matches Badge/Switch/Avatar).
  // `colorOverride` is deprecated but still honored for backwards compat.
  // If both are passed, `color` wins.
  const effectiveColor = color ?? colorOverride;
  const internalRef = useRef<HTMLButtonElement>(null);
  const mergedRef = useMergeRefs(internalRef, ref);

  useKeyboardShortcut(
    shortcut,
    () => { internalRef.current?.click(); },
    { enabled: !disabled && !loading },
  );

  const Comp = asChild ? Slot : 'button';
  const isIconOnly = variant === 'iconOnly';
  const isInvertedStyle = buttonStyle === 'primary' || buttonStyle === 'destructive';

  if (import.meta.env.DEV && isIconOnly && !props['aria-label']) {
    console.error('Button: variant="iconOnly" requires an aria-label prop for accessibility.');
  }

  const iconSizeConfig = isIconOnly ? ICON_SIZE.iconOnly : ICON_SIZE.default;
  const iconSize = iconSizeConfig[size] ?? 16;
  const shortcutClasses = SHORTCUT_SIZE[size] ?? SHORTCUT_SIZE.md;
  const widthStyle = width !== undefined && width !== ''
    ? { width: getPixelValue(width) }
    : undefined;

  const isTextOnlyLoading = loading && !isIconOnly && !leadIcon && !tailIcon;
  const hasColorOverride = !!effectiveColor;
  const isWhite = effectiveColor === 'white';

  const whiteInverted = isWhite && isInvertedStyle;
  const whiteInvertedState = whiteInverted
    ? (disabled ? 'disabled' : loading ? 'loading' : 'default')
    : null;

  const containerClassName = cn(
    buttonVariants({ size, shape }),
    whiteInverted
      ? WHITE_INVERTED_STYLE[whiteInvertedState!]
      : [
          !disabled && !loading && (hasColorOverride ? COLOR_OVERRIDE_STYLE[buttonStyle] : BUTTON_COLOR_STYLE[buttonStyle]),
          disabled && DISABLED_STYLE,
          loading && (hasColorOverride && !disabled ? COLOR_OVERRIDE_LOADING_STYLE[buttonStyle] : LOADING_STYLE[buttonStyle]),
        ],
    !disabled && buttonStyle !== 'ghost' && buttonStyle !== 'ghostMuted' && buttonStyle !== 'dashed' && buttonStyle !== 'soft' && 'shadow-components-button',
    isIconOnly && iconOnlySizeVariants({ size }),
    isIconOnly && 'aspect-square',
    isTextOnlyLoading && 'relative',
    fullWidth && !isIconOnly && 'w-full',
    className
  );

  const getIconColor = () => {
    if (disabled) return 'var(--icon-default-disabled)';
    if (whiteInverted) return 'var(--icon-black-default)';
    if (isInvertedStyle) return 'var(--icon-white-default)';
    if (effectiveColor) return `var(--bg-basic-${effectiveColor}-${buttonStyle === 'ghostMuted' ? 'accent' : 'strong'})`;
    return 'var(--icon-default-muted)';
  };

  const renderLoadingSpinner = () => <Spinner size={iconSize} />;

  const renderIcon = (icon: ButtonIconType | React.ReactNode) =>
    renderButtonIcon(icon, iconSize, getIconColor());

  const renderShortcut = () => {
    if (!shortcut) return null;
    const shortcutColorStyle = isInvertedStyle
      ? SHORTCUT_STYLE.inverted
      : effectiveColor
        ? cn(SHORTCUT_STYLE.light, '[color:var(--btn-text)]')
        : SHORTCUT_STYLE.light;
    return (
      <span className={cn('inline-flex items-center justify-center line-height-leading-none', shortcutClasses, shortcutColorStyle)}>
        {shortcut}
      </span>
    );
  };

  const colorVars = effectiveColor && !disabled
    ? getColorOverrideVars(effectiveColor) : {};

  const mergedStyle = {
    ...(style || {}),
    ...(widthStyle || {}),
    ...colorVars,
    ...(isIconOnly ? { padding: 0 } : {}),
  } as React.CSSProperties;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) {
      e.preventDefault();
      return;
    }
    props.onClick?.(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if ((disabled || loading) && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      return;
    }
    props.onKeyDown?.(e);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if ((disabled || loading) && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      return;
    }
    props.onKeyUp?.(e);
  };

  const buttonElement = (
    <Comp
      ref={mergedRef}
      type={asChild ? undefined : type}
      disabled={asChild ? undefined : (disabled || loading)}
      aria-disabled={disabled || loading || undefined}
      aria-busy={loading || undefined}
      className={containerClassName}
      style={Object.keys(mergedStyle).length > 0 ? mergedStyle : undefined}
      {...props}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
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
          <>
            <span className="invisible">{children}</span>
            <span className="absolute inset-0 flex items-center justify-center">
              {renderLoadingSpinner()}
            </span>
          </>
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

  if (tooltip) {
    return (
      <TooltipTrigger asChild content={tooltip} placement={tooltipPlacement ?? 'top'}>
        {buttonElement}
      </TooltipTrigger>
    );
  }

  return buttonElement;
});

Button.displayName = 'Button';

export { buttonVariants };
export type { ButtonProps, ButtonStyle, ButtonVariant, ButtonSize, ButtonShape, ButtonIconType, ButtonColor };
