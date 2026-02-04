import { useState, useCallback, useMemo, useEffect } from 'react';
import { addDays, addWeeks, addMonths, startOfDay, endOfDay } from 'date-fns';
import type { DateRange } from 'react-day-picker';

import { cn } from '../../utils/cn';
import { Popover, PopoverContent, PopoverAnchor } from '../popover/Popover';
import { InputWrapper } from '../input/shared/InputWrapper';
import { Calendar } from './Calendar';
import { DateInput, DateRangeInput, QuickPresets } from './components';
import type {
  DatePickerProps,
  DateRangePickerProps,
  QuickPreset,
} from './DatePicker.types';

const DEFAULT_SINGLE_PRESETS: QuickPreset[] = [
  { label: '오늘', getValue: () => new Date() },
  { label: '어제', getValue: () => addDays(new Date(), -1) },
  { label: '1주 전', getValue: () => addWeeks(new Date(), -1) },
  { label: '1개월 전', getValue: () => addMonths(new Date(), -1) },
];

const DEFAULT_RANGE_PRESETS: QuickPreset[] = [
  { label: '오늘', getValue: () => ({ from: startOfDay(new Date()), to: endOfDay(new Date()) }) },
  { label: '어제', getValue: () => ({ from: startOfDay(addDays(new Date(), -1)), to: endOfDay(addDays(new Date(), -1)) }) },
  { label: '최근 7일', getValue: () => ({ from: addDays(new Date(), -6), to: new Date() }) },
  { label: '최근 30일', getValue: () => ({ from: addDays(new Date(), -29), to: new Date() }) },
  { label: '최근 3개월', getValue: () => ({ from: addMonths(new Date(), -3), to: new Date() }) },
  { label: '최근 6개월', getValue: () => ({ from: addMonths(new Date(), -6), to: new Date() }) },
  { label: '최근 1년', getValue: () => ({ from: addMonths(new Date(), -12), to: new Date() }) },
];

const findMatchingPresetIndex = (
  presets: QuickPreset[],
  value: Date | DateRange | undefined,
  isRange: boolean
): number => {
  if (!value) return -1;

  return presets.findIndex((preset) => {
    const presetValue = preset.getValue();

    if (isRange) {
      const rangeValue = value as DateRange;
      const rangePreset = presetValue as DateRange;
      if (!rangeValue.from || !rangePreset.from) return false;

      const fromMatch = rangeValue.from.toDateString() === rangePreset.from.toDateString();
      const toMatch =
        (!rangeValue.to && !rangePreset.to) ||
        (rangeValue.to && rangePreset.to && rangeValue.to.toDateString() === rangePreset.to.toDateString());

      return fromMatch && toMatch;
    } else {
      const dateValue = value as Date;
      const datePreset = presetValue as Date;
      return dateValue.toDateString() === datePreset.toDateString();
    }
  });
};

/**
 * 단일 날짜 선택 컴포넌트
 */
export const DatePicker = ({
  datePickerStyle = 'default',
  size = 'sm',
  label,
  required = false,
  supportText,
  caption,
  error,
  success,
  width,
  disabled = false,
  className,
  minDate,
  maxDate,
  disabledDates,
  locale,
  showQuickPresets = false,
  align = 'start',
  captionLayout = 'month-centered',
  dateFormat = 'yyyy.MM.dd',
  value,
  onChange,
  presets,
}: DatePickerProps) => {
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState<Date>(value || new Date());

  const hasError = error === true || (typeof error === 'string' && error.length > 0);
  const hasSuccess = success === true || (typeof success === 'string' && success.length > 0);

  const effectivePresets = presets || DEFAULT_SINGLE_PRESETS;
  const selectedPresetIndex = useMemo(
    () => findMatchingPresetIndex(effectivePresets, value, false),
    [effectivePresets, value]
  );

  const handleSelect = useCallback((date: Date | undefined) => {
    onChange?.(date);
    if (date) {
      setMonth(date);
      setOpen(false);
    }
  }, [onChange]);

  const handleInputChange = useCallback((date: Date | undefined) => {
    onChange?.(date);
    if (date) {
      setMonth(date);
    }
  }, [onChange]);

  const handlePresetSelect = useCallback((preset: QuickPreset) => {
    const date = preset.getValue() as Date;
    onChange?.(date);
    setMonth(date);
    setOpen(false);
  }, [onChange]);

  const handleOpenCalendar = useCallback(() => {
    if (!value) {
      setMonth(new Date());
    }
    setOpen(true);
  }, [value]);

  const disabledMatcher = useMemo(() => {
    const matchers: Array<Date | { before: Date } | { after: Date }> = [];
    if (minDate) matchers.push({ before: minDate });
    if (maxDate) matchers.push({ after: maxDate });
    if (disabledDates) matchers.push(...disabledDates);
    return matchers.length > 0 ? matchers : undefined;
  }, [minDate, maxDate, disabledDates]);

  return (
    <InputWrapper
      label={label}
      required={required}
      supportText={supportText}
      caption={caption}
      error={error}
      success={success}
      width={width}
      className={className}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverAnchor asChild>
          <div>
            <DateInput
              datePickerStyle={datePickerStyle}
              size={size}
              value={value}
              onChange={handleInputChange}
              disabled={disabled}
              hasError={hasError}
              hasSuccess={hasSuccess}
              isOpen={open}
              dateFormat={dateFormat}
              onCalendarClick={handleOpenCalendar}
            />
          </div>
        </PopoverAnchor>
        <PopoverContent
          className={cn('w-auto ![padding:0] overflow-hidden', showQuickPresets && 'flex')}
          align={align}
        >
          {showQuickPresets && (
            <QuickPresets
              presets={effectivePresets}
              onSelect={handlePresetSelect}
              selectedIndex={selectedPresetIndex}
            />
          )}
          <Calendar
            mode="single"
            selected={value}
            onSelect={handleSelect}
            month={month}
            onMonthChange={setMonth}
            disabled={disabledMatcher}
            locale={locale}
            calendarStyle="default"
            captionLayout={captionLayout}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </InputWrapper>
  );
};

