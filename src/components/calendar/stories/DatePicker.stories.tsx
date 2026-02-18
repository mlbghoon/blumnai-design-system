import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { addDays } from 'date-fns';
import { ko, enUS, ja, zhCN } from 'date-fns/locale';
import type { Locale } from 'date-fns';

import { DatePicker } from '../DatePicker';
import type { DatePickerProps } from '../DatePicker.types';

const LOCALE_MAP: Record<string, Locale> = {
  ko: ko,
  en: enUS,
  ja: ja,
  zh: zhCN,
};

type StoryProps = Omit<DatePickerProps, 'locale'> & { locale: string };

const meta: Meta<StoryProps> = {
  title: 'DataEntry/DatePicker',
  component: DatePicker as unknown as React.ComponentType<StoryProps>,
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
          detail: `{ label: string; getValue: () => Date }[]`,
        },
        defaultValue: {
          summary: '4개 프리셋',
          detail: `[
  { label: '오늘', getValue: () => new Date() },
  { label: '어제', getValue: () => addDays(new Date(), -1) },
  { label: '1주 전', getValue: () => addWeeks(new Date(), -1) },
  { label: '1개월 전', getValue: () => addMonths(new Date(), -1) },
]`,
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<StoryProps>;

/**
 * 기본 날짜 선택기
 *
 * Controls를 사용하여 다양한 옵션을 테스트할 수 있습니다.
 */
export const Default: Story = {
  args: {
    label: 'Date',
    datePickerStyle: 'default',
    size: 'sm',
    showQuickPresets: false,
    dateFormat: 'yyyy.MM.dd',
    locale: 'ko',
    captionLayout: 'month-centered',
    width: 300,
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const [date, setDate] = useState<Date | undefined>();
    const locale = LOCALE_MAP[args.locale] || ko;
    return (
      <DatePicker
        label={args.label}
        datePickerStyle={args.datePickerStyle}
        size={args.size}
        showQuickPresets={args.showQuickPresets}
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
        value={date}
        onChange={setDate}
      />
    );
  },
};

/**
 * 크기 변형
 */
export const Sizes: Story = {
  render: function Render() {
    const [dateSm, setDateSm] = useState<Date | undefined>();
    const [dateLg, setDateLg] = useState<Date | undefined>();
    return (
      <div className="flex flex-col ds-gap-16" style={{ width: 320 }}>
        <DatePicker
          label="Small (sm)"
          size="sm"
          value={dateSm}
          onChange={setDateSm}
        />
        <DatePicker
          label="Large (lg)"
          size="lg"
          value={dateLg}
          onChange={setDateLg}
        />
      </div>
    );
  },
};

/**
 * 스타일 변형
 */
export const Styles: Story = {
  render: function Render() {
    const [date1, setDate1] = useState<Date | undefined>();
    const [date2, setDate2] = useState<Date | undefined>();
    const [date3, setDate3] = useState<Date | undefined>();
    return (
      <div className="flex flex-col ds-gap-16" style={{ width: 320 }}>
        <DatePicker
          label="Default"
          datePickerStyle="default"
          value={date1}
          onChange={setDate1}
        />
        <DatePicker
          label="Shadow"
          datePickerStyle="shadow"
          value={date2}
          onChange={setDate2}
        />
        <DatePicker
          label="Soft"
          datePickerStyle="soft"
          value={date3}
          onChange={setDate3}
        />
      </div>
    );
  },
};

/**
 * 라벨과 캡션
 */
export const WithLabelAndCaption: Story = {
  render: function Render() {
    const [date, setDate] = useState<Date | undefined>();
    return (
      <div style={{ width: 320 }}>
        <DatePicker
          label="Date of Birth"
          required
          supportText="Required"
          caption="Please select your date of birth"
          value={date}
          onChange={setDate}
        />
      </div>
    );
  },
};

/**
 * 빠른 프리셋
 */
export const WithQuickPresets: Story = {
  render: function Render() {
    const [date, setDate] = useState<Date | undefined>();
    return (
      <div style={{ width: 320 }}>
        <DatePicker
          label="Select Date"
          showQuickPresets
          value={date}
          onChange={setDate}
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
    const [date, setDate] = useState<Date | undefined>();
    return (
      <div style={{ width: 320 }}>
        <DatePicker
          label="Select Date"
          caption="오늘부터 30일 이내만 선택 가능"
          minDate={new Date()}
          maxDate={addDays(new Date(), 30)}
          value={date}
          onChange={setDate}
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
        <DatePicker
          label="Date"
          disabled
          value={new Date()}
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
    const [date, setDate] = useState<Date | undefined>();
    return (
      <div style={{ width: 320 }}>
        <DatePicker
          label="Date"
          error="날짜를 선택해주세요"
          value={date}
          onChange={setDate}
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
        <DatePicker
          label="Date"
          success="날짜가 선택되었습니다"
          value={new Date()}
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
    const [date, setDate] = useState<Date | undefined>();
    return (
      <div style={{ width: 320 }}>
        <DatePicker
          label="날짜 선택"
          locale={ko}
          value={date}
          onChange={setDate}
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
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <div className="flex flex-col ds-gap-16" style={{ width: 320 }}>
        <DatePicker
          label="Controlled Date"
          value={date}
          onChange={setDate}
        />
        <div className="font-body size-sm text-muted">
          선택된 날짜: {date ? date.toLocaleDateString() : '없음'}
        </div>
        <button
          type="button"
          onClick={() => setDate(new Date())}
          className="padding-x-12 padding-y-6 bg-primary text-primary-foreground rounded-md size-sm"
        >
          오늘로 설정
        </button>
      </div>
    );
  },
};
