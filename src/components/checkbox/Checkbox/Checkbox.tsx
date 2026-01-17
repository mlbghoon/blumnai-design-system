import { forwardRef, useEffect, useRef, useCallback } from 'react';

import { IconLoader } from '../../../icons/IconLoader';
import { cn } from '../../../utils/cn';

import type { CheckboxProps } from './Checkbox.types';

/**
 * Checkbox 컴포넌트
 *
 * 체크박스 입력 컴포넌트입니다.
 * Unchecked, Checked, Indeterminate 상태와 다양한 크기를 지원합니다.
 * Figma 디자인을 기반으로 구현되었습니다.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, size = 'md', indeterminate = false, style = 'default', darkMode = false, disabled = false, className, checked, ...props }, ref) => {
    const internalRef = useRef<HTMLInputElement>(null);

    // Merge refs: support both RefObject and callback refs
    const inputRef = useCallback(
      (node: HTMLInputElement | null) => {
        internalRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
        }
      },
      [ref]
    );

    // Set indeterminate state on the native input element
    useEffect(() => {
      const input = internalRef.current;
      if (input) {
        input.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    // Size styles - checkbox box is always 16x16px, size only affects label and gap
    const sizeStyles = {
      '2xs': {
        boxSize: 'w-4 h-4', // 16px (always)
        iconSize: 16,
        labelSize: 'text-xs leading-4',
        gap: 'gap-1.5', // 6px
      },
      xs: {
        boxSize: 'w-4 h-4', // 16px (always)
        iconSize: 16,
        labelSize: 'text-xs leading-4',
        gap: 'gap-1.5', // 6px
      },
      sm: {
        boxSize: 'w-4 h-4', // 16px (always)
        iconSize: 16,
        labelSize: 'text-sm leading-5',
        gap: 'gap-2', // 8px
      },
      md: {
        boxSize: 'w-4 h-4', // 16px (always)
        iconSize: 16,
        labelSize: 'text-sm leading-5',
        gap: 'gap-2', // 8px
      },
      lg: {
        boxSize: 'w-4 h-4', // 16px (always)
        iconSize: 16,
        labelSize: 'text-base leading-6',
        gap: 'gap-2', // 8px
      },
    };

    const currentSize = sizeStyles[size];
    const isChecked = checked ?? false;

    // Render checkmark or indeterminate indicator
    // From Figma: inner container is 14x14px (offset 1,1 from 16x16 box)
    // Checkmark is 8x8px (positioned at 3,3 inside the 14x14 container = absolute 4,4 from box)
    // Indeterminate line is 10x2px (positioned at 2,6 inside the 14x14 container = absolute 3,7 from box)
    const renderIndicator = () => {
      if (!isChecked && !indeterminate) return null;

      const iconColor = disabled
        ? 'rgba(39,39,42,0.25)' // Disabled color
        : '#FFFFFF'; // White for checked/indeterminate

      // Inner container: 14x14px, offset 1px from edges (for inner shadow if with-shadow)
      const innerContainer = (
        <div
          className={cn(
            'absolute',
            'w-[14px] h-[14px]',
            'left-[1px] top-[1px]',
            hasCheckedInnerShadow && 'rounded-[4px]' // 4px for inner shadow container
          )}
          style={hasCheckedInnerShadow ? { boxShadow: '0px 1px 0px rgba(255,255,255,0.25) inset' } : undefined}
        >
          {indeterminate ? (
            // Indeterminate: 10x2px horizontal line at position 2,6 inside 14x14 container
            <div
              className="absolute left-[2px] top-[6px] w-[10px] h-[2px]"
              style={{ backgroundColor: iconColor }}
            />
          ) : (
            // Checkmark: 8x8px checkmark icon at position 3,3 inside 14x14 container
            <div className="absolute left-[3px] top-[3px] w-2 h-2">
              <IconLoader type="check" size={8} color={iconColor} />
            </div>
          )}
        </div>
      );

      return innerContainer;
    };

    // Container styles
    const containerClassName = cn(
      'inline-flex items-center',
      currentSize.gap,
      disabled && 'cursor-not-allowed',
      !disabled && 'cursor-pointer',
      className
    );

    // Helper functions for state classes
    const getHoverBgClass = () => {
      if (disabled) return '';
      if (isChecked || indeterminate) {
        return darkMode ? 'hover:bg-[#65a0fd]' : 'hover:bg-[#65A0FD]';
      }
      return '';
    };

    const getFocusRingClass = () => {
      if (disabled) return '';
      return 'focus-within:shadow-[0_0_0_3px_rgba(101,160,253,0.40)]';
    };

    // Shadow effects for "with-shadow" style (only for unchecked with shadow)
    const shadowEffects = style === 'with-shadow' && !isChecked && !indeterminate && !disabled
      ? 'shadow-[inset_0_-1px_0_rgba(0,0,0,0.05)]'
      : '';

    // Inner shadow for checked with shadow (on inner container) - boolean flag
    const hasCheckedInnerShadow = style === 'with-shadow' && (isChecked || indeterminate) && !disabled;

    // Checkbox box styles - corner radius is 5px from Figma
    const checkboxClassName = cn(
      'relative inline-flex items-center justify-center',
      'shrink-0',
      currentSize.boxSize,
      'rounded-[5px]', // 5px corner radius from Figma
      'transition-all duration-150',
      'overflow-hidden', // Important for inner shadow container
      disabled
        ? darkMode
          ? 'bg-[rgba(39,39,42,0.06)] border border-[rgba(39,39,42,0.10)]'
          : 'bg-[rgba(39,39,42,0.06)] border border-[rgba(39,39,42,0.10)]'
        : isChecked || indeterminate
          ? 'border-none bg-[#437DFC]'
          : darkMode
            ? 'border border-[rgba(255,255,255,0.15)] bg-transparent hover:border-[rgba(255,255,255,0.25)]'
            : 'border border-[rgba(39,39,42,0.15)] bg-white hover:border-[rgba(39,39,42,0.30)]',
      getHoverBgClass(),
      shadowEffects,
      getFocusRingClass(),
      'focus-within:outline-none'
    );

    // Label styles
    const labelClassName = cn(
      currentSize.labelSize,
      disabled
        ? darkMode
          ? 'text-[rgba(255,255,255,0.3)]'
          : 'text-[rgba(39,39,42,0.30)]'
        : darkMode
          ? 'text-[rgba(255,255,255,0.8)]'
          : 'text-[#4E4E55]',
      'select-none'
    );

    return (
      <label className={containerClassName}>
        <div className={checkboxClassName}>
          <input
            ref={inputRef}
            type="checkbox"
            checked={isChecked}
            disabled={disabled}
            className="sr-only"
            aria-hidden="true"
            {...props}
          />
          {renderIndicator()}
        </div>
        {label && <span className={labelClassName}>{label}</span>}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';