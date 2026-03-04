import { useCallback, useMemo } from 'react';
import type { HeaderGroup, Header, ColumnOrderState } from '@tanstack/react-table';
import { flexRender as render } from '@tanstack/react-table';
import { SortableContext, useSortable, horizontalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { cn } from '@/lib/utils';
import { Icon } from '../../icons/Icon';
import { TooltipTrigger } from '../../tooltip';
import { DndContext } from '../../dnd';
import type { StickyColumnInfo } from '../utils/stickyColumnUtils';

interface DataGridHeaderProps<T> {
  headerGroups: HeaderGroup<T>[];
  gridTemplateColumns: string;
  stickyColumnPositions: Map<string, StickyColumnInfo>;
  headerHeight?: string;
  enableColumnReorder?: boolean;
  onColumnOrderChange?: (updater: ColumnOrderState | ((prev: ColumnOrderState) => ColumnOrderState)) => void;
}

interface DataGridHeaderCellProps<T> {
  header: Header<T, unknown>;
  stickyInfo?: StickyColumnInfo;
  headerHeight?: string;
  colIndex?: number;
}

function DataGridHeaderCell<T>({ header, stickyInfo, headerHeight, colIndex }: DataGridHeaderCellProps<T>) {
  const canSort = header.column.getCanSort();
  const sortDirection = header.column.getIsSorted();
  const sortIndex = header.column.getSortIndex();
  const align = header.column.columnDef.meta?.headerAlign ?? header.column.columnDef.meta?.align ?? 'left';
  const headerTooltip = header.column.columnDef.meta?.headerTooltip;

  const getSortIcon = () => {
    if (!sortDirection) return 'expand-up-down';
    return sortDirection === 'asc' ? 'arrow-up-s' : 'arrow-down-s';
  };

  const isSticky = !!stickyInfo;

  const headerContent = (
    <span className="truncate">
      {header.isPlaceholder
        ? null
        : render(header.column.columnDef.header, header.getContext())}
    </span>
  );

  return (
    <div
      role="columnheader"
      aria-colindex={colIndex}
      className={cn(
        'padding-x-10 flex items-center ds-gap-4',
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
      {headerTooltip ? (
        <TooltipTrigger content={headerTooltip} placement="top">
          {headerContent}
        </TooltipTrigger>
      ) : (
        headerContent
      )}
      {canSort && (
        <div className="flex items-center ds-gap-1 shrink-0">
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

interface SortableHeaderCellProps<T> {
  header: Header<T, unknown>;
  stickyInfo?: StickyColumnInfo;
  headerHeight?: string;
  colIndex?: number;
}

const noAnimateLayoutChanges = () => false;

function SortableHeaderCell<T>({ header, stickyInfo, headerHeight, colIndex }: SortableHeaderCellProps<T>) {
  const isFixed = !!stickyInfo || header.column.id === 'select';

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: header.column.id,
    disabled: isFixed,
    animateLayoutChanges: noAnimateLayoutChanges,
  });

  const canSort = header.column.getCanSort();
  const sortDirection = header.column.getIsSorted();
  const sortIndex = header.column.getSortIndex();
  const align = header.column.columnDef.meta?.headerAlign ?? header.column.columnDef.meta?.align ?? 'left';
  const headerTooltip = header.column.columnDef.meta?.headerTooltip;

  const getSortIcon = () => {
    if (!sortDirection) return 'expand-up-down';
    return sortDirection === 'asc' ? 'arrow-up-s' : 'arrow-down-s';
  };

  const isSticky = !!stickyInfo;

  const style: React.CSSProperties = {
    height: headerHeight ?? '32px',
    ...(isSticky ? { left: stickyInfo.leftOffset, width: stickyInfo.width } : undefined),
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const headerContent = (
    <span className="truncate">
      {header.isPlaceholder
        ? null
        : render(header.column.columnDef.header, header.getContext())}
    </span>
  );

  return (
    <div
      ref={setNodeRef}
      role="columnheader"
      aria-colindex={colIndex}
      className={cn(
        'padding-x-10 flex items-center ds-gap-4',
        'font-body size-xs line-height-leading-4 font-medium text-subtle',
        'border-r-default last:border-r-0',
        align === 'center' && 'justify-center',
        align === 'right' && 'justify-end',
        'bg-default',
        canSort && 'cursor-pointer select-none',
        isSticky ? 'sticky z-10' : 'relative z-[1]',
        isDragging && 'opacity-50 z-50'
      )}
      style={style}
      onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
      aria-sort={
        sortDirection === 'asc'
          ? 'ascending'
          : sortDirection === 'desc'
            ? 'descending'
            : undefined
      }
      {...(isFixed ? {} : { ...attributes, ...listeners })}
    >
      {!isFixed && (
        <Icon
          iconType={['editor', 'draggable']}
          size={12}
          className="shrink-0 text-hint"
        />
      )}
      {headerTooltip ? (
        <TooltipTrigger content={headerTooltip} placement="top">
          {headerContent}
        </TooltipTrigger>
      ) : (
        headerContent
      )}
      {canSort && (
        <div className="flex items-center ds-gap-1 shrink-0">
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

interface SortableHeaderRowProps<T> {
  headerGroup: HeaderGroup<T>;
  gridTemplateColumns: string;
  stickyColumnPositions: Map<string, StickyColumnInfo>;
  headerHeight?: string;
  onColumnOrderChange: (updater: ColumnOrderState | ((prev: ColumnOrderState) => ColumnOrderState)) => void;
}

function SortableHeaderRow<T>({
  headerGroup,
  gridTemplateColumns,
  stickyColumnPositions,
  headerHeight,
  onColumnOrderChange,
}: SortableHeaderRowProps<T>) {
  const columnIds = useMemo(
    () => headerGroup.headers.map((h) => h.column.id),
    [headerGroup.headers]
  );

  const handleDragEnd = useCallback(
    (event: { active: { id: string | number }; over: { id: string | number } | null }) => {
      const { active, over } = event;
      if (over && active.id !== over.id) {
        const oldIndex = columnIds.indexOf(active.id as string);
        const newIndex = columnIds.indexOf(over.id as string);
        if (oldIndex !== -1 && newIndex !== -1) {
          onColumnOrderChange(arrayMove(columnIds, oldIndex, newIndex));
        }
      }
    },
    [columnIds, onColumnOrderChange]
  );

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <SortableContext items={columnIds} strategy={horizontalListSortingStrategy}>
        <div role="row" className="grid" style={{ gridTemplateColumns }}>
          {headerGroup.headers.map((header, index) => (
            <SortableHeaderCell
              key={header.id}
              header={header}
              stickyInfo={stickyColumnPositions.get(header.column.id)}
              headerHeight={headerHeight}
              colIndex={index + 1}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

export function DataGridHeader<T>({
  headerGroups,
  gridTemplateColumns,
  stickyColumnPositions,
  headerHeight,
  enableColumnReorder,
  onColumnOrderChange,
}: DataGridHeaderProps<T>) {
  return (
    <div
      role="rowgroup"
      className="sticky top-0 z-20 bg-default border-b-default"
    >
      {headerGroups.map((headerGroup) =>
        enableColumnReorder && onColumnOrderChange ? (
          <SortableHeaderRow
            key={headerGroup.id}
            headerGroup={headerGroup}
            gridTemplateColumns={gridTemplateColumns}
            stickyColumnPositions={stickyColumnPositions}
            headerHeight={headerHeight}
            onColumnOrderChange={onColumnOrderChange}
          />
        ) : (
          <div
            key={headerGroup.id}
            role="row"
            className="grid"
            style={{ gridTemplateColumns }}
          >
            {headerGroup.headers.map((header, index) => (
              <DataGridHeaderCell
                key={header.id}
                header={header}
                stickyInfo={stickyColumnPositions.get(header.column.id)}
                headerHeight={headerHeight}
                colIndex={index + 1}
              />
            ))}
          </div>
        )
      )}
    </div>
  );
}
