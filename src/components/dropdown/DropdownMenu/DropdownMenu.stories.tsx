import type { Meta, StoryObj } from '@storybook/react';
import type React from 'react';

import { DropdownMenu } from './DropdownMenu';
import { DropdownMenuItem } from './DropdownMenuItem';
import { DropdownMenuLabel } from './DropdownMenuLabel';
import { DropdownMenuDivider } from './DropdownMenuDivider';
import { DropdownMenuButton } from './DropdownMenuButton';
import { DropdownMenuButtonGroup } from './DropdownMenuButtonGroup';
import { DropdownMenuCaption } from './DropdownMenuCaption';
import { DropdownMenuAvatar } from './DropdownMenuAvatar';
import { DropdownMenuUserbar } from './DropdownMenuUserbar';
import { DropdownMenuSearch } from './DropdownMenuSearch';
import { MenuButton } from './MenuButton';
import type { IconColor } from '../../icons/Icon/Icon.types';
import type { BadgeColor } from '../../badge/Badge/Badge.types';
import type { ButtonStyle } from '../../button/Button.types';

const meta: Meta<typeof DropdownMenu> = {
  title: 'Components/Dropdown/DropdownMenu',
  component: DropdownMenu,
  subcomponents: {
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuDivider,
    DropdownMenuButton,
    DropdownMenuButtonGroup,
    DropdownMenuCaption,
    DropdownMenuAvatar,
    DropdownMenuUserbar,
    MenuButton,
  } as Record<string, React.ComponentType<unknown>>,
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  tags: ['autodocs'],
  argTypes: {
    // DropdownMenu props
    width: {
      control: 'number',
      description: '메뉴 너비 (픽셀 숫자 또는 CSS 값). 지정하지 않으면 min-width: 200px, max-width: 320px 적용',
      table: {
        type: { summary: 'number | string' },
        category: 'DropdownMenu',
      },
    },
    children: {
      control: false,
      description: '메뉴 컨텐츠 (DropdownMenuItem, DropdownMenuLabel 등)',
      type: { required: true },
      table: {
        type: { summary: 'ReactNode' },
        category: 'DropdownMenu',
      },
    },
  },
};

/**
 * ## 서브컴포넌트 Props
 *
 * ### DropdownMenuItem
 * | Prop | Type | Default | Description |
 * |------|------|---------|-------------|
 * | `label` | `string` | - | 메뉴 아이템 라벨 |
 * | `size` | `'default' \| 'large'` | `'default'` | 아이템 사이즈 |
 * | `leadIcon` | `IconType` | - | 라벨 앞에 표시되는 아이콘 |
 * | `tailIcon` | `IconType` | - | 라벨 뒤에 표시되는 아이콘 |
 * | `caption` | `string` | - | 캡션 텍스트 (라벨 옆에 표시) |
 * | `description` | `string` | - | 설명 텍스트 (large 사이즈에서만 표시) |
 * | `shortcut` | `string` | - | 단축키 표시 |
 * | `disabled` | `boolean` | `false` | 비활성화 여부 |
 * | `iconColor` | `IconColor` | - | 아이콘 색상 |
 * | `onClick` | `() => void` | - | 클릭 이벤트 핸들러 |
 *
 * ### DropdownMenuLabel
 * | Prop | Type | Default | Description |
 * |------|------|---------|-------------|
 * | `children` | `ReactNode` | - | 섹션 라벨 텍스트 |
 * | `caption` | `string` | - | 라벨 우측에 표시되는 캡션 텍스트 |
 *
 * ### DropdownMenuAvatar
 * | Prop | Type | Default | Description |
 * |------|------|---------|-------------|
 * | `label` | `string` | - | 아이템 라벨 |
 * | `avatarSrc` | `string` | - | 아바타 이미지 URL |
 * | `avatarAlt` | `string` | - | 아바타 대체 텍스트 |
 * | `tailIcon` | `IconType` | - | 라벨 뒤에 표시되는 아이콘 |
 * | `caption` | `string` | - | 캡션 텍스트 |
 * | `shortcut` | `string` | - | 단축키 표시 |
 * | `disabled` | `boolean` | `false` | 비활성화 여부 |
 * | `iconColor` | `IconColor` | - | 아이콘 색상 |
 * | `onClick` | `() => void` | - | 클릭 이벤트 핸들러 |
 *
 * ### DropdownMenuUserbar
 * | Prop | Type | Default | Description |
 * |------|------|---------|-------------|
 * | `name` | `string` | - | 사용자 이름 |
 * | `description` | `string` | - | 사용자 설명 (이메일, 역할 등) |
 * | `avatarSrc` | `string` | - | 아바타 이미지 URL |
 * | `avatarAlt` | `string` | - | 아바타 대체 텍스트 |
 * | `badge` | `string` | - | 우측에 표시되는 뱃지 텍스트 |
 * | `badgeColor` | `BadgeColor` | `'neutral'` | 뱃지 색상 |
 *
 * ### DropdownMenuButton
 * | Prop | Type | Default | Description |
 * |------|------|---------|-------------|
 * | `label` | `string` | - | 버튼 라벨 |
 * | `buttonStyle` | `ButtonStyle` | `'secondary'` | 버튼 스타일 |
 * | `leadIcon` | `IconType` | - | 버튼 앞에 표시되는 아이콘 |
 * | `tailIcon` | `IconType` | - | 버튼 뒤에 표시되는 아이콘 |
 * | `disabled` | `boolean` | `false` | 비활성화 여부 |
 * | `onClick` | `() => void` | - | 클릭 이벤트 핸들러 |
 *
 * ### DropdownMenuCaption
 * | Prop | Type | Default | Description |
 * |------|------|---------|-------------|
 * | `children` | `ReactNode` | - | 캡션 텍스트 |
 *
 * ### DropdownMenuButtonGroup
 * | Prop | Type | Default | Description |
 * |------|------|---------|-------------|
 * | `children` | `ReactNode` | - | 버튼 그룹 컨텐츠 (MenuButton 컴포넌트들) |
 */

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
        leadIcon={['finance', 'vip-crown']}
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

