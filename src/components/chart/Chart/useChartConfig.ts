import { useMemo } from 'react';

import type { ChartConfig } from './Chart.types';
import { DEFAULT_CHART_COLORS } from './Chart.types';
import type { LegendItem } from './ChartLegend';

interface UseChartConfigResult {
  getLabel: (key: string) => string;
  getTooltipLabel: (key: string) => string;
  getColor: (key: string, index: number) => string;
  buildLegendItems: (keys: string[]) => LegendItem[];
}

export function useChartConfig(
  config?: ChartConfig,
  colorMapping?: Record<string, string> | string[]
): UseChartConfigResult {
  return useMemo(() => {
    const getLabel = (key: string): string => {
      if (config?.[key]) return config[key].label;
      return key;
    };

    const getTooltipLabel = (key: string): string => {
      if (config?.[key]?.tooltipLabel) return config[key].tooltipLabel!;
      return getLabel(key);
    };

    const getColor = (key: string, index: number): string => {
      if (config?.[key]) return config[key].color;
      if (colorMapping) {
        if (Array.isArray(colorMapping)) {
          return colorMapping[index % colorMapping.length] || DEFAULT_CHART_COLORS[index % DEFAULT_CHART_COLORS.length];
        }
        return colorMapping[key] || DEFAULT_CHART_COLORS[index % DEFAULT_CHART_COLORS.length];
      }
      return DEFAULT_CHART_COLORS[index % DEFAULT_CHART_COLORS.length];
    };

    const buildLegendItems = (keys: string[]): LegendItem[] => {
      return keys.map((key, index) => ({
        key,
        label: getLabel(key),
        color: getColor(key, index),
      }));
    };

    return { getLabel, getTooltipLabel, getColor, buildLegendItems };
  }, [config, colorMapping]);
}
