import { forwardRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Icon, renderIconProp, RiCloseLine, RiArrowUpSLine, RiArrowDownSLine } from '../icons/Icon';
import type { InfoBoxProps, InfoBoxVariant } from './InfoBox.types';
import type { IconProp } from '../icons/Icon';
import {
  INFOBOX_VARIANT_BG,
  INFOBOX_INDICATOR,
  INFOBOX_ICON_COLOR,
  INFOBOX_DEFAULT_ICON,
} from './InfoBox.constants';

const VARIANT_ICON_CSS_COLOR: Record<InfoBoxVariant, string> = {
  default: 'var(--bg-basic-gray-accent)',
  info: 'var(--bg-basic-blue-accent)',
  success: 'var(--bg-basic-green-accent)',
  warning: 'var(--bg-basic-orange-accent)',
  error: 'var(--bg-basic-red-accent)',
};

export const InfoBox = forwardRef<HTMLDivElement, InfoBoxProps>(
  (
    {
      variant = 'default',
      styleType = 'default',
      icon,
      visible = true,
      title,
      closable = false,
      onClose,
      collapsible = false,
      defaultOpen = true,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    if (!visible) return null;

    const role = variant === 'warning' || variant === 'error' ? 'alert' : 'status';
    const resolvedIcon: IconProp = icon ?? INFOBOX_DEFAULT_ICON[variant];
    const isSubtle = styleType === 'subtle';
    const showContent = !collapsible || isOpen;

    return (
      <div
        ref={ref}
        role={role}
        className={cn(
          'flex ds-gap-12 rounded-card-sm padding-x-12 padding-y-10',
          isSubtle ? 'bg-basic-gray-alpha-10' : cn('border-default', INFOBOX_VARIANT_BG[variant]),
          className
        )}
        {...props}
      >
        {!isSubtle && (
          <div
            className={cn(
              'width-4 rounded-full flex-shrink-0 self-stretch min-height-20',
              INFOBOX_INDICATOR[variant]
            )}
          />
        )}
        <div className={cn('flex-shrink-0 flex items-center', INFOBOX_ICON_COLOR[variant])} style={{ height: '20px' }}>
          {renderIconProp(resolvedIcon, {
            size: isSubtle ? 14 : 16,
            color: isSubtle ? 'var(--icon-default-muted)' : VARIANT_ICON_CSS_COLOR[variant],
          })}
        </div>
        <div className="flex flex-col ds-gap-2 flex-1 min-w-0">
          {collapsible ? (
            <div
              className="flex items-center ds-gap-12 cursor-pointer select-none"
              onClick={() => setIsOpen(prev => !prev)}
            >
              {title && (
                <div className={cn(
                  'font-body font-semibold flex-1 min-w-0',
                  isSubtle
                    ? 'size-xs line-height-leading-4 text-muted'
                    : 'size-sm line-height-leading-5 text-subtle'
                )}>
                  {title}
                </div>
              )}
              <div className="flex-shrink-0 text-muted">
                <Icon
                  icon={isOpen ? RiArrowUpSLine : RiArrowDownSLine}
                  size={16}
                />
              </div>
            </div>
          ) : (
            title && (
              <div className={cn(
                'font-body font-semibold min-w-0',
                isSubtle
                  ? 'size-xs line-height-leading-4 text-muted'
                  : 'size-sm line-height-leading-5 text-subtle'
              )}>
                {title}
              </div>
            )
          )}

          {showContent && (
            <div className={cn(
              'font-body whitespace-pre-line',
              isSubtle
                ? 'size-xs line-height-leading-4 text-default'
                : 'size-sm line-height-leading-5 text-subtle'
            )}>
              {children}
            </div>
          )}
        </div>
        {closable && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex-shrink-0 inline-flex items-center justify-center width-16 height-16 rounded-xs text-muted hover:text-default transition-colors cursor-pointer focus:outline-none focus-visible:shadow-component-misc-focus"
          >
            <Icon icon={RiCloseLine} size={16} />
          </button>
        )}
      </div>
    );
  }
);

InfoBox.displayName = 'InfoBox';
