import { forwardRef, useMemo, useCallback, useState } from 'react';
import {
  BarChart as RBarChart,
  Bar,
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

import type { BarChartProps } from '../Chart/Chart.types';
import { DEFAULT_CHART_COLORS, DEFAULT_CHART_MARGIN, UNSTYLED_CHART_MARGIN } from '../Chart/Chart.types';

/**
 * BarChart 컴포넌트
 *
 * 설정 가능한 축, 색상, 스타일이 있는 세로 막대로 데이터를 표시합니다.
 * Recharts 기반으로 Figma 디자인에 맞는 둥근 막대, 적절한 간격, 축 라벨을 적용합니다.
 */
export const BarChart = forwardRef<HTMLDivElement, BarChartProps>(
  (
    {
      data,
      xAxis,
      yAxis,
      dataKey,
      config,
      width = 600,
      height = 400,
      barSize,
      gap,
      stacked = false,
      stackedKeys,
      stackedColors,
      barRadius,
      layout = 'vertical',
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
  const isHorizontal = layout === 'horizontal';
  const baseMargin = variant === 'unstyled' ? UNSTYLED_CHART_MARGIN : DEFAULT_CHART_MARGIN;
  const chartMargin = { ...baseMargin, ...margin };
  const isAnimated = animated !== false;
  const safeData = useMemo(() => data ?? [], [data]);
  const { getLabel, getTooltipLabel, getColor, buildLegendItems } = useChartConfig(config, stackedColors);

  const allKeys = useMemo(() => stacked ? (stackedKeys ?? []) : (dataKey ? [dataKey] : []), [stacked, stackedKeys, dataKey]);
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

  const getBarColor = (key: string, index: number): string => {
    if (config?.[key]) return config[key].color;
    if (stackedColors) {
      if (Array.isArray(stackedColors)) {
        return stackedColors[index % stackedColors.length] || DEFAULT_CHART_COLORS[index % DEFAULT_CHART_COLORS.length];
      }
      return stackedColors[key] || DEFAULT_CHART_COLORS[index % DEFAULT_CHART_COLORS.length];
    }
    return DEFAULT_CHART_COLORS[index % DEFAULT_CHART_COLORS.length];
  };

  const handleChartClick = useCallback((state: MouseHandlerDataParam) => {
    if (!onDataPointClick || state?.activeTooltipIndex == null) return;
    const idx = Number(state.activeTooltipIndex);
    if (idx >= 0 && idx < safeData.length) {
      onDataPointClick(safeData[idx], idx);
    }
  }, [onDataPointClick, safeData]);

  if (import.meta.env.DEV) {
    if (stacked && (!stackedKeys || stackedKeys.length === 0)) {
      console.warn('[BarChart] stacked={true}이지만 stackedKeys가 제공되지 않았습니다. stacked 모드를 사용하려면 stackedKeys를 지정하세요.');
    }
  }

  const chartAriaLabel = ariaLabel || `Bar chart showing ${dataKey || (stackedKeys?.join(', ') || 'data')}`;
  const yDomain = (yAxis.domain === 'auto' || yAxis.domain === undefined)
    ? [0, (dataMax: number) => Math.ceil(Math.max(dataMax, 1) * 1.05)] as const
    : yAxis.domain;
  const tickCount = yAxis.tickCount ?? 5;

  const renderStackedBar = (
    stackKey: string,
    keyIndex: number,
    totalKeys: number
  ) => {
    if (!barRadius || barRadius <= 0) {
      return (
        <Bar
          key={stackKey}
          dataKey={stackKey}
          stackId="stack"
          fill={getBarColor(stackKey, keyIndex)}
          name={getLabel(stackKey)}
          barSize={barSize}
          isAnimationActive={isAnimated}
          {...barHoverHandlers(stackKey)}
        />
      );
    }

    const isTop = keyIndex === totalKeys - 1;
    return (
      <Bar
        key={stackKey}
        dataKey={stackKey}
        stackId="stack"
        fill={getBarColor(stackKey, keyIndex)}
        name={getLabel(stackKey)}
        barSize={barSize}
        isAnimationActive={isAnimated}
        {...barHoverHandlers(stackKey)}
        shape={(shapeProps: RectangleProps) => {
          const r = isTop
            ? (isHorizontal
              ? [0, barRadius, barRadius, 0] as [number, number, number, number]
              : [barRadius, barRadius, 0, 0] as [number, number, number, number])
            : [0, 0, 0, 0] as [number, number, number, number];
          return <Rectangle {...shapeProps} radius={r} />;
        }}
      />
    );
  };

  const chartContent = (
    <RBarChart
      data={safeData}
      barCategoryGap={gap ?? 8}
      margin={chartMargin}
      onClick={onDataPointClick ? handleChartClick : undefined}
      {...(isHorizontal ? { layout: 'vertical' as const } : {})}
    >
      <CartesianGrid
        horizontal={isHorizontal ? showYGrid : showXGrid}
        vertical={isHorizontal ? showXGrid : showYGrid}
        syncWithTicks
        stroke="var(--chart-grid-line)"
        strokeDasharray="3 3"
      />
      {isHorizontal ? (
        <>
          <XAxis
            type="number"
            domain={yDomain}
            tickCount={tickCount}
            interval={yAxis.interval}
            tickFormatter={yAxis.tickFormatter}
            tick={{ fontSize: 12, fill: 'var(--text-muted)' }}
            axisLine={{ stroke: 'var(--chart-axis)' }}
            tickLine={false}
            hide={yAxis.show === false}
          />
          <YAxis
            type="category"
            dataKey={xAxis.dataKey}
            tickFormatter={xAxis.tickFormatter}
            tick={{ fontSize: 12, fill: 'var(--text-muted)' }}
            axisLine={{ stroke: 'var(--chart-axis)' }}
            tickLine={false}
            hide={xAxis.show === false}
            width={55}
          />
        </>
      ) : (
        <>
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
            padding={{ top: 15 }}
            hide={yAxis.show === false}
          />
        </>
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
      {stacked && stackedKeys && stackedKeys.length > 0
        ? stackedKeys.filter(k => !isHidden(k)).map((key, i) => renderStackedBar(key, i, stackedKeys.filter(k => !isHidden(k)).length))
        : dataKey && !isHidden(dataKey) && (
            <Bar
              dataKey={dataKey}
              fill={getBarColor(dataKey, 0)}
              name={getLabel(dataKey)}
              barSize={barSize}
              isAnimationActive={isAnimated}
              {...barHoverHandlers(dataKey)}
              radius={barRadius
                ? (isHorizontal
                  ? [0, barRadius, barRadius, 0] as [number, number, number, number]
                  : [barRadius, barRadius, 0, 0] as [number, number, number, number])
                : undefined}
            />
          )}
    </RBarChart>
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

BarChart.displayName = 'BarChart';
