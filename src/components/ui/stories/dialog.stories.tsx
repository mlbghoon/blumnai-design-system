import type { Meta, StoryObj } from '@storybook/react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '../dialog';
import { Button } from '../../button';
import { Input } from '../../input/Input';

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
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
      description: '열림 상태 변경 시 호출되는 콜백',
      table: {
        type: { summary: '(open: boolean) => void' },
      },
    },
    defaultOpen: {
      control: 'boolean',
      description: '기본 열림 상태',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    modal: {
      control: 'boolean',
      description: '모달 모드 여부 (배경 클릭으로 닫기 가능)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

/**
 * 기본 Dialog
 *
 * 버튼을 클릭하여 다이얼로그를 열 수 있습니다.
 */
export const Default: Story = {
  parameters: {
    controls: { disable: false },
  },
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button style="secondary">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>
            This is a description of the dialog. It provides additional context
            about the dialog content.
          </DialogDescription>
        </DialogHeader>
        <div className="padding-y-16">
          <p className="font-body size-sm text-default">
            Dialog content goes here. You can put any content inside the dialog.
          </p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button style="secondary">Cancel</Button>
          </DialogClose>
          <Button>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

/**
 * 닫기 버튼 숨김
 *
 * hideCloseButton prop으로 우측 상단 닫기 버튼을 숨길 수 있습니다.
 */
export const WithoutCloseButton: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button style="secondary">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent hideCloseButton>
        <DialogHeader>
          <DialogTitle>No Close Button</DialogTitle>
          <DialogDescription>
            This dialog does not have a close button in the corner.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button style="secondary">Cancel</Button>
          </DialogClose>
          <Button>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

/**
 * 폼이 있는 Dialog
 *
 * 입력 폼을 포함한 다이얼로그입니다.
 */
export const WithForm: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-16 padding-y-16">
          <Input
            variant="default"
            label="Name"
            placeholder="Enter your name"
          />
          <Input
            variant="default"
            label="Email"
            placeholder="Enter your email"
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button style="secondary">Cancel</Button>
          </DialogClose>
          <Button>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

/**
 * 확인 Dialog
 *
 * 사용자에게 확인을 요청하는 다이얼로그입니다.
 */
export const Confirmation: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button style="destructive">Delete Item</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the item
            from your account.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button style="secondary">Cancel</Button>
          </DialogClose>
          <Button style="destructive">Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

/**
 * 긴 컨텐츠가 있는 Dialog
 *
 * 스크롤이 필요한 긴 컨텐츠를 포함한 다이얼로그입니다.
 */
export const WithScrollableContent: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button style="secondary">Terms of Service</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Terms of Service</DialogTitle>
          <DialogDescription>
            Please read our terms of service carefully.
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto max-h-[400px] padding-y-16 padding-x-4">
          <div className="flex flex-col gap-16 font-body size-sm text-default">
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
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button style="secondary">Decline</Button>
          </DialogClose>
          <Button>Accept</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

/**
 * 커스텀 너비
 *
 * className으로 다이얼로그의 너비를 조절할 수 있습니다.
 */
export const CustomWidth: Story = {
  render: () => (
    <div className="flex gap-16">
      <Dialog>
        <DialogTrigger asChild>
          <Button style="secondary">Small (300px)</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[300px]">
          <DialogHeader>
            <DialogTitle>Small Dialog</DialogTitle>
            <DialogDescription>A narrow dialog for simple content.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button>OK</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <Button style="secondary">Large (700px)</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Large Dialog</DialogTitle>
            <DialogDescription>
              A wider dialog for more complex content that needs more horizontal space.
            </DialogDescription>
          </DialogHeader>
          <div className="padding-y-16">
            <p className="font-body size-sm text-default">
              This dialog has more width to accommodate larger content areas.
            </p>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button style="secondary">Cancel</Button>
            </DialogClose>
            <Button>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  ),
};
