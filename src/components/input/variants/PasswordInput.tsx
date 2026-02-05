import { forwardRef, useState, useCallback, useEffect, useRef } from 'react';
import type { InputHTMLAttributes } from 'react';

import { cn } from '../../../utils/cn';
import { Icon, parseIconTypeWithFill } from '../../icons/Icon';
import type { IconTypeWithFill } from '../../icons/Icon/Icon.types';
import {
  STATE_CONFIG,
  INPUT_WRAPPER_BASE,
  INPUT_FIELD_BASE,
} from 'constants/input/Input/Input.constants';
import {
  STRENGTH_INDICATOR_CONTAINER,
  STRENGTH_BAR_BASE,
  STRENGTH_BAR_COLORS,
  STRENGTH_BAR_INACTIVE,
  STRENGTH_LABEL_STYLE,
  STRENGTH_LABEL_COLORS,
  STRENGTH_LABELS,
  TOGGLE_BUTTON_STYLE,
} from 'constants/input/variants';
import { InputWrapper } from '../shared/InputWrapper';
import { useInputState } from '../shared/useInputState';
import type { InputStyle, InputSize } from '../Input/Input.types';

/**
 * 비밀번호 강도 레벨
 */
export type PasswordStrength = 'none' | 'low' | 'medium' | 'high';

export interface PasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
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
   * 입력 필드 위에 표시되는 라벨 텍스트
   */
  label?: string;
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
   * 입력 필드 앞에 표시되는 아이콘
   */
  leadIcon?: IconTypeWithFill;
  /**
   * 입력 필드 컨테이너의 커스텀 너비 (숫자는 px, 문자열은 그대로 사용)
   * 미지정 시 전체 너비 사용
   */
  width?: string | number;
  /**
   * 비밀번호 표시/숨김 토글 버튼 표시 여부
   * @default true
   */
  showToggle?: boolean;
  /**
   * 비밀번호 강도 표시기 표시 여부
   * @default false
   */
  showStrength?: boolean;
  /**
   * 제어되는 비밀번호 강도 값
   */
  strength?: PasswordStrength;
  /**
   * 비밀번호 강도 변경 시 호출되는 콜백 (autoCalculateStrength가 true일 때)
   */
  onStrengthChange?: (strength: PasswordStrength) => void;
  /**
   * 입력 값에 따라 비밀번호 강도를 자동으로 계산할지 여부
   * @default false
   */
  autoCalculateStrength?: boolean;
}

/**
 * 다양한 기준에 따라 비밀번호 강도 계산
 */
const calculatePasswordStrength = (password: string): PasswordStrength => {
  if (!password || password.length === 0) return 'none';

  let score = 0;

  // Length criteria
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;

  // Character type criteria
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^a-zA-Z0-9]/.test(password)) score += 1;

  // Determine strength level
  if (score <= 2) return 'low';
  if (score <= 4) return 'medium';
  return 'high';
};

/**
 * PasswordInput 변형
 *
 * 표시/숨김 토글과 선택적 강도 표시기가 있는 비밀번호 입력 필드
 */
