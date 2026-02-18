import { forwardRef, useMemo, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';

import { Chart } from '../Chart/Chart';
import { AdvancedTooltip } from '../../tooltip/Tooltip';
import { cn } from '../../../utils/cn';

import type { PieChartProps } from '../Chart/Chart.types';
import { DEFAULT_CHART_COLORS } from '../Chart/Chart.types';
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
      config,
      width = 400,
      height = 400,
      outerRadius = 150,
      startAngle = 0,
      endAngle = 360,
      paddingAngle = 0,
      showLegend = false,
      isHalf = false,
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
    return DEFAULT_CHART_COLORS[index % DEFAULT_CHART_COLORS.length];
  }, [config]);

  const getLabel = useCallback((key: string): string => {
    if (config && config[key]) {
      return config[key].label;
    }
    return key;
  }, [config]);

  const chartWidth = width;
  const halfChartPadding = 10;

  const svgHeight = isHalf ? outerRadius + halfChartPadding : height;
  const chartCenterX = chartWidth / 2;
  const chartCenterY = isHalf ? outerRadius : height / 2;

  const actualStartAngle = isHalf ? -90 : startAngle;
  const actualEndAngle = isHalf ? 90 : endAngle;

  const total = useMemo(() => {
    return data.reduce((sum, item) => sum + (Number(item[dataKey]) || 0), 0);
  }, [data, dataKey]);

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

      const itemName = String(item[nameKey] || '');

      acc.push({
        name: itemName,
        value,
        percentage,
        startAngle: start,
        endAngle: end,
        color: getColor(itemName, index),
      });

      return acc;
    }, []);
  }, [data, dataKey, nameKey, total, actualStartAngle, actualEndAngle, paddingAngle, getColor]);

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

  const handleSliceMouseEnter = useCallback((index: number, event: React.MouseEvent<SVGPathElement>) => {
    setTooltipState({
      visible: true,
      x: event.clientX,
      y: event.clientY,
      sliceIndex: index,
    });
  }, []);

  const handleSliceMouseMove = useCallback((event: React.MouseEvent<SVGPathElement>) => {
    if (!tooltipState.visible) return;

    setTooltipState((prev) => ({
      ...prev,
      x: event.clientX,
      y: event.clientY,
    }));
  }, [tooltipState.visible]);

  const handleSliceMouseLeave = useCallback(() => {
    setTooltipState((prev) => ({ ...prev, visible: false }));
  }, []);

  const getTooltipItems = useCallback((index: number): TooltipItemData[] => {
    const slice = slices[index];
    if (!slice) return [];

    return [
      { type: 'label', label: getLabel(slice.name) },
      { type: 'divider' },
      { type: 'item', label: 'Value', caption: String(slice.value), indicatorColor: slice.color },
      { type: 'item', label: 'Percentage', caption: `${(slice.percentage * 100).toFixed(1)}%`, indicatorColor: slice.color },
    ];
  }, [slices, getLabel]);

  const chartAriaLabel = ariaLabel || `Pie chart showing ${slices.map(s => getLabel(s.name)).join(', ')}`;

  return (
    <Chart ref={ref} width={chartWidth} height={isHalf ? undefined : height} className={className} ariaLabel={chartAriaLabel} {...props}>
      <div className="relative" style={{ height: svgHeight }}>
        <svg
          width={width}
          height={svgHeight}
          className="overflow-visible"
          role="graphics-document"
          aria-label={chartAriaLabel}
        >
          <title>{chartAriaLabel}</title>
          <g role="list" aria-label="Pie chart slices">
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
                tabIndex={0}
                role="listitem"
                aria-label={`${getLabel(slice.name)}: ${slice.value} (${(slice.percentage * 100).toFixed(1)}%)`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                  }
                }}
              />
            ))}
          </g>
        </svg>
      </div>

      {tooltipState.visible && tooltipState.sliceIndex !== null && createPortal(
        <div
          className="fixed pointer-events-none z-50"
          style={{
            left: `${tooltipState.x + 12}px`,
            top: `${tooltipState.y}px`,
            transform: 'translateY(-50%)',
          }}
        >
          <AdvancedTooltip
            items={getTooltipItems(tooltipState.sliceIndex)}
          />
        </div>,
        document.body
      )}
      {showLegend && (
        <div className="margin-t-16 padding-x-16 padding-b-16 flex flex-wrap justify-center ds-gap-4" role="list" aria-label="Chart legend">
          {slices.map((slice, index) => (
            <div key={`legend-${index}`} className="flex items-center ds-gap-2" role="listitem">
              <div
                className="[width:12px] [height:12px] rounded-full"
                style={{ backgroundColor: slice.color }}
                aria-hidden="true"
              />
              <span className={cn('size-xs', 'text-muted')}>
                {getLabel(slice.name)} ({(slice.percentage * 100).toFixed(1)}%)
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
