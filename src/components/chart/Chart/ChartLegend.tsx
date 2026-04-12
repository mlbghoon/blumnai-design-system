import type { LegendPayload } from 'recharts/types/component/DefaultLegendContent';

import { cn } from '@/lib/utils';

interface ChartLegendProps {
  payload?: LegendPayload[];
  variant?: 'square' | 'circle';
  interactive?: boolean;
  hiddenSeries?: Set<string>;
  onToggle?: (dataKey: string) => void;
}

export function ChartLegend({ payload, variant = 'square', interactive = false, hiddenSeries, onToggle }: ChartLegendProps) {
  if (!payload?.length) return null;

  return (
    <div className="flex flex-wrap justify-center ds-gap-4 padding-x-16 padding-b-16 margin-t-16" role="list" aria-label="Chart legend">
      {payload.map((entry, index) => {
        const key = typeof entry.value === 'string' ? entry.value : String(entry.value);
        const isHidden = hiddenSeries?.has(key) ?? false;

        return (
          <div
            key={`legend-${index}`}
            className={cn(
              'flex items-center ds-gap-2',
              interactive && 'cursor-pointer select-none hover:opacity-80 transition-opacity'
            )}
            role={interactive ? 'button' : 'listitem'}
            aria-pressed={interactive ? !isHidden : undefined}
            onClick={interactive ? () => onToggle?.(key) : undefined}
            style={{ opacity: isHidden ? 0.4 : undefined }}
          >
            <div
              style={{
                backgroundColor: isHidden ? '#ccc' : entry.color,
                width: 12,
                height: 12,
              }}
              className={variant === 'circle' ? 'rounded-full' : 'rounded-sm'}
              aria-hidden="true"
            />
            <span className={cn('size-xs', 'text-muted')}>
              {key}
            </span>
          </div>
        );
      })}
    </div>
  );
}
