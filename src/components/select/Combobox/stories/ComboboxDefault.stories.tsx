import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';

import { Combobox } from '../Combobox';
import type { ComboboxOption, DefaultComboboxProps } from '../Combobox.types';
import { Button } from '../../../button/Button';
import {
  fruitOptions,
  iconOptions,
  coloredIconOptions,
  countryOptions,
  employeeOptions,
  longTextOptions,
  techOptions,
  techGroups,
} from './_fixtures';

const meta: Meta<DefaultComboboxProps> = {
  title: 'DataEntry/Combobox/Default',
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
    selectType: {
      control: 'select',
      options: ['default', 'checkbox', 'radio'],
      description: '선택된 옵션 표시 방식 (default variant 전용)',
      table: {
        type: { summary: 'ComboboxType', detail: "'default' | 'checkbox' | 'radio'" },
        defaultValue: { summary: 'default' },
      },
    },
    label: {
      control: 'text',
      description: '라벨 텍스트',
      table: { type: { summary: 'ReactNode' } },
    },
    labelPosition: {
      control: 'select',
      options: ['top', 'left'],
      description: '라벨 위치',
      table: { type: { summary: "'top' | 'left'" }, defaultValue: { summary: 'top' } },
    },
    labelWidth: {
      control: 'text',
      description: '라벨 너비 (labelPosition="left"일 때 정렬용)',
      table: { type: { summary: 'string | number' } },
    },
    required: {
      control: 'boolean',
      description: '필수 입력 여부 (별표 표시)',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    supportText: {
      control: 'text',
      description: '라벨 옆 보조 텍스트',
      table: { type: { summary: 'string' } },
    },
    caption: {
      control: 'text',
      description: 'Combobox 아래 설명 텍스트',
      table: { type: { summary: 'string' } },
    },
    placeholder: {
      control: 'text',
      description: '플레이스홀더 텍스트',
      table: { type: { summary: 'string' } },
    },
    searchPlaceholder: {
      control: 'text',
      description: '검색 중일 때 플레이스홀더 (미지정 시 placeholder 사용)',
      table: { type: { summary: 'string' } },
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    error: {
      control: 'text',
      description: '에러 상태 - true면 에러 스타일, 문자열이면 캡션 메시지',
      table: { type: { summary: 'boolean | string' } },
    },
    success: {
      control: 'text',
      description: '성공 상태 - true면 성공 스타일, 문자열이면 캡션 메시지',
      table: { type: { summary: 'boolean | string' } },
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
    creatable: {
      control: 'boolean',
      description: '새 항목 생성 가능 여부',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    createText: {
      control: 'text',
      description: '새 항목 생성 버튼 텍스트. "{value}"는 현재 입력값으로 치환',
      table: { type: { summary: 'string | ((value: string) => string)' } },
    },
    emptyStateTitle: {
      control: 'text',
      description: '검색 결과 없음 제목',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'No search results' } },
    },
    emptyStateDescription: {
      control: 'text',
      description: '검색 결과 없음 설명',
      table: { type: { summary: 'string' } },
    },
    width: {
      control: 'text',
      description: '트리거 너비 (숫자는 px, 문자열은 그대로)',
      table: { type: { summary: 'string | number' } },
    },
    minWidth: {
      control: 'text',
      description: '트리거 최소 너비',
      table: { type: { summary: 'string | number' } },
    },
    maxHeight: {
      control: 'number',
      description: '드롭다운 최대 높이 (px)',
      table: { type: { summary: 'number | string' }, defaultValue: { summary: '300' } },
    },
    contentWidth: {
      control: 'text',
      description: '드롭다운 너비. 미지정 시 트리거 너비에 맞춰짐',
      table: { type: { summary: 'string | number' } },
    },
    highlightSearch: {
      control: 'boolean',
      description: '검색어 일치 부분 강조 표시',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'true' } },
    },
    leadIcon: {
      control: 'object',
      description: '트리거 앞에 표시되는 아이콘',
      table: { type: { summary: 'IconTypeWithFill' } },
    },
    tailIcon: {
      control: 'object',
      description: '라벨 뒤, 화살표 앞에 표시되는 아이콘',
      table: { type: { summary: 'IconTypeWithFill' } },
    },
    options: {
      control: 'object',
      description: '선택 가능한 옵션 목록',
      table: { type: { summary: 'ComboboxOption[]' } },
    },
  },
};

