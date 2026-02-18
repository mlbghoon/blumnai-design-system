import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Select } from '../Select';
import type { SelectOption } from '../Select.types';

const defaultOptions: SelectOption[] = [
  { id: '1', label: 'Option 1' },
  { id: '2', label: 'Option 2' },
  { id: '3', label: 'Option 3' },
  { id: '4', label: 'Option 4', disabled: true },
  { id: '5', label: 'Option 5' },
  { id: '6', label: 'Option 6' },
  { id: '7', label: 'Option 7' },
  { id: '8', label: 'Option 8' },
  { id: '9', label: 'Option 9' },
  { id: '10', label: 'Option 10' },
];

const userOptions: SelectOption[] = [
  { id: 'user1', label: 'John Doe', description: 'john@example.com', avatarSrc: 'https://i.pravatar.cc/150?u=john' },
  { id: 'user2', label: 'Jane Smith', description: 'jane@example.com', avatarSrc: 'https://i.pravatar.cc/150?u=jane' },
  { id: 'user3', label: 'Bob Wilson', description: 'bob@example.com', avatarSrc: 'https://i.pravatar.cc/150?u=bob' },
  { id: 'user4', label: 'Alice Brown', description: 'alice@example.com', avatarSrc: 'https://i.pravatar.cc/150?u=alice' },
  { id: 'user5', label: 'Charlie Davis', description: 'charlie@example.com', avatarSrc: 'https://i.pravatar.cc/150?u=charlie' },
  { id: 'user6', label: 'Diana Evans', description: 'diana@example.com', avatarSrc: 'https://i.pravatar.cc/150?u=diana' },
  { id: 'user7', label: 'Frank Garcia', description: 'frank@example.com', avatarSrc: 'https://i.pravatar.cc/150?u=frank' },
  { id: 'user8', label: 'Grace Hill', description: 'grace@example.com', avatarSrc: 'https://i.pravatar.cc/150?u=grace' },
];

const tagOptions: SelectOption[] = [
  { id: 'react', label: 'React' },
  { id: 'vue', label: 'Vue' },
  { id: 'angular', label: 'Angular' },
  { id: 'svelte', label: 'Svelte', disabled: true },
  { id: 'next', label: 'Next.js' },
  { id: 'nuxt', label: 'Nuxt' },
  { id: 'remix', label: 'Remix' },
  { id: 'astro', label: 'Astro' },
  { id: 'solid', label: 'SolidJS' },
  { id: 'qwik', label: 'Qwik' },
];

