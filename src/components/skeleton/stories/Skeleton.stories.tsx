import type { Meta, StoryObj } from '@storybook/react-vite';

import { Skeleton } from '../Skeleton';
import { Card, CardHeader, CardContent } from '../../card/Card';

const meta: Meta<typeof Skeleton> = {
  title: 'DataDisplay/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { disable: true },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'circular', 'text'],
      description: '스켈레톤의 모양을 설정합니다. default(둥근 사각형), circular(원형 — 아바타용), text(텍스트 줄 모양) 중 선택할 수 있습니다',
      table: {
        type: { summary: "'default' | 'circular' | 'text'" },
        defaultValue: { summary: 'default' },
      },
    },
    animation: {
      control: 'select',
      options: ['pulse', 'wave', 'none'],
      description: '로딩 애니메이션 스타일. pulse(기본 페이드), wave(시머 효과), none(애니메이션 없음). prefers-reduced-motion을 존중합니다',
      table: {
        type: {
          summary: 'SkeletonAnimation',
          detail: `'pulse' | 'wave' | 'none'`,
        },
        defaultValue: { summary: 'pulse' },
      },
    },
    count: {
      control: 'number',
      description: '여러 줄의 스켈레톤을 렌더링합니다. 텍스트 블록 로딩 표시에 유용합니다',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
    width: {
      control: 'text',
      description: '스켈레톤의 너비를 설정합니다. 숫자(px) 또는 CSS 값(예: "100%", "12rem")을 사용할 수 있습니다',
      table: {
        type: { summary: 'string | number' },
      },
    },
    height: {
      control: 'text',
      description: '스켈레톤의 높이를 설정합니다. 숫자(px) 또는 CSS 값(예: "100%", "3rem")을 사용할 수 있습니다',
      table: {
        type: { summary: 'string | number' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

/**
 * 기본 스켈레톤
 *
 * 로딩 상태를 나타내는 플레이스홀더입니다.
 */
export const Default: Story = {
  parameters: {
    controls: { disable: false },
  },
  args: {
    variant: 'default',
    animation: 'pulse',
    count: 1,
    width: 200,
    height: 20,
  },
  render: function Render(args) {
    return <Skeleton {...args} />;
  },
};

/**
 * 스켈레톤 변형
 */
export const Variants: Story = {
  render: function Render() {
    return (
      <div className="flex flex-col ds-gap-16 items-start">
        <div className="flex flex-col ds-gap-4">
          <span className="size-xs font-body text-muted">기본 (rounded-md)</span>
          <Skeleton variant="default" width={200} height={40} />
        </div>
        <div className="flex flex-col ds-gap-4">
          <span className="size-xs font-body text-muted">원형 (rounded-full)</span>
          <Skeleton variant="circular" width={48} height={48} />
        </div>
        <div className="flex flex-col ds-gap-4">
          <span className="size-xs font-body text-muted">텍스트 (rounded-sm)</span>
          <Skeleton variant="text" width={150} height={16} />
        </div>
      </div>
    );
  },
};

/**
 * 텍스트 스켈레톤
 *
 * 여러 줄의 텍스트 로딩 상태를 표시합니다.
 */
export const TextSkeleton: Story = {
  render: function Render() {
    return (
      <div className="flex flex-col ds-gap-8 w-[300px]">
        <Skeleton variant="text" className="height-16 w-3/4" />
        <Skeleton variant="text" className="height-16 w-full" />
        <Skeleton variant="text" className="height-16 w-5/6" />
        <Skeleton variant="text" className="height-16 w-2/3" />
      </div>
    );
  },
};

/**
 * 아바타 + 텍스트 스켈레톤
 */
export const AvatarWithText: Story = {
  render: function Render() {
    return (
      <div className="flex items-center ds-gap-16">
        <Skeleton variant="circular" width={48} height={48} />
        <div className="flex flex-col ds-gap-8">
          <Skeleton variant="text" width={120} height={16} />
          <Skeleton variant="text" width={80} height={12} />
        </div>
      </div>
    );
  },
};

/**
 * 카드 스켈레톤
 */
export const CardSkeleton: Story = {
  render: function Render() {
    return (
      <Card className="w-[350px]">
        <CardHeader className="ds-gap-8">
          <Skeleton variant="text" className="height-24 w-1/2" />
          <Skeleton variant="text" className="height-16 w-3/4" />
        </CardHeader>
        <CardContent className="flex flex-col ds-gap-8">
          <Skeleton className="[height:128px] w-full" />
          <div className="flex flex-col ds-gap-4">
            <Skeleton variant="text" className="height-16 w-full" />
            <Skeleton variant="text" className="height-16 w-5/6" />
          </div>
        </CardContent>
      </Card>
    );
  },
};

/**
 * 리스트 스켈레톤
 */
export const ListSkeleton: Story = {
  render: function Render() {
    return (
      <div className="flex flex-col ds-gap-12 w-[300px]">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center ds-gap-12">
            <Skeleton variant="circular" width={40} height={40} />
            <div className="flex-1 flex flex-col ds-gap-6">
              <Skeleton variant="text" className="height-16 w-3/4" />
              <Skeleton variant="text" className="[height:12px] w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  },
};

/**
 * 테이블 스켈레톤
 */
export const TableSkeleton: Story = {
  render: function Render() {
    return (
      <div className="w-[500px]">
        <div className="flex ds-gap-16 padding-12 border-b border-default">
          <Skeleton variant="text" className="height-16 [width:96px]" />
          <Skeleton variant="text" className="height-16 flex-1" />
          <Skeleton variant="text" className="height-16 [width:80px]" />
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex ds-gap-16 padding-12 border-b border-default">
            <Skeleton variant="text" className="height-16 [width:96px]" />
            <Skeleton variant="text" className="height-16 flex-1" />
            <Skeleton variant="text" className="height-16 [width:80px]" />
          </div>
        ))}
      </div>
    );
  },
};

/**
 * 애니메이션 비교
 *
 * pulse, wave, none 3가지 애니메이션 스타일을 비교합니다.
 */
export const Animations: Story = {
  render: function Render() {
    return (
      <div className="flex flex-col ds-gap-24 items-start">
        <div className="flex flex-col ds-gap-4">
          <span className="size-xs font-body text-muted">Pulse (기본)</span>
          <Skeleton variant="default" animation="pulse" width={200} height={20} />
        </div>
        <div className="flex flex-col ds-gap-4">
          <span className="size-xs font-body text-muted">Wave (시머)</span>
          <Skeleton variant="default" animation="wave" width={200} height={20} />
        </div>
        <div className="flex flex-col ds-gap-4">
          <span className="size-xs font-body text-muted">None (없음)</span>
          <Skeleton variant="default" animation="none" width={200} height={20} />
        </div>
      </div>
    );
  },
};

/**
 * 여러 줄 스켈레톤
 *
 * count prop으로 여러 줄의 스켈레톤을 한번에 렌더링합니다.
 */
export const MultipleLines: Story = {
  render: function Render() {
    return (
      <div className="flex flex-col ds-gap-24">
        <div className="flex flex-col ds-gap-4">
          <span className="size-xs font-body text-muted">count=3</span>
          <Skeleton variant="text" width={300} height={16} count={3} />
        </div>
        <div className="flex flex-col ds-gap-4">
          <span className="size-xs font-body text-muted">count=5</span>
          <Skeleton variant="text" width={300} height={16} count={5} />
        </div>
      </div>
    );
  },
};

/**
 * 그리드 스켈레톤
 */
export const GridSkeleton: Story = {
  render: function Render() {
    return (
      <div className="grid grid-cols-3 ds-gap-16 w-[500px]">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col ds-gap-8">
            <Skeleton className="aspect-square w-full" />
            <Skeleton variant="text" className="height-16 w-3/4" />
            <Skeleton variant="text" className="[height:12px] w-1/2" />
          </div>
        ))}
      </div>
    );
  },
};
