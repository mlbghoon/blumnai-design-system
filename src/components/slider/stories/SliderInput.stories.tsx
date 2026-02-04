import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { SliderInput } from '../SliderInput';
import type { SliderInputProps } from '../Slider.types';

const meta: Meta<SliderInputProps> = {
  title: 'Components/Slider/SliderInput',
  component: SliderInput,
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
    suffix: {
      control: 'text',
      description: '입력 필드 접미사',
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
type Story = StoryObj<SliderInputProps>;

/**
 * 기본 슬라이더 + 입력
 *
 * 슬라이더와 입력 필드가 동기화됩니다.
 */
export const Default: Story = {
  args: {
    color: 'gray',
    label: 'Volume',
    suffix: '%',
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
      <div style={{ width: 400 }}>
        <SliderInput
          color={args.color}
          label={args.label}
          suffix={args.suffix}
          min={args.min}
          max={args.max}
          step={args.step}
          disabled={args.disabled}
          showTicks={args.showTicks}
          tickCount={args.tickCount}
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};

/**
 * 퍼센트 입력
 */
export const Percentage: Story = {
  render: function Render() {
    const [value, setValue] = useState(75);
    return (
      <div style={{ width: 400 }}>
        <SliderInput
          label="Opacity"
          suffix="%"
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};

/**
 * 온도 입력
 */
export const Temperature: Story = {
  render: function Render() {
    const [value, setValue] = useState(22);
    return (
      <div style={{ width: 400 }}>
        <SliderInput
          label="Room Temperature"
          suffix="°C"
          min={16}
          max={30}
          step={0.5}
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};

/**
 * 접미사 없음
 */
export const NoSuffix: Story = {
  render: function Render() {
    const [value, setValue] = useState(50);
    return (
      <div style={{ width: 400 }}>
        <SliderInput
          label="Quantity"
          min={1}
          max={100}
          value={value}
          onChange={setValue}
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
      <div style={{ width: 400 }}>
        <SliderInput
          label="Disabled"
          suffix="%"
          defaultValue={50}
          disabled
        />
      </div>
    );
  },
};
