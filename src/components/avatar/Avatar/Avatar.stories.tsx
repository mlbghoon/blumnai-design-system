import { useRef } from 'react';
import { RiMoonLine } from '../../icons/Icon';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { Avatar } from './Avatar';

const meta = {
  title: 'DataDisplay/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
    controls: { disable: true },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['initials', 'userpic', 'empty'],
      description: '아바타의 표시 형태를 설정합니다. initials(이니셜 텍스트), userpic(사용자 이미지), empty(빈 상태) 중 선택할 수 있습니다',
      table: {
        type: {
          summary: 'AvatarVariant',
          detail: `'initials' | 'userpic' | 'empty'

- initials: 이니셜 텍스트 표시
- userpic: 이미지 표시
- empty: 콘텐츠 없음 (빈 상태)`,
        },
      },
    },
    size: {
      control: 'select',
      options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
      description: '아바타의 크기를 설정합니다. 2xs(가장 작게)부터 3xl(가장 크게)까지 8단계로 선택할 수 있습니다',
      table: {
        type: {
          summary: 'AvatarSize',
          detail: `'2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'`,
        },
      },
    },
    shape: {
      control: 'select',
      options: ['circular', 'rounded'],
      description: '아바타의 외곽선 모양을 설정합니다. circular은 원형, rounded는 둥근 사각형입니다',
      table: {
        type: {
          summary: 'AvatarShape',
          detail: `'circular' | 'rounded'`,
        },
      },
    },
    status: {
      control: 'select',
      options: ['online', 'offline', 'checkmark', 'logo', 'icon', 'notification', undefined],
      description: '아바타 모서리에 표시할 상태 배지를 설정합니다. online(초록 점), offline(회색 점), checkmark(체크), notification(알림 숫자) 등을 선택할 수 있습니다',
      table: {
        type: {
          summary: 'AvatarStatus',
          detail: `'online' | 'offline' | 'checkmark' | 'logo' | 'icon' | 'notification' | undefined

- online: 초록색 점 배지
- offline: 회색 점 배지
- checkmark: 체크마크 배지
- logo: 로고 배지 (logoImage prop 필요)
- icon: 아이콘 배지 (icon prop 필요)
- notification: 알림 배지`,
        },
      },
    },
    badgeLocation: {
      control: 'select',
      options: ['top', 'bottom'],
      description: '상태 배지가 표시되는 위치를 설정합니다. top은 우측 상단, bottom은 우측 하단에 배치됩니다',
      table: {
        type: {
          summary: 'AvatarBadgeLocation',
          detail: `'top' | 'bottom'
기본값: 'top'`,
        },
      },
    },
    ring: {
      control: 'boolean',
      description: 'true로 설정하면 아바타 주위에 흰색 링이 표시됩니다. AvatarGroup에서 겹치는 아바타를 구분하는 데 사용합니다',
      table: {
        type: {
          summary: 'boolean',
          detail: '기본값: false',
        },
      },
    },
    initials: {
      control: 'text',
      description: 'initials 변형에서 아바타 중앙에 표시할 이니셜 텍스트입니다. 일반적으로 1~2자를 사용합니다',
      table: {
        type: {
          summary: 'string',
          detail: '일반적으로 1-2자',
        },
      },
    },
    src: {
      control: 'text',
      description: 'userpic 변형에서 표시할 사용자 프로필 이미지의 URL 경로입니다',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    icon: {
      control: 'object',
      description: 'status가 icon일 때 상태 배지에 표시할 아이콘 (Remixicon `Ri*` component 권장, tuple form 은 deprecated)',
      table: {
        type: {
          summary: 'IconProp',
          detail: `Remixicon component (권장, tree-shakeable):
  icon={RiMoonLine}
  icon={RiCheckLine}

또는 tuple form (deprecated, dev console warning):
  icon={['weather', 'moon']}`,
        },
      },
    },
    logoImage: {
      control: 'text',
      description: 'status가 logo일 때 상태 배지에 표시할 로고 이미지의 URL 경로입니다',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    color: {
      control: 'color',
      description: 'initials 변형의 배경 색상을 직접 지정합니다. CSS 색상 값을 사용할 수 있습니다 (예: #6f6f77, rgb(0,0,0))',
      table: {
        type: {
          summary: 'string',
          detail: '모든 유효한 CSS 색상 값',
        },
      },
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof Avatar>;

/**
 * 기본 Avatar
 *
 * Avatar 컴포넌트는 `ref`와 `className` prop을 지원합니다.
 * - `ref`: DOM 요소에 직접 접근 가능
 * - `className`: 커스텀 스타일 클래스 추가 가능
 */
export const Default: Story = {
  args: {
    variant: 'initials',
    size: 'md',
    shape: 'circular',
    status: undefined,
    badgeLocation: undefined,
    ring: false,
    initials: 'JD',
    src: undefined,
    icon: undefined,
    logoImage: undefined,
    color: undefined,
    className: '',
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const avatarRef = useRef<HTMLDivElement>(null);

    return (
      <Avatar
        ref={avatarRef}
        variant={args.variant}
        size={args.size}
        shape={args.shape}
        status={args.status}
        badgeLocation={args.badgeLocation}
        ring={args.ring}
        initials={args.initials}
        src={args.src}
        icon={args.icon}
        logoImage={args.logoImage}
        color={args.color}
        className={args.className}
      />
    );
  },
};

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '24px' }}>
      <Avatar variant="initials" size="2xs" initials="JD" />
      <Avatar variant="initials" size="xs" initials="JD" />
      <Avatar variant="initials" size="sm" initials="JD" />
      <Avatar variant="initials" size="md" initials="JD" />
      <Avatar variant="initials" size="lg" initials="JD" />
      <Avatar variant="initials" size="xl" initials="JD" />
      <Avatar variant="initials" size="2xl" initials="JD" />
      <Avatar variant="initials" size="3xl" initials="JD" />
    </div>
  ),
};

