import type { HeaderGroup, Header } from '@tanstack/react-table';
import { flexRender as render } from '@tanstack/react-table';

import { cn } from '@/lib/utils';
import { Icon } from '../../icons/Icon';

interface DataGridHeaderProps<T> {
  headerGroups: HeaderGroup<T>[];
  gridTemplateColumns: string;
}

function DataGridHeaderCell<T>({ header }: { header: Header<T, unknown> }) {
  const canSort = header.column.getCanSort();
  const sortDirection = header.column.getIsSorted();
  const align = header.column.columnDef.meta?.align ?? 'left';

  return (
    <div
      role="columnheader"
      className={cn(
        'height-32 padding-x-10 flex items-center gap-4',
        'font-body size-xs line-height-leading-4 font-medium text-subtle',
        'border-r-default last:border-r-0',
        align === 'center' && 'justify-center',
        align === 'right' && 'justify-end',
        canSort && 'cursor-pointer select-none hover:bg-basic-gray-alpha-2'
      )}
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
      {canSort && sortDirection && (
        <Icon
          iconType={['arrows', sortDirection === 'asc' ? 'arrow-up-s' : 'arrow-down-s']}
          size={12}
          className="shrink-0 text-subtle"
        />
      )}
    </div>
  );
}

export function DataGridHeader<T>({
  headerGroups,
  gridTemplateColumns,
}: DataGridHeaderProps<T>) {
  return (
    <div
      role="rowgroup"
      className="sticky top-0 z-10 bg-default border-b-default"
    >
      {headerGroups.map((headerGroup) => (
        <div
          key={headerGroup.id}
          role="row"
          className="grid"
          style={{ gridTemplateColumns }}
        >
          {headerGroup.headers.map((header) => (
            <DataGridHeaderCell key={header.id} header={header} />
          ))}
        </div>
      ))}
    </div>
  );
}
