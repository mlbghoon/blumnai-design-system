import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { VirtualSelect } from '../VirtualSelect';
import { Select } from '../../select/Select';
import type { SelectOption } from '../../select/Select.types';
import type { IconTypeWithFill } from '../../icons/Icon/Icon.types';

const generateOptions = (count: number): SelectOption[] =>
  Array.from({ length: count }, (_, i) => ({
    id: `option-${i + 1}`,
    label: `Option ${i + 1}`,
  }));

const generateOptionsWithDescription = (count: number): SelectOption[] =>
  Array.from({ length: count }, (_, i) => ({
    id: `option-${i + 1}`,
    label: `Option ${i + 1}`,
    description: `Description for option ${i + 1}`,
  }));

const generateOptionsWithIcons = (count: number): SelectOption[] => {
  const icons: IconTypeWithFill[] = [
    ['system', 'search'],
    ['system', 'settings'],
    ['system', 'check'],
    ['system', 'filter'],
    ['system', 'download'],
  ];
  return Array.from({ length: count }, (_, i) => ({
    id: `option-${i + 1}`,
    label: `Option ${i + 1}`,
    leadIcon: icons[i % icons.length],
  }));
};

const options1000 = generateOptions(1000);
const options5000 = generateOptions(5000);
const optionsWithDesc500 = generateOptionsWithDescription(500);
const optionsWithIcons1000 = generateOptionsWithIcons(1000);

