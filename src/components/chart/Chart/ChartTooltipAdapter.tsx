import type { ReactNode } from 'react';

import { AdvancedTooltip } from '../../tooltip/Tooltip';
import type { TooltipItemData } from '../../tooltip/Tooltip/Tooltip.types';
import type { ChartTooltipParams, PieTooltipParams } from './Chart.types';

interface ChartTooltipAdapterProps {
  active?: boolean;
  payload?: Array<{
    dataKey?: string;
    value?: number;
    color?: string;
    name?: string;
    payload?: Record<string, unknown>;
  }>;
  label?: string | number;
  renderTooltip?: (params: ChartTooltipParams) => ReactNode;
  getLabel: (key: string) => string;
  getColor: (key: string, index: number) => string;
}

export function ChartTooltipAdapter({
  active,
  payload,
  label,
  renderTooltip,
  getLabel,
  getColor,
}: ChartTooltipAdapterProps) {
  if (!active || !payload?.length) return null;

  const params: ChartTooltipParams = {
    xValue: label ?? '',
    items: payload.map((entry, i) => ({
      dataKey: String(entry.dataKey ?? ''),
      label: getLabel(String(entry.dataKey ?? '')),
      value: Number(entry.value ?? 0),
      color: entry.color || getColor(String(entry.dataKey ?? ''), i),
    })),
  };

  if (renderTooltip) return <>{renderTooltip(params)}</>;

  const tooltipItems: TooltipItemData[] = [
    { type: 'label', label: String(label ?? '') },
    { type: 'divider' },
    ...params.items.map((item) => ({
      type: 'item' as const,
      label: item.label,
      caption: String(item.value),
      indicatorColor: item.color,
    })),
  ];

  return <AdvancedTooltip items={tooltipItems} />;
}

interface PieTooltipAdapterProps {
  active?: boolean;
  payload?: Array<{
    name?: string;
    value?: number;
    payload?: Record<string, unknown> & {
      fill?: string;
      percent?: number;
    };
  }>;
  renderTooltip?: (params: PieTooltipParams) => ReactNode;
  getLabel: (key: string) => string;
}

export function PieTooltipAdapter({
  active,
  payload,
  renderTooltip,
  getLabel,
}: PieTooltipAdapterProps) {
  if (!active || !payload?.length) return null;

  const entry = payload[0];
  const name = String(entry.name ?? '');
  const value = Number(entry.value ?? 0);
  const percent = (entry.payload?.percent ?? 0) as number;
  const color = String(entry.payload?.fill ?? '');

  const params: PieTooltipParams = { name, value, percent: percent * 100, color };

  if (renderTooltip) return <>{renderTooltip(params)}</>;

  const tooltipItems: TooltipItemData[] = [
    { type: 'label', label: getLabel(name) },
    { type: 'divider' },
    { type: 'item', label: getLabel(name), caption: String(value), indicatorColor: color },
    { type: 'item', label: `${(percent * 100).toFixed(1)}%`, indicatorColor: color },
  ];

  return <AdvancedTooltip items={tooltipItems} />;
}
