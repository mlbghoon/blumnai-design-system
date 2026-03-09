import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Select } from '../Select';
import type { SelectOption } from '../Select.types';

const userOptions: SelectOption[] = [
  { id: 'user1', label: '김민수', description: 'minsu@example.com', avatarSrc: 'https://i.pravatar.cc/150?u=john' },
  { id: 'user2', label: '이서연', description: 'seoyeon@example.com', avatarSrc: 'https://i.pravatar.cc/150?u=jane' },
  { id: 'user3', label: '박지훈', description: 'jihun@example.com', avatarSrc: 'https://i.pravatar.cc/150?u=bob' },
  { id: 'user4', label: '최수진', description: 'sujin@example.com', avatarSrc: 'https://i.pravatar.cc/150?u=alice' },
  { id: 'user5', label: '정태현', description: 'taehyun@example.com', avatarSrc: 'https://i.pravatar.cc/150?u=charlie' },
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
      description: 'Select 컴포넌트의 변형을 설정합니다. 이 스토리에서는 avatar 변형만 다룹니다',
      table: {
        type: { summary: 'SelectVariant' },
        defaultValue: { summary: 'avatar' },
      },
    },
    selectStyle: {
      control: 'select',
      options: ['default', 'shadow', 'soft'],
      description: '컴포넌트의 외관 스타일을 설정합니다. default(기본 테두리), shadow(그림자 효과), soft(부드러운 배경) 중 선택할 수 있습니다',
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
      description: '컴포넌트의 크기를 설정합니다. sm(작게), lg(크게) 중 선택할 수 있습니다',
      table: {
        type: {
          summary: 'SelectSize',
          detail: `'sm' | 'lg'`,
        },
      },
    },
    label: {
      control: 'text',
      description: '컴포넌트 위에 표시되는 제목 텍스트입니다',
      table: { type: { summary: 'string' } },
    },
    required: {
      control: 'boolean',
      description: 'true로 설정하면 라벨 옆에 필수 표시(*)가 나타납니다',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    supportText: {
      control: 'text',
      description: '라벨 오른쪽에 작게 표시되는 추가 안내 텍스트입니다 (예: "선택사항")',
      table: { type: { summary: 'string' } },
    },
    caption: {
      control: 'text',
      description: 'Select 아래에 작은 글씨로 표시되는 도움말 텍스트입니다',
      table: { type: { summary: 'string' } },
    },
    placeholder: {
      control: 'text',
      description: '값이 선택되지 않았을 때 입력 영역에 표시되는 안내 텍스트입니다',
      table: { type: { summary: 'string' } },
    },
    disabled: {
      control: 'boolean',
      description: 'true로 설정하면 컴포넌트가 비활성화되어 클릭이나 입력을 할 수 없습니다',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    error: {
      control: 'text',
      description: '에러 메시지를 입력하면 빨간색 테두리와 함께 아래에 에러 메시지가 표시됩니다',
      table: { type: { summary: 'boolean | string' } },
    },
    success: {
      control: 'text',
      description: '성공 메시지를 입력하면 초록색 테두리와 함께 아래에 성공 메시지가 표시됩니다',
      table: { type: { summary: 'boolean | string' } },
    },
    searchable: {
      control: 'boolean',
      description: 'true로 설정하면 드롭다운 상단에 검색 입력 필드가 표시되어 옵션을 필터링할 수 있습니다',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    maxHeight: {
      control: 'number',
      description: '드롭다운 메뉴의 최대 높이를 픽셀 단위로 설정합니다. 옵션이 많을 경우 스크롤이 생깁니다',
      table: { type: { summary: 'number | string' }, defaultValue: { summary: '300' } },
    },
    width: {
      control: 'text',
      description: '컴포넌트의 가로 너비를 설정합니다. 숫자(px) 또는 문자열(%, rem 등)로 지정할 수 있습니다',
      table: { type: { summary: 'number | string' } },
    },
    options: {
      control: 'object',
      description: '드롭다운에 표시될 옵션 배열입니다. 각 옵션은 id, label을 필수로 가지며 avatarSrc로 아바타 이미지를 추가할 수 있습니다',
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
      description: '현재 선택된 옵션의 id 값입니다. 외부에서 제어할 때 사용합니다',
      table: { type: { summary: 'string' } },
    },
    onChange: {
      action: 'changed',
      description: '옵션을 선택하거나 해제할 때 호출되는 함수입니다',
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
    supportText: '보조 텍스트',
    caption: '캡션 텍스트',
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
        label="담당자 지정"
        placeholder="사용자 검색..."
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
        label="사용자 선택"
        placeholder="사용자를 선택하세요..."
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
        placeholder="사용자 선택..."
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
        placeholder="사용자 선택..."
        options={userOptions}
        value={value}
        onChange={setValue}
        error="사용자를 선택해 주세요"
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
        placeholder="사용자 선택..."
        options={userOptions}
        value={value}
        onChange={setValue}
        success="사용자가 지정되었습니다"
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
        label="기본 스타일"
        placeholder="사용자 선택..."
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
        label="그림자 스타일"
        placeholder="사용자 선택..."
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
        label="소프트 스타일"
        placeholder="사용자 선택..."
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
        placeholder="사용자 선택..."
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
        placeholder="사용자 선택..."
        options={userOptions}
        value={value}
        onChange={setValue}
        width={300}
      />
    );
  },
};
