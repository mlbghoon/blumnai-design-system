import { useState, useCallback, useEffect, useMemo, useId, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverAnchor } from '../../popover';
import { InputWrapper } from '../../input/shared/InputWrapper';
import { TimeRangeInput } from './TimeRangeInput';
import { TimePickerPanel } from '../shared/TimePickerPanel';
import { formatTimeValue } from '../shared/time-utils';
import type { TimeRangePickerProps, TimeRange, TimeValue, QuickRangeSelectOption } from '../time-picker.types';

const DEFAULT_QUICK_OPTIONS: QuickRangeSelectOption[] = [
  {
    label: '오전',
    value: { start: { hour: 9, minute: 0 }, end: { hour: 12, minute: 0 } },
  },
  {
    label: '오후',
    value: { start: { hour: 13, minute: 0 }, end: { hour: 17, minute: 0 } },
  },
  {
    label: '업무시간',
    value: { start: { hour: 9, minute: 0 }, end: { hour: 18, minute: 0 } },
  },
  {
    label: '하루종일',
    value: { start: { hour: 0, minute: 0 }, end: { hour: 23, minute: 59 } },
  },
];

const timeToSeconds = (v: TimeValue): number =>
  v.hour * 3600 + v.minute * 60 + (v.second ?? 0);

const isRangeEqual = (a: TimeRange | undefined, b: TimeRange): boolean => {
  if (!a) return false;
  const startEq = a.start && b.start
    ? a.start.hour === b.start.hour && a.start.minute === b.start.minute && (a.start.second ?? 0) === (b.start.second ?? 0)
    : !a.start && !b.start;
  const endEq = a.end && b.end
    ? a.end.hour === b.end.hour && a.end.minute === b.end.minute && (a.end.second ?? 0) === (b.end.second ?? 0)
    : !a.end && !b.end;
  return !!startEq && !!endEq;
};

