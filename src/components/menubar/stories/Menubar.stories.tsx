import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarCheckboxItem,
  MenubarRadioItem,
  MenubarRadioGroup,
  MenubarLabel,
  MenubarSeparator,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
} from '../Menubar';
import type { MenubarProps } from '../Menubar.types';

const meta: Meta<MenubarProps> = {
  title: 'Navigation/Menubar',
  component: Menubar,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
};

export default meta;
type Story = StoryObj<MenubarProps>;

/**
 * 기본 Menubar
 *
 * 수평 앱 네비게이션 메뉴입니다. 화살표 키로 메뉴 간 이동이 가능합니다.
 *
 * MenubarItem의 상세 props는 MenuItem 스토리에서 테스트할 수 있습니다.
 */
export const Default: Story = {
  render: function Render() {
    return (
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent width={220}>
            <MenubarItem shortcut="⌘N">New File</MenubarItem>
            <MenubarItem shortcut="⌘O">Open</MenubarItem>
            <MenubarItem shortcut="⌘S">Save</MenubarItem>
            <MenubarSeparator />
            <MenubarItem shortcut="⌘Q">Quit</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent width={220}>
            <MenubarItem shortcut="⌘Z">Undo</MenubarItem>
            <MenubarItem shortcut="⇧⌘Z">Redo</MenubarItem>
            <MenubarSeparator />
            <MenubarItem shortcut="⌘X">Cut</MenubarItem>
            <MenubarItem shortcut="⌘C">Copy</MenubarItem>
            <MenubarItem shortcut="⌘V">Paste</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent width={200}>
            <MenubarItem>Zoom In</MenubarItem>
            <MenubarItem>Zoom Out</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Full Screen</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
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
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent width={220}>
            <MenubarItem leadIcon={['document', 'file-add']} shortcut="⌘N">
              New File
            </MenubarItem>
            <MenubarItem leadIcon={['document', 'folder-open']} shortcut="⌘O">
              Open
            </MenubarItem>
            <MenubarItem leadIcon={['device', 'save']} shortcut="⌘S">
              Save
            </MenubarItem>
            <MenubarItem leadIcon={['device', 'save']} shortcut="⇧⌘S">
              Save As...
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem leadIcon={['system', 'close']} shortcut="⌘Q">
              Quit
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent width={220}>
            <MenubarItem leadIcon={['arrows', 'arrow-go-back']} shortcut="⌘Z">
              Undo
            </MenubarItem>
            <MenubarItem leadIcon={['arrows', 'arrow-go-forward']} shortcut="⇧⌘Z">
              Redo
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem leadIcon={['design', 'scissors']} shortcut="⌘X">
              Cut
            </MenubarItem>
            <MenubarItem leadIcon={['document', 'file-copy']} shortcut="⌘C">
              Copy
            </MenubarItem>
            <MenubarItem leadIcon={['document', 'clipboard']} shortcut="⌘V">
              Paste
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem leadIcon={['system', 'delete-bin']} destructive>
              Delete
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    );
  },
};

/**
 * 체크박스 메뉴
 *
 * View 메뉴에서 체크박스를 사용하여 옵션을 토글할 수 있습니다.
 */
