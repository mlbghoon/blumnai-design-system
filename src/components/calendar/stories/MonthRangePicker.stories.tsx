import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { MonthRangePicker } from '../MonthRangePicker';
import type { MonthRange } from '../MonthRangePicker';

const meta: Meta<typeof MonthRangePicker> = {
  title: 'DataEntry/MonthRangePicker',
  component: MonthRangePicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  argTypes: {
    value: {
      control: false,
      description: '선택된 월 범위',
      table: {
        type: { summary: 'MonthRange' },
      },
    },
    onChange: {
      action: 'changed',
      description: '월 범위 변경 시 호출되는 콜백',
      table: {
        type: { summary: '(range: MonthRange) => void' },
      },
    },
    minDate: {
      control: 'date',
      description: '선택 가능한 최소 날짜',
      table: {
        type: { summary: 'Date' },
      },
    },
    maxDate: {
      control: 'date',
      description: '선택 가능한 최대 날짜',
      table: {
        type: { summary: 'Date' },
      },
    },
    disabledFuture: {
      control: 'boolean',
      description: '미래 월 비활성화',
      table: {
        type: { summary: 'boolean' },
      },
    },
    locale: {
      control: 'select',
      options: ['ko', 'en'],
      description: '로케일',
      table: {
        type: { summary: 'string' },
      },
    },
    label: {
      control: 'text',
      description: '라벨 텍스트',
      table: {
        type: { summary: 'string' },
      },
    },
    error: {
      control: 'text',
      description: '에러 상태 또는 메시지',
      table: {
        type: { summary: 'boolean | string' },
      },
    },
    supportText: {
      control: 'text',
      description: '보조 텍스트',
      table: {
        type: { summary: 'string' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
      table: {
        type: { summary: 'boolean' },
      },
    },
    showQuickPresets: {
      control: 'boolean',
      description: '빠른 선택 프리셋 표시 여부',
      table: {
        type: { summary: 'boolean' },
      },
    },
    presets: {
      control: false,
      description: '빠른 선택 프리셋 목록',
      table: {
        type: { summary: 'MonthRangePreset[]' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MonthRangePicker>;

/**
 * 기본 MonthRangePicker
 *
 * 이 스토리에서 컴포넌트의 모든 props를 테스트할 수 있습니다.
 */
export const Default: Story = {
  args: {
    label: '기간 선택',
    locale: 'ko',
    disabled: false,
    disabledFuture: false,
    showQuickPresets: false,
    presets: [],
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const [value, setValue] = useState<MonthRange>({});
    return (
      <div style={{ width: 300 }}>
        <MonthRangePicker
          label={args.label}
          locale={args.locale}
          disabled={args.disabled}
          disabledFuture={args.disabledFuture}
          showQuickPresets={args.showQuickPresets}
          presets={args.presets}
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};

/**
 * 값이 설정된 상태
 */
export const WithValue: Story = {
  render: function Render() {
    const [value, setValue] = useState<MonthRange>({
      from: new Date(2025, 0, 1),
      to: new Date(2025, 5, 1),
    });
    return (
      <div style={{ width: 300 }}>
        <MonthRangePicker
          label="기간 선택"
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};

/**
 * 미래 월 비활성화
 */
export const DisabledFuture: Story = {
  render: function Render() {
    const [value, setValue] = useState<MonthRange>({});
    return (
      <div style={{ width: 300 }}>
        <MonthRangePicker
          label="기간 선택"
          value={value}
          onChange={setValue}
          disabledFuture
        />
      </div>
    );
  },
};

/**
 * 에러 상태
 */
export const WithError: Story = {
  render: function Render() {
    const [value, setValue] = useState<MonthRange>({});
    return (
      <div style={{ width: 300 }}>
        <MonthRangePicker
          label="기간 선택"
          value={value}
          onChange={setValue}
          error="기간을 선택해 주세요"
        />
      </div>
    );
  },
};

/**
 * 비활성화 상태
 */
export const Disabled: Story = {
  render: () => (
    <div style={{ width: 300 }}>
      <MonthRangePicker
        label="기간 선택"
        disabled
      />
    </div>
  ),
};

/**
 * 빠른 선택 프리셋
 */
export const WithQuickPresets: Story = {
  render: function Render() {
    const [value, setValue] = useState<MonthRange>({});
    return (
      <div style={{ width: 300 }}>
        <MonthRangePicker
          label="기간 선택"
          value={value}
          onChange={setValue}
          showQuickPresets
        />
      </div>
    );
  },
};

/**
 * 영문 로케일
 */
export const EnglishLocale: Story = {
  render: function Render() {
    const [value, setValue] = useState<MonthRange>({});
    return (
      <div style={{ width: 300 }}>
        <MonthRangePicker
          label="Period"
          value={value}
          onChange={setValue}
          locale="en"
        />
      </div>
    );
  },
};
