import type { Meta, StoryObj } from '@storybook/react-vite';
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
  { id: 'frontend', label: '프론트엔드', description: 'UI 개발' },
  { id: 'backend', label: '백엔드', description: '서버 개발' },
  { id: 'devops', label: 'DevOps', description: '인프라 관리' },
  { id: 'design', label: '디자인', description: 'UI/UX 디자인' },
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
      description: 'Select 컴포넌트의 변형을 설정합니다. 이 스토리에서는 tags 변형만 다룹니다',
      table: {
        type: { summary: 'SelectVariant' },
        defaultValue: { summary: 'tags' },
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
    maxSelections: {
      control: 'number',
      description: '선택할 수 있는 옵션의 최대 개수를 제한합니다. 설정하지 않으면 무제한으로 선택할 수 있습니다',
      table: { type: { summary: 'number' } },
    },
    maxVisibleTags: {
      control: 'number',
      description: '트리거 영역에 표시할 태그의 최대 개수입니다. 초과하는 태그는 "+N more" 형태로 축소 표시됩니다',
      table: { type: { summary: 'number' } },
    },
    overflowText: {
      control: 'text',
      description: '태그가 최대 표시 수를 초과할 때 보여주는 텍스트입니다. 문자열 또는 함수로 커스터마이징할 수 있습니다',
      table: {
        type: {
          summary: 'string | ((hiddenCount, totalCount) => string)',
          detail: `기본값: '+{hiddenCount} more'`,
        },
      },
    },
    width: {
      control: 'text',
      description: '컴포넌트의 가로 너비를 설정합니다. 숫자(px) 또는 문자열(%, rem 등)로 지정할 수 있습니다',
      table: { type: { summary: 'number | string' } },
    },
    options: {
      control: 'object',
      description: '드롭다운에 표시될 옵션 배열입니다. 각 옵션은 id, label을 필수로 가지며 description, icon 등을 추가할 수 있습니다',
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
      description: '현재 선택된 옵션들의 id 배열입니다. 외부에서 제어할 때 사용합니다',
      table: { type: { summary: 'string[]' } },
    },
    onChange: {
      action: 'changed',
      description: '옵션을 선택하거나 해제할 때 호출되는 함수입니다',
      table: { type: { summary: '(value: string[]) => void' } },
    },
    clearable: {
      control: 'boolean',
      description: 'true로 설정하면 선택된 태그를 모두 초기화하는 X 버튼이 표시됩니다',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    loading: {
      control: 'boolean',
      description: 'true로 설정하면 드롭다운 내에 로딩 스피너가 표시됩니다. 데이터를 불러오는 중일 때 사용합니다',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
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
    label: '태그 선택',
    placeholder: '태그를 선택하세요...',
    options: defaultOptions,
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
    maxSelections: undefined,
    maxVisibleTags: undefined,
    overflowText: '',
    clearable: false,
    loading: false,
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
    const clearable = 'clearable' in args ? args.clearable : undefined;
    const loading = 'loading' in args ? args.loading : undefined;
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
        clearable={clearable}
        loading={loading}
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
        label="프레임워크"
        placeholder="프레임워크 선택..."
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
        label="태그 선택"
        placeholder="검색하여 선택..."
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
        label="카테고리 선택"
        placeholder="카테고리를 선택하세요..."
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
        label="태그 선택"
        placeholder="태그를 선택하세요..."
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
        placeholder="태그를 선택하세요..."
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
        placeholder="태그를 선택하세요..."
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
        placeholder="태그를 선택하세요..."
        options={defaultOptions}
        value={value}
        onChange={setValue}
        error="최소 한 개 이상 선택해 주세요"
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
        placeholder="태그를 선택하세요..."
        options={defaultOptions}
        value={value}
        onChange={setValue}
        success="태그가 선택되었습니다"
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
        label="기본 스타일"
        placeholder="색상을 선택하세요..."
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
        label="그림자 스타일"
        placeholder="색상을 선택하세요..."
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
        label="소프트 스타일"
        placeholder="색상을 선택하세요..."
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
        placeholder="태그를 선택하세요..."
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
        placeholder="태그를 선택하세요..."
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
        label="최대 3개 태그"
        placeholder="최대 3개까지 선택..."
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
        label="많은 태그"
        placeholder="태그를 선택하세요..."
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
        label="태그 오버플로우"
        placeholder="태그를 선택하세요..."
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
        label="커스텀 오버플로우 텍스트"
        placeholder="태그를 선택하세요..."
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

// ============================================================================
// CLEARABLE / LOADING
// ============================================================================

/**
 * 초기화 버튼
 *
 * `clearable` prop으로 선택된 태그를 모두 초기화하는 X 버튼을 표시합니다.
 */
export const Clearable: Story = {
  render: function Render() {
    const [value, setValue] = useState<string[]>(['1', '2', '3']);
    return (
      <Select
        variant="tags"
        label="초기화 가능"
        placeholder="태그를 선택하세요..."
        options={defaultOptions}
        value={value}
        onChange={setValue}
        clearable
        width={300}
      />
    );
  },
};

/**
 * 로딩 상태
 *
 * `loading` prop으로 드롭다운 내에 로딩 스피너를 표시합니다.
 */
export const Loading: Story = {
  render: function Render() {
    const [value, setValue] = useState<string[]>();
    return (
      <Select
        variant="tags"
        label="로딩 중"
        placeholder="데이터 불러오는 중..."
        options={[]}
        value={value}
        onChange={setValue}
        loading
        width={300}
      />
    );
  },
};
