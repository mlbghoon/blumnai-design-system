import { useEffect, useCallback, useRef, forwardRef } from 'react';
import { cn } from '../../../utils/cn';
import { Icon } from '../../icons/Icon/Icon';
import {
  SIZE_CONFIG,
  STYLE_CONFIG,
  STATE_CONFIG,
  INPUT_WRAPPER_BASE,
} from 'constants/input/Input/Input.constants';
import { useSegmentInput } from '../hooks/useSegmentInput';
import type { SegmentConfig } from '../hooks/useSegmentInput';
import type { MonthRange } from '../MonthRangePicker/MonthRangePicker.types';

interface MonthRangeInputProps {
  value?: MonthRange;
  onChange?: (range: MonthRange) => void;
  disabled?: boolean;
  hasError?: boolean;
  isOpen?: boolean;
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

const MONTH_RANGE_SEGMENTS: SegmentConfig[] = [
  { name: 'fromYear', maxLength: 4, placeholder: 'yyyy', validate: validateYear },
  { name: 'fromMonth', maxLength: 2, placeholder: 'mm', validate: validateMonth },
  { name: 'toYear', maxLength: 4, placeholder: 'yyyy', validate: validateYear },
  { name: 'toMonth', maxLength: 2, placeholder: 'mm', validate: validateMonth },
];

const rangeToValues = (range: MonthRange | undefined): Record<string, string> => {
  return {
    fromYear: range?.from ? String(range.from.getFullYear()) : '',
    fromMonth: range?.from ? String(range.from.getMonth() + 1).padStart(2, '0') : '',
    toYear: range?.to ? String(range.to.getFullYear()) : '',
    toMonth: range?.to ? String(range.to.getMonth() + 1).padStart(2, '0') : '',
  };
};

export const MonthRangeInput = forwardRef<HTMLDivElement, MonthRangeInputProps>(({
  value,
  onChange,
  disabled = false,
  hasError = false,
  isOpen = false,
  onFocus,
  onBlur,
  onCalendarClick,
  className,
}, ref) => {
  const isInputFocused = useRef(false);

  const handleComplete = useCallback((segValues: Record<string, string>) => {
    const fy = parseInt(segValues.fromYear, 10);
    const fm = parseInt(segValues.fromMonth, 10);
    const ty = parseInt(segValues.toYear, 10);
    const tm = parseInt(segValues.toMonth, 10);

    let fromDate = new Date(fy, fm - 1, 1);
    let toDate = new Date(ty, tm - 1, 1);

    if (fromDate > toDate) {
      [fromDate, toDate] = [toDate, fromDate];
    }

    onChange?.({ from: fromDate, to: toDate });
  }, [onChange]);

  const handleClear = useCallback(() => {
    onChange?.({ from: undefined, to: undefined });
  }, [onChange]);

  const handleFocus = useCallback(() => {
    isInputFocused.current = true;
    onFocus?.();
  }, [onFocus]);

  const handleBlur = useCallback(() => {
    isInputFocused.current = false;
    onBlur?.();
  }, [onBlur]);

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
    segments: MONTH_RANGE_SEGMENTS,
    onComplete: handleComplete,
    onClear: handleClear,
    onFocus: handleFocus,
    onBlur: handleBlur,
  });

  useEffect(() => {
    if (!isInputFocused.current) {
      setValues(rangeToValues(value));
    }
  }, [value, setValues]);

  const sizeConfig = SIZE_CONFIG['sm'];
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
    disabled ? 'cursor-not-allowed' : 'cursor-text',
    className
  );

  const handleCalendarIconClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!disabled) {
      onCalendarClick?.();
    }
  }, [disabled, onCalendarClick]);

  const renderSegment = (segmentName: string) => {
    const config = MONTH_RANGE_SEGMENTS.find(s => s.name === segmentName)!;
    const segmentValue = values[segmentName];
    const isActive = activeSegment === segmentName;

    return (
      <input
        key={segmentName}
        ref={refs[segmentName] as React.RefObject<HTMLInputElement>}
        type="text"
        inputMode="numeric"
        value={segmentValue}
        placeholder={config.placeholder}
        disabled={disabled}
        onChange={(e) => handleChange(segmentName, e.target.value)}
        onKeyDown={(e) => handleKeyDown(segmentName, e)}
        onFocus={() => hookHandleFocus(segmentName)}
        onBlur={() => hookHandleBlur(segmentName)}
        className={cn(
          'bg-transparent border-0 outline-none text-center font-body',
          sizeConfig.text,
          'letter-spacing-tracking-tight',
          segmentValue ? stateConfig.text : 'text-hint',
          'rounded-2xs padding-x-2',
          isActive && 'bg-state-ghost-hover',
          disabled && 'cursor-not-allowed'
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
        className="flex items-center ds-gap-8 flex-1 min-w-0"
        onClick={handleAreaClick}
      >
        <div className="flex items-center ds-gap-2">
          {renderSegment('fromYear')}
          <span className="text-hint size-sm">.</span>
          {renderSegment('fromMonth')}
        </div>
        <span className="text-hint size-sm">~</span>
        <div className="flex items-center ds-gap-2">
          {renderSegment('toYear')}
          <span className="text-hint size-sm">.</span>
          {renderSegment('toMonth')}
        </div>
      </div>
      <button
        type="button"
        disabled={disabled}
        onClick={handleCalendarIconClick}
        className={cn(
          'flex-shrink-0 flex items-center justify-center',
          'hover:bg-state-ghost-hover rounded-xs transition-colors',
          disabled && 'cursor-not-allowed'
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

MonthRangeInput.displayName = 'MonthRangeInput';
