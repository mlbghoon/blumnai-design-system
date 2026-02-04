import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { SliderRangeInput } from '../SliderRangeInput';
import type { SliderRangeInputProps } from '../Slider.types';

const meta: Meta<SliderRangeInputProps> = {
  title: 'Components/Slider/SliderRangeInput',
  component: SliderRangeInput,
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
type Story = StoryObj<SliderRangeInputProps>;

/**
 * 기본 범위 슬라이더 + 입력
 *
 * 양쪽에 입력 필드가 있는 범위 슬라이더입니다.
 */
export const Default: Story = {
  args: {
    color: 'gray',
    label: 'Price Range',
    suffix: '',
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
    defaultValue: [20, 80],
    showTicks: false,
    tickCount: 11,
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const [value, setValue] = useState<[number, number]>(args.defaultValue || [20, 80]);
    return (
      <div style={{ width: 500 }}>
        <SliderRangeInput
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
 * 가격 범위
 */
export const PriceRange: Story = {
  render: function Render() {
    const [value, setValue] = useState<[number, number]>([100, 500]);
    return (
      <div style={{ width: 500 }}>
        <SliderRangeInput
          label="Budget"
          suffix="$"
          min={0}
          max={1000}
          step={10}
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};

/**
 * 연령 범위
 */
export const AgeRange: Story = {
  render: function Render() {
    const [value, setValue] = useState<[number, number]>([25, 45]);
    return (
      <div style={{ width: 500 }}>
        <SliderRangeInput
          label="Target Age"
          min={18}
          max={65}
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
      <div style={{ width: 500 }}>
        <SliderRangeInput
          label="Disabled Range"
          defaultValue={[30, 70]}
          disabled
        />
      </div>
    );
  },
};
