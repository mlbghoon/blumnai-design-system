import { useEffect, useCallback, useState, useRef, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Icon } from '../../icons/Icon/Icon';
import {
  SIZE_CONFIG,
  STYLE_CONFIG,
  STATE_CONFIG,
  INPUT_WRAPPER_BASE,
} from 'constants/input/Input/Input.constants';
import { useSegmentInput } from '../hooks/useSegmentInput';
import type { SegmentConfig } from '../hooks/useSegmentInput';
import { isOutOfBoundsMonth } from '../utils/bounds';

interface MonthInputProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  disabled?: boolean;
  hasError?: boolean;
  isOpen?: boolean;
  size?: 'sm' | 'lg';
  pickerOnly?: boolean;
  /** 최소 허용 월(일 단위는 무시, 월 시작으로 정규화됨) */
  minDate?: Date;
  /** 최대 허용 월(일 단위는 무시, 월 시작으로 정규화됨) */
  maxDate?: Date;
  onFocus?: () => void;
  onBlur?: () => void;
  onCalendarClick?: () => void;
  className?: string;
}

const validateYear = (value: string): boolean => {
  const n = parseInt(value, 10);
  return n >= 1 && n <= 9999;
};

const validateMonth = (value: string): boolean => {
  const n = parseInt(value, 10);
  return n >= 1 && n <= 12;
};

const MONTH_SEGMENTS: SegmentConfig[] = [
  { name: 'year', maxLength: 4, placeholder: 'yyyy', validate: validateYear },
  { name: 'month', maxLength: 2, placeholder: 'mm', validate: validateMonth },
];

