import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Dropdown } from './Dropdown';
import type { DropdownItemData, DropdownSection } from './Dropdown.types';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
    controls: { disable: true },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ minHeight: '300px', display: 'flex', alignItems: 'flex-start', paddingTop: '20px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

const simpleItems: DropdownItemData[] = [
  { id: 'edit', label: 'Edit' },
  { id: 'duplicate', label: 'Duplicate' },
  { id: 'archive', label: 'Archive' },
  { id: 'delete', label: 'Delete', disabled: true },
];

const itemsWithIcons: DropdownItemData[] = [
  { id: 'edit', label: 'Edit', leadIcon: ['design', 'edit'] },
  { id: 'duplicate', label: 'Duplicate', leadIcon: ['document', 'file-copy'] },
  { id: 'archive', label: 'Archive', leadIcon: ['business', 'archive'] },
  { id: 'delete', label: 'Delete', leadIcon: ['system', 'delete-bin'], disabled: true },
];

const itemsWithShortcuts: DropdownItemData[] = [
  { id: 'edit', label: 'Edit', leadIcon: ['design', 'edit'], shortcut: '⌘E' },
  { id: 'duplicate', label: 'Duplicate', leadIcon: ['document', 'file-copy'], shortcut: '⌘D' },
  { id: 'archive', label: 'Archive', leadIcon: ['business', 'archive'], shortcut: '⌘A' },
  { id: 'delete', label: 'Delete', leadIcon: ['system', 'delete-bin'], shortcut: '⌫' },
];

const sectionsWithLabels: DropdownSection[] = [
  {
    label: 'Actions',
    items: [
      { id: 'edit', label: 'Edit', leadIcon: ['design', 'edit'] },
      { id: 'duplicate', label: 'Duplicate', leadIcon: ['document', 'file-copy'] },
    ],
  },
  {
    label: 'Organize',
    items: [
      { id: 'archive', label: 'Archive', leadIcon: ['business', 'archive'] },
      { id: 'move', label: 'Move to folder', leadIcon: ['document', 'folder'] },
    ],
  },
  {
    items: [
      { id: 'delete', label: 'Delete', leadIcon: ['system', 'delete-bin'] },
    ],
  },
];

/**
 * Default Dropdown
 */
export const Default: Story = {
  render: () => {
    const [selected, setSelected] = useState<string>();

    return (
      <Dropdown
        label="Select action"
        items={simpleItems}
        value={selected}
        onChange={(item) => setSelected(item.id)}
      />
    );
  },
};

/**
 * With Icons
 */
export const WithIcons: Story = {
  render: () => {
    const [selected, setSelected] = useState<string>();

    return (
      <Dropdown
        label="Select action"
        items={itemsWithIcons}
        value={selected}
        onChange={(item) => setSelected(item.id)}
        leadIcon={['system', 'menu']}
      />
    );
  },
};

/**
 * With Shortcuts
 */
export const WithShortcuts: Story = {
  render: () => {
    const [selected, setSelected] = useState<string>();

    return (
      <Dropdown
        label="Select action"
        items={itemsWithShortcuts}
        value={selected}
        onChange={(item) => setSelected(item.id)}
      />
    );
  },
};

/**
 * With Sections
 */
export const WithSections: Story = {
  render: () => {
    const [selected, setSelected] = useState<string>();

    return (
      <Dropdown
        label="Select action"
        items={sectionsWithLabels}
        value={selected}
        onChange={(item) => setSelected(item.id)}
      />
    );
  },
};

/**
 * Placement Options
 */
export const Placement: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '48px', padding: '100px 0' }}>
      <Dropdown
        label="Bottom Start"
        items={simpleItems}
        placement="bottom-start"
      />
      <Dropdown
        label="Bottom"
        items={simpleItems}
        placement="bottom"
      />
      <Dropdown
        label="Bottom End"
        items={simpleItems}
        placement="bottom-end"
      />
    </div>
  ),
};

/**
 * Menu Width Options
 */
export const MenuWidth: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px' }}>
      <Dropdown
        label="Auto width"
        items={simpleItems}
      />
      <Dropdown
        label="Match trigger"
        items={simpleItems}
        menuWidth="trigger"
      />
      <Dropdown
        label="Fixed 300px"
        items={simpleItems}
        menuWidth={300}
      />
    </div>
  ),
};

/**
 * Disabled State
 */
export const Disabled: Story = {
  render: () => (
    <Dropdown
      label="Select action"
      items={simpleItems}
      disabled
    />
  ),
};

/**
 * With Large Items
 */
export const LargeItems: Story = {
  render: () => {
    const largeItems: DropdownItemData[] = [
      {
        id: 'workspace',
        label: 'Workspace Settings',
        description: 'Manage workspace preferences and members',
        leadIcon: ['system', 'settings'],
        size: 'large',
      },
      {
        id: 'profile',
        label: 'Profile Settings',
        description: 'Update your personal information',
        leadIcon: ['user', 'user'],
        size: 'large',
      },
      {
        id: 'billing',
        label: 'Billing',
        description: 'Manage your subscription and payments',
        leadIcon: ['finance', 'bank-card'],
        size: 'large',
      },
    ];

    return (
      <Dropdown
        label="Settings"
        items={largeItems}
        menuWidth={280}
      />
    );
  },
};

/**
 * Controlled State
 */
export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<string>();

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setOpen(true)}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: '1px solid var(--border-default)',
              background: 'var(--bg-default)',
              cursor: 'pointer',
            }}
          >
            Open
          </button>
          <button
            onClick={() => setOpen(false)}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: '1px solid var(--border-default)',
              background: 'var(--bg-default)',
              cursor: 'pointer',
            }}
          >
            Close
          </button>
        </div>
        <Dropdown
          label="Controlled dropdown"
          items={simpleItems}
          value={selected}
          onChange={(item) => setSelected(item.id)}
          open={open}
          onOpenChange={setOpen}
        />
        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
          Selected: {selected || 'none'}
        </div>
      </div>
    );
  },
};
