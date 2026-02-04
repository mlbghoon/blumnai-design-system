import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { DataRangeSliderInput } from '../DataRangeSliderInput';
import type { DataRangeSliderInputProps } from '../Slider.types';

const meta: Meta<DataRangeSliderInputProps> = {
  title: 'Components/Slider/DataRangeSliderInput',
  component: DataRangeSliderInput,
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
        defaultValue: { summary: '%' },
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
    chartData: {
      control: 'object',
      description: '차트 데이터 (0-1 사이 값 배열)',
      table: {
        type: { summary: 'number[]' },
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

const sampleChartData = [
  0.2, 0.3, 0.5, 0.7, 0.9, 1.0, 0.95, 0.85, 0.7, 0.6,
  0.5, 0.45, 0.4, 0.35, 0.3, 0.25, 0.2, 0.15, 0.1, 0.05,
];

export default meta;
type Story = StoryObj<DataRangeSliderInputProps>;

/**
 * 기본 데이터 범위 슬라이더 + 입력
 *
 * 퍼센트 값을 입력할 수 있는 범위 슬라이더입니다.
 */
export const Default: Story = {
  args: {
    color: 'gray',
    label: 'Data Coverage',
    suffix: '%',
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
    defaultValue: [20, 80],
    chartData: sampleChartData,
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
        <DataRangeSliderInput
          color={args.color}
          label={args.label}
          suffix={args.suffix}
          min={args.min}
          max={args.max}
          step={args.step}
          disabled={args.disabled}
          chartData={args.chartData}
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
 * 퍼센트 범위
 */
export const PercentageRange: Story = {
  render: function Render() {
    const [value, setValue] = useState<[number, number]>([10, 90]);
    return (
      <div style={{ width: 500 }}>
        <DataRangeSliderInput
          label="Progress Range"
          suffix="%"
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};

/**
 * 커버리지 범위
 */
export const CoverageRange: Story = {
  render: function Render() {
    const [value, setValue] = useState<[number, number]>([25, 75]);
    return (
      <div style={{ width: 500 }}>
        <DataRangeSliderInput
          label="Coverage Area"
          suffix="%"
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
        <DataRangeSliderInput
          label="Disabled"
          suffix="%"
          defaultValue={[30, 70]}
          chartData={sampleChartData}
          disabled
        />
      </div>
    );
  },
};

/**
 * 차트 포함
 */
export const WithChart: Story = {
  render: function Render() {
    const [value, setValue] = useState<[number, number]>([20, 60]);
    const chartData = [
      0.1, 0.2, 0.35, 0.5, 0.7, 0.85, 0.95, 1.0, 0.9, 0.75,
      0.6, 0.5, 0.4, 0.35, 0.3, 0.25, 0.2, 0.15, 0.1, 0.08,
    ];
    return (
      <div style={{ width: 500 }}>
        <DataRangeSliderInput
          label="Distribution"
          suffix="%"
          chartData={chartData}
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};

/**
 * 차트 없음
 */
export const WithoutChart: Story = {
  render: function Render() {
    const [value, setValue] = useState<[number, number]>([30, 70]);
    return (
      <div style={{ width: 500 }}>
        <DataRangeSliderInput
          label="No Chart"
          suffix="%"
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};
