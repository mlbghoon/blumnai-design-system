import { forwardRef, useState, useRef, useEffect, useId, useLayoutEffect } from 'react';
import type { InputHTMLAttributes } from 'react';
import { createPortal } from 'react-dom';

import { cn } from '../../../utils/cn';
import { Icon } from '../../icons/Icon/Icon';
import type { IconType } from '../../icons/Icon/Icon.types';
import {
  SIZE_CONFIG,
  STATE_CONFIG,
  INPUT_WRAPPER_BASE,
  INPUT_FIELD_BASE,
} from 'constants/input/Input/Input.constants';
import {
  DROPDOWN_TRIGGER_BASE,
  DROPDOWN_TRIGGER_TEXT,
  DROPDOWN_TRIGGER_PLACEHOLDER,
  DROPDOWN_MENU_BASE,
  DROPDOWN_OPTION_BASE,
  DROPDOWN_OPTION_TEXT,
  DROPDOWN_OPTION_SELECTED,
  DROPDOWN_SIZE_CONFIG,
  DROPDOWN_DIVIDER,
} from 'constants/input/variants';
import { InputWrapper } from '../shared/InputWrapper';
import { useInputState } from '../shared/useInputState';
import type { InputStyle, InputSize } from '../Input/Input.types';

/**
 * 드롭다운 위치 - lead (입력 필드 앞) 또는 tail (입력 필드 뒤)
 */
export type DropdownPosition = 'lead' | 'tail';

/**
 * 드롭다운 옵션 정의
 */
export interface DropdownOption {
  value: string;
  label: string;
  icon?: IconType;
}

export interface DropdownInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
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
   * 입력 필드 앞에 표시되는 아이콘 (드롭다운이 lead가 아닐 때)
   */
  leadIcon?: IconType;
  /**
   * 입력 필드 뒤에 표시되는 아이콘 (드롭다운이 tail이 아닐 때)
   */
  tailIcon?: IconType;
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
   * 사용 가능한 드롭다운 옵션 목록
   */
  dropdownOptions: DropdownOption[];
  /**
   * 드롭다운 위치 - lead (입력 필드 앞) 또는 tail (입력 필드 뒤)
   * @default 'lead'
   */
  dropdownPosition?: DropdownPosition;
  /**
   * 현재 선택된 드롭다운 값
   */
  dropdownValue?: string;
  /**
   * 드롭다운 값 변경 시 호출되는 콜백
   */
  onDropdownChange?: (value: string) => void;
  /**
   * 드롭다운 값이 선택되지 않았을 때 표시되는 플레이스홀더 텍스트
   * @default 'Select'
   */
  dropdownPlaceholder?: string;
}

/**
 * DropdownInput 변형
 *
 * 앞 또는 뒤에 통합 드롭다운 셀렉터가 있는 입력 필드
 */
