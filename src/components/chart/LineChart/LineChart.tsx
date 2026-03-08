import { forwardRef, useMemo, useCallback } from 'react';
import {
  LineChart as RLineChart,
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { MouseHandlerDataParam } from 'recharts/types/synchronisation/types';

import { Chart } from '../Chart/Chart';
import { useChartConfig } from '../Chart/useChartConfig';
import { ChartTooltipAdapter } from '../Chart/ChartTooltipAdapter';
import { ChartLegend } from '../Chart/ChartLegend';

import type { LineChartProps } from '../Chart/Chart.types';

/**
 * LineChart 컴포넌트
 *
 * 선택적 영역 채우기와 데이터 포인트가 있는 라인으로 데이터를 표시합니다.
 * Recharts 기반으로 Figma 디자인에 맞는 부드러운 선과 축 스타일을 적용합니다.
 */
export const LineChart = forwardRef<HTMLDivElement, LineChartProps>(
  (
    {
      data,
      xAxis,
      yAxis,
      dataKey,
      dataKeys,
      lineColors,
      config,
      width = 600,
      height = 400,
      showArea = false,
      showPoints = true,
      strokeWidth = 2,
      smooth = false,
      showXGrid = true,
      showYGrid = false,
      showLegend = false,
      className,
      ariaLabel,
      onDataPointClick,
      isLoading,
      responsive,
      renderTooltip,
      ...props
    },
    ref
  ) => {
  if (import.meta.env.DEV) {
    if (dataKey && dataKeys && dataKeys.length > 0) {
      console.warn('[LineChart] dataKey와 dataKeys가 동시에 제공되었습니다. dataKeys가 우선 적용됩니다.');
    }
  }

  const isMultiLine = dataKeys && dataKeys.length > 0;
  const activeKeys = useMemo(() => {
    return isMultiLine ? dataKeys : (dataKey ? [dataKey] : []);
  }, [isMultiLine, dataKeys, dataKey]);

  const { getLabel, getColor } = useChartConfig(config, lineColors);

  const handleChartClick = useCallback((state: MouseHandlerDataParam) => {
    if (!onDataPointClick || state?.activeTooltipIndex == null) return;
    const idx = Number(state.activeTooltipIndex);
    if (idx >= 0 && idx < data.length) {
      onDataPointClick(data[idx], idx);
    }
  }, [onDataPointClick, data]);

  const chartAriaLabel = ariaLabel || `Line chart showing ${activeKeys.join(', ') || 'data'}`;
  const yDomain = (yAxis.domain === 'auto' || yAxis.domain === undefined)
    ? [0, (dataMax: number) => Math.max(dataMax, 1)] as const
    : yAxis.domain;
  const tickCount = yAxis.tickCount ?? 5;
  const curveType = smooth ? 'monotone' : 'linear';

  const ChartComponent = showArea ? ComposedChart : RLineChart;

  const chartContent = (
    <ChartComponent
      data={data}
      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      onClick={onDataPointClick ? handleChartClick : undefined}
    >
      <CartesianGrid
        horizontal={showXGrid}
        vertical={showYGrid}
        stroke="var(--chart-grid-line)"
        strokeDasharray=""
      />
      <XAxis
        dataKey={xAxis.dataKey}
        tickFormatter={xAxis.tickFormatter}
        tick={{ fontSize: 12, fill: 'var(--text-muted)' }}
        axisLine={{ stroke: 'var(--chart-axis)' }}
        tickLine={false}
        hide={xAxis.show === false}
      />
      <YAxis
        domain={yDomain}
        tickCount={tickCount}
        interval={yAxis.interval}
        tickFormatter={yAxis.tickFormatter}
        tick={{ fontSize: 12, fill: 'var(--text-muted)' }}
        axisLine={{ stroke: 'var(--chart-axis)' }}
        tickLine={false}
        hide={yAxis.show === false}
      />
      <Tooltip
        content={
          <ChartTooltipAdapter
            renderTooltip={renderTooltip}
            getLabel={getLabel}
            getColor={getColor}
          />
        }
        cursor={{ stroke: 'var(--chart-indicator)', strokeDasharray: '4 4', strokeOpacity: 0.5 }}
      />
      {showLegend && (
        <Legend content={<ChartLegend variant="square" />} />
      )}
      {activeKeys.map((key, index) => {
        const color = getColor(key, index);
        if (showArea) {
          return (
            <Area
              key={key}
              type={curveType}
              dataKey={key}
              stroke={color}
              fill={color}
              fillOpacity={0.1}
              strokeWidth={strokeWidth}
              dot={showPoints ? { r: 4, fill: color, stroke: '#fff', strokeWidth: 2 } : false}
              activeDot={showPoints ? { r: 5, fill: color, stroke: '#fff', strokeWidth: 2 } : undefined}
              name={getLabel(key)}
            />
          );
        }
        return (
          <Line
            key={key}
            type={curveType}
            dataKey={key}
            stroke={color}
            strokeWidth={strokeWidth}
            dot={showPoints ? { r: 4, fill: color, stroke: '#fff', strokeWidth: 2 } : false}
            activeDot={showPoints ? { r: 5, fill: color, stroke: '#fff', strokeWidth: 2 } : undefined}
            name={getLabel(key)}
          />
        );
      })}
    </ChartComponent>
  );

  return (
    <Chart ref={ref} width={responsive ? undefined : width} height={height} className={className} ariaLabel={chartAriaLabel} isLoading={isLoading} responsive={responsive} {...props}>
      {responsive ? (
        <ResponsiveContainer width="100%" height={height}>
          {chartContent}
        </ResponsiveContainer>
      ) : (
        <div style={{ width, height }}>
          <ResponsiveContainer width="100%" height="100%">
            {chartContent}
          </ResponsiveContainer>
        </div>
      )}
    </Chart>
  );
  }
);

LineChart.displayName = 'LineChart';