// =============================================================================
// COLOR CUSTOMIZATION STORIES
// =============================================================================

const iconColorOptions: IconColor[] = [
  'default',
  'default-subtle',
  'default-muted',
  'destructive',
  'informative',
  'success',
  'warning',
];

const badgeColorOptions: BadgeColor[] = [
  'neutral',
  'red',
  'orange',
  'lime',
  'green',
  'cyan',
  'blue',
  'violet',
  'fuchsia',
  'pink',
];

const buttonStyleOptions: ButtonStyle[] = [
  'primary',
  'secondary',
  'destructive',
  'ghost',
  'ghostMuted',
  'soft',
  'dashed',
];

/**
 * 메뉴 아이템 아이콘 색상 커스터마이징
 */
export const MenuItemIconColor: StoryObj<{
  iconColor: IconColor;
  disabled: boolean;
}> = {
  args: {
    iconColor: 'default',
    disabled: false,
  },
  argTypes: {
    iconColor: {
      control: 'select',
      options: iconColorOptions,
      description: '아이콘 색상',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 시 iconColor가 무시됩니다',
    },
  },
  render: ({ iconColor, disabled }) => (
    <DropdownMenu width={280}>
      <DropdownMenuLabel>아이콘 색상 커스터마이징</DropdownMenuLabel>
      <DropdownMenuItem
        label="Lead & Tail Icon"
        leadIcon={['system', 'settings']}
        tailIcon={['arrows', 'arrow-right-s']}
        iconColor={iconColor}
        disabled={disabled}
      />
      <DropdownMenuItem
        label="Lead Icon Only"
        leadIcon={['system', 'check']}
        iconColor={iconColor}
        disabled={disabled}
      />
      <DropdownMenuItem
        label="Tail Icon Only"
        tailIcon={['system', 'external-link']}
        iconColor={iconColor}
        disabled={disabled}
      />
      <DropdownMenuDivider />
      <DropdownMenuItem
        size="large"
        label="Large Item"
        description="아이콘 색상이 적용된 큰 아이템"
        leadIcon={['system', 'star']}
        iconColor={iconColor}
        disabled={disabled}
      />
    </DropdownMenu>
  ),
  parameters: {
    controls: { disable: false },
  },
};

/**
 * 메뉴 아이템 아이콘 색상 - 모든 색상 예시
 */
export const MenuItemAllIconColors: Story = {
  render: () => (
    <DropdownMenu width={280}>
      <DropdownMenuLabel>아이콘 색상 옵션</DropdownMenuLabel>
      <DropdownMenuItem
        label="Default"
        leadIcon={['system', 'check-double']}
        iconColor="default"
      />
      <DropdownMenuItem
        label="Subtle"
        leadIcon={['system', 'check-double']}
        iconColor="default-subtle"
      />
      <DropdownMenuItem
        label="Muted"
        leadIcon={['system', 'check-double']}
        iconColor="default-muted"
      />
      <DropdownMenuDivider />
      <DropdownMenuItem
        label="Success"
        leadIcon={['system', 'checkbox-circle']}
        iconColor="success"
      />
      <DropdownMenuItem
        label="Warning"
        leadIcon={['system', 'error-warning']}
        iconColor="warning"
      />
      <DropdownMenuItem
        label="Destructive"
        leadIcon={['system', 'delete-bin']}
        iconColor="destructive"
      />
      <DropdownMenuItem
        label="Informative"
        leadIcon={['system', 'information']}
        iconColor="informative"
      />
      <DropdownMenuDivider />
      <DropdownMenuItem
        label="Disabled (색상 무시됨)"
        leadIcon={['system', 'check-double']}
        iconColor="success"
        disabled
      />
    </DropdownMenu>
  ),
};

