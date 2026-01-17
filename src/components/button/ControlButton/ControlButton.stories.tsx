import type { Meta, StoryObj } from '@storybook/react';

import { ControlButton } from './ControlButton';

const meta: Meta<typeof ControlButton> = {
  title: 'Components/Button/ControlButton',
  component: ControlButton,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['md', 'lg'],
    },
    shape: {
      control: 'select',
      options: ['rounded', 'circle'],
    },
    icon: {
      control: 'text',
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
type Story = StoryObj<typeof ControlButton>;

export const Default: Story = {
  args: {
    icon: 'play',
    'aria-label': 'Play',
    size: 'md',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
      <ControlButton icon="play" aria-label="Play" size="md" />
      <ControlButton icon="play" aria-label="Play" size="lg" />
    </div>
  ),
};

export const AllShapes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
      <ControlButton icon="play" aria-label="Play" shape="rounded" />
      <ControlButton icon="play" aria-label="Play" shape="circle" />
    </div>
  ),
};

export const CommonControls: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
      <ControlButton icon="play" aria-label="Play" />
      <ControlButton icon="pause" aria-label="Pause" />
      <ControlButton icon="skip-forward" aria-label="Skip forward" />
      <ControlButton icon="skip-back" aria-label="Skip back" />
      <ControlButton icon="stop" aria-label="Stop" />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
      <ControlButton icon="play" aria-label="Play" />
      <ControlButton icon="play" aria-label="Play" disabled />
    </div>
  ),
};

export const DarkMode: Story = {
  render: () => (
    <div style={{ backgroundColor: '#18181b', padding: '24px', borderRadius: '8px' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
        <ControlButton icon="play" aria-label="Play" darkMode />
        <ControlButton icon="pause" aria-label="Pause" darkMode />
        <ControlButton icon="play" aria-label="Play" darkMode disabled />
      </div>
    </div>
  ),
};
