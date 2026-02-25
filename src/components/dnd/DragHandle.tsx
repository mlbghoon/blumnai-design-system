'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Icon } from '@/components/icons';
import { useDraggableContext } from './useDraggableContext';
import { useSortableItemContext } from './Sortable/useSortableItemContext';
import type { DragHandleProps } from './dnd.types';

export const DragHandle = forwardRef<HTMLButtonElement, DragHandleProps>(
  function DragHandle({ children, className }, ref) {
    const draggableContext = useDraggableContext();
    const sortableContext = useSortableItemContext();

    const context = draggableContext || sortableContext;

    if (!context) {
      console.warn('DragHandle must be used within a Draggable or SortableItem with handle={true}');
      return null;
    }

    const { attributes, listeners, isDragging } = context;

    return (
      <button
        ref={ref}
        type="button"
        aria-label="Drag handle"
        className={cn(
          'flex items-center justify-center cursor-grab touch-none',
          'text-muted hover:text-default transition-colors',
          isDragging && 'cursor-grabbing',
          className
        )}
        {...attributes}
        {...listeners}
      >
        {children || <Icon iconType={['editor', 'draggable']} size={16} />}
      </button>
    );
  }
);
