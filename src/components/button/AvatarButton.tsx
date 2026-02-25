/* eslint-disable react-refresh/only-export-components */
import { forwardRef } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';

import { Avatar } from '../avatar/Avatar';
import { cn } from '../../lib/utils';
import { getPixelValue } from '../../lib/css-utils';
import { renderButtonIcon } from './buttonUtils';

import type { AvatarButtonProps, AvatarButtonIconType, AvatarButtonSize, AvatarButtonStyle } from './AvatarButton.types';

const avatarButtonVariants = cva(
  'inline-flex items-center rounded-full transition-all duration-200 focus:outline-none font-body size-sm line-height-leading-5 font-medium letter-spacing-tracking-normal',
  {
    variants: {
      buttonStyle: {
        default: 'bg-state-secondary text-default border-darker hover:bg-state-secondary-hover active:bg-state-secondary-press focus-visible:shadow-component-focus',
        dashed: 'bg-state-secondary text-default border-dashed [border-width:1px] [border-color:var(--border-darker)] hover:bg-state-secondary-hover active:bg-state-secondary-press focus-visible:shadow-component-focus',
        soft: 'bg-state-soft text-default border-none hover:bg-state-soft-hover active:bg-state-soft-press focus-visible:shadow-component-misc-focus',
      },
      size: {
        sm: 'height-28 padding-y-4 padding-l-4 padding-r-8 ds-gap-4',
        lg: 'height-32 padding-y-6 padding-l-6 padding-r-12 ds-gap-6',
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
  dashed: 'bg-state-disabled text-hint border-dashed [border-width:1px] [border-color:var(--border-default)] cursor-not-allowed',
  soft: 'bg-muted text-hint border-none cursor-not-allowed',
} as const;

/**
 * AvatarButton 컴포넌트
 *
 * 아바타가 포함된 사용자 프로필 버튼입니다. 드롭다운 표시를 지원합니다.
 *
 * @example
 * <AvatarButton avatar="/avatar.jpg" alt="홍길동" showDropdown />
 */
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

  const widthStyle = width !== undefined && width !== ''
    ? { width: getPixelValue(width) }
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

  const renderIcon = (icon: AvatarButtonIconType | ReactNode) =>
    renderButtonIcon(icon, iconSize, getIconColor());

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
        alt={alt ?? label}
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
