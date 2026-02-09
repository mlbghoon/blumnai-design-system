import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuRadioGroup,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
} from '../ContextMenu';
import type {
  ContextMenuProps,
  ContextMenuContentProps,
} from '../ContextMenu.types';

type ContextMenuStoryProps = ContextMenuProps & ContextMenuContentProps;

const meta: Meta<ContextMenuStoryProps> = {
  title: 'Overlay/ContextMenu',
  component: ContextMenuContent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { disable: true },
  },
  argTypes: {
    alignOffset: {
      control: 'number',
      description: '[ContextMenuContent] 정렬 오프셋 (px)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
        category: 'ContextMenuContent',
      },
    },
    width: {
      control: 'text',
      description: '[ContextMenuContent] 컨텍스트 메뉴의 커스텀 너비 (예: "200", "300px")',
      table: {
        type: { summary: 'string | number' },
        category: 'ContextMenuContent',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<ContextMenuStoryProps>;

/**
 * 기본 ContextMenu
 *
 * 영역을 우클릭하면 컨텍스트 메뉴가 표시됩니다.
 */
export const Default: Story = {
  args: {
    alignOffset: 0,
    width: 200,
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    return (
      <ContextMenu>
        <ContextMenuTrigger className="flex height-[150px] width-[300px] items-center justify-center rounded-lg border border-dashed border-default bg-subtle size-sm font-body text-muted select-none">
          우클릭하세요
        </ContextMenuTrigger>
        <ContextMenuContent
          alignOffset={args.alignOffset}
          width={args.width}
        >
          <ContextMenuLabel>Actions</ContextMenuLabel>
          <ContextMenuSeparator />
          <ContextMenuItem shortcut="⌘C">
            Copy
          </ContextMenuItem>
          <ContextMenuItem shortcut="⌘V">
            Paste
          </ContextMenuItem>
          <ContextMenuItem shortcut="⌘X">
            Cut
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem shortcut="⌫" destructive>
            Delete
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );
  },
};

/**
 * 아이콘이 있는 메뉴
 *
 * 각 메뉴 아이템에 아이콘을 추가할 수 있습니다.
 */
export const WithIcons: Story = {
  render: function Render() {
    return (
      <ContextMenu>
        <ContextMenuTrigger className="flex height-[150px] width-[300px] items-center justify-center rounded-lg border border-dashed border-default bg-subtle size-sm font-body text-muted select-none">
          우클릭하세요
        </ContextMenuTrigger>
        <ContextMenuContent width={220}>
          <ContextMenuItem leadIcon={['document', 'file-copy']} shortcut="⌘C">
            복사
          </ContextMenuItem>
          <ContextMenuItem leadIcon={['document', 'clipboard']} shortcut="⌘V">
            붙여넣기
          </ContextMenuItem>
          <ContextMenuItem leadIcon={['design', 'scissors']} shortcut="⌘X">
            잘라내기
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem leadIcon={['document', 'file-add']} shortcut="⌘N">
            새 파일
          </ContextMenuItem>
          <ContextMenuItem leadIcon={['document', 'folder-add']} shortcut="⇧⌘N">
            새 폴더
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem leadIcon={['system', 'delete-bin']} destructive>
            삭제
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );
  },
};

/**
 * 체크박스 메뉴
 *
 * 체크박스로 여러 옵션을 토글할 수 있습니다.
 */
export const WithCheckboxItems: Story = {
  render: function Render() {
    const [showStatusBar, setShowStatusBar] = useState(true);
    const [showActivityBar, setShowActivityBar] = useState(false);
    const [showPanel, setShowPanel] = useState(false);

    return (
      <ContextMenu>
        <ContextMenuTrigger className="flex height-[150px] width-[300px] items-center justify-center rounded-lg border border-dashed border-default bg-subtle size-sm font-body text-muted select-none">
          우클릭하세요
        </ContextMenuTrigger>
        <ContextMenuContent width={200}>
          <ContextMenuLabel>View</ContextMenuLabel>
          <ContextMenuSeparator />
          <ContextMenuCheckboxItem
            checked={showStatusBar}
            onCheckedChange={setShowStatusBar}
          >
            Status Bar
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem
            checked={showActivityBar}
            onCheckedChange={setShowActivityBar}
          >
            Activity Bar
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem
            checked={showPanel}
            onCheckedChange={setShowPanel}
          >
            Panel
          </ContextMenuCheckboxItem>
        </ContextMenuContent>
      </ContextMenu>
    );
  },
};

/**
 * 라디오 메뉴
 *
 * 라디오 버튼으로 하나의 옵션만 선택할 수 있습니다.
 */
export const WithRadioItems: Story = {
  render: function Render() {
    const [person, setPerson] = useState('pedro');

    return (
      <ContextMenu>
        <ContextMenuTrigger className="flex height-[150px] width-[300px] items-center justify-center rounded-lg border border-dashed border-default bg-subtle size-sm font-body text-muted select-none">
          우클릭하세요
        </ContextMenuTrigger>
        <ContextMenuContent width={200}>
          <ContextMenuLabel>People</ContextMenuLabel>
          <ContextMenuSeparator />
          <ContextMenuRadioGroup value={person} onValueChange={setPerson}>
            <ContextMenuRadioItem value="pedro">Pedro Duarte</ContextMenuRadioItem>
            <ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>
            <ContextMenuRadioItem value="john">John Doe</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuContent>
      </ContextMenu>
    );
  },
};

/**
 * 서브메뉴
 *
 * 중첩된 메뉴를 표시할 수 있습니다.
 */
export const WithSubmenu: Story = {
  render: function Render() {
    return (
      <ContextMenu>
        <ContextMenuTrigger className="flex height-[150px] width-[300px] items-center justify-center rounded-lg border border-dashed border-default bg-subtle size-sm font-body text-muted select-none">
          우클릭하세요
        </ContextMenuTrigger>
        <ContextMenuContent width={220}>
          <ContextMenuItem leadIcon={['document', 'file-add']} shortcut="⌘N">
            새 파일
          </ContextMenuItem>
          <ContextMenuItem leadIcon={['document', 'folder-add']}>
            새 폴더
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuSub>
            <ContextMenuSubTrigger>More Actions</ContextMenuSubTrigger>
            <ContextMenuSubContent>
              <ContextMenuItem>Rename</ContextMenuItem>
              <ContextMenuItem>Duplicate</ContextMenuItem>
              <ContextMenuItem>Move to...</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem>Archive</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSub>
            <ContextMenuSubTrigger>Share</ContextMenuSubTrigger>
            <ContextMenuSubContent>
              <ContextMenuItem leadIcon={['business', 'mail']}>Email</ContextMenuItem>
              <ContextMenuItem leadIcon={['system', 'share']}>Share</ContextMenuItem>
              <ContextMenuItem leadIcon={['editor', 'link']}>Copy Link</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuItem leadIcon={['system', 'delete-bin']} destructive>
            삭제
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );
  },
};

/**
 * 파일 탐색기 예시
 *
 * 파일 탐색기 스타일의 컨텍스트 메뉴입니다.
 */
export const FileExplorerExample: Story = {
  render: function Render() {
    const [viewMode, setViewMode] = useState('list');

    return (
      <ContextMenu>
        <ContextMenuTrigger className="flex height-[200px] width-[350px] items-center justify-center rounded-lg border border-dashed border-default bg-subtle size-sm font-body text-muted select-none">
          파일 영역 - 우클릭하세요
        </ContextMenuTrigger>
        <ContextMenuContent width={240}>
          <ContextMenuLabel>View</ContextMenuLabel>
          <ContextMenuRadioGroup value={viewMode} onValueChange={setViewMode}>
            <ContextMenuRadioItem value="list">
              List View
            </ContextMenuRadioItem>
            <ContextMenuRadioItem value="grid">
              Grid View
            </ContextMenuRadioItem>
            <ContextMenuRadioItem value="column">
              Column View
            </ContextMenuRadioItem>
          </ContextMenuRadioGroup>
          <ContextMenuSeparator />
          <ContextMenuLabel>Sort By</ContextMenuLabel>
          <ContextMenuSub>
            <ContextMenuSubTrigger>Name</ContextMenuSubTrigger>
            <ContextMenuSubContent>
              <ContextMenuItem>A to Z</ContextMenuItem>
              <ContextMenuItem>Z to A</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSub>
            <ContextMenuSubTrigger>Date</ContextMenuSubTrigger>
            <ContextMenuSubContent>
              <ContextMenuItem>Newest First</ContextMenuItem>
              <ContextMenuItem>Oldest First</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSub>
            <ContextMenuSubTrigger>Size</ContextMenuSubTrigger>
            <ContextMenuSubContent>
              <ContextMenuItem>Largest First</ContextMenuItem>
              <ContextMenuItem>Smallest First</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuItem leadIcon={['document', 'file-add']} shortcut="⌘N">
            New File
          </ContextMenuItem>
          <ContextMenuItem leadIcon={['document', 'folder-add']} shortcut="⇧⌘N">
            New Folder
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem leadIcon={['system', 'refresh']}>
            Refresh
          </ContextMenuItem>
          <ContextMenuItem leadIcon={['system', 'settings']}>
            Properties
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );
  },
};

/**
 * 텍스트 편집 예시
 *
 * 텍스트 편집기 스타일의 컨텍스트 메뉴입니다.
 */
export const TextEditorExample: Story = {
  render: function Render() {
    const [wordWrap, setWordWrap] = useState(true);
    const [minimap, setMinimap] = useState(true);
    const [lineNumbers, setLineNumbers] = useState(true);

    return (
      <ContextMenu>
        <ContextMenuTrigger className="flex height-[200px] width-[400px] items-start justify-start rounded-lg border border-dashed border-default bg-subtle size-sm font-body text-muted select-none padding-16">
          <div className="font-code size-sm">
            {`function hello() {
  console.log("Hello, World!");
}

// 우클릭하여 메뉴를 열어보세요`}
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent width={220}>
          <ContextMenuItem leadIcon={['design', 'scissors']} shortcut="⌘X">
            Cut
          </ContextMenuItem>
          <ContextMenuItem leadIcon={['document', 'file-copy']} shortcut="⌘C">
            Copy
          </ContextMenuItem>
          <ContextMenuItem leadIcon={['document', 'clipboard']} shortcut="⌘V">
            Paste
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem leadIcon={['editor', 'format-clear']} shortcut="⌘A">
            Select All
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuLabel>Editor Settings</ContextMenuLabel>
          <ContextMenuCheckboxItem
            checked={wordWrap}
            onCheckedChange={setWordWrap}
          >
            Word Wrap
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem
            checked={minimap}
            onCheckedChange={setMinimap}
          >
            Show Minimap
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem
            checked={lineNumbers}
            onCheckedChange={setLineNumbers}
          >
            Line Numbers
          </ContextMenuCheckboxItem>
          <ContextMenuSeparator />
          <ContextMenuSub>
            <ContextMenuSubTrigger>Format Document</ContextMenuSubTrigger>
            <ContextMenuSubContent>
              <ContextMenuItem>Prettier</ContextMenuItem>
              <ContextMenuItem>ESLint</ContextMenuItem>
              <ContextMenuItem>Both</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
        </ContextMenuContent>
      </ContextMenu>
    );
  },
};
