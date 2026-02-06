import { forwardRef } from 'react';

import { Icon } from '../icons/Icon';
import type { IconType } from '../icons/Icon/Icon.types';
import { cn } from '../../lib/utils';

import type { ButtonGroupProps, ButtonGroupSize, ButtonGroupItem } from './ButtonGroup.types';

const SIZE_STYLES = {
  '2xs': { containerRadius: 'rounded-md', buttonSize: 'xs' as const },
  xs: { containerRadius: 'rounded-lg', buttonSize: 'xs' as const },
  sm: { containerRadius: 'rounded-lg', buttonSize: 'sm' as const },
  md: { containerRadius: 'rounded-lg', buttonSize: 'md' as const },
  lg: { containerRadius: 'rounded-lg', buttonSize: 'lg' as const },
} as const;

const BUTTON_PADDING = {
  '2xs': { iconOnly: 'min-w-6 min-h-6', default: 'min-h-6 padding-x-6 padding-y-4' },
  xs: { iconOnly: 'min-w-7 min-h-7', default: 'min-h-7 padding-x-8 padding-y-4' },
  sm: { iconOnly: 'min-w-8 min-h-8', default: 'min-h-8 padding-x-10 padding-y-6' },
  md: { iconOnly: 'min-w-9 min-h-9', default: 'min-h-9 padding-x-12 padding-y-8' },
  lg: { iconOnly: 'min-w-10 min-h-10', default: 'min-h-10 padding-x-14 padding-y-10' },
} as const;

export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ items, size = 'md', className }, ref) => {
    const currentSize = SIZE_STYLES[size];
    const iconSize = 16;
    const buttonGap = size === 'lg' || size === 'md' ? 'gap-6' : 'gap-4';

    const containerClassName = cn(
      'inline-flex items-center justify-start',
      'bg-default',
      'shadow-[0px_1px_2px_rgba(0,0,0,0.05)]',
      'outline outline-1 outline-darker outline-offset-[-1px]',
      currentSize.containerRadius,
      'overflow-hidden',
      className
    );

    const renderBadge = (badge: string, disabled: boolean) => (
      <span
        className={cn(
          'inline-flex items-center justify-center',
          'min-width-20 padding-x-6 padding-y-2',
          'rounded-full',
          'bg-basic-gray-alpha-4',
          'size-xs line-height-leading-4 font-medium',
          disabled ? 'text-hint' : 'text-subtle'
        )}
      >
        {badge}
      </span>
    );

    const renderIcon = (icon: IconType | React.ReactNode, disabled: boolean) => {
      if (Array.isArray(icon) && icon.length === 2 && typeof icon[0] === 'string' && typeof icon[1] === 'string') {
        return (
          <span className="inline-flex items-center justify-center shrink-0">
            <Icon
              iconType={icon as IconType}
              size={iconSize}
              color={disabled ? 'rgba(39,39,42,0.25)' : '#6F6F77'}
            />
          </span>
        );
      }
      return (
        <span className="inline-flex items-center justify-center shrink-0">
          {icon}
        </span>
      );
    };

    return (
      <div ref={ref} className={containerClassName}>
        {items.map((item, index) => {
          const isFirst = index === 0;
          const hasSeparator = !isFirst;
          const iconOnly = !item.label && !item.badge;
          const labelTextSize = size === '2xs' ? 'size-xs line-height-leading-4' : 'size-sm line-height-leading-5';
          const padding = iconOnly ? BUTTON_PADDING[size].iconOnly : BUTTON_PADDING[size].default;

          const buttonContent: React.ReactNode[] = [];

          if (item.icon) {
            buttonContent.push(
              <span key="lead-icon">
                {renderIcon(item.icon, item.disabled || false)}
              </span>
            );
          }

          if (item.label) {
            buttonContent.push(
              <span
                key="label"
                className={cn(
                  'shrink-0 padding-x-2',
                  labelTextSize,
                  'font-medium',
                  item.disabled ? 'text-hint' : 'text-subtle'
                )}
              >
                {item.label}
              </span>
            );
          }

          if (item.badge) {
            buttonContent.push(
              <span key="badge">{renderBadge(item.badge, item.disabled || false)}</span>
            );
          }

          if (item.tailIcon) {
            buttonContent.push(
              <span key="tail-icon">
                {renderIcon(item.tailIcon, item.disabled || false)}
              </span>
            );
          }

          return (
            <div
              key={index}
              className={cn(
                'inline-flex items-center justify-center',
                'bg-transparent',
                padding,
                'transition-colors duration-150',
                hasSeparator && 'border-l-default',
                item.disabled ? 'cursor-not-allowed' : 'cursor-pointer',
                !item.disabled && 'hover:bg-basic-gray-alpha-4 active:bg-basic-gray-alpha-10'
              )}
              onClick={item.disabled ? undefined : item.onClick}
              role="button"
              tabIndex={item.disabled ? -1 : 0}
            >
              {buttonContent.length === 1 && iconOnly ? (
                buttonContent[0]
              ) : (
                <div className={cn('flex items-center justify-center', buttonGap)}>
                  {buttonContent}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }
);

ButtonGroup.displayName = 'ButtonGroup';

export type { ButtonGroupProps, ButtonGroupSize, ButtonGroupItem };
