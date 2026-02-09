import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Select } from '../Select';
import type { SelectOption } from '../Select.types';

const userOptions: SelectOption[] = [
  { id: 'user1', label: 'John Doe', description: 'john@example.com', avatarSrc: 'https://i.pravatar.cc/150?u=john' },
  { id: 'user2', label: 'Jane Smith', description: 'jane@example.com', avatarSrc: 'https://i.pravatar.cc/150?u=jane' },
  { id: 'user3', label: 'Bob Wilson', description: 'bob@example.com', avatarSrc: 'https://i.pravatar.cc/150?u=bob' },
  { id: 'user4', label: 'Alice Brown', description: 'alice@example.com', avatarSrc: 'https://i.pravatar.cc/150?u=alice' },
  { id: 'user5', label: 'Charlie Davis', description: 'charlie@example.com', avatarSrc: 'https://i.pravatar.cc/150?u=charlie' },
];

const manyUserOptions: SelectOption[] = Array.from({ length: 15 }, (_, i) => ({
  id: `user-${i + 1}`,
  label: `User ${i + 1}`,
  description: `user${i + 1}@example.com`,
  avatarSrc: `https://i.pravatar.cc/150?u=user${i + 1}`,
}));

const meta: Meta<typeof Select> = {
  title: 'DataEntry/Select/AvatarSelect',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['avatar'],
      description: 'Select 변형',
      table: {
        type: { summary: 'SelectVariant' },
        defaultValue: { summary: 'avatar' },
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
    maxHeight: {
      control: 'number',
      description: '메뉴 최대 높이 (px)',
      table: { type: { summary: 'number | string' }, defaultValue: { summary: '300' } },
    },
    width: {
      control: 'text',
      description: '컨테이너 너비',
      table: { type: { summary: 'number | string' } },
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
  avatarSrc?: string;
  disabled?: boolean;
}[]`,
        },
      },
    },
    value: {
      control: 'text',
      description: '현재 선택된 값',
      table: { type: { summary: 'string' } },
    },
    onChange: {
      action: 'changed',
      description: '선택 변경 시 호출되는 콜백',
      table: { type: { summary: '(value: string) => void' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

// ============================================================================
// BASIC
// ============================================================================

/**
 * 기본 Avatar Select
 *
 * 사용자 선택에 적합한 아바타가 표시되는 Select입니다.
 */
export const Default: Story = {
  args: {
    variant: 'avatar',
    label: 'Assign to',
    placeholder: 'Select user...',
    options: userOptions,
    width: 300,
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
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const [value, setValue] = useState<string>();
    const supportText = args.supportText || undefined;
    const caption = args.caption || undefined;
    const error = args.error || undefined;
    const success = args.success || undefined;
    return (
      <Select
        variant="avatar"
        label={args.label}
        placeholder={args.placeholder}
        options={args.options}
        width={args.width}
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
        value={value}
        onChange={setValue}
      />
    );
  },
};

/**
 * 검색 가능한 Avatar Select
 */
export const Searchable: Story = {
  render: function Render() {
    const [value, setValue] = useState<string>();
    return (
      <Select
        variant="avatar"
        label="Assign to"
        placeholder="Search users..."
        options={userOptions}
        value={value}
        onChange={setValue}
        searchable
        width={300}
      />
    );
  },
};

/**
 * 스크롤 가능한 Avatar Select
 */
export const WithScroll: Story = {
  render: function Render() {
    const [value, setValue] = useState<string>();
    return (
      <Select
        variant="avatar"
        label="Select User"
        placeholder="Choose user..."
        options={manyUserOptions}
        value={value}
        onChange={setValue}
        searchable
        width={300}
      />
    );
  },
};

// ============================================================================
// STATES
// ============================================================================

/**
 * 기본 상태
 */
export const StateDefault: Story = {
  render: function Render() {
    const [value, setValue] = useState<string>();
    return (
      <Select
        variant="avatar"
        label="Default"
        placeholder="Select user..."
        options={userOptions}
        value={value}
        onChange={setValue}
        width={300}
      />
    );
  },
};

/**
 * 비활성화 상태
 */
export const StateDisabled: Story = {
  args: {
    variant: 'avatar',
    label: 'Disabled',
    placeholder: 'Select user...',
    options: userOptions,
    disabled: true,
    width: 300,
  },
};

/**
 * 에러 상태
 */
export const StateError: Story = {
  render: function Render() {
    const [value, setValue] = useState<string>();
    return (
      <Select
        variant="avatar"
        label="Error"
        placeholder="Select user..."
        options={userOptions}
        value={value}
        onChange={setValue}
        error="Please select a user"
        width={300}
      />
    );
  },
};

/**
 * 성공 상태
 */
export const StateSuccess: Story = {
  render: function Render() {
    const [value, setValue] = useState<string>('user1');
    return (
      <Select
        variant="avatar"
        label="Success"
        placeholder="Select user..."
        options={userOptions}
        value={value}
        onChange={setValue}
        success="User assigned"
        width={300}
      />
    );
  },
};

// ============================================================================
// STYLES
// ============================================================================

/**
 * Default 스타일
 */
export const StyleDefault: Story = {
  render: function Render() {
    const [value, setValue] = useState<string>();
    return (
      <Select
        variant="avatar"
        selectStyle="default"
        label="Default Style"
        placeholder="Select user..."
        options={userOptions}
        value={value}
        onChange={setValue}
        width={300}
      />
    );
  },
};

/**
 * Shadow 스타일
 */
export const StyleShadow: Story = {
  render: function Render() {
    const [value, setValue] = useState<string>();
    return (
      <Select
        variant="avatar"
        selectStyle="shadow"
        label="Shadow Style"
        placeholder="Select user..."
        options={userOptions}
        value={value}
        onChange={setValue}
        width={300}
      />
    );
  },
};

/**
 * Soft 스타일
 */
export const StyleSoft: Story = {
  render: function Render() {
    const [value, setValue] = useState<string>();
    return (
      <Select
        variant="avatar"
        selectStyle="soft"
        label="Soft Style"
        placeholder="Select user..."
        options={userOptions}
        value={value}
        onChange={setValue}
        width={300}
      />
    );
  },
};

// ============================================================================
// SIZES
// ============================================================================

/**
 * Small 크기
 */
export const SizeSmall: Story = {
  render: function Render() {
    const [value, setValue] = useState<string>();
    return (
      <Select
        variant="avatar"
        size="sm"
        label="Small (sm)"
        placeholder="Select user..."
        options={userOptions}
        value={value}
        onChange={setValue}
        width={300}
      />
    );
  },
};

/**
 * Large 크기
 */
export const SizeLarge: Story = {
  render: function Render() {
    const [value, setValue] = useState<string>();
    return (
      <Select
        variant="avatar"
        size="lg"
        label="Large (lg)"
        placeholder="Select user..."
        options={userOptions}
        value={value}
        onChange={setValue}
        width={300}
      />
    );
  },
};
