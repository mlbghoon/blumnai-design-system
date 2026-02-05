import { useContext } from 'react';

import { TableTooltipContext, type TableTooltipContextValue } from './TableTooltipContext';

export function useTableTooltip(): TableTooltipContextValue {
  const context = useContext(TableTooltipContext);
  if (!context) {
    throw new Error('useTableTooltip must be used within a TableTooltipProvider');
  }
  return context;
}

export function useTableTooltipOptional(): TableTooltipContextValue | null {
  return useContext(TableTooltipContext);
}
