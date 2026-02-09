import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverScrollArea,
} from '../Popover';
import type { PopoverProps, PopoverContentProps, PopoverScrollAreaProps } from '../Popover.types';
import { Button } from '../../button';
import { Input } from '../../input/Input';

type PopoverStoryProps = PopoverProps & PopoverContentProps & PopoverScrollAreaProps;

const meta: Meta<PopoverStoryProps> = {
  title: 'Overlay/Popover',
  component: PopoverContent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { disable: true },
  },
  argTypes: {
    // Popover (Root) props
    defaultOpen: {
      control: 'boolean',
      description: '[Popover] 초기 열림 상태 (비제어 모드)',
      table: {
        type: { summary: 'boolean' },
        category: 'Popover',
      },
    },
    open: {
      control: 'boolean',
      description: '[Popover] 열림 상태 (제어 모드)',
      table: {
        type: { summary: 'boolean' },
        category: 'Popover',
      },
    },
    onOpenChange: {
      action: 'openChange',
      description: '[Popover] 열림 상태 변경 콜백',
      table: {
        type: { summary: '(open: boolean) => void' },
        category: 'Popover',
      },
    },
    modal: {
      control: 'boolean',
      description: '[Popover] 모달 모드. true면 포커스 트랩 활성화 및 배경 요소 인터랙션 차단',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Popover',
      },
    },
    // PopoverContent props
    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
      description: '[PopoverContent] 트리거 기준 표시 방향',
      table: {
        type: { summary: "'top' | 'right' | 'bottom' | 'left'" },
        defaultValue: { summary: 'bottom' },
        category: 'PopoverContent',
      },
    },
    sideOffset: {
      control: 'number',
      description: '[PopoverContent] 트리거와의 간격 (px)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '4' },
        category: 'PopoverContent',
      },
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: '[PopoverContent] 트리거 기준 정렬 위치',
      table: {
        type: { summary: "'start' | 'center' | 'end'" },
        defaultValue: { summary: 'center' },
        category: 'PopoverContent',
      },
    },
    alignOffset: {
      control: 'number',
      description: '[PopoverContent] 정렬 오프셋 (px)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
        category: 'PopoverContent',
      },
    },
    avoidCollisions: {
      control: 'boolean',
      description: '[PopoverContent] 화면 경계 충돌 회피',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'PopoverContent',
      },
    },
    collisionPadding: {
      control: 'number',
      description: '[PopoverContent] 충돌 감지 여백 (px)',
      table: {
        type: { summary: 'number | Padding' },
        defaultValue: { summary: '0' },
        category: 'PopoverContent',
      },
    },
    sticky: {
      control: 'select',
      options: ['partial', 'always'],
      description: '[PopoverContent] 정렬 축 고정 동작',
      table: {
        type: { summary: "'partial' | 'always'" },
        defaultValue: { summary: 'partial' },
        category: 'PopoverContent',
      },
    },
    hideWhenDetached: {
      control: 'boolean',
      description: '[PopoverContent] 트리거가 화면에서 벗어나면 숨김',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'PopoverContent',
      },
    },
    forceMount: {
      control: 'boolean',
      description: '[PopoverContent] 강제 마운트 여부 (애니메이션용)',
      table: {
        type: { summary: 'boolean' },
        category: 'PopoverContent',
      },
    },
    className: {
      control: 'text',
      description: '[PopoverContent] 추가 CSS 클래스',
      table: {
        type: { summary: 'string' },
        category: 'PopoverContent',
      },
    },
    width: {
      control: 'text',
      description: '[PopoverContent] 팝오버의 커스텀 너비 (예: "400", "500px", "80%")',
      table: {
        type: { summary: 'string | number' },
        category: 'PopoverContent',
      },
    },
    // PopoverScrollArea props
    maxHeight: {
      control: 'text',
      description: '[PopoverScrollArea] 스크롤 영역의 최대 높이 (예: "200", "30vh")',
      table: {
        type: { summary: 'string | number' },
        category: 'PopoverScrollArea',
      },
    },
  },
};

export default meta;
type Story = StoryObj<PopoverStoryProps>;

