import { forwardRef, useCallback, useMemo, useRef, useState, type KeyboardEvent } from 'react';

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
  '2xs': { iconOnly: 'min-width-24 min-height-24', default: 'min-height-24 padding-x-6 padding-y-4' },
  xs: { iconOnly: 'min-width-28 min-height-28', default: 'min-height-28 padding-x-8 padding-y-4' },
  sm: { iconOnly: 'min-width-32 min-height-32', default: 'min-height-32 padding-x-10 padding-y-6' },
  md: { iconOnly: 'min-width-36 min-height-36', default: 'min-height-36 padding-x-12 padding-y-8' },
  lg: { iconOnly: 'min-width-40 min-height-40', default: 'min-height-40 padding-x-14 padding-y-10' },
} as const;

/**
 * ButtonGroup 컴포넌트
 *
 * 관련 버튼들을 그룹으로 묶어 표시하는 컴포넌트입니다.
 * WAI-ARIA toolbar 패턴으로 ArrowLeft/Right, Home/End 키보드 탐색을 지원합니다.
 *
 * @example
 * ```tsx
 * <ButtonGroup items={[{ label: "A" }, { label: "B" }]} size="md" />
 * ```
 */
export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ items, size = 'md', className, 'aria-label': ariaLabelProp, ...restProps }, ref) => {
    const currentSize = SIZE_STYLES[size];
    const iconSize = 16;
    const buttonGap = size === 'lg' || size === 'md' ? 'ds-gap-6' : 'ds-gap-4';
    const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

    const enabledIndices = useMemo(() => items
      .map((item, i) => ({ i, disabled: item.disabled || !item.onClick }))
      .filter((e) => !e.disabled)
      .map((e) => e.i), [items]);

    const [focusedIndex, setFocusedIndex] = useState(() => enabledIndices[0] ?? 0);
    if (enabledIndices.length > 0 && !enabledIndices.includes(focusedIndex)) {
      setFocusedIndex(enabledIndices[0]);
    }

    const handleKeyDown = useCallback((e: KeyboardEvent<HTMLButtonElement>, index: number) => {
      const pos = enabledIndices.indexOf(index);
      if (pos === -1) return;

      let targetIndex: number | undefined;

      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault();
          targetIndex = enabledIndices[(pos + 1) % enabledIndices.length];
          break;
        case 'ArrowLeft':
          e.preventDefault();
          targetIndex = enabledIndices[(pos - 1 + enabledIndices.length) % enabledIndices.length];
          break;
        case 'Home':
          e.preventDefault();
          targetIndex = enabledIndices[0];
          break;
        case 'End':
          e.preventDefault();
          targetIndex = enabledIndices[enabledIndices.length - 1];
          break;
      }

      if (targetIndex !== undefined) {
        setFocusedIndex(targetIndex);
        buttonRefs.current[targetIndex]?.focus();
      }
    }, [enabledIndices]);

    const containerClassName = cn(
      'inline-flex items-center justify-start',
      'bg-default',
      'shadow-components-button',
      'outline outline-1 outline-darker outline-offset-[-1px]',
      currentSize.containerRadius,
      'overflow-hidden',
      className
    );

    const renderBadge = (badge: string, disabled: boolean, key: string) => (
      <span
        key={key}
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

    const renderIcon = (icon: IconType | React.ReactNode, disabled: boolean, key: string) => {
      if (Array.isArray(icon) && icon.length === 2 && typeof icon[0] === 'string' && typeof icon[1] === 'string') {
        return (
          <span key={key} className="inline-flex items-center justify-center shrink-0">
            <Icon
              iconType={icon as IconType}
              size={iconSize}
              color={disabled ? 'var(--icon-default-disabled)' : 'var(--icon-default-muted)'}
            />
          </span>
        );
      }
      return (
        <span key={key} className="inline-flex items-center justify-center shrink-0">
          {icon}
        </span>
      );
    };

    return (
      <div ref={ref} {...restProps} role="toolbar" aria-orientation="horizontal" aria-label={ariaLabelProp ?? 'Button group'} className={containerClassName}>
        {items.map((item, index) => {
          const isFirst = index === 0;
          const hasSeparator = !isFirst;
          const iconOnly = !item.label && !item.badge;

          if (import.meta.env.DEV && iconOnly && !item.ariaLabel) {
            console.error('ButtonGroup: icon-only items require an ariaLabel prop for accessibility.');
          }

          const labelTextSize = size === '2xs' ? 'size-xs line-height-leading-4' : 'size-sm line-height-leading-5';
          const padding = iconOnly ? BUTTON_PADDING[size].iconOnly : BUTTON_PADDING[size].default;

          const buttonContent: React.ReactNode[] = [];

          if (item.icon) {
            buttonContent.push(renderIcon(item.icon, item.disabled || false, 'lead-icon'));
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
            buttonContent.push(renderBadge(item.badge, item.disabled || false, 'badge'));
          }

          if (item.tailIcon) {
            buttonContent.push(renderIcon(item.tailIcon, item.disabled || false, 'tail-icon'));
          }

          const isDisabled = item.disabled || !item.onClick;

          return (
            <button
              key={item.id ?? index}
              ref={(el: HTMLButtonElement | null) => { buttonRefs.current[index] = el; }}
              type="button"
              className={cn(
                'inline-flex items-center justify-center',
                'bg-transparent',
                padding,
                'transition-colors duration-150',
                hasSeparator && 'border-l-default',
                isDisabled ? 'cursor-not-allowed' : 'cursor-pointer',
                !isDisabled && 'hover:bg-basic-gray-alpha-4 active:bg-basic-gray-alpha-10'
              )}
              onClick={isDisabled ? undefined : item.onClick}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onFocus={() => setFocusedIndex(index)}
              tabIndex={index === focusedIndex ? 0 : -1}
              aria-label={iconOnly ? item.ariaLabel : undefined}
              disabled={isDisabled}
            >
              {buttonContent.length === 1 && iconOnly ? (
                buttonContent[0]
              ) : (
                <div className={cn('flex items-center justify-center', buttonGap)}>
                  {buttonContent}
                </div>
              )}
            </button>
          );
        })}
      </div>
    );
  }
);

ButtonGroup.displayName = 'ButtonGroup';

export type { ButtonGroupProps, ButtonGroupSize, ButtonGroupItem };