const meta: Meta<typeof Select> = {
  title: 'DataEntry/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'avatar', 'multi-select', 'tags'],
      description: 'Select 변형',
      table: {
        type: {
          summary: 'SelectVariant',
          detail: `'default' | 'avatar' | 'multi-select' | 'tags'`,
        },
        defaultValue: { summary: 'default' },
      },
    },
    selectStyle: {
      control: 'select',
      options: ['default', 'shadow', 'soft'],
      description: '스타일 변형',
      table: {
        type: {
          summary: 'SelectStyle',
          detail: `'default' | 'shadow' | 'soft'`,
        },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'lg'],
      description: '크기',
      table: {
        type: {
          summary: 'SelectSize',
          detail: `'sm' | 'lg'`,
        },
        defaultValue: { summary: 'sm' },
      },
    },
    label: {
      control: 'text',
      description: '라벨 텍스트',
      table: { type: { summary: 'string' } },
    },
    required: {
      control: 'boolean',
      description: '필수 입력 여부',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    supportText: {
      control: 'text',
      description: '라벨 옆에 표시되는 보조 텍스트',
      table: { type: { summary: 'string' } },
    },
    caption: {
      control: 'text',
      description: 'Select 아래에 표시되는 설명 텍스트',
      table: { type: { summary: 'string' } },
    },
    placeholder: {
      control: 'text',
      description: '플레이스홀더 텍스트',
      table: { type: { summary: 'string' } },
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    error: {
      control: 'text',
      description: '에러 상태 또는 메시지',
      table: { type: { summary: 'boolean | string' } },
    },
    success: {
      control: 'text',
      description: '성공 상태 또는 메시지',
      table: { type: { summary: 'boolean | string' } },
    },
    searchable: {
      control: 'boolean',
      description: '검색 가능 여부',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    width: {
      control: 'number',
      description: '컨테이너 너비',
      table: { type: { summary: 'number | string' } },
    },
    maxHeight: {
      control: 'number',
      description: '드롭다운 최대 높이 (px)',
      table: { type: { summary: 'number | string' }, defaultValue: { summary: '300' } },
    },
    options: {
      control: 'object',
      description: '선택 가능한 옵션 목록',
      table: {
        type: {
          summary: 'SelectOption[]',
          detail: `{
  id: string;
  label: string;
  description?: string;
  leadIcon?: IconType;
  badge?: string;
  avatarSrc?: string;
  disabled?: boolean;
}[]`,
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

/**
 * 모든 변형 비교
 *
 * 4가지 Select 변형을 한눈에 비교합니다.
 */
export const AllVariants: Story = {
  args: {
    selectStyle: 'default',
    size: 'sm',
    disabled: false,
    required: false,
    searchable: false,
    supportText: 'Support text here',
    caption: 'Caption text here',
    error: '',
    success: '',
    maxHeight: 300,
  },
  render: function Render(args) {
    const [defaultValue, setDefaultValue] = useState<string>();
    const [avatarValue, setAvatarValue] = useState<string>();
    const [multiValue, setMultiValue] = useState<string[]>([]);
    const [tagsValue, setTagsValue] = useState<string[]>(['react', 'next']);

    const supportText = args.supportText || undefined;
    const caption = args.caption || undefined;
    const error = args.error || undefined;
    const success = args.success || undefined;

    return (
      <div className="flex flex-col ds-gap-24 max-w-md">
        <div>
          <h3 className="size-sm font-medium text-default [margin-bottom:32px]">Default</h3>
          <Select
            variant="default"
            label="Select option"
            placeholder="Choose..."
            options={defaultOptions}
            value={defaultValue}
            onChange={setDefaultValue}
            selectStyle={args.selectStyle}
            size={args.size}
            disabled={args.disabled}
            required={args.required}
            searchable={args.searchable}
            supportText={supportText}
            caption={caption}
            error={error}
            success={success}
            maxHeight={args.maxHeight}
          />
        </div>

        <div>
          <h3 className="size-sm font-medium text-default [margin-bottom:32px]">Avatar</h3>
          <Select
            variant="avatar"
            label="Assign to"
            placeholder="Select user..."
            options={userOptions}
            value={avatarValue}
            onChange={setAvatarValue}
            selectStyle={args.selectStyle}
            size={args.size}
            disabled={args.disabled}
            required={args.required}
            searchable={args.searchable}
            supportText={supportText}
            caption={caption}
            error={error}
            success={success}
            maxHeight={args.maxHeight}
          />
        </div>

        <div>
          <h3 className="size-sm font-medium text-default [margin-bottom:32px]">Multi-Select</h3>
          <Select
            variant="multi-select"
            label="Technologies"
            placeholder="Choose options..."
            options={tagOptions}
            value={multiValue}
            onChange={setMultiValue}
            selectStyle={args.selectStyle}
            size={args.size}
            disabled={args.disabled}
            required={args.required}
            searchable={args.searchable}
            supportText={supportText}
            caption={caption}
            error={error}
            success={success}
            maxHeight={args.maxHeight}
          />
        </div>

        <div>
          <h3 className="size-sm font-medium text-default [margin-bottom:32px]">Tags</h3>
          <Select
            variant="tags"
            label="Frameworks"
            placeholder="Choose tags..."
            options={tagOptions}
            value={tagsValue}
            onChange={setTagsValue}
            selectStyle={args.selectStyle}
            size={args.size}
            disabled={args.disabled}
            required={args.required}
            searchable={args.searchable}
            supportText={supportText}
            caption={caption}
            error={error}
            success={success}
            maxHeight={args.maxHeight}
          />
        </div>
      </div>
    );
  },
};