/**
 * 기본 Popover
 *
 * 클릭하면 트리거 요소 근처에 플로팅 컨텐츠가 표시됩니다.
 * Button의 `buttonStyle` prop은 Radix의 `style` prop과 충돌하지 않아 span wrapper 없이 동작합니다.
 */
export const Default: Story = {
  args: {
    modal: false,
    side: 'bottom',
    sideOffset: 4,
    align: 'center',
    alignOffset: 0,
    avoidCollisions: true,
    sticky: 'partial',
    hideWhenDetached: false,
    width: undefined,
    maxHeight: undefined,
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const [open, setOpen] = useState(false);

    return (
      <Popover open={open} onOpenChange={setOpen} modal={args.modal}>
        <PopoverTrigger asChild>
          <Button buttonStyle="secondary" onClick={() => setOpen(true)}>Open Popover</Button>
        </PopoverTrigger>
        <PopoverContent
          side={args.side}
          sideOffset={args.sideOffset}
          align={args.align}
          alignOffset={args.alignOffset}
          avoidCollisions={args.avoidCollisions}
          sticky={args.sticky}
          hideWhenDetached={args.hideWhenDetached}
          className={args.className}
          width={args.width}
        >
          <div className="flex flex-col gap-8">
            <p className="font-body size-sm font-medium text-default">Popover Content</p>
            <PopoverScrollArea maxHeight={args.maxHeight}>
              <p className="font-body size-sm text-muted">
                This is a basic popover with some content. When maxHeight is set, this area will scroll if the content exceeds the specified height.
              </p>
            </PopoverScrollArea>
          </div>
        </PopoverContent>
      </Popover>
    );
  },
};

/**
 * 폼이 있는 Popover
 *
 * 간단한 폼 입력을 포함한 팝오버입니다.
 */
export const WithForm: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button buttonStyle="secondary" onClick={() => setOpen(true)}>Edit Dimensions</Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="flex flex-col gap-16">
            <div className="flex flex-col gap-4">
              <p className="font-body size-sm font-medium text-default">Dimensions</p>
              <p className="font-body size-xs text-muted">
                Set the dimensions for the layer.
              </p>
            </div>
            <div className="flex flex-col gap-12">
              <Input variant="default" label="Width" placeholder="100%" />
              <Input variant="default" label="Height" placeholder="25px" />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  },
};

/**
 * 다양한 위치
 *
 * `side` prop으로 팝오버의 표시 방향을 지정할 수 있습니다.
 */
export const Positions: Story = {
  render: function Render() {
    const [openTop, setOpenTop] = useState(false);
    const [openRight, setOpenRight] = useState(false);
    const [openBottom, setOpenBottom] = useState(false);
    const [openLeft, setOpenLeft] = useState(false);

    return (
      <div className="flex gap-16 items-center">
        <Popover open={openTop} onOpenChange={setOpenTop}>
          <PopoverTrigger asChild>
            <Button buttonStyle="secondary" size="sm" onClick={() => setOpenTop(true)}>Top</Button>
          </PopoverTrigger>
          <PopoverContent side="top" className="w-48">
            <p className="font-body size-sm text-default">Top position</p>
          </PopoverContent>
        </Popover>

        <Popover open={openRight} onOpenChange={setOpenRight}>
          <PopoverTrigger asChild>
            <Button buttonStyle="secondary" size="sm" onClick={() => setOpenRight(true)}>Right</Button>
          </PopoverTrigger>
          <PopoverContent side="right" className="w-48">
            <p className="font-body size-sm text-default">Right position</p>
          </PopoverContent>
        </Popover>

        <Popover open={openBottom} onOpenChange={setOpenBottom}>
          <PopoverTrigger asChild>
            <Button buttonStyle="secondary" size="sm" onClick={() => setOpenBottom(true)}>Bottom</Button>
          </PopoverTrigger>
          <PopoverContent side="bottom" className="w-48">
            <p className="font-body size-sm text-default">Bottom position</p>
          </PopoverContent>
        </Popover>

        <Popover open={openLeft} onOpenChange={setOpenLeft}>
          <PopoverTrigger asChild>
            <Button buttonStyle="secondary" size="sm" onClick={() => setOpenLeft(true)}>Left</Button>
          </PopoverTrigger>
          <PopoverContent side="left" className="w-48">
            <p className="font-body size-sm text-default">Left position</p>
          </PopoverContent>
        </Popover>
      </div>
    );
  },
};

