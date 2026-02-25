import { forwardRef, useMemo, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';

import { Chart } from '../Chart/Chart';
import { AdvancedTooltip } from '../../tooltip/Tooltip';
import { cn } from '../../../utils/cn';

import type { LineChartProps } from '../Chart/Chart.types';
import { DEFAULT_CHART_COLORS } from '../Chart/Chart.types';
import type { TooltipItemData } from '../../tooltip/Tooltip/Tooltip.types';

/**
 * LineChart 컴포넌트
 *
 * 선택적 영역 채우기와 데이터 포인트가 있는 라인으로 데이터를 표시합니다.
 * Figma 디자인에 맞는 부드러운 선과 축 스타일을 적용합니다.
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
      showXGrid = true,
      showYGrid = false,
      showLegend = false,
      className,
      ariaLabel,
      onDataPointClick,
      isLoading,
      responsive,
      ...props
    },
    ref
  ) => {
  if (process.env.NODE_ENV !== 'production') {
    if (dataKey && dataKeys && dataKeys.length > 0) {
      console.warn('[LineChart] dataKey와 dataKeys가 동시에 제공되었습니다. dataKeys가 우선 적용됩니다.');
    }
  }

  const isMultiLine = dataKeys && dataKeys.length > 0;
  const activeKeys = useMemo(() => {
    return isMultiLine ? dataKeys : (dataKey ? [dataKey] : []);
  }, [isMultiLine, dataKeys, dataKey]);

  const getColor = useCallback((key: string, keyIndex: number): string => {
    if (config && config[key]) {
      return config[key].color;
    }
    if (lineColors) {
      if (Array.isArray(lineColors)) {
        return lineColors[keyIndex % lineColors.length] || DEFAULT_CHART_COLORS[keyIndex % DEFAULT_CHART_COLORS.length];
      }
      return lineColors[key] || DEFAULT_CHART_COLORS[keyIndex % DEFAULT_CHART_COLORS.length];
    }
    return DEFAULT_CHART_COLORS[keyIndex % DEFAULT_CHART_COLORS.length];
  }, [config, lineColors]);

  const getLabel = useCallback((key: string): string => {
    if (config && config[key]) {
      return config[key].label;
    }
    return key;
  }, [config]);

  const padding = { top: 20, right: 20, bottom: 40, left: 60 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

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
      values = data.flatMap((d) => activeKeys.map((key) => Number(d[key]) || 0));
    } else if (dataKey) {
      values = data.map((d) => Number(d[dataKey]) || 0);
    } else {
      values = [0];
    }
    const rawMax = values.reduce((max, v) => v > max ? v : max, Number.NEGATIVE_INFINITY);
    const rawMin = values.reduce((min, v) => v < min ? v : min, Number.POSITIVE_INFINITY);
    const maxValue = Number.isFinite(rawMax) ? rawMax : 0;
    const minValue = Number.isFinite(rawMin) ? rawMin : 0;
    const domain: [number, number] =
      yAxis.domain && yAxis.domain !== 'auto'
        ? yAxis.domain
        : [minValue, maxValue > 0 ? maxValue * 1.1 : 1];
    return {
      domain,
      scale: (value: number) => {
        const [min, max] = domain;
        return chartHeight - ((value - min) / (max - min)) * chartHeight;
      },
    };
  }, [chartHeight, data, dataKey, yAxis.domain, isMultiLine, activeKeys]);

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

  const color = getColor(dataKey || '', 0);

  const yTicks = useMemo(() => {
    const [min, max] = yScale.domain as [number, number];
    const tickCount = 5;
    const step = (max - min) / (tickCount - 1);
    return Array.from({ length: tickCount }, (_, i) => min + step * i);
  }, [yScale.domain]);

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

  const handlePointMouseEnter = useCallback((index: number, keyIndex: number, event: React.MouseEvent<SVGCircleElement>) => {
    const indicatorX = xScale.scale(index);

    setTooltipState({
      visible: true,
      x: event.clientX,
      y: event.clientY,
      pointIndex: index,
      pointX: indicatorX,
      lineIndex: keyIndex,
    });
  }, [xScale]);

  const handlePointMouseMove = useCallback((event: React.MouseEvent<SVGCircleElement>) => {
    if (!tooltipState.visible) return;

    setTooltipState((prev) => ({
      ...prev,
      x: event.clientX,
      y: event.clientY,
    }));
  }, [tooltipState.visible]);

  const handlePointMouseLeave = useCallback(() => {
    setTooltipState((prev) => ({ ...prev, visible: false }));
  }, []);

  const handleChartMouseMove = useCallback((event: React.MouseEvent<SVGRectElement>) => {
    const svgElement = event.currentTarget.ownerSVGElement;
    if (!svgElement) return;

    const svgRect = svgElement.getBoundingClientRect();
    const mouseX = event.clientX - svgRect.left - padding.left;

    const index = Math.round(mouseX / xScale.step);
    const clampedIndex = Math.max(0, Math.min(data.length - 1, index));
    const indicatorX = xScale.scale(clampedIndex);

    setTooltipState({
      visible: true,
      x: event.clientX,
      y: event.clientY,
      pointIndex: clampedIndex,
      pointX: indicatorX,
      lineIndex: 0,
    });
  }, [xScale, data.length, padding.left]);

  const handleChartMouseLeave = useCallback(() => {
    setTooltipState((prev) => ({ ...prev, visible: false }));
  }, []);

  const getTooltipItems = useCallback((index: number): TooltipItemData[] => {
    const item = data[index];
    const rawLabel = item[xAxis.dataKey] || item['date'] || item['label'] || item['name'];
    const dateLabel = rawLabel ? String(rawLabel) : `#${index + 1}`;

    const items: TooltipItemData[] = [
      { type: 'label', label: dateLabel },
      { type: 'divider' },
    ];

    if (isMultiLine && activeKeys.length > 0) {
      activeKeys.forEach((key, keyIndex) => {
        const value = Number(item[key]) || 0;
        const lineColor = getColor(key, keyIndex);
        items.push({
          type: 'item',
          label: getLabel(key),
          caption: String(value),
          indicatorColor: lineColor,
        });
      });
    } else if (dataKey) {
      const value = Number(item[dataKey]) || 0;
      items.push({
        type: 'item',
        label: getLabel(dataKey),
        caption: String(value),
        indicatorColor: color,
      });
    }

    return items;
  }, [data, dataKey, xAxis.dataKey, color, isMultiLine, activeKeys, getColor, getLabel]);

  const chartAriaLabel = ariaLabel || `Line chart showing ${activeKeys.join(', ') || 'data'}`;

  if (!data || data.length === 0) {
    return (
      <Chart ref={ref} width={width} height={height} className={className} ariaLabel={chartAriaLabel} isLoading={isLoading} responsive={responsive} {...props}>
        <svg width={width} height={height} aria-hidden="true">
        </svg>
      </Chart>
    );
  }

  return (
    <Chart ref={ref} width={width} height={height} className={className} ariaLabel={chartAriaLabel} isLoading={isLoading} responsive={responsive} {...props}>
      <svg
        width={width}
        height={height}
        className="overflow-visible"
      >
        {showXGrid &&
          yTicks.map((tick, i) => {
            const y = padding.top + yScale.scale(tick);
            return (
              <line
                key={`grid-x-${i}`}
                x1={padding.left}
                y1={y}
                x2={padding.left + chartWidth}
                y2={y}
                stroke="var(--chart-grid-line)"
                strokeWidth={1}
              />
            );
          })}

        {showYGrid &&
          data.slice(0, -1).map((_, index) => {
            const x1 = xScale.scale(index);
            const x2 = xScale.scale(index + 1);
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

        {tooltipState.visible && tooltipState.pointIndex !== null && (
          <line
            x1={tooltipState.pointX}
            y1={padding.top}
            x2={tooltipState.pointX}
            y2={padding.top + chartHeight}
            stroke="var(--chart-indicator)"
            strokeWidth={1}
            strokeDasharray="4 4"
            opacity={0.5}
          />
        )}

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

        {showArea && isMultiLine &&
          areaPaths.map((path, keyIndex) => {
            const key = activeKeys[keyIndex];
            const lineColor = getColor(key, keyIndex);
            return (
              <path
                key={`area-${key}`}
                d={path}
                fill={lineColor}
                fillOpacity={0.1}
              />
            );
          })}

        {showArea && !isMultiLine && areaPath && (
          <path
            d={areaPath}
            fill={color}
            fillOpacity={0.1}
          />
        )}

        <g role="list" aria-label="Line chart data">
          {isMultiLine &&
            linePaths.map((path, keyIndex) => {
              const key = activeKeys[keyIndex];
              const lineColor = getColor(key, keyIndex);
              return (
                <path
                  key={`line-${key}`}
                  d={path}
                  fill="none"
                  stroke={lineColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  role="listitem"
                  aria-label={`Line for ${getLabel(key)}`}
                />
              );
            })}

          {!isMultiLine && linePath && (
            <path
              d={linePath}
              fill="none"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
              role="listitem"
              aria-label={`Line for ${getLabel(dataKey || '')}`}
            />
          )}
        </g>

        {showPoints && isMultiLine &&
          activeKeys.map((key, keyIndex) => {
            const lineColor = getColor(key, keyIndex);
            return data.map((item, index) => {
              const value = Number(item[key]) || 0;
              const x = xScale.scale(index);
              const y = padding.top + yScale.scale(value);
              const xLabel = String(item[xAxis.dataKey] || '');
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
                  onClick={() => onDataPointClick?.(data[index], index)}
                  style={{ cursor: 'pointer' }}
                  tabIndex={0}
                  role="graphics-symbol"
                  aria-label={`${xLabel}: ${getLabel(key)} ${value}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onDataPointClick?.(data[index], index);
                      const circle = e.target as SVGCircleElement;
                      const rect = circle.getBoundingClientRect();
                      setTooltipState({
                        visible: true,
                        x: rect.left + rect.width / 2,
                        y: rect.top,
                        pointIndex: index,
                        pointX: xScale.scale(index),
                        lineIndex: keyIndex,
                      });
                    }
                  }}
                />
              );
            });
          })}

        {showPoints && !isMultiLine && dataKey &&
          data.map((item, index) => {
            const value = Number(item[dataKey]) || 0;
            const x = xScale.scale(index);
            const y = padding.top + yScale.scale(value);
            const xLabel = String(item[xAxis.dataKey] || '');
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
                onClick={() => onDataPointClick?.(data[index], index)}
                style={{ cursor: 'pointer' }}
                tabIndex={0}
                role="graphics-symbol"
                aria-label={`${xLabel}: ${getLabel(dataKey)} ${value}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onDataPointClick?.(data[index], index);
                    const circle = e.target as SVGCircleElement;
                    const rect = circle.getBoundingClientRect();
                    setTooltipState({
                      visible: true,
                      x: rect.left + rect.width / 2,
                      y: rect.top,
                      pointIndex: index,
                      pointX: xScale.scale(index),
                      lineIndex: 0,
                    });
                  }
                }}
              />
            );
          })}

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
                'size-xs',
                'text-muted'
              )}
              fill="currentColor"
            >
              {label}
            </text>
          );
        })}

        {/* Invisible overlay for hover detection - must be last for z-index */}
        <rect
          x={padding.left}
          y={padding.top}
          width={chartWidth}
          height={chartHeight}
          fill="transparent"
          onMouseMove={handleChartMouseMove}
          onMouseLeave={handleChartMouseLeave}
          style={{ cursor: 'crosshair' }}
        />
      </svg>

      {tooltipState.visible && tooltipState.pointIndex !== null && createPortal(
        <div
          className="fixed pointer-events-none z-50"
          style={{
            left: `${tooltipState.x + 12}px`,
            top: `${tooltipState.y}px`,
            transform: 'translateY(-50%)',
          }}
        >
          <AdvancedTooltip
            items={getTooltipItems(tooltipState.pointIndex)}
          />
        </div>,
        document.body
      )}

      {showLegend && activeKeys.length > 0 && (
        <div className="margin-t-16 padding-x-16 padding-b-16 flex flex-wrap justify-center ds-gap-4" role="list" aria-label="Chart legend">
          {activeKeys.map((key, index) => {
            const lineColor = getColor(key, index);
            return (
              <div key={`legend-${key}`} className="flex items-center ds-gap-2" role="listitem">
                <div
                  className="[width:12px] [height:12px] rounded-sm"
                  style={{ backgroundColor: lineColor }}
                  aria-hidden="true"
                />
                <span className={cn('size-xs', 'text-muted')}>
                  {getLabel(key)}
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
