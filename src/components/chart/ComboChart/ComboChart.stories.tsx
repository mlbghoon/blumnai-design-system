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
      description: 'X축의 데이터 키, 라벨, 도메인, 틱 포맷터 등을 설정합니다',
      table: {
        type: { summary: 'ChartAxisConfig' },
      },
    },
    yAxis: {
      control: 'object',
      description: 'Y축을 설정합니다. 단일 축 또는 배열로 듀얼 Y축을 구성할 수 있습니다',
      table: {
        type: {
          summary: 'ChartAxisConfig | [ChartAxisConfig, ChartAxisConfig]',
        },
      },
    },
    barSeries: {
      control: 'object',
      description: '막대 시리즈 배열입니다. 각 시리즈의 데이터 키, 색상, 스택 그룹, 크기, 둥근 모서리 등을 설정합니다',
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
      description: '라인 시리즈 배열입니다. 각 시리즈의 데이터 키, 색상, Y축 인덱스, 곡선, 두께, 영역 채우기 등을 설정합니다',
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
      description: '차트 컨테이너의 너비를 픽셀 단위로 설정합니다',
      table: { type: { summary: 'number' } },
    },
    height: {
      control: { type: 'number', min: 200, max: 800, step: 50 },
      description: '차트 컨테이너의 높이를 픽셀 단위로 설정합니다',
      table: { type: { summary: 'number' } },
    },
    showXGrid: {
      control: 'boolean',
      description: 'true로 설정하면 Y축 값에 해당하는 가로 그리드 라인을 표시합니다',
      table: { type: { summary: 'boolean' } },
    },
    showYGrid: {
      control: 'boolean',
      description: 'true로 설정하면 X축 값에 해당하는 세로 그리드 라인을 표시합니다',
      table: { type: { summary: 'boolean' } },
    },
    showLegend: {
      control: 'boolean',
      description: 'true로 설정하면 차트 하단에 데이터 시리즈를 구분하는 범례를 표시합니다',
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
    return (
      <ComboChart
        ref={chartRef}
        data={args.data}
        xAxis={args.xAxis}
        yAxis={args.yAxis}
        barSeries={args.barSeries}
        lineSeries={args.lineSeries}
        config={args.config}
        width={args.width}
        height={args.height}
        showXGrid={args.showXGrid}
        showLegend={args.showLegend}
      />
    );
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
 * Consumer 재현: 바 전용 + 빈 lineSeries + 전체 0 데이터
 *
 * happytalk-front CreateCompleteChart 패턴 재현.
 */
export const ConsumerBarsOnly: Story = {
  args: {
    data: [
      { date: '2026-03-01', created: 0, completed: 0 },
      { date: '2026-03-02', created: 0, completed: 0 },
      { date: '2026-03-03', created: 0, completed: 0 },
    ],
    config: {
      created: { label: 'Created', color: '#FFA500' },
      completed: { label: 'Completed', color: '#4B9BFF' },
    },
    xAxis: { dataKey: 'date' },
    yAxis: { dataKey: 'created', domain: 'auto' as const },
    barSeries: [
      { dataKey: 'created', color: '#FFA500', barSize: 20, radius: 4 },
      { dataKey: 'completed', color: '#4B9BFF', barSize: 20, radius: 4 },
    ],
    lineSeries: [],
    showXGrid: true,
    showLegend: false,
    responsive: true,
    height: 280,
  },
};

/**
 * Consumer 재현: 듀얼 Y축 + 스택 바 + 라인 + 전체 0 데이터
 *
 * happytalk-front SuccessDurationChart 패턴 재현.
 */
export const ConsumerDualAxisAllZero: Story = {
  args: {
    data: [
      { date: '2026-03-01', success: 0, fail: 0, duration: 0 },
      { date: '2026-03-02', success: 0, fail: 0, duration: 0 },
      { date: '2026-03-03', success: 0, fail: 0, duration: 0 },
    ],
    config: {
      success: { label: 'Success', color: '#00BA77' },
      fail: { label: 'Fail', color: '#CECECE' },
      duration: { label: 'Duration', color: '#404A51' },
    },
    xAxis: { dataKey: 'date' },
    yAxis: [
      { dataKey: 'success', domain: 'auto' as const },
      { dataKey: 'duration', show: false, domain: 'auto' as const },
    ],
    barSeries: [
      { dataKey: 'success', color: '#00BA77', stack: 'total', barSize: 20, radius: 4 },
      { dataKey: 'fail', color: '#CECECE', stack: 'total', barSize: 20, radius: 4 },
    ],
    lineSeries: [
      { dataKey: 'duration', color: '#404A51', yAxisIndex: 1, smooth: true, strokeWidth: 2 },
    ],
    showXGrid: true,
    showLegend: false,
    responsive: true,
    height: 280,
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
