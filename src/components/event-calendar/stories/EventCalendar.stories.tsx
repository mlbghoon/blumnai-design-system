import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { format, isWeekend } from 'date-fns';
import { EventCalendar } from '../EventCalendar';
import { Button } from '../../button/Button';

const meta: Meta<typeof EventCalendar> = {
  title: 'Components/Calendar/EventCalendar',
  component: EventCalendar,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  argTypes: {
    month: {
      control: 'date',
      description: '표시할 월 (controlled)',
      table: { type: { summary: 'Date' } },
    },
    onMonthChange: {
      action: 'monthChange',
      description: '월 변경 콜백',
      table: { type: { summary: '(date: Date) => void' } },
    },
    onDateClick: {
      action: 'dateClick',
      description: '날짜 클릭 콜백',
      table: { type: { summary: '(date: Date) => void' } },
    },
    renderDayContent: {
      description: '커스텀 셀 콘텐츠 렌더링 함수',
      table: { type: { summary: '(date: Date, context: DayContext) => ReactNode' } },
    },
    dayCellClassName: {
      description: '날짜별 셀 className 콜백',
      table: { type: { summary: '(date: Date, context: DayContext) => string | undefined' } },
    },
    headerActions: {
      description: '헤더 오른쪽 영역 커스텀 콘텐츠',
      table: { type: { summary: 'ReactNode' } },
    },
    cellHeight: {
      control: 'number',
      description: '셀 높이 (px), size 프리셋보다 우선',
      table: { type: { summary: 'number' } },
    },
    size: {
      control: 'select',
      options: ['compact', 'default', 'large'],
      description: '크기 프리셋',
      table: {
        type: { summary: 'EventCalendarSize', detail: "'compact' | 'default' | 'large'" },
      },
    },
    weekStartsOn: {
      control: 'select',
      options: [0, 1, 2, 3, 4, 5, 6],
      description: '주 시작 요일 (0=일, 1=월)',
      table: { type: { summary: '0 | 1 | 2 | 3 | 4 | 5 | 6' } },
    },
    disabledDate: {
      description: '비활성 날짜 판별 콜백',
      table: { type: { summary: '(date: Date) => boolean' } },
    },
    formatMonthLabel: {
      description: '월 라벨 포맷 함수',
      table: { type: { summary: '(date: Date, locale: Locale) => string' } },
    },
    className: {
      control: 'text',
      description: '추가 className',
      table: { type: { summary: 'string' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof EventCalendar>;

/**
 * 기본 EventCalendar
 *
 * 이 스토리에서 모든 props를 테스트할 수 있습니다.
 * `ref`와 `className` prop을 지원합니다.
 */
export const Default: Story = {
  args: {
    size: 'default',
    weekStartsOn: 0,
    cellHeight: undefined,
    className: undefined,
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const [month, setMonth] = useState(new Date());
    return (
      <EventCalendar
        size={args.size}
        weekStartsOn={args.weekStartsOn}
        cellHeight={args.cellHeight}
        className={args.className}
        month={month}
        onMonthChange={setMonth}
      />
    );
  },
};

/**
 * 커스텀 셀 콘텐츠
 *
 * `renderDayContent`와 `DayContext`를 활용해 상담사 스케줄을 표시하는 예시입니다.
 */
export const WithCustomContent: Story = {
  render: function Render() {
    const fixedMonth = new Date(2026, 3, 1);
    const [month, setMonth] = useState(fixedMonth);

    const scheduleData: Record<string, { holidayName?: string; workCsCount: number; closeCsCount: number }> = {
      '2026-04-01': { workCsCount: 5, closeCsCount: 2 },
      '2026-04-02': { workCsCount: 8, closeCsCount: 1 },
      '2026-04-03': { workCsCount: 3, closeCsCount: 4 },
      '2026-04-06': { workCsCount: 7, closeCsCount: 0 },
      '2026-04-07': { workCsCount: 6, closeCsCount: 2 },
      '2026-04-10': { workCsCount: 4, closeCsCount: 3 },
      '2026-04-15': { holidayName: '임시공휴일', workCsCount: 0, closeCsCount: 10 },
      '2026-04-20': { workCsCount: 9, closeCsCount: 1 },
      '2026-04-25': { workCsCount: 2, closeCsCount: 5 },
      '2026-04-30': { workCsCount: 6, closeCsCount: 3 },
    };

    return (
      <EventCalendar
        month={month}
        onMonthChange={setMonth}
        onDateClick={(date) => console.log('dateClick', date)}
        renderDayContent={(date, ctx) => {
          if (ctx.isOutsideMonth) return null;
          const data = scheduleData[format(date, 'yyyy-MM-dd')];
          if (!data) return null;
          return (
            <div className="flex flex-col ds-gap-2">
              {data.holidayName && (
                <span className="text-destructive size-xs font-body">{data.holidayName}</span>
              )}
              <span className="text-success size-xs font-body">상담가능: {data.workCsCount}</span>
              <span className="text-destructive size-xs font-body">상담불가: {data.closeCsCount}</span>
            </div>
          );
        }}
      />
    );
  },
};

/**
 * 헤더 액션 슬롯
 *
 * `headerActions`를 사용해 헤더 오른쪽에 커스텀 버튼을 배치합니다.
 */
export const WithHeaderActions: Story = {
  render: function Render() {
    const fixedMonth = new Date(2026, 3, 1);
    const [month, setMonth] = useState(fixedMonth);

    return (
      <EventCalendar
        month={month}
        onMonthChange={setMonth}
        headerActions={
          <div className="flex ds-gap-8">
            <Button buttonStyle="ghost" size="sm">내보내기</Button>
            <Button buttonStyle="primary" size="sm">일정 추가</Button>
          </div>
        }
      />
    );
  },
};

/**
 * Compact 크기
 *
 * `size="compact"`로 셀 높이가 80px인 콤팩트 뷰입니다.
 */
export const Compact: Story = {
  render: function Render() {
    const fixedMonth = new Date(2026, 3, 1);
    const [month, setMonth] = useState(fixedMonth);

    return (
      <EventCalendar
        month={month}
        onMonthChange={setMonth}
        size="compact"
      />
    );
  },
};

/**
 * Large 크기
 *
 * `size="large"`로 셀 높이가 160px인 넓은 뷰입니다.
 */
export const Large: Story = {
  render: function Render() {
    const fixedMonth = new Date(2026, 3, 1);
    const [month, setMonth] = useState(fixedMonth);

    return (
      <EventCalendar
        month={month}
        onMonthChange={setMonth}
        size="large"
      />
    );
  },
};

/**
 * 비활성 날짜
 *
 * 주말 날짜를 비활성화한 예시입니다.
 */
export const WithDisabledDates: Story = {
  render: function Render() {
    const fixedMonth = new Date(2026, 3, 1);
    const [month, setMonth] = useState(fixedMonth);

    return (
      <EventCalendar
        month={month}
        onMonthChange={setMonth}
        onDateClick={(date) => console.log('dateClick', date)}
        disabledDate={(date) => isWeekend(date)}
      />
    );
  },
};

/**
 * 월요일 시작
 *
 * `weekStartsOn={1}`로 월요일부터 시작하는 달력입니다.
 */
export const MondayStart: Story = {
  render: function Render() {
    const fixedMonth = new Date(2026, 3, 1);
    const [month, setMonth] = useState(fixedMonth);

    return (
      <EventCalendar
        month={month}
        onMonthChange={setMonth}
        weekStartsOn={1}
      />
    );
  },
};

/**
 * 4줄 달력 (2026년 2월)
 *
 * 2026년 2월은 일요일 시작 시 4줄로 표시되는 엣지 케이스입니다.
 */
export const FourRowMonth: Story = {
  render: function Render() {
    const fixedMonth = new Date(2026, 1, 1);
    const [month, setMonth] = useState(fixedMonth);

    return (
      <EventCalendar
        month={month}
        onMonthChange={setMonth}
      />
    );
  },
};

/**
 * 6줄 달력 (2027년 8월)
 *
 * 2027년 8월은 6줄로 표시되는 엣지 케이스입니다.
 */
export const SixRowMonth: Story = {
  render: function Render() {
    const fixedMonth = new Date(2027, 7, 1);
    const [month, setMonth] = useState(fixedMonth);

    return (
      <EventCalendar
        month={month}
        onMonthChange={setMonth}
      />
    );
  },
};
