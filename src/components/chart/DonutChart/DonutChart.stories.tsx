import { useRef } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { DonutChart } from './DonutChart';
import type { ChartConfig } from '../Chart/Chart.types';

const meta: Meta<typeof DonutChart> = {
  title: 'DataDisplay/Chart/DonutChart',
  component: DonutChart,
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
      description: '차트 너비 (픽셀)',
      table: {
        type: {
          summary: 'number',
        },
      },
    },
    height: {
      control: { type: 'number', min: 200, max: 800, step: 50 },
      description: '차트 높이 (픽셀)',
      table: {
        type: {
          summary: 'number',
        },
      },
    },
    innerRadius: {
      control: { type: 'number', min: 20, max: 200, step: 10 },
      description: '도넛의 내부 반경 (구멍 생성)',
      table: {
        type: {
          summary: 'number',
        },
      },
    },
    outerRadius: {
      control: { type: 'number', min: 50, max: 300, step: 10 },
      description: '도넛의 외부 반경',
      table: {
        type: {
          summary: 'number',
        },
      },
    },
    centerLabel: {
      control: 'text',
      description: '도넛 중앙에 표시되는 라벨 텍스트',
      table: {
        type: {
          summary: 'string',
          detail: `예시: 'Total'`,
        },
      },
    },
    centerValue: {
      control: 'text',
      description: '도넛 중앙에 표시되는 값 텍스트',
      table: {
        type: {
          summary: 'string',
          detail: `예시: '$20,000'`,
        },
      },
    },
    showLegend: {
      control: 'boolean',
      description: '차트 범례 표시',
      table: {
        type: {
          summary: 'boolean',
        },
      },
    },
    isHalf: {
      control: 'boolean',
      description: '차트의 상단 절반만 표시',
      table: {
        type: {
          summary: 'boolean',
        },
      },
    },
    ariaLabel: {
      control: 'text',
      description: '접근성을 위한 차트 설명',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DonutChart>;

const defaultData = [
  { category: 'Category A', value: 30 },
  { category: 'Category B', value: 45 },
  { category: 'Category C', value: 25 },
];

const twoCategoryData = [
  { category: 'Category A', value: 70 },
  { category: 'Category B', value: 30 },
];

const multipleData = [
  { category: 'Category A', value: 25 },
  { category: 'Category B', value: 30 },
  { category: 'Category C', value: 20 },
  { category: 'Category D', value: 15 },
  { category: 'Category E', value: 10 },
];

const defaultConfig: ChartConfig = {
  'Category A': { label: 'Category A', color: 'var(--chart-1)' },
  'Category B': { label: 'Category B', color: 'var(--chart-2)' },
  'Category C': { label: 'Category C', color: 'var(--chart-3)' },
};

const twoConfig: ChartConfig = {
  'Category A': { label: 'Category A', color: 'var(--chart-2)' },
  'Category B': { label: 'Category B', color: 'var(--chart-4)' },
};

const multipleConfig: ChartConfig = {
  'Category A': { label: 'Category A', color: 'var(--chart-1)' },
  'Category B': { label: 'Category B', color: 'var(--chart-2)' },
  'Category C': { label: 'Category C', color: 'var(--chart-3)' },
  'Category D': { label: 'Category D', color: 'var(--chart-4)' },
  'Category E': { label: 'Category E', color: 'var(--chart-5)' },
};

/**
 * 기본 DonutChart
 *
 * DonutChart 컴포넌트는 `ref`와 `className` prop을 지원합니다.
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
    innerRadius: 80,
    outerRadius: 150,
    showLegend: false,
    className: '',
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const chartRef = useRef<HTMLDivElement>(null);
    return <DonutChart ref={chartRef} {...args} />;
  },
};

export const WithCenterText: Story = {
  args: {
    data: defaultData,
    dataKey: 'value',
    nameKey: 'category',
    config: defaultConfig,
    width: 400,
    height: 400,
    innerRadius: 80,
    outerRadius: 150,
    centerLabel: 'Total',
    centerValue: '$20,000',
    showLegend: false,
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
    innerRadius: 80,
    outerRadius: 150,
    showLegend: true,
  },
};

export const WithCenterTextAndLegend: Story = {
  args: {
    data: defaultData,
    dataKey: 'value',
    nameKey: 'category',
    config: defaultConfig,
    width: 400,
    height: 400,
    innerRadius: 80,
    outerRadius: 150,
    centerLabel: 'Total',
    centerValue: '$20,000',
    showLegend: true,
  },
};

export const TwoCategories: Story = {
  args: {
    data: twoCategoryData,
    dataKey: 'value',
    nameKey: 'category',
    config: twoConfig,
    width: 400,
    height: 400,
    innerRadius: 80,
    outerRadius: 150,
    centerLabel: 'Label',
    centerValue: '$20,000',
    showLegend: false,
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
    innerRadius: 80,
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
    innerRadius: 80,
    outerRadius: 150,
    showLegend: true,
  },
};

export const HalfChart: Story = {
  args: {
    data: twoCategoryData,
    dataKey: 'value',
    nameKey: 'category',
    config: twoConfig,
    width: 280,
    innerRadius: 80,
    outerRadius: 140,
    centerLabel: 'Label',
    centerValue: '$20,000',
    isHalf: true,
    showLegend: false,
  },
};

export const HalfChartWithLegend: Story = {
  args: {
    data: twoCategoryData,
    dataKey: 'value',
    nameKey: 'category',
    config: twoConfig,
    width: 280,
    innerRadius: 80,
    outerRadius: 140,
    centerLabel: 'Label',
    centerValue: '$20,000',
    isHalf: true,
    showLegend: true,
  },
};

export const HalfChartMultipleCategories: Story = {
  args: {
    data: multipleData,
    dataKey: 'value',
    nameKey: 'category',
    config: multipleConfig,
    width: 280,
    innerRadius: 80,
    outerRadius: 140,
    isHalf: true,
    showLegend: false,
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
    innerRadius: 120,
    outerRadius: 250,
    centerLabel: 'Total',
    centerValue: '$20,000',
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
    innerRadius: 50,
    outerRadius: 100,
    showLegend: false,
  },
};

export const ThinDonut: Story = {
  args: {
    data: defaultData,
    dataKey: 'value',
    nameKey: 'category',
    config: defaultConfig,
    width: 400,
    height: 400,
    innerRadius: 130,
    outerRadius: 150,
    centerLabel: 'Total',
    centerValue: '$20,000',
    showLegend: false,
  },
};

export const ThickDonut: Story = {
  args: {
    data: defaultData,
    dataKey: 'value',
    nameKey: 'category',
    config: defaultConfig,
    width: 400,
    height: 400,
    innerRadius: 50,
    outerRadius: 150,
    centerLabel: 'Total',
    centerValue: '$20,000',
    showLegend: false,
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
    innerRadius: 80,
    outerRadius: 150,
    centerLabel: 'Total',
    centerValue: '$20,000',
    showLegend: true,
    ariaLabel: '카테고리별 분포 도넛 차트',
  },
};
