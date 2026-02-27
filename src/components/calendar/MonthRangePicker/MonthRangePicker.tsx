import { useState, useCallback } from 'react';

import { cn } from '../../../utils/cn';
import { Popover, PopoverContent, PopoverAnchor } from '../../popover/Popover';
import { InputWrapper } from '../../input/shared/InputWrapper';
import { Icon } from '../../icons/Icon';
import type { MonthRangePickerProps, MonthRange } from './MonthRangePicker.types';

const MONTHS_KO = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
const MONTHS_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const formatMonthRange = (range: MonthRange | undefined): string => {
  if (!range?.from) return '';
  const fromStr = `${range.from.getFullYear()}.${String(range.from.getMonth() + 1).padStart(2, '0')}`;
  if (!range.to) return fromStr;
  const toStr = `${range.to.getFullYear()}.${String(range.to.getMonth() + 1).padStart(2, '0')}`;
  return `${fromStr} ~ ${toStr}`;
};

export const MonthRangePicker = ({
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
  placeholder = 'YYYY.MM ~ YYYY.MM',
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

  const getDisplayRange = useCallback((): MonthRange => {
    if (selecting === 'to' && tempRange.from && hoveredMonth) {
      const from = tempRange.from;
      if (hoveredMonth < from) {
        return { from: hoveredMonth, to: from };
      }
      return { from, to: hoveredMonth };
    }
    return tempRange;
  }, [selecting, tempRange, hoveredMonth]);

  const isInRange = useCallback((year: number, month: number): boolean => {
    const range = getDisplayRange();
    if (!range.from || !range.to) return false;
    const date = new Date(year, month, 1);
    return date >= range.from && date <= range.to;
  }, [getDisplayRange]);

  const isRangeStart = useCallback((year: number, month: number): boolean => {
    const range = getDisplayRange();
    if (!range.from) return false;
    return range.from.getFullYear() === year && range.from.getMonth() === month;
  }, [getDisplayRange]);

  const isRangeEnd = useCallback((year: number, month: number): boolean => {
    const range = getDisplayRange();
    if (!range.to) return false;
    return range.to.getFullYear() === year && range.to.getMonth() === month;
  }, [getDisplayRange]);

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
          )}
          style={{ width: 280 }}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setOpen(false);
          }}
        >
          <div className="flex flex-col ds-gap-16">
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
                const isStart = isRangeStart(viewYear, idx);
                const isEnd = isRangeEnd(viewYear, idx);
                const inRange = isInRange(viewYear, idx);
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
                      !monthDisabled && !isSelected && !inRange && 'text-default hover:bg-[var(--bg-state-ghost-hover)] cursor-pointer',
                      inRange && !isSelected && 'bg-[var(--bg-state-soft)] text-default',
                      isSelected && 'bg-[var(--bg-state-primary)] text-[var(--text-on-color)] font-medium',
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
