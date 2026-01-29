import { useEffect, useRef } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { BarChart } from './BarChart';

const meta: Meta<typeof BarChart> = {
  title: 'Components/Chart/BarChart',
  component: BarChart,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    data: {
      control: 'object',
      description: '키-값 쌍의 차트 데이터 배열',
      type: { required: true },
      table: {
        type: {
          summary: 'ChartDataPoint[]',
          detail: `문자열 또는 숫자 값을 가진 객체 배열
예시: [{ month: 'Jan', sales: 100 }, ...]`,
        },
      },
    },
    xAxis: {
      control: 'object',
      description: 'X축 설정',
      type: { required: true },
      table: {
        type: {
          summary: 'ChartAxisConfig',
          detail: `{
  dataKey: string;
  label?: string;
  domain?: [number, number] | 'auto';
  tickFormatter?: (value) => string;
}`,
        },
      },
    },
    yAxis: {
      control: 'object',
      description: 'Y축 설정',
      type: { required: true },
      table: {
        type: {
          summary: 'ChartAxisConfig',
          detail: `{
  dataKey: string;
  label?: string;
  domain?: [number, number] | 'auto';
  tickFormatter?: (value) => string;
}`,
        },
      },
    },
    colors: {
      control: 'object',
      description: '차트 막대의 색상 팔레트',
      table: {
        type: {
          summary: 'ChartColor',
          detail: `string | string[]

단일 색상: '#44ba82'
배열: ['#437dfc', '#44ba82', '#f59e0b']`,
        },
      },
    },
    width: {
      control: { type: 'number', min: 200, max: 1200, step: 50 },
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
    barSize: {
      control: { type: 'number', min: 8, max: 80, step: 4 },
      description: '각 막대의 크기 (픽셀)',
      table: {
        type: {
          summary: 'number',
        },
      },
    },
    gap: {
      control: { type: 'number', min: 0, max: 32, step: 2 },
      description: '막대 사이 간격 (픽셀)',
      table: {
        type: {
          summary: 'number',
        },
      },
    },
    showGrid: {
      control: 'boolean',
      description: '그리드 라인 표시',
      table: {
        type: {
          summary: 'boolean',
        },
      },
    },
    stacked: {
      control: 'boolean',
      description: '여러 데이터 시리즈를 누적 막대로 렌더링',
      table: {
        type: {
          summary: 'boolean',
        },
      },
    },
    stackedKeys: {
      control: 'object',
      description: '누적 막대용 데이터 키 배열',
      table: {
        type: {
          summary: 'string[]',
          detail: `각 키는 누적 막대의 레이어를 나타냄
예시: ['value1', 'value2']`,
        },
      },
    },
    stackedColors: {
      control: 'object',
      description: '누적 값의 색상 매핑',
      table: {
        type: {
          summary: 'Record<string, string> | string[]',
          detail: `객체 매핑: { 'value1': '#F27313', 'value2': '#2D766F' }
배열 매핑: ['#F27313', '#2D766F']`,
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof BarChart>;

// 샘플 데이터
const defaultData = [
  { month: 'Jan', sales: 100 },
  { month: 'Feb', sales: 150 },
  { month: 'Mar', sales: 120 },
  { month: 'Apr', sales: 180 },
  { month: 'May', sales: 200 },
  { month: 'Jun', sales: 160 },
];

/**
 * 기본 BarChart
 *
 * BarChart 컴포넌트는 `ref`와 `className` prop을 지원합니다.
 * - `ref`: DOM 요소에 직접 접근 가능
 * - `className`: 커스텀 스타일 클래스 추가 가능
 */
export const Default: Story = {
  args: {
    data: defaultData,
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'sales' },
    dataKey: 'sales',
    colors: ['#44ba82'],
    width: 600,
    height: 400,
    // barSize와 gap 미제공 - 동적으로 계산됨
    showGrid: true,
    className: '',
  },
  render: (args) => {
    const chartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (chartRef.current) {
        console.log('BarChart ref:', chartRef.current);
      }
    }, []);

    return <BarChart ref={chartRef} {...args} />;
  },
};

export const MultipleColors: Story = {
  args: {
    data: defaultData,
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'sales' },
    dataKey: 'sales',
    colors: ['#437dfc', '#44ba82', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'],
    width: 600,
    height: 400,
    barSize: 24,
    gap: 8,
    showGrid: true,
  },
};


export const NoGrid: Story = {
  args: {
    data: defaultData,
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'sales' },
    dataKey: 'sales',
    colors: ['#44ba82'],
    width: 600,
    height: 400,
    barSize: 24,
    gap: 8,
    showGrid: false,
  },
};

export const CustomSizes: Story = {
  args: {
    data: defaultData,
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'sales' },
    dataKey: 'sales',
    colors: ['#44ba82'],
    width: 800,
    height: 500,
    barSize: 32,
    gap: 12,
    showGrid: true,
  },
};

