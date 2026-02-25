import { forwardRef, useMemo, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';

import { Chart } from '../Chart/Chart';
import { AdvancedTooltip } from '../../tooltip/Tooltip';
import { cn } from '../../../utils/cn';

import type { DonutChartProps } from '../Chart/Chart.types';
import { DEFAULT_CHART_COLORS } from '../Chart/Chart.types';
import type { TooltipItemData } from '../../tooltip/Tooltip/Tooltip.types';

/**
 * DonutChart 컴포넌트
 *
 * 데이터를 도넛 차트(중앙에 구멍이 있는 파이 차트)로 표시합니다.
 * Figma 디자인에 맞는 색상과 간격을 적용합니다.
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
      isHalf = false,
      className,
      ariaLabel,
      onDataPointClick,
      isLoading,
      responsive,
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
    const result: Array<{
      name: string;
      value: number;
      percentage: number;
      startAngle: number;
      endAngle: number;
      color: string;
    }> = [];
    let currentAngle = actualStartAngle;

    for (let index = 0; index < data.length; index++) {
      const item = data[index];
      const value = Number(item[dataKey]) || 0;
      const percentage = total > 0 ? value / total : 0;
      const angle = angleRange * percentage;
      const start = currentAngle;
      const end = currentAngle + angle;

      const itemName = String(item[nameKey] || '');

      result.push({
        name: itemName,
        value,
        percentage,
        startAngle: start,
        endAngle: end,
        color: getColor(itemName, index),
      });

      currentAngle = currentAngle + angle + paddingAngle;
    }

    return result;
  }, [data, dataKey, nameKey, total, actualStartAngle, actualEndAngle, paddingAngle, getColor]);

  const getDonutSlicePath = (startAngle: number, endAngle: number) => {
    const startRad = ((startAngle - 90) * Math.PI) / 180;
    const endRad = ((endAngle - 90) * Math.PI) / 180;
    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

    const x1Outer = chartCenterX + outerRadius * Math.cos(startRad);
    const y1Outer = chartCenterY + outerRadius * Math.sin(startRad);
    const x2Outer = chartCenterX + outerRadius * Math.cos(endRad);
    const y2Outer = chartCenterY + outerRadius * Math.sin(endRad);

    const x1Inner = chartCenterX + innerRadius * Math.cos(startRad);
    const y1Inner = chartCenterY + innerRadius * Math.sin(startRad);
    const x2Inner = chartCenterX + innerRadius * Math.cos(endRad);
    const y2Inner = chartCenterY + innerRadius * Math.sin(endRad);

    return `M ${x1Outer} ${y1Outer} A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x2Outer} ${y2Outer} L ${x2Inner} ${y2Inner} A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x1Inner} ${y1Inner} Z`;
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

  const chartAriaLabel = ariaLabel || `Donut chart showing ${slices.map(s => getLabel(s.name)).join(', ')}`;

  return (
    <Chart ref={ref} width={chartWidth} height={isHalf ? undefined : height} className={className} ariaLabel={chartAriaLabel} isLoading={isLoading} responsive={responsive} {...props}>
      <div className="relative" style={{ height: svgHeight }}>
        <svg
          width={width}
          height={svgHeight}
          className="overflow-visible"
        >
        <g role="list" aria-label="Donut chart slices">
          {slices.map((slice, index) => (
            <path
              key={`slice-${index}`}
              d={getDonutSlicePath(slice.startAngle, slice.endAngle)}
              fill={slice.color}
              stroke="white"
              strokeWidth={2}
              onMouseEnter={(e) => handleSliceMouseEnter(index, e)}
              onMouseMove={handleSliceMouseMove}
              onMouseLeave={handleSliceMouseLeave}
              onClick={() => onDataPointClick?.(data[index], index)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onDataPointClick?.(data[index], index);
                  const path = e.target as SVGPathElement;
                  const rect = path.getBoundingClientRect();
                  setTooltipState({
                    visible: true,
                    x: rect.left + rect.width / 2,
                    y: rect.top + rect.height / 2,
                    sliceIndex: index,
                  });
                }
              }}
              style={{ cursor: 'pointer' }}
              tabIndex={0}
              role="listitem"
              aria-label={`${getLabel(slice.name)}: ${slice.value} (${(slice.percentage * 100).toFixed(1)}%)`}
            />
          ))}
        </g>
      </svg>

        {(centerLabel || centerValue) && (
          <div
            className="absolute flex flex-col items-center justify-center ds-gap-1"
            style={{
              left: '50%',
              top: isHalf ? `${outerRadius - (innerRadius / 2)}px` : '50%',
              transform: 'translate(-50%, -50%)',
            }}
            aria-hidden="true"
          >
            {centerLabel && (
              <div
                className={cn(
                  'size-xs line-height-leading-4 font-medium text-center',
                  'text-muted'
                )}
              >
                {centerLabel}
              </div>
            )}
            {centerValue && (
              <div
                className={cn(
                  'size-2xl line-height-leading-8 font-medium text-center',
                  'text-default'
                )}
              >
                {centerValue}
              </div>
            )}
          </div>
        )}
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

DonutChart.displayName = 'DonutChart';
