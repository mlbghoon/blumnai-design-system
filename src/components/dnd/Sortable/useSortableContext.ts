'use client';

import { createContext, useContext } from 'react';

interface SortableContextValue {
  disabled: boolean;
}

export const SortableDisabledContext = createContext<SortableContextValue>({
  disabled: false,
});

export function useSortableDisabledContext() {
  return useContext(SortableDisabledContext);
}
