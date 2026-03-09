import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  Dialog,
  DialogAction,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogScrollArea,
  DialogTitle,
  DialogTrigger,
} from '../Dialog';
import type { DialogProps, DialogContentProps, DialogScrollAreaProps } from '../Dialog.types';
import { Button } from '../../button';
import { Input } from '../../input/Input';

type DialogStoryProps = DialogProps & DialogContentProps & DialogScrollAreaProps & {
  useAsyncAction?: boolean;
};

const meta: Meta<DialogStoryProps> = {
  title: 'Feedback/Dialog',
  component: DialogContent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { disable: true },
  },
  argTypes: {
    // Dialog (Root) props
    defaultOpen: {
      control: 'boolean',
      description: '[Dialog] 처음 렌더링될 때 다이얼로그가 열린 상태로 시작할지 설정합니다. 외부 상태 관리 없이 사용하는 비제어 모드에서 사용합니다',
      table: {
        type: { summary: 'boolean' },
        category: 'Dialog',
      },
    },
    open: {
      control: 'boolean',
      description: '[Dialog] 다이얼로그의 열림/닫힘 상태를 외부에서 직접 제어합니다. onOpenChange와 함께 사용하여 상태를 관리합니다',
      table: {
        type: { summary: 'boolean' },
        category: 'Dialog',
      },
    },
    onOpenChange: {
      action: 'openChange',
      description: '[Dialog] 다이얼로그가 열리거나 닫힐 때 호출되는 콜백 함수입니다. open prop과 함께 사용하여 상태를 동기화합니다',
      table: {
        type: { summary: '(open: boolean) => void' },
        category: 'Dialog',
      },
    },
    modal: {
      control: 'boolean',
      description: '[Dialog] 모달 모드. true면 포커스 트랩 활성화 및 배경 요소 인터랙션 차단. 닫기 동작은 disableEscapeClose, disableOutsideClose로 제어',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Dialog',
      },
    },
    // DialogContent props
    hideCloseButton: {
      control: 'boolean',
      description: '[DialogContent] true로 설정하면 다이얼로그 우측 상단의 X 닫기 버튼이 숨겨집니다',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'DialogContent',
      },
    },
    disableEscapeClose: {
      control: 'boolean',
      description: '[DialogContent] ESC 키로 다이얼로그 닫기 비활성화',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'DialogContent',
      },
    },
    disableOutsideClose: {
      control: 'boolean',
      description: '[DialogContent] 외부 클릭으로 다이얼로그 닫기 비활성화',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'DialogContent',
      },
    },
    forceMount: {
      control: 'boolean',
      description: '[DialogContent] true로 설정하면 다이얼로그가 닫혀 있어도 DOM에 유지됩니다. 진입/퇴장 애니메이션 제어 시 사용합니다',
      table: {
        type: { summary: 'boolean' },
        category: 'DialogContent',
      },
    },
    className: {
      control: 'text',
      description: '[DialogContent] 다이얼로그 콘텐츠 영역에 추가할 CSS 클래스명입니다',
      table: {
        type: { summary: 'string' },
        category: 'DialogContent',
      },
    },
    width: {
      control: 'text',
      description: '[DialogContent] 다이얼로그의 커스텀 너비 (예: "400", "500px", "80%")',
      table: {
        type: { summary: 'string | number' },
        category: 'DialogContent',
      },
    },
    overlayClassName: {
      control: 'text',
      description: '[DialogContent] 오버레이(배경)에 적용할 추가 className (예: "bg-black/50")',
      table: {
        type: { summary: 'string' },
        category: 'DialogContent',
      },
    },
    // DialogScrollArea props
    maxHeight: {
      control: 'text',
      description: '[DialogScrollArea] 스크롤 영역의 최대 높이 (예: "300", "50vh")',
      table: {
        type: { summary: 'string | number' },
        category: 'DialogScrollArea',
      },
    },
    // DialogAction props (for async action demo)
    useAsyncAction: {
      control: 'boolean',
      description: '[DialogAction] 비동기 액션 데모. 스토리에서는 2초 지연으로 동작을 시연합니다. 실제 사용 시 `onAction`에 Promise를 반환하는 함수를 전달하면, 해당 작업이 완료된 후 다이얼로그가 자동으로 닫힙니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'DialogAction',
      },
    },
  },
};

