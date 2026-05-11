import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Input } from './Input';
import { Select } from '../select';
import { Icon, RiLightbulbLine, RiSearchLine } from '../icons/Icon';
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
      options: ['xs', 'sm', 'lg'],
      description: '입력 필드 크기',
      table: {
        type: {
          summary: 'InputSize',
          detail: `'xs' | 'sm' | 'lg'`,
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
    labelWidth: {
      control: 'text',
      description: '라벨 너비 (labelPosition="left"일 때 사용, 여러 필드 정렬용)',
      table: {
        type: { summary: 'string | number', detail: '예: 100, "120px", "8rem"' },
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
    labelPosition: 'top',
    labelWidth: undefined,
    placeholder: '플레이스홀더...',
    required: false,
    disabled: false,
    showCount: false,
    maxLength: undefined,
    supportText: '',
    caption: '',
    error: '',
    success: '',
    width: undefined,
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
        labelPosition={args.labelPosition}
        labelWidth={args.labelWidth}
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
          <h3 className="size-sm font-medium text-default [margin-bottom:32px]">기본</h3>
          <Input
            label="이메일"
            placeholder="이메일 입력"
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            onClear={() => setTextValue('')}
          />
        </div>

        <div>
          <h3 className="size-sm font-medium text-default [margin-bottom:32px]">단축키</h3>
          <Input
            variant="shortcut"
            label="빠른 검색"
            placeholder="검색..."
            shortcut="⌘K"
            leadIcon={RiSearchLine}
          />
        </div>

        <div>
          <h3 className="size-sm font-medium text-default [margin-bottom:32px]">태그</h3>
          <Input
            variant="tags"
            label="스킬"
            placeholder="스킬 추가..."
            tags={tags}
            onTagsChange={setTags}
          />
        </div>

        <div>
          <h3 className="size-sm font-medium text-default [margin-bottom:32px]">인라인 태그</h3>
          <Input
            variant="inline-tags"
            label="기술"
            placeholder="태그 추가..."
            tags={inlineTags}
            onTagsChange={setInlineTags}
          />
        </div>

        <div>
          <h3 className="size-sm font-medium text-default [margin-bottom:32px]">뒤 드롭다운</h3>
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
          <h3 className="size-sm font-medium text-default [margin-bottom:32px]">앞 드롭다운</h3>
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
          <h3 className="size-sm font-medium text-default [margin-bottom:32px]">수량</h3>
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
          <h3 className="size-sm font-medium text-default [margin-bottom:32px]">수량 2 (소형)</h3>
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
          <h3 className="size-sm font-medium text-default [margin-bottom:32px]">뒤 버튼</h3>
          <Input
            variant="tail-button"
            label="뉴스레터"
            placeholder="이메일 입력"
            buttonLabel="구독"
          />
        </div>

        <div>
          <h3 className="size-sm font-medium text-default [margin-bottom:32px]">앞 버튼</h3>
          <Input
            variant="lead-button"
            label="검색"
            placeholder="파일 검색..."
            buttonLabel="찾아보기"
          />
        </div>

        <div>
          <h3 className="size-sm font-medium text-default [margin-bottom:32px]">애드온</h3>
          <Input
            variant="addon"
            label="웹사이트"
            placeholder="your-site"
            prefix="https://"
            suffix=".com"
          />
        </div>

        <div>
          <h3 className="size-sm font-medium text-default [margin-bottom:32px]">인라인 애드온</h3>
          <Input
            variant="inline-addon"
            label="가격"
            placeholder="0.00"
            prefix="$"
            suffix="USD"
          />
        </div>

        <div>
          <h3 className="size-sm font-medium text-default [margin-bottom:32px]">비밀번호</h3>
          <Input
            variant="password"
            label="비밀번호"
            placeholder="비밀번호 입력"
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
          placeholder="사용자명 입력..."
          showCount
          maxLength={20}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    );
  },
};

/**
 * ReactNode 라벨
 *
 * label prop에 아이콘이나 커스텀 요소를 포함한 ReactNode를 전달할 수 있습니다.
 */
export const ReactNodeLabel: Story = {
  render: () => (
    <div className="flex flex-col ds-gap-24 max-w-md">
      <Input
        label={
          <span className="inline-flex items-center ds-gap-4">
            비밀번호
            <Icon icon={RiLightbulbLine} size={14} className="text-muted cursor-pointer" />
          </span>
        }
        placeholder="비밀번호 입력..."
      />

      <Input
        label={
          <span className="inline-flex items-center ds-gap-4">
            이메일
            <span className="font-body size-xs text-muted font-normal">(선택)</span>
          </span>
        }
        placeholder="이메일 입력..."
      />
    </div>
  ),
};

/**
 * 가로 라벨 (labelPosition="left")
 *
 * labelPosition="left"로 라벨을 입력 필드 좌측에 인라인으로 배치합니다.
 * labelWidth로 라벨 너비를 고정하면 여러 필드의 라벨을 정렬할 수 있습니다.
 */
export const HorizontalLabel: Story = {
  render: () => (
    <div className="flex flex-col ds-gap-16 max-w-lg">
      <Input
        label="이름"
        labelPosition="left"
        labelWidth={80}
        placeholder="이름 입력..."
      />
      <Input
        label="이메일"
        labelPosition="left"
        labelWidth={80}
        placeholder="이메일 입력..."
      />
      <Select
        label="구분"
        labelPosition="left"
        labelWidth={80}
        placeholder="선택..."
        options={[
          { id: 'general', label: '일반' },
          { id: 'vip', label: 'VIP' },
          { id: 'premium', label: '프리미엄' },
        ]}
      />
    </div>
  ),
};
