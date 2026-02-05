import type { HeaderGroup, Header } from '@tanstack/react-table';
import { flexRender as render } from '@tanstack/react-table';

import { cn } from '@/lib/utils';
import { Icon } from '../../icons/Icon';
import type { StickyColumnInfo } from '../utils/stickyColumnUtils';

interface DataGridHeaderProps<T> {
  headerGroups: HeaderGroup<T>[];
  gridTemplateColumns: string;
  stickyColumnPositions: Map<string, StickyColumnInfo>;
  headerHeight?: string;
}

interface DataGridHeaderCellProps<T> {
  header: Header<T, unknown>;
  stickyInfo?: StickyColumnInfo;
  headerHeight?: string;
}

function DataGridHeaderCell<T>({ header, stickyInfo, headerHeight }: DataGridHeaderCellProps<T>) {
  const canSort = header.column.getCanSort();
  const sortDirection = header.column.getIsSorted();
  const sortIndex = header.column.getSortIndex();
  const align = header.column.columnDef.meta?.align ?? 'left';

  const getSortIcon = () => {
    if (!sortDirection) return 'expand-up-down';
    return sortDirection === 'asc' ? 'arrow-up-s' : 'arrow-down-s';
  };

  const isSticky = !!stickyInfo;

  return (
    <div
      role="columnheader"
      className={cn(
        'padding-x-10 flex items-center gap-4',
        'font-body size-xs line-height-leading-4 font-medium text-subtle',
        'border-r-default last:border-r-0',
        align === 'center' && 'justify-center',
        align === 'right' && 'justify-end',
        'bg-default',
        canSort && 'cursor-pointer select-none',
        isSticky ? 'sticky z-10' : 'relative z-[1]'
      )}
      style={{
        height: headerHeight ?? '32px',
        ...(isSticky ? { left: stickyInfo.leftOffset, width: stickyInfo.width } : undefined),
      }}
      onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
      aria-sort={
        sortDirection === 'asc'
          ? 'ascending'
          : sortDirection === 'desc'
            ? 'descending'
            : undefined
      }
    >
      <span className="truncate">
        {header.isPlaceholder
          ? null
          : render(header.column.columnDef.header, header.getContext())}
      </span>
      {canSort && (
        <div className="flex items-center gap-1 shrink-0">
          <Icon
            iconType={['arrows', getSortIcon()]}
            size={12}
            className={sortDirection ? 'text-subtle' : 'text-hint'}
          />
          {sortIndex > 0 && (
            <span className="size-2xs text-hint">{sortIndex + 1}</span>
          )}
        </div>
      )}
    </div>
  );
}

export function DataGridHeader<T>({
  headerGroups,
  gridTemplateColumns,
  stickyColumnPositions,
  headerHeight,
}: DataGridHeaderProps<T>) {
  return (
    <div
      role="rowgroup"
      className="sticky top-0 z-20 bg-default border-b-default"
    >
      {headerGroups.map((headerGroup) => (
        <div
          key={headerGroup.id}
          role="row"
          className="grid"
          style={{ gridTemplateColumns }}
        >
          {headerGroup.headers.map((header) => (
            <DataGridHeaderCell
              key={header.id}
              header={header}
              stickyInfo={stickyColumnPositions.get(header.column.id)}
              headerHeight={headerHeight}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