export default meta;
type Story = StoryObj<DialogStoryProps>;

/**
 * 기본 다이얼로그
 *
 * 이 스토리에서 컴포넌트의 모든 props를 테스트할 수 있습니다. DialogContent는 `ref`와 `className` prop을 지원합니다.
 * `DialogTrigger`와 `DialogClose`에 `asChild`를 사용하여 Button 컴포넌트를 직접 사용합니다.
 */
export const Default: Story = {
  args: {
    modal: true,
    hideCloseButton: false,
    disableEscapeClose: false,
    disableOutsideClose: false,
    width: undefined,
    maxHeight: undefined,
    useAsyncAction: false,
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const simulateAsyncAction = () => {
      if (!args.useAsyncAction) return;
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          console.log('Action completed!');
          resolve();
        }, 2000);
      });
    };

    return (
      <Dialog modal={args.modal}>
        <DialogTrigger asChild>
          <Button buttonStyle="secondary">다이얼로그 열기</Button>
        </DialogTrigger>
        <DialogContent
          hideCloseButton={args.hideCloseButton}
          disableEscapeClose={args.disableEscapeClose}
          disableOutsideClose={args.disableOutsideClose}
          className={args.className}
          width={args.width}
        >
          <DialogHeader>
            <DialogTitle>다이얼로그 제목</DialogTitle>
            <DialogDescription>
              다이얼로그 설명 텍스트입니다.
            </DialogDescription>
          </DialogHeader>
          <DialogScrollArea maxHeight={args.maxHeight}>
            <div className="font-body size-sm text-default">
              스크롤 가능한 콘텐츠 영역입니다. maxHeight를 설정하면 콘텐츠가 지정된 높이를 초과할 때 이 영역이 스크롤됩니다.
            </div>
          </DialogScrollArea>
          <DialogFooter>
            <DialogClose asChild>
              <Button buttonStyle="secondary">취소</Button>
            </DialogClose>
            <DialogAction asChild onAction={simulateAsyncAction}>
              <Button>확인</Button>
            </DialogAction>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
};

/**
 * 폼 입력이 포함된 다이얼로그
 *
 * 프로필 편집 등 폼 입력이 필요한 경우 사용합니다.
 */
