import { useMemo, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { ChartWithLegend } from '../Chart/ChartWithLegend';
import { useInteractiveLegend } from '../Chart/useInteractiveLegend';
import type { LegendItem } from '../Chart/ChartLegend';
import type { ProportionBarProps } from './ProportionBar.types';

export const ProportionBar = forwardRef<HTMLDivElement, ProportionBarProps>(
  (
    {
      data,
      totalLabel,
      totalValue,
      valueSuffix,
      valueFormatter,
      showLegend = true,
      legendPosition = 'right',
      legendInteractive = false,
      animated = true,
      variant = 'default',
      height = 40,
      className,
    },
    ref
  ) => {
    const allKeys = useMemo(() => data.map(d => d.name), [data]);
    const { hiddenSeries, toggleSeries, isHidden } = useInteractiveLegend(allKeys, legendInteractive);

    const visibleData = useMemo(
      () => data.filter(d => !isHidden(d.name)),
      [data, isHidden]
    );

    const visibleTotal = useMemo(
      () => visibleData.reduce((sum, d) => sum + d.value, 0),
      [visibleData]
    );

    const legendItems: LegendItem[] = useMemo(
      () => data.map(d => ({
        key: d.name,
        label: d.name,
        color: d.color,
        value: d.value,
      })),
      [data]
    );

    const formatLegendValue = useMemo(() => {
      if (valueFormatter) return valueFormatter;
      if (valueSuffix) return (v: number) => `${v}${valueSuffix}`;
      return undefined;
    }, [valueFormatter, valueSuffix]);

    const barContent = (
      <div className="flex flex-col">
        {(totalLabel || totalValue) && (
          <div className="margin-b-8">
            {totalLabel && (
              <div className="font-body size-xs line-height-leading-4 text-muted">{totalLabel}</div>
            )}
            {totalValue && (
              <div className="font-body size-lg line-height-leading-6 font-semibold text-default">{totalValue}</div>
            )}
          </div>
        )}
        <div
          className="flex w-full overflow-hidden rounded-sm"
          style={{ height }}
        >
          {data.map((item, index) => {
            const hidden = isHidden(item.name);
            const widthPercent = visibleTotal > 0 && !hidden
              ? (item.value / visibleTotal) * 100
              : 0;

            return (
              <div
                key={`${item.name}-${index}`}
                style={{
                  width: `${widthPercent}%`,
                  backgroundColor: item.color,
                  transition: animated ? 'width 0.3s ease' : 'none',
                }}
                className="h-full"
              />
            );
          })}
        </div>
      </div>
    );

    const wrapperClassName = cn(
      variant !== 'unstyled' && 'bg-state-ghost rounded-lg shadow-modal-sm padding-16',
      className
    );

    return (
      <div ref={ref} className={wrapperClassName}>
        <ChartWithLegend
          showLegend={showLegend}
          legendProps={{
            items: legendItems,
            variant: 'circle',
            position: legendPosition,
            interactive: legendInteractive,
            hiddenSeries,
            onToggle: toggleSeries,
            valueFormatter: formatLegendValue,
          }}
        >
          {barContent}
        </ChartWithLegend>
      </div>
    );
  }
);

ProportionBar.displayName = 'ProportionBar';
