import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Combobox } from '../Combobox';
import type { AvatarComboboxProps } from '../Combobox.types';
import { userOptions } from './_fixtures';

const meta: Meta<AvatarComboboxProps> = {
  title: 'DataEntry/Combobox/Avatar',
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
      description: '라벨 텍스트',
      table: { type: { summary: 'ReactNode' } },
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
    clearable: {
      control: 'boolean',
      description: '선택 초기화 X 버튼 표시',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    loading: {
      control: 'boolean',
      description: '로딩 상태 (드롭다운 내 스피너)',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    error: {
      control: 'text',
      description: '에러 상태',
      table: { type: { summary: 'boolean | string' } },
    },
    success: {
      control: 'text',
      description: '성공 상태',
      table: { type: { summary: 'boolean | string' } },
    },
    caption: {
      control: 'text',
      description: '하단 설명 텍스트',
      table: { type: { summary: 'string' } },
    },
    required: {
      control: 'boolean',
      description: '필수 입력 여부',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
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
      description: '선택 가능한 옵션 (avatarSrc 필드 포함)',
      table: { type: { summary: 'ComboboxOption[]' } },
    },
  },
};

export default meta;
type Story = StoryObj<AvatarComboboxProps>;

/**
 * 기본 Avatar Combobox — 선택 시 트리거에 아바타 + 라벨이 표시됩니다.
 */
export const Default: Story = {
  args: {
    variant: 'avatar',
    label: '사용자',
    placeholder: '사용자 검색...',
    options: userOptions,
    selectStyle: 'default',
    size: 'sm',
    disabled: false,
    clearable: false,
    loading: false,
    required: false,
    error: '',
    success: '',
    caption: '',
    highlightSearch: true,
    contentWidth: undefined,
    maxHeight: 300,
  },
  parameters: { controls: { disable: false } },
  render: function Render(args) {
    const [value, setValue] = useState<string>();
    const error = args.error || undefined;
    const success = args.success || undefined;
    const caption = args.caption || undefined;

    return (
      <div className="max-w-sm">
        <Combobox
          variant="avatar"
          label={args.label}
          placeholder={args.placeholder}
          options={args.options}
          value={value}
          onChange={setValue}
          selectStyle={args.selectStyle}
          size={args.size}
          disabled={args.disabled}
          clearable={args.clearable}
          loading={args.loading}
          required={args.required}
          error={error}
          success={success}
          caption={caption}
          highlightSearch={args.highlightSearch}
          contentWidth={args.contentWidth}
          maxHeight={args.maxHeight}
        />
      </div>
    );
  },
};

/**
 * 아바타 + 설명 (이메일 등)
 */
export const WithDescription: Story = {
  render: function Render() {
    const [value, setValue] = useState<string>();
    return (
      <div className="max-w-sm">
        <Combobox
          variant="avatar"
          label="담당자"
          placeholder="이름 또는 이메일 검색..."
          options={userOptions}
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};

/**
 * `clearable` — 선택 초기화
 */
export const Clearable: Story = {
  render: function Render() {
    const [value, setValue] = useState<string | undefined>('user1');
    return (
      <div className="max-w-sm">
        <Combobox
          variant="avatar"
          label="담당자"
          options={userOptions}
          value={value}
          onChange={setValue}
          clearable
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
          variant="avatar"
          label="담당자"
          placeholder="기본값: 이서연"
          options={userOptions}
          defaultValue="user2"
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
    const [value, setValue] = useState<string>();
    return (
      <div className="max-w-sm">
        <Combobox
          variant="avatar"
          label="로딩"
          placeholder="트리거 클릭"
          options={userOptions}
          value={value}
          onChange={setValue}
          loading
        />
      </div>
    );
  },
};

/**
 * `renderValue` — 트리거에 뱃지 등 추가 메타 표시
 */
export const CustomRenderValue: Story = {
  render: function Render() {
    const [value, setValue] = useState<string | undefined>('user3');
    return (
      <div className="max-w-sm">
        <Combobox
          variant="avatar"
          label="담당자"
          options={userOptions}
          value={value}
          onChange={setValue}
          renderValue={(option) => (
            <span className="flex items-center ds-gap-6">
              <span className="font-medium">{option.label}</span>
              <span className="size-xs text-muted">· {option.description}</span>
            </span>
          )}
        />
      </div>
    );
  },
};

/**
 * 에러 / 성공 상태
 */
export const States: Story = {
  render: function Render() {
    const [v1, setV1] = useState<string>();
    const [v2, setV2] = useState<string | undefined>('user2');
    return (
      <div className="flex flex-col ds-gap-16 max-w-sm">
        <Combobox variant="avatar" label="Error" options={userOptions} value={v1} onChange={setV1} error="담당자를 선택해주세요" />
        <Combobox variant="avatar" label="Success" options={userOptions} value={v2} onChange={setV2} success="담당자 지정됨" />
      </div>
    );
  },
};

/**
 * 비활성화
 */
export const Disabled: Story = {
  render: function Render() {
    const [value, setValue] = useState<string | undefined>('user1');
    return (
      <div className="max-w-sm">
        <Combobox
          variant="avatar"
          label="Disabled"
          options={userOptions}
          value={value}
          onChange={setValue}
          disabled
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
    const [vXs, setVXs] = useState<string>();
    const [vSm, setVSm] = useState<string>();
    const [vLg, setVLg] = useState<string>();
    return (
      <div className="flex flex-col ds-gap-16 max-w-sm">
        <Combobox variant="avatar" size="xs" label="xs" options={userOptions} value={vXs} onChange={setVXs} />
        <Combobox variant="avatar" size="sm" label="sm" options={userOptions} value={vSm} onChange={setVSm} />
        <Combobox variant="avatar" size="lg" label="lg" options={userOptions} value={vLg} onChange={setVLg} />
      </div>
    );
  },
};

/**
 * 모든 스타일
 */
export const AllStyles: Story = {
  render: function Render() {
    const [v1, setV1] = useState<string>();
    const [v2, setV2] = useState<string>();
    const [v3, setV3] = useState<string>();
    return (
      <div className="flex flex-col ds-gap-16 max-w-sm">
        <Combobox variant="avatar" selectStyle="default" label="default" options={userOptions} value={v1} onChange={setV1} />
        <Combobox variant="avatar" selectStyle="shadow" label="shadow" options={userOptions} value={v2} onChange={setV2} />
        <Combobox variant="avatar" selectStyle="soft" label="soft" options={userOptions} value={v3} onChange={setV3} />
      </div>
    );
  },
};

/**
 * 라벨 + 캡션 + 필수
 */
export const WithLabelAndCaption: Story = {
  render: function Render() {
    const [value, setValue] = useState<string>();
    return (
      <div className="max-w-sm">
        <Combobox
          variant="avatar"
          label="담당 직원"
          placeholder="이름 검색..."
          options={userOptions}
          value={value}
          onChange={setValue}
          required
          supportText="필수"
          caption="해당 업무를 담당할 직원을 선택하세요"
        />
      </div>
    );
  },
};
