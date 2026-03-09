import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Input } from '../Input';
import type { PasswordStrength } from '../Input.types';

const meta: Meta<typeof Input> = {
  title: 'DataEntry/Input/PasswordInput',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['password'],
      description: '입력 필드의 변형을 설정합니다',
      table: {
        type: { summary: 'InputVariant' },
        defaultValue: { summary: 'password' },
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
    showToggle: {
      control: 'boolean',
      description: 'true로 설정하면 비밀번호를 텍스트로 표시하거나 숨길 수 있는 눈 모양 토글 버튼이 나타납니다',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    showStrength: {
      control: 'boolean',
      description: 'true로 설정하면 입력 필드 아래에 비밀번호 강도를 나타내는 컬러 바가 표시됩니다',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    strength: {
      control: 'select',
      options: ['none', 'low', 'medium', 'high'],
      description: '비밀번호의 강도를 직접 지정합니다. none(없음), low(약함), medium(보통), high(강함) 중 선택할 수 있습니다',
      table: {
        type: {
          summary: 'PasswordStrength',
          detail: `'none' | 'low' | 'medium' | 'high'`,
        },
        defaultValue: { summary: 'none' },
      },
    },
    autoCalculateStrength: {
      control: 'boolean',
      description: 'true로 설정하면 입력된 비밀번호를 기반으로 강도가 자동 계산됩니다. strength prop 대신 사용합니다',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onStrengthChange: {
      action: 'strengthChanged',
      description: '비밀번호 강도가 변경될 때 호출되는 함수입니다. 강도 값(none/low/medium/high)을 인자로 받습니다',
      table: {
        type: { summary: '(strength: PasswordStrength) => void' },
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
 * 기본 비밀번호 입력 필드
 *
 * 이 스토리에서 컴포넌트의 모든 props를 테스트할 수 있습니다.
 * `ref`와 `className` prop을 지원합니다.
 */
export const Default: Story = {
  args: {
    variant: 'password',
    label: '비밀번호',
    placeholder: '비밀번호를 입력하세요',
  },
  parameters: {
    controls: { disable: false },
  },
};

/**
 * 비밀번호 표시/숨김 토글
 *
 * `showToggle` prop으로 비밀번호를 표시하거나 숨길 수 있는 버튼을 추가합니다.
 */
export const WithToggle: Story = {
  args: {
    variant: 'password',
    label: '비밀번호',
    placeholder: '비밀번호를 입력하세요',
    showToggle: true,
  },
};

/**
 * 토글 버튼 없음
 *
 * `showToggle={false}`로 토글 버튼을 숨길 수 있습니다.
 */
export const WithoutToggle: Story = {
  args: {
    variant: 'password',
    label: '비밀번호',
    placeholder: '비밀번호를 입력하세요',
    showToggle: false,
  },
};

// ============================================================================
// WITH STRENGTH INDICATOR
// ============================================================================

/**
 * 비밀번호 강도 표시 (자동 계산)
 *
 * `showStrength`와 `autoCalculateStrength` prop으로 비밀번호 강도를 자동 계산합니다.
 */
export const WithStrengthAuto: Story = {
  args: {
    variant: 'password',
    label: '비밀번호 생성',
    placeholder: '강력한 비밀번호를 입력하세요',
    showStrength: true,
    autoCalculateStrength: true,
    caption: '8자 이상, 영문/숫자/특수문자를 조합하여 입력하세요',
  },
};

/**
 * 강도: Low (Weak)
 */
export const StrengthLow: Story = {
  args: {
    variant: 'password',
    label: '약한 비밀번호',
    placeholder: '비밀번호를 입력하세요',
    showStrength: true,
    strength: 'low',
    value: '123',
  },
};

/**
 * 강도: Medium
 */
export const StrengthMedium: Story = {
  args: {
    variant: 'password',
    label: '보통 비밀번호',
    placeholder: '비밀번호를 입력하세요',
    showStrength: true,
    strength: 'medium',
    value: 'pass123',
  },
};

/**
 * 강도: High (Strong)
 */
export const StrengthHigh: Story = {
  args: {
    variant: 'password',
    label: '강한 비밀번호',
    placeholder: '비밀번호를 입력하세요',
    showStrength: true,
    strength: 'high',
    value: 'MyStr0ng!P@ss',
  },
};

// ============================================================================
// WITH LEAD ICON
// ============================================================================

/**
 * 아이콘이 있는 비밀번호 필드
 *
 * `leadIcon` prop으로 입력 필드 앞에 아이콘을 추가할 수 있습니다.
 */
export const WithLeadIcon: Story = {
  args: {
    variant: 'password',
    label: '비밀번호',
    placeholder: '비밀번호를 입력하세요',
    leadIcon: ['system', 'lock'],
    showToggle: true,
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
    variant: 'password',
    label: 'Small',
    placeholder: '비밀번호를 입력하세요',
    size: 'sm',
    showToggle: true,
  },
};

/**
 * Large 크기
 */
export const SizeLarge: Story = {
  args: {
    variant: 'password',
    label: 'Large',
    placeholder: '비밀번호를 입력하세요',
    size: 'lg',
    showToggle: true,
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
    variant: 'password',
    label: 'Default Style',
    placeholder: '비밀번호를 입력하세요',
    inputStyle: 'default',
    showToggle: true,
  },
};

/**
 * Shadow 스타일
 */
export const StyleShadow: Story = {
  args: {
    variant: 'password',
    label: 'Shadow Style',
    placeholder: '비밀번호를 입력하세요',
    inputStyle: 'shadow',
    showToggle: true,
  },
};

/**
 * Soft 스타일
 */
export const StyleSoft: Story = {
  args: {
    variant: 'password',
    label: 'Soft Style',
    placeholder: '비밀번호를 입력하세요',
    inputStyle: 'soft',
    showToggle: true,
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
    variant: 'password',
    label: 'Default',
    placeholder: '비밀번호를 입력하세요',
    showToggle: true,
  },
};

/**
 * 비활성화 상태
 */
export const StateDisabled: Story = {
  args: {
    variant: 'password',
    label: 'Disabled',
    placeholder: '비밀번호를 입력하세요',
    showToggle: true,
    disabled: true,
    value: 'password',
  },
};

/**
 * 에러 상태
 */
export const StateError: Story = {
  args: {
    variant: 'password',
    label: 'Error',
    placeholder: '비밀번호를 입력하세요',
    showToggle: true,
    error: '비밀번호가 너무 약합니다',
    value: 'password',
  },
};

/**
 * 성공 상태
 */
export const StateSuccess: Story = {
  args: {
    variant: 'password',
    label: 'Success',
    placeholder: '비밀번호를 입력하세요',
    showToggle: true,
    success: '비밀번호 요건을 충족합니다',
    value: 'StrongP@ss123',
  },
};

// ============================================================================
// FORM EXAMPLES (with state)
// ============================================================================

/**
 * 로그인 폼 예제
 *
 * 실제 로그인 폼에서 사용하는 예제입니다.
 */
export const LoginForm: Story = {
  render: function Render() {
    const [password, setPassword] = useState('');
    return (
      <div className="flex flex-col ds-gap-16 max-w-sm">
        <Input
          variant="password"
          label="비밀번호"
          placeholder="비밀번호를 입력하세요"
          leadIcon={['system', 'lock']}
          showToggle
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
    );
  },
};

/**
 * 회원가입 폼 예제
 *
 * 비밀번호 확인과 강도 표시가 포함된 회원가입 폼 예제입니다.
 */
export const RegistrationForm: Story = {
  render: function Render() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    return (
      <div className="flex flex-col ds-gap-16 max-w-sm">
        <Input
          variant="password"
          label="비밀번호 생성"
          placeholder="강력한 비밀번호를 입력하세요"
          leadIcon={['system', 'lock']}
          showToggle
          showStrength
          autoCalculateStrength
          caption="8자 이상, 영문/숫자/특수문자를 조합하여 입력하세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          variant="password"
          label="비밀번호 확인"
          placeholder="비밀번호를 다시 입력하세요"
          leadIcon={['system', 'lock']}
          showToggle
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={confirmPassword && confirmPassword !== password ? '비밀번호가 일치하지 않습니다' : undefined}
          success={confirmPassword && confirmPassword === password ? '비밀번호가 일치합니다' : undefined}
        />
      </div>
    );
  },
};

/**
 * 강도 변경 콜백
 *
 * `onStrengthChange` prop으로 비밀번호 강도 변경을 감지할 수 있습니다.
 */
export const StrengthCallback: Story = {
  render: function Render() {
    const [password, setPassword] = useState('');
    const [strength, setStrength] = useState<PasswordStrength>('none');
    return (
      <div className="flex flex-col ds-gap-8">
        <Input
          variant="password"
          label="비밀번호"
          placeholder="비밀번호를 입력하세요"
          showStrength
          autoCalculateStrength
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onStrengthChange={setStrength}
        />
        {strength !== 'none' && (
          <p className="size-sm text-subtle">
            현재 강도: <strong>{strength}</strong>
          </p>
        )}
      </div>
    );
  },
};
