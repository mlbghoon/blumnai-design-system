'use client';

import { forwardRef } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { cn } from '@/lib/utils';
import type { DroppableProps, DroppableRenderProps, DndItem } from './dnd.types';

export const Droppable = forwardRef<HTMLDivElement, DroppableProps>(
  function Droppable(
    {
      id,
      children,
      disabled = false,
      accepts,
      className,
      activeClassName,
      overClassName,
    },
    ref
  ) {
    const { isOver, setNodeRef, active } = useDroppable({
      id,
      disabled,
      data: { accepts },
    });

    const activeData = active?.data?.current as Record<string, unknown> | undefined;

    const activeItem: DndItem | null = active
      ? { id: active.id, data: activeData }
      : null;

    const itemType = activeData?.type;
    const isAccepted =
      !accepts ||
      !activeItem ||
      (typeof itemType === 'string' && accepts.includes(itemType));

    const renderProps: DroppableRenderProps = {
      isOver: isOver && Boolean(isAccepted),
      active: activeItem,
      setNodeRef,
    };

    const content =
      typeof children === 'function' ? children(renderProps) : children;

    const hasActiveItem = active !== null;

    return (
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
          className,
          hasActiveItem && activeClassName,
          isOver && isAccepted && overClassName
        )}
      >
        {content}
      </div>
    );
  }
);
