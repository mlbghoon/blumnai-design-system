import { forwardRef, useState, useCallback } from 'react';
import type { KeyboardEvent, ReactNode } from 'react';
import type { InputHTMLAttributes } from 'react';

import { cn } from '@/lib/utils';
import { Spinner } from '@/lib/spinner';
import { Icon, renderIconProp, RiCloseLine } from '../../icons/Icon';
import type { IconProp } from '../../icons/Icon';
import {
  STATE_CONFIG,
  INPUT_WRAPPER_BASE,
  INPUT_FIELD_BASE,
} from 'constants/input/Input/Input.constants';
import {
  TAG_BASE,
  TAG_SIZE_CONFIG,
  TAG_TEXT_STYLE,
  TAG_CLOSE_BUTTON,
  TAGS_CONTAINER,
  INLINE_TAGS_CONTAINER,
  TAG_VARIANT_STYLES,
} from 'constants/input/variants';
import { InputWrapper } from '../shared/InputWrapper';
import { useInputState } from '../shared/useInputState';
import type { InputStyle, InputSize } from '../Input/Input.types';

/**
 * 개별 태그를 표시하는 Tag 컴포넌트
 */
interface TagProps {
  label: string;
  onRemove: () => void;
  disabled?: boolean;
  size: InputSize;
  /** 태그 표시 방식 - inline (입력 필드 내부) 또는 stacked (입력 필드 아래) */
  variant: 'inline' | 'stacked';
  /** 태그 삭제 가능 여부 (닫기 버튼 표시) */
  removable?: boolean;
}

const Tag = ({ label, onRemove, disabled, size, variant, removable = true }: TagProps) => {
  const tagSizeConfig = TAG_SIZE_CONFIG[size];
  const tagVariantStyles = TAG_VARIANT_STYLES[variant];

  return (
    <span
      className={cn(
        TAG_BASE,
        tagSizeConfig.container,
        disabled ? tagVariantStyles.disabled : tagVariantStyles.default
      )}
    >
      <span className={cn(TAG_TEXT_STYLE, tagSizeConfig.text)}>
        {label}
      </span>
      {!disabled && removable && (
        <button
          type="button"
          onClick={onRemove}
          className={cn(TAG_CLOSE_BUTTON, tagSizeConfig.closeButton)}
          aria-label={`Remove ${label}`}
        >
          <Icon
            icon={RiCloseLine}
            size={tagSizeConfig.iconSize}
            color="default-subtle"
          />
        </button>
      )}
    </span>
  );
};

export interface TagsInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'value' | 'onChange'> {
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
  leadIcon?: IconProp;
  /**
   * 입력 필드 컨테이너의 커스텀 너비 (숫자는 px, 문자열은 그대로 사용)
   * 미지정 시 전체 너비 사용
   */
  width?: string | number;
  /**
   * 태그를 입력 필드와 인라인으로 표시할지 여부
   * @default true
   */
  inline?: boolean;
  /**
   * 현재 태그 배열
   * @default []
   */
  tags?: string[];
  /**
   * 태그 배열 변경 시 호출되는 콜백
   */
  onTagsChange?: (tags: string[]) => void;
  /**
   * 태그 추가 시 호출되는 콜백
   */
  onTagAdd?: (tag: string) => void;
  /**
   * 태그 삭제 시 호출되는 콜백
   */
  onTagRemove?: (tag: string) => void;
  /**
   * 허용되는 최대 태그 개수
   */
  maxTags?: number;
  /**
   * 제어되는 입력 값
   */
  value?: string;
  /**
   * 제어되는 입력 변경 콜백
   */
  onInputChange?: (value: string) => void;
  /**
   * 태그 생성을 트리거하는 구분자 문자
   * @default [',', 'Enter']
   */
  delimiters?: string[];
  /**
   * 중복 태그 허용 여부
   * @default false
   */
  allowDuplicates?: boolean;
  /**
   * 태그 삭제 가능 여부 (닫기 버튼 표시)
   * @default true
   */
  removable?: boolean;
  /**
   * 로딩 상태. `true`일 때 tail 영역에 스피너를 표시하고 input을 비활성화합니다.
   * @default false
   */
  loading?: boolean;
}

/**
 * TagsInput 변형
 *
 * 태그 추가 및 삭제가 가능한 입력 필드
 * 인라인과 스택 태그 표시 모드 지원
 */
