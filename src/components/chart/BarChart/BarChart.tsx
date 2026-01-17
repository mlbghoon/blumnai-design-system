import { useMemo, useState, useCallback } from 'react';

import { Chart } from '../Chart/Chart';
import { Tooltip } from '../../tooltip/Tooltip';
import { cn } from '../../../utils/cn';

import type { BarChartProps } from '../Chart/Chart.types';
import type { TooltipItemData } from '../../tooltip/Tooltip/Tooltip.types';

/**
 * BarChart component
 *
 * Displays data as vertical bars with configurable axes, colors, and styling.
 * Matches Figma design with rounded bars, proper spacing, and axis labels.
 */
export const BarChart = ({
  data,
  xAxis,
  yAxis,
  dataKey,
  colors = ['#44ba82'],
  width = 600,
  height = 400,
  barSize,
  gap,
  stacked = false,
  stackedKeys,
  stackedColors,
  showGrid = true,
  showLegend = false,
  darkMode = false,
  className,
}: BarChartProps) => {
  // Helper function to get color for stacked segments
  const getStackedColor = useCallback((key: string, keyIndex: number): string => {
    if (stackedColors) {
      if (Array.isArray(stackedColors)) {
        // If array, use index-based mapping
        return stackedColors[keyIndex % stackedColors.length] || colors[keyIndex % colors.length];
      } else {
        // If object, use key-based mapping
        return stackedColors[key] || colors[keyIndex % colors.length];
      }
    }
    // Fall back to colors array with index cycling
    return Array.isArray(colors) ? colors[keyIndex % colors.length] : colors;
  }, [stackedColors, colors]);
  // Calculate chart dimensions
  const padding = { top: 20, right: 20, bottom: 40, left: 60 };
  const linePadding = 8; // Padding for grid/axis lines from chart edges
  const barAreaPadding = 12; // Padding between y-axis and first bar, and between last bar and right edge
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Calculate dynamic bar width and gap
  const xScale = useMemo(() => {
    const maxBars = data.length;
    const availableWidth = chartWidth - (barAreaPadding * 2); // Reserve space for padding on both sides

    let calculatedBarWidth: number;
    let calculatedGap: number;

    if (barSize !== undefined && gap !== undefined) {
      // User provided both - use them directly
      calculatedBarWidth = barSize;
      calculatedGap = gap;
    } else if (barSize !== undefined) {
      // User provided barSize - calculate gap dynamically to fill space
      calculatedBarWidth = barSize;
      const totalBarsWidth = calculatedBarWidth * maxBars;
      const remainingSpace = availableWidth - totalBarsWidth;
      calculatedGap = maxBars > 1 ? Math.max(0, remainingSpace / (maxBars - 1)) : 0;
    } else if (gap !== undefined) {
      // User provided gap - calculate barWidth dynamically to fill space
      calculatedGap = gap;
      const totalGapsWidth = calculatedGap * (maxBars > 1 ? maxBars - 1 : 0);
      const remainingSpace = availableWidth - totalGapsWidth;
      calculatedBarWidth = maxBars > 0 ? Math.max(4, remainingSpace / maxBars) : 24;
    } else {
      // Both undefined - calculate both dynamically to fill available space
      // Use a reasonable gap (8px) and calculate barWidth to fill the rest
      calculatedGap = 8;
      const totalGapsWidth = calculatedGap * (maxBars > 1 ? maxBars - 1 : 0);
      const remainingSpace = availableWidth - totalGapsWidth;
      calculatedBarWidth = maxBars > 0 ? Math.max(4, remainingSpace / maxBars) : 24;
    }

    // Position bars with padding from y-axis and right edge
    // For dynamic sizing, distribute bars to fill the available space
    const totalBarGroupWidth = (calculatedBarWidth * maxBars) + (calculatedGap * (maxBars > 1 ? maxBars - 1 : 0));
    const startOffset = barAreaPadding + (availableWidth - totalBarGroupWidth) / 2; // Center bars in available space

    return {
      barWidth: calculatedBarWidth,
      gap: calculatedGap,
      // Calculate X position: startOffset + (barWidth + gap) * index
      getX: (index: number) => {
        return startOffset + (calculatedBarWidth + calculatedGap) * index;
      },
    };
  }, [chartWidth, data.length, barSize, gap, barAreaPadding]);

  const yScale = useMemo(() => {
    let values: number[];
    if (stacked && stackedKeys && stackedKeys.length > 0) {
      // For stacked bars, calculate total value for each data point
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

  // Get color for each bar
  const getBarColor = useCallback((index: number) => {
    if (Array.isArray(colors)) {
      return colors[index % colors.length];
    }
    return colors;
  }, [colors]);

  // Default green color from Figma: rgb(0.267, 0.729, 0.510) = #44ba82

  // Generate Y-axis ticks
  const yTicks = useMemo(() => {
    const [min, max] = yScale.domain;
    const tickCount = 5;
    const step = (max - min) / (tickCount - 1);
    return Array.from({ length: tickCount }, (_, i) => min + step * i);
  }, [yScale.domain]);

  // Tooltip state
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

  // Hover state for bar background
  const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(null);

  // Handle bar hover
  const handleBarMouseEnter = useCallback((index: number, barX: number, event: React.MouseEvent<SVGRectElement>) => {
    const svgElement = (event.currentTarget as SVGRectElement).ownerSVGElement;
    if (!svgElement) return;

    const svgRect = svgElement.getBoundingClientRect();
    const x = barX + padding.left + xScale.barWidth / 2;

    setHoveredBarIndex(index);
    setTooltipState({
      visible: true,
      x: event.clientX - svgRect.left,
      y: event.clientY - svgRect.top,
      barIndex: index,
      barX: x,
    });
  }, [xScale.barWidth, padding.left]);

  const handleBarMouseMove = useCallback((event: React.MouseEvent<SVGRectElement>) => {
    if (!tooltipState.visible) return;

    const svgElement = (event.currentTarget as SVGRectElement).ownerSVGElement;
    if (!svgElement) return;

    const svgRect = svgElement.getBoundingClientRect();

    setTooltipState((prev) => ({
      ...prev,
      x: event.clientX - svgRect.left,
      y: event.clientY - svgRect.top,
    }));
  }, [tooltipState.visible]);

  const handleBarMouseLeave = useCallback(() => {
    setHoveredBarIndex(null);
    setTooltipState((prev) => ({ ...prev, visible: false }));
  }, []);

  // Generate tooltip items
  const getTooltipItems = useCallback((index: number): TooltipItemData[] => {
    const item = data[index];
    const dateLabel = String(item[xAxis.dataKey] || '');

    const items: TooltipItemData[] = [
      { type: 'label', label: dateLabel },
      { type: 'divider' },
    ];

    if (stacked && stackedKeys && stackedKeys.length > 0) {
      // For stacked bars, show all stacked values
      stackedKeys.forEach((key, keyIndex) => {
        const value = Number(item[key]) || 0;
        const segmentColor = getStackedColor(key, keyIndex);
        items.push({
          type: 'item',
          label: key,
          caption: String(value),
          indicatorColor: segmentColor,
        });
      });
    } else if (dataKey) {
      // For regular bars, show single value
      const value = Number(item[dataKey]) || 0;
      const barColor = getBarColor(index);
      items.push({
        type: 'item',
        label: 'Subscriptions',
        caption: String(value),
        indicatorColor: barColor,
      });
    }

    return items;
  }, [data, dataKey, xAxis.dataKey, getBarColor, stacked, stackedKeys, getStackedColor]);

  return (
    <Chart width={width} height={height} darkMode={darkMode} className={className}>
      <svg width={width} height={height} className="overflow-hidden">
        {/* Grid lines - with left and right padding */}
        {showGrid &&
          yTicks.map((tick, i) => {
            const y = padding.top + yScale.scale(tick);
            return (
              <line
                key={`grid-${i}`}
                x1={padding.left + linePadding}
                y1={y}
                x2={padding.left + chartWidth - linePadding}
                y2={y}
                stroke={darkMode ? '#27272a' : '#e4e4e7'}
                strokeWidth={1}
                strokeDasharray="4 4"
              />
            );
          })}

        {/* Y-axis line */}
        <line
          x1={padding.left}
          y1={padding.top}
          x2={padding.left}
          y2={padding.top + chartHeight}
          stroke={darkMode ? '#3f3f46' : '#a1a1aa'}
          strokeWidth={1}
        />

        {/* X-axis line - full length across chart area */}
        <line
          x1={padding.left}
          y1={padding.top + chartHeight}
          x2={padding.left + chartWidth}
          y2={padding.top + chartHeight}
          stroke={darkMode ? '#3f3f46' : '#a1a1aa'}
          strokeWidth={1}
        />

        {/* Y-axis labels */}
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
                'text-xs',
                darkMode ? 'text-[#6f6f77]' : 'text-[#6f6f77]'
              )}
              fill="currentColor"
            >
              {formattedValue}
            </text>
          );
        })}

        {/* Hover indicator line */}
        {tooltipState.visible && tooltipState.barIndex !== null && (
          <line
            x1={tooltipState.barX}
            y1={padding.top}
            x2={tooltipState.barX}
            y2={padding.top + chartHeight}
            stroke={darkMode ? '#437dfc' : '#437dfc'}
            strokeWidth={1}
            strokeDasharray="4 4"
            opacity={0.5}
          />
        )}

        {/* Bars */}
        {data.map((item, index) => {
          const barX = xScale.getX(index);
          const x = padding.left + barX;
          const isHovered = hoveredBarIndex === index;

          // Calculate bar segments for stacked or regular bars
          const barSegments: Array<{ value: number; height: number; y: number; color: string }> = [];

          if (stacked && stackedKeys && stackedKeys.length > 0) {
            // Stacked bars: calculate each segment
            const totalValue = stackedKeys.reduce((sum, key) => sum + (Number(item[key]) || 0), 0);
            let cumulativeHeight = 0;

            stackedKeys.forEach((key, keyIndex) => {
              const segmentValue = Number(item[key]) || 0;
              const segmentColor = getStackedColor(key, keyIndex);

              // Calculate segment height as percentage of total
              const segmentHeight = totalValue > 0 ? (segmentValue / totalValue) * chartHeight : 0;
              const segmentY = padding.top + chartHeight - cumulativeHeight - segmentHeight;

              barSegments.push({
                value: segmentValue,
                height: segmentHeight,
                y: segmentY,
                color: segmentColor,
              });

              cumulativeHeight += segmentHeight;
            });
          } else if (dataKey) {
            // Regular bars: single segment
            const value = Number(item[dataKey]) || 0;
            const barHeight = chartHeight - yScale.scale(value);
            const y = padding.top + yScale.scale(value);
            const barColor = getBarColor(index);

            barSegments.push({
              value,
              height: barHeight,
              y,
              color: barColor,
            });
          }

          return (
            <g key={`bar-${index}`}>
              {/* Background on hover */}
              {isHovered && (
                <rect
                  x={x}
                  y={padding.top}
                  width={xScale.barWidth}
                  height={chartHeight}
                  fill={darkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(39, 39, 42, 0.06)'}
                  rx={2}
                  ry={2}
                  pointerEvents="none"
                />
              )}
              {/* Bar segments (stacked or single) */}
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
                  />
                ))}
              </g>
            </g>
          );
        })}

        {/* X-axis labels */}
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
                'text-xs',
                darkMode ? 'text-[#6f6f77]' : 'text-[#6f6f77]'
              )}
              fill="currentColor"
            >
              {label}
            </text>
          );
        })}
      </svg>

      {/* Tooltip */}
      {tooltipState.visible && tooltipState.barIndex !== null && (
        <div
          className="absolute pointer-events-none z-50"
          style={{
            left: `${tooltipState.x + 12}px`,
            top: `${tooltipState.y - 20}px`,
            transform: 'translateY(-50%)',
          }}
        >
          <Tooltip
            variant="advanced"
            items={getTooltipItems(tooltipState.barIndex)}
            darkMode={darkMode}
          />
        </div>
      )}

      {/* Legend */}
      {showLegend && (
        <div className="mt-4 px-4 pb-4 flex flex-wrap justify-center gap-4">
          {stacked && stackedKeys && stackedKeys.length > 0
            ? stackedKeys.map((key, index) => {
              const legendColor = getStackedColor(key, index);
              return (
                <div key={`legend-${key}`} className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-sm"
                    style={{ backgroundColor: legendColor }}
                  />
                  <span className={cn('text-xs', darkMode ? 'text-[#6f6f77]' : 'text-[#6f6f77]')}>
                    {key}
                  </span>
                </div>
              );
            })
            : dataKey && (
              <div className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-sm"
                  style={{ backgroundColor: Array.isArray(colors) ? colors[0] : colors }}
                />
                <span className={cn('text-xs', darkMode ? 'text-[#6f6f77]' : 'text-[#6f6f77]')}>
                  {dataKey}
                </span>
              </div>
            )}
        </div>
      )}
    </Chart>
  );
};

BarChart.displayName = 'BarChart';
