/* eslint-disable react-refresh/only-export-components */
import { forwardRef, useMemo, isValidElement } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';

import { Icon } from '../icons/Icon';
import type { IconType } from '../icons/Icon/Icon.types';
import { cn } from '../../lib/utils';

import type { LinkButtonProps, LinkButtonIconType, LinkButtonSize, LinkButtonType } from './LinkButton.types';

const linkButtonVariants = cva(
  'group inline-flex items-center font-medium bg-transparent no-underline hover:no-underline transition-all duration-200 focus:outline-none',
  {
    variants: {
      linkType: {
        default: 'text-default hover:text-subtle',
        muted: 'text-muted hover:text-subtle',
        informative: 'text-informative hover:text-informative',
      },
      size: {
        sm: 'size-xs line-height-leading-4 gap-4 letter-spacing-tracking-tight',
        md: 'size-sm line-height-leading-5 gap-4 letter-spacing-tracking-tight',
        lg: 'size-md line-height-leading-6 gap-4 letter-spacing-tracking-normal',
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

  const renderIcon = (icon: LinkButtonIconType | React.ReactNode) => {
    if (!icon) return null;
    if (typeof icon === 'object' && !Array.isArray(icon) && Object.keys(icon as object).length === 0) return null;

    if (Array.isArray(icon) && (icon.length === 2 || icon.length === 3) && typeof icon[0] === 'string' && typeof icon[1] === 'string') {
      const fillValue = icon[2] as boolean | string | undefined;
      const isFill = icon.length === 3 && (fillValue === true || fillValue === 'true');
      return <Icon iconType={[icon[0], icon[1]] as IconType} isFill={isFill} size={iconSize} color={getIconColor} />;
    }

    if (!isValidElement(icon)) return null;
    return <span className="inline-flex items-center">{icon}</span>;
  };

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
        rel={openInNewTab ? 'noopener noreferrer' : undefined}
        className={containerClassName}
        style={styleProps}
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
