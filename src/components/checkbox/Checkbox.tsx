import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

import { cn } from '@/lib/utils';
import type { CheckboxProps } from './Checkbox.types';

const CheckIcon = ({ color = 'currentColor' }: { color?: string }) => (
  <svg
    width="8"
    height="8"
    viewBox="0 0 8 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 4L3 6L7 2"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IndeterminateIcon = ({ color = 'currentColor' }: { color?: string }) => (
  <div
    className="width-10 height-2"
    style={{ backgroundColor: color }}
  />
);

/**
 * Checkbox 컴포넌트
 *
 * 라벨, 설명, 비확정(indeterminate) 상태를 지원하는 체크박스입니다.
 *
 * @example
 * <Checkbox label="이용약관 동의" checked={checked} onCheckedChange={setChecked} />
 */
const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, label, description, checkboxPosition = 'left', checkboxStyle = 'default', disabled, checked, onCheckedChange, ...props }, ref) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !disabled) {
      e.preventDefault();
      onCheckedChange?.(checked === true ? false : true);
    }
  };

  const isChecked = checked === true || checked === 'indeterminate';
  const isIndeterminate = checked === 'indeterminate';

  const shadowEffects = checkboxStyle === 'with-shadow' && !isChecked && !disabled
    ? 'shadow-[inset_0_-1px_0_rgba(0,0,0,0.05),0_1px_2px_rgba(0,0,0,0.04)]'
    : '';

  const checkedInnerShadow = checkboxStyle === 'with-shadow' && isChecked && !disabled;

  const iconColor = disabled ? 'var(--icon-default-disabled)' : 'var(--icon-white-default, #FFF)';

  const checkboxElement = (
    <CheckboxPrimitive.Root
      ref={ref}
      checked={checked}
      disabled={disabled}
      onCheckedChange={onCheckedChange}
      onKeyDown={handleKeyDown}
      className={cn(
        'peer relative shrink-0 group',
        'width-16 height-16',
        'rounded-default',
        'overflow-hidden',
        'transition-colors',
        'focus-visible:outline-none focus-visible:shadow-component-focus',
        disabled
          ? 'bg-checkbox-disabled border-default cursor-not-allowed'
          : isChecked
            ? 'border-none bg-checkbox-active cursor-pointer hover:bg-checkbox-active-hover'
            : 'border-darker bg-checkbox-default cursor-pointer hover:border-strong',
        shadowEffects,
        className
      )}
      {...props}
    >
      {checkedInnerShadow && (
        <div
          className="absolute rounded-xs pointer-events-none"
          style={{ inset: '1px', boxShadow: '0px 1px 0px rgba(255, 255, 255, 0.25) inset' }}
        />
      )}
      <CheckboxPrimitive.Indicator className="absolute flex items-center justify-center" style={{ inset: '1px' }}>
        {isIndeterminate ? (
          <IndeterminateIcon color={iconColor} />
        ) : (
          <CheckIcon color={iconColor} />
        )}
      </CheckboxPrimitive.Indicator>
      {!disabled && !isChecked && (
        <div
          className="absolute flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          style={{ inset: '1px' }}
        >
          <CheckIcon color="var(--icon-default-disabled)" />
        </div>
      )}
    </CheckboxPrimitive.Root>
  );

  if (!label && !description) {
    return checkboxElement;
  }

  return (
    <label
      className={cn(
        'inline-flex items-start ds-gap-10',
        checkboxPosition === 'right' && 'flex-row-reverse',
        disabled ? 'cursor-not-allowed' : 'cursor-pointer'
      )}
    >
      <div className="height-20 flex items-center shrink-0">
        {checkboxElement}
      </div>
      <div className="flex flex-col ds-gap-4">
        {label && (
          <span
            className={cn(
              'font-body size-sm line-height-leading-5 letter-spacing-tracking-normal font-medium select-none',
              disabled ? 'text-hint' : 'text-default'
            )}
          >
            {label}
          </span>
        )}
        {description && (
          <span
            className={cn(
              'font-body size-sm line-height-leading-5 letter-spacing-tracking-normal select-none',
              disabled ? 'text-hint' : 'text-subtle'
            )}
          >
            {description}
          </span>
        )}
      </div>
    </label>
  );
});

Checkbox.displayName = 'Checkbox';

export { Checkbox };
