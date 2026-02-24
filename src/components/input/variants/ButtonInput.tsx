import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';

import { cn } from '../../../utils/cn';
import { Icon, parseIconTypeWithFill } from '../../icons/Icon';
import type { IconTypeWithFill } from '../../icons/Icon/Icon.types';
import {
  STYLE_CONFIG,
  STATE_CONFIG,
  INPUT_FIELD_BASE,
  INPUT_COUNT_STYLE,
} from 'constants/input/Input/Input.constants';
import {
  BUTTON_SIZE_CONFIG,
  INLINE_BUTTON_BASE,
  INLINE_BUTTON_TEXT,
  INLINE_BUTTON_HOVER,
  DIVIDER_STYLE,
} from 'constants/input/variants';
import { InputWrapper } from '../shared/InputWrapper';
import { useInputState } from '../shared/useInputState';
import type { InputStyle, InputSize } from '../Input/Input.types';

/**
 * 버튼 위치 - lead (입력 필드 앞) 또는 tail (입력 필드 뒤)
 */
export type ButtonPosition = 'lead' | 'tail';

export interface ButtonInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
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
   * 입력 필드 뒤에 표시되는 아이콘
   */
  tailIcon?: IconTypeWithFill;
  /**
   * 입력 필드 컨테이너의 커스텀 너비 (숫자는 px, 문자열은 그대로 사용)
   * 미지정 시 전체 너비 사용
   */
  width?: string | number;
  /**
   * 지우기 버튼 클릭 시 호출되는 콜백 (제공 시 지우기 버튼 표시)
   */
  onClear?: () => void;
  /**
   * 버튼 라벨 텍스트
   */
  buttonLabel?: string;
  /**
   * 버튼 앞에 표시되는 아이콘
   */
  buttonLeadIcon?: IconTypeWithFill;
  /**
   * 버튼 뒤에 표시되는 아이콘
   */
  buttonTailIcon?: IconTypeWithFill;
  /**
   * 버튼 위치 - lead (입력 필드 앞) 또는 tail (입력 필드 뒤)
   * @default 'tail'
   */
  buttonPosition?: ButtonPosition;
  /**
   * 버튼 클릭 시 호출되는 콜백
   */
  onButtonClick?: () => void;
  /**
   * 버튼 비활성화 여부
   * @default false
   */
  buttonDisabled?: boolean;
  /**
   * 글자 수 카운터 표시 여부 (maxLength와 함께 사용)
   * @default false
   */
  showCount?: boolean;
}

/**
 * ButtonInput 변형
 *
 * 앞 또는 뒤에 인라인 버튼이 있는 입력 필드
 */
