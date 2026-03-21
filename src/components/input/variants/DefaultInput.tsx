import { forwardRef, useRef, useCallback } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';

import { useKeyboardShortcut } from '../../../hooks/use-keyboard-shortcut';

import { cn } from '../../../utils/cn';
import { Icon, parseIconTypeWithFill } from '../../icons/Icon';
import type { IconTypeWithFill } from '../../icons/Icon/Icon.types';
import {
  STATE_CONFIG,
  SHORTCUT_STYLE,
  INPUT_WRAPPER_BASE,
  INPUT_FIELD_BASE,
  INPUT_COUNT_STYLE,
} from 'constants/input/Input/Input.constants';
import { InputWrapper } from '../shared/InputWrapper';
import { useInputState } from '../shared/useInputState';
import type { InputStyle, InputSize } from '../Input/Input.types';

export interface DefaultInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
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
   * 입력 필드 앞에 표시되는 아이콘
   */
  leadIcon?: IconTypeWithFill;
  /**
   * 입력 필드 뒤에 표시되는 아이콘
   */
  tailIcon?: IconTypeWithFill;
  /**
   * 끝에 표시되는 단축키 뱃지 텍스트
   */
  shortcut?: string;
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
   * 글자 수 카운터 표시 여부 (maxLength와 함께 사용)
   * @default false
   */
  showCount?: boolean;
  /**
   * Cmd/Ctrl+Enter 입력 시 호출되는 콜백
   */
  onCmdEnter?: () => void;
}

/**
 * DefaultInput 변형
 *
 * 아이콘, 단축키, 지우기 버튼을 지원하는 기본 텍스트 입력 필드
 */
export const DefaultInput = forwardRef<HTMLInputElement, DefaultInputProps>(({
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
  leadIcon,
  tailIcon,
  shortcut,
  width,
  disabled = false,
  className,
  onClear,
  onCmdEnter,
  showCount = false,
  maxLength,
  value,
  onKeyDown: onKeyDownProp,
  ...props
}, ref) => {
  const internalRef = useRef<HTMLInputElement>(null);
  const mergeRefs = useCallback(
    (node: HTMLInputElement | null) => {
      internalRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
    },
    [ref],
  );

  useKeyboardShortcut(
    shortcut,
    () => {
      if (document.activeElement !== internalRef.current) {
        internalRef.current?.focus();
      }
    },
    { enabled: !disabled, ignoreInputFields: false },
  );

  const { inputId, hasError, state, sizeConfig, styleConfig, stateConfig, iconColor } = useInputState({
    inputStyle,
    size,
    disabled,
    error,
    success,
  });

  const currentLength = typeof value === 'string' ? value.length : 0;

  // Determine if we have tail content
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (onCmdEnter && e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      onCmdEnter();
    }
    onKeyDownProp?.(e);
  }, [onCmdEnter, onKeyDownProp]);

  const hasClearButton = onClear !== undefined && value !== '' && value !== undefined;
  const hasLeadIcon = leadIcon !== undefined;
  const hasTailContent = tailIcon !== undefined || shortcut !== undefined || hasClearButton;

  // Determine padding based on icons
  let paddingClass: string = sizeConfig.padding;
  if (hasLeadIcon && hasTailContent) {
    paddingClass = sizeConfig.paddingWithBothIcons;
  } else if (hasLeadIcon) {
    paddingClass = sizeConfig.paddingWithLeadIcon;
  } else if (hasTailContent) {
    paddingClass = sizeConfig.paddingWithTailIcon;
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
          ref={mergeRefs}
          id={inputId}
          disabled={disabled}
          required={required}
          className={inputClassName}
          value={value}
          autoComplete="off"
          aria-invalid={hasError}
          aria-describedby={caption || error || success ? `${inputId}-caption` : undefined}
          aria-required={required || undefined}
          onKeyDown={handleKeyDown}
          {...props}
        />

        {/* Clear Button */}
        {hasClearButton && (
          <button
            type="button"
            onClick={onClear}
            className="flex-shrink-0 flex items-center justify-center hover:bg-state-ghost-hover rounded-xs transition-colors"
            aria-label="Clear input"
          >
            <Icon
              iconType={['system', 'close-circle']}
              size={sizeConfig.iconSize}
              color={iconColor}
            />
          </button>
        )}

        {/* Shortcut Badge */}
        {shortcut && !hasClearButton && (
          <div className={SHORTCUT_STYLE.container}>
            <span className={SHORTCUT_STYLE.text}>{shortcut}</span>
          </div>
        )}

        {/* Tail Icon */}
        {tailIcon && !shortcut && !hasClearButton && (() => {
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
    </InputWrapper>
  );
});

DefaultInput.displayName = 'DefaultInput';
