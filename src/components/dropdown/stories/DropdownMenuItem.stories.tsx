import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

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
      description: '메뉴 아이템의 크기입니다. default는 기본 높이, large는 설명 텍스트를 포함할 수 있는 넓은 높이로 표시됩니다',
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
      description: '아이템 라벨 앞에 표시되는 아이콘입니다. [카테고리, 아이콘명] 튜플 형식으로 지정합니다',
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
      description: 'true로 설정하면 리드 아이콘이 filled(채워진) 스타일로 렌더링됩니다',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    tailIcon: {
      control: 'object',
      description: '아이템 라벨 뒤쪽에 표시되는 아이콘입니다. 서브메뉴 화살표나 외부 링크 표시에 주로 사용됩니다',
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
          <DropdownMenuItem leadIcon={['document', 'file-add']}>새 파일</DropdownMenuItem>
          <DropdownMenuItem leadIcon={['document', 'folder-open']}>열기</DropdownMenuItem>
          <DropdownMenuItem leadIcon={['device', 'save']}>저장</DropdownMenuItem>
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
          <DropdownMenuItem tailIcon={['arrows', 'arrow-right-s']}>더보기</DropdownMenuItem>
          <DropdownMenuItem tailIcon={['system', 'external-link']}>외부 링크</DropdownMenuItem>
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
          <DropdownMenuItem leadIcon={['design', 'artboard']} caption="2분 전">
            design-system.fig
          </DropdownMenuItem>
          <DropdownMenuItem leadIcon={['development', 'code-box']} caption="1시간 전">
            components.tsx
          </DropdownMenuItem>
          <DropdownMenuItem leadIcon={['document', 'file-text']} caption="어제">
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
          <DropdownMenuItem leadIcon={['document', 'file-add']} shortcut="⌘J">
            새 항목
          </DropdownMenuItem>
          <DropdownMenuItem leadIcon={['document', 'folder-open']} shortcut="⌘O">
            열기
          </DropdownMenuItem>
          <DropdownMenuItem leadIcon={['device', 'save']} shortcut="⌘E">
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
            leadIcon={['user', 'user']}
            description="사용자 정보와 프로필 사진을 변경합니다"
          >
            프로필 설정
          </DropdownMenuItem>
          <DropdownMenuItem
            size="large"
            leadIcon={['communication', 'chat-1']}
            description="알림 환경설정을 관리합니다"
          >
            알림 설정
          </DropdownMenuItem>
          <DropdownMenuItem
            size="large"
            leadIcon={['system', 'lock']}
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
          <DropdownMenuItem leadIcon={['system', 'settings']}>설정</DropdownMenuItem>
          <DropdownMenuItem leadIcon={['user', 'user']}>프로필</DropdownMenuItem>
          <DropdownMenuItem leadIcon={['system', 'logout-box-r']}>로그아웃</DropdownMenuItem>
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
            leadIcon={['system', 'settings']}
            description="앱 환경설정을 변경합니다"
          >
            설정
          </DropdownMenuItem>
          <DropdownMenuItem
            size="large"
            leadIcon={['user', 'user']}
            description="프로필 정보를 수정합니다"
          >
            프로필
          </DropdownMenuItem>
          <DropdownMenuItem
            size="large"
            leadIcon={['system', 'logout-box-r']}
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
          <DropdownMenuItem leadIcon={['system', 'check']}>활성 아이템</DropdownMenuItem>
          <DropdownMenuItem leadIcon={['system', 'close']} disabled>비활성 아이템</DropdownMenuItem>
          <DropdownMenuItem leadIcon={['system', 'settings']}>또 다른 활성 아이템</DropdownMenuItem>
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
          <Button buttonStyle="secondary">추가 작업</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent width={200}>
          <DropdownMenuItem leadIcon={['design', 'edit']}>편집</DropdownMenuItem>
          <DropdownMenuItem leadIcon={['document', 'file-copy']}>복제</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem leadIcon={['business', 'archive']}>보관</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem destructive leadIcon={['system', 'delete-bin']}>
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
          <DropdownMenuItem leadIcon={['system', 'checkbox-circle']} iconColor="success">
            성공
          </DropdownMenuItem>
          <DropdownMenuItem leadIcon={['system', 'error-warning']} iconColor="warning">
            경고
          </DropdownMenuItem>
          <DropdownMenuItem leadIcon={['system', 'delete-bin']} iconColor="destructive">
            위험
          </DropdownMenuItem>
          <DropdownMenuItem leadIcon={['system', 'information']} iconColor="informative">
            정보
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem leadIcon={['system', 'check-double']} iconColor="success" disabled>
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
        <p className="margin-0size-sm text-subtle">
          메뉴를 열고 단축키를 눌러 onClick이 실행되는 것을 확인하세요.
        </p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button buttonStyle="secondary">파일</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent width={220}>
            <DropdownMenuItem
              leadIcon={['document', 'file-add']}
              shortcut="⌘J"
              onClick={() => addLog('새 항목 (⌘J)')}
            >
              새 항목
            </DropdownMenuItem>
            <DropdownMenuItem
              leadIcon={['system', 'check']}
              shortcut="⌘E"
              onClick={() => addLog('내보내기 (⌘E)')}
            >
              내보내기
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              leadIcon={['system', 'delete-bin']}
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
