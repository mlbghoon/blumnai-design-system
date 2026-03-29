'use client';

import { forwardRef } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '@/lib/utils';
import { DraggableContext } from './useDraggableContext';
import type { DraggableProps, DraggableRenderProps, DragHandleContextValue } from './dnd.types';

export const Draggable = forwardRef<HTMLDivElement, DraggableProps>(
  function Draggable({ id, children, data, disabled = false, handle = false, className, activeClassName }, ref) {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      isDragging,
    } = useDraggable({
      id,
      data: { id, ...(typeof data === 'object' && data !== null ? data : {}) },
      disabled,
    });

    const style = transform && !(isDragging && activeClassName)
      ? {
          transform: CSS.Translate.toString(transform),
        }
      : undefined;

    const renderProps: DraggableRenderProps = {
      isDragging,
      attributes,
      listeners,
      setNodeRef,
      transform,
    };

    const contextValue: DragHandleContextValue = {
      attributes,
      listeners,
      isDragging,
    };

    const content = typeof children === 'function' ? children(renderProps) : children;

    return (
      <DraggableContext.Provider value={contextValue}>
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
            isDragging && (activeClassName || 'opacity-50'),
            className
          )}
          style={style}
          {...(handle ? {} : { ...attributes, ...listeners })}
        >
          {content}
        </div>
      </DraggableContext.Provider>
    );
  }
);
