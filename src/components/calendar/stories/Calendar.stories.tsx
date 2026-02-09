import { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { addDays } from 'date-fns';
import { enUS } from 'date-fns/locale';
import type { DateRange, Mode, Matcher } from 'react-day-picker';

import { Calendar } from '../Calendar';
import type { CalendarProps } from '../Calendar.types';

type CalendarStoryProps = CalendarProps & {
  disablePastDates?: boolean;
  disableFutureDates?: boolean;
  disableWeekends?: boolean;
  maxDaysFromToday?: number;
};

const meta: Meta<CalendarStoryProps> = {
  title: 'DataEntry/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { disable: true },
  },
  argTypes: {
    mode: {
      control: 'select',
      options: ['single', 'multiple', 'range'],
      description: '선택 모드',
      table: {
        type: { summary: 'Mode', detail: "'single' | 'multiple' | 'range'" },
      },
    },
    selected: {
      control: false,
      description: '선택된 날짜. mode에 따라 타입이 다름: single → Date, multiple → Date[], range → DateRange',
      table: {
        type: { summary: 'Date | Date[] | DateRange' },
      },
    },
    onSelect: {
      control: false,
      description: '날짜 선택 시 호출되는 콜백 함수. mode에 따라 타입이 다름',
      table: {
        type: { summary: '(date: Date | Date[] | DateRange) => void' },
      },
    },
    calendarStyle: {
      control: 'select',
      options: ['default', 'bordered'],
      description: '캘린더 스타일',
      table: {
        type: { summary: 'CalendarStyle', detail: "'default' | 'bordered'" },
        defaultValue: { summary: 'bordered' },
      },
    },
    captionLayout: {
      control: 'select',
      options: ['month-centered', 'month-left', 'label', 'dropdown', 'dropdown-months', 'dropdown-years'],
      description: '월/년 헤더 표시 방식',
      table: {
        type: { summary: 'CaptionLayout', detail: "'month-centered' | 'month-left' | 'label' | 'dropdown' | 'dropdown-months' | 'dropdown-years'" },
        defaultValue: { summary: 'month-centered' },
      },
    },
    showOutsideDays: {
      control: 'boolean',
      description: '이전/다음 달 날짜 표시 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    numberOfMonths: {
      control: 'number',
      description: '표시할 월 개수',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
    disablePastDates: {
      control: 'boolean',
      description: '오늘 이전 날짜 비활성화',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disableFutureDates: {
      control: 'boolean',
      description: '오늘 이후 날짜 비활성화',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disableWeekends: {
      control: 'boolean',
      description: '주말(토, 일) 비활성화',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    maxDaysFromToday: {
      control: 'number',
      description: '오늘부터 선택 가능한 최대 일수 (0 = 제한 없음)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    startMonth: {
      control: 'date',
      description: '네비게이션 가능한 시작 월 (드롭다운 모드에서 선택 가능한 최소 년/월)',
      table: {
        type: { summary: 'Date' },
      },
    },
    endMonth: {
      control: 'date',
      description: '네비게이션 가능한 종료 월 (드롭다운 모드에서 선택 가능한 최대 년/월)',
      table: {
        type: { summary: 'Date' },
      },
    },
    fixedWeeks: {
      control: 'boolean',
      description: '항상 6주를 표시하여 캘린더 높이 고정',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    weekStartsOn: {
      control: 'select',
      options: [0, 1, 2, 3, 4, 5, 6],
      description: '주 시작 요일 (0: 일요일, 1: 월요일, ...)',
      table: {
        type: { summary: '0 | 1 | 2 | 3 | 4 | 5 | 6' },
        defaultValue: { summary: '0' },
      },
    },
    hideNavigation: {
      control: 'boolean',
      description: '이전/다음 월 네비게이션 버튼 숨김',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    reverseMonths: {
      control: 'boolean',
      description: '여러 월 표시 시 순서 반전 (최근 월이 먼저)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    locale: {
      control: false,
      description: '로케일 설정',
      table: {
        type: { summary: 'Locale' },
        defaultValue: { summary: 'ko' },
      },
    },
    disabled: {
      control: false,
      description: `비활성화할 날짜를 지정합니다.

**사용 가능한 형식:**
- \`Date\` - 특정 날짜 비활성화
- \`Date[]\` - 여러 날짜 비활성화
- \`{ before: Date }\` - 특정 날짜 이전 비활성화
- \`{ after: Date }\` - 특정 날짜 이후 비활성화
- \`{ from: Date, to: Date }\` - 날짜 범위 비활성화
- \`{ dayOfWeek: number[] }\` - 특정 요일 비활성화 (0=일, 6=토)
- \`(date: Date) => boolean\` - 함수로 조건 지정`,
      table: {
        type: {
          summary: 'Date | Date[] | DateRange | { before: Date } | { after: Date } | { dayOfWeek: number[] } | Function',
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<CalendarStoryProps>;

/**
 * 기본 캘린더
 *
 * Controls를 사용하여 다양한 옵션을 테스트할 수 있습니다.
 */
export const Default: Story = {
  args: {
    calendarStyle: 'bordered',
    showOutsideDays: true,
    captionLayout: 'month-centered',
    mode: 'single',
    numberOfMonths: 1,
    disablePastDates: false,
    disableFutureDates: false,
    disableWeekends: false,
    maxDaysFromToday: 0,
    startMonth: new Date(2020, 0),
    endMonth: new Date(2030, 11),
    fixedWeeks: false,
    weekStartsOn: 0,
    hideNavigation: false,
    reverseMonths: false,
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args: CalendarStoryProps) {
    const mode = args.mode as Mode;
    const [singleDate, setSingleDate] = useState<Date | undefined>(new Date());
    const [multipleDates, setMultipleDates] = useState<Date[] | undefined>([new Date()]);
    const [dateRange, setDateRange] = useState<DateRange | undefined>({ from: new Date(), to: undefined });

    useEffect(() => {
      setSingleDate(new Date());
      setMultipleDates([new Date()]);
      setDateRange({ from: new Date(), to: undefined });
    }, [mode]);

    const disablePastDates = 'disablePastDates' in args ? args.disablePastDates : false;
    const disableFutureDates = 'disableFutureDates' in args ? args.disableFutureDates : false;
    const disableWeekends = 'disableWeekends' in args ? args.disableWeekends : false;
    const maxDaysFromToday = 'maxDaysFromToday' in args ? args.maxDaysFromToday : 0;

    const buildDisabledMatcher = (): Matcher[] | undefined => {
      const matchers: Matcher[] = [];

      if (disablePastDates) {
        matchers.push({ before: new Date() });
      }
      if (disableFutureDates) {
        matchers.push({ after: new Date() });
      }
      if (maxDaysFromToday && maxDaysFromToday > 0) {
        matchers.push({ after: addDays(new Date(), maxDaysFromToday) });
      }
      if (disableWeekends) {
        matchers.push({ dayOfWeek: [0, 6] });
      }

      return matchers.length > 0 ? matchers : undefined;
    };

    const disabled = buildDisabledMatcher();

    const startMonth = 'startMonth' in args && args.startMonth
      ? new Date(args.startMonth as number | Date)
      : new Date(2020, 0);
    const endMonth = 'endMonth' in args && args.endMonth
      ? new Date(args.endMonth as number | Date)
      : new Date(2030, 11);

    const fixedWeeks = 'fixedWeeks' in args ? args.fixedWeeks : false;
    const weekStartsOn = 'weekStartsOn' in args ? args.weekStartsOn as 0 | 1 | 2 | 3 | 4 | 5 | 6 : undefined;
    const hideNavigation = 'hideNavigation' in args ? args.hideNavigation : false;
    const reverseMonths = 'reverseMonths' in args ? args.reverseMonths : false;

    if (mode === 'multiple') {
      return (
        <Calendar
          mode="multiple"
          selected={multipleDates}
          onSelect={setMultipleDates}
          calendarStyle={args.calendarStyle}
          showOutsideDays={args.showOutsideDays}
          captionLayout={args.captionLayout}
          numberOfMonths={args.numberOfMonths}
          disabled={disabled}
          startMonth={startMonth}
          endMonth={endMonth}
          fixedWeeks={fixedWeeks}
          weekStartsOn={weekStartsOn}
          hideNavigation={hideNavigation}
          reverseMonths={reverseMonths}
        />
      );
    }

    if (mode === 'range') {
      return (
        <Calendar
          mode="range"
          selected={dateRange}
          onSelect={setDateRange}
          calendarStyle={args.calendarStyle}
          showOutsideDays={args.showOutsideDays}
          captionLayout={args.captionLayout}
          numberOfMonths={args.numberOfMonths}
          disabled={disabled}
          startMonth={startMonth}
          endMonth={endMonth}
          fixedWeeks={fixedWeeks}
          weekStartsOn={weekStartsOn}
          hideNavigation={hideNavigation}
          reverseMonths={reverseMonths}
        />
      );
    }

    return (
      <Calendar
        mode="single"
        selected={singleDate}
        onSelect={setSingleDate}
        calendarStyle={args.calendarStyle}
        showOutsideDays={args.showOutsideDays}
        captionLayout={args.captionLayout}
        numberOfMonths={args.numberOfMonths}
        disabled={disabled}
        startMonth={startMonth}
        endMonth={endMonth}
        fixedWeeks={fixedWeeks}
        weekStartsOn={weekStartsOn}
        hideNavigation={hideNavigation}
        reverseMonths={reverseMonths}
      />
    );
  },
};

/**
 * 월 이름 중앙 정렬 (기본값)
 *
 * `captionLayout="month-centered"`는 월 이름을 중앙에 배치하고 양쪽에 네비게이션 버튼을 표시합니다.
 * 연도 없이 월 이름만 표시됩니다.
 */
export const MonthCentered: Story = {
  render: function Render() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        captionLayout="month-centered"
      />
    );
  },
};

/**
 * 월 이름 왼쪽 정렬
 *
 * `captionLayout="month-left"`는 월 이름을 왼쪽에 배치하고 오른쪽에 네비게이션 버튼을 모아서 표시합니다.
 * 연도 없이 월 이름만 표시됩니다.
 */
export const MonthLeft: Story = {
  render: function Render() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        captionLayout="month-left"
      />
    );
  },
};

/**
 * 테두리 스타일
 */
export const Bordered: Story = {
  render: function Render() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        calendarStyle="bordered"
      />
    );
  },
};

/**
 * 월/연도 레이블
 *
 * `captionLayout="label"`은 월과 연도를 텍스트로 함께 표시합니다.
 */
export const LabelHeader: Story = {
  render: function Render() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        captionLayout="label"
      />
    );
  },
};

/**
 * 드롭다운 헤더
 *
 * `captionLayout="dropdown"`을 사용하면 월/년을 드롭다운으로 빠르게 선택할 수 있습니다.
 * 생년월일 선택 등 먼 날짜로 이동이 필요할 때 유용합니다.
 */
export const DropdownHeader: Story = {
  render: function Render() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        captionLayout="dropdown"
        startMonth={new Date(1950, 0)}
        endMonth={new Date(2030, 11)}
      />
    );
  },
};

/**
 * 날짜 범위 선택
 */
export const RangeSelection: Story = {
  render: function Render() {
    const [range, setRange] = useState<DateRange | undefined>({
      from: new Date(),
      to: addDays(new Date(), 7),
    });
    return (
      <Calendar
        mode="range"
        selected={range}
        onSelect={setRange}
      />
    );
  },
};

/**
 * 여러 달 표시
 */
export const MultipleMonths: Story = {
  render: function Render() {
    const [range, setRange] = useState<DateRange | undefined>();
    return (
      <Calendar
        mode="range"
        selected={range}
        onSelect={setRange}
        numberOfMonths={2}
      />
    );
  },
};

/**
 * 특정 날짜 비활성화
 */
export const WithDisabledDates: Story = {
  render: function Render() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const disabledDays = [
      addDays(new Date(), 1),
      addDays(new Date(), 2),
      addDays(new Date(), 5),
    ];
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        disabled={disabledDays}
      />
    );
  },
};

/**
 * 최소/최대 날짜 제한
 */
export const WithMinMaxDates: Story = {
  render: function Render() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        disabled={[
          { before: new Date() },
          { after: addDays(new Date(), 30) },
        ]}
      />
    );
  },
};

/**
 * 영어 로케일
 *
 * 기본 로케일은 한국어(ko)입니다. 다른 로케일을 사용하려면 `locale` prop을 설정하세요.
 */
export const EnglishLocale: Story = {
  render: function Render() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        locale={enUS}
      />
    );
  },
};

/**
 * 외부 날짜 숨김
 */
export const HideOutsideDays: Story = {
  render: function Render() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        showOutsideDays={false}
      />
    );
  },
};