/**
 * 버튼 스타일 커스터마이징
 */
export const MenuButtonStyle: StoryObj<{
  buttonStyle: ButtonStyle;
  disabled: boolean;
}> = {
  args: {
    buttonStyle: 'secondary',
    disabled: false,
  },
  argTypes: {
    buttonStyle: {
      control: 'select',
      options: buttonStyleOptions,
      description: '버튼 스타일',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
    },
  },
  render: ({ buttonStyle, disabled }) => (
    <DropdownMenu width={280}>
      <DropdownMenuLabel>버튼 스타일 커스터마이징</DropdownMenuLabel>
      <DropdownMenuItem
        label="일반 메뉴 아이템"
        leadIcon={['system', 'settings']}
      />
      <DropdownMenuDivider />
      <DropdownMenuButton
        label="커스텀 버튼"
        leadIcon={['system', 'add']}
        buttonStyle={buttonStyle}
        disabled={disabled}
        onClick={() => console.log('Button clicked')}
      />
    </DropdownMenu>
  ),
  parameters: {
    controls: { disable: false },
  },
};

/**
 * 버튼 스타일 - 모든 스타일 예시
 */
export const MenuButtonAllStyles: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <DropdownMenu width={200}>
        <DropdownMenuLabel>Primary</DropdownMenuLabel>
        <DropdownMenuButton
          label="Primary Button"
          leadIcon={['system', 'add']}
          buttonStyle="primary"
        />
      </DropdownMenu>
      <DropdownMenu width={200}>
        <DropdownMenuLabel>Secondary</DropdownMenuLabel>
        <DropdownMenuButton
          label="Secondary Button"
          leadIcon={['system', 'add']}
          buttonStyle="secondary"
        />
      </DropdownMenu>
      <DropdownMenu width={200}>
        <DropdownMenuLabel>Destructive</DropdownMenuLabel>
        <DropdownMenuButton
          label="Destructive"
          leadIcon={['system', 'delete-bin']}
          buttonStyle="destructive"
        />
      </DropdownMenu>
      <DropdownMenu width={200}>
        <DropdownMenuLabel>Ghost</DropdownMenuLabel>
        <DropdownMenuButton
          label="Ghost Button"
          leadIcon={['system', 'add']}
          buttonStyle="ghost"
        />
      </DropdownMenu>
      <DropdownMenu width={200}>
        <DropdownMenuLabel>Soft</DropdownMenuLabel>
        <DropdownMenuButton
          label="Soft Button"
          leadIcon={['system', 'add']}
          buttonStyle="soft"
        />
      </DropdownMenu>
      <DropdownMenu width={200}>
        <DropdownMenuLabel>Dashed</DropdownMenuLabel>
        <DropdownMenuButton
          label="Dashed Button"
          leadIcon={['system', 'add']}
          buttonStyle="dashed"
        />
      </DropdownMenu>
    </div>
  ),
};

/**
 * 아바타 아이템 아이콘 색상 커스터마이징
 */
export const AvatarItemIconColor: StoryObj<{
  iconColor: IconColor;
  disabled: boolean;
}> = {
  args: {
    iconColor: 'default',
    disabled: false,
  },
  argTypes: {
    iconColor: {
      control: 'select',
      options: iconColorOptions,
      description: 'tailIcon 색상',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 시 iconColor가 무시됩니다',
    },
  },
  render: ({ iconColor, disabled }) => (
    <DropdownMenu width={280}>
      <DropdownMenuLabel>아바타 아이콘 색상</DropdownMenuLabel>
      <DropdownMenuAvatar
        label="사용자 1"
        avatarSrc="https://i.pravatar.cc/40?img=1"
        avatarAlt="사용자 1"
        tailIcon={['arrows', 'arrow-right-s']}
        iconColor={iconColor}
        disabled={disabled}
        onClick={() => console.log('User 1')}
      />
      <DropdownMenuAvatar
        label="사용자 2"
        avatarSrc="https://i.pravatar.cc/40?img=2"
        avatarAlt="사용자 2"
        tailIcon={['system', 'check']}
        iconColor={iconColor}
        disabled={disabled}
        onClick={() => console.log('User 2')}
      />
    </DropdownMenu>
  ),
  parameters: {
    controls: { disable: false },
  },
};

/**
 * 유저바 뱃지 색상 커스터마이징
 */