export const WithCheckboxItems: Story = {
  render: function Render() {
    const [showStatusBar, setShowStatusBar] = useState(true);
    const [showActivityBar, setShowActivityBar] = useState(false);
    const [showPanel, setShowPanel] = useState(true);

    return (
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent width={200}>
            <MenubarLabel>Appearance</MenubarLabel>
            <MenubarSeparator />
            <MenubarCheckboxItem
              checked={showStatusBar}
              onCheckedChange={setShowStatusBar}
            >
              Status Bar
            </MenubarCheckboxItem>
            <MenubarCheckboxItem
              checked={showActivityBar}
              onCheckedChange={setShowActivityBar}
            >
              Activity Bar
            </MenubarCheckboxItem>
            <MenubarCheckboxItem
              checked={showPanel}
              onCheckedChange={setShowPanel}
            >
              Panel
            </MenubarCheckboxItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
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
    const [theme, setTheme] = useState('system');

    return (
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>Settings</MenubarTrigger>
          <MenubarContent width={180}>
            <MenubarLabel>Theme</MenubarLabel>
            <MenubarSeparator />
            <MenubarRadioGroup value={theme} onValueChange={setTheme}>
              <MenubarRadioItem value="light">Light</MenubarRadioItem>
              <MenubarRadioItem value="dark">Dark</MenubarRadioItem>
              <MenubarRadioItem value="system">System</MenubarRadioItem>
            </MenubarRadioGroup>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
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
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent width={220}>
            <MenubarItem shortcut="⌘N">New File</MenubarItem>
            <MenubarItem shortcut="⌘O">Open</MenubarItem>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Open Recent</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>project-a.tsx</MenubarItem>
                <MenubarItem>project-b.tsx</MenubarItem>
                <MenubarItem>settings.json</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Clear Recent</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSub>
              <MenubarSubTrigger>Share</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem leadIcon={['business', 'mail']}>Email</MenubarItem>
                <MenubarItem leadIcon={['editor', 'link']}>Copy Link</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarItem shortcut="⌘Q">Quit</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    );
  },
};

/**
 * 전체 앱 메뉴바 예시
 *
 * 완전한 데스크톱 앱 스타일의 메뉴바입니다.
 */
export const FullAppMenubar: Story = {
  render: function Render() {
    const [autoSave, setAutoSave] = useState(true);
    const [wordWrap, setWordWrap] = useState(true);
    const [minimap, setMinimap] = useState(false);
    const [theme, setTheme] = useState('system');

    return (
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent width={220}>
            <MenubarItem leadIcon={['document', 'file-add']} shortcut="⌘N">
              New File
            </MenubarItem>
            <MenubarItem leadIcon={['document', 'folder-open']} shortcut="⌘O">
              Open
            </MenubarItem>
            <MenubarSub>
              <MenubarSubTrigger>Open Recent</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>index.tsx</MenubarItem>
                <MenubarItem>App.tsx</MenubarItem>
                <MenubarItem>styles.css</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Clear Recent</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarItem leadIcon={['device', 'save']} shortcut="⌘S">
              Save
            </MenubarItem>
            <MenubarItem shortcut="⇧⌘S">Save As...</MenubarItem>
            <MenubarSeparator />
            <MenubarCheckboxItem
              checked={autoSave}
              onCheckedChange={setAutoSave}
            >
              Auto Save
            </MenubarCheckboxItem>
            <MenubarSeparator />
            <MenubarItem shortcut="⌘Q">Quit</MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent width={220}>
            <MenubarItem leadIcon={['arrows', 'arrow-go-back']} shortcut="⌘Z">
              Undo
            </MenubarItem>
            <MenubarItem leadIcon={['arrows', 'arrow-go-forward']} shortcut="⇧⌘Z">
              Redo
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem leadIcon={['design', 'scissors']} shortcut="⌘X">
              Cut
            </MenubarItem>
            <MenubarItem leadIcon={['document', 'file-copy']} shortcut="⌘C">
              Copy
            </MenubarItem>
            <MenubarItem leadIcon={['document', 'clipboard']} shortcut="⌘V">
              Paste
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem shortcut="⌘F">Find</MenubarItem>
            <MenubarItem shortcut="⌘H">Replace</MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent width={200}>
            <MenubarLabel>Appearance</MenubarLabel>
            <MenubarSeparator />
            <MenubarCheckboxItem
              checked={wordWrap}
              onCheckedChange={setWordWrap}
            >
              Word Wrap
            </MenubarCheckboxItem>
            <MenubarCheckboxItem
              checked={minimap}
              onCheckedChange={setMinimap}
            >
              Minimap
            </MenubarCheckboxItem>
            <MenubarSeparator />
            <MenubarLabel>Theme</MenubarLabel>
            <MenubarRadioGroup value={theme} onValueChange={setTheme}>
              <MenubarRadioItem value="light">Light</MenubarRadioItem>
              <MenubarRadioItem value="dark">Dark</MenubarRadioItem>
              <MenubarRadioItem value="system">System</MenubarRadioItem>
            </MenubarRadioGroup>
            <MenubarSeparator />
            <MenubarItem shortcut="⌃⌘F">Toggle Fullscreen</MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>Help</MenubarTrigger>
          <MenubarContent width={180}>
            <MenubarItem leadIcon={['system', 'question']}>
              Documentation
            </MenubarItem>
            <MenubarItem leadIcon={['development', 'bug']}>
              Report Issue
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem leadIcon={['system', 'information']}>
              About
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    );
  },
};

/**
 * 코드 에디터 메뉴바
 *
 * VSCode 스타일의 메뉴바입니다.
 */
export const CodeEditorMenubar: Story = {
  render: function Render() {
    const [autoSave, setAutoSave] = useState(false);
    const [formatOnSave, setFormatOnSave] = useState(true);

    return (
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent width={240}>
            <MenubarItem leadIcon={['document', 'file-add']} shortcut="⌘N">
              New File
            </MenubarItem>
            <MenubarItem leadIcon={['document', 'folder-add']} shortcut="⇧⌘N">
              New Folder
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem leadIcon={['document', 'folder-open']} shortcut="⌘O">
              Open File...
            </MenubarItem>
            <MenubarItem shortcut="⌘K ⌘O">Open Folder...</MenubarItem>
            <MenubarSub>
              <MenubarSubTrigger>Open Recent</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarLabel>Files</MenubarLabel>
                <MenubarItem>~/projects/app/src/index.tsx</MenubarItem>
                <MenubarItem>~/projects/lib/utils.ts</MenubarItem>
                <MenubarSeparator />
                <MenubarLabel>Folders</MenubarLabel>
                <MenubarItem>~/projects/app</MenubarItem>
                <MenubarItem>~/projects/lib</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Clear Recently Opened</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarCheckboxItem
              checked={autoSave}
              onCheckedChange={setAutoSave}
            >
              Auto Save
            </MenubarCheckboxItem>
            <MenubarSeparator />
            <MenubarItem leadIcon={['device', 'save']} shortcut="⌘S">
              Save
            </MenubarItem>
            <MenubarItem shortcut="⌥⌘S">Save All</MenubarItem>
            <MenubarSeparator />
            <MenubarItem leadIcon={['system', 'close']} shortcut="⌘W">
              Close Editor
            </MenubarItem>
            <MenubarItem shortcut="⌘K W">Close All</MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent width={240}>
            <MenubarItem shortcut="⌘Z">Undo</MenubarItem>
            <MenubarItem shortcut="⇧⌘Z">Redo</MenubarItem>
            <MenubarSeparator />
            <MenubarItem shortcut="⌘X">Cut</MenubarItem>
            <MenubarItem shortcut="⌘C">Copy</MenubarItem>
            <MenubarItem shortcut="⌘V">Paste</MenubarItem>
            <MenubarSeparator />
            <MenubarItem shortcut="⌘F">Find</MenubarItem>
            <MenubarItem shortcut="⌥⌘F">Replace</MenubarItem>
            <MenubarSeparator />
            <MenubarItem shortcut="⇧⌥F">Format Document</MenubarItem>
            <MenubarCheckboxItem
              checked={formatOnSave}
              onCheckedChange={setFormatOnSave}
            >
              Format On Save
            </MenubarCheckboxItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>Selection</MenubarTrigger>
          <MenubarContent width={220}>
            <MenubarItem shortcut="⌘A">Select All</MenubarItem>
            <MenubarItem shortcut="⌘L">Expand Line Selection</MenubarItem>
            <MenubarSeparator />
            <MenubarItem shortcut="⌘D">Add Selection to Next Match</MenubarItem>
            <MenubarItem shortcut="⇧⌘L">Select All Occurrences</MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>Go</MenubarTrigger>
          <MenubarContent width={240}>
            <MenubarItem shortcut="⌃G">Go to Line...</MenubarItem>
            <MenubarItem shortcut="⌘P">Go to File...</MenubarItem>
            <MenubarItem shortcut="⇧⌘O">Go to Symbol...</MenubarItem>
            <MenubarSeparator />
            <MenubarItem shortcut="⌃-">Go Back</MenubarItem>
            <MenubarItem shortcut="⌃⇧-">Go Forward</MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>Terminal</MenubarTrigger>
          <MenubarContent width={220}>
            <MenubarItem shortcut="⌃`">New Terminal</MenubarItem>
            <MenubarItem>Split Terminal</MenubarItem>
            <MenubarSeparator />
            <MenubarItem shortcut="⌘K">Clear Terminal</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    );
  },
};

/**
 * 비활성화된 아이템
 *
 * disabled 속성으로 아이템을 비활성화할 수 있습니다.
 */
export const DisabledItems: Story = {
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent width={200}>
          <MenubarItem shortcut="⌘N">New File</MenubarItem>
          <MenubarItem disabled>Open Recent</MenubarItem>
          <MenubarItem shortcut="⌘S">Save</MenubarItem>
          <MenubarSeparator />
          <MenubarItem disabled>Export</MenubarItem>
          <MenubarItem shortcut="⌘Q">Quit</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
};

/**
 * 큰 사이즈 아이템
 *
 * size="large"와 description을 사용하여 더 자세한 설명이 포함된 아이템을 표시합니다.
 */
export const LargeItems: Story = {
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Options</MenubarTrigger>
        <MenubarContent width={280}>
          <MenubarItem
            size="large"
            leadIcon={['document', 'file-add']}
            description="새 문서를 생성합니다"
          >
            새 파일
          </MenubarItem>
          <MenubarItem
            size="large"
            leadIcon={['document', 'folder-open']}
            description="기존 파일을 엽니다"
          >
            파일 열기
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem
            size="large"
            leadIcon={['device', 'save']}
            description="현재 파일을 저장합니다"
          >
            저장
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
};

/**
 * 캡션이 있는 아이템
 *
 * caption 속성으로 라벨 옆에 추가 정보를 표시합니다.
 */
export const WithCaptions: Story = {
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Help</MenubarTrigger>
        <MenubarContent width={200}>
          <MenubarItem caption="v2.0.0">About</MenubarItem>
          <MenubarItem caption="Latest">Check for Updates</MenubarItem>
          <MenubarSeparator />
          <MenubarItem leadIcon={['system', 'question']}>Documentation</MenubarItem>
          <MenubarItem leadIcon={['development', 'bug']} caption="Beta">
            Report Issue
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
};
