import * as React from 'react';
import type { Row } from '@tanstack/react-table';

import { cn } from '@/lib/utils';
import { DataGridCell } from './DataGridCell';
import type { StickyColumnInfo } from '../utils/stickyColumnUtils';

interface DataGridRowProps<T> {
  row: Row<T>;
  gridTemplateColumns: string;
  onRowClick?: (row: T) => void;
  showSelectedRowBackground?: boolean;
  stickyColumnPositions: Map<string, StickyColumnInfo>;
  rowHeight?: string;
  getRowHeight?: (row: T) => string | undefined;
}

export function DataGridRow<T>({
  row,
  gridTemplateColumns,
  onRowClick,
  showSelectedRowBackground,
  stickyColumnPositions,
  rowHeight,
  getRowHeight,
}: DataGridRowProps<T>) {
  const isSelected = row.getIsSelected();
  const canSelect = row.getCanSelect();

  const handleClick = React.useCallback(() => {
    if (onRowClick) {
      onRowClick(row.original);
    }
  }, [onRowClick, row.original]);

  const height = getRowHeight?.(row.original) ?? rowHeight ?? '32px';

  return (
    <div
      role="row"
      className={cn(
        'grid group',
        !canSelect && '[&>*]:opacity-50',
        onRowClick && canSelect !== false && 'cursor-pointer'
      )}
      style={{ gridTemplateColumns }}
      onClick={onRowClick && canSelect !== false ? handleClick : undefined}
      aria-selected={isSelected}
      aria-disabled={!canSelect || undefined}
      data-state={isSelected ? 'selected' : undefined}
    >
      {row.getVisibleCells().map((cell, index) => (
        <DataGridCell
          key={cell.id}
          cell={cell}
          stickyInfo={stickyColumnPositions.get(cell.column.id)}
          isRowSelected={isSelected && showSelectedRowBackground}
          height={height}
          colIndex={index + 1}
        />
      ))}
    </div>
  );
}
