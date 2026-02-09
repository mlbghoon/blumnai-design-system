import type { Meta, StoryObj } from '@storybook/react';

import { HoverCard, HoverCardTrigger, HoverCardContent } from '../HoverCard';
import { Avatar } from '../../avatar/Avatar';

const meta: Meta<typeof HoverCard> = {
  title: 'DataDisplay/HoverCard',
  component: HoverCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { disable: true },
  },
};

export default meta;
type Story = StoryObj<typeof HoverCard>;

/**
 * 기본 Hover Card
 *
 * 링크나 요소에 마우스를 올리면 추가 정보를 표시합니다.
 */
export const Default: Story = {
  parameters: {
    controls: { disable: false },
  },
  render: function Render() {
    return (
      <HoverCard>
        <HoverCardTrigger asChild>
          <a
            href="#"
            className="size-sm font-body font-medium text-default underline"
          >
            @blumnai
          </a>
        </HoverCardTrigger>
        <HoverCardContent>
          <div className="flex gap-16">
            <Avatar size="lg" initials="BL" />
            <div className="flex flex-col gap-4">
              <h4 className="size-sm font-body font-semibold line-height-leading-5">
                @blumnai
              </h4>
              <p className="size-sm font-body text-muted line-height-leading-5">
                Beautiful design system for building modern web applications.
              </p>
              <div className="flex items-center gap-8">
                <span className="size-xs font-body text-muted">
                  Joined December 2024
                </span>
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    );
  },
};

/**
 * 이미지 미리보기
 *
 * 이미지나 미디어 콘텐츠의 미리보기를 표시합니다.
 */
export const ImagePreview: Story = {
  render: function Render() {
    return (
      <HoverCard>
        <HoverCardTrigger asChild>
          <a
            href="#"
            className="size-sm font-body font-medium text-default underline"
          >
            View Project
          </a>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="flex flex-col gap-12">
            <img
              src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop"
              alt="Project preview"
              className="rounded-md w-full h-32 object-cover"
            />
            <div className="flex flex-col gap-4">
              <h4 className="size-sm font-body font-semibold line-height-leading-5">
                Design System Project
              </h4>
              <p className="size-xs font-body text-muted line-height-leading-4">
                A comprehensive design system built with React and Tailwind CSS.
              </p>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    );
  },
};

/**
 * 다양한 위치
 *
 * side prop으로 Hover Card의 위치를 조절할 수 있습니다.
 */
export const Positions: Story = {
  render: function Render() {
    return (
      <div className="flex gap-24 items-center">
        <HoverCard>
          <HoverCardTrigger asChild>
            <button className="size-sm font-body padding-x-12 padding-y-6 rounded-md bg-muted">
              Top
            </button>
          </HoverCardTrigger>
          <HoverCardContent side="top">
            <p className="size-sm font-body">Content appears on top</p>
          </HoverCardContent>
        </HoverCard>

        <HoverCard>
          <HoverCardTrigger asChild>
            <button className="size-sm font-body padding-x-12 padding-y-6 rounded-md bg-muted">
              Bottom
            </button>
          </HoverCardTrigger>
          <HoverCardContent side="bottom">
            <p className="size-sm font-body">Content appears on bottom</p>
          </HoverCardContent>
        </HoverCard>

        <HoverCard>
          <HoverCardTrigger asChild>
            <button className="size-sm font-body padding-x-12 padding-y-6 rounded-md bg-muted">
              Left
            </button>
          </HoverCardTrigger>
          <HoverCardContent side="left">
            <p className="size-sm font-body">Content appears on left</p>
          </HoverCardContent>
        </HoverCard>

        <HoverCard>
          <HoverCardTrigger asChild>
            <button className="size-sm font-body padding-x-12 padding-y-6 rounded-md bg-muted">
              Right
            </button>
          </HoverCardTrigger>
          <HoverCardContent side="right">
            <p className="size-sm font-body">Content appears on right</p>
          </HoverCardContent>
        </HoverCard>
      </div>
    );
  },
};
