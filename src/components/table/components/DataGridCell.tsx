import { useMemo } from 'react';
import type { Cell } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';

import { cn } from '@/lib/utils';
import type { StickyColumnInfo } from '../utils/stickyColumnUtils';
import { DataGridCellContext, type DataGridCellContextValue } from './DataGridCellContext';

interface DataGridCellProps<T> {
  cell: Cell<T, unknown>;
  stickyInfo?: StickyColumnInfo;
  isRowSelected?: boolean;
  height?: string;
  colIndex?: number;
}

export function DataGridCell<T>({ cell, stickyInfo, isRowSelected, height, colIndex }: DataGridCellProps<T>) {
  const align = cell.column.columnDef.meta?.align ?? 'left';
  const isSticky = !!stickyInfo;

  const cellContextValue = useMemo<DataGridCellContextValue>(() => ({ align }), [align]);

  return (
    <div
      role="gridcell"
      aria-colindex={colIndex}
      className={cn(
        'padding-x-10 flex items-center',
        'font-body size-xs line-height-leading-4 text-default',
        'border-r-default border-b-default last:border-r-0',
        'overflow-hidden min-w-[0px]',
        'bg-default',
        isSticky ? 'group-hover:bg-hover-solid' : 'group-hover:bg-basic-gray-alpha-4',
        isRowSelected && (isSticky ? 'bg-hover-solid' : 'bg-basic-gray-alpha-4'),
        align === 'center' && 'justify-center',
        align === 'right' && 'justify-end',
        isSticky ? 'sticky z-10 isolate' : 'relative z-[1]'
      )}
      style={{
        height: height ?? '32px',
        ...(isSticky ? { left: stickyInfo.leftOffset, width: stickyInfo.width } : undefined),
      }}
    >
      <DataGridCellContext.Provider value={cellContextValue}>
        {flexRender(cell.column.columnDef.cell, cell.getContext())}
      </DataGridCellContext.Provider>
    </div>
  );
}
