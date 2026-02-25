import type { ColumnDef } from '@tanstack/react-table';
import { cn } from '@/lib/utils';
import type { StickyColumnInfo } from '../utils/stickyColumnUtils';

interface DataGridLoadingProps<T> {
  columns: ColumnDef<T>[];
  gridTemplateColumns: string;
  rowCount?: number;
  overlay?: boolean;
  stickyColumnPositions: Map<string, StickyColumnInfo>;
  rowHeight?: string;
}

export function DataGridLoading<T>({
  columns,
  gridTemplateColumns,
  rowCount = 5,
  overlay = false,
  stickyColumnPositions,
  rowHeight,
}: DataGridLoadingProps<T>) {
  if (overlay) {
    return (
      <div role="status" aria-label="로딩 중" className="absolute inset-0 flex items-center justify-center bg-default/80 z-20">
        <div className="flex items-center ds-gap-8">
          <div className="width-20 height-20 border-2 border-state-primary border-t-transparent rounded-full animate-spin" aria-hidden="true" />
          <span className="font-body size-sm text-subtle">로딩 중...</span>
        </div>
      </div>
    );
  }

  const height = rowHeight ?? '32px';

  return (
    <div role="rowgroup">
      {Array.from({ length: rowCount }).map((_, rowIndex) => (
        <div
          key={rowIndex}
          role="row"
          className="grid animate-pulse group"
          style={{ gridTemplateColumns }}
        >
          {columns.map((col, colIndex) => {
            const columnId = col.id ?? (col as { accessorKey?: string }).accessorKey ?? `col-${colIndex}`;
            const stickyInfo = stickyColumnPositions.get(columnId);
            const isSticky = !!stickyInfo;

            return (
              <div
                key={colIndex}
                role="cell"
                className={cn(
                  'padding-x-10 flex items-center',
                  'border-r-default border-b-default last:border-r-0',
                  'bg-default',
                  isSticky ? 'sticky z-[100]' : 'relative z-[1]'
                )}
                style={{
                  height,
                  ...(isSticky ? { left: stickyInfo.leftOffset, width: stickyInfo.width } : undefined),
                }}
              >
                <div
                  className="height-16 bg-basic-gray-alpha-10 rounded"
                  style={{
                    width: `${((rowIndex * 7 + colIndex * 13 + 5) % 40) + 40}%`,
                  }}
                />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
