import type { Meta, StoryObj } from '@storybook/react';

import { AspectRatio } from '../AspectRatio';

const meta: Meta<typeof AspectRatio> = {
  title: 'Layout/AspectRatio',
  component: AspectRatio,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { disable: true },
  },
  argTypes: {
    ratio: {
      control: 'number',
      description: '가로 세로 비율 (width / height)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof AspectRatio>;

/**
 * 기본 Aspect Ratio (16:9)
 *
 * 콘텐츠의 가로 세로 비율을 유지합니다.
 */
export const Default: Story = {
  parameters: {
    controls: { disable: false },
  },
  args: {
    ratio: 16 / 9,
  },
  render: function Render(args) {
    return (
      <div className="w-[300px]">
        <AspectRatio ratio={args.ratio}>
          <img
            src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
            alt="Photo by Drew Beamer"
            className="rounded-md object-cover w-full h-full"
          />
        </AspectRatio>
      </div>
    );
  },
};

/**
 * 1:1 비율 (정사각형)
 */
export const Square: Story = {
  render: function Render() {
    return (
      <div className="w-[200px]">
        <AspectRatio ratio={1}>
          <img
            src="https://images.unsplash.com/photo-1535025183041-0991a977e25b?w=300&dpr=2&q=80"
            alt="Landscape"
            className="rounded-md object-cover w-full h-full"
          />
        </AspectRatio>
      </div>
    );
  },
};

/**
 * 4:3 비율
 */
export const FourByThree: Story = {
  render: function Render() {
    return (
      <div className="w-[300px]">
        <AspectRatio ratio={4 / 3}>
          <img
            src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&dpr=2&q=80"
            alt="Dogs"
            className="rounded-md object-cover w-full h-full"
          />
        </AspectRatio>
      </div>
    );
  },
};

/**
 * 21:9 비율 (울트라와이드)
 */
export const UltraWide: Story = {
  render: function Render() {
    return (
      <div className="w-[400px]">
        <AspectRatio ratio={21 / 9}>
          <img
            src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=1200&dpr=2&q=80"
            alt="Nature"
            className="rounded-md object-cover w-full h-full"
          />
        </AspectRatio>
      </div>
    );
  },
};

/**
 * 비디오 플레이스홀더
 *
 * 비디오나 iframe 콘텐츠의 비율을 유지할 때 사용합니다.
 */
export const VideoPlaceholder: Story = {
  render: function Render() {
    return (
      <div className="w-[400px]">
        <AspectRatio ratio={16 / 9}>
          <div className="flex items-center justify-center w-full h-full rounded-md bg-muted">
            <div className="flex flex-col items-center gap-8">
              <div className="width-40 height-40 rounded-full bg-default/10 flex items-center justify-center">
                <svg
                  className="width-20 height-20 text-muted"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <span className="size-sm font-body text-muted">16:9 Video</span>
            </div>
          </div>
        </AspectRatio>
      </div>
    );
  },
};

/**
 * 다양한 비율 비교
 */
export const RatioComparison: Story = {
  render: function Render() {
    const ratios = [
      { label: '1:1', ratio: 1 },
      { label: '4:3', ratio: 4 / 3 },
      { label: '16:9', ratio: 16 / 9 },
      { label: '2:1', ratio: 2 },
    ];

    return (
      <div className="grid grid-cols-2 gap-16 w-[500px]">
        {ratios.map(({ label, ratio }) => (
          <div key={label} className="flex flex-col gap-8">
            <span className="size-sm font-body font-medium">{label}</span>
            <AspectRatio ratio={ratio}>
              <div className="flex items-center justify-center w-full h-full rounded-md bg-muted border-default">
                <span className="size-xs font-body text-muted">{label}</span>
              </div>
            </AspectRatio>
          </div>
        ))}
      </div>
    );
  },
};
