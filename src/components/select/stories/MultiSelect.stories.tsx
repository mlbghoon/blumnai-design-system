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
];

const optionsWithIcons: SelectOption[] = [
  { id: 'home', label: '홈', leadIcon: ['buildings', 'home'] },
  { id: 'settings', label: '설정', leadIcon: ['system', 'settings'] },
  { id: 'user', label: '사용자 프로필', leadIcon: ['user', 'user'] },
  { id: 'notification', label: '알림', leadIcon: ['media', 'notification'] },
];

const optionsWithDescriptions: SelectOption[] = [
  { id: 'read', label: '읽기', description: '콘텐츠 보기만 가능' },
  { id: 'write', label: '쓰기', description: '콘텐츠 생성 및 편집 가능' },
  { id: 'delete', label: '삭제', description: '콘텐츠 삭제 가능' },
  { id: 'admin', label: '관리자', description: '모든 기능에 대한 전체 접근 권한' },
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
      description: 'Select 컴포넌트의 변형을 설정합니다. 이 스토리에서는 multi-select 변형만 다룹니다',
      table: {
        type: { summary: 'SelectVariant' },
        defaultValue: { summary: 'multi-select' },
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
    selectedText: {
      control: 'text',
      description: '여러 옵션을 선택했을 때 트리거 버튼에 표시되는 텍스트입니다. 문자열 또는 함수를 전달할 수 있습니다',
      table: {
        type: {
          summary: 'string | ((count: number) => string)',
          detail: `문자열 또는 (count: number) => string 함수\n기본값: '{count} selected'`,
        },
      },
    },
    showSelectAll: {
      control: 'boolean',
      description: 'true로 설정하면 드롭다운 상단에 전체 선택 체크박스가 표시됩니다. maxSelections가 설정된 경우 무시됩니다',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    selectAllLabel: {
      control: 'text',
      description: '전체 선택 체크박스 옆에 표시되는 라벨 텍스트입니다',
      table: { type: { summary: 'string' }, defaultValue: { summary: '전체 선택' } },
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
      description: 'true로 설정하면 선택된 값을 모두 초기화하는 X 버튼이 표시됩니다',
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
 * 기본 Multi-Select
 *
 * 여러 옵션을 선택할 수 있는 Select입니다.
 */
export const Default: Story = {
  args: {
    variant: 'multi-select',
    label: '옵션 선택',
    placeholder: '옵션을 선택하세요...',
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
    selectedText: '',
    showSelectAll: false,
    selectAllLabel: '전체 선택',
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
    const selectedText = 'selectedText' in args ? (args.selectedText || undefined) : undefined;
    const showSelectAll = 'showSelectAll' in args ? args.showSelectAll : undefined;
    const selectAllLabel = 'selectAllLabel' in args ? (args.selectAllLabel || undefined) : undefined;
    const clearable = 'clearable' in args ? args.clearable : undefined;
    const loading = 'loading' in args ? args.loading : undefined;
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
        showSelectAll={showSelectAll}
        selectAllLabel={selectAllLabel}
        clearable={clearable}
        loading={loading}
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
        label="옵션 선택"
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
 * 아이콘이 있는 옵션
 */
export const WithIcons: Story = {
  render: function Render() {
    const [value, setValue] = useState<string[]>();
    return (
      <Select
        variant="multi-select"
        label="페이지 선택"
        placeholder="페이지를 선택하세요..."
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
        label="권한 선택"
        placeholder="권한을 선택하세요..."
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
        label="옵션 선택"
        placeholder="옵션을 선택하세요..."
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
        placeholder="옵션을 선택하세요..."
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
        placeholder="옵션을 선택하세요..."
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
        variant="multi-select"
        label="Success"
        placeholder="옵션을 선택하세요..."
        options={defaultOptions}
        value={value}
        onChange={setValue}
        success="옵션이 선택되었습니다"
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
        label="기본 스타일"
        placeholder="옵션을 선택하세요..."
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
        label="그림자 스타일"
        placeholder="옵션을 선택하세요..."
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
        label="소프트 스타일"
        placeholder="옵션을 선택하세요..."
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
        placeholder="옵션을 선택하세요..."
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
        placeholder="옵션을 선택하세요..."
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
        label="최대 3개 선택"
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
        label="커스텀 텍스트 (문자열)"
        placeholder="옵션을 선택하세요..."
        options={defaultOptions}
        value={value}
        onChange={setValue}
        selectedText="여러 항목이 선택됨"
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
        label="커스텀 텍스트 (함수)"
        placeholder="옵션을 선택하세요..."
        options={defaultOptions}
        value={value}
        onChange={setValue}
        selectedText={(count) => `${count}개 항목 선택됨`}
        width={300}
      />
    );
  },
};

// ============================================================================
// SELECT ALL
// ============================================================================

/**
 * 전체 선택
 *
 * `showSelectAll` prop으로 전체 선택 체크박스를 표시합니다.
 */
export const WithSelectAll: Story = {
  render: function Render() {
    const [value, setValue] = useState<string[]>();
    return (
      <Select
        variant="multi-select"
        label="옵션 선택"
        placeholder="옵션을 선택하세요..."
        options={defaultOptions}
        value={value}
        onChange={setValue}
        showSelectAll
        width={300}
      />
    );
  },
};

/**
 * 전체 선택 (커스텀 라벨)
 *
 * `selectAllLabel` prop으로 전체 선택 라벨을 변경합니다.
 */
export const WithSelectAllCustomLabel: Story = {
  render: function Render() {
    const [value, setValue] = useState<string[]>();
    return (
      <Select
        variant="multi-select"
        label="옵션 선택"
        placeholder="옵션을 선택하세요..."
        options={defaultOptions}
        value={value}
        onChange={setValue}
        showSelectAll
        selectAllLabel="모두 선택"
        width={300}
      />
    );
  },
};

/**
 * 전체 선택 + 검색
 *
 * 검색과 함께 사용할 때 전체 선택은 필터된 옵션에만 적용됩니다.
 */
export const WithSelectAllAndSearch: Story = {
  render: function Render() {
    const [value, setValue] = useState<string[]>();
    return (
      <Select
        variant="multi-select"
        label="검색 및 전체 선택"
        placeholder="검색하여 선택..."
        options={manyOptions}
        value={value}
        onChange={setValue}
        showSelectAll
        searchable
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
 * `clearable` prop으로 선택된 값을 모두 초기화하는 X 버튼을 표시합니다.
 */
export const Clearable: Story = {
  render: function Render() {
    const [value, setValue] = useState<string[]>(['1', '2', '3']);
    return (
      <Select
        variant="multi-select"
        label="초기화 가능"
        placeholder="옵션을 선택하세요..."
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
        variant="multi-select"
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
