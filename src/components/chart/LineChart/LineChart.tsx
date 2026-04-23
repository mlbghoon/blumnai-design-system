import { forwardRef, useMemo, useCallback, useState } from 'react';

import {
  LineChart as RLineChart,
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { MouseHandlerDataParam } from 'recharts/types/synchronisation/types';

import { Chart } from '../Chart/Chart';
import { useChartConfig } from '../Chart/useChartConfig';
import { ChartTooltipAdapter } from '../Chart/ChartTooltipAdapter';
import { ChartWithLegend } from '../Chart/ChartWithLegend';
import { useInteractiveLegend } from '../Chart/useInteractiveLegend';

import type { LineChartProps } from '../Chart/Chart.types';
import { DEFAULT_CHART_MARGIN, UNSTYLED_CHART_MARGIN } from '../Chart/Chart.types';

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
  const chartMargin = useMemo(() => ({ ...baseMargin, ...margin }), [baseMargin, margin]);
  const isAnimated = animated !== false;

  if (import.meta.env.DEV) {
    if (dataKey && dataKeys && dataKeys.length > 0) {
      console.warn('[LineChart] dataKey와 dataKeys가 동시에 제공되었습니다. dataKeys가 우선 적용됩니다.');
    }
  }

  const safeData = useMemo(() => data ?? [], [data]);

  const isMultiLine = dataKeys && dataKeys.length > 0;
  const activeKeys = useMemo(() => {
    return isMultiLine ? dataKeys : (dataKey ? [dataKey] : []);
  }, [isMultiLine, dataKeys, dataKey]);

  const { getLabel, getTooltipLabel, getColor, buildLegendItems } = useChartConfig(config, lineColors);
  const { hiddenSeries, toggleSeries, isHidden } = useInteractiveLegend(activeKeys, legendInteractive);

  const [activeDataKey, setActiveDataKey] = useState<string | null>(null);
  const isItemMode = tooltipTrigger === 'item';

  const legendItems = useMemo(() => buildLegendItems(activeKeys), [buildLegendItems, activeKeys]);

  const handleChartClick = useCallback((state: MouseHandlerDataParam) => {
    if (!onDataPointClick || state?.activeTooltipIndex == null) return;
    const idx = Number(state.activeTooltipIndex);
    if (idx >= 0 && idx < safeData.length) {
      onDataPointClick(safeData[idx], idx);
    }
  }, [onDataPointClick, safeData]);

  // item 모드용: 커서 Y에 가장 가까운 시리즈 추적
  const yDomainNumeric = useMemo<readonly [number, number]>(() => {
    if (Array.isArray(yAxis.domain)
        && typeof yAxis.domain[0] === 'number'
        && typeof yAxis.domain[1] === 'number') {
      return [yAxis.domain[0], yAxis.domain[1]] as const;
    }
    let min = 0;
    let max = 0;
    for (const d of safeData) {
      for (const k of activeKeys) {
        const v = Number((d as Record<string, unknown>)[k] ?? 0);
        if (Number.isFinite(v)) {
          if (v < min) min = v;
          if (v > max) max = v;
        }
      }
    }
    return [Math.min(min, 0), Math.ceil(Math.max(max, 1) * 1.05)] as const;
  }, [yAxis.domain, safeData, activeKeys]);

  // XAxis 기본 높이(~30) 차감하여 플롯 영역 높이 추정
  const xAxisHeight = xAxis.show === false ? 0 : 30;

  const handleMouseMove = useCallback((state: MouseHandlerDataParam | undefined) => {
    if (!isItemMode) return;

    // Recharts 3.x onMouseMove state has: activeCoordinate, activeTooltipIndex,
    // activeLabel, activeDataKey, isTooltipActive. (Not activePayload/chartY.)
    // activeTooltipIndex is coerced to STRING at runtime despite its numeric type
    // — see combineActiveCartesianProps in recharts/es6/state/selectors/selectors.js.
    const coord = state?.activeCoordinate;
    const rawIdx = state?.activeTooltipIndex;
    const idxNum = typeof rawIdx === 'string' ? Number(rawIdx) : rawIdx;

    if (!coord || typeof idxNum !== 'number' || !Number.isFinite(idxNum)
        || idxNum < 0 || idxNum >= safeData.length) {
      setActiveDataKey(null);
      return;
    }

    const row = safeData[idxNum] as Record<string, unknown> | undefined;
    if (!row) {
      setActiveDataKey(null);
      return;
    }

    // Convert cursor pixel Y → data-space Y using y-domain + plot area dimensions
    const plotTop = chartMargin.top ?? 0;
    const plotBottom = (chartMargin.bottom ?? 0) + xAxisHeight;
    const plotHeight = Math.max(1, height - plotTop - plotBottom);
    const [yMin, yMax] = yDomainNumeric;
    const normalized = (coord.y - plotTop) / plotHeight;
    const cursorValue = yMax - normalized * (yMax - yMin);

    let closestKey: string | null = null;
    let closestDist = Infinity;
    for (const key of activeKeys) {
      if (isHidden(key)) continue;
      const v = Number(row[key] ?? 0);
      if (!Number.isFinite(v)) continue;
      const dist = Math.abs(v - cursorValue);
      if (dist < closestDist) {
        closestDist = dist;
        closestKey = key;
      }
    }
    setActiveDataKey(closestKey);
  }, [isItemMode, yDomainNumeric, chartMargin, height, xAxisHeight, isHidden, activeKeys, safeData]);

  const handleMouseLeave = useCallback(() => {
    if (isItemMode) setActiveDataKey(null);
  }, [isItemMode]);

  const chartAriaLabel = ariaLabel || `Line chart showing ${activeKeys.join(', ') || 'data'}`;
  const yDomain = (yAxis.domain === 'auto' || yAxis.domain === undefined)
    ? [(dataMin: number) => Math.min(dataMin, 0), (dataMax: number) => Math.ceil(Math.max(dataMax, 1) * 1.05)] as const
    : yAxis.domain;
  const tickCount = yAxis.tickCount ?? 5;
  const curveType = smooth ? 'monotone' : 'linear';

  const ChartComponent = showArea ? ComposedChart : RLineChart;

  const chartContent = (
    <ChartComponent
      data={safeData}
      margin={chartMargin}
      onClick={onDataPointClick ? handleChartClick : undefined}
      onMouseMove={isItemMode ? handleMouseMove : undefined}
      onMouseLeave={isItemMode ? handleMouseLeave : undefined}
    >
      <CartesianGrid
        horizontal={showXGrid}
        vertical={showYGrid}
        syncWithTicks
        stroke="var(--chart-grid-line)"
        strokeDasharray="3 3"
      />
      <XAxis
        dataKey={xAxis.dataKey}
        padding={{ left: 20, right: 20 }}
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
        cursor={tooltipTrigger === 'item' ? false : { stroke: 'var(--chart-indicator)', strokeDasharray: '4 4', strokeOpacity: 0.5 }}
      />
      {activeKeys.filter(key => !isHidden(key)).map((key, index) => {
        const color = getColor(key, index);
        if (showArea) {
          return (
            <Area
              key={key}
              connectNulls
              type={curveType}
              dataKey={key}
              stroke={color}
              fill={color}
              fillOpacity={0.1}
              strokeWidth={strokeWidth}
              dot={showPoints ? { r: 4, fill: color, stroke: 'var(--bg-card)', strokeWidth: 2 } : false}
              activeDot={showPoints ? { r: 5, fill: color, stroke: 'var(--bg-card)', strokeWidth: 2 } : undefined}
              name={getLabel(key)}
              isAnimationActive={isAnimated}
            />
          );
        }
        return (
          <Line
            key={key}
            connectNulls
            type={curveType}
            dataKey={key}
            stroke={color}
            strokeWidth={strokeWidth}
            dot={showPoints ? { r: 4, fill: color, stroke: 'var(--bg-card)', strokeWidth: 2 } : false}
            activeDot={showPoints ? { r: 5, fill: color, stroke: 'var(--bg-card)', strokeWidth: 2 } : undefined}
            name={getLabel(key)}
            isAnimationActive={isAnimated}
          />
        );
      })}
    </ChartComponent>
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

LineChart.displayName = 'LineChart';
