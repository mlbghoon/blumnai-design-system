import type { Meta, StoryObj } from '@storybook/react';

import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['2xs', 'xs', 'sm', 'md', 'lg'],
    },
    style: {
      control: 'select',
      options: ['default', 'with-shadow'],
    },
    checked: {
      control: 'boolean',
    },
    indeterminate: {
      control: 'boolean',
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
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: 'Checkbox label',
    size: 'md',
    checked: false,
    darkMode: false,
  },
};

export const Checked: Story = {
  args: {
    label: 'Checked checkbox',
    size: 'md',
    checked: true,
    darkMode: false,
  },
};

export const Indeterminate: Story = {
  args: {
    label: 'Indeterminate checkbox',
    size: 'md',
    indeterminate: true,
    darkMode: false,
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox label="Unchecked" />
      <Checkbox label="Checked" checked />
      <Checkbox label="Indeterminate" indeterminate />
      <Checkbox label="Disabled unchecked" disabled />
      <Checkbox label="Disabled checked" checked disabled />
      <Checkbox label="Disabled indeterminate" indeterminate disabled />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox label="Size 2xs" size="2xs" />
      <Checkbox label="Size xs" size="xs" />
      <Checkbox label="Size sm" size="sm" />
      <Checkbox label="Size md" size="md" />
      <Checkbox label="Size lg" size="lg" />
    </div>
  ),
};

export const WithoutLabel: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox size="2xs" />
      <Checkbox size="xs" />
      <Checkbox size="sm" />
      <Checkbox size="md" />
      <Checkbox size="lg" />
    </div>
  ),
};

export const WithShadow: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox label="Unchecked" style="with-shadow" />
      <Checkbox label="Checked" checked style="with-shadow" />
      <Checkbox label="Indeterminate" indeterminate style="with-shadow" />
      <Checkbox label="Disabled checked" checked disabled style="with-shadow" />
    </div>
  ),
};

export const DarkMode: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-4 bg-[#111115]">
      <Checkbox label="Unchecked" darkMode />
      <Checkbox label="Checked" checked darkMode />
      <Checkbox label="Indeterminate" indeterminate darkMode />
      <Checkbox label="Disabled unchecked" disabled darkMode />
      <Checkbox label="Disabled checked" checked disabled darkMode />
      <Checkbox label="Disabled indeterminate" indeterminate disabled darkMode />
    </div>
  ),
};