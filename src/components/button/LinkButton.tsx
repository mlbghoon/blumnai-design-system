/* eslint-disable react-refresh/only-export-components */
import { forwardRef, useMemo } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';

import { cn } from '../../lib/utils';
import { getPixelValue } from '../../lib/css-utils';
import { renderButtonIcon } from './buttonUtils';

import type { LinkButtonProps, LinkButtonIconType, LinkButtonSize, LinkButtonType } from './LinkButton.types';

const linkButtonVariants = cva(
  'group inline-flex items-center font-medium cursor-pointer bg-transparent no-underline hover:no-underline transition-colors duration-200 focus:outline-none',
  {
    variants: {
      linkType: {
        default: 'text-default hover:text-subtle',
        muted: 'text-muted hover:text-subtle',
        informative: 'text-informative hover:text-informative',
      },
      size: {
        sm: 'size-xs line-height-leading-4 ds-gap-4 letter-spacing-tracking-tight',
        md: 'size-sm line-height-leading-5 ds-gap-4 letter-spacing-tracking-tight',
        lg: 'size-md line-height-leading-6 ds-gap-4 letter-spacing-tracking-normal',
      },
    },
    defaultVariants: {
      linkType: 'default',
      size: 'md',
    },
  }
);

const TYPE_CONFIG = {
  default: { iconColor: 'var(--icon-default-muted)' },
  muted: { iconColor: 'var(--icon-default-muted)' },
  informative: { iconColor: 'var(--icon-informative)' },
} as const;

const DISABLED_STYLE = {
  text: 'text-hint cursor-not-allowed',
  iconColor: 'var(--icon-default-disabled)',
} as const;

/**
 * LinkButton 컴포넌트
 *
 * 텍스트 링크 스타일의 네비게이션 버튼입니다.
 *
 * @example
 * ```tsx
 * <LinkButton href="/page" label="페이지 이동" />
 * ```
 */
export const LinkButton = forwardRef<HTMLElement, LinkButtonProps>(({
  linkType = 'default',
  size = 'md',
  label,
  href,
  openInNewTab = false,
  leadIcon,
  tailIcon = ['system', 'external-link'],
  disabled = false,
  asChild = false,
  width,
  className,
  style,
  ...props
}, ref) => {
  const iconSize = 16;

  const widthStyle = width !== undefined && width !== ''
    ? { width: getPixelValue(width) }
    : undefined;

  const mergedStyle: React.CSSProperties = {
    ...(style || {}),
    ...(widthStyle || {}),
  };

  const typeConfig = TYPE_CONFIG[linkType] ?? TYPE_CONFIG.default;

  const containerClassName = cn(
    linkButtonVariants({ ...(disabled ? {} : { linkType }), size }),
    disabled && DISABLED_STYLE.text,
    className
  );

  const getIconColor = useMemo(() => {
    if (disabled) return DISABLED_STYLE.iconColor;
    return typeConfig.iconColor;
  }, [disabled, typeConfig]);

  const renderIcon = (icon: LinkButtonIconType | React.ReactNode) =>
    renderButtonIcon(icon, iconSize, getIconColor);

  const content = (
    <>
      {leadIcon && renderIcon(leadIcon)}
      <span className={cn('relative', !disabled && 'link-label-hover')}>{label}</span>
      {tailIcon && renderIcon(tailIcon)}
    </>
  );

  const styleProps = Object.keys(mergedStyle).length > 0 ? mergedStyle : undefined;

  if (asChild) {
    return (
      <Slot ref={ref as React.Ref<HTMLElement>} className={containerClassName} style={styleProps} {...props}>
        {content}
      </Slot>
    );
  }

  if (href && !disabled) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        target={openInNewTab ? '_blank' : undefined}
        className={containerClassName}
        style={styleProps}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        rel={openInNewTab ? 'noopener noreferrer' : undefined}
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
      style={styleProps}
      {...props}
    >
      {content}
    </button>
  );
});

LinkButton.displayName = 'LinkButton';

export { linkButtonVariants };
export type { LinkButtonProps, LinkButtonSize, LinkButtonType, LinkButtonIconType };
