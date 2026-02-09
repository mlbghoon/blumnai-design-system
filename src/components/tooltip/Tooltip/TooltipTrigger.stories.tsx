import type { Meta, StoryObj } from '@storybook/react';

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
    content: 'Tooltip text',
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
        <Button buttonStyle="secondary">Hover me</Button>
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
    <TooltipTrigger content="Search" badge="/">
      <Button buttonStyle="secondary">Search</Button>
    </TooltipTrigger>
  ),
};

/**
 * 다양한 위치
 */
export const Placements: Story = {
  render: () => (
    <div className="flex flex-col gap-24 items-center">
      <div className="flex gap-16">
        <TooltipTrigger content="Top placement" placement="top">
          <Button buttonStyle="secondary">Top</Button>
        </TooltipTrigger>
        <TooltipTrigger content="Bottom placement" placement="bottom">
          <Button buttonStyle="secondary">Bottom</Button>
        </TooltipTrigger>
      </div>
      <div className="flex gap-16">
        <TooltipTrigger content="Left placement" placement="left">
          <Button buttonStyle="secondary">Left</Button>
        </TooltipTrigger>
        <TooltipTrigger content="Right placement" placement="right">
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
    <div className="flex gap-16">
      <TooltipTrigger content="Default width tooltip (240px)" maxWidth={240}>
        <Button buttonStyle="secondary">Default (240px)</Button>
      </TooltipTrigger>
      <TooltipTrigger content="Wide tooltip for table cells (400px) - useful for displaying longer content" maxWidth={400}>
        <Button buttonStyle="secondary">Wide (400px)</Button>
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
            { type: 'label', label: 'Sales Overview' },
            { type: 'divider' },
            { type: 'item', label: 'Revenue', caption: '$12,500', indicatorColor: '#3b82f6' },
            { type: 'item', label: 'Profit', caption: '$4,200', indicatorColor: '#22c55e' },
            { type: 'item', label: 'Expenses', caption: '$8,300', indicatorColor: '#ef4444' },
          ]}
        />
      }
    >
      <Button buttonStyle="secondary">Show Chart Data</Button>
    </TooltipTrigger>
  ),
};

/**
 * 비활성화 상태
 */
export const Disabled: Story = {
  render: () => (
    <TooltipTrigger content="This tooltip is disabled" disabled>
      <Button buttonStyle="secondary">Disabled Tooltip</Button>
    </TooltipTrigger>
  ),
};

/**
 * 지연 시간 조절
 */
export const CustomDelay: Story = {
  render: () => (
    <div className="flex gap-16">
      <TooltipTrigger content="Instant (0ms)" delay={0}>
        <Button buttonStyle="secondary">No delay</Button>
      </TooltipTrigger>
      <TooltipTrigger content="Default (200ms)" delay={200}>
        <Button buttonStyle="secondary">Default delay</Button>
      </TooltipTrigger>
      <TooltipTrigger content="Slow (500ms)" delay={500}>
        <Button buttonStyle="secondary">Slow delay</Button>
      </TooltipTrigger>
    </div>
  ),
};
