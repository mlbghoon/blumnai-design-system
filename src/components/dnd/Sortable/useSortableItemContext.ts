'use client';

import { createContext, useContext } from 'react';
import type { DragHandleContextValue } from '../dnd.types';

export const SortableItemContext = createContext<DragHandleContextValue | null>(null);

export function useSortableItemContext() {
  return useContext(SortableItemContext);
}
