import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { ConfirmDialog } from '../ConfirmDialog';
import type { ConfirmDialogProps } from '../ConfirmDialog.types';
import { Button } from '../../button';

const meta: Meta<ConfirmDialogProps> = {
  title: 'Feedback/ConfirmDialog',
  component: ConfirmDialog,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { disable: true },
  },
  argTypes: {
    open: {
      control: 'boolean',
      description: '다이얼로그의 열림/닫힘 상태를 제어합니다. onOpenChange와 함께 사용하여 외부에서 상태를 관리합니다',
      table: {
        type: { summary: 'boolean' },
      },
    },
    onOpenChange: {
      action: 'openChange',
      description: '다이얼로그가 열리거나 닫힐 때 호출되는 콜백 함수입니다. open prop과 함께 사용하여 상태를 동기화합니다',
      table: {
        type: { summary: '(open: boolean) => void' },
      },
    },
    title: {
      control: 'text',
      description: '다이얼로그 상단에 굵게 표시되는 제목 텍스트입니다. 사용자에게 확인할 내용을 명확히 전달합니다',
      table: {
        type: { summary: 'string' },
      },
    },
    description: {
      control: 'text',
      description: '제목 아래에 표시되는 보조 설명 텍스트입니다. 생략할 수 있으며, 작업의 결과나 주의사항을 안내합니다',
      table: {
        type: { summary: 'string' },
      },
    },
    confirmLabel: {
      control: 'text',
      description: '확인 버튼에 표시되는 텍스트입니다. 기본값은 "확인"이며, "삭제", "저장" 등 상황에 맞게 변경할 수 있습니다',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '확인' },
      },
    },
    cancelLabel: {
      control: 'text',
      description: '취소 버튼에 표시되는 텍스트입니다. 기본값은 "취소"이며, 상황에 맞게 변경할 수 있습니다',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '취소' },
      },
    },
    variant: {
      control: 'select',
      options: ['default', 'destructive'],
      description: '확인 버튼의 스타일을 설정합니다. default(기본 파란색), destructive(위험한 작업용 빨간색) 중 선택할 수 있습니다',
      table: {
        type: {
          summary: 'ConfirmDialogVariant',
          detail: `'default' | 'destructive'`,
        },
        defaultValue: { summary: 'default' },
      },
    },
    onConfirm: {
      action: 'confirm',
      description: '사용자가 확인 버튼을 클릭했을 때 호출되는 콜백 함수입니다. Promise를 반환하면 완료될 때까지 로딩 상태가 표시됩니다',
      table: {
        type: { summary: '() => void | Promise<void>' },
      },
    },
    onCancel: {
      action: 'cancel',
      description: '사용자가 취소 버튼을 클릭했을 때 호출되는 콜백 함수입니다',
      table: {
        type: { summary: '() => void' },
      },
    },
    width: {
      control: 'text',
      description: '다이얼로그의 너비를 직접 지정합니다. 숫자, px, % 등 다양한 형식을 사용할 수 있습니다 (예: "400", "500px", "80%")',
      table: {
        type: { summary: 'string | number' },
      },
    },
    loading: {
      control: 'boolean',
      description: 'true로 설정하면 로딩 상태가 되어 확인 버튼이 비활성화되고 로딩 인디케이터가 표시됩니다',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    confirmDisabled: {
      control: 'boolean',
      description: 'true로 설정하면 확인 버튼이 비활성화됩니다. 특정 조건이 충족될 때까지 확인을 막는 데 유용합니다',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<ConfirmDialogProps>;

/**
 * 기본 ConfirmDialog
 *
 * ConfirmDialog는 AlertDialog를 래핑하여 간단한 API로 확인 다이얼로그를 구현합니다.
 * 복잡한 컴포넌트 구조 없이 props만으로 확인 다이얼로그를 생성할 수 있습니다.
 */
export const Default: Story = {
  args: {
    title: '작업 확인',
    description: '이 작업을 진행하시겠습니까?',
    confirmLabel: '확인',
    cancelLabel: '취소',
    variant: 'default',
    width: undefined,
    loading: false,
    confirmDisabled: false,
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button buttonStyle="secondary" onClick={() => setOpen(true)}>
          확인 다이얼로그 열기
        </Button>
        <ConfirmDialog
          open={open}
          onOpenChange={setOpen}
          title={args.title}
          description={args.description}
          confirmLabel={args.confirmLabel}
          cancelLabel={args.cancelLabel}
          variant={args.variant}
          width={args.width}
          loading={args.loading}
          confirmDisabled={args.confirmDisabled}
          onConfirm={() => console.log('Confirmed!')}
          onCancel={() => console.log('Cancelled!')}
        />
      </>
    );
  },
};

/**
 * 삭제 확인 (Destructive)
 *
 * `variant="destructive"`를 사용하여 위험한 작업에 대한 확인을 요청합니다.
 * 확인 버튼이 빨간색으로 표시됩니다.
 */
export const Destructive: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button buttonStyle="destructive" onClick={() => setOpen(true)}>
          계정 삭제
        </Button>
        <ConfirmDialog
          open={open}
          onOpenChange={setOpen}
          title="계정을 삭제하시겠습니까?"
          description="이 작업은 되돌릴 수 없습니다. 계정이 영구적으로 삭제되며, 서버에서 데이터가 제거됩니다."
          confirmLabel="계정 삭제"
          cancelLabel="취소"
          variant="destructive"
          onConfirm={() => console.log('Account deleted!')}
        />
      </>
    );
  },
};