export const TimeRangePicker = forwardRef<HTMLDivElement, TimeRangePickerProps>(({
  value,
  onChange,
  name,
  onValidationError,
  label,
  labelPosition,
      labelWidth,
  required = false,
  supportText,
  caption,
  error,
  success,
  width,
  disabled = false,
  timeFormat = '24h',
  showSeconds = false,
  size = 'sm',
  timePickerStyle = 'default',
  placeholder,
  showQuickSelect = false,
  quickSelectOptions,
  align = 'start',
  showActions = false,
  minuteStep,
  secondStep,
  className,
  onFocus,
  onBlur,
}, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState<TimeRange | undefined>(value);
  const inputId = useId();

  const hasError = error === true || (typeof error === 'string' && error.length > 0);
  const hasSuccess = success === true || (typeof success === 'string' && success.length > 0);

  const handleClockClick = useCallback(() => {
    if (!disabled) {
      setDraft(value);
      setIsOpen(prev => !prev);
    }
  }, [disabled, value]);

  const handleOpenChange = useCallback((open: boolean) => {
    if (!disabled) {
      setIsOpen(open);
    }
  }, [disabled]);

  const handleQuickSelect = useCallback((option: QuickRangeSelectOption) => {
    if (showActions) {
      setDraft(option.value);
    } else {
      onChange?.(option.value);
      setIsOpen(false);
    }
  }, [onChange, showActions]);

  const handleInputChange = useCallback((newValue: TimeRange | undefined) => {
    onChange?.(newValue);
  }, [onChange]);

  const handleStartChange = useCallback((newStart: TimeValue) => {
    if (showActions) {
      setDraft(prev => ({ start: newStart, end: prev?.end }));
    } else {
      onChange?.({ start: newStart, end: value?.end });
    }
  }, [onChange, value?.end, showActions]);

  const handleEndChange = useCallback((newEnd: TimeValue) => {
    if (showActions) {
      setDraft(prev => ({ start: prev?.start, end: newEnd }));
    } else {
      onChange?.({ start: value?.start, end: newEnd });
    }
  }, [onChange, value?.start, showActions]);

  const handleApply = useCallback(() => {
    onChange?.(draft);
    setIsOpen(false);
  }, [onChange, draft]);

  const handleCancel = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (onValidationError) {
      if (value?.start && value?.end) {
        const isInvalid = timeToSeconds(value.start) >= timeToSeconds(value.end);
        onValidationError(isInvalid ? 'invalid-range' : null);
      } else {
        onValidationError(null);
      }
    }
  }, [value, onValidationError]);

  const options = useMemo(
    () => quickSelectOptions || DEFAULT_QUICK_OPTIONS,
    [quickSelectOptions]
  );

  const panelStartValue = showActions ? draft?.start : value?.start;
  const panelEndValue = showActions ? draft?.end : value?.end;

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
      {name && (
        <>
          <input type="hidden" name={`${name}-start`} value={formatTimeValue(value?.start, showSeconds)} />
          <input type="hidden" name={`${name}-end`} value={formatTimeValue(value?.end, showSeconds)} />
        </>
      )}
      <Popover open={isOpen} onOpenChange={handleOpenChange}>
        <PopoverAnchor asChild>
          <TimeRangeInput
            ref={ref}
            value={value}
            onChange={handleInputChange}
            timeFormat={timeFormat}
            showSeconds={showSeconds}
            disabled={disabled}
            hasError={hasError}
            hasSuccess={hasSuccess}
            isOpen={isOpen}
            size={size}
            timePickerStyle={timePickerStyle}
            placeholder={placeholder}
            onFocus={onFocus}
            onBlur={onBlur}
            onClockClick={handleClockClick}
          />
        </PopoverAnchor>

        <PopoverContent
          align={align}
          sideOffset={4}
          className="w-auto ![padding:0] overflow-hidden"
        >
          <div className="flex">
            {showQuickSelect && (
              <div className="flex flex-col ds-gap-4 padding-8 border-r-default">
                {options.map((option, index) => {
                  const compareValue = showActions ? draft : value;
                  const isSelected = isRangeEqual(compareValue, option.value);
                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleQuickSelect(option)}
                      aria-pressed={isSelected}
                      className={cn(
                        'padding-x-8 padding-y-4 rounded-xs text-left whitespace-nowrap',
                        'font-body size-sm line-height-leading-5 font-medium',
                        'transition-colors',
                        isSelected
                          ? 'bg-state-brand text-white-default hover:bg-state-brand-hover cursor-pointer'
                          : 'text-subtle hover:bg-state-ghost-hover cursor-pointer',
                        'border-0'
                      )}
                      style={{ height: '28px' }}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            )}
            <div className="flex flex-col ds-gap-8 padding-8">
              <div className="flex ds-gap-12">
                <div className="flex flex-col ds-gap-4">
                  <span className="size-xs text-muted font-medium font-body">시작</span>
                  <TimePickerPanel
                    value={panelStartValue}
                    onChange={handleStartChange}
                    timeFormat={timeFormat}
                    showSeconds={showSeconds}
                    disabled={disabled}
                    minuteStep={minuteStep}
                    secondStep={secondStep}
                  />
                </div>
                <div className="self-stretch border-r-default" />
                <div className="flex flex-col ds-gap-4">
                  <span className="size-xs text-muted font-medium font-body">종료</span>
                  <TimePickerPanel
                    value={panelEndValue}
                    onChange={handleEndChange}
                    timeFormat={timeFormat}
                    showSeconds={showSeconds}
                    disabled={disabled}
                    minuteStep={minuteStep}
                    secondStep={secondStep}
                  />
                </div>
              </div>
              {showActions && (
                <div className="flex justify-end ds-gap-8 padding-t-8">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className={cn(
                      'padding-x-12 padding-y-6 rounded-md',
                      'font-body size-sm line-height-leading-5 font-medium',
                      'text-default hover:bg-state-ghost-hover',
                      'transition-colors duration-150',
                      'cursor-pointer border-0'
                    )}
                  >
                    취소
                  </button>
                  <button
                    type="button"
                    onClick={handleApply}
                    className={cn(
                      'padding-x-12 padding-y-6 rounded-md',
                      'font-body size-sm line-height-leading-5 font-medium',
                      'bg-state-primary text-white-default hover:bg-state-primary-hover',
                      'transition-colors duration-150',
                      'cursor-pointer border-0'
                    )}
                  >
                    적용
                  </button>
                </div>
              )}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </InputWrapper>
  );
});

TimeRangePicker.displayName = 'TimeRangePicker';
