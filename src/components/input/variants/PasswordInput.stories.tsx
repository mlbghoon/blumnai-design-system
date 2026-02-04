import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Input } from '../Input';
import type { PasswordStrength } from '../Input.types';

const meta: Meta<typeof Input> = {
  title: 'Components/Input/Password',
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
      description: '입력 필드의 변형',
      table: {
        type: { summary: 'InputVariant' },
        defaultValue: { summary: 'password' },
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
    showToggle: {
      control: 'boolean',
      description: '비밀번호 표시/숨김 토글 버튼 표시 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    showStrength: {
      control: 'boolean',
      description: '비밀번호 강도 표시 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    strength: {
      control: 'select',
      options: ['none', 'low', 'medium', 'high'],
      description: '비밀번호 강도 값',
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
      description: '비밀번호 강도 자동 계산 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onStrengthChange: {
      action: 'strengthChanged',
      description: '비밀번호 강도 변경 시 콜백',
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
    label: 'Password',
    placeholder: 'Enter your password',
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
    label: 'Password',
    placeholder: 'Enter your password',
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
    label: 'Password',
    placeholder: 'Enter your password',
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
    label: 'Create Password',
    placeholder: 'Enter a strong password',
    showStrength: true,
    autoCalculateStrength: true,
    caption: 'Use 8+ characters with a mix of letters, numbers & symbols',
  },
};

/**
 * 강도: Low (Weak)
 */
export const StrengthLow: Story = {
  args: {
    variant: 'password',
    label: 'Weak Password',
    placeholder: 'Enter password',
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
    label: 'Medium Password',
    placeholder: 'Enter password',
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
    label: 'Strong Password',
    placeholder: 'Enter password',
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
    label: 'Password',
    placeholder: 'Enter your password',
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
    placeholder: 'Enter password',
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
    placeholder: 'Enter password',
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
    placeholder: 'Enter password',
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
    placeholder: 'Enter password',
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
    placeholder: 'Enter password',
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
    placeholder: 'Enter password',
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
    placeholder: 'Enter password',
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
    placeholder: 'Enter password',
    showToggle: true,
    error: 'Password is too weak',
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
    placeholder: 'Enter password',
    showToggle: true,
    success: 'Password meets requirements',
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
      <div className="flex flex-col gap-16 max-w-sm">
        <Input
          variant="password"
          label="Password"
          placeholder="Enter your password"
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
      <div className="flex flex-col gap-16 max-w-sm">
        <Input
          variant="password"
          label="Create Password"
          placeholder="Enter a strong password"
          leadIcon={['system', 'lock']}
          showToggle
          showStrength
          autoCalculateStrength
          caption="Use 8+ characters with a mix of letters, numbers & symbols"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          variant="password"
          label="Confirm Password"
          placeholder="Re-enter your password"
          leadIcon={['system', 'lock']}
          showToggle
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={confirmPassword && confirmPassword !== password ? 'Passwords do not match' : undefined}
          success={confirmPassword && confirmPassword === password ? 'Passwords match' : undefined}
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
      <div className="flex flex-col gap-8">
        <Input
          variant="password"
          label="Password"
          placeholder="Enter a password"
          showStrength
          autoCalculateStrength
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onStrengthChange={setStrength}
        />
        {strength !== 'none' && (
          <p className="size-sm text-subtle">
            Current strength: <strong>{strength}</strong>
          </p>
        )}
      </div>
    );
  },
};
