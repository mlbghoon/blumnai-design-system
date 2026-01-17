import type { Meta, StoryObj } from '@storybook/react';

import avatarPlaceholderIcon from '../../../assets/avatar-placeholder-icon.png';

import { AvatarButton } from './AvatarButton';

const meta: Meta<typeof AvatarButton> = {
  title: 'Components/Button/AvatarButton',
  component: AvatarButton,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
    disabled: {
      control: 'boolean',
    },
    darkMode: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof AvatarButton>;

export const Default: Story = {
  args: {
    avatar: avatarPlaceholderIcon,
    label: 'Profile',
    size: 'md',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
      <AvatarButton avatar={avatarPlaceholderIcon} label="Profile" size="xs" />
      <AvatarButton avatar={avatarPlaceholderIcon} label="Profile" size="sm" />
      <AvatarButton avatar={avatarPlaceholderIcon} label="Profile" size="md" />
      <AvatarButton avatar={avatarPlaceholderIcon} label="Profile" size="lg" />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
      <AvatarButton avatar={avatarPlaceholderIcon} label="Profile" />
      <AvatarButton avatar={avatarPlaceholderIcon} label="Profile" disabled />
    </div>
  ),
};

export const DarkMode: Story = {
  render: () => (
    <div style={{ backgroundColor: '#18181b', padding: '24px', borderRadius: '8px' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
        <AvatarButton avatar={avatarPlaceholderIcon} label="Profile" darkMode />
        <AvatarButton avatar={avatarPlaceholderIcon} label="Profile" darkMode disabled />
      </div>
    </div>
  ),
};
