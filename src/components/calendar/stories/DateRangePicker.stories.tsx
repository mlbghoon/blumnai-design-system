import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { addDays, addMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { ko, enUS, ja, zhCN } from 'date-fns/locale';
import type { Locale } from 'date-fns';
import type { DateRange } from 'react-day-picker';

import { DateRangePicker } from '../DatePicker';
import type { DateRangePickerProps, QuickPreset } from '../DatePicker.types';

const LOCALE_MAP: Record<string, Locale> = {
  ko: ko,
  en: enUS,
  ja: ja,
  zh: zhCN,
};

type StoryProps = Omit<DateRangePickerProps, 'locale'> & { locale: string };

const meta: Meta<StoryProps> = {
  title: 'DataEntry/DateRangePicker',
  component: DateRangePicker as unknown as React.ComponentType<StoryProps>,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { disable: true },
  },
  argTypes: {
    datePickerStyle: {
      control: 'select',
      options: ['default', 'shadow', 'soft'],
      description: '날짜 선택기 스타일',
      table: {
        type: { summary: 'DatePickerStyle', detail: "'default' | 'shadow' | 'soft'" },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'lg'],
      description: '날짜 선택기 크기',
      table: {
        type: { summary: 'DatePickerSize', detail: "'sm' | 'lg'" },
        defaultValue: { summary: 'sm' },
      },
    },
    label: {
      control: 'text',
      description: '라벨 텍스트',
      table: { type: { summary: 'string' } },
    },
    required: {
      control: 'boolean',
      description: '필수 입력 여부',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    supportText: {
      control: 'text',
      description: '라벨 옆 보조 텍스트',
      table: { type: { summary: 'string' } },
    },
    caption: {
      control: 'text',
      description: '입력 필드 아래 설명 텍스트',
      table: { type: { summary: 'string' } },
    },
    error: {
      control: 'text',
      description: '에러 상태 또는 에러 메시지',
      table: { type: { summary: 'boolean | string' } },
    },
    success: {
      control: 'text',
      description: '성공 상태 또는 성공 메시지',
      table: { type: { summary: 'boolean | string' } },
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    showQuickPresets: {
      control: 'boolean',
      description: '빠른 프리셋 표시 여부',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    numberOfMonths: {
      control: 'number',
      description: '표시할 월 개수',
      table: { type: { summary: 'number' }, defaultValue: { summary: '2' } },
    },
    dateFormat: {
      control: 'select',
      options: ['yyyy.MM.dd', 'yyyy-MM-dd', 'yyyy/MM/dd', 'MM/dd/yyyy', 'dd/MM/yyyy'],
      description: '날짜 포맷',
      table: { type: { summary: 'DateFormat' }, defaultValue: { summary: 'yyyy.MM.dd' } },
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: 'Popover 정렬',
      table: {
        type: { summary: 'PopoverAlign', detail: "'start' | 'center' | 'end'" },
        defaultValue: { summary: 'start' },
      },
    },
    width: {
      control: 'text',
      description: '입력 필드 컨테이너의 커스텀 너비 (숫자는 px, 문자열은 그대로 사용)',
      table: {
        type: { summary: 'string | number', detail: '예: 320, "100%", "20rem"' },
      },
    },
    captionLayout: {
      control: 'select',
      options: ['month-centered', 'month-left', 'label', 'dropdown', 'dropdown-months', 'dropdown-years'],
      description: '캘린더 캡션 레이아웃',
      table: {
        type: {
          summary: 'CaptionLayout',
          detail: "'month-centered' | 'month-left' | 'label' | 'dropdown' | 'dropdown-months' | 'dropdown-years'",
        },
        defaultValue: { summary: 'month-centered' },
      },
    },
    locale: {
      control: 'select',
      options: ['ko', 'en', 'ja', 'zh'],
      description: '로케일',
      table: {
        type: { summary: 'string', detail: "'ko' | 'en' | 'ja' | 'zh'" },
        defaultValue: { summary: 'ko' },
      },
    },
    presets: {
      control: false,
      description: '커스텀 빠른 프리셋 목록 (showQuickPresets와 함께 사용)',
      table: {
        type: {
          summary: 'QuickPreset[]',
          detail: `{ label: string; getValue: () => DateRange }[]`,
        },
        defaultValue: {
          summary: '7개 프리셋',
          detail: `[
  { label: '오늘', getValue: () => ({ from: startOfDay(new Date()), to: endOfDay(new Date()) }) },
  { label: '어제', getValue: () => ({ from: startOfDay(addDays(new Date(), -1)), to: endOfDay(addDays(new Date(), -1)) }) },
  { label: '최근 7일', getValue: () => ({ from: addDays(new Date(), -6), to: new Date() }) },
  { label: '최근 30일', getValue: () => ({ from: addDays(new Date(), -29), to: new Date() }) },
  { label: '최근 3개월', getValue: () => ({ from: addMonths(new Date(), -3), to: new Date() }) },
  { label: '최근 6개월', getValue: () => ({ from: addMonths(new Date(), -6), to: new Date() }) },
  { label: '최근 1년', getValue: () => ({ from: addMonths(new Date(), -12), to: new Date() }) },
]`,
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<StoryProps>;

/**
 * 기본 날짜 범위 선택기
 *
 * Controls를 사용하여 다양한 옵션을 테스트할 수 있습니다.
 */
export const Default: Story = {
  args: {
    label: 'Date Range',
    datePickerStyle: 'default',
    size: 'sm',
    showQuickPresets: false,
    numberOfMonths: 2,
    dateFormat: 'yyyy.MM.dd',
    locale: 'ko',
    captionLayout: 'month-centered',
    width: 300,
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const [range, setRange] = useState<DateRange | undefined>();
    const locale = LOCALE_MAP[args.locale] || ko;
    return (
      <DateRangePicker
        label={args.label}
        datePickerStyle={args.datePickerStyle}
        size={args.size}
        showQuickPresets={args.showQuickPresets}
        numberOfMonths={args.numberOfMonths}
        dateFormat={args.dateFormat}
        required={args.required}
        supportText={args.supportText}
        caption={args.caption}
        error={args.error}
        success={args.success}
        disabled={args.disabled}
        align={args.align}
        locale={locale}
        captionLayout={args.captionLayout}
        width={args.width}
        value={range}
        onChange={setRange}
      />
    );
  },
};

/**
 * 빠른 프리셋
 */
export const WithQuickPresets: Story = {
  render: function Render() {
    const [range, setRange] = useState<DateRange | undefined>();
    return (
      <div style={{ width: 320 }}>
        <DateRangePicker
          label="Date Range"
          showQuickPresets
          value={range}
          onChange={setRange}
        />
      </div>
    );
  },
};

/**
 * 단일 월 표시
 */
export const SingleMonth: Story = {
  render: function Render() {
    const [range, setRange] = useState<DateRange | undefined>();
    return (
      <div style={{ width: 320 }}>
        <DateRangePicker
          label="Date Range"
          numberOfMonths={1}
          value={range}
          onChange={setRange}
        />
      </div>
    );
  },
};

/**
 * 두 달 표시 (기본값)
 */
export const TwoMonths: Story = {
  render: function Render() {
    const [range, setRange] = useState<DateRange | undefined>();
    return (
      <div style={{ width: 320 }}>
        <DateRangePicker
          label="Date Range"
          numberOfMonths={2}
          value={range}
          onChange={setRange}
        />
      </div>
    );
  },
};

/**
 * 커스텀 프리셋
 */
export const WithCustomPresets: Story = {
  render: function Render() {
    const [range, setRange] = useState<DateRange | undefined>();

    const customPresets: QuickPreset[] = [
      {
        label: '이번 주',
        getValue: () => ({
          from: startOfWeek(new Date(), { weekStartsOn: 1 }),
          to: endOfWeek(new Date(), { weekStartsOn: 1 }),
        }),
      },
      {
        label: '이번 달',
        getValue: () => ({
          from: startOfMonth(new Date()),
          to: endOfMonth(new Date()),
        }),
      },
      {
        label: '다음 달',
        getValue: () => ({
          from: startOfMonth(addMonths(new Date(), 1)),
          to: endOfMonth(addMonths(new Date(), 1)),
        }),
      },
      {
        label: '다음 90일',
        getValue: () => ({
          from: new Date(),
          to: addDays(new Date(), 90),
        }),
      },
    ];

    return (
      <div style={{ width: 320 }}>
        <DateRangePicker
          label="Date Range"
          showQuickPresets
          presets={customPresets}
          value={range}
          onChange={setRange}
        />
      </div>
    );
  },
};

/**
 * 비활성화 상태
 */
export const Disabled: Story = {
  render: function Render() {
    return (
      <div style={{ width: 320 }}>
        <DateRangePicker
          label="Date Range"
          disabled
          value={{ from: new Date(), to: addDays(new Date(), 7) }}
        />
      </div>
    );
  },
};

/**
 * 에러 상태
 */
export const ErrorState: Story = {
  render: function Render() {
    const [range, setRange] = useState<DateRange | undefined>();
    return (
      <div style={{ width: 320 }}>
        <DateRangePicker
          label="Date Range"
          error="날짜 범위를 선택해주세요"
          value={range}
          onChange={setRange}
        />
      </div>
    );
  },
};

/**
 * 성공 상태
 */
export const SuccessState: Story = {
  render: function Render() {
    return (
      <div style={{ width: 320 }}>
        <DateRangePicker
          label="Date Range"
          success="날짜 범위가 선택되었습니다"
          value={{ from: new Date(), to: addDays(new Date(), 7) }}
        />
      </div>
    );
  },
};

/**
 * 최소/최대 날짜 제한
 */
export const WithMinMaxDates: Story = {
  render: function Render() {
    const [range, setRange] = useState<DateRange | undefined>();
    return (
      <div style={{ width: 320 }}>
        <DateRangePicker
          label="Date Range"
          caption="오늘부터 60일 이내만 선택 가능"
          minDate={new Date()}
          maxDate={addDays(new Date(), 60)}
          value={range}
          onChange={setRange}
        />
      </div>
    );
  },
};

/**
 * 한국어 로케일
 */
export const KoreanLocale: Story = {
  render: function Render() {
    const [range, setRange] = useState<DateRange | undefined>();
    return (
      <div style={{ width: 320 }}>
        <DateRangePicker
          label="날짜 범위"
          locale={ko}
          showQuickPresets
          value={range}
          onChange={setRange}
        />
      </div>
    );
  },
};

/**
 * 제어 컴포넌트
 */
export const Controlled: Story = {
  render: function Render() {
    const [range, setRange] = useState<DateRange | undefined>({
      from: new Date(),
      to: addDays(new Date(), 7),
    });
    return (
      <div className="flex flex-col gap-16" style={{ width: 320 }}>
        <DateRangePicker
          label="Controlled Date Range"
          value={range}
          onChange={setRange}
        />
        <div className="font-body size-sm text-muted">
          시작: {range?.from?.toLocaleDateString() ?? '없음'}<br />
          종료: {range?.to?.toLocaleDateString() ?? '없음'}
        </div>
        <button
          type="button"
          onClick={() => setRange({ from: new Date(), to: addDays(new Date(), 7) })}
          className="padding-x-12 padding-y-6 bg-primary text-primary-foreground rounded-md size-sm"
        >
          오늘부터 7일로 설정
        </button>
      </div>
    );
  },
};
