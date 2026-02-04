import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Slider } from '../Slider';
import type { SliderProps } from '../Slider.types';

const meta: Meta<SliderProps> = {
  title: 'Components/Slider/Slider',
  component: Slider,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  argTypes: {
    color: {
      control: 'select',
      options: ['gray', 'brand', 'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose'],
      description: '슬라이더 색상',
      table: {
        type: { summary: 'SliderColor' },
        defaultValue: { summary: 'gray' },
      },
    },
    label: {
      control: 'text',
      description: '라벨',
      table: {
        type: { summary: 'string' },
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
    value: {
      control: 'number',
      description: '현재 값',
      table: {
        type: { summary: 'number' },
      },
    },
    defaultValue: {
      control: 'number',
      description: '기본값',
      table: {
        type: { summary: 'number' },
      },
    },
    onChange: {
      action: 'changed',
      description: '값 변경 콜백',
      table: {
        type: { summary: '(value: number) => void' },
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
        defaultValue: { summary: '11' },
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
    label: 'Volume',
    showValue: true,
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
    defaultValue: 50,
    showTicks: false,
    tickCount: 11,
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const [value, setValue] = useState(args.defaultValue || 50);
    return (
      <div style={{ width: 320 }}>
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
          label="Brightness"
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
 * 비활성화 상태
 */
export const Disabled: Story = {
  render: function Render() {
    return (
      <div style={{ width: 320 }}>
        <Slider
          label="Disabled Slider"
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
      <div className="flex flex-col gap-24" style={{ width: 320 }}>
        <Slider color="gray" label="Gray (Default)" showValue defaultValue={50} />
        <Slider color="brand" label="Brand" showValue defaultValue={50} />
        <Slider color="blue" label="Blue" showValue defaultValue={50} />
        <Slider color="green" label="Green" showValue defaultValue={50} />
        <Slider color="red" label="Red" showValue defaultValue={50} />
        <Slider color="violet" label="Violet" showValue defaultValue={50} />
      </div>
    );
  },
};
