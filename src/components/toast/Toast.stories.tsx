import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toaster } from 'sonner';

import { Button } from '../button/Button';

import { toast } from './useToast';
import { ToastContent } from './ToastContent';

import type { ToastContentProps } from './Toast.types';

const meta: Meta<ToastContentProps> = {
  title: 'Feedback/Toast',
  component: ToastContent,
  parameters: {
    layout: 'centered',
    controls: { disable: true },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'info', 'success', 'warning', 'error'],
      description: '토스트 변형',
      table: {
        type: {
          summary: 'ToastVariant',
          detail: `'default' | 'info' | 'success' | 'warning' | 'error'`,
        },
      },
    },
    message: {
      control: 'text',
      description: '표시할 메시지',
      table: {
        type: { summary: 'string' },
      },
    },
    label: {
      control: 'text',
      description: '라벨 텍스트 (기본값: 변형에 따라 자동 설정)',
      table: {
        type: { summary: 'string' },
      },
    },
  },
  decorators: [
    (Story) => (
      <>
        <Toaster position="bottom-right" />
        <Story />
      </>
    ),
  ],
};

export default meta;
type Story = StoryObj<ToastContentProps>;

/**
 * 정적 미리보기
 *
 * 토스트 컴포넌트의 정적 미리보기입니다.
 */
export const StaticPreview: Story = {
  render: () => (
    <div className="flex flex-col ds-gap-12" style={{ width: 500 }}>
      <ToastContent variant="default" message="This is a toast message" />
      <ToastContent variant="info" message="Here is some helpful information for you." />
      <ToastContent
        variant="success"
        message="Your action was successfully completed! You can now proceed to the next step or review the results below. If you have any questions, feel free to reach out to our support team for assistance."
      />
      <ToastContent variant="warning" message="Please review this before continuing." />
      <ToastContent variant="error" message="Something went wrong. Please try again." />
    </div>
  ),
};

/**
 * 기본 Toast
 *
 * 버튼을 클릭하여 각 변형의 토스트를 확인할 수 있습니다.
 * toast 함수를 사용하여 프로그래밍 방식으로 토스트를 표시합니다.
 *
 * ```tsx
 * import { toast } from '@blumnai/design-system';
 *
 * toast.success('Your action was successfully completed!');
 * toast.error('Something went wrong.');
 * toast.info('Here is some information.');
 * toast.warning('Please be careful.');
 * toast.default('Default message.');
 * ```
 */
export const Default: Story = {
  args: {
    variant: 'success',
    message: 'Your action was successfully completed!',
    label: undefined,
  },
  parameters: {
    controls: { disable: false },
    docs: {
      source: {
        code: `import { toast } from '@blumnai/design-system';

// 토스트 표시
toast.success('Your action was successfully completed!');

// 커스텀 라벨
toast.success('Saved!', { label: 'Done:' });

// 커스텀 지속 시간
toast.success('Quick message', { duration: 2000 });`,
      },
    },
  },
  render: function Render(args) {
    const label = args.label || undefined;
    const toastFn = toast[args.variant || 'success'];

    return (
      <Button buttonStyle="secondary" onClick={() => toastFn(args.message, { label })}>
        Show Toast
      </Button>
    );
  },
};

/**
 * 모든 변형
 *
 * 5가지 토스트 변형: default, info, success, warning, error
 */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col ds-gap-12">
      <div className="flex ds-gap-12 flex-wrap">
        <Button buttonStyle="secondary" onClick={() => toast.default('This is a default message')}>
          Default
        </Button>
        <Button buttonStyle="secondary" onClick={() => toast.info('Here is some helpful information for you.')}>
          Info
        </Button>
        <Button
          buttonStyle="secondary"
          onClick={() =>
            toast.success(
              'Your action was successfully completed! You can now proceed to the next step or review the results below.'
            )
          }
        >
          Success
        </Button>
        <Button buttonStyle="secondary" onClick={() => toast.warning('Please review this before continuing.')}>
          Warning
        </Button>
        <Button buttonStyle="secondary" onClick={() => toast.error('Something went wrong. Please try again.')}>
          Error
        </Button>
      </div>
    </div>
  ),
};

/**
 * 긴 메시지
 *
 * 여러 줄에 걸친 긴 메시지를 표시합니다.
 */
export const LongMessage: Story = {
  render: () => (
    <Button
      buttonStyle="secondary"
      onClick={() =>
        toast.success(
          'Your action was successfully completed! You can now proceed to the next step or review the results below. If you have any questions, feel free to reach out to our support team for assistance.'
        )
      }
    >
      Show Long Message
    </Button>
  ),
};

/**
 * 커스텀 라벨
 *
 * label 옵션을 사용하여 기본 라벨을 커스텀할 수 있습니다.
 */
export const CustomLabel: Story = {
  render: () => (
    <div className="flex ds-gap-12">
      <Button
        buttonStyle="secondary"
        onClick={() => toast.success('Your profile has been saved.', { label: 'Saved!' })}
      >
        Custom Label
      </Button>
      <Button buttonStyle="secondary" onClick={() => toast.info('Click here to learn more.', { label: 'Tip:' })}>
        Tip Label
      </Button>
    </div>
  ),
};

/**
 * 자동 닫기 시간 설정
 *
 * duration 옵션을 사용하여 토스트가 자동으로 닫히는 시간을 설정합니다.
 */
export const CustomDuration: Story = {
  render: () => (
    <div className="flex ds-gap-12">
      <Button buttonStyle="secondary" onClick={() => toast.success('Quick toast!', { duration: 1000 })}>
        1초 후 닫힘
      </Button>
      <Button buttonStyle="secondary" onClick={() => toast.success('Longer toast!', { duration: 5000 })}>
        5초 후 닫힘
      </Button>
    </div>
  ),
};
