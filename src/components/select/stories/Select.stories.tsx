import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { useState } from 'react';

import { Select } from '../Select';
import type { SelectOption } from '../Select.types';

const defaultOptions: SelectOption[] = [
  { id: '1', label: 'Option 1' },
  { id: '2', label: 'Option 2' },
  { id: '3', label: 'Option 3' },
  { id: '4', label: 'Option 4', disabled: true },
  { id: '5', label: 'Option 5' },
  { id: '6', label: 'Option 6' },
  { id: '7', label: 'Option 7' },
  { id: '8', label: 'Option 8' },
  { id: '9', label: 'Option 9' },
  { id: '10', label: 'Option 10' },
];

const userOptions: SelectOption[] = [
  { id: 'user1', label: '김민수', description: 'minsu@example.com', avatarSrc: 'https://i.pravatar.cc/150?u=john' },
  { id: 'user2', label: '이서연', description: 'seoyeon@example.com', avatarSrc: 'https://i.pravatar.cc/150?u=jane' },
  { id: 'user3', label: '박지훈', description: 'jihun@example.com', avatarSrc: 'https://i.pravatar.cc/150?u=bob' },
  { id: 'user4', label: '최수진', description: 'sujin@example.com', avatarSrc: 'https://i.pravatar.cc/150?u=alice' },
  { id: 'user5', label: '정태현', description: 'taehyun@example.com', avatarSrc: 'https://i.pravatar.cc/150?u=charlie' },
  { id: 'user6', label: '한유진', description: 'yujin@example.com', avatarSrc: 'https://i.pravatar.cc/150?u=diana' },
  { id: 'user7', label: '강준혁', description: 'junhyuk@example.com', avatarSrc: 'https://i.pravatar.cc/150?u=frank' },
  { id: 'user8', label: '윤서아', description: 'seoa@example.com', avatarSrc: 'https://i.pravatar.cc/150?u=grace' },
];

