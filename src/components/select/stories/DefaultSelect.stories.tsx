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
  { id: 'starter', label: '스타터', description: '소규모 프로젝트에 적합', badge: '$9/mo' },
  { id: 'pro', label: '프로페셔널', description: '성장하는 비즈니스에 적합', badge: '$29/mo' },
  { id: 'enterprise', label: '엔터프라이즈', description: '대규모 조직에 적합', badge: 'Custom' },
];

const manyOptions: SelectOption[] = Array.from({ length: 20 }, (_, i) => ({
  id: `option-${i + 1}`,
  label: `Option ${i + 1}`,
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
      description: 'Select 컴포넌트의 변형을 설정합니다. 이 스토리에서는 default 변형만 다룹니다',
      table: {
        type: { summary: 'SelectVariant' },
        defaultValue: { summary: 'default' },
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
        defaultValue: { summary: 'default' },
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
        defaultValue: { summary: 'sm' },
      },
    },
    selectType: {
      control: 'select',
      options: ['default', 'checkbox', 'radio'],
      description: '선택된 항목의 표시 방식을 설정합니다. default(체크마크), checkbox(체크박스), radio(라디오 버튼) 중 선택할 수 있습니다',
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
 * 기본 Select
 *
 * 이 스토리에서 컴포넌트의 모든 props를 테스트할 수 있습니다.
 */
export const Default: Story = {
  args: {
    variant: 'default',
    label: '옵션 선택',
    placeholder: '선택하세요...',
    options: defaultOptions,
    width: 300,
    selectStyle: 'default',
    size: 'sm',
    selectType: 'default',
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
        label="이동할 페이지"
        placeholder="페이지 선택..."
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
        label="요금제 선택"
        placeholder="요금제를 선택하세요..."
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
        label="검색하여 선택"
        placeholder="검색어를 입력하세요..."
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
        label="기본"
        placeholder="선택하세요..."
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
    label: '비활성화',
    placeholder: '선택하세요...',
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
        label="에러"
        placeholder="선택하세요..."
        options={defaultOptions}
        value={value}
        onChange={setValue}
        error="필수 입력 항목입니다"
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
        label="성공"
        placeholder="선택하세요..."
        options={defaultOptions}
        value={value}
        onChange={setValue}
        success="유효한 선택입니다"
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
        label="기본 스타일"
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
        label="그림자 스타일"
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
        label="소프트 스타일"
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
        label="체크마크 타입"
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
        label="체크박스 타입"
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
        label="라디오 타입"
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
        label="많은 옵션"
        placeholder="옵션을 선택하세요..."
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
        label="커스텀 최대 높이 (200px)"
        placeholder="옵션을 선택하세요..."
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
        placeholder="라벨 없음"
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
        label="필수 항목"
        required
        placeholder="필수 입력 항목입니다..."
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
        label="보조 텍스트 포함"
        supportText="선택사항"
        placeholder="보조 텍스트 있음"
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
        label="캡션 포함"
        caption="도움말 텍스트입니다"
        placeholder="캡션 있음"
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
        label="리드 아이콘 포함"
        leadIcon={['system', 'search']}
        placeholder="검색..."
        options={defaultOptions}
        value={value}
        onChange={setValue}
        searchable
        width={300}
      />
    );
  },
};
