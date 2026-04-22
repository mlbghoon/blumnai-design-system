import type { ColumnDef } from '@tanstack/react-table';

import { cn } from '@/lib/utils';
import type { DataGridFooterRow } from '../DataGrid.types';
import type { StickyColumnInfo } from '../utils/stickyColumnUtils';
import { useTableFontSize, getTableFontClasses } from './TableFontSizeContext';

interface DataGridFooterProps<T> {
  columns: ColumnDef<T>[];
  gridTemplateColumns: string;
  stickyColumnPositions: Map<string, StickyColumnInfo>;
  rowHeight?: string;
  footerRow: DataGridFooterRow;
  visibleColumnIndices?: Set<number>;
}

function getColumnId<T>(col: ColumnDef<T>, index: number): string {
  return col.id ?? (col as { accessorKey?: string }).accessorKey ?? `col-${index}`;
}

export function DataGridFooter<T>({
  columns,
  gridTemplateColumns,
  stickyColumnPositions,
  rowHeight,
  footerRow,
  visibleColumnIndices,
}: DataGridFooterProps<T>) {
  const fontSize = useTableFontSize();
  const fontClasses = getTableFontClasses(fontSize);

  return (
    <div
      role="rowgroup"
      className="sticky bottom-0 z-20 bg-muted border-t-default"
    >
      <div
        role="row"
        className="grid"
        style={{ gridTemplateColumns }}
      >
        {columns.map((col, index) => {
          if (visibleColumnIndices && !visibleColumnIndices.has(index)) {
            return null;
          }
          const id = getColumnId(col, index);
          const stickyInfo = stickyColumnPositions.get(id);
          const isSticky = !!stickyInfo;
          const align = col.meta?.align ?? 'left';
          const content = footerRow[id] ?? null;

          return (
            <div
              key={id}
              role="gridcell"
              aria-colindex={index + 1}
              className={cn(
                'padding-x-10 flex items-center',
                'font-body font-medium text-default',
                fontClasses,
                'border-r-default last:border-r-0',
                'bg-muted',
                align === 'center' && 'justify-center',
                align === 'right' && 'justify-end',
                isSticky ? 'sticky z-10 isolate' : 'relative z-[1]',
              )}
              style={{
                gridColumn: `${index + 1} / ${index + 2}`,
                height: rowHeight,
                minWidth: 0,
                ...(isSticky
                  ? { left: stickyInfo.leftOffset, width: stickyInfo.width }
                  : undefined),
              }}
            >
              <div
                className="w-full text-ellipsis whitespace-nowrap"
                style={{ overflow: 'clip', overflowClipMargin: 4 }}
              >
                {content}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
