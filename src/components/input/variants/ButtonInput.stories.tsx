import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Input } from '../Input';

const meta: Meta<typeof Input> = {
  title: 'DataEntry/Input/ButtonInput',
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
      description: '입력 필드의 변형을 설정합니다. lead-button(버튼이 입력 필드 앞에 배치), tail-button(버튼이 입력 필드 뒤에 배치) 중 선택할 수 있습니다',
      table: {
        type: { summary: 'InputVariant' },
        defaultValue: { summary: 'tail-button' },
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
    buttonLabel: {
      control: 'text',
      description: '버튼에 표시되는 텍스트입니다',
      table: {
        type: { summary: 'string' },
      },
    },
    buttonLeadIcon: {
      control: 'object',
      description: '버튼 왼쪽에 표시되는 아이콘입니다. [카테고리, 아이콘명] 형식으로 지정합니다',
      table: {
        type: { summary: 'IconType' },
      },
    },
    buttonTailIcon: {
      control: 'object',
      description: '버튼 오른쪽에 표시되는 아이콘입니다. [카테고리, 아이콘명] 형식으로 지정합니다',
      table: {
        type: { summary: 'IconType' },
      },
    },
    buttonDisabled: {
      control: 'boolean',
      description: 'true로 설정하면 버튼만 비활성화됩니다. 입력 필드는 여전히 사용할 수 있습니다',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onButtonClick: {
      action: 'buttonClicked',
      description: '버튼을 클릭했을 때 호출되는 함수입니다',
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
    label: '뉴스레터',
    placeholder: '이메일을 입력하세요',
    buttonLabel: '구독',
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
    label: '뉴스레터',
    placeholder: '이메일을 입력하세요',
    buttonLabel: '구독',
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
    label: '파일 업로드',
    placeholder: '파일을 선택하세요...',
    buttonLabel: '찾아보기',
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
    label: '검색',
    placeholder: '값을 입력하세요...',
    buttonLabel: '검색',
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
    label: '제출',
    placeholder: '값을 입력하세요...',
    buttonLabel: '제출',
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
    label: '보내기',
    placeholder: '값을 입력하세요...',
    buttonLabel: '보내기',
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
    label: '검색',
    placeholder: '검색...',
    leadIcon: ['system', 'search'],
    buttonLabel: '이동',
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
    label: '이메일',
    placeholder: '이메일을 입력하세요...',
    leadIcon: ['business', 'mail'],
    buttonLabel: '보내기',
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
    label: '웹사이트',
    placeholder: 'URL을 입력하세요...',
    leadIcon: ['business', 'global'],
    buttonTailIcon: ['system', 'external-link'],
    buttonLabel: '이동',
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
    const [value, setValue] = useState('검색어');
    return (
      <Input
        variant="tail-button"
        label="검색"
        placeholder="검색..."
        leadIcon={['system', 'search']}
        buttonLabel="검색"
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
    label: '뉴스레터',
    placeholder: '이메일을 입력하세요',
    buttonLabel: '구독',
    buttonDisabled: true,
    caption: '버튼이 비활성화되어 있습니다',
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
      <div className="flex flex-col ds-gap-8">
        <Input
          variant="tail-button"
          label="값 제출"
          placeholder="내용을 입력하세요..."
          buttonLabel="제출"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onButtonClick={() => {
            setSubmitted(value);
            setValue('');
          }}
        />
        {submitted && (
          <p className="size-sm text-subtle">제출된 값: {submitted}</p>
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
    placeholder: '이메일을 입력하세요...',
    size: 'sm',
    buttonLabel: '구독',
  },
};

/**
 * Large 크기
 */
export const SizeLarge: Story = {
  args: {
    variant: 'tail-button',
    label: 'Large',
    placeholder: '이메일을 입력하세요...',
    size: 'lg',
    buttonLabel: '구독',
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
    placeholder: '값을 입력하세요...',
    inputStyle: 'default',
    buttonLabel: '제출',
  },
};

/**
 * Shadow 스타일
 */
export const StyleShadow: Story = {
  args: {
    variant: 'tail-button',
    label: 'Shadow Style',
    placeholder: '값을 입력하세요...',
    inputStyle: 'shadow',
    buttonLabel: '제출',
  },
};

/**
 * Soft 스타일
 */
export const StyleSoft: Story = {
  args: {
    variant: 'tail-button',
    label: 'Soft Style',
    placeholder: '값을 입력하세요...',
    inputStyle: 'soft',
    buttonLabel: '제출',
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
    placeholder: '값을 입력하세요...',
    buttonLabel: '제출',
  },
};

/**
 * 비활성화 상태
 */
export const StateDisabled: Story = {
  args: {
    variant: 'tail-button',
    label: 'Disabled',
    placeholder: '값을 입력하세요...',
    buttonLabel: '제출',
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
    placeholder: '값을 입력하세요...',
    buttonLabel: '제출',
    error: '유효하지 않은 입력입니다',
  },
};

/**
 * 성공 상태
 */
export const StateSuccess: Story = {
  args: {
    variant: 'tail-button',
    label: 'Success',
    placeholder: '값을 입력하세요...',
    buttonLabel: '제출',
    success: '유효한 입력입니다',
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
    label: '뉴스레터',
    placeholder: 'you@example.com',
    buttonLabel: '구독',
    leadIcon: ['business', 'mail'],
  },
};

/**
 * 검색
 */
export const Search: Story = {
  args: {
    variant: 'tail-button',
    label: '검색',
    placeholder: '상품 검색...',
    buttonLabel: '검색',
    leadIcon: ['system', 'search'],
  },
};

/**
 * 파일 브라우저
 */
export const FileBrowser: Story = {
  args: {
    variant: 'lead-button',
    label: '파일 업로드',
    placeholder: '파일이 선택되지 않았습니다',
    buttonLabel: '찾아보기',
    buttonLeadIcon: ['document', 'folder'],
  },
};

/**
 * 링크 복사
 */
export const CopyLink: Story = {
  args: {
    variant: 'tail-button',
    label: '링크 공유',
    placeholder: 'https://example.com/share/abc123',
    buttonLabel: '복사',
    buttonLeadIcon: ['document', 'file-copy'],
  },
};