export const LargeDataset: Story = {
  args: {
    data: [
      { month: 'Jan', sales: 100 },
      { month: 'Feb', sales: 150 },
      { month: 'Mar', sales: 120 },
      { month: 'Apr', sales: 180 },
      { month: 'May', sales: 200 },
      { month: 'Jun', sales: 160 },
      { month: 'Jul', sales: 220 },
      { month: 'Aug', sales: 190 },
      { month: 'Sep', sales: 240 },
      { month: 'Oct', sales: 210 },
      { month: 'Nov', sales: 180 },
      { month: 'Dec', sales: 250 },
    ],
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'sales' },
    dataKey: 'sales',
    colors: ['#437dfc', '#44ba82'],
    width: 800,
    height: 400,
    barSize: 20,
    gap: 4,
    showGrid: true,
  },
};

export const DynamicSizing: Story = {
  args: {
    data: defaultData,
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'sales' },
    dataKey: 'sales',
    colors: ['#44ba82'],
    width: 600,
    height: 400,
    // barSize와 gap 미제공 - 동적으로 계산됨
    showGrid: true,
  },
};

export const CustomBarSizeOnly: Story = {
  args: {
    data: defaultData,
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'sales' },
    dataKey: 'sales',
    colors: ['#44ba82'],
    width: 600,
    height: 400,
    barSize: 40,
    // gap 미제공 - 동적으로 계산됨
    showGrid: true,
  },
};

export const CustomGapOnly: Story = {
  args: {
    data: defaultData,
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'sales' },
    dataKey: 'sales',
    colors: ['#44ba82'],
    width: 600,
    height: 400,
    // barSize 미제공 - 동적으로 계산됨
    gap: 16,
    showGrid: true,
  },
};

export const StackedBars: Story = {
  args: {
    data: [
      { month: 'Jan', value1: 100, value2: 150 },
      { month: 'Feb', value1: 120, value2: 180 },
      { month: 'Mar', value1: 80, value2: 200 },
      { month: 'Apr', value1: 90, value2: 170 },
      { month: 'May', value1: 110, value2: 190 },
      { month: 'Jun', value1: 130, value2: 160 },
    ],
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'value1' },
    stacked: true,
    stackedKeys: ['value1', 'value2'],
    colors: ['#F27313', '#2D766F'],
    width: 600,
    height: 400,
    showGrid: true,
  },
};

export const StackedBarsWithCustomColors: Story = {
  args: {
    data: [
      { month: 'Jan', value1: 100, value2: 150 },
      { month: 'Feb', value1: 120, value2: 180 },
      { month: 'Mar', value1: 80, value2: 200 },
      { month: 'Apr', value1: 90, value2: 170 },
      { month: 'May', value1: 110, value2: 190 },
      { month: 'Jun', value1: 130, value2: 160 },
    ],
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'value1' },
    stacked: true,
    stackedKeys: ['value1', 'value2'],
    // 키별 커스텀 색상을 위한 객체 매핑 사용
    stackedColors: {
      value1: '#F27313',
      value2: '#2D766F',
    },
    width: 600,
    height: 400,
    showGrid: true,
  },
};

export const StackedBarsWithArrayColors: Story = {
  args: {
    data: [
      { month: 'Jan', value1: 100, value2: 150 },
      { month: 'Feb', value1: 120, value2: 180 },
      { month: 'Mar', value1: 80, value2: 200 },
      { month: 'Apr', value1: 90, value2: 170 },
      { month: 'May', value1: 110, value2: 190 },
      { month: 'Jun', value1: 130, value2: 160 },
    ],
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'value1' },
    stacked: true,
    stackedKeys: ['value1', 'value2'],
    // 배열 매핑 사용 (인덱스 기반)
    stackedColors: ['#F27313', '#2D766F'],
    width: 600,
    height: 400,
    showGrid: true,
  },
};
