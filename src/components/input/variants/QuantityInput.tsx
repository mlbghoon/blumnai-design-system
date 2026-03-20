import { forwardRef, useCallback } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';

import { cn } from '../../../utils/cn';
import { Icon } from '../../icons/Icon/Icon';
import {
  STATE_CONFIG,
  INPUT_WRAPPER_BASE,
  INPUT_FIELD_BASE,
} from 'constants/input/Input/Input.constants';
import {
  QUANTITY_BUTTON_BASE,
  QUANTITY_BUTTON_SIZE,
  QUANTITY_BUTTON_STATES,
  QUANTITY_INPUT_STYLE,
  COMPACT_BUTTON_STYLE,
} from 'constants/input/variants';
import { InputWrapper } from '../shared/InputWrapper';
import { useInputState } from '../shared/useInputState';
import type { InputStyle, InputSize } from '../Input/Input.types';

/**
 * 수량 입력 변형 - default (양쪽 버튼) 또는 compact (오른쪽에 쌓인 버튼)
 */
export type QuantityVariant = 'default' | 'compact';

export interface QuantityInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'value' | 'onChange' | 'type'> {
  /**
   * 입력 필드 스타일 변형
   * @default 'default'
   */
  inputStyle?: InputStyle;
  /**
   * 입력 필드 크기
   * @default 'sm'
   */
  size?: InputSize;
  /**
   * 수량 변형 - default (양쪽 버튼) 또는 compact (쌓인 버튼)
   * @default 'default'
   */
  quantityVariant?: QuantityVariant;
  /**
   * 입력 필드 위에 표시되는 라벨 텍스트
   */
  label?: ReactNode;
  labelPosition?: 'top' | 'left';
  labelWidth?: string | number;
  /**
   * 필수 입력 여부 (별표 표시)
   * @default false
   */
  required?: boolean;
  /**
   * 라벨 옆에 표시되는 보조 텍스트
   */
  supportText?: string;
  /**
   * 입력 필드 아래에 표시되는 설명 텍스트
   */
  caption?: string;
  /**
   * 에러 상태 - true면 에러 스타일 적용, 문자열이면 캡션으로 에러 메시지 표시
   */
  error?: boolean | string;
  /**
   * 성공 상태 - true면 성공 스타일 적용, 문자열이면 캡션으로 성공 메시지 표시
   */
  success?: boolean | string;
  /**
   * 입력 필드 컨테이너의 커스텀 너비 (숫자는 px, 문자열은 그대로 사용)
   * 미지정 시 전체 너비 사용
   */
  width?: string | number;
  /**
   * 현재 숫자 값
   * @default 0
   */
  value?: number;
  /**
   * 값 변경 시 호출되는 콜백
   */
  onChange?: (value: number) => void;
  /**
   * 최소 허용 값
   * @default 0
   */
  min?: number;
  /**
   * 최대 허용 값
   */
  max?: number;
  /**
   * 증가/감소 단위 값
   * @default 1
   */
  step?: number;
}

/**
 * QuantityInput 변형
 *
 * 증가/감소 버튼이 있는 숫자 입력 필드
 * default (양쪽 버튼)와 compact (쌓인 버튼) 변형 지원
 */
