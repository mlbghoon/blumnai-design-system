import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Select } from '../Select';
import type { SelectOption } from '../Select.types';

const defaultOptions: SelectOption[] = [
  { id: '1', label: 'Option 1' },
  { id: '2', label: 'Option 2' },
  { id: '3', label: 'Option 3' },
  { id: '4', label: 'Option 4', disabled: true },
  { id: '5', label: 'Option 5' },
];

const optionsWithIcons: SelectOption[] = [
  { id: 'home', label: 'Home', leadIcon: ['buildings', 'home'] },
  { id: 'settings', label: 'Settings', leadIcon: ['system', 'settings'] },
  { id: 'user', label: 'User Profile', leadIcon: ['user', 'user'] },
  { id: 'notification', label: 'Notifications', leadIcon: ['media', 'notification'] },
];

const optionsWithDescriptions: SelectOption[] = [
  { id: 'read', label: 'Read', description: 'View content only' },
  { id: 'write', label: 'Write', description: 'Create and edit content' },
  { id: 'delete', label: 'Delete', description: 'Remove content' },
  { id: 'admin', label: 'Admin', description: 'Full access to all features' },
];

const manyOptions: SelectOption[] = Array.from({ length: 15 }, (_, i) => ({
  id: `option-${i + 1}`,
  label: `Option ${i + 1}`,
}));

