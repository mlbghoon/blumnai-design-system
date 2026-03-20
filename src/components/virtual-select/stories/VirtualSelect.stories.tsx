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
    description: `옵션 ${i + 1}에 대한 설명`,
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
      description: '선택 방식을 설정합니다. single(단일 선택), multi(다중 선택) 중 선택할 수 있습니다',
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
    placeholder: {
      control: 'text',
      description: '값이 선택되지 않았을 때 입력 영역에 표시되는 안내 텍스트입니다',
      table: { type: { summary: 'string' } },
    },
    disabled: {
      control: 'boolean',
      description: 'true로 설정하면 컴포넌트가 비활성화되어 클릭이나 입력을 할 수 없습니다',
      table: { type: { summary: 'boolean' } },
    },
    searchable: {
      control: 'boolean',
      description: 'true로 설정하면 드롭다운 상단에 검색 입력 필드가 표시되어 옵션을 필터링할 수 있습니다',
      table: { type: { summary: 'boolean' } },
    },
    clearable: {
      control: 'boolean',
      description: 'true로 설정하면 선택된 값을 초기화하는 X 버튼이 표시됩니다',
      table: { type: { summary: 'boolean' } },
    },
    loading: {
      control: 'boolean',
      description: 'true로 설정하면 로딩 스피너가 표시됩니다. 데이터를 불러오는 중일 때 사용합니다',
      table: { type: { summary: 'boolean' } },
    },
    error: {
      control: 'text',
      description: '에러 메시지를 입력하면 빨간색 테두리와 함께 아래에 에러 메시지가 표시됩니다',
      table: { type: { summary: 'boolean | string' } },
    },
    itemHeight: {
      control: 'number',
      description: '가상 스크롤에서 각 아이템의 높이를 픽셀 단위로 설정합니다. 정확한 높이를 지정해야 스크롤이 올바르게 동작합니다',
      table: { type: { summary: 'number' } },
    },
    overscan: {
      control: 'number',
      description: '화면에 보이는 영역 밖에 미리 렌더링할 아이템 수입니다. 값이 클수록 스크롤이 부드럽지만 성능에 영향을 줍니다',
      table: { type: { summary: 'number' } },
    },
    maxHeight: {
      control: 'number',
      description: '드롭다운 메뉴의 최대 높이를 픽셀 단위로 설정합니다. 옵션이 많을 경우 스크롤이 생깁니다',
      table: { type: { summary: 'number | string' } },
    },
    success: {
      control: 'text',
      description: '성공 메시지를 입력하면 초록색 테두리와 함께 아래에 성공 메시지가 표시됩니다',
      table: { type: { summary: 'boolean | string' } },
    },
    minWidth: {
      control: 'text',
      description: '컴포넌트의 최소 가로 너비를 설정합니다. 숫자(px) 또는 문자열(%, rem 등)로 지정할 수 있습니다',
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
    label: '가상 선택',
    labelPosition: 'top',
    placeholder: '옵션을 선택하세요...',
    disabled: false,
    searchable: false,
    clearable: false,
    loading: false,
    error: '',
    success: '',
    itemHeight: 32,
    overscan: 5,
    maxHeight: 300,
    minWidth: undefined,
    options: options1000,
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const [value, setValue] = useState('');
    const error = args.error || undefined;
    const success = 'success' in args ? (args.success || undefined) : undefined;
    const minWidth = 'minWidth' in args ? args.minWidth : undefined;
    return (
      <VirtualSelect
        variant="single"
        selectStyle={args.selectStyle}
        size={args.size}
        label={args.label}
        labelPosition={args.labelPosition}
        placeholder={args.placeholder}
        disabled={args.disabled}
        searchable={args.searchable}
        clearable={args.clearable}
        loading={args.loading}
        error={error}
        success={success}
        itemHeight={args.itemHeight}
        overscan={args.overscan}
        maxHeight={args.maxHeight}
        options={args.options!}
        value={value}
        onChange={setValue}
        width={320}
        minWidth={minWidth}
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
        label="다중 선택"
        placeholder="옵션을 선택하세요..."
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
        label="검색 가능"
        placeholder="옵션 검색..."
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
        label="설명 포함"
        placeholder="옵션을 선택하세요..."
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
        label="아이콘 포함"
        placeholder="옵션을 선택하세요..."
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
        label="전체 선택"
        placeholder="옵션을 선택하세요..."
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
            VirtualSelect — 5,000개 옵션 (가상화, 즉시 열림)
          </p>
          <VirtualSelect
            variant="single"
            label="VirtualSelect (5,000개)"
            placeholder="즉시 열림..."
            options={options5000}
            value={virtualValue}
            onChange={setVirtualValue}
            searchable
            width={320}
          />
        </div>
        <div>
          <p className="font-body size-sm text-default margin-y-4">
            일반 Select — 5,000개 옵션 (모든 DOM 노드, 지연 가능)
          </p>
          <Select
            variant="default"
            label="Select (5,000개)"
            placeholder="느릴 수 있음..."
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
          label="기본 스타일"
          options={opts}
          value={v1}
          onChange={setV1}
          width={320}
        />
        <VirtualSelect
          variant="single"
          selectStyle="shadow"
          label="그림자 스타일"
          options={opts}
          value={v2}
          onChange={setV2}
          width={320}
        />
        <VirtualSelect
          variant="single"
          selectStyle="soft"
          label="소프트 스타일"
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
      label="비활성화"
      placeholder="조작할 수 없습니다..."
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
        label="에러 상태"
        placeholder="옵션을 선택하세요..."
        options={generateOptions(100)}
        value={value}
        onChange={setValue}
        error="필수 입력 항목입니다"
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
      label="로딩"
      placeholder="옵션 로딩 중..."
      options={[]}
      loading
      width={320}
    />
  ),
};

/**
 * 성공 상태
 */
export const Success: Story = {
  render: function Render() {
    const [value, setValue] = useState('option-1');
    return (
      <VirtualSelect
        variant="single"
        label="성공 상태"
        placeholder="옵션을 선택하세요..."
        options={generateOptions(100)}
        value={value}
        onChange={setValue}
        success="옵션이 선택되었습니다"
        width={320}
      />
    );
  },
};
