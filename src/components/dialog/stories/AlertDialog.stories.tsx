import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogScrollArea,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../AlertDialog';
import type { AlertDialogProps, AlertDialogContentProps, AlertDialogScrollAreaProps } from '../AlertDialog.types';
import { Button } from '../../button';

type AlertDialogStoryProps = AlertDialogProps & AlertDialogContentProps & AlertDialogScrollAreaProps;

const meta: Meta<AlertDialogStoryProps> = {
  title: 'Components/Overlay/AlertDialog',
  component: AlertDialogContent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { disable: true },
  },
  argTypes: {
    // AlertDialog (Root) props
    defaultOpen: {
      control: 'boolean',
      description: '[AlertDialog] 초기 열림 상태 (비제어 모드)',
      table: {
        type: { summary: 'boolean' },
        category: 'AlertDialog',
      },
    },
    open: {
      control: 'boolean',
      description: '[AlertDialog] 열림 상태 (제어 모드)',
      table: {
        type: { summary: 'boolean' },
        category: 'AlertDialog',
      },
    },
    onOpenChange: {
      action: 'openChange',
      description: '[AlertDialog] 열림 상태 변경 콜백',
      table: {
        type: { summary: '(open: boolean) => void' },
        category: 'AlertDialog',
      },
    },
    // AlertDialogContent props
    forceMount: {
      control: 'boolean',
      description: '[AlertDialogContent] 강제 마운트 여부 (애니메이션용)',
      table: {
        type: { summary: 'boolean' },
        category: 'AlertDialogContent',
      },
    },
    className: {
      control: 'text',
      description: '[AlertDialogContent] 추가 CSS 클래스',
      table: {
        type: { summary: 'string' },
        category: 'AlertDialogContent',
      },
    },
    width: {
      control: 'text',
      description: '[AlertDialogContent] 다이얼로그의 커스텀 너비 (예: "400", "500px", "80%")',
      table: {
        type: { summary: 'string | number' },
        category: 'AlertDialogContent',
      },
    },
    // AlertDialogScrollArea props
    maxHeight: {
      control: 'text',
      description: '[AlertDialogScrollArea] 스크롤 영역의 최대 높이 (예: "300", "50vh")',
      table: {
        type: { summary: 'string | number' },
        category: 'AlertDialogScrollArea',
      },
    },
  },
};

export default meta;
type Story = StoryObj<AlertDialogStoryProps>;

/**
 * 기본 AlertDialog
 *
 * AlertDialog는 사용자에게 중요한 확인을 요청하는 모달입니다.
 * Dialog와 달리 배경 클릭이나 ESC 키로 닫히지 않으며, 반드시 Action 또는 Cancel 버튼을 클릭해야 합니다.
 */
export const Default: Story = {
  args: {
    width: undefined,
    maxHeight: undefined,
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button buttonStyle="secondary">Open AlertDialog</Button>
        </AlertDialogTrigger>
        <AlertDialogContent className={args.className} width={args.width}>
          <AlertDialogHeader>
            <AlertDialogTitle>확인이 필요합니다</AlertDialogTitle>
            <AlertDialogDescription>
              이 작업을 진행하시겠습니까? 이 작업은 되돌릴 수 없습니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogScrollArea maxHeight={args.maxHeight}>
            <div className="font-body size-sm text-default">
              This is the scrollable content area. When maxHeight is set, this area will scroll if the content exceeds the specified height.
            </div>
          </AlertDialogScrollArea>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction>확인</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  },
};

/**
 * 삭제 확인
 *
 * 위험한 삭제 작업 전 사용자에게 확인을 요청하는 AlertDialog입니다.
 * `asChild`를 사용하여 Button 컴포넌트를 직접 사용할 수 있습니다.
 */
export const DeleteConfirmation: Story = {
  render: function Render() {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button buttonStyle="destructive">Delete Account</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>계정을 삭제하시겠습니까?</AlertDialogTitle>
            <AlertDialogDescription>
              이 작업은 되돌릴 수 없습니다. 계정이 영구적으로 삭제되며,
              서버에서 데이터가 제거됩니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button buttonStyle="secondary">취소</Button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button buttonStyle="destructive">계정 삭제</Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  },
};

/**
 * 저장 확인
 *
 * 저장하지 않은 변경사항이 있을 때 사용자에게 확인을 요청합니다.
 */
export const UnsavedChanges: Story = {
  render: function Render() {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button buttonStyle="secondary">Leave Page</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>저장하지 않은 변경사항</AlertDialogTitle>
            <AlertDialogDescription>
              저장하지 않은 변경사항이 있습니다. 페이지를 떠나면 변경사항이 손실됩니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>계속 편집</AlertDialogCancel>
            <AlertDialogAction>변경사항 버리기</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  },
};

/**
 * 제어 모드 (Controlled)
 *
 * `open`과 `onOpenChange` props로 외부에서 AlertDialog 상태를 제어할 수 있습니다.
 */
export const Controlled: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);

    const handleAction = () => {
      console.log('Action confirmed!');
      setOpen(false);
    };

    return (
      <div className="flex flex-col gap-16 items-start">
        <p className="font-body size-sm text-muted">
          AlertDialog는 외부 상태로 제어할 수 있습니다.
        </p>
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogTrigger asChild>
            <Button buttonStyle="secondary">Open Controlled AlertDialog</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>제어된 AlertDialog</AlertDialogTitle>
              <AlertDialogDescription>
                이 AlertDialog는 외부 상태로 제어됩니다.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>취소</AlertDialogCancel>
              <AlertDialogAction onClick={handleAction}>확인</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  },
};

