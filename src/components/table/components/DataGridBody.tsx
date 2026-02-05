import type { Row } from '@tanstack/react-table';

import { cn } from '@/lib/utils';
import { DataGridRow } from './DataGridRow';
import type { StickyColumnInfo } from '../utils/stickyColumnUtils';

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