export const ButtonInput = forwardRef<HTMLInputElement, ButtonInputProps>(({
  buttonLabel,
  buttonLeadIcon,
  buttonTailIcon,
  buttonPosition = 'tail',
  onButtonClick,
  buttonDisabled = false,
  inputStyle = 'default',
  size = 'sm',
  label,
  required = false,
  supportText,
  caption,
  error,
  success,
  leadIcon,
  tailIcon,
  width,
  disabled = false,
  className,
  onClear,
  showCount = false,
  maxLength,
  value,
  ...props
}, ref) => {
  const { inputId, hasError, state, iconColor } = useInputState({
    inputStyle,
    size,
    disabled,
    error,
    success,
  });

  const currentLength = typeof value === 'string' ? value.length : 0;

  // Get size configuration
  const sizeConfig = BUTTON_SIZE_CONFIG[size];
  const styleConfig = STYLE_CONFIG[inputStyle];

  // Determine if we should show icons
  const showLeadIcon = !!leadIcon;
  const showTailIcon = !!tailIcon;
  const hasClearButton = onClear !== undefined && value !== '' && value !== undefined;

  // Button is effectively disabled if input is disabled or button is explicitly disabled
  const isButtonDisabled = disabled || buttonDisabled;

  // Outer container - has the border (via shadow), background, and border-radius
  const outerContainerClassName = cn(
    'flex items-center w-full transition-colors duration-150',
    sizeConfig.container,
    styleConfig.base,
    !disabled && styleConfig.focus,
    state === 'disabled' && STATE_CONFIG.disabled.bg,
    state === 'error' && 'border-destructive',
    state === 'success' && 'border-success',
    disabled && 'cursor-not-allowed'
  );

  // Input area - flex-1, padding, gap
  const inputAreaClassName = cn(
    'flex items-center flex-1 min-w-0',
    sizeConfig.inputPadding,
    sizeConfig.inputGap
  );

  // Input field className
  const inputClassName = cn(
    INPUT_FIELD_BASE,
    'size-sm line-height-leading-5',
    'letter-spacing-tracking-tight',
    STATE_CONFIG[state].text,
    STATE_CONFIG[state].placeholder,
    disabled && 'cursor-not-allowed'
  );

  // Inline button className
  const inlineButtonClassName = cn(
    INLINE_BUTTON_BASE,
    INLINE_BUTTON_TEXT,
    sizeConfig.buttonPadding,
    sizeConfig.buttonGap,
    isButtonDisabled
      ? 'text-hint cursor-not-allowed'
      : cn('text-default', INLINE_BUTTON_HOVER)
  );

  // Render inline button
  const renderInlineButton = () => {
    const hasContent = buttonLabel || buttonLeadIcon || buttonTailIcon;
    if (!hasContent) return null;

    return (
      <button
        type="button"
        onClick={isButtonDisabled ? undefined : onButtonClick}
        disabled={isButtonDisabled}
        className={inlineButtonClassName}
        tabIndex={isButtonDisabled ? -1 : 0}
        aria-label={buttonLabel || 'Action button'}
      >
        {buttonLeadIcon && (() => {
          const { iconType, isFill } = parseIconTypeWithFill(buttonLeadIcon);
          return (
            <Icon
              iconType={iconType}
              isFill={isFill}
              size={sizeConfig.iconSize}
              color={isButtonDisabled ? 'default-disabled' : 'default-subtle'}
              className="flex-shrink-0"
            />
          );
        })()}
        {buttonLabel && <span>{buttonLabel}</span>}
        {buttonTailIcon && (() => {
          const { iconType, isFill } = parseIconTypeWithFill(buttonTailIcon);
          return (
            <Icon
              iconType={iconType}
              isFill={isFill}
              size={sizeConfig.iconSize}
              color={isButtonDisabled ? 'default-disabled' : 'default-subtle'}
              className="flex-shrink-0"
            />
          );
        })()}
      </button>
    );
  };

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
      {/* Outer Container */}
      <div className={outerContainerClassName}>
        {/* Lead Button */}
        {buttonPosition === 'lead' && (
          <>
            {renderInlineButton()}
            <div className={DIVIDER_STYLE} />
          </>
        )}

        {/* Input Area */}
        <div className={inputAreaClassName}>
          {/* Lead Icon */}
          {showLeadIcon && leadIcon && (() => {
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
            required={required}
            className={inputClassName}
            value={value}
            autoComplete="off"
            aria-invalid={hasError}
            aria-describedby={caption || error || success ? `${inputId}-caption` : undefined}
            {...props}
          />

          {/* Clear Button */}
          {hasClearButton && (
            <button
              type="button"
              onClick={onClear}
              className="flex-shrink-0 flex items-center justify-center hover:bg-state-ghost-hover rounded-xs transition-colors cursor-pointer"
              aria-label="Clear input"
            >
              <Icon
                iconType={['system', 'close-circle']}
                size={sizeConfig.iconSize}
                color={iconColor}
              />
            </button>
          )}

          {/* Tail Icon */}
          {showTailIcon && !hasClearButton && tailIcon && (() => {
            const { iconType, isFill } = parseIconTypeWithFill(tailIcon);
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

          {showCount && maxLength !== undefined && (
            <span className={cn(INPUT_COUNT_STYLE, 'flex-shrink-0')}>{currentLength}/{maxLength}</span>
          )}
        </div>

        {/* Tail Button */}
        {buttonPosition === 'tail' && (
          <>
            <div className={DIVIDER_STYLE} />
            {renderInlineButton()}
          </>
        )}
      </div>
    </InputWrapper>
  );
});

ButtonInput.displayName = 'ButtonInput';
