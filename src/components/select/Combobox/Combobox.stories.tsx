import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';

import { Combobox } from './Combobox';
import type { ComboboxOption } from './Combobox.types';

const defaultOptions: ComboboxOption[] = [
  { id: '1', label: 'Apple' },
  { id: '2', label: 'Banana' },
  { id: '3', label: 'Cherry' },
  { id: '4', label: 'Date', disabled: true },
  { id: '5', label: 'Elderberry' },
  { id: '6', label: 'Fig' },
  { id: '7', label: 'Grape' },
  { id: '8', label: 'Honeydew' },
  { id: '9', label: 'Jackfruit' },
  { id: '10', label: 'Kiwi' },
];

const iconOptions: ComboboxOption[] = [
  { id: 'home', label: 'Home', leadIcon: ['buildings', 'home'] },
  { id: 'settings', label: 'Settings', leadIcon: ['system', 'settings'] },
  { id: 'profile', label: 'Profile', leadIcon: ['user', 'user'] },
  { id: 'notifications', label: 'Notifications', leadIcon: ['others', 'bell'] },
  { id: 'help', label: 'Help', leadIcon: ['system', 'question'] },
];

const descriptionOptions: ComboboxOption[] = [
  { id: 'kr', label: 'South Korea', description: 'Republic of Korea' },
  { id: 'jp', label: 'Japan', description: 'Land of the Rising Sun' },
  { id: 'cn', label: 'China', description: 'People\'s Republic of China' },
  { id: 'us', label: 'United States', description: 'United States of America' },
  { id: 'uk', label: 'United Kingdom', description: 'Great Britain and Northern Ireland' },
];

const userOptions: ComboboxOption[] = [
  { id: 'user1', label: 'John Doe', description: 'john@example.com', avatarSrc: 'https://i.pravatar.cc/150?u=john' },
  { id: 'user2', label: 'Jane Smith', description: 'jane@example.com', avatarSrc: 'https://i.pravatar.cc/150?u=jane' },
  { id: 'user3', label: 'Bob Wilson', description: 'bob@example.com', avatarSrc: 'https://i.pravatar.cc/150?u=bob' },
  { id: 'user4', label: 'Alice Brown', description: 'alice@example.com', avatarSrc: 'https://i.pravatar.cc/150?u=alice' },
  { id: 'user5', label: 'Charlie Davis', description: 'charlie@example.com', avatarSrc: 'https://i.pravatar.cc/150?u=charlie' },
];

const tagOptions: ComboboxOption[] = [
  { id: 'react', label: 'React' },
  { id: 'vue', label: 'Vue' },
  { id: 'angular', label: 'Angular' },
  { id: 'svelte', label: 'Svelte', disabled: true },
  { id: 'next', label: 'Next.js' },
  { id: 'nuxt', label: 'Nuxt' },
  { id: 'remix', label: 'Remix' },
  { id: 'astro', label: 'Astro' },
  { id: 'solid', label: 'SolidJS' },
  { id: 'qwik', label: 'Qwik' },
];

