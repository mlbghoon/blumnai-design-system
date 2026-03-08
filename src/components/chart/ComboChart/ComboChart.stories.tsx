import { useRef } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { ComboChart } from './ComboChart';
import type { ChartConfig } from '../Chart/Chart.types';

const meta: Meta<typeof ComboChart> = {
  title: 'DataDisplay/Chart/ComboChart',
  component: ComboChart,
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
        type: { summary: 'ChartDataPoint[]' },
      },
    },
    config: {
      control: 'object',
      description: '차트 데이터 시리즈 설정 (라벨, 색상)',
      table: {
        type: { summary: 'ChartConfig' },
      },
    },
    xAxis: {
      control: 'object',
      description: 'X축 설정',
      table: {
        type: { summary: 'ChartAxisConfig' },
      },
    },
    yAxis: {
      control: 'object',
      description: 'Y축 설정 (단일 또는 듀얼 Y축)',
      table: {
        type: {
          summary: 'ChartAxisConfig | [ChartAxisConfig, ChartAxisConfig]',
        },
      },
    },
    barSeries: {
      control: 'object',
      description: 'Bar 시리즈 배열',
      table: {
        type: {
          summary: 'ComboBarSeries[]',
          detail: `{
  dataKey: string;
  color?: string;
  stack?: string;
  barSize?: number;
  radius?: number;
}[]`,
        },
      },
    },
    lineSeries: {
      control: 'object',
      description: 'Line 시리즈 배열',
      table: {
        type: {
          summary: 'ComboLineSeries[]',
          detail: `{
  dataKey: string;
  color?: string;
  yAxisIndex?: 0 | 1;
  smooth?: boolean;
  strokeWidth?: number;
  showArea?: boolean;
}[]`,
        },
      },
    },
    width: {
      control: { type: 'number', min: 200, max: 1200, step: 50 },
      description: '차트 너비 (픽셀)',
      table: { type: { summary: 'number' } },
    },
    height: {
      control: { type: 'number', min: 200, max: 800, step: 50 },
      description: '차트 높이 (픽셀)',
      table: { type: { summary: 'number' } },
    },
    showXGrid: {
      control: 'boolean',
      description: '가로 그리드 라인 표시',
      table: { type: { summary: 'boolean' } },
    },
    showYGrid: {
      control: 'boolean',
      description: '세로 그리드 라인 표시',
      table: { type: { summary: 'boolean' } },
    },
    showLegend: {
      control: 'boolean',
      description: '범례 표시',
      table: { type: { summary: 'boolean' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ComboChart>;

const comboData = [
  { month: 'Jan', sales: 100, visitors: 1200, conversion: 8.3 },
  { month: 'Feb', sales: 150, visitors: 1800, conversion: 8.3 },
  { month: 'Mar', sales: 120, visitors: 1500, conversion: 8.0 },
  { month: 'Apr', sales: 180, visitors: 2100, conversion: 8.6 },
  { month: 'May', sales: 200, visitors: 2400, conversion: 8.3 },
  { month: 'Jun', sales: 160, visitors: 1900, conversion: 8.4 },
];

const comboConfig: ChartConfig = {
  sales: { label: '매출', color: 'var(--chart-1)' },
  visitors: { label: '방문자', color: 'var(--chart-2)' },
  conversion: { label: '전환율', color: 'var(--chart-4)' },
};

/**
 * 기본 ComboChart
 *
 * Bar와 Line을 함께 표시하여 서로 다른 유형의 데이터를 비교합니다.
 */
export const Default: Story = {
  args: {
    data: comboData,
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'sales' },
    barSeries: [
      { dataKey: 'sales', color: 'var(--chart-1)' },
    ],
    lineSeries: [
      { dataKey: 'visitors', color: 'var(--chart-2)', smooth: true },
    ],
    config: comboConfig,
    width: 700,
    height: 400,
    showXGrid: true,
    showLegend: true,
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const chartRef = useRef<HTMLDivElement>(null);
    return <ComboChart ref={chartRef} {...args} />;
  },
};

/**
 * 듀얼 Y축
 *
 * 서로 다른 단위의 데이터를 왼쪽/오른쪽 Y축으로 분리하여 표시합니다.
 */
export const DualYAxis: Story = {
  args: {
    data: comboData,
    xAxis: { dataKey: 'month' },
    yAxis: [
      { dataKey: 'sales', tickFormatter: (v: string | number) => `${v}건` },
      { dataKey: 'conversion', tickFormatter: (v: string | number) => `${v}%` },
    ],
    barSeries: [
      { dataKey: 'sales', color: 'var(--chart-1)' },
    ],
    lineSeries: [
      { dataKey: 'conversion', color: 'var(--chart-4)', yAxisIndex: 1, smooth: true, strokeWidth: 3 },
    ],
    config: comboConfig,
    width: 700,
    height: 400,
    showXGrid: true,
    showLegend: true,
  },
};

const stackedComboData = [
  { month: 'Jan', desktop: 60, mobile: 40, trend: 100 },
  { month: 'Feb', desktop: 80, mobile: 70, trend: 150 },
  { month: 'Mar', desktop: 50, mobile: 70, trend: 120 },
  { month: 'Apr', desktop: 90, mobile: 90, trend: 180 },
  { month: 'May', desktop: 110, mobile: 90, trend: 200 },
  { month: 'Jun', desktop: 100, mobile: 60, trend: 160 },
];

const stackedComboConfig: ChartConfig = {
  desktop: { label: '데스크톱', color: 'var(--chart-1)' },
  mobile: { label: '모바일', color: 'var(--chart-2)' },
  trend: { label: '추세', color: 'var(--chart-4)' },
};

/**
 * 스택 바 + 라인
 *
 * 스택된 막대와 라인 오버레이를 조합하여 부분과 전체 추세를 함께 표시합니다.
 */
export const StackedBarsWithLine: Story = {
  args: {
    data: stackedComboData,
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'desktop' },
    barSeries: [
      { dataKey: 'desktop', color: 'var(--chart-1)', stack: 'group' },
      { dataKey: 'mobile', color: 'var(--chart-2)', stack: 'group', radius: 4 },
    ],
    lineSeries: [
      { dataKey: 'trend', color: 'var(--chart-4)', smooth: true, strokeWidth: 2 },
    ],
    config: stackedComboConfig,
    width: 700,
    height: 400,
    showXGrid: true,
    showLegend: true,
  },
};

/**
 * 라인 + 영역 채우기
 *
 * lineSeries에 showArea를 사용해 라인 아래 영역을 채웁니다.
 */
export const LineWithArea: Story = {
  args: {
    data: comboData,
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'sales' },
    barSeries: [
      { dataKey: 'sales', color: 'var(--chart-1)', radius: 4 },
    ],
    lineSeries: [
      { dataKey: 'visitors', color: 'var(--chart-2)', smooth: true, showArea: true },
    ],
    config: comboConfig,
    width: 700,
    height: 400,
    showXGrid: true,
    showLegend: true,
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
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'sales' },
    barSeries: [{ dataKey: 'sales', color: 'var(--chart-1)' }],
    lineSeries: [{ dataKey: 'visitors', color: 'var(--chart-2)', smooth: true }],
    config: comboConfig,
    width: 700,
    height: 400,
    showXGrid: true,
  },
};

