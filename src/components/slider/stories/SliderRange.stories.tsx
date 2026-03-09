import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { SliderRange } from '../SliderRange';
import type { SliderRangeProps } from '../Slider.types';

const meta: Meta<SliderRangeProps> = {
  title: 'DataEntry/Slider/SliderRange',
  component: SliderRange,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  argTypes: {
    value: {
      description: '현재 범위 값 [최소값, 최대값]',
      table: {
        type: {
          summary: '[number, number]',
          detail: '첫 번째 값: 범위 시작값 (number)\n두 번째 값: 범위 끝값 (number)',
        },
      },
    },
    defaultValue: {
      description: '기본 범위 값 [최소값, 최대값]',
      table: {
        type: {
          summary: '[number, number]',
          detail: '첫 번째 값: 범위 시작값 (number)\n두 번째 값: 범위 끝값 (number)',
        },
      },
    },
    color: {
      control: 'select',
      options: ['gray', 'brand', 'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose'],
      description: '슬라이더 트랙 채움 색상',
      table: {
        type: {
          summary: 'SliderColor',
          detail: "'gray' | 'brand' | 'red' | 'orange' | 'amber' | 'yellow' | 'lime' | 'green' | 'emerald' | 'teal' | 'cyan' | 'sky' | 'blue' | 'indigo' | 'violet' | 'purple' | 'fuchsia' | 'pink' | 'rose'",
        },
        defaultValue: { summary: 'gray' },
      },
    },
    label: {
      control: 'text',
      description: '슬라이더 상단 좌측에 표시되는 라벨 텍스트',
      table: {
        type: { summary: 'string' },
      },
    },
    showValue: {
      control: 'boolean',
      description: '슬라이더 상단 우측에 현재 범위 값 표시 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    min: {
      control: 'number',
      description: '슬라이더 범위의 최소값 (number 타입)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    max: {
      control: 'number',
      description: '슬라이더 범위의 최대값 (number 타입)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '100' },
      },
    },
    step: {
      control: 'number',
      description: '값 변경 단위 (1이면 1씩 증가/감소)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태 (true면 조작 불가)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onChange: {
      action: 'changed',
      description: '값 변경 시 호출되는 콜백 함수',
      table: {
        type: {
          summary: '(value: [number, number]) => void',
          detail: 'value: [시작값, 끝값] 형태의 튜플',
        },
      },
    },
    showTicks: {
      control: 'boolean',
      description: '슬라이더 아래 눈금(0, 10, 20...) 표시 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    tickCount: {
      control: 'number',
      description: '표시할 눈금 개수 (min~max 사이를 균등 분할)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '11' },
      },
    },
    formatTick: {
      description: '눈금 라벨 포맷 함수',
      table: {
        type: {
          summary: '(value: number) => string',
          detail: "예: (v) => `$${v}` → '$0', '$10', '$20'...",
        },
      },
    },
    formatValue: {
      description: '상단 범위 표시 값 포맷 함수',
      table: {
        type: {
          summary: '(value: number) => string',
          detail: "예: (v) => `${v}%` → '20% ~ 80%'",
        },
      },
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: '슬라이더 방향',
      table: {
        type: {
          summary: "'horizontal' | 'vertical'",
        },
        defaultValue: { summary: 'horizontal' },
      },
    },
    height: {
      control: 'number',
      description: '세로 모드에서의 높이 (px)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '200' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<SliderRangeProps>;

/**
 * 기본 범위 슬라이더
 *
 * 두 개의 핸들로 최소-최대 범위를 선택합니다.
 */
export const Default: Story = {
  args: {
    color: 'gray',
    label: '가격 범위',
    showValue: true,
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
    defaultValue: [25, 75],
    showTicks: false,
    tickCount: 11,
    orientation: 'horizontal',
    height: 200,
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const [value, setValue] = useState<[number, number]>(args.defaultValue || [25, 75]);
    return (
      <div style={{ width: args.orientation === 'vertical' ? undefined : 320 }}>
        <SliderRange
          color={args.color}
          label={args.label}
          showValue={args.showValue}
          min={args.min}
          max={args.max}
          step={args.step}
          disabled={args.disabled}
          showTicks={args.showTicks}
          tickCount={args.tickCount}
          orientation={args.orientation}
          height={args.height}
          value={value}
          onChange={setValue}
          formatValue={args.formatValue}
        />
      </div>
    );
  },
};

/**
 * 가격 범위
 */
export const PriceRange: Story = {
  render: function Render() {
    const [value, setValue] = useState<[number, number]>([100, 500]);
    return (
      <div style={{ width: 320 }}>
        <SliderRange
          label="가격"
          showValue
          min={0}
          max={1000}
          step={10}
          value={value}
          onChange={setValue}
          formatValue={(v) => `$${v}`}
        />
      </div>
    );
  },
};

/**
 * 시간 범위
 */
export const TimeRange: Story = {
  render: function Render() {
    const [value, setValue] = useState<[number, number]>([9, 18]);
    return (
      <div style={{ width: 320 }}>
        <SliderRange
          label="근무 시간"
          showValue
          min={0}
          max={24}
          step={1}
          value={value}
          onChange={setValue}
          formatValue={(v) => `${v}:00`}
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
        <SliderRange
          label="비활성화 범위"
          showValue
          defaultValue={[20, 80]}
          disabled
        />
      </div>
    );
  },
};

/**
 * 세로 방향 범위 슬라이더
 */
export const Vertical: Story = {
  render: function Render() {
    const [value, setValue] = useState<[number, number]>([20, 80]);
    return (
      <SliderRange
        orientation="vertical"
        height={250}
        label="Range"
        showValue
        value={value}
        onChange={setValue}
        color="brand"
      />
    );
  },
};

/**
 * 세로 방향 + 눈금
 */
export const VerticalWithTicks: Story = {
  render: function Render() {
    const [value, setValue] = useState<[number, number]>([200, 800]);
    return (
      <SliderRange
        orientation="vertical"
        height={250}
        label="Price"
        showValue
        min={0}
        max={1000}
        step={10}
        value={value}
        onChange={setValue}
        formatValue={(v) => `$${v}`}
        showTicks
        tickCount={6}
        formatTick={(v) => `$${v}`}
        color="green"
      />
    );
  },
};
