import { useState, useCallback, useMemo } from 'react';

export interface UseInteractiveLegendResult {
  hiddenSeries: Set<string>;
  toggleSeries: (key: string) => void;
  isHidden: (key: string) => boolean;
}

const EMPTY_SET = new Set<string>();
const NOOP = () => {};

export function useInteractiveLegend(
  allKeys: string[],
  enabled: boolean
): UseInteractiveLegendResult {
  const [hiddenSeries, setHiddenSeries] = useState<Set<string>>(new Set());

  const toggleSeries = useCallback((key: string) => {
    setHiddenSeries(prev => {
      if (prev.has(key)) {
        const next = new Set(prev);
        next.delete(key);
        return next;
      }
      if (allKeys.length - prev.size <= 1) return prev;
      const next = new Set(prev);
      next.add(key);
      return next;
    });
  }, [allKeys.length]);

  const isHidden = useCallback((key: string) => hiddenSeries.has(key), [hiddenSeries]);

  return useMemo(() => {
    if (!enabled) return { hiddenSeries: EMPTY_SET, toggleSeries: NOOP, isHidden: () => false };
    return { hiddenSeries, toggleSeries, isHidden };
  }, [enabled, hiddenSeries, toggleSeries, isHidden]);
}
