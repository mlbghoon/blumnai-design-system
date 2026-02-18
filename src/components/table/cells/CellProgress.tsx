import { cn } from '@/lib/utils';

interface CellProgressProps {
  value: number;
  max?: number;
  showLabel?: boolean;
  color?: 'default' | 'success' | 'warning' | 'destructive';
}

const colorStyles = {
  default: 'bg-state-primary',
  success: 'bg-basic-green-accent',
  warning: 'bg-basic-orange-accent',
  destructive: 'bg-basic-red-accent',
};

export function CellProgress({
  value,
  max = 100,
  showLabel = true,
  color = 'default',
}: CellProgressProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className="flex items-center ds-gap-8 w-full">
      <div className="flex-1 height-8 bg-basic-gray-alpha-10 rounded-full overflow-hidden">
        <div
          className={cn('h-full rounded-full transition-all', colorStyles[color])}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <span className="font-body size-xs text-subtle shrink-0">
          {Math.round(percentage)}%
        </span>
      )}
    </div>
  );
}
