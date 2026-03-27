import { useState, useCallback } from 'react';
import type { Row } from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';

import { cn } from '@/lib/utils';
import { DataGridRow } from './DataGridRow';
import type { StickyColumnInfo } from '../utils/stickyColumnUtils';

const VIRTUALIZATION_THRESHOLD = 100;

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
}: DataGridBodyProps<T>) {
  const showLoadingOverlay = isLoading && preserveDataWhileLoading && rows.length > 0;
  const useVirtual = rows.length > VIRTUALIZATION_THRESHOLD;

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
    overscan: 10,
  });

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
          />
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
