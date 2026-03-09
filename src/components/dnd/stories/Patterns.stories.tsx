import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, useCallback } from 'react';
import {
  DndContext,
  Draggable,
  Droppable,
  DragHandle,
  DragOverlay,
  Sortable,
  SortableItem,
} from '../index';
import type { DragEndEvent, DragStartEvent, DndItem } from '../dnd.types';
import { Icon } from '@/components/icons';
import type { IconType } from '@/components/icons';
import { closestCorners } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { Input } from '@/components/input';
import { Textarea } from '@/components/textarea';
import { Select } from '@/components/select';
import { Checkbox } from '@/components/checkbox';
import { Button } from '@/components/button';

const meta: Meta = {
  title: 'DnD/Patterns',
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
};

export default meta;
type Story = StoryObj;

// ============================================================================
// Kanban Board
// ============================================================================

interface KanbanCard extends DndItem {
  id: string;
  title: string;
  priority?: 'high' | 'medium' | 'low';
}

interface KanbanColumn {
  id: string;
  title: string;
  cards: KanbanCard[];
}

/**
 * 칸반 보드
 *
 * 카드를 다른 컬럼으로 드래그하여 이동할 수 있습니다.
 * 같은 컬럼 내에서는 순서 변경이 가능합니다.
 */
export const KanbanBoard: Story = {
  render: function Render() {
    const [columns, setColumns] = useState<KanbanColumn[]>([
      {
        id: 'todo',
        title: '할 일',
        cards: [
          { id: 'card-1', title: 'API 설계', priority: 'high' },
          { id: 'card-2', title: '문서 작성', priority: 'medium' },
        ],
      },
      {
        id: 'in-progress',
        title: '진행 중',
        cards: [
          { id: 'card-3', title: '버그 수정', priority: 'high' },
        ],
      },
      {
        id: 'done',
        title: '완료',
        cards: [
          { id: 'card-4', title: '코드 리뷰', priority: 'low' },
        ],
      },
    ]);

    const [activeCard, setActiveCard] = useState<KanbanCard | null>(null);

    const findColumn = useCallback(
      (cardId: string) => columns.find((col) => col.cards.some((card) => card.id === cardId)),
      [columns]
    );

    const handleDragStart = (event: DragStartEvent) => {
      const card = columns
        .flatMap((col) => col.cards)
        .find((c) => c.id === event.active.id);
      if (card) setActiveCard(card);
    };

    const handleDragEnd = (event: DragEndEvent) => {
      const { active, over } = event;
      setActiveCard(null);

      if (!over) return;

      const activeId = active.id as string;
      const overId = over.id as string;

      const activeColumn = findColumn(activeId);
      const overColumn = findColumn(overId) || columns.find((col) => col.id === overId);

      if (!activeColumn || !overColumn) return;

      if (activeColumn.id === overColumn.id) {
        const oldIndex = activeColumn.cards.findIndex((c) => c.id === activeId);
        const newIndex = activeColumn.cards.findIndex((c) => c.id === overId);

        if (oldIndex !== newIndex && newIndex !== -1) {
          setColumns((prev) =>
            prev.map((col) =>
              col.id === activeColumn.id
                ? { ...col, cards: arrayMove(col.cards, oldIndex, newIndex) }
                : col
            )
          );
        }
      } else {
        const card = activeColumn.cards.find((c) => c.id === activeId);
        if (!card) return;

        setColumns((prev) =>
          prev.map((col) => {
            if (col.id === activeColumn.id) {
              return { ...col, cards: col.cards.filter((c) => c.id !== activeId) };
            }
            if (col.id === overColumn.id) {
              return { ...col, cards: [...col.cards, card] };
            }
            return col;
          })
        );
      }
    };

    const priorityColors = {
      high: 'bg-red-500',
      medium: 'bg-yellow-500',
      low: 'bg-green-500',
    };

    return (
      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCorners}
      >
        <div className="flex ds-gap-16 overflow-x-auto [padding-bottom:64px]">
          {columns.map((column) => (
            <Droppable
              key={column.id}
              id={column.id}
              className="w-[280px] flex-shrink-0 bg-muted rounded-lg padding-12"
              overClassName="bg-state-soft"
            >
              <div className="flex items-center justify-between [margin-bottom:48px]">
                <h3 className="font-medium size-sm font-body">{column.title}</h3>
                <span className="padding-x-8 padding-y-2 bg-card rounded-full size-xs font-body">
                  {column.cards.length}
                </span>
              </div>

              <div className="flex flex-col ds-gap-8 min-h-[200px]">
                {column.cards.map((card) => (
                  <Draggable key={card.id} id={card.id} data={{ ...card }}>
                    <div className="padding-12 bg-card border-default rounded-lg shadow-sm cursor-grab">
                      <div className="flex items-start ds-gap-8">
                        {card.priority && (
                          <div
                            className={`width-8 height-8 rounded-full margin-t-16 ${priorityColors[card.priority]}`}
                          />
                        )}
                        <span className="size-sm font-body">{card.title}</span>
                      </div>
                    </div>
                  </Draggable>
                ))}
              </div>
            </Droppable>
          ))}
        </div>

        <DragOverlay>
          {activeCard && (
            <div className="padding-12 bg-card border-highlight rounded-lg shadow-lg cursor-grabbing">
              <div className="flex items-start ds-gap-8">
                {activeCard.priority && (
                  <div
                    className={`width-8 height-8 rounded-full margin-t-16 ${priorityColors[activeCard.priority]}`}
                  />
                )}
                <span className="size-sm font-body">{activeCard.title}</span>
              </div>
            </div>
          )}
        </DragOverlay>
      </DndContext>
    );
  },
};

