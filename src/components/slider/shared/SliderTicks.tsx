import * as React from 'react';

import { cn } from '@/lib/utils';

export interface SliderTicksProps {
  min: number;
  max: number;
  step?: number;
  tickCount?: number;
  formatTick?: (value: number) => string;
  orientation?: 'horizontal' | 'vertical';
  height?: number;
  className?: string;
}

const SliderTicks = React.forwardRef<HTMLDivElement, SliderTicksProps>(
  ({ min, max, step, tickCount = 11, formatTick, orientation = 'horizontal', height, className }, ref) => {
    const ticks = React.useMemo(() => {
      const result: number[] = [];

      if (step && step >= 10 && (max - min) / step <= 20) {
        for (let i = min; i <= max; i += step) {
          result.push(i);
        }
      } else {
        const interval = (max - min) / (tickCount - 1);
        for (let i = 0; i < tickCount; i++) {
          result.push(Math.round(min + interval * i));
        }
      }

      return result;
    }, [min, max, step, tickCount]);

    const formatFn = formatTick ?? ((v: number) => String(v));
    const range = max - min;
    const isVertical = orientation === 'vertical';

    return (
      <div
        ref={ref}
        role="presentation"
        aria-hidden="true"
        className={cn(
          'relative',
          isVertical ? 'width-24 [margin-left:4px]' : 'w-full height-24 margin-t-4',
          className
        )}
        {...(isVertical && height ? { style: { height } } : {})}
      >
        {ticks.map((tick, index) => {
          const percent = ((tick - min) / range) * 100;
          return (
            <div
              key={`${tick}-${index}`}
              className={cn(
                'absolute flex items-center',
                isVertical
                  ? 'flex-row ds-gap-4 translate-y-1/2'
                  : 'flex-col ds-gap-4 -translate-x-1/2'
              )}
              style={
                isVertical
                  ? { bottom: `calc(8px + (100% - 16px) * ${percent / 100})` }
                  : { left: `calc(8px + (100% - 16px) * ${percent / 100})` }
              }
            >
              <div className={cn(
                'bg-basic-gray-alpha-10',
                isVertical ? 'height-1 width-4' : 'w-[1px] height-4'
              )} />
              <span className="font-body size-xs line-height-leading-4 text-muted whitespace-nowrap">
                {formatFn(tick)}
              </span>
            </div>
          );
        })}
      </div>
    );
  }
);

SliderTicks.displayName = 'SliderTicks';

export { SliderTicks };
