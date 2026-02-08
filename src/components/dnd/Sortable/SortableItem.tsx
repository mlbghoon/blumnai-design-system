'use client';

import { forwardRef } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '@/lib/utils';
import { SortableItemContext } from './useSortableItemContext';
import { useSortableDisabledContext } from './useSortableContext';
import type { SortableItemProps, SortableItemRenderProps, DragHandleContextValue } from '../dnd.types';

export const SortableItem = forwardRef<HTMLDivElement, SortableItemProps>(
  function SortableItem(
    { id, children, disabled = false, handle = false, className, activeClassName },
    ref
  ) {
    const { disabled: parentDisabled } = useSortableDisabledContext();
    const isDisabled = disabled || parentDisabled;

    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
      isSorting,
    } = useSortable({
      id,
      disabled: isDisabled,
    });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    const renderProps: SortableItemRenderProps = {
      isDragging,
      isSorting,
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
    };

    const contextValue: DragHandleContextValue = {
      attributes,
      listeners,
      isDragging,
    };

    const content =
      typeof children === 'function' ? children(renderProps) : children;

    return (
      <SortableItemContext.Provider value={contextValue}>
        <div
          ref={(node) => {
            setNodeRef(node);
            if (typeof ref === 'function') {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
          }}
          className={cn(
            'touch-none',
            isDragging && 'z-50 opacity-50',
            isDragging && activeClassName,
            className
          )}
          style={style}
          {...(handle ? {} : { ...attributes, ...listeners })}
        >
          {content}
        </div>
      </SortableItemContext.Provider>
    );
  }
);
