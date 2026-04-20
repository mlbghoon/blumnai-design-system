import { useState, useCallback, useMemo } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { addMonths } from 'date-fns';

import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverAnchor } from '../../popover/Popover';
import { InputWrapper } from '../../input/shared/InputWrapper';
import { Icon } from '../../icons/Icon';
import { MonthInput } from '../components/MonthInput';
import { QuickPresets } from '../components/QuickPresets';
import { MONTHS_KO, MONTHS_EN, isMonthDisabled as checkMonthDisabled } from '../utils';
import { useControllableOpen } from '../hooks/useControllableOpen';
import type { QuickPreset } from '../DatePicker.types';
import type { MonthPickerProps, MonthPickerPreset } from './MonthPicker.types';

const getDefaultPresets = (): MonthPickerPreset[] => {
  const now = new Date();
  const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  return [
    { label: '이번 달', getValue: () => new Date(now.getFullYear(), now.getMonth(), 1) },
    { label: '지난 달', getValue: () => addMonths(firstOfMonth, -1) },
    { label: '3개월 전', getValue: () => addMonths(firstOfMonth, -3) },
    { label: '6개월 전', getValue: () => addMonths(firstOfMonth, -6) },
    { label: '작년 이번 달', getValue: () => addMonths(firstOfMonth, -12) },
  ];
};

const findMatchingMonthPresetIndex = (
  presets: MonthPickerPreset[],
  value: Date | undefined,
): number => {
  if (!value) return -1;
  const ym = value.getFullYear() * 12 + value.getMonth();
  return presets.findIndex((p) => {
    const pv = p.getValue();
    return pv.getFullYear() * 12 + pv.getMonth() === ym;
  });
};

