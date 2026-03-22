import { useState, useCallback, useMemo } from 'react';
import { addMonths } from 'date-fns';

import { cn } from '../../../utils/cn';
import { Popover, PopoverContent, PopoverAnchor } from '../../popover/Popover';
import { InputWrapper } from '../../input/shared/InputWrapper';
import { Icon } from '../../icons/Icon';
import { QuickPresets } from '../components/QuickPresets';
import { MONTHS_KO, MONTHS_EN, formatYearMonth, isMonthDisabled as checkMonthDisabled } from '../utils';
import type { QuickPreset } from '../DatePicker.types';
import type { MonthRangePickerProps, MonthRange, MonthRangePreset } from './MonthRangePicker.types';

const formatMonthRange = (range: MonthRange | undefined): string => {
  if (!range?.from) return '';
  const fromStr = formatYearMonth(range.from);
  if (!range.to) return fromStr;
  return `${fromStr} ~ ${formatYearMonth(range.to)}`;
};

const getDefaultRangePresets = (): MonthRangePreset[] => {
  const now = new Date();
  const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  return [
    { label: '최근 3개월', getValue: () => ({ from: addMonths(firstOfMonth, -2), to: firstOfMonth }) },
    { label: '최근 6개월', getValue: () => ({ from: addMonths(firstOfMonth, -5), to: firstOfMonth }) },
    { label: '최근 1년', getValue: () => ({ from: addMonths(firstOfMonth, -11), to: firstOfMonth }) },
    { label: '올해', getValue: () => ({ from: new Date(now.getFullYear(), 0, 1), to: firstOfMonth }) },
    { label: '작년', getValue: () => ({ from: new Date(now.getFullYear() - 1, 0, 1), to: new Date(now.getFullYear() - 1, 11, 1) }) },
  ];
};

const findMatchingMonthRangePresetIndex = (
  presets: MonthRangePreset[],
  value: MonthRange | undefined,
): number => {
  if (!value?.from) return -1;
  return presets.findIndex((p) => {
    const pv = p.getValue();
    if (!pv.from) return false;
    const fromMatch = value.from!.getFullYear() === pv.from.getFullYear()
      && value.from!.getMonth() === pv.from.getMonth();
    const toMatch = (!value.to && !pv.to) || (value.to && pv.to
      && value.to.getFullYear() === pv.to.getFullYear()
      && value.to.getMonth() === pv.to.getMonth());
    return fromMatch && toMatch;
  });
};

export const MonthRangePicker = ({
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
  disabled = false,
  placeholder = 'YYYY.MM ~ YYYY.MM',
  showQuickPresets = false,
  presets,
}: MonthRangePickerProps) => {
  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear] = useState(() => {
    if (value?.from) return value.from.getFullYear();
    return new Date().getFullYear();
  });
  const [selecting, setSelecting] = useState<'from' | 'to'>('from');
  const [tempRange, setTempRange] = useState<MonthRange>({});
  const [hoveredMonth, setHoveredMonth] = useState<Date | null>(null);

  const hasError = error === true || (typeof error === 'string' && error.length > 0);

  const monthNames = locale === 'ko' ? MONTHS_KO : MONTHS_EN;

  const disabledOpts = useMemo(
    () => ({ disabledFuture, minDate, maxDate }),
    [disabledFuture, minDate, maxDate],
  );

  const activePresets = useMemo(
    () => (showQuickPresets ? (presets ?? getDefaultRangePresets()) : []),
    [showQuickPresets, presets],
  );

  const selectedPresetIndex = useMemo(
    () => (showQuickPresets ? findMatchingMonthRangePresetIndex(activePresets, value) : -1),
    [showQuickPresets, activePresets, value],
  );

  const displayRange = useMemo((): MonthRange => {
    if (selecting === 'to' && tempRange.from && hoveredMonth) {
      const from = tempRange.from;
      if (hoveredMonth < from) {
        return { from: hoveredMonth, to: from };
      }
      return { from, to: hoveredMonth };
    }
    return tempRange;
  }, [selecting, tempRange, hoveredMonth]);

  const handleMonthClick = useCallback((month: number) => {
    const clickedDate = new Date(viewYear, month, 1);

    if (selecting === 'from') {
      setTempRange({ from: clickedDate });
      setSelecting('to');
      setHoveredMonth(null);
    } else {
      const from = tempRange.from;
      if (!from) {
        setTempRange({ from: clickedDate });
        setSelecting('to');
        return;
      }

      let newRange: MonthRange;
      if (clickedDate < from) {
        newRange = { from: clickedDate, to: from };
      } else {
        newRange = { from, to: clickedDate };
      }

      setTempRange(newRange);
      onChange?.(newRange);
      setOpen(false);
      setSelecting('from');
      setHoveredMonth(null);
    }
  }, [viewYear, selecting, tempRange.from, onChange]);

  const handlePresetSelect = useCallback((preset: QuickPreset) => {
    const range = preset.getValue() as MonthRange;
    setTempRange(range);
    onChange?.(range);
    setOpen(false);
    setSelecting('from');
    setHoveredMonth(null);
  }, [onChange]);

  const handleOpenChange = useCallback((nextOpen: boolean) => {
    if (nextOpen) {
      setTempRange(value ?? {});
      setSelecting(value?.from && !value?.to ? 'to' : 'from');
      if (value?.from) {
        setViewYear(value.from.getFullYear());
      }
      setHoveredMonth(null);
    } else {
      setSelecting('from');
      setHoveredMonth(null);
    }
    setOpen(nextOpen);
  }, [value]);

  const displayValue = formatMonthRange(value);

  return (
    <InputWrapper
      label={label}
      labelPosition={labelPosition}
      labelWidth={labelWidth}
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
              presets={activePresets as unknown as QuickPreset[]}
              onSelect={handlePresetSelect}
              selectedIndex={selectedPresetIndex}
              disabled={disabled}
            />
          )}
          <div className={cn('flex flex-col ds-gap-16', showQuickPresets && 'padding-16')} style={{ width: showQuickPresets ? 248 : undefined }}>
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
                const monthDisabled = checkMonthDisabled(viewYear, idx, disabledOpts);
                const isStart = displayRange.from?.getFullYear() === viewYear && displayRange.from?.getMonth() === idx;
                const isEnd = displayRange.to?.getFullYear() === viewYear && displayRange.to?.getMonth() === idx;
                const inRange = displayRange.from && displayRange.to
                  && new Date(viewYear, idx, 1) >= displayRange.from
                  && new Date(viewYear, idx, 1) <= displayRange.to;
                const isSelected = isStart || isEnd;

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={monthDisabled}
                    onClick={() => handleMonthClick(idx)}
                    onMouseEnter={() => {
                      if (selecting === 'to') {
                        setHoveredMonth(new Date(viewYear, idx, 1));
                      }
                    }}
                    className={cn(
                      'height-32 rounded-sm font-body size-xs line-height-leading-4 transition-colors',
                      monthDisabled && 'text-hint cursor-not-allowed',
                      !monthDisabled && !isSelected && !inRange && 'text-default hover:bg-state-ghost-hover cursor-pointer',
                      inRange && !isSelected && 'bg-state-soft text-default',
                      isSelected && 'bg-state-primary text-white-default font-medium',
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

MonthRangePicker.displayName = 'MonthRangePicker';
