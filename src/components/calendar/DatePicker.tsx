import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { addDays, addWeeks, addMonths, startOfDay, endOfDay, format } from 'date-fns';
import type { DateRange } from 'react-day-picker';

import { cn } from '../../utils/cn';
import { Popover, PopoverContent, PopoverAnchor } from '../popover/Popover';
import { InputWrapper } from '../input/shared/InputWrapper';
import { Button } from '../button/Button';
import { Icon } from '../icons/Icon/Icon';
import { Calendar } from './Calendar';
import { DateInput, DateRangeInput, QuickPresets } from './components';
import {
  SIZE_CONFIG,
  STYLE_CONFIG,
  STATE_CONFIG,
  INPUT_WRAPPER_BASE,
} from '../../constants/input/Input/Input.constants';
import type {
  DatePickerProps,
  DateRangePickerProps,
  DateFormat,
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
/**
 * DatePicker 컴포넌트
 *
 * 캘린더 기반 날짜 선택 컴포넌트입니다. 빠른 선택 프리셋을 지원합니다.
 *
 * @example
 * <DatePicker value={date} onChange={setDate} label="날짜 선택" />
 */
export const DatePicker = ({
  datePickerStyle = 'default',
  size = 'sm',
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
  showActions = false,
  confirmLabel = '확인',
  cancelLabel = '취소',
}: DatePickerProps) => {
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState<Date>(value || new Date());
  const [stagedValue, setStagedValue] = useState<Date | undefined>(value);
  const snapshotRef = useRef<Date | undefined>(value);

  const hasError = error === true || (typeof error === 'string' && error.length > 0);
  const hasSuccess = success === true || (typeof success === 'string' && success.length > 0);

  const effectivePresets = presets || DEFAULT_SINGLE_PRESETS;
  const displayValue = showActions ? stagedValue : value;
  const selectedPresetIndex = useMemo(
    () => findMatchingPresetIndex(effectivePresets, displayValue, false),
    [effectivePresets, displayValue]
  );

  useEffect(() => {
    if (!open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStagedValue(value);
    }
  }, [open, value]);

  const handleOpenChange = useCallback((nextOpen: boolean) => {
    if (nextOpen) {
      snapshotRef.current = value;
      setStagedValue(value);
    } else if (showActions) {
      onChange?.(snapshotRef.current);
    }
    setOpen(nextOpen);
  }, [showActions, value, onChange]);

  const handleSelect = useCallback((date: Date | undefined) => {
    if (showActions) {
      setStagedValue(date);
      if (date) setMonth(date);
    } else {
      onChange?.(date);
      if (date) {
        setMonth(date);
        setOpen(false);
      }
    }
  }, [onChange, showActions]);

  const handleInputChange = useCallback((date: Date | undefined) => {
    onChange?.(date);
    if (date) {
      setMonth(date);
    }
  }, [onChange]);

  const handlePresetSelect = useCallback((preset: QuickPreset) => {
    const date = preset.getValue() as Date;
    if (showActions) {
      setStagedValue(date);
      setMonth(date);
    } else {
      onChange?.(date);
      setMonth(date);
      setOpen(false);
    }
  }, [onChange, showActions]);

  const handleConfirm = useCallback(() => {
    onChange?.(stagedValue);
    setOpen(false);
  }, [onChange, stagedValue]);

  const handleCancel = useCallback(() => {
    setStagedValue(snapshotRef.current);
    setOpen(false);
  }, []);

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
      labelPosition={labelPosition}
      labelWidth={labelWidth}
      required={required}
      supportText={supportText}
      caption={caption}
      error={error}
      success={success}
      width={width}
      className={className}
    >
      <Popover open={open} onOpenChange={handleOpenChange}>
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
          <div className={cn(showQuickPresets && 'flex')}>
            {showQuickPresets && (
              <QuickPresets
                presets={effectivePresets}
                onSelect={handlePresetSelect}
                selectedIndex={selectedPresetIndex}
              />
            )}
            <div>
              <Calendar
                mode="single"
                selected={displayValue}
                onSelect={handleSelect}
                month={month}
                onMonthChange={setMonth}
                disabled={disabledMatcher}
                locale={locale}
                calendarStyle="default"
                captionLayout={captionLayout}
                initialFocus
              />
              {showActions && (
                <div className="flex justify-end ds-gap-8 padding-x-12 padding-y-8 border-t border-default">
                  <Button size="sm" buttonStyle="ghost" onClick={handleCancel}>
                    {cancelLabel}
                  </Button>
                  <Button size="sm" buttonStyle="primary" onClick={handleConfirm}>
                    {confirmLabel}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </InputWrapper>
  );
};

interface CompactRangeTriggerProps {
  datePickerStyle: 'default' | 'shadow' | 'soft';
  size: 'sm' | 'lg';
  value?: DateRange;
  disabled: boolean;
  hasError: boolean;
  hasSuccess: boolean;
  isOpen: boolean;
  dateFormat: DateFormat;
  onClick: () => void;
}

const CompactRangeTrigger = ({
  datePickerStyle,
  size,
  value,
  disabled,
  hasError,
  hasSuccess,
  isOpen,
  dateFormat,
  onClick,
}: CompactRangeTriggerProps) => {
  const sizeConfig = SIZE_CONFIG[size];
  const styleConfig = STYLE_CONFIG[datePickerStyle];
  const state = disabled ? 'disabled' : hasError ? 'error' : hasSuccess ? 'success' : 'default';
  const stateConfig = STATE_CONFIG[state];
  const iconColor = disabled ? 'default-disabled' : hasError ? 'destructive' : hasSuccess ? 'success' : 'default-subtle';

  const formatDate = (date: Date | undefined) => {
    if (!date) return '';
    return format(date, dateFormat);
  };

  const displayText = useMemo(() => {
    if (!value?.from) return '';
    const fromText = formatDate(value.from);
    const toText = value.to ? formatDate(value.to) : '';
    if (!toText) return fromText;
    return `${fromText} ~ ${toText}`;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value?.from, value?.to, dateFormat]);

  const wrapperClassName = cn(
    INPUT_WRAPPER_BASE,
    sizeConfig.container,
    sizeConfig.paddingWithTailIcon,
    sizeConfig.gap,
    styleConfig.base,
    !disabled && !hasError && !isOpen && styleConfig.focus,
    state === 'disabled' && STATE_CONFIG.disabled.bg,
    state === 'error' && 'border-destructive',
    state === 'success' && 'border-success',
    isOpen && !hasError && 'border-strong shadow-component-input-focus',
    disabled ? 'cursor-not-allowed' : 'cursor-pointer',
  );

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={wrapperClassName}
    >
      <span
        className={cn(
          'flex-1 min-w-0 truncate text-left font-body',
          sizeConfig.text,
          displayText ? stateConfig.text : 'text-hint',
        )}
      >
        {displayText || dateFormat.toLowerCase()}
      </span>
      <Icon
        iconType={['business', 'calendar']}
        size={sizeConfig.iconSize}
        color={iconColor}
        className="flex-shrink-0"
      />
    </button>
  );
};

/**
 * 날짜 범위 선택 컴포넌트
 */
/**
 * DateRangePicker 컴포넌트
 *
 * 시작일~종료일 범위를 선택하는 날짜 범위 선택 컴포넌트입니다.
 *
 * @example
 * <DateRangePicker value={range} onChange={setRange} label="기간 선택" />
 */
export const DateRangePicker = ({
  datePickerStyle = 'default',
  size = 'sm',
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
  showActions = false,
  confirmLabel = '확인',
  cancelLabel = '취소',
  triggerVariant = 'default',
}: DateRangePickerProps) => {
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState<Date>(() => {
    const base = value?.from || new Date();
    if (maxDate && numberOfMonths >= 2) {
      const baseMonth = base.getFullYear() * 12 + base.getMonth();
      const maxMonth = maxDate.getFullYear() * 12 + maxDate.getMonth();
      if (maxMonth <= baseMonth) {
        return addMonths(base, -1);
      }
    }
    return base;
  });
  const [selectionPhase, setSelectionPhase] = useState<'idle' | 'selecting-end'>('idle');
  const [stagedValue, setStagedValue] = useState<DateRange | undefined>(value);
  const snapshotRef = useRef<DateRange | undefined>(value);

  const hasError = error === true || (typeof error === 'string' && error.length > 0);
  const hasSuccess = success === true || (typeof success === 'string' && success.length > 0);

  const effectivePresets = presets || DEFAULT_RANGE_PRESETS;
  const displayValue = showActions ? stagedValue : value;
  const selectedPresetIndex = useMemo(
    () => findMatchingPresetIndex(effectivePresets, displayValue, true),
    [effectivePresets, displayValue]
  );

  useEffect(() => {
    if (!open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectionPhase('idle');
      setStagedValue(value);
    }
  }, [open, value]);

  const handleOpenChange = useCallback((nextOpen: boolean) => {
    if (nextOpen) {
      snapshotRef.current = value;
      setStagedValue(value);
    } else if (showActions) {
      onChange?.(snapshotRef.current);
    }
    setOpen(nextOpen);
  }, [showActions, value, onChange]);

  const handleSelect = useCallback((range: DateRange | undefined) => {
    if (showActions) {
      setStagedValue(range);

      if (!range?.from) {
        setSelectionPhase('idle');
        return;
      }

      if (selectionPhase === 'idle') {
        setSelectionPhase('selecting-end');
      } else if (selectionPhase === 'selecting-end' && range?.to) {
        setSelectionPhase('idle');
      }
    } else {
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
    }
  }, [onChange, selectionPhase, showActions]);

  const handleInputChange = useCallback((range: DateRange | undefined) => {
    onChange?.(range);
    if (range?.from) {
      setMonth(range.from);
    }
  }, [onChange]);

  const handlePresetSelect = useCallback((preset: QuickPreset) => {
    const range = preset.getValue() as DateRange;
    if (showActions) {
      setStagedValue(range);
      if (range.from) setMonth(range.from);
    } else {
      onChange?.(range);
      if (range.from) {
        setMonth(range.from);
      }
      setOpen(false);
    }
  }, [onChange, showActions]);

  const handleConfirm = useCallback(() => {
    onChange?.(stagedValue);
    setOpen(false);
  }, [onChange, stagedValue]);

  const handleCancel = useCallback(() => {
    setStagedValue(snapshotRef.current);
    setOpen(false);
  }, []);

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
      labelPosition={labelPosition}
      labelWidth={labelWidth}
      required={required}
      supportText={supportText}
      caption={caption}
      error={error}
      success={success}
      width={width}
      className={className}
    >
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverAnchor asChild>
          <div>
            {triggerVariant === 'compact' ? (
              <CompactRangeTrigger
                datePickerStyle={datePickerStyle}
                size={size}
                value={value}
                disabled={disabled}
                hasError={hasError}
                hasSuccess={hasSuccess}
                isOpen={open}
                dateFormat={dateFormat}
                onClick={handleOpenCalendar}
              />
            ) : (
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
            )}
          </div>
        </PopoverAnchor>
        <PopoverContent
          className={cn('w-auto ![padding:0] overflow-hidden', showQuickPresets && 'flex')}
          align={align}
        >
          <div className={cn(showQuickPresets && 'flex')}>
            {showQuickPresets && (
              <QuickPresets
                presets={effectivePresets}
                onSelect={handlePresetSelect}
                selectedIndex={selectedPresetIndex}
              />
            )}
            <div>
              <Calendar
                mode="range"
                selected={displayValue}
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
              {showActions && (
                <div className="flex justify-end ds-gap-8 padding-x-12 padding-y-8 border-t border-default">
                  <Button size="sm" buttonStyle="ghost" onClick={handleCancel}>
                    {cancelLabel}
                  </Button>
                  <Button size="sm" buttonStyle="primary" onClick={handleConfirm}>
                    {confirmLabel}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </InputWrapper>
  );
};

DatePicker.displayName = 'DatePicker';
DateRangePicker.displayName = 'DateRangePicker';
