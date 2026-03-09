import type { Meta, StoryObj } from '@storybook/react-vite';

import { TooltipTrigger } from './TooltipTrigger';
import { AdvancedTooltip } from './AdvancedTooltip';
import { Button } from '../../button/Button';

const meta: Meta<typeof TooltipTrigger> = {
  title: 'DataDisplay/Tooltip/TooltipTrigger',
  component: TooltipTrigger,
  parameters: {
    layout: 'centered',
    controls: { disable: true },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: false,
      description: '마우스를 올리면 툴팁이 표시되는 트리거 요소입니다. 버튼, 아이콘 등 React 엘리먼트를 전달합니다',
      table: {
        type: { summary: 'ReactElement' },
      },
    },
    content: {
      control: 'text',
      description: '툴팁에 표시할 내용입니다. 간단한 텍스트 문자열 또는 AdvancedTooltip 같은 React 컴포넌트를 전달할 수 있습니다',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    badge: {
      control: 'text',
      description: '툴팁 텍스트 옆에 작은 배지로 표시되는 텍스트입니다. 키보드 단축키를 표시할 때 유용합니다 (예: "/")',
      table: {
        type: { summary: 'string' },
      },
    },
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right', 'top-start', 'top-end', 'bottom-start', 'bottom-end'],
      description: '트리거 요소를 기준으로 툴팁이 나타나는 위치를 설정합니다. top(위), bottom(아래), left(왼쪽), right(오른쪽) 및 세부 정렬을 선택할 수 있습니다',
      table: {
        type: { summary: 'Placement' },
        defaultValue: { summary: 'top' },
      },
    },
    delay: {
      control: 'number',
      description: '마우스를 올린 후 툴팁이 나타나기까지의 지연 시간을 밀리초(ms) 단위로 설정합니다',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '200' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'true로 설정하면 마우스를 올려도 툴팁이 표시되지 않습니다',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    maxWidth: {
      control: 'number',
      description: '툴팁의 최대 너비를 픽셀 단위로 설정합니다. 기본값은 240px이며, 넓은 콘텐츠가 필요한 경우 값을 늘릴 수 있습니다',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '240' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TooltipTrigger>;

/**
 * 기본 TooltipTrigger
 *
 * 호버 시 툴팁을 표시하는 래퍼 컴포넌트입니다.
 */
export const Default: Story = {
  args: {
    content: '툴팁 텍스트',
    placement: 'top',
    delay: 200,
    disabled: false,
    maxWidth: 240,
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    return (
      <TooltipTrigger {...args}>
        <Button buttonStyle="secondary">마우스를 올려보세요</Button>
      </TooltipTrigger>
    );
  },
};

/**
 * 배지가 있는 툴팁
 *
 * 키보드 단축키 등을 표시할 때 사용합니다.
 */
export const WithBadge: Story = {
  render: () => (
    <TooltipTrigger content="검색" badge="/">
      <Button buttonStyle="secondary">검색</Button>
    </TooltipTrigger>
  ),
};

/**
 * 다양한 위치
 */
export const Placements: Story = {
  render: () => (
    <div className="flex flex-col ds-gap-24 items-center">
      <div className="flex ds-gap-16">
        <TooltipTrigger content="위쪽 위치" placement="top">
          <Button buttonStyle="secondary">Top</Button>
        </TooltipTrigger>
        <TooltipTrigger content="아래쪽 위치" placement="bottom">
          <Button buttonStyle="secondary">Bottom</Button>
        </TooltipTrigger>
      </div>
      <div className="flex ds-gap-16">
        <TooltipTrigger content="왼쪽 위치" placement="left">
          <Button buttonStyle="secondary">Left</Button>
        </TooltipTrigger>
        <TooltipTrigger content="오른쪽 위치" placement="right">
          <Button buttonStyle="secondary">Right</Button>
        </TooltipTrigger>
      </div>
    </div>
  ),
};

/**
 * 넓은 너비 (DataGrid/Table용)
 *
 * 테이블 셀에서 긴 텍스트를 표시할 때 사용합니다.
 */
export const WideTooltip: Story = {
  render: () => (
    <div className="flex ds-gap-16">
      <TooltipTrigger content="기본 너비 툴팁 (240px)" maxWidth={240}>
        <Button buttonStyle="secondary">기본 (240px)</Button>
      </TooltipTrigger>
      <TooltipTrigger content="테이블 셀용 넓은 툴팁 (400px) — 긴 콘텐츠 표시에 유용합니다" maxWidth={400}>
        <Button buttonStyle="secondary">넓게 (400px)</Button>
      </TooltipTrigger>
    </div>
  ),
};

/**
 * 복잡한 콘텐츠 (AdvancedTooltip)
 *
 * 차트 등에서 상세 정보를 표시할 때 사용합니다.
 */
export const WithAdvancedContent: Story = {
  render: () => (
    <TooltipTrigger
      content={
        <AdvancedTooltip
          items={[
            { type: 'label', label: '매출 현황' },
            { type: 'divider' },
            { type: 'item', label: '매출', caption: '₩12,500,000', indicatorColor: '#3b82f6' },
            { type: 'item', label: '수익', caption: '₩4,200,000', indicatorColor: '#22c55e' },
            { type: 'item', label: '비용', caption: '₩8,300,000', indicatorColor: '#ef4444' },
          ]}
        />
      }
    >
      <Button buttonStyle="secondary">차트 데이터 보기</Button>
    </TooltipTrigger>
  ),
};

/**
 * 비활성화 상태
 */
export const Disabled: Story = {
  render: () => (
    <TooltipTrigger content="이 툴팁은 비활성화되었습니다" disabled>
      <Button buttonStyle="secondary">비활성화된 툴팁</Button>
    </TooltipTrigger>
  ),
};

/**
 * 지연 시간 조절
 */
export const CustomDelay: Story = {
  render: () => (
    <div className="flex ds-gap-16">
      <TooltipTrigger content="즉시 (0ms)" delay={0}>
        <Button buttonStyle="secondary">지연 없음</Button>
      </TooltipTrigger>
      <TooltipTrigger content="기본 (200ms)" delay={200}>
        <Button buttonStyle="secondary">기본 지연</Button>
      </TooltipTrigger>
      <TooltipTrigger content="느리게 (500ms)" delay={500}>
        <Button buttonStyle="secondary">느린 지연</Button>
      </TooltipTrigger>
    </div>
  ),
};
