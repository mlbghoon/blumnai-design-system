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
  /**
   * tooltipTrigger === 'item'일 때 현재 호버 중인 시리즈 키.
   * Recharts가 LineChart/BarChart/ComposedChart에 대해 `shared={false}`를
   * 'axis'로 되돌려버려 payload가 항상 전체 시리즈를 담고 있으므로,
   * 이 prop을 통해 DS가 직접 필터링한다.
   */
  activeDataKey?: string | null;
  tooltipTrigger?: 'hover' | 'click' | 'item';
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
  activeDataKey,
  tooltipTrigger,
}: ChartTooltipAdapterProps) {
  if (!active || !payload?.length) return null;

  const isItemMode = tooltipTrigger === 'item';
  const resolveLabel = getTooltipLabel ?? getLabel;
  const formatValue = tooltipValueFormatter ?? String;

  // item 모드 + 추적된 시리즈가 있으면 그 시리즈만 필터.
  // activeDataKey가 null(추적 실패/범위 밖)이면 전체 시리즈를 보여준다.
  // ("안 보이는 것보다 낫다" — 추적 로직의 엣지 케이스에서 안전망)
  const filteredPayload = isItemMode && activeDataKey
    ? payload.filter((entry) => String(entry.dataKey ?? '') === activeDataKey)
    : payload;

  if (filteredPayload.length === 0) return null;

  const params: ChartTooltipParams = {
    xValue: label ?? '',
    items: filteredPayload.map((entry, i) => ({
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
    { type: 'item', label: resolveLabel(name), caption: `${(percent * 100).toFixed(1)}%`, indicatorColor: color },
  ];

  return <AdvancedTooltip items={tooltipItems} />;
}
