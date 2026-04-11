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
  wrapCustomTooltip?: boolean;
  getLabel: (key: string) => string;
  getColor: (key: string, index: number) => string;
}

export function ChartTooltipAdapter({
  active,
  payload,
  label,
  renderTooltip,
  wrapCustomTooltip = false,
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

  if (renderTooltip) {
    const content = renderTooltip(params);
    return wrapCustomTooltip ? (
      <div className="rounded-card-xs padding-4 bg-card shadow-modal-sm">
        {content}
      </div>
    ) : <>{content}</>;
  }

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
    };
  }>;
  renderTooltip?: (params: PieTooltipParams) => ReactNode;
  wrapCustomTooltip?: boolean;
  getLabel: (key: string) => string;
  totalValue?: number;
}

export function PieTooltipAdapter({
  active,
  payload,
  renderTooltip,
  wrapCustomTooltip = false,
  getLabel,
  totalValue = 0,
}: PieTooltipAdapterProps) {
  if (!active || !payload?.length) return null;

  const entry = payload[0];
  const name = String(entry.name ?? '');
  const value = Number(entry.value ?? 0);
  const percent = totalValue > 0 ? value / totalValue : 0;
  const color = String(entry.payload?.fill ?? '');

  const params: PieTooltipParams = { name, value, percent: percent * 100, color };

  if (renderTooltip) {
    const content = renderTooltip(params);
    return wrapCustomTooltip ? (
      <div className="rounded-card-xs padding-4 bg-card shadow-modal-sm">
        {content}
      </div>
    ) : <>{content}</>;
  }

  const tooltipItems: TooltipItemData[] = [
    { type: 'label', label: getLabel(name) },
    { type: 'divider' },
    { type: 'item', label: getLabel(name), caption: String(value), indicatorColor: color },
    { type: 'item', label: `${(percent * 100).toFixed(1)}%`, indicatorColor: color },
  ];

  return <AdvancedTooltip items={tooltipItems} />;
}
