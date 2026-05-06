import { forwardRef, useCallback, useMemo, useState } from 'react';
import {
  ComposedChart,
  Bar,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Rectangle,
} from 'recharts';
import type { RectangleProps } from 'recharts';
import type { MouseHandlerDataParam } from 'recharts/types/synchronisation/types';

import { Chart } from '../Chart/Chart';
import { useChartConfig } from '../Chart/useChartConfig';
import { useInteractiveLegend } from '../Chart/useInteractiveLegend';
import { ChartTooltipAdapter } from '../Chart/ChartTooltipAdapter';
import { ChartWithLegend } from '../Chart/ChartWithLegend';

import type { ComboChartProps } from '../Chart/Chart.types';
import { DEFAULT_CHART_COLORS, DEFAULT_CHART_MARGIN, UNSTYLED_CHART_MARGIN } from '../Chart/Chart.types';

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
      margin,
      animated,
      responsive,
      variant = 'default',
      renderTooltip,
      wrapCustomTooltip,
      tooltipValueFormatter,
      tooltipTrigger = 'hover',
      legendInteractive = false,
      legendPosition = 'bottom',
      legendValueFormatter,
      renderLegend,
      ...props
    },
    ref
  ) => {
  const baseMargin = variant === 'unstyled' ? UNSTYLED_CHART_MARGIN : DEFAULT_CHART_MARGIN;
  const chartMargin = { ...baseMargin, ...margin };
  const isAnimated = animated !== false;

  const safeData = useMemo(() => data ?? [], [data]);

  const { getLabel, getTooltipLabel, getColor, buildLegendItems } = useChartConfig(config);

  const allKeys = useMemo(() => [
    ...barSeries.map(s => s.dataKey),
    ...lineSeries.map(s => s.dataKey),
  ], [barSeries, lineSeries]);
  const { hiddenSeries, toggleSeries, isHidden } = useInteractiveLegend(allKeys, legendInteractive);

  const [activeDataKey, setActiveDataKey] = useState<string | null>(null);
  const isItemMode = tooltipTrigger === 'item';
  const barHoverHandlers = (key: string) =>
    isItemMode
      ? {
          onMouseEnter: () => setActiveDataKey(key),
          onMouseLeave: () => setActiveDataKey(null),
        }
      : {};

  const legendItems = useMemo(() => buildLegendItems(allKeys), [buildLegendItems, allKeys]);
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
    if (idx >= 0 && idx < safeData.length) {
      onDataPointClick(safeData[idx], idx);
    }
  }, [onDataPointClick, safeData]);

  const chartAriaLabel = ariaLabel || `Combo chart showing ${[...barSeries.map(s => s.dataKey), ...lineSeries.map(s => s.dataKey)].join(', ')}`;

  const primaryKeys = useMemo(() => [
    ...barSeries.map(s => s.dataKey),
    ...lineSeries.filter(s => (s.yAxisIndex ?? 0) === 0).map(s => s.dataKey),
  ], [barSeries, lineSeries]);

  const secondaryKeys = useMemo(() =>
    lineSeries.filter(s => s.yAxisIndex === 1).map(s => s.dataKey),
  [lineSeries]);

  const primaryDomain = useMemo(() => {
    if (primaryAxis.domain !== 'auto' && primaryAxis.domain !== undefined) return primaryAxis.domain;
    let min = 0;
    let max = 0;
    for (const d of safeData) {
      for (const k of primaryKeys) {
        const v = Number(d[k] ?? 0);
        if (v < min) min = v;
        if (v > max) max = v;
      }
    }
    return [Math.min(min, 0), Math.ceil(Math.max(max, 1) * 1.05)] as [number, number];
  }, [primaryAxis.domain, safeData, primaryKeys]);

  const secondaryDomain = useMemo(() => {
    if (!secondaryAxis) return undefined;
    if (secondaryAxis.domain !== 'auto' && secondaryAxis.domain !== undefined) return secondaryAxis.domain;
    let min = 0;
    let max = 0;
    for (const d of safeData) {
      for (const k of secondaryKeys) {
        const v = Number(d[k] ?? 0);
        if (v < min) min = v;
        if (v > max) max = v;
      }
    }
    return [Math.min(min, 0), Math.ceil(Math.max(max, 1) * 1.05)] as [number, number];
  }, [secondaryAxis, safeData, secondaryKeys]);

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
      data={safeData}
      margin={chartMargin}
      onClick={onDataPointClick ? handleChartClick : undefined}
    >
      <CartesianGrid
        horizontal={showXGrid}
        vertical={showYGrid}
        syncWithTicks
        yAxisId="0"
        stroke="var(--chart-grid-line)"
        strokeDasharray="3 3"
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
        dataKey={primaryAxis.dataKey}
        domain={primaryDomain}
        allowDataOverflow
        tickCount={primaryAxis.tickCount ?? 5}
        interval={primaryAxis.interval}
        tickFormatter={primaryAxis.tickFormatter}
        tick={{ fontSize: 12, fill: 'var(--text-muted)' }}
        axisLine={{ stroke: 'var(--chart-axis)' }}
        tickLine={false}
        padding={{ top: 15 }}
        hide={primaryAxis.show === false}
      />
      {isDualAxis && secondaryAxis && (
        <YAxis
          yAxisId="1"
          orientation="right"
          dataKey={secondaryAxis.dataKey}
          domain={secondaryDomain}
          allowDataOverflow
          tickCount={secondaryAxis.tickCount ?? 5}
          interval={secondaryAxis.interval}
          tickFormatter={secondaryAxis.tickFormatter}
          tick={secondaryAxis.show === false ? false : { fontSize: 12, fill: 'var(--text-muted)' }}
          axisLine={secondaryAxis.show === false ? false : { stroke: 'var(--chart-axis)' }}
          tickLine={false}
          padding={{ top: 15 }}
          width={secondaryAxis.show === false ? 0 : undefined}
        />
      )}
      <Tooltip
        trigger={tooltipTrigger === 'click' ? 'click' : 'hover'}
        content={
          <ChartTooltipAdapter
            renderTooltip={renderTooltip}
            wrapCustomTooltip={wrapCustomTooltip}
            getLabel={getLabel}
            getTooltipLabel={getTooltipLabel}
            getColor={getColor}
            tooltipValueFormatter={tooltipValueFormatter}
            tooltipTrigger={tooltipTrigger}
            activeDataKey={activeDataKey}
          />
        }
        cursor={tooltipTrigger === 'item' ? { stroke: 'transparent', strokeWidth: 0 } : { stroke: 'var(--chart-indicator)', strokeDasharray: '4 4', strokeOpacity: 0.5 }}
        wrapperStyle={tooltipTrigger === 'item' && activeDataKey == null ? { visibility: 'hidden' } : undefined}
      />
      {barSeries.filter(s => !isHidden(s.dataKey)).map((series, index) => {
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
              isAnimationActive={isAnimated}
              {...barHoverHandlers(series.dataKey)}
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
            isAnimationActive={isAnimated}
            {...barHoverHandlers(series.dataKey)}
            radius={radius ? [radius, radius, radius, radius] : undefined}
          />
        );
      })}
      {lineSeries.filter(s => !isHidden(s.dataKey)).map((series, index) => {
        const color = getSeriesColor(series.dataKey, series.color, barSeries.length + index);
        const yAxisId = String(series.yAxisIndex ?? 0);
        const curveType = series.smooth ? 'monotone' : 'linear';

        if (series.showArea) {
          return (
            <Area
              key={series.dataKey}
              connectNulls
              type={curveType}
              dataKey={series.dataKey}
              yAxisId={yAxisId}
              stroke={color}
              fill={color}
              fillOpacity={0.1}
              strokeWidth={series.strokeWidth ?? 2}
              name={getLabel(series.dataKey)}
              dot={{ r: 4, fill: color, stroke: 'var(--bg-card)', strokeWidth: 2 }}
              isAnimationActive={isAnimated}
            />
          );
        }

        return (
          <Line
            key={series.dataKey}
            connectNulls
            type={curveType}
            dataKey={series.dataKey}
            yAxisId={yAxisId}
            stroke={color}
            strokeWidth={series.strokeWidth ?? 2}
            name={getLabel(series.dataKey)}
            dot={{ r: 4, fill: color, stroke: 'var(--bg-card)', strokeWidth: 2 }}
            isAnimationActive={isAnimated}
          />
        );
      })}
    </ComposedChart>
  );

  return (
    <Chart ref={ref} width={responsive || legendPosition === 'right' ? undefined : width} height={height} className={className} ariaLabel={chartAriaLabel} isLoading={isLoading} responsive={responsive} variant={variant} {...props}>
      <ChartWithLegend
        showLegend={showLegend}
        renderLegend={renderLegend}
        legendProps={{
          items: legendItems,
          variant: 'square',
          position: legendPosition,
          interactive: legendInteractive,
          hiddenSeries,
          onToggle: toggleSeries,
          valueFormatter: legendValueFormatter,
        }}
      >
        {responsive ? (
          <ResponsiveContainer width="100%" height={height}>
            {chartContent}
          </ResponsiveContainer>
        ) : (
          <div style={{ width: legendPosition === 'right' ? '100%' : width, height }}>
            <ResponsiveContainer width="100%" height="100%">
              {chartContent}
            </ResponsiveContainer>
          </div>
        )}
      </ChartWithLegend>
    </Chart>
  );
  }
);

ComboChart.displayName = 'ComboChart';
