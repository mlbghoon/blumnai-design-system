import type { Meta, StoryObj } from '@storybook/react';

import { Chip } from './Chip';

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['soft', 'secondary', 'ghost', 'selected'],
    },
    shape: {
      control: 'select',
      options: ['rounded', 'circle'],
    },
    iconOnly: {
      control: 'boolean',
    },
    darkMode: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  args: {
    label: 'Chip',
    size: 'md',
    variant: 'soft',
    shape: 'rounded',
  },
};

export const WithIcon: Story = {
  args: {
    label: 'Chip',
    icon: 'at-fill',
    size: 'md',
    variant: 'soft',
    shape: 'rounded',
  },
};

export const IconOnly: Story = {
  args: {
    icon: 'at-fill',
    iconOnly: true,
    size: 'md',
    variant: 'soft',
    shape: 'rounded',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Chip label="Chip" icon="at-fill" size="sm" variant="soft" />
      <Chip label="Chip" icon="at-fill" size="md" variant="soft" />
      <Chip label="Chip" icon="at-fill" size="lg" variant="soft" />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Chip label="Chip" icon="at-fill" variant="soft" />
        <Chip label="Chip" icon="at-fill" variant="secondary" />
        <Chip label="Chip" icon="at-fill" variant="ghost" />
        <Chip label="Chip" icon="at-fill" variant="selected" />
      </div>
      <div className="flex items-center gap-4">
        <Chip label="Chip" icon="at-fill" variant="soft" shape="circle" />
        <Chip label="Chip" icon="at-fill" variant="secondary" shape="circle" />
        <Chip label="Chip" icon="at-fill" variant="ghost" shape="circle" />
        <Chip label="Chip" icon="at-fill" variant="selected" shape="circle" />
      </div>
    </div>
  ),
};

export const Shapes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Chip label="Chip" icon="at-fill" shape="rounded" />
      <Chip label="Chip" icon="at-fill" shape="circle" />
    </div>
  ),
};

export const IconOnlySizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Chip icon="at-fill" iconOnly size="sm" variant="soft" />
      <Chip icon="at-fill" iconOnly size="md" variant="soft" />
      <Chip icon="at-fill" iconOnly size="lg" variant="soft" />
    </div>
  ),
};

export const DarkMode: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-4 bg-[#111115]">
      <div className="flex items-center gap-4">
        <Chip label="Chip" icon="at-fill" variant="soft" darkMode />
        <Chip label="Chip" icon="at-fill" variant="secondary" darkMode />
        <Chip label="Chip" icon="at-fill" variant="ghost" darkMode />
        <Chip label="Chip" icon="at-fill" variant="selected" darkMode />
      </div>
      <div className="flex items-center gap-4">
        <Chip icon="at-fill" iconOnly variant="soft" darkMode />
        <Chip icon="at-fill" iconOnly variant="secondary" darkMode />
        <Chip icon="at-fill" iconOnly variant="ghost" darkMode />
        <Chip icon="at-fill" iconOnly variant="selected" darkMode />
      </div>
    </div>
  ),
};