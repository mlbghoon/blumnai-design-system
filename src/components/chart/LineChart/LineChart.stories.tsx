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
      description: 'X축의 데이터 키, 라벨, 도메인, 틱 포맷터 등을 설정합니다',
      table: {
        type: {
          summary: 'ChartAxisConfig',
        },
      },
    },
    yAxis: {
      control: 'object',
      description: 'Y축의 데이터 키, 라벨, 도메인, 틱 포맷터 등을 설정합니다',
      table: {
        type: {
          summary: 'ChartAxisConfig',
        },
      },
    },
    dataKey: {
      control: 'text',
      description: '단일 라인을 그릴 때 사용하는 데이터 키입니다',
      table: {
        type: { summary: 'string' },
      },
    },
    dataKeys: {
      control: 'object',
      description: '여러 라인을 동시에 표시할 때 사용하는 데이터 키 배열입니다',
      table: {
        type: {
          summary: 'string[]',
        },
      },
    },
    width: {
      control: { type: 'number', min: 200, max: 1200, step: 50 },
      description: '차트 컨테이너의 너비를 픽셀 단위로 설정합니다',
      table: {
        type: { summary: 'number' },
      },
    },
    height: {
      control: { type: 'number', min: 200, max: 800, step: 50 },
      description: '차트 컨테이너의 높이를 픽셀 단위로 설정합니다',
      table: {
        type: { summary: 'number' },
      },
    },
    showArea: {
      control: 'boolean',
      description: 'true로 설정하면 라인 아래 영역을 색상으로 채워 면적 차트로 표시합니다',
      table: {
        type: { summary: 'boolean' },
      },
    },
    showPoints: {
      control: 'boolean',
      description: 'true로 설정하면 각 데이터 포인트 위치에 점을 표시합니다',
      table: {
        type: { summary: 'boolean' },
      },
    },
    strokeWidth: {
      control: { type: 'number', min: 1, max: 10, step: 1 },
      description: '라인의 두께를 픽셀 단위로 설정합니다',
      table: {
        type: { summary: 'number' },
      },
    },
    showXGrid: {
      control: 'boolean',
      description: 'true로 설정하면 Y축 값에 해당하는 가로 그리드 라인을 표시합니다',
      table: {
        type: { summary: 'boolean' },
      },
    },
    showYGrid: {
      control: 'boolean',
      description: 'true로 설정하면 X축 값에 해당하는 세로 그리드 라인을 표시합니다',
      table: {
        type: { summary: 'boolean' },
      },
    },
    showLegend: {
      control: 'boolean',
      description: 'true로 설정하면 차트 하단에 데이터 시리즈를 구분하는 범례를 표시합니다',
      table: {
        type: { summary: 'boolean' },
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
    showYGrid: false,
    showLegend: false,
    dataKeys: undefined,
    ariaLabel: undefined,
    className: '',
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const chartRef = useRef<HTMLDivElement>(null);
    return (
      <LineChart
        ref={chartRef}
        data={args.data}
        xAxis={args.xAxis}
        yAxis={args.yAxis}
        dataKey={args.dataKey}
        dataKeys={args.dataKeys}
        config={args.config}
        width={args.width}
        height={args.height}
        showArea={args.showArea}
        showPoints={args.showPoints}
        strokeWidth={args.strokeWidth}
        showXGrid={args.showXGrid}
        showYGrid={args.showYGrid}
        showLegend={args.showLegend}
        ariaLabel={args.ariaLabel}
        className={args.className}
      />
    );
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

/**
 * 부드러운 곡선 (smooth)
 *
 * smooth prop을 사용해 monotone 보간으로 부드러운 곡선을 그립니다.
 */
export const SmoothLine: Story = {
  args: {
    data: defaultData,
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'revenue' },
    dataKey: 'revenue',
    config: revenueConfig,
    width: 600,
    height: 400,
    smooth: true,
    showPoints: true,
    showXGrid: true,
  },
};

/**
 * 부드러운 곡선 + 영역 채우기
 */
export const SmoothWithArea: Story = {
  args: {
    data: defaultData,
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'revenue' },
    dataKey: 'revenue',
    config: revenueConfig,
    width: 600,
    height: 400,
    smooth: true,
    showArea: true,
    showPoints: true,
    showXGrid: true,
  },
};

/**
 * 다중 라인 + 부드러운 곡선
 */
export const MultiLineSmoothWithArea: Story = {
  args: {
    data: multiLineData,
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'desktop' },
    dataKeys: ['desktop', 'mobile'],
    config: multiLineConfig,
    width: 600,
    height: 400,
    smooth: true,
    showArea: true,
    showPoints: true,
    showXGrid: true,
    showLegend: true,
  },
};

/**
 * Y축 틱 개수 조정
 */
export const CustomTickCount: Story = {
  args: {
    data: defaultData,
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'revenue', tickCount: 10 },
    dataKey: 'revenue',
    config: revenueConfig,
    width: 600,
    height: 400,
    showXGrid: true,
    showPoints: true,
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
    yAxis: { dataKey: 'revenue' },
    dataKey: 'revenue',
    config: revenueConfig,
    width: 600,
    height: 400,
    showXGrid: true,
  },
};