const meta: Meta<typeof Select> = {
  title: 'DataEntry/Select/MultiSelect',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['multi-select'],
      description: 'Select 변형',
      table: {
        type: { summary: 'SelectVariant' },
        defaultValue: { summary: 'multi-select' },
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
    maxSelections: {
      control: 'number',
      description: '최대 선택 개수',
      table: { type: { summary: 'number' } },
    },
    selectedText: {
      control: 'text',
      description: '다중 선택 시 표시되는 텍스트',
      table: {
        type: {
          summary: 'string | ((count: number) => string)',
          detail: `문자열 또는 (count: number) => string 함수\n기본값: '{count} selected'`,
        },
      },
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
  leadIcon?: IconType;
  badge?: string;
  disabled?: boolean;
}[]`,
        },
      },
    },
    value: {
      control: 'object',
      description: '현재 선택된 값들',
      table: { type: { summary: 'string[]' } },
    },
    onChange: {
      action: 'changed',
      description: '선택 변경 시 호출되는 콜백',
      table: { type: { summary: '(value: string[]) => void' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

// ============================================================================
// BASIC
// ============================================================================

/**
 * 기본 Multi-Select
 *
 * 여러 옵션을 선택할 수 있는 Select입니다.
 */
export const Default: Story = {
  args: {
    variant: 'multi-select',
    label: 'Select options',
    placeholder: 'Choose options...',
    options: defaultOptions,
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
    maxSelections: undefined,
    selectedText: '',
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const [value, setValue] = useState<string[]>();
    const supportText = args.supportText || undefined;
    const caption = args.caption || undefined;
    const error = args.error || undefined;
    const success = args.success || undefined;
    const maxSelections = 'maxSelections' in args ? args.maxSelections : undefined;
    const selectedText = 'selectedText' in args ? (args.selectedText || undefined) : undefined;
    return (
      <Select
        variant="multi-select"
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
        maxSelections={maxSelections}
        selectedText={selectedText}
        value={value}
        onChange={setValue}
      />
    );
  },
};

/**
 * 검색 가능한 Multi-Select
 */
export const Searchable: Story = {
  render: function Render() {
    const [value, setValue] = useState<string[]>();
    return (
      <Select
        variant="multi-select"
        label="Select options"
        placeholder="Search and select..."
        options={defaultOptions}
        value={value}
        onChange={setValue}
        searchable
        width={300}
      />
    );
  },
};

/**
 * 아이콘이 있는 옵션
 */
export const WithIcons: Story = {
  render: function Render() {
    const [value, setValue] = useState<string[]>();
    return (
      <Select
        variant="multi-select"
        label="Select pages"
        placeholder="Choose pages..."
        options={optionsWithIcons}
        value={value}
        onChange={setValue}
        width={300}
      />
    );
  },
};

/**
 * 설명이 있는 옵션
 */
export const WithDescriptions: Story = {
  render: function Render() {
    const [value, setValue] = useState<string[]>();
    return (
      <Select
        variant="multi-select"
        label="Select permissions"
        placeholder="Choose permissions..."
        options={optionsWithDescriptions}
        value={value}
        onChange={setValue}
        width={300}
      />
    );
  },
};

/**
 * 스크롤 가능한 Multi-Select
 */
export const WithScroll: Story = {
  render: function Render() {
    const [value, setValue] = useState<string[]>();
    return (
      <Select
        variant="multi-select"
        label="Select options"
        placeholder="Choose options..."
        options={manyOptions}
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
    const [value, setValue] = useState<string[]>();
    return (
      <Select
        variant="multi-select"
        label="Default"
        placeholder="Choose options..."
        options={defaultOptions}
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
    variant: 'multi-select',
    label: 'Disabled',
    placeholder: 'Choose options...',
    options: defaultOptions,
    disabled: true,
    width: 300,
  },
};

/**
 * 에러 상태
 */
export const StateError: Story = {
  render: function Render() {
    const [value, setValue] = useState<string[]>();
    return (
      <Select
        variant="multi-select"
        label="Error"
        placeholder="Choose options..."
        options={defaultOptions}
        value={value}
        onChange={setValue}
        error="Please select at least one option"
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
    const [value, setValue] = useState<string[]>(['1', '2']);
    return (
      <Select
        variant="multi-select"
        label="Success"
        placeholder="Choose options..."
        options={defaultOptions}
        value={value}
        onChange={setValue}
        success="Options selected"
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
    const [value, setValue] = useState<string[]>();
    return (
      <Select
        variant="multi-select"
        selectStyle="default"
        label="Default Style"
        placeholder="Choose options..."
        options={defaultOptions}
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
    const [value, setValue] = useState<string[]>();
    return (
      <Select
        variant="multi-select"
        selectStyle="shadow"
        label="Shadow Style"
        placeholder="Choose options..."
        options={defaultOptions}
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
    const [value, setValue] = useState<string[]>();
    return (
      <Select
        variant="multi-select"
        selectStyle="soft"
        label="Soft Style"
        placeholder="Choose options..."
        options={defaultOptions}
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
    const [value, setValue] = useState<string[]>();
    return (
      <Select
        variant="multi-select"
        size="sm"
        label="Small (sm)"
        placeholder="Choose options..."
        options={defaultOptions}
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
    const [value, setValue] = useState<string[]>();
    return (
      <Select
        variant="multi-select"
        size="lg"
        label="Large (lg)"
        placeholder="Choose options..."
        options={defaultOptions}
        value={value}
        onChange={setValue}
        width={300}
      />
    );
  },
};

// ============================================================================
// MAX SELECTIONS
// ============================================================================

/**
 * 최대 선택 개수 제한
 *
 * maxSelections prop으로 선택 가능한 최대 개수를 제한합니다.
 */
export const MaxSelections: Story = {
  render: function Render() {
    const [value, setValue] = useState<string[]>();
    return (
      <Select
        variant="multi-select"
        label="Max 3 selections"
        placeholder="Choose up to 3..."
        options={defaultOptions}
        value={value}
        onChange={setValue}
        maxSelections={3}
        width={300}
      />
    );
  },
};

// ============================================================================
// CUSTOM SELECTED TEXT
// ============================================================================

/**
 * 커스텀 선택 텍스트 (문자열)
 *
 * selectedText prop으로 다중 선택 시 표시되는 텍스트를 변경합니다.
 */
export const CustomSelectedTextString: Story = {
  render: function Render() {
    const [value, setValue] = useState<string[]>(['1', '2', '3']);
    return (
      <Select
        variant="multi-select"
        label="Custom text (string)"
        placeholder="Choose options..."
        options={defaultOptions}
        value={value}
        onChange={setValue}
        selectedText="Multiple items selected"
        width={300}
      />
    );
  },
};

/**
 * 커스텀 선택 텍스트 (함수)
 *
 * selectedText에 함수를 전달하여 동적인 텍스트를 생성합니다.
 */
export const CustomSelectedTextFunction: Story = {
  render: function Render() {
    const [value, setValue] = useState<string[]>(['1', '2', '3']);
    return (
      <Select
        variant="multi-select"
        label="Custom text (function)"
        placeholder="Choose options..."
        options={defaultOptions}
        value={value}
        onChange={setValue}
        selectedText={(count) => `${count}개 항목 선택됨`}
        width={300}
      />
    );
  },
};
