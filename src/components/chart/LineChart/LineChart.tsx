import { forwardRef, useMemo, useState, useCallback } from 'react';

import { Chart } from '../Chart/Chart';
import { AdvancedTooltip } from '../../tooltip/Tooltip';
import { cn } from '../../../utils/cn';

import type { LineChartProps } from '../Chart/Chart.types';
import type { TooltipItemData } from '../../tooltip/Tooltip/Tooltip.types';

/**
 * LineChart component
 *
 * Displays data as a line with optional area fill and data points.
 * Matches Figma design with smooth lines and proper axis styling.
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
      colors = ['#437dfc'],
      width = 600,
      height = 400,
      showArea = false,
      showPoints = true,
      strokeWidth = 2,
      showGrid = true,
      showLegend = false,
      darkMode = false,
      className,
      ...props
    },
    ref
  ) => {
  // Determine if we're using multiple lines
  const isMultiLine = dataKeys && dataKeys.length > 0;
  const activeKeys = isMultiLine ? dataKeys : (dataKey ? [dataKey] : []);

  // Helper function to get color for lines
  const getLineColor = useCallback((key: string, keyIndex: number): string => {
    if (lineColors) {
      if (Array.isArray(lineColors)) {
        // If array, use index-based mapping
        return lineColors[keyIndex % lineColors.length] || colors[keyIndex % colors.length];
      } else {
        // If object, use key-based mapping
        return lineColors[key] || colors[keyIndex % colors.length];
      }
    }
    // Fall back to colors array with index cycling
    return Array.isArray(colors) ? colors[keyIndex % colors.length] : colors;
  }, [lineColors, colors]);
  // Calculate chart dimensions
  const padding = { top: 20, right: 20, bottom: 40, left: 60 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Calculate scales
  const xScale = useMemo(() => {
    const step = chartWidth / (data.length - 1 || 1);
    return {
      step,
      scale: (index: number) => padding.left + index * step,
    };
  }, [chartWidth, data.length, padding.left]);

  const yScale = useMemo(() => {
    let values: number[];
    if (isMultiLine && activeKeys.length > 0) {
      // For multiple lines, get max value across all keys
      values = data.flatMap((d) => activeKeys.map((key) => Number(d[key]) || 0));
    } else if (dataKey) {
      values = data.map((d) => Number(d[dataKey]) || 0);
    } else {
      values = [0];
    }
    const maxValue = Math.max(...values, 0);
    const minValue = Math.min(...values, 0);
    // Handle 'auto' domain or use provided domain, fallback to calculated
    const domain: [number, number] =
      yAxis.domain && yAxis.domain !== 'auto'
        ? yAxis.domain
        : [minValue, maxValue * 1.1];
    return {
      domain,
      scale: (value: number) => {
        const [min, max] = domain;
        return chartHeight - ((value - min) / (max - min)) * chartHeight;
      },
    };
  }, [chartHeight, data, dataKey, yAxis.domain, isMultiLine, activeKeys]);

  // Generate paths for multiple lines
  const linePaths = useMemo(() => {
    return activeKeys.map((key) => {
      const points = data.map((item, index) => {
        const value = Number(item[key]) || 0;
        const x = xScale.scale(index);
        const y = padding.top + yScale.scale(value);
        return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
      });
      return points.join(' ');
    });
  }, [data, activeKeys, xScale, yScale, padding.top]);

  // Generate area paths for multiple lines
  const areaPaths = useMemo(() => {
    if (!showArea) return activeKeys.map(() => '');
    return activeKeys.map((key) => {
      const points = data.map((item, index) => {
        const value = Number(item[key]) || 0;
        const x = xScale.scale(index);
        const y = padding.top + yScale.scale(value);
        return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
      });
      const bottomY = padding.top + chartHeight;
      const firstX = xScale.scale(0);
      const lastX = xScale.scale(data.length - 1);
      return `${points.join(' ')} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`;
    });
  }, [data, activeKeys, xScale, yScale, padding.top, chartHeight, showArea]);

  // Legacy single line support (for backward compatibility)
  const linePath = useMemo(() => {
    if (isMultiLine) return '';
    if (!dataKey) return '';
    const points = data.map((item, index) => {
      const value = Number(item[dataKey]) || 0;
      const x = xScale.scale(index);
      const y = padding.top + yScale.scale(value);
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    });
    return points.join(' ');
  }, [data, dataKey, xScale, yScale, padding.top, isMultiLine]);

  const areaPath = useMemo(() => {
    if (!showArea || isMultiLine) return '';
    if (!dataKey) return '';
    const points = data.map((item, index) => {
      const value = Number(item[dataKey]) || 0;
      const x = xScale.scale(index);
      const y = padding.top + yScale.scale(value);
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    });
    const bottomY = padding.top + chartHeight;
    const firstX = xScale.scale(0);
    const lastX = xScale.scale(data.length - 1);
    return `${points.join(' ')} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`;
  }, [data, dataKey, xScale, yScale, padding.top, chartHeight, showArea, isMultiLine]);

  // Get color for single line (legacy)
  const color = Array.isArray(colors) ? colors[0] : colors;

  // Generate Y-axis ticks
  const yTicks = useMemo(() => {
    const [min, max] = yScale.domain as [number, number];
    const tickCount = 5;
    const step = (max - min) / (tickCount - 1);
    return Array.from({ length: tickCount }, (_, i) => min + step * i);
  }, [yScale.domain]);

  // Tooltip state
  const [tooltipState, setTooltipState] = useState<{
    visible: boolean;
    x: number;
    y: number;
    pointIndex: number | null;
    pointX: number;
    lineIndex?: number;
  }>({
    visible: false,
    x: 0,
    y: 0,
    pointIndex: null,
    pointX: 0,
    lineIndex: undefined,
  });

  // Handle point hover
  const handlePointMouseEnter = useCallback((index: number, keyIndex: number, event: React.MouseEvent<SVGCircleElement>) => {
    const svgElement = (event.currentTarget as SVGCircleElement).ownerSVGElement;
    if (!svgElement) return;

    const svgRect = svgElement.getBoundingClientRect();
    const x = xScale.scale(index);

    setTooltipState({
      visible: true,
      x: event.clientX - svgRect.left,
      y: event.clientY - svgRect.top,
      pointIndex: index,
      pointX: x,
      lineIndex: keyIndex,
    });
  }, [xScale]);

  const handlePointMouseMove = useCallback((event: React.MouseEvent<SVGCircleElement>) => {
    if (!tooltipState.visible) return;

    const svgElement = (event.currentTarget as SVGCircleElement).ownerSVGElement;
    if (!svgElement) return;

    const svgRect = svgElement.getBoundingClientRect();

    setTooltipState((prev) => ({
      ...prev,
      x: event.clientX - svgRect.left,
      y: event.clientY - svgRect.top,
    }));
  }, [tooltipState.visible]);

  const handlePointMouseLeave = useCallback(() => {
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

    if (isMultiLine && activeKeys.length > 0) {
      // For multiple lines, show all values
      activeKeys.forEach((key, keyIndex) => {
        const value = Number(item[key]) || 0;
        const lineColor = getLineColor(key, keyIndex);
        items.push({
          type: 'item',
          label: key,
          caption: String(value),
          indicatorColor: lineColor,
        });
      });
    } else if (dataKey) {
      // For single line, show single value
      const value = Number(item[dataKey]) || 0;
      items.push({
        type: 'item',
        label: 'Revenue',
        caption: String(value),
        indicatorColor: color,
      });
    }

    return items;
  }, [data, dataKey, xAxis.dataKey, color, isMultiLine, activeKeys, getLineColor]);

  return (
    <Chart ref={ref} width={width} height={height} darkMode={darkMode} className={className} {...props}>
      <svg width={width} height={height} className="overflow-visible">
        {/* Grid lines */}
        {showGrid &&
          yTicks.map((tick, i) => {
            const y = padding.top + yScale.scale(tick);
            return (
              <line
                key={`grid-${i}`}
                x1={padding.left}
                y1={y}
                x2={padding.left + chartWidth}
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

        {/* X-axis line */}
        <line
          x1={padding.left}
          y1={padding.top + chartHeight}
          x2={padding.left + chartWidth}
          y2={padding.top + chartHeight}
          stroke={darkMode ? '#3f3f46' : '#a1a1aa'}
          strokeWidth={1}
        />

        {/* Hover indicator line */}
        {tooltipState.visible && tooltipState.pointIndex !== null && (
          <line
            x1={tooltipState.pointX}
            y1={padding.top}
            x2={tooltipState.pointX}
            y2={padding.top + chartHeight}
            stroke={darkMode ? '#437dfc' : '#437dfc'}
            strokeWidth={1}
            strokeDasharray="4 4"
            opacity={0.5}
          />
        )}

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
                'text-subtle'
              )}
              fill="currentColor"
            >
              {formattedValue}
            </text>
          );
        })}

        {/* Area fills for multiple lines */}
        {showArea && isMultiLine &&
          areaPaths.map((path, keyIndex) => {
            const key = activeKeys[keyIndex];
            const lineColor = getLineColor(key, keyIndex);
            return (
              <path
                key={`area-${key}`}
                d={path}
                fill={lineColor}
                fillOpacity={0.1}
              />
            );
          })}

        {/* Area fill for single line (legacy) */}
        {showArea && !isMultiLine && areaPath && (
          <path
            d={areaPath}
            fill={color}
            fillOpacity={0.1}
          />
        )}

        {/* Lines for multiple series */}
        {isMultiLine &&
          linePaths.map((path, keyIndex) => {
            const key = activeKeys[keyIndex];
            const lineColor = getLineColor(key, keyIndex);
            return (
              <path
                key={`line-${key}`}
                d={path}
                fill="none"
                stroke={lineColor}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            );
          })}

        {/* Single line (legacy) */}
        {!isMultiLine && linePath && (
          <path
            d={linePath}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}

        {/* Data points for multiple lines */}
        {showPoints && isMultiLine &&
          activeKeys.map((key, keyIndex) => {
            const lineColor = getLineColor(key, keyIndex);
            return data.map((item, index) => {
              const value = Number(item[key]) || 0;
              const x = xScale.scale(index);
              const y = padding.top + yScale.scale(value);
              return (
                <circle
                  key={`point-${key}-${index}`}
                  cx={x}
                  cy={y}
                  r={4}
                  fill={lineColor}
                  stroke="white"
                  strokeWidth={2}
                  onMouseEnter={(e) => handlePointMouseEnter(index, keyIndex, e)}
                  onMouseMove={handlePointMouseMove}
                  onMouseLeave={handlePointMouseLeave}
                  style={{ cursor: 'pointer' }}
                />
              );
            });
          })}

        {/* Data points for single line (legacy) */}
        {showPoints && !isMultiLine && dataKey &&
          data.map((item, index) => {
            const value = Number(item[dataKey]) || 0;
            const x = xScale.scale(index);
            const y = padding.top + yScale.scale(value);
            return (
              <circle
                key={`point-${index}`}
                cx={x}
                cy={y}
                r={4}
                fill={color}
                stroke="white"
                strokeWidth={2}
                onMouseEnter={(e) => handlePointMouseEnter(index, 0, e)}
                onMouseMove={handlePointMouseMove}
                onMouseLeave={handlePointMouseLeave}
                style={{ cursor: 'pointer' }}
              />
            );
          })}

        {/* X-axis labels */}
        {data.map((item, index) => {
          const x = xScale.scale(index);
          const label = String(item[xAxis.dataKey] || '');
          return (
            <text
              key={`x-label-${index}`}
              x={x}
              y={height - padding.bottom + 20}
              textAnchor="middle"
              className={cn(
                'text-xs',
                'text-subtle'
              )}
              fill="currentColor"
            >
              {label}
            </text>
          );
        })}
      </svg>

      {/* Tooltip */}
      {tooltipState.visible && tooltipState.pointIndex !== null && (
        <div
          className="absolute pointer-events-none z-50"
          style={{
            left: `${tooltipState.x + 12}px`,
            top: `${tooltipState.y - 20}px`,
            transform: 'translateY(-50%)',
          }}
        >
          <AdvancedTooltip
            items={getTooltipItems(tooltipState.pointIndex)}
          />
        </div>
      )}

      {/* Legend */}
      {showLegend && activeKeys.length > 0 && (
        <div className="mt-4 px-4 pb-4 flex flex-wrap justify-center gap-4">
          {activeKeys.map((key, index) => {
            const lineColor = getLineColor(key, index);
            return (
              <div key={`legend-${key}`} className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-sm"
                  style={{ backgroundColor: lineColor }}
                />
                <span className={cn('text-xs', 'text-subtle')}>
                  {key}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </Chart>
  );
  }
);

LineChart.displayName = 'LineChart';
