'use client';

import { createContext, useContext } from 'react';
import type { DragHandleContextValue } from './dnd.types';

export const DraggableContext = createContext<DragHandleContextValue | null>(null);

export function useDraggableContext() {
  return useContext(DraggableContext);
}