export const MonthPicker = ({
  value,
  onChange,
  minDate,
  maxDate,
  disabledFuture = false,
  locale = 'ko',
  label,
  labelPosition,
  labelWidth,
  error,
  supportText,
  className,
  width,
  disabled = false,
  showQuickPresets = false,
  presets,
  size = 'sm',
  pickerOnly = false,
  showActions = false,
  open: openProp,
  onOpenChange,
  trigger,
}: MonthPickerProps) => {
  const [open, setOpen] = useControllableOpen({ open: openProp, onOpenChange });
  const [viewYear, setViewYear] = useState(() => {
    if (value) return value.getFullYear();
    return new Date().getFullYear();
  });
  const [stagedValue, setStagedValue] = useState<Date | undefined>(value);

  const hasError = error === true || (typeof error === 'string' && error.length > 0);
  const displayValue = showActions ? stagedValue : value;

  const monthNames = locale === 'ko' ? MONTHS_KO : MONTHS_EN;

  const disabledOpts = useMemo(
    () => ({ disabledFuture, minDate, maxDate }),
    [disabledFuture, minDate, maxDate],
  );

  const activePresets = useMemo(
    () => (showQuickPresets ? (presets ?? getDefaultPresets()) : []),
    [showQuickPresets, presets],
  );

  const selectedPresetIndex = useMemo(
    () => (showQuickPresets ? findMatchingMonthPresetIndex(activePresets, displayValue) : -1),
    [showQuickPresets, activePresets, displayValue],
  );

  const handleMonthClick = useCallback((month: number) => {
    const selected = new Date(viewYear, month, 1);
    if (showActions) {
      setStagedValue(selected);
      return;
    }
    onChange?.(selected);
    setOpen(false);
  }, [viewYear, onChange, showActions, setOpen]);

  const handlePresetSelect = useCallback((preset: QuickPreset) => {
    const date = preset.getValue() as Date;
    if (showActions) {
      setStagedValue(date);
      setViewYear(date.getFullYear());
      return;
    }
    onChange?.(date);
    setOpen(false);
  }, [onChange, showActions, setOpen]);

  const handleInputChange = useCallback((date: Date | undefined) => {
    onChange?.(date as Date);
    if (date) setViewYear(date.getFullYear());
  }, [onChange]);

  const handleApply = useCallback(() => {
    if (stagedValue) onChange?.(stagedValue);
    setOpen(false);
  }, [onChange, stagedValue, setOpen]);

  const handleCancel = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const handleOpenChange = useCallback((nextOpen: boolean) => {
    if (nextOpen) {
      setStagedValue(value);
      if (value) setViewYear(value.getFullYear());
    }
    setOpen(nextOpen);
  }, [value, setOpen]);

  const toggleOpen = useCallback(() => setOpen(!open), [open, setOpen]);

  const slotTrigger = useMemo(
    () => (trigger ? <Slot onClick={toggleOpen}>{trigger}</Slot> : null),
    [trigger, toggleOpen],
  );

  const isSelected = (idx: number) =>
    displayValue?.getFullYear() === viewYear && displayValue?.getMonth() === idx;

  const popoverContent = (
    <PopoverContent
          align="start"
          sideOffset={4}
          className={cn(
            'z-[100] padding-16 bg-card border-default rounded-lg shadow-modal-sm',
            showQuickPresets && 'flex padding-0',
          )}
          style={showQuickPresets ? undefined : { width: 280 }}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setOpen(false);
          }}
        >
          {showQuickPresets && (
            <QuickPresets
              presets={activePresets as QuickPreset[]}
              onSelect={handlePresetSelect}
              selectedIndex={selectedPresetIndex}
              disabled={disabled}
            />
          )}
          <div className={cn('flex flex-col ds-gap-16', showQuickPresets && 'padding-16')} style={{ width: 248 }}>
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setViewYear((y) => y - 1)}
                className="flex items-center justify-center width-28 height-28 rounded-sm hover:bg-state-ghost-hover transition-colors"
              >
                <Icon iconType={['arrows', 'arrow-drop-left']} size={16} color="default" />
              </button>
              <span className="font-body size-sm line-height-leading-5 font-medium text-default">
                {viewYear}
              </span>
              <button
                type="button"
                onClick={() => setViewYear((y) => y + 1)}
                className="flex items-center justify-center width-28 height-28 rounded-sm hover:bg-state-ghost-hover transition-colors"
              >
                <Icon iconType={['arrows', 'arrow-drop-right']} size={16} color="default" />
              </button>
            </div>

            <div className="grid grid-cols-4 ds-gap-4">
              {monthNames.map((name, idx) => {
                const monthDisabled = checkMonthDisabled(viewYear, idx, disabledOpts);
                const selected = isSelected(idx);

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={monthDisabled}
                    onClick={() => handleMonthClick(idx)}
                    className={cn(
                      'height-32 rounded-sm font-body size-xs line-height-leading-4 transition-colors',
                      monthDisabled && 'text-hint cursor-not-allowed',
                      !monthDisabled && !selected && 'text-default hover:bg-state-ghost-hover cursor-pointer',
                      selected && 'bg-state-primary text-white-default font-medium',
                    )}
                  >
                    {name}
                  </button>
                );
              })}
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
                    'cursor-pointer border-0',
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
                    'cursor-pointer border-0',
                  )}
                >
                  적용
                </button>
              </div>
            )}
          </div>
        </PopoverContent>
  );

  if (trigger) {
    return (
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverAnchor asChild>{slotTrigger}</PopoverAnchor>
        {popoverContent}
      </Popover>
    );
  }

  return (
    <InputWrapper
      label={label}
      labelPosition={labelPosition}
      labelWidth={labelWidth}
      error={error}
      supportText={supportText}
      width={width}
      className={className}
    >
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverAnchor asChild>
          <div>
            <MonthInput
              value={value}
              onChange={handleInputChange}
              disabled={disabled}
              hasError={hasError}
              isOpen={open}
              size={size}
              pickerOnly={pickerOnly}
              onCalendarClick={() => !disabled && handleOpenChange(!open)}
            />
          </div>
        </PopoverAnchor>
        {popoverContent}
      </Popover>
    </InputWrapper>
  );
};

MonthPicker.displayName = 'MonthPicker';