/**
 * 날짜 범위 선택 컴포넌트
 */
export const DateRangePicker = ({
  datePickerStyle = 'default',
  size = 'sm',
  label,
  required = false,
  supportText,
  caption,
  error,
  success,
  width,
  disabled = false,
  className,
  minDate,
  maxDate,
  disabledDates,
  locale,
  showQuickPresets = false,
  align = 'start',
  captionLayout = 'month-centered',
  dateFormat = 'yyyy.MM.dd',
  value,
  onChange,
  presets,
  numberOfMonths = 2,
}: DateRangePickerProps) => {
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState<Date>(value?.from || new Date());
  const [selectionPhase, setSelectionPhase] = useState<'idle' | 'selecting-end'>('idle');

  const hasError = error === true || (typeof error === 'string' && error.length > 0);
  const hasSuccess = success === true || (typeof success === 'string' && success.length > 0);

  const effectivePresets = presets || DEFAULT_RANGE_PRESETS;
  const selectedPresetIndex = useMemo(
    () => findMatchingPresetIndex(effectivePresets, value, true),
    [effectivePresets, value]
  );

  useEffect(() => {
    if (!open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectionPhase('idle');
    }
  }, [open]);

  const handleSelect = useCallback((range: DateRange | undefined) => {
    onChange?.(range);

    if (!range?.from) {
      setSelectionPhase('idle');
      return;
    }

    if (selectionPhase === 'idle') {
      setSelectionPhase('selecting-end');
    } else if (selectionPhase === 'selecting-end' && range?.to) {
      setOpen(false);
      setSelectionPhase('idle');
    }
  }, [onChange, selectionPhase]);

  const handleInputChange = useCallback((range: DateRange | undefined) => {
    onChange?.(range);
    if (range?.from) {
      setMonth(range.from);
    }
  }, [onChange]);

  const handlePresetSelect = useCallback((preset: QuickPreset) => {
    const range = preset.getValue() as DateRange;
    onChange?.(range);
    if (range.from) {
      setMonth(range.from);
    }
    setOpen(false);
  }, [onChange]);

  const handleOpenCalendar = useCallback(() => {
    if (!value?.from) {
      setMonth(new Date());
    }
    setOpen(true);
  }, [value]);

  const disabledMatcher = useMemo(() => {
    const matchers: Array<Date | { before: Date } | { after: Date }> = [];
    if (minDate) matchers.push({ before: minDate });
    if (maxDate) matchers.push({ after: maxDate });
    if (disabledDates) matchers.push(...disabledDates);
    return matchers.length > 0 ? matchers : undefined;
  }, [minDate, maxDate, disabledDates]);

  return (
    <InputWrapper
      label={label}
      required={required}
      supportText={supportText}
      caption={caption}
      error={error}
      success={success}
      width={width}
      className={className}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverAnchor asChild>
          <div>
            <DateRangeInput
              datePickerStyle={datePickerStyle}
              size={size}
              value={value}
              onChange={handleInputChange}
              disabled={disabled}
              hasError={hasError}
              hasSuccess={hasSuccess}
              isOpen={open}
              dateFormat={dateFormat}
              onCalendarClick={handleOpenCalendar}
            />
          </div>
        </PopoverAnchor>
        <PopoverContent
          className={cn('w-auto ![padding:0] overflow-hidden', showQuickPresets && 'flex')}
          align={align}
        >
          {showQuickPresets && (
            <QuickPresets
              presets={effectivePresets}
              onSelect={handlePresetSelect}
              selectedIndex={selectedPresetIndex}
            />
          )}
          <Calendar
            mode="range"
            selected={value}
            onSelect={handleSelect}
            month={month}
            onMonthChange={setMonth}
            numberOfMonths={numberOfMonths}
            disabled={disabledMatcher}
            locale={locale}
            calendarStyle="default"
            captionLayout={captionLayout}
            showOutsideDays={false}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </InputWrapper>
  );
};

DatePicker.displayName = 'DatePicker';
DateRangePicker.displayName = 'DateRangePicker';