export const UserbarBadgeColor: StoryObj<{
  badgeColor: BadgeColor;
}> = {
  args: {
    badgeColor: 'neutral',
  },
  argTypes: {
    badgeColor: {
      control: 'select',
      options: badgeColorOptions,
      description: '뱃지 색상',
    },
  },
  render: ({ badgeColor }) => (
    <DropdownMenu width={280}>
      <DropdownMenuUserbar
        name="김철수"
        description="kim@example.com"
        avatarSrc="https://i.pravatar.cc/40?img=5"
        avatarAlt="김철수"
        badge="Pro"
        badgeColor={badgeColor}
      />
      <DropdownMenuDivider />
      <DropdownMenuItem
        label="구독 관리"
        leadIcon={['finance', 'bank-card']}
      />
    </DropdownMenu>
  ),
  parameters: {
    controls: { disable: false },
  },
};

/**
 * 유저바 뱃지 색상 - 모든 색상 예시
 */
export const UserbarAllBadgeColors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      {badgeColorOptions.map((color) => (
        <DropdownMenu key={color} width={240}>
          <DropdownMenuUserbar
            name="사용자"
            description={`badge: ${color}`}
            avatarSrc={`https://i.pravatar.cc/40?img=${badgeColorOptions.indexOf(color) + 1}`}
            avatarAlt="사용자"
            badge={color.charAt(0).toUpperCase() + color.slice(1)}
            badgeColor={color}
          />
        </DropdownMenu>
      ))}
    </div>
  ),
};

/**
 * 모든 색상 커스터마이징 통합 예시
 */
export const AllColorCustomizations: Story = {
  render: () => (
    <DropdownMenu width={300}>
      {/* Userbar with custom badge color */}
      <DropdownMenuUserbar
        name="김철수"
        description="kim@example.com"
        avatarSrc="https://i.pravatar.cc/40?img=7"
        avatarAlt="김철수"
        badge="Admin"
        badgeColor="blue"
      />
      <DropdownMenuDivider />

      {/* Menu items with custom icon colors */}
      <DropdownMenuLabel>색상 커스터마이징 예시</DropdownMenuLabel>
      <DropdownMenuItem
        label="성공 아이콘"
        leadIcon={['system', 'checkbox-circle']}
        iconColor="success"
      />
      <DropdownMenuItem
        label="경고 아이콘"
        leadIcon={['system', 'error-warning']}
        iconColor="warning"
      />
      <DropdownMenuItem
        label="삭제"
        leadIcon={['system', 'delete-bin']}
        iconColor="destructive"
      />

      <DropdownMenuDivider />

      {/* Avatar with custom icon color */}
      <DropdownMenuLabel>아바타 아이템</DropdownMenuLabel>
      <DropdownMenuAvatar
        label="선택됨"
        avatarSrc="https://i.pravatar.cc/40?img=8"
        avatarAlt="선택됨"
        tailIcon={['system', 'check']}
        iconColor="success"
      />

      <DropdownMenuDivider />

      {/* Buttons with different styles */}
      <DropdownMenuButton
        label="주요 작업"
        leadIcon={['system', 'add']}
        buttonStyle="primary"
      />
      <DropdownMenuButton
        label="삭제"
        leadIcon={['system', 'delete-bin']}
        buttonStyle="destructive"
      />
    </DropdownMenu>
  ),
};

// =============================================================================
// SEARCH STORIES
// =============================================================================

/**
 * 검색 입력 컴포넌트
 *
 * DropdownMenuSearch는 검색 기능을 위한 기본 빌딩 블록 컴포넌트입니다.
 * 필터링이 포함된 완전한 검색 가능 드롭다운을 원한다면,
 * `Dropdown` 컴포넌트의 `searchable` prop을 사용하세요.
 *
 * @see Dropdown 컴포넌트: `Components/Dropdown/Dropdown` → Searchable 스토리
 */
export const SearchInput: Story = {
  render: () => (
    <DropdownMenu width={280}>
      <DropdownMenuSearch
        placeholder="Type to search..."
        autoFocus={false}
      />
      <DropdownMenuItem label="Apple" leadIcon={['food', 'bowl']} />
      <DropdownMenuItem label="Banana" leadIcon={['food', 'bowl']} />
      <DropdownMenuItem label="Cherry" leadIcon={['food', 'bowl']} />
    </DropdownMenu>
  ),
  parameters: {
    docs: {
      description: {
        story: `DropdownMenuSearch is a low-level building block. For a complete searchable dropdown with automatic filtering and "no results" handling, use the \`Dropdown\` component with \`searchable\` prop.

\`\`\`tsx
// Recommended: Use Dropdown component for searchable dropdowns
<Dropdown
  label="Select fruit"
  items={items}
  searchable
  searchPlaceholder="Search..."
  noResultsText="Nothing found"
/>
\`\`\``,
      },
    },
  },
};
