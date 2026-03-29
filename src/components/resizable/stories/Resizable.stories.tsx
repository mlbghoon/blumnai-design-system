import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { usePanelRef } from 'react-resizable-panels';

import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '../Resizable';
import type { ResizablePanelGroupProps, ResizableHandleProps } from '../Resizable.types';

interface ResizableStoryProps {
  orientation?: ResizablePanelGroupProps['orientation'];
  withHandle?: ResizableHandleProps['withHandle'];
  variant?: ResizableHandleProps['variant'];
  collapseButton?: ResizableHandleProps['collapseButton'];
  collapseButtonPosition?: ResizableHandleProps['collapseButtonPosition'];
  defaultSize?: number;
  minSize?: string;
  maxSize?: string;
  collapsible?: boolean;
  collapsedSize?: string;
}

const meta: Meta<ResizableStoryProps> = {
  title: 'Layout/Resizable',
  component: ResizablePanelGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: '[ResizablePanelGroup] 패널 방향',
      table: {
        type: { summary: "'horizontal' | 'vertical'" },
        defaultValue: { summary: "'horizontal'" },
        category: 'ResizablePanelGroup',
      },
    },
    withHandle: {
      control: 'boolean',
      description: '[ResizableHandle] 핸들 UI 표시 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'ResizableHandle',
      },
    },
    variant: {
      control: 'select',
      options: ['line', 'pill', 'dots', 'hidden'],
      description: '[ResizableHandle] 핸들 스타일 변형',
      table: {
        type: { summary: "'line' | 'pill' | 'dots' | 'hidden'" },
        defaultValue: { summary: "'line'" },
        category: 'ResizableHandle',
      },
    },
    collapseButton: {
      control: 'select',
      options: [undefined, 'before', 'after'],
      description: '[ResizableHandle] 패널 접기 버튼 설정. before: 핸들 앞 패널을 접음, after: 핸들 뒤 패널을 접음',
      table: {
        type: { summary: "'before' | 'after'" },
        defaultValue: { summary: 'undefined' },
        category: 'ResizableHandle',
      },
    },
    collapseButtonPosition: {
      control: 'text',
      description: '[ResizableHandle] 패널 접기 버튼 위치. start/center/end 또는 픽셀 값(숫자)',
      table: {
        type: { summary: "'start' | 'center' | 'end' | number" },
        defaultValue: { summary: "'center'" },
        category: 'ResizableHandle',
      },
    },
    defaultSize: {
      control: { type: 'number', min: 0, max: 100 },
      description: '[ResizablePanel] 첫 번째 패널의 초기 크기 (%, 0~100)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '50' },
        category: 'ResizablePanel',
      },
    },
    minSize: {
      control: 'text',
      description: '[ResizablePanel] 첫 번째 패널의 최소 크기 (예: "15%", "100px")',
      table: {
        type: { summary: 'string' },
        category: 'ResizablePanel',
      },
    },
    maxSize: {
      control: 'text',
      description: '[ResizablePanel] 첫 번째 패널의 최대 크기 (예: "50%", "300px")',
      table: {
        type: { summary: 'string' },
        category: 'ResizablePanel',
      },
    },
    collapsible: {
      control: 'boolean',
      description: '[ResizablePanel] 첫 번째 패널의 접기 가능 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'ResizablePanel',
      },
    },
    collapsedSize: {
      control: 'text',
      description: '[ResizablePanel] 패널이 접혔을 때 크기 (예: "0%", "50px")',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '"0%"' },
        category: 'ResizablePanel',
      },
    },
  },
};

export default meta;
type Story = StoryObj<ResizableStoryProps>;

const PanelContent = ({ children }: { children: React.ReactNode }) => (
  <div className="flex h-full items-center justify-center padding-16 font-body size-sm text-muted">
    {children}
  </div>
);

/**
 * 기본 Resizable 패널
 *
 * 이 스토리에서 컴포넌트의 모든 props를 테스트할 수 있습니다.
 * collapseButton을 설정하면 패널 접기 버튼이 표시됩니다.
 */
