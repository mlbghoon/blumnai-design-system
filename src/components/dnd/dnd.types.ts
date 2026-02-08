import type { ReactNode } from 'react';
import type {
  DragEndEvent,
  DragStartEvent,
  DragOverEvent,
  DragMoveEvent,
  DragCancelEvent,
  UniqueIdentifier,
  Modifiers,
  CollisionDetection,
  DraggableAttributes,
} from '@dnd-kit/core';
import type { SortingStrategy } from '@dnd-kit/sortable';

// ============================================================================
// Common Types
// ============================================================================

export type DndId = UniqueIdentifier;

export interface DndItem<T = unknown> {
  id: DndId;
  data?: T;
}

// ============================================================================
// DndContext Types
// ============================================================================

export interface DndContextProps {
  children: ReactNode;
  onDragStart?: (event: DragStartEvent) => void;
  onDragMove?: (event: DragMoveEvent) => void;
  onDragOver?: (event: DragOverEvent) => void;
  onDragEnd?: (event: DragEndEvent) => void;
  onDragCancel?: (event: DragCancelEvent) => void;
  modifiers?: Modifiers;
  collisionDetection?: CollisionDetection;
  autoScroll?: boolean;
}

// ============================================================================
// Draggable Types
// ============================================================================

export interface DraggableProps<T = unknown> {
  id: DndId;
  children: ReactNode | ((props: DraggableRenderProps) => ReactNode);
  data?: T;
  disabled?: boolean;
  handle?: boolean;
  className?: string;
}

export interface DraggableRenderProps {
  isDragging: boolean;
  attributes: DraggableAttributes;
  listeners: DragListeners;
  setNodeRef: (node: HTMLElement | null) => void;
  transform: { x: number; y: number } | null;
}

// ============================================================================
// Droppable Types
// ============================================================================

export interface DroppableProps {
  id: DndId;
  children: ReactNode | ((props: DroppableRenderProps) => ReactNode);
  disabled?: boolean;
  accepts?: string[];
  className?: string;
  activeClassName?: string;
  overClassName?: string;
}

export interface DroppableRenderProps {
  isOver: boolean;
  active: DndItem | null;
  setNodeRef: (node: HTMLElement | null) => void;
}

// ============================================================================
// DragHandle Types
// ============================================================================

export interface DragHandleProps {
  children?: ReactNode;
  className?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DragListeners = Record<string, any> | undefined;

export interface DragHandleContextValue {
  attributes: DraggableAttributes;
  listeners: DragListeners;
  isDragging: boolean;
}

// ============================================================================
// DragOverlay Types
// ============================================================================

export interface DragOverlayProps {
  children?: ReactNode | ((activeItem: DndItem | null) => ReactNode);
  className?: string;
  dropAnimation?: {
    duration?: number;
    easing?: string;
  } | null;
}

// ============================================================================
// Sortable Types
// ============================================================================

export type SortableStrategy = 'vertical' | 'horizontal' | 'grid';

export interface SortableProps<T extends DndItem> {
  items: T[];
  children: ReactNode;
  onReorder?: (items: T[]) => void;
  strategy?: SortableStrategy;
  disabled?: boolean;
  id?: DndId;
}

export interface SortableItemProps {
  id: DndId;
  children: ReactNode | ((props: SortableItemRenderProps) => ReactNode);
  disabled?: boolean;
  handle?: boolean;
  className?: string;
  activeClassName?: string;
}

export interface SortableItemRenderProps {
  isDragging: boolean;
  isSorting: boolean;
  attributes: DraggableAttributes;
  listeners: DragListeners;
  setNodeRef: (node: HTMLElement | null) => void;
  transform: { x: number; y: number; scaleX: number; scaleY: number } | null;
  transition: string | undefined;
}

// ============================================================================
// Utility Types
// ============================================================================

export interface DragData<T = unknown> {
  id: DndId;
  type?: string;
  data?: T;
}

export type { DragEndEvent, DragStartEvent, DragOverEvent, SortingStrategy, DraggableAttributes };
