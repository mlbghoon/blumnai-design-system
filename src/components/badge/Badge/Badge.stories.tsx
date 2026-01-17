import type { Meta, StoryObj } from '@storybook/react';

import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'icon', 'image', 'dot'],
    },
    size: {
      control: 'select',
      options: ['sm', 'lg'],
    },
    color: {
      control: 'select',
      options: ['red', 'orange', 'lime', 'green', 'cyan', 'blue', 'violet', 'fuchsia', 'pink', 'neutral'],
    },
    shape: {
      control: 'select',
      options: ['rounded', 'pill'],
    },
    border: {
      control: 'boolean',
    },
    closeIcon: {
      control: 'boolean',
    },
    label: {
      control: 'text',
    },
    icon: {
      control: 'text',
    },
    image: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    variant: 'default',
    label: 'A Label',
    size: 'sm',
    color: 'neutral',
    shape: 'rounded',
    border: false,
    closeIcon: false,
  },
};

export const WithIcon: Story = {
  args: {
    variant: 'icon',
    label: 'Badge',
    icon: 'at-fill',
    size: 'sm',
    color: 'neutral',
    shape: 'rounded',
  },
};

export const WithImage: Story = {
  args: {
    variant: 'image',
    label: 'Badge',
    image: 'https://via.placeholder.com/12',
    size: 'sm',
    color: 'neutral',
    shape: 'rounded',
  },
};

export const WithDot: Story = {
  args: {
    variant: 'dot',
    label: 'Badge',
    size: 'sm',
    color: 'neutral',
    shape: 'rounded',
  },
};

export const WithCloseIcon: Story = {
  args: {
    variant: 'default',
    label: 'A Label',
    closeIcon: true,
    size: 'sm',
    color: 'neutral',
    shape: 'rounded',
  },
};

export const AllColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {(['red', 'orange', 'lime', 'green', 'cyan', 'blue', 'violet', 'fuchsia', 'pink', 'neutral'] as const).map((color) => (
        <div key={color} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ width: '100px', textTransform: 'capitalize' }}>{color}</span>
          <Badge variant="default" label="A Label" color={color} size="sm" />
        </div>
      ))}
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <Badge variant="default" label="A Label" size="sm" />
      <Badge variant="default" label="A Label" size="lg" />
    </div>
  ),
};

export const AllShapes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <Badge variant="default" label="A Label" shape="rounded" />
      <Badge variant="default" label="A Label" shape="pill" />
    </div>
  ),
};

export const DarkMode: Story = {
  render: () => (
    <div style={{ backgroundColor: '#18181b', padding: '24px', borderRadius: '8px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <h3 style={{ color: '#ffffff', marginBottom: '12px' }}>Default</h3>
          <Badge variant="default" label="A Label" darkMode size="sm" color="neutral" />
        </div>
        <div>
          <h3 style={{ color: '#ffffff', marginBottom: '12px' }}>With Icon</h3>
          <Badge variant="icon" label="Badge" icon="at-fill" darkMode size="sm" color="neutral" />
        </div>
        <div>
          <h3 style={{ color: '#ffffff', marginBottom: '12px' }}>With Image</h3>
          <Badge variant="image" label="Badge" darkMode size="sm" color="neutral" />
        </div>
        <div>
          <h3 style={{ color: '#ffffff', marginBottom: '12px' }}>With Dot</h3>
          <Badge variant="dot" label="Badge" darkMode size="sm" color="neutral" />
        </div>
        <div>
          <h3 style={{ color: '#ffffff', marginBottom: '12px' }}>With Border</h3>
          <Badge variant="default" label="A Label" darkMode size="sm" color="neutral" border />
        </div>
        <div>
          <h3 style={{ color: '#ffffff', marginBottom: '12px' }}>With Close Icon</h3>
          <Badge variant="default" label="A Label" darkMode size="sm" color="neutral" closeIcon />
        </div>
      </div>
    </div>
  ),
};

export const DarkModeAllColors: Story = {
  render: () => (
    <div style={{ backgroundColor: '#18181b', padding: '24px', borderRadius: '8px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {(['red', 'orange', 'lime', 'green', 'cyan', 'blue', 'violet', 'fuchsia', 'pink', 'neutral'] as const).map((color) => (
          <div key={color} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ width: '100px', textTransform: 'capitalize', color: '#ffffff' }}>{color}</span>
            <Badge variant="default" label="A Label" color={color} size="sm" darkMode />
          </div>
        ))}
      </div>
    </div>
  ),
};

export const DarkModeAllVariants: Story = {
  render: () => (
    <div style={{ backgroundColor: '#18181b', padding: '24px', borderRadius: '8px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <h3 style={{ color: '#ffffff', marginBottom: '12px' }}>Default</h3>
          <Badge variant="default" label="A Label" darkMode size="lg" color="blue" />
        </div>
        <div>
          <h3 style={{ color: '#ffffff', marginBottom: '12px' }}>Icon</h3>
          <Badge variant="icon" label="Angular" icon="at-fill" darkMode size="lg" color="red" />
        </div>
        <div>
          <h3 style={{ color: '#ffffff', marginBottom: '12px' }}>Image</h3>
          <Badge variant="image" label="Ryan Parker" darkMode size="lg" color="neutral" />
        </div>
        <div>
          <h3 style={{ color: '#ffffff', marginBottom: '12px' }}>Dot</h3>
          <Badge variant="dot" label="In Progress" darkMode size="lg" color="blue" />
        </div>
        <div>
          <h3 style={{ color: '#ffffff', marginBottom: '12px' }}>With Border</h3>
          <Badge variant="default" label="A Label" darkMode size="lg" color="neutral" border />
        </div>
        <div>
          <h3 style={{ color: '#ffffff', marginBottom: '12px' }}>With Close Icon</h3>
          <Badge variant="icon" label="Next.js" icon="at-fill" darkMode size="lg" color="neutral" closeIcon />
        </div>
      </div>
    </div>
  ),
};
