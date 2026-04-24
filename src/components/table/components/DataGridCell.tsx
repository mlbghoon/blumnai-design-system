import { memo, useMemo } from 'react';
import type { Cell } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';

import { cn } from '@/lib/utils';
import type { StickyColumnInfo } from '../utils/stickyColumnUtils';
import { DataGridCellContext, type DataGridCellContextValue } from './DataGridCellContext';
import { useTableFontSize, getTableFontClasses } from './TableFontSizeContext';

interface DataGridCellProps<T> {
  cell: Cell<T, unknown>;
  stickyInfo?: StickyColumnInfo;
  isRowSelected?: boolean;
  height?: string;
  colIndex?: number;
  gridColumn?: string;
}

function DataGridCellInner<T>({ cell, stickyInfo, isRowSelected, height, colIndex, gridColumn }: DataGridCellProps<T>) {
  const align = cell.column.columnDef.meta?.align ?? 'left';
  const isSticky = !!stickyInfo;
  const fontSize = useTableFontSize();

  const cellContextValue = useMemo<DataGridCellContextValue>(() => ({ align }), [align]);

  return (
    <div
      role="gridcell"
      aria-colindex={colIndex}
      className={cn(
        'group/cell padding-x-10 flex items-center',
        'font-body text-default',
        getTableFontClasses(fontSize),
        'border-r-default border-b-default last:border-r-0',
        'overflow-visible',
        'bg-default',
        isSticky ? 'group-hover:bg-hover-solid' : 'group-hover:bg-basic-gray-alpha-4',
        isRowSelected && (isSticky ? 'bg-hover-solid' : 'bg-basic-gray-alpha-4'),
        align === 'center' && 'justify-center',
        align === 'right' && 'justify-end',
        isSticky ? 'sticky z-10 isolate' : 'relative z-[1]'
      )}
      style={{
        height: height,
        minWidth: 0,
        ...(gridColumn ? { gridColumn } : undefined),
        ...(isSticky ? { left: stickyInfo.leftOffset, width: stickyInfo.width } : undefined),
      }}
    >
      <DataGridCellContext.Provider value={cellContextValue}>
        {/* w-full + truncate 를 유지해야 text-ellipsis 가 동작. 이 경우 outer
            flex 의 justify-* 는 먹지 않으므로 text-align 을 inner div 에 직접
            적용해 align='center'/'right' 를 실제로 반영. */}
        <div
          className={cn(
            'w-full text-ellipsis whitespace-nowrap',
            align === 'center' && 'text-center',
            align === 'right' && 'text-right',
          )}
          style={{ overflow: 'clip', overflowClipMargin: 4 }}
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </div>
      </DataGridCellContext.Provider>
    </div>
  );
}

export const DataGridCell = memo(DataGridCellInner) as typeof DataGridCellInner;