export const Default: Story = {
  args: {
    orientation: 'horizontal',
    withHandle: true,
    variant: 'line',
    collapseButton: undefined,
    collapseButtonPosition: 'center',
    defaultSize: 50,
    minSize: undefined,
    maxSize: undefined,
    collapsible: false,
    collapsedSize: '0%',
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const panelRef = usePanelRef();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const orientation = args.orientation ?? 'horizontal';
    const withHandle = args.withHandle ?? true;
    const variant = args.variant ?? 'line';
    const collapseButton = args.collapseButton;
    const rawPosition = args.collapseButtonPosition ?? 'center';
    const collapseButtonPosition: 'start' | 'center' | 'end' | number =
      rawPosition === 'start' || rawPosition === 'center' || rawPosition === 'end'
        ? rawPosition
        : !isNaN(Number(rawPosition))
          ? Number(rawPosition)
          : 'center';

    const defaultSize = args.defaultSize ?? 50;
    const minSize = args.minSize || undefined;
    const maxSize = args.maxSize || undefined;
    const collapsible = args.collapsible || collapseButton === 'before';
    const collapsedSize = args.collapsedSize || '0%';

    return (
      <ResizablePanelGroup
        orientation={orientation}
        className="min-h-[200px] max-w-md rounded-lg border-default"
      >
        <ResizablePanel
          panelRef={collapseButton === 'before' || collapsible ? panelRef : undefined}
          defaultSize={defaultSize}
          minSize={minSize}
          maxSize={maxSize}
          collapsible={collapsible}
          collapsedSize={collapsedSize}
          onResize={(size) => {
            if (collapsible) {
              setIsCollapsed(size.asPercentage === 0);
            }
          }}
        >
          <PanelContent>패널 1</PanelContent>
        </ResizablePanel>
        <ResizableHandle
          withHandle={withHandle}
          variant={variant}
          collapseButton={collapseButton}
          collapseButtonPosition={collapseButtonPosition}
          panelRef={collapseButton || collapsible ? panelRef : undefined}
          isCollapsed={isCollapsed}
        />
        <ResizablePanel
          panelRef={collapseButton === 'after' ? panelRef : undefined}
          defaultSize={100 - defaultSize}
          collapsible={collapseButton === 'after'}
          collapsedSize="0%"
          onResize={(size) => {
            if (collapseButton === 'after') {
              setIsCollapsed(size.asPercentage === 0);
            }
          }}
        >
          <PanelContent>패널 2</PanelContent>
        </ResizablePanel>
      </ResizablePanelGroup>
    );
  },
};

/**
 * 핸들 스타일 비교
 *
 * 4가지 핸들 스타일을 비교합니다.
 */
export const HandleVariants: Story = {
  render: () => (
    <div className="flex flex-col ds-gap-24">
      <div>
        <p className="font-body size-sm text-muted margin-b-8">선 (기본) - 두꺼운 선 핸들</p>
        <ResizablePanelGroup
          orientation="horizontal"
          className="min-h-[120px] max-w-md rounded-lg border-default"
        >
          <ResizablePanel defaultSize={50}>
            <PanelContent>패널 1</PanelContent>
          </ResizablePanel>
          <ResizableHandle withHandle variant="line" />
          <ResizablePanel defaultSize={50}>
            <PanelContent>패널 2</PanelContent>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      <div>
        <p className="font-body size-sm text-muted margin-b-8">알약 - 둥근 알약 모양 핸들</p>
        <ResizablePanelGroup
          orientation="horizontal"
          className="min-h-[120px] max-w-md rounded-lg border-default"
        >
          <ResizablePanel defaultSize={50}>
            <PanelContent>패널 1</PanelContent>
          </ResizablePanel>
          <ResizableHandle withHandle variant="pill" />
          <ResizablePanel defaultSize={50}>
            <PanelContent>패널 2</PanelContent>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      <div>
        <p className="font-body size-sm text-muted margin-b-8">점 - 점 그리드 핸들</p>
        <ResizablePanelGroup
          orientation="horizontal"
          className="min-h-[120px] max-w-md rounded-lg border-default"
        >
          <ResizablePanel defaultSize={50}>
            <PanelContent>패널 1</PanelContent>
          </ResizablePanel>
          <ResizableHandle withHandle variant="dots" />
          <ResizablePanel defaultSize={50}>
            <PanelContent>패널 2</PanelContent>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      <div>
        <p className="font-body size-sm text-muted margin-b-8">숨김 - 호버 시에만 표시</p>
        <ResizablePanelGroup
          orientation="horizontal"
          className="min-h-[120px] max-w-md rounded-lg border-default"
        >
          <ResizablePanel defaultSize={50}>
            <PanelContent>패널 1</PanelContent>
          </ResizablePanel>
          <ResizableHandle variant="hidden" />
          <ResizablePanel defaultSize={50}>
            <PanelContent>패널 2</PanelContent>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  ),
};

