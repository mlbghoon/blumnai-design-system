import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { addDays, addWeeks, addMonths, startOfDay, endOfDay, format } from 'date-fns';
import type { DateRange } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverAnchor, PopoverTrigger } from '../popover/Popover';
import { InputWrapper } from '../input/shared/InputWrapper';
import { Button } from '../button/Button';
import { Icon } from '../icons/Icon/Icon';
import { Calendar } from './Calendar';
import { DateInput, DateRangeInput, QuickPresets } from './components';
import { useControllableOpen } from './hooks/useControllableOpen';
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
  pickerOnly = false,
  open: openProp,
  onOpenChange,
  trigger,
  defaultMonth,
}: DatePickerProps) => {
  const [open, setOpen] = useControllableOpen({ open: openProp, onOpenChange });
  const [month, setMonth] = useState<Date>(value || defaultMonth || new Date());
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
  }, [showActions, value, onChange, setOpen]);

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
  }, [onChange, showActions, setOpen]);

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
  }, [onChange, showActions, setOpen]);

  const handleConfirm = useCallback(() => {
    onChange?.(stagedValue);
    setOpen(false);
  }, [onChange, stagedValue, setOpen]);

  const handleCancel = useCallback(() => {
    setStagedValue(snapshotRef.current);
    setOpen(false);
  }, [setOpen]);

  const handleOpenCalendar = useCallback(() => {
    if (!value) {
      setMonth(defaultMonth || new Date());
    }
    setOpen(true);
  }, [value, defaultMonth, setOpen]);

  const disabledMatcher = useMemo(() => {
    const matchers: Array<Date | { before: Date } | { after: Date }> = [];
    if (minDate) matchers.push({ before: minDate });
    if (maxDate) matchers.push({ after: maxDate });
    if (disabledDates) matchers.push(...disabledDates);
    return matchers.length > 0 ? matchers : undefined;
  }, [minDate, maxDate, disabledDates]);

  const popoverContent = (
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
  );

  if (trigger) {
    return (
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>{trigger}</PopoverTrigger>
        {popoverContent}
      </Popover>
    );
  }

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
              pickerOnly={pickerOnly}
              dateFormat={dateFormat}
              minDate={minDate}
              maxDate={maxDate}
              onCalendarClick={handleOpenCalendar}
            />
          </div>
        </PopoverAnchor>
        {popoverContent}
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
  pickerOnly = false,
  open: openProp,
  onOpenChange,
  trigger,
  defaultMonth,
  resetOnSelect = true,
}: DateRangePickerProps) => {
  const [open, setOpen] = useControllableOpen({ open: openProp, onOpenChange });
  const [month, setMonth] = useState<Date>(() => {
    const base = value?.from || defaultMonth || new Date();
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
  const prevOpenRef = useRef(false);
  const valueRef = useRef(value);
  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  const hasError = error === true || (typeof error === 'string' && error.length > 0);
  const hasSuccess = success === true || (typeof success === 'string' && success.length > 0);

  const effectivePresets = presets || DEFAULT_RANGE_PRESETS;
  // 항상 staged 값을 표시. 기본 모드에서도 부분 선택 (첫 클릭) 은 stagedValue 에만
  // 반영되고 부모 onChange 는 두 번째 클릭 (완성) 에서만 발생 — MonthRangePicker 와
  // 동일한 commit-on-completion 시맨틱.
  const displayValue = stagedValue;
  const selectedPresetIndex = useMemo(
    () => findMatchingPresetIndex(effectivePresets, displayValue, true),
    [effectivePresets, displayValue]
  );

  useEffect(() => {
    const wasOpen = prevOpenRef.current;
    prevOpenRef.current = open;
    if (open && !wasOpen) {
      // 팝오버가 열린 시점의 value 를 snapshot. 어떤 경로로 열렸든 (Radix trigger,
      // 외부 setOpen, 컨트롤드 prop) 일관되게 캡처되도록 useEffect 에서 처리한다.
      snapshotRef.current = valueRef.current;
      setStagedValue(valueRef.current);
    } else if (!open && wasOpen) {
      setSelectionPhase('idle');
      setStagedValue(valueRef.current);
    }
  }, [open]);

  const handleOpenChange = useCallback((nextOpen: boolean) => {
    if (!nextOpen && showActions) {
      // showActions: 사용자가 확인 버튼을 누르지 않고 닫은 경우 — 스테이지 폐기
      // (parent value 는 confirm 시점에만 갱신되므로 별도 revert 불필요하지만,
      // 기존 동작 호환을 위해 snapshot 으로 onChange 한 번 발생시킴.)
      onChange?.(snapshotRef.current);
    }
    // 기본 모드에서는 부분 선택 동안 onChange 가 발생하지 않으므로 닫힘 시 별도 revert 불필요.
    // stagedValue 는 useEffect 가 close 전환에서 valueRef.current 로 동기화.
    setOpen(nextOpen);
  }, [showActions, onChange, setOpen]);

  const handleSelect = useCallback((range: DateRange | undefined, triggerDate?: Date) => {
    // resetOnSelect: 팝오버를 새로 연 직후 (selectionPhase === 'idle') 에 이미
    // 완성된 범위가 있는 상태에서 클릭이 들어오면, RDP 기본 동작 (`addToRange` 가
    // 가까운 끝점을 확장) 대신 "새 범위 시작" 으로 강제 해석한다.
    //
    // 'idle' 게이트가 중요: RDP 는 빈 상태에서 첫 클릭에 `{from, to: date}` (단일일
    // 완성 범위) 를 만든다. 이때 phase 는 이미 'selecting-end' 로 진입했으므로
    // 두 번째 클릭은 override 를 타지 않고 RDP 기본 머지로 정상적으로 to 가 결정된다.
    let nextRange = range;
    if (
      resetOnSelect &&
      triggerDate &&
      selectionPhase === 'idle' &&
      stagedValue?.from &&
      stagedValue?.to
    ) {
      nextRange = { from: triggerDate, to: undefined };
    }

    // 부분 선택은 stagedValue 에만 반영. onChange 는 완성 시점 (= 두 번째 클릭) 에서만 발생.
    // showActions 모드는 onChange 를 confirm 버튼에서만 발생시키는 기존 동작 그대로 유지.
    setStagedValue(nextRange);

    if (!nextRange?.from) {
      setSelectionPhase('idle');
      return;
    }

    if (selectionPhase === 'idle') {
      // 첫 클릭 — staging only, no onChange
      setSelectionPhase('selecting-end');
    } else if (selectionPhase === 'selecting-end' && nextRange?.to) {
      // 두 번째 클릭 (완성) — 기본 모드에서 commit + close
      setSelectionPhase('idle');
      if (!showActions) {
        onChange?.(nextRange);
        setOpen(false);
      }
    }
  }, [onChange, selectionPhase, showActions, setOpen, resetOnSelect, stagedValue]);

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
  }, [onChange, showActions, setOpen]);

  const handleConfirm = useCallback(() => {
    onChange?.(stagedValue);
    setOpen(false);
  }, [onChange, stagedValue, setOpen]);

  const handleCancel = useCallback(() => {
    setStagedValue(snapshotRef.current);
    setOpen(false);
  }, [setOpen]);

  const handleOpenCalendar = useCallback(() => {
    if (!value?.from) {
      setMonth(defaultMonth || new Date());
    }
    setOpen(true);
  }, [value, defaultMonth, setOpen]);

  const disabledMatcher = useMemo(() => {
    const matchers: Array<Date | { before: Date } | { after: Date }> = [];
    if (minDate) matchers.push({ before: minDate });
    if (maxDate) matchers.push({ after: maxDate });
    if (disabledDates) matchers.push(...disabledDates);
    return matchers.length > 0 ? matchers : undefined;
  }, [minDate, maxDate, disabledDates]);

  const popoverContent = (
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
  );

  if (trigger) {
    return (
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>{trigger}</PopoverTrigger>
        {popoverContent}
      </Popover>
    );
  }

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
                pickerOnly={pickerOnly}
                dateFormat={dateFormat}
                minDate={minDate}
                maxDate={maxDate}
                onCalendarClick={handleOpenCalendar}
              />
            )}
          </div>
        </PopoverAnchor>
        {popoverContent}
      </Popover>
    </InputWrapper>
  );
};

DatePicker.displayName = 'DatePicker';
DateRangePicker.displayName = 'DateRangePicker';
