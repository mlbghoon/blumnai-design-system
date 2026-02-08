'use client';

import { useCallback, useMemo } from 'react';
import {
  SortableContext,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
  rectSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import { DndContext } from '../DndContext';
import { SortableDisabledContext } from './useSortableContext';
import type { SortableProps, DndItem, DragEndEvent, SortableStrategy } from '../dnd.types';

function getStrategy(strategy: SortableStrategy) {
  switch (strategy) {
    case 'horizontal':
      return horizontalListSortingStrategy;
    case 'grid':
      return rectSortingStrategy;
    case 'vertical':
    default:
      return verticalListSortingStrategy;
  }
}

export function Sortable<T extends DndItem>({
  items,
  children,
  onReorder,
  strategy = 'vertical',
  disabled = false,
  id,
}: SortableProps<T>) {
  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (over && active.id !== over.id) {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        if (oldIndex !== -1 && newIndex !== -1) {
          const newItems = arrayMove(items, oldIndex, newIndex);
          onReorder?.(newItems);
        }
      }
    },
    [items, onReorder]
  );

  const itemIds = items.map((item) => item.id);
  const sortingStrategy = getStrategy(strategy);

  const contextValue = useMemo(() => ({ disabled }), [disabled]);

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <SortableDisabledContext.Provider value={contextValue}>
        <SortableContext
          id={id?.toString()}
          items={itemIds}
          strategy={sortingStrategy}
          disabled={disabled}
        >
          {children}
        </SortableContext>
      </SortableDisabledContext.Provider>
    </DndContext>
  );
}