/**
 * 세로 레이아웃
 *
 * orientation="vertical"로 패널을 수직으로 배치합니다.
 */
export const VerticalLayout: Story = {
  render: () => (
    <ResizablePanelGroup
      orientation="vertical"
      className="min-h-[400px] max-w-md rounded-lg border-default"
    >
      <ResizablePanel defaultSize={30}>
        <PanelContent>헤더 패널</PanelContent>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={70}>
        <PanelContent>콘텐츠 패널</PanelContent>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

/**
 * 핸들 표시
 *
 * withHandle prop으로 드래그 핸들을 표시합니다.
 */
export const WithHandle: Story = {
  render: () => (
    <ResizablePanelGroup
      orientation="horizontal"
      className="min-h-[200px] max-w-md rounded-lg border-default"
    >
      <ResizablePanel defaultSize={50}>
        <PanelContent>패널 1</PanelContent>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <PanelContent>패널 2</PanelContent>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

/**
 * 3개 패널
 *
 * 여러 개의 패널을 나란히 배치합니다.
 */
export const ThreePanels: Story = {
  render: () => (
    <ResizablePanelGroup
      orientation="horizontal"
      className="min-h-[200px] max-w-2xl rounded-lg border-default"
    >
      <ResizablePanel defaultSize={25} minSize="15%">
        <PanelContent>좌측</PanelContent>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <PanelContent>가운데</PanelContent>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={25} minSize="15%">
        <PanelContent>우측</PanelContent>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

/**
 * 접을 수 있는 패널
 *
 * collapsible prop으로 패널을 접을 수 있습니다.
 */
export const CollapsiblePanel: Story = {
  render: () => (
    <ResizablePanelGroup
      orientation="horizontal"
      className="min-h-[200px] max-w-md rounded-lg border-default"
    >
      <ResizablePanel
        defaultSize={30}
        minSize="15%"
        collapsible
        collapsedSize="0%"
      >
        <PanelContent>접을 수 있는</PanelContent>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={70}>
        <PanelContent>메인 콘텐츠</PanelContent>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

/**
 * 중첩 패널
 *
 * 패널 안에 또 다른 ResizablePanelGroup을 배치할 수 있습니다.
 */
export const NestedPanels: Story = {
  render: () => (
    <ResizablePanelGroup
      orientation="horizontal"
      className="min-h-[400px] max-w-2xl rounded-lg border-default"
    >
      <ResizablePanel defaultSize={30} minSize="20%">
        <PanelContent>사이드바</PanelContent>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={70}>
        <ResizablePanelGroup orientation="vertical">
          <ResizablePanel defaultSize={60}>
            <PanelContent>메인 콘텐츠</PanelContent>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={40}>
            <PanelContent>하단 패널</PanelContent>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

/**
 * 접기 버튼
 *
 * collapseButton prop으로 패널을 접는 버튼을 표시합니다.
 * panelRef와 함께 사용하며, collapsible 패널에 적용됩니다.
 */
export const WithCollapseButton: Story = {
  render: function Render() {
    const sidebarRef = usePanelRef();
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
      <ResizablePanelGroup
        orientation="horizontal"
        className="min-h-[200px] max-w-md rounded-lg border-default"
      >
        <ResizablePanel
          panelRef={sidebarRef}
          defaultSize={30}
          minSize="15%"
          collapsible
          collapsedSize="0%"
          onResize={(size) => {
            setIsCollapsed(size.asPercentage === 0);
          }}
        >
          <PanelContent>접힘 가능 패널</PanelContent>
        </ResizablePanel>
        <ResizableHandle
          withHandle
          collapseButton="before"
          panelRef={sidebarRef}
          isCollapsed={isCollapsed}
        />
        <ResizablePanel defaultSize={70}>
          <PanelContent>메인 콘텐츠</PanelContent>
        </ResizablePanel>
      </ResizablePanelGroup>
    );
  },
};

/**
 * 접기 버튼 위치
 *
 * collapseButtonPosition prop으로 버튼 위치를 조정합니다.
 * - start: 시작 위치 (horizontal: 상단, vertical: 좌측)
 * - center: 중앙 (기본값)
 * - end: 끝 위치 (horizontal: 하단, vertical: 우측)
 * - number: 픽셀 값으로 직접 지정
 */
export const CollapseButtonPositions: Story = {
  render: function Render() {
    const topRef = usePanelRef();
    const centerRef = usePanelRef();
    const bottomRef = usePanelRef();
    const customRef = usePanelRef();
    const [topCollapsed, setTopCollapsed] = useState(false);
    const [centerCollapsed, setCenterCollapsed] = useState(false);
    const [bottomCollapsed, setBottomCollapsed] = useState(false);
    const [customCollapsed, setCustomCollapsed] = useState(false);

    return (
      <div className="flex flex-col ds-gap-24">
        <div>
          <p className="font-body size-sm text-muted margin-b-8">position=&quot;start&quot; (상단)</p>
          <ResizablePanelGroup
            orientation="horizontal"
            className="min-h-[150px] max-w-md rounded-lg border-default"
          >
            <ResizablePanel
              panelRef={topRef}
              defaultSize={30}
              collapsible
              collapsedSize="0%"
              onResize={(size) => setTopCollapsed(size.asPercentage === 0)}
            >
              <PanelContent>Panel</PanelContent>
            </ResizablePanel>
            <ResizableHandle
              collapseButton="before"
              collapseButtonPosition="start"
              panelRef={topRef}
              isCollapsed={topCollapsed}
            />
            <ResizablePanel defaultSize={70}>
              <PanelContent>Content</PanelContent>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>

        <div>
          <p className="font-body size-sm text-muted margin-b-8">position=&quot;center&quot; (중앙, 기본값)</p>
          <ResizablePanelGroup
            orientation="horizontal"
            className="min-h-[150px] max-w-md rounded-lg border-default"
          >
            <ResizablePanel
              panelRef={centerRef}
              defaultSize={30}
              collapsible
              collapsedSize="0%"
              onResize={(size) => setCenterCollapsed(size.asPercentage === 0)}
            >
              <PanelContent>Panel</PanelContent>
            </ResizablePanel>
            <ResizableHandle
              collapseButton="before"
              collapseButtonPosition="center"
              panelRef={centerRef}
              isCollapsed={centerCollapsed}
            />
            <ResizablePanel defaultSize={70}>
              <PanelContent>Content</PanelContent>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>

        <div>
          <p className="font-body size-sm text-muted margin-b-8">position=&quot;end&quot; (하단)</p>
          <ResizablePanelGroup
            orientation="horizontal"
            className="min-h-[150px] max-w-md rounded-lg border-default"
          >
            <ResizablePanel
              panelRef={bottomRef}
              defaultSize={30}
              collapsible
              collapsedSize="0%"
              onResize={(size) => setBottomCollapsed(size.asPercentage === 0)}
            >
              <PanelContent>Panel</PanelContent>
            </ResizablePanel>
            <ResizableHandle
              collapseButton="before"
              collapseButtonPosition="end"
              panelRef={bottomRef}
              isCollapsed={bottomCollapsed}
            />
            <ResizablePanel defaultSize={70}>
              <PanelContent>Content</PanelContent>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>

        <div>
          <p className="font-body size-sm text-muted margin-b-8">position={'{48}'} (커스텀 픽셀 값)</p>
          <ResizablePanelGroup
            orientation="horizontal"
            className="min-h-[150px] max-w-md rounded-lg border-default"
          >
            <ResizablePanel
              panelRef={customRef}
              defaultSize={30}
              collapsible
              collapsedSize="0%"
              onResize={(size) => setCustomCollapsed(size.asPercentage === 0)}
            >
              <PanelContent>Panel</PanelContent>
            </ResizablePanel>
            <ResizableHandle
              collapseButton="before"
              collapseButtonPosition={48}
              panelRef={customRef}
              isCollapsed={customCollapsed}
            />
            <ResizablePanel defaultSize={70}>
              <PanelContent>Content</PanelContent>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    );
  },
};

/**
 * 사이드바 레이아웃
 *
 * 일반적인 사이드바 + 콘텐츠 레이아웃 패턴입니다.
 * 접기 버튼으로 사이드바를 접을 수 있습니다.
 */
export const SidebarLayout: Story = {
  render: function Render() {
    const sidebarRef = usePanelRef();
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
      <ResizablePanelGroup
        orientation="horizontal"
        className="min-h-[400px] rounded-lg border-default"
      >
        <ResizablePanel
          panelRef={sidebarRef}
          defaultSize={20}
          minSize="15%"
          maxSize="40%"
          collapsible
          collapsedSize="0%"
          onResize={(size) => {
            setIsCollapsed(size.asPercentage === 0);
          }}
        >
          <div className="flex h-full flex-col">
            <div className="padding-12 border-b-default">
              <p className="font-body size-sm font-medium text-default">네비게이션</p>
            </div>
            <div className="flex-1 padding-12">
              <ul className="flex flex-col ds-gap-8">
                <li className="font-body size-sm text-muted hover:text-default cursor-pointer">대시보드</li>
                <li className="font-body size-sm text-muted hover:text-default cursor-pointer">프로젝트</li>
                <li className="font-body size-sm text-muted hover:text-default cursor-pointer">설정</li>
                <li className="font-body size-sm text-muted hover:text-default cursor-pointer">도움말</li>
              </ul>
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle
          collapseButton="before"
          panelRef={sidebarRef}
          isCollapsed={isCollapsed}
        />
        <ResizablePanel defaultSize={80}>
          <div className="flex h-full flex-col">
            <div className="padding-12 border-b-default">
              <p className="font-body size-sm font-medium text-default">콘텐츠 영역</p>
            </div>
            <div className="flex-1 padding-16">
              <p className="font-body size-sm text-muted">
                사이드바를 드래그하여 크기를 조절할 수 있습니다.
                접기 버튼을 클릭하여 사이드바를 접을 수 있습니다.
              </p>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    );
  },
};

/**
 * 수직 핸들 표시
 *
 * orientation="vertical"과 withHandle을 함께 사용합니다.
 */
export const VerticalWithHandle: Story = {
  render: () => (
    <ResizablePanelGroup
      orientation="vertical"
      className="min-h-[400px] max-w-md rounded-lg border-default"
    >
      <ResizablePanel defaultSize={30}>
        <PanelContent>상단 패널</PanelContent>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={40}>
        <PanelContent>중간 패널</PanelContent>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={30}>
        <PanelContent>하단 패널</PanelContent>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

/**
 * 최소/최대 크기 제한
 *
 * minSize와 maxSize로 패널 크기를 제한합니다.
 */
export const WithSizeConstraints: Story = {
  render: () => (
    <ResizablePanelGroup
      orientation="horizontal"
      className="min-h-[200px] max-w-md rounded-lg border-default"
    >
      <ResizablePanel defaultSize={30} minSize="20%" maxSize="50%">
        <PanelContent>최소 20% / 최대 50%</PanelContent>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={70}>
        <PanelContent>유연</PanelContent>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

/**
 * 수직 접기 버튼
 *
 * orientation="vertical"과 collapseButton을 함께 사용합니다.
 */
export const VerticalCollapseButton: Story = {
  render: function Render() {
    const topPanelRef = usePanelRef();
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
      <ResizablePanelGroup
        orientation="vertical"
        className="min-h-[400px] max-w-md rounded-lg border-default"
      >
        <ResizablePanel
          panelRef={topPanelRef}
          defaultSize={30}
          minSize="10%"
          collapsible
          collapsedSize="0%"
          onResize={(size) => {
            setIsCollapsed(size.asPercentage === 0);
          }}
        >
          <PanelContent>상단 패널 (접힘 가능)</PanelContent>
        </ResizablePanel>
        <ResizableHandle
          withHandle
          collapseButton="before"
          panelRef={topPanelRef}
          isCollapsed={isCollapsed}
        />
        <ResizablePanel defaultSize={70}>
          <PanelContent>하단 패널</PanelContent>
        </ResizablePanel>
      </ResizablePanelGroup>
    );
  },
};
