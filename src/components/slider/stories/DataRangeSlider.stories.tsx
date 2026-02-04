import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { DataRangeSlider } from '../DataRangeSlider';
import type { DataRangeSliderProps } from '../Slider.types';

const meta: Meta<DataRangeSliderProps> = {
  title: 'Components/Slider/DataRangeSlider',
  component: DataRangeSlider,
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
    separator: {
      control: 'text',
      description: '범위 구분자',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '~' },
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
    formatTick: {
      description: '눈금 라벨 포맷 함수 (예: (v) => `$${v}` → "$0", "$10"...)',
      table: {
        type: { summary: '(value: number) => string' },
      },
    },
  },
};

const sampleChartData = [
  0.2, 0.3, 0.5, 0.7, 0.9, 1.0, 0.95, 0.85, 0.7, 0.6,
  0.5, 0.45, 0.4, 0.35, 0.3, 0.25, 0.2, 0.15, 0.1, 0.05,
];

export default meta;
type Story = StoryObj<DataRangeSliderProps>;

/**
 * 기본 데이터 범위 슬라이더
 *
 * "X% ~ Y%" 형식으로 범위를 표시합니다.
 */
export const Default: Story = {
  args: {
    color: 'gray',
    label: 'Data Range',
    separator: '~',
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
      <div style={{ width: 320 }}>
        <DataRangeSlider
          color={args.color}
          label={args.label}
          separator={args.separator}
          min={args.min}
          max={args.max}
          step={args.step}
          disabled={args.disabled}
          chartData={args.chartData}
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
 * 퍼센트 범위
 */
export const PercentageRange: Story = {
  render: function Render() {
    const [value, setValue] = useState<[number, number]>([10, 90]);
    return (
      <div style={{ width: 320 }}>
        <DataRangeSlider
          label="Coverage"
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};

/**
 * 커스텀 구분자
 */
export const CustomSeparator: Story = {
  render: function Render() {
    const [value, setValue] = useState<[number, number]>([30, 70]);
    return (
      <div style={{ width: 320 }}>
        <DataRangeSlider
          label="Range"
          separator="to"
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
      <div style={{ width: 320 }}>
        <DataRangeSlider
          label="Disabled"
          defaultValue={[25, 75]}
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
      <div style={{ width: 320 }}>
        <DataRangeSlider
          label="Distribution"
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
      <div style={{ width: 320 }}>
        <DataRangeSlider
          label="No Chart"
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};
