import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { SimpleAlertDialog } from '../AlertDialog';
import type { SimpleAlertDialogProps } from '../AlertDialog.types';
import { Button } from '../../button';

const meta: Meta<SimpleAlertDialogProps> = {
  title: 'Feedback/AlertDialog',
  component: SimpleAlertDialog,
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
    onConfirm: {
      action: 'confirm',
      description: '확인 버튼 클릭 핸들러',
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
  },
};

export default meta;
type Story = StoryObj<SimpleAlertDialogProps>;

/**
 * 기본 AlertDialog
 *
 * AlertDialog는 사용자에게 중요한 알림을 표시하는 모달입니다.
 * 배경 클릭이나 ESC 키로 닫히지 않으며, 반드시 확인 버튼을 클릭해야 합니다.
 */
export const Default: Story = {
  args: {
    title: '알림',
    description: '작업이 완료되었습니다.',
    confirmLabel: '확인',
    width: undefined,
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button buttonStyle="secondary" onClick={() => setOpen(true)}>
          Open AlertDialog
        </Button>
        <SimpleAlertDialog
          open={open}
          onOpenChange={setOpen}
          title={args.title}
          description={args.description}
          confirmLabel={args.confirmLabel}
          width={args.width}
          onConfirm={() => {}}
        />
      </>
    );
  },
};

/**
 * 오류 알림
 *
 * 오류 발생 시 사용자에게 알리는 AlertDialog입니다.
 */
export const ErrorAlert: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button buttonStyle="destructive" onClick={() => setOpen(true)}>
          Trigger Error
        </Button>
        <SimpleAlertDialog
          open={open}
          onOpenChange={setOpen}
          title="오류가 발생했습니다"
          description="요청을 처리하는 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요."
          confirmLabel="확인"
          onConfirm={() => {}}
        />
      </>
    );
  },
};

/**
 * 성공 알림
 *
 * 작업 완료를 알리는 AlertDialog입니다.
 */
export const SuccessAlert: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button buttonStyle="primary" onClick={() => setOpen(true)}>
          Complete Action
        </Button>
        <SimpleAlertDialog
          open={open}
          onOpenChange={setOpen}
          title="저장 완료"
          description="변경사항이 성공적으로 저장되었습니다."
          onConfirm={() => {}}
        />
      </>
    );
  },
};

/**
 * 커스텀 너비
 *
 * `width` prop으로 다이얼로그의 너비를 조정할 수 있습니다.
 */
export const CustomWidth: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button buttonStyle="secondary" onClick={() => setOpen(true)}>
          Open Wide Alert
        </Button>
        <SimpleAlertDialog
          open={open}
          onOpenChange={setOpen}
          title="넓은 알림"
          description="width prop을 사용하여 다이얼로그의 너비를 600px로 설정했습니다."
          width={600}
          onConfirm={() => {}}
        />
      </>
    );
  },
};
