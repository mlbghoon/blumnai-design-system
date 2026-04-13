import type { ReactNode } from 'react';
import { ChartLegend } from './ChartLegend';
import type { ChartLegendProps } from './ChartLegend';
import type { LegendItem } from './ChartLegend';

export interface RenderLegendProps {
  items: LegendItem[];
  hiddenSeries: Set<string>;
  toggleSeries: (key: string) => void;
}

interface ChartWithLegendProps {
  children: ReactNode;
  showLegend?: boolean;
  legendProps?: ChartLegendProps;
  renderLegend?: (props: RenderLegendProps) => ReactNode;
}

export function ChartWithLegend({ children, showLegend, legendProps, renderLegend }: ChartWithLegendProps) {
  if (!showLegend || !legendProps) return <>{children}</>;

  const isRight = legendProps.position === 'right';

  const legendContent = renderLegend
    ? renderLegend({
        items: legendProps.items,
        hiddenSeries: legendProps.hiddenSeries ?? new Set(),
        toggleSeries: legendProps.onToggle ?? (() => {}),
      })
    : <ChartLegend {...legendProps} />;

  if (!isRight) {
    return (
      <div>
        {children}
        {legendContent}
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4, paddingRight: 16 }}>
      <div style={{ flex: '1 1 0%', minWidth: 0 }}>
        {children}
      </div>
      <div style={{ flexShrink: 0 }}>
        {legendContent}
      </div>
    </div>
  );
}
