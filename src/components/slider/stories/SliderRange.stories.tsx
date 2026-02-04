import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { SliderRange } from '../SliderRange';
import type { SliderRangeProps } from '../Slider.types';

const meta: Meta<SliderRangeProps> = {
  title: 'Components/Slider/SliderRange',
  component: SliderRange,
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
    onChange: {
      action: 'changed',
      description: '범위 변경 콜백',
      table: {
        type: { summary: '(value: [number, number]) => void' },
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
type Story = StoryObj<SliderRangeProps>;

/**
 * 기본 범위 슬라이더
 *
 * 두 개의 핸들로 최소-최대 범위를 선택합니다.
 */
export const Default: Story = {
  args: {
    color: 'gray',
    label: 'Price Range',
    showValue: true,
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
    defaultValue: [25, 75],
    showTicks: false,
    tickCount: 11,
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const [value, setValue] = useState<[number, number]>(args.defaultValue || [25, 75]);
    return (
      <div style={{ width: 320 }}>
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
          label="Price"
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
          label="Working Hours"
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
          label="Disabled Range"
          showValue
          defaultValue={[20, 80]}
          disabled
        />
      </div>
    );
  },
};