const meta: Meta<typeof VirtualSelect> = {
  title: 'DataEntry/VirtualSelect',
  component: VirtualSelect,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['single', 'multi'],
      description: '선택 방식 (단일/다중)',
      table: {
        type: {
          summary: 'VirtualSelectVariant',
          detail: `'single' | 'multi'`,
        },
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
    placeholder: {
      control: 'text',
      description: '플레이스홀더 텍스트',
      table: { type: { summary: 'string' } },
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
      table: { type: { summary: 'boolean' } },
    },
    searchable: {
      control: 'boolean',
      description: '검색 가능 여부',
      table: { type: { summary: 'boolean' } },
    },
    clearable: {
      control: 'boolean',
      description: '선택 초기화 버튼 표시 여부',
      table: { type: { summary: 'boolean' } },
    },
    loading: {
      control: 'boolean',
      description: '로딩 상태',
      table: { type: { summary: 'boolean' } },
    },
    error: {
      control: 'text',
      description: '에러 상태 또는 메시지',
      table: { type: { summary: 'boolean | string' } },
    },
    itemHeight: {
      control: 'number',
      description: '각 아이템의 높이 (px)',
      table: { type: { summary: 'number' } },
    },
    overscan: {
      control: 'number',
      description: '화면 밖에 미리 렌더링할 아이템 수',
      table: { type: { summary: 'number' } },
    },
    maxHeight: {
      control: 'number',
      description: '드롭다운 최대 높이 (px)',
      table: { type: { summary: 'number | string' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof VirtualSelect>;

/**
 * 기본 VirtualSelect
 *
 * 1,000개의 옵션을 가상화하여 렌더링합니다.
 * 이 스토리에서 컴포넌트의 모든 props를 테스트할 수 있습니다.
 */
export const Default: Story = {
  args: {
    variant: 'single',
    selectStyle: 'default',
    size: 'sm',
    label: 'Virtual Select',
    placeholder: 'Select an option...',
    disabled: false,
    searchable: false,
    clearable: false,
    loading: false,
    error: '',
    itemHeight: 32,
    overscan: 5,
    maxHeight: 300,
    options: options1000,
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const [value, setValue] = useState('');
    const error = args.error || undefined;
    return (
      <VirtualSelect
        variant="single"
        selectStyle={args.selectStyle}
        size={args.size}
        label={args.label}
        placeholder={args.placeholder}
        disabled={args.disabled}
        searchable={args.searchable}
        clearable={args.clearable}
        loading={args.loading}
        error={error}
        itemHeight={args.itemHeight}
        overscan={args.overscan}
        maxHeight={args.maxHeight}
        options={args.options!}
        value={value}
        onChange={setValue}
        width={320}
      />
    );
  },
};

/**
 * 다중 선택
 *
 * `variant="multi"`로 여러 옵션을 선택할 수 있습니다.
 */
export const MultiSelect: Story = {
  render: function Render() {
    const [value, setValue] = useState<string[]>([]);
    return (
      <VirtualSelect
        variant="multi"
        label="Multi Select"
        placeholder="Select options..."
        options={options1000}
        value={value}
        onChange={setValue}
        searchable
        clearable
        width={320}
      />
    );
  },
};

/**
 * 검색 기능
 *
 * `searchable`로 1,000개의 옵션을 실시간 필터링합니다.
 */
export const Searchable: Story = {
  render: function Render() {
    const [value, setValue] = useState('');
    return (
      <VirtualSelect
        variant="single"
        label="Searchable"
        placeholder="Search options..."
        options={options1000}
        value={value}
        onChange={setValue}
        searchable
        width={320}
      />
    );
  },
};

/**
 * 설명이 있는 아이템
 *
 * `itemHeight={50}`으로 설명 텍스트가 포함된 더 큰 아이템을 렌더링합니다.
 */
export const WithDescriptions: Story = {
  render: function Render() {
    const [value, setValue] = useState('');
    return (
      <VirtualSelect
        variant="single"
        label="With Descriptions"
        placeholder="Select an option..."
        options={optionsWithDesc500}
        value={value}
        onChange={setValue}
        itemHeight={50}
        width={320}
      />
    );
  },
};

/**
 * 아이콘이 있는 아이템
 *
 * 각 옵션에 lead 아이콘이 표시됩니다.
 */
export const WithIcons: Story = {
  render: function Render() {
    const [value, setValue] = useState('');
    return (
      <VirtualSelect
        variant="single"
        label="With Icons"
        placeholder="Select an option..."
        options={optionsWithIcons1000}
        value={value}
        onChange={setValue}
        width={320}
      />
    );
  },
};

/**
 * 전체 선택
 *
 * `showSelectAll`로 전체 선택/해제가 가능합니다.
 */
export const SelectAll: Story = {
  render: function Render() {
    const [value, setValue] = useState<string[]>([]);
    return (
      <VirtualSelect
        variant="multi"
        label="Select All"
        placeholder="Select options..."
        options={generateOptions(100)}
        value={value}
        onChange={setValue}
        showSelectAll
        searchable
        width={320}
      />
    );
  },
};

/**
 * 성능 비교
 *
 * 5,000개 옵션으로 VirtualSelect(가상화)와 일반 Select를 비교합니다.
 */
export const PerformanceDemo: Story = {
  render: function Render() {
    const [virtualValue, setVirtualValue] = useState('');
    const [selectValue, setSelectValue] = useState('');
    return (
      <div className="flex flex-col ds-gap-24">
        <div>
          <p className="font-body size-sm text-default margin-y-4">
            VirtualSelect — 5,000 options (virtualized, instant open)
          </p>
          <VirtualSelect
            variant="single"
            label="VirtualSelect (5,000)"
            placeholder="Open instantly..."
            options={options5000}
            value={virtualValue}
            onChange={setVirtualValue}
            searchable
            width={320}
          />
        </div>
        <div>
          <p className="font-body size-sm text-default margin-y-4">
            Regular Select — 5,000 options (all DOM nodes, may lag)
          </p>
          <Select
            variant="default"
            label="Select (5,000)"
            placeholder="May be slow..."
            options={options5000}
            value={selectValue}
            onChange={setSelectValue}
            searchable
            width={320}
          />
        </div>
      </div>
    );
  },
};

/**
 * 스타일 변형
 *
 * default, shadow, soft 세 가지 스타일을 비교합니다.
 */
export const Styles: Story = {
  render: function Render() {
    const [v1, setV1] = useState('');
    const [v2, setV2] = useState('');
    const [v3, setV3] = useState('');
    const opts = generateOptions(500);
    return (
      <div className="flex flex-col ds-gap-16">
        <VirtualSelect
          variant="single"
          selectStyle="default"
          label="Default Style"
          options={opts}
          value={v1}
          onChange={setV1}
          width={320}
        />
        <VirtualSelect
          variant="single"
          selectStyle="shadow"
          label="Shadow Style"
          options={opts}
          value={v2}
          onChange={setV2}
          width={320}
        />
        <VirtualSelect
          variant="single"
          selectStyle="soft"
          label="Soft Style"
          options={opts}
          value={v3}
          onChange={setV3}
          width={320}
        />
      </div>
    );
  },
};

/**
 * 비활성화 상태
 */
export const Disabled: Story = {
  render: () => (
    <VirtualSelect
      variant="single"
      label="Disabled"
      placeholder="Cannot interact..."
      options={generateOptions(100)}
      disabled
      width={320}
    />
  ),
};

/**
 * 에러 상태
 */
export const Error: Story = {
  render: function Render() {
    const [value, setValue] = useState('');
    return (
      <VirtualSelect
        variant="single"
        label="Error State"
        placeholder="Select an option..."
        options={generateOptions(100)}
        value={value}
        onChange={setValue}
        error="This field is required"
        width={320}
      />
    );
  },
};

/**
 * 로딩 상태
 */
export const Loading: Story = {
  render: () => (
    <VirtualSelect
      variant="single"
      label="Loading"
      placeholder="Loading options..."
      options={[]}
      loading
      width={320}
    />
  ),
};