// ============================================================================
// Form Builder
// ============================================================================

interface FormComponent extends DndItem {
  id: string;
  type: 'input' | 'textarea' | 'select' | 'checkbox' | 'button';
  label: string;
}

/**
 * 폼 빌더
 *
 * 팔레트에서 컴포넌트를 캔버스로 드래그하여 폼을 구성할 수 있습니다.
 */
export const FormBuilder: Story = {
  render: function Render() {
    const palette: FormComponent[] = [
      { id: 'palette-input', type: 'input', label: '입력' },
      { id: 'palette-textarea', type: 'textarea', label: '텍스트 영역' },
      { id: 'palette-select', type: 'select', label: '선택' },
      { id: 'palette-checkbox', type: 'checkbox', label: '체크박스' },
      { id: 'palette-button', type: 'button', label: '버튼' },
    ];

    const [canvasComponents, setCanvasComponents] = useState<FormComponent[]>([]);
    const [dragCounter, setDragCounter] = useState(1);

    const handleDragEnd = (event: DragEndEvent) => {
      const { active, over } = event;

      if (over?.id === 'canvas') {
        const paletteItem = palette.find((item) => item.id === active.id);
        if (paletteItem) {
          const newComponent: FormComponent = {
            ...paletteItem,
            id: `canvas-${paletteItem.type}-${dragCounter}`,
          };
          setCanvasComponents((prev) => [...prev, newComponent]);
          setDragCounter((prev) => prev + 1);
        }
      }
    };

    const removeComponent = (id: string) => {
      setCanvasComponents((prev) => prev.filter((c) => c.id !== id));
    };

    const iconMap: Record<string, IconType> = {
      input: ['editor', 'text'],
      textarea: ['editor', 'paragraph'],
      select: ['arrows', 'arrow-down'],
      checkbox: ['system', 'check'],
      button: ['system', 'add'],
    };

    const renderFormComponent = (component: FormComponent) => {
      switch (component.type) {
        case 'input':
          return (
            <Input
              variant="default"
              placeholder="텍스트 입력"
              size="sm"
              className="w-full"
              readOnly
            />
          );
        case 'textarea':
          return (
            <Textarea
              placeholder="긴 텍스트 입력"
              rows={3}
              className="w-full"
              readOnly
            />
          );
        case 'select':
          return (
            <Select
              variant="default"
              placeholder="옵션 선택"
              options={[
                { id: 'option1', label: '옵션 1' },
                { id: 'option2', label: '옵션 2' },
                { id: 'option3', label: '옵션 3' },
              ]}
              size="sm"
              className="w-full"
            />
          );
        case 'checkbox':
          return (
            <Checkbox
              label="체크박스 라벨"
            />
          );
        case 'button':
          return (
            <Button
              buttonStyle="primary"
              size="sm"
              fullWidth
            >
              버튼
            </Button>
          );
        default:
          return null;
      }
    };

    return (
      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex ds-gap-24">
          <div className="w-[160px] flex flex-col ds-gap-32">
            <h3 className="font-medium size-sm font-body [margin-bottom:48px]">컴포넌트</h3>
            {palette.map((item) => (
              <Draggable key={item.id} id={item.id} data={{ type: item.type }}>
                <div className="flex items-center ds-gap-8 padding-12 bg-card border-default rounded-lg shadow-sm cursor-grab hover:border-highlight transition-colors">
                  <Icon iconType={iconMap[item.type]} size={16} className="text-muted" />
                  <span className="size-sm font-body">{item.label}</span>
                </div>
              </Draggable>
            ))}
          </div>

          <Droppable
            id="canvas"
            className="flex-1 min-h-[400px] padding-16 border border-dashed border-default rounded-lg"
            activeClassName="border-highlight"
            overClassName="bg-state-soft border-highlight border-solid"
          >
            {canvasComponents.length === 0 ? (
              <div className="h-full flex items-center justify-center text-muted size-sm font-body">
                컴포넌트를 여기로 드래그하세요
              </div>
            ) : (
              <Sortable items={canvasComponents} onReorder={setCanvasComponents}>
                <div className="flex flex-col ds-gap-12">
                  {canvasComponents.map((component) => (
                    <SortableItem key={component.id} id={component.id} handle>
                      <div className="group flex items-start ds-gap-12 padding-12 bg-card border-default rounded-lg">
                        <DragHandle />
                        <div className="flex-1">{renderFormComponent(component)}</div>
                        <button
                          onClick={() => removeComponent(component.id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-muted hover:text-default"
                        >
                          <Icon iconType={['system', 'close']} size={16} />
                        </button>
                      </div>
                    </SortableItem>
                  ))}
                </div>
              </Sortable>
            )}
          </Droppable>
        </div>
      </DndContext>
    );
  },
};

// ============================================================================
// File Upload Zone
// ============================================================================

interface FileItem extends DndItem {
  id: string;
  name: string;
  size: string;
  type: 'image' | 'document' | 'other';
}

/**
 * 파일 업로드 존
 *
 * 파일을 드롭 존으로 드래그하여 업로드 대기열에 추가할 수 있습니다.
 */
export const FileUploadZone: Story = {
  render: function Render() {
    const [uploadQueue, setUploadQueue] = useState<FileItem[]>([]);
    const [uploadedFiles, setUploadedFiles] = useState<FileItem[]>([]);

    const availableFiles: FileItem[] = [
      { id: 'file-1', name: '문서.pdf', size: '2.4 MB', type: 'document' },
      { id: 'file-2', name: '이미지.png', size: '1.2 MB', type: 'image' },
      { id: 'file-3', name: '보고서.docx', size: '540 KB', type: 'document' },
      { id: 'file-4', name: '사진.jpg', size: '3.1 MB', type: 'image' },
      { id: 'file-5', name: '데이터.csv', size: '128 KB', type: 'other' },
    ];

    const handleDragEnd = (event: DragEndEvent) => {
      const { active, over } = event;

      if (over?.id === 'upload-zone') {
        const file = availableFiles.find((f) => f.id === active.id);
        if (file && !uploadQueue.some((f) => f.id === file.id)) {
          setUploadQueue((prev) => [...prev, file]);
        }
      }
    };

    const uploadFile = (file: FileItem) => {
      setUploadQueue((prev) => prev.filter((f) => f.id !== file.id));
      setUploadedFiles((prev) => [...prev, file]);
    };

    const removeFromQueue = (id: string) => {
      setUploadQueue((prev) => prev.filter((f) => f.id !== id));
    };

    const fileIcons: Record<string, IconType> = {
      image: ['media', 'image'],
      document: ['document', 'file'],
      other: ['document', 'file'],
    };

    return (
      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex flex-col ds-gap-96">
          <div>
            <h3 className="font-medium size-sm font-body [margin-bottom:48px]">파일 목록</h3>
            <div className="flex flex-wrap ds-gap-12">
              {availableFiles
                .filter((f) => !uploadQueue.some((q) => q.id === f.id))
                .filter((f) => !uploadedFiles.some((u) => u.id === f.id))
                .map((file) => (
                  <Draggable key={file.id} id={file.id} data={{ ...file }}>
                    <div className="flex items-center ds-gap-8 padding-12 bg-card border-default rounded-lg shadow-sm cursor-grab">
                      <Icon iconType={fileIcons[file.type]} size={20} className="text-muted" />
                      <div>
                        <p className="size-sm font-body">{file.name}</p>
                        <p className="size-xs text-muted font-body">{file.size}</p>
                      </div>
                    </div>
                  </Draggable>
                ))}
            </div>
          </div>

          <div className="flex ds-gap-16">
            <Droppable
              id="upload-zone"
              className="flex-1 min-h-[200px] padding-24 border-2 border-dashed border-default rounded-xl flex flex-col items-center justify-center"
              activeClassName="border-highlight"
              overClassName="bg-state-soft border-highlight"
            >
              <Icon iconType={['document', 'file-upload']} size={32} className="text-muted [margin-bottom:48px]" />
              <p className="size-sm text-muted font-body text-center">
                파일을 여기로 드래그하여
                <br />
                업로드 대기열에 추가하세요
              </p>
            </Droppable>

            <div className="w-[280px] flex flex-col ds-gap-48">
              <h3 className="font-medium size-sm font-body">업로드 대기열</h3>
              {uploadQueue.length === 0 ? (
                <p className="size-sm text-muted font-body">대기 중인 파일 없음</p>
              ) : (
                <div className="flex flex-col ds-gap-32">
                  {uploadQueue.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center ds-gap-8 padding-12 bg-card border-default rounded-lg"
                    >
                      <Icon iconType={fileIcons[file.type]} size={16} className="text-muted" />
                      <div className="flex-1 min-w-0">
                        <p className="size-sm font-body truncate">{file.name}</p>
                        <p className="size-xs text-muted font-body">{file.size}</p>
                      </div>
                      <button
                        onClick={() => uploadFile(file)}
                        className="padding-4 text-state-primary hover:bg-state-soft rounded"
                      >
                        <Icon iconType={['system', 'upload']} size={16} />
                      </button>
                      <button
                        onClick={() => removeFromQueue(file.id)}
                        className="padding-4 text-muted hover:text-default"
                      >
                        <Icon iconType={['system', 'close']} size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {uploadedFiles.length > 0 && (
                <>
                  <h3 className="font-medium size-sm font-body [margin-top:64px]">업로드 완료</h3>
                  <div className="flex flex-col ds-gap-32">
                    {uploadedFiles.map((file) => (
                      <div
                        key={file.id}
                        className="flex items-center ds-gap-8 padding-12 bg-green-50 border border-green-200 rounded-lg"
                      >
                        <Icon iconType={['system', 'check']} size={16} className="text-green-600" />
                        <span className="size-sm font-body">{file.name}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </DndContext>
    );
  },
};

// ============================================================================
// Nested Lists (Tree)
// ============================================================================

interface TreeNode extends DndItem {
  id: string;
  label: string;
  children?: TreeNode[];
}

/**
 * 트리 뷰
 *
 * 중첩된 항목의 순서를 드래그로 재정렬할 수 있습니다.
 */
export const TreeView: Story = {
  render: function Render() {
    const [items, setItems] = useState<TreeNode[]>([
      {
        id: 'folder-1',
        label: '폴더 1',
        children: [
          { id: 'file-1-1', label: '파일 1-1' },
          { id: 'file-1-2', label: '파일 1-2' },
        ],
      },
      {
        id: 'folder-2',
        label: '폴더 2',
        children: [
          { id: 'file-2-1', label: '파일 2-1' },
          {
            id: 'folder-2-1',
            label: '하위 폴더',
            children: [
              { id: 'file-2-1-1', label: '파일 2-1-1' },
            ],
          },
        ],
      },
      { id: 'file-3', label: '파일 3' },
    ]);

    const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
      new Set(['folder-1', 'folder-2', 'folder-2-1'])
    );

    const toggleFolder = (id: string) => {
      setExpandedFolders((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        return next;
      });
    };

    const renderNode = (node: TreeNode, depth: number = 0) => {
      const hasChildren = node.children && node.children.length > 0;
      const isExpanded = expandedFolders.has(node.id);

      return (
        <div key={node.id}>
          <SortableItem id={node.id} handle>
            <div
              className="flex items-center ds-gap-8 padding-8 hover:bg-muted rounded-md group"
              style={{ paddingLeft: `${depth * 24 + 8}px` }}
            >
              <DragHandle className="opacity-0 group-hover:opacity-100" />
              {hasChildren ? (
                <button
                  onClick={() => toggleFolder(node.id)}
                  className="padding-2 hover:bg-card rounded"
                >
                  <Icon
                    iconType={isExpanded ? ['arrows', 'arrow-down'] : ['arrows', 'arrow-right']}
                    size={16}
                    className="text-muted"
                  />
                </button>
              ) : (
                <div className="width-20" />
              )}
              <Icon
                iconType={hasChildren ? ['document', 'folder'] : ['document', 'file']}
                size={16}
                className={hasChildren ? 'text-yellow-500' : 'text-muted'}
              />
              <span className="size-sm font-body">{node.label}</span>
            </div>
          </SortableItem>
          {hasChildren && isExpanded && (
            <div>
              {node.children!.map((child) => renderNode(child, depth + 1))}
            </div>
          )}
        </div>
      );
    };

    return (
      <div className="w-[320px] padding-12 bg-card border-default rounded-lg">
        <Sortable items={items} onReorder={setItems}>
          <div>{items.map((item) => renderNode(item))}</div>
        </Sortable>
      </div>
    );
  },
};

// ============================================================================
// Playlist
// ============================================================================

interface Song extends DndItem {
  id: string;
  title: string;
  artist: string;
  duration: string;
}

/**
 * 플레이리스트
 *
 * 곡 순서를 드래그로 재정렬할 수 있습니다.
 */
export const Playlist: Story = {
  render: function Render() {
    const [songs, setSongs] = useState<Song[]>([
      { id: '1', title: 'Bohemian Rhapsody', artist: 'Queen', duration: '3:45' },
      { id: '2', title: 'Stairway to Heaven', artist: 'Led Zeppelin', duration: '4:12' },
      { id: '3', title: 'Hotel California', artist: 'Eagles', duration: '3:21' },
      { id: '4', title: 'Sweet Child O Mine', artist: 'Guns N Roses', duration: '5:07' },
      { id: '5', title: 'Wonderwall', artist: 'Oasis', duration: '4:33' },
    ]);

    return (
      <div className="w-[500px] bg-card border-default rounded-xl overflow-hidden">
        <div className="padding-16 border-b border-default">
          <h2 className="font-medium size-lg font-body">내 플레이리스트</h2>
          <p className="size-sm text-muted font-body margin-t-16">{songs.length}곡</p>
        </div>

        <Sortable items={songs} onReorder={setSongs}>
          <div>
            {songs.map((song, index) => (
              <SortableItem key={song.id} id={song.id} handle>
                <div className="flex items-center ds-gap-12 padding-12 hover:bg-muted border-b border-default last:border-none group">
                  <DragHandle className="opacity-0 group-hover:opacity-100" />
                  <span className="width-24 text-center text-muted size-sm font-body">
                    {index + 1}
                  </span>
                  <Icon iconType={['media', 'music']} size={20} className="text-muted" />
                  <div className="flex-1 min-w-0">
                    <p className="size-sm font-body truncate">{song.title}</p>
                    <p className="size-xs text-muted font-body">{song.artist}</p>
                  </div>
                  <span className="size-sm text-muted font-body">{song.duration}</span>
                  <button className="opacity-0 group-hover:opacity-100 padding-4 text-muted hover:text-default">
                    <Icon iconType={['system', 'more']} size={16} />
                  </button>
                </div>
              </SortableItem>
            ))}
          </div>
        </Sortable>
      </div>
    );
  },
};
