import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Sortable, SortableItem, DragHandle } from '../index';
import type { DndItem } from '../dnd.types';
import { Icon } from '@/components/icons';

const meta: Meta<typeof Sortable> = {
  title: 'DnD/Sortable',
  component: Sortable,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  argTypes: {
    strategy: {
      control: 'select',
      options: ['vertical', 'horizontal', 'grid'],
      description: '정렬 방향',
      table: {
        type: { summary: 'SortableStrategy', detail: "'vertical' | 'horizontal' | 'grid'" },
      },
    },
    disabled: {
      control: 'boolean',
      description: '정렬 비활성화 여부',
      table: { type: { summary: 'boolean' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Sortable>;

interface ListItem extends DndItem {
  id: string;
  title: string;
}

/**
 * 기본 정렬 가능 리스트
 *
 * 아이템을 드래그하여 순서를 변경할 수 있습니다.
 */
export const Default: Story = {
  args: {
    strategy: 'vertical',
    disabled: false,
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const [items, setItems] = useState<ListItem[]>([
      { id: '1', title: 'Item 1' },
      { id: '2', title: 'Item 2' },
      { id: '3', title: 'Item 3' },
      { id: '4', title: 'Item 4' },
    ]);

    return (
      <div className="w-[300px]">
        <Sortable
          items={items}
          onReorder={setItems}
          strategy={args.strategy}
          disabled={args.disabled}
        >
          <div className="flex flex-col ds-gap-8">
            {items.map((item) => (
              <SortableItem key={item.id} id={item.id}>
                <div className="padding-16 bg-card border-default rounded-lg shadow-sm cursor-grab">
                  {item.title}
                </div>
              </SortableItem>
            ))}
          </div>
        </Sortable>
      </div>
    );
  },
};

/**
 * 드래그 핸들 사용
 *
 * 핸들을 통해서만 드래그할 수 있습니다.
 */
export const WithHandle: Story = {
  render: function Render() {
    const [items, setItems] = useState<ListItem[]>([
      { id: '1', title: 'Item 1' },
      { id: '2', title: 'Item 2' },
      { id: '3', title: 'Item 3' },
    ]);

    return (
      <div className="w-[350px]">
        <Sortable items={items} onReorder={setItems}>
          <div className="flex flex-col ds-gap-8">
            {items.map((item) => (
              <SortableItem key={item.id} id={item.id} handle>
                <div className="flex items-center ds-gap-12 padding-12 bg-card border-default rounded-lg shadow-sm">
                  <DragHandle />
                  <span className="flex-1 size-sm font-body">{item.title}</span>
                </div>
              </SortableItem>
            ))}
          </div>
        </Sortable>
      </div>
    );
  },
};

/**
 * 수평 정렬
 *
 * strategy="horizontal"로 가로 방향 정렬이 가능합니다.
 */
export const Horizontal: Story = {
  render: function Render() {
    const [items, setItems] = useState<ListItem[]>([
      { id: '1', title: '1' },
      { id: '2', title: '2' },
      { id: '3', title: '3' },
      { id: '4', title: '4' },
      { id: '5', title: '5' },
    ]);

    return (
      <Sortable items={items} onReorder={setItems} strategy="horizontal">
        <div className="flex ds-gap-12">
          {items.map((item) => (
            <SortableItem key={item.id} id={item.id}>
              <div className="width-60 height-60 flex items-center justify-center bg-card border-default rounded-lg shadow-sm cursor-grab font-medium">
                {item.title}
              </div>
            </SortableItem>
          ))}
        </div>
      </Sortable>
    );
  },
};

/**
 * 그리드 정렬
 *
 * strategy="grid"로 격자 형태의 정렬이 가능합니다.
 */
export const Grid: Story = {
  render: function Render() {
    const [items, setItems] = useState<ListItem[]>(
      Array.from({ length: 9 }, (_, i) => ({
        id: String(i + 1),
        title: String(i + 1),
      }))
    );

    return (
      <div className="w-[240px]">
        <Sortable items={items} onReorder={setItems} strategy="grid">
          <div className="grid grid-cols-3 ds-gap-12">
            {items.map((item) => (
              <SortableItem key={item.id} id={item.id}>
                <div className="width-60 height-60 flex items-center justify-center bg-card border-default rounded-lg shadow-sm cursor-grab font-medium">
                  {item.title}
                </div>
              </SortableItem>
            ))}
          </div>
        </Sortable>
      </div>
    );
  },
};

interface TaskItem extends DndItem {
  id: string;
  title: string;
  priority: 'high' | 'medium' | 'low';
}

/**
 * 태스크 리스트 예시
 *
 * 실제 사용 사례를 보여주는 태스크 리스트입니다.
 */
export const TaskList: Story = {
  render: function Render() {
    const [tasks, setTasks] = useState<TaskItem[]>([
      { id: '1', title: 'API 설계 검토', priority: 'high' },
      { id: '2', title: '버그 수정', priority: 'high' },
      { id: '3', title: '문서 업데이트', priority: 'medium' },
      { id: '4', title: '코드 리뷰', priority: 'medium' },
      { id: '5', title: '테스트 작성', priority: 'low' },
    ]);

    const priorityColors = {
      high: 'bg-red-100 text-red-700',
      medium: 'bg-yellow-100 text-yellow-700',
      low: 'bg-green-100 text-green-700',
    };

    const priorityLabels = {
      high: '높음',
      medium: '중간',
      low: '낮음',
    };

    return (
      <div className="w-[400px]">
        <h3 className="size-lg font-medium font-body [margin-bottom:64px]">태스크 목록</h3>
        <Sortable items={tasks} onReorder={setTasks}>
          <div className="flex flex-col ds-gap-8">
            {tasks.map((task, index) => (
              <SortableItem key={task.id} id={task.id} handle>
                <div className="flex items-center ds-gap-12 padding-12 bg-card border-default rounded-lg shadow-sm">
                  <DragHandle />
                  <span className="text-muted size-sm font-body width-24">{index + 1}</span>
                  <span className="flex-1 size-sm font-body">{task.title}</span>
                  <span
                    className={`padding-x-8 padding-y-2 rounded-full size-xs font-medium font-body ${priorityColors[task.priority]}`}
                  >
                    {priorityLabels[task.priority]}
                  </span>
                </div>
              </SortableItem>
            ))}
          </div>
        </Sortable>
      </div>
    );
  },
};

interface ImageItem extends DndItem {
  id: string;
  src: string;
  alt: string;
}

/**
 * 이미지 갤러리
 *
 * 드래그로 이미지 순서를 재정렬할 수 있습니다.
 */
export const ImageGallery: Story = {
  render: function Render() {
    const [images, setImages] = useState<ImageItem[]>([
      { id: '1', src: 'https://picsum.photos/seed/1/120/120', alt: 'Image 1' },
      { id: '2', src: 'https://picsum.photos/seed/2/120/120', alt: 'Image 2' },
      { id: '3', src: 'https://picsum.photos/seed/3/120/120', alt: 'Image 3' },
      { id: '4', src: 'https://picsum.photos/seed/4/120/120', alt: 'Image 4' },
      { id: '5', src: 'https://picsum.photos/seed/5/120/120', alt: 'Image 5' },
      { id: '6', src: 'https://picsum.photos/seed/6/120/120', alt: 'Image 6' },
    ]);

    return (
      <div className="w-[420px]">
        <Sortable items={images} onReorder={setImages} strategy="grid">
          <div className="grid grid-cols-3 ds-gap-16">
            {images.map((image) => (
              <SortableItem key={image.id} id={image.id}>
                <div className="relative group cursor-grab overflow-hidden rounded-lg shadow-sm">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <Icon
                      iconType={['editor', 'draggable']}
                      size={24}
                      className="text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg"
                    />
                  </div>
                </div>
              </SortableItem>
            ))}
          </div>
        </Sortable>
      </div>
    );
  },
};

/**
 * 렌더 프롭 패턴
 *
 * children을 함수로 전달하여 드래그 상태에 따른 커스텀 스타일링이 가능합니다.
 */
export const RenderProps: Story = {
  render: function Render() {
    const [items, setItems] = useState<ListItem[]>([
      { id: '1', title: 'Item 1' },
      { id: '2', title: 'Item 2' },
      { id: '3', title: 'Item 3' },
    ]);

    return (
      <div className="w-[300px]">
        <Sortable items={items} onReorder={setItems}>
          <div className="flex flex-col ds-gap-8">
            {items.map((item) => (
              <SortableItem key={item.id} id={item.id}>
                {({ isDragging, isSorting }) => (
                  <div
                    className={`
                      padding-16 rounded-lg shadow-sm cursor-grab transition-all
                      ${isDragging ? 'bg-state-primary text-white shadow-lg scale-105' : 'bg-card border-default'}
                      ${isSorting && !isDragging ? 'opacity-50' : ''}
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <span>{item.title}</span>
                      {isDragging && (
                        <Icon iconType={['editor', 'draggable']} size={16} />
                      )}
                    </div>
                  </div>
                )}
              </SortableItem>
            ))}
          </div>
        </Sortable>
      </div>
    );
  },
};
