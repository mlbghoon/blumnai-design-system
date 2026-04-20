// Table (Simple HTML table)
export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from './Table';
export type {
  TableProps,
  TableHeaderProps,
  TableBodyProps,
  TableFooterProps,
  TableRowProps,
  TableHeadProps,
  TableCellProps,
  TableCaptionProps,
} from './Table.types';

// DataGrid (Full-featured with TanStack Table)
export { DataGrid } from './DataGrid';
export type {
  DataGridProps,
  ColumnSizingState,
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  RowSelectionState,
  ColumnOrderState,
  OnChangeFn,
  Row,
} from './DataGrid.types';

// Cell helpers
export {
  CellText,
  CellBadge,
  CellAvatar,
  CellProgress,
  CellLink,
  CellIcon,
  CellDate,
  CellDateRange,
} from './cells';

// Hooks
export { useDataGridTable } from './hooks/useDataGridTable';
export { useGridKeyboardNav } from './hooks/useGridKeyboardNav';

// Font size (shared between Table and DataGrid)
export {
  TableFontSizeContext,
  useTableFontSize,
  getTableFontClasses,
  getDefaultRowHeight,
} from './components/TableFontSizeContext';
export type { TableFontSize } from './components/TableFontSizeContext';
