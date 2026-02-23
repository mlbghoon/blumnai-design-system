import { useMemo, useState, useCallback, useRef, useEffect } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table';
import type {
  SortingState,
  ColumnFiltersState,
  RowSelectionState,
  ColumnOrderState,
  ColumnDef,
  OnChangeFn,
  Row,
} from '@tanstack/react-table';

interface UseDataGridTableOptions<T> {
  data: T[];
  columns: ColumnDef<T>[];
  getRowId?: (row: T) => string;

  sorting?: SortingState;
  onSortingChange?: OnChangeFn<SortingState>;

  columnFilters?: ColumnFiltersState;
  onColumnFiltersChange?: OnChangeFn<ColumnFiltersState>;

  rowSelection?: RowSelectionState;
  onRowSelectionChange?: OnChangeFn<RowSelectionState>;
  enableRowSelection?: boolean | ((row: Row<T>) => boolean);

  enableColumnReorder?: boolean;
  columnOrder?: ColumnOrderState;
  onColumnOrderChange?: OnChangeFn<ColumnOrderState>;

  pagination?: boolean;
  page?: number;
  total?: number;
  limit?: number;
  onPageChange?: (page: number) => void;
  onLimitChange?: (limit: number) => void;

  isLoading?: boolean;
  preserveDataWhileLoading?: boolean;
}

export function useDataGridTable<T>(options: UseDataGridTableOptions<T>) {
  const {
    data,
    columns,
    getRowId,
    sorting: externalSorting,
    onSortingChange: externalOnSortingChange,
    columnFilters: externalColumnFilters,
    onColumnFiltersChange: externalOnColumnFiltersChange,
    rowSelection: externalRowSelection,
    onRowSelectionChange: externalOnRowSelectionChange,
    enableRowSelection,
    enableColumnReorder,
    columnOrder: externalColumnOrder,
    onColumnOrderChange: externalOnColumnOrderChange,
    pagination = true,
    page: externalPage,
    total,
    limit: externalLimit = 10,
    onPageChange,
    onLimitChange,
    isLoading,
    preserveDataWhileLoading,
  } = options;

  const isServerSide = useMemo(() => {
    return (
      onPageChange !== undefined ||
      externalOnSortingChange !== undefined ||
      externalOnColumnFiltersChange !== undefined
    );
  }, [onPageChange, externalOnSortingChange, externalOnColumnFiltersChange]);

  const [internalSorting, setInternalSorting] = useState<SortingState>([]);
  const [internalColumnFilters, setInternalColumnFilters] = useState<ColumnFiltersState>([]);
  const [internalRowSelection, setInternalRowSelection] = useState<RowSelectionState>({});
  const [internalColumnOrder, setInternalColumnOrder] = useState<ColumnOrderState>([]);
  const [internalPage, setInternalPage] = useState(1);
  const [internalLimit, setInternalLimit] = useState(externalLimit);

  const sorting = externalSorting ?? internalSorting;
  const columnFilters = externalColumnFilters ?? internalColumnFilters;
  const rowSelection = externalRowSelection ?? internalRowSelection;
  const columnOrder = externalColumnOrder ?? internalColumnOrder;
  const page = externalPage ?? internalPage;
  const limit = externalLimit ?? internalLimit;

  const handleSortingChange: OnChangeFn<SortingState> = useCallback(
    (updater) => {
      if (externalOnSortingChange) {
        externalOnSortingChange(updater);
      } else {
        setInternalSorting(updater);
      }
    },
    [externalOnSortingChange]
  );

  const handleColumnFiltersChange: OnChangeFn<ColumnFiltersState> = useCallback(
    (updater) => {
      if (externalOnColumnFiltersChange) {
        externalOnColumnFiltersChange(updater);
      } else {
        setInternalColumnFilters(updater);
      }
    },
    [externalOnColumnFiltersChange]
  );

  const handleRowSelectionChange: OnChangeFn<RowSelectionState> = useCallback(
    (updater) => {
      if (externalOnRowSelectionChange) {
        externalOnRowSelectionChange(updater);
      } else {
        setInternalRowSelection(updater);
      }
    },
    [externalOnRowSelectionChange]
  );

  const handleColumnOrderChange: OnChangeFn<ColumnOrderState> = useCallback(
    (updater) => {
      if (externalOnColumnOrderChange) {
        externalOnColumnOrderChange(updater);
      } else {
        setInternalColumnOrder(updater);
      }
    },
    [externalOnColumnOrderChange]
  );

  const handlePageChange = useCallback(
    (newPage: number) => {
      if (onPageChange) {
        onPageChange(newPage);
      } else {
        setInternalPage(newPage);
      }
    },
    [onPageChange]
  );

  const handleLimitChange = useCallback(
    (newLimit: number) => {
      if (onLimitChange) {
        onLimitChange(newLimit);
      } else {
        setInternalLimit(newLimit);
        setInternalPage(1);
      }
    },
    [onLimitChange]
  );

  const previousDataRef = useRef<T[]>(data);

  useEffect(() => {
    if (!isLoading && data.length > 0) {
      previousDataRef.current = data;
    }
  }, [data, isLoading]);

  const displayData = useMemo(() => {
    if (isLoading && preserveDataWhileLoading && previousDataRef.current.length > 0) {
      return previousDataRef.current;
    }
    return data;
  }, [data, isLoading, preserveDataWhileLoading]);

  const totalRows = total ?? displayData.length;
  const totalPages = Math.ceil(totalRows / limit);

  // eslint-disable-next-line react-hooks/incompatible-library -- TanStack Table is a known incompatible library
  const table = useReactTable({
    data: displayData,
    columns,
    getRowId,
    state: {
      sorting,
      columnFilters,
      rowSelection,
      ...(enableColumnReorder ? { columnOrder } : {}),
      pagination: pagination
        ? {
            pageIndex: page - 1,
            pageSize: limit,
          }
        : undefined,
    },
    onSortingChange: handleSortingChange,
    onColumnFiltersChange: handleColumnFiltersChange,
    onRowSelectionChange: handleRowSelectionChange,
    ...(enableColumnReorder ? { onColumnOrderChange: handleColumnOrderChange } : {}),
    enableRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: isServerSide ? undefined : getSortedRowModel(),
    getFilteredRowModel: isServerSide ? undefined : getFilteredRowModel(),
    getPaginationRowModel: isServerSide ? undefined : (pagination ? getPaginationRowModel() : undefined),
    manualSorting: isServerSide,
    manualFiltering: isServerSide,
    manualPagination: isServerSide,
    pageCount: isServerSide ? totalPages : undefined,
  });

  const paginationInfo = useMemo(
    () => ({
      page,
      limit,
      total: totalRows,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
      startIndex: (page - 1) * limit + 1,
      endIndex: Math.min(page * limit, totalRows),
    }),
    [page, limit, totalRows, totalPages]
  );

  return {
    table,
    isServerSide,
    sorting,
    columnFilters,
    rowSelection,
    pagination: paginationInfo,
    handleSortingChange,
    handleColumnFiltersChange,
    handleRowSelectionChange,
    handleColumnOrderChange,
    handlePageChange,
    handleLimitChange,
    displayData,
    isLoading,
    preserveDataWhileLoading,
  };
}
