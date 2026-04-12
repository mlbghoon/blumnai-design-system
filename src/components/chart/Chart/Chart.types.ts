import type { HTMLAttributes, ReactNode } from 'react';

/**
 * Base data point for charts
 */
export interface ChartDataPoint {
  [key: string]: string | number;
}

/**
 * Configuration for a single data series in a chart
 * Follows shadcn pattern of decoupling labels/colors from data
 */
export interface ChartConfigItem {
  /**
   * Human-readable label for this data series
   */
  label: string;
  /**
   * Color for this series - can be CSS variable (var(--chart-1)) or hex color
   */
  color: string;
  /**
   * Optional icon to show in legend/tooltip
   */
  icon?: ReactNode;
  /**
   * 툴팁 전용 라벨 (미지정 시 label 사용)
   */
  tooltipLabel?: string;
}

/**
 * Chart configuration object
 * Maps data keys to their display configuration
 *
 * @example
 * const config: ChartConfig = {
 *   desktop: { label: "데스크톱", color: "var(--chart-1)" },
 *   mobile: { label: "모바일", color: "var(--chart-2)" },
 * };
 */
export type ChartConfig = Record<string, ChartConfigItem>;

/**
 * Default chart colors using CSS variables
 * Used when no config is provided
 */
export const DEFAULT_CHART_MARGIN = { top: 20, right: 20, bottom: 20, left: 20 };

export const DEFAULT_CHART_COLORS = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)',
  'var(--chart-6)',
  'var(--chart-7)',
  'var(--chart-8)',
];

/**
 * 차트 툴팁에 전달되는 파라미터 (Bar/Line/Combo)
 */
export interface ChartTooltipParams {
  items: Array<{
    dataKey: string;
    label: string;
    value: number;
    color: string;
  }>;
  xValue: string | number;
  valueFormatter?: (value: number) => string;
}

/**
 * Pie/Donut 차트 툴팁에 전달되는 파라미터
 */
export interface PieTooltipParams {
  name: string;
  value: number;
  percent: number;
  color: string;
  valueFormatter?: (value: number) => string;
}

/**
 * Base props for all chart components
 */
export interface BaseChartProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * Chart data array
   */
  data: ChartDataPoint[];
  /**
   * Chart configuration for labels and colors
   */
  config?: ChartConfig;
  /**
   * Chart width (defaults to responsive)
   */
  width?: number;
  /**
   * Chart height (defaults to responsive)
   */
  height?: number;
  /**
   * Show horizontal grid lines (Y-axis values)
   */
  showXGrid?: boolean;
  /**
   * Show vertical grid lines (X-axis values)
   */
  showYGrid?: boolean;
  /**
   * Show legend
   */
  showLegend?: boolean;
  /**
   * Custom className
   */
  className?: string;
  /**
   * Children (for custom content)
   */
  children?: ReactNode;
  /**
   * Accessible label for the chart
   */
  ariaLabel?: string;
  /**
   * Callback fired when a data point (bar, line point, pie slice) is clicked.
   * Receives the data point object and its index.
   */
  onDataPointClick?: (point: ChartDataPoint, index: number) => void;
  /**
   * When `true`, shows a skeleton loading overlay instead of chart content.
   */
  isLoading?: boolean;
  /**
   * When `true`, the chart will auto-resize to fill its container using ResponsiveContainer.
   * The `width` and `height` props serve as initial/fallback values.
   * @default false
   */
  responsive?: boolean;
  /**
   * 커스텀 툴팁 렌더링 콜백
   */
  renderTooltip?: (params: ChartTooltipParams | PieTooltipParams) => ReactNode;
  /**
   * renderTooltip 사용 시 기본 카드 스타일 래퍼 적용 여부
   * @default false
   */
  wrapCustomTooltip?: boolean;
  /**
   * 차트 컨테이너 스타일 변형
   * - 'default': 배경, 그림자, 라운드 적용
   * - 'unstyled': 투명 배경, 그림자/라운드 없음 (카드 내부 임베딩용)
   * @default 'default'
   */
  variant?: 'default' | 'unstyled';
  /**
   * 차트 애니메이션 활성화 여부 (false: PDF 캡처 등에서 사용)
   * @default true
   */
  animated?: boolean;
  /**
   * 인터랙티브 범례 활성화 (클릭으로 시리즈 토글)
   * @default false
   */
  legendInteractive?: boolean;
  /**
   * 차트 영역 마진 (Recharts margin)
   */
  margin?: { top?: number; right?: number; bottom?: number; left?: number };
  /**
   * 툴팁 값 포맷터
   */
  tooltipValueFormatter?: (value: number) => string;
}

/**
 * Axis configuration
 */
export interface ChartAxisConfig {
  /**
   * Data key for axis values
   */
  dataKey: string;
  /**
   * Axis label
   */
  label?: string;
  /**
   * Domain (min, max) for numeric axes
   */
  domain?: [number, number] | 'auto';
  /**
   * Tick formatter function
   */
  tickFormatter?: (value: string | number) => string;
  /**
   * Y축 틱 개수 (기본값: 5)
   */
  tickCount?: number;
  /**
   * 틱 간격 (tickCount 대신 명시적으로 설정)
   */
  interval?: number;
  /**
   * 축 표시 여부 (기본값: true)
   */
  show?: boolean;
}

