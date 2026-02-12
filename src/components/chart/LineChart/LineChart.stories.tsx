import { useRef } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { LineChart } from './LineChart';
import type { ChartConfig } from '../Chart/Chart.types';

const meta: Meta<typeof LineChart> = {
  title: 'DataDisplay/Chart/LineChart',
  component: LineChart,
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
예시: [{ month: 'Jan', revenue: 100 }, ...]`,
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
  [dataKey]: {
    label: string;
    color: string;
  }
}`,
        },
      },
    },
    xAxis: {
      control: 'object',
      description: 'X축 설정',
      table: {
        type: {
          summary: 'ChartAxisConfig',
        },
      },
    },
    yAxis: {
      control: 'object',
      description: 'Y축 설정',
      table: {
        type: {
          summary: 'ChartAxisConfig',
        },
      },
    },
    dataKey: {
      control: 'text',
      description: '라인 값의 데이터 키 (단일 라인)',
      table: {
        type: { summary: 'string' },
      },
    },
    dataKeys: {
      control: 'object',
      description: '여러 라인용 데이터 키 배열',
      table: {
        type: {
          summary: 'string[]',
        },
      },
    },
    width: {
      control: { type: 'number', min: 200, max: 1200, step: 50 },
      description: '차트 너비 (픽셀)',
      table: {
        type: { summary: 'number' },
      },
    },
    height: {
      control: { type: 'number', min: 200, max: 800, step: 50 },
      description: '차트 높이 (픽셀)',
      table: {
        type: { summary: 'number' },
      },
    },
    showArea: {
      control: 'boolean',
      description: '라인 아래 영역 채우기 표시',
      table: {
        type: { summary: 'boolean' },
      },
    },
    showPoints: {
      control: 'boolean',
      description: '라인 위에 데이터 포인트 표시',
      table: {
        type: { summary: 'boolean' },
      },
    },
    strokeWidth: {
      control: { type: 'number', min: 1, max: 10, step: 1 },
      description: '라인 두께 (픽셀)',
      table: {
        type: { summary: 'number' },
      },
    },
    showXGrid: {
      control: 'boolean',
      description: '가로 그리드 라인 표시 (Y축 값)',
      table: {
        type: { summary: 'boolean' },
      },
    },
    showYGrid: {
      control: 'boolean',
      description: '세로 그리드 라인 표시 (X축 값)',
      table: {
        type: { summary: 'boolean' },
      },
    },
    showLegend: {
      control: 'boolean',
      description: '범례 표시',
      table: {
        type: { summary: 'boolean' },
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
type Story = StoryObj<typeof LineChart>;

const defaultData = [
  { month: 'Jan', revenue: 100 },
  { month: 'Feb', revenue: 150 },
  { month: 'Mar', revenue: 120 },
  { month: 'Apr', revenue: 180 },
  { month: 'May', revenue: 200 },
  { month: 'Jun', revenue: 160 },
];

const revenueConfig: ChartConfig = {
  revenue: { label: '매출', color: 'var(--chart-1)' },
};

/**
 * 기본 LineChart
 *
 * LineChart 컴포넌트는 `ref`와 `className` prop을 지원합니다.
 * CSS 변수 기반 색상 토큰과 ChartConfig를 사용해 라벨과 색상을 설정합니다.
 */
export const Default: Story = {
  args: {
    data: defaultData,
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'revenue' },
    dataKey: 'revenue',
    config: revenueConfig,
    width: 600,
    height: 400,
    showArea: false,
    showPoints: true,
    strokeWidth: 2,
    showXGrid: true,
    className: '',
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const chartRef = useRef<HTMLDivElement>(null);
    return <LineChart ref={chartRef} {...args} />;
  },
};

/**
 * ChartConfig 패턴 사용
 *
 * config prop을 통해 데이터 키에 대한 라벨과 색상을 분리해서 관리합니다.
 */
export const WithChartConfig: Story = {
  args: {
    data: defaultData,
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'revenue' },
    dataKey: 'revenue',
    config: {
      revenue: { label: '월별 매출', color: 'var(--chart-1)' },
    },
    width: 600,
    height: 400,
    showArea: true,
    showPoints: true,
    showXGrid: true,
    showLegend: true,
  },
};

const multiLineData = [
  { month: 'Jan', desktop: 186, mobile: 80 },
  { month: 'Feb', desktop: 305, mobile: 200 },
  { month: 'Mar', desktop: 237, mobile: 120 },
  { month: 'Apr', desktop: 273, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'Jun', desktop: 214, mobile: 140 },
];

const multiLineConfig: ChartConfig = {
  desktop: { label: '데스크톱', color: 'var(--chart-1)' },
  mobile: { label: '모바일', color: 'var(--chart-2)' },
};

/**
 * 다중 라인 차트
 *
 * dataKeys prop을 사용해 여러 데이터 시리즈를 표시합니다.
 * config로 각 시리즈의 라벨과 색상을 설정합니다.
 */
export const MultiLine: Story = {
  args: {
    data: multiLineData,
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'desktop' },
    dataKeys: ['desktop', 'mobile'],
    config: multiLineConfig,
    width: 600,
    height: 400,
    showArea: false,
    showPoints: true,
    showXGrid: true,
    showLegend: true,
  },
};

