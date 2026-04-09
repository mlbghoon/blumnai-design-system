import { forwardRef, useMemo, useState } from 'react';
import {
  PieChart as RPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import { Chart } from '../Chart/Chart';
import { useChartConfig } from '../Chart/useChartConfig';
import { PieTooltipAdapter } from '../Chart/ChartTooltipAdapter';
import { ChartLegend } from '../Chart/ChartLegend';
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
      className,
      ariaLabel,
      onDataPointClick,
      isLoading,
      responsive,
      renderTooltip,
      ...props
    },
    ref
  ) => {
  const safeData = useMemo(() => data ?? [], [data]);
  const { getLabel, getColor } = useChartConfig(config);

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

  const totalValue = useMemo(
    () => safeData.reduce((sum, item) => sum + Number(item[dataKey] ?? 0), 0),
    [safeData, dataKey]
  );

  const rStartAngle = isHalf ? 180 : 90 - startAngle;
  const rEndAngle = isHalf ? 0 : 90 - endAngle;

  const halfPadding = showLegend ? 80 : 20;
  const svgHeight = isHalf ? outerRadius + halfPadding : height;

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
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={rStartAngle}
        endAngle={rEndAngle}
        paddingAngle={paddingAngle}
        stroke="#fff"
        strokeWidth={2}
        onMouseEnter={(_: unknown, index: number) => {
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
          if (onDataPointClick) onDataPointClick(safeData[idx], idx);
        }}
      >
        {safeData.map((_, index) => (
          <Cell key={`cell-${index}`} fill={colors[index]} />
        ))}
      </Pie>
      <Tooltip
        content={
          <PieTooltipAdapter
            renderTooltip={renderTooltip}
            getLabel={getLabel}
            totalValue={totalValue}
          />
        }
      />
      {showLegend && (
        <Legend content={<ChartLegend variant="circle" />} />
      )}
    </RPieChart>
  );

  return (
    <Chart ref={ref} width={responsive ? undefined : width} height={isHalf ? undefined : height} className={className} ariaLabel={chartAriaLabel} isLoading={isLoading} responsive={responsive} {...props}>
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
              top: isHalf ? `${svgHeight - (innerRadius / 2)}px` : '50%',
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
    </Chart>
  );
  }
);

DonutChart.displayName = 'DonutChart';
