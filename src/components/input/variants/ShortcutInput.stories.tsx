import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Input } from '../Input';

const meta: Meta<typeof Input> = {
  title: 'DataEntry/Input/ShortcutInput',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['shortcut'],
      description: '입력 필드의 변형',
      table: {
        type: { summary: 'InputVariant' },
        defaultValue: { summary: 'shortcut' },
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
      description: '입력 필드 앞에 표시되는 아이콘',
      table: {
        type: { summary: 'IconType' },
      },
    },
    shortcut: {
      control: 'text',
      description: '단축키 텍스트',
      table: {
        type: { summary: 'string' },
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
// BASIC
// ============================================================================

/**
 * 기본 단축키 입력 필드
 *
 * 이 스토리에서 컴포넌트의 모든 props를 테스트할 수 있습니다.
 * Input 컴포넌트는 `ref`와 `className` prop을 지원합니다.
 */
export const Default: Story = {
  args: {
    variant: 'shortcut',
    inputStyle: 'default',
    size: 'sm',
    label: '빠른 검색',
    placeholder: '검색...',
    shortcut: '⌘K',
    required: false,
    disabled: false,
    caption: '',
    error: '',
    success: '',
    leadIcon: undefined,
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
    const shortcut = 'shortcut' in args ? (args.shortcut as string) : '⌘K';
    const leadIcon = 'leadIcon' in args ? args.leadIcon : undefined;
    const autoComplete = 'autoComplete' in args ? args.autoComplete : undefined;
    return (
      <Input
        variant="shortcut"
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
        shortcut={shortcut}
        autoComplete={autoComplete}
        width={args.width}
        className={args.className}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
};

/**
 * 아이콘이 있는 단축키 입력 필드
 *
 * `leadIcon` prop으로 입력 필드 앞에 아이콘을 추가할 수 있습니다.
 */
export const WithLeadIcon: Story = {
  args: {
    variant: 'shortcut',
    label: '검색',
    placeholder: '무엇이든 검색하세요...',
    shortcut: '⌘K',
    leadIcon: ['system', 'search'],
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
    variant: 'shortcut',
    label: '기본 스타일',
    placeholder: '검색...',
    shortcut: '⌘K',
    inputStyle: 'default',
  },
};

/**
 * Shadow 스타일
 */
export const StyleShadow: Story = {
  args: {
    variant: 'shortcut',
    label: '그림자 스타일',
    placeholder: '검색...',
    shortcut: '⌘K',
    inputStyle: 'shadow',
  },
};

/**
 * Soft 스타일
 */
export const StyleSoft: Story = {
  args: {
    variant: 'shortcut',
    label: '부드러운 스타일',
    placeholder: '검색...',
    shortcut: '⌘K',
    inputStyle: 'soft',
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
    variant: 'shortcut',
    label: '작게',
    placeholder: '검색...',
    shortcut: '⌘K',
    size: 'sm',
    leadIcon: ['system', 'search'],
  },
};

/**
 * Large 크기
 */
export const SizeLarge: Story = {
  args: {
    variant: 'shortcut',
    label: '크게',
    placeholder: '검색...',
    shortcut: '⌘K',
    size: 'lg',
    leadIcon: ['system', 'search'],
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
    variant: 'shortcut',
    label: '기본',
    placeholder: '검색...',
    shortcut: '⌘K',
  },
};

/**
 * 비활성화 상태
 */
export const StateDisabled: Story = {
  args: {
    variant: 'shortcut',
    label: '비활성',
    placeholder: '검색...',
    shortcut: '⌘K',
    disabled: true,
  },
};

/**
 * 에러 상태
 */
export const StateError: Story = {
  args: {
    variant: 'shortcut',
    label: '오류',
    placeholder: '검색...',
    shortcut: '⌘K',
    error: '검색어가 유효하지 않습니다',
  },
};

/**
 * 성공 상태
 */
export const StateSuccess: Story = {
  args: {
    variant: 'shortcut',
    label: '성공',
    placeholder: '검색...',
    shortcut: '⌘K',
    success: '검색이 인덱싱되었습니다',
  },
};

/**
 * 키보드 단축키 바인딩
 *
 * `shortcut` prop은 뱃지를 렌더링할 뿐만 아니라 전역 keydown 리스너도 바인딩합니다.
 * 단축키를 누르면 입력 필드가 포커스됩니다.
 */
export const KeyboardShortcutBinding: Story = {
  render: function Render() {
    const [value, setValue] = useState('');

    return (
      <div className="flex flex-col ds-gap-16 max-w-sm">
        <p className="margin-0 size-sm text-subtle">
          ⌘K를 누르면 입력 필드가 포커스됩니다.
        </p>
        <Input
          variant="shortcut"
          label="명령 팔레트"
          placeholder="명령을 입력하세요..."
          shortcut="⌘K"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    );
  },
};
