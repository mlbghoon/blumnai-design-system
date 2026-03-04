import { useContext } from 'react';

import { DataGridCellContext, type CellAlign } from './DataGridCellContext';

export function useCellAlign(): CellAlign {
  const context = useContext(DataGridCellContext);
  return context?.align ?? 'left';
}
