import * as React from 'react';
import { useMemo } from 'react';

import { cn } from '@/lib/utils';
import { useDataGridTable } from './hooks/useDataGridTable';
import { useGridKeyboardNav } from './hooks/useGridKeyboardNav';
import { DataGridHeader } from './components/DataGridHeader';
import { DataGridBody } from './components/DataGridBody';
import { DataGridPagination } from './components/DataGridPagination';
import { DataGridLoading } from './components/DataGridLoading';
import { DataGridEmpty } from './components/DataGridEmpty';
import { DataGridError } from './components/DataGridError';
import { TableTooltipProvider } from './components/TableTooltip';
import { ScrollArea } from '../scroll-area';
import { calculateStickyPositions } from './utils/stickyColumnUtils';
import type { DataGridProps } from './DataGrid.types';

/**
 * DataGrid 컴포넌트
 *
 * TanStack Table 기반의 데이터 그리드입니다. 정렬, 필터, 페이지네이션, 행 선택을 지원합니다.
 *
 * @example
 * <DataGrid columns={columns} data={data} enableSorting enableRowSelection />
 */
function DataGridInner<T>(
  {
    data,
    columns,
    getRowId,
    sorting,
    onSortingChange,
    columnFilters,
    onColumnFiltersChange,
    rowSelection,
    onRowSelectionChange,
    enableRowSelection,
    enableColumnReorder,
    columnOrder,
    onColumnOrderChange,
    enableColumnResize,
    columnSizing: externalColumnSizing,
    onColumnSizingChange,
    pagination = true,
    page,
    total,
    limit,
    limitOptions,
    limitOptionLabel,
    onPageChange,
    onLimitChange,
    pageChangeConfirmMessage,
    paginationAlign = 'right',
    paginationVariant = 'numbered',
    maxVisiblePages,
    paginationDisabled,
    hideNavButtons,
    resultTextFormatter,
    showItemCount = true,
    isLoading,
    preserveDataWhileLoading,
    minHeight,
    maxHeight,
    headerHeight,
    rowHeight,
    getRowHeight,
    emptyText,
    emptyContent,
    error,
    onRetry,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    className,
    onRowClick,
    showSelectedRowBackground = true,
  }: DataGridProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const {
    table,
    pagination: paginationInfo,
    handlePageChange,
    handleLimitChange,
    handleColumnOrderChange,
    columnSizing,
    handleColumnSizingChange,
    displayData,
  } = useDataGridTable({
    data,
    columns,
    getRowId,
    sorting,
    onSortingChange,
    columnFilters,
    onColumnFiltersChange,
    rowSelection,
    onRowSelectionChange,
    enableRowSelection,
    enableColumnReorder,
    columnOrder,
    onColumnOrderChange,
    enableColumnResize,
    columnSizing: externalColumnSizing,
    onColumnSizingChange,
    pagination,
    page,
    total,
    limit,
    onPageChange,
    onLimitChange,
    isLoading,
    preserveDataWhileLoading,
  });

  const headerGroups = table.getHeaderGroups();
  const orderedHeaders = useMemo(
    () => headerGroups[0]?.headers ?? [],
    [headerGroups]
  );

  const gridTemplateColumns = useMemo(() => {
    const cols = enableColumnReorder && orderedHeaders.length > 0
      ? orderedHeaders.map((h) => ({
          id: h.column.id,
          width: h.column.columnDef.meta?.width ?? '1fr',
        }))
      : columns.map((col) => ({
          id: col.id ?? (col as { accessorKey?: string }).accessorKey ?? '',
          width: col.meta?.width ?? '1fr',
        }));

    return cols
      .map((c) =>
        enableColumnResize && columnSizing[c.id]
          ? `${columnSizing[c.id]}px`
          : c.width
      )
      .join(' ');
  }, [enableColumnReorder, orderedHeaders, columns, enableColumnResize, columnSizing]);

  const stickyColumnPositions = useMemo(() => {
    const sizing = enableColumnResize ? columnSizing : undefined;
    if (enableColumnReorder && orderedHeaders.length > 0) {
      const orderedColumnDefs = orderedHeaders.map((h) => h.column.columnDef);
      return calculateStickyPositions(orderedColumnDefs, sizing);
    }
    return calculateStickyPositions(columns, sizing);
  }, [enableColumnReorder, orderedHeaders, columns, enableColumnResize, columnSizing]);

  const orderedColumns = useMemo(() => {
    if (enableColumnReorder && orderedHeaders.length > 0) {
      return orderedHeaders.map((h) => h.column.columnDef);
    }
    return columns;
  }, [enableColumnReorder, orderedHeaders, columns]);
  const rows = table.getRowModel().rows;
  const hasData = displayData.length > 0;
  const showSkeletonLoading = isLoading && !preserveDataWhileLoading && !hasData;
  const showOverlayLoading = isLoading && preserveDataWhileLoading && hasData;
  const showEmptyState = !isLoading && !hasData && !error;
  const showErrorState = !!error;

  const { gridRef, handleKeyDown } = useGridKeyboardNav({
    rowCount: rows.length + 1,
    colCount: columns.length,
  });

  const mergedRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      gridRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }
    },
    [ref, gridRef]
  );

  return (
    <TableTooltipProvider>
      <div
        ref={mergedRef}
        role="grid"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-busy={isLoading || undefined}
        aria-rowcount={total ?? data.length}
        aria-colcount={columns.length}
        onKeyDown={handleKeyDown}
        className={cn(
          'relative overflow-hidden bg-default border-default rounded-lg',
          className
        )}
      >
        <ScrollArea
          orientation="both"
          maxHeight={maxHeight}
          style={{ minHeight }}
        >
          <DataGridHeader
            headerGroups={headerGroups}
            gridTemplateColumns={gridTemplateColumns}
            stickyColumnPositions={stickyColumnPositions}
            headerHeight={headerHeight}
            enableColumnReorder={enableColumnReorder}
            onColumnOrderChange={handleColumnOrderChange}
            enableColumnResize={enableColumnResize}
            columnSizing={columnSizing}
            onColumnSizingChange={handleColumnSizingChange}
          />

          {showErrorState ? (
            <DataGridError error={error} onRetry={onRetry} />
          ) : showEmptyState ? (
            <DataGridEmpty text={emptyText} content={emptyContent} />
          ) : showSkeletonLoading ? (
            <DataGridLoading
              columns={orderedColumns}
              gridTemplateColumns={gridTemplateColumns}
              rowCount={limit}
              stickyColumnPositions={stickyColumnPositions}
              rowHeight={rowHeight}
            />
          ) : (
            <DataGridBody
              rows={rows}
              gridTemplateColumns={gridTemplateColumns}
              isLoading={isLoading}
              preserveDataWhileLoading={preserveDataWhileLoading}
              onRowClick={onRowClick}
              showSelectedRowBackground={showSelectedRowBackground}
              stickyColumnPositions={stickyColumnPositions}
              rowHeight={rowHeight}
              getRowHeight={getRowHeight}
            />
          )}

          {showOverlayLoading && (
            <DataGridLoading
              columns={orderedColumns}
              gridTemplateColumns={gridTemplateColumns}
              overlay
              stickyColumnPositions={stickyColumnPositions}
              rowHeight={rowHeight}
            />
          )}
        </ScrollArea>

        {pagination && hasData && !showErrorState && (
          <DataGridPagination
            page={paginationInfo.page}
            totalPages={paginationInfo.totalPages}
            total={paginationInfo.total}
            limit={paginationInfo.limit}
            limitOptions={limitOptions}
            limitOptionLabel={limitOptionLabel}
            startIndex={paginationInfo.startIndex}
            endIndex={paginationInfo.endIndex}
            onPageChange={handlePageChange}
            onLimitChange={onLimitChange ? handleLimitChange : undefined}
            pageChangeConfirmMessage={pageChangeConfirmMessage}
            align={paginationAlign}
            variant={paginationVariant}
            maxVisiblePages={maxVisiblePages}
            disabled={paginationDisabled}
            hideNavButtons={hideNavButtons}
            resultTextFormatter={resultTextFormatter}
            showItemCount={showItemCount}
          />
        )}
      </div>
    </TableTooltipProvider>
  );
}

export const DataGrid = React.forwardRef(DataGridInner) as <T>(
  props: DataGridProps<T> & { ref?: React.ForwardedRef<HTMLDivElement> }
) => ReturnType<typeof DataGridInner>;
