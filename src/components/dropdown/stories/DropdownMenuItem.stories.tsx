import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  RiArchiveLine,
  RiArrowRightSLine,
  RiArtboardLine,
  RiChat1Line,
  RiCheckDoubleLine,
  RiCheckLine,
  RiCheckboxCircleLine,
  RiCloseLine,
  RiCodeBoxLine,
  RiDeleteBinLine,
  RiEditLine,
  RiErrorWarningLine,
  RiExternalLinkLine,
  RiFileAddLine,
  RiFileCopyLine,
  RiFileTextLine,
  RiFolderOpenLine,
  RiInformationLine,
  RiLockLine,
  RiLogoutBoxRLine,
  RiSaveLine,
  RiSettingsLine,
  RiUserLine,
} from '../../icons/Icon';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '../Dropdown';
import type { DropdownMenuItemProps } from '../Dropdown.types';
import { Button } from '../../button';

const meta: Meta<DropdownMenuItemProps> = {
  title: 'Overlay/Dropdown/Item',
  component: DropdownMenuItem,
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
          summary: 'DropdownMenuItemSize',
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
          detail: `Remixicon component (v2.0+ direct-import only, tree-shakeable):
  leadIcon={RiAddLine}
  leadIcon={RiFileAddLine}
  leadIcon={RiArrowRightSLine}

NOTE: v1.x tuple form은 v2.0.0에서 제거됐습니다.`,
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
          detail: `Remixicon component (v2.0+ direct-import only):
  tailIcon={RiArrowRightSLine}
  tailIcon={RiExternalLinkLine}

NOTE: v1.x tuple form은 v2.0.0에서 제거됐습니다.`,
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
type Story = StoryObj<DropdownMenuItemProps>;

// ============================================================================
// BASIC
// ============================================================================

/**
 * 기본 MenuItem
 *
 * 이 스토리에서 DropdownMenuItem의 모든 props를 테스트할 수 있습니다.
 */
export const Default: Story = {
  args: {
    size: 'default',
    destructive: false,
    disabled: false,
    inset: false,
    leadIcon: RiFileAddLine,
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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button buttonStyle="secondary">메뉴 열기</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent width={280}>
          <DropdownMenuItem
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
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

/**
 * 앞 아이콘이 있는 아이템
 */
export const WithLeadIcon: Story = {
  render: function Render() {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button buttonStyle="secondary">메뉴 열기</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent width={280}>
          <DropdownMenuItem leadIcon={RiFileAddLine}>새 파일</DropdownMenuItem>
          <DropdownMenuItem leadIcon={RiFolderOpenLine}>열기</DropdownMenuItem>
          <DropdownMenuItem leadIcon={RiSaveLine}>저장</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

/**
 * 뒤 아이콘이 있는 아이템
 */
export const WithTailIcon: Story = {
  render: function Render() {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button buttonStyle="secondary">메뉴 열기</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent width={250}>
          <DropdownMenuItem tailIcon={RiArrowRightSLine}>더보기</DropdownMenuItem>
          <DropdownMenuItem tailIcon={RiExternalLinkLine}>외부 링크</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

/**
 * 캡션이 있는 아이템
 */
export const WithCaption: Story = {
  render: function Render() {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button buttonStyle="secondary">메뉴 열기</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent width={280}>
          <DropdownMenuLabel>최근 파일</DropdownMenuLabel>
          <DropdownMenuItem leadIcon={RiArtboardLine} caption="2분 전">
            design-system.fig
          </DropdownMenuItem>
          <DropdownMenuItem leadIcon={RiCodeBoxLine} caption="1시간 전">
            components.tsx
          </DropdownMenuItem>
          <DropdownMenuItem leadIcon={RiFileTextLine} caption="어제">
            notes.md
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

/**
 * 단축키가 있는 아이템
 */
export const WithShortcut: Story = {
  render: function Render() {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button buttonStyle="secondary">메뉴 열기</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent width={250}>
          <DropdownMenuItem leadIcon={RiFileAddLine} shortcut="⌘J">
            새 항목
          </DropdownMenuItem>
          <DropdownMenuItem leadIcon={RiFolderOpenLine} shortcut="⌘O">
            열기
          </DropdownMenuItem>
          <DropdownMenuItem leadIcon={RiSaveLine} shortcut="⌘E">
            내보내기
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

/**
 * 설명이 있는 아이템 (Large 사이즈)
 */
export const WithDescription: Story = {
  render: function Render() {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button buttonStyle="secondary">설정</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent width={300}>
          <DropdownMenuItem
            size="large"
            leadIcon={RiUserLine}
            description="사용자 정보와 프로필 사진을 변경합니다"
          >
            프로필 설정
          </DropdownMenuItem>
          <DropdownMenuItem
            size="large"
            leadIcon={RiChat1Line}
            description="알림 환경설정을 관리합니다"
          >
            알림 설정
          </DropdownMenuItem>
          <DropdownMenuItem
            size="large"
            leadIcon={RiLockLine}
            description="비밀번호와 보안 옵션을 설정합니다"
          >
            보안 설정
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button buttonStyle="secondary">기본 크기</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent width={250}>
          <DropdownMenuItem leadIcon={RiSettingsLine}>설정</DropdownMenuItem>
          <DropdownMenuItem leadIcon={RiUserLine}>프로필</DropdownMenuItem>
          <DropdownMenuItem leadIcon={RiLogoutBoxRLine}>로그아웃</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

/**
 * Large 사이즈
 */
export const SizeLarge: Story = {
  render: function Render() {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button buttonStyle="secondary">큰 크기</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent width={300}>
          <DropdownMenuItem
            size="large"
            leadIcon={RiSettingsLine}
            description="앱 환경설정을 변경합니다"
          >
            설정
          </DropdownMenuItem>
          <DropdownMenuItem
            size="large"
            leadIcon={RiUserLine}
            description="프로필 정보를 수정합니다"
          >
            프로필
          </DropdownMenuItem>
          <DropdownMenuItem
            size="large"
            leadIcon={RiLogoutBoxRLine}
            description="계정에서 로그아웃합니다"
          >
            로그아웃
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button buttonStyle="secondary">옵션</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent width={200}>
          <DropdownMenuItem leadIcon={RiCheckLine}>활성 아이템</DropdownMenuItem>
          <DropdownMenuItem leadIcon={RiCloseLine} disabled>비활성 아이템</DropdownMenuItem>
          <DropdownMenuItem leadIcon={RiSettingsLine}>또 다른 활성 아이템</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

/**
 * Destructive 상태
 */
export const Destructive: Story = {
  render: function Render() {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button buttonStyle="secondary">더 보기</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent width={200}>
          <DropdownMenuItem leadIcon={RiEditLine}>편집</DropdownMenuItem>
          <DropdownMenuItem leadIcon={RiFileCopyLine}>복제</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem leadIcon={RiArchiveLine}>보관</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem destructive leadIcon={RiDeleteBinLine}>
            삭제
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button buttonStyle="secondary">상태</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent width={200}>
          <DropdownMenuLabel>아이콘 색상 옵션</DropdownMenuLabel>
          <DropdownMenuItem leadIcon={RiCheckboxCircleLine} iconColor="success">
            성공
          </DropdownMenuItem>
          <DropdownMenuItem leadIcon={RiErrorWarningLine} iconColor="warning">
            경고
          </DropdownMenuItem>
          <DropdownMenuItem leadIcon={RiDeleteBinLine} iconColor="destructive">
            위험
          </DropdownMenuItem>
          <DropdownMenuItem leadIcon={RiInformationLine} iconColor="informative">
            정보
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem leadIcon={RiCheckDoubleLine} iconColor="success" disabled>
            Disabled (색상 무시됨)
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button buttonStyle="secondary">파일</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent width={220}>
            <DropdownMenuItem
              leadIcon={RiFileAddLine}
              shortcut="⌘J"
              onClick={() => addLog('새 항목 (⌘J)')}
            >
              새 항목
            </DropdownMenuItem>
            <DropdownMenuItem
              leadIcon={RiCheckLine}
              shortcut="⌘E"
              onClick={() => addLog('내보내기 (⌘E)')}
            >
              내보내기
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              leadIcon={RiDeleteBinLine}
              shortcut="⌘⌫"
              destructive
              onClick={() => addLog('삭제 (⌘⌫)')}
            >
              삭제
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
