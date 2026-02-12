import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { DndContext, Draggable, Droppable } from '../index';
import type { DroppableProps, DragEndEvent } from '../dnd.types';
import { Icon } from '@/components/icons';

const meta: Meta<DroppableProps> = {
  title: 'DnD/Droppable',
  component: Droppable,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  argTypes: {
    id: {
      control: 'text',
      description: '드롭 영역의 고유 식별자. onDragEnd 이벤트에서 over.id로 접근할 수 있습니다.',
      table: {
        type: { summary: 'string | number' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '드롭 비활성화 여부. true일 경우 이 영역에 드롭할 수 없습니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    accepts: {
      control: 'object',
      description: '수락할 아이템 타입 목록. Draggable의 data.type과 매칭됩니다. 설정하지 않으면 모든 아이템을 수락합니다.',
      table: {
        type: { summary: 'string[]' },
      },
    },
    className: {
      control: 'text',
      description: '드롭 영역의 기본 CSS 클래스',
      table: {
        type: { summary: 'string' },
      },
    },
    activeClassName: {
      control: 'text',
      description: '드래그가 시작되어 활성화된 아이템이 있을 때 적용되는 CSS 클래스',
      table: {
        type: { summary: 'string' },
      },
    },
    overClassName: {
      control: 'text',
      description: '드래그 아이템이 이 영역 위에 있을 때 적용되는 CSS 클래스 (시각적 피드백)',
      table: {
        type: { summary: 'string' },
      },
    },
    children: {
      control: false,
      description: '드롭 영역 콘텐츠. 함수로 전달하면 isOver, active 등의 렌더 프롭을 사용할 수 있습니다.',
      table: {
        type: { summary: 'ReactNode | ((props: DroppableRenderProps) => ReactNode)' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<DroppableProps>;

/**
 * 기본 드롭 존
 *
 * Droppable 컴포넌트는 드래그 아이템을 받을 수 있는 영역을 정의합니다.
 * DndContext의 onDragEnd에서 event.over를 통해 드롭 위치를 확인할 수 있습니다.
 *
 * **시각적 피드백:**
 * - `activeClassName`: 드래그가 시작되면 적용
 * - `overClassName`: 아이템이 드롭 영역 위에 있으면 적용
 */
export const Default: Story = {
  args: {
    id: 'drop-zone',
    disabled: false,
    className: 'width-200 min-h-[150px] padding-16 border border-dashed border-default rounded-lg flex items-center justify-center',
    activeClassName: 'border-highlight',
    overClassName: 'bg-state-soft border-highlight border-solid',
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const [dropped, setDropped] = useState<string | null>(null);

    const handleDragEnd = (event: DragEndEvent) => {
      if (event.over?.id === args.id) {
        setDropped(event.active.id as string);
      }
    };

    return (
      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex gap-32">
          <Draggable id="drag-item">
            <div className="padding-16 bg-card border-default rounded-lg shadow-sm cursor-grab">
              드래그 아이템
            </div>
          </Draggable>

          <Droppable
            id={args.id}
            disabled={args.disabled}
            className={args.className}
            activeClassName={args.activeClassName}
            overClassName={args.overClassName}
          >
            <p className="size-sm text-muted font-body text-center">
              {dropped ? `${dropped} 드롭됨!` : '여기에 드롭하세요'}
            </p>
          </Droppable>
        </div>
      </DndContext>
    );
  },
};

/**
 * 타입 필터링
 *
 * `accepts` 속성으로 특정 타입의 아이템만 수락할 수 있습니다.
 * Draggable의 `data={{ type: 'text' }}`와 Droppable의 `accepts={['text']}`가 매칭됩니다.
 *
 * 타입이 맞지 않는 아이템은 드롭해도 overClassName이 적용되지 않습니다.
 */
export const TypeFiltering: Story = {
  render: function Render() {
    const [textItems, setTextItems] = useState<string[]>([]);
    const [imageItems, setImageItems] = useState<string[]>([]);

    const handleDragEnd = (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over) return;

      const itemType = (active.data.current as { type?: string })?.type;

      if (over.id === 'text-zone' && itemType === 'text') {
        setTextItems((prev) => [...prev, active.id as string]);
      } else if (over.id === 'image-zone' && itemType === 'image') {
        setImageItems((prev) => [...prev, active.id as string]);
      }
    };

    return (
      <DndContext onDragEnd={handleDragEnd}>
        <div className="space-y-24">
          <div className="flex gap-12">
            <Draggable id="text-1" data={{ type: 'text' }}>
              <div className="padding-12 bg-blue-50 border-default rounded-md cursor-grab flex items-center gap-8">
                <Icon iconType={['editor', 'text']} size={16} />
                <span className="size-sm font-body">텍스트 1</span>
              </div>
            </Draggable>
            <Draggable id="text-2" data={{ type: 'text' }}>
              <div className="padding-12 bg-blue-50 border-default rounded-md cursor-grab flex items-center gap-8">
                <Icon iconType={['editor', 'text']} size={16} />
                <span className="size-sm font-body">텍스트 2</span>
              </div>
            </Draggable>
            <Draggable id="image-1" data={{ type: 'image' }}>
              <div className="padding-12 bg-green-50 border-default rounded-md cursor-grab flex items-center gap-8">
                <Icon iconType={['media', 'image']} size={16} />
                <span className="size-sm font-body">이미지 1</span>
              </div>
            </Draggable>
            <Draggable id="image-2" data={{ type: 'image' }}>
              <div className="padding-12 bg-green-50 border-default rounded-md cursor-grab flex items-center gap-8">
                <Icon iconType={['media', 'image']} size={16} />
                <span className="size-sm font-body">이미지 2</span>
              </div>
            </Draggable>
          </div>

          <div className="flex gap-16">
            <Droppable
              id="text-zone"
              accepts={['text']}
              className="flex-1 min-h-[150px] padding-16 border border-dashed border-default rounded-lg"
              activeClassName="border-blue-300"
              overClassName="bg-blue-50 border-blue-500 border-solid"
            >
              <p className="size-sm text-muted font-body mb-12">텍스트만 드롭 가능</p>
              <div className="flex flex-wrap gap-8">
                {textItems.map((item, i) => (
                  <span key={i} className="padding-8 bg-blue-100 rounded-md size-sm font-body">
                    {item}
                  </span>
                ))}
              </div>
            </Droppable>

            <Droppable
              id="image-zone"
              accepts={['image']}
              className="flex-1 min-h-[150px] padding-16 border border-dashed border-default rounded-lg"
              activeClassName="border-green-300"
              overClassName="bg-green-50 border-green-500 border-solid"
            >
              <p className="size-sm text-muted font-body mb-12">이미지만 드롭 가능</p>
              <div className="flex flex-wrap gap-8">
                {imageItems.map((item, i) => (
                  <span key={i} className="padding-8 bg-green-100 rounded-md size-sm font-body">
                    {item}
                  </span>
                ))}
              </div>
            </Droppable>
          </div>
        </div>
      </DndContext>
    );
  },
};

/**
 * 렌더 프롭 패턴
 *
 * children을 함수로 전달하면 드롭 상태에 따른 커스텀 렌더링이 가능합니다.
 *
 * **DroppableRenderProps:**
 * - `isOver`: 드래그 아이템이 이 영역 위에 있는지 여부
 * - `active`: 현재 드래그 중인 아이템 정보 (없으면 null)
 * - `setNodeRef`: DOM 노드 참조 설정 함수
 */
export const RenderProps: Story = {
  render: function Render() {
    return (
      <DndContext>
        <div className="flex gap-32">
          <Draggable id="item">
            <div className="padding-16 bg-card border-default rounded-lg shadow-sm cursor-grab">
              드래그 해보세요
            </div>
          </Draggable>

          <Droppable id="custom-zone">
            {({ isOver, active }) => (
              <div
                className={`
                  width-200 min-h-[150px] padding-16 rounded-lg flex flex-col items-center justify-center
                  transition-all duration-200
                  ${isOver ? 'bg-state-primary scale-105' : active ? 'bg-state-soft' : 'bg-muted'}
                `}
              >
                <Icon
                  iconType={isOver ? ['system', 'check'] : ['system', 'add']}
                  size={24}
                  className={isOver ? 'text-white' : 'text-muted'}
                />
                <p className={`size-sm font-body mt-8 ${isOver ? 'text-white' : 'text-muted'}`}>
                  {isOver ? '놓으세요!' : active ? '여기로 드래그' : '대기 중'}
                </p>
              </div>
            )}
          </Droppable>
        </div>
      </DndContext>
    );
  },
};

/**
 * 다중 드롭 존
 *
 * 여러 드롭 존 간에 아이템을 이동할 수 있습니다.
 * 각 드롭 존은 고유한 id를 가져야 합니다.
 */
export const MultipleZones: Story = {
  render: function Render() {
    const [zones, setZones] = useState<Record<string, string[]>>({
      'zone-a': ['item-1', 'item-2'],
      'zone-b': ['item-3'],
      'zone-c': [],
    });

    const handleDragEnd = (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over) return;

      const itemId = active.id as string;
      const targetZone = over.id as string;

      setZones((prev) => {
        const newZones = { ...prev };
        Object.keys(newZones).forEach((zone) => {
          newZones[zone] = newZones[zone].filter((id) => id !== itemId);
        });
        if (newZones[targetZone]) {
          newZones[targetZone] = [...newZones[targetZone], itemId];
        }
        return newZones;
      });
    };

    return (
      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex gap-16">
          {Object.entries(zones).map(([zoneId, items]) => (
            <Droppable
              key={zoneId}
              id={zoneId}
              className="width-180 min-h-[200px] padding-12 bg-muted rounded-lg"
              overClassName="bg-state-soft"
            >
              <p className="size-sm font-medium text-default font-body mb-12">
                {zoneId.replace('zone-', 'Zone ')}
              </p>
              <div className="flex flex-col gap-8">
                {items.map((itemId) => (
                  <Draggable key={itemId} id={itemId}>
                    <div className="padding-12 bg-card border-default rounded-md shadow-sm cursor-grab size-sm font-body">
                      {itemId}
                    </div>
                  </Draggable>
                ))}
              </div>
            </Droppable>
          ))}
        </div>
      </DndContext>
    );
  },
};