export const MonthInput = forwardRef<HTMLDivElement, MonthInputProps>(({
  value,
  onChange,
  disabled = false,
  hasError = false,
  isOpen = false,
  size = 'sm',
  pickerOnly = false,
  minDate,
  maxDate,
  onFocus,
  onBlur,
  onCalendarClick,
  className,
}, ref) => {
  // picker-level invalid = min/max 경계 밖. 훅 내부 format invalid와 externalInvalid로 합성됨
  const [boundsInvalid, setBoundsInvalid] = useState(false);
  const boundsInvalidRef = useRef(false);
  useEffect(() => { boundsInvalidRef.current = boundsInvalid; }, [boundsInvalid]);

  const handleComplete = useCallback((segValues: Record<string, string>) => {
    const year = parseInt(segValues.year, 10);
    const month = parseInt(segValues.month, 10);
    const newDate = new Date(year, month - 1, 1);

    if (isOutOfBoundsMonth(newDate, minDate, maxDate)) {
      setBoundsInvalid(true);
      return;
    }
    setBoundsInvalid(false);
    onChange?.(newDate);
  }, [onChange, minDate, maxDate]);

  const handleClear = useCallback(() => {
    setBoundsInvalid(false);
    onChange?.(undefined);
  }, [onChange]);

  // 훅 반환값 setValues를 wrappedBlur에서 쓰기 위한 ref (순환 의존 회피 — 아래 useEffect에서 할당)
  const setValuesRef = useRef<(v: Record<string, string>) => void>(() => {});

  // 포커스가 완전 이탈할 때(hook이 onBlurProp 호출) invalid 상태라면 value prop 기준으로 리셋
  const wrappedBlur = useCallback(() => {
    if (boundsInvalidRef.current) {
      if (value) {
        setValuesRef.current({
          year: String(value.getFullYear()),
          month: String(value.getMonth() + 1).padStart(2, '0'),
        });
      } else {
        setValuesRef.current({ year: '', month: '' });
      }
      setBoundsInvalid(false);
    }
    onBlur?.();
  }, [onBlur, value]);

  const {
    values,
    activeSegment,
    refs,
    setValues,
    handleChange,
    handleKeyDown,
    handleFocus: hookHandleFocus,
    handleBlur: hookHandleBlur,
    handleAreaClick,
    hasInvalidDate,
  } = useSegmentInput({
    segments: MONTH_SEGMENTS,
    onComplete: handleComplete,
    onClear: handleClear,
    onFocus,
    onBlur: wrappedBlur,
    externalInvalid: boundsInvalid,
  });

  // wrappedBlur에서 참조할 수 있도록 훅의 setValues를 ref에 동기화
  useEffect(() => { setValuesRef.current = setValues; }, [setValues]);

  useEffect(() => {
    if (value) {
      setValues({
        year: String(value.getFullYear()),
        month: String(value.getMonth() + 1).padStart(2, '0'),
      });
    } else {
      setValues({ year: '', month: '' });
    }
    // value 변경 시 picker-level invalid 상태도 함께 리셋
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBoundsInvalid(false);
  }, [value, setValues]);

  const sizeConfig = SIZE_CONFIG[size];
  const styleConfig = STYLE_CONFIG['default'];
  const showError = hasError || hasInvalidDate;
  const state = disabled ? 'disabled' : showError ? 'error' : 'default';
  const stateConfig = STATE_CONFIG[state];
  const iconColor = disabled ? 'default-disabled' : showError ? 'destructive' : 'default-subtle';

  const wrapperClassName = cn(
    INPUT_WRAPPER_BASE,
    sizeConfig.container,
    sizeConfig.paddingWithTailIcon,
    sizeConfig.gap,
    styleConfig.base,
    !disabled && !showError && !isOpen && styleConfig.focus,
    state === 'disabled' && STATE_CONFIG.disabled.bg,
    state === 'error' && 'border-destructive',
    isOpen && !showError && 'border-strong shadow-component-input-focus',
    disabled ? 'cursor-not-allowed' : pickerOnly ? 'cursor-pointer' : 'cursor-text',
    className
  );

  const handleCalendarIconClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!disabled) {
      onCalendarClick?.();
    }
  }, [disabled, onCalendarClick]);

  const renderSegment = (segmentName: string) => {
    const config = MONTH_SEGMENTS.find(s => s.name === segmentName)!;
    const segmentValue = values[segmentName];
    const isActive = activeSegment === segmentName;

    return (
      <input
        key={segmentName}
        ref={refs[segmentName] as React.RefObject<HTMLInputElement>}
        type="text"
        inputMode={pickerOnly ? 'none' : 'numeric'}
        value={segmentValue}
        placeholder={config.placeholder}
        disabled={disabled}
        readOnly={pickerOnly}
        onChange={pickerOnly ? undefined : (e) => handleChange(segmentName, e.target.value)}
        onKeyDown={pickerOnly ? undefined : (e) => handleKeyDown(segmentName, e)}
        onFocus={pickerOnly ? undefined : () => hookHandleFocus(segmentName)}
        onBlur={pickerOnly ? undefined : () => hookHandleBlur(segmentName)}
        className={cn(
          'bg-transparent border-0 outline-none text-center font-body',
          sizeConfig.text,
          'letter-spacing-tracking-tight',
          segmentValue ? stateConfig.text : 'text-hint',
          'rounded-2xs padding-x-2',
          !pickerOnly && isActive && 'bg-state-ghost-hover',
          disabled && 'cursor-not-allowed',
          pickerOnly && 'cursor-pointer caret-transparent'
        )}
        style={{
          width: config.maxLength === 4 ? '40px' : '24px',
          height: '20px',
        }}
      />
    );
  };

  return (
    <div ref={ref} className={wrapperClassName}>
      <div
        className="flex items-center ds-gap-2 flex-1 min-w-0"
        onClick={pickerOnly ? handleCalendarIconClick : handleAreaClick}
      >
        {renderSegment('year')}
        <span className="text-hint size-sm">.</span>
        {renderSegment('month')}
      </div>
      <button
        type="button"
        disabled={disabled}
        onClick={handleCalendarIconClick}
        className={cn(
          'flex-shrink-0 flex items-center justify-center',
          'hover:bg-state-ghost-hover rounded-xs transition-colors',
          disabled ? 'cursor-not-allowed' : 'cursor-pointer'
        )}
      >
        <Icon
          iconType={['business', 'calendar']}
          size={sizeConfig.iconSize}
          color={iconColor}
        />
      </button>
    </div>
  );
});

MonthInput.displayName = 'MonthInput';
