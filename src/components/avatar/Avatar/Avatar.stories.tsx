import { useEffect, useRef } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Avatar } from './Avatar';

const meta = {
  title: 'Components/Avatar/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['initials', 'userpic', 'empty'],
      description: '아바타 변형 타입',
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
      description: '아바타의 크기',
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
      description: '아바타의 모양',
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
      description: '표시할 상태 배지 변형',
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
      description: '상태 배지의 위치',
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
      description: '아바타 주위에 링 표시 (그룹에서 겹침용)',
      table: {
        type: {
          summary: 'boolean',
          detail: '기본값: false',
        },
      },
    },
    initials: {
      control: 'text',
      description: '이니셜 텍스트 (initials 변형용)',
      table: {
        type: {
          summary: 'string',
          detail: '일반적으로 1-2자',
        },
      },
    },
    src: {
      control: 'text',
      description: '이미지 소스 URL (userpic 변형용)',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    icon: {
      control: 'object',
      description: '아이콘 상태 배지용 아이콘 타입',
      table: {
        type: {
          summary: 'IconType',
          detail: `[category, name] 튜플
예시: ['weather', 'moon']`,
        },
      },
    },
    logoImage: {
      control: 'text',
      description: '로고 상태 배지용 로고 이미지 URL',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    color: {
      control: 'color',
      description: 'initials 변형의 배경 색상',
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
    initials: 'JD',
    icon: ['weather', 'moon'],
    logoImage: 'https://picsum.photos/20',
    className: '',
  },
  render: (args) => {
    const avatarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (avatarRef.current) {
        console.log('Avatar ref:', avatarRef.current);
      }
    }, []);

    return <Avatar ref={avatarRef} {...args} />;
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
        <span style={{ width: '100px' }}>Online</span>
        <Avatar variant="initials" size="md" initials="JD" status="online" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span style={{ width: '100px' }}>Offline</span>
        <Avatar variant="initials" size="md" initials="JD" status="offline" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span style={{ width: '100px' }}>Notification</span>
        <Avatar variant="initials" size="md" initials="JD" status="notification" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span style={{ width: '100px' }}>Checkmark</span>
        <Avatar variant="initials" size="md" initials="JD" status="checkmark" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span style={{ width: '100px' }}>Logo</span>
        <Avatar
          variant="initials"
          size="md"
          initials="JD"
          status="logo"
          logoImage="https://picsum.photos/20"
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span style={{ width: '100px' }}>Icon</span>
        <Avatar variant="initials" size="md" initials="JD" status="icon" icon={['weather', 'moon']} />
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