/**
 * 모든 값이 0
 *
 * 모든 Y축 값이 0일 때 도메인이 [0, 1]로 설정되어 올바르게 렌더링됩니다.
 */
export const AllZeroValues: Story = {
  args: {
    data: [
      { month: 'Jan', revenue: 0 },
      { month: 'Feb', revenue: 0 },
      { month: 'Mar', revenue: 0 },
      { month: 'Apr', revenue: 0 },
      { month: 'May', revenue: 0 },
      { month: 'Jun', revenue: 0 },
    ],
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'revenue' },
    dataKey: 'revenue',
    config: revenueConfig,
    width: 600,
    height: 400,
    showXGrid: true,
    showPoints: true,
  },
};

/**
 * 단일 데이터 포인트
 *
 * 데이터가 하나만 있을 때도 포인트가 정상적으로 표시됩니다.
 */
export const SingleDataPoint: Story = {
  args: {
    data: [{ month: 'Jan', revenue: 150 }],
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'revenue' },
    dataKey: 'revenue',
    config: revenueConfig,
    width: 600,
    height: 400,
    showXGrid: true,
    showPoints: true,
  },
};

/**
 * 누락된 Y값 (connectNulls)
 *
 * 일부 데이터 포인트에 Y값이 없을 때 connectNulls로 연속 라인을 유지합니다.
 */
export const MissingYValues: Story = {
  args: {
    data: [
      { month: 'Jan', revenue: 100 },
      { month: 'Feb' },
      { month: 'Mar', revenue: 120 },
      { month: 'Apr' },
      { month: 'May', revenue: 200 },
      { month: 'Jun', revenue: 160 },
    ] as { month: string; revenue?: number }[],
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'revenue' },
    dataKey: 'revenue',
    config: revenueConfig,
    width: 600,
    height: 400,
    showXGrid: true,
    showPoints: true,
  },
};

/**
 * 커스텀 툴팁
 *
 * renderTooltip 콜백으로 완전한 커스텀 툴팁을 렌더링합니다.
 */