export default meta;
type Story = StoryObj<DefaultComboboxProps>;

/**
 * 기본 Combobox (default variant) — controls 로 모든 props 실험 가능
 */
export const Default: Story = {
  args: {
    label: 'Select fruit',
    labelPosition: 'top',
    labelWidth: undefined,
    placeholder: 'Search fruits...',
    searchPlaceholder: '',
    options: fruitOptions,
    selectStyle: 'default',
    size: 'sm',
    selectType: 'default',
    disabled: false,
    required: false,
    clearable: false,
    loading: false,
    creatable: false,
    createText: '',
    supportText: '',
    caption: '',
    error: '',
    success: '',
    maxHeight: 300,
    width: undefined,
    minWidth: undefined,
    contentWidth: undefined,
    emptyStateTitle: '',
    emptyStateDescription: '',
    highlightSearch: true,
    leadIcon: undefined,
    tailIcon: undefined,
  },
  parameters: { controls: { disable: false } },
  render: function Render(args) {
    const [options, setOptions] = useState<ComboboxOption[]>(args.options);
    const [value, setValue] = useState<string>();

    const supportText = args.supportText || undefined;
    const caption = args.caption || undefined;
    const error = args.error || undefined;
    const success = args.success || undefined;
    const emptyStateTitle = args.emptyStateTitle || undefined;
    const emptyStateDescription = args.emptyStateDescription || undefined;
    const createText = args.createText || undefined;
    const searchPlaceholder = args.searchPlaceholder || undefined;

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
          labelWidth={args.labelWidth}
          placeholder={args.placeholder}
          searchPlaceholder={searchPlaceholder}
          options={options}
          value={value}
          onChange={setValue}
          selectStyle={args.selectStyle}
          size={args.size}
          selectType={args.selectType}
          disabled={args.disabled}
          required={args.required}
          clearable={args.clearable}
          loading={args.loading}
          creatable={args.creatable}
          createText={createText}
          onCreate={args.creatable ? handleCreate : undefined}
          supportText={supportText}
          caption={caption}
          error={error}
          success={success}
          maxHeight={args.maxHeight}
          width={args.width}
          minWidth={args.minWidth}
          contentWidth={args.contentWidth}
          emptyStateTitle={emptyStateTitle}
          emptyStateDescription={emptyStateDescription}
          highlightSearch={args.highlightSearch}
          leadIcon={args.leadIcon}
          tailIcon={args.tailIcon}
        />
      </div>
    );
  },
};

/**
 * 옵션에 아이콘 표시 (`ComboboxOption.leadIcon`)
 */
