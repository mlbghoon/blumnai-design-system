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
import { useInteractiveLegend } from '../Chart/useInteractiveLegend';
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
      animated,
      className,
      ariaLabel,
      onDataPointClick,
      isLoading,
      responsive,
      renderTooltip,
      wrapCustomTooltip,
      tooltipValueFormatter,
      legendInteractive = false,
      ...props
    },
    ref
  ) => {
  const isAnimated = animated !== false;
  const safeData = useMemo(() => data ?? [], [data]);
  const { getLabel, getTooltipLabel, getColor } = useChartConfig(config);

  const allPieKeys = useMemo(() => safeData.map(d => String(d[nameKey] ?? '')), [safeData, nameKey]);
  const { hiddenSeries, toggleSeries, isHidden } = useInteractiveLegend(allPieKeys, legendInteractive);

  const filteredData = useMemo(() => safeData.filter(d => !isHidden(String(d[nameKey] ?? ''))), [safeData, nameKey, isHidden]);

  const filteredColors = useMemo(() => {
    return filteredData.map((item, index) => {
      const name = String(item[nameKey] ?? '');
      return getColor(name, index);
    });
  }, [filteredData, nameKey, getColor]);

  const totalValue = useMemo(
    () => filteredData.reduce((sum, item) => sum + Number(item[dataKey] ?? 0), 0),
    [filteredData, dataKey]
  );

  // Recharts 각도 변환: Recharts는 0 = 12시 방향, 시계 방향이 양수
  const rStartAngle = isHalf ? 180 : 90 - startAngle;
  const rEndAngle = isHalf ? 0 : 90 - endAngle;

  const maxRadius = Math.floor(Math.min(width, height) / 2) - 4;
  const safeOuterRadius = Math.min(outerRadius, maxRadius);

  const halfPadding = showLegend ? 80 : 20;
  const svgHeight = isHalf ? safeOuterRadius + halfPadding : height;

  const chartAriaLabel = ariaLabel || `Pie chart showing ${safeData.map(d => String(d[nameKey] ?? '')).join(', ')}`;

  const chartContent = (
    <RPieChart>
      <Pie
        data={filteredData}
        dataKey={dataKey}
        nameKey={nameKey}
        cx="50%"
        cy={isHalf ? '100%' : '50%'}
        outerRadius={safeOuterRadius}
        startAngle={rStartAngle}
        endAngle={rEndAngle}
        paddingAngle={paddingAngle}
        isAnimationActive={isAnimated}
        stroke="var(--bg-card)"
        strokeWidth={2}
        onClick={(_data: Record<string, unknown>, idx: number) => {
          if (onDataPointClick) onDataPointClick(filteredData[idx], idx);
        }}
      >
        {filteredData.map((_, index) => (
          <Cell key={`cell-${index}`} fill={filteredColors[index]} />
        ))}
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
      {showLegend && (
        <Legend content={<ChartLegend variant="circle" interactive={legendInteractive} hiddenSeries={hiddenSeries} onToggle={toggleSeries} />} />
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
