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
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
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
      description: '입력 필드의 변형 (lead-dropdown: 앞쪽, tail-dropdown: 뒤쪽)',
      table: {
        type: { summary: 'InputVariant' },
        defaultValue: { summary: 'tail-dropdown' },
      },
    },
    inputStyle: {
      control: 'select',
      options: ['default', 'shadow', 'soft'],
      description: '입력 필드의 스타일 변형',
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
      description: '입력 필드의 크기',
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
      description: '입력 필드의 라벨',
      table: {
        type: { summary: 'string' },
      },
    },
    placeholder: {
      control: 'text',
      description: '플레이스홀더 텍스트',
      table: {
        type: { summary: 'string' },
      },
    },
    value: {
      control: 'text',
      description: '입력 필드 값 (제어 컴포넌트)',
      table: {
        type: { summary: 'string' },
      },
    },
    caption: {
      control: 'text',
      description: '입력 필드 아래 설명 텍스트',
      table: {
        type: { summary: 'string' },
      },
    },
    required: {
      control: 'boolean',
      description: '필수 입력 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    error: {
      control: 'text',
      description: '에러 상태 또는 메시지',
      table: {
        type: { summary: 'boolean | string' },
      },
    },
    success: {
      control: 'text',
      description: '성공 상태 또는 메시지',
      table: {
        type: { summary: 'boolean | string' },
      },
    },
    leadIcon: {
      control: 'object',
      description: '입력 필드 앞에 표시되는 아이콘',
      table: {
        type: { summary: 'IconType' },
      },
    },
    tailIcon: {
      control: 'object',
      description: '입력 필드 뒤에 표시되는 아이콘',
      table: {
        type: { summary: 'IconType' },
      },
    },
    onChange: {
      action: 'changed',
      description: '입력 값 변경 시 콜백',
      table: {
        type: { summary: '(e: ChangeEvent<HTMLInputElement>) => void' },
      },
    },
    onClear: {
      action: 'cleared',
      description: '입력 내용 삭제 버튼 클릭 시 콜백',
      table: {
        type: { summary: '() => void' },
      },
    },
    dropdownOptions: {
      control: 'object',
      description: '드롭다운 옵션 목록',
      table: {
        type: { summary: 'DropdownOption[]' },
      },
    },
    dropdownValue: {
      control: 'text',
      description: '선택된 드롭다운 값',
      table: {
        type: { summary: 'string' },
      },
    },
    onDropdownChange: {
      action: 'dropdownChanged',
      description: '드롭다운 선택 변경 시 콜백',
      table: {
        type: { summary: '(value: string) => void' },
      },
    },
    dropdownPlaceholder: {
      control: 'text',
      description: '드롭다운 플레이스홀더',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Select' },
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
    label: 'Amount',
    placeholder: '0.00',
    dropdownOptions: currencyOptions,
    dropdownPlaceholder: 'Currency',
    inputStyle: 'default',
    size: 'sm',
    disabled: false,
  },
  render: function Render(args) {
    const [value, setValue] = useState('');
    const [dropdownValue, setDropdownValue] = useState('usd');
    const dropdownOptions = 'dropdownOptions' in args ? args.dropdownOptions : currencyOptions;
    const dropdownPlaceholder = 'dropdownPlaceholder' in args ? args.dropdownPlaceholder : 'Currency';
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
        label="Amount"
        placeholder="0.00"
        dropdownOptions={currencyOptions}
        dropdownPlaceholder="Currency"
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
        label="Phone Number"
        placeholder="(555) 123-4567"
        dropdownOptions={countryOptions}
        dropdownPlaceholder="Country"
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
        label="Price"
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
        label="Contact"
        placeholder="Enter phone number"
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
        label="Amount"
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
        label="Website URL"
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
        error="Invalid amount"
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
        success="Amount valid"
        dropdownOptions={currencyOptions}
        dropdownValue={currency}
        onDropdownChange={setCurrency}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
};
