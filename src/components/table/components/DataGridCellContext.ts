import { createContext } from 'react';

export type CellAlign = 'left' | 'center' | 'right';

export interface DataGridCellContextValue {
  align: CellAlign;
}

export const DataGridCellContext = createContext<DataGridCellContextValue | null>(null);
