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
      description: '입력 필드의 변형을 설정합니다',
      table: {
        type: { summary: 'InputVariant' },
        defaultValue: { summary: 'shortcut' },
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
    shortcut: {
      control: 'text',
      description: '입력 필드 오른쪽에 표시되는 키보드 단축키 텍스트입니다. 단축키를 누르면 입력 필드가 포커스됩니다',
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
    label: '빠른 검색',
    placeholder: '검색...',
    shortcut: '⌘K',
  },
  parameters: {
    controls: { disable: false },
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
    label: 'Default Style',
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
    label: 'Shadow Style',
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
    label: 'Soft Style',
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
    label: 'Small',
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
    label: 'Large',
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
    label: 'Default',
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
    label: 'Disabled',
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
    label: 'Error',
    placeholder: '검색...',
    shortcut: '⌘K',
    error: '유효하지 않은 검색어입니다',
  },
};

/**
 * 성공 상태
 */
export const StateSuccess: Story = {
  args: {
    variant: 'shortcut',
    label: 'Success',
    placeholder: '검색...',
    shortcut: '⌘K',
    success: '검색 인덱스 완료',
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
        <p className="margin-0size-sm text-subtle">
          ⌘K를 누르면 입력 필드가 포커스됩니다.
        </p>
        <Input
          variant="shortcut"
          label="명령 팔레트"
          placeholder="명령어를 입력하세요..."
          shortcut="⌘K"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    );
  },
};
