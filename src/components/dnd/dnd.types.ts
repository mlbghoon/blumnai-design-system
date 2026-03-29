import type { ReactNode } from 'react';
import type {
  CancelDrop,
  DragEndEvent,
  DragStartEvent,
  DragOverEvent,
  DragMoveEvent,
  DragCancelEvent,
  UniqueIdentifier,
  Modifiers,
  CollisionDetection,
  DraggableAttributes,
  MeasuringConfiguration,
  SensorDescriptor,
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
  /** 드롭 취소 여부를 결정하는 비동기 함수 */
  cancelDrop?: CancelDrop;
  /** 요소 측정 설정 */
  measuring?: MeasuringConfiguration;
  /** 커스텀 센서 설정 (미제공 시 기본 PointerSensor/TouchSensor/KeyboardSensor 사용) */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sensors?: SensorDescriptor<any>[];
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
  /** DragOverlay 사용 시 원본 요소에 적용할 클래스 (transform 비활성화됨) */
  activeClassName?: string;
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
  /** 드래그 아이템이 올려졌으나 허용되지 않을 때 적용되는 클래스 */
  rejectedClassName?: string;
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

/**
 * Sortable 컴포넌트 Props.
 *
 * **대규모 리스트 가상화 가이드:**
 * 500개 이상의 아이템을 렌더링할 때는 `@tanstack/react-virtual` 등
 * 가상화 라이브러리와 함께 `standalone={false}`를 사용하여
 * 외부 DndContext에서 가상화를 제어하세요.
 */
export interface SortableProps<T extends DndItem> {
  items: T[];
  children: ReactNode;
  onReorder?: (items: T[]) => void;
  strategy?: SortableStrategy;
  disabled?: boolean;
  id?: DndId;
  /**
   * true이면 자체 DndContext를 생성합니다.
   * false이면 부모 DndContext를 사용합니다 (다중 Sortable 연동 시 사용).
   * @default true
   */
  standalone?: boolean;
  /** 드래그 시작 시 호출되는 콜백 */
  onDragStart?: (event: DragStartEvent) => void;
  /** 드래그 이동 시 호출되는 콜백 */
  onDragMove?: (event: DragMoveEvent) => void;
  /** 드래그 오버 시 호출되는 콜백 */
  onDragOver?: (event: DragOverEvent) => void;
  /** 드래그 취소 시 호출되는 콜백 */
  onDragCancel?: (event: DragCancelEvent) => void;
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

export type { DragEndEvent, DragStartEvent, DragOverEvent, DragMoveEvent, DragCancelEvent, SortingStrategy, DraggableAttributes };
