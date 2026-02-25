import { forwardRef } from 'react';
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
      icon,
      visible = true,
      title,
      closable = false,
      onClose,
      children,
      className,
      ...props
    },
    ref
  ) => {
    if (!visible) return null;

    const role = variant === 'warning' || variant === 'error' ? 'alert' : 'status';
    const resolvedIcon: IconType = icon ?? (INFOBOX_DEFAULT_ICON[variant] as IconType);

    return (
      <div
        ref={ref}
        role={role}
        className={cn(
          'flex items-center ds-gap-12 rounded-card-sm border-default padding-x-12 padding-y-10',
          INFOBOX_VARIANT_BG[variant],
          className
        )}
        {...props}
      >
        <div
          className={cn(
            'width-4 rounded-full flex-shrink-0 self-stretch min-height-20',
            INFOBOX_INDICATOR[variant]
          )}
        />

        <div className={cn('flex-shrink-0', INFOBOX_ICON_COLOR[variant])}>
          <Icon
            iconType={resolvedIcon}
            size={16}
            color={VARIANT_ICON_CSS_COLOR[variant]}
          />
        </div>

        <div className="flex flex-col ds-gap-2 flex-1 min-w-0">
          {title && (
            <div className="font-body size-sm line-height-leading-5 font-semibold text-subtle">
              {title}
            </div>
          )}
          <div className="font-body size-sm line-height-leading-5 text-subtle">
            {children}
          </div>
        </div>

        {closable && (
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
    );
  }
);

InfoBox.displayName = 'InfoBox';
