import type { LegendPayload } from 'recharts/types/component/DefaultLegendContent';

import { cn } from '@/lib/utils';

interface ChartLegendProps {
  payload?: LegendPayload[];
  variant?: 'square' | 'circle';
}

export function ChartLegend({ payload, variant = 'square' }: ChartLegendProps) {
  if (!payload?.length) return null;

  return (
    <div className="flex flex-wrap justify-center ds-gap-4 padding-x-16 padding-b-16 margin-t-16" role="list" aria-label="Chart legend">
      {payload.map((entry, index) => (
        <div key={`legend-${index}`} className="flex items-center ds-gap-2" role="listitem">
          <div
            style={{ backgroundColor: entry.color, width: 12, height: 12 }}
            className={variant === 'circle' ? 'rounded-full' : 'rounded-sm'}
            aria-hidden="true"
          />
          <span className={cn('size-xs', 'text-muted')}>
            {typeof entry.value === 'string' ? entry.value : String(entry.value)}
          </span>
        </div>
      ))}
    </div>
  );
}
