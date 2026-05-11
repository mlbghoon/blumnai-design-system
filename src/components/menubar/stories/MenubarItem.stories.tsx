import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { RiArchiveLine, RiArrowRightSLine, RiArtboardLine, RiChat1Line, RiCheckDoubleLine, RiCheckLine, RiCheckboxCircleLine, RiCloseLine, RiCodeBoxLine, RiDeleteBinLine, RiEditLine, RiErrorWarningLine, RiExternalLinkLine, RiFileAddLine, RiFileCopyLine, RiFileTextLine, RiFolderOpenLine, RiInformationLine, RiLockLine, RiLogoutBoxRLine, RiSaveLine, RiSettingsLine, RiUserLine } from '../../icons/Icon';

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
      description: '앞에 표시되는 아이콘 (Remixicon `Ri*` component 권장, tuple form 은 deprecated)',
      table: {
        type: {
          summary: 'IconProp',
          detail: `Remixicon component (권장, tree-shakeable):
  leadIcon={RiAddLine}
  leadIcon={RiFileAddLine}
  leadIcon={RiArrowRightSLine}

또는 tuple form (deprecated, dev console warning):
  leadIcon={['system', 'add']}
  leadIcon={['document', 'file-add']}`,
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
      description: '뒤에 표시되는 아이콘 (Remixicon `Ri*` component 권장, tuple form 은 deprecated)',
      table: {
        type: {
          summary: 'IconProp',
          detail: `Remixicon component (권장, tree-shakeable):
  tailIcon={RiArrowRightSLine}
  tailIcon={RiExternalLinkLine}

또는 tuple form (deprecated, dev console warning):
  tailIcon={['arrows', 'arrow-right-s']}
  tailIcon={['arrows', 'external-link']}`,
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
          <MenubarTrigger>메뉴</MenubarTrigger>
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
          <MenubarTrigger>파일</MenubarTrigger>
          <MenubarContent width={280}>
            <MenubarItem leadIcon={RiFileAddLine}>새 파일</MenubarItem>
            <MenubarItem leadIcon={RiFolderOpenLine}>열기</MenubarItem>
            <MenubarItem leadIcon={RiSaveLine}>저장</MenubarItem>
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
          <MenubarTrigger>작업</MenubarTrigger>
          <MenubarContent width={250}>
            <MenubarItem tailIcon={RiArrowRightSLine}>더보기</MenubarItem>
            <MenubarItem tailIcon={RiExternalLinkLine}>외부 링크</MenubarItem>
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
          <MenubarTrigger>최근 항목</MenubarTrigger>
          <MenubarContent width={280}>
            <MenubarLabel>최근 파일</MenubarLabel>
            <MenubarItem leadIcon={RiArtboardLine} caption="2분 전">
              design-system.fig
            </MenubarItem>
            <MenubarItem leadIcon={RiCodeBoxLine} caption="1시간 전">
              components.tsx
            </MenubarItem>
            <MenubarItem leadIcon={RiFileTextLine} caption="어제">
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
          <MenubarTrigger>파일</MenubarTrigger>
          <MenubarContent width={250}>
            <MenubarItem leadIcon={RiFileAddLine} shortcut="⌘J">
              새 항목
            </MenubarItem>
            <MenubarItem leadIcon={RiFolderOpenLine} shortcut="⌘O">
              열기
            </MenubarItem>
            <MenubarItem leadIcon={RiSaveLine} shortcut="⌘E">
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
          <MenubarTrigger>설정</MenubarTrigger>
          <MenubarContent width={300}>
            <MenubarItem
              size="large"
              leadIcon={RiUserLine}
              description="사용자 정보와 프로필 사진을 변경합니다"
            >
              프로필 설정
            </MenubarItem>
            <MenubarItem
              size="large"
              leadIcon={RiChat1Line}
              description="알림 환경설정을 관리합니다"
            >
              알림 설정
            </MenubarItem>
            <MenubarItem
              size="large"
              leadIcon={RiLockLine}
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
          <MenubarTrigger>기본 크기</MenubarTrigger>
          <MenubarContent width={250}>
            <MenubarItem leadIcon={RiSettingsLine}>설정</MenubarItem>
            <MenubarItem leadIcon={RiUserLine}>프로필</MenubarItem>
            <MenubarItem leadIcon={RiLogoutBoxRLine}>로그아웃</MenubarItem>
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
          <MenubarTrigger>큰 크기</MenubarTrigger>
          <MenubarContent width={300}>
            <MenubarItem
              size="large"
              leadIcon={RiSettingsLine}
              description="앱 환경설정을 변경합니다"
            >
              설정
            </MenubarItem>
            <MenubarItem
              size="large"
              leadIcon={RiUserLine}
              description="프로필 정보를 수정합니다"
            >
              프로필
            </MenubarItem>
            <MenubarItem
              size="large"
              leadIcon={RiLogoutBoxRLine}
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
          <MenubarTrigger>옵션</MenubarTrigger>
          <MenubarContent width={200}>
            <MenubarItem leadIcon={RiCheckLine}>활성 아이템</MenubarItem>
            <MenubarItem leadIcon={RiCloseLine} disabled>비활성 아이템</MenubarItem>
            <MenubarItem leadIcon={RiSettingsLine}>또 다른 활성 아이템</MenubarItem>
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
          <MenubarTrigger>더 보기</MenubarTrigger>
          <MenubarContent width={200}>
            <MenubarItem leadIcon={RiEditLine}>편집</MenubarItem>
            <MenubarItem leadIcon={RiFileCopyLine}>복제</MenubarItem>
            <MenubarSeparator />
            <MenubarItem leadIcon={RiArchiveLine}>보관</MenubarItem>
            <MenubarSeparator />
            <MenubarItem destructive leadIcon={RiDeleteBinLine}>
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
          <MenubarTrigger>상태</MenubarTrigger>
          <MenubarContent width={200}>
            <MenubarLabel>아이콘 색상 옵션</MenubarLabel>
            <MenubarItem leadIcon={RiCheckboxCircleLine} iconColor="success">
              성공
            </MenubarItem>
            <MenubarItem leadIcon={RiErrorWarningLine} iconColor="warning">
              경고
            </MenubarItem>
            <MenubarItem leadIcon={RiDeleteBinLine} iconColor="destructive">
              위험
            </MenubarItem>
            <MenubarItem leadIcon={RiInformationLine} iconColor="informative">
              정보
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem leadIcon={RiCheckDoubleLine} iconColor="success" disabled>
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
        <p className="margin-0 size-sm text-subtle">
          메뉴를 열고 단축키를 눌러 onClick이 실행되는 것을 확인하세요.
        </p>
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>파일</MenubarTrigger>
            <MenubarContent width={220}>
              <MenubarItem
                leadIcon={RiFileAddLine}
                shortcut="⌘J"
                onClick={() => addLog('새 항목 (⌘J)')}
              >
                새 항목
              </MenubarItem>
              <MenubarItem
                leadIcon={RiCheckLine}
                shortcut="⌘E"
                onClick={() => addLog('내보내기 (⌘E)')}
              >
                내보내기
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem
                leadIcon={RiCloseLine}
                shortcut="⌘B"
                onClick={() => addLog('사이드바 전환 (⌘B)')}
              >
                사이드바 전환
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
        {log.length > 0 && (
          <div className="padding-12 bg-subtle rounded-md">
            <p className="margin-0 size-xs text-muted font-medium">이벤트 로그</p>
            {log.map((entry, i) => (
              <p key={i} className="margin-0 size-xs text-subtle">{entry}</p>
            ))}
          </div>
        )}
      </div>
    );
  },
};
