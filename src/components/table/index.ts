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
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  RowSelectionState,
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
} from './cells';

// Hooks
export { useDataGridTable } from './hooks/useDataGridTable';
