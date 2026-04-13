import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { ChartLegend } from './ChartLegend';
import type { ChartLegendProps } from './ChartLegend';

interface ChartWithLegendProps {
  children: ReactNode;
  showLegend?: boolean;
  legendProps?: ChartLegendProps;
}

export function ChartWithLegend({ children, showLegend, legendProps }: ChartWithLegendProps) {
  if (!showLegend || !legendProps) return <>{children}</>;

  const isRight = legendProps.position === 'right';

  return (
    <div className={cn(isRight && 'flex ds-gap-28')}>
      <div className={cn(isRight && 'flex-1 min-w-0')}>
        {children}
      </div>
      <ChartLegend {...legendProps} />
    </div>
  );
}
