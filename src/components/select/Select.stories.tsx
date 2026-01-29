import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Select } from './Select';
import type { SelectOption, SelectProps } from './Select.types';

const defaultOptions: SelectOption[] = [
  { id: '1', label: 'Option 1' },
  { id: '2', label: 'Option 2' },
  { id: '3', label: 'Option 3' },
  { id: '4', label: 'Option 4' },
  { id: '5', label: 'Option 5' },
];

const userOptions: SelectOption[] = [
  { id: 'user1', label: 'John Doe', description: 'john@example.com', avatarSrc: 'https://i.pravatar.cc/150?u=john' },
  { id: 'user2', label: 'Jane Smith', description: 'jane@example.com', avatarSrc: 'https://i.pravatar.cc/150?u=jane' },
  { id: 'user3', label: 'Bob Wilson', description: 'bob@example.com', avatarSrc: 'https://i.pravatar.cc/150?u=bob' },
];

const tagOptions: SelectOption[] = [
  { id: 'react', label: 'React' },
  { id: 'vue', label: 'Vue' },
  { id: 'angular', label: 'Angular' },
  { id: 'svelte', label: 'Svelte' },
  { id: 'next', label: 'Next.js' },
];

const meta: Meta<SelectProps> = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
};

export default meta;
type Story = StoryObj<SelectProps>;

// ============================================================================
// ALL VARIANTS OVERVIEW
// ============================================================================

export const AllVariants: Story = {
  render: () => {
    const [defaultValue, setDefaultValue] = useState<string>();
    const [avatarValue, setAvatarValue] = useState<string>();
    const [multiValue, setMultiValue] = useState<string[]>([]);
    const [tagsValue, setTagsValue] = useState<string[]>(['react', 'next']);

    return (
      <div className="flex flex-col gap-24 max-w-md">
        <div>
          <h3 className="size-sm font-medium text-default mb-8">Default</h3>
          <Select
            variant="default"
            label="Select option"
            placeholder="Choose..."
            options={defaultOptions}
            value={defaultValue}
            onChange={setDefaultValue}
          />
        </div>

        <div>
          <h3 className="size-sm font-medium text-default mb-8">Avatar</h3>
          <Select
            variant="avatar"
            label="Assign to"
            placeholder="Select user..."
            options={userOptions}
            value={avatarValue}
            onChange={setAvatarValue}
          />
        </div>

        <div>
          <h3 className="size-sm font-medium text-default mb-8">Multi-Select</h3>
          <Select
            variant="multi-select"
            label="Technologies"
            placeholder="Choose options..."
            options={tagOptions}
            value={multiValue}
            onChange={setMultiValue}
          />
        </div>

        <div>
          <h3 className="size-sm font-medium text-default mb-8">Tags</h3>
          <Select
            variant="tags"
            label="Frameworks"
            placeholder="Choose tags..."
            options={tagOptions}
            value={tagsValue}
            onChange={setTagsValue}
          />
        </div>
      </div>
    );
  },
  parameters: {
    controls: { disable: true },
  },
};
