import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Slider } from '../Slider';
import type { SliderProps } from '../Slider.types';

const meta: Meta<SliderProps> = {
  title: 'DataEntry/Slider',
  component: Slider,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  argTypes: {
    value: {
      control: 'number',
      description: '현재 슬라이더 값 (number 타입)',
      table: {
        type: {
          summary: 'number',
          detail: '슬라이더의 현재 위치를 나타내는 숫자 값',
        },
      },
    },
    defaultValue: {
      control: 'number',
      description: '기본 슬라이더 값 (number 타입)',
      table: {
        type: {
          summary: 'number',
          detail: '슬라이더의 초기 위치를 나타내는 숫자 값',
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
      description: '슬라이더 상단 우측에 현재 값 표시 여부',
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
          summary: '(value: number) => void',
          detail: 'value: 변경된 슬라이더 값 (number 타입)',
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
      description: '상단 값 표시 포맷 함수',
      table: {
        type: {
          summary: '(value: number) => string',
          detail: "예: (v) => `${v}%` → '50%'",
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
type Story = StoryObj<SliderProps>;

/**
 * 기본 슬라이더
 *
 * 단일 값을 선택하는 슬라이더입니다.
 */
export const Default: Story = {
  args: {
    color: 'gray',
    label: '볼륨',
    showValue: true,
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
    defaultValue: 50,
    showTicks: false,
    tickCount: 11,
    orientation: 'horizontal',
    height: 200,
    formatValue: undefined,
    formatTick: undefined,
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const [value, setValue] = useState(args.defaultValue || 50);
    return (
      <div style={{ width: args.orientation === 'vertical' ? undefined : 320 }}>
        <Slider
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
 * 라벨과 값 표시
 */
export const WithLabelAndValue: Story = {
  render: function Render() {
    const [value, setValue] = useState(50);
    return (
      <div style={{ width: 320 }}>
        <Slider
          label="밝기"
          showValue
          value={value}
          onChange={setValue}
          formatValue={(v) => `${v}%`}
        />
      </div>
    );
  },
};

/**
 * 커스텀 범위
 */
export const CustomRange: Story = {
  render: function Render() {
    const [value, setValue] = useState(25);
    return (
      <div style={{ width: 320 }}>
        <Slider
          label="온도"
          showValue
          min={0}
          max={50}
          step={5}
          value={value}
          onChange={setValue}
          formatValue={(v) => `${v}°C`}
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
        <Slider
          label="비활성화 슬라이더"
          showValue
          defaultValue={50}
          disabled
        />
      </div>
    );
  },
};

/**
 * 라벨 없음
 */
export const NoLabel: Story = {
  render: function Render() {
    const [value, setValue] = useState(30);
    return (
      <div style={{ width: 320 }}>
        <Slider
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};

/**
 * 색상 변형
 */
export const Colors: Story = {
  render: function Render() {
    return (
      <div className="flex flex-col ds-gap-24" style={{ width: 320 }}>
        <Slider color="gray" label="회색 (기본)" showValue defaultValue={50} />
        <Slider color="brand" label="브랜드" showValue defaultValue={50} />
        <Slider color="blue" label="파랑" showValue defaultValue={50} />
        <Slider color="green" label="초록" showValue defaultValue={50} />
        <Slider color="red" label="빨강" showValue defaultValue={50} />
        <Slider color="violet" label="보라" showValue defaultValue={50} />
      </div>
    );
  },
};

/**
 * 세로 방향 슬라이더
 */
export const Vertical: Story = {
  render: function Render() {
    const [value, setValue] = useState(50);
    return (
      <Slider
        orientation="vertical"
        height={250}
        label="Volume"
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
    const [value, setValue] = useState(50);
    return (
      <Slider
        orientation="vertical"
        height={250}
        label="Temperature"
        showValue
        value={value}
        onChange={setValue}
        formatValue={(v) => `${v}°C`}
        showTicks
        tickCount={6}
        formatTick={(v) => `${v}°`}
        color="blue"
      />
    );
  },
};