export const TagsInput = forwardRef<HTMLInputElement, TagsInputProps>(({
  tags = [],
  onTagsChange,
  onTagAdd,
  onTagRemove,
  inline = true,
  maxTags,
  value: controlledValue,
  onInputChange,
  delimiters = [',', 'Enter'],
  allowDuplicates = false,
  removable = true,
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
  width,
  disabled = false,
  loading = false,
  className,
  placeholder,
  ...props
}, ref) => {
  const [internalValue, setInternalValue] = useState('');

  const { inputId, hasError, state, sizeConfig, styleConfig, iconColor } = useInputState({
    inputStyle,
    size,
    disabled,
    error,
    success,
  });

  // Use controlled or internal value
  const inputValue = controlledValue ?? internalValue;
  const setInputValue = onInputChange ?? setInternalValue;

  // Check if we can add more tags
  const canAddTag = !maxTags || tags.length < maxTags;

  // Add a new tag
  const addTag = useCallback((tagValue: string) => {
    const trimmedValue = tagValue.trim();
    if (!trimmedValue) return;
    if (!canAddTag) return;
    if (!allowDuplicates && tags.includes(trimmedValue)) return;

    const newTags = [...tags, trimmedValue];
    onTagsChange?.(newTags);
    onTagAdd?.(trimmedValue);
    setInputValue('');
  }, [tags, canAddTag, allowDuplicates, onTagsChange, onTagAdd, setInputValue]);

  const removeTag = useCallback((index: number) => {
    const removedTag = tags[index];
    if (removedTag === undefined) return;
    const newTags = tags.filter((_, i) => i !== index);
    onTagsChange?.(newTags);
    onTagRemove?.(removedTag);
  }, [tags, onTagsChange, onTagRemove]);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && delimiters.includes('Enter')) {
      e.preventDefault();
      addTag(inputValue);
      return;
    }

    if (e.key === 'Backspace' && inputValue === '' && tags.length > 0) {
      removeTag(tags.length - 1);
      return;
    }
  }, [delimiters, inputValue, tags, addTag, removeTag]);

  // Handle input change
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Check for delimiter characters
    const delimiterChars = delimiters.filter(d => d !== 'Enter');
    for (const delimiter of delimiterChars) {
      if (value.includes(delimiter)) {
        const parts = value.split(delimiter);
        // Add all parts except the last one (which may be incomplete)
        parts.slice(0, -1).forEach(part => addTag(part));
        // Keep the last part in the input
        setInputValue(parts[parts.length - 1]);
        return;
      }
    }

    setInputValue(value);
  }, [delimiters, addTag, setInputValue]);

  const renderTags = (variant: 'inline' | 'stacked') => (
    tags.map((tag, index) => (
      <Tag
        key={`${tag}-${index}`}
        label={tag}
        onRemove={() => removeTag(index)}
        disabled={disabled}
        size={size}
        variant={variant}
        removable={removable}
      />
    ))
  );

  // Wrapper className
  const wrapperClassName = cn(
    INPUT_WRAPPER_BASE,
    inline ? 'min-height-32' : sizeConfig.container,
    sizeConfig.padding,
    sizeConfig.gap,
    styleConfig.base,
    !disabled && styleConfig.focus,
    state === 'disabled' && STATE_CONFIG.disabled.bg,
    state === 'error' && 'border-destructive',
    state === 'success' && 'border-success',
    disabled && 'cursor-not-allowed',
    inline && 'flex-wrap'
  );

  // Input field className
  const inputClassName = cn(
    INPUT_FIELD_BASE,
    sizeConfig.text,
    'letter-spacing-tracking-tight',
    STATE_CONFIG[state].text,
    STATE_CONFIG[state].placeholder,
    disabled && 'cursor-not-allowed',
    inline && 'min-w-0'
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
        {leadIcon && renderIconProp(leadIcon, {
          size: sizeConfig.iconSize,
          color: iconColor,
          className: 'flex-shrink-0',
        })}

        {/* Inline Tags (inside input) */}
        {inline && tags.length > 0 && (
          <div className={INLINE_TAGS_CONTAINER}>
            {renderTags('inline')}
          </div>
        )}

        {/* Input Field */}
        <input
          ref={ref}
          id={inputId}
          type="text"
          disabled={disabled || !canAddTag || loading}
          className={inputClassName}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={canAddTag ? placeholder : 'Max tags reached'}
          autoComplete="off"
          aria-invalid={hasError}
          aria-busy={loading || undefined}
          aria-describedby={caption || error || success ? `${inputId}-caption` : undefined}
          {...props}
        />

        {/* Loading spinner */}
        {loading && (
          <Spinner size={sizeConfig.iconSize} color={iconColor} className="ml-auto" />
        )}
      </div>

      {/* Tags container (below input for inline-tags variant) */}
      {!inline && tags.length > 0 && (
        <div className={TAGS_CONTAINER}>
          {renderTags('stacked')}
        </div>
      )}
    </InputWrapper>
  );
});

TagsInput.displayName = 'TagsInput';
