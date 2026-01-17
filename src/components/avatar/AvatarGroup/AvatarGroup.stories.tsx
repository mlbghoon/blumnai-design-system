import type { Meta, StoryObj } from '@storybook/react';

import { AvatarGroup } from './AvatarGroup';

const meta = {
  title: 'Components/Avatar/AvatarGroup',
  component: AvatarGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
    },
    stacking: {
      control: 'select',
      options: ['last-on-top', 'first-on-top'],
    },
    darkMode: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof AvatarGroup>;

export default meta;
type Story = StoryObj<typeof AvatarGroup>;

const sampleAvatars = [
  { variant: 'initials' as const, initials: 'JD' },
  { variant: 'initials' as const, initials: 'AB' },
  { variant: 'initials' as const, initials: 'CD' },
  { variant: 'initials' as const, initials: 'EF' },
];

export const Default: Story = {
  args: {
    size: 'md',
    stacking: 'last-on-top',
    avatars: sampleAvatars,
  },
};

export const LastOnTop: Story = {
  args: {
    size: 'md',
    stacking: 'last-on-top',
    avatars: sampleAvatars,
  },
};

export const FirstOnTop: Story = {
  args: {
    size: 'md',
    stacking: 'first-on-top',
    avatars: sampleAvatars,
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span>2xs</span>
        <AvatarGroup size="2xs" avatars={sampleAvatars} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span>xs</span>
        <AvatarGroup size="xs" avatars={sampleAvatars} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span>sm</span>
        <AvatarGroup size="sm" avatars={sampleAvatars} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span>md</span>
        <AvatarGroup size="md" avatars={sampleAvatars} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span>lg</span>
        <AvatarGroup size="lg" avatars={sampleAvatars} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span>xl</span>
        <AvatarGroup size="xl" avatars={sampleAvatars} />
      </div>
    </div>
  ),
};

export const WithMax: Story = {
  args: {
    size: 'md',
    stacking: 'last-on-top',
    avatars: [
      { variant: 'initials' as const, initials: 'JD' },
      { variant: 'initials' as const, initials: 'AB' },
      { variant: 'initials' as const, initials: 'CD' },
      { variant: 'initials' as const, initials: 'EF' },
      { variant: 'initials' as const, initials: 'GH' },
      { variant: 'initials' as const, initials: 'IJ' },
    ],
    max: 4,
  },
};

export const WithStatus: Story = {
  args: {
    size: 'md',
    stacking: 'last-on-top',
    avatars: [
      { variant: 'initials' as const, initials: 'JD', status: 'online' as const },
      { variant: 'initials' as const, initials: 'AB', status: 'offline' as const },
      { variant: 'initials' as const, initials: 'CD', status: 'notification' as const },
      { variant: 'initials' as const, initials: 'EF', status: 'offline' as const },
    ],
  },
};

export const MixedVariants: Story = {
  args: {
    size: 'md',
    stacking: 'last-on-top',
    avatars: [
      { variant: 'initials' as const, initials: 'JD' },
      { variant: 'userpic' as const, src: 'https://i.pravatar.cc/150?img=12', alt: 'User 1' },
      { variant: 'empty' as const },
      { variant: 'initials' as const, initials: 'AB' },
    ],
  },
};

export const DarkMode: Story = {
  args: {
    size: 'md',
    stacking: 'last-on-top',
    avatars: sampleAvatars,
    darkMode: true,
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
  render: (args) => (
    <div
      style={{
        padding: '24px',
        backgroundColor: '#18181b',
        borderRadius: '8px',
      }}
    >
      <AvatarGroup {...args} />
    </div>
  ),
};