export const CustomTooltip: Story = {
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
    renderTooltip: (params) => {
      if (!('items' in params)) return null;
      return (
        <div style={{ background: '#fff', padding: 12, borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
          <div style={{ fontWeight: 600, marginBottom: 4 }}>{params.xValue}</div>
          {params.items.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: item.color }} />
              <span>{item.label}: ₩{item.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      );
    },
  },
};

/**
 * 인터랙티브 범례
 *
 * 범례 항목을 클릭하여 시리즈를 표시/숨길 수 있습니다.
 */
export const InteractiveLegend: Story = {
  render: () => (
    <LineChart
      data={multiLineData}
      xAxis={{ dataKey: 'month' }}
      yAxis={{ dataKey: 'desktop' }}
      dataKeys={['desktop', 'mobile']}
      config={multiLineConfig}
      width={600}
      height={400}
      showLegend
      legendInteractive
      showXGrid
      showPoints
    />
  ),
};

/**
 * 우측 범례
 *
 * legendPosition="right"로 범례를 차트 우측에 배치합니다.
 */
export const RightLegend: Story = {
  render: () => (
    <LineChart
      data={multiLineData}
      xAxis={{ dataKey: 'month' }}
      yAxis={{ dataKey: 'desktop' }}
      dataKeys={['desktop', 'mobile']}
      config={multiLineConfig}
      width={600}
      height={400}
      showLegend
      legendPosition="right"
      showXGrid
      showPoints
    />
  ),
};

/**
 * 애니메이션 비활성화 (PDF 캡처용)
 *
 * animated={false}로 모든 차트 애니메이션을 끕니다.
 */
export const NoAnimation: Story = {
  render: () => (
    <LineChart
      data={defaultData}
      xAxis={{ dataKey: 'month' }}
      yAxis={{ dataKey: 'revenue' }}
      dataKey="revenue"
      config={revenueConfig}
      width={600}
      height={400}
      animated={false}
      showXGrid
      showPoints
    />
  ),
};

/**
 * 스타일 없음 (카드 내부 임베딩용)
 *
 * variant="unstyled"로 배경, 그림자, 라운드를 제거합니다.
 */
export const Unstyled: Story = {
  render: () => (
    <LineChart
      data={defaultData}
      xAxis={{ dataKey: 'month' }}
      yAxis={{ dataKey: 'revenue' }}
      dataKey="revenue"
      config={revenueConfig}
      width={600}
      height={400}
      variant="unstyled"
      showXGrid
      showPoints
    />
  ),
};

/**
 * 커스텀 마진
 *
 * margin prop으로 차트 영역의 여백을 조정합니다.
 */
export const CustomMargin: Story = {
  render: () => (
    <LineChart
      data={defaultData}
      xAxis={{ dataKey: 'month' }}
      yAxis={{ dataKey: 'revenue' }}
      dataKey="revenue"
      config={revenueConfig}
      width={600}
      height={400}
      margin={{ top: 8, right: 40, bottom: 4, left: 60 }}
      showXGrid
      showPoints
    />
  ),
};

/**
 * 툴팁 값 포맷터
 *
 * tooltipValueFormatter로 툴팁에 표시되는 값을 포맷합니다.
 */
export const FormattedTooltip: Story = {
  render: () => (
    <LineChart
      data={defaultData}
      xAxis={{ dataKey: 'month' }}
      yAxis={{ dataKey: 'revenue' }}
      dataKey="revenue"
      config={revenueConfig}
      width={600}
      height={400}
      tooltipValueFormatter={(v) => v.toLocaleString('ko-KR')}
      showXGrid
      showPoints
    />
  ),
};

/**
 * 시리즈별 툴팁 (tooltipTrigger="item")
 *
 * 기본 `tooltipTrigger="hover"`는 x축에 걸린 모든 시리즈를 한 번에 보여주지만,
 * `tooltipTrigger="item"`은 **마우스가 올려진 그 점(dot)의 시리즈만** 툴팁에 표시합니다.
 * 시리즈가 많거나 값이 겹쳐서 "이 지점에서 A가 얼마?"를 확인하고 싶을 때 유용합니다.
 *
 * ### 동작
 * - 점(activeDot) 위에 호버 → 해당 시리즈만 표시
 * - 점 밖 영역(차트 빈 공간) 위 → 툴팁 숨김
 * - BarChart/ComboChart도 동일한 동작을 지원합니다 (Bar 막대 호버 기준)
 *
 * ### 구현 메모
 * Recharts는 LineChart/BarChart/ComposedChart에 대해 `shared={false}`를 내부적으로 'axis'로
 * 되돌려버려 payload가 항상 전체 시리즈를 담습니다. 이 때문에 DS는 `activeDot`의
 * `onMouseEnter`/`onMouseLeave`로 현재 호버 중인 `dataKey`를 추적하고, 어댑터에서 직접 필터링합니다.
 */
export const TooltipTriggerItem: Story = {
  render: () => (
    <LineChart
      data={multiLineData}
      xAxis={{ dataKey: 'month' }}
      yAxis={{ dataKey: 'desktop' }}
      dataKeys={['desktop', 'mobile']}
      config={multiLineConfig}
      width={600}
      height={400}
      tooltipTrigger="item"
      showLegend
      showXGrid
      showPoints
    />
  ),
};

/**
 * `tooltipTrigger="item"` + 모든 시리즈가 같은 y 위치 (v1.9.29 회귀 테스트)
 *
 * 모든 데이터 포인트가 동일한 y 값 (예: 전부 0) 인 엣지 케이스. 이전 버전에선
 * first-mouse-enter 의 한 frame 동안 모든 시리즈가 보이는 "flash" 가 발생하고,
 * `cursor={false}` 사용으로 tooltip 위치가 첫 활성화 지점에서 멈춰 마우스 이동을
 * 따라가지 않는 문제가 있었음.
 *
 * v1.9.29 fix:
 * - 어댑터: `activeDataKey` 미해결 (초기 frame) 상태에서 tooltip 렌더하지 않음 → flash 제거
 * - LineChart/BarChart/ComboChart: `cursor={false}` → 투명 cursor 로 변경 → Recharts 의
 *   position 추적 로직이 정상 동작 → tooltip 위치가 마우스를 따라 이동
 *
 * **확인 포인트:**
 * - 첫 mouse-enter 시 전체 시리즈 flash 없어야 함
 * - 모든 시리즈가 같은 y 일 때 nearest 는 첫 시리즈가 됨 (tied → first wins; 디자인상 의도)
 * - tooltip 위치가 마우스 이동에 따라 X 좌표를 따라 이동
 */
export const TooltipTriggerItemAllSamePosition: Story = {
  render: () => (
    <LineChart
      data={[
        { month: 'Jan', a: 0, b: 0, c: 0, d: 0 },
        { month: 'Feb', a: 0, b: 0, c: 0, d: 0 },
        { month: 'Mar', a: 0, b: 0, c: 0, d: 0 },
        { month: 'Apr', a: 0, b: 0, c: 0, d: 0 },
        { month: 'May', a: 0, b: 0, c: 0, d: 0 },
        { month: 'Jun', a: 0, b: 0, c: 0, d: 0 },
      ]}
      xAxis={{ dataKey: 'month' }}
      yAxis={{ dataKey: 'a' }}
      dataKeys={['a', 'b', 'c', 'd']}
      config={{
        a: { label: '시리즈 A', color: 'var(--chart-1)' },
        b: { label: '시리즈 B', color: 'var(--chart-2)' },
        c: { label: '시리즈 C', color: 'var(--chart-3)' },
        d: { label: '시리즈 D', color: 'var(--chart-4)' },
      }}
      width={600}
      height={400}
      tooltipTrigger="item"
      showLegend
      showXGrid
      showPoints
    />
  ),
};
