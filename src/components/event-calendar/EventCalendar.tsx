import React, { forwardRef, useCallback, useMemo, useState } from 'react';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
  isWeekend as isWeekendFn,
  getDay,
  format,
} from 'date-fns';
import { ko } from 'date-fns/locale';
import type { Locale } from 'date-fns';
import { cn } from '@/lib/utils';
import { ControlButton } from '../button/ControlButton';
import { Button } from '../button/Button';
import type { DayContext, EventCalendarProps, EventCalendarSize } from './EventCalendar.types';

const CELL_HEIGHTS: Record<EventCalendarSize, number> = {
  compact: 80,
  default: 120,
  large: 160,
};

interface DayCellProps {
  date: Date;
  context: DayContext;
  cellHeight: number;
  customClassName?: string;
  onClick?: (date: Date) => void;
  renderContent?: (date: Date, context: DayContext) => React.ReactNode;
  isLastRow: boolean;
  locale: Locale;
  children?: React.ReactNode;
}

const DayCell = React.memo(
  function DayCell({
    date,
    context,
    cellHeight,
    customClassName,
    onClick,
    renderContent,
    isLastRow,
    locale,
  }: DayCellProps) {
    const dayNumber = date.getDate();
    const dayOfWeek = getDay(date);
    const isSunday = dayOfWeek === 0;
    const isSaturday = dayOfWeek === 6;

    const handleClick = useCallback(() => {
      if (!context.isDisabled && onClick) {
        onClick(date);
      }
    }, [date, context.isDisabled, onClick]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if ((e.key === 'Enter' || e.key === ' ') && !context.isDisabled && onClick) {
          e.preventDefault();
          onClick(date);
        }
      },
      [date, context.isDisabled, onClick],
    );

    const isClickable = !!onClick && !context.isDisabled;

    const weekendStyle = useMemo(() => {
      if (isSunday) return { backgroundColor: 'var(--bg-basic-red-alpha-15)' };
      if (isSaturday) return { backgroundColor: 'var(--bg-basic-blue-alpha-15)' };
      return undefined;
    }, [isSunday, isSaturday]);

    const cellStyle = useMemo(
      () => ({ minHeight: cellHeight, ...weekendStyle }),
      [cellHeight, weekendStyle],
    );

    const content = renderContent ? renderContent(date, context) : null;

    return (
      <div
        role="gridcell"
        aria-label={format(date, 'yyyy년 M월 d일', { locale })}
        aria-disabled={context.isDisabled || undefined}
        tabIndex={isClickable ? 0 : undefined}
        className={cn(
          'flex flex-col ds-gap-2 padding-4 border-r-default',
          !isLastRow && 'border-b-default',
          context.isOutsideMonth && 'text-hint opacity-40',
          context.isDisabled && 'opacity-50 cursor-not-allowed',
          isClickable && 'cursor-pointer hover:bg-state-ghost-hover',
          customClassName,
        )}
        style={cellStyle}
        onClick={isClickable ? handleClick : undefined}
        onKeyDown={isClickable ? handleKeyDown : undefined}
      >
        <div className="flex items-start">
          {context.isToday ? (
            <span
              className="inline-flex items-center justify-center rounded-full bg-state-brand text-white-default size-xs font-medium"
              style={{ width: 24, height: 24 }}
            >
              {dayNumber}
            </span>
          ) : (
            <span
              className={cn(
                'size-xs font-medium',
                !context.isOutsideMonth && isSunday && 'text-destructive',
                !context.isOutsideMonth && isSaturday && 'text-informative',
              )}
            >
              {dayNumber}
            </span>
          )}
        </div>
        {content && <div className="flex-1 overflow-hidden">{content}</div>}
      </div>
    );
  },
  (prev, next) =>
    prev.date.getTime() === next.date.getTime() &&
    prev.context.isOutsideMonth === next.context.isOutsideMonth &&
    prev.context.isToday === next.context.isToday &&
    prev.context.isWeekend === next.context.isWeekend &&
    prev.context.isDisabled === next.context.isDisabled &&
    prev.cellHeight === next.cellHeight &&
    prev.customClassName === next.customClassName &&
    prev.isLastRow === next.isLastRow &&
    prev.renderContent === next.renderContent &&
    prev.onClick === next.onClick,
);

const defaultFormatMonthLabel = (date: Date) => format(date, 'yyyy년 MM월');

