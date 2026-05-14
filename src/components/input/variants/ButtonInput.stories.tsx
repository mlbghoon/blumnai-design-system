import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { RiArrowRightSLine, RiExternalLinkLine, RiFileCopyLine, RiFolderLine, RiGlobalLine, RiMailLine, RiSearchLine, RiSendPlane2Line } from '../../icons/Icon';

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
      description: '입력 필드의 변형 (lead-button: 앞쪽, tail-button: 뒤쪽)',
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
      description: '입력 필드 앞에 표시되는 아이콘 (Remixicon `Ri*` component reference)',
      table: {
        type: {
          summary: 'IconProp',
          detail: `Remixicon component (v2.0+ direct-import only, tree-shakeable):
  leadIcon={RiSearchLine}
  leadIcon={RiGlobalLine}

NOTE: v1.x tuple form은 v2.0.0에서 제거됐습니다.`,
        },
      },
    },
    tailIcon: {
      control: 'object',
      description: '입력 필드 뒤에 표시되는 아이콘 (Remixicon `Ri*` component reference)',
      table: {
        type: {
          summary: 'IconProp',
          detail: `Remixicon component (v2.0+ direct-import only, tree-shakeable):
  tailIcon={RiCloseLine}
  tailIcon={RiInformationLine}

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
    buttonLabel: {
      control: 'text',
      description: '버튼 라벨',
      table: {
        type: { summary: 'string' },
      },
    },
    buttonLeadIcon: {
      control: 'object',
      description: '버튼 앞에 표시되는 아이콘 (Remixicon `Ri*` component reference)',
      table: {
        type: {
          summary: 'IconProp',
          detail: `Remixicon component (v2.0+ direct-import only, tree-shakeable):
  buttonLeadIcon={RiAddLine}
  buttonLeadIcon={RiSearchLine}

NOTE: v1.x tuple form은 v2.0.0에서 제거됐습니다.`,
        },
      },
    },
    buttonTailIcon: {
      control: 'object',
      description: '버튼 뒤에 표시되는 아이콘 (Remixicon `Ri*` component reference)',
      table: {
        type: {
          summary: 'IconProp',
          detail: `Remixicon component (v2.0+ direct-import only, tree-shakeable):
  buttonTailIcon={RiArrowRightLine}
  buttonTailIcon={RiExternalLinkLine}

NOTE: v1.x tuple form은 v2.0.0에서 제거됐습니다.`,
        },
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
    inputStyle: 'default',
    size: 'sm',
    label: '뉴스레터',
    placeholder: '이메일을 입력하세요',
    buttonLabel: '구독',
    required: false,
    disabled: false,
    caption: '',
    error: '',
    success: '',
    leadIcon: undefined,
    buttonLeadIcon: undefined,
    buttonTailIcon: undefined,
    buttonDisabled: false,
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
    const buttonLabel = 'buttonLabel' in args ? args.buttonLabel : '구독';
    const buttonLeadIcon = 'buttonLeadIcon' in args ? args.buttonLeadIcon : undefined;
    const buttonTailIcon = 'buttonTailIcon' in args ? args.buttonTailIcon : undefined;
    const buttonDisabled = 'buttonDisabled' in args ? args.buttonDisabled : false;
    const leadIcon = 'leadIcon' in args ? args.leadIcon : undefined;
    const autoComplete = 'autoComplete' in args ? args.autoComplete : undefined;
    return (
      <Input
        variant="tail-button"
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
        buttonLabel={buttonLabel}
        buttonLeadIcon={buttonLeadIcon}
        buttonTailIcon={buttonTailIcon}
        buttonDisabled={buttonDisabled}
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
    buttonLeadIcon: RiFolderLine,
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
    buttonLeadIcon: RiSearchLine,
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
    buttonTailIcon: RiArrowRightSLine,
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
    buttonLeadIcon: RiSendPlane2Line,
    buttonTailIcon: RiArrowRightSLine,
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
    leadIcon: RiSearchLine,
    buttonLabel: '이동',
  },
};

/**
 * 입력 필드 앞쪽 아이콘 + 버튼 뒤쪽 아이콘
 *
 * `leadIcon`으로 입력 필드 앞에, `buttonTailIcon`으로 버튼 뒤에 아이콘을 추가합니다.
 */
export const WithLeadAndButtonIcons: Story = {
  args: {
    variant: 'tail-button',
    label: '웹사이트',
    placeholder: 'URL을 입력하세요...',
    leadIcon: RiGlobalLine,
    buttonTailIcon: RiExternalLinkLine,
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
    const [value, setValue] = useState('search term');
    return (
      <Input
        variant="tail-button"
        label="검색"
        placeholder="검색..."
        leadIcon={RiSearchLine}
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
          label="제출 값"
          placeholder="무언가 입력하세요..."
          buttonLabel="제출"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onButtonClick={() => {
            setSubmitted(value);
            setValue('');
          }}
        />
        {submitted && (
          <p className="size-sm text-subtle">제출됨: {submitted}</p>
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
    label: '작게',
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
    label: '크게',
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
    label: '기본 스타일',
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
    label: '그림자 스타일',
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
    label: '부드러운 스타일',
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
    label: '기본',
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
    label: '비활성',
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
    label: '오류',
    placeholder: '값을 입력하세요...',
    buttonLabel: '제출',
    error: '유효하지 않은 입력',
  },
};

/**
 * 성공 상태
 */
export const StateSuccess: Story = {
  args: {
    variant: 'tail-button',
    label: '성공',
    placeholder: '값을 입력하세요...',
    buttonLabel: '제출',
    success: '유효한 입력',
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
    leadIcon: RiMailLine,
  },
};

/**
 * 검색
 */
export const Search: Story = {
  args: {
    variant: 'tail-button',
    label: '검색',
    placeholder: '상품을 검색하세요...',
    buttonLabel: '검색',
    leadIcon: RiSearchLine,
  },
};

/**
 * 파일 브라우저
 */
export const FileBrowser: Story = {
  args: {
    variant: 'lead-button',
    label: '파일 업로드',
    placeholder: '선택된 파일 없음',
    buttonLabel: '찾아보기',
    buttonLeadIcon: RiFolderLine,
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
    buttonLeadIcon: RiFileCopyLine,
  },
};
