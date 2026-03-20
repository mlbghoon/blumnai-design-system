import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Select } from '../Select';
import type { SelectOption, SelectOptionGroup } from '../Select.types';

const defaultOptions: SelectOption[] = [
  { id: '1', label: '옵션 1' },
  { id: '2', label: '옵션 2' },
  { id: '3', label: '옵션 3' },
  { id: '4', label: '옵션 4', disabled: true },
  { id: '5', label: '옵션 5' },
];

const optionsWithIcons: SelectOption[] = [
  { id: 'home', label: '홈', leadIcon: ['buildings', 'home'] },
  { id: 'settings', label: '설정', leadIcon: ['system', 'settings'] },
  { id: 'user', label: '사용자 프로필', leadIcon: ['user', 'user'] },
  { id: 'notification', label: '알림', leadIcon: ['media', 'notification'] },
];

const optionsWithDescriptions: SelectOption[] = [
  { id: 'starter', label: '스타터', description: '소규모 프로젝트에 적합', badge: '$9/mo' },
  { id: 'pro', label: '프로페셔널', description: '성장하는 비즈니스', badge: '$29/mo' },
  { id: 'enterprise', label: '엔터프라이즈', description: '대규모 조직', badge: '맞춤형' },
];

const manyOptions: SelectOption[] = Array.from({ length: 20 }, (_, i) => ({
  id: `option-${i + 1}`,
  label: `옵션 ${i + 1}`,
}));

