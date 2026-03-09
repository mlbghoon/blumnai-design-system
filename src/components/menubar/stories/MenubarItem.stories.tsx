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
      description: '메뉴 아이템의 크기를 설정합니다. default(기본 높이)와 large(설명 텍스트 포함 가능한 큰 높이) 중 선택합니다',
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
      description: 'true로 설정하면 삭제 등 위험한 동작임을 나타내는 빨간색 스타일이 적용됩니다',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'true로 설정하면 메뉴 아이템이 비활성화되어 클릭할 수 없으며, 흐릿하게 표시됩니다',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    inset: {
      control: 'boolean',
      description: 'true로 설정하면 왼쪽에 여백이 추가됩니다. 체크박스나 라디오 아이템과 세로 정렬을 맞출 때 사용합니다',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    leadIcon: {
      control: 'object',
      description: '메뉴 아이템 앞쪽에 표시되는 아이콘입니다. [카테고리, 아이콘명] 튜플 형식으로 전달합니다',
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
      description: 'true로 설정하면 앞쪽 아이콘이 채워진(filled) 스타일로 표시됩니다',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    tailIcon: {
      control: 'object',
      description: '메뉴 아이템 뒤쪽에 표시되는 아이콘입니다. [카테고리, 아이콘명] 튜플 형식으로 전달합니다',
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
      description: 'true로 설정하면 뒤쪽 아이콘이 채워진(filled) 스타일로 표시됩니다',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    iconColor: {
      control: 'select',
      options: ['default', 'default-subtle', 'success', 'warning', 'destructive', 'informative'],
      description: '아이콘의 색상을 설정합니다. success(녹색), warning(주황), destructive(빨강), informative(파랑) 등 의미별 색상을 선택할 수 있습니다',
      table: {
        type: { summary: 'IconColor' },
        defaultValue: { summary: 'default-subtle' },
      },
    },
    caption: {
      control: 'text',
      description: '메뉴 아이템 라벨 오른쪽에 표시되는 보조 텍스트입니다. 버전 정보나 상태를 표시할 때 사용합니다',
      table: {
        type: { summary: 'string' },
      },
    },
    description: {
      control: 'text',
      description: '메뉴 아이템 라벨 아래에 표시되는 설명 텍스트입니다. size="large"일 때만 표시됩니다',
      table: {
        type: { summary: 'string' },
      },
    },
    shortcut: {
      control: 'text',
      description: '메뉴 아이템 오른쪽에 표시되는 키보드 단축키 텍스트입니다. 메뉴가 열려 있을 때 해당 단축키로 항목을 실행할 수 있습니다',
      table: {
        type: { summary: 'string' },
      },
    },
    onClick: {
      action: 'clicked',
      description: '메뉴 아이템을 클릭하거나 단축키를 누를 때 호출되는 콜백 함수입니다',
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
          <MenubarTrigger>추가 작업</MenubarTrigger>
          <MenubarContent width={200}>
            <MenubarItem leadIcon={['design', 'edit']}>편집</MenubarItem>
            <MenubarItem leadIcon={['document', 'file-copy']}>복제</MenubarItem>
            <MenubarSeparator />
            <MenubarItem leadIcon={['business', 'archive']}>보관</MenubarItem>
            <MenubarSeparator />
            <MenubarItem destructive leadIcon={['system', 'delete-bin']}>
              삭제
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
                onClick={() => addLog('새 항목 (⌘J)')}
              >
                새 항목
              </MenubarItem>
              <MenubarItem
                leadIcon={['system', 'check']}
                shortcut="⌘E"
                onClick={() => addLog('내보내기 (⌘E)')}
              >
                내보내기
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem
                leadIcon={['system', 'close']}
                shortcut="⌘B"
                onClick={() => addLog('사이드바 토글 (⌘B)')}
              >
                사이드바 토글
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
        {log.length > 0 && (
          <div className="padding-12 bg-subtle rounded-md">
            <p className="margin-0size-xs text-muted font-medium">이벤트 로그</p>
            {log.map((entry, i) => (
              <p key={i} className="margin-0size-xs text-subtle">{entry}</p>
            ))}
          </div>
        )}
      </div>
    );
  },
};