export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(({
  showToggle = true,
  showStrength = false,
  strength: controlledStrength,
  onStrengthChange,
  autoCalculateStrength = false,
  inputStyle = 'default',
  size = 'sm',
  label,
  required = false,
  supportText,
  caption,
  error,
  success,
  leadIcon,
  width,
  disabled = false,
  className,
  value,
  onChange,
  ...props
}, ref) => {
  const [isVisible, setIsVisible] = useState(false);

  const { inputId, hasError, state, sizeConfig, styleConfig, iconColor } = useInputState({
    inputStyle,
    size,
    disabled,
    error,
    success,
  });

  // Calculate strength directly from value (no state needed)
  const calculatedStrength = autoCalculateStrength && typeof value === 'string'
    ? calculatePasswordStrength(value)
    : 'none';

  // Determine which strength value to use
  const strength = controlledStrength ?? calculatedStrength;

  // Track previous strength to notify parent only on changes
  const prevStrengthRef = useRef<PasswordStrength>(strength);
  useEffect(() => {
    if (autoCalculateStrength && onStrengthChange && prevStrengthRef.current !== calculatedStrength) {
      prevStrengthRef.current = calculatedStrength;
      onStrengthChange(calculatedStrength);
    }
  }, [calculatedStrength, autoCalculateStrength, onStrengthChange]);

  // Toggle visibility
  const toggleVisibility = useCallback(() => {
    setIsVisible((prev) => !prev);
  }, []);

  // Get number of active strength bars
  const getActiveBarCount = (): number => {
    switch (strength) {
      case 'low': return 1;
      case 'medium': return 2;
      case 'high': return 3;
      default: return 0;
    }
  };

  const activeBarCount = getActiveBarCount();

  // Wrapper className
  const wrapperClassName = cn(
    INPUT_WRAPPER_BASE,
    sizeConfig.container,
    sizeConfig.padding,
    sizeConfig.gap,
    styleConfig.base,
    !disabled && styleConfig.focus,
    state === 'disabled' && STATE_CONFIG.disabled.bg,
    state === 'error' && 'border-destructive',
    state === 'success' && 'border-success',
    disabled && 'cursor-not-allowed'
  );

  // Input field className
  const inputClassName = cn(
    INPUT_FIELD_BASE,
    sizeConfig.text,
    'letter-spacing-tracking-tight',
    STATE_CONFIG[state].text,
    STATE_CONFIG[state].placeholder,
    disabled && 'cursor-not-allowed'
  );

  return (
    <InputWrapper
      label={label}
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
        {/* Lead Icon */}
        {leadIcon && (() => {
          const { iconType, isFill } = parseIconTypeWithFill(leadIcon);
          return (
            <Icon
              iconType={iconType}
              isFill={isFill}
              size={sizeConfig.iconSize}
              color={iconColor}
              className="flex-shrink-0"
            />
          );
        })()}

        {/* Input Field */}
        <input
          ref={ref}
          id={inputId}
          type={isVisible ? 'text' : 'password'}
          disabled={disabled}
          className={inputClassName}
          value={value}
          onChange={onChange}
          autoComplete="off"
          aria-invalid={hasError}
          aria-describedby={caption || error || success ? `${inputId}-caption` : undefined}
          {...props}
        />

        {/* Visibility Toggle */}
        {showToggle && (
          <button
            type="button"
            onClick={toggleVisibility}
            disabled={disabled}
            className={cn(TOGGLE_BUTTON_STYLE, disabled && 'cursor-not-allowed opacity-50')}
            aria-label={isVisible ? 'Hide password' : 'Show password'}
          >
            <Icon
              iconType={['system', isVisible ? 'eye-off' : 'eye']}
              size={sizeConfig.iconSize}
              color={iconColor}
            />
          </button>
        )}
      </div>

      {/* Password Strength Indicator */}
      {showStrength && (
        <div className={STRENGTH_INDICATOR_CONTAINER}>
          {/* Strength Bars */}
          <div className="flex gap-2 flex-1">
            {[1, 2, 3].map((barIndex) => (
              <div
                key={barIndex}
                className={cn(
                  STRENGTH_BAR_BASE,
                  barIndex <= activeBarCount
                    ? STRENGTH_BAR_COLORS[strength]
                    : STRENGTH_BAR_INACTIVE
                )}
              />
            ))}
          </div>

          {/* Strength Label */}
          {strength !== 'none' && (
            <span className={cn(STRENGTH_LABEL_STYLE, STRENGTH_LABEL_COLORS[strength])}>
              {STRENGTH_LABELS[strength]}
            </span>
          )}
        </div>
      )}
    </InputWrapper>
  );
});

PasswordInput.displayName = 'PasswordInput';
