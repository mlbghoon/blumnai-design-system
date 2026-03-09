import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from '../InputOTP';

const meta: Meta<typeof InputOTP> = {
  title: 'DataEntry/InputOTP',
  component: InputOTP,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { disable: true },
  },
  argTypes: {
    maxLength: {
      control: 'number',
      description: 'OTP 코드의 자릿수를 설정합니다. 예를 들어 6을 설정하면 6자리 코드를 입력받습니다',
      table: {
        type: { summary: 'number' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'true로 설정하면 컴포넌트가 비활성화되어 입력을 할 수 없습니다',
      table: {
        type: { summary: 'boolean' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof InputOTP>;

/**
 * 기본 OTP 입력
 *
 * 6자리 OTP 코드를 입력받는 컴포넌트입니다.
 */
export const Default: Story = {
  parameters: {
    controls: { disable: false },
  },
  render: function Render() {
    return (
      <InputOTP maxLength={6}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    );
  },
};

/**
 * 구분자 사용
 *
 * 그룹 사이에 구분자를 추가하여 가독성을 높입니다.
 */
export const WithSeparator: Story = {
  render: function Render() {
    return (
      <InputOTP maxLength={6}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    );
  },
};

/**
 * 4자리 PIN
 *
 * 짧은 PIN 코드 입력에 사용합니다.
 */
export const FourDigitPIN: Story = {
  render: function Render() {
    return (
      <InputOTP maxLength={4}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
      </InputOTP>
    );
  },
};

/**
 * 비활성화 상태
 */
export const Disabled: Story = {
  render: function Render() {
    return (
      <InputOTP maxLength={6} disabled>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    );
  },
};

/**
 * 제어 컴포넌트
 *
 * value와 onChange로 상태를 제어합니다.
 */
export const Controlled: Story = {
  render: function Render() {
    const [value, setValue] = React.useState('');

    return (
      <div className="flex flex-col ds-gap-16 items-center">
        <InputOTP maxLength={6} value={value} onChange={setValue}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        <div className="size-sm font-body text-muted">
          입력된 값: {value || '(없음)'}
        </div>
      </div>
    );
  },
};

/**
 * 폼 예제
 *
 * 실제 인증 폼에서 사용하는 예제입니다.
 */
export const FormExample: Story = {
  render: function Render() {
    const [value, setValue] = React.useState('');

    const handleComplete = (code: string) => {
      console.log('OTP 입력 완료:', code);
    };

    return (
      <div className="flex flex-col ds-gap-16 w-[300px]">
        <div className="flex flex-col ds-gap-8">
          <h3 className="size-md font-body font-semibold line-height-leading-5">
            인증 코드 입력
          </h3>
          <p className="size-sm font-body text-muted line-height-leading-5">
            이메일로 전송된 6자리 코드를 입력해주세요.
          </p>
        </div>
        <InputOTP
          maxLength={6}
          value={value}
          onChange={setValue}
          onComplete={handleComplete}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        <p className="size-xs font-body text-muted line-height-leading-4">
          코드를 받지 못하셨나요?{' '}
          <a href="#" className="text-default underline">
            재전송
          </a>
        </p>
      </div>
    );
  },
};
