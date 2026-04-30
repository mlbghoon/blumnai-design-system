import { useMemo, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { TimeColumn } from './TimeColumn';
import { convert24To12Hour, convert12To24Hour, isTimeEqual } from './time-utils';
import type { TimeColumnItem } from './TimeColumn';
import type { TimePickerPanelProps } from '../time-picker.types';

export function TimePickerPanel({
  value,
  onChange,
  timeFormat = '24h',
  showSeconds = false,
  showQuickSelect = false,
  quickSelectOptions,
  onQuickSelect,
  disabled,
  className,
  minuteStep = 1,
  secondStep = 1,
}: TimePickerPanelProps) {
  const is12h = timeFormat === '12h';

  const hourItems = useMemo<TimeColumnItem[]>(() => {
    if (is12h) {
      return Array.from({ length: 12 }, (_, i) => {
        const v = i + 1;
        return { value: v, label: String(v).padStart(2, '0') };
      });
    }
    return Array.from({ length: 24 }, (_, i) => ({
      value: i,
      label: String(i).padStart(2, '0'),
    }));
  }, [is12h]);

  const minuteItems = useMemo<TimeColumnItem[]>(() => {
    const items: TimeColumnItem[] = [];
    for (let i = 0; i < 60; i += minuteStep) {
      items.push({ value: i, label: String(i).padStart(2, '0') });
    }
    return items;
  }, [minuteStep]);

  const secondItems = useMemo<TimeColumnItem[]>(() => {
    if (!showSeconds) return [];
    const items: TimeColumnItem[] = [];
    for (let i = 0; i < 60; i += secondStep) {
      items.push({ value: i, label: String(i).padStart(2, '0') });
    }
    return items;
  }, [showSeconds, secondStep]);

  const currentHour24 = value?.hour;
  const currentMinute = value?.minute;
  const currentSecond = value?.second;

  const displayHour = useMemo(() => {
    if (currentHour24 === undefined) return undefined;
    if (is12h) return convert24To12Hour(currentHour24).hour12;
    return currentHour24;
  }, [currentHour24, is12h]);

  const currentPeriod = useMemo(() => {
    if (currentHour24 === undefined) return 'AM' as const;
    return convert24To12Hour(currentHour24).period;
  }, [currentHour24]);

  const buildTimeValue = useCallback(
    (hour24: number, minute: number, second?: number) => {
      const result = { hour: hour24, minute };
      if (showSeconds) return { ...result, second: second ?? 0 };
      return result;
    },
    [showSeconds]
  );

  const handleHourSelect = useCallback(
    (hourDisplay: number) => {
      const minute = currentMinute ?? 0;
      const second = currentSecond ?? 0;
      const hour24 = is12h ? convert12To24Hour(hourDisplay, currentPeriod) : hourDisplay;
      onChange(buildTimeValue(hour24, minute, second));
    },
    [currentMinute, currentSecond, is12h, currentPeriod, onChange, buildTimeValue]
  );

  const handleMinuteSelect = useCallback(
    (minute: number) => {
      const hour24 = currentHour24 ?? 0;
      const second = currentSecond ?? 0;
      onChange(buildTimeValue(hour24, minute, second));
    },
    [currentHour24, currentSecond, onChange, buildTimeValue]
  );

  const handleSecondSelect = useCallback(
    (second: number) => {
      const hour24 = currentHour24 ?? 0;
      const minute = currentMinute ?? 0;
      onChange(buildTimeValue(hour24, minute, second));
    },
    [currentHour24, currentMinute, onChange, buildTimeValue]
  );

  const handlePeriodSelect = useCallback(
    (period: 'AM' | 'PM') => {
      if (period === currentPeriod) return;
      const hour12 = displayHour ?? 12;
      const minute = currentMinute ?? 0;
      const second = currentSecond ?? 0;
      const hour24 = convert12To24Hour(hour12, period);
      onChange(buildTimeValue(hour24, minute, second));
    },
    [currentPeriod, displayHour, currentMinute, currentSecond, onChange, buildTimeValue]
  );

  return (
    <div className={cn('flex flex-col ds-gap-8', className)}>
      <div className="flex justify-between ">
        <TimeColumn
          label="시"
          items={hourItems}
          selectedValue={displayHour}
          onSelect={handleHourSelect}
          disabled={disabled}
        />
        <TimeColumn
          label="분"
          items={minuteItems}
          selectedValue={currentMinute}
          onSelect={handleMinuteSelect}
          disabled={disabled}
        />
        {showSeconds && (
          <TimeColumn
            label="초"
            items={secondItems}
            selectedValue={currentSecond}
            onSelect={handleSecondSelect}
            disabled={disabled}
          />
        )}
        {is12h && (
          <div className="flex flex-col ds-gap-4">
            <span className="size-xs text-muted font-medium font-body text-center padding-y-2">
              오전/오후
            </span>
            <div className="flex flex-col ds-gap-2">
              {(['AM', 'PM'] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  disabled={disabled}
                  onClick={() => handlePeriodSelect(p)}
                  className={cn(
                    'width-40 height-32 flex items-center justify-center',
                    'size-sm font-body rounded-md border-0',
                    'transition-colors duration-150 cursor-pointer',
                    p === currentPeriod
                      ? 'bg-state-soft text-basic-blue-strong font-medium'
                      : 'hover:bg-state-ghost-hover text-default',
                    disabled && 'opacity-50 pointer-events-none'
                  )}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      {showQuickSelect && quickSelectOptions && quickSelectOptions.length > 0 && (
        <div className="flex flex-wrap ds-gap-6 padding-t-8 border-t border-default">
          {quickSelectOptions.map((option, index) => {
            const isSelected = isTimeEqual(value, option.value);
            return (
              <button
                key={index}
                type="button"
                disabled={disabled}
                onClick={() => onQuickSelect?.(option)}
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
    </div>
  );
}
