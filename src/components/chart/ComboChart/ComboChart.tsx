import { forwardRef, useCallback } from 'react';
import {
  ComposedChart,
  Bar,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Rectangle,
} from 'recharts';
import type { RectangleProps } from 'recharts';
import type { MouseHandlerDataParam } from 'recharts/types/synchronisation/types';

import { Chart } from '../Chart/Chart';
import { useChartConfig } from '../Chart/useChartConfig';
import { ChartTooltipAdapter } from '../Chart/ChartTooltipAdapter';
import { ChartLegend } from '../Chart/ChartLegend';

import type { ComboChartProps } from '../Chart/Chart.types';
import { DEFAULT_CHART_COLORS } from '../Chart/Chart.types';

/**
 * ComboChart 컴포넌트
 *
 * Bar와 Line을 혼합하여 데이터를 표시합니다.
 * Recharts ComposedChart 기반으로 듀얼 Y축을 지원합니다.
 */
export const ComboChart = forwardRef<HTMLDivElement, ComboChartProps>(
  (
    {
      data,
      xAxis,
      yAxis,
      barSeries,
      lineSeries,
      config,
      width = 600,
      height = 400,
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
  const { getLabel, getColor } = useChartConfig(config);
  const isDualAxis = Array.isArray(yAxis);
  const primaryAxis = isDualAxis ? yAxis[0] : yAxis;
  const secondaryAxis = isDualAxis ? yAxis[1] : undefined;

  const getSeriesColor = (key: string, color: string | undefined, index: number): string => {
    if (color) return color;
    if (config?.[key]) return config[key].color;
    return DEFAULT_CHART_COLORS[index % DEFAULT_CHART_COLORS.length];
  };

  const handleChartClick = useCallback((state: MouseHandlerDataParam) => {
    if (!onDataPointClick || state?.activeTooltipIndex == null) return;
    const idx = Number(state.activeTooltipIndex);
    if (idx >= 0 && idx < data.length) {
      onDataPointClick(data[idx], idx);
    }
  }, [onDataPointClick, data]);

  const chartAriaLabel = ariaLabel || `Combo chart showing ${[...barSeries.map(s => s.dataKey), ...lineSeries.map(s => s.dataKey)].join(', ')}`;

  const primaryDomain = (primaryAxis.domain === 'auto' || primaryAxis.domain === undefined)
    ? [0, (dataMax: number) => Math.max(dataMax, 1)] as const
    : primaryAxis.domain;
  const secondaryDomain = (secondaryAxis?.domain === 'auto' || secondaryAxis?.domain === undefined)
    ? [0, (dataMax: number) => Math.max(dataMax, 1)] as const
    : secondaryAxis?.domain;

  const stackGroups = new Map<string, string[]>();
  barSeries.forEach((s) => {
    if (s.stack) {
      const existing = stackGroups.get(s.stack) || [];
      existing.push(s.dataKey);
      stackGroups.set(s.stack, existing);
    }
  });

  const chartContent = (
    <ComposedChart
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
        yAxisId="0"
        domain={primaryDomain}
        tickCount={primaryAxis.tickCount ?? 5}
        interval={primaryAxis.interval}
        tickFormatter={primaryAxis.tickFormatter}
        tick={{ fontSize: 12, fill: 'var(--text-muted)' }}
        axisLine={{ stroke: 'var(--chart-axis)' }}
        tickLine={false}
        hide={primaryAxis.show === false}
      />
      {isDualAxis && secondaryAxis && (
        <YAxis
          yAxisId="1"
          orientation="right"
          domain={secondaryDomain}
          tickCount={secondaryAxis.tickCount ?? 5}
          interval={secondaryAxis.interval}
          tickFormatter={secondaryAxis.tickFormatter}
          tick={{ fontSize: 12, fill: 'var(--text-muted)' }}
          axisLine={{ stroke: 'var(--chart-axis)' }}
          tickLine={false}
          hide={secondaryAxis.show === false}
        />
      )}
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
      {barSeries.map((series, index) => {
        const color = getSeriesColor(series.dataKey, series.color, index);
        const stackId = series.stack ?? undefined;

        const isStackTop = stackId
          ? stackGroups.get(stackId)?.slice(-1)[0] === series.dataKey
          : false;

        const radius = series.radius;

        if (stackId && radius && radius > 0) {
          return (
            <Bar
              key={series.dataKey}
              dataKey={series.dataKey}
              yAxisId="0"
              stackId={stackId}
              fill={color}
              name={getLabel(series.dataKey)}
              barSize={series.barSize}
              shape={(shapeProps: RectangleProps) => {
                const r = isStackTop
                  ? [radius, radius, 0, 0] as [number, number, number, number]
                  : [0, 0, 0, 0] as [number, number, number, number];
                return <Rectangle {...shapeProps} radius={r} />;
              }}
            />
          );
        }

        return (
          <Bar
            key={series.dataKey}
            dataKey={series.dataKey}
            yAxisId="0"
            stackId={stackId}
            fill={color}
            name={getLabel(series.dataKey)}
            barSize={series.barSize}
            radius={radius ? [radius, radius, radius, radius] : undefined}
          />
        );
      })}
      {lineSeries.map((series, index) => {
        const color = getSeriesColor(series.dataKey, series.color, barSeries.length + index);
        const yAxisId = String(series.yAxisIndex ?? 0);
        const curveType = series.smooth ? 'monotone' : 'linear';

        if (series.showArea) {
          return (
            <Area
              key={series.dataKey}
              type={curveType}
              dataKey={series.dataKey}
              yAxisId={yAxisId}
              stroke={color}
              fill={color}
              fillOpacity={0.1}
              strokeWidth={series.strokeWidth ?? 2}
              name={getLabel(series.dataKey)}
              dot={{ r: 4, fill: color, stroke: '#fff', strokeWidth: 2 }}
            />
          );
        }

        return (
          <Line
            key={series.dataKey}
            type={curveType}
            dataKey={series.dataKey}
            yAxisId={yAxisId}
            stroke={color}
            strokeWidth={series.strokeWidth ?? 2}
            name={getLabel(series.dataKey)}
            dot={{ r: 4, fill: color, stroke: '#fff', strokeWidth: 2 }}
          />
        );
      })}
    </ComposedChart>
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

ComboChart.displayName = 'ComboChart';