/**
 * Bar Chart specific props
 */
export interface BarChartProps extends BaseChartProps {
  /**
   * X-axis configuration
   */
  xAxis: ChartAxisConfig;
  /**
   * Y-axis configuration
   */
  yAxis: ChartAxisConfig;
  /**
   * Size of each bar
   */
  barSize?: number;
  /**
   * Gap between bars
   */
  gap?: number;
  /**
   * Data key for bar values (required for non-stacked charts)
   */
  dataKey?: string;
  /**
   * If true, renders stacked bars with multiple data series
   */
  stacked?: boolean;
  /**
   * Array of data keys to stack (required when stacked is true)
   * Each key represents a layer in the stacked bar
   */
  stackedKeys?: string[];
  /**
   * Color mapping for stacked values
   * If provided as object, maps each stacked key to a color (e.g., { 'value1': '#F27313', 'value2': '#2D766F' })
   * If provided as array, uses array index to map to stackedKeys order
   * If not provided, falls back to colors array with index cycling
   */
  stackedColors?: Record<string, string> | string[];
  /**
   * 막대 모서리 둥글기 (px)
   */
  barRadius?: number;
  /**
   * 차트 방향 (vertical: 세로 막대, horizontal: 가로 막대)
   * @default 'vertical'
   */
  layout?: 'vertical' | 'horizontal';
}

/**
 * Line Chart specific props
 */
export interface LineChartProps extends BaseChartProps {
  /**
   * X-axis configuration
   */
  xAxis: ChartAxisConfig;
  /**
   * Y-axis configuration
   */
  yAxis: ChartAxisConfig;
  /**
   * Data key for line values (required for single line)
   */
  dataKey?: string;
  /**
   * Array of data keys for multiple lines
   * Each key represents a separate line on the chart
   */
  dataKeys?: string[];
  /**
   * Color mapping for multiple lines
   * If provided as object, maps each data key to a color (e.g., { 'value1': '#437DFC', 'value2': '#44BA82' })
   * If provided as array, uses array index to map to dataKeys order
   * If not provided, falls back to colors array with index cycling
   */
  lineColors?: Record<string, string> | string[];
  /**
   * Show area fill under line
   */
  showArea?: boolean;
  /**
   * Show data points
   */
  showPoints?: boolean;
  /**
   * Line stroke width
   */
  strokeWidth?: number;
  /**
   * 부드러운 곡선 사용 여부 (monotone 보간)
   * @default false
   */
  smooth?: boolean;
}

/**
 * Pie Chart specific props
 */
export interface PieChartProps extends BaseChartProps {
  /**
   * Data key for slice values
   */
  dataKey: string;
  /**
   * Data key for slice names/labels
   */
  nameKey: string;
  /**
   * Outer radius
   */
  outerRadius?: number;
  /**
   * Start angle in degrees
   */
  startAngle?: number;
  /**
   * End angle in degrees
   */
  endAngle?: number;
  /**
   * Padding angle between slices
   */
  paddingAngle?: number;
  /**
   * If true, displays only the top half of the chart
   */
  isHalf?: boolean;
}

/**
 * Donut Chart specific props
 */
export interface DonutChartProps extends PieChartProps {
  /**
   * Inner radius (creates the donut hole)
   */
  innerRadius?: number;
  /**
   * Center label text
   */
  centerLabel?: string;
  /**
   * Center value text
   */
  centerValue?: string;
  /**
   * 호버 시 중앙에 슬라이스 정보 표시
   * @default false
   */
  showCenterOnHover?: boolean;
  /**
   * 차트 하단 각주 텍스트
   */
  footnote?: string;
}

/**
 * ComboChart 시리즈 설정 (Bar)
 */
export interface ComboBarSeries {
  dataKey: string;
  color?: string;
  stack?: string;
  barSize?: number;
  radius?: number;
}

/**
 * ComboChart 시리즈 설정 (Line)
 */
export interface ComboLineSeries {
  dataKey: string;
  color?: string;
  yAxisIndex?: 0 | 1;
  smooth?: boolean;
  strokeWidth?: number;
  showArea?: boolean;
}

/**
 * ComboChart specific props
 */
export interface ComboChartProps extends BaseChartProps {
  /**
   * X-axis configuration
   */
  xAxis: ChartAxisConfig;
  /**
   * Y축 설정 (단일 또는 듀얼 Y축)
   */
  yAxis: ChartAxisConfig | [ChartAxisConfig, ChartAxisConfig];
  /**
   * Bar 시리즈 배열
   */
  barSeries: ComboBarSeries[];
  /**
   * Line 시리즈 배열
   */
  lineSeries: ComboLineSeries[];
}

/**
 * Chart variant type
 */
export type ChartVariant = 'bar' | 'line' | 'pie' | 'donut' | 'combo';