/**
 * 다중 라인 영역 차트
 */
export const MultiLineWithArea: Story = {
  args: {
    data: multiLineData,
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'desktop' },
    dataKeys: ['desktop', 'mobile'],
    config: multiLineConfig,
    width: 600,
    height: 400,
    showArea: true,
    showPoints: true,
    showXGrid: true,
    showLegend: true,
  },
};

export const WithArea: Story = {
  args: {
    data: defaultData,
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'revenue' },
    dataKey: 'revenue',
    config: revenueConfig,
    width: 600,
    height: 400,
    showArea: true,
    showPoints: true,
    strokeWidth: 2,
    showXGrid: true,
  },
};

export const NoPoints: Story = {
  args: {
    data: defaultData,
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'revenue' },
    dataKey: 'revenue',
    config: revenueConfig,
    width: 600,
    height: 400,
    showArea: false,
    showPoints: false,
    strokeWidth: 2,
    showXGrid: true,
  },
};

export const AreaNoPoints: Story = {
  args: {
    data: defaultData,
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'revenue' },
    dataKey: 'revenue',
    config: revenueConfig,
    width: 600,
    height: 400,
    showArea: true,
    showPoints: false,
    strokeWidth: 2,
    showXGrid: true,
  },
};

export const ThickLine: Story = {
  args: {
    data: defaultData,
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'revenue' },
    dataKey: 'revenue',
    config: revenueConfig,
    width: 600,
    height: 400,
    showArea: false,
    showPoints: true,
    strokeWidth: 4,
    showXGrid: true,
  },
};

export const NoGrid: Story = {
  args: {
    data: defaultData,
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'revenue' },
    dataKey: 'revenue',
    config: revenueConfig,
    width: 600,
    height: 400,
    showArea: false,
    showPoints: true,
    strokeWidth: 2,
    showXGrid: false,
  },
};

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

export const LargeDataset: Story = {
  args: {
    data: largeData,
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'revenue' },
    dataKey: 'revenue',
    config: {
      revenue: { label: '연간 매출', color: 'var(--chart-1)' },
    },
    width: 800,
    height: 400,
    showArea: false,
    showPoints: true,
    strokeWidth: 2,
    showXGrid: true,
    showLegend: true,
  },
};

export const LargeDatasetWithArea: Story = {
  args: {
    data: largeData,
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'revenue' },
    dataKey: 'revenue',
    config: {
      revenue: { label: '연간 매출', color: 'var(--chart-1)' },
    },
    width: 800,
    height: 400,
    showArea: true,
    showPoints: true,
    strokeWidth: 2,
    showXGrid: true,
  },
};

/**
 * 커스텀 Y축 포맷터
 *
 * tickFormatter를 사용해 Y축 값을 통화 형식으로 표시합니다.
 */
export const CustomAxisFormatter: Story = {
  args: {
    data: [
      { month: 'Jan', revenue: 10000 },
      { month: 'Feb', revenue: 15000 },
      { month: 'Mar', revenue: 12000 },
      { month: 'Apr', revenue: 18000 },
      { month: 'May', revenue: 20000 },
      { month: 'Jun', revenue: 16000 },
    ],
    xAxis: { dataKey: 'month' },
    yAxis: {
      dataKey: 'revenue',
      tickFormatter: (value: string | number) => `₩${Number(value).toLocaleString()}`,
    },
    dataKey: 'revenue',
    config: {
      revenue: { label: '매출액', color: 'var(--chart-1)' },
    },
    width: 600,
    height: 400,
    showArea: true,
    showPoints: true,
    showXGrid: true,
    showLegend: true,
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
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'revenue' },
    dataKey: 'revenue',
    config: revenueConfig,
    width: 600,
    height: 400,
    showXGrid: true,
    showPoints: true,
    ariaLabel: '2024년 상반기 월별 매출 추이 차트',
  },
};

// 365일 일별 데이터 생성
const generateYearlyData = () => {
  const data = [];
  const months = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
  for (let i = 0; i < 365; i++) {
    const date = new Date(2024, 0, i + 1);
    const monthIndex = date.getMonth();
    const day = date.getDate();
    data.push({
      date: `${months[monthIndex]} ${day}일`,
      xLabel: day === 1 ? months[monthIndex] : '',
      value: Math.floor(100 + Math.sin(i / 30) * 50 + Math.random() * 30),
    });
  }
  return data;
};

const yearlyData = generateYearlyData();

/**
 * 연간 데이터 (365일)
 *
 * 대량의 시계열 데이터는 라인 차트가 적합합니다.
 * 포인트를 숨기고 영역을 표시하면 트렌드를 더 잘 볼 수 있습니다.
 * 차트 영역 어디서나 마우스를 올리면 툴팁이 표시됩니다.
 */
export const YearlyTimeSeries: Story = {
  args: {
    data: yearlyData,
    xAxis: { dataKey: 'xLabel' },
    yAxis: { dataKey: 'value' },
    dataKey: 'value',
    config: {
      value: { label: '일별 방문자', color: 'var(--chart-1)' },
    },
    width: 900,
    height: 300,
    showArea: true,
    showPoints: false,
    showXGrid: true,
  },
};