export const QuantityInput = forwardRef<HTMLInputElement, QuantityInputProps>(({
  value = 0,
  onChange,
  min = 0,
  max,
  step = 1,
  quantityVariant = 'default',
  inputStyle = 'default',
  size = 'sm',
  label,
  labelPosition,
  labelWidth,
  required = false,
  supportText,
  caption,
  error,
  success,
  width,
  disabled = false,
  className,
  ...props
}, ref) => {
  const { inputId, hasError, state, sizeConfig, styleConfig, iconColor } = useInputState({
    inputStyle,
    size,
    disabled,
    error,
    success,
  });

  // Check if increment/decrement is allowed
  const canDecrement = value > min;
  const canIncrement = max === undefined || value < max;

  // Handle increment
  const handleIncrement = useCallback(() => {
    if (!disabled && canIncrement) {
      const newValue = value + step;
      const clampedValue = max !== undefined ? Math.min(newValue, max) : newValue;
      onChange?.(clampedValue);
    }
  }, [disabled, canIncrement, value, step, max, onChange]);

  // Handle decrement
  const handleDecrement = useCallback(() => {
    if (!disabled && canDecrement) {
      const newValue = value - step;
      const clampedValue = Math.max(newValue, min);
      onChange?.(clampedValue);
    }
  }, [disabled, canDecrement, value, step, min, onChange]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue === '') {
      onChange?.(min);
      return;
    }

    const numValue = parseFloat(inputValue);
    if (!isNaN(numValue)) {
      let clampedValue = Math.max(numValue, min);
      if (max !== undefined) {
        clampedValue = Math.min(clampedValue, max);
      }
      onChange?.(clampedValue);
    }
  }, [min, max, onChange]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      handleIncrement();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      handleDecrement();
    }
  }, [handleIncrement, handleDecrement]);

  // Render default variant (buttons on sides)
  if (quantityVariant === 'default') {
    const wrapperClassName = cn(
      INPUT_WRAPPER_BASE,
      sizeConfig.container,
      'padding-4',
      'ds-gap-4',
      styleConfig.base,
      !disabled && styleConfig.focus,
      state === 'disabled' && STATE_CONFIG.disabled.bg,
      state === 'error' && 'border-destructive',
      state === 'success' && 'border-success',
      disabled && 'cursor-not-allowed'
    );

    const inputClassName = cn(
      INPUT_FIELD_BASE,
      sizeConfig.text,
      'letter-spacing-tracking-tight',
      QUANTITY_INPUT_STYLE,
      STATE_CONFIG[state].text,
      disabled && 'cursor-not-allowed'
    );

    const buttonClassName = cn(
      QUANTITY_BUTTON_BASE,
      QUANTITY_BUTTON_SIZE[size],
      disabled ? QUANTITY_BUTTON_STATES.disabled : QUANTITY_BUTTON_STATES.default
    );

    return (
      <InputWrapper
        label={label}
      labelPosition={labelPosition}
      labelWidth={labelWidth}
        inputId={inputId}
        required={required}
        supportText={supportText}
        caption={caption}
        error={error}
        success={success}
        width={width}
        className={className}
      >
        {/* Input Wrapper */}
        <div className={wrapperClassName}>
          {/* Decrement Button */}
          <button
            type="button"
            onClick={handleDecrement}
            disabled={disabled || !canDecrement}
            className={cn(buttonClassName, !canDecrement && 'opacity-50')}
            aria-label="Decrease value"
          >
            <Icon
              iconType={['system', 'subtract']}
              size={sizeConfig.iconSize}
              color={disabled || !canDecrement ? 'default-disabled' : iconColor}
            />
          </button>

          {/* Input Field */}
          <input
            ref={ref}
            id={inputId}
            type="text"
            role="spinbutton"
            inputMode={step % 1 !== 0 ? 'decimal' : 'numeric'}
            pattern={step % 1 !== 0 ? '[0-9]*[.]?[0-9]*' : '[0-9]*'}
            disabled={disabled}
            className={inputClassName}
            value={value}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            aria-invalid={hasError}
            aria-describedby={caption || error || success ? `${inputId}-caption` : undefined}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={value}
            {...props}
          />

          {/* Increment Button */}
          <button
            type="button"
            onClick={handleIncrement}
            disabled={disabled || !canIncrement}
            className={cn(buttonClassName, !canIncrement && 'opacity-50')}
            aria-label="Increase value"
          >
            <Icon
              iconType={['system', 'add']}
              size={sizeConfig.iconSize}
              color={disabled || !canIncrement ? 'default-disabled' : iconColor}
            />
          </button>
        </div>
      </InputWrapper>
    );
  }

  // Render compact variant (buttons stacked on right)
  const compactConfig = COMPACT_BUTTON_STYLE[size];

  const wrapperClassName = cn(
    INPUT_WRAPPER_BASE,
    sizeConfig.container,
    'padding-0',
    styleConfig.base,
    !disabled && styleConfig.focus,
    state === 'disabled' && STATE_CONFIG.disabled.bg,
    state === 'error' && 'border-destructive',
    state === 'success' && 'border-success',
    disabled && 'cursor-not-allowed',
    'overflow-hidden'
  );

  const inputClassName = cn(
    INPUT_FIELD_BASE,
    sizeConfig.text,
    'letter-spacing-tracking-tight',
    QUANTITY_INPUT_STYLE,
    STATE_CONFIG[state].text,
    disabled && 'cursor-not-allowed',
    sizeConfig.padding
  );

  return (
    <InputWrapper
      label={label}
      labelPosition={labelPosition}
      labelWidth={labelWidth}
      inputId={inputId}
      required={required}
      supportText={supportText}
      caption={caption}
      error={error}
      success={success}
      width={width}
      className={className}
    >
      {/* Input Wrapper */}
      <div className={wrapperClassName}>
        {/* Input Field */}
        <input
          ref={ref}
          id={inputId}
          type="text"
          role="spinbutton"
          inputMode={step % 1 !== 0 ? 'decimal' : 'numeric'}
          pattern={step % 1 !== 0 ? '[0-9]*[.]?[0-9]*' : '[0-9]*'}
          disabled={disabled}
          className={cn(inputClassName, 'flex-1')}
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          aria-invalid={hasError}
          aria-describedby={caption || error || success ? `${inputId}-caption` : undefined}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          {...props}
        />

        {/* Compact Buttons Container */}
        <div className={compactConfig.container}>
          {/* Increment Button (top) */}
          <button
            type="button"
            onClick={handleIncrement}
            disabled={disabled || !canIncrement}
            className={cn(
              compactConfig.button,
              compactConfig.buttonTop,
              'flex-1',
              (disabled || !canIncrement) && 'opacity-50 cursor-not-allowed'
            )}
            aria-label="Increase value"
          >
            <Icon
              iconType={['arrows', 'arrow-up-s']}
              size={compactConfig.iconSize}
              color={disabled || !canIncrement ? 'default-disabled' : iconColor}
            />
          </button>

          {/* Decrement Button (bottom) */}
          <button
            type="button"
            onClick={handleDecrement}
            disabled={disabled || !canDecrement}
            className={cn(
              compactConfig.button,
              'flex-1',
              (disabled || !canDecrement) && 'opacity-50 cursor-not-allowed'
            )}
            aria-label="Decrease value"
          >
            <Icon
              iconType={['arrows', 'arrow-down-s']}
              size={compactConfig.iconSize}
              color={disabled || !canDecrement ? 'default-disabled' : iconColor}
            />
          </button>
        </div>
      </div>
    </InputWrapper>
  );
});

QuantityInput.displayName = 'QuantityInput';
