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
      description: '[Popover] 처음 렌더링될 때 팝오버가 열린 상태로 시작할지 설정합니다. 외부 상태 관리 없이 사용하는 비제어 모드에서 사용합니다',
      table: {
        type: { summary: 'boolean' },
        category: 'Popover',
      },
    },
    open: {
      control: 'boolean',
      description: '[Popover] 팝오버의 열림/닫힘 상태를 외부에서 직접 제어합니다. onOpenChange와 함께 사용하여 상태를 관리합니다',
      table: {
        type: { summary: 'boolean' },
        category: 'Popover',
      },
    },
    onOpenChange: {
      action: 'openChange',
      description: '[Popover] 팝오버가 열리거나 닫힐 때 호출되는 콜백 함수입니다. open prop과 함께 사용하여 상태를 동기화합니다',
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
      description: '[PopoverContent] 트리거 버튼을 기준으로 팝오버가 나타나는 방향을 설정합니다 (top: 위, right: 오른쪽, bottom: 아래, left: 왼쪽)',
      table: {
        type: { summary: "'top' | 'right' | 'bottom' | 'left'" },
        defaultValue: { summary: 'bottom' },
        category: 'PopoverContent',
      },
    },
    sideOffset: {
      control: 'number',
      description: '[PopoverContent] 트리거 버튼과 팝오버 사이의 간격을 픽셀 단위로 설정합니다',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '4' },
        category: 'PopoverContent',
      },
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: '[PopoverContent] 트리거를 기준으로 팝오버의 정렬 위치를 설정합니다 (start: 시작점, center: 가운데, end: 끝점)',
      table: {
        type: { summary: "'start' | 'center' | 'end'" },
        defaultValue: { summary: 'center' },
        category: 'PopoverContent',
      },
    },
    alignOffset: {
      control: 'number',
      description: '[PopoverContent] 정렬 축에서의 추가 오프셋을 픽셀 단위로 설정합니다',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
        category: 'PopoverContent',
      },
    },
    avoidCollisions: {
      control: 'boolean',
      description: '[PopoverContent] true로 설정하면 팝오버가 화면 경계를 벗어나지 않도록 자동으로 위치를 조정합니다',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'PopoverContent',
      },
    },
    collisionPadding: {
      control: 'number',
      description: '[PopoverContent] 화면 경계와의 충돌을 감지할 때 적용할 여백을 픽셀 단위로 설정합니다',
      table: {
        type: { summary: 'number | Padding' },
        defaultValue: { summary: '0' },
        category: 'PopoverContent',
      },
    },
    sticky: {
      control: 'select',
      options: ['partial', 'always'],
      description: '[PopoverContent] 스크롤 시 팝오버의 정렬 축 고정 동작을 설정합니다. partial(부분 고정), always(항상 고정) 중 선택할 수 있습니다',
      table: {
        type: { summary: "'partial' | 'always'" },
        defaultValue: { summary: 'partial' },
        category: 'PopoverContent',
      },
    },
    hideWhenDetached: {
      control: 'boolean',
      description: '[PopoverContent] true로 설정하면 트리거 요소가 스크롤로 인해 화면에서 벗어났을 때 팝오버를 자동으로 숨깁니다',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'PopoverContent',
      },
    },
    forceMount: {
      control: 'boolean',
      description: '[PopoverContent] true로 설정하면 팝오버가 닫혀 있어도 DOM에 유지됩니다. 진입/퇴장 애니메이션 제어 시 사용합니다',
      table: {
        type: { summary: 'boolean' },
        category: 'PopoverContent',
      },
    },
    className: {
      control: 'text',
      description: '[PopoverContent] 팝오버 콘텐츠 영역에 추가할 CSS 클래스명입니다',
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
                기본 팝오버의 콘텐츠입니다. maxHeight를 설정하면 콘텐츠가 지정된 높이를 초과할 때 이 영역이 스크롤됩니다.
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
              <p className="font-body size-sm font-medium text-default">크기 설정</p>
              <p className="font-body size-xs text-muted">
                레이어의 크기를 설정합니다.
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
            <Button buttonStyle="secondary" size="sm" onClick={() => setOpenTop(true)}>Top</Button>
          </PopoverTrigger>
          <PopoverContent side="top" className="[width:192px]">
            <p className="font-body size-sm text-default">위쪽 위치</p>
          </PopoverContent>
        </Popover>

        <Popover open={openRight} onOpenChange={setOpenRight}>
          <PopoverTrigger asChild>
            <Button buttonStyle="secondary" size="sm" onClick={() => setOpenRight(true)}>Right</Button>
          </PopoverTrigger>
          <PopoverContent side="right" className="[width:192px]">
            <p className="font-body size-sm text-default">오른쪽 위치</p>
          </PopoverContent>
        </Popover>

        <Popover open={openBottom} onOpenChange={setOpenBottom}>
          <PopoverTrigger asChild>
            <Button buttonStyle="secondary" size="sm" onClick={() => setOpenBottom(true)}>Bottom</Button>
          </PopoverTrigger>
          <PopoverContent side="bottom" className="[width:192px]">
            <p className="font-body size-sm text-default">아래쪽 위치</p>
          </PopoverContent>
        </Popover>

        <Popover open={openLeft} onOpenChange={setOpenLeft}>
          <PopoverTrigger asChild>
            <Button buttonStyle="secondary" size="sm" onClick={() => setOpenLeft(true)}>Left</Button>
          </PopoverTrigger>
          <PopoverContent side="left" className="[width:192px]">
            <p className="font-body size-sm text-default">왼쪽 위치</p>
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
            <Button buttonStyle="secondary" size="sm" onClick={() => setOpenStart(true)}>Start</Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="[width:192px]">
            <p className="font-body size-sm text-default">시작점 정렬</p>
          </PopoverContent>
        </Popover>

        <Popover open={openCenter} onOpenChange={setOpenCenter}>
          <PopoverTrigger asChild>
            <Button buttonStyle="secondary" size="sm" onClick={() => setOpenCenter(true)}>Center</Button>
          </PopoverTrigger>
          <PopoverContent align="center" className="[width:192px]">
            <p className="font-body size-sm text-default">가운데 정렬</p>
          </PopoverContent>
        </Popover>

        <Popover open={openEnd} onOpenChange={setOpenEnd}>
          <PopoverTrigger asChild>
            <Button buttonStyle="secondary" size="sm" onClick={() => setOpenEnd(true)}>End</Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="[width:192px]">
            <p className="font-body size-sm text-default">끝점 정렬</p>
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
        <PopoverContent className="[width:256px]">
          <div className="flex flex-col ds-gap-12">
            <p className="font-body size-sm text-default">
              이 팝오버에는 닫기 버튼이 있습니다.
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
                제어 모드 팝오버 콘텐츠
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
            <Button buttonStyle="secondary" size="sm" onClick={() => setOpenNarrow(true)}>Narrow</Button>
          </PopoverTrigger>
          <PopoverContent className="[width:192px]">
            <p className="font-body size-sm text-default">좁은 팝오버 (192px)</p>
          </PopoverContent>
        </Popover>

        <Popover open={openWide} onOpenChange={setOpenWide}>
          <PopoverTrigger asChild>
            <Button buttonStyle="secondary" size="sm" onClick={() => setOpenWide(true)}>Wide</Button>
          </PopoverTrigger>
          <PopoverContent className="[width:384px]">
            <p className="font-body size-sm text-default">넓은 팝오버 (384px)</p>
          </PopoverContent>
        </Popover>
      </div>
    );
  },
};
