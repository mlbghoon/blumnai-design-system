import { forwardRef, useEffect, useRef, useCallback } from 'react';

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
  ({ label, indeterminate = false, style = 'default', disabled = false, className, checked, ...props }, ref) => {
    const internalRef = useRef<HTMLInputElement>(null);

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

    useEffect(() => {
      const input = internalRef.current;
      if (input) {
        input.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    const isChecked = checked ?? false;

    const renderIndicator = () => {
      if (!isChecked && !indeterminate) return null;

      const iconColor = disabled ? 'var(--icon-default-disabled)' : '#FFFFFF';

      return (
        <div className="absolute flex items-center justify-center" style={{ inset: '1px' }}>
          {indeterminate ? (
            <div
              className="width-10 height-2"
              style={{ backgroundColor: iconColor }}
            />
          ) : (
            <svg
              width="8"
              height="8"
              viewBox="0 0 8 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 4L3 6L7 2"
                stroke={iconColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      );
    };

    const renderShadowLayer = () => {
      if (!hasCheckedInnerShadow) return null;
      return (
        <div
          className="absolute rounded-xs"
          style={{ inset: '1px', boxShadow: '0px 1px 0px rgba(255, 255, 255, 0.25) inset' }}
        />
      );
    };

    const renderHoverIndicator = () => {
      if (disabled || isChecked || indeterminate) return null;
      const hoverColor = 'var(--icon-default-disabled)';
      return (
        <div className="absolute flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" style={{ inset: '1px' }}>
          <svg
            width="8"
            height="8"
            viewBox="0 0 8 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 4L3 6L7 2"
              stroke={hoverColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      );
    };

    const shadowEffects = style === 'with-shadow' && !isChecked && !indeterminate && !disabled
      ? 'shadow-[inset_0_-1px_0_rgba(0,0,0,0.05),0_1px_2px_rgba(0,0,0,0.04)]'
      : '';

    const hasCheckedInnerShadow = style === 'with-shadow' && (isChecked || indeterminate) && !disabled;

    const checkboxClassName = cn(
      'relative',
      'width-16 height-16',
      'rounded-default',
      'overflow-hidden',
      'group',
      'transition-colors',
      disabled
        ? 'bg-checkbox-disabled border-default cursor-not-allowed'
        : isChecked || indeterminate
          ? 'border-none bg-checkbox-active cursor-pointer hover:bg-checkbox-active-hover'
          : 'border-darker bg-checkbox-default cursor-pointer hover:border-strong',
      shadowEffects,
      !disabled && 'focus-within-ring'
    );

    const containerClassName = cn(
      'inline-flex items-center',
      'gap-10',
      disabled && 'cursor-not-allowed',
      !disabled && 'cursor-pointer',
      className
    );

    const labelClassName = cn(
      'font-body',
      'size-sm line-height-leading-5 letter-spacing-tracking-normal',
      'font-medium',
      disabled ? 'text-hint' : 'text-default',
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
          {renderShadowLayer()}
          {renderIndicator()}
          {renderHoverIndicator()}
        </div>
        {label && <span className={labelClassName}>{label}</span>}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';