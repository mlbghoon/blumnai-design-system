import { forwardRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Icon } from '../icons/Icon';
import type { InfoBoxProps, InfoBoxVariant } from './InfoBox.types';
import type { IconType } from '../icons/Icon/Icon.types';
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
    const resolvedIcon: IconType = icon ?? (INFOBOX_DEFAULT_ICON[variant] as IconType);
    const isSubtle = styleType === 'subtle';
    const showContent = !collapsible || isOpen;

    return (
      <div
        ref={ref}
        role={role}
        className={cn(
          'flex ds-gap-12 rounded-card-sm padding-x-12 padding-y-10',
          isSubtle ? 'bg-basic-gray-alpha-10' : cn('border-default', INFOBOX_VARIANT_BG[variant]),
          collapsible ? 'flex-col' : 'items-center',
          className
        )}
        {...props}
      >
        <div className={cn('flex items-center ds-gap-12', collapsible && 'cursor-pointer select-none')}
          onClick={collapsible ? () => setIsOpen(prev => !prev) : undefined}
        >
          {!isSubtle && (
            <div
              className={cn(
                'width-4 rounded-full flex-shrink-0 self-stretch min-height-20',
                INFOBOX_INDICATOR[variant]
              )}
            />
          )}

          <div className={cn('flex-shrink-0', INFOBOX_ICON_COLOR[variant])}>
            <Icon
              iconType={resolvedIcon}
              size={isSubtle ? 14 : 16}
              color={isSubtle ? 'var(--icon-default-muted)' : VARIANT_ICON_CSS_COLOR[variant]}
            />
          </div>

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

          {collapsible && (
            <div className="flex-shrink-0 text-muted">
              <Icon
                iconType={['arrows', isOpen ? 'arrow-up-s' : 'arrow-down-s']}
                size={16}
              />
            </div>
          )}

          {!collapsible && closable && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="flex-shrink-0 inline-flex items-center justify-center width-16 height-16 rounded-xs text-muted hover:text-default transition-colors cursor-pointer focus:outline-none focus-visible:shadow-component-misc-focus"
            >
              <Icon iconType={['system', 'close']} size={16} />
            </button>
          )}
        </div>

        {showContent && (
          <div className={cn(
            'flex flex-col ds-gap-2 min-w-0',
            !isSubtle && !collapsible && 'flex-1',
            collapsible && !isSubtle && 'padding-l-16',
            collapsible && isSubtle && 'padding-l-26',
          )}>
            {!collapsible && title && (
              <div className={cn(
                'font-body font-semibold',
                isSubtle
                  ? 'size-xs line-height-leading-4 text-muted'
                  : 'size-sm line-height-leading-5 text-subtle'
              )}>
                {title}
              </div>
            )}
            <div className={cn(
              'font-body',
              isSubtle
                ? 'size-xs line-height-leading-4 text-default'
                : 'size-sm line-height-leading-5 text-subtle'
            )}>
              {children}
            </div>
          </div>
        )}

        {collapsible && closable && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute top-10 right-12 flex-shrink-0 inline-flex items-center justify-center width-16 height-16 rounded-xs text-muted hover:text-default transition-colors cursor-pointer focus:outline-none focus-visible:shadow-component-misc-focus"
          >
            <Icon iconType={['system', 'close']} size={16} />
          </button>
        )}
      </div>
    );
  }
);

InfoBox.displayName = 'InfoBox';
