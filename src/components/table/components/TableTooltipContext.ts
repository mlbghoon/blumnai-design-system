import { createContext, type ReactNode } from 'react';

export interface TableTooltipContextValue {
  showTooltip: (anchor: HTMLElement, content: ReactNode) => void;
  hideTooltip: () => void;
}

export const TableTooltipContext = createContext<TableTooltipContextValue | null>(null);
