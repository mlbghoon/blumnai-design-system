import type { Meta, StoryObj } from '@storybook/react';

import { ButtonGroup } from './ButtonGroup';

const meta: Meta<typeof ButtonGroup> = {
  title: 'Components/Button/ButtonGroup',
  component: ButtonGroup,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['2xs', 'xs', 'sm', 'md', 'lg'],
    },
    darkMode: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

const defaultItems = [
  { label: 'Small' },
  { label: 'Medium' },
  { label: 'Large' },
];

export const Default: Story = {
  args: {
    items: defaultItems,
    size: 'sm',
    darkMode: false,
  },
};

export const WithIcons: Story = {
  args: {
    items: [
      { label: 'Live preview', icon: 'at-fill' },
      { icon: 'at-fill' },
    ],
    size: 'sm',
    darkMode: false,
  },
};

export const WithBadge: Story = {
  args: {
    items: [
      { label: 'Download', icon: 'at-fill', badge: '3 MB' },
      { label: '2K' },
    ],
    size: 'sm',
    darkMode: false,
  },
};

export const WithTailIcon: Story = {
  args: {
    items: [
      { label: 'Close issue', icon: 'at-fill', tailIcon: 'at-fill' },
      { icon: 'at-fill', iconOnly: true },
    ],
    size: 'sm',
    darkMode: false,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <ButtonGroup items={defaultItems} size="lg" />
      <ButtonGroup items={defaultItems} size="md" />
      <ButtonGroup items={defaultItems} size="sm" />
      <ButtonGroup items={defaultItems} size="xs" />
      <ButtonGroup items={defaultItems} size="2xs" />
    </div>
  ),
};

export const IconOnly: Story = {
  args: {
    items: [
      { icon: 'at-fill' },
      { icon: 'at-fill' },
      { icon: 'at-fill' },
      { icon: 'at-fill' },
    ],
    size: 'sm',
    darkMode: false,
  },
};

export const Disabled: Story = {
  args: {
    items: [
      { label: 'Label', icon: 'at-fill', badge: '8', tailIcon: 'at-fill' },
      { label: 'Label', icon: 'at-fill', badge: '8', tailIcon: 'at-fill', disabled: true },
      { icon: 'at-fill', disabled: true },
    ],
    size: 'sm',
    darkMode: false,
  },
};

export const DarkMode: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-4 bg-[#111115]">
      <ButtonGroup items={defaultItems} size="sm" darkMode />
      <ButtonGroup
        items={[
          { label: 'Label', icon: 'at-fill', badge: '8', tailIcon: 'at-fill' },
          { icon: 'at-fill' },
        ]}
        size="sm"
        darkMode
      />
    </div>
  ),
};