export const DropdownInput = forwardRef<HTMLInputElement, DropdownInputProps>(({
  dropdownOptions,
  dropdownPosition = 'lead',
  dropdownValue,
  onDropdownChange,
  dropdownPlaceholder = 'Select',
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
  value,
  ...props
}, ref) => {
  const dropdownId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0, width: 0 });

  const { inputId, hasError, state, sizeConfig, styleConfig, iconColor } = useInputState({
    inputStyle,
    size,
    disabled,
    error,
    success,
  });

  const dropdownSizeConfig = DROPDOWN_SIZE_CONFIG[size];

  // Update menu position when open
  useLayoutEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [isOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const isOutsideTrigger = triggerRef.current && !triggerRef.current.contains(target);
      const isOutsideMenu = menuRef.current && !menuRef.current.contains(target);

      if (isOutsideTrigger && isOutsideMenu) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Find selected option (guard against undefined dropdownOptions)
  const selectedOption = dropdownOptions?.find(opt => opt.value === dropdownValue);

  // Determine if we should show icons (not when they conflict with dropdown position)
  const showLeadIcon = leadIcon && dropdownPosition !== 'lead';
  const showTailIcon = tailIcon && dropdownPosition !== 'tail';
  const hasClearButton = onClear !== undefined && value !== '' && value !== undefined;

  // Handle dropdown option selection
  const handleSelectOption = (optionValue: string) => {
    onDropdownChange?.(optionValue);
    setIsOpen(false);
  };

  // Wrapper className
  const wrapperClassName = cn(
    INPUT_WRAPPER_BASE,
    sizeConfig.container,
    'padding-0', // We'll handle padding in sub-elements
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

  // Render dropdown menu through portal
  const renderDropdownMenu = () => {
    if (!isOpen || disabled || !dropdownOptions) return null;

    return createPortal(
      <div
        ref={menuRef}
        className={cn(
          DROPDOWN_MENU_BASE,
          'fixed'
        )}
        style={{
          top: menuPosition.top,
          left: menuPosition.left,
          minWidth: menuPosition.width,
        }}
        role="listbox"
        aria-labelledby={dropdownId}
      >
        {dropdownOptions.map((option) => (
          <div
            key={option.value}
            role="option"
            aria-selected={option.value === dropdownValue}
            className={cn(
              DROPDOWN_OPTION_BASE,
              option.value === dropdownValue && DROPDOWN_OPTION_SELECTED
            )}
            onClick={() => handleSelectOption(option.value)}
          >
            {option.icon && (
              <Icon
                iconType={option.icon}
                size={dropdownSizeConfig.iconSize}
                color="default-subtle"
              />
            )}
            <span className={DROPDOWN_OPTION_TEXT}>{option.label}</span>
          </div>
        ))}
      </div>,
      document.body
    );
  };

  // Render dropdown trigger
  const renderDropdownTrigger = () => (
    <div className="relative">
      <button
        ref={triggerRef}
        type="button"
        id={dropdownId}
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={cn(
          DROPDOWN_TRIGGER_BASE,
          dropdownSizeConfig.triggerPadding,
          disabled && 'cursor-not-allowed opacity-50'
        )}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {selectedOption?.icon && (
          <Icon
            iconType={selectedOption.icon}
            size={dropdownSizeConfig.iconSize}
            color={iconColor}
          />
        )}
        <span className={selectedOption ? DROPDOWN_TRIGGER_TEXT : DROPDOWN_TRIGGER_PLACEHOLDER}>
          {selectedOption?.label || dropdownPlaceholder}
        </span>
        <Icon
          iconType={['arrows', 'arrow-down-s']}
          size={12}
          color={iconColor}
          className={cn('transition-transform', isOpen && 'rotate-180')}
        />
      </button>
      {renderDropdownMenu()}
    </div>
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
        {/* Lead Dropdown */}
        {dropdownPosition === 'lead' && (
          <>
            {renderDropdownTrigger()}
            <div className={DROPDOWN_DIVIDER} />
          </>
        )}

        {/* Lead Icon */}
        {showLeadIcon && (
          <div className="padding-l-8">
            <Icon
              iconType={leadIcon}
              size={SIZE_CONFIG[size].iconSize}
              color={iconColor}
              className="flex-shrink-0"
            />
          </div>
        )}

        {/* Input Field Container */}
        <div className={cn('flex-1 flex items-center gap-6', sizeConfig.padding)}>
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
              className="flex-shrink-0 flex items-center justify-center hover:bg-state-ghost-hover rounded-xs transition-colors"
              aria-label="Clear input"
            >
              <Icon
                iconType={['system', 'close-circle']}
                size={SIZE_CONFIG[size].iconSize}
                color={iconColor}
              />
            </button>
          )}

          {/* Tail Icon */}
          {showTailIcon && !hasClearButton && (
            <Icon
              iconType={tailIcon}
              size={SIZE_CONFIG[size].iconSize}
              color={iconColor}
              className="flex-shrink-0"
            />
          )}
        </div>

        {/* Tail Dropdown */}
        {dropdownPosition === 'tail' && (
          <>
            <div className={DROPDOWN_DIVIDER} />
            {renderDropdownTrigger()}
          </>
        )}
      </div>
    </InputWrapper>
  );
});

DropdownInput.displayName = 'DropdownInput';