/**
 * 정렬 옵션
 *
 * `align` prop으로 팝오버의 정렬 위치를 지정할 수 있습니다.
 */
export const Alignment: Story = {
  render: function Render() {
    const [openStart, setOpenStart] = useState(false);
    const [openCenter, setOpenCenter] = useState(false);
    const [openEnd, setOpenEnd] = useState(false);

    return (
      <div className="flex gap-16 items-center">
        <Popover open={openStart} onOpenChange={setOpenStart}>
          <PopoverTrigger asChild>
            <Button buttonStyle="secondary" size="sm" onClick={() => setOpenStart(true)}>Start</Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-48">
            <p className="font-body size-sm text-default">Aligned to start</p>
          </PopoverContent>
        </Popover>

        <Popover open={openCenter} onOpenChange={setOpenCenter}>
          <PopoverTrigger asChild>
            <Button buttonStyle="secondary" size="sm" onClick={() => setOpenCenter(true)}>Center</Button>
          </PopoverTrigger>
          <PopoverContent align="center" className="w-48">
            <p className="font-body size-sm text-default">Aligned to center</p>
          </PopoverContent>
        </Popover>

        <Popover open={openEnd} onOpenChange={setOpenEnd}>
          <PopoverTrigger asChild>
            <Button buttonStyle="secondary" size="sm" onClick={() => setOpenEnd(true)}>End</Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-48">
            <p className="font-body size-sm text-default">Aligned to end</p>
          </PopoverContent>
        </Popover>
      </div>
    );
  },
};

/**
 * 닫기 버튼 포함
 *
 * 팝오버 내부에 닫기 버튼을 추가할 수 있습니다.
 */
export const WithCloseButton: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button buttonStyle="secondary" onClick={() => setOpen(true)}>Open</Button>
        </PopoverTrigger>
        <PopoverContent className="w-64">
          <div className="flex flex-col gap-12">
            <p className="font-body size-sm text-default">
              This popover has a close button.
            </p>
            <Button size="sm" onClick={() => setOpen(false)}>Close</Button>
          </div>
        </PopoverContent>
      </Popover>
    );
  },
};

/**
 * 프로그래매틱 제어
 *
 * `open`과 `onOpenChange` props로 외부에서 제어할 수 있습니다.
 */
export const Programmatic: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);

    return (
      <div className="flex flex-col gap-16 items-start">
        <p className="font-body size-sm text-muted">
          Popover는 외부 상태로 제어할 수 있습니다.
        </p>
        <div className="flex gap-8">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button buttonStyle="secondary" onClick={() => setOpen(true)}>Toggle Popover</Button>
            </PopoverTrigger>
            <PopoverContent>
              <p className="font-body size-sm text-default">
                Controlled popover content
              </p>
            </PopoverContent>
          </Popover>
          <Button buttonStyle="ghost" onClick={() => setOpen(false)}>
            Close from outside
          </Button>
        </div>
      </div>
    );
  },
};

/**
 * 커스텀 너비
 *
 * className으로 팝오버의 너비를 조절할 수 있습니다.
 */
export const CustomWidth: Story = {
  render: function Render() {
    const [openNarrow, setOpenNarrow] = useState(false);
    const [openWide, setOpenWide] = useState(false);

    return (
      <div className="flex gap-16">
        <Popover open={openNarrow} onOpenChange={setOpenNarrow}>
          <PopoverTrigger asChild>
            <Button buttonStyle="secondary" size="sm" onClick={() => setOpenNarrow(true)}>Narrow</Button>
          </PopoverTrigger>
          <PopoverContent className="w-48">
            <p className="font-body size-sm text-default">Narrow popover (192px)</p>
          </PopoverContent>
        </Popover>

        <Popover open={openWide} onOpenChange={setOpenWide}>
          <PopoverTrigger asChild>
            <Button buttonStyle="secondary" size="sm" onClick={() => setOpenWide(true)}>Wide</Button>
          </PopoverTrigger>
          <PopoverContent className="w-96">
            <p className="font-body size-sm text-default">Wide popover (384px)</p>
          </PopoverContent>
        </Popover>
      </div>
    );
  },
};
