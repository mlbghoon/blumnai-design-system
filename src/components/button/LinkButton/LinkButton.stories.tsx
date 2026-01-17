import type { Meta, StoryObj } from '@storybook/react';

import { LinkButton } from './LinkButton';

const meta: Meta<typeof LinkButton> = {
  title: 'Components/Button/LinkButton',
  component: LinkButton,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
    iconPosition: {
      control: 'select',
      options: ['left', 'right'],
    },
    disabled: {
      control: 'boolean',
    },
    darkMode: {
      control: 'boolean',
    },
    openInNewTab: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof LinkButton>;

export const Default: Story = {
  args: {
    label: 'Preview',
    size: 'md',
  },
};

export const WithHref: Story = {
  args: {
    label: 'Open Link',
    href: 'https://example.com',
    openInNewTab: false,
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
      <LinkButton label="Preview" size="xs" />
      <LinkButton label="Preview" size="sm" />
      <LinkButton label="Preview" size="md" />
      <LinkButton label="Preview" size="lg" />
    </div>
  ),
};

export const IconPositions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
      <LinkButton label="Preview" iconPosition="left" />
      <LinkButton label="Preview" iconPosition="right" />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
      <LinkButton label="Preview" />
      <LinkButton label="Preview" disabled />
      <LinkButton label="Open Link" href="https://example.com" />
      <LinkButton label="Open in New Tab" href="https://example.com" openInNewTab />
    </div>
  ),
};

export const DarkMode: Story = {
  render: () => (
    <div style={{ backgroundColor: '#18181b', padding: '24px', borderRadius: '8px' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
        <LinkButton label="Preview" darkMode />
        <LinkButton label="Preview" darkMode disabled />
        <LinkButton label="Open Link" href="https://example.com" darkMode />
      </div>
    </div>
  ),
};
