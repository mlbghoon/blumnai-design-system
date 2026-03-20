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
  { id: 'kr', label: '대한민국', description: '동아시아의 한반도 남부에 위치한 나라' },
  { id: 'jp', label: '일본', description: '동아시아의 섬나라' },
  { id: 'cn', label: '중국', description: '동아시아의 대륙 국가' },
  { id: 'us', label: '미국', description: '북아메리카의 연방 공화국' },
  { id: 'uk', label: '영국', description: '유럽 서부의 섬나라' },
];

const userOptions: ComboboxOption[] = [
  { id: 'user1', label: '김민수', description: 'minsu@example.com', avatarSrc: 'https://i.pravatar.cc/150?u=john' },
  { id: 'user2', label: '이서연', description: 'seoyeon@example.com', avatarSrc: 'https://i.pravatar.cc/150?u=jane' },
  { id: 'user3', label: '박지훈', description: 'jihun@example.com', avatarSrc: 'https://i.pravatar.cc/150?u=bob' },
  { id: 'user4', label: '최수진', description: 'sujin@example.com', avatarSrc: 'https://i.pravatar.cc/150?u=alice' },
  { id: 'user5', label: '정태현', description: 'taehyun@example.com', avatarSrc: 'https://i.pravatar.cc/150?u=charlie' },
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
      description: 'Combobox 컴포넌트의 변형을 설정합니다. default(기본), avatar(아바타), tags(태그) 중 선택할 수 있습니다',
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
      description: '컴포넌트의 외관 스타일을 설정합니다. default(기본 테두리), shadow(그림자 효과), soft(부드러운 배경) 중 선택할 수 있습니다',
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
      description: '컴포넌트의 크기를 설정합니다. sm(작게), lg(크게) 중 선택할 수 있습니다',
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
      description: 'Combobox 아래에 작은 글씨로 표시되는 도움말 텍스트입니다',
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
    creatable: {
      control: 'boolean',
      description: 'true로 설정하면 검색 결과에 없는 새 항목을 직접 추가할 수 있습니다',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    emptyStateTitle: {
      control: 'text',
      description: '검색 결과가 없을 때 표시되는 제목 텍스트입니다',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'No search results' } },
    },
    emptyStateDescription: {
      control: 'text',
      description: '검색 결과가 없을 때 제목 아래에 표시되는 부가 설명 텍스트입니다',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'Your search did not match any results.' } },
    },
    width: {
      control: 'number',
      description: '컴포넌트의 가로 너비를 설정합니다. 숫자(px) 또는 문자열(%, rem 등)로 지정할 수 있습니다',
      table: { type: { summary: 'number | string' } },
    },
    maxHeight: {
      control: 'number',
      description: '드롭다운 메뉴의 최대 높이를 픽셀 단위로 설정합니다. 옵션이 많을 경우 스크롤이 생깁니다',
      table: { type: { summary: 'number | string' }, defaultValue: { summary: '300' } },
    },
    options: {
      control: 'object',
      description: '드롭다운에 표시될 옵션 배열입니다. 각 옵션은 id, label을 필수로 가지며 description, icon 등을 추가할 수 있습니다',
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
    highlightSearch: {
      control: 'boolean',
      description: 'true로 설정하면 검색어와 일치하는 텍스트가 강조 표시됩니다. 기본값은 true입니다',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'true' } },
    },
    tailIcon: {
      control: 'object',
      description: '라벨 뒤, 화살표 앞에 표시되는 아이콘입니다',
      table: { type: { summary: 'IconTypeWithFill' } },
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
    labelPosition: 'top',
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
    width: undefined,
    emptyStateTitle: '',
    emptyStateDescription: '',
    highlightSearch: true,
    tailIcon: undefined,
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
    const emptyStateTitle = args.emptyStateTitle || undefined;
    const emptyStateDescription = args.emptyStateDescription || undefined;
    const width = 'width' in args ? args.width : undefined;
    const highlightSearch = 'highlightSearch' in args ? args.highlightSearch : undefined;
    const tailIcon = 'tailIcon' in args ? args.tailIcon : undefined;

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
          labelPosition={args.labelPosition}
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
          width={width}
          emptyStateTitle={emptyStateTitle}
          emptyStateDescription={emptyStateDescription}
          highlightSearch={highlightSearch}
          tailIcon={tailIcon}
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
          label="이동할 페이지"
          placeholder="페이지 검색..."
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
          label="국가 선택"
          placeholder="국가 검색..."
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
          label="담당자 지정"
          placeholder="사용자 검색..."
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
          label="기술 스택"
          placeholder="검색하여 추가..."
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
          label="과일 선택 또는 추가"
          placeholder="검색하거나 입력하여 추가..."
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
          label="기술 선택 또는 추가"
          placeholder="검색하거나 입력하여 추가..."
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
          label="과일 선택"
          placeholder="과일 검색..."
          options={defaultOptions}
          value={value}
          onChange={setValue}
          error="과일을 선택해 주세요"
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
          label="과일 선택"
          placeholder="과일 검색..."
          options={defaultOptions}
          value={value}
          onChange={setValue}
          success="좋은 선택입니다!"
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
          label="과일 선택"
          placeholder="과일 검색..."
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
            label="과일 선택"
            placeholder="과일 검색..."
            options={defaultOptions}
            value={defaultValue}
            onChange={setDefaultValue}
          />
        </div>

        <div>
          <h3 className="size-sm font-medium text-default [margin-bottom:32px]">Avatar</h3>
          <Combobox
            variant="avatar"
            label="담당자 지정"
            placeholder="사용자 검색..."
            options={userOptions}
            value={avatarValue}
            onChange={setAvatarValue}
          />
        </div>

        <div>
          <h3 className="size-sm font-medium text-default [margin-bottom:32px]">Tags</h3>
          <Combobox
            variant="tags"
            label="기술 스택"
            placeholder="검색하여 추가..."
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
          label="과일 선택"
          placeholder="Try searching 'xyz'..."
          options={defaultOptions}
          value={value}
          onChange={setValue}
          emptyStateTitle="검색 결과 없음"
          emptyStateDescription="검색 결과와 일치하는 항목이 없습니다."
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
          label="좋아하는 과일"
          placeholder="과일 검색..."
          options={defaultOptions}
          value={value}
          onChange={setValue}
          required
          supportText="선택사항"
          caption="목록에서 좋아하는 과일을 선택하세요"
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
          label="직원 찾기"
          placeholder="이름, 이메일 또는 사번으로 검색..."
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
          caption="'emp-003' 또는 'bob'으로 검색해 보세요"
        />
      </div>
    );
  },
};