const tagOptions: SelectOption[] = [
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

const meta: Meta<typeof Select> = {
  title: 'DataEntry/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'avatar', 'multi-select', 'tags'],
      description: 'Select 컴포넌트의 변형을 설정합니다. default(기본), avatar(아바타), multi-select(다중 선택), tags(태그) 중 선택할 수 있습니다',
      table: {
        type: {
          summary: 'SelectVariant',
          detail: `'default' | 'avatar' | 'multi-select' | 'tags'`,
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
          summary: 'SelectStyle',
          detail: `'default' | 'shadow' | 'soft'`,
        },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'lg'],
      description: '컴포넌트의 크기를 설정합니다. xs(아주 작게), sm(작게), lg(크게) 중 선택할 수 있습니다',
      table: {
        type: {
          summary: 'SelectSize',
          detail: `'xs' | 'sm' | 'lg'`,
        },
        defaultValue: { summary: 'sm' },
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
          summary: 'SelectOption[]',
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
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

/**
 * 모든 변형 비교
 *
 * 4가지 Select 변형을 한눈에 비교합니다.
 */
export const AllVariants: Story = {
  args: {
    selectStyle: 'default',
    size: 'sm',
    disabled: false,
    required: false,
    searchable: false,
    supportText: '보조 텍스트',
    caption: '캡션 텍스트',
    error: '',
    success: '',
    maxHeight: 300,
  },
  render: function Render(args) {
    const [defaultValue, setDefaultValue] = useState<string>();
    const [avatarValue, setAvatarValue] = useState<string>();
    const [multiValue, setMultiValue] = useState<string[]>([]);
    const [tagsValue, setTagsValue] = useState<string[]>(['react', 'next']);

    const supportText = args.supportText || undefined;
    const caption = args.caption || undefined;
    const error = args.error || undefined;
    const success = args.success || undefined;

    return (
      <div className="flex flex-col ds-gap-24 max-w-md">
        <div>
          <h3 className="size-sm font-medium text-default [margin-bottom:32px]">Default</h3>
          <Select
            variant="default"
            label="옵션 선택"
            placeholder="선택하세요..."
            options={defaultOptions}
            value={defaultValue}
            onChange={setDefaultValue}
            selectStyle={args.selectStyle}
            size={args.size}
            disabled={args.disabled}
            required={args.required}
            searchable={args.searchable}
            supportText={supportText}
            caption={caption}
            error={error}
            success={success}
            maxHeight={args.maxHeight}
          />
        </div>

        <div>
          <h3 className="size-sm font-medium text-default [margin-bottom:32px]">Avatar</h3>
          <Select
            variant="avatar"
            label="담당자 지정"
            placeholder="사용자 선택..."
            options={userOptions}
            value={avatarValue}
            onChange={setAvatarValue}
            selectStyle={args.selectStyle}
            size={args.size}
            disabled={args.disabled}
            required={args.required}
            searchable={args.searchable}
            supportText={supportText}
            caption={caption}
            error={error}
            success={success}
            maxHeight={args.maxHeight}
          />
        </div>

        <div>
          <h3 className="size-sm font-medium text-default [margin-bottom:32px]">Multi-Select</h3>
          <Select
            variant="multi-select"
            label="기술 스택"
            placeholder="옵션을 선택하세요..."
            options={tagOptions}
            value={multiValue}
            onChange={setMultiValue}
            selectStyle={args.selectStyle}
            size={args.size}
            disabled={args.disabled}
            required={args.required}
            searchable={args.searchable}
            supportText={supportText}
            caption={caption}
            error={error}
            success={success}
            maxHeight={args.maxHeight}
          />
        </div>

        <div>
          <h3 className="size-sm font-medium text-default [margin-bottom:32px]">Tags</h3>
          <Select
            variant="tags"
            label="프레임워크"
            placeholder="태그를 선택하세요..."
            options={tagOptions}
            value={tagsValue}
            onChange={setTagsValue}
            selectStyle={args.selectStyle}
            size={args.size}
            disabled={args.disabled}
            required={args.required}
            searchable={args.searchable}
            supportText={supportText}
            caption={caption}
            error={error}
            success={success}
            maxHeight={args.maxHeight}
          />
        </div>
      </div>
    );
  },
};

// ============================================================================
// CUSTOM RENDER OPTION
// ============================================================================

const statusOptions: SelectOption[] = [
  { id: 'active', label: '활성', description: '현재 사용 중' },
  { id: 'inactive', label: '비활성', description: '일시 중단됨' },
  { id: 'pending', label: '대기 중', description: '승인 대기' },
  { id: 'archived', label: '보관됨', description: '더 이상 사용되지 않음' },
];

const statusColors: Record<string, string> = {
  active: 'bg-basic-green-accent',
  inactive: 'bg-basic-red-accent',
  pending: 'bg-basic-amber-accent',
  archived: 'bg-basic-gray-accent',
};

/**
 * 커스텀 옵션 렌더링
 *
 * `renderOption` prop으로 옵션 아이템을 커스터마이징할 수 있습니다.
 * 이 예제에서는 상태 표시 점과 함께 옵션을 렌더링합니다.
 */
export const CustomRenderOption: Story = {
  render: function Render() {
    const [value, setValue] = useState<string>();

    const renderOption = (option: SelectOption, isSelected: boolean): ReactNode => (
      <div className="flex items-center ds-gap-8 w-full">
        <span className={`inline-block width-8 height-8 rounded-full ${statusColors[option.id] ?? 'bg-basic-gray-accent'} shrink-0`} />
        <div className="flex flex-col min-w-0">
          <span className={`size-sm font-body ${isSelected ? 'font-medium' : ''}`}>
            {option.label}
          </span>
          {option.description && (
            <span className="size-xs text-muted font-body">{option.description}</span>
          )}
        </div>
      </div>
    );

    return (
      <Select
        variant="default"
        label="상태 선택"
        placeholder="상태를 선택하세요..."
        options={statusOptions}
        value={value}
        onChange={setValue}
        renderOption={renderOption}
        width={300}
      />
    );
  },
};
