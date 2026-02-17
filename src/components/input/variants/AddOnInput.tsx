import { forwardRef } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';

import { cn } from '../../../utils/cn';
import { Icon, parseIconTypeWithFill } from '../../icons/Icon';
import type { IconTypeWithFill } from '../../icons/Icon/Icon.types';
import {
  STATE_CONFIG,
  INPUT_WRAPPER_BASE,
  INPUT_FIELD_BASE,
  INPUT_COUNT_STYLE,
} from 'constants/input/Input/Input.constants';
import {
  ADDON_SECTION_BASE,
  ADDON_TEXT_STYLE,
  INLINE_ADDON_STYLE,
  ADDON_SIZE_CONFIG,
} from 'constants/input/variants';
import { InputWrapper } from '../shared/InputWrapper';
import { useInputState } from '../shared/useInputState';
import type { InputStyle, InputSize } from '../Input/Input.types';

export interface AddOnInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
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
   * 입력 필드 앞에 표시되는 아이콘 (인라인이거나 접두사가 없을 때)
   */
  leadIcon?: IconTypeWithFill;
  /**
   * 입력 필드 뒤에 표시되는 아이콘 (인라인이거나 접미사가 없을 때)
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
   * 접두사 애드온 컨텐츠 (문자열 또는 ReactNode)
   */
  prefix?: string | ReactNode;
  /**
   * 접미사 애드온 컨텐츠 (문자열 또는 ReactNode)
   */
  suffix?: string | ReactNode;
  /**
   * 애드온을 입력 필드와 인라인으로 표시할지 여부
   * @default false
   */
  inline?: boolean;
  /**
   * 글자 수 카운터 표시 여부 (maxLength와 함께 사용)
   * @default false
   */
  showCount?: boolean;
}

/**
 * AddOnInput 변형
 *
 * 접두사 및/또는 접미사 애드온 컨텐츠가 있는 입력 필드
 * 인라인 애드온과 별도 섹션 애드온 모두 지원
 */
export const AddOnInput = forwardRef<HTMLInputElement, AddOnInputProps>(({
  prefix,
  suffix,
  inline = false,
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
  const { inputId, hasError, state, sizeConfig, styleConfig, iconColor } = useInputState({
    inputStyle,
    size,
    disabled,
    error,
    success,
  });

  const currentLength = typeof value === 'string' ? value.length : 0;

  const addOnSizeConfig = ADDON_SIZE_CONFIG[size];

  // Check if we have add-ons
  const hasPrefix = prefix !== undefined;
  const hasSuffix = suffix !== undefined;
  const hasAddOn = hasPrefix || hasSuffix;

  // Determine if we should show icons
  const showLeadIcon = leadIcon && (inline || !hasPrefix);
  const showTailIcon = tailIcon && (inline || !hasSuffix);
  const hasClearButton = onClear !== undefined && value !== '' && value !== undefined;

  // Render add-on content
  const renderAddOnContent = (content: string | ReactNode, isInline: boolean) => {
    if (typeof content === 'string') {
      return <span className={isInline ? INLINE_ADDON_STYLE : ADDON_TEXT_STYLE}>{content}</span>;
    }
    return content;
  };

  // For non-inline add-ons, use a single outer container with internal dividers
  if (!inline && hasAddOn) {
    // Outer container - has the border, background, and border-radius
    const outerContainerClassName = cn(
      'flex items-center w-full overflow-hidden transition-colors duration-150',
      sizeConfig.container,
      styleConfig.base,
      !disabled && styleConfig.focus,
      state === 'disabled' && STATE_CONFIG.disabled.bg,
      state === 'error' && 'border-destructive',
      state === 'success' && 'border-success',
      disabled && 'cursor-not-allowed'
    );

    // Prefix section - NO background, only right border for divider
    const prefixSectionClassName = cn(
      ADDON_SECTION_BASE,
      addOnSizeConfig.addOnPadding,
      addOnSizeConfig.prefixBorder
    );

    // Suffix section - NO background, only left border for divider
    const suffixSectionClassName = cn(
      ADDON_SECTION_BASE,
      addOnSizeConfig.addOnPadding,
      addOnSizeConfig.suffixBorder
    );

    // Input area - NO background, NO border, just padding and flex
    const inputAreaClassName = cn(
      'flex items-center flex-1 min-w-0',
      addOnSizeConfig.inputPadding,
      sizeConfig.gap
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
        {/* Single Outer Container with Prefix, Input, and Suffix */}
        <div className={outerContainerClassName}>
          {/* Prefix Section */}
          {hasPrefix && (
            <div className={prefixSectionClassName}>
              {renderAddOnContent(prefix, false)}
            </div>
          )}

          {/* Input Area (no border, no background) */}
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

          {/* Suffix Section */}
          {hasSuffix && (
            <div className={suffixSectionClassName}>
              {renderAddOnContent(suffix, false)}
            </div>
          )}
        </div>
      </InputWrapper>
    );
  }

  // Inline add-on or no add-on - add-ons are inside the input wrapper
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
        {/* Prefix (inline) */}
        {hasPrefix && renderAddOnContent(prefix, true)}

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

        {/* Suffix (inline) */}
        {hasSuffix && renderAddOnContent(suffix, true)}
      </div>
    </InputWrapper>
  );
});

AddOnInput.displayName = 'AddOnInput';
