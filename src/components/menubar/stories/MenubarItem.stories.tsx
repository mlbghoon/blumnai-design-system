import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarSeparator,
} from '../Menubar';
import type { MenubarItemProps } from '../Menubar.types';

const meta: Meta<MenubarItemProps> = {
  title: 'Navigation/Menubar/Item',
  component: MenubarItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { disable: true },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['default', 'large'],
      description: '아이템 크기',
      table: {
        type: {
          summary: 'MenubarItemSize',
          detail: `'default' | 'large'`,
        },
        defaultValue: { summary: 'default' },
      },
    },
    destructive: {
      control: 'boolean',
      description: '위험 동작 스타일',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    inset: {
      control: 'boolean',
      description: '왼쪽 인덴트 (체크박스/라디오 아이템과 정렬용)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    leadIcon: {
      control: 'object',
      description: '앞에 표시되는 아이콘',
      table: {
        type: {
          summary: 'IconType',
          detail: `[category, iconName] 튜플 형식

카테고리: 'arrows' | 'buildings' | 'business' | 'communication' | 'design' | 'development' | 'device' | 'document' | 'editor' | 'finance' | 'food' | 'health' | 'map' | 'media' | 'others' | 'system' | 'user' | 'weather'

예시:
['system', 'add']
['document', 'file-add']
['arrows', 'arrow-right-s']`,
        },
      },
    },
    leadIconFill: {
      control: 'boolean',
      description: '리드 아이콘 filled 스타일 사용 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    tailIcon: {
      control: 'object',
      description: '뒤에 표시되는 아이콘',
      table: {
        type: {
          summary: 'IconType',
          detail: `[category, iconName] 튜플 형식

카테고리: 'arrows' | 'buildings' | 'business' | 'communication' | 'design' | 'development' | 'device' | 'document' | 'editor' | 'finance' | 'food' | 'health' | 'map' | 'media' | 'others' | 'system' | 'user' | 'weather'

예시:
['arrows', 'arrow-right-s']
['arrows', 'external-link']`,
        },
      },
    },
    tailIconFill: {
      control: 'boolean',
      description: '테일 아이콘 filled 스타일 사용 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    iconColor: {
      control: 'select',
      options: ['default', 'default-subtle', 'success', 'warning', 'destructive', 'informative'],
      description: '아이콘 색상',
      table: {
        type: { summary: 'IconColor' },
        defaultValue: { summary: 'default-subtle' },
      },
    },
    caption: {
      control: 'text',
      description: '캡션 텍스트 (라벨 옆에 표시)',
      table: {
        type: { summary: 'string' },
      },
    },
    description: {
      control: 'text',
      description: '설명 텍스트 (라벨 아래에 표시, large 사이즈에서만)',
      table: {
        type: { summary: 'string' },
      },
    },
    shortcut: {
      control: 'text',
      description: '단축키 표시',
      table: {
        type: { summary: 'string' },
      },
    },
    onClick: {
      action: 'clicked',
      description: '클릭 이벤트 핸들러',
      table: {
        type: { summary: '() => void' },
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '350px', display: 'flex', alignItems: 'flex-start', paddingTop: '20px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<MenubarItemProps>;

// ============================================================================
// BASIC
// ============================================================================

/**
 * 기본 MenuItem
 *
 * 이 스토리에서 MenubarItem의 모든 props를 테스트할 수 있습니다.
 */
export const Default: Story = {
  args: {
    size: 'default',
    destructive: false,
    disabled: false,
    inset: false,
    leadIcon: ['document', 'file-add'],
    leadIconFill: false,
    tailIcon: undefined,
    tailIconFill: false,
    iconColor: undefined,
    caption: '',
    description: '',
    shortcut: '⌘J',
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const caption = args.caption || undefined;
    const description = args.description || undefined;

    return (
      <Menubar defaultValue="menu">
        <MenubarMenu value="menu">
          <MenubarTrigger>Menu</MenubarTrigger>
          <MenubarContent width={280}>
            <MenubarItem
              size={args.size}
              destructive={args.destructive}
              disabled={args.disabled}
              inset={args.inset}
              leadIcon={args.leadIcon}
              leadIconFill={args.leadIconFill}
              tailIcon={args.tailIcon}
              tailIconFill={args.tailIconFill}
              iconColor={args.iconColor}
              caption={caption}
              description={description}
              shortcut={args.shortcut}
            >
              새 항목
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    );
  },
};

/**
 * 앞 아이콘이 있는 아이템
 */
export const WithLeadIcon: Story = {
  render: function Render() {
    return (
      <Menubar defaultValue="file">
        <MenubarMenu value="file">
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent width={280}>
            <MenubarItem leadIcon={['document', 'file-add']}>새 파일</MenubarItem>
            <MenubarItem leadIcon={['document', 'folder-open']}>열기</MenubarItem>
            <MenubarItem leadIcon={['device', 'save']}>저장</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    );
  },
};

/**
 * 뒤 아이콘이 있는 아이템
 */
export const WithTailIcon: Story = {
  render: function Render() {
    return (
      <Menubar defaultValue="actions">
        <MenubarMenu value="actions">
          <MenubarTrigger>Actions</MenubarTrigger>
          <MenubarContent width={250}>
            <MenubarItem tailIcon={['arrows', 'arrow-right-s']}>더보기</MenubarItem>
            <MenubarItem tailIcon={['system', 'external-link']}>외부 링크</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    );
  },
};

/**
 * 캡션이 있는 아이템
 */
export const WithCaption: Story = {
  render: function Render() {
    return (
      <Menubar defaultValue="recent">
        <MenubarMenu value="recent">
          <MenubarTrigger>Recent</MenubarTrigger>
          <MenubarContent width={280}>
            <MenubarLabel>최근 파일</MenubarLabel>
            <MenubarItem leadIcon={['design', 'artboard']} caption="2분 전">
              design-system.fig
            </MenubarItem>
            <MenubarItem leadIcon={['development', 'code-box']} caption="1시간 전">
              components.tsx
            </MenubarItem>
            <MenubarItem leadIcon={['document', 'file-text']} caption="어제">
              notes.md
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    );
  },
};

/**
 * 단축키가 있는 아이템
 */
export const WithShortcut: Story = {
  render: function Render() {
    return (
      <Menubar defaultValue="file">
        <MenubarMenu value="file">
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent width={250}>
            <MenubarItem leadIcon={['document', 'file-add']} shortcut="⌘J">
              새 항목
            </MenubarItem>
            <MenubarItem leadIcon={['document', 'folder-open']} shortcut="⌘O">
              열기
            </MenubarItem>
            <MenubarItem leadIcon={['device', 'save']} shortcut="⌘E">
              내보내기
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    );
  },
};

/**
 * 설명이 있는 아이템 (Large 사이즈)
 */
export const WithDescription: Story = {
  render: function Render() {
    return (
      <Menubar defaultValue="settings">
        <MenubarMenu value="settings">
          <MenubarTrigger>Settings</MenubarTrigger>
          <MenubarContent width={300}>
            <MenubarItem
              size="large"
              leadIcon={['user', 'user']}
              description="사용자 정보와 프로필 사진을 변경합니다"
            >
              프로필 설정
            </MenubarItem>
            <MenubarItem
              size="large"
              leadIcon={['communication', 'chat-1']}
              description="알림 환경설정을 관리합니다"
            >
              알림 설정
            </MenubarItem>
            <MenubarItem
              size="large"
              leadIcon={['system', 'lock']}
              description="비밀번호와 보안 옵션을 설정합니다"
            >
              보안 설정
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    );
  },
};

// ============================================================================
// SIZES
// ============================================================================

/**
 * Default 사이즈
 */
export const SizeDefault: Story = {
  render: function Render() {
    return (
      <Menubar defaultValue="menu">
        <MenubarMenu value="menu">
          <MenubarTrigger>Default Size</MenubarTrigger>
          <MenubarContent width={250}>
            <MenubarItem leadIcon={['system', 'settings']}>설정</MenubarItem>
            <MenubarItem leadIcon={['user', 'user']}>프로필</MenubarItem>
            <MenubarItem leadIcon={['system', 'logout-box-r']}>로그아웃</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    );
  },
};

/**
 * Large 사이즈
 */
export const SizeLarge: Story = {
  render: function Render() {
    return (
      <Menubar defaultValue="menu">
        <MenubarMenu value="menu">
          <MenubarTrigger>Large Size</MenubarTrigger>
          <MenubarContent width={300}>
            <MenubarItem
              size="large"
              leadIcon={['system', 'settings']}
              description="앱 환경설정을 변경합니다"
            >
              설정
            </MenubarItem>
            <MenubarItem
              size="large"
              leadIcon={['user', 'user']}
              description="프로필 정보를 수정합니다"
            >
              프로필
            </MenubarItem>
            <MenubarItem
              size="large"
              leadIcon={['system', 'logout-box-r']}
              description="계정에서 로그아웃합니다"
            >
              로그아웃
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    );
  },
};

// ============================================================================
// STATES
// ============================================================================

/**
 * 비활성화 상태
 */
export const Disabled: Story = {
  render: function Render() {
    return (
      <Menubar defaultValue="options">
        <MenubarMenu value="options">
          <MenubarTrigger>Options</MenubarTrigger>
          <MenubarContent width={200}>
            <MenubarItem leadIcon={['system', 'check']}>활성 아이템</MenubarItem>
            <MenubarItem leadIcon={['system', 'close']} disabled>비활성 아이템</MenubarItem>
            <MenubarItem leadIcon={['system', 'settings']}>또 다른 활성 아이템</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    );
  },
};

/**
 * Destructive 상태
 */
export const Destructive: Story = {
  render: function Render() {
    return (
      <Menubar defaultValue="actions">
        <MenubarMenu value="actions">
          <MenubarTrigger>More Actions</MenubarTrigger>
          <MenubarContent width={200}>
            <MenubarItem leadIcon={['design', 'edit']}>Edit</MenubarItem>
            <MenubarItem leadIcon={['document', 'file-copy']}>Duplicate</MenubarItem>
            <MenubarSeparator />
            <MenubarItem leadIcon={['business', 'archive']}>Archive</MenubarItem>
            <MenubarSeparator />
            <MenubarItem destructive leadIcon={['system', 'delete-bin']}>
              Delete
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    );
  },
};

// ============================================================================
// ICON COLORS
// ============================================================================

/**
 * 아이콘 색상
 */
export const IconColors: Story = {
  render: function Render() {
    return (
      <Menubar defaultValue="status">
        <MenubarMenu value="status">
          <MenubarTrigger>Status</MenubarTrigger>
          <MenubarContent width={200}>
            <MenubarLabel>아이콘 색상 옵션</MenubarLabel>
            <MenubarItem leadIcon={['system', 'checkbox-circle']} iconColor="success">
              Success
            </MenubarItem>
            <MenubarItem leadIcon={['system', 'error-warning']} iconColor="warning">
              Warning
            </MenubarItem>
            <MenubarItem leadIcon={['system', 'delete-bin']} iconColor="destructive">
              Destructive
            </MenubarItem>
            <MenubarItem leadIcon={['system', 'information']} iconColor="informative">
              Informative
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem leadIcon={['system', 'check-double']} iconColor="success" disabled>
              Disabled (색상 무시됨)
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    );
  },
};

/**
 * 키보드 단축키 바인딩
 *
 * `shortcut` prop은 뱃지를 렌더링할 뿐만 아니라 전역 keydown 리스너도 바인딩합니다.
 * 메뉴가 열려 있을 때 단축키를 누르면 해당 항목의 onClick이 실행됩니다.
 */
export const KeyboardShortcutBinding: Story = {
  render: function Render() {
    const [log, setLog] = useState<string[]>([]);

    const addLog = (message: string) => {
      setLog((prev) => [`${new Date().toLocaleTimeString()} — ${message}`, ...prev.slice(0, 4)]);
    };

    return (
      <div className="flex flex-col ds-gap-16">
        <p className="margin-0size-sm text-subtle">
          메뉴를 열고 단축키를 눌러 onClick이 실행되는 것을 확인하세요.
        </p>
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent width={220}>
              <MenubarItem
                leadIcon={['document', 'file-add']}
                shortcut="⌘J"
                onClick={() => addLog('New Item (⌘J)')}
              >
                New Item
              </MenubarItem>
              <MenubarItem
                leadIcon={['system', 'check']}
                shortcut="⌘E"
                onClick={() => addLog('Export (⌘E)')}
              >
                Export
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem
                leadIcon={['system', 'close']}
                shortcut="⌘B"
                onClick={() => addLog('Toggle Sidebar (⌘B)')}
              >
                Toggle Sidebar
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
        {log.length > 0 && (
          <div className="padding-12 bg-subtle rounded-md">
            <p className="margin-0size-xs text-muted font-medium">Event Log</p>
            {log.map((entry, i) => (
              <p key={i} className="margin-0size-xs text-subtle">{entry}</p>
            ))}
          </div>
        )}
      </div>
    );
  },
};
