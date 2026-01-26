import type { HTMLAttributes, ReactNode } from 'react';

/**
 * Base data point for charts
 */
export interface ChartDataPoint {
  [key: string]: string | number;
}

/**
 * Chart color configuration
 */
export type ChartColor = string | string[];

/**
 * Base props for all chart components
 */
export interface BaseChartProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * Chart data array
   */
  data: ChartDataPoint[];
  /**
   * Color scheme for the chart
   * Can be a single color or array of colors
   */
  colors?: ChartColor;
  /**
   * Chart width (defaults to responsive)
   */
  width?: number;
  /**
   * Chart height (defaults to responsive)
   */
  height?: number;
  /**
   * Enable dark mode styling
   */
  darkMode?: boolean;
  /**
   * Show grid lines
   */
  showGrid?: boolean;
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
  tickFormatter?: (value: any) => string;
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
}

/**
 * Pie/Donut Chart specific props
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
   * Inner radius (for donut chart, 0 for pie chart)
   */
  innerRadius?: number;
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
   * Center label text (for donut chart)
   */
  centerLabel?: string;
  /**
   * Center value text (for donut chart)
   */
  centerValue?: string;
  /**
   * If true, displays only the top half of the chart
   */
  isHalf?: boolean;
}

/**
 * Chart variant type
 */
export type ChartVariant = 'bar' | 'line' | 'pie' | 'donut';