/**
 * 모든 값이 0
 *
 * Bar + Line 시리즈 모두 0일 때 도메인이 [0, 1]로 설정되어 올바르게 렌더링됩니다.
 */
export const AllZeroValues: Story = {
  args: {
    data: [
      { month: 'Jan', sales: 0, visitors: 0, conversion: 0 },
      { month: 'Feb', sales: 0, visitors: 0, conversion: 0 },
      { month: 'Mar', sales: 0, visitors: 0, conversion: 0 },
      { month: 'Apr', sales: 0, visitors: 0, conversion: 0 },
    ],
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'sales' },
    barSeries: [{ dataKey: 'sales', color: 'var(--chart-1)' }],
    lineSeries: [{ dataKey: 'visitors', color: 'var(--chart-2)', smooth: true }],
    config: comboConfig,
    width: 700,
    height: 400,
    showXGrid: true,
    showLegend: true,
  },
};

/**
 * 단일 데이터 포인트
 *
 * 데이터가 하나만 있을 때도 Bar와 Line이 정상적으로 표시됩니다.
 */
export const SingleDataPoint: Story = {
  args: {
    data: [{ month: 'Jan', sales: 100, visitors: 1200, conversion: 8.3 }],
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'sales' },
    barSeries: [{ dataKey: 'sales', color: 'var(--chart-1)' }],
    lineSeries: [{ dataKey: 'visitors', color: 'var(--chart-2)', smooth: true }],
    config: comboConfig,
    width: 700,
    height: 400,
    showXGrid: true,
    showLegend: true,
  },
};

/**
 * 커스텀 툴팁
 */
export const CustomTooltip: Story = {
  args: {
    data: comboData,
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'sales' },
    barSeries: [
      { dataKey: 'sales', color: 'var(--chart-1)' },
    ],
    lineSeries: [
      { dataKey: 'visitors', color: 'var(--chart-2)', smooth: true },
    ],
    config: comboConfig,
    width: 700,
    height: 400,
    showXGrid: true,
    showLegend: true,
    renderTooltip: (params) => {
      if (!('items' in params)) return null;
      return (
        <div style={{ background: '#fff', padding: 12, borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
          <div style={{ fontWeight: 600, marginBottom: 4 }}>{params.xValue}</div>
          {params.items.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: item.color }} />
              <span>{item.label}: {item.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      );
    },
  },
};
