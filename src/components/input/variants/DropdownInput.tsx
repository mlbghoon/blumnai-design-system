import { forwardRef, useState, useRef, useEffect, useId, useLayoutEffect, useCallback } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { DismissableLayer } from '@radix-ui/react-dismissable-layer';

import { cn } from '@/lib/utils';
import { Spinner } from '@/lib/spinner';
import { Icon, parseIconTypeWithFill } from '../../icons/Icon';
import type { IconTypeWithFill } from '../../icons/Icon/Icon.types';
import {
  SIZE_CONFIG,
  STATE_CONFIG,
  INPUT_WRAPPER_BASE,
  INPUT_FIELD_BASE,
  INPUT_COUNT_STYLE,
} from 'constants/input/Input/Input.constants';
import {
  DROPDOWN_TRIGGER_BASE,
  DROPDOWN_TRIGGER_TEXT_BASE,
  DROPDOWN_TRIGGER_PLACEHOLDER_BASE,
  DROPDOWN_MENU_BASE,
  DROPDOWN_OPTION_BASE,
  DROPDOWN_OPTION_TEXT_BASE,
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
  icon?: IconTypeWithFill;
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
   * 입력 필드 앞에 표시되는 아이콘 (드롭다운이 lead가 아닐 때)
   */
  leadIcon?: IconTypeWithFill;
  /**
   * 입력 필드 뒤에 표시되는 아이콘 (드롭다운이 tail이 아닐 때)
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
  /**
   * 글자 수 카운터 표시 여부 (maxLength와 함께 사용)
   * @default false
   */
  showCount?: boolean;
  /**
   * 로딩 상태. `true`일 때 tail 영역에 스피너를 표시하고 input을 비활성화합니다.
   * @default false
   */
  loading?: boolean;
  /**
   * 드롭다운 트리거의 고정 너비 (px)
   */
  dropdownWidth?: number;
  /**
   * `dropdownPosition='lead'`: 오른쪽에 표시될 클릭 가능한 아이콘 버튼.
   * `dropdownPosition='tail'`: 무시됨.
   * 지정 시 `tailIcon`과 `onClear` clear 버튼은 숨겨지고 이 버튼이 우선 표시됨.
   */
  buttonTailIcon?: IconTypeWithFill;
  /**
   * `dropdownPosition='tail'`: 왼쪽에 표시될 클릭 가능한 아이콘 버튼.
   * `dropdownPosition='lead'`: 무시됨.
   * 지정 시 `leadIcon`은 숨겨지고 이 버튼이 우선 표시됨.
   */
  buttonLeadIcon?: IconTypeWithFill;
  /**
   * 버튼 클릭 시 호출되는 콜백
   */
  onButtonClick?: () => void;
  /**
   * 버튼 비활성화 여부
   * @default false
   */
  buttonDisabled?: boolean;
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
  dropdownWidth,
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
  width,
  disabled = false,
  loading = false,
  className,
  onClear,
  showCount = false,
  maxLength,
  value,
  buttonTailIcon,
  buttonLeadIcon,
  onButtonClick,
  buttonDisabled = false,
  ...props
}, ref) => {
  const dropdownId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const openDropdown = useCallback(() => {
    setIsOpen(true);
    const selectedIdx = dropdownOptions?.findIndex(opt => opt.value === dropdownValue) ?? -1;
    setFocusedIndex(selectedIdx >= 0 ? selectedIdx : 0);
  }, [dropdownOptions, dropdownValue]);

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
    setFocusedIndex(-1);
  }, []);
  const menuRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0, width: 0 });

  const { inputId, hasError, state, sizeConfig, styleConfig, iconColor } = useInputState({
    inputStyle,
    size,
    disabled,
    error,
    success,
  });

  const currentLength = typeof value === 'string' ? value.length : 0;

  const dropdownSizeConfig = DROPDOWN_SIZE_CONFIG[size];

  // Update menu position when open
  useLayoutEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      // `getBoundingClientRect()` is already viewport-relative.
      // 메뉴가 `position: fixed` + `document.body` portal이므로 scrollY/scrollX를
      // 더하면 안 됨. (이전 버그: Dialog 등 transform 선조 안에서 위치가 어긋남)
      setMenuPosition({
        top: rect.bottom + 4,
        left: rect.left,
        width: rect.width,
      });
    }
  }, [isOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const isOutsideTrigger = triggerRef.current && !triggerRef.current.contains(target);
      const isOutsideMenu = menuRef.current && !menuRef.current.contains(target);

      if (isOutsideTrigger && isOutsideMenu) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, closeDropdown]);

  // Find selected option (guard against undefined dropdownOptions)
  const selectedOption = dropdownOptions?.find(opt => opt.value === dropdownValue);

  // buttonTailIcon / buttonLeadIcon take precedence over decorative icons + clear button
  const showButtonTail = dropdownPosition === 'lead' && buttonTailIcon !== undefined;
  const showButtonLead = dropdownPosition === 'tail' && buttonLeadIcon !== undefined;
  // Determine if we should show icons (not when they conflict with dropdown position)
  const showLeadIcon = leadIcon && dropdownPosition !== 'lead' && !showButtonLead;
  const showTailIcon = tailIcon && dropdownPosition !== 'tail' && !showButtonTail;
  const hasClearButton = onClear !== undefined && value !== '' && value !== undefined && !showButtonTail;
  const isButtonDisabled = buttonDisabled || disabled || loading;

  useEffect(() => {
    if (isOpen && focusedIndex >= 0) {
      optionRefs.current[focusedIndex]?.focus();
    }
  }, [isOpen, focusedIndex]);


  const handleSelectOption = useCallback((optionValue: string) => {
    onDropdownChange?.(optionValue);
    closeDropdown();
    triggerRef.current?.focus();
  }, [onDropdownChange, closeDropdown]);

  const handleMenuKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!dropdownOptions) return;

    switch (e.key) {
      case 'ArrowDown': {
        e.preventDefault();
        setFocusedIndex(prev => (prev < dropdownOptions.length - 1 ? prev + 1 : 0));
        break;
      }
      case 'ArrowUp': {
        e.preventDefault();
        setFocusedIndex(prev => (prev > 0 ? prev - 1 : dropdownOptions.length - 1));
        break;
      }
      case 'Home': {
        e.preventDefault();
        setFocusedIndex(0);
        break;
      }
      case 'End': {
        e.preventDefault();
        setFocusedIndex(dropdownOptions.length - 1);
        break;
      }
      case 'Enter':
      case ' ': {
        e.preventDefault();
        if (focusedIndex >= 0 && focusedIndex < dropdownOptions.length) {
          handleSelectOption(dropdownOptions[focusedIndex].value);
        }
        break;
      }
      case 'Escape': {
        e.preventDefault();
        closeDropdown();
        triggerRef.current?.focus();
        break;
      }
    }
  }, [dropdownOptions, focusedIndex, handleSelectOption, closeDropdown]);

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
      // DismissableLayer: Radix modal Dialog 는 `disableOutsidePointerEvents: true`
      // 로 `body { pointer-events: none }` 을 걸고, 스택 상위 DismissableLayer 에만
      // `pointer-events: auto` 를 inline style 로 복원한다. document.body 로 portal
      // 된 우리 메뉴를 그냥 div 로 두면 pointer-events 가 계속 none 이라 옵션 클릭
      // 자체가 안 되고 cursor:pointer 도 안 먹는다. DismissableLayer 로 감싸면 본인이
      // 스택 layer 로 등록되면서 parent Dialog layer 보다 index 가 커져 pointer
      // events 가 복원되고, parent Dialog 의 "outside pointer" 판정에서도 이 서브
      // 트리 내부 클릭은 layer 내부로 취급되어 DS 의 onClick → onDropdownChange
      // 체인이 정상 동작. document.body portal 은 transform containing-block 이슈
      // 회피용으로 그대로 유지.
      <DismissableLayer
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
        onKeyDown={handleMenuKeyDown}
        onEscapeKeyDown={(e) => {
          // Dialog 등 상위 레이어로 ESC 가 버블링되어 Dialog 까지 같이 닫히는 것
          // 방지. DropdownInput 자체의 keydown 에서 이미 Escape 를 처리하지만
          // 스택 동작과 일관되게 중단.
          e.stopPropagation();
          closeDropdown();
          triggerRef.current?.focus();
        }}
      >
        {dropdownOptions.map((option, index) => (
          <div
            key={option.value}
            ref={(el) => { optionRefs.current[index] = el; }}
            role="option"
            tabIndex={-1}
            aria-selected={option.value === dropdownValue}
            className={cn(
              DROPDOWN_OPTION_BASE,
              dropdownSizeConfig.optionPadding,
              option.value === dropdownValue && DROPDOWN_OPTION_SELECTED,
              focusedIndex === index && 'bg-state-ghost-hover'
            )}
            onClick={() => handleSelectOption(option.value)}
          >
            {option.icon && (() => {
              const { iconType, isFill } = parseIconTypeWithFill(option.icon);
              return (
                <Icon
                  iconType={iconType}
                  isFill={isFill}
                  size={dropdownSizeConfig.iconSize}
                  color="default-subtle"
                />
              );
            })()}
            <span className={cn(DROPDOWN_OPTION_TEXT_BASE, dropdownSizeConfig.optionText)}>{option.label}</span>
          </div>
        ))}
      </DismissableLayer>,
      // 항상 document.body로 portal — 소속된 PortalContainerProvider가 Dialog 등
      // `transform` 선조를 가지면 `position: fixed`가 viewport가 아닌 transform된
      // 컨테이너 기준이 되어버리는 CSS containing-block 스펙 때문.
      document.body
    );
  };

  // Render dropdown trigger
  const renderDropdownTrigger = () => (
    <div className="relative flex-shrink-0">
      <button
        ref={triggerRef}
        type="button"
        id={dropdownId}
        disabled={disabled}
        onClick={() => !disabled && (isOpen ? closeDropdown() : openDropdown())}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            if (!isOpen) openDropdown();
          }
          if (e.key === 'Escape' && isOpen) {
            e.preventDefault();
            closeDropdown();
          }
        }}
        className={cn(
          DROPDOWN_TRIGGER_BASE,
          dropdownSizeConfig.triggerPadding,
          disabled && 'cursor-not-allowed opacity-50'
        )}
        style={dropdownWidth ? { width: dropdownWidth } : undefined}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {selectedOption?.icon && (() => {
          const { iconType, isFill } = parseIconTypeWithFill(selectedOption.icon);
          return (
            <Icon
              iconType={iconType}
              isFill={isFill}
              size={dropdownSizeConfig.iconSize}
              color={iconColor}
            />
          );
        })()}
        <span className={cn(
          selectedOption ? DROPDOWN_TRIGGER_TEXT_BASE : DROPDOWN_TRIGGER_PLACEHOLDER_BASE,
          dropdownSizeConfig.optionText
        )}>
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
        {/* Lead Dropdown */}
        {dropdownPosition === 'lead' && (
          <>
            {renderDropdownTrigger()}
            <div className={DROPDOWN_DIVIDER} />
          </>
        )}

        {/* Lead Icon */}
        {showLeadIcon && leadIcon && (
          <div className="padding-l-8">
            {(() => {
              const { iconType, isFill } = parseIconTypeWithFill(leadIcon);
              return (
                <Icon
                  iconType={iconType}
                  isFill={isFill}
                  size={SIZE_CONFIG[size].iconSize}
                  color={iconColor}
                  className="flex-shrink-0"
                />
              );
            })()}
          </div>
        )}

        {/* Clickable lead button icon (tail-dropdown variant) */}
        {showButtonLead && buttonLeadIcon && (
          <div className="padding-l-8">
            {(() => {
              const { iconType, isFill } = parseIconTypeWithFill(buttonLeadIcon);
              return (
                <button
                  type="button"
                  onClick={isButtonDisabled ? undefined : onButtonClick}
                  disabled={isButtonDisabled}
                  tabIndex={isButtonDisabled ? -1 : 0}
                  aria-label="Action button"
                  className={cn(
                    'flex-shrink-0 flex items-center justify-center rounded-xs transition-colors',
                    isButtonDisabled
                      ? 'cursor-not-allowed'
                      : 'cursor-pointer hover:bg-state-ghost-hover',
                  )}
                >
                  <Icon
                    iconType={iconType}
                    isFill={isFill}
                    size={SIZE_CONFIG[size].iconSize}
                    color={isButtonDisabled ? 'default-disabled' : iconColor}
                  />
                </button>
              );
            })()}
          </div>
        )}

        {/* Input Field Container */}
        <div className={cn('flex-1 flex items-center ds-gap-6 min-w-0 overflow-hidden', sizeConfig.padding)}>
          {/* Input Field */}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled || loading}
            required={required}
            className={inputClassName}
            value={value}
            maxLength={maxLength}
            autoComplete="off"
            aria-invalid={hasError}
            aria-busy={loading || undefined}
            aria-describedby={caption || error || success ? `${inputId}-caption` : undefined}
            {...props}
          />

          {/* Tail slot: Spinner takes precedence when loading */}
          {loading ? (
            <Spinner size={SIZE_CONFIG[size].iconSize} color={iconColor} />
          ) : (
            <>
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
              {showTailIcon && !hasClearButton && tailIcon && (() => {
                const { iconType, isFill } = parseIconTypeWithFill(tailIcon);
                return (
                  <Icon
                    iconType={iconType}
                    isFill={isFill}
                    size={SIZE_CONFIG[size].iconSize}
                    color={iconColor}
                    className="flex-shrink-0"
                  />
                );
              })()}

              {/* Clickable tail button icon (lead-dropdown variant) */}
              {showButtonTail && buttonTailIcon && (() => {
                const { iconType, isFill } = parseIconTypeWithFill(buttonTailIcon);
                return (
                  <button
                    type="button"
                    onClick={isButtonDisabled ? undefined : onButtonClick}
                    disabled={isButtonDisabled}
                    tabIndex={isButtonDisabled ? -1 : 0}
                    aria-label="Action button"
                    className={cn(
                      'flex-shrink-0 flex items-center justify-center rounded-xs transition-colors',
                      isButtonDisabled
                        ? 'cursor-not-allowed'
                        : 'cursor-pointer hover:bg-state-ghost-hover',
                    )}
                  >
                    <Icon
                      iconType={iconType}
                      isFill={isFill}
                      size={SIZE_CONFIG[size].iconSize}
                      color={isButtonDisabled ? 'default-disabled' : iconColor}
                    />
                  </button>
                );
              })()}
            </>
          )}

          {showCount && maxLength !== undefined && (
            <span className={cn(INPUT_COUNT_STYLE, 'flex-shrink-0')}>{currentLength}/{maxLength}</span>
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