const meta: Meta<typeof Combobox> = {
  title: 'DataEntry/Combobox',
  component: Combobox,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'avatar', 'tags'],
      description: 'Combobox 변형',
      table: {
        type: {
          summary: 'ComboboxVariant',
          detail: `'default' | 'avatar' | 'tags'`,
        },
        defaultValue: { summary: 'default' },
      },
    },
    selectStyle: {
      control: 'select',
      options: ['default', 'shadow', 'soft'],
      description: '스타일 변형',
      table: {
        type: {
          summary: 'ComboboxStyle',
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
          summary: 'ComboboxSize',
          detail: `'sm' | 'lg'`,
        },
        defaultValue: { summary: 'sm' },
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
      description: 'Combobox 아래에 표시되는 설명 텍스트',
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
    creatable: {
      control: 'boolean',
      description: '새 항목 생성 가능 여부',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    emptyStateTitle: {
      control: 'text',
      description: '빈 상태 제목',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'No search results' } },
    },
    emptyStateDescription: {
      control: 'text',
      description: '빈 상태 설명',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'Your search did not match any results.' } },
    },
    width: {
      control: 'number',
      description: '컨테이너 너비',
      table: { type: { summary: 'number | string' } },
    },
    maxHeight: {
      control: 'number',
      description: '드롭다운 최대 높이 (px)',
      table: { type: { summary: 'number | string' }, defaultValue: { summary: '300' } },
    },
    options: {
      control: 'object',
      description: '선택 가능한 옵션 목록',
      table: {
        type: {
          summary: 'ComboboxOption[]',
          detail: `{
  id: string;
  label: string;
  description?: string;
  leadIcon?: IconType;
  badge?: string;
  avatarSrc?: string;
  disabled?: boolean;
}[]`,
        },
      },
    },
    filterFunction: {
      description: '커스텀 필터 함수 — 미지정 시 label + description 기본 검색 사용',
      table: {
        type: { summary: '(option: ComboboxOption, query: string) => boolean' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Combobox>;

/**
 * 기본 Combobox
 *
 * 검색 가능한 드롭다운 입력 컴포넌트입니다.
 * Select와 달리 입력 필드를 사용하여 옵션을 필터링할 수 있습니다.
 */
export const Default: Story = {
  args: {
    variant: 'default',
    label: 'Select fruit',
    placeholder: 'Search fruits...',
    options: defaultOptions,
    selectStyle: 'default',
    size: 'sm',
    disabled: false,
    required: false,
    creatable: false,
    supportText: '',
    caption: '',
    error: '',
    success: '',
    maxHeight: 300,
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const [options, setOptions] = useState<ComboboxOption[]>(args.options);
    const [value, setValue] = useState<string>();

    const supportText = args.supportText || undefined;
    const caption = args.caption || undefined;
    const error = args.error || undefined;
    const success = args.success || undefined;

    const handleCreate = (newValue: string) => {
      const newOption: ComboboxOption = {
        id: newValue.toLowerCase().replace(/\s+/g, '-'),
        label: newValue,
      };
      setOptions((prev) => [...prev, newOption]);
      setValue(newOption.id);
    };

    React.useEffect(() => {
      setOptions(args.options);
    }, [args.options]);

    return (
      <div className="max-w-sm">
        <Combobox
          variant="default"
          label={args.label}
          placeholder={args.placeholder}
          options={options}
          value={value}
          onChange={setValue}
          selectStyle={args.selectStyle}
          size={args.size}
          disabled={args.disabled}
          required={args.required}
          creatable={args.creatable}
          onCreate={args.creatable ? handleCreate : undefined}
          supportText={supportText}
          caption={caption}
          error={error}
          success={success}
          maxHeight={args.maxHeight}
        />
      </div>
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
      <div className="max-w-sm">
        <Combobox
          variant="default"
          label="Navigate to"
          placeholder="Search pages..."
          options={iconOptions}
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};

/**
 * 설명이 있는 옵션
 */
export const WithDescription: Story = {
  render: function Render() {
    const [value, setValue] = useState<string>();

    return (
      <div className="max-w-sm">
        <Combobox
          variant="default"
          label="Select country"
          placeholder="Search countries..."
          options={descriptionOptions}
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};

/**
 * 아바타 변형
 *
 * 사용자 선택에 적합한 아바타 스타일입니다.
 */
export const AvatarVariant: Story = {
  render: function Render() {
    const [value, setValue] = useState<string>();

    return (
      <div className="max-w-sm">
        <Combobox
          variant="avatar"
          label="Assign to"
          placeholder="Search users..."
          options={userOptions}
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};

/**
 * 태그 변형
 *
 * 다중 선택을 지원하며 선택된 항목을 태그로 표시합니다.
 */
export const TagsVariant: Story = {
  render: function Render() {
    const [values, setValues] = useState<string[]>(['react', 'next']);

    return (
      <div className="max-w-sm">
        <Combobox
          variant="tags"
          label="Technologies"
          placeholder="Search and add..."
          options={tagOptions}
          value={values}
          onChange={setValues}
          maxVisibleTags={3}
        />
      </div>
    );
  },
};

/**
 * 새 항목 생성 가능
 *
 * creatable 옵션을 사용하면 목록에 없는 새 항목을 추가할 수 있습니다.
 */
export const Creatable: Story = {
  render: function Render() {
    const [options, setOptions] = useState<ComboboxOption[]>(defaultOptions);
    const [value, setValue] = useState<string>();

    const handleCreate = (newValue: string) => {
      const newOption: ComboboxOption = {
        id: newValue.toLowerCase().replace(/\s+/g, '-'),
        label: newValue,
      };
      setOptions([...options, newOption]);
      setValue(newOption.id);
    };

    return (
      <div className="max-w-sm">
        <Combobox
          variant="default"
          label="Select or create fruit"
          placeholder="Search or type to create..."
          options={options}
          value={value}
          onChange={setValue}
          onCreate={handleCreate}
          creatable
          createText={(v) => `Add "${v}"`}
        />
      </div>
    );
  },
};

/**
 * 태그 + 생성 가능
 *
 * 다중 선택과 새 항목 생성을 함께 사용할 수 있습니다.
 */
export const TagsCreatable: Story = {
  render: function Render() {
    const [options, setOptions] = useState<ComboboxOption[]>(tagOptions);
    const [values, setValues] = useState<string[]>(['react']);

    const handleCreate = (newValue: string) => {
      const newOption: ComboboxOption = {
        id: newValue.toLowerCase().replace(/\s+/g, '-'),
        label: newValue,
      };
      setOptions([...options, newOption]);
      setValues([...values, newOption.id]);
    };

    return (
      <div className="max-w-sm">
        <Combobox
          variant="tags"
          label="Select or create technologies"
          placeholder="Search or type to create..."
          options={options}
          value={values}
          onChange={setValues}
          onCreate={handleCreate}
          creatable
        />
      </div>
    );
  },
};

/**
 * 에러 상태
 */
export const ErrorState: Story = {
  render: function Render() {
    const [value, setValue] = useState<string>();

    return (
      <div className="max-w-sm">
        <Combobox
          variant="default"
          label="Select fruit"
          placeholder="Search fruits..."
          options={defaultOptions}
          value={value}
          onChange={setValue}
          error="Please select a fruit"
        />
      </div>
    );
  },
};

/**
 * 성공 상태
 */
export const SuccessState: Story = {
  render: function Render() {
    const [value, setValue] = useState<string>('1');

    return (
      <div className="max-w-sm">
        <Combobox
          variant="default"
          label="Select fruit"
          placeholder="Search fruits..."
          options={defaultOptions}
          value={value}
          onChange={setValue}
          success="Great choice!"
        />
      </div>
    );
  },
};

/**
 * 비활성화 상태
 */
export const Disabled: Story = {
  render: function Render() {
    return (
      <div className="max-w-sm">
        <Combobox
          variant="default"
          label="Select fruit"
          placeholder="Search fruits..."
          options={defaultOptions}
          disabled
        />
      </div>
    );
  },
};

/**
 * 크기 비교
 */
export const AllSizes: Story = {
  render: function Render() {
    const [smValue, setSmValue] = useState<string>();
    const [lgValue, setLgValue] = useState<string>();

    return (
      <div className="flex flex-col ds-gap-16 max-w-sm">
        <Combobox
          variant="default"
          label="Small (sm)"
          placeholder="Search..."
          options={defaultOptions}
          value={smValue}
          onChange={setSmValue}
          size="sm"
        />
        <Combobox
          variant="default"
          label="Large (lg)"
          placeholder="Search..."
          options={defaultOptions}
          value={lgValue}
          onChange={setLgValue}
          size="lg"
        />
      </div>
    );
  },
};

/**
 * 스타일 비교
 */
export const AllStyles: Story = {
  render: function Render() {
    const [defaultValue, setDefaultValue] = useState<string>();
    const [shadowValue, setShadowValue] = useState<string>();
    const [softValue, setSoftValue] = useState<string>();

    return (
      <div className="flex flex-col ds-gap-16 max-w-sm">
        <Combobox
          variant="default"
          label="Default style"
          placeholder="Search..."
          options={defaultOptions}
          value={defaultValue}
          onChange={setDefaultValue}
          selectStyle="default"
        />
        <Combobox
          variant="default"
          label="Shadow style"
          placeholder="Search..."
          options={defaultOptions}
          value={shadowValue}
          onChange={setShadowValue}
          selectStyle="shadow"
        />
        <Combobox
          variant="default"
          label="Soft style"
          placeholder="Search..."
          options={defaultOptions}
          value={softValue}
          onChange={setSoftValue}
          selectStyle="soft"
        />
      </div>
    );
  },
};

/**
 * 모든 변형 비교
 */
export const AllVariants: Story = {
  render: function Render() {
    const [defaultValue, setDefaultValue] = useState<string>();
    const [avatarValue, setAvatarValue] = useState<string>();
    const [tagsValue, setTagsValue] = useState<string[]>(['react', 'next']);

    return (
      <div className="flex flex-col ds-gap-24 max-w-md">
        <div>
          <h3 className="size-sm font-medium text-default [margin-bottom:32px]">Default</h3>
          <Combobox
            variant="default"
            label="Select fruit"
            placeholder="Search fruits..."
            options={defaultOptions}
            value={defaultValue}
            onChange={setDefaultValue}
          />
        </div>

        <div>
          <h3 className="size-sm font-medium text-default [margin-bottom:32px]">Avatar</h3>
          <Combobox
            variant="avatar"
            label="Assign to"
            placeholder="Search users..."
            options={userOptions}
            value={avatarValue}
            onChange={setAvatarValue}
          />
        </div>

        <div>
          <h3 className="size-sm font-medium text-default [margin-bottom:32px]">Tags</h3>
          <Combobox
            variant="tags"
            label="Technologies"
            placeholder="Search and add..."
            options={tagOptions}
            value={tagsValue}
            onChange={setTagsValue}
          />
        </div>
      </div>
    );
  },
};

/**
 * 빈 상태 (결과 없음)
 *
 * 검색 결과가 없을 때 표시되는 상태입니다.
 * 'xyz' 등으로 검색해보세요.
 */
export const EmptyState: Story = {
  render: function Render() {
    const [value, setValue] = useState<string>();

    return (
      <div className="max-w-sm">
        <Combobox
          variant="default"
          label="Select fruit"
          placeholder="Try searching 'xyz'..."
          options={defaultOptions}
          value={value}
          onChange={setValue}
          emptyStateTitle="No search results"
          emptyStateDescription="Your search did not match any results."
        />
      </div>
    );
  },
};

/**
 * 라벨과 캡션
 */
export const WithLabelAndCaption: Story = {
  render: function Render() {
    const [value, setValue] = useState<string>();

    return (
      <div className="max-w-sm">
        <Combobox
          variant="default"
          label="Favorite fruit"
          placeholder="Search fruits..."
          options={defaultOptions}
          value={value}
          onChange={setValue}
          required
          supportText="Optional"
          caption="Choose your favorite fruit from the list"
        />
      </div>
    );
  },
};

const employeeOptions: ComboboxOption[] = [
  { id: 'emp-001', label: 'John Doe', description: 'john.doe@company.com', badge: 'EMP-001' },
  { id: 'emp-002', label: 'Jane Smith', description: 'jane.smith@company.com', badge: 'EMP-002' },
  { id: 'emp-003', label: 'Bob Wilson', description: 'bob.wilson@company.com', badge: 'EMP-003' },
  { id: 'emp-004', label: 'Alice Brown', description: 'alice.brown@company.com', badge: 'EMP-004' },
  { id: 'emp-005', label: 'Charlie Davis', description: 'charlie.davis@company.com', badge: 'EMP-005' },
];

/**
 * 커스텀 필터 함수
 *
 * `filterFunction` prop으로 기본 검색 로직을 대체할 수 있습니다.
 * 이 예제에서는 이름, 이메일, 사번(ID)으로 검색할 수 있습니다.
 */
export const CustomFilter: Story = {
  render: function Render() {
    const [value, setValue] = useState<string>();

    return (
      <div className="max-w-sm">
        <Combobox
          variant="default"
          label="Find employee"
          placeholder="Search by name, email, or ID..."
          options={employeeOptions}
          value={value}
          onChange={setValue}
          filterFunction={(option, query) => {
            const q = query.toLowerCase();
            return (
              option.label.toLowerCase().includes(q) ||
              (option.description?.toLowerCase().includes(q) ?? false) ||
              option.id.toLowerCase().includes(q)
            );
          }}
          caption="Try searching 'emp-003' or 'bob'"
        />
      </div>
    );
  },
};