const meta: Meta<typeof Select> = {
  title: 'DataEntry/Select/DefaultSelect',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default'],
      description: 'Select 변형',
      table: {
        type: { summary: 'SelectVariant' },
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
      options: ['xs', 'sm', 'lg'],
      description: '크기',
      table: {
        type: {
          summary: 'SelectSize',
          detail: `'xs' | 'sm' | 'lg'`,
        },
        defaultValue: { summary: 'sm' },
      },
    },
    selectType: {
      control: 'select',
      options: ['default', 'checkbox', 'radio'],
      description: '선택 표시 타입',
      table: {
        type: {
          summary: 'SelectType',
          detail: `'default' | 'checkbox' | 'radio'`,
        },
        defaultValue: { summary: 'default' },
      },
    },
    label: {
      control: 'text',
      description: '라벨 텍스트',
      table: { type: { summary: 'string' } },
    },
    labelPosition: {
      control: 'select',
      options: ['top', 'left'],
      description: '라벨 위치 (top: 상단, left: 좌측 인라인)',
      table: {
        type: {
          summary: 'LabelPosition',
          detail: `'top' | 'left'`,
        },
        defaultValue: { summary: 'top' },
      },
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
  leadIcon?: IconType;
  badge?: string;
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
    clearable: {
      control: 'boolean',
      description: 'true로 설정하면 선택된 값을 초기화하는 X 버튼이 표시됩니다',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    loading: {
      control: 'boolean',
      description: 'true로 설정하면 드롭다운 내에 로딩 스피너가 표시됩니다. 데이터를 불러오는 중일 때 사용합니다',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    tailIcon: {
      control: 'object',
      description: '라벨 뒤, 화살표 앞에 표시되는 아이콘입니다',
      table: { type: { summary: 'IconTypeWithFill' } },
    },
    minWidth: {
      control: 'text',
      description: '컴포넌트의 최소 가로 너비를 설정합니다. 숫자(px) 또는 문자열(%, rem 등)로 지정할 수 있습니다',
      table: { type: { summary: 'number | string' } },
    },
    optionGroups: {
      control: 'object',
      description: '옵션을 그룹별로 구분하여 표시합니다. 각 그룹에 라벨과 옵션 ID 목록을 지정합니다',
      table: {
        type: {
          summary: 'SelectOptionGroup[]',
          detail: `{
  label: string;
  optionIds: string[];
}[]`,
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

// ============================================================================
// BASIC
// ============================================================================

/**
 * 기본 Select
 *
 * 이 스토리에서 컴포넌트의 모든 props를 테스트할 수 있습니다.
 */
export const Default: Story = {
  args: {
    variant: 'default',
    label: 'Select an option',
    labelPosition: 'top',
    placeholder: 'Choose...',
    options: defaultOptions,
    width: 300,
    selectStyle: 'default',
    size: 'sm',
    selectType: 'default',
    disabled: false,
    required: false,
    searchable: false,
    supportText: 'Support text here',
    caption: 'Caption text here',
    error: '',
    success: '',
    maxHeight: 300,
    clearable: false,
    loading: false,
    tailIcon: undefined,
    minWidth: undefined,
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
    const selectType = 'selectType' in args ? args.selectType : undefined;
    const clearable = 'clearable' in args ? args.clearable : undefined;
    const loading = 'loading' in args ? args.loading : undefined;
    const tailIcon = 'tailIcon' in args ? args.tailIcon : undefined;
    const minWidth = 'minWidth' in args ? args.minWidth : undefined;
    return (
      <Select
        variant="default"
        label={args.label}
        labelPosition={args.labelPosition}
        placeholder={args.placeholder}
        options={args.options}
        width={args.width}
        minWidth={minWidth}
        selectStyle={args.selectStyle}
        size={args.size}
        selectType={selectType}
        disabled={args.disabled}
        required={args.required}
        searchable={args.searchable}
        supportText={supportText}
        caption={caption}
        error={error}
        success={success}
        maxHeight={args.maxHeight}
        clearable={clearable}
        loading={loading}
        tailIcon={tailIcon}
        value={value}
        onChange={setValue}
      />
    );
  },
};

/**
 * 아이콘이 있는 옵션
 */
export const WithIcons: Story = {
  render: function Render() {
    const [value, setValue] = useState<string>();
    return (
      <Select
        variant="default"
        label="Navigate to"
        placeholder="Select page..."
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
    const [value, setValue] = useState<string>();
    return (
      <Select
        variant="default"
        label="Choose a plan"
        placeholder="Select plan..."
        options={optionsWithDescriptions}
        value={value}
        onChange={setValue}
        width={300}
      />
    );
  },
};

/**
 * 검색 가능한 Select
 */
export const Searchable: Story = {
  render: function Render() {
    const [value, setValue] = useState<string>();
    return (
      <Select
        variant="default"
        label="Search and select"
        placeholder="Type to search..."
        options={defaultOptions}
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
        variant="default"
        label="Default"
        placeholder="Choose..."
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
    variant: 'default',
    label: 'Disabled',
    placeholder: 'Choose...',
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
    const [value, setValue] = useState<string>();
    return (
      <Select
        variant="default"
        label="Error"
        placeholder="Choose..."
        options={defaultOptions}
        value={value}
        onChange={setValue}
        error="This field is required"
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
    const [value, setValue] = useState<string>();
    return (
      <Select
        variant="default"
        label="Success"
        placeholder="Choose..."
        options={defaultOptions}
        value={value}
        onChange={setValue}
        success="Valid selection"
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
        variant="default"
        selectStyle="default"
        label="Default Style"
        placeholder="Choose..."
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
    const [value, setValue] = useState<string>();
    return (
      <Select
        variant="default"
        selectStyle="shadow"
        label="Shadow Style"
        placeholder="Choose..."
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
    const [value, setValue] = useState<string>();
    return (
      <Select
        variant="default"
        selectStyle="soft"
        label="Soft Style"
        placeholder="Choose..."
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
 * Extra Small 크기
 *
 * `size="xs"`는 24px 높이로, 좁은 툴바나 사이드바에서 사용합니다.
 */
export const SizeExtraSmall: Story = {
  render: function Render() {
    const [value, setValue] = useState<string>();
    return (
      <Select
        variant="default"
        size="xs"
        label="Extra Small (xs)"
        placeholder="Choose..."
        options={defaultOptions}
        value={value}
        onChange={setValue}
        width={200}
      />
    );
  },
};

/**
 * Small 크기
 */
export const SizeSmall: Story = {
  render: function Render() {
    const [value, setValue] = useState<string>();
    return (
      <Select
        variant="default"
        size="sm"
        label="Small (sm)"
        placeholder="Choose..."
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
    const [value, setValue] = useState<string>();
    return (
      <Select
        variant="default"
        size="lg"
        label="Large (lg)"
        placeholder="Choose..."
        options={defaultOptions}
        value={value}
        onChange={setValue}
        width={300}
      />
    );
  },
};

// ============================================================================
// SELECT TYPES
// ============================================================================

/**
 * 체크마크 타입 (기본)
 */
export const TypeCheckmark: Story = {
  render: function Render() {
    const [value, setValue] = useState<string>();
    return (
      <Select
        variant="default"
        selectType="default"
        label="Checkmark Type"
        placeholder="Choose..."
        options={defaultOptions}
        value={value}
        onChange={setValue}
        width={300}
      />
    );
  },
};

/**
 * 체크박스 타입
 */
export const TypeCheckbox: Story = {
  render: function Render() {
    const [value, setValue] = useState<string>();
    return (
      <Select
        variant="default"
        selectType="checkbox"
        label="Checkbox Type"
        placeholder="Choose..."
        options={defaultOptions}
        value={value}
        onChange={setValue}
        width={300}
      />
    );
  },
};

/**
 * 라디오 버튼 타입
 */
export const TypeRadio: Story = {
  render: function Render() {
    const [value, setValue] = useState<string>();
    return (
      <Select
        variant="default"
        selectType="radio"
        label="Radio Type"
        placeholder="Choose..."
        options={defaultOptions}
        value={value}
        onChange={setValue}
        width={300}
      />
    );
  },
};

// ============================================================================
// WITH SCROLL
// ============================================================================

/**
 * 스크롤 가능한 메뉴
 *
 * 옵션이 많을 경우 maxHeight를 초과하면 스크롤이 가능합니다.
 */
export const WithScroll: Story = {
  render: function Render() {
    const [value, setValue] = useState<string>();
    return (
      <Select
        variant="default"
        label="Many Options"
        placeholder="Select option..."
        options={manyOptions}
        value={value}
        onChange={setValue}
        width={300}
      />
    );
  },
};

/**
 * 커스텀 최대 높이
 */
export const CustomMaxHeight: Story = {
  render: function Render() {
    const [value, setValue] = useState<string>();
    return (
      <Select
        variant="default"
        label="Custom Max Height (200px)"
        placeholder="Select option..."
        options={manyOptions}
        value={value}
        onChange={setValue}
        maxHeight={200}
        width={300}
      />
    );
  },
};

// ============================================================================
// WITH LABEL OPTIONS
// ============================================================================

/**
 * 라벨 없음
 */
export const NoLabel: Story = {
  render: function Render() {
    const [value, setValue] = useState<string>();
    return (
      <Select
        variant="default"
        placeholder="No label"
        options={defaultOptions}
        value={value}
        onChange={setValue}
        width={300}
      />
    );
  },
};

/**
 * 필수 필드
 */
export const Required: Story = {
  render: function Render() {
    const [value, setValue] = useState<string>();
    return (
      <Select
        variant="default"
        label="Required Field"
        required
        placeholder="This field is required..."
        options={defaultOptions}
        value={value}
        onChange={setValue}
        width={300}
      />
    );
  },
};

/**
 * 보조 텍스트 포함
 */
export const WithSupportText: Story = {
  render: function Render() {
    const [value, setValue] = useState<string>();
    return (
      <Select
        variant="default"
        label="With Support"
        supportText="Optional"
        placeholder="Has support text"
        options={defaultOptions}
        value={value}
        onChange={setValue}
        width={300}
      />
    );
  },
};

/**
 * 캡션 포함
 */
export const WithCaption: Story = {
  render: function Render() {
    const [value, setValue] = useState<string>();
    return (
      <Select
        variant="default"
        label="With Caption"
        caption="This is helper text"
        placeholder="Has caption"
        options={defaultOptions}
        value={value}
        onChange={setValue}
        width={300}
      />
    );
  },
};

/**
 * 리드 아이콘 포함
 */
export const WithLeadIcon: Story = {
  render: function Render() {
    const [value, setValue] = useState<string>();
    return (
      <Select
        variant="default"
        label="With Lead Icon"
        leadIcon={['system', 'search']}
        placeholder="Search..."
        options={defaultOptions}
        value={value}
        onChange={setValue}
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
 * `clearable` prop으로 선택된 값을 초기화하는 X 버튼을 표시합니다.
 */
export const Clearable: Story = {
  render: function Render() {
    const [value, setValue] = useState<string>('1');
    return (
      <Select
        variant="default"
        label="초기화 가능"
        placeholder="Choose..."
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
    const [value, setValue] = useState<string>();
    return (
      <Select
        variant="default"
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

// ============================================================================
// OPTION GROUPS
// ============================================================================

const groupedOptions: SelectOption[] = [
  { id: 'apple', label: '사과' },
  { id: 'banana', label: '바나나' },
  { id: 'grape', label: '포도' },
  { id: 'carrot', label: '당근' },
  { id: 'broccoli', label: '브로콜리' },
  { id: 'spinach', label: '시금치' },
  { id: 'beef', label: '소고기' },
  { id: 'chicken', label: '닭고기' },
  { id: 'salmon', label: '연어' },
];

const optionGroups: SelectOptionGroup[] = [
  { label: '과일', optionIds: ['apple', 'banana', 'grape'] },
  { label: '채소', optionIds: ['carrot', 'broccoli', 'spinach'] },
  { label: '육류/해산물', optionIds: ['beef', 'chicken', 'salmon'] },
];

/**
 * 옵션 그룹
 *
 * `optionGroups` prop으로 옵션을 그룹별로 구분하여 표시합니다.
 */
export const WithOptionGroups: Story = {
  render: function Render() {
    const [value, setValue] = useState<string>();
    return (
      <Select
        variant="default"
        label="식재료 선택"
        placeholder="식재료를 선택하세요..."
        options={groupedOptions}
        optionGroups={optionGroups}
        value={value}
        onChange={setValue}
        width={300}
      />
    );
  },
};
