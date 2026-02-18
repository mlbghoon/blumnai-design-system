import * as React from 'react';

import { cn } from '@/lib/utils';

export interface SliderTicksProps {
  min: number;
  max: number;
  step?: number;
  tickCount?: number;
  formatTick?: (value: number) => string;
  className?: string;
}

const SliderTicks = React.forwardRef<HTMLDivElement, SliderTicksProps>(
  ({ min, max, step, tickCount = 11, formatTick, className }, ref) => {
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

    return (
      <div
        ref={ref}
        className={cn('relative w-full h-[24px] margin-t-4', className)}
      >
        {ticks.map((tick, index) => {
          const percent = ((tick - min) / range) * 100;
          return (
            <div
              key={index}
              className="absolute flex flex-col items-center ds-gap-4 -translate-x-1/2"
              style={{ left: `calc(8px + (100% - 16px) * ${percent / 100})` }}
            >
              <div className="w-[1px] h-[4px] bg-basic-gray-alpha-10" />
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
