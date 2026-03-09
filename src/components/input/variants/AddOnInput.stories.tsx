import type { Meta, StoryObj } from '@storybook/react-vite';
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
      description: '입력 필드의 변형을 설정합니다. addon(애드온이 입력 필드 외부에 분리), inline-addon(애드온이 입력 필드 내부에 표시) 중 선택할 수 있습니다',
      table: {
        type: { summary: 'InputVariant' },
        defaultValue: { summary: 'addon' },
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
    onChange: {
      action: 'changed',
      description: '사용자가 입력 값을 변경할 때마다 호출되는 함수입니다',
      table: {
        type: { summary: '(e: ChangeEvent<HTMLInputElement>) => void' },
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
    onClear: {
      action: 'cleared',
      description: '이 함수를 전달하면 입력 필드에 X 버튼이 표시되며, 클릭 시 호출됩니다. 입력 내용을 초기화하는 용도로 사용합니다',
      table: {
        type: { summary: '() => void' },
      },
    },
    prefix: {
      control: 'text',
      description: '입력 필드 앞에 표시되는 접두사 텍스트입니다. URL의 "https://" 또는 통화 기호 "$" 등에 사용합니다',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    suffix: {
      control: 'text',
      description: '입력 필드 뒤에 표시되는 접미사 텍스트입니다. 도메인의 ".com" 또는 단위 "kg" 등에 사용합니다',
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
    label: '웹사이트',
    placeholder: 'your-site',
    prefix: 'https://',
    suffix: '.com',
  },
  parameters: {
    controls: { disable: false },
  },
};

/**
 * 분리된 애드온 (입력 필드 외부)
 *
 * `variant="addon"`으로 애드온을 입력 필드 외부에 표시합니다.
 */
export const SeparateAddOn: Story = {
  args: {
    variant: 'addon',
    label: '웹사이트',
    placeholder: 'your-site',
    prefix: 'https://',
    suffix: '.com',
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
    label: '트위터 핸들',
    placeholder: 'username',
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
    placeholder: 'topic',
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
    placeholder: 'username',
    suffix: '@company.com',
  },
};

/**
 * 퍼센트 (%)
 */
export const SuffixPercent: Story = {
  args: {
    variant: 'inline-addon',
    label: '퍼센트',
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
    label: '가격 (아이콘 포함)',
    placeholder: '0.00',
    prefix: '$',
    suffix: 'USD',
    leadIcon: ['finance', 'money-dollar-circle'],
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
    label: '웹사이트 (아이콘 포함)',
    placeholder: 'your-site',
    prefix: 'https://',
    suffix: '.com',
    tailIcon: ['system', 'external-link'],
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
        label="Website"
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
    label: 'Small',
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
    label: 'Large',
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
    label: 'Default Style',
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
    label: 'Shadow Style',
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
    label: 'Soft Style',
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
    label: 'Default',
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
    label: 'Disabled',
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
    label: 'Error',
    placeholder: 'your-site',
    prefix: 'https://',
    suffix: '.com',
    error: '유효하지 않은 도메인입니다',
  },
};

/**
 * 성공 상태
 */
export const StateSuccess: Story = {
  args: {
    variant: 'addon',
    label: 'Success',
    placeholder: 'your-site',
    prefix: 'https://',
    suffix: '.com',
    success: '사용 가능한 도메인입니다',
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
    label: 'Website',
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
    placeholder: 'firstname.lastname',
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

/**
 * 할인율
 */
export const Discount: Story = {
  args: {
    variant: 'inline-addon',
    label: '할인율',
    placeholder: '0',
    suffix: '%',
  },
};
