import type { Meta, StoryObj } from '@storybook/react';

import avatarPlaceholderIcon from '../../../assets/avatar-placeholder-icon.png';

import { Breadcrumbs } from './Breadcrumbs';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'lg'],
    },
    separator: {
      control: 'select',
      options: ['slash', 'chevron', 'dot', 'arrow'],
    },
    maxItems: {
      control: 'number',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

const sampleItems = [
  { label: 'Home', href: '/', icon: 'folder-open-fill' },
  { label: 'Products', href: '/products' },
  { label: 'Category', href: '/products/category' },
  { label: 'Current Page' },
];

const itemsWithIcons = [
  { label: 'Label', icon: 'folder-open-fill' },
  { label: 'Label' },
  { label: 'Label' },
];

const itemsWithImages = [
  { label: 'Label', image: avatarPlaceholderIcon },
  { label: 'Label' },
  { label: 'Label' },
];

export const Default: Story = {
  args: {
    items: sampleItems,
    size: 'sm',
    separator: 'slash',
  },
};

export const WithMaxItems: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Level 1', href: '/level1' },
      { label: 'Level 2', href: '/level2' },
      { label: 'Level 3', href: '/level3' },
      { label: 'Level 4', href: '/level4' },
      { label: 'Current Page' },
    ],
    size: 'sm',
    separator: 'slash',
    maxItems: 3,
  },
};

export const AllSeparators: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {(['slash', 'chevron', 'dot'] as const).map((separator) => (
        <div key={separator} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ width: '100px', textTransform: 'capitalize', fontSize: '12px', color: '#6f6f77' }}>{separator}</span>
          <Breadcrumbs items={sampleItems} separator={separator} size="sm" />
        </div>
      ))}
    </div>
  ),
};

export const DifferentPathLengths: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {(['slash', 'chevron', 'dot'] as const).map((separator) => (
        <div key={separator} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <span style={{ fontSize: '12px', color: '#6f6f77', marginBottom: '4px', textTransform: 'capitalize' }}>
            {separator} separator
          </span>
          {[2, 3, 4, 5, 6].map((length) => {
            const items = Array.from({ length }, (_, i) => ({
              label: 'Label',
              ...(i < length - 1 ? { href: `#${i}` } : {}),
            }));
            return (
              <Breadcrumbs key={length} items={items} separator={separator} size="sm" />
            );
          })}
        </div>
      ))}
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Breadcrumbs items={sampleItems} size="sm" />
      <Breadcrumbs items={sampleItems} size="lg" />
    </div>
  ),
};

export const DarkMode: Story = {
  render: () => (
    <div style={{ backgroundColor: '#18181b', padding: '24px', borderRadius: '8px' }}>
      <Breadcrumbs items={sampleItems} darkMode size="sm" separator="slash" />
    </div>
  ),
};

export const WithIcons: Story = {
  args: {
    items: itemsWithIcons,
    size: 'sm',
    separator: 'slash',
  },
};

export const WithImages: Story = {
  args: {
    items: itemsWithImages,
    size: 'sm',
    separator: 'slash',
  },
};
