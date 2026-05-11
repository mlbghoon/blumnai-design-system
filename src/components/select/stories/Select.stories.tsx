import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { useState } from 'react';

import { Select } from '../Select';
import type { SelectOption } from '../Select.types';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '../../dialog/Dialog';
import { Button } from '../../button/Button';

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
    docs: {
      description: {
        component: `
**Select — 클릭해서 여는 picker (폼 필드용 기본 선택 컴포넌트)**

버튼을 눌러 드롭다운을 여는 전통적인 select 패턴입니다. 폼 필드의 일반적인 선택 UI로 사용하세요.

### Select vs Combobox — 언제 무엇을?

| 상황 | 권장 |
|---|---|
| 일반 폼 필드, 드롭다운 | **Select** (기본값) |
| 옵션 ~20개 이하, 스크롤/키보드로 충분 | **Select** |
| 다중 선택(\`multi-select\` / \`tags\`) | **Select** (form context에 자연스러움) |
| 타이핑해서 빠르게 찾는 게 주 용도 | **Combobox** |
| 새 항목 생성 필요 (\`creatable\`) | **Combobox** |
| 검색 하이라이트, 커스텀 필터 | **Combobox** |
| 옵션 1000개 이상 | \`VirtualSelect\` |

### \`searchable\` prop에 대해

드롭다운 내부에 검색 입력을 띄우는 하이브리드 UX를 제공하지만, **타이핑이 주 상호작용이라면 \`Combobox\`가 더 적합합니다.** Combobox는 WAI-ARIA "Editable Combobox" 패턴으로 입력 필드 자체가 트리거이며, \`creatable\` / \`highlightSearch\` / \`filterFunction\` 등 검색 기능이 더 완비되어 있습니다. \`searchable\`은 하위 호환을 위해 유지되지만 새 코드에서는 권장되지 않습니다.

### variant

- \`default\`: 단일 선택
- \`avatar\`: 아바타가 있는 단일 선택
- \`multi-select\`: 체크박스가 있는 다중 선택
- \`tags\`: 태그로 표시되는 다중 선택
        `.trim(),
      },
    },
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
    labelPosition: {
      control: 'select',
      options: ['top', 'left'],
      description: '라벨 위치를 설정합니다. top(상단), left(좌측 인라인) 중 선택할 수 있습니다',
      table: {
        type: { summary: "'top' | 'left'" },
        defaultValue: { summary: "'top'" },
      },
    },
    clearable: {
      control: 'boolean',
      description: 'true로 설정하면 선택된 값을 초기화할 수 있는 X 버튼이 표시됩니다',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    loading: {
      control: 'boolean',
      description: 'true로 설정하면 드롭다운에 로딩 스피너가 표시됩니다',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    selectType: {
      control: 'select',
      options: ['default', 'checkbox', 'radio'],
      description: '선택 표시 스타일을 설정합니다. default(체크), checkbox(체크박스), radio(라디오) 중 선택할 수 있습니다',
      table: {
        type: {
          summary: 'SelectType',
          detail: `'default' | 'checkbox' | 'radio'`,
        },
        defaultValue: { summary: "'default'" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

/**
 * 기본 Select
 *
 * 이 스토리에서 컴포넌트의 모든 props를 테스트할 수 있습니다.
 */
export const Default: Story = {
  args: {
    variant: 'default',
    selectStyle: 'default',
    size: 'sm',
    label: '옵션 선택',
    placeholder: '선택하세요...',
    disabled: false,
    required: false,
    searchable: false,
    supportText: '',
    caption: '',
    error: '',
    success: '',
    maxHeight: 300,
    options: defaultOptions,
    labelPosition: 'top',
    clearable: false,
    loading: false,
    selectType: 'default',
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const [value, setValue] = useState<string>();

    const variant = 'variant' in args ? args.variant : 'default';
    const supportText = args.supportText || undefined;
    const caption = args.caption || undefined;
    const error = args.error || undefined;
    const success = args.success || undefined;
    const selectType = 'selectType' in args ? args.selectType : undefined;
    const labelPosition = 'labelPosition' in args ? (args.labelPosition as 'top' | 'left') : 'top';
    const clearable = 'clearable' in args ? args.clearable : false;
    const loading = 'loading' in args ? args.loading : false;

    return (
      <div className="max-w-sm">
        <Select
          variant={variant as 'default'}
          label={args.label}
          labelPosition={labelPosition}
          placeholder={args.placeholder}
          options={args.options}
          value={value}
          onChange={setValue}
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
          clearable={clearable as boolean}
          loading={loading as boolean}
          selectType={selectType as 'default'}
        />
      </div>
    );
  },
};

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

const pageSizeOptions: SelectOption[] = [
  { id: '10', label: '10건' },
  { id: '30', label: '30건' },
  { id: '50', label: '50건' },
  { id: '70', label: '70건' },
  { id: '100', label: '100건' },
];

/**
 * Dialog 안에서의 Select (회귀 테스트)
 *
 * Dialog 내부에서 Select 를 열 때의 두 가지 회귀 — (a) 다이얼로그 시프트, (b) 드롭다운 클립 — 시각 검증.
 * (v1.9.9 fix — `document.body` 포털 + `z-[10100]`, v1.9.1 `DropdownInput` 패턴과 동일)
 *
 * 검증 절차:
 * 1. "다이얼로그 열기" 클릭
 * 2. 각 Select 를 차례로 열고 다이얼로그 컨텐츠가 좌우로 이동하지 않는지 확인
 * 3. 드롭다운이 다이얼로그 경계 밖으로 자연스럽게 표시되는지 (= 클립되지 않는지) 확인
 * 4. 화살표 / Enter / Esc 키 동작 확인
 */
export const InsideDialog: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Select 가 Dialog 내부에서 열릴 때 다이얼로그 시프트가 없는지 검증하는 회귀 스토리입니다. 화살표 / Enter 키 네비게이션도 동시에 점검합니다.',
      },
    },
  },
  render: function Render() {
    const [pageSize, setPageSize] = useState<string>('10');
    const [framework, setFramework] = useState<string>();

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button buttonStyle="secondary">다이얼로그 열기</Button>
        </DialogTrigger>
        <DialogContent width="640px">
          <DialogHeader>
            <DialogTitle>Select 회귀 테스트</DialogTitle>
            <DialogDescription>
              Dialog 안의 Select 를 열어도 다이얼로그가 우측으로 밀리지 않아야 합니다.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col ds-gap-16">
            <Select
              variant="default"
              label="프레임워크"
              placeholder="선택..."
              options={tagOptions}
              value={framework}
              onChange={setFramework}
            />
            <Select
              variant="default"
              label="검색 가능한 Select"
              placeholder="선택..."
              options={tagOptions}
              value={framework}
              onChange={setFramework}
              searchable
            />
            <div className="flex items-center justify-end ds-gap-8">
              <span className="font-body size-sm text-subtle">한 페이지</span>
              <Select
                variant="default"
                options={pageSizeOptions}
                value={pageSize}
                onChange={setPageSize}
                width={90}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button buttonStyle="secondary">취소</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button>저장</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
};

const manyManagerOptions: SelectOption[] = Array.from({ length: 40 }, (_, i) => ({
  id: `mgr-${i + 1}`,
  label: `담당 매니저 ${String(i + 1).padStart(2, '0')}`,
  description: `manager${i + 1}@example.com`,
}));

/**
 * 모달 Dialog 안에서 `searchable` Select 휠 스크롤 (회귀 테스트)
 *
 * `<Dialog modal>` 은 `react-remove-scroll` 로 body 스크롤을 잠그는데, `searchable` Select 의
 * 드롭다운은 `document.body` 로 포털되므로 그 위의 wheel 이벤트가 차단되어 옵션 리스트를
 * 스크롤할 수 없었습니다. 드롭다운 컨텐츠를 자체 `RemoveScroll` 로 감싸 해결.
 *
 * 검증 절차:
 * 1. "다이얼로그 열기" 클릭
 * 2. "담당 매니저" Select 를 열기 (옵션 40개 — `maxHeight` 초과)
 * 3. 옵션 리스트 위에서 마우스 휠로 스크롤 → 아래쪽 옵션까지 정상 도달하는지 확인
 * 4. 검색어 입력 후에도 결과 리스트가 스크롤되는지 확인
 */
export const SearchableScrollInsideModalDialog: Story = {
  parameters: {
    docs: {
      description: {
        story: '모달 Dialog 내부에서 `searchable` Select 드롭다운이 마우스 휠로 스크롤되는지 검증하는 회귀 스토리입니다.',
      },
    },
  },
  render: function Render() {
    const [manager, setManager] = useState<string>();

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button buttonStyle="secondary">다이얼로그 열기</Button>
        </DialogTrigger>
        <DialogContent width="480px">
          <DialogHeader>
            <DialogTitle>상담사 등록</DialogTitle>
            <DialogDescription>
              담당 매니저 드롭다운을 열고 마우스 휠로 스크롤되는지 확인하세요.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col ds-gap-16">
            <Select
              label="담당 매니저"
              placeholder="매니저 선택..."
              searchPlaceholder="매니저 검색..."
              options={manyManagerOptions}
              value={manager}
              onChange={setManager}
              searchable
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button buttonStyle="secondary">취소</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button>저장</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
};
