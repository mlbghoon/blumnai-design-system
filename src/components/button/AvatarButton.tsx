/* eslint-disable react-refresh/only-export-components */
import { forwardRef, isValidElement } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';

import { Avatar } from '../avatar/Avatar';
import { Icon } from '../icons/Icon';
import type { IconType } from '../icons/Icon/Icon.types';
import { cn } from '../../lib/utils';

import type { AvatarButtonProps, AvatarButtonIconType, AvatarButtonSize, AvatarButtonStyle } from './AvatarButton.types';

const avatarButtonVariants = cva(
  'inline-flex items-center rounded-full transition-all duration-200 focus:outline-none font-body size-sm line-height-leading-5 font-medium letter-spacing-tracking-normal',
  {
    variants: {
      buttonStyle: {
        default: 'bg-state-secondary text-default border-darker hover:bg-state-secondary-hover active:bg-state-secondary-press focus-visible:shadow-component-focus',
        dashed: 'bg-state-secondary text-default border border-dashed border-darker hover:bg-state-secondary-hover active:bg-state-secondary-press focus-visible:shadow-component-focus',
        soft: 'bg-state-soft text-default border-none hover:bg-state-soft-hover active:bg-state-soft-press focus-visible:shadow-component-misc-focus',
      },
      size: {
        sm: 'height-28 padding-y-4 padding-l-4 padding-r-8 gap-4',
        lg: 'height-32 padding-y-6 padding-l-6 padding-r-12 gap-6',
      },
    },
    defaultVariants: {
      buttonStyle: 'default',
      size: 'lg',
    },
  }
);

const DISABLED_STYLE = {
  default: 'bg-state-disabled text-hint border-default cursor-not-allowed',
  dashed: 'bg-state-disabled text-hint border border-dashed border-default cursor-not-allowed',
  soft: 'bg-muted text-hint border-none cursor-not-allowed',
} as const;

export const AvatarButton = forwardRef<HTMLButtonElement, AvatarButtonProps>(({
  buttonStyle = 'default',
  size = 'lg',
  avatar,
  alt,
  label,
  tailIcon,
  disabled = false,
  asChild = false,
  width,
  className,
  style,
  ...props
}, ref) => {
  const Comp = asChild ? Slot : 'button';
  const avatarSize = 'xs' as const;
  const iconSize = 20;

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

  const mergedStyle: CSSProperties = {
    ...(style || {}),
    ...(widthStyle || {}),
  };

  const containerClassName = cn(
    avatarButtonVariants({ ...(disabled ? {} : { buttonStyle }), size }),
    disabled && DISABLED_STYLE[buttonStyle],
    className
  );

  const getIconColor = () => {
    if (disabled) return 'var(--icon-default-disabled)';
    return 'var(--icon-default-muted)';
  };

  const renderIcon = (icon: AvatarButtonIconType | ReactNode) => {
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

  const asChildDisabled = asChild && disabled;

  const handleDisabledClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <Comp
      ref={ref}
      type={asChild ? undefined : 'button'}
      disabled={asChild ? undefined : disabled}
      className={containerClassName}
      style={Object.keys(mergedStyle).length > 0 ? mergedStyle : undefined}
      {...props}
      {...(asChildDisabled ? {
        'aria-disabled': true,
        tabIndex: -1,
        onClick: handleDisabledClick,
      } : {})}
    >
      <Avatar
        variant="userpic"
        size={avatarSize}
        shape="circular"
        src={avatar}
        alt={alt}
        ring={false}
      />
      <span>{label}</span>
      {tailIcon && renderIcon(tailIcon)}
    </Comp>
  );
});

AvatarButton.displayName = 'AvatarButton';

export { avatarButtonVariants };
export type { AvatarButtonProps, AvatarButtonSize, AvatarButtonStyle, AvatarButtonIconType };
