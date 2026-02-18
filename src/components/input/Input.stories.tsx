import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Input } from './Input';
import type { DefaultVariantProps } from './Input.types';

const meta: Meta<DefaultVariantProps> = {
  title: 'DataEntry/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  argTypes: {
    inputStyle: {
      control: 'select',
      options: ['default', 'shadow', 'soft'],
      description: '입력 필드 스타일 변형',
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
      description: '입력 필드 크기',
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
      description: '입력 필드 위에 표시되는 라벨 텍스트',
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
    required: {
      control: 'boolean',
      description: '필수 입력 여부 (별표 표시)',
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
    supportText: {
      control: 'text',
      description: '라벨 옆에 표시되는 보조 텍스트',
      table: {
        type: { summary: 'string' },
      },
    },
    caption: {
      control: 'text',
      description: '입력 필드 아래에 표시되는 설명 텍스트',
      table: {
        type: { summary: 'string' },
      },
    },
    error: {
      control: 'text',
      description: '에러 상태 - true면 에러 스타일 적용, 문자열이면 캡션으로 에러 메시지 표시',
      table: {
        type: { summary: 'boolean | string' },
      },
    },
    success: {
      control: 'text',
      description: '성공 상태 - true면 성공 스타일 적용, 문자열이면 캡션으로 성공 메시지 표시',
      table: {
        type: { summary: 'boolean | string' },
      },
    },
    showCount: {
      control: 'boolean',
      description: '글자 수 카운터 표시 여부 (maxLength와 함께 사용)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    maxLength: {
      control: 'number',
      description: '최대 글자 수',
      table: {
        type: { summary: 'number' },
      },
    },
    width: {
      control: 'text',
      description: '커스텀 너비 (숫자는 px, 문자열은 그대로 사용)',
      table: {
        type: { summary: 'string | number' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<DefaultVariantProps>;

// ============================================================================
// DEFAULT (Interactive Controls)
// ============================================================================

/**
 * 기본 Input
 *
 * 이 스토리에서 컴포넌트의 모든 props를 테스트할 수 있습니다.
 */
export const Default: Story = {
  args: {
    inputStyle: 'default',
    size: 'sm',
    label: 'Label',
    placeholder: 'Placeholder...',
    required: false,
    disabled: false,
    showCount: false,
    maxLength: undefined,
    supportText: '',
    caption: '',
    error: '',
    success: '',
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const [value, setValue] = useState('');
    const supportText = args.supportText || undefined;
    const caption = args.caption || undefined;
    const error = args.error || undefined;
    const success = args.success || undefined;

    return (
      <Input
        inputStyle={args.inputStyle}
        size={args.size}
        label={args.label}
        placeholder={args.placeholder}
        required={args.required}
        disabled={args.disabled}
        supportText={supportText}
        caption={caption}
        error={error}
        success={success}
        showCount={args.showCount}
        maxLength={args.maxLength}
        width={args.width}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
};

// ============================================================================
// ALL VARIANTS OVERVIEW
// ============================================================================

const currencyOptions = [
  { value: 'usd', label: 'USD' },
  { value: 'eur', label: 'EUR' },
  { value: 'gbp', label: 'GBP' },
];

const countryOptions = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
];

export const AllVariants: Story = {
  render: function Render() {
    const [password, setPassword] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [quantity2, setQuantity2] = useState(1);
    const [tags, setTags] = useState(['React', 'TypeScript']);
    const [inlineTags, setInlineTags] = useState(['Design', 'Dev']);
    const [country, setCountry] = useState('us');
    const [currency, setCurrency] = useState('usd');
    const [amount, setAmount] = useState('');
    const [textValue, setTextValue] = useState('Hello World');

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const filtered = e.target.value.replace(/[^0-9.]/g, '');
      const parts = filtered.split('.');
      setAmount(parts.length > 2 ? parts[0] + '.' + parts.slice(1).join('') : filtered);
    };

    return (
      <div className="flex flex-col ds-gap-24 max-w-md">
        <div>
          <h3 className="size-sm font-medium text-default [margin-bottom:32px]">Default</h3>
          <Input
            label="Email"
            placeholder="Enter email"
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            onClear={() => setTextValue('')}
          />
        </div>

        <div>
          <h3 className="size-sm font-medium text-default [margin-bottom:32px]">Shortcut</h3>
          <Input
            variant="shortcut"
            label="Quick Search"
            placeholder="Search..."
            shortcut="⌘K"
            leadIcon={['system', 'search']}
          />
        </div>

        <div>
          <h3 className="size-sm font-medium text-default [margin-bottom:32px]">Tags</h3>
          <Input
            variant="tags"
            label="Skills"
            placeholder="Add a skill..."
            tags={tags}
            onTagsChange={setTags}
          />
        </div>

        <div>
          <h3 className="size-sm font-medium text-default [margin-bottom:32px]">Inline Tags</h3>
          <Input
            variant="inline-tags"
            label="Technologies"
            placeholder="Add a tag..."
            tags={inlineTags}
            onTagsChange={setInlineTags}
          />
        </div>

        <div>
          <h3 className="size-sm font-medium text-default [margin-bottom:32px]">Tail Dropdown</h3>
          <Input
            variant="tail-dropdown"
            label="Amount"
            placeholder="0.00"
            value={amount}
            onChange={handleAmountChange}
            dropdownOptions={currencyOptions}
            dropdownValue={currency}
            onDropdownChange={setCurrency}
          />
        </div>

        <div>
          <h3 className="size-sm font-medium text-default [margin-bottom:32px]">Lead Dropdown</h3>
          <Input
            variant="lead-dropdown"
            label="Phone"
            placeholder="(555) 123-4567"
            dropdownOptions={countryOptions}
            dropdownValue={country}
            onDropdownChange={setCountry}
          />
        </div>

        <div>
          <h3 className="size-sm font-medium text-default [margin-bottom:32px]">Quantity</h3>
          <Input
            variant="quantity"
            label="Quantity"
            value={quantity}
            onChange={setQuantity}
            min={0}
            max={10}
          />
        </div>

        <div>
          <h3 className="size-sm font-medium text-default [margin-bottom:32px]">Quantity 2 (Compact)</h3>
          <Input
            variant="quantity-2"
            label="Quantity"
            value={quantity2}
            onChange={setQuantity2}
            min={0}
            max={10}
          />
        </div>

        <div>
          <h3 className="size-sm font-medium text-default [margin-bottom:32px]">Tail Button</h3>
          <Input
            variant="tail-button"
            label="Newsletter"
            placeholder="Enter email"
            buttonLabel="Subscribe"
          />
        </div>

        <div>
          <h3 className="size-sm font-medium text-default [margin-bottom:32px]">Lead Button</h3>
          <Input
            variant="lead-button"
            label="Search"
            placeholder="Search files..."
            buttonLabel="Browse"
          />
        </div>

        <div>
          <h3 className="size-sm font-medium text-default [margin-bottom:32px]">Add-on</h3>
          <Input
            variant="addon"
            label="Website"
            placeholder="your-site"
            prefix="https://"
            suffix=".com"
          />
        </div>

        <div>
          <h3 className="size-sm font-medium text-default [margin-bottom:32px]">Inline Add-on</h3>
          <Input
            variant="inline-addon"
            label="Price"
            placeholder="0.00"
            prefix="$"
            suffix="USD"
          />
        </div>

        <div>
          <h3 className="size-sm font-medium text-default [margin-bottom:32px]">Password</h3>
          <Input
            variant="password"
            label="Password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            showStrength
            autoCalculateStrength
          />
        </div>
      </div>
    );
  },
};

// ============================================================================
// SHOW COUNT
// ============================================================================

/**
 * 글자 수 표시
 *
 * `showCount`와 `maxLength`를 함께 사용하면 입력 필드 내부에 글자 수 카운터가 표시됩니다.
 */
export const WithCount: Story = {
  render: function Render() {
    const [value, setValue] = useState('');

    return (
      <div className="flex flex-col ds-gap-24 max-w-md">
        <Input
          label="Username"
          placeholder="Enter username..."
          showCount
          maxLength={20}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    );
  },
};
