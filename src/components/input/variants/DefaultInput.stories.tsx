import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Input } from '../Input';

const meta: Meta<typeof Input> = {
  title: 'DataEntry/Input/DefaultInput',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default'],
      description: '입력 필드의 변형',
      table: {
        type: { summary: 'InputVariant' },
        defaultValue: { summary: 'default' },
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
    supportText: {
      control: 'text',
      description: '라벨 옆 보조 텍스트',
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
    onClear: {
      action: 'cleared',
      description: '입력 내용 삭제 버튼 클릭 시 콜백',
      table: {
        type: { summary: '() => void' },
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
 * 기본 입력 필드
 *
 * 이 스토리에서 컴포넌트의 모든 props를 테스트할 수 있습니다.
 * `ref`와 `className` prop을 지원합니다.
 */
export const Default: Story = {
  args: {
    variant: 'default',
    label: '이메일',
    placeholder: '이메일을 입력하세요',
  },
  parameters: {
    controls: { disable: false },
  },
};

/**
 * 아이콘이 있는 입력 필드
 *
 * `leadIcon`과 `tailIcon` prop을 사용하여 아이콘을 추가할 수 있습니다.
 */
export const WithIcons: Story = {
  args: {
    variant: 'default',
    label: '검색',
    placeholder: '검색...',
    leadIcon: ['system', 'search'],
    tailIcon: ['system', 'filter'],
  },
};

/**
 * 삭제 버튼이 있는 입력 필드
 *
 * `onClear` prop을 전달하면 입력 내용을 삭제할 수 있는 버튼이 표시됩니다.
 */
export const WithClearButton: Story = {
  render: function Render() {
    const [value, setValue] = useState('Hello World');
    return (
      <Input
        variant="default"
        label="삭제 버튼"
        placeholder="텍스트를 입력하세요..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onClear={() => setValue('')}
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
  args: {
    variant: 'default',
    label: '기본',
    placeholder: '기본 상태',
  },
};

/**
 * 비활성화 상태
 */
export const StateDisabled: Story = {
  args: {
    variant: 'default',
    label: '비활성',
    placeholder: '비활성 상태',
    disabled: true,
  },
};

/**
 * 에러 상태
 */
export const StateError: Story = {
  args: {
    variant: 'default',
    label: '오류',
    placeholder: '오류 상태',
    error: '이 필드는 필수입니다',
  },
};

/**
 * 성공 상태
 */
export const StateSuccess: Story = {
  args: {
    variant: 'default',
    label: '성공',
    placeholder: '성공 상태',
    success: '사용 가능한 이메일입니다',
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
    variant: 'default',
    label: '기본 스타일',
    placeholder: '기본 스타일',
    inputStyle: 'default',
  },
};

/**
 * Shadow 스타일
 */
export const StyleShadow: Story = {
  args: {
    variant: 'default',
    label: '그림자 스타일',
    placeholder: '그림자 스타일',
    inputStyle: 'shadow',
  },
};

/**
 * Soft 스타일
 */
export const StyleSoft: Story = {
  args: {
    variant: 'default',
    label: '부드러운 스타일',
    placeholder: '부드러운 스타일',
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
    variant: 'default',
    label: '작게 (sm)',
    placeholder: '작은 입력',
    size: 'sm',
  },
};

/**
 * Large 크기
 */
export const SizeLarge: Story = {
  args: {
    variant: 'default',
    label: '크게 (lg)',
    placeholder: '큰 입력',
    size: 'lg',
  },
};

// ============================================================================
// WITH LABEL OPTIONS
// ============================================================================

/**
 * 라벨 없음
 */
export const NoLabel: Story = {
  args: {
    variant: 'default',
    placeholder: '라벨 없음',
  },
};

/**
 * 필수 필드
 */
export const Required: Story = {
  args: {
    variant: 'default',
    label: '필수 필드',
    placeholder: '필수',
    required: true,
  },
};

/**
 * 보조 텍스트 포함
 */
export const WithSupportText: Story = {
  args: {
    variant: 'default',
    label: '보조 텍스트',
    placeholder: '보조 텍스트 있음',
    supportText: '선택',
  },
};

/**
 * 캡션 포함
 */
export const WithCaption: Story = {
  args: {
    variant: 'default',
    label: '캡션',
    placeholder: '캡션 있음',
    caption: '도움말 텍스트입니다',
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
          "/" 키를 누르면 검색 입력 필드가 포커스됩니다 (입력 필드 밖에서).
        </p>
        <Input
          variant="default"
          label="검색"
          placeholder="검색어를 입력하세요..."
          leadIcon={['system', 'search']}
          shortcut="/"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    );
  },
};
