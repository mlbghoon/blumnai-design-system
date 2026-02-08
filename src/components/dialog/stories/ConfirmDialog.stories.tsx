import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { ConfirmDialog } from '../ConfirmDialog';
import type { ConfirmDialogProps } from '../ConfirmDialog.types';
import { Button } from '../../button';

const meta: Meta<ConfirmDialogProps> = {
  title: 'Components/Overlay/ConfirmDialog',
  component: ConfirmDialog,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { disable: true },
  },
  argTypes: {
    open: {
      control: 'boolean',
      description: '다이얼로그 열림 상태',
      table: {
        type: { summary: 'boolean' },
      },
    },
    onOpenChange: {
      action: 'openChange',
      description: '열림 상태 변경 핸들러',
      table: {
        type: { summary: '(open: boolean) => void' },
      },
    },
    title: {
      control: 'text',
      description: '다이얼로그 제목',
      table: {
        type: { summary: 'string' },
      },
    },
    description: {
      control: 'text',
      description: '다이얼로그 설명 (선택)',
      table: {
        type: { summary: 'string' },
      },
    },
    confirmLabel: {
      control: 'text',
      description: '확인 버튼 텍스트',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '확인' },
      },
    },
    cancelLabel: {
      control: 'text',
      description: '취소 버튼 텍스트',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '취소' },
      },
    },
    variant: {
      control: 'select',
      options: ['default', 'destructive'],
      description: '확인 버튼 스타일',
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
      description: '확인 버튼 클릭 핸들러 (Promise 지원)',
      table: {
        type: { summary: '() => void | Promise<void>' },
      },
    },
    onCancel: {
      action: 'cancel',
      description: '취소 버튼 클릭 핸들러',
      table: {
        type: { summary: '() => void' },
      },
    },
    width: {
      control: 'text',
      description: '다이얼로그 너비 (예: "400", "500px", "80%")',
      table: {
        type: { summary: 'string | number' },
      },
    },
    loading: {
      control: 'boolean',
      description: '로딩 상태 (확인 버튼 비활성화)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    confirmDisabled: {
      control: 'boolean',
      description: '확인 버튼 비활성화',
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
    title: '확인이 필요합니다',
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
          Open ConfirmDialog
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
          Delete Account
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
          Save Changes
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
          Discard Changes
        </Button>
        <ConfirmDialog
          open={open}
          onOpenChange={setOpen}
          title="Discard unsaved changes?"
          description="You have unsaved changes. If you leave now, your changes will be lost."
          confirmLabel="Discard"
          cancelLabel="Keep Editing"
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
      <div className="flex gap-12">
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
          Open Wide Dialog
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
          Open Dialog
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
