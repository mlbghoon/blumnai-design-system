import { forwardRef, useId, useRef, useCallback, useEffect } from 'react';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';

import { cn } from '../../utils/cn';
import { Icon, parseIconTypeWithFill } from '../icons/Icon';
import { InputWrapper } from '../input/shared/InputWrapper';
import { ScrollBar } from '../scroll-area/ScrollArea';
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
  onInput,
  onKeyUp,
  onKeyDown,
  readOnly,
  fieldSizing = 'fixed',
  autoResize = false,
  ...props
}, ref) => {
  const textareaId = useId();
  const internalRef = useRef<HTMLTextAreaElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const mergedRef = useCallback((node: HTMLTextAreaElement | null) => {
    internalRef.current = node;
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
    }
  }, [ref]);

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
  const useCustomScrollbar = !!maxRows && !hasToolbarContent;
  const useAutoResize = autoResize && !hasToolbarContent;

  const adjustHeight = useCallback(() => {
    const textarea = internalRef.current;
    if (!textarea) return;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, []);

  const scrollToCursor = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const textarea = internalRef.current;
      const viewport = viewportRef.current;
      if (!textarea || !viewport) return;

      const mirror = document.createElement('div');
      const computed = window.getComputedStyle(textarea);
      mirror.style.position = 'absolute';
      mirror.style.visibility = 'hidden';
      mirror.style.whiteSpace = 'pre-wrap';
      mirror.style.wordWrap = 'break-word';
      mirror.style.overflow = 'hidden';
      mirror.style.width = computed.width;
      mirror.style.fontFamily = computed.fontFamily;
      mirror.style.fontSize = computed.fontSize;
      mirror.style.fontWeight = computed.fontWeight;
      mirror.style.lineHeight = computed.lineHeight;
      mirror.style.letterSpacing = computed.letterSpacing;
      mirror.style.paddingTop = computed.paddingTop;
      mirror.style.paddingRight = computed.paddingRight;
      mirror.style.paddingBottom = computed.paddingBottom;
      mirror.style.paddingLeft = computed.paddingLeft;
      mirror.style.borderWidth = computed.borderWidth;
      mirror.style.boxSizing = computed.boxSizing;

      const textBeforeCursor = textarea.value.substring(0, textarea.selectionEnd ?? textarea.value.length);
      mirror.textContent = textBeforeCursor;

      const marker = document.createElement('span');
      marker.textContent = '\u200b';
      mirror.appendChild(marker);

      document.body.appendChild(mirror);
      const cursorTop = marker.offsetTop;
      const cursorBottom = cursorTop + marker.offsetHeight;
      document.body.removeChild(mirror);

      const scrollTop = viewport.scrollTop;
      const viewHeight = viewport.clientHeight;

      if (cursorTop < scrollTop) {
        viewport.scrollTop = cursorTop;
      } else if (cursorBottom > scrollTop + viewHeight) {
        viewport.scrollTop = cursorBottom - viewHeight;
      }
    });
  }, []);

  const handleInput = useCallback((e: React.FormEvent<HTMLTextAreaElement>) => {
    if (useCustomScrollbar) {
      adjustHeight();
      scrollToCursor();
    } else if (useAutoResize) {
      adjustHeight();
    }
    onInput?.(e);
  }, [useCustomScrollbar, useAutoResize, adjustHeight, scrollToCursor, onInput]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    onKeyDown?.(e);
    if (e.defaultPrevented) return;
    if (onSubmit && !submitDisabled && (e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      onSubmit();
    }
  }, [onSubmit, submitDisabled, onKeyDown]);

  const handleKeyUp = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (useCustomScrollbar) {
      const navKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'PageUp', 'PageDown'];
      if (navKeys.includes(e.key)) {
        scrollToCursor();
      }
    }
    onKeyUp?.(e);
  }, [useCustomScrollbar, scrollToCursor, onKeyUp]);

  useEffect(() => {
    if (useCustomScrollbar || useAutoResize) {
      adjustHeight();
    }
  }, [useCustomScrollbar, useAutoResize, value, adjustHeight]);

  useEffect(() => {
    if (!useCustomScrollbar && !useAutoResize) return;
    const textarea = internalRef.current;
    if (!textarea) return;

    const observer = new ResizeObserver(() => {
      adjustHeight();
    });
    observer.observe(textarea);
    return () => observer.disconnect();
  }, [useCustomScrollbar, useAutoResize, adjustHeight]);

  const wrapperClassName = cn(
    'flex flex-col w-full transition-colors duration-150',
    sizeConfig.padding,
    styleConfig.base,
    !disabled && !readOnly && styleConfig.focus,
    state === 'disabled' && STATE_CONFIG.disabled.bg,
    state === 'error' && 'border-destructive',
    state === 'success' && 'border-success',
    disabled && 'cursor-not-allowed',
    readOnly && 'bg-muted cursor-default'
  );

  const showResizeHandle = !hasToolbarContent && !useCustomScrollbar && !useAutoResize && resize !== 'none' && !disabled && !readOnly;

  const textareaClassName = cn(
    TEXTAREA_BASE,
    'scrollbar-thin',
    sizeConfig.text,
    'letter-spacing-tracking-tight',
    stateConfig.text,
    stateConfig.placeholder,
    'placeholder:transition-opacity placeholder:duration-150',
    'focus:placeholder:opacity-50',
    (hasToolbarContent || useCustomScrollbar || useAutoResize) ? 'resize-none' : RESIZE_CONFIG[resize],
    showResizeHandle && '[&::-webkit-resizer]:hidden',
    disabled && 'cursor-not-allowed',
    readOnly && 'cursor-default'
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
                  aria-label={action.label || action.key}
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

  const textareaElement = (
    <textarea
      ref={(useCustomScrollbar || useAutoResize) ? mergedRef : ref}
      id={textareaId}
      disabled={disabled}
      readOnly={readOnly}
      required={required}
      className={textareaClassName}
      style={{
        minHeight: hasToolbarContent ? undefined : `${minHeight}px`,
        maxHeight: useCustomScrollbar ? undefined : (useAutoResize ? undefined : (maxHeight && !hasToolbarContent ? `${maxHeight}px` : undefined)),
        overflow: (useCustomScrollbar || useAutoResize) ? 'hidden' : undefined,
        ...(fieldSizing === 'content' ? { fieldSizing: 'content' } : {}),
      } as React.CSSProperties}
      rows={minRows}
      maxLength={maxLength}
      value={value}
      defaultValue={defaultValue}
      aria-invalid={hasError}
      aria-describedby={caption || error || success ? `${textareaId}-caption` : undefined}
      onInput={handleInput}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      {...props}
    />
  );

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
      <div className={cn(wrapperClassName, 'relative')}>
        {useCustomScrollbar ? (
          <ScrollAreaPrimitive.Root className="relative overflow-hidden min-h-0">
            <ScrollAreaPrimitive.Viewport
              ref={viewportRef}
              className="h-full w-full max-w-full"
              style={{ maxHeight: `${maxHeight}px` }}
            >
              {textareaElement}
            </ScrollAreaPrimitive.Viewport>
            <ScrollBar orientation="vertical" />
            <ScrollAreaPrimitive.Corner />
          </ScrollAreaPrimitive.Root>
        ) : (
          textareaElement
        )}

        {showResizeHandle && (
          <div className="absolute bottom-0 right-0 pointer-events-none padding-2 text-hint" aria-hidden="true">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
              <circle cx="8" cy="2" r="1" />
              <circle cx="8" cy="5.5" r="1" />
              <circle cx="8" cy="9" r="1" />
              <circle cx="4.5" cy="5.5" r="1" />
              <circle cx="4.5" cy="9" r="1" />
              <circle cx="1" cy="9" r="1" />
            </svg>
          </div>
        )}

        {renderToolbar()}

        {showCount && maxLength && !hasToolbarContent && (
          <div className={cn('flex justify-end margin-t-16', COUNT_STYLE)} aria-live="polite">
            <span>{currentLength}/{maxLength}</span>
          </div>
        )}
      </div>
    </InputWrapper>
  );
});

Textarea.displayName = 'Textarea';
