import { forwardRef, useMemo } from 'react';
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

import type { PieChartProps } from '../Chart/Chart.types';

/**
 * PieChart 컴포넌트
 *
 * 비율을 나타내는 조각이 있는 파이 차트로 데이터를 표시합니다.
 * Recharts 기반으로 Figma 디자인에 맞는 색상과 간격을 적용합니다.
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

  // Recharts 각도 변환: Recharts는 0 = 12시 방향, 시계 방향이 양수
  const rStartAngle = isHalf ? 180 : 90 - startAngle;
  const rEndAngle = isHalf ? 0 : 90 - endAngle;

  const halfPadding = showLegend ? 80 : 20;
  const svgHeight = isHalf ? outerRadius + halfPadding : height;

  const chartAriaLabel = ariaLabel || `Pie chart showing ${safeData.map(d => String(d[nameKey] ?? '')).join(', ')}`;

  const chartContent = (
    <RPieChart>
      <Pie
        data={safeData}
        dataKey={dataKey}
        nameKey={nameKey}
        cx="50%"
        cy={isHalf ? '100%' : '50%'}
        outerRadius={outerRadius}
        startAngle={rStartAngle}
        endAngle={rEndAngle}
        paddingAngle={paddingAngle}
        stroke="#fff"
        strokeWidth={2}
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
    </Chart>
  );
  }
);

PieChart.displayName = 'PieChart';