export const EventCalendar = forwardRef<HTMLDivElement, EventCalendarProps>(
  (
    {
      month,
      onMonthChange,
      onDateClick,
      renderDayContent,
      dayCellClassName,
      headerActions,
      cellHeight,
      size,
      locale = ko,
      weekStartsOn = 0,
      disabledDate,
      formatMonthLabel = defaultFormatMonthLabel,
      className,
    },
    ref,
  ) => {
    const [internalMonth, setInternalMonth] = useState(() => startOfMonth(new Date()));
    const currentMonth = month ? startOfMonth(month) : internalMonth;

    const days = useMemo(() => {
      const monthStart = startOfMonth(currentMonth);
      const monthEnd = endOfMonth(currentMonth);
      const gridStart = startOfWeek(monthStart, { weekStartsOn });
      const gridEnd = endOfWeek(monthEnd, { weekStartsOn });
      return eachDayOfInterval({ start: gridStart, end: gridEnd });
    }, [currentMonth, weekStartsOn]);

    const weekdayLabels = useMemo(() => {
      const baseDate = startOfWeek(new Date(), { weekStartsOn });
      return Array.from({ length: 7 }, (_, i) => {
        const d = new Date(baseDate);
        d.setDate(d.getDate() + i);
        return format(d, 'EEEEE', { locale });
      });
    }, [weekStartsOn, locale]);

    const today = useMemo(() => new Date(), []);
    const resolvedCellHeight = cellHeight ?? CELL_HEIGHTS[size ?? 'default'];
    const totalRows = days.length / 7;

    const navigate = useCallback(
      (newMonth: Date) => {
        const m = startOfMonth(newMonth);
        if (onMonthChange) {
          onMonthChange(m);
        } else {
          setInternalMonth(m);
        }
      },
      [onMonthChange],
    );

    const handlePrevMonth = useCallback(() => {
      navigate(subMonths(currentMonth, 1));
    }, [currentMonth, navigate]);

    const handleNextMonth = useCallback(() => {
      navigate(addMonths(currentMonth, 1));
    }, [currentMonth, navigate]);

    const handleToday = useCallback(() => {
      navigate(new Date());
    }, [navigate]);

    const handleDateClick = useCallback(
      (date: Date) => {
        if (disabledDate?.(date)) return;
        onDateClick?.(date);
      },
      [onDateClick, disabledDate],
    );

    const rows = useMemo(() => {
      const result: Date[][] = [];
      for (let i = 0; i < days.length; i += 7) {
        result.push(days.slice(i, i + 7));
      }
      return result;
    }, [days]);

    return (
      <div
        ref={ref}
        className={cn('bg-card border-default rounded-lg font-body overflow-hidden', className)}
      >
        {/* Header */}
        <div className="flex items-center padding-x-16 padding-y-12 ds-gap-8 border-b-default">
          <ControlButton
            icon={['arrows', 'arrow-left-s']}
            size="sm"
            shape="rounded"
            onClick={handlePrevMonth}
            aria-label="이전 달"
          />
          <ControlButton
            icon={['arrows', 'arrow-right-s']}
            size="sm"
            shape="rounded"
            onClick={handleNextMonth}
            aria-label="다음 달"
          />
          <span className="size-lg font-semibold line-height-leading-6 text-default font-body select-none">
            {formatMonthLabel(currentMonth, locale)}
          </span>
          <Button
            buttonStyle="ghost"
            size="sm"
            disabled={isSameMonth(currentMonth, today)}
            onClick={handleToday}
          >
            오늘
          </Button>
          {headerActions && <div className="ml-auto">{headerActions}</div>}
        </div>

        {/* Weekday Row */}
        <div className="grid grid-cols-7 border-b-default" role="row">
          {weekdayLabels.map((label, i) => {
            const dayIndex = (weekStartsOn + i) % 7;
            return (
              <div
                key={i}
                className={cn(
                  'size-xs font-medium padding-y-8 text-center font-body',
                  dayIndex === 0 && 'text-destructive',
                  dayIndex === 6 && 'text-informative',
                  dayIndex !== 0 && dayIndex !== 6 && 'text-muted',
                )}
              >
                {label}
              </div>
            );
          })}
        </div>

        {/* Day Grid */}
        <div role="grid" aria-label="달력">
          {rows.map((week, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-7" role="row">
              {week.map((date) => {
                const isOutsideMonth = !isSameMonth(date, currentMonth);
                const isToday = isSameDay(date, today);
                const weekend = isWeekendFn(date);
                const isDisabled = disabledDate?.(date) ?? false;

                const context: DayContext = {
                  isOutsideMonth,
                  isToday,
                  isWeekend: weekend,
                  isDisabled,
                };

                const customClassName = dayCellClassName?.(date, context);

                return (
                  <DayCell
                    key={date.getTime()}
                    date={date}
                    context={context}
                    cellHeight={resolvedCellHeight}
                    customClassName={customClassName}
                    onClick={onDateClick ? handleDateClick : undefined}
                    renderContent={renderDayContent}
                    isLastRow={rowIndex === totalRows - 1}
                    locale={locale}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  },
);

EventCalendar.displayName = 'EventCalendar';
