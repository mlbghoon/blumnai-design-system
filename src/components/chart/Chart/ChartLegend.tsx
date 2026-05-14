import { cn } from '@/lib/utils';

export interface LegendItem {
  key: string;
  label: string;
  color: string;
  value?: number;
}

export interface ChartLegendProps {
  items: LegendItem[];
  variant?: 'square' | 'circle';
  position?: 'bottom' | 'right';
  interactive?: boolean;
  hiddenSeries?: Set<string>;
  onToggle?: (key: string) => void;
  valueFormatter?: (value: number, name: string) => string;
}

export function ChartLegend({
  items,
  variant = 'square',
  position = 'bottom',
  interactive = false,
  hiddenSeries,
  onToggle,
  valueFormatter,
}: ChartLegendProps) {
  if (!items.length) return null;

  const isRight = position === 'right';

  return (
    <div
      className={cn(
        isRight
          ? 'flex flex-col ds-gap-6 shrink-0'
          : 'flex flex-wrap justify-center ds-gap-4 padding-x-16 padding-b-16 margin-t-16'
      )}
      role="list"
      aria-label="Chart legend"
    >
      {items.map((item) => {
        const isHidden = hiddenSeries?.has(item.key) ?? false;
        const formattedValue = valueFormatter && item.value != null
          ? valueFormatter(item.value, item.label)
          : undefined;

        return (
          <div
            key={item.key}
            className={cn(
              'flex items-center ds-gap-2',
              isRight && formattedValue && 'justify-between ds-gap-12',
              interactive && 'cursor-pointer hover:opacity-80 transition-opacity'
            )}
            role={interactive ? 'button' : 'listitem'}
            tabIndex={interactive ? 0 : undefined}
            aria-pressed={interactive ? !isHidden : undefined}
            onClick={interactive ? () => onToggle?.(item.key) : undefined}
            onKeyDown={interactive ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onToggle?.(item.key);
              }
            } : undefined}
            style={{ opacity: isHidden ? 0.4 : undefined }}
          >
            <div className="flex items-center ds-gap-2">
              <div
                style={{
                  backgroundColor: isHidden ? '#ccc' : item.color,
                  width: 12,
                  height: 12,
                }}
                className={cn(
                  'shrink-0',
                  variant === 'circle' ? 'rounded-full' : 'rounded-sm'
                )}
                aria-hidden="true"
              />
              <span className="size-xs text-muted whitespace-nowrap">
                {item.label}
              </span>
            </div>
            {formattedValue && (
              <span className="size-xs text-subtle font-medium whitespace-nowrap">
                {formattedValue}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
