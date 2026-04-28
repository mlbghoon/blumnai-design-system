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

interface ParsedWidth {
  value: number;
  /**
   * 픽셀로 정확히 결정된 너비인지 여부.
   * `false` 면 `minmax()` min 값 또는 fallback (150px) 으로 추정한 값.
   */
  deterministic: boolean;
}

function parseWidth(w: string | undefined): ParsedWidth {
  if (!w) return { value: 150, deterministic: false };
  const px = w.match(/^(\d+(?:\.\d+)?)(px)?$/);
  if (px) return { value: parseFloat(px[1]), deterministic: true };
  // minmax(<min>px, <max>) — min 값을 floor 로 사용 (정확한 픽셀이 아니므로 deterministic=false)
  const minmax = w.match(/^minmax\(\s*(\d+(?:\.\d+)?)px\s*,/);
  if (minmax) return { value: parseFloat(minmax[1]), deterministic: false };
  // 1fr, auto, % 등 — 알 수 없음
  return { value: 150, deterministic: false };
}

export interface MeasureResult {
  measurements: ColumnMeasurement[];
  /**
   * 모든 컬럼의 너비가 픽셀로 정확히 결정되어 가상화 위치 계산이 정확한지.
   * `false` 면 `minmax()` / `1fr` / `auto` 등이 섞여 있어 위치 추정이 부정확함.
   */
  allDeterministic: boolean;
}

export function measureColumns<T>(
  columns: ColumnDef<T>[],
  columnSizing?: ColumnSizingState,
): MeasureResult {
  let cursor = 0;
  let allDeterministic = true;
  const measurements = columns.map((col, index) => {
    const id =
      col.id ?? (col as { accessorKey?: string }).accessorKey ?? `col-${index}`;
    const sized = columnSizing?.[id];
    let width: number;
    if (sized != null) {
      width = sized;
    } else {
      const parsed = parseWidth(col.meta?.width);
      width = parsed.value;
      if (!parsed.deterministic) allDeterministic = false;
    }
    const sticky = col.meta?.sticky === true || col.meta?.sticky === 'left';
    const left = cursor;
    cursor += width;
    return { id, index, left, width, sticky };
  });
  return { measurements, allDeterministic };
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
  const { measurements, allDeterministic } = useMemo(
    () => measureColumns(columns, columnSizing),
    [columns, columnSizing],
  );

  // 컬럼 너비를 정확히 픽셀로 알 수 없으면(`minmax()` / `1fr` / `auto` 등) 가상화를 비활성화.
  // 잘못된 위치 추정으로 우측 컬럼이 silent 하게 사라지는 것을 방지.
  const effectiveEnabled = enabled && allDeterministic;

  const [scrollLeft, setScrollLeft] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);

  useEffect(() => {
    if (!effectiveEnabled || !scrollElement) return;

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
  }, [effectiveEnabled, scrollElement]);

  const visibleIndices = useMemo(() => {
    const all = new Set(measurements.map((m) => m.index));
    if (!effectiveEnabled || viewportWidth === 0) return all;

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
  }, [measurements, effectiveEnabled, scrollLeft, viewportWidth, overscan]);

  return { visibleIndices, enabled: effectiveEnabled };
}