export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '24px' }}>
      <Avatar variant="initials" size="md" initials="JD" />
      <Avatar variant="userpic" size="md" src="https://i.pravatar.cc/150?img=1" alt="User" />
      <Avatar variant="empty" size="md" />
    </div>
  ),
};

export const Shapes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '24px' }}>
      <Avatar variant="initials" size="md" shape="circular" initials="JD" />
      <Avatar variant="initials" size="md" shape="rounded" initials="JD" />
    </div>
  ),
};

export const StatusBadges: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span style={{ width: '100px' }}>온라인</span>
        <Avatar variant="initials" size="md" initials="JD" status="online" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span style={{ width: '100px' }}>오프라인</span>
        <Avatar variant="initials" size="md" initials="JD" status="offline" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span style={{ width: '100px' }}>알림</span>
        <Avatar variant="initials" size="md" initials="JD" status="notification" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span style={{ width: '100px' }}>체크마크</span>
        <Avatar variant="initials" size="md" initials="JD" status="checkmark" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span style={{ width: '100px' }}>로고</span>
        <Avatar
          variant="initials"
          size="md"
          initials="JD"
          status="logo"
          logoImage="https://picsum.photos/20"
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span style={{ width: '100px' }}>아이콘</span>
        <Avatar variant="initials" size="md" initials="JD" status="icon" icon={RiMoonLine} />
      </div>
    </div>
  ),
};

export const BadgeLocations: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '24px' }}>
      <Avatar variant="initials" size="md" initials="JD" status="online" badgeLocation="top" />
      <Avatar variant="initials" size="md" initials="JD" status="online" badgeLocation="bottom" />
    </div>
  ),
};

export const WithRing: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px' }}>
      {/* 대비 배경에서 - 링이 보임 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '24px', backgroundColor: '#6f6f77', borderRadius: '8px' }}>
        <Avatar variant="initials" size="md" initials="JD" ring={true} />
        <Avatar variant="userpic" size="md" src="https://i.pravatar.cc/150?img=1" ring={true} />
        <Avatar variant="empty" size="md" ring={true} />
      </div>
      {/* 비교를 위해 링 없음 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '24px', backgroundColor: '#6f6f77', borderRadius: '8px' }}>
        <Avatar variant="initials" size="md" initials="JD" ring={false} />
        <Avatar variant="userpic" size="md" src="https://i.pravatar.cc/150?img=1" ring={false} />
        <Avatar variant="empty" size="md" ring={false} />
      </div>
    </div>
  ),
};

export const CustomColor: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '24px' }}>
      <Avatar variant="initials" size="md" initials="JD" color="#6f6f77" />
      <Avatar variant="initials" size="md" initials="ET" color="#e74341" />
    </div>
  ),
};