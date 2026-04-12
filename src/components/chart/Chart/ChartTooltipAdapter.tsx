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
  getTooltipLabel?: (key: string) => string;
  getColor: (key: string, index: number) => string;
  tooltipValueFormatter?: (value: number) => string;
}

export function ChartTooltipAdapter({
  active,
  payload,
  label,
  renderTooltip,
  wrapCustomTooltip = false,
  getLabel,
  getTooltipLabel,
  getColor,
  tooltipValueFormatter,
}: ChartTooltipAdapterProps) {
  if (!active || !payload?.length) return null;

  const resolveLabel = getTooltipLabel ?? getLabel;
  const formatValue = tooltipValueFormatter ?? String;

  const params: ChartTooltipParams = {
    xValue: label ?? '',
    items: payload.map((entry, i) => ({
      dataKey: String(entry.dataKey ?? ''),
      label: resolveLabel(String(entry.dataKey ?? '')),
      value: Number(entry.value ?? 0),
      color: entry.color || getColor(String(entry.dataKey ?? ''), i),
    })),
    valueFormatter: tooltipValueFormatter,
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
      caption: formatValue(item.value),
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
  getTooltipLabel?: (key: string) => string;
  totalValue?: number;
  tooltipValueFormatter?: (value: number) => string;
}

export function PieTooltipAdapter({
  active,
  payload,
  renderTooltip,
  wrapCustomTooltip = false,
  getLabel,
  getTooltipLabel,
  totalValue = 0,
  tooltipValueFormatter,
}: PieTooltipAdapterProps) {
  if (!active || !payload?.length) return null;

  const resolveLabel = getTooltipLabel ?? getLabel;
  const formatValue = tooltipValueFormatter ?? String;

  const entry = payload[0];
  const name = String(entry.name ?? '');
  const value = Number(entry.value ?? 0);
  const percent = totalValue > 0 ? value / totalValue : 0;
  const color = String(entry.payload?.fill ?? '');

  const params: PieTooltipParams = { name, value, percent: percent * 100, color, valueFormatter: tooltipValueFormatter };

  if (renderTooltip) {
    const content = renderTooltip(params);
    return wrapCustomTooltip ? (
      <div className="rounded-card-xs padding-4 bg-card shadow-modal-sm">
        {content}
      </div>
    ) : <>{content}</>;
  }

  const tooltipItems: TooltipItemData[] = [
    { type: 'label', label: resolveLabel(name) },
    { type: 'divider' },
    { type: 'item', label: resolveLabel(name), caption: formatValue(value), indicatorColor: color },
    { type: 'item', label: `${(percent * 100).toFixed(1)}%`, indicatorColor: color },
  ];

  return <AdvancedTooltip items={tooltipItems} />;
}
