import { forwardRef, useMemo, useState, useCallback } from 'react';

import { Chart } from '../Chart/Chart';
import { AdvancedTooltip } from '../../tooltip/Tooltip';
import { cn } from '../../../utils/cn';

import type { PieChartProps } from '../Chart/Chart.types';
import type { TooltipItemData } from '../../tooltip/Tooltip/Tooltip.types';

/**
 * PieChart 컴포넌트
 *
 * 비율을 나타내는 조각이 있는 파이 차트로 데이터를 표시합니다.
 * Figma 디자인에 맞는 색상과 간격을 적용합니다.
 */
export const PieChart = forwardRef<HTMLDivElement, PieChartProps>(
  (
    {
      data,
      dataKey,
      nameKey,
      colors = ['#437dfc', '#44ba82', '#f59e0b', '#ef4444', '#8b5cf6'],
      width = 400,
      height = 400,
      outerRadius = 150,
      startAngle = 0,
      endAngle = 360,
      paddingAngle = 0,
      showLegend = false,
      isHalf = false,
      darkMode = false,
      className,
      ...props
    },
    ref
  ) => {
  // For half chart, adjust dimensions and angles
  const chartWidth = width;
  // Padding for half chart (space around the chart)
  const halfChartPadding = 20;

  // For half chart, container height should match the visible half circle + top padding only
  const chartHeight = isHalf ? outerRadius + halfChartPadding : height;
  const chartCenterX = chartWidth / 2;
  const chartCenterY = isHalf ? outerRadius + halfChartPadding : chartHeight / 2;

  // For half chart, show top half (-90 to 90 degrees)
  const actualStartAngle = isHalf ? -90 : startAngle;
  const actualEndAngle = isHalf ? 90 : endAngle;

  // Adjust SVG viewBox and height for half chart
  // viewBox shows full circle with padding for proper coordinate system
  // svgHeight matches container height (only top half visible, clipped at bottom)
  const svgViewBox = isHalf ? `0 0 ${width} ${outerRadius * 2 + halfChartPadding * 2}` : undefined;
  const svgHeight = isHalf ? chartHeight : height;

  // Calculate total value
  const total = useMemo(() => {
    return data.reduce((sum, item) => sum + (Number(item[dataKey]) || 0), 0);
  }, [data, dataKey]);

  // Calculate slice angles
  const slices = useMemo(() => {
    const angleRange = actualEndAngle - actualStartAngle;
    return data.reduce<Array<{
      name: string;
      value: number;
      percentage: number;
      startAngle: number;
      endAngle: number;
      color: string;
    }>>((acc, item, index) => {
      const value = Number(item[dataKey]) || 0;
      const percentage = total > 0 ? value / total : 0;
      const angle = angleRange * percentage;
      const prevEndAngle = acc.length > 0 ? acc[acc.length - 1].endAngle + paddingAngle : actualStartAngle;
      const start = prevEndAngle;
      const end = prevEndAngle + angle;

      acc.push({
        name: String(item[nameKey] || ''),
        value,
        percentage,
        startAngle: start,
        endAngle: end,
        color: Array.isArray(colors) ? colors[index % colors.length] : colors,
      });

      return acc;
    }, []);
  }, [data, dataKey, nameKey, total, actualStartAngle, actualEndAngle, paddingAngle, colors]);

  // Convert angle to radians and calculate path
  const getSlicePath = (startAngle: number, endAngle: number) => {
    const startRad = ((startAngle - 90) * Math.PI) / 180;
    const endRad = ((endAngle - 90) * Math.PI) / 180;
    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

    const x1 = chartCenterX + outerRadius * Math.cos(startRad);
    const y1 = chartCenterY + outerRadius * Math.sin(startRad);
    const x2 = chartCenterX + outerRadius * Math.cos(endRad);
    const y2 = chartCenterY + outerRadius * Math.sin(endRad);

    return `M ${chartCenterX} ${chartCenterY} L ${x1} ${y1} A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
  };

  // Tooltip state
  const [tooltipState, setTooltipState] = useState<{
    visible: boolean;
    x: number;
    y: number;
    sliceIndex: number | null;
  }>({
    visible: false,
    x: 0,
    y: 0,
    sliceIndex: null,
  });

  // Handle slice hover
  const handleSliceMouseEnter = useCallback((index: number, event: React.MouseEvent<SVGPathElement>) => {
    const svgElement = (event.currentTarget as SVGPathElement).ownerSVGElement;
    if (!svgElement) return;

    const svgRect = svgElement.getBoundingClientRect();

    setTooltipState({
      visible: true,
      x: event.clientX - svgRect.left,
      y: event.clientY - svgRect.top,
      sliceIndex: index,
    });
  }, []);

  const handleSliceMouseMove = useCallback((event: React.MouseEvent<SVGPathElement>) => {
    if (!tooltipState.visible) return;

    const svgElement = (event.currentTarget as SVGPathElement).ownerSVGElement;
    if (!svgElement) return;

    const svgRect = svgElement.getBoundingClientRect();

    setTooltipState((prev) => ({
      ...prev,
      x: event.clientX - svgRect.left,
      y: event.clientY - svgRect.top,
    }));
  }, [tooltipState.visible]);

  const handleSliceMouseLeave = useCallback(() => {
    setTooltipState((prev) => ({ ...prev, visible: false }));
  }, []);

  // Generate tooltip items
  const getTooltipItems = useCallback((index: number): TooltipItemData[] => {
    const slice = slices[index];
    if (!slice) return [];

    return [
      { type: 'label', label: slice.name },
      { type: 'divider' },
      { type: 'item', label: 'Value', caption: String(slice.value), indicatorColor: slice.color },
      { type: 'item', label: 'Percentage', caption: `${(slice.percentage * 100).toFixed(1)}%`, indicatorColor: slice.color },
    ];
  }, [slices]);

  return (
    <Chart ref={ref} width={chartWidth} height={chartHeight} darkMode={darkMode} className={className} {...props}>
      <svg
        width={width}
        height={svgHeight}
        viewBox={svgViewBox}
        style={isHalf ? { overflow: 'hidden', position: 'absolute', top: 0, left: 0 } : undefined}
        className={isHalf ? undefined : undefined}
      >
        {slices.map((slice, index) => (
          <path
            key={`slice-${index}`}
            d={getSlicePath(slice.startAngle, slice.endAngle)}
            fill={slice.color}
            stroke="white"
            strokeWidth={2}
            onMouseEnter={(e) => handleSliceMouseEnter(index, e)}
            onMouseMove={handleSliceMouseMove}
            onMouseLeave={handleSliceMouseLeave}
            style={{ cursor: 'pointer' }}
          />
        ))}
      </svg>

      {/* Tooltip */}
      {tooltipState.visible && tooltipState.sliceIndex !== null && (
        <div
          className="absolute pointer-events-none z-50"
          style={{
            left: `${tooltipState.x + 12}px`,
            top: `${tooltipState.y - 20}px`,
            transform: 'translateY(-50%)',
          }}
        >
          <AdvancedTooltip
            items={getTooltipItems(tooltipState.sliceIndex)}
          />
        </div>
      )}
      {showLegend && (
        <div className="mt-4 px-4 pb-4 flex flex-wrap justify-center gap-4">
          {slices.map((slice, index) => (
            <div key={`legend-${index}`} className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: slice.color }}
              />
              <span className={cn('text-xs', 'text-subtle')}>
                {slice.name} ({slice.percentage.toFixed(1)}%)
              </span>
            </div>
          ))}
        </div>
      )}
    </Chart>
  );
  }
);

PieChart.displayName = 'PieChart';
