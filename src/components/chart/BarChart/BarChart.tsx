import { forwardRef, useMemo, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';

import { Chart } from '../Chart/Chart';
import { AdvancedTooltip } from '../../tooltip/Tooltip';
import { cn } from '../../../utils/cn';

import type { BarChartProps } from '../Chart/Chart.types';
import { DEFAULT_CHART_COLORS } from '../Chart/Chart.types';
import type { TooltipItemData } from '../../tooltip/Tooltip/Tooltip.types';

/**
 * BarChart 컴포넌트
 *
 * 설정 가능한 축, 색상, 스타일이 있는 세로 막대로 데이터를 표시합니다.
 * Figma 디자인에 맞는 둥근 막대, 적절한 간격, 축 라벨을 적용합니다.
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
      showXGrid = true,
      showYGrid = false,
      showLegend = false,
      className,
      ariaLabel,
      ...props
    },
    ref
  ) => {
  const getColor = useCallback((key: string, index: number): string => {
    if (config && config[key]) {
      return config[key].color;
    }
    if (stackedColors) {
      if (Array.isArray(stackedColors)) {
        return stackedColors[index % stackedColors.length] || DEFAULT_CHART_COLORS[index % DEFAULT_CHART_COLORS.length];
      }
      return stackedColors[key] || DEFAULT_CHART_COLORS[index % DEFAULT_CHART_COLORS.length];
    }
    return DEFAULT_CHART_COLORS[index % DEFAULT_CHART_COLORS.length];
  }, [config, stackedColors]);

  const getLabel = useCallback((key: string): string => {
    if (config && config[key]) {
      return config[key].label;
    }
    return key;
  }, [config]);

  const padding = { top: 20, right: 20, bottom: 40, left: 60 };
  const linePadding = 8;
  const barAreaPadding = 12;
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const xScale = useMemo(() => {
    const maxBars = data.length;
    const availableWidth = chartWidth - (barAreaPadding * 2);

    let calculatedBarWidth: number;
    let calculatedGap: number;

    if (barSize !== undefined && gap !== undefined) {
      calculatedBarWidth = barSize;
      calculatedGap = gap;
    } else if (barSize !== undefined) {
      calculatedBarWidth = barSize;
      const totalBarsWidth = calculatedBarWidth * maxBars;
      const remainingSpace = availableWidth - totalBarsWidth;
      calculatedGap = maxBars > 1 ? Math.max(0, remainingSpace / (maxBars - 1)) : 0;
    } else if (gap !== undefined) {
      calculatedGap = gap;
      const totalGapsWidth = calculatedGap * (maxBars > 1 ? maxBars - 1 : 0);
      const remainingSpace = availableWidth - totalGapsWidth;
      calculatedBarWidth = maxBars > 0 ? Math.max(4, remainingSpace / maxBars) : 24;
    } else {
      calculatedGap = 8;
      const totalGapsWidth = calculatedGap * (maxBars > 1 ? maxBars - 1 : 0);
      const remainingSpace = availableWidth - totalGapsWidth;
      calculatedBarWidth = maxBars > 0 ? Math.max(4, remainingSpace / maxBars) : 24;
    }

    const totalBarGroupWidth = (calculatedBarWidth * maxBars) + (calculatedGap * (maxBars > 1 ? maxBars - 1 : 0));
    const startOffset = barAreaPadding + (availableWidth - totalBarGroupWidth) / 2;

    return {
      barWidth: calculatedBarWidth,
      gap: calculatedGap,
      getX: (index: number) => {
        return startOffset + (calculatedBarWidth + calculatedGap) * index;
      },
    };
  }, [chartWidth, data.length, barSize, gap, barAreaPadding]);

  const yScale = useMemo(() => {
    let values: number[];
    if (stacked && stackedKeys && stackedKeys.length > 0) {
      values = data.map((d) => {
        return stackedKeys.reduce((sum, key) => sum + (Number(d[key]) || 0), 0);
      });
    } else if (dataKey) {
      values = data.map((d) => Number(d[dataKey]) || 0);
    } else {
      values = [0];
    }
    const maxValue = Math.max(...values, 0);
    let domain: [number, number];
    if (Array.isArray(yAxis.domain) && yAxis.domain.length === 2 && typeof yAxis.domain[0] === 'number' && typeof yAxis.domain[1] === 'number') {
      domain = [yAxis.domain[0], yAxis.domain[1]];
    } else {
      domain = [0, maxValue * 1.1];
    }
    return {
      domain,
      scale: (value: number) => {
        const [min, max] = domain;
        return chartHeight - ((value - min) / (max - min)) * chartHeight;
      },
    };
  }, [chartHeight, data, dataKey, yAxis.domain, stacked, stackedKeys]);

  const getBarColor = useCallback((index: number) => {
    if (dataKey && config && config[dataKey]) {
      return config[dataKey].color;
    }
    return DEFAULT_CHART_COLORS[index % DEFAULT_CHART_COLORS.length];
  }, [config, dataKey]);

  const yTicks = useMemo(() => {
    const [min, max] = yScale.domain;
    const tickCount = 5;
    const step = (max - min) / (tickCount - 1);
    return Array.from({ length: tickCount }, (_, i) => min + step * i);
  }, [yScale.domain]);

  const [tooltipState, setTooltipState] = useState<{
    visible: boolean;
    x: number;
    y: number;
    barIndex: number | null;
    barX: number;
  }>({
    visible: false,
    x: 0,
    y: 0,
    barIndex: null,
    barX: 0,
  });

  const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(null);

  const handleBarMouseEnter = useCallback((index: number, barX: number, event: React.MouseEvent<SVGRectElement>) => {
    const indicatorX = barX + padding.left + xScale.barWidth / 2;

    setHoveredBarIndex(index);
    setTooltipState({
      visible: true,
      x: event.clientX,
      y: event.clientY,
      barIndex: index,
      barX: indicatorX,
    });
  }, [xScale.barWidth, padding.left]);

  const handleBarMouseMove = useCallback((event: React.MouseEvent<SVGRectElement>) => {
    if (!tooltipState.visible) return;

    setTooltipState((prev) => ({
      ...prev,
      x: event.clientX,
      y: event.clientY,
    }));
  }, [tooltipState.visible]);

  const handleBarMouseLeave = useCallback(() => {
    setHoveredBarIndex(null);
    setTooltipState((prev) => ({ ...prev, visible: false }));
  }, []);

  const getTooltipItems = useCallback((index: number): TooltipItemData[] => {
    const item = data[index];
    const dateLabel = String(item[xAxis.dataKey] || '');

    const items: TooltipItemData[] = [
      { type: 'label', label: dateLabel },
      { type: 'divider' },
    ];

    if (stacked && stackedKeys && stackedKeys.length > 0) {
      stackedKeys.forEach((key, keyIndex) => {
        const value = Number(item[key]) || 0;
        const segmentColor = getColor(key, keyIndex);
        items.push({
          type: 'item',
          label: getLabel(key),
          caption: String(value),
          indicatorColor: segmentColor,
        });
      });
    } else if (dataKey) {
      const value = Number(item[dataKey]) || 0;
      const barColor = getBarColor(index);
      items.push({
        type: 'item',
        label: getLabel(dataKey),
        caption: String(value),
        indicatorColor: barColor,
      });
    }

    return items;
  }, [data, dataKey, xAxis.dataKey, getBarColor, stacked, stackedKeys, getColor, getLabel]);

  const chartAriaLabel = ariaLabel || `Bar chart showing ${dataKey || (stackedKeys?.join(', ') || 'data')}`;

  return (
    <Chart ref={ref} width={width} height={height} className={className} ariaLabel={chartAriaLabel} {...props}>
      <svg
        width={width}
        height={height}
        className="overflow-hidden"
        role="graphics-document"
        aria-label={chartAriaLabel}
      >
        <title>{chartAriaLabel}</title>
        {showXGrid &&
          yTicks.map((tick, i) => {
            const y = padding.top + yScale.scale(tick);
            return (
              <line
                key={`grid-x-${i}`}
                x1={padding.left + linePadding}
                y1={y}
                x2={padding.left + chartWidth - linePadding}
                y2={y}
                stroke="var(--chart-grid-line)"
                strokeWidth={1}
              />
            );
          })}

        {showYGrid &&
          data.slice(0, -1).map((_, index) => {
            const x1 = padding.left + xScale.getX(index) + xScale.barWidth;
            const x2 = padding.left + xScale.getX(index + 1);
            const midX = (x1 + x2) / 2;
            return (
              <line
                key={`grid-y-${index}`}
                x1={midX}
                y1={padding.top}
                x2={midX}
                y2={padding.top + chartHeight}
                stroke="var(--chart-grid-line)"
                strokeWidth={1}
              />
            );
          })}

        <line
          x1={padding.left}
          y1={padding.top}
          x2={padding.left}
          y2={padding.top + chartHeight}
          stroke="var(--chart-axis)"
          strokeWidth={1}
        />

        <line
          x1={padding.left}
          y1={padding.top + chartHeight}
          x2={padding.left + chartWidth}
          y2={padding.top + chartHeight}
          stroke="var(--chart-axis)"
          strokeWidth={1}
        />

        {yTicks.map((tick, i) => {
          const y = padding.top + yScale.scale(tick);
          const formattedValue = yAxis.tickFormatter
            ? yAxis.tickFormatter(tick)
            : tick.toFixed(0);
          return (
            <text
              key={`y-tick-${i}`}
              x={padding.left - 8}
              y={y + 4}
              textAnchor="end"
              className={cn(
                'size-xs',
                'text-muted'
              )}
              fill="currentColor"
            >
              {formattedValue}
            </text>
          );
        })}

        {tooltipState.visible && tooltipState.barIndex !== null && (
          <line
            x1={tooltipState.barX}
            y1={padding.top}
            x2={tooltipState.barX}
            y2={padding.top + chartHeight}
            stroke="var(--chart-indicator)"
            strokeWidth={1}
            strokeDasharray="4 4"
            opacity={0.5}
          />
        )}

        <g role="list" aria-label="Bar chart data">
          {data.map((item, index) => {
            const barX = xScale.getX(index);
            const x = padding.left + barX;
            const isHovered = hoveredBarIndex === index;

            const barSegments: Array<{ value: number; height: number; y: number; color: string; key: string }> = [];

            if (stacked && stackedKeys && stackedKeys.length > 0) {
              const totalValue = stackedKeys.reduce((sum, key) => sum + (Number(item[key]) || 0), 0);
              const totalBarHeight = chartHeight - yScale.scale(totalValue);
              let cumulativeHeight = 0;

              stackedKeys.forEach((key, keyIndex) => {
                const segmentValue = Number(item[key]) || 0;
                const segmentColor = getColor(key, keyIndex);

                const segmentHeight = totalValue > 0 ? (segmentValue / totalValue) * totalBarHeight : 0;
                const segmentY = padding.top + chartHeight - cumulativeHeight - segmentHeight;

                barSegments.push({
                  value: segmentValue,
                  height: segmentHeight,
                  y: segmentY,
                  color: segmentColor,
                  key,
                });

                cumulativeHeight += segmentHeight;
              });
            } else if (dataKey) {
              const value = Number(item[dataKey]) || 0;
              const barHeight = chartHeight - yScale.scale(value);
              const y = padding.top + yScale.scale(value);
              const barColor = getBarColor(index);

              barSegments.push({
                value,
                height: barHeight,
                y,
                color: barColor,
                key: dataKey,
              });
            }

            const xLabel = String(item[xAxis.dataKey] || '');

            return (
              <g
                key={`bar-${index}`}
                role="listitem"
                aria-label={`${xLabel}: ${barSegments.map(s => `${getLabel(s.key)} ${s.value}`).join(', ')}`}
              >
                {isHovered && (
                  <rect
                    x={x}
                    y={padding.top}
                    width={xScale.barWidth}
                    height={chartHeight}
                    fill="var(--chart-hover-bg)"
                    rx={2}
                    ry={2}
                    pointerEvents="none"
                  />
                )}
                <g
                  className="overflow-hidden"
                  style={{ borderRadius: '2px' }}
                  clipPath={stacked ? `url(#bar-clip-${index})` : undefined}
                >
                  {stacked && (
                    <defs>
                      <clipPath id={`bar-clip-${index}`}>
                        <rect x={x} y={padding.top} width={xScale.barWidth} height={chartHeight} rx={2} ry={2} />
                      </clipPath>
                    </defs>
                  )}
                  {barSegments.map((segment, segmentIndex) => (
                    <rect
                      key={`segment-${segmentIndex}`}
                      x={x}
                      y={segment.y}
                      width={xScale.barWidth}
                      height={segment.height}
                      fill={segment.color}
                      rx={stacked && segmentIndex === 0 ? 2 : 0}
                      ry={stacked && segmentIndex === 0 ? 2 : 0}
                      onMouseEnter={(e) => handleBarMouseEnter(index, barX, e)}
                      onMouseMove={handleBarMouseMove}
                      onMouseLeave={handleBarMouseLeave}
                      style={{ cursor: 'pointer' }}
                      tabIndex={0}
                      role="graphics-symbol"
                      aria-label={`${getLabel(segment.key)}: ${segment.value}`}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                        }
                      }}
                    />
                  ))}
                </g>
              </g>
            );
          })}
        </g>

        {data.map((item, index) => {
          const x = padding.left + xScale.getX(index) + xScale.barWidth / 2;
          const label = String(item[xAxis.dataKey] || '');
          return (
            <text
              key={`x-label-${index}`}
              x={x}
              y={height - padding.bottom + 20}
              textAnchor="middle"
              className={cn(
                'size-xs',
                'text-muted'
              )}
              fill="currentColor"
            >
              {label}
            </text>
          );
        })}
      </svg>

      {tooltipState.visible && tooltipState.barIndex !== null && createPortal(
        <div
          className="fixed pointer-events-none z-50"
          style={{
            left: `${tooltipState.x + 12}px`,
            top: `${tooltipState.y}px`,
            transform: 'translateY(-50%)',
          }}
        >
          <AdvancedTooltip
            items={getTooltipItems(tooltipState.barIndex)}
          />
        </div>,
        document.body
      )}

      {showLegend && (
        <div className="margin-t-16 padding-x-16 padding-b-16 flex flex-wrap justify-center ds-gap-4" role="list" aria-label="Chart legend">
          {stacked && stackedKeys && stackedKeys.length > 0
            ? stackedKeys.map((key, index) => {
              const legendColor = getColor(key, index);
              return (
                <div key={`legend-${key}`} className="flex items-center ds-gap-2" role="listitem">
                  <div
                    className="[width:12px] [height:12px] rounded-sm"
                    style={{ backgroundColor: legendColor }}
                    aria-hidden="true"
                  />
                  <span className={cn('size-xs', 'text-muted')}>
                    {getLabel(key)}
                  </span>
                </div>
              );
            })
            : dataKey && (
              <div className="flex items-center ds-gap-2" role="listitem">
                <div
                  className="[width:12px] [height:12px] rounded-sm"
                  style={{ backgroundColor: config?.[dataKey]?.color || DEFAULT_CHART_COLORS[0] }}
                  aria-hidden="true"
                />
                <span className={cn('size-xs', 'text-muted')}>
                  {getLabel(dataKey)}
                </span>
              </div>
            )}
        </div>
      )}
    </Chart>
  );
  }
);

BarChart.displayName = 'BarChart';
