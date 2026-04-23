import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Combobox } from '../Combobox';
import type { ComboboxOption, TagsComboboxProps } from '../Combobox.types';
import { frameworkOptions } from './_fixtures';

const meta: Meta<TagsComboboxProps> = {
  title: 'DataEntry/Combobox/Tags',
  component: Combobox,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  argTypes: {
    selectStyle: {
      control: 'select',
      options: ['default', 'shadow', 'soft'],
      description: 'Combobox 스타일 변형',
      table: {
        type: { summary: 'ComboboxStyle', detail: "'default' | 'shadow' | 'soft'" },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'lg'],
      description: 'Combobox 크기',
      table: {
        type: { summary: 'ComboboxSize', detail: "'xs' | 'sm' | 'lg'" },
        defaultValue: { summary: 'sm' },
      },
    },
    label: {
      control: 'text',
      description: '라벨',
      table: { type: { summary: 'ReactNode' } },
    },
    placeholder: {
      control: 'text',
      description: '플레이스홀더',
      table: { type: { summary: 'string' } },
    },
    caption: {
      control: 'text',
      description: '하단 설명',
      table: { type: { summary: 'string' } },
    },
    disabled: {
      control: 'boolean',
      description: '비활성화',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    clearable: {
      control: 'boolean',
      description: '선택 초기화 X 버튼 표시',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    loading: {
      control: 'boolean',
      description: '로딩 상태',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    maxSelections: {
      control: 'number',
      description: '최대 선택 개수',
      table: { type: { summary: 'number' } },
    },
    maxVisibleTags: {
      control: 'number',
      description: '최대 표시 태그 수 (초과 시 "+N more" 표시)',
      table: { type: { summary: 'number' } },
    },
    overflowText: {
      control: 'text',
      description: '오버플로우 텍스트. "{hiddenCount}" / "{totalCount}" placeholder 사용 가능',
      table: {
        type: { summary: 'string | ((hiddenCount: number, totalCount: number) => string)' },
        defaultValue: { summary: '+{hiddenCount} more' },
      },
    },
    creatable: {
      control: 'boolean',
      description: '새 항목 생성 가능 여부',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    createText: {
      control: 'text',
      description: '새 항목 생성 버튼 텍스트',
      table: { type: { summary: 'string | ((value: string) => string)' } },
    },
    highlightSearch: {
      control: 'boolean',
      description: '검색어 강조 표시',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'true' } },
    },
    contentWidth: {
      control: 'text',
      description: '드롭다운 너비',
      table: { type: { summary: 'string | number' } },
    },
    maxHeight: {
      control: 'number',
      description: '드롭다운 최대 높이 (px)',
      table: { type: { summary: 'number | string' }, defaultValue: { summary: '300' } },
    },
    options: {
      control: 'object',
      description: '선택 가능한 옵션',
      table: { type: { summary: 'ComboboxOption[]' } },
    },
  },
};

export default meta;
type Story = StoryObj<TagsComboboxProps>;

/**
 * 기본 Tags Combobox — 선택한 항목이 트리거에 Badge 태그로 펼쳐집니다.
 */
export const Default: Story = {
  args: {
    variant: 'tags',
    label: '기술 스택',
    placeholder: '검색하여 추가...',
    options: frameworkOptions,
    selectStyle: 'default',
    size: 'sm',
    disabled: false,
    clearable: false,
    loading: false,
    maxSelections: undefined,
    maxVisibleTags: undefined,
    overflowText: '',
    creatable: false,
    createText: '',
    highlightSearch: true,
    caption: '',
    contentWidth: undefined,
    maxHeight: 300,
  },
  parameters: { controls: { disable: false } },
  render: function Render(args) {
    const [options, setOptions] = useState<ComboboxOption[]>(args.options);
    const [values, setValues] = useState<string[]>([]);
    const overflowText = args.overflowText || undefined;
    const createText = args.createText || undefined;
    const caption = args.caption || undefined;

    const handleCreate = (newValue: string) => {
      const newOption: ComboboxOption = {
        id: newValue.toLowerCase().replace(/\s+/g, '-'),
        label: newValue,
      };
      setOptions((prev) => [...prev, newOption]);
      setValues((prev) => [...prev, newOption.id]);
    };

    return (
      <div className="max-w-sm">
        <Combobox
          variant="tags"
          label={args.label}
          placeholder={args.placeholder}
          options={options}
          value={values}
          onChange={setValues}
          selectStyle={args.selectStyle}
          size={args.size}
          disabled={args.disabled}
          clearable={args.clearable}
          loading={args.loading}
          maxSelections={args.maxSelections}
          maxVisibleTags={args.maxVisibleTags}
          overflowText={overflowText}
          creatable={args.creatable}
          createText={createText}
          onCreate={args.creatable ? handleCreate : undefined}
          highlightSearch={args.highlightSearch}
          caption={caption}
          contentWidth={args.contentWidth}
          maxHeight={args.maxHeight}
        />
      </div>
    );
  },
};

/**
 * `maxSelections` — 하드 캡
 *
 * 최대 선택 개수 초과 시 추가 선택이 차단됩니다.
 */
export const MaxSelections: Story = {
  render: function Render() {
    const [values, setValues] = useState<string[]>([]);
    return (
      <div className="max-w-sm">
        <Combobox
          variant="tags"
          label="최대 3개까지"
          options={frameworkOptions}
          value={values}
          onChange={setValues}
          maxSelections={3}
          caption={`현재 ${values.length}/3 선택됨`}
        />
      </div>
    );
  },
};

/**
 * `maxVisibleTags` — 초과분은 "+N more" 로 축약
 */
export const MaxVisibleTags: Story = {
  render: function Render() {
    const [values, setValues] = useState<string[]>(['react', 'vue', 'angular', 'next', 'nuxt']);
    return (
      <div className="max-w-sm">
        <Combobox
          variant="tags"
          label="maxVisibleTags={3}"
          options={frameworkOptions}
          value={values}
          onChange={setValues}
          maxVisibleTags={3}
        />
      </div>
    );
  },
};

/**
 * `overflowText` string — "{hiddenCount}" / "{totalCount}" 치환
 */
export const OverflowTextString: Story = {
  render: function Render() {
    const [values, setValues] = useState<string[]>(['react', 'vue', 'angular', 'next', 'nuxt', 'remix']);
    return (
      <div className="max-w-sm">
        <Combobox
          variant="tags"
          label="overflowText (string)"
          options={frameworkOptions}
          value={values}
          onChange={setValues}
          maxVisibleTags={2}
          overflowText="외 {hiddenCount}개 (총 {totalCount}개)"
        />
      </div>
    );
  },
};

/**
 * `overflowText` function
 */
export const OverflowTextFunction: Story = {
  render: function Render() {
    const [values, setValues] = useState<string[]>(['react', 'vue', 'angular', 'next', 'nuxt', 'remix']);
    return (
      <div className="max-w-sm">
        <Combobox
          variant="tags"
          label="overflowText (function)"
          options={frameworkOptions}
          value={values}
          onChange={setValues}
          maxVisibleTags={2}
          overflowText={(hiddenCount, totalCount) =>
            hiddenCount === 1
              ? `외 1개 프레임워크`
              : `외 ${hiddenCount}개 프레임워크 (총 ${totalCount})`
          }
        />
      </div>
    );
  },
};

/**
 * `creatable` — 새 태그 생성
 */
export const Creatable: Story = {
  render: function Render() {
    const [options, setOptions] = useState<ComboboxOption[]>(frameworkOptions);
    const [values, setValues] = useState<string[]>([]);

    const handleCreate = (newValue: string) => {
      const newOption: ComboboxOption = {
        id: newValue.toLowerCase().replace(/\s+/g, '-'),
        label: newValue,
      };
      setOptions((prev) => [...prev, newOption]);
      setValues((prev) => [...prev, newOption.id]);
    };

    return (
      <div className="max-w-sm">
        <Combobox
          variant="tags"
          label="기술 스택"
          placeholder="검색하거나 새 항목 추가..."
          options={options}
          value={values}
          onChange={setValues}
          creatable
          createText={(v) => `"${v}" 태그 추가`}
          onCreate={handleCreate}
        />
      </div>
    );
  },
};

/**
 * `clearable` — 모든 태그 제거
 */
export const Clearable: Story = {
  render: function Render() {
    const [values, setValues] = useState<string[]>(['react', 'vue', 'angular']);
    return (
      <div className="max-w-sm">
        <Combobox
          variant="tags"
          label="기술 스택"
          options={frameworkOptions}
          value={values}
          onChange={setValues}
          clearable
        />
      </div>
    );
  },
};

/**
 * `defaultValue` — 비제어 모드
 */
export const Uncontrolled: Story = {
  render: function Render() {
    return (
      <div className="max-w-sm">
        <Combobox
          variant="tags"
          label="Uncontrolled"
          placeholder="기본값: React, Vue"
          options={frameworkOptions}
          defaultValue={['react', 'vue']}
        />
      </div>
    );
  },
};

/**
 * `loading` — 드롭다운 내 스피너
 */
export const Loading: Story = {
  render: function Render() {
    const [values, setValues] = useState<string[]>([]);
    return (
      <div className="max-w-sm">
        <Combobox
          variant="tags"
          label="로딩"
          options={frameworkOptions}
          value={values}
          onChange={setValues}
          loading
        />
      </div>
    );
  },
};

/**
 * 비활성화 (전체 + 개별 옵션)
 */
export const Disabled: Story = {
  render: function Render() {
    const [v1, setV1] = useState<string[]>(['react']);
    const [v2, setV2] = useState<string[]>([]);
    return (
      <div className="flex flex-col ds-gap-16 max-w-sm">
        <Combobox variant="tags" label="전체 disabled" options={frameworkOptions} value={v1} onChange={setV1} disabled />
        <Combobox
          variant="tags"
          label="일부 옵션 disabled"
          options={frameworkOptions}
          value={v2}
          onChange={setV2}
          caption='"Svelte" 옵션이 disabled'
        />
      </div>
    );
  },
};

/**
 * 모든 크기
 */
export const AllSizes: Story = {
  render: function Render() {
    const [vXs, setVXs] = useState<string[]>([]);
    const [vSm, setVSm] = useState<string[]>([]);
    const [vLg, setVLg] = useState<string[]>([]);
    return (
      <div className="flex flex-col ds-gap-16 max-w-sm">
        <Combobox variant="tags" size="xs" label="xs" options={frameworkOptions} value={vXs} onChange={setVXs} />
        <Combobox variant="tags" size="sm" label="sm" options={frameworkOptions} value={vSm} onChange={setVSm} />
        <Combobox variant="tags" size="lg" label="lg" options={frameworkOptions} value={vLg} onChange={setVLg} />
      </div>
    );
  },
};

/**
 * 모든 스타일
 */
export const AllStyles: Story = {
  render: function Render() {
    const [v1, setV1] = useState<string[]>([]);
    const [v2, setV2] = useState<string[]>([]);
    const [v3, setV3] = useState<string[]>([]);
    return (
      <div className="flex flex-col ds-gap-16 max-w-sm">
        <Combobox variant="tags" selectStyle="default" label="default" options={frameworkOptions} value={v1} onChange={setV1} />
        <Combobox variant="tags" selectStyle="shadow" label="shadow" options={frameworkOptions} value={v2} onChange={setV2} />
        <Combobox variant="tags" selectStyle="soft" label="soft" options={frameworkOptions} value={v3} onChange={setV3} />
      </div>
    );
  },
};

/**
 * 에러 / 성공 상태
 */
export const States: Story = {
  render: function Render() {
    const [v1, setV1] = useState<string[]>([]);
    const [v2, setV2] = useState<string[]>(['react', 'vue']);
    return (
      <div className="flex flex-col ds-gap-16 max-w-sm">
        <Combobox variant="tags" label="Error" options={frameworkOptions} value={v1} onChange={setV1} error="최소 1개 선택" />
        <Combobox variant="tags" label="Success" options={frameworkOptions} value={v2} onChange={setV2} success="저장되었습니다" />
      </div>
    );
  },
};

/**
 * 라벨 + 캡션 + 필수
 */
export const WithLabelAndCaption: Story = {
  render: function Render() {
    const [values, setValues] = useState<string[]>([]);
    return (
      <div className="max-w-sm">
        <Combobox
          variant="tags"
          label="기술 스택"
          placeholder="검색하여 추가..."
          options={frameworkOptions}
          value={values}
          onChange={setValues}
          required
          supportText="1개 이상"
          caption="선호하는 프레임워크를 선택하세요"
        />
      </div>
    );
  },
};
