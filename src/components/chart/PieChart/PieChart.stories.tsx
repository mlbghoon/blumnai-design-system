import { useRef } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { PieChart } from './PieChart';
import type { ChartConfig } from '../Chart/Chart.types';

const meta: Meta<typeof PieChart> = {
  title: 'DataDisplay/Chart/PieChart',
  component: PieChart,
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  tags: ['autodocs'],
  argTypes: {
    data: {
      control: 'object',
      description: '키-값 쌍의 차트 데이터 배열',
      table: {
        type: {
          summary: 'ChartDataPoint[]',
          detail: `문자열 또는 숫자 값을 가진 객체 배열
예시: [{ category: 'A', value: 30 }, ...]`,
        },
      },
    },
    config: {
      control: 'object',
      description: '차트 데이터 시리즈 설정 (라벨, 색상)',
      table: {
        type: {
          summary: 'ChartConfig',
          detail: `{
  [nameKey값]: {
    label: string;
    color: string;
  }
}`,
        },
      },
    },
    dataKey: {
      control: 'text',
      description: '슬라이스 값의 데이터 키',
      table: {
        type: {
          summary: 'string',
          detail: `각 슬라이스의 숫자 값을 포함하는 데이터 객체의 키
예시: 'value'`,
        },
      },
    },
    nameKey: {
      control: 'text',
      description: '슬라이스 이름/라벨의 데이터 키',
      table: {
        type: {
          summary: 'string',
          detail: `각 슬라이스의 라벨을 포함하는 데이터 객체의 키
예시: 'category'`,
        },
      },
    },
    width: {
      control: { type: 'number', min: 200, max: 800, step: 50 },
      description: '차트 컨테이너의 너비를 픽셀 단위로 설정합니다',
      table: {
        type: {
          summary: 'number',
        },
      },
    },
    height: {
      control: { type: 'number', min: 200, max: 800, step: 50 },
      description: '차트 컨테이너의 높이를 픽셀 단위로 설정합니다',
      table: {
        type: {
          summary: 'number',
        },
      },
    },
    outerRadius: {
      control: { type: 'number', min: 50, max: 300, step: 10 },
      description: '파이 차트의 외부 반지름을 픽셀 단위로 설정합니다. 값이 클수록 차트가 커집니다',
      table: {
        type: {
          summary: 'number',
        },
      },
    },
    showLegend: {
      control: 'boolean',
      description: 'true로 설정하면 차트 하단에 각 슬라이스를 구분하는 범례를 표시합니다',
      table: {
        type: {
          summary: 'boolean',
        },
      },
    },
    isHalf: {
      control: 'boolean',
      description: 'true로 설정하면 차트의 상단 절반만 표시하여 반원형 차트를 만듭니다',
      table: {
        type: {
          summary: 'boolean',
        },
      },
    },
    ariaLabel: {
      control: 'text',
      description: '스크린 리더를 위한 차트 설명 텍스트입니다. 접근성을 위해 차트의 내용을 설명합니다',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof PieChart>;

const defaultData = [
  { category: '카테고리 A', value: 30 },
  { category: '카테고리 B', value: 45 },
  { category: '카테고리 C', value: 25 },
];

const multipleData = [
  { category: '카테고리 A', value: 25 },
  { category: '카테고리 B', value: 30 },
  { category: '카테고리 C', value: 20 },
  { category: '카테고리 D', value: 15 },
  { category: '카테고리 E', value: 10 },
];

const defaultConfig: ChartConfig = {
  '카테고리 A': { label: '카테고리 A', color: 'var(--chart-1)' },
  '카테고리 B': { label: '카테고리 B', color: 'var(--chart-2)' },
  '카테고리 C': { label: '카테고리 C', color: 'var(--chart-3)' },
};

const multipleConfig: ChartConfig = {
  '카테고리 A': { label: '카테고리 A', color: 'var(--chart-1)' },
  '카테고리 B': { label: '카테고리 B', color: 'var(--chart-2)' },
  '카테고리 C': { label: '카테고리 C', color: 'var(--chart-3)' },
  '카테고리 D': { label: '카테고리 D', color: 'var(--chart-4)' },
  '카테고리 E': { label: '카테고리 E', color: 'var(--chart-5)' },
};

/**
 * 기본 PieChart
 *
 * PieChart 컴포넌트는 `ref`와 `className` prop을 지원합니다.
 * config를 사용해 각 슬라이스의 라벨과 색상을 설정합니다.
 */
export const Default: Story = {
  args: {
    data: defaultData,
    dataKey: 'value',
    nameKey: 'category',
    config: defaultConfig,
    width: 400,
    height: 400,
    outerRadius: 150,
    showLegend: false,
    className: '',
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const chartRef = useRef<HTMLDivElement>(null);
    return <PieChart ref={chartRef} {...args} />;
  },
};

export const WithLegend: Story = {
  args: {
    data: defaultData,
    dataKey: 'value',
    nameKey: 'category',
    config: defaultConfig,
    width: 400,
    height: 400,
    outerRadius: 150,
    showLegend: true,
  },
};

export const MultipleCategories: Story = {
  args: {
    data: multipleData,
    dataKey: 'value',
    nameKey: 'category',
    config: multipleConfig,
    width: 400,
    height: 400,
    outerRadius: 150,
    showLegend: false,
  },
};

export const MultipleCategoriesWithLegend: Story = {
  args: {
    data: multipleData,
    dataKey: 'value',
    nameKey: 'category',
    config: multipleConfig,
    width: 400,
    height: 400,
    outerRadius: 150,
    showLegend: true,
  },
};

export const HalfChart: Story = {
  args: {
    data: multipleData,
    dataKey: 'value',
    nameKey: 'category',
    config: multipleConfig,
    width: 280,
    outerRadius: 140,
    isHalf: true,
    showLegend: false,
  },
};

export const HalfChartWithLegend: Story = {
  args: {
    data: multipleData,
    dataKey: 'value',
    nameKey: 'category',
    config: multipleConfig,
    width: 280,
    outerRadius: 140,
    isHalf: true,
    showLegend: true,
  },
};

export const LargeSize: Story = {
  args: {
    data: defaultData,
    dataKey: 'value',
    nameKey: 'category',
    config: defaultConfig,
    width: 600,
    height: 600,
    outerRadius: 250,
    showLegend: false,
  },
};

export const SmallSize: Story = {
  args: {
    data: defaultData,
    dataKey: 'value',
    nameKey: 'category',
    config: defaultConfig,
    width: 250,
    height: 250,
    outerRadius: 100,
    showLegend: false,
  },
};

/**
 * 빈 데이터
 *
 * data가 빈 배열일 때 차트가 크래시 없이 빈 영역을 렌더링합니다.
 */
export const EmptyData: Story = {
  args: {
    data: [],
    dataKey: 'value',
    nameKey: 'category',
    config: defaultConfig,
    width: 400,
    height: 400,
    outerRadius: 150,
  },
};

/**
 * 모든 값이 0
 *
 * 모든 슬라이스 값이 0일 때 빈 파이가 렌더링됩니다 (크래시 없음).
 */
export const AllZeroValues: Story = {
  args: {
    data: [
      { category: '카테고리 A', value: 0 },
      { category: '카테고리 B', value: 0 },
      { category: '카테고리 C', value: 0 },
    ],
    dataKey: 'value',
    nameKey: 'category',
    config: defaultConfig,
    width: 400,
    height: 400,
    outerRadius: 150,
  },
};

/**
 * 접근성 라벨
 *
 * ariaLabel prop을 사용해 스크린 리더에서 차트를 설명합니다.
 */
export const WithAccessibility: Story = {
  args: {
    data: defaultData,
    dataKey: 'value',
    nameKey: 'category',
    config: defaultConfig,
    width: 400,
    height: 400,
    outerRadius: 150,
    showLegend: true,
    ariaLabel: '카테고리별 분포 파이 차트',
  },
};
