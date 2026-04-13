'use client';

import { DragOverlay as DndKitDragOverlay, useDndContext } from '@dnd-kit/core';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';
import { usePortalContainer } from '../../utils/PortalContainerContext';
import type { DragOverlayProps, DndItem } from './dnd.types';

const defaultDropAnimation = {
  duration: 250,
  easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)',
};

export function DragOverlay({
  children,
  className,
  dropAnimation = defaultDropAnimation,
}: DragOverlayProps) {
  const { active } = useDndContext();
  const portalContainer = usePortalContainer();

  const activeItem: DndItem | null = active
    ? { id: active.id, data: active.data.current as Record<string, unknown> }
    : null;

  const content =
    typeof children === 'function' ? children(activeItem) : children;

  const overlay = (
    <DndKitDragOverlay
      dropAnimation={dropAnimation}
      className={cn('shadow-modal-sm', className)}
    >
      {active ? content : null}
    </DndKitDragOverlay>
  );

  if (typeof document === 'undefined') return overlay;

  return createPortal(overlay, portalContainer ?? document.body);
}
