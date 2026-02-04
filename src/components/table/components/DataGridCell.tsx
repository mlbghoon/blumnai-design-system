import type { Cell } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';

import { cn } from '@/lib/utils';

interface DataGridCellProps<T> {
  cell: Cell<T, unknown>;
}

export function DataGridCell<T>({ cell }: DataGridCellProps<T>) {
  const align = cell.column.columnDef.meta?.align ?? 'left';

  return (
    <div
      role="gridcell"
      className={cn(
        'height-32 padding-x-10 flex items-center',
        'font-body size-xs line-height-leading-4 text-default',
        'border-r-default last:border-r-0',
        'overflow-hidden',
        align === 'center' && 'justify-center',
        align === 'right' && 'justify-end'
      )}
    >
      <span className="truncate">
        {flexRender(cell.column.columnDef.cell, cell.getContext())}
      </span>
    </div>
  );
}
