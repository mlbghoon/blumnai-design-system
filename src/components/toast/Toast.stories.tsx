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
        defaultValue: { summary: 'default' },
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
      description: '라벨 텍스트 (기본값: 변형에 따라 자동 설정, 예: "Info:", "Success:"). 콜론 포함 필요 시 직접 입력',
      table: {
        type: { summary: 'string' },
      },
    },
    action: {
      control: false,
      description: '액션 버튼. label과 onClick을 포함하는 객체를 전달하면 토스트 오른쪽에 액션 버튼이 표시됩니다',
      table: {
        type: {
          summary: 'ToastAction',
          detail: `{
  label: string;      // 버튼 텍스트
  onClick: () => void; // 클릭 핸들러
}`,
        },
      },
    },
    toastId: {
      control: 'text',
      description: '토스트의 고유 ID. 동일 ID로 중복 생성 방지 또는 기존 토스트 업데이트에 사용됩니다',
      table: {
        type: { summary: 'string | number' },
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
 * 기본 Toast
 *
 * 토스트 컴포넌트의 모든 props를 테스트할 수 있습니다.
 *
 * ```tsx
 * import { toast } from '@blumnai/design-system';
 *
 * toast.success('작업이 성공적으로 완료되었습니다!');
 * toast.error('문제가 발생했습니다.');
 * toast.info('유용한 정보입니다.');
 * toast.warning('계속하기 전에 검토하세요.');
 * toast.default('기본 메시지입니다.');
 * ```
 */
export const Default: Story = {
  args: {
    variant: 'default',
    message: '토스트 메시지입니다',
    label: undefined,
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const label = args.label || undefined;
    return (
      <div style={{ width: 500 }}>
        <ToastContent
          variant={args.variant}
          message={args.message}
          label={label}
        />
      </div>
    );
  },
};

/**
 * 모든 변형 미리보기
 *
 * 5가지 토스트 변형: default, info, success, warning, error
 */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col ds-gap-12" style={{ width: 500 }}>
      <ToastContent variant="default" message="토스트 메시지입니다" />
      <ToastContent variant="info" message="유용한 정보입니다." />
      <ToastContent
        variant="success"
        message="작업이 성공적으로 완료되었습니다! 다음 단계로 진행하거나 아래 결과를 확인하세요. 궁금한 점이 있으면 지원팀에 문의하세요."
      />
      <ToastContent variant="warning" message="계속하기 전에 검토하세요." />
      <ToastContent variant="error" message="문제가 발생했습니다. 다시 시도하세요." />
    </div>
  ),
};

/**
 * 토스트 트리거
 *
 * 버튼을 클릭하여 각 변형의 토스트를 확인할 수 있습니다.
 */
export const ToastTrigger: Story = {
  render: () => (
    <div className="flex ds-gap-12 flex-wrap">
      <Button buttonStyle="secondary" onClick={() => toast.default('토스트 메시지입니다')}>
        Default
      </Button>
      <Button buttonStyle="secondary" onClick={() => toast.info('유용한 정보입니다.')}>
        Info
      </Button>
      <Button
        buttonStyle="secondary"
        onClick={() =>
          toast.success(
            '작업이 성공적으로 완료되었습니다! 다음 단계로 진행하거나 아래 결과를 확인하세요.'
          )
        }
      >
        Success
      </Button>
      <Button buttonStyle="secondary" onClick={() => toast.warning('계속하기 전에 검토하세요.')}>
        Warning
      </Button>
      <Button buttonStyle="secondary" onClick={() => toast.error('문제가 발생했습니다. 다시 시도하세요.')}>
        Error
      </Button>
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
          '작업이 성공적으로 완료되었습니다! 다음 단계로 진행하거나 아래 결과를 확인하세요. 궁금한 점이 있으면 지원팀에 문의하세요.'
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
        onClick={() => toast.success('프로필이 저장되었습니다.', { label: '저장됨!' })}
      >
        커스텀 라벨
      </Button>
      <Button buttonStyle="secondary" onClick={() => toast.info('자세한 내용을 확인하려면 클릭하세요.', { label: '팁:' })}>
        팁 라벨
      </Button>
    </div>
  ),
};

/**
 * 액션 버튼이 있는 토스트
 *
 * action 옵션을 사용하여 토스트에 액션 버튼을 추가합니다.
 * 사용자가 작업을 취소하거나 추가 동작을 수행할 수 있습니다.
 */
export const WithAction: Story = {
  render: () => (
    <div className="flex flex-col ds-gap-12">
      <div className="flex flex-col ds-gap-8">
        <span className="font-body size-xs text-muted">정적 미리보기:</span>
        <div style={{ width: 500 }}>
          <ToastContent
            variant="success"
            message="파일이 삭제되었습니다."
            action={{ label: '되돌리기', onClick: () => console.log('되돌리기') }}
          />
        </div>
      </div>
      <div className="flex ds-gap-12">
        <Button
          buttonStyle="secondary"
          onClick={() =>
            toast.success('파일이 삭제되었습니다.', {
              action: { label: '되돌리기', onClick: () => console.log('되돌리기 클릭') },
            })
          }
        >
          삭제 + 되돌리기
        </Button>
        <Button
          buttonStyle="secondary"
          onClick={() =>
            toast.info('새 업데이트가 있습니다.', {
              action: { label: '업데이트', onClick: () => console.log('업데이트 클릭') },
            })
          }
        >
          업데이트 알림
        </Button>
      </div>
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
      <Button buttonStyle="secondary" onClick={() => toast.success('짧은 토스트!', { duration: 1000 })}>
        1초 후 닫힘
      </Button>
      <Button buttonStyle="secondary" onClick={() => toast.success('긴 토스트!', { duration: 5000 })}>
        5초 후 닫힘
      </Button>
    </div>
  ),
};
