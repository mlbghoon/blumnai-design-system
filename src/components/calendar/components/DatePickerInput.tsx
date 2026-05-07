import { forwardRef } from 'react';

import { cn } from '@/lib/utils';
import { Icon, RiCalendarLine } from '../../icons/Icon/Icon';
import {
  SIZE_CONFIG,
  STYLE_CONFIG,
  STATE_CONFIG,
  INPUT_WRAPPER_BASE,
} from 'constants/input/Input/Input.constants';
import type { DatePickerInputProps } from '../DatePicker.types';

/**
 * DatePicker 트리거 입력 컴포넌트
 */
export const DatePickerInput = forwardRef<HTMLButtonElement, DatePickerInputProps>(({
  datePickerStyle = 'default',
  size = 'sm',
  displayValue,
  placeholder,
  disabled = false,
  hasError = false,
  hasSuccess = false,
  isOpen = false,
  onClick,
}, ref) => {
  const sizeConfig = SIZE_CONFIG[size];
  const styleConfig = STYLE_CONFIG[datePickerStyle];
  const state = disabled ? 'disabled' : hasError ? 'error' : hasSuccess ? 'success' : 'default';
  const stateConfig = STATE_CONFIG[state];

  const iconColor = disabled ? 'default-disabled' : hasError ? 'destructive' : hasSuccess ? 'success' : 'default-subtle';

  const wrapperClassName = cn(
    INPUT_WRAPPER_BASE,
    sizeConfig.container,
    sizeConfig.paddingWithTailIcon,
    sizeConfig.gap,
    styleConfig.base,
    !disabled && styleConfig.focus,
    state === 'disabled' && STATE_CONFIG.disabled.bg,
    state === 'error' && 'border-destructive',
    state === 'success' && 'border-success',
    isOpen && 'border-0 shadow-component-input-focus',
    disabled ? 'cursor-not-allowed' : 'cursor-pointer'
  );

  const textClassName = cn(
    'flex-1 min-w-0 text-left font-body',
    sizeConfig.text,
    'letter-spacing-tracking-tight',
    displayValue ? stateConfig.text : 'text-hint'
  );

  return (
    <button
      ref={ref}
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={wrapperClassName}
    >
      <span className={textClassName}>
        {displayValue || placeholder}
      </span>
      <Icon
        icon={RiCalendarLine}
        size={sizeConfig.iconSize}
        color={iconColor}
        className="flex-shrink-0"
      />
    </button>
  );
});

DatePickerInput.displayName = 'DatePickerInput';
