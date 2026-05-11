import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { RiArchiveLine, RiArrowRightSLine, RiArtboardLine, RiChat1Line, RiCheckDoubleLine, RiCheckLine, RiCheckboxCircleLine, RiClipboardLine, RiCloseLine, RiCodeBoxLine, RiDeleteBinLine, RiEditLine, RiErrorWarningLine, RiExternalLinkLine, RiFileAddLine, RiFileCopyLine, RiFileTextLine, RiFolderOpenLine, RiInformationLine, RiLockLine, RiLogoutBoxRLine, RiSaveLine, RiScissorsLine, RiSettingsLine, RiUserLine } from '../../icons/Icon';

import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
} from '../ContextMenu';
import type { ContextMenuItemProps } from '../ContextMenu.types';

const meta: Meta<ContextMenuItemProps> = {
  title: 'Overlay/ContextMenu/Item',
  component: ContextMenuItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { disable: true },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['default', 'large'],
      description: '메뉴 아이템의 크기입니다. default는 기본 높이, large는 설명 텍스트를 포함할 수 있는 넓은 높이로 표시됩니다',
      table: {
        type: {
          summary: 'ContextMenuItemSize',
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
      description: 'true로 설정하면 아이템이 비활성화되어 클릭할 수 없고 흐릿하게 표시됩니다',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    inset: {
      control: 'boolean',
      description: 'true로 설정하면 왼쪽에 여백이 추가되어 체크박스/라디오 아이템과 수직 정렬됩니다',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    leadIcon: {
      control: 'object',
      description: '아이템 라벨 앞에 표시되는 아이콘 (Remixicon `Ri*` component 권장, tuple form 은 deprecated)',
      table: {
        type: {
          summary: 'IconType',
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
      description: 'true로 설정하면 리드 아이콘이 filled(채워진) 스타일로 렌더링됩니다',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    tailIcon: {
      control: 'object',
      description: '아이템 라벨 뒤쪽에 표시되는 아이콘 (Remixicon `Ri*` component 권장, tuple form 은 deprecated). 서브메뉴 화살표나 외부 링크 표시에 주로 사용됩니다',
      table: {
        type: {
          summary: 'IconType',
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
      description: 'true로 설정하면 테일 아이콘이 filled(채워진) 스타일로 렌더링됩니다',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    iconColor: {
      control: 'select',
      options: ['default', 'default-subtle', 'success', 'warning', 'destructive', 'informative'],
      description: '리드/테일 아이콘의 색상입니다. 상태를 시각적으로 나타내는 데 사용합니다 (예: success는 녹색, destructive는 빨간색)',
      table: {
        type: { summary: 'IconColor' },
        defaultValue: { summary: 'default-subtle' },
      },
    },
    caption: {
      control: 'text',
      description: '아이템 라벨 오른쪽에 표시되는 보조 텍스트입니다. 날짜, 상태 등 부가 정보를 표시합니다',
      table: {
        type: { summary: 'string' },
      },
    },
    description: {
      control: 'text',
      description: '아이템 라벨 아래에 표시되는 설명 텍스트입니다. large 사이즈에서만 표시되며, 아이템의 기능을 상세히 설명합니다',
      table: {
        type: { summary: 'string' },
      },
    },
    shortcut: {
      control: 'text',
      description: '아이템 우측에 표시되는 키보드 단축키 텍스트입니다. 메뉴가 열려 있을 때 해당 키를 누르면 onClick이 실행됩니다',
      table: {
        type: { summary: 'string' },
      },
    },
    onClick: {
      action: 'clicked',
      description: '아이템을 클릭하거나 단축키를 눌렀을 때 호출되는 콜백 함수입니다',
      table: {
        type: { summary: '() => void' },
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<ContextMenuItemProps>;

// ============================================================================
// BASIC
// ============================================================================

/**
 * 기본 MenuItem
 *
 * 이 스토리에서 ContextMenuItem의 모든 props를 테스트할 수 있습니다.
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
    shortcut: '⌘N',
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const caption = args.caption || undefined;
    const description = args.description || undefined;

    return (
      <ContextMenu>
        <ContextMenuTrigger className="flex height-[150px] width-[300px] items-center justify-center rounded-lg border border-dashed border-default bg-subtle size-sm font-body text-muted select-none">
          우클릭하세요
        </ContextMenuTrigger>
        <ContextMenuContent width={280}>
          <ContextMenuItem
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
            새 파일
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );
  },
};

/**
 * 앞 아이콘이 있는 아이템
 */
export const WithLeadIcon: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex height-[150px] width-[300px] items-center justify-center rounded-lg border border-dashed border-default bg-subtle size-sm font-body text-muted select-none">
        우클릭하세요
      </ContextMenuTrigger>
      <ContextMenuContent width={280}>
        <ContextMenuItem leadIcon={RiFileAddLine}>새 파일</ContextMenuItem>
        <ContextMenuItem leadIcon={RiFolderOpenLine}>열기</ContextMenuItem>
        <ContextMenuItem leadIcon={RiSaveLine}>저장</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

/**
 * 뒤 아이콘이 있는 아이템
 */
export const WithTailIcon: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex height-[150px] width-[300px] items-center justify-center rounded-lg border border-dashed border-default bg-subtle size-sm font-body text-muted select-none">
        우클릭하세요
      </ContextMenuTrigger>
      <ContextMenuContent width={250}>
        <ContextMenuItem tailIcon={RiArrowRightSLine}>더보기</ContextMenuItem>
        <ContextMenuItem tailIcon={RiExternalLinkLine}>외부 링크</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

/**
 * 캡션이 있는 아이템
 */
export const WithCaption: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex height-[150px] width-[300px] items-center justify-center rounded-lg border border-dashed border-default bg-subtle size-sm font-body text-muted select-none">
        우클릭하세요
      </ContextMenuTrigger>
      <ContextMenuContent width={280}>
        <ContextMenuLabel>최근 파일</ContextMenuLabel>
        <ContextMenuItem leadIcon={RiArtboardLine} caption="2분 전">
          design-system.fig
        </ContextMenuItem>
        <ContextMenuItem leadIcon={RiCodeBoxLine} caption="1시간 전">
          components.tsx
        </ContextMenuItem>
        <ContextMenuItem leadIcon={RiFileTextLine} caption="어제">
          notes.md
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

/**
 * 단축키가 있는 아이템
 */
export const WithShortcut: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex height-[150px] width-[300px] items-center justify-center rounded-lg border border-dashed border-default bg-subtle size-sm font-body text-muted select-none">
        우클릭하세요
      </ContextMenuTrigger>
      <ContextMenuContent width={250}>
        <ContextMenuItem leadIcon={RiFileAddLine} shortcut="⌘N">
          새 파일
        </ContextMenuItem>
        <ContextMenuItem leadIcon={RiFolderOpenLine} shortcut="⌘O">
          열기
        </ContextMenuItem>
        <ContextMenuItem leadIcon={RiSaveLine} shortcut="⌘S">
          저장
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

/**
 * 설명이 있는 아이템 (Large 사이즈)
 */
export const WithDescription: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex height-[150px] width-[300px] items-center justify-center rounded-lg border border-dashed border-default bg-subtle size-sm font-body text-muted select-none">
        우클릭하세요
      </ContextMenuTrigger>
      <ContextMenuContent width={300}>
        <ContextMenuItem
          size="large"
          leadIcon={RiUserLine}
          description="사용자 정보와 프로필 사진을 변경합니다"
        >
          프로필 설정
        </ContextMenuItem>
        <ContextMenuItem
          size="large"
          leadIcon={RiChat1Line}
          description="알림 환경설정을 관리합니다"
        >
          알림 설정
        </ContextMenuItem>
        <ContextMenuItem
          size="large"
          leadIcon={RiLockLine}
          description="비밀번호와 보안 옵션을 설정합니다"
        >
          보안 설정
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

// ============================================================================
// SIZES
// ============================================================================

/**
 * Default 사이즈
 */
export const SizeDefault: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex height-[150px] width-[300px] items-center justify-center rounded-lg border border-dashed border-default bg-subtle size-sm font-body text-muted select-none">
        우클릭하세요
      </ContextMenuTrigger>
      <ContextMenuContent width={250}>
        <ContextMenuItem leadIcon={RiSettingsLine}>설정</ContextMenuItem>
        <ContextMenuItem leadIcon={RiUserLine}>프로필</ContextMenuItem>
        <ContextMenuItem leadIcon={RiLogoutBoxRLine}>로그아웃</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

/**
 * Large 사이즈
 */
export const SizeLarge: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex height-[150px] width-[300px] items-center justify-center rounded-lg border border-dashed border-default bg-subtle size-sm font-body text-muted select-none">
        우클릭하세요
      </ContextMenuTrigger>
      <ContextMenuContent width={300}>
        <ContextMenuItem
          size="large"
          leadIcon={RiSettingsLine}
          description="앱 환경설정을 변경합니다"
        >
          설정
        </ContextMenuItem>
        <ContextMenuItem
          size="large"
          leadIcon={RiUserLine}
          description="프로필 정보를 수정합니다"
        >
          프로필
        </ContextMenuItem>
        <ContextMenuItem
          size="large"
          leadIcon={RiLogoutBoxRLine}
          description="계정에서 로그아웃합니다"
        >
          로그아웃
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

// ============================================================================
// STATES
// ============================================================================

/**
 * 비활성화 상태
 */
export const Disabled: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex height-[150px] width-[300px] items-center justify-center rounded-lg border border-dashed border-default bg-subtle size-sm font-body text-muted select-none">
        우클릭하세요
      </ContextMenuTrigger>
      <ContextMenuContent width={200}>
        <ContextMenuItem leadIcon={RiCheckLine}>활성 아이템</ContextMenuItem>
        <ContextMenuItem leadIcon={RiCloseLine} disabled>비활성 아이템</ContextMenuItem>
        <ContextMenuItem leadIcon={RiSettingsLine}>또 다른 활성 아이템</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

/**
 * Destructive 상태
 */
export const Destructive: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex height-[150px] width-[300px] items-center justify-center rounded-lg border border-dashed border-default bg-subtle size-sm font-body text-muted select-none">
        우클릭하세요
      </ContextMenuTrigger>
      <ContextMenuContent width={200}>
        <ContextMenuItem leadIcon={RiEditLine}>편집</ContextMenuItem>
        <ContextMenuItem leadIcon={RiFileCopyLine}>복제</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem leadIcon={RiArchiveLine}>보관</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem destructive leadIcon={RiDeleteBinLine}>
          삭제
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

// ============================================================================
// ICON COLORS
// ============================================================================

/**
 * 아이콘 색상
 */
export const IconColors: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex height-[150px] width-[300px] items-center justify-center rounded-lg border border-dashed border-default bg-subtle size-sm font-body text-muted select-none">
        우클릭하세요
      </ContextMenuTrigger>
      <ContextMenuContent width={200}>
        <ContextMenuLabel>아이콘 색상 옵션</ContextMenuLabel>
        <ContextMenuItem leadIcon={RiCheckboxCircleLine} iconColor="success">
          성공
        </ContextMenuItem>
        <ContextMenuItem leadIcon={RiErrorWarningLine} iconColor="warning">
          경고
        </ContextMenuItem>
        <ContextMenuItem leadIcon={RiDeleteBinLine} iconColor="destructive">
          위험
        </ContextMenuItem>
        <ContextMenuItem leadIcon={RiInformationLine} iconColor="informative">
          정보
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem leadIcon={RiCheckDoubleLine} iconColor="success" disabled>
          비활성화 (색상 무시됨)
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
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
          우클릭으로 메뉴를 열고 단축키를 눌러 onClick이 실행되는 것을 확인하세요.
        </p>
        <ContextMenu>
          <ContextMenuTrigger className="flex height-[150px] width-[300px] items-center justify-center rounded-lg border border-dashed border-default bg-subtle size-sm font-body text-muted select-none">
            우클릭하세요
          </ContextMenuTrigger>
          <ContextMenuContent width={220}>
            <ContextMenuItem
              leadIcon={RiScissorsLine}
              shortcut="⌘X"
              onClick={() => addLog('잘라내기 (⌘X)')}
            >
              잘라내기
            </ContextMenuItem>
            <ContextMenuItem
              leadIcon={RiFileCopyLine}
              shortcut="⌘C"
              onClick={() => addLog('복사 (⌘C)')}
            >
              복사
            </ContextMenuItem>
            <ContextMenuItem
              leadIcon={RiClipboardLine}
              shortcut="⌘V"
              onClick={() => addLog('붙여넣기 (⌘V)')}
            >
              붙여넣기
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
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
