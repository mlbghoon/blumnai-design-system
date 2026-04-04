import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

import { cn } from '@/lib/utils';
import type { CheckboxProps } from './Checkbox.types';

const CHECKBOX_SIZE_CONFIG = {
  sm: { box: 'width-16 height-16', checkSize: 8, indeterminateBar: 'width-10 height-2', labelLineHeight: 'height-20', labelText: 'size-sm line-height-leading-5', descText: 'size-sm line-height-leading-5' },
  md: { box: 'width-20 height-20', checkSize: 10, indeterminateBar: 'width-14 height-2', labelLineHeight: 'height-24', labelText: 'size-md line-height-leading-6', descText: 'size-sm line-height-leading-5' },
  lg: { box: 'width-24 height-24', checkSize: 12, indeterminateBar: 'width-16 height-2', labelLineHeight: 'height-28', labelText: 'size-lg line-height-leading-7', descText: 'size-md line-height-leading-6' },
} as const;

const CheckIcon = ({ color = 'currentColor', size = 8 }: { color?: string; size?: number }) => (
  <svg
    width={size}
    height={size}
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

const IndeterminateIcon = ({ color = 'currentColor', className }: { color?: string; className?: string }) => (
  <div
    className={className}
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
>(({ className, label, description, checkboxPosition = 'left', checkboxStyle = 'default', size = 'sm', shape = 'square', disabled, checked, onCheckedChange, ...props }, ref) => {
  const isChecked = checked === true || checked === 'indeterminate';
  const isIndeterminate = checked === 'indeterminate';
  const sizeConfig = CHECKBOX_SIZE_CONFIG[size];

  const shadowEffects = checkboxStyle === 'with-shadow' && !isChecked && !disabled
    ? 'shadow-component-default'
    : '';

  const checkedInnerShadow = checkboxStyle === 'with-shadow' && isChecked && !disabled;

  const iconColor = disabled ? 'var(--icon-default-disabled)' : 'var(--icon-white-default, #FFF)';

  const checkboxElement = (
    <CheckboxPrimitive.Root
      ref={ref}
      checked={checked}
      disabled={disabled}
      onCheckedChange={onCheckedChange}
      className={cn(
        'peer relative shrink-0 group',
        sizeConfig.box,
        shape === 'round' ? 'rounded-full' : 'rounded-default',
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
          <IndeterminateIcon color={iconColor} className={sizeConfig.indeterminateBar} />
        ) : (
          <CheckIcon color={iconColor} size={sizeConfig.checkSize} />
        )}
      </CheckboxPrimitive.Indicator>
      {!disabled && !isChecked && (
        <div
          className="absolute flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          style={{ inset: '1px' }}
        >
          <CheckIcon color="var(--icon-default-disabled)" size={sizeConfig.checkSize} />
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
        'inline-flex ds-gap-10',
        description ? 'items-start' : 'items-center',
        checkboxPosition === 'right' && 'flex-row-reverse',
        disabled ? 'cursor-not-allowed' : 'cursor-pointer'
      )}
    >
      <div className={cn(sizeConfig.labelLineHeight, 'flex items-center shrink-0')}>
        {checkboxElement}
      </div>
      <div className="flex flex-col ds-gap-4">
        {label && (
          <span
            className={cn(
              'font-body letter-spacing-tracking-normal font-medium select-none',
              sizeConfig.labelText,
              disabled ? 'text-hint' : 'text-default'
            )}
          >
            {label}
          </span>
        )}
        {description && (
          <span
            className={cn(
              'font-body letter-spacing-tracking-normal select-none',
              sizeConfig.descText,
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
