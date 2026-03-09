import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Select } from '../Select';
import type { SelectOption } from '../Select.types';

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
    return (
      <Select
        variant="default"
        label={args.label}
        placeholder={args.placeholder}
        options={args.options}
        width={args.width}
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
