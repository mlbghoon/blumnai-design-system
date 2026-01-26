import type { Meta, StoryObj } from '@storybook/react';

import { DropdownMenu } from './DropdownMenu';
import { DropdownMenuItem } from './DropdownMenuItem';
import { DropdownMenuLabel } from './DropdownMenuLabel';
import { DropdownMenuDivider } from './DropdownMenuDivider';
import { DropdownMenuButton } from './DropdownMenuButton';
import { DropdownMenuButtonGroup } from './DropdownMenuButtonGroup';
import { DropdownMenuCaption } from './DropdownMenuCaption';
import { DropdownMenuAvatar } from './DropdownMenuAvatar';
import { DropdownMenuUserbar } from './DropdownMenuUserbar';
import { MenuButton } from './MenuButton';

const meta: Meta<typeof DropdownMenu> = {
  title: 'Components/Dropdown/DropdownMenu',
  component: DropdownMenu,
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  tags: ['autodocs'],
  argTypes: {
    width: {
      control: 'number',
      description: '메뉴 너비 (px)',
      table: {
        type: { summary: 'number | string' },
      },
    },
    children: {
      control: false,
      description: '메뉴 컨텐츠',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DropdownMenu>;

/**
 * 기본 DropdownMenu
 */
export const Default: Story = {
  args: {
    width: 250,
  },
  render: (args) => (
    <DropdownMenu {...args}>
      <DropdownMenuItem label="메뉴 아이템 1" leadIcon={['buildings', 'home']} />
      <DropdownMenuItem label="메뉴 아이템 2" leadIcon={['system', 'settings']} />
      <DropdownMenuItem label="메뉴 아이템 3" leadIcon={['user', 'user']} />
    </DropdownMenu>
  ),
  parameters: {
    controls: { disable: false },
  },
};

/**
 * 아이콘과 캡션
 */
export const WithIconsAndCaptions: Story = {
  render: () => (
    <DropdownMenu width={280}>
      <DropdownMenuItem
        label="새 파일"
        leadIcon={['document', 'file-add']}
        shortcut="⌘N"
      />
      <DropdownMenuItem
        label="열기"
        leadIcon={['document', 'folder-open']}
        shortcut="⌘O"
      />
      <DropdownMenuItem
        label="저장"
        leadIcon={['device', 'save']}
        shortcut="⌘S"
      />
      <DropdownMenuDivider />
      <DropdownMenuItem
        label="내보내기"
        leadIcon={['arrows', 'arrow-right-up']}
        caption="PDF"
      />
    </DropdownMenu>
  ),
};

/**
 * 섹션 라벨
 */
export const WithSectionLabels: Story = {
  render: () => (
    <DropdownMenu width={250}>
      <DropdownMenuLabel>파일</DropdownMenuLabel>
      <DropdownMenuItem label="새 파일" leadIcon={['document', 'file-add']} />
      <DropdownMenuItem label="열기" leadIcon={['document', 'folder-open']} />
      <DropdownMenuDivider />
      <DropdownMenuLabel>편집</DropdownMenuLabel>
      <DropdownMenuItem label="실행 취소" leadIcon={['arrows', 'arrow-go-back']} shortcut="⌘Z" />
      <DropdownMenuItem label="다시 실행" leadIcon={['arrows', 'arrow-go-forward']} shortcut="⇧⌘Z" />
    </DropdownMenu>
  ),
};

/**
 * 비활성화 아이템
 */
export const DisabledItems: Story = {
  render: () => (
    <DropdownMenu width={250}>
      <DropdownMenuItem label="활성 아이템" leadIcon={['system', 'check']} />
      <DropdownMenuItem label="비활성 아이템" leadIcon={['system', 'close']} disabled />
      <DropdownMenuItem label="또 다른 활성 아이템" leadIcon={['system', 'settings']} />
    </DropdownMenu>
  ),
};

/**
 * 서브메뉴 화살표
 */
export const WithSubmenuArrow: Story = {
  render: () => (
    <DropdownMenu width={250}>
      <DropdownMenuItem label="설정" leadIcon={['system', 'settings']} />
      <DropdownMenuItem
        label="추가 옵션"
        leadIcon={['system', 'more']}
        tailIcon={['arrows', 'arrow-right-s']}
      />
      <DropdownMenuItem
        label="고급 설정"
        leadIcon={['system', 'settings-2']}
        tailIcon={['arrows', 'arrow-right-s']}
      />
    </DropdownMenu>
  ),
};

/**
 * Large 사이즈 아이템
 */
export const LargeItems: Story = {
  render: () => (
    <DropdownMenu width={300}>
      <DropdownMenuItem
        size="large"
        label="프로필 설정"
        description="사용자 정보와 프로필 사진을 변경합니다"
        leadIcon={['user', 'user']}
      />
      <DropdownMenuItem
        size="large"
        label="알림 설정"
        description="알림 환경설정을 관리합니다"
        leadIcon={['communication', 'chat-1']}
      />
      <DropdownMenuItem
        size="large"
        label="보안 설정"
        description="비밀번호와 보안 옵션을 설정합니다"
        leadIcon={['system', 'lock']}
      />
    </DropdownMenu>
  ),
};

/**
 * 복합 예시
 */
export const ComplexExample: Story = {
  render: () => (
    <DropdownMenu width={280}>
      <DropdownMenuLabel>빠른 작업</DropdownMenuLabel>
      <DropdownMenuItem
        label="새 문서"
        leadIcon={['document', 'file-add']}
        shortcut="⌘N"
      />
      <DropdownMenuItem
        label="새 폴더"
        leadIcon={['document', 'folder-add']}
        shortcut="⇧⌘N"
      />
      <DropdownMenuDivider />
      <DropdownMenuLabel>최근 파일</DropdownMenuLabel>
      <DropdownMenuItem
        label="design-system.fig"
        leadIcon={['design', 'artboard']}
        caption="2분 전"
      />
      <DropdownMenuItem
        label="components.tsx"
        leadIcon={['development', 'code-box']}
        caption="1시간 전"
      />
      <DropdownMenuItem
        label="notes.md"
        leadIcon={['document', 'file-text']}
        caption="어제"
      />
      <DropdownMenuDivider />
      <DropdownMenuItem
        label="모두 보기"
        tailIcon={['arrows', 'arrow-right-s']}
      />
    </DropdownMenu>
  ),
};

/**
 * 버튼 아이템
 */
export const WithButton: Story = {
  render: () => (
    <DropdownMenu width={280}>
      <DropdownMenuLabel>설정</DropdownMenuLabel>
      <DropdownMenuItem
        label="일반 설정"
        leadIcon={['system', 'settings']}
      />
      <DropdownMenuItem
        label="알림 설정"
        leadIcon={['media', 'notification']}
      />
      <DropdownMenuDivider />
      <DropdownMenuButton
        label="새 워크스페이스 만들기"
        leadIcon={['system', 'add']}
        onClick={() => console.log('Button clicked')}
      />
    </DropdownMenu>
  ),
};

/**
 * 버튼 그룹 아이템
 */
export const WithButtonGroup: Story = {
  render: () => (
    <DropdownMenu width={280}>
      <DropdownMenuLabel>작업</DropdownMenuLabel>
      <DropdownMenuItem
        label="항목 편집"
        leadIcon={['design', 'edit']}
      />
      <DropdownMenuDivider />
      <DropdownMenuButtonGroup>
        <MenuButton label="취소" onClick={() => console.log('Cancel')} />
        <MenuButton label="저장" onClick={() => console.log('Save')} />
        <MenuButton label="삭제" onClick={() => console.log('Delete')} />
      </DropdownMenuButtonGroup>
    </DropdownMenu>
  ),
};

/**
 * 캡션이 있는 라벨
 */
export const LabelWithCaption: Story = {
  render: () => (
    <DropdownMenu width={280}>
      <DropdownMenuLabel caption="3개">최근 파일</DropdownMenuLabel>
      <DropdownMenuItem
        label="design-system.fig"
        leadIcon={['design', 'artboard']}
      />
      <DropdownMenuItem
        label="components.tsx"
        leadIcon={['development', 'code-box']}
      />
      <DropdownMenuItem
        label="notes.md"
        leadIcon={['document', 'file-text']}
      />
      <DropdownMenuDivider />
      <DropdownMenuLabel caption="Ctrl+K">빠른 실행</DropdownMenuLabel>
      <DropdownMenuItem
        label="명령 팔레트"
        leadIcon={['development', 'command']}
      />
    </DropdownMenu>
  ),
};

/**
 * 캡션 텍스트
 */
export const WithCaption: Story = {
  render: () => (
    <DropdownMenu width={280}>
      <DropdownMenuLabel>워크스페이스</DropdownMenuLabel>
      <DropdownMenuItem
        label="프로젝트 설정"
        leadIcon={['system', 'settings']}
      />
      <DropdownMenuDivider />
      <DropdownMenuCaption>
        워크스페이스를 관리하고 팀원을 초대하려면 설정 메뉴를 이용하세요.
      </DropdownMenuCaption>
    </DropdownMenu>
  ),
};

/**
 * 아바타 아이템
 */
export const WithAvatarItems: Story = {
  render: () => (
    <DropdownMenu width={280}>
      <DropdownMenuLabel>팀원</DropdownMenuLabel>
      <DropdownMenuAvatar
        label="김철수"
        avatarSrc="https://i.pravatar.cc/40?img=1"
        avatarAlt="김철수"
        caption="온라인"
        onClick={() => console.log('김철수 clicked')}
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
      <DropdownMenuDivider />
      <DropdownMenuAvatar
        label="비활성 사용자"
        avatarAlt="비활성 사용자"
        disabled
      />
    </DropdownMenu>
  ),
};

/**
 * 아바타 아이템 (단축키 포함)
 */
export const AvatarWithShortcut: Story = {
  render: () => (
    <DropdownMenu width={280}>
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
    </DropdownMenu>
  ),
};

/**
 * 유저바
 */
export const WithUserbar: Story = {
  render: () => (
    <DropdownMenu width={280}>
      <DropdownMenuUserbar
        name="김철수"
        description="kim@example.com"
        avatarSrc="https://i.pravatar.cc/40?img=5"
        avatarAlt="김철수"
      />
      <DropdownMenuDivider />
      <DropdownMenuItem
        label="내 프로필"
        leadIcon={['user', 'user']}
      />
      <DropdownMenuItem
        label="설정"
        leadIcon={['system', 'settings']}
      />
      <DropdownMenuDivider />
      <DropdownMenuItem
        label="로그아웃"
        leadIcon={['system', 'logout-box-r']}
      />
    </DropdownMenu>
  ),
};

/**
 * 유저바 (뱃지 포함)
 */
export const UserbarWithBadge: Story = {
  render: () => (
    <DropdownMenu width={280}>
      <DropdownMenuUserbar
        name="이영희"
        description="lee@company.com"
        avatarSrc="https://i.pravatar.cc/40?img=6"
        avatarAlt="이영희"
        badge="Pro"
      />
      <DropdownMenuDivider />
      <DropdownMenuItem
        label="구독 관리"
        leadIcon={['finance', 'bank-card']}
      />
      <DropdownMenuItem
        label="멤버십 업그레이드"
        leadIcon={['system', 'vip-crown']}
      />
    </DropdownMenu>
  ),
};

/**
 * 유저바 (아바타 없음)
 */
export const UserbarWithoutAvatar: Story = {
  render: () => (
    <DropdownMenu width={280}>
      <DropdownMenuUserbar
        name="박지민"
        description="park@example.com"
        avatarAlt="박지민"
        badge="Free"
      />
      <DropdownMenuDivider />
      <DropdownMenuItem
        label="내 프로필"
        leadIcon={['user', 'user']}
      />
    </DropdownMenu>
  ),
};

/**
 * 모든 변형 통합 예시
 */
export const AllVariants: Story = {
  render: () => (
    <DropdownMenu width={300}>
      {/* Userbar */}
      <DropdownMenuUserbar
        name="김철수"
        description="kim@example.com"
        avatarSrc="https://i.pravatar.cc/40?img=7"
        avatarAlt="김철수"
        badge="Admin"
      />
      <DropdownMenuDivider />

      {/* Label with caption */}
      <DropdownMenuLabel caption="2개">팀원 선택</DropdownMenuLabel>

      {/* Avatar items */}
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

      <DropdownMenuDivider />

      {/* Default items */}
      <DropdownMenuLabel>작업</DropdownMenuLabel>
      <DropdownMenuItem
        label="설정"
        leadIcon={['system', 'settings']}
        shortcut="⌘,"
      />
      <DropdownMenuItem
        label="도움말"
        leadIcon={['system', 'question']}
        tailIcon={['arrows', 'arrow-right-s']}
      />

      {/* Large item */}
      <DropdownMenuItem
        size="large"
        label="새 프로젝트"
        description="새로운 프로젝트를 생성합니다"
        leadIcon={['system', 'add']}
      />

      <DropdownMenuDivider />

      {/* Caption */}
      <DropdownMenuCaption>
        변경 사항은 자동으로 저장됩니다.
      </DropdownMenuCaption>

      {/* Button group */}
      <DropdownMenuButtonGroup>
        <MenuButton label="취소" onClick={() => console.log('취소')} />
        <MenuButton label="확인" onClick={() => console.log('확인')} />
      </DropdownMenuButtonGroup>
    </DropdownMenu>
  ),
};
