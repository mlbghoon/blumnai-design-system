import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { DndContext, Draggable, Droppable, DragHandle, DragOverlay } from '../index';
import type { DraggableProps, DragEndEvent, DndItem } from '../dnd.types';

type DraggableStoryProps = DraggableProps & {
  showDropZone?: boolean;
};

const meta: Meta<DraggableStoryProps> = {
  title: 'DnD/Draggable',
  component: Draggable,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  argTypes: {
    id: {
      control: 'text',
      description: '드래그 아이템의 고유 식별자. DndContext 내에서 유일해야 합니다.',
      table: {
        type: { summary: 'string | number' },
      },
    },
    data: {
      control: 'object',
      description: '드래그 아이템에 첨부할 커스텀 데이터. onDragEnd 이벤트에서 active.data.current로 접근할 수 있습니다.',
      table: {
        type: { summary: 'object' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '드래그 비활성화 여부. true일 경우 해당 아이템은 드래그할 수 없습니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    handle: {
      control: 'boolean',
      description: 'true일 경우 자식 요소 중 DragHandle 컴포넌트를 통해서만 드래그를 시작할 수 있습니다. 아이템 내 텍스트 선택이 필요한 경우 유용합니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    className: {
      control: 'text',
      description: '드래그 래퍼 요소에 적용할 추가 CSS 클래스',
      table: {
        type: { summary: 'string' },
      },
    },
    children: {
      control: false,
      description: '드래그 가능한 콘텐츠. 함수로 전달하면 isDragging, attributes, listeners 등의 렌더 프롭을 사용할 수 있습니다.',
      table: {
        type: { summary: 'ReactNode | ((props: DraggableRenderProps) => ReactNode)' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<DraggableStoryProps>;

/**
 * 기본 드래그 가능 요소
 *
 * Draggable 컴포넌트는 자식 요소를 드래그 가능하게 만듭니다.
 * 반드시 DndContext 내에서 사용해야 합니다.
 *
 * **기본 동작:**
 * - 마우스나 터치로 드래그 시작 (8px 이동 후 활성화)
 * - 키보드: Space로 선택, 방향키로 이동, Space로 드롭
 * - 드래그 중 아이템은 반투명하게 표시됩니다
 */
export const Default: Story = {
  args: {
    id: 'item-1',
    disabled: false,
    handle: false,
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    return (
      <DndContext>
        <div className="flex ds-gap-16">
          <Draggable id={args.id} disabled={args.disabled} handle={args.handle}>
            <div className="padding-16 bg-card border-default rounded-lg shadow-sm cursor-grab">
              드래그 해보세요
            </div>
          </Draggable>
        </div>
      </DndContext>
    );
  },
};

/**
 * 드래그 핸들 사용
 *
 * `handle={true}`일 때 DragHandle 컴포넌트를 통해서만 드래그됩니다.
 * 아이템 내 텍스트 선택, 버튼 클릭 등이 필요한 경우에 유용합니다.
 *
 * DragHandle은 Draggable 또는 SortableItem의 자식으로 사용되어야 합니다.
 */
export const WithHandle: Story = {
  args: {
    id: 'handle-item',
    disabled: false,
    handle: true,
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    return (
      <DndContext>
        <Draggable id={args.id} disabled={args.disabled} handle={args.handle}>
          <div className="flex items-center ds-gap-12 padding-16 bg-card border-default rounded-lg shadow-sm">
            <DragHandle />
            <span>핸들로만 드래그 가능</span>
          </div>
        </Draggable>
      </DndContext>
    );
  },
};

/**
 * 드롭 존과 함께 사용
 *
 * Draggable 아이템을 Droppable 영역으로 드래그하면 onDragEnd 콜백이 실행됩니다.
 * event.over에서 드롭된 위치의 정보를, event.active에서 드래그된 아이템의 정보를 얻을 수 있습니다.
 */
export const WithDropZone: Story = {
  render: function Render() {
    const [droppedItems, setDroppedItems] = useState<string[]>([]);

    const handleDragEnd = (event: DragEndEvent) => {
      const { active, over } = event;
      if (over?.id === 'drop-zone') {
        setDroppedItems((prev) => [...prev, active.id as string]);
      }
    };

    return (
      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex ds-gap-32">
          <div className="flex flex-col ds-gap-12">
            <p className="size-sm text-muted font-body">드래그 아이템</p>
            {['item-1', 'item-2', 'item-3'].map((id) => (
              <Draggable key={id} id={id}>
                <div className="padding-12 bg-card border-default rounded-md cursor-grab">
                  {id}
                </div>
              </Draggable>
            ))}
          </div>

          <Droppable
            id="drop-zone"
            className="width-200 min-h-[200px] padding-16 border border-dashed border-default rounded-lg"
            overClassName="bg-state-soft border-highlight"
          >
            <p className="size-sm text-muted font-body [margin-bottom:48px]">여기에 드롭하세요</p>
            {droppedItems.map((item, index) => (
              <div key={index} className="padding-8 bg-muted rounded-md [margin-bottom:32px] size-sm font-body">
                {item} 드롭됨
              </div>
            ))}
          </Droppable>
        </div>
      </DndContext>
    );
  },
};

/**
 * 드래그 오버레이 사용
 *
 * DragOverlay를 사용하면 드래그 중 원본은 투명해지고,
 * 커서를 따라다니는 별도의 오버레이가 표시됩니다.
 *
 * 이는 드래그 중 시각적 피드백을 개선하고 성능을 향상시킵니다.
 */
export const WithOverlay: Story = {
  render: function Render() {
    const [activeItem, setActiveItem] = useState<DndItem | null>(null);

    const items = [
      { id: 'card-1', title: '카드 1', color: 'bg-blue-50' },
      { id: 'card-2', title: '카드 2', color: 'bg-green-50' },
      { id: 'card-3', title: '카드 3', color: 'bg-purple-50' },
    ];

    return (
      <DndContext
        onDragStart={(event) => {
          const item = items.find((i) => i.id === event.active.id);
          if (item) {
            setActiveItem({ id: item.id, data: item });
          }
        }}
        onDragEnd={() => setActiveItem(null)}
      >
        <div className="flex ds-gap-16">
          {items.map((item) => (
            <Draggable key={item.id} id={item.id} data={item}>
              <div
                className={`padding-16 ${item.color} border-default rounded-lg shadow-sm cursor-grab`}
              >
                {item.title}
              </div>
            </Draggable>
          ))}
        </div>

        <DragOverlay>
          {activeItem && (
            <div
              className={`padding-16 ${(activeItem.data as typeof items[0])?.color} border-default rounded-lg shadow-lg cursor-grabbing`}
            >
              {(activeItem.data as typeof items[0])?.title}
            </div>
          )}
        </DragOverlay>
      </DndContext>
    );
  },
};

/**
 * 비활성화 상태
 *
 * `disabled={true}`일 때 드래그가 불가능합니다.
 * 권한이나 조건에 따라 특정 아이템의 드래그를 막을 때 사용합니다.
 */
export const Disabled: Story = {
  render: function Render() {
    return (
      <DndContext>
        <div className="flex ds-gap-16">
          <Draggable id="enabled" disabled={false}>
            <div className="padding-16 bg-card border-default rounded-lg shadow-sm cursor-grab">
              드래그 가능
            </div>
          </Draggable>
          <Draggable id="disabled" disabled>
            <div className="padding-16 bg-muted border-default rounded-lg shadow-sm cursor-not-allowed opacity-50">
              드래그 불가
            </div>
          </Draggable>
        </div>
      </DndContext>
    );
  },
};
