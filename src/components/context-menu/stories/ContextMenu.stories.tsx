import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

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
          <ContextMenuLabel>동작</ContextMenuLabel>
          <ContextMenuSeparator />
          <ContextMenuItem shortcut="⌘C">
            복사
          </ContextMenuItem>
          <ContextMenuItem shortcut="⌘V">
            붙여넣기
          </ContextMenuItem>
          <ContextMenuItem shortcut="⌘X">
            잘라내기
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem shortcut="⌫" destructive>
            삭제
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
          <ContextMenuLabel>보기</ContextMenuLabel>
          <ContextMenuSeparator />
          <ContextMenuCheckboxItem
            checked={showStatusBar}
            onCheckedChange={setShowStatusBar}
          >
            상태 표시줄
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem
            checked={showActivityBar}
            onCheckedChange={setShowActivityBar}
          >
            활동 표시줄
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem
            checked={showPanel}
            onCheckedChange={setShowPanel}
          >
            패널
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
          <ContextMenuLabel>담당자</ContextMenuLabel>
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
            <ContextMenuSubTrigger>더 많은 동작</ContextMenuSubTrigger>
            <ContextMenuSubContent>
              <ContextMenuItem>이름 변경</ContextMenuItem>
              <ContextMenuItem>복제</ContextMenuItem>
              <ContextMenuItem>이동...</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem>보관</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSub>
            <ContextMenuSubTrigger>공유</ContextMenuSubTrigger>
            <ContextMenuSubContent>
              <ContextMenuItem leadIcon={['business', 'mail']}>이메일</ContextMenuItem>
              <ContextMenuItem leadIcon={['system', 'share']}>공유</ContextMenuItem>
              <ContextMenuItem leadIcon={['editor', 'link']}>링크 복사</ContextMenuItem>
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
          <ContextMenuLabel>보기</ContextMenuLabel>
          <ContextMenuRadioGroup value={viewMode} onValueChange={setViewMode}>
            <ContextMenuRadioItem value="list">
              목록 보기
            </ContextMenuRadioItem>
            <ContextMenuRadioItem value="grid">
              격자 보기
            </ContextMenuRadioItem>
            <ContextMenuRadioItem value="column">
              열 보기
            </ContextMenuRadioItem>
          </ContextMenuRadioGroup>
          <ContextMenuSeparator />
          <ContextMenuLabel>정렬 기준</ContextMenuLabel>
          <ContextMenuSub>
            <ContextMenuSubTrigger>이름</ContextMenuSubTrigger>
            <ContextMenuSubContent>
              <ContextMenuItem>오름차순</ContextMenuItem>
              <ContextMenuItem>내림차순</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSub>
            <ContextMenuSubTrigger>날짜</ContextMenuSubTrigger>
            <ContextMenuSubContent>
              <ContextMenuItem>최신순</ContextMenuItem>
              <ContextMenuItem>오래된순</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSub>
            <ContextMenuSubTrigger>크기</ContextMenuSubTrigger>
            <ContextMenuSubContent>
              <ContextMenuItem>큰 것부터</ContextMenuItem>
              <ContextMenuItem>작은 것부터</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuItem leadIcon={['document', 'file-add']} shortcut="⌘N">
            새 파일
          </ContextMenuItem>
          <ContextMenuItem leadIcon={['document', 'folder-add']} shortcut="⇧⌘N">
            새 폴더
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem leadIcon={['system', 'refresh']}>
            새로 고침
          </ContextMenuItem>
          <ContextMenuItem leadIcon={['system', 'settings']}>
            속성
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
            잘라내기
          </ContextMenuItem>
          <ContextMenuItem leadIcon={['document', 'file-copy']} shortcut="⌘C">
            복사
          </ContextMenuItem>
          <ContextMenuItem leadIcon={['document', 'clipboard']} shortcut="⌘V">
            붙여넣기
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem leadIcon={['editor', 'format-clear']} shortcut="⌘A">
            전체 선택
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuLabel>편집기 설정</ContextMenuLabel>
          <ContextMenuCheckboxItem
            checked={wordWrap}
            onCheckedChange={setWordWrap}
          >
            자동 줄바꿈
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem
            checked={minimap}
            onCheckedChange={setMinimap}
          >
            미니맵 표시
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem
            checked={lineNumbers}
            onCheckedChange={setLineNumbers}
          >
            줄 번호
          </ContextMenuCheckboxItem>
          <ContextMenuSeparator />
          <ContextMenuSub>
            <ContextMenuSubTrigger>문서 형식화</ContextMenuSubTrigger>
            <ContextMenuSubContent>
              <ContextMenuItem>Prettier</ContextMenuItem>
              <ContextMenuItem>ESLint</ContextMenuItem>
              <ContextMenuItem>모두</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
        </ContextMenuContent>
      </ContextMenu>
    );
  },
};
