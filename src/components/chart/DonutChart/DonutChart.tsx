import { forwardRef, useMemo, useState } from 'react';
import {
  PieChart as RPieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import { Chart } from '../Chart/Chart';
import { useChartConfig } from '../Chart/useChartConfig';
import { useInteractiveLegend } from '../Chart/useInteractiveLegend';
import { PieTooltipAdapter } from '../Chart/ChartTooltipAdapter';
import { ChartWithLegend } from '../Chart/ChartWithLegend';
import type { LegendItem } from '../Chart/ChartLegend';
import { cn } from '@/lib/utils';

import type { DonutChartProps } from '../Chart/Chart.types';

/**
 * DonutChart 컴포넌트
 *
 * 데이터를 도넛 차트(중앙에 구멍이 있는 파이 차트)로 표시합니다.
 * Recharts 기반으로 Figma 디자인에 맞는 색상과 간격을 적용합니다.
 */
export const DonutChart = forwardRef<HTMLDivElement, DonutChartProps>(
  (
    {
      data,
      dataKey,
      nameKey,
      config,
      width = 400,
      height = 400,
      innerRadius = 80,
      outerRadius = 150,
      startAngle = 0,
      endAngle = 360,
      paddingAngle = 0,
      showLegend = false,
      centerLabel,
      centerValue,
      showCenterOnHover = false,
      isHalf = false,
      animated,
      footnote,
      className,
      ariaLabel,
      onDataPointClick,
      isLoading,
      responsive,
      renderTooltip,
      wrapCustomTooltip,
      tooltipValueFormatter,
      legendInteractive = false,
      legendPosition = 'bottom',
      legendValueFormatter,
      ...props
    },
    ref
  ) => {
  const isAnimated = animated !== false;
  const safeData = useMemo(() => data ?? [], [data]);
  const { getLabel, getTooltipLabel, getColor } = useChartConfig(config);

  const allPieKeys = useMemo(() => safeData.map(d => String(d[nameKey] ?? '')), [safeData, nameKey]);
  const { hiddenSeries, toggleSeries, isHidden } = useInteractiveLegend(allPieKeys, legendInteractive);

  const [hoveredSlice, setHoveredSlice] = useState<{
    name: string;
    value: number;
  } | null>(null);

  const colors = useMemo(() => {
    return safeData.map((item, index) => {
      const name = String(item[nameKey] ?? '');
      return getColor(name, index);
    });
  }, [safeData, nameKey, getColor]);

  const legendItems: LegendItem[] = useMemo(() => {
    return allPieKeys.map((key, index) => {
      const dataItem = safeData.find(d => String(d[nameKey] ?? '') === key);
      return {
        key,
        label: getLabel(key),
        color: getColor(key, index),
        value: dataItem ? Number(dataItem[dataKey] ?? 0) : 0,
      };
    });
  }, [allPieKeys, safeData, nameKey, dataKey, getLabel, getColor]);

  const totalValue = useMemo(
    () => safeData.reduce((sum, item) => sum + Number(item[dataKey] ?? 0), 0),
    [safeData, dataKey]
  );

  const rStartAngle = isHalf ? 180 : 90 - startAngle;
  const rEndAngle = isHalf ? 0 : 90 - endAngle;

  const maxRadius = Math.floor(Math.min(width, height) / 2) - 4;
  const safeOuterRadius = Math.min(outerRadius, maxRadius);
  const safeInnerRadius = Math.min(innerRadius, safeOuterRadius - 1);

  const halfPadding = showLegend ? 80 : 20;
  const svgHeight = isHalf ? safeOuterRadius + halfPadding : height;

  const displayLabel = showCenterOnHover && hoveredSlice ? hoveredSlice.name : centerLabel;
  const displayValue = showCenterOnHover && hoveredSlice ? String(hoveredSlice.value) : centerValue;

  const chartAriaLabel = ariaLabel || `Donut chart showing ${safeData.map(d => String(d[nameKey] ?? '')).join(', ')}`;

  const chartContent = (
    <RPieChart>
      <Pie
        data={safeData}
        dataKey={dataKey}
        nameKey={nameKey}
        cx="50%"
        cy={isHalf ? '100%' : '50%'}
        innerRadius={safeInnerRadius}
        outerRadius={safeOuterRadius}
        startAngle={rStartAngle}
        endAngle={rEndAngle}
        paddingAngle={paddingAngle}
        isAnimationActive={isAnimated}
        stroke="var(--bg-card)"
        strokeWidth={2}
        onMouseEnter={(_: unknown, index: number) => {
          const name = String(safeData[index]?.[nameKey] ?? '');
          if (isHidden(name)) return;
          if (showCenterOnHover) {
            const item = safeData[index];
            setHoveredSlice({
              name: getLabel(String(item[nameKey] ?? '')),
              value: Number(item[dataKey] ?? 0),
            });
          }
        }}
        onMouseLeave={() => {
          if (showCenterOnHover) setHoveredSlice(null);
        }}
        onClick={(_data: Record<string, unknown>, idx: number) => {
          const name = String(safeData[idx]?.[nameKey] ?? '');
          if (isHidden(name)) return;
          if (onDataPointClick) onDataPointClick(safeData[idx], idx);
        }}
      >
        {safeData.map((item, index) => {
          const name = String(item[nameKey] ?? '');
          const hidden = isHidden(name);
          return (
            <Cell
              key={`cell-${index}`}
              fill={hidden ? 'transparent' : colors[index]}
              stroke={hidden ? 'transparent' : 'var(--bg-card)'}
            />
          );
        })}
      </Pie>
      <Tooltip
        content={
          <PieTooltipAdapter
            renderTooltip={renderTooltip}
            wrapCustomTooltip={wrapCustomTooltip}
            getLabel={getLabel}
            getTooltipLabel={getTooltipLabel}
            totalValue={totalValue}
            tooltipValueFormatter={tooltipValueFormatter}
          />
        }
      />
    </RPieChart>
  );

  return (
    <Chart ref={ref} width={responsive ? undefined : width} height={isHalf ? undefined : height} className={className} ariaLabel={chartAriaLabel} isLoading={isLoading} responsive={responsive} {...props}>
      <ChartWithLegend
        showLegend={showLegend}
        legendProps={{
          items: legendItems,
          variant: 'circle',
          position: legendPosition,
          interactive: legendInteractive,
          hiddenSeries,
          onToggle: toggleSeries,
          valueFormatter: legendValueFormatter,
        }}
      >
        <div className="relative">
          {responsive ? (
            <ResponsiveContainer width="100%" height={svgHeight}>
              {chartContent}
            </ResponsiveContainer>
          ) : (
            <div style={{ width, height: svgHeight }}>
              <ResponsiveContainer width="100%" height="100%">
                {chartContent}
              </ResponsiveContainer>
            </div>
          )}

          {(displayLabel || displayValue) && (
            <div
              className="absolute flex flex-col items-center justify-center ds-gap-1 pointer-events-none"
              style={{
                left: '50%',
                top: isHalf ? `${safeOuterRadius - (safeOuterRadius - safeInnerRadius) / 2}px` : '50%',
                transform: 'translate(-50%, -50%)',
              }}
              aria-hidden="true"
            >
              {displayLabel && (
                <div
                  className={cn(
                    'size-xs line-height-leading-4 font-medium text-center',
                    'text-muted'
                  )}
                >
                  {displayLabel}
                </div>
              )}
              {displayValue && (
                <div
                  className={cn(
                    'size-2xl line-height-leading-8 font-medium text-center',
                    'text-default'
                  )}
                >
                  {displayValue}
                </div>
              )}
            </div>
          )}
        </div>
      </ChartWithLegend>
      {footnote && (
        <div className="text-center padding-y-4">
          <span className="inline-block bg-muted padding-x-8 padding-y-4 rounded-sm size-sm line-height-leading-5 text-muted">
            {footnote}
          </span>
        </div>
      )}
    </Chart>
  );
  }
);

DonutChart.displayName = 'DonutChart';
