import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCaption,
  DropdownMenuAvatar,
  DropdownMenuUserbar,
  DropdownMenuButton,
  DropdownMenuButtonGroup,
  MenuButton,
  DropdownMenuSearch,
} from '../Dropdown';
import type { DropdownMenuAvatarProps } from '../Dropdown.types';
import { Button } from '../../button';

const meta: Meta<DropdownMenuAvatarProps> = {
  title: 'Overlay/Dropdown/Special',
  component: DropdownMenuAvatar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { disable: true },
  },
  argTypes: {
    label: {
      control: 'text',
      description: '아이템 라벨',
      table: {
        type: { summary: 'string' },
      },
    },
    avatarSrc: {
      control: 'text',
      description: '아바타 이미지 URL',
      table: {
        type: { summary: 'string' },
      },
    },
    avatarAlt: {
      control: 'text',
      description: '아바타 대체 텍스트 (이미지가 없을 때 이니셜로 표시)',
      table: {
        type: { summary: 'string' },
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
    caption: {
      control: 'text',
      description: '캡션 텍스트',
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
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
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
type Story = StoryObj<DropdownMenuAvatarProps>;

// ============================================================================
// AVATAR
// ============================================================================

/**
 * 아바타 아이템
 *
 * DropdownMenuAvatar를 사용하여 사용자 목록을 표시합니다.
 */
export const Default: Story = {
  args: {
    label: '김철수',
    avatarSrc: 'https://i.pravatar.cc/40?img=1',
    avatarAlt: '김철수',
    caption: '온라인',
    shortcut: '',
    disabled: false,
    tailIcon: undefined,
    iconColor: undefined,
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const caption = args.caption || undefined;
    const shortcut = args.shortcut || undefined;

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button buttonStyle="secondary">팀</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent width={280}>
          <DropdownMenuLabel>팀원</DropdownMenuLabel>
          <DropdownMenuAvatar
            label={args.label}
            avatarSrc={args.avatarSrc}
            avatarAlt={args.avatarAlt}
            caption={caption}
            shortcut={shortcut}
            disabled={args.disabled}
            tailIcon={args.tailIcon}
            iconColor={args.iconColor}
            onClick={() => console.log('클릭:', args.label)}
          />
          <DropdownMenuAvatar
            label="이영희"
            avatarSrc="https://i.pravatar.cc/40?img=2"
            avatarAlt="이영희"
            caption="오프라인"
            onClick={() => console.log('이영희 clicked')}
          />
          <DropdownMenuAvatar
            label="박지민"
            avatarAlt="박지민"
            tailIcon={['arrows', 'arrow-right-s']}
            onClick={() => console.log('박지민 clicked')}
          />
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

/**
 * 단축키가 있는 아바타
 */
export const AvatarWithShortcut: Story = {
  render: function Render() {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button buttonStyle="secondary">계정 전환</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent width={280}>
          <DropdownMenuLabel>계정 전환</DropdownMenuLabel>
          <DropdownMenuAvatar
            label="개인 계정"
            avatarSrc="https://i.pravatar.cc/40?img=3"
            avatarAlt="개인 계정"
            shortcut="⌘1"
            onClick={() => console.log('개인 계정')}
          />
          <DropdownMenuAvatar
            label="업무 계정"
            avatarSrc="https://i.pravatar.cc/40?img=4"
            avatarAlt="업무 계정"
            shortcut="⌘2"
            onClick={() => console.log('업무 계정')}
          />
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

/**
 * 비활성화된 아바타
 */
export const AvatarDisabled: Story = {
  render: function Render() {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button buttonStyle="secondary">팀원</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent width={280}>
          <DropdownMenuLabel>팀원 선택</DropdownMenuLabel>
          <DropdownMenuAvatar
            label="활성 사용자"
            avatarSrc="https://i.pravatar.cc/40?img=5"
            avatarAlt="활성 사용자"
            caption="온라인"
            onClick={() => console.log('clicked')}
          />
          <DropdownMenuAvatar
            label="비활성 사용자"
            avatarAlt="비활성 사용자"
            caption="초대 대기 중"
            disabled
          />
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

// ============================================================================
// USERBAR
// ============================================================================

/**
 * 유저바
 *
 * DropdownMenuUserbar를 사용하여 사용자 정보를 표시합니다.
 */
export const Userbar: Story = {
  render: function Render() {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button buttonStyle="secondary">프로필</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent width={280}>
          <DropdownMenuUserbar
            name="김철수"
            description="kim@example.com"
            avatarSrc="https://i.pravatar.cc/40?img=5"
            avatarAlt="김철수"
          />
          <DropdownMenuSeparator />
          <DropdownMenuItem leadIcon={['user', 'user']}>내 프로필</DropdownMenuItem>
          <DropdownMenuItem leadIcon={['system', 'settings']}>설정</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem leadIcon={['system', 'logout-box-r']}>로그아웃</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

/**
 * 뱃지가 있는 유저바
 */
export const UserbarWithBadge: Story = {
  render: function Render() {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button buttonStyle="secondary">계정</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent width={280}>
          <DropdownMenuUserbar
            name="이영희"
            description="lee@company.com"
            avatarSrc="https://i.pravatar.cc/40?img=6"
            avatarAlt="이영희"
            badge="Pro"
            badgeColor="blue"
          />
          <DropdownMenuSeparator />
          <DropdownMenuItem leadIcon={['finance', 'bank-card']}>구독 관리</DropdownMenuItem>
          <DropdownMenuItem leadIcon={['finance', 'vip-crown']}>멤버십 업그레이드</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

// ============================================================================
// BUTTON
// ============================================================================

/**
 * 버튼 아이템
 *
 * DropdownMenuButton을 사용하여 버튼을 추가합니다.
 */
export const MenuButtonItem: Story = {
  render: function Render() {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button buttonStyle="secondary">설정</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent width={280}>
          <DropdownMenuLabel>설정</DropdownMenuLabel>
          <DropdownMenuItem leadIcon={['system', 'settings']}>일반 설정</DropdownMenuItem>
          <DropdownMenuItem leadIcon={['media', 'notification']}>알림 설정</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuButton
            label="새 워크스페이스 만들기"
            leadIcon={['system', 'add']}
            onClick={() => console.log('버튼 클릭')}
          />
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

/**
 * 버튼 그룹
 *
 * DropdownMenuButtonGroup과 MenuButton을 사용합니다.
 */
export const ButtonGroup: Story = {
  render: function Render() {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button buttonStyle="secondary">동작</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent width={280}>
          <DropdownMenuLabel>작업</DropdownMenuLabel>
          <DropdownMenuItem leadIcon={['design', 'edit']}>항목 편집</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuButtonGroup>
            <MenuButton label="취소" onClick={() => console.log('Cancel')} />
            <MenuButton label="저장" onClick={() => console.log('Save')} />
            <MenuButton label="삭제" onClick={() => console.log('Delete')} />
          </DropdownMenuButtonGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

// ============================================================================
// UTILITY
// ============================================================================

/**
 * 검색 입력
 *
 * DropdownMenuSearch를 사용하여 검색 기능을 추가합니다.
 */
export const Search: Story = {
  render: function Render() {
    const [searchValue, setSearchValue] = useState('');

    const items = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];
    const filteredItems = items.filter((item) =>
      item.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button buttonStyle="secondary">검색</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent width={280}>
          <DropdownMenuSearch
            value={searchValue}
            onChange={setSearchValue}
            placeholder="검색..."
            autoFocus={false}
          />
          {filteredItems.map((item) => (
            <DropdownMenuItem key={item} leadIcon={['food', 'bowl']}>
              {item}
            </DropdownMenuItem>
          ))}
          {filteredItems.length === 0 && (
            <DropdownMenuCaption>결과 없음</DropdownMenuCaption>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

/**
 * 캡션 텍스트
 *
 * DropdownMenuCaption을 사용하여 설명 텍스트를 추가합니다.
 */
export const Caption: Story = {
  render: function Render() {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button buttonStyle="secondary">워크스페이스</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent width={280}>
          <DropdownMenuLabel>워크스페이스</DropdownMenuLabel>
          <DropdownMenuItem leadIcon={['system', 'settings']}>프로젝트 설정</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuCaption>
            워크스페이스를 관리하고 팀원을 초대하려면 설정 메뉴를 이용하세요.
          </DropdownMenuCaption>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

/**
 * 통합 예시
 *
 * 모든 특수 컴포넌트를 조합한 예시입니다.
 */
export const AllVariants: Story = {
  render: function Render() {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button buttonStyle="secondary">모든 기능</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent width={300}>
          <DropdownMenuUserbar
            name="김철수"
            description="kim@example.com"
            avatarSrc="https://i.pravatar.cc/40?img=7"
            avatarAlt="김철수"
            badge="관리자"
            badgeColor="blue"
          />
          <DropdownMenuSeparator />

          <DropdownMenuLabel caption="2개">팀원 선택</DropdownMenuLabel>
          <DropdownMenuAvatar
            label="이영희"
            avatarSrc="https://i.pravatar.cc/40?img=8"
            avatarAlt="이영희"
            caption="온라인"
            onClick={() => console.log('이영희')}
          />
          <DropdownMenuAvatar
            label="박지민"
            avatarAlt="박지민"
            caption="오프라인"
            onClick={() => console.log('박지민')}
          />

          <DropdownMenuSeparator />

          <DropdownMenuLabel>작업</DropdownMenuLabel>
          <DropdownMenuItem leadIcon={['system', 'settings']} shortcut="⌘,">
            설정
          </DropdownMenuItem>
          <DropdownMenuItem leadIcon={['system', 'question']} tailIcon={['arrows', 'arrow-right-s']}>
            도움말
          </DropdownMenuItem>

          <DropdownMenuItem
            size="large"
            leadIcon={['system', 'add']}
            description="새로운 프로젝트를 생성합니다"
          >
            새 프로젝트
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuCaption>
            변경 사항은 자동으로 저장됩니다.
          </DropdownMenuCaption>

          <DropdownMenuButtonGroup>
            <MenuButton label="취소" onClick={() => console.log('취소')} />
            <MenuButton label="확인" onClick={() => console.log('확인')} />
          </DropdownMenuButtonGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};
