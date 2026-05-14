import type { Meta, StoryObj } from '@storybook/react-vite';
import { RiExternalLinkLine, RiMoneyDollarCircleLine } from '../../icons/Icon';
import { useState } from 'react';

import { Input } from '../Input';

const meta: Meta<typeof Input> = {
  title: 'DataEntry/Input/AddOnInput',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['addon', 'inline-addon'],
      description: '입력 필드의 변형 (addon: 분리된, inline-addon: 인라인)',
      table: {
        type: { summary: 'InputVariant' },
        defaultValue: { summary: 'addon' },
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
      options: ['xs', 'sm', 'lg'],
      description: '입력 필드의 크기',
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
    onChange: {
      action: 'changed',
      description: '입력 값 변경 시 콜백',
      table: {
        type: { summary: '(e: ChangeEvent<HTMLInputElement>) => void' },
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
      description: '입력 필드 앞에 표시되는 아이콘 (Remixicon `Ri*` component 권장, tuple form 은 deprecated)',
      table: {
        type: {
          summary: 'IconProp',
          detail: `Remixicon component (v2.0+ direct-import only, tree-shakeable):
  leadIcon={RiMoneyDollarCircleLine}
  leadIcon={RiSearchLine}

NOTE: v1.x tuple form은 v2.0.0에서 제거됐습니다.`,
        },
      },
    },
    tailIcon: {
      control: 'object',
      description: '입력 필드 뒤에 표시되는 아이콘 (Remixicon `Ri*` component 권장, tuple form 은 deprecated)',
      table: {
        type: {
          summary: 'IconProp',
          detail: `Remixicon component (v2.0+ direct-import only):
  tailIcon={RiExternalLinkLine}
  tailIcon={RiCloseLine}

NOTE: v1.x tuple form은 v2.0.0에서 제거됐습니다.`,
        },
      },
    },
    onClear: {
      action: 'cleared',
      description: '입력 내용 삭제 버튼 클릭 시 콜백',
      table: {
        type: { summary: '() => void' },
      },
    },
    prefix: {
      control: 'text',
      description: '입력 필드 앞에 표시되는 애드온',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    suffix: {
      control: 'text',
      description: '입력 필드 뒤에 표시되는 애드온',
      table: {
        type: { summary: 'ReactNode' },
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
// BASIC VARIANTS
// ============================================================================

/**
 * 기본 애드온 입력 필드
 *
 * 이 스토리에서 컴포넌트의 모든 props를 테스트할 수 있습니다.
 * Input 컴포넌트는 `ref`와 `className` prop을 지원합니다.
 */
export const Default: Story = {
  args: {
    variant: 'addon',
    inputStyle: 'default',
    size: 'sm',
    label: '웹사이트',
    placeholder: 'your-site',
    prefix: 'https://',
    suffix: '.com',
    required: false,
    disabled: false,
    caption: '',
    error: '',
    success: '',
    leadIcon: undefined,
    tailIcon: undefined,
    autoComplete: undefined,
    width: undefined,
    className: undefined,
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const [value, setValue] = useState('');
    const caption = args.caption || undefined;
    const error = args.error || undefined;
    const success = args.success || undefined;
    const prefix = 'prefix' in args ? args.prefix : 'https://';
    const suffix = 'suffix' in args ? args.suffix : '.com';
    const leadIcon = 'leadIcon' in args ? args.leadIcon : undefined;
    const tailIcon = 'tailIcon' in args ? args.tailIcon : undefined;
    const autoComplete = 'autoComplete' in args ? args.autoComplete : undefined;
    return (
      <Input
        variant="addon"
        inputStyle={args.inputStyle}
        size={args.size}
        label={args.label}
        placeholder={args.placeholder}
        required={args.required}
        disabled={args.disabled}
        caption={caption}
        error={error}
        success={success}
        leadIcon={leadIcon}
        tailIcon={tailIcon}
        prefix={prefix}
        suffix={suffix}
        autoComplete={autoComplete}
        width={args.width}
        className={args.className}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onClear={() => setValue('')}
      />
    );
  },
};

/**
 * 인라인 애드온 (입력 필드 내부)
 *
 * `variant="inline-addon"`으로 애드온을 입력 필드 내부에 표시합니다.
 */
export const InlineAddOn: Story = {
  args: {
    variant: 'inline-addon',
    label: '가격',
    placeholder: '0.00',
    prefix: '$',
    suffix: 'USD',
  },
};

// ============================================================================
// PREFIX ONLY
// ============================================================================

/**
 * Twitter 핸들 (@)
 */
export const PrefixTwitter: Story = {
  args: {
    variant: 'inline-addon',
    label: 'Twitter 핸들',
    placeholder: '사용자명',
    prefix: '@',
  },
};

/**
 * 전화번호 (+1)
 */
export const PrefixPhone: Story = {
  args: {
    variant: 'addon',
    label: '전화번호',
    placeholder: '555-1234',
    prefix: '+1',
  },
};

/**
 * 해시태그 (#)
 */
export const PrefixHashtag: Story = {
  args: {
    variant: 'inline-addon',
    label: '해시태그',
    placeholder: '주제',
    prefix: '#',
  },
};

// ============================================================================
// SUFFIX ONLY
// ============================================================================

/**
 * 무게 (kg)
 */
export const SuffixWeight: Story = {
  args: {
    variant: 'inline-addon',
    label: '무게',
    placeholder: '0.0',
    suffix: 'kg',
  },
};

/**
 * 이메일 도메인
 */
export const SuffixEmail: Story = {
  args: {
    variant: 'addon',
    label: '이메일',
    placeholder: '사용자명',
    suffix: '@company.com',
  },
};

/**
 * 퍼센트 (%)
 */
export const SuffixPercent: Story = {
  args: {
    variant: 'inline-addon',
    label: '비율',
    placeholder: '0',
    suffix: '%',
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
  args: {
    variant: 'inline-addon',
    label: '아이콘 포함 가격',
    placeholder: '0.00',
    prefix: '$',
    suffix: 'USD',
    leadIcon: RiMoneyDollarCircleLine,
  },
};

/**
 * 뒤쪽 아이콘
 *
 * `tailIcon` prop으로 아이콘을 추가할 수 있습니다.
 */
export const WithTailIcon: Story = {
  args: {
    variant: 'addon',
    label: '아이콘 포함 웹사이트',
    placeholder: 'your-site',
    prefix: 'https://',
    suffix: '.com',
    tailIcon: RiExternalLinkLine,
  },
};

// ============================================================================
// WITH CLEAR BUTTON
// ============================================================================

/**
 * 삭제 버튼이 있는 애드온 입력 필드
 *
 * `onClear` prop을 전달하면 입력 내용을 삭제할 수 있는 버튼이 표시됩니다.
 */
export const WithClearButton: Story = {
  render: function Render() {
    const [value, setValue] = useState('example');
    return (
      <Input
        variant="addon"
        label="웹사이트"
        placeholder="your-site"
        prefix="https://"
        suffix=".com"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onClear={() => setValue('')}
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
  args: {
    variant: 'inline-addon',
    label: '작게',
    placeholder: '0.00',
    prefix: '$',
    suffix: 'USD',
    size: 'sm',
  },
};

/**
 * Large 크기
 */
export const SizeLarge: Story = {
  args: {
    variant: 'inline-addon',
    label: '크게',
    placeholder: '0.00',
    prefix: '$',
    suffix: 'USD',
    size: 'lg',
  },
};

// ============================================================================
// STYLES
// ============================================================================

/**
 * Default 스타일
 */
export const StyleDefault: Story = {
  args: {
    variant: 'inline-addon',
    label: '기본 스타일',
    placeholder: '0.00',
    prefix: '$',
    suffix: 'USD',
    inputStyle: 'default',
  },
};

/**
 * Shadow 스타일
 */
export const StyleShadow: Story = {
  args: {
    variant: 'inline-addon',
    label: '그림자 스타일',
    placeholder: '0.00',
    prefix: '$',
    suffix: 'USD',
    inputStyle: 'shadow',
  },
};

/**
 * Soft 스타일
 */
export const StyleSoft: Story = {
  args: {
    variant: 'inline-addon',
    label: '부드러운 스타일',
    placeholder: '0.00',
    prefix: '$',
    suffix: 'USD',
    inputStyle: 'soft',
  },
};

// ============================================================================
// STATES
// ============================================================================

/**
 * 기본 상태
 */
export const StateDefault: Story = {
  args: {
    variant: 'addon',
    label: '기본',
    placeholder: 'your-site',
    prefix: 'https://',
    suffix: '.com',
  },
};

/**
 * 비활성화 상태
 */
export const StateDisabled: Story = {
  args: {
    variant: 'addon',
    label: '비활성',
    placeholder: 'your-site',
    prefix: 'https://',
    suffix: '.com',
    disabled: true,
  },
};

/**
 * 에러 상태
 */
export const StateError: Story = {
  args: {
    variant: 'addon',
    label: '오류',
    placeholder: 'your-site',
    prefix: 'https://',
    suffix: '.com',
    error: '유효하지 않은 도메인',
  },
};

/**
 * 성공 상태
 */
export const StateSuccess: Story = {
  args: {
    variant: 'addon',
    label: '성공',
    placeholder: 'your-site',
    prefix: 'https://',
    suffix: '.com',
    success: '사용 가능한 도메인',
  },
};

// ============================================================================
// USE CASES
// ============================================================================

/**
 * 금액 입력
 */
export const CurrencyInput: Story = {
  args: {
    variant: 'inline-addon',
    label: '금액',
    placeholder: '0.00',
    prefix: '$',
    suffix: 'USD',
  },
};

/**
 * 도메인 입력
 */
export const DomainInput: Story = {
  args: {
    variant: 'addon',
    label: '웹사이트',
    placeholder: 'your-site',
    prefix: 'https://',
    suffix: '.com',
  },
};

/**
 * 회사 이메일
 */
export const WorkEmail: Story = {
  args: {
    variant: 'addon',
    label: '회사 이메일',
    placeholder: '이름.성',
    suffix: '@company.com',
  },
};

/**
 * 소셜 핸들
 */
export const SocialHandle: Story = {
  args: {
    variant: 'inline-addon',
    label: 'Twitter',
    placeholder: 'username',
    prefix: '@',
  },
};

/**
 * 치수 (픽셀)
 */
export const Measurement: Story = {
  args: {
    variant: 'inline-addon',
    label: '너비',
    placeholder: '100',
    suffix: 'px',
  },
};

