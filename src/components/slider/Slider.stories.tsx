import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Slider } from './Slider';
import type { SliderProps } from './Slider.types';

const meta: Meta<SliderProps> = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: '슬라이더 크기',
      table: {
        type: { summary: 'SliderSize', detail: "'sm' | 'md' | 'lg'" },
        defaultValue: { summary: 'md' },
      },
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'destructive'],
      description: '슬라이더 색상',
      table: {
        type: { summary: 'SliderColor', detail: "'primary' | 'secondary' | 'success' | 'destructive'" },
        defaultValue: { summary: 'primary' },
      },
    },
    showValue: {
      control: 'boolean',
      description: '현재 값 표시 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    showTicks: {
      control: 'boolean',
      description: '눈금 표시 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    tickCount: {
      control: 'number',
      description: '눈금 개수',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '5' },
      },
    },
    label: {
      control: 'text',
      description: '라벨',
      table: {
        type: { summary: 'string' },
      },
    },
    min: {
      control: 'number',
      description: '최소값',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    max: {
      control: 'number',
      description: '최대값',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '100' },
      },
    },
    step: {
      control: 'number',
      description: '스텝 단위',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    defaultValue: {
      control: 'object',
      description: '기본값 (배열)',
      table: {
        type: { summary: 'number[]' },
      },
    },
    onChange: {
      action: 'changed',
      description: '값 변경 콜백',
      table: {
        type: { summary: '(value: number[]) => void' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<SliderProps>;

/**
 * 기본 슬라이더
 */
export const Default: Story = {
  args: {
    size: 'md',
    color: 'primary',
    showValue: false,
    showTicks: false,
    tickCount: 5,
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
    defaultValue: [50],
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const [value, setValue] = useState(args.defaultValue || [50]);
    return (
      <div style={{ width: 320 }}>
        <Slider
          {...args}
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};

/**
 * 크기 변형
 */
export const Sizes: Story = {
  render: function Render() {
    return (
      <div className="flex flex-col gap-24" style={{ width: 320 }}>
        <Slider size="sm" label="Small" defaultValue={[30]} showValue />
        <Slider size="md" label="Medium" defaultValue={[50]} showValue />
        <Slider size="lg" label="Large" defaultValue={[70]} showValue />
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
      <div className="flex flex-col gap-24" style={{ width: 320 }}>
        <Slider color="primary" label="Primary" defaultValue={[50]} showValue />
        <Slider color="secondary" label="Secondary" defaultValue={[50]} showValue />
        <Slider color="success" label="Success" defaultValue={[50]} showValue />
        <Slider color="destructive" label="Destructive" defaultValue={[50]} showValue />
      </div>
    );
  },
};

/**
 * 값 표시
 */
export const WithValue: Story = {
  render: function Render() {
    const [value, setValue] = useState([50]);
    return (
      <div style={{ width: 320 }}>
        <Slider
          label="Volume"
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
 * 눈금 표시
 */
export const WithTicks: Story = {
  render: function Render() {
    const [value, setValue] = useState([50]);
    return (
      <div style={{ width: 320 }}>
        <Slider
          label="Progress"
          showValue
          showTicks
          tickCount={5}
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
    const [value, setValue] = useState([25]);
    return (
      <div style={{ width: 320 }}>
        <Slider
          label="Temperature"
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
 * 비활성화
 */
export const Disabled: Story = {
  render: function Render() {
    return (
      <div style={{ width: 320 }}>
        <Slider
          label="Disabled"
          showValue
          defaultValue={[50]}
          disabled
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
    const [value, setValue] = useState([30]);
    return (
      <div className="flex flex-col gap-16" style={{ width: 320 }}>
        <Slider
          label="Controlled Slider"
          showValue
          value={value}
          onChange={setValue}
        />
        <div className="flex gap-8">
          <button
            type="button"
            onClick={() => setValue([0])}
            className="padding-x-12 padding-y-6 bg-muted text-default rounded-md size-sm font-body"
          >
            Min
          </button>
          <button
            type="button"
            onClick={() => setValue([50])}
            className="padding-x-12 padding-y-6 bg-muted text-default rounded-md size-sm font-body"
          >
            50%
          </button>
          <button
            type="button"
            onClick={() => setValue([100])}
            className="padding-x-12 padding-y-6 bg-muted text-default rounded-md size-sm font-body"
          >
            Max
          </button>
        </div>
      </div>
    );
  },
};
