import type { Row } from '@tanstack/react-table';

import { cn } from '@/lib/utils';
import { DataGridRow } from './DataGridRow';

interface DataGridBodyProps<T> {
  rows: Row<T>[];
  gridTemplateColumns: string;
  isLoading?: boolean;
  preserveDataWhileLoading?: boolean;
  onRowClick?: (row: T) => void;
  showSelectedRowBackground?: boolean;
}

export function DataGridBody<T>({
  rows,
  gridTemplateColumns,
  isLoading,
  preserveDataWhileLoading,
  onRowClick,
  showSelectedRowBackground,
}: DataGridBodyProps<T>) {
  const showLoadingOverlay = isLoading && preserveDataWhileLoading && rows.length > 0;

  return (
    <div
      role="rowgroup"
      className={cn(
        'relative',
        '[&>*:last-child]:border-b-0',
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
        />
      ))}
    </div>
  );
}