/**
 * 비동기 작업 (Async Action)
 *
 * `onConfirm`에서 Promise를 반환하면 자동으로 로딩 상태가 표시됩니다.
 * 작업이 완료되면 다이얼로그가 자동으로 닫힙니다.
 */
export const WithAsyncAction: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);

    const handleConfirm = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log('Async action completed!');
    };

    return (
      <>
        <Button buttonStyle="secondary" onClick={() => setOpen(true)}>
          변경사항 저장
        </Button>
        <ConfirmDialog
          open={open}
          onOpenChange={setOpen}
          title="변경사항을 저장하시겠습니까?"
          description="저장하는 데 몇 초가 걸릴 수 있습니다."
          confirmLabel="저장"
          cancelLabel="취소"
          onConfirm={handleConfirm}
        />
      </>
    );
  },
};

/**
 * 커스텀 라벨 (Custom Labels)
 *
 * 영어 또는 다른 언어로 버튼 텍스트를 변경할 수 있습니다.
 */
export const CustomLabels: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button buttonStyle="secondary" onClick={() => setOpen(true)}>
          변경사항 폐기
        </Button>
        <ConfirmDialog
          open={open}
          onOpenChange={setOpen}
          title="저장하지 않은 변경사항을 폐기하시겠습니까?"
          description="저장하지 않은 변경사항이 있습니다. 지금 나가면 변경사항이 사라집니다."
          confirmLabel="폐기"
          cancelLabel="계속 편집"
          variant="destructive"
          onConfirm={() => console.log('Changes discarded!')}
        />
      </>
    );
  },
};

/**
 * 모든 변형 (All Variants)
 *
 * ConfirmDialog의 모든 variant를 비교합니다.
 */
export const AllVariants: Story = {
  render: function Render() {
    const [openDefault, setOpenDefault] = useState(false);
    const [openDestructive, setOpenDestructive] = useState(false);

    return (
      <div className="flex ds-gap-12">
        <Button buttonStyle="primary" onClick={() => setOpenDefault(true)}>
          Default
        </Button>
        <ConfirmDialog
          open={openDefault}
          onOpenChange={setOpenDefault}
          title="기본 확인"
          description="기본 스타일의 확인 다이얼로그입니다."
          variant="default"
        />

        <Button buttonStyle="destructive" onClick={() => setOpenDestructive(true)}>
          Destructive
        </Button>
        <ConfirmDialog
          open={openDestructive}
          onOpenChange={setOpenDestructive}
          title="삭제 확인"
          description="위험한 작업을 확인하는 다이얼로그입니다."
          variant="destructive"
          confirmLabel="삭제"
        />
      </div>
    );
  },
};

/**
 * 커스텀 너비 (Custom Width)
 *
 * `width` prop으로 다이얼로그의 너비를 조정할 수 있습니다.
 */
export const CustomWidth: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button buttonStyle="secondary" onClick={() => setOpen(true)}>
          넓은 다이얼로그 열기
        </Button>
        <ConfirmDialog
          open={open}
          onOpenChange={setOpen}
          title="넓은 다이얼로그"
          description="width prop을 사용하여 다이얼로그의 너비를 600px로 설정했습니다."
          width={600}
        />
      </>
    );
  },
};

/**
 * 비활성화된 확인 버튼 (Disabled Confirm)
 *
 * `confirmDisabled` prop으로 확인 버튼을 비활성화할 수 있습니다.
 * 특정 조건이 충족될 때까지 확인을 막는 데 유용합니다.
 */
export const DisabledConfirm: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button buttonStyle="secondary" onClick={() => setOpen(true)}>
          다이얼로그 열기
        </Button>
        <ConfirmDialog
          open={open}
          onOpenChange={setOpen}
          title="확인 버튼 비활성화"
          description="confirmDisabled prop이 true로 설정되어 확인 버튼이 비활성화되었습니다."
          confirmDisabled
        />
      </>
    );
  },
};