export const WithForm: Story = {
  render: function Render() {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button buttonStyle="secondary">프로필 수정</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>프로필 수정</DialogTitle>
            <DialogDescription>
              프로필 정보를 수정합니다.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col ds-gap-16">
            <Input variant="default" label="이름" placeholder="이름 입력..." />
            <Input variant="default" label="이메일" placeholder="email@example.com" />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button buttonStyle="secondary">취소</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button>저장</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
};

/**
 * 삭제 확인 다이얼로그
 *
 * 위험한 작업 전 사용자에게 확인을 요청하는 다이얼로그입니다.
 */
export const Confirmation: Story = {
  render: function Render() {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button buttonStyle="destructive">항목 삭제</Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>항목 삭제</DialogTitle>
            <DialogDescription>
              이 작업은 되돌릴 수 없습니다. 정말 삭제하시겠습니까?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button buttonStyle="secondary">취소</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button buttonStyle="destructive">삭제</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
};

/**
 * 스크롤 가능한 긴 컨텐츠
 *
 * 약관 동의 등 긴 텍스트 컨텐츠를 포함한 다이얼로그입니다.
 * `DialogScrollArea`에 `maxHeight`를 사용하여 헤더와 푸터는 고정하고
 * 컨텐츠 영역만 스크롤됩니다.
 */
export const LongContent: Story = {
  render: function Render() {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button buttonStyle="secondary">약관 보기</Button>
        </DialogTrigger>
        <DialogContent width={600}>
          <DialogHeader>
            <DialogTitle>이용약관</DialogTitle>
          </DialogHeader>
          <DialogScrollArea maxHeight="50vh">
            <div className="flex flex-col ds-gap-16 font-body size-sm text-default">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat.
              </p>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt mollit
                anim id est laborum.
              </p>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae vitae
                dicta sunt explicabo.
              </p>
              <p>
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                aut fugit, sed quia consequuntur magni dolores eos qui ratione
                voluptatem sequi nesciunt.
              </p>
              <p>
                Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
                consectetur, adipisci velit, sed quia non numquam eius modi tempora
                incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
              </p>
            </div>
          </DialogScrollArea>
          <DialogFooter>
            <DialogClose asChild>
              <Button buttonStyle="secondary">닫기</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button>동의</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
};

/**
 * 커스텀 푸터 레이아웃
 *
 * 여러 버튼이 있는 커스텀 푸터를 사용하는 다이얼로그입니다.
 */
export const CustomFooter: Story = {
  render: function Render() {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button buttonStyle="secondary">Open</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>문서 저장</DialogTitle>
            <DialogDescription>
              변경사항을 저장하시겠습니까?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-between">
            <DialogClose asChild>
              <Button buttonStyle="ghost">나중에 저장</Button>
            </DialogClose>
            <div className="flex ds-gap-8">
              <DialogClose asChild>
                <Button buttonStyle="secondary">취소</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button>저장</Button>
              </DialogClose>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
};

/**
 * 닫기 버튼 없음
 *
 * hideCloseButton prop으로 우측 상단 닫기 버튼을 숨깁니다.
 */
export const NoCloseButton: Story = {
  render: function Render() {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button buttonStyle="secondary">Open</Button>
        </DialogTrigger>
        <DialogContent hideCloseButton>
          <DialogHeader>
            <DialogTitle>닫기 버튼 없음</DialogTitle>
            <DialogDescription>
              이 다이얼로그는 X 버튼이 없습니다.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button>확인</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
};

/**
 * ESC 키 닫기 비활성화
 *
 * `disableEscapeClose` prop으로 ESC 키로 다이얼로그를 닫는 것을 방지할 수 있습니다.
 * 중요한 작업이나 필수 입력이 필요한 경우 유용합니다.
 */
export const DisableEscapeClose: Story = {
  render: function Render() {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button buttonStyle="secondary">다이얼로그 열기</Button>
        </DialogTrigger>
        <DialogContent disableEscapeClose>
          <DialogHeader>
            <DialogTitle>ESC 키 비활성화</DialogTitle>
            <DialogDescription>
              이 다이얼로그는 ESC 키로 닫을 수 없습니다. 반드시 버튼을 클릭해야 합니다.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button>확인</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
};

/**
 * 프로그래매틱 제어 (트리거 버튼 없음)
 *
 * Dialog는 `open`과 `onOpenChange` props로 외부에서 제어할 수 있습니다.
 * 트리거 버튼 없이 API 응답, 타이머, 또는 다른 이벤트에 의해 다이얼로그를 열 수 있습니다.
 */
export const Programmatic: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);

    return (
      <div className="flex flex-col ds-gap-16 items-start">
        <p className="font-body size-sm text-muted">
          Dialog는 외부 상태로 제어할 수 있습니다. 아래 버튼들은 Dialog 외부에 있습니다.
        </p>
        <div className="flex ds-gap-8">
          <Button buttonStyle="secondary" onClick={() => setOpen(true)}>
            다이얼로그 열기
          </Button>
          <Button buttonStyle="ghost" onClick={() => alert('다른 작업 수행')}>
            다른 작업
          </Button>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>프로그래매틱 다이얼로그</DialogTitle>
              <DialogDescription>
                이 다이얼로그는 트리거 버튼 없이 외부 상태로 제어됩니다.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button buttonStyle="secondary" onClick={() => setOpen(false)}>닫기</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  },
};

/**
 * 다양한 너비 옵션
 *
 * className으로 다이얼로그의 너비를 조절할 수 있습니다.
 */
export const Sizes: Story = {
  render: function Render() {
    return (
      <div className="flex ds-gap-16">
        <Dialog>
          <DialogTrigger asChild>
            <Button buttonStyle="secondary" size="sm">작은 크기</Button>
          </DialogTrigger>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle>작은 다이얼로그</DialogTitle>
              <DialogDescription>
                간단한 콘텐츠를 위한 컴팩트한 다이얼로그입니다.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button>확인</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button buttonStyle="secondary" size="sm">중간 크기</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>중간 다이얼로그</DialogTitle>
              <DialogDescription>
                기본 크기의 다이얼로그로 일반적인 콘텐츠에 적합합니다.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button>확인</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button buttonStyle="secondary" size="sm">큰 크기</Button>
          </DialogTrigger>
          <DialogContent className="max-w-xl">
            <DialogHeader>
              <DialogTitle>큰 다이얼로그</DialogTitle>
              <DialogDescription>
                넓은 가로 공간이 필요한 복잡한 콘텐츠를 위한 다이얼로그입니다.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button>확인</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  },
};

/**
 * 비동기 액션
 *
 * `DialogAction`의 `onAction` prop에 Promise를 반환하는 함수를 전달하면,
 * 작업이 완료될 때까지 대기 후 다이얼로그가 닫힙니다.
 * 비동기 작업 중에는 버튼이 로딩 상태로 표시됩니다.
 */
export const AsyncAction: Story = {
  render: function Render() {
    const simulateAsyncSave = () => {
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          console.log('Saved!');
          resolve();
        }, 2000);
      });
    };

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button buttonStyle="secondary">비동기 다이얼로그 열기</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>비동기 저장</DialogTitle>
            <DialogDescription>
              저장 버튼을 클릭하면 2초 후에 다이얼로그가 닫힙니다.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button buttonStyle="secondary">취소</Button>
            </DialogClose>
            <DialogAction asChild onAction={simulateAsyncSave}>
              <Button buttonStyle="primary">저장</Button>
            </DialogAction>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
};

/**
 * 타이틀 굵기
 *
 * DialogTitle의 weight prop으로 font-weight를 조절합니다.
 */
export const TitleWeight: Story = {
  render: function Render() {
    return (
      <div className="flex ds-gap-12">
        <Dialog>
          <DialogTrigger asChild>
            <Button buttonStyle="secondary">Medium Weight</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle weight="medium">font-medium 타이틀</DialogTitle>
              <DialogDescription>weight=&quot;medium&quot; (500)</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button buttonStyle="secondary">닫기</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <Button buttonStyle="secondary">Semibold Weight</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle weight="semibold">font-semibold 타이틀</DialogTitle>
              <DialogDescription>weight=&quot;semibold&quot; (600, 기본)</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button buttonStyle="secondary">닫기</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  },
};

/**
 * 커스텀 오버레이
 *
 * overlayClassName으로 배경 오버레이의 스타일을 변경합니다.
 */
export const CustomOverlay: Story = {
  render: function Render() {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button buttonStyle="secondary">어두운 오버레이 다이얼로그</Button>
        </DialogTrigger>
        <DialogContent overlayClassName="bg-black/50">
          <DialogHeader>
            <DialogTitle>어두운 배경 오버레이</DialogTitle>
            <DialogDescription>
              overlayClassName=&quot;bg-black/50&quot;으로 오버레이 색상을 변경했습니다.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button buttonStyle="secondary">닫기</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
};
