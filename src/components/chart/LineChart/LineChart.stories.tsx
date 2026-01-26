import { useEffect, useRef } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { LineChart } from './LineChart';

const meta: Meta<typeof LineChart> = {
  title: 'Components/Chart/LineChart',
  component: LineChart,
  parameters: {
    layout: 'padded',
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
예시: [{ month: 'Jan', revenue: 100 }, ...]`,
        },
      },
    },
    xAxis: {
      control: 'object',
      description: 'X축 설정',
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
    dataKey: {
      control: 'text',
      description: '라인 값의 데이터 키 (단일 라인)',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    dataKeys: {
      control: 'object',
      description: '여러 라인용 데이터 키 배열',
      table: {
        type: {
          summary: 'string[]',
          detail: `각 키는 별도의 라인을 나타냄
예시: ['revenue', 'cost']`,
        },
      },
    },
    lineColors: {
      control: 'object',
      description: '여러 라인의 색상 매핑',
      table: {
        type: {
          summary: 'Record<string, string> | string[]',
          detail: `객체 매핑: { 'revenue': '#437DFC', 'cost': '#44BA82' }
배열 매핑: ['#437DFC', '#44BA82']`,
        },
      },
    },
    colors: {
      control: 'object',
      description: '라인의 색상 팔레트',
      table: {
        type: {
          summary: 'ChartColor',
          detail: `string | string[]`,
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
    showArea: {
      control: 'boolean',
      description: '라인 아래 영역 채우기 표시',
      table: {
        type: {
          summary: 'boolean',
        },
      },
    },
    showPoints: {
      control: 'boolean',
      description: '라인 위에 데이터 포인트 표시',
      table: {
        type: {
          summary: 'boolean',
        },
      },
    },
    strokeWidth: {
      control: { type: 'number', min: 1, max: 10, step: 1 },
      description: '라인 두께 (픽셀)',
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
  },
};

export default meta;
type Story = StoryObj<typeof LineChart>;

const defaultData = [
  { month: 'Jan', revenue: 100 },
  { month: 'Feb', revenue: 150 },
  { month: 'Mar', revenue: 120 },
  { month: 'Apr', revenue: 180 },
  { month: 'May', revenue: 200 },
  { month: 'Jun', revenue: 160 },
];

const largeData = [
  { month: 'Jan', revenue: 120 },
  { month: 'Feb', revenue: 180 },
  { month: 'Mar', revenue: 150 },
  { month: 'Apr', revenue: 220 },
  { month: 'May', revenue: 250 },
  { month: 'Jun', revenue: 200 },
  { month: 'Jul', revenue: 280 },
  { month: 'Aug', revenue: 300 },
  { month: 'Sep', revenue: 270 },
  { month: 'Oct', revenue: 320 },
  { month: 'Nov', revenue: 290 },
  { month: 'Dec', revenue: 350 },
];

const sparseData = [
  { month: 'Jan', revenue: 100 },
  { month: 'Apr', revenue: 180 },
  { month: 'Jul', revenue: 200 },
  { month: 'Oct', revenue: 160 },
];

/**
 * 기본 LineChart
 *
 * LineChart 컴포넌트는 `ref`와 `className` prop을 지원합니다.
 * - `ref`: DOM 요소에 직접 접근 가능
 * - `className`: 커스텀 스타일 클래스 추가 가능
 */
export const Default: Story = {
  args: {
    data: defaultData,
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'revenue' },
    dataKey: 'revenue',
    colors: ['#437dfc'],
    width: 600,
    height: 400,
    showArea: false,
    showPoints: true,
    strokeWidth: 2,
    showGrid: true,
    className: '',
  },
  render: (args) => {
    const chartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (chartRef.current) {
        console.log('LineChart ref:', chartRef.current);
      }
    }, []);

    return <LineChart ref={chartRef} {...args} />;
  },
};

export const WithArea: Story = {
  args: {
    data: defaultData,
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'revenue' },
    dataKey: 'revenue',
    colors: ['#437dfc'],
    width: 600,
    height: 400,
    showArea: true,
    showPoints: true,
    strokeWidth: 2,
    showGrid: true,
  },
};

export const NoPoints: Story = {
  args: {
    data: defaultData,
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'revenue' },
    dataKey: 'revenue',
    colors: ['#437dfc'],
    width: 600,
    height: 400,
    showArea: false,
    showPoints: false,
    strokeWidth: 2,
    showGrid: true,
  },
};

export const AreaNoPoints: Story = {
  args: {
    data: defaultData,
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'revenue' },
    dataKey: 'revenue',
    colors: ['#437dfc'],
    width: 600,
    height: 400,
    showArea: true,
    showPoints: false,
    strokeWidth: 2,
    showGrid: true,
  },
};

export const ThickLine: Story = {
  args: {
    data: defaultData,
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'revenue' },
    dataKey: 'revenue',
    colors: ['#437dfc'],
    width: 600,
    height: 400,
    showArea: false,
    showPoints: true,
    strokeWidth: 4,
    showGrid: true,
  },
};

export const ThinLine: Story = {
  args: {
    data: defaultData,
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'revenue' },
    dataKey: 'revenue',
    colors: ['#437dfc'],
    width: 600,
    height: 400,
    showArea: false,
    showPoints: true,
    strokeWidth: 1,
    showGrid: true,
  },
};

export const NoGrid: Story = {
  args: {
    data: defaultData,
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'revenue' },
    dataKey: 'revenue',
    colors: ['#437dfc'],
    width: 600,
    height: 400,
    showArea: false,
    showPoints: true,
    strokeWidth: 2,
    showGrid: false,
  },
};



export const LargeDataset: Story = {
  args: {
    data: largeData,
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'revenue' },
    dataKey: 'revenue',
    colors: ['#437dfc'],
    width: 800,
    height: 400,
    showArea: false,
    showPoints: true,
    strokeWidth: 2,
    showGrid: true,
  },
};

export const LargeDatasetWithArea: Story = {
  args: {
    data: largeData,
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'revenue' },
    dataKey: 'revenue',
    colors: ['#437dfc'],
    width: 800,
    height: 400,
    showArea: true,
    showPoints: true,
    strokeWidth: 2,
    showGrid: true,
  },
};

export const SparseData: Story = {
  args: {
    data: sparseData,
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'revenue' },
    dataKey: 'revenue',
    colors: ['#437dfc'],
    width: 600,
    height: 400,
    showArea: false,
    showPoints: true,
    strokeWidth: 2,
    showGrid: true,
  },
};

export const LargeSize: Story = {
  args: {
    data: defaultData,
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'revenue' },
    dataKey: 'revenue',
    colors: ['#437dfc'],
    width: 1000,
    height: 600,
    showArea: false,
    showPoints: true,
    strokeWidth: 2,
    showGrid: true,
  },
};

export const SmallSize: Story = {
  args: {
    data: defaultData,
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'revenue' },
    dataKey: 'revenue',
    colors: ['#437dfc'],
    width: 400,
    height: 300,
    showArea: false,
    showPoints: true,
    strokeWidth: 2,
    showGrid: true,
  },
};

export const DifferentColor: Story = {
  args: {
    data: defaultData,
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'revenue' },
    dataKey: 'revenue',
    colors: ['#44ba82'],
    width: 600,
    height: 400,
    showArea: false,
    showPoints: true,
    strokeWidth: 2,
    showGrid: true,
  },
};

export const DifferentColorWithArea: Story = {
  args: {
    data: defaultData,
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'revenue' },
    dataKey: 'revenue',
    colors: ['#f59e0b'],
    width: 600,
    height: 400,
    showArea: true,
    showPoints: true,
    strokeWidth: 2,
    showGrid: true,
  },
};