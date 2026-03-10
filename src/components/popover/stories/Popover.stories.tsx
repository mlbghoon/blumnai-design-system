import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

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
    container: {
      control: false,
      description: '[PopoverContent] Portal이 렌더링될 컨테이너 요소',
      table: {
        type: { summary: 'HTMLElement | null' },
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
          <Button buttonStyle="secondary" onClick={() => setOpen(true)}>팝오버 열기</Button>
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
          <div className="flex flex-col ds-gap-8">
            <p className="font-body size-sm font-medium text-default">팝오버 콘텐츠</p>
            <PopoverScrollArea maxHeight={args.maxHeight}>
              <p className="font-body size-sm text-muted">
                기본 팝오버 콘텐츠입니다. maxHeight가 설정되면 콘텐츠가 지정된 높이를 초과할 경우 이 영역이 스크롤됩니다.
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
          <Button buttonStyle="secondary" onClick={() => setOpen(true)}>크기 편집</Button>
        </PopoverTrigger>
        <PopoverContent className="[width:320px]">
          <div className="flex flex-col ds-gap-16">
            <div className="flex flex-col ds-gap-4">
              <p className="font-body size-sm font-medium text-default">크기</p>
              <p className="font-body size-xs text-muted">
                레이어 크기를 설정하세요.
              </p>
            </div>
            <div className="flex flex-col ds-gap-12">
              <Input variant="default" label="너비" placeholder="100%" />
              <Input variant="default" label="높이" placeholder="25px" />
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
      <div className="flex ds-gap-16 items-center">
        <Popover open={openTop} onOpenChange={setOpenTop}>
          <PopoverTrigger asChild>
            <Button buttonStyle="secondary" size="sm" onClick={() => setOpenTop(true)}>상단</Button>
          </PopoverTrigger>
          <PopoverContent side="top" className="[width:192px]">
            <p className="font-body size-sm text-default">상단 위치</p>
          </PopoverContent>
        </Popover>

        <Popover open={openRight} onOpenChange={setOpenRight}>
          <PopoverTrigger asChild>
            <Button buttonStyle="secondary" size="sm" onClick={() => setOpenRight(true)}>우측</Button>
          </PopoverTrigger>
          <PopoverContent side="right" className="[width:192px]">
            <p className="font-body size-sm text-default">우측 위치</p>
          </PopoverContent>
        </Popover>

        <Popover open={openBottom} onOpenChange={setOpenBottom}>
          <PopoverTrigger asChild>
            <Button buttonStyle="secondary" size="sm" onClick={() => setOpenBottom(true)}>하단</Button>
          </PopoverTrigger>
          <PopoverContent side="bottom" className="[width:192px]">
            <p className="font-body size-sm text-default">하단 위치</p>
          </PopoverContent>
        </Popover>

        <Popover open={openLeft} onOpenChange={setOpenLeft}>
          <PopoverTrigger asChild>
            <Button buttonStyle="secondary" size="sm" onClick={() => setOpenLeft(true)}>좌측</Button>
          </PopoverTrigger>
          <PopoverContent side="left" className="[width:192px]">
            <p className="font-body size-sm text-default">좌측 위치</p>
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
      <div className="flex ds-gap-16 items-center">
        <Popover open={openStart} onOpenChange={setOpenStart}>
          <PopoverTrigger asChild>
            <Button buttonStyle="secondary" size="sm" onClick={() => setOpenStart(true)}>시작</Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="[width:192px]">
            <p className="font-body size-sm text-default">시작 정렬</p>
          </PopoverContent>
        </Popover>

        <Popover open={openCenter} onOpenChange={setOpenCenter}>
          <PopoverTrigger asChild>
            <Button buttonStyle="secondary" size="sm" onClick={() => setOpenCenter(true)}>가운데</Button>
          </PopoverTrigger>
          <PopoverContent align="center" className="[width:192px]">
            <p className="font-body size-sm text-default">가운데 정렬</p>
          </PopoverContent>
        </Popover>

        <Popover open={openEnd} onOpenChange={setOpenEnd}>
          <PopoverTrigger asChild>
            <Button buttonStyle="secondary" size="sm" onClick={() => setOpenEnd(true)}>끝</Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="[width:192px]">
            <p className="font-body size-sm text-default">끝 정렬</p>
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
          <Button buttonStyle="secondary" onClick={() => setOpen(true)}>열기</Button>
        </PopoverTrigger>
        <PopoverContent className="[width:256px]">
          <div className="flex flex-col ds-gap-12">
            <p className="font-body size-sm text-default">
              이 팝오버는 닫기 버튼이 있습니다.
            </p>
            <Button size="sm" onClick={() => setOpen(false)}>닫기</Button>
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
      <div className="flex flex-col ds-gap-16 items-start">
        <p className="font-body size-sm text-muted">
          Popover는 외부 상태로 제어할 수 있습니다.
        </p>
        <div className="flex ds-gap-8">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button buttonStyle="secondary" onClick={() => setOpen(true)}>팝오버 토글</Button>
            </PopoverTrigger>
            <PopoverContent>
              <p className="font-body size-sm text-default">
                제어 팝오버 콘텐츠
              </p>
            </PopoverContent>
          </Popover>
          <Button buttonStyle="ghost" onClick={() => setOpen(false)}>
            외부에서 닫기
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
      <div className="flex ds-gap-16">
        <Popover open={openNarrow} onOpenChange={setOpenNarrow}>
          <PopoverTrigger asChild>
            <Button buttonStyle="secondary" size="sm" onClick={() => setOpenNarrow(true)}>좁게</Button>
          </PopoverTrigger>
          <PopoverContent className="[width:192px]">
            <p className="font-body size-sm text-default">좁은 팝오버 (192px)</p>
          </PopoverContent>
        </Popover>

        <Popover open={openWide} onOpenChange={setOpenWide}>
          <PopoverTrigger asChild>
            <Button buttonStyle="secondary" size="sm" onClick={() => setOpenWide(true)}>넓게</Button>
          </PopoverTrigger>
          <PopoverContent className="[width:384px]">
            <p className="font-body size-sm text-default">넓은 팝오버 (384px)</p>
          </PopoverContent>
        </Popover>
      </div>
    );
  },
};
