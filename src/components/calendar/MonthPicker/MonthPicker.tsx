import { useState, useCallback, useMemo } from 'react';
import { addMonths } from 'date-fns';

import { cn } from '../../../utils/cn';
import { Popover, PopoverContent, PopoverAnchor } from '../../popover/Popover';
import { InputWrapper } from '../../input/shared/InputWrapper';
import { Icon } from '../../icons/Icon';
import { QuickPresets } from '../components/QuickPresets';
import type { QuickPreset } from '../DatePicker.types';
import type { MonthPickerProps, MonthPickerPreset } from './MonthPicker.types';

const MONTHS_KO = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
const MONTHS_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const formatMonth = (date: Date | undefined): string => {
  if (!date) return '';
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}`;
};

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
  error,
  supportText,
  className,
  disabled = false,
  placeholder = 'YYYY.MM',
  showQuickPresets = false,
  presets,
}: MonthPickerProps) => {
  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear] = useState(() => {
    if (value) return value.getFullYear();
    return new Date().getFullYear();
  });

  const hasError = error === true || (typeof error === 'string' && error.length > 0);

  const monthNames = locale === 'ko' ? MONTHS_KO : MONTHS_EN;

  const activePresets = useMemo(
    () => (showQuickPresets ? (presets ?? getDefaultPresets()) : []),
    [showQuickPresets, presets],
  );

  const selectedPresetIndex = useMemo(
    () => (showQuickPresets ? findMatchingMonthPresetIndex(activePresets, value) : -1),
    [showQuickPresets, activePresets, value],
  );

  const isMonthDisabled = useCallback((year: number, month: number): boolean => {
    if (disabledFuture) {
      const now = new Date();
      if (year > now.getFullYear() || (year === now.getFullYear() && month > now.getMonth())) {
        return true;
      }
    }

    if (minDate) {
      if (year < minDate.getFullYear() || (year === minDate.getFullYear() && month < minDate.getMonth())) {
        return true;
      }
    }

    if (maxDate) {
      if (year > maxDate.getFullYear() || (year === maxDate.getFullYear() && month > maxDate.getMonth())) {
        return true;
      }
    }

    return false;
  }, [disabledFuture, minDate, maxDate]);

  const handleMonthClick = useCallback((month: number) => {
    const selected = new Date(viewYear, month, 1);
    onChange?.(selected);
    setOpen(false);
  }, [viewYear, onChange]);

  const handlePresetSelect = useCallback((preset: QuickPreset) => {
    const date = preset.getValue() as Date;
    onChange?.(date);
    setOpen(false);
  }, [onChange]);

  const handleOpenChange = useCallback((nextOpen: boolean) => {
    if (nextOpen && value) {
      setViewYear(value.getFullYear());
    }
    setOpen(nextOpen);
  }, [value]);

  const displayValue = formatMonth(value);

  const isSelected = (idx: number) =>
    value?.getFullYear() === viewYear && value?.getMonth() === idx;

  return (
    <InputWrapper
      label={label}
      error={error}
      supportText={supportText}
      className={className}
    >
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverAnchor asChild>
          <div
            role="button"
            tabIndex={disabled ? -1 : 0}
            aria-expanded={open}
            aria-disabled={disabled}
            onClick={() => !disabled && handleOpenChange(!open)}
            onKeyDown={(e) => {
              if (disabled) return;
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleOpenChange(!open);
              }
            }}
            className={cn(
              'flex w-full items-center justify-between',
              'height-36 padding-x-12 rounded-md',
              'font-body size-sm line-height-leading-5 text-default',
              'border-default bg-default',
              'transition-colors duration-150 cursor-pointer',
              'focus:outline-none focus:ring-2 focus:ring-[var(--border-highlight)]',
              hasError && 'border-destructive',
              disabled && 'cursor-not-allowed opacity-50 bg-muted',
            )}
          >
            <span className={cn(!displayValue && 'text-hint')}>
              {displayValue || placeholder}
            </span>
            <Icon
              iconType={['business', 'calendar']}
              size={16}
              color={disabled ? 'default-disabled' : 'default-subtle'}
              className="flex-shrink-0"
            />
          </div>
        </PopoverAnchor>
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
                className="flex items-center justify-center width-28 height-28 rounded-sm hover:bg-[var(--bg-state-ghost-hover)] transition-colors"
              >
                <Icon iconType={['arrows', 'arrow-drop-left']} size={16} color="default" />
              </button>
              <span className="font-body size-sm line-height-leading-5 font-medium text-default">
                {viewYear}
              </span>
              <button
                type="button"
                onClick={() => setViewYear((y) => y + 1)}
                className="flex items-center justify-center width-28 height-28 rounded-sm hover:bg-[var(--bg-state-ghost-hover)] transition-colors"
              >
                <Icon iconType={['arrows', 'arrow-drop-right']} size={16} color="default" />
              </button>
            </div>

            <div className="grid grid-cols-4 ds-gap-4">
              {monthNames.map((name, idx) => {
                const monthDisabled = isMonthDisabled(viewYear, idx);
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
                      !monthDisabled && !selected && 'text-default hover:bg-[var(--bg-state-ghost-hover)] cursor-pointer',
                      selected && 'bg-[var(--bg-state-primary)] text-[var(--text-on-color)] font-medium',
                    )}
                  >
                    {name}
                  </button>
                );
              })}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </InputWrapper>
  );
};

MonthPicker.displayName = 'MonthPicker';
