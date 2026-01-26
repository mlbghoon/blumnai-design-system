import { forwardRef } from 'react';

import { Icon } from '../../icons/Icon';
import type { IconType } from '../../icons/Icon/Icon.types';
import { cn } from '../../../utils/cn';

import type { ButtonGroupProps, ButtonGroupSize } from './ButtonGroup.types';

/**
 * ButtonGroup 컴포넌트
 *
 * 여러 버튼을 그룹화하여 표시하는 컴포넌트입니다.
 * Figma 디자인을 기반으로 구현되었습니다.
 */
export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ items, size = 'md', darkMode = false, className }, ref) => {
    // Size styles
    const sizeStyles = {
      '2xs': {
        containerRadius: 'rounded-md',
        buttonSize: 'xs' as const,
      },
      xs: {
        containerRadius: 'rounded-lg',
        buttonSize: 'xs' as const,
      },
      sm: {
        containerRadius: 'rounded-lg',
        buttonSize: 'sm' as const,
      },
      md: {
        containerRadius: 'rounded-lg',
        buttonSize: 'md' as const,
      },
      lg: {
        containerRadius: 'rounded-lg',
        buttonSize: 'lg' as const,
      },
    };

    const currentSize = sizeStyles[size];

    // Container styles
    const containerClassName = cn(
      'inline-flex items-center justify-start',
      darkMode ? 'bg-[#222225]' : 'bg-white',
      'shadow-[0px_1px_2px_rgba(0,0,0,0.05)]',
      darkMode
        ? 'outline outline-1 outline-[rgba(255,255,255,0.15)] outline-offset-[-1px]'
        : 'outline outline-1 outline-[rgba(39,39,42,0.15)] outline-offset-[-1px]',
      currentSize.containerRadius,
      'overflow-hidden',
      className
    );

    // Render badge
    const renderBadge = (badge: string, disabled: boolean) => {
      return (
        <span
          className={cn(
            'inline-flex items-center justify-center',
            'min-w-5 px-1.5 py-0.5',
            'rounded-full',
            darkMode ? 'bg-[rgba(255,255,255,0.06)]' : 'bg-[rgba(39,39,42,0.06)]',
            'text-xs leading-4 font-medium',
            disabled ? 'text-hint' : 'text-subtle'
          )}
        >
          {badge}
        </span>
      );
    };

    // Get icon size based on button size
    const getIconSize = (buttonSize: ButtonGroupSize): number => {
      switch (buttonSize) {
        case '2xs':
        case 'xs':
          return 16;
        case 'sm':
          return 16;
        case 'md':
          return 16;
        case 'lg':
          return 16;
        default:
          return 16;
      }
    };

    const iconSize = getIconSize(size);

    return (
      <div ref={ref} className={containerClassName}>
        {items.map((item, index) => {
          const isFirst = index === 0;
          const hasSeparator = !isFirst;

          // Build button content
          const buttonContent: React.ReactNode[] = [];

          // Lead icon
          if (item.icon) {
            // Check if icon is an IconType tuple [category, name]
            if (Array.isArray(item.icon) && item.icon.length === 2 && typeof item.icon[0] === 'string' && typeof item.icon[1] === 'string') {
              buttonContent.push(
                <span key="lead-icon" className="inline-flex items-center justify-center shrink-0">
                  <Icon
                    iconType={item.icon as IconType}
                    size={iconSize}
                    color={
                      item.disabled
                        ? darkMode
                          ? 'rgba(255,255,255,0.25)'
                          : 'rgba(39,39,42,0.25)'
                        : darkMode
                          ? 'rgba(255,255,255,0.7)'
                          : '#6F6F77'
                    }
                  />
                </span>
              );
            } else {
              buttonContent.push(
                <span key="lead-icon" className="inline-flex items-center justify-center shrink-0">
                  {item.icon}
                </span>
              );
            }
          }

          // Label
          if (item.label) {
            const labelTextSize = size === '2xs' ? 'text-xs leading-4' : 'text-sm leading-5';
            buttonContent.push(
              <span
                key="label"
                className={cn(
                  'shrink-0 px-0.5',
                  labelTextSize,
                  'font-medium',
                  item.disabled ? 'text-hint' : 'text-subtle'
                )}
              >
                {item.label}
              </span>
            );
          }

          // Badge
          if (item.badge) {
            buttonContent.push(<span key="badge">{renderBadge(item.badge, item.disabled || false)}</span>);
          }

          // Tail icon
          if (item.tailIcon) {
            // Check if tailIcon is an IconType tuple [category, name]
            if (Array.isArray(item.tailIcon) && item.tailIcon.length === 2 && typeof item.tailIcon[0] === 'string' && typeof item.tailIcon[1] === 'string') {
              buttonContent.push(
                <span key="tail-icon" className="inline-flex items-center justify-center shrink-0">
                  <Icon
                    iconType={item.tailIcon as IconType}
                    size={iconSize}
                    color={
                      item.disabled
                        ? darkMode
                          ? 'rgba(255,255,255,0.25)'
                          : 'rgba(39,39,42,0.25)'
                        : darkMode
                          ? 'rgba(255,255,255,0.7)'
                          : '#6F6F77'
                    }
                  />
                </span>
              );
            } else {
              buttonContent.push(
                <span key="tail-icon" className="inline-flex items-center justify-center shrink-0">
                  {item.tailIcon}
                </span>
              );
            }
          }

          // Determine if icon-only (no label, no badge)
          const iconOnly = !item.label && !item.badge;

          // Button padding based on size (from Figma)
          // lg: padding 14px 14px 10px 10px, minHeight 40px
          // md: padding 12px 12px 8px 8px, minHeight 36px
          // sm: padding 10px 10px 6px 6px, minHeight 32px
          // xs: padding 8px 8px 4px 4px, minHeight 28px
          // 2xs: padding 6px 6px 4px 4px, minHeight 24px
          const buttonPadding = {
            '2xs': iconOnly ? 'min-w-6 min-h-6' : 'min-h-6 px-1.5 py-1',
            xs: iconOnly ? 'min-w-7 min-h-7' : 'min-h-7 px-2 py-1',
            sm: iconOnly ? 'min-w-8 min-h-8' : 'min-h-8 px-2.5 py-1.5',
            md: iconOnly ? 'min-w-9 min-h-9' : 'min-h-9 px-3 py-2',
            lg: iconOnly ? 'min-w-10 min-h-10' : 'min-h-10 px-3.5 py-2.5',
          };

          // Gap between icon/label/badge/tailIcon within button
          const buttonGap = size === 'lg' || size === 'md' ? 'gap-1.5' : 'gap-1';

          const separatorStyle = hasSeparator
            ? darkMode
              ? 'border-l border-l-[rgba(255,255,255,0.1)]'
              : 'border-l border-l-[rgba(39,39,42,0.1)]'
            : '';

          return (
            <div
              key={index}
              className={cn(
                'inline-flex items-center justify-center',
                'bg-transparent',
                buttonPadding[size],
                'transition-colors duration-150',
                separatorStyle,
                item.disabled ? 'cursor-not-allowed' : 'cursor-pointer',
                !item.disabled && darkMode
                  ? 'hover:bg-[rgba(255,255,255,0.06)] active:bg-[rgba(255,255,255,0.08)]'
                  : !item.disabled && 'hover:bg-[rgba(39,39,42,0.06)] active:bg-[rgba(39,39,42,0.08)]'
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