export const OptionsWithIcons: Story = {
  render: function Render() {
    const [value, setValue] = useState<string>();
    return (
      <div className="max-w-sm">
        <Combobox
          variant="default"
          label="Navigation"
          placeholder="메뉴 선택..."
          options={iconOptions}
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};

/**
 * 옵션별 아이콘 색상 (`ComboboxOption.iconColor`)
 */
export const OptionsWithIconColor: Story = {
  render: function Render() {
    const [value, setValue] = useState<string>();
    return (
      <div className="max-w-sm">
        <Combobox
          variant="default"
          label="Status"
          placeholder="상태 선택..."
          options={coloredIconOptions}
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};

/**
 * 옵션에 설명 (`ComboboxOption.description`)
 */
export const OptionsWithDescription: Story = {
  render: function Render() {
    const [value, setValue] = useState<string>();
    return (
      <div className="max-w-sm">
        <Combobox
          variant="default"
          label="국가"
          placeholder="국가 검색..."
          options={countryOptions}
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};

/**
 * 옵션에 뱃지 (`ComboboxOption.badge`)
 */
export const OptionsWithBadge: Story = {
  render: function Render() {
    const [value, setValue] = useState<string>();
    return (
      <div className="max-w-sm">
        <Combobox
          variant="default"
          label="직원"
          placeholder="직원 검색..."
          options={employeeOptions}
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};

/**
 * 옵션 호버 툴팁 (`ComboboxOption.tooltip`)
 *
 * disabled 옵션에서도 동작하므로 비활성화 사유 안내에 유용합니다.
 */
export const OptionsWithTooltip: Story = {
  render: function Render() {
    const [value, setValue] = useState<string>();
    const options: ComboboxOption[] = [
      { id: '1', label: 'Apple', tooltip: '빨간 과일' },
      { id: '2', label: 'Banana', tooltip: '노란 과일, 원숭이가 좋아함', tooltipPlacement: 'top' },
      { id: '3', label: 'Cherry', tooltip: <span>체리는 <b>빨강</b> 입니다</span> },
      { id: '4', label: 'Date', disabled: true, tooltip: '재고 없음 (disabled 에서도 툴팁 작동)' },
    ];
    return (
      <div className="max-w-sm">
        <Combobox
          variant="default"
          label="과일"
          placeholder="옵션에 호버해보세요"
          options={options}
          value={value}
          onChange={setValue}
          caption="Date (disabled)에 호버 시에도 툴팁이 표시됩니다"
        />
      </div>
    );
  },
};

/**
 * 트리거 `leadIcon` — 트리거 앞쪽 아이콘
 */
export const WithLeadIcon: Story = {
  render: function Render() {
    const [value, setValue] = useState<string>();
    return (
      <div className="max-w-sm">
        <Combobox
          variant="default"
          label="Search"
          placeholder="검색어 입력..."
          options={fruitOptions}
          value={value}
          onChange={setValue}
          leadIcon={['system', 'search']}
        />
      </div>
    );
  },
};

/**
 * 트리거 `tailIcon` — 화살표 앞 아이콘
 */
export const WithTailIcon: Story = {
  render: function Render() {
    const [value, setValue] = useState<string>();
    return (
      <div className="max-w-sm">
        <Combobox
          variant="default"
          label="Tag"
          placeholder="입력..."
          options={fruitOptions}
          value={value}
          onChange={setValue}
          tailIcon={['system', 'search']}
        />
      </div>
    );
  },
};

/**
 * `clearable` — 선택 초기화 X 버튼
 */
export const Clearable: Story = {
  render: function Render() {
    const [value, setValue] = useState<string | undefined>('1');
    return (
      <div className="max-w-sm">
        <Combobox
          variant="default"
          label="선택 후 X 버튼 사용"
          options={fruitOptions}
          value={value}
          onChange={setValue}
          clearable
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
          variant="default"
          label="로딩"
          placeholder="트리거 클릭"
          options={fruitOptions}
          value={value}
          onChange={setValue}
          loading
        />
      </div>
    );
  },
};

/**
 * `selectType` — 선택 표시 방식 (default / checkbox / radio)
 */
export const SelectType: Story = {
  render: function Render() {
    const [v1, setV1] = useState<string | undefined>('1');
    const [v2, setV2] = useState<string | undefined>('1');
    const [v3, setV3] = useState<string | undefined>('1');
    return (
      <div className="flex flex-col ds-gap-16 max-w-sm">
        <Combobox variant="default" label="default (check 아이콘)" options={fruitOptions} value={v1} onChange={setV1} selectType="default" />
        <Combobox variant="default" label="checkbox" options={fruitOptions} value={v2} onChange={setV2} selectType="checkbox" />
        <Combobox variant="default" label="radio" options={fruitOptions} value={v3} onChange={setV3} selectType="radio" />
      </div>
    );
  },
};

/**
 * `optionGroups` — 그룹으로 묶어서 표시
 *
 * 각 그룹에 라벨을 지정하고 `optionIds` 로 해당 그룹의 옵션을 나열합니다.
 * 그룹에 속하지 않은 옵션들은 마지막에 ungrouped 섹션에 표시됩니다.
 */
export const OptionGroups: Story = {
  render: function Render() {
    const [value, setValue] = useState<string>();
    return (
      <div className="max-w-sm">
        <Combobox
          variant="default"
          label="기술 스택"
          placeholder="기술 검색..."
          options={techOptions}
          optionGroups={techGroups}
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};

/**
 * `renderOption` — 옵션 커스텀 렌더링
 */
export const CustomRenderOption: Story = {
  render: function Render() {
    const [value, setValue] = useState<string>();
    return (
      <div className="max-w-sm">
        <Combobox
          variant="default"
          label="직원"
          options={employeeOptions}
          value={value}
          onChange={setValue}
          renderOption={(option, isSelected) => (
            <div className="flex items-center ds-gap-8 padding-x-8 padding-y-6 w-full">
              <div className="flex-1 min-w-0">
                <div className={isSelected ? 'font-semibold text-default' : 'text-default'}>
                  {option.label}
                </div>
                <div className="size-xs text-muted">{option.description}</div>
              </div>
              <span className="size-xs text-muted font-mono">{option.badge}</span>
            </div>
          )}
        />
      </div>
    );
  },
};

/**
 * `renderValue` — 트리거에 선택된 값을 커스텀 렌더
 */
export const CustomRenderValue: Story = {
  render: function Render() {
    const [value, setValue] = useState<string | undefined>('emp-002');
    return (
      <div className="max-w-sm">
        <Combobox
          variant="default"
          label="Selected with badge"
          options={employeeOptions}
          value={value}
          onChange={setValue}
          renderValue={(option) => (
            <span className="flex items-center ds-gap-6">
              <span className="font-medium">{option.label}</span>
              <span className="size-xs text-muted">({option.badge})</span>
            </span>
          )}
        />
      </div>
    );
  },
};

/**
 * `defaultValue` — 비제어 모드 초기값
 *
 * `value` 를 생략하고 `defaultValue` 만 지정하면 Combobox 내부에서 상태를 관리합니다.
 */
export const Uncontrolled: Story = {
  render: function Render() {
    return (
      <div className="max-w-sm">
        <Combobox
          variant="default"
          label="Uncontrolled"
          placeholder="기본값은 Banana"
          options={fruitOptions}
          defaultValue="2"
          caption="외부 state 없이 defaultValue + onChange 로 사용"
        />
      </div>
    );
  },
};

/**
 * 제어 모드 (`open` / `onOpenChange`) — 외부 버튼 토글
 */
export const ControlledOpen: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<string>();
    return (
      <div className="flex flex-col ds-gap-16 max-w-sm">
        <div className="flex ds-gap-8 items-center">
          <Button size="sm" buttonStyle="secondary" onClick={() => setOpen((v) => !v)}>
            {open ? 'Close' : 'Open'}
          </Button>
          <span className="size-sm text-subtle">open: {String(open)}</span>
        </div>
        <Combobox
          variant="default"
          label="Controlled"
          placeholder="외부 버튼으로 제어"
          options={fruitOptions}
          value={value}
          onChange={setValue}
          open={open}
          onOpenChange={setOpen}
        />
      </div>
    );
  },
};

/**
 * `creatable` — 새 항목 생성
 *
 * 왼쪽: `createText` 를 string으로. 오른쪽: `createText` 를 function으로.
 */
export const Creatable: Story = {
  render: function Render() {
    const [stringOptions, setStringOptions] = useState<ComboboxOption[]>(fruitOptions);
    const [funcOptions, setFuncOptions] = useState<ComboboxOption[]>(fruitOptions);
    const [stringValue, setStringValue] = useState<string>();
    const [funcValue, setFuncValue] = useState<string>();

    const makeCreate = (
      setter: React.Dispatch<React.SetStateAction<ComboboxOption[]>>,
      valueSetter: React.Dispatch<React.SetStateAction<string | undefined>>,
    ) => (newValue: string) => {
      const newOption: ComboboxOption = {
        id: newValue.toLowerCase().replace(/\s+/g, '-'),
        label: newValue,
      };
      setter((prev) => [...prev, newOption]);
      valueSetter(newOption.id);
    };

    return (
      <div className="flex flex-col ds-gap-16 max-w-sm">
        <Combobox
          variant="default"
          label="createText (string)"
          placeholder="새 과일 추가..."
          options={stringOptions}
          value={stringValue}
          onChange={setStringValue}
          creatable
          createText={'"{value}" 항목 추가'}
          onCreate={makeCreate(setStringOptions, setStringValue)}
        />
        <Combobox
          variant="default"
          label="createText (function)"
          placeholder="새 과일 추가..."
          options={funcOptions}
          value={funcValue}
          onChange={setFuncValue}
          creatable
          createText={(v) => `"${v}" 를 목록에 추가하기`}
          onCreate={makeCreate(setFuncOptions, setFuncValue)}
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
    const [v1, setV1] = useState<string>();
    const [v2, setV2] = useState<string>();
    return (
      <div className="flex flex-col ds-gap-16 max-w-sm">
        <Combobox variant="default" label="boolean error" options={fruitOptions} value={v1} onChange={setV1} error />
        <Combobox variant="default" label="string error" options={fruitOptions} value={v2} onChange={setV2} error="필수 항목입니다" />
      </div>
    );
  },
};

/**
 * 성공 상태
 */
export const SuccessState: Story = {
  render: function Render() {
    const [v1, setV1] = useState<string | undefined>('1');
    const [v2, setV2] = useState<string | undefined>('1');
    return (
      <div className="flex flex-col ds-gap-16 max-w-sm">
        <Combobox variant="default" label="boolean success" options={fruitOptions} value={v1} onChange={setV1} success />
        <Combobox variant="default" label="string success" options={fruitOptions} value={v2} onChange={setV2} success="올바르게 입력되었습니다" />
      </div>
    );
  },
};

/**
 * 비활성화 (전체 + 개별 옵션)
 */
export const Disabled: Story = {
  render: function Render() {
    const [v1, setV1] = useState<string>();
    const [v2, setV2] = useState<string>();
    return (
      <div className="flex flex-col ds-gap-16 max-w-sm">
        <Combobox variant="default" label="전체 disabled" options={fruitOptions} value={v1} onChange={setV1} disabled />
        <Combobox
          variant="default"
          label="일부 옵션만 disabled"
          options={fruitOptions}
          value={v2}
          onChange={setV2}
          caption='"Date" 옵션이 disabled + tooltip: "품절"'
        />
      </div>
    );
  },
};

/**
 * 모든 크기 (xs / sm / lg)
 */
export const AllSizes: Story = {
  render: function Render() {
    const [vXs, setVXs] = useState<string>();
    const [vSm, setVSm] = useState<string>();
    const [vLg, setVLg] = useState<string>();
    return (
      <div className="flex flex-col ds-gap-16 max-w-sm">
        <Combobox variant="default" size="xs" label="xs" options={fruitOptions} value={vXs} onChange={setVXs} />
        <Combobox variant="default" size="sm" label="sm" options={fruitOptions} value={vSm} onChange={setVSm} />
        <Combobox variant="default" size="lg" label="lg" options={fruitOptions} value={vLg} onChange={setVLg} />
      </div>
    );
  },
};

/**
 * 모든 스타일 (default / shadow / soft)
 */
export const AllStyles: Story = {
  render: function Render() {
    const [v1, setV1] = useState<string>();
    const [v2, setV2] = useState<string>();
    const [v3, setV3] = useState<string>();
    return (
      <div className="flex flex-col ds-gap-16 max-w-sm">
        <Combobox variant="default" selectStyle="default" label="default" options={fruitOptions} value={v1} onChange={setV1} />
        <Combobox variant="default" selectStyle="shadow" label="shadow" options={fruitOptions} value={v2} onChange={setV2} />
        <Combobox variant="default" selectStyle="soft" label="soft" options={fruitOptions} value={v3} onChange={setV3} />
      </div>
    );
  },
};

/**
 * `contentWidth` — 드롭다운을 트리거보다 넓게
 */
export const ContentWidthWiderThanTrigger: Story = {
  render: function Render() {
    const [value, setValue] = useState<string>();
    return (
      <div className="flex flex-col ds-gap-12">
        <div className="size-sm text-subtle">트리거 200px, 드롭다운 480px</div>
        <div style={{ width: 200 }}>
          <Combobox
            variant="default"
            label="긴 옵션"
            placeholder="선택..."
            options={longTextOptions}
            value={value}
            onChange={setValue}
            contentWidth={480}
          />
        </div>
      </div>
    );
  },
};

/**
 * `labelPosition="left"` + `labelWidth` — 폼 정렬
 */
export const LabelPositionLeft: Story = {
  render: function Render() {
    const [country, setCountry] = useState<string>();
    const [fruit, setFruit] = useState<string>();
    return (
      <div className="flex flex-col ds-gap-12" style={{ maxWidth: 480 }}>
        <Combobox
          variant="default"
          label="국가"
          labelPosition="left"
          labelWidth={120}
          placeholder="선택..."
          options={countryOptions}
          value={country}
          onChange={setCountry}
        />
        <Combobox
          variant="default"
          label="좋아하는 과일"
          labelPosition="left"
          labelWidth={120}
          placeholder="선택..."
          options={fruitOptions}
          value={fruit}
          onChange={setFruit}
        />
      </div>
    );
  },
};

/**
 * 라벨 + 캡션 + 필수 + 보조 텍스트
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
          options={fruitOptions}
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

/**
 * `highlightSearch` 비교 (on/off)
 */
export const HighlightSearchComparison: Story = {
  render: function Render() {
    const [v1, setV1] = useState<string>();
    const [v2, setV2] = useState<string>();
    return (
      <div className="flex flex-col ds-gap-16 max-w-sm">
        <Combobox variant="default" label="highlightSearch (true)" placeholder="'a' 입력" options={fruitOptions} value={v1} onChange={setV1} highlightSearch />
        <Combobox variant="default" label="highlightSearch (false)" placeholder="'a' 입력" options={fruitOptions} value={v2} onChange={setV2} highlightSearch={false} />
      </div>
    );
  },
};

/**
 * `filterFunction` — 커스텀 검색 (이름/이메일/사번/뱃지)
 */
export const CustomFilter: Story = {
  render: function Render() {
    const [value, setValue] = useState<string>();
    return (
      <div className="max-w-sm">
        <Combobox
          variant="default"
          label="직원 찾기"
          placeholder="이름, 이메일, 사번으로 검색..."
          options={employeeOptions}
          value={value}
          onChange={setValue}
          filterFunction={(option, query) => {
            const q = query.toLowerCase();
            return (
              option.label.toLowerCase().includes(q) ||
              (option.description?.toLowerCase().includes(q) ?? false) ||
              option.id.toLowerCase().includes(q) ||
              (option.badge?.toLowerCase().includes(q) ?? false)
            );
          }}
          caption="'emp-003' / 'bob' / 'EMP-004' 로 검색해보세요"
        />
      </div>
    );
  },
};

/**
 * 빈 상태 (기본 / 커스텀 텍스트 / 옵션 배열 자체가 비어있을 때)
 */
export const EmptyState: Story = {
  render: function Render() {
    const [v1, setV1] = useState<string>();
    const [v2, setV2] = useState<string>();
    const [v3, setV3] = useState<string>();
    return (
      <div className="flex flex-col ds-gap-16 max-w-sm">
        <Combobox variant="default" label="기본 빈 상태" placeholder="'xyz' 입력" options={fruitOptions} value={v1} onChange={setV1} />
        <Combobox
          variant="default"
          label="커스텀 빈 상태 텍스트"
          placeholder="'xyz' 입력"
          options={fruitOptions}
          value={v2}
          onChange={setV2}
          emptyStateTitle="일치하는 과일이 없어요"
          emptyStateDescription="다른 검색어를 시도해보세요"
        />
        <Combobox variant="default" label="옵션 배열이 비어있을 때" options={[]} value={v3} onChange={setV3} />
      </div>
    );
  },
};
