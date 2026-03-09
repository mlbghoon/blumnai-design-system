import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { DataRangeSlider } from '../DataRangeSlider';
import type { DataRangeSliderProps } from '../Slider.types';

const meta: Meta<DataRangeSliderProps> = {
  title: 'DataEntry/Slider/DataRangeSlider',
  component: DataRangeSlider,
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
      description: '슬라이더 트랙 및 차트 선택 영역 색상',
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
    separator: {
      control: 'text',
      description: '범위 표시 시 최소값과 최대값 사이 구분자 (예: "~", "to", "-")',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '~' },
      },
    },
    min: {
      control: 'number',
      description: '슬라이더 범위의 최소값',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    max: {
      control: 'number',
      description: '슬라이더 범위의 최대값',
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
    chartData: {
      control: 'object',
      description: '분포 차트 데이터 (각 값은 0~1 사이, 배열 길이가 데이터 포인트 수)',
      table: {
        type: {
          summary: 'number[]',
          detail: '예: [0.2, 0.5, 0.8, 0.3] - 각 값은 해당 위치의 높이 비율',
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
    label: '데이터 범위',
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
          label="커버리지"
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
          label="범위"
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
          label="비활성화"
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
          label="분포"
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
          label="차트 없음"
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};
