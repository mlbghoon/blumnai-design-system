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
      description: '토스트의 유형을 설정합니다. default(기본), info(정보), success(성공), warning(경고), error(오류) 중 선택하면 아이콘과 색상이 자동으로 변경됩니다',
      table: {
        type: {
          summary: 'ToastVariant',
          detail: `'default' | 'info' | 'success' | 'warning' | 'error'`,
        },
      },
    },
    message: {
      control: 'text',
      description: '토스트에 표시되는 주요 메시지 텍스트입니다. 사용자에게 알림 내용을 전달합니다',
      table: {
        type: { summary: 'string' },
      },
    },
    label: {
      control: 'text',
      description: '메시지 앞에 굵게 표시되는 라벨 텍스트입니다. 생략하면 변형에 따라 자동으로 설정됩니다 (예: "성공:", "오류:")',
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
      <ToastContent variant="default" message="기본 토스트 메시지입니다" />
      <ToastContent variant="info" message="참고할 만한 유용한 정보입니다." />
      <ToastContent
        variant="success"
        message="작업이 성공적으로 완료되었습니다! 다음 단계로 진행하거나 아래 결과를 확인할 수 있습니다. 궁금한 점이 있으시면 지원팀에 문의해 주세요."
      />
      <ToastContent variant="warning" message="계속하기 전에 이 내용을 확인해 주세요." />
      <ToastContent variant="error" message="문제가 발생했습니다. 다시 시도해 주세요." />
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
    message: '작업이 성공적으로 완료되었습니다!',
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
        토스트 표시
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
        <Button buttonStyle="secondary" onClick={() => toast.default('기본 메시지입니다')}>
          Default
        </Button>
        <Button buttonStyle="secondary" onClick={() => toast.info('참고할 만한 유용한 정보입니다.')}>
          Info
        </Button>
        <Button
          buttonStyle="secondary"
          onClick={() =>
            toast.success(
              '작업이 성공적으로 완료되었습니다! 다음 단계로 진행하거나 아래 결과를 확인할 수 있습니다.'
            )
          }
        >
          Success
        </Button>
        <Button buttonStyle="secondary" onClick={() => toast.warning('계속하기 전에 이 내용을 확인해 주세요.')}>
          Warning
        </Button>
        <Button buttonStyle="secondary" onClick={() => toast.error('문제가 발생했습니다. 다시 시도해 주세요.')}>
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
          '작업이 성공적으로 완료되었습니다! 다음 단계로 진행하거나 아래 결과를 확인할 수 있습니다. 궁금한 점이 있으시면 지원팀에 문의해 주세요.'
        )
      }
    >
      긴 메시지 표시
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
        onClick={() => toast.success('프로필이 저장되었습니다.', { label: '저장 완료!' })}
      >
        커스텀 라벨
      </Button>
      <Button buttonStyle="secondary" onClick={() => toast.info('여기를 클릭하여 자세히 알아보세요.', { label: '팁:' })}>
        팁 라벨
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
      <Button buttonStyle="secondary" onClick={() => toast.success('빠른 토스트!', { duration: 1000 })}>
        1초 후 닫힘
      </Button>
      <Button buttonStyle="secondary" onClick={() => toast.success('긴 토스트!', { duration: 5000 })}>
        5초 후 닫힘
      </Button>
    </div>
  ),
};
