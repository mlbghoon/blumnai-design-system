import type { Meta, StoryObj } from '@storybook/react';

import { Tooltip } from './Tooltip';

import type { TooltipItemData } from './Tooltip.types';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'advanced'],
    },
    darkMode: {
      control: 'boolean',
    },
    children: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    variant: 'default',
    darkMode: false,
    children: 'Tooltip text',
    badge: undefined,
  },
};

export const WithBadge: Story = {
  args: {
    variant: 'default',
    darkMode: false,
    children: 'Tooltip text',
    badge: '/',
  },
};

export const WithLongText: Story = {
  args: {
    variant: 'default',
    darkMode: false,
    children: 'This is a longer tooltip text that wraps to multiple lines',
  },
};

export const DarkMode: Story = {
  args: {
    variant: 'default',
    darkMode: true,
    children: 'Tooltip text',
    badge: undefined,
  },
  render: (args) => (
    <div style={{ backgroundColor: '#18181b', padding: '24px', borderRadius: '8px' }}>
      <Tooltip {...args} />
    </div>
  ),
};

export const DarkModeWithBadge: Story = {
  args: {
    variant: 'default',
    darkMode: true,
    children: 'Tooltip text',
    badge: '/',
  },
  render: (args) => (
    <div style={{ backgroundColor: '#18181b', padding: '24px', borderRadius: '8px' }}>
      <Tooltip {...args} />
    </div>
  ),
};

export const Advanced: Story = {
  args: {
    variant: 'advanced',
    darkMode: false,
    items: [
      { type: 'label', label: 'Label', caption: 'Caption' },
      { type: 'divider' },
      { type: 'item', label: 'Item 1', caption: 'Description 1', indicatorColor: '#437dfc' },
      { type: 'item', label: 'Item 2', caption: 'Description 2', indicatorColor: '#4fc660' },
      { type: 'item', label: 'Item 3', caption: 'Description 3', indicatorColor: '#f38f36' },
      { type: 'divider' },
      { type: 'text', text: 'The quick brown fox jumps over a lazy dog.' },
    ] as TooltipItemData[],
  },
};

export const AdvancedDarkMode: Story = {
  args: {
    variant: 'advanced',
    darkMode: true,
    items: [
      { type: 'label', label: 'Label', caption: 'Caption' },
      { type: 'divider' },
      { type: 'item', label: 'Item 1', caption: 'Description 1', indicatorColor: '#437dfc' },
      { type: 'item', label: 'Item 2', caption: 'Description 2', indicatorColor: '#4fc660' },
      { type: 'item', label: 'Item 3', caption: 'Description 3', indicatorColor: '#f38f36' },
      { type: 'divider' },
      { type: 'text', text: 'The quick brown fox jumps over a lazy dog.' },
    ] as TooltipItemData[],
  },
  render: (args) => (
    <div style={{ backgroundColor: '#18181b', padding: '24px', borderRadius: '8px' }}>
      <Tooltip {...args} />
    </div>
  ),
};

export const AdvancedWithOnlyLabel: Story = {
  args: {
    variant: 'advanced',
    darkMode: false,
    items: [
      { type: 'label', label: 'Header', caption: 'Subheader' },
    ] as TooltipItemData[],
  },
};

export const AdvancedWithDividers: Story = {
  args: {
    variant: 'advanced',
    darkMode: false,
    items: [
      { type: 'label', label: 'Section 1' },
      { type: 'divider' },
      { type: 'item', label: 'Item', caption: 'Caption', indicatorColor: '#437dfc' },
      { type: 'divider' },
      { type: 'text', text: 'Plain text content' },
    ] as TooltipItemData[],
  },
};
