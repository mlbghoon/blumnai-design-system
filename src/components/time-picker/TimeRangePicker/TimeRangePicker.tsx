import { useState, useCallback, useEffect, useMemo, useId, forwardRef } from 'react';
import { cn } from '../../../utils/cn';
import { Popover, PopoverContent, PopoverAnchor } from '../../popover';
import { InputWrapper } from '../../input/shared/InputWrapper';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../tabs';
import { TimeRangeInput } from './TimeRangeInput';
import { TimePickerPanel } from '../shared/TimePickerPanel';
import { formatTimeValue } from '../shared/time-utils';
import type { TimeRangePickerProps, TimeRange, TimeValue, QuickRangeSelectOption } from '../time-picker.types';

const DEFAULT_QUICK_OPTIONS: QuickRangeSelectOption[] = [
  {
    label: 'Morning',
    value: { start: { hour: 9, minute: 0 }, end: { hour: 12, minute: 0 } },
  },
  {
    label: 'Afternoon',
    value: { start: { hour: 13, minute: 0 }, end: { hour: 17, minute: 0 } },
  },
  {
    label: 'Business Hours',
    value: { start: { hour: 9, minute: 0 }, end: { hour: 18, minute: 0 } },
  },
  {
    label: 'Full Day',
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
  className,
  onFocus,
  onBlur,
}, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('start');
  const inputId = useId();

  const hasError = error === true || (typeof error === 'string' && error.length > 0);
  const hasSuccess = success === true || (typeof success === 'string' && success.length > 0);

  const handleClockClick = useCallback(() => {
    if (!disabled) {
      setIsOpen(prev => !prev);
    }
  }, [disabled]);

  const handleOpenChange = useCallback((open: boolean) => {
    if (!disabled) {
      setIsOpen(open);
    }
  }, [disabled]);

  const handleQuickSelect = useCallback((option: QuickRangeSelectOption) => {
    onChange?.(option.value);
    setIsOpen(false);
  }, [onChange]);

  const handleInputChange = useCallback((newValue: TimeRange | undefined) => {
    onChange?.(newValue);
  }, [onChange]);

  const handleStartChange = useCallback((newStart: TimeValue) => {
    onChange?.({ start: newStart, end: value?.end });
  }, [onChange, value?.end]);

  const handleEndChange = useCallback((newEnd: TimeValue) => {
    onChange?.({ start: value?.start, end: newEnd });
  }, [onChange, value?.start]);

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
          className="w-auto padding-8"
        >
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList variant="segmented" size="sm">
              <TabsTrigger value="start">시작</TabsTrigger>
              <TabsTrigger value="end">종료</TabsTrigger>
            </TabsList>
            <TabsContent value="start">
              <TimePickerPanel
                value={value?.start}
                onChange={handleStartChange}
                timeFormat={timeFormat}
                showSeconds={showSeconds}
                disabled={disabled}
              />
            </TabsContent>
            <TabsContent value="end">
              <TimePickerPanel
                value={value?.end}
                onChange={handleEndChange}
                timeFormat={timeFormat}
                showSeconds={showSeconds}
                disabled={disabled}
              />
            </TabsContent>
          </Tabs>
          {showQuickSelect && (
            <div className="flex flex-wrap ds-gap-6 margin-t-8 padding-t-8 border-t border-default">
              {options.map((option, index) => {
                const isSelected = isRangeEqual(value, option.value);
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleQuickSelect(option)}
                    aria-pressed={isSelected}
                    className={cn(
                      'padding-x-10 padding-y-6 rounded-md',
                      'font-body size-sm line-height-leading-5',
                      isSelected
                        ? 'bg-state-soft text-basic-blue-strong'
                        : 'bg-state-ghost hover:bg-state-ghost-hover text-default',
                      'transition-colors duration-150',
                      'cursor-pointer border-0'
                    )}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          )}
        </PopoverContent>
      </Popover>
    </InputWrapper>
  );
});

TimeRangePicker.displayName = 'TimeRangePicker';
