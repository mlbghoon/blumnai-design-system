import type { Meta, StoryObj } from '@storybook/react';

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
      description: '스켈레톤 모양',
      table: {
        type: { summary: "'default' | 'circular' | 'text'" },
        defaultValue: { summary: 'default' },
      },
    },
    width: {
      control: 'text',
      description: '너비 (px 또는 CSS 값)',
      table: {
        type: { summary: 'string | number' },
      },
    },
    height: {
      control: 'text',
      description: '높이 (px 또는 CSS 값)',
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
      <div className="flex flex-col gap-16 items-start">
        <div className="flex flex-col gap-4">
          <span className="size-xs font-body text-muted">Default (rounded-md)</span>
          <Skeleton variant="default" width={200} height={40} />
        </div>
        <div className="flex flex-col gap-4">
          <span className="size-xs font-body text-muted">Circular (rounded-full)</span>
          <Skeleton variant="circular" width={48} height={48} />
        </div>
        <div className="flex flex-col gap-4">
          <span className="size-xs font-body text-muted">Text (rounded-sm)</span>
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
      <div className="flex flex-col gap-8 w-[300px]">
        <Skeleton variant="text" className="h-4 w-3/4" />
        <Skeleton variant="text" className="h-4 w-full" />
        <Skeleton variant="text" className="h-4 w-5/6" />
        <Skeleton variant="text" className="h-4 w-2/3" />
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
      <div className="flex items-center gap-16">
        <Skeleton variant="circular" width={48} height={48} />
        <div className="flex flex-col gap-8">
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
        <CardHeader className="gap-8">
          <Skeleton variant="text" className="h-6 w-1/2" />
          <Skeleton variant="text" className="h-4 w-3/4" />
        </CardHeader>
        <CardContent className="flex flex-col gap-8">
          <Skeleton className="h-32 w-full" />
          <div className="flex flex-col gap-4">
            <Skeleton variant="text" className="h-4 w-full" />
            <Skeleton variant="text" className="h-4 w-5/6" />
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
      <div className="flex flex-col gap-12 w-[300px]">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center gap-12">
            <Skeleton variant="circular" width={40} height={40} />
            <div className="flex-1 flex flex-col gap-6">
              <Skeleton variant="text" className="h-4 w-3/4" />
              <Skeleton variant="text" className="h-3 w-1/2" />
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
        <div className="flex gap-16 padding-12 border-b border-default">
          <Skeleton variant="text" className="h-4 w-24" />
          <Skeleton variant="text" className="h-4 flex-1" />
          <Skeleton variant="text" className="h-4 w-20" />
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex gap-16 padding-12 border-b border-default">
            <Skeleton variant="text" className="h-4 w-24" />
            <Skeleton variant="text" className="h-4 flex-1" />
            <Skeleton variant="text" className="h-4 w-20" />
          </div>
        ))}
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
      <div className="grid grid-cols-3 gap-16 w-[500px]">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-8">
            <Skeleton className="aspect-square w-full" />
            <Skeleton variant="text" className="h-4 w-3/4" />
            <Skeleton variant="text" className="h-3 w-1/2" />
          </div>
        ))}
      </div>
    );
  },
};
