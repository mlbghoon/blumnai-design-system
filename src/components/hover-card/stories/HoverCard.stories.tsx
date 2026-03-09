import type { Meta, StoryObj } from '@storybook/react-vite';

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
          <div className="flex ds-gap-16">
            <Avatar size="lg" initials="BL" />
            <div className="flex flex-col ds-gap-4">
              <h4 className="size-sm font-body font-semibold line-height-leading-5">
                @blumnai
              </h4>
              <p className="size-sm font-body text-muted line-height-leading-5">
                현대적인 웹 애플리케이션을 위한 아름다운 디자인 시스템입니다.
              </p>
              <div className="flex items-center ds-gap-8">
                <span className="size-xs font-body text-muted">
                  2024년 12월 가입
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
            프로젝트 보기
          </a>
        </HoverCardTrigger>
        <HoverCardContent className="[width:320px]">
          <div className="flex flex-col ds-gap-12">
            <img
              src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop"
              alt="프로젝트 미리보기"
              className="rounded-md w-full [height:128px] object-cover"
            />
            <div className="flex flex-col ds-gap-4">
              <h4 className="size-sm font-body font-semibold line-height-leading-5">
                디자인 시스템 프로젝트
              </h4>
              <p className="size-xs font-body text-muted line-height-leading-4">
                React와 Tailwind CSS로 제작된 종합 디자인 시스템입니다.
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
      <div className="flex ds-gap-24 items-center">
        <HoverCard>
          <HoverCardTrigger asChild>
            <button className="size-sm font-body padding-x-12 padding-y-6 rounded-md bg-muted">
              Top
            </button>
          </HoverCardTrigger>
          <HoverCardContent side="top">
            <p className="size-sm font-body">위쪽에 표시됩니다</p>
          </HoverCardContent>
        </HoverCard>

        <HoverCard>
          <HoverCardTrigger asChild>
            <button className="size-sm font-body padding-x-12 padding-y-6 rounded-md bg-muted">
              Bottom
            </button>
          </HoverCardTrigger>
          <HoverCardContent side="bottom">
            <p className="size-sm font-body">아래쪽에 표시됩니다</p>
          </HoverCardContent>
        </HoverCard>

        <HoverCard>
          <HoverCardTrigger asChild>
            <button className="size-sm font-body padding-x-12 padding-y-6 rounded-md bg-muted">
              Left
            </button>
          </HoverCardTrigger>
          <HoverCardContent side="left">
            <p className="size-sm font-body">왼쪽에 표시됩니다</p>
          </HoverCardContent>
        </HoverCard>

        <HoverCard>
          <HoverCardTrigger asChild>
            <button className="size-sm font-body padding-x-12 padding-y-6 rounded-md bg-muted">
              Right
            </button>
          </HoverCardTrigger>
          <HoverCardContent side="right">
            <p className="size-sm font-body">오른쪽에 표시됩니다</p>
          </HoverCardContent>
        </HoverCard>
      </div>
    );
  },
};
