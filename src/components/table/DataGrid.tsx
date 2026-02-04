import * as React from 'react';
import { useMemo } from 'react';

import { cn } from '@/lib/utils';
import { useDataGridTable } from './hooks/useDataGridTable';
import { DataGridHeader } from './components/DataGridHeader';
import { DataGridBody } from './components/DataGridBody';
import { DataGridPagination } from './components/DataGridPagination';
import { DataGridLoading } from './components/DataGridLoading';
import { DataGridEmpty } from './components/DataGridEmpty';
import { DataGridError } from './components/DataGridError';
import type { DataGridProps } from './DataGrid.types';

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
    showItemCount = true,
    isLoading,
    preserveDataWhileLoading,
    minHeight,
    maxHeight,
    emptyText,
    emptyContent,
    error,
    onRetry,
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
    pagination,
    page,
    total,
    limit,
    onPageChange,
    onLimitChange,
    isLoading,
    preserveDataWhileLoading,
  });

  const gridTemplateColumns = useMemo(() => {
    return columns
      .map((col) => col.meta?.width ?? '1fr')
      .join(' ');
  }, [columns]);

  const headerGroups = table.getHeaderGroups();
  const rows = table.getRowModel().rows;
  const hasData = displayData.length > 0;
  const showSkeletonLoading = isLoading && !preserveDataWhileLoading && !hasData;
  const showOverlayLoading = isLoading && preserveDataWhileLoading && hasData;
  const showEmptyState = !isLoading && !hasData && !error;
  const showErrorState = !!error;

  return (
    <div
      ref={ref}
      role="grid"
      className={cn(
        'relative overflow-hidden bg-default border-default rounded-lg',
        className
      )}
    >
      <div
        className="overflow-auto"
        style={{
          minHeight,
          maxHeight,
        }}
      >
        <DataGridHeader
          headerGroups={headerGroups}
          gridTemplateColumns={gridTemplateColumns}
        />

        {showErrorState ? (
          <DataGridError error={error} onRetry={onRetry} />
        ) : showEmptyState ? (
          <DataGridEmpty text={emptyText} content={emptyContent} />
        ) : showSkeletonLoading ? (
          <DataGridLoading
            gridTemplateColumns={gridTemplateColumns}
            rowCount={limit}
          />
        ) : (
          <DataGridBody
            rows={rows}
            gridTemplateColumns={gridTemplateColumns}
            isLoading={isLoading}
            preserveDataWhileLoading={preserveDataWhileLoading}
            onRowClick={onRowClick}
            showSelectedRowBackground={showSelectedRowBackground}
          />
        )}

        {showOverlayLoading && (
          <DataGridLoading
            gridTemplateColumns={gridTemplateColumns}
            overlay
          />
        )}
      </div>

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
          showItemCount={showItemCount}
        />
      )}
    </div>
  );
}

export const DataGrid = React.forwardRef(DataGridInner) as <T>(
  props: DataGridProps<T> & { ref?: React.ForwardedRef<HTMLDivElement> }
) => ReturnType<typeof DataGridInner>;
