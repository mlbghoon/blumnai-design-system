import { useState, useCallback } from 'react';
import type { ColumnDef, Row } from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';

import { cn } from '@/lib/utils';
import { DataGridRow } from './DataGridRow';
import type { StickyColumnInfo } from '../utils/stickyColumnUtils';

const DEFAULT_VIRTUALIZATION_THRESHOLD = 100;
const DEFAULT_OVERSCAN = 10;

function parseHeight(height: string | undefined): number {
  if (!height) return 32;
  const num = parseInt(height, 10);
  return isNaN(num) ? 32 : num;
}

interface DataGridBodyProps<T> {
  rows: Row<T>[];
  gridTemplateColumns: string;
  isLoading?: boolean;
  preserveDataWhileLoading?: boolean;
  onRowClick?: (row: T) => void;
  showSelectedRowBackground?: boolean;
  stickyColumnPositions: Map<string, StickyColumnInfo>;
  rowHeight?: string;
  getRowHeight?: (row: T) => string | undefined;
  overscan?: number;
  virtualizationThreshold?: number;
  visibleColumnIndices?: Set<number>;
  /**
   * fitLimitRowHeight 가 활성일 때, 바디 끝에 채워 넣을 placeholder 행 수.
   * 실제 행과 동일한 높이 · 보더로 렌더되어 마지막 페이지 여백을 시각적으로 메꿉니다.
   */
  paddingRowCount?: number;
  /**
   * placeholder 행의 빈 셀을 렌더하기 위한 컬럼 정의.
   * `paddingRowCount > 0` 일 때만 필요합니다.
   */
  paddingColumns?: ColumnDef<T>[];
}

export function DataGridBody<T>({
  rows,
  gridTemplateColumns,
  isLoading,
  preserveDataWhileLoading,
  onRowClick,
  showSelectedRowBackground,
  stickyColumnPositions,
  rowHeight,
  getRowHeight,
  overscan = DEFAULT_OVERSCAN,
  virtualizationThreshold = DEFAULT_VIRTUALIZATION_THRESHOLD,
  visibleColumnIndices,
  paddingRowCount = 0,
  paddingColumns,
}: DataGridBodyProps<T>) {
  const showLoadingOverlay = isLoading && preserveDataWhileLoading && rows.length > 0;
  const useVirtual = rows.length > virtualizationThreshold;

  const [scrollElement, setScrollElement] = useState<Element | null>(null);

  const containerRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      const viewport = node.closest('[data-radix-scroll-area-viewport]');
      setScrollElement(viewport);
    }
  }, []);

  const defaultRowHeight = parseHeight(rowHeight);

  // eslint-disable-next-line react-hooks/incompatible-library
  const virtualizer = useVirtualizer({
    count: useVirtual ? rows.length : 0,
    getScrollElement: () => scrollElement,
    estimateSize: (index) => {
      if (getRowHeight && rows[index]) {
        return parseHeight(getRowHeight(rows[index].original));
      }
      return defaultRowHeight;
    },
    overscan,
  });

  const placeholderCols = paddingColumns ?? [];
  const renderPaddingRows = paddingRowCount > 0 && placeholderCols.length > 0;

  if (!useVirtual) {
    return (
      <div
        role="rowgroup"
        className={cn(
          'relative',
          showLoadingOverlay && 'opacity-60 pointer-events-none'
        )}
      >
        {rows.map((row) => (
          <DataGridRow
            key={row.id}
            row={row}
            gridTemplateColumns={gridTemplateColumns}
            onRowClick={onRowClick}
            showSelectedRowBackground={showSelectedRowBackground}
            stickyColumnPositions={stickyColumnPositions}
            rowHeight={rowHeight}
            getRowHeight={getRowHeight}
            visibleColumnIndices={visibleColumnIndices}
          />
        ))}
        {renderPaddingRows &&
          Array.from({ length: paddingRowCount }).map((_, rowIndex) => (
            <div
              key={`padding-${rowIndex}`}
              role="row"
              aria-hidden="true"
              className="grid"
              style={{ gridTemplateColumns }}
            >
              {placeholderCols.map((col, colIndex) => {
                if (visibleColumnIndices && !visibleColumnIndices.has(colIndex)) {
                  return null;
                }
                const columnId =
                  col.id ?? (col as { accessorKey?: string }).accessorKey ?? `col-${colIndex}`;
                const stickyInfo = stickyColumnPositions.get(columnId);
                const isSticky = !!stickyInfo;
                return (
                  <div
                    key={colIndex}
                    role="gridcell"
                    aria-hidden="true"
                    className={cn(
                      'padding-x-10 flex items-center',
                      'border-r-default border-b-default last:border-r-0',
                      'bg-default',
                      isSticky ? 'sticky z-10' : 'relative z-[1]'
                    )}
                    style={{
                      height: rowHeight,
                      minWidth: 0,
                      ...(visibleColumnIndices
                        ? { gridColumn: `${colIndex + 1} / ${colIndex + 2}` }
                        : undefined),
                      ...(isSticky
                        ? { left: stickyInfo.leftOffset, width: stickyInfo.width }
                        : undefined),
                    }}
                  />
                );
              })}
            </div>
          ))}
      </div>
    );
  }

  const virtualItems = virtualizer.getVirtualItems();

  return (
    <div
      ref={containerRef}
      role="rowgroup"
      className={cn(
        'relative',
        showLoadingOverlay && 'opacity-60 pointer-events-none'
      )}
      style={{ height: `${virtualizer.getTotalSize()}px` }}
    >
      {virtualItems.map((virtualRow) => {
        const row = rows[virtualRow.index];
        return (
          <div
            key={row.id}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              transform: `translateY(${virtualRow.start}px)`,
            }}
          >
            <DataGridRow
              row={row}
              gridTemplateColumns={gridTemplateColumns}
              onRowClick={onRowClick}
              showSelectedRowBackground={showSelectedRowBackground}
              stickyColumnPositions={stickyColumnPositions}
              rowHeight={rowHeight}
              getRowHeight={getRowHeight}
            />
          </div>
        );
      })}
    </div>
  );
}
