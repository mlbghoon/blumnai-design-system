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
      description: '날짜 선택기의 시각적 스타일을 설정합니다. default(기본), shadow(그림자), soft(부드러운) 중 선택할 수 있습니다',
      table: {
        type: { summary: 'DatePickerStyle', detail: "'default' | 'shadow' | 'soft'" },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'lg'],
      description: '날짜 선택기의 크기를 설정합니다. sm(작게), lg(크게) 중 선택할 수 있습니다',
      table: {
        type: { summary: 'DatePickerSize', detail: "'sm' | 'lg'" },
        defaultValue: { summary: 'sm' },
      },
    },
    label: {
      control: 'text',
      description: '입력 필드 위에 표시되는 라벨 텍스트입니다',
      table: { type: { summary: 'string' } },
    },
    required: {
      control: 'boolean',
      description: 'true로 설정하면 라벨 옆에 필수 표시(*)가 나타납니다',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    supportText: {
      control: 'text',
      description: '라벨 오른쪽에 표시되는 보조 텍스트입니다. 선택 사항 안내 등에 사용합니다',
      table: { type: { summary: 'string' } },
    },
    caption: {
      control: 'text',
      description: '입력 필드 아래에 표시되는 설명 텍스트입니다. 사용 안내나 형식 정보를 제공합니다',
      table: { type: { summary: 'string' } },
    },
    error: {
      control: 'text',
      description: '에러 상태를 표시합니다. true는 에러 스타일만, 문자열은 에러 메시지를 함께 표시합니다',
      table: { type: { summary: 'boolean | string' } },
    },
    success: {
      control: 'text',
      description: '성공 상태를 표시합니다. true는 성공 스타일만, 문자열은 성공 메시지를 함께 표시합니다',
      table: { type: { summary: 'boolean | string' } },
    },
    disabled: {
      control: 'boolean',
      description: 'true로 설정하면 날짜 선택기가 비활성화되어 클릭이나 입력을 할 수 없습니다',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    showQuickPresets: {
      control: 'boolean',
      description: 'true로 설정하면 캘린더 옆에 오늘, 어제, 1주 전 등 빠른 날짜 선택 버튼이 표시됩니다',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    dateFormat: {
      control: 'select',
      options: ['yyyy.MM.dd', 'yyyy-MM-dd', 'yyyy/MM/dd', 'MM/dd/yyyy', 'dd/MM/yyyy'],
      description: '선택된 날짜의 표시 형식을 설정합니다. yyyy.MM.dd, yyyy-MM-dd 등의 형식을 선택할 수 있습니다',
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
    showActions: {
      control: 'boolean',
      description: '확인/취소 버튼 표시 여부',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    confirmLabel: {
      control: 'text',
      description: '확인 버튼 라벨',
      table: { type: { summary: 'string' }, defaultValue: { summary: '확인' } },
    },
    cancelLabel: {
      control: 'text',
      description: '취소 버튼 라벨',
      table: { type: { summary: 'string' }, defaultValue: { summary: '취소' } },
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
    label: '날짜',
    datePickerStyle: 'default',
    size: 'sm',
    showQuickPresets: false,
    showActions: false,
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
        showActions={args.showActions}
        confirmLabel={args.confirmLabel || undefined}
        cancelLabel={args.cancelLabel || undefined}
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
          label="생년월일"
          required
          supportText="필수"
          caption="생년월일을 선택해주세요"
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
          label="날짜 선택"
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
          label="날짜 선택"
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
          label="날짜"
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
          label="날짜"
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
          label="날짜"
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
 * 확인/취소 버튼
 *
 * `showActions`를 사용하면 날짜 선택 후 확인/취소 버튼으로 적용 여부를 결정할 수 있습니다.
 */
export const WithActions: Story = {
  render: function Render() {
    const [date, setDate] = useState<Date | undefined>();
    return (
      <div style={{ width: 320 }}>
        <DatePicker
          label="날짜 선택"
          showActions
          value={date}
          onChange={setDate}
        />
        <div className="font-body size-sm text-muted margin-t-16">
          선택된 날짜: {date ? date.toLocaleDateString() : '없음'}
        </div>
      </div>
    );
  },
};

/**
 * 확인/취소 + 빠른 프리셋
 */
export const WithActionsAndPresets: Story = {
  render: function Render() {
    const [date, setDate] = useState<Date | undefined>();
    return (
      <div style={{ width: 320 }}>
        <DatePicker
          label="날짜 선택"
          showActions
          showQuickPresets
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
          label="제어 날짜"
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
