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
      description: '입력 필드 위에 표시되는 라벨 텍스트',
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
    supportText: {
      control: 'text',
      description: '라벨 옆에 표시되는 부가 설명 텍스트입니다. 선택 입력 등의 안내 문구에 사용합니다',
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
      description: 'true로 설정하면 입력 필드 우측에 현재 글자 수와 최대 글자 수가 표시됩니다. maxLength와 함께 사용합니다',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    maxLength: {
      control: 'number',
      description: '입력할 수 있는 최대 글자 수입니다. showCount와 함께 사용하면 카운터가 표시됩니다',
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
    label: '라벨',
    placeholder: '입력해주세요...',
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
  { value: 'us', label: '미국' },
  { value: 'uk', label: '영국' },
  { value: 'ca', label: '캐나다' },
];

export const AllVariants: Story = {
  render: function Render() {
    const [password, setPassword] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [quantity2, setQuantity2] = useState(1);
    const [tags, setTags] = useState(['React', 'TypeScript']);
    const [inlineTags, setInlineTags] = useState(['디자인', '개발']);
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
            label="이메일"
            placeholder="이메일을 입력하세요"
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            onClear={() => setTextValue('')}
          />
        </div>

        <div>
          <h3 className="size-sm font-medium text-default [margin-bottom:32px]">Shortcut</h3>
          <Input
            variant="shortcut"
            label="빠른 검색"
            placeholder="검색..."
            shortcut="⌘K"
            leadIcon={['system', 'search']}
          />
        </div>

        <div>
          <h3 className="size-sm font-medium text-default [margin-bottom:32px]">Tags</h3>
          <Input
            variant="tags"
            label="기술 스택"
            placeholder="기술을 추가하세요..."
            tags={tags}
            onTagsChange={setTags}
          />
        </div>

        <div>
          <h3 className="size-sm font-medium text-default [margin-bottom:32px]">Inline Tags</h3>
          <Input
            variant="inline-tags"
            label="기술"
            placeholder="태그를 추가하세요..."
            tags={inlineTags}
            onTagsChange={setInlineTags}
          />
        </div>

        <div>
          <h3 className="size-sm font-medium text-default [margin-bottom:32px]">Tail Dropdown</h3>
          <Input
            variant="tail-dropdown"
            label="금액"
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
            label="전화번호"
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
            label="수량"
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
            label="수량"
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
            label="뉴스레터"
            placeholder="이메일을 입력하세요"
            buttonLabel="구독"
          />
        </div>

        <div>
          <h3 className="size-sm font-medium text-default [margin-bottom:32px]">Lead Button</h3>
          <Input
            variant="lead-button"
            label="검색"
            placeholder="파일 검색..."
            buttonLabel="찾아보기"
          />
        </div>

        <div>
          <h3 className="size-sm font-medium text-default [margin-bottom:32px]">Add-on</h3>
          <Input
            variant="addon"
            label="웹사이트"
            placeholder="your-site"
            prefix="https://"
            suffix=".com"
          />
        </div>

        <div>
          <h3 className="size-sm font-medium text-default [margin-bottom:32px]">Inline Add-on</h3>
          <Input
            variant="inline-addon"
            label="가격"
            placeholder="0.00"
            prefix="$"
            suffix="USD"
          />
        </div>

        <div>
          <h3 className="size-sm font-medium text-default [margin-bottom:32px]">Password</h3>
          <Input
            variant="password"
            label="비밀번호"
            placeholder="비밀번호를 입력하세요"
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
          label="사용자명"
          placeholder="사용자명을 입력하세요..."
          showCount
          maxLength={20}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    );
  },
};
