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
    },
    size: {
      control: 'select',
      options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
    },
    shape: {
      control: 'select',
      options: ['circular', 'rounded'],
    },
    status: {
      control: 'select',
      options: ['online', 'offline', 'checkmark', 'logo', 'icon', 'notification', undefined],
    },
    badgeLocation: {
      control: 'select',
      options: ['top', 'bottom'],
    },
    ring: {
      control: 'boolean',
    },
    darkMode: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    variant: 'initials',
    size: 'md',
    shape: 'circular',
    initials: 'JD',
  },
};

export const Sizes: Story = {
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
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '24px' }}>
      <Avatar variant="initials" size="md" initials="JD" />
      <Avatar variant="userpic" size="md" src="https://i.pravatar.cc/150?img=1" alt="User" />
      <Avatar variant="empty" size="md" />
    </div>
  ),
};

export const Shapes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '24px' }}>
      <Avatar variant="initials" size="md" shape="circular" initials="JD" />
      <Avatar variant="initials" size="md" shape="rounded" initials="JD" />
    </div>
  ),
};

export const StatusBadges: Story = {
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
          logoImage="https://via.placeholder.com/20"
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span style={{ width: '100px' }}>Icon</span>
        <Avatar variant="initials" size="md" initials="JD" status="icon" icon="moon-fill" />
      </div>
    </div>
  ),
};

export const BadgeLocations: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '24px' }}>
      <Avatar variant="initials" size="md" initials="JD" status="online" badgeLocation="top" />
      <Avatar variant="initials" size="md" initials="JD" status="online" badgeLocation="bottom" />
    </div>
  ),
};

export const WithRing: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '24px' }}>
      <Avatar variant="initials" size="md" initials="JD" ring={true} />
      <Avatar variant="initials" size="md" initials="JD" ring={false} />
    </div>
  ),
};

export const CustomColor: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '24px' }}>
      <Avatar variant="initials" size="md" initials="JD" color="#6f6f77" />
      <Avatar variant="initials" size="md" initials="ET" color="#e74341" />
    </div>
  ),
};

export const DarkMode: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        padding: '24px',
        backgroundColor: '#18181b',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span style={{ width: '100px', color: 'white' }}>Initials</span>
        <Avatar variant="initials" size="md" initials="JD" darkMode={true} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span style={{ width: '100px', color: 'white' }}>With Status</span>
        <Avatar
          variant="initials"
          size="md"
          initials="JD"
          status="online"
          darkMode={true}
        />
      </div>
    </div>
  ),
};
