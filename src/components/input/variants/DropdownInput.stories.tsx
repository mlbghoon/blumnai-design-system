import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Input } from '../Input';

const currencyOptions = [
  { value: 'usd', label: 'USD' },
  { value: 'eur', label: 'EUR' },
  { value: 'gbp', label: 'GBP' },
  { value: 'jpy', label: 'JPY' },
];

const countryOptions = [
  { value: 'us', label: '미국' },
  { value: 'uk', label: '영국' },
  { value: 'ca', label: '캐나다' },
  { value: 'au', label: '호주' },
];

const protocolOptions = [
  { value: 'https', label: 'https://' },
  { value: 'http', label: 'http://' },
  { value: 'ftp', label: 'ftp://' },
];

const meta: Meta<typeof Input> = {
  title: 'DataEntry/Input/DropdownInput',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['lead-dropdown', 'tail-dropdown'],
      description: '입력 필드의 변형을 설정합니다. lead-dropdown(드롭다운이 입력 필드 앞에 배치), tail-dropdown(드롭다운이 입력 필드 뒤에 배치) 중 선택할 수 있습니다',
      table: {
        type: { summary: 'InputVariant' },
        defaultValue: { summary: 'tail-dropdown' },
      },
    },
    inputStyle: {
      control: 'select',
      options: ['default', 'shadow', 'soft'],
      description: '입력 필드의 외관 스타일을 설정합니다. default(기본 테두리), shadow(그림자 효과), soft(부드러운 배경) 중 선택할 수 있습니다',
      table: {
        type: {
          summary: 'InputStyle',
          detail: `'default' | 'shadow' | 'soft'`,
        },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'lg'],
      description: '입력 필드의 크기를 설정합니다. sm(작게), lg(크게) 중 선택할 수 있습니다',
      table: {
        type: {
          summary: 'InputSize',
          detail: `'sm' | 'lg'`,
        },
        defaultValue: { summary: 'sm' },
      },
    },
    label: {
      control: 'text',
      description: '입력 필드 위에 표시되는 제목 텍스트입니다',
      table: {
        type: { summary: 'string' },
      },
    },
    placeholder: {
      control: 'text',
      description: '입력 필드가 비어있을 때 표시되는 안내 텍스트입니다',
      table: {
        type: { summary: 'string' },
      },
    },
    value: {
      control: 'text',
      description: '입력 필드에 표시되는 현재 값입니다. 외부에서 값을 제어할 때 사용합니다',
      table: {
        type: { summary: 'string' },
      },
    },
    caption: {
      control: 'text',
      description: '입력 필드 아래에 표시되는 도움말 텍스트입니다. 사용자에게 입력 방법이나 형식을 안내합니다',
      table: {
        type: { summary: 'string' },
      },
    },
    required: {
      control: 'boolean',
      description: 'true로 설정하면 필수 입력 항목으로 표시되며, 라벨 옆에 필수 표시(*)가 나타납니다',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'true로 설정하면 컴포넌트가 비활성화되어 클릭이나 입력을 할 수 없습니다',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    error: {
      control: 'text',
      description: '에러 메시지를 입력하면 빨간색 테두리와 함께 아래에 에러 메시지가 표시됩니다. true로 설정하면 에러 스타일만 적용됩니다',
      table: {
        type: { summary: 'boolean | string' },
      },
    },
    success: {
      control: 'text',
      description: '성공 메시지를 입력하면 초록색 테두리와 함께 아래에 성공 메시지가 표시됩니다. true로 설정하면 성공 스타일만 적용됩니다',
      table: {
        type: { summary: 'boolean | string' },
      },
    },
    leadIcon: {
      control: 'object',
      description: '입력 필드 왼쪽에 표시되는 아이콘입니다. [카테고리, 아이콘명] 형식으로 지정합니다',
      table: {
        type: { summary: 'IconType' },
      },
    },
    tailIcon: {
      control: 'object',
      description: '입력 필드 오른쪽에 표시되는 아이콘입니다. [카테고리, 아이콘명] 형식으로 지정합니다',
      table: {
        type: { summary: 'IconType' },
      },
    },
    onChange: {
      action: 'changed',
      description: '사용자가 입력 값을 변경할 때마다 호출되는 함수입니다',
      table: {
        type: { summary: '(e: ChangeEvent<HTMLInputElement>) => void' },
      },
    },
    onClear: {
      action: 'cleared',
      description: '이 함수를 전달하면 입력 필드에 X 버튼이 표시되며, 클릭 시 호출됩니다. 입력 내용을 초기화하는 용도로 사용합니다',
      table: {
        type: { summary: '() => void' },
      },
    },
    dropdownOptions: {
      control: 'object',
      description: '드롭다운에 표시되는 선택 가능한 옵션 목록입니다. { value, label } 형식의 배열로 전달합니다',
      table: {
        type: { summary: 'DropdownOption[]' },
      },
    },
    dropdownValue: {
      control: 'text',
      description: '현재 드롭다운에서 선택된 값입니다',
      table: {
        type: { summary: 'string' },
      },
    },
    onDropdownChange: {
      action: 'dropdownChanged',
      description: '드롭다운에서 다른 옵션을 선택했을 때 호출되는 함수입니다',
      table: {
        type: { summary: '(value: string) => void' },
      },
    },
    dropdownPlaceholder: {
      control: 'text',
      description: '드롭다운에 아무 것도 선택되지 않았을 때 표시되는 안내 텍스트입니다',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Select' },
      },
    },
    dropdownWidth: {
      control: 'number',
      description: '드롭다운 버튼의 너비를 고정합니다. 옵션 텍스트 길이에 따른 레이아웃 변동을 방지할 때 사용합니다',
      table: {
        type: { summary: 'number' },
      },
    },
    autoComplete: {
      control: 'text',
      description: '브라우저 자동완성 설정 (기본값: "off"로 자동완성 비활성화)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'off' },
      },
    },
    width: {
      control: 'text',
      description: '입력 필드 컨테이너의 커스텀 너비 (숫자는 px, 문자열은 그대로 사용)',
      table: {
        type: { summary: 'string | number' },
      },
    },
    className: {
      control: 'text',
      description: '컴포넌트에 전달할 추가 CSS 클래스',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

// ============================================================================
// BASIC POSITIONS
// ============================================================================

/**
 * 기본 드롭다운 입력 필드
 *
 * 이 스토리에서 컴포넌트의 모든 props를 테스트할 수 있습니다.
 * Input 컴포넌트는 `ref`와 `className` prop을 지원합니다.
 */
export const Default: Story = {
  args: {
    variant: 'tail-dropdown',
    label: '금액',
    placeholder: '0.00',
    dropdownOptions: currencyOptions,
    dropdownPlaceholder: '통화',
    inputStyle: 'default',
    size: 'sm',
    disabled: false,
  },
  render: function Render(args) {
    const [value, setValue] = useState('');
    const [dropdownValue, setDropdownValue] = useState('usd');
    const dropdownOptions = 'dropdownOptions' in args ? args.dropdownOptions : currencyOptions;
    const dropdownPlaceholder = 'dropdownPlaceholder' in args ? args.dropdownPlaceholder : '통화';
    return (
      <Input
        variant="tail-dropdown"
        label={args.label}
        placeholder={args.placeholder}
        dropdownOptions={dropdownOptions}
        dropdownPlaceholder={dropdownPlaceholder}
        inputStyle={args.inputStyle}
        size={args.size}
        disabled={args.disabled}
        required={args.required}
        supportText={args.supportText}
        caption={args.caption}
        error={args.error}
        success={args.success}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        dropdownValue={dropdownValue}
        onDropdownChange={setDropdownValue}
      />
    );
  },
  parameters: {
    controls: { disable: false },
  },
};

/**
 * 뒤쪽 드롭다운
 *
 * `variant="tail-dropdown"`로 드롭다운을 입력 필드 뒤에 배치합니다.
 */
export const TailDropdown: Story = {
  render: function Render() {
    const [value, setValue] = useState('');
    const [currency, setCurrency] = useState('usd');
    return (
      <Input
        variant="tail-dropdown"
        label="금액"
        placeholder="0.00"
        dropdownOptions={currencyOptions}
        dropdownPlaceholder="통화"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        dropdownValue={currency}
        onDropdownChange={setCurrency}
      />
    );
  },
};

/**
 * 앞쪽 드롭다운
 *
 * `variant="lead-dropdown"`로 드롭다운을 입력 필드 앞에 배치합니다.
 */
export const LeadDropdown: Story = {
  render: function Render() {
    const [country, setCountry] = useState('us');
    return (
      <Input
        variant="lead-dropdown"
        label="전화번호"
        placeholder="(555) 123-4567"
        dropdownOptions={countryOptions}
        dropdownPlaceholder="국가"
        dropdownValue={country}
        onDropdownChange={setCountry}
      />
    );
  },
};

// ============================================================================
// WITH ICONS
// ============================================================================

/**
 * 앞쪽 아이콘
 *
 * `leadIcon` prop으로 아이콘을 추가할 수 있습니다.
 */
export const WithLeadIcon: Story = {
  render: function Render() {
    const [value, setValue] = useState('');
    const [currency, setCurrency] = useState('usd');
    return (
      <Input
        variant="tail-dropdown"
        label="가격"
        placeholder="0.00"
        dropdownOptions={currencyOptions}
        leadIcon={['finance', 'money-dollar-circle']}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        dropdownValue={currency}
        onDropdownChange={setCurrency}
      />
    );
  },
};

/**
 * 뒤쪽 아이콘
 *
 * `tailIcon` prop으로 아이콘을 추가할 수 있습니다.
 */
export const WithTailIcon: Story = {
  render: function Render() {
    const [country, setCountry] = useState('us');
    return (
      <Input
        variant="lead-dropdown"
        label="연락처"
        placeholder="전화번호를 입력하세요"
        dropdownOptions={countryOptions}
        tailIcon={['device', 'phone']}
        dropdownValue={country}
        onDropdownChange={setCountry}
      />
    );
  },
};

// ============================================================================
// WITH CLEAR BUTTON
// ============================================================================

/**
 * 삭제 버튼이 있는 드롭다운 입력 필드
 *
 * `onClear` prop을 전달하면 입력 내용을 삭제할 수 있는 버튼이 표시됩니다.
 */
export const WithClearButton: Story = {
  render: function Render() {
    const [value, setValue] = useState('100.00');
    const [currency, setCurrency] = useState('usd');
    return (
      <Input
        variant="tail-dropdown"
        label="금액"
        placeholder="0.00"
        dropdownOptions={currencyOptions}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onClear={() => setValue('')}
        dropdownValue={currency}
        onDropdownChange={setCurrency}
      />
    );
  },
};

// ============================================================================
// USE CASES
// ============================================================================

/**
 * URL 입력 예제
 *
 * 프로토콜 선택이 포함된 URL 입력 필드입니다.
 */
export const UrlInput: Story = {
  render: function Render() {
    const [protocol, setProtocol] = useState('https');
    return (
      <Input
        variant="lead-dropdown"
        label="웹사이트 URL"
        placeholder="www.example.com"
        dropdownOptions={protocolOptions}
        dropdownValue={protocol}
        onDropdownChange={setProtocol}
      />
    );
  },
};

// ============================================================================
// SIZES
// ============================================================================

/**
 * Small 크기
 */
export const SizeSmall: Story = {
  render: function Render() {
    const [value, setValue] = useState('');
    const [currency, setCurrency] = useState('usd');
    return (
      <Input
        variant="tail-dropdown"
        label="Small"
        placeholder="0.00"
        size="sm"
        dropdownOptions={currencyOptions}
        dropdownValue={currency}
        onDropdownChange={setCurrency}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
};

/**
 * Large 크기
 */
export const SizeLarge: Story = {
  render: function Render() {
    const [value, setValue] = useState('');
    const [currency, setCurrency] = useState('usd');
    return (
      <Input
        variant="tail-dropdown"
        label="Large"
        placeholder="0.00"
        size="lg"
        dropdownOptions={currencyOptions}
        dropdownValue={currency}
        onDropdownChange={setCurrency}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
};

// ============================================================================
// STYLES
// ============================================================================

/**
 * Default 스타일
 */
export const StyleDefault: Story = {
  render: function Render() {
    const [value, setValue] = useState('');
    const [currency, setCurrency] = useState('usd');
    return (
      <Input
        variant="tail-dropdown"
        label="Default Style"
        placeholder="0.00"
        inputStyle="default"
        dropdownOptions={currencyOptions}
        dropdownValue={currency}
        onDropdownChange={setCurrency}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
};

/**
 * Shadow 스타일
 */
export const StyleShadow: Story = {
  render: function Render() {
    const [value, setValue] = useState('');
    const [currency, setCurrency] = useState('usd');
    return (
      <Input
        variant="tail-dropdown"
        label="Shadow Style"
        placeholder="0.00"
        inputStyle="shadow"
        dropdownOptions={currencyOptions}
        dropdownValue={currency}
        onDropdownChange={setCurrency}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
};

/**
 * Soft 스타일
 */
export const StyleSoft: Story = {
  render: function Render() {
    const [value, setValue] = useState('');
    const [currency, setCurrency] = useState('usd');
    return (
      <Input
        variant="tail-dropdown"
        label="Soft Style"
        placeholder="0.00"
        inputStyle="soft"
        dropdownOptions={currencyOptions}
        dropdownValue={currency}
        onDropdownChange={setCurrency}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
};

// ============================================================================
// STATES
// ============================================================================

/**
 * 기본 상태
 */
export const StateDefault: Story = {
  render: function Render() {
    const [value, setValue] = useState('');
    const [currency, setCurrency] = useState('usd');
    return (
      <Input
        variant="tail-dropdown"
        label="Default"
        placeholder="0.00"
        dropdownOptions={currencyOptions}
        dropdownValue={currency}
        onDropdownChange={setCurrency}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
};

/**
 * 비활성화 상태
 */
export const StateDisabled: Story = {
  render: function Render() {
    const [currency, setCurrency] = useState('usd');
    return (
      <Input
        variant="tail-dropdown"
        label="Disabled"
        placeholder="0.00"
        disabled
        dropdownOptions={currencyOptions}
        dropdownValue={currency}
        onDropdownChange={setCurrency}
      />
    );
  },
};

/**
 * 에러 상태
 */
export const StateError: Story = {
  render: function Render() {
    const [value, setValue] = useState('');
    const [currency, setCurrency] = useState('usd');
    return (
      <Input
        variant="tail-dropdown"
        label="Error"
        placeholder="0.00"
        error="유효하지 않은 금액입니다"
        dropdownOptions={currencyOptions}
        dropdownValue={currency}
        onDropdownChange={setCurrency}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
};

/**
 * 성공 상태
 */
export const StateSuccess: Story = {
  render: function Render() {
    const [value, setValue] = useState('');
    const [currency, setCurrency] = useState('usd');
    return (
      <Input
        variant="tail-dropdown"
        label="Success"
        placeholder="0.00"
        success="유효한 금액입니다"
        dropdownOptions={currencyOptions}
        dropdownValue={currency}
        onDropdownChange={setCurrency}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
};

// ============================================================================
// FIXED DROPDOWN WIDTH
// ============================================================================

const searchOptions = [
  { value: 'name', label: '이름' },
  { value: 'phone', label: '휴대폰번호' },
  { value: 'email', label: '이메일 주소' },
];

/**
 * 고정 너비 드롭다운
 *
 * `dropdownWidth` prop으로 드롭다운 트리거의 너비를 고정하여 값 변경 시 레이아웃 시프트를 방지합니다.
 */
export const FixedDropdownWidth: Story = {
  render: function Render() {
    const [value, setValue] = useState('');
    const [searchType, setSearchType] = useState('name');
    return (
      <div className="flex flex-col ds-gap-24">
        <div>
          <p className="font-body size-sm text-muted margin-b-8">dropdownWidth=100 (고정 너비)</p>
          <Input
            variant="lead-dropdown"
            placeholder="검색어를 입력하세요"
            dropdownOptions={searchOptions}
            dropdownValue={searchType}
            onDropdownChange={setSearchType}
            dropdownWidth={100}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <div>
          <p className="font-body size-sm text-muted margin-b-8">dropdownWidth 없음 (자동 너비)</p>
          <Input
            variant="lead-dropdown"
            placeholder="검색어를 입력하세요"
            dropdownOptions={searchOptions}
            dropdownValue={searchType}
            onDropdownChange={setSearchType}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
      </div>
    );
  },
};
