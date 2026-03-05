import type { ColumnDef } from '@tanstack/react-table';

export interface StickyColumnInfo {
  index: number;
  leftOffset: number;
  width: number;
}

function parsePixelWidth(width: string | undefined): number {
  if (!width) return 150;
  const match = width.match(/^(\d+(?:\.\d+)?)(px)?$/);
  if (match) return parseFloat(match[1]);
  return 150;
}

export function calculateStickyPositions<T>(
  columns: ColumnDef<T>[],
  columnSizing?: Record<string, number>
): Map<string, StickyColumnInfo> {
  const result = new Map<string, StickyColumnInfo>();
  let cumulativeOffset = 0;

  columns.forEach((col, index) => {
    const isSticky = col.meta?.sticky === true || col.meta?.sticky === 'left';
    if (!isSticky) return;

    const columnId = col.id ?? (col as { accessorKey?: string }).accessorKey ?? `col-${index}`;
    const width = columnSizing?.[columnId] ?? parsePixelWidth(col.meta?.width);

    result.set(columnId, {
      index,
      leftOffset: cumulativeOffset,
      width,
    });

    cumulativeOffset += width;
  });

  return result;
}
