import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Select } from '../Select';
import type { SelectOption } from '../Select.types';

const defaultOptions: SelectOption[] = [
  { id: '1', label: 'React' },
  { id: '2', label: 'Vue' },
  { id: '3', label: 'Angular' },
  { id: '4', label: 'Svelte', disabled: true },
  { id: '5', label: 'Next.js' },
];

const colorOptions: SelectOption[] = [
  { id: 'red', label: 'Red' },
  { id: 'blue', label: 'Blue' },
  { id: 'green', label: 'Green' },
  { id: 'yellow', label: 'Yellow' },
  { id: 'purple', label: 'Purple' },
];

const categoryOptions: SelectOption[] = [
  { id: 'frontend', label: 'Frontend', description: 'UI development' },
  { id: 'backend', label: 'Backend', description: 'Server development' },
  { id: 'devops', label: 'DevOps', description: 'Infrastructure' },
  { id: 'design', label: 'Design', description: 'UI/UX design' },
];

const manyOptions: SelectOption[] = Array.from({ length: 15 }, (_, i) => ({
  id: `tag-${i + 1}`,
  label: `Tag ${i + 1}`,
}));

const meta: Meta<typeof Select> = {
  title: 'DataEntry/Select/TagsSelect',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['tags'],
      description: 'Select 변형',
      table: {
        type: { summary: 'SelectVariant' },
        defaultValue: { summary: 'tags' },
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
    maxVisibleTags: {
      control: 'number',
      description: '최대 표시 태그 수 (초과 시 +N more 표시)',
      table: { type: { summary: 'number' } },
    },
    overflowText: {
      control: 'text',
      description: '오버플로우 텍스트 ({hiddenCount}, {totalCount} 사용 가능)',
      table: {
        type: {
          summary: 'string | ((hiddenCount, totalCount) => string)',
          detail: `기본값: '+{hiddenCount} more'`,
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
 * 기본 Tags Select
 *
 * 선택된 옵션이 태그로 표시되는 Select입니다.
 * 태그의 X 버튼을 클릭하여 개별 항목을 제거할 수 있습니다.
 */
export const Default: Story = {
  args: {
    variant: 'tags',
    label: 'Select tags',
    placeholder: 'Choose tags...',
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
    maxVisibleTags: undefined,
    overflowText: '',
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
    const maxVisibleTags = 'maxVisibleTags' in args ? args.maxVisibleTags : undefined;
    const overflowText = 'overflowText' in args ? (args.overflowText || undefined) : undefined;
    return (
      <Select
        variant="tags"
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
        maxVisibleTags={maxVisibleTags}
        overflowText={overflowText}
        value={value}
        onChange={setValue}
      />
    );
  },
};

/**
 * 미리 선택된 태그
 */
export const WithPreselected: Story = {
  render: function Render() {
    const [value, setValue] = useState<string[]>(['1', '2']);
    return (
      <Select
        variant="tags"
        label="Frameworks"
        placeholder="Choose frameworks..."
        options={defaultOptions}
        value={value}
        onChange={setValue}
        width={300}
      />
    );
  },
};

/**
 * 검색 가능한 Tags Select
 */
export const Searchable: Story = {
  render: function Render() {
    const [value, setValue] = useState<string[]>();
    return (
      <Select
        variant="tags"
        label="Select tags"
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
 * 설명이 있는 옵션
 */
export const WithDescriptions: Story = {
  render: function Render() {
    const [value, setValue] = useState<string[]>();
    return (
      <Select
        variant="tags"
        label="Select categories"
        placeholder="Choose categories..."
        options={categoryOptions}
        value={value}
        onChange={setValue}
        width={300}
      />
    );
  },
};

/**
 * 스크롤 가능한 Tags Select
 */
export const WithScroll: Story = {
  render: function Render() {
    const [value, setValue] = useState<string[]>();
    return (
      <Select
        variant="tags"
        label="Select tags"
        placeholder="Choose tags..."
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
        variant="tags"
        label="Default"
        placeholder="Choose tags..."
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
  render: function Render() {
    const [value, setValue] = useState<string[]>(['1', '2']);
    return (
      <Select
        variant="tags"
        label="Disabled"
        placeholder="Choose tags..."
        options={defaultOptions}
        value={value}
        onChange={setValue}
        disabled
        width={300}
      />
    );
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
        variant="tags"
        label="Error"
        placeholder="Choose tags..."
        options={defaultOptions}
        value={value}
        onChange={setValue}
        error="Please select at least one tag"
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
        variant="tags"
        label="Success"
        placeholder="Choose tags..."
        options={defaultOptions}
        value={value}
        onChange={setValue}
        success="Tags selected"
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
    const [value, setValue] = useState<string[]>(['red', 'blue']);
    return (
      <Select
        variant="tags"
        selectStyle="default"
        label="Default Style"
        placeholder="Choose colors..."
        options={colorOptions}
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
    const [value, setValue] = useState<string[]>(['red', 'blue']);
    return (
      <Select
        variant="tags"
        selectStyle="shadow"
        label="Shadow Style"
        placeholder="Choose colors..."
        options={colorOptions}
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
    const [value, setValue] = useState<string[]>(['red', 'blue']);
    return (
      <Select
        variant="tags"
        selectStyle="soft"
        label="Soft Style"
        placeholder="Choose colors..."
        options={colorOptions}
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
    const [value, setValue] = useState<string[]>(['1', '2']);
    return (
      <Select
        variant="tags"
        size="sm"
        label="Small (sm)"
        placeholder="Choose tags..."
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
    const [value, setValue] = useState<string[]>(['1', '2']);
    return (
      <Select
        variant="tags"
        size="lg"
        label="Large (lg)"
        placeholder="Choose tags..."
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
        variant="tags"
        label="Max 3 tags"
        placeholder="Choose up to 3 tags..."
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
// MANY TAGS
// ============================================================================

/**
 * 많은 태그 선택
 *
 * 여러 태그가 선택되면 트리거가 자동으로 확장됩니다.
 */
export const ManyTags: Story = {
  render: function Render() {
    const [value, setValue] = useState<string[]>(['tag-1', 'tag-2', 'tag-3', 'tag-4', 'tag-5']);
    return (
      <Select
        variant="tags"
        label="Many tags"
        placeholder="Choose tags..."
        options={manyOptions}
        value={value}
        onChange={setValue}
        width={300}
      />
    );
  },
};

/**
 * 태그 오버플로우 (축소 표시)
 *
 * maxVisibleTags로 표시할 최대 태그 수를 지정하면
 * 나머지는 "+N more" 형태로 축소 표시됩니다.
 */
export const TagsOverflow: Story = {
  render: function Render() {
    const [value, setValue] = useState<string[]>(['tag-1', 'tag-2', 'tag-3', 'tag-4', 'tag-5']);
    return (
      <Select
        variant="tags"
        label="Tags with overflow"
        placeholder="Choose tags..."
        options={manyOptions}
        value={value}
        onChange={setValue}
        maxVisibleTags={2}
        width={300}
      />
    );
  },
};

/**
 * 커스텀 오버플로우 텍스트
 *
 * overflowText prop으로 오버플로우 텍스트를 커스터마이징할 수 있습니다.
 */
export const CustomOverflowText: Story = {
  render: function Render() {
    const [value, setValue] = useState<string[]>(['tag-1', 'tag-2', 'tag-3', 'tag-4', 'tag-5']);
    return (
      <Select
        variant="tags"
        label="Custom overflow text"
        placeholder="Choose tags..."
        options={manyOptions}
        value={value}
        onChange={setValue}
        maxVisibleTags={1}
        overflowText={(hiddenCount, totalCount) => `외 ${hiddenCount}개 (총 ${totalCount}개)`}
        width={300}
      />
    );
  },
};
