import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Combobox } from '../Combobox';
import type { MultiSelectComboboxProps } from '../Combobox.types';
import { frameworkOptions, techOptions, techGroups } from './_fixtures';

const meta: Meta<MultiSelectComboboxProps> = {
  title: 'DataEntry/Combobox/Multi-select',
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
      description: '선택 초기화 X 버튼',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    loading: {
      control: 'boolean',
      description: '로딩 상태',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    maxSelections: {
      control: 'number',
      description: '최대 선택 개수 (초과 시 추가 선택 차단)',
      table: { type: { summary: 'number' } },
    },
    selectedText: {
      control: 'text',
      description: '트리거에 표시되는 "N selected" 텍스트. "{count}"는 선택 개수로 치환',
      table: { type: { summary: 'string | ((count: number) => string)' } },
    },
    showSelectAll: {
      control: 'boolean',
      description: '"전체 선택" 옵션 표시 (maxSelections 설정 시 무시)',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    selectAllLabel: {
      control: 'text',
      description: '전체 선택 라벨',
      table: { type: { summary: 'string' }, defaultValue: { summary: '전체 선택' } },
    },
    showActions: {
      control: 'boolean',
      description: '적용/취소 버튼 모드 (즉시 반영 X, 버튼으로 일괄 commit)',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    applyLabel: {
      control: 'text',
      description: '적용 버튼 라벨',
      table: { type: { summary: 'string' }, defaultValue: { summary: '적용' } },
    },
    cancelLabel: {
      control: 'text',
      description: '취소 버튼 라벨',
      table: { type: { summary: 'string' }, defaultValue: { summary: '취소' } },
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
type Story = StoryObj<MultiSelectComboboxProps>;

/**
 * 기본 Multi-select Combobox
 *
 * Tags 와 달리 선택된 항목을 태그로 펼치지 않고 **"N selected"** 로 컴팩트하게 표시합니다.
 * 드롭다운 옵션에는 체크박스가 표시됩니다.
 */
export const Default: Story = {
  args: {
    variant: 'multi-select',
    label: '기술 스택',
    placeholder: '기술 검색...',
    options: frameworkOptions,
    selectStyle: 'default',
    size: 'sm',
    disabled: false,
    clearable: false,
    loading: false,
    maxSelections: undefined,
    selectedText: '',
    showSelectAll: false,
    selectAllLabel: '',
    showActions: false,
    applyLabel: '',
    cancelLabel: '',
    caption: '',
    contentWidth: undefined,
    maxHeight: 300,
  },
  parameters: { controls: { disable: false } },
  render: function Render(args) {
    const [values, setValues] = useState<string[]>([]);
    const selectedText = args.selectedText || undefined;
    const selectAllLabel = args.selectAllLabel || undefined;
    const applyLabel = args.applyLabel || undefined;
    const cancelLabel = args.cancelLabel || undefined;
    const caption = args.caption || undefined;

    return (
      <div className="max-w-sm">
        <Combobox
          variant="multi-select"
          label={args.label}
          placeholder={args.placeholder}
          options={args.options}
          value={values}
          onChange={setValues}
          selectStyle={args.selectStyle}
          size={args.size}
          disabled={args.disabled}
          clearable={args.clearable}
          loading={args.loading}
          maxSelections={args.maxSelections}
          selectedText={selectedText}
          showSelectAll={args.showSelectAll}
          selectAllLabel={selectAllLabel}
          showActions={args.showActions}
          applyLabel={applyLabel}
          cancelLabel={cancelLabel}
          caption={caption}
          contentWidth={args.contentWidth}
          maxHeight={args.maxHeight}
        />
      </div>
    );
  },
};

/**
 * `selectedText` — 트리거 요약 텍스트 커스텀
 */
export const CustomSelectedText: Story = {
  render: function Render() {
    const [v1, setV1] = useState<string[]>(['react', 'vue']);
    const [v2, setV2] = useState<string[]>(['react', 'vue', 'angular']);
    return (
      <div className="flex flex-col ds-gap-16 max-w-sm">
        <Combobox
          variant="multi-select"
          label="string with {count}"
          options={frameworkOptions}
          value={v1}
          onChange={setV1}
          selectedText="{count}개 선택됨"
        />
        <Combobox
          variant="multi-select"
          label="function"
          options={frameworkOptions}
          value={v2}
          onChange={setV2}
          selectedText={(count) => count === 1 ? '1개 프레임워크' : `${count}개 프레임워크`}
        />
      </div>
    );
  },
};

/**
 * `showSelectAll` — "전체 선택" 옵션
 *
 * maxSelections 이 설정된 경우 무시됩니다. indeterminate 상태도 지원합니다.
 */
export const SelectAll: Story = {
  render: function Render() {
    const [values, setValues] = useState<string[]>([]);
    return (
      <div className="max-w-sm">
        <Combobox
          variant="multi-select"
          label="기술 스택"
          placeholder="선택..."
          options={frameworkOptions}
          value={values}
          onChange={setValues}
          showSelectAll
          caption="일부 선택 → indeterminate, 전체 선택 → check"
        />
      </div>
    );
  },
};

/**
 * `showSelectAll` + 커스텀 라벨
 */
export const SelectAllCustomLabel: Story = {
  render: function Render() {
    const [values, setValues] = useState<string[]>([]);
    return (
      <div className="max-w-sm">
        <Combobox
          variant="multi-select"
          label="기술 스택"
          options={frameworkOptions}
          value={values}
          onChange={setValues}
          showSelectAll
          selectAllLabel="모두 선택"
        />
      </div>
    );
  },
};

/**
 * `maxSelections` — 하드 캡
 *
 * 최대 선택 개수를 초과하면 추가 선택이 차단됩니다.
 */
export const MaxSelections: Story = {
  render: function Render() {
    const [values, setValues] = useState<string[]>([]);
    return (
      <div className="max-w-sm">
        <Combobox
          variant="multi-select"
          label="최대 3개까지"
          options={frameworkOptions}
          value={values}
          onChange={setValues}
          maxSelections={3}
          caption={`현재 ${values.length}/3 선택됨 — 3개 넘게 선택 시도는 차단됩니다`}
        />
      </div>
    );
  },
};

/**
 * `showActions` — 적용/취소 버튼 모드
 *
 * 체크박스 클릭 시 즉시 반영되지 않고 "적용" 클릭 시 일괄 commit 됩니다.
 * 드롭다운을 apply 없이 닫으면 pending 상태가 revert 됩니다.
 */
export const ShowActions: Story = {
  render: function Render() {
    const [values, setValues] = useState<string[]>(['react']);
    return (
      <div className="max-w-sm">
        <Combobox
          variant="multi-select"
          label="기술 스택"
          placeholder="선택 후 적용"
          options={frameworkOptions}
          value={values}
          onChange={setValues}
          showActions
          caption={`Committed: ${JSON.stringify(values)}`}
        />
      </div>
    );
  },
};

/**
 * `showActions` + 커스텀 버튼 라벨
 */
export const ShowActionsCustomLabels: Story = {
  render: function Render() {
    const [values, setValues] = useState<string[]>([]);
    return (
      <div className="max-w-sm">
        <Combobox
          variant="multi-select"
          label="기술 스택"
          options={frameworkOptions}
          value={values}
          onChange={setValues}
          showActions
          applyLabel="Save"
          cancelLabel="Discard"
        />
      </div>
    );
  },
};

/**
 * `canApply` — 적용 버튼 활성화 조건 커스텀
 *
 * 이 예제는 pending 이 1개 이상일 때만 Apply 가 활성화됩니다 (빈 선택 commit 방지).
 */
export const CanApply: Story = {
  render: function Render() {
    const [values, setValues] = useState<string[]>(['react']);
    return (
      <div className="max-w-sm">
        <Combobox
          variant="multi-select"
          label="최소 1개 필수"
          options={frameworkOptions}
          value={values}
          onChange={setValues}
          showActions
          canApply={(pending) => pending.length >= 1}
          caption="pending=0 이면 Apply 버튼 disabled"
        />
      </div>
    );
  },
};

/**
 * `optionGroups` 와 결합
 */
export const WithGroups: Story = {
  render: function Render() {
    const [values, setValues] = useState<string[]>([]);
    return (
      <div className="max-w-sm">
        <Combobox
          variant="multi-select"
          label="기술 스택 (그룹)"
          placeholder="선택..."
          options={techOptions}
          optionGroups={techGroups}
          value={values}
          onChange={setValues}
        />
      </div>
    );
  },
};

/**
 * `clearable` — 선택 전체 초기화
 */
export const Clearable: Story = {
  render: function Render() {
    const [values, setValues] = useState<string[]>(['react', 'vue']);
    return (
      <div className="max-w-sm">
        <Combobox
          variant="multi-select"
          label="기술 스택"
          options={frameworkOptions}
          value={values}
          onChange={setValues}
          clearable
          caption="X 버튼으로 전체 초기화"
        />
      </div>
    );
  },
};

/**
 * `defaultValue` — 비제어 모드 초기값
 */
export const Uncontrolled: Story = {
  render: function Render() {
    return (
      <div className="max-w-sm">
        <Combobox
          variant="multi-select"
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
          variant="multi-select"
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
 * 모든 크기
 */
export const AllSizes: Story = {
  render: function Render() {
    const [vXs, setVXs] = useState<string[]>([]);
    const [vSm, setVSm] = useState<string[]>([]);
    const [vLg, setVLg] = useState<string[]>([]);
    return (
      <div className="flex flex-col ds-gap-16 max-w-sm">
        <Combobox variant="multi-select" size="xs" label="xs" options={frameworkOptions} value={vXs} onChange={setVXs} />
        <Combobox variant="multi-select" size="sm" label="sm" options={frameworkOptions} value={vSm} onChange={setVSm} />
        <Combobox variant="multi-select" size="lg" label="lg" options={frameworkOptions} value={vLg} onChange={setVLg} />
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
        <Combobox variant="multi-select" selectStyle="default" label="default" options={frameworkOptions} value={v1} onChange={setV1} />
        <Combobox variant="multi-select" selectStyle="shadow" label="shadow" options={frameworkOptions} value={v2} onChange={setV2} />
        <Combobox variant="multi-select" selectStyle="soft" label="soft" options={frameworkOptions} value={v3} onChange={setV3} />
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
        <Combobox variant="multi-select" label="Error" options={frameworkOptions} value={v1} onChange={setV1} error="최소 1개 선택해주세요" />
        <Combobox variant="multi-select" label="Success" options={frameworkOptions} value={v2} onChange={setV2} success="저장되었습니다" />
      </div>
    );
  },
};
