import { forwardRef, useId } from 'react';

import { cn } from '../../utils/cn';
import { Icon, parseIconTypeWithFill } from '../icons/Icon';
import { InputWrapper } from '../input/shared/InputWrapper';
import type { TextareaProps } from './Textarea.types';
import {
  SIZE_CONFIG,
  STYLE_CONFIG,
  STATE_CONFIG,
  RESIZE_CONFIG,
  TEXTAREA_BASE,
  COUNT_STYLE,
  TOOLBAR_CONTAINER,
  TOOLBAR_ACTIONS_CONTAINER,
  TOOLBAR_BUTTON_BASE,
  TOOLBAR_BUTTON_ICON_ONLY,
  TOOLBAR_CHIP_BASE,
  TOOLBAR_SUBMIT_BUTTON,
  TOOLBAR_SUBMIT_BUTTON_DISABLED,
} from './Textarea.constants';

/**
 * Textarea 컴포넌트
 *
 * 라벨, 캡션, 에러/성공 상태, 글자 수 표시, 툴바를 지원하는 다중 행 텍스트 입력 컴포넌트입니다.
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
  textareaStyle = 'default',
  size = 'sm',
  label,
  required = false,
  supportText,
  caption,
  error,
  success,
  width,
  minRows = 3,
  maxRows,
  showCount = false,
  resize = 'vertical',
  showToolbar = false,
  toolbarActions,
  onAttach,
  onSubmit,
  submitDisabled = false,
  onVoiceInput,
  toolbarTrailing,
  disabled = false,
  className,
  maxLength,
  value,
  defaultValue,
  ...props
}, ref) => {
  const textareaId = useId();

  const hasError = error === true || (typeof error === 'string' && error.length > 0);
  const hasSuccess = success === true || (typeof success === 'string' && success.length > 0);
  const state = disabled ? 'disabled' : hasError ? 'error' : hasSuccess ? 'success' : 'default';

  const sizeConfig = SIZE_CONFIG[size];
  const styleConfig = STYLE_CONFIG[textareaStyle];
  const stateConfig = STATE_CONFIG[state];

  const lineHeight = 20;
  const paddingY = size === 'sm' ? 20 : 24;
  const toolbarHeight = showToolbar ? 36 : 0;
  const minHeight = minRows * lineHeight + paddingY + toolbarHeight;
  const maxHeight = maxRows ? maxRows * lineHeight + paddingY + toolbarHeight : undefined;

  const currentLength = typeof value === 'string'
    ? value.length
    : typeof defaultValue === 'string'
      ? defaultValue.length
      : 0;

  const hasToolbarContent = showToolbar || onAttach || onSubmit || onVoiceInput || toolbarActions?.length || toolbarTrailing;

  const wrapperClassName = cn(
    'flex flex-col w-full transition-colors duration-150',
    sizeConfig.padding,
    styleConfig.base,
    !disabled && styleConfig.focus,
    state === 'disabled' && STATE_CONFIG.disabled.bg,
    state === 'error' && 'border-destructive',
    state === 'success' && 'border-success',
    disabled && 'cursor-not-allowed'
  );

  const textareaClassName = cn(
    TEXTAREA_BASE,
    sizeConfig.text,
    'letter-spacing-tracking-tight',
    stateConfig.text,
    stateConfig.placeholder,
    hasToolbarContent ? 'resize-none' : RESIZE_CONFIG[resize],
    disabled && 'cursor-not-allowed'
  );

  const renderToolbar = () => {
    if (!hasToolbarContent) return null;

    return (
      <div className={TOOLBAR_CONTAINER}>
        <div className={TOOLBAR_ACTIONS_CONTAINER}>
          {onAttach && (
            <button
              type="button"
              onClick={onAttach}
              disabled={disabled}
              className={cn(TOOLBAR_BUTTON_BASE, TOOLBAR_BUTTON_ICON_ONLY)}
              aria-label="Attach file"
            >
              <Icon iconType={['system', 'add']} size={16} color="default-muted" />
            </button>
          )}

          {toolbarActions?.map((action) => {
            const hasLabel = action.label && action.label.length > 0;

            if (!hasLabel && action.icon) {
              const { iconType, isFill } = parseIconTypeWithFill(action.icon);
              return (
                <button
                  key={action.key}
                  type="button"
                  onClick={action.onClick}
                  disabled={disabled || action.disabled}
                  className={cn(TOOLBAR_BUTTON_BASE, TOOLBAR_BUTTON_ICON_ONLY)}
                >
                  <Icon iconType={iconType} isFill={isFill} size={16} color="default-muted" />
                </button>
              );
            }

            return (
              <button
                key={action.key}
                type="button"
                onClick={action.onClick}
                disabled={disabled || action.disabled}
                className={TOOLBAR_CHIP_BASE}
              >
                {action.icon && (() => {
                  const { iconType, isFill } = parseIconTypeWithFill(action.icon);
                  return <Icon iconType={iconType} isFill={isFill} size={16} color="default-muted" />;
                })()}
                {action.label && <span>{action.label}</span>}
              </button>
            );
          })}
        </div>

        <div className={TOOLBAR_ACTIONS_CONTAINER}>
          {toolbarTrailing}

          {onVoiceInput && (
            <button
              type="button"
              onClick={onVoiceInput}
              disabled={disabled}
              className={cn(TOOLBAR_BUTTON_BASE, TOOLBAR_BUTTON_ICON_ONLY)}
              aria-label="Voice input"
            >
              <Icon iconType={['media', 'mic']} size={16} color="default-muted" />
            </button>
          )}

          {onSubmit && (
            <button
              type="button"
              onClick={onSubmit}
              disabled={disabled || submitDisabled}
              className={disabled || submitDisabled ? TOOLBAR_SUBMIT_BUTTON_DISABLED : TOOLBAR_SUBMIT_BUTTON}
              aria-label="Submit"
            >
              <Icon
                iconType={['arrows', 'arrow-up']}
                size={16}
                color={disabled || submitDisabled ? 'default-muted' : 'white'}
              />
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <InputWrapper
      label={label}
      inputId={textareaId}
      required={required}
      supportText={supportText}
      caption={caption}
      error={error}
      success={success}
      width={width}
      className={className}
    >
      <div className={wrapperClassName}>
        <textarea
          ref={ref}
          id={textareaId}
          disabled={disabled}
          className={textareaClassName}
          style={{
            minHeight: hasToolbarContent ? undefined : `${minHeight}px`,
            maxHeight: maxHeight && !hasToolbarContent ? `${maxHeight}px` : undefined,
          }}
          rows={minRows}
          maxLength={maxLength}
          value={value}
          defaultValue={defaultValue}
          aria-invalid={hasError}
          aria-describedby={caption || error || success ? `${textareaId}-caption` : undefined}
          {...props}
        />

        {renderToolbar()}

        {showCount && maxLength && !hasToolbarContent && (
          <div className={cn('flex justify-end mt-4', COUNT_STYLE)}>
            <span>{currentLength}/{maxLength}</span>
          </div>
        )}
      </div>
    </InputWrapper>
  );
});

Textarea.displayName = 'Textarea';
