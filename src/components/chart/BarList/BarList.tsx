import { useState, useMemo, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { TooltipTrigger } from '../../tooltip/Tooltip/TooltipTrigger';
import { TooltipItem } from '../../tooltip/Tooltip/TooltipItem';
import { Tooltip } from '../../tooltip/Tooltip/Tooltip';
import { ScrollArea } from '../../scroll-area';
import type { BarListProps } from './BarList.types';

export const BarList = forwardRef<HTMLDivElement, BarListProps>(
  (
    {
      data,
      valueFormatter,
      valueSuffix,
      showCount = 5,
      color = 'var(--chart-1)',
      fillColor,
      maxHeight,
      animated = true,
      labelWidth = 64,
      className,
      onItemClick,
    },
    ref
  ) => {
    const [expanded, setExpanded] = useState(false);

    const maxValue = useMemo(() => {
      if (!data.length) return 1;
      return Math.max(...data.map(d => d.value), 1);
    }, [data]);

    const needsCollapse = data.length > showCount;
    const visibleItems = needsCollapse && !expanded ? data.slice(0, showCount) : data;

    const formatValue = (value: number) => {
      const formatted = valueFormatter ? valueFormatter(value) : String(value);
      return valueSuffix ? `${formatted}${valueSuffix}` : formatted;
    };

    const itemsList = (
      <div className="flex flex-col ds-gap-6">
        {visibleItems.map((item, index) => {
          const barColor = item.color || color;
          const barFill = fillColor || barColor;
          const widthPercent = (item.value / maxValue) * 100;

          return (
            <div
              key={`${item.name}-${index}`}
              className={cn(
                'flex items-center ds-gap-12',
                onItemClick && 'cursor-pointer hover:bg-subtle rounded-xs transition-colors'
              )}
              onClick={onItemClick ? () => onItemClick(item, index) : undefined}
            >
              <TooltipTrigger content={item.name} placement="top" asChild>
                <span className="font-body size-sm line-height-leading-5 text-default shrink-0 truncate" style={{ width: labelWidth }}>
                  {item.name}
                </span>
              </TooltipTrigger>
              <TooltipTrigger
                content={
                  <Tooltip>
                    <TooltipItem type="item" label={item.name} caption={formatValue(item.value)} indicatorColor={barColor} />
                  </Tooltip>
                }
                placement="top"
                asChild
              >
                <div className="flex-1 bg-muted rounded-2xs" style={{ height: 18 }}>
                  <div
                    className="h-full rounded-2xs"
                    style={{
                      width: `${widthPercent}%`,
                      backgroundColor: barFill,
                      opacity: 0.7,
                      borderLeft: `3px solid ${barColor}`,
                      transition: animated ? 'width 0.3s ease' : 'none',
                    }}
                  />
                </div>
              </TooltipTrigger>
              <span className="font-body size-sm line-height-leading-5 text-subtle shrink-0 text-right" style={{ minWidth: `${String(maxValue).length + 1}ch` }}>
                {formatValue(item.value)}
              </span>
            </div>
          );
        })}
      </div>
    );

    return (
      <div ref={ref} className={cn('flex flex-col', className)}>
        {maxHeight ? (
          <ScrollArea orientation="vertical" maxHeight={maxHeight} type="always" offsetScrollbars>
            {itemsList}
          </ScrollArea>
        ) : (
          itemsList
        )}

        {needsCollapse && (
          <button
            type="button"
            onClick={() => setExpanded(prev => !prev)}
            className="margin-t-8 size-xs line-height-leading-4 text-muted hover:text-subtle transition-colors cursor-pointer self-center font-body font-medium padding-x-8 padding-y-4 rounded-sm hover:bg-subtle"
          >
            {expanded ? '접어두기' : `더보기 (+${data.length - showCount})`}
          </button>
        )}
      </div>
    );
  }
);

BarList.displayName = 'BarList';
