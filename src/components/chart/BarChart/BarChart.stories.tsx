import { useRef } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { BarChart } from './BarChart';
import type { ChartConfig } from '../Chart/Chart.types';

const meta: Meta<typeof BarChart> = {
  title: 'DataDisplay/Chart/BarChart',
  component: BarChart,
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
예시: [{ month: 'Jan', sales: 100 }, ...]`,
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
    barSize: {
      control: { type: 'number', min: 8, max: 80, step: 4 },
      description: '각 막대의 크기 (픽셀)',
      table: {
        type: { summary: 'number' },
      },
    },
    gap: {
      control: { type: 'number', min: 0, max: 32, step: 2 },
      description: '막대 사이 간격 (픽셀)',
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
    stacked: {
      control: 'boolean',
      description: '여러 데이터 시리즈를 누적 막대로 렌더링',
      table: {
        type: { summary: 'boolean' },
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
  },
};

export default meta;
type Story = StoryObj<typeof BarChart>;

const defaultData = [
  { month: 'Jan', sales: 100 },
  { month: 'Feb', sales: 150 },
  { month: 'Mar', sales: 120 },
  { month: 'Apr', sales: 180 },
  { month: 'May', sales: 200 },
  { month: 'Jun', sales: 160 },
];

const salesConfig: ChartConfig = {
  sales: { label: '매출', color: 'var(--chart-2)' },
};

/**
 * 기본 BarChart
 *
 * BarChart 컴포넌트는 `ref`와 `className` prop을 지원합니다.
 * CSS 변수 기반 색상 토큰과 ChartConfig를 사용해 라벨과 색상을 설정합니다.
 */
export const Default: Story = {
  args: {
    data: defaultData,
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'sales' },
    dataKey: 'sales',
    config: salesConfig,
    width: 600,
    height: 400,
    showXGrid: true,
    className: '',
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const chartRef = useRef<HTMLDivElement>(null);
    return <BarChart ref={chartRef} {...args} />;
  },
};

/**
 * ChartConfig 패턴 사용
 *
 * config prop을 통해 데이터 키에 대한 라벨과 색상을 분리해서 관리합니다.
 * CSS 변수를 사용해 테마에 따라 자동으로 색상이 변경됩니다.
 */
export const WithChartConfig: Story = {
  args: {
    data: defaultData,
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'sales' },
    dataKey: 'sales',
    config: {
      sales: { label: '월별 매출', color: 'var(--chart-1)' },
    },
    width: 600,
    height: 400,
    showXGrid: true,
    showLegend: true,
  },
};

/**
 * 막대 크기와 간격 조정
 *
 * barSize와 gap prop을 사용해 막대 크기와 간격을 커스터마이즈합니다.
 */
export const CustomBarSize: Story = {
  args: {
    data: defaultData,
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'sales' },
    dataKey: 'sales',
    config: {
      sales: { label: '매출', color: 'var(--chart-1)' },
    },
    width: 600,
    height: 400,
    barSize: 40,
    gap: 16,
    showXGrid: true,
  },
};

export const NoGrid: Story = {
  args: {
    data: defaultData,
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'sales' },
    dataKey: 'sales',
    config: salesConfig,
    width: 600,
    height: 400,
    showXGrid: false,
    showYGrid: false,
  },
};

/**
 * 가로 그리드만 표시
 *
 * showXGrid만 활성화하여 Y축 값에 해당하는 가로 그리드 라인만 표시합니다.
 */
export const HorizontalGridOnly: Story = {
  args: {
    data: defaultData,
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'sales' },
    dataKey: 'sales',
    config: salesConfig,
    width: 600,
    height: 400,
    showXGrid: true,
    showYGrid: false,
  },
};

/**
 * 세로 그리드만 표시
 *
 * showYGrid만 활성화하여 X축 값에 해당하는 세로 그리드 라인만 표시합니다.
 */
export const VerticalGridOnly: Story = {
  args: {
    data: defaultData,
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'sales' },
    dataKey: 'sales',
    config: salesConfig,
    width: 600,
    height: 400,
    showXGrid: false,
    showYGrid: true,
  },
};

/**
 * 모든 그리드 표시
 *
 * showXGrid와 showYGrid 모두 활성화하여 전체 그리드를 표시합니다.
 */
export const BothGrids: Story = {
  args: {
    data: defaultData,
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'sales' },
    dataKey: 'sales',
    config: salesConfig,
    width: 600,
    height: 400,
    showXGrid: true,
    showYGrid: true,
  },
};

export const CustomSizes: Story = {
  args: {
    data: defaultData,
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'sales' },
    dataKey: 'sales',
    config: salesConfig,
    width: 800,
    height: 500,
    barSize: 32,
    gap: 12,
    showXGrid: true,
  },
};

// 30일 일별 데이터 생성
const generateMonthlyData = () => {
  const data = [];
  for (let i = 0; i < 30; i++) {
    data.push({
      day: `${i + 1}`,
      value: Math.floor(50 + Math.random() * 150),
    });
  }
  return data;
};

const monthlyData = generateMonthlyData();

/**
 * 월간 데이터 (30일)
 *
 * 일별 데이터를 표시합니다. 더 긴 기간의 시계열 데이터는 LineChart를 권장합니다.
 */
export const MonthlyData: Story = {
  args: {
    data: monthlyData,
    xAxis: { dataKey: 'day' },
    yAxis: { dataKey: 'value' },
    dataKey: 'value',
    config: {
      value: { label: '일별 방문자', color: 'var(--chart-1)' },
    },
    width: 800,
    height: 300,
    showXGrid: true,
  },
};

// 2개 스택 데이터
const stacked2Data = [
  { month: 'Jan', desktop: 100, mobile: 150 },
  { month: 'Feb', desktop: 120, mobile: 180 },
  { month: 'Mar', desktop: 80, mobile: 200 },
  { month: 'Apr', desktop: 90, mobile: 170 },
  { month: 'May', desktop: 110, mobile: 190 },
  { month: 'Jun', desktop: 130, mobile: 160 },
];

const stacked2Config: ChartConfig = {
  desktop: { label: '데스크톱', color: 'var(--chart-1)' },
  mobile: { label: '모바일', color: 'var(--chart-2)' },
};

/**
 * 2개 스택 막대 차트
 */
export const Stacked2Series: Story = {
  args: {
    data: stacked2Data,
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'desktop' },
    stacked: true,
    stackedKeys: ['desktop', 'mobile'],
    config: stacked2Config,
    width: 600,
    height: 400,
    showXGrid: true,
    showLegend: true,
  },
};

// 3개 스택 데이터
const stacked3Data = [
  { month: 'Jan', desktop: 100, mobile: 80, tablet: 40 },
  { month: 'Feb', desktop: 120, mobile: 90, tablet: 50 },
  { month: 'Mar', desktop: 80, mobile: 110, tablet: 60 },
  { month: 'Apr', desktop: 90, mobile: 100, tablet: 45 },
  { month: 'May', desktop: 110, mobile: 95, tablet: 55 },
  { month: 'Jun', desktop: 130, mobile: 85, tablet: 50 },
];

const stacked3Config: ChartConfig = {
  desktop: { label: '데스크톱', color: 'var(--chart-1)' },
  mobile: { label: '모바일', color: 'var(--chart-2)' },
  tablet: { label: '태블릿', color: 'var(--chart-3)' },
};

/**
 * 3개 스택 막대 차트
 */
export const Stacked3Series: Story = {
  args: {
    data: stacked3Data,
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'desktop' },
    stacked: true,
    stackedKeys: ['desktop', 'mobile', 'tablet'],
    config: stacked3Config,
    width: 600,
    height: 400,
    showXGrid: true,
    showLegend: true,
  },
};

// 4개 스택 데이터
const stacked4Data = [
  { month: 'Jan', chrome: 100, safari: 60, firefox: 40, edge: 30 },
  { month: 'Feb', chrome: 120, safari: 70, firefox: 35, edge: 35 },
  { month: 'Mar', chrome: 80, safari: 80, firefox: 45, edge: 40 },
  { month: 'Apr', chrome: 90, safari: 75, firefox: 50, edge: 25 },
  { month: 'May', chrome: 110, safari: 65, firefox: 40, edge: 30 },
  { month: 'Jun', chrome: 130, safari: 55, firefox: 35, edge: 35 },
];

const stacked4Config: ChartConfig = {
  chrome: { label: 'Chrome', color: 'var(--chart-1)' },
  safari: { label: 'Safari', color: 'var(--chart-2)' },
  firefox: { label: 'Firefox', color: 'var(--chart-3)' },
  edge: { label: 'Edge', color: 'var(--chart-4)' },
};

/**
 * 4개 스택 막대 차트
 */
export const Stacked4Series: Story = {
  args: {
    data: stacked4Data,
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'chrome' },
    stacked: true,
    stackedKeys: ['chrome', 'safari', 'firefox', 'edge'],
    config: stacked4Config,
    width: 600,
    height: 400,
    showXGrid: true,
    showLegend: true,
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
    yAxis: { dataKey: 'sales' },
    dataKey: 'sales',
    config: salesConfig,
    width: 600,
    height: 400,
    showXGrid: true,
    ariaLabel: '2024년 상반기 월별 매출 막대 차트',
  },
};
