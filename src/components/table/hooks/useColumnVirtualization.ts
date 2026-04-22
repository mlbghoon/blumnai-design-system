import { useEffect, useMemo, useState } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import type { ColumnSizingState } from '../DataGrid.types';

export interface ColumnMeasurement {
  id: string;
  index: number;
  left: number;
  width: number;
  sticky: boolean;
}

function parseWidth(w: string | undefined): number {
  if (!w) return 150;
  const m = w.match(/^(\d+(?:\.\d+)?)(px)?$/);
  if (m) return parseFloat(m[1]);
  return 150;
}

export function measureColumns<T>(
  columns: ColumnDef<T>[],
  columnSizing?: ColumnSizingState,
): ColumnMeasurement[] {
  let cursor = 0;
  return columns.map((col, index) => {
    const id =
      col.id ?? (col as { accessorKey?: string }).accessorKey ?? `col-${index}`;
    const width = columnSizing?.[id] ?? parseWidth(col.meta?.width);
    const sticky = col.meta?.sticky === true || col.meta?.sticky === 'left';
    const left = cursor;
    cursor += width;
    return { id, index, left, width, sticky };
  });
}

interface UseColumnVirtualizationArgs<T> {
  columns: ColumnDef<T>[];
  columnSizing?: ColumnSizingState;
  scrollElement: Element | null;
  enabled: boolean;
  overscan: number;
}

/**
 * 수평 컬럼 가상화 훅.
 *
 * 스크롤 viewport 내에 들어오는 컬럼 인덱스만 반환합니다.
 * sticky 컬럼은 항상 포함됩니다.
 */
export function useColumnVirtualization<T>({
  columns,
  columnSizing,
  scrollElement,
  enabled,
  overscan,
}: UseColumnVirtualizationArgs<T>) {
  const measurements = useMemo(
    () => measureColumns(columns, columnSizing),
    [columns, columnSizing],
  );

  const [scrollLeft, setScrollLeft] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);

  useEffect(() => {
    if (!enabled || !scrollElement) return;

    const update = () => {
      setScrollLeft(scrollElement.scrollLeft);
      setViewportWidth(scrollElement.clientWidth);
    };
    update();

    let rafId = 0;
    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setScrollLeft(scrollElement.scrollLeft);
      });
    };
    scrollElement.addEventListener('scroll', onScroll, { passive: true });

    const ro = new ResizeObserver(() => {
      setViewportWidth(scrollElement.clientWidth);
    });
    ro.observe(scrollElement);

    return () => {
      scrollElement.removeEventListener('scroll', onScroll);
      ro.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [enabled, scrollElement]);

  const visibleIndices = useMemo(() => {
    const all = new Set(measurements.map((m) => m.index));
    if (!enabled || viewportWidth === 0) return all;

    const stickyWidth = measurements
      .filter((m) => m.sticky)
      .reduce((s, m) => s + m.width, 0);

    const viewStart = scrollLeft + stickyWidth;
    const viewEnd = scrollLeft + viewportWidth;

    const result = new Set<number>();
    measurements.forEach((m) => {
      if (m.sticky) result.add(m.index);
    });

    const nonSticky = measurements.filter((m) => !m.sticky);
    let firstIdx = -1;
    let lastIdx = -1;
    nonSticky.forEach((m, i) => {
      const right = m.left + m.width;
      if (right >= viewStart && m.left <= viewEnd) {
        if (firstIdx === -1) firstIdx = i;
        lastIdx = i;
      }
    });

    if (firstIdx === -1) return result;

    const start = Math.max(0, firstIdx - overscan);
    const end = Math.min(nonSticky.length - 1, lastIdx + overscan);
    for (let i = start; i <= end; i++) {
      result.add(nonSticky[i].index);
    }
    return result;
  }, [measurements, enabled, scrollLeft, viewportWidth, overscan]);

  return { visibleIndices, enabled };
}
