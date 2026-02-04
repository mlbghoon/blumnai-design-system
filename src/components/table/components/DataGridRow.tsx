import * as React from 'react';
import type { Row } from '@tanstack/react-table';

import { cn } from '@/lib/utils';
import { DataGridCell } from './DataGridCell';

interface DataGridRowProps<T> {
  row: Row<T>;
  gridTemplateColumns: string;
  onRowClick?: (row: T) => void;
  showSelectedRowBackground?: boolean;
}

export function DataGridRow<T>({
  row,
  gridTemplateColumns,
  onRowClick,
  showSelectedRowBackground,
}: DataGridRowProps<T>) {
  const isSelected = row.getIsSelected();
  const canSelect = row.getCanSelect();

  const handleClick = React.useCallback(() => {
    if (onRowClick) {
      onRowClick(row.original);
    }
  }, [onRowClick, row.original]);

  return (
    <div
      role="row"
      className={cn(
        'grid border-b-default transition-colors',
        'hover:bg-basic-gray-alpha-4',
        isSelected && showSelectedRowBackground && 'bg-basic-gray-alpha-4',
        !canSelect && '[&>*]:opacity-50',
        onRowClick && 'cursor-pointer'
      )}
      style={{ gridTemplateColumns }}
      onClick={onRowClick ? handleClick : undefined}
      aria-selected={isSelected}
      data-state={isSelected ? 'selected' : undefined}
    >
      {row.getVisibleCells().map((cell) => (
        <DataGridCell key={cell.id} cell={cell} />
      ))}
    </div>
  );
}
