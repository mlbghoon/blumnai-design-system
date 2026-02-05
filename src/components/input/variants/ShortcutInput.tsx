import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';

import { cn } from '../../../utils/cn';
import { Icon, parseIconTypeWithFill } from '../../icons/Icon';
import type { IconTypeWithFill } from '../../icons/Icon/Icon.types';
import {
  STATE_CONFIG,
  SHORTCUT_STYLE,
  INPUT_WRAPPER_BASE,
  INPUT_FIELD_BASE,
} from 'constants/input/Input/Input.constants';
import { InputWrapper } from '../shared/InputWrapper';
import { useInputState } from '../shared/useInputState';
import type { InputStyle, InputSize } from '../Input/Input.types';

export interface ShortcutInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
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
   * 끝에 표시되는 단축키 뱃지 텍스트 (이 변형에서 필수)
   */
  shortcut: string;
}

/**
 * ShortcutInput 변형
 *
 * 끝에 단축키 뱃지가 표시되는 입력 필드
 * 단축키가 필수인 특수 변형
 */
export const ShortcutInput = forwardRef<HTMLInputElement, ShortcutInputProps>(({
  inputStyle = 'default',
  size = 'sm',
  label,
  required = false,
  supportText,
  caption,
  error,
  success,
  leadIcon,
  shortcut,
  width,
  disabled = false,
  className,
  ...props
}, ref) => {
  const { inputId, hasError, state, sizeConfig, styleConfig, stateConfig, iconColor } = useInputState({
    inputStyle,
    size,
    disabled,
    error,
    success,
  });

  // Determine padding based on icons
  const hasLeadIcon = leadIcon !== undefined;
  let paddingClass: string = sizeConfig.paddingWithTailIcon;
  if (hasLeadIcon) {
    paddingClass = sizeConfig.paddingWithBothIcons;
  }

  // Wrapper className
  const wrapperClassName = cn(
    INPUT_WRAPPER_BASE,
    sizeConfig.container,
    paddingClass,
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
    stateConfig.text,
    stateConfig.placeholder,
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
        {hasLeadIcon && leadIcon && (() => {
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
          disabled={disabled}
          className={inputClassName}
          autoComplete="off"
          aria-invalid={hasError}
          aria-describedby={caption || error || success ? `${inputId}-caption` : undefined}
          {...props}
        />

        {/* Shortcut Badge */}
        <div className={SHORTCUT_STYLE.container}>
          <span className={SHORTCUT_STYLE.text}>{shortcut}</span>
        </div>
      </div>
    </InputWrapper>
  );
});

ShortcutInput.displayName = 'ShortcutInput';
