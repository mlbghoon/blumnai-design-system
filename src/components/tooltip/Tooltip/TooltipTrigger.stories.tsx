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
      description: '툴팁을 트리거하는 요소',
      table: {
        type: { summary: 'ReactElement' },
      },
    },
    content: {
      control: 'text',
      description: '툴팁에 표시할 내용 (문자열 또는 ReactNode)',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    badge: {
      control: 'text',
      description: '배지 텍스트 (간단한 Tooltip과 함께 사용)',
      table: {
        type: { summary: 'string' },
      },
    },
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right', 'top-start', 'top-end', 'bottom-start', 'bottom-end'],
      description: '툴팁 위치',
      table: {
        type: { summary: 'Placement' },
        defaultValue: { summary: 'top' },
      },
    },
    delay: {
      control: 'number',
      description: '호버 지연 시간 (ms)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '200' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '툴팁 비활성화 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    maxWidth: {
      control: 'number',
      description: '툴팁 최대 너비 (px)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '240' },
      },
    },
    sideOffset: {
      control: 'number',
      description: '메인 축 오프셋 — 트리거와 툴팁 사이의 간격 (px)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '8' },
      },
    },
    alignOffset: {
      control: 'number',
      description: '크로스 축 오프셋 — 정렬 방향으로의 위치 조정 (px)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    width: {
      control: 'number',
      description: '툴팁의 고정 너비 (px). 설정 시 툴팁이 해당 너비로 고정됩니다',
      table: {
        type: { summary: 'number' },
      },
    },
    minWidth: {
      control: 'number',
      description: '툴팁의 최소 너비 (px). 콘텐츠가 짧아도 최소 너비를 유지합니다',
      table: {
        type: { summary: 'number' },
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
    sideOffset: 8,
    alignOffset: 0,
    width: undefined,
    minWidth: undefined,
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    return (
      <TooltipTrigger
        content={args.content}
        placement={args.placement}
        delay={args.delay}
        disabled={args.disabled}
        maxWidth={args.maxWidth}
        sideOffset={args.sideOffset}
        alignOffset={args.alignOffset}
        width={args.width}
        minWidth={args.minWidth}
      >
        <Button buttonStyle="secondary">호버하세요</Button>
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
        <TooltipTrigger content="상단 위치" placement="top">
          <Button buttonStyle="secondary">상단</Button>
        </TooltipTrigger>
        <TooltipTrigger content="하단 위치" placement="bottom">
          <Button buttonStyle="secondary">하단</Button>
        </TooltipTrigger>
      </div>
      <div className="flex ds-gap-16">
        <TooltipTrigger content="좌측 위치" placement="left">
          <Button buttonStyle="secondary">좌측</Button>
        </TooltipTrigger>
        <TooltipTrigger content="우측 위치" placement="right">
          <Button buttonStyle="secondary">우측</Button>
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
      <TooltipTrigger content="테이블 셀용 넓은 툴팁 (400px) — 긴 콘텐츠 표시에 유용합니다." maxWidth={400}>
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
            { type: 'label', label: '매출 개요' },
            { type: 'divider' },
            { type: 'item', label: '매출액', caption: '$12,500', indicatorColor: '#3b82f6' },
            { type: 'item', label: '순이익', caption: '$4,200', indicatorColor: '#22c55e' },
            { type: 'item', label: '지출', caption: '$8,300', indicatorColor: '#ef4444' },
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
    <TooltipTrigger content="이 툴팁은 비활성화되어 있습니다." disabled>
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
      <TooltipTrigger content="즉시 표시 (0ms)" delay={0}>
        <Button buttonStyle="secondary">지연 없음</Button>
      </TooltipTrigger>
      <TooltipTrigger content="기본 지연 (200ms)" delay={200}>
        <Button buttonStyle="secondary">기본 지연</Button>
      </TooltipTrigger>
      <TooltipTrigger content="느린 지연 (500ms)" delay={500}>
        <Button buttonStyle="secondary">느린 지연</Button>
      </TooltipTrigger>
    </div>
  ),
};
