import * as React from 'react';
import { DayButton, DayPicker, getDefaultClassNames, useDayPicker } from 'react-day-picker';
import type { DayPickerProps } from 'react-day-picker';
import { ko } from 'date-fns/locale';
import { format } from 'date-fns';
import type { Locale } from 'date-fns';

import { cn } from '@/lib/utils';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '../select/RadixSelect';
import { ControlButton } from '../button';
import type { CalendarProps, CaptionLayout } from './Calendar.types';

function CalendarDayButton({
  className,
  day,
  modifiers,
  children,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  const isSelected = modifiers.selected || modifiers.range_start || modifiers.range_end;
  const isRangeStart = modifiers.range_start;
  const isRangeEnd = modifiers.range_end;
  const isRangeMiddle = modifiers.range_middle;
  const isToday = modifiers.today;
  const isOutside = modifiers.outside;

  const getBackgroundClasses = () => {
    if (isOutside) {
      if (isRangeMiddle) return 'bg-state-disabled';
      if (isSelected) return 'bg-state-disabled';
      return '';
    }
    if (isRangeMiddle) return 'bg-state-soft hover:bg-state-soft-hover';
    if (isSelected) return 'bg-state-brand hover:bg-state-brand-hover';
    return 'hover:bg-state-ghost-hover';
  };

  const getTextColorClass = () => {
    if (isOutside) return 'text-hint';
    if (isRangeMiddle) return 'text-informative';
    if (isSelected) return 'text-white-default';
    return 'text-default';
  };

  const getFocusRingClass = () => {
    if (isRangeMiddle) {
      return 'focus-visible:[box-shadow:0_0_0_2px_var(--border-highlight-accent)]';
    }
    if (isRangeStart || isRangeEnd || modifiers.selected) {
      return 'focus-visible:[box-shadow:0_0_0_1px_var(--border-accent-inverted),0_0_0_3px_var(--border-highlight)]';
    }
    return 'focus-visible:[box-shadow:0_0_0_2px_var(--border-highlight-accent)]';
  };

  const renderContent = () => {
    if (isToday) {
      return (
        <span
          className="grid place-items-center rounded-full bg-state-destructive text-white-default size-xs font-medium"
          style={{ width: 21, height: 21, lineHeight: '21px' }}
        >
          {children}
        </span>
      );
    }
    return children;
  };

  return (
    <button
      ref={ref}
      type="button"
      data-day={day.date.toLocaleDateString()}
      data-selected={isSelected}
      data-range-start={isRangeStart}
      data-range-end={isRangeEnd}
      data-range-middle={isRangeMiddle}
      data-today={isToday}
      data-outside={isOutside}
      className={cn(
        'flex items-center justify-center',
        'width-30 height-32',
        'appearance-none border-0 box-border',
        'cursor-pointer transition-colors duration-150',
        'font-body size-xs line-height-leading-4 font-medium letter-spacing-tracking-tight',
        'rounded-sm',
        'focus-visible:outline-none',
        getFocusRingClass(),
        getBackgroundClasses(),
        getTextColorClass(),
        isRangeStart && 'rounded-r-none',
        isRangeEnd && 'rounded-l-none',
        className
      )}
      {...props}
    >
      {renderContent()}
    </button>
  );
}

/**
 * 캘린더 드롭다운 컴포넌트 (디자인 시스템 Select 사용)
 */
function CalendarDropdown({
  value,
  onChange,
  options,
  'aria-label': ariaLabel,
}: {
  value?: string | number | readonly string[];
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options?: Array<{ value: number; label: string; disabled?: boolean }>;
  'aria-label'?: string;
}) {
  const [open, setOpen] = React.useState(false);

  const handleChange = (newValue: string) => {
    const changeEvent = {
      target: { value: newValue },
    } as React.ChangeEvent<HTMLSelectElement>;
    onChange?.(changeEvent);
  };

  const normalizedValue = Array.isArray(value) ? value[0] : value;

  return (
    <div
      onPointerDown={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
      style={{ position: 'relative', zIndex: 10 }}
    >
      <Select
        value={normalizedValue?.toString()}
        onValueChange={handleChange}
        open={open}
        onOpenChange={setOpen}
      >
        <SelectTrigger
          aria-label={ariaLabel}
          size="sm"
          selectStyle="default"
          className="!w-auto !h-auto !min-h-0"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="max-h-[280px]">
          {options?.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value.toString()}
              disabled={option.disabled}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

/**
 * 월 전용 캡션 네비게이션 버튼
 */
function MonthNavButton({
  direction,
  disabled,
  onClick,
}: {
  direction: 'prev' | 'next';
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={direction === 'prev' ? 'Previous month' : 'Next month'}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center width-24 height-24 rounded-xs',
        'transition-all duration-200 focus:outline-none',
        disabled
          ? 'cursor-not-allowed opacity-50'
          : 'cursor-pointer hover:bg-state-ghost-hover active:bg-state-ghost-press focus-visible:shadow-component-misc-focus'
      )}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="text-muted"
      >
        {direction === 'prev' ? (
          <path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z" />
        ) : (
          <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z" />
        )}
      </svg>
    </button>
  );
}

/**
 * 통합 캡션 컴포넌트 - 모든 captionLayout에서 사용
 */
function CustomCaption({
  calendarMonth,
  layout,
  children,
}: {
  calendarMonth: { date: Date };
  layout: CaptionLayout;
  children?: React.ReactNode;
}) {
  const { previousMonth, nextMonth, goToMonth, dayPickerProps } = useDayPicker();
  const locale = dayPickerProps.locale ?? ko;
  const monthName = format(calendarMonth.date, 'LLLL', { locale: locale as Locale });

  const handlePreviousClick = () => {
    if (previousMonth) goToMonth(previousMonth);
  };

  const handleNextClick = () => {
    if (nextMonth) goToMonth(nextMonth);
  };

  const isMonthOnly = layout === 'month-centered' || layout === 'month-left';

  if (layout === 'month-left') {
    return (
      <div className="flex items-center height-40 border-b-default [margin-top:-8px] [margin-right:-8px] [margin-left:-8px] padding-y-8 padding-l-12 padding-r-8 gap-8" data-caption-layout="month-left">
        <span className="flex-1 text-left size-md font-medium line-height-leading-5 text-default font-body">
          {monthName}
        </span>
        <div className="flex gap-4">
          <MonthNavButton direction="prev" disabled={!previousMonth} onClick={handlePreviousClick} />
          <MonthNavButton direction="next" disabled={!nextMonth} onClick={handleNextClick} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center height-40 border-b-default [margin-top:-8px] [margin-right:-8px] [margin-left:-8px] padding-8 gap-8" data-caption-layout={layout}>
      <MonthNavButton direction="prev" disabled={!previousMonth} onClick={handlePreviousClick} />
      <div className="flex-1 flex items-center justify-center gap-6 size-sm font-medium line-height-leading-5 text-default font-body">
        {isMonthOnly ? monthName : children}
      </div>
      <MonthNavButton direction="next" disabled={!nextMonth} onClick={handleNextClick} />
    </div>
  );
}

/**
 * 디자인 시스템 스타일이 적용된 캘린더 컴포넌트
 */
function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = 'month-centered',
  calendarStyle = 'bordered',
  locale = ko,
  components,
  ...props
}: CalendarProps) {
  const defaultClassNames = getDefaultClassNames();
  const isMonthOnlyLayout = captionLayout === 'month-centered' || captionLayout === 'month-left';
  const dayPickerCaptionLayout = (isMonthOnlyLayout ? 'label' : captionLayout) as 'label' | 'dropdown' | 'dropdown-months' | 'dropdown-years';

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      locale={locale as DayPickerProps['locale']}
      className={cn(
        'bg-card group/calendar padding-8 font-body',
        calendarStyle === 'bordered' && 'border-default rounded-lg',
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      )}
      captionLayout={dayPickerCaptionLayout}
      classNames={{
        root: cn('w-fit [--calendar-width:234px]', defaultClassNames.root),
        months: cn(
          'flex flex-col md:flex-row md:gap-0',
          defaultClassNames.months
        ),
        month: cn(
          'flex w-[var(--calendar-width)] [box-sizing:content-box] flex-col gap-4 relative',
          'md:[&:not(:first-child)]:[padding-left:8px] md:[&:not(:last-child)]:[padding-right:8px]',
          'md:[&:not(:first-child)]:before:content-[""] md:[&:not(:first-child)]:before:absolute md:[&:not(:first-child)]:before:[left:-0.5px] md:[&:not(:first-child)]:before:[top:-8px] md:[&:not(:first-child)]:before:[bottom:-8px] md:[&:not(:first-child)]:before:w-px md:[&:not(:first-child)]:before:[background:var(--border-darker)]',
          defaultClassNames.month
        ),
        nav: cn('hidden', defaultClassNames.nav),
        button_previous: cn('hidden', defaultClassNames.button_previous),
        button_next: cn('hidden', defaultClassNames.button_next),
        month_caption: cn(defaultClassNames.month_caption),
        dropdowns: cn(
          'flex items-center justify-center gap-6',
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          'has-focus:border-ring border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] relative rounded-md border-solid border-[1px]',
          defaultClassNames.dropdown_root
        ),
        dropdown: cn(
          'bg-popover absolute inset-0 opacity-0',
          defaultClassNames.dropdown
        ),
        caption_label: cn(
          'select-none font-medium size-sm line-height-leading-5',
          defaultClassNames.caption_label
        ),
        table: 'w-full',
        weekdays: cn('flex gap-4 [margin-bottom:4px]', defaultClassNames.weekdays),
        weekday: cn(
          'text-hint select-none rounded-sm size-xs font-medium width-30 height-32 flex items-center justify-center letter-spacing-tracking-tight',
          defaultClassNames.weekday
        ),
        week: cn('flex w-full gap-4 [margin-bottom:4px] last:mb-0', defaultClassNames.week),
        week_number_header: cn(
          'width-30 select-none',
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          'text-hint select-none size-xs',
          defaultClassNames.week_number
        ),
        day: cn(
          'group/day relative width-30 height-32 select-none p-0 text-center',
          '[&:first-child[data-selected=true]_button]:rounded-l-md',
          '[&:last-child[data-selected=true]_button]:rounded-r-md',
          defaultClassNames.day
        ),
        range_start: cn(defaultClassNames.range_start),
        range_middle: cn(defaultClassNames.range_middle),
        range_end: cn(defaultClassNames.range_end),
        today: cn(defaultClassNames.today),
        outside: cn(
          'text-hint aria-selected:text-hint',
          defaultClassNames.outside
        ),
        disabled: cn(
          'text-hint opacity-50',
          defaultClassNames.disabled
        ),
        hidden: cn('invisible', defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          );
        },
        PreviousMonthButton: ({ children: _children, ...props }) => (
          <ControlButton
            icon={['arrows', 'arrow-left-s']}
            size="sm"
            shape="rounded"
            aria-label="Previous month"
            {...props}
          />
        ),
        NextMonthButton: ({ children: _children, ...props }) => (
          <ControlButton
            icon={['arrows', 'arrow-right-s']}
            size="sm"
            shape="rounded"
            aria-label="Next month"
            {...props}
          />
        ),
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex width-30 height-32 items-center justify-center text-center">
                {children}
              </div>
            </td>
          );
        },
        Dropdown: (props) => {
          return <CalendarDropdown {...props} />;
        },
        Nav: () => <></>,
        MonthCaption: ({ calendarMonth, children }: { calendarMonth: { date: Date }; children?: React.ReactNode }) => (
          <CustomCaption
            calendarMonth={calendarMonth}
            layout={captionLayout}
          >
            {children}
          </CustomCaption>
        ),
        ...components,
      }}
      {...(props as DayPickerProps)}
    />
  );
}

Calendar.displayName = 'Calendar';

export { Calendar, CalendarDayButton };
