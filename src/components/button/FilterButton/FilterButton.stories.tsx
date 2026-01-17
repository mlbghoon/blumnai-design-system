import type { Meta, StoryObj } from '@storybook/react';

import { FilterButton } from './FilterButton';

const meta: Meta<typeof FilterButton> = {
  title: 'Components/Button/FilterButton',
  component: FilterButton,
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
type Story = StoryObj<typeof FilterButton>;

export const Default: Story = {
  args: {
    label: 'Filter',
    size: 'md',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
      <FilterButton label="Filter" size="xs" />
      <FilterButton label="Filter" size="sm" />
      <FilterButton label="Filter" size="md" />
      <FilterButton label="Filter" size="lg" />
    </div>
  ),
};

export const WithCustomIcon: Story = {
  args: {
    label: 'Options',
    icon: 'settings',
  },
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
      <FilterButton label="Filter" />
      <FilterButton label="Filter" disabled />
    </div>
  ),
};

export const DarkMode: Story = {
  render: () => (
    <div style={{ backgroundColor: '#18181b', padding: '24px', borderRadius: '8px' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
        <FilterButton label="Filter" darkMode />
        <FilterButton label="Filter" darkMode disabled />
      </div>
    </div>
  ),
};
