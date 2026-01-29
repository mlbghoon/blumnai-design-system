import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Input } from '../Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input/Button',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['lead-button', 'tail-button'],
      description: '입력 필드의 변형 (lead-button: 앞쪽, tail-button: 뒤쪽)',
      type: { required: true },
      table: {
        type: { summary: 'InputVariant' },
        defaultValue: { summary: 'tail-button' },
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
    buttonLabel: {
      control: 'text',
      description: '버튼 라벨',
      table: {
        type: { summary: 'string' },
      },
    },
    buttonLeadIcon: {
      control: 'object',
      description: '버튼 앞에 표시되는 아이콘',
      table: {
        type: { summary: 'IconType' },
      },
    },
    buttonTailIcon: {
      control: 'object',
      description: '버튼 뒤에 표시되는 아이콘',
      table: {
        type: { summary: 'IconType' },
      },
    },
    buttonDisabled: {
      control: 'boolean',
      description: '버튼 비활성화 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onButtonClick: {
      action: 'buttonClicked',
      description: '버튼 클릭 시 콜백',
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
// BASIC POSITIONS
// ============================================================================

/**
 * 기본 버튼 입력 필드
 *
 * 이 스토리에서 컴포넌트의 모든 props를 테스트할 수 있습니다.
 * Input 컴포넌트는 `ref`와 `className` prop을 지원합니다.
 */
export const Default: Story = {
  args: {
    variant: 'tail-button',
    label: 'Newsletter',
    placeholder: 'Enter your email',
    buttonLabel: 'Subscribe',
  },
  parameters: {
    controls: { disable: false },
  },
};

/**
 * 뒤쪽 버튼
 *
 * `variant="tail-button"`로 버튼을 입력 필드 뒤에 배치합니다.
 */
export const TailButton: Story = {
  args: {
    variant: 'tail-button',
    label: 'Newsletter',
    placeholder: 'Enter your email',
    buttonLabel: 'Subscribe',
  },
};

/**
 * 앞쪽 버튼
 *
 * `variant="lead-button"`로 버튼을 입력 필드 앞에 배치합니다.
 */
export const LeadButton: Story = {
  args: {
    variant: 'lead-button',
    label: 'File Upload',
    placeholder: 'Select a file...',
    buttonLabel: 'Browse',
    buttonLeadIcon: ['document', 'folder'],
  },
};

// ============================================================================
// WITH BUTTON ICONS
// ============================================================================

/**
 * 버튼 앞쪽 아이콘
 *
 * `buttonLeadIcon` prop으로 버튼 앞에 아이콘을 추가합니다.
 */
export const WithButtonLeadIcon: Story = {
  args: {
    variant: 'tail-button',
    label: 'Search',
    placeholder: 'Enter value...',
    buttonLabel: 'Search',
    buttonLeadIcon: ['system', 'search'],
  },
};

/**
 * 버튼 뒤쪽 아이콘
 *
 * `buttonTailIcon` prop으로 버튼 뒤에 아이콘을 추가합니다.
 */
export const WithButtonTailIcon: Story = {
  args: {
    variant: 'tail-button',
    label: 'Submit',
    placeholder: 'Enter value...',
    buttonLabel: 'Submit',
    buttonTailIcon: ['arrows', 'arrow-right-s'],
  },
};

/**
 * 버튼 양쪽 아이콘
 *
 * `buttonLeadIcon`과 `buttonTailIcon` prop으로 버튼 양쪽에 아이콘을 추가합니다.
 */
export const WithButtonBothIcons: Story = {
  args: {
    variant: 'tail-button',
    label: 'Send',
    placeholder: 'Enter value...',
    buttonLabel: 'Send',
    buttonLeadIcon: ['business', 'send-plane-2'],
    buttonTailIcon: ['arrows', 'arrow-right-s'],
  },
};

// ============================================================================
// WITH INPUT ICONS
// ============================================================================

/**
 * 입력 필드 앞쪽 아이콘
 *
 * `leadIcon` prop으로 입력 필드 앞에 아이콘을 추가할 수 있습니다.
 */
export const WithInputLeadIcon: Story = {
  args: {
    variant: 'tail-button',
    label: 'Search',
    placeholder: 'Search...',
    leadIcon: ['system', 'search'],
    buttonLabel: 'Go',
  },
};

/**
 * 입력 필드 뒤쪽 아이콘
 *
 * `tailIcon` prop으로 입력 필드 뒤에 아이콘을 추가할 수 있습니다.
 * 버튼 위치와 관계없이 입력 영역 내에 표시됩니다.
 */
export const WithInputTailIcon: Story = {
  args: {
    variant: 'tail-button',
    label: 'Email',
    placeholder: 'Enter email...',
    tailIcon: ['business', 'mail'],
    buttonLabel: 'Send',
  },
};

/**
 * 입력 필드 양쪽 아이콘
 *
 * `leadIcon`과 `tailIcon`을 동시에 사용할 수 있습니다.
 */
export const WithInputBothIcons: Story = {
  args: {
    variant: 'tail-button',
    label: 'Website',
    placeholder: 'Enter URL...',
    leadIcon: ['business', 'global'],
    tailIcon: ['system', 'external-link'],
    buttonLabel: 'Go',
  },
};

// ============================================================================
// WITH CLEAR BUTTON
// ============================================================================

/**
 * 삭제 버튼이 있는 입력 필드
 *
 * `onClear` prop을 전달하면 입력 내용을 삭제할 수 있는 버튼이 표시됩니다.
 */
export const WithClearButton: Story = {
  render: function Render() {
    const [value, setValue] = useState('search term');
    return (
      <Input
        variant="tail-button"
        label="Search"
        placeholder="Search..."
        leadIcon={['system', 'search']}
        buttonLabel="Search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onClear={() => setValue('')}
      />
    );
  },
};

// ============================================================================
// BUTTON STATES
// ============================================================================

/**
 * 버튼 비활성화
 *
 * `buttonDisabled` prop으로 버튼만 비활성화할 수 있습니다.
 */
export const ButtonDisabled: Story = {
  args: {
    variant: 'tail-button',
    label: 'Newsletter',
    placeholder: 'Enter your email',
    buttonLabel: 'Subscribe',
    buttonDisabled: true,
    caption: 'Button is disabled',
  },
};

/**
 * 클릭 핸들러
 *
 * `onButtonClick` prop으로 버튼 클릭을 처리할 수 있습니다.
 */
export const WithClickHandler: Story = {
  render: function Render() {
    const [value, setValue] = useState('');
    const [submitted, setSubmitted] = useState('');
    return (
      <div className="flex flex-col gap-8">
        <Input
          variant="tail-button"
          label="Submit Value"
          placeholder="Enter something..."
          buttonLabel="Submit"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onButtonClick={() => {
            setSubmitted(value);
            setValue('');
          }}
        />
        {submitted && (
          <p className="size-sm text-subtle">Submitted: {submitted}</p>
        )}
      </div>
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
    variant: 'tail-button',
    label: 'Small',
    placeholder: 'Enter email...',
    size: 'sm',
    buttonLabel: 'Subscribe',
  },
};

/**
 * Large 크기
 */
export const SizeLarge: Story = {
  args: {
    variant: 'tail-button',
    label: 'Large',
    placeholder: 'Enter email...',
    size: 'lg',
    buttonLabel: 'Subscribe',
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
    variant: 'tail-button',
    label: 'Default Style',
    placeholder: 'Enter value...',
    inputStyle: 'default',
    buttonLabel: 'Submit',
  },
};

/**
 * Shadow 스타일
 */
export const StyleShadow: Story = {
  args: {
    variant: 'tail-button',
    label: 'Shadow Style',
    placeholder: 'Enter value...',
    inputStyle: 'shadow',
    buttonLabel: 'Submit',
  },
};

/**
 * Soft 스타일
 */
export const StyleSoft: Story = {
  args: {
    variant: 'tail-button',
    label: 'Soft Style',
    placeholder: 'Enter value...',
    inputStyle: 'soft',
    buttonLabel: 'Submit',
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
    variant: 'tail-button',
    label: 'Default',
    placeholder: 'Enter value...',
    buttonLabel: 'Submit',
  },
};

/**
 * 비활성화 상태
 */
export const StateDisabled: Story = {
  args: {
    variant: 'tail-button',
    label: 'Disabled',
    placeholder: 'Enter value...',
    buttonLabel: 'Submit',
    disabled: true,
  },
};

/**
 * 에러 상태
 */
export const StateError: Story = {
  args: {
    variant: 'tail-button',
    label: 'Error',
    placeholder: 'Enter value...',
    buttonLabel: 'Submit',
    error: 'Invalid input',
  },
};

/**
 * 성공 상태
 */
export const StateSuccess: Story = {
  args: {
    variant: 'tail-button',
    label: 'Success',
    placeholder: 'Enter value...',
    buttonLabel: 'Submit',
    success: 'Valid input',
  },
};

// ============================================================================
// USE CASES
// ============================================================================

/**
 * 이메일 구독
 */
export const EmailSignup: Story = {
  args: {
    variant: 'tail-button',
    label: 'Newsletter',
    placeholder: 'you@example.com',
    buttonLabel: 'Subscribe',
    leadIcon: ['business', 'mail'],
  },
};

/**
 * 검색
 */
export const Search: Story = {
  args: {
    variant: 'tail-button',
    label: 'Search',
    placeholder: 'Search products...',
    buttonLabel: 'Search',
    leadIcon: ['system', 'search'],
  },
};

/**
 * 파일 브라우저
 */
export const FileBrowser: Story = {
  args: {
    variant: 'lead-button',
    label: 'Upload File',
    placeholder: 'No file selected',
    buttonLabel: 'Browse',
    buttonLeadIcon: ['document', 'folder'],
  },
};

/**
 * 링크 복사
 */
export const CopyLink: Story = {
  args: {
    variant: 'tail-button',
    label: 'Share Link',
    placeholder: 'https://example.com/share/abc123',
    buttonLabel: 'Copy',
    buttonLeadIcon: ['document', 'file-copy'],
  },
};
