import type { Meta, StoryObj } from '@storybook/react';
import { ScrollArea } from './ScrollArea';

const meta: Meta<typeof ScrollArea> = {
  title: 'Components/ScrollArea',
  component: ScrollArea,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal', 'both'],
      description: '스크롤 방향',
      table: {
        type: {
          summary: 'ScrollAreaOrientation',
          detail: `'vertical' | 'horizontal' | 'both'`,
        },
        defaultValue: { summary: 'vertical' },
      },
    },
    maxHeight: {
      control: 'text',
      description: '스크롤 영역의 최대 높이',
      table: {
        type: { summary: 'string | number' },
      },
    },
    maxWidth: {
      control: 'text',
      description: '스크롤 영역의 최대 너비',
      table: {
        type: { summary: 'string | number' },
      },
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
      table: {
        type: { summary: 'string' },
      },
    },
    children: {
      control: false,
      description: '스크롤 영역 내용',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ScrollArea>;

const VerticalContent = () => (
  <div className="padding-16">
    <p className="size-sm font-body text-default padding-y-4">Item 1</p>
    <p className="size-sm font-body text-default padding-y-4">Item 2</p>
    <p className="size-sm font-body text-default padding-y-4">Item 3</p>
    <p className="size-sm font-body text-default padding-y-4">Item 4</p>
    <p className="size-sm font-body text-default padding-y-4">Item 5</p>
    <p className="size-sm font-body text-default padding-y-4">Item 6</p>
    <p className="size-sm font-body text-default padding-y-4">Item 7</p>
    <p className="size-sm font-body text-default padding-y-4">Item 8</p>
    <p className="size-sm font-body text-default padding-y-4">Item 9</p>
    <p className="size-sm font-body text-default padding-y-4">Item 10</p>
    <p className="size-sm font-body text-default padding-y-4">Item 11</p>
    <p className="size-sm font-body text-default padding-y-4">Item 12</p>
    <p className="size-sm font-body text-default padding-y-4">Item 13</p>
    <p className="size-sm font-body text-default padding-y-4">Item 14</p>
    <p className="size-sm font-body text-default padding-y-4">Item 15</p>
  </div>
);

const boxStyle = { width: 80, height: 80 };

const HorizontalContent = () => (
  <div className="flex padding-16 gap-16">
    <div className="shrink-0 rounded-md bg-subtle flex items-center justify-center size-sm font-body" style={boxStyle}>1</div>
    <div className="shrink-0 rounded-md bg-subtle flex items-center justify-center size-sm font-body" style={boxStyle}>2</div>
    <div className="shrink-0 rounded-md bg-subtle flex items-center justify-center size-sm font-body" style={boxStyle}>3</div>
    <div className="shrink-0 rounded-md bg-subtle flex items-center justify-center size-sm font-body" style={boxStyle}>4</div>
    <div className="shrink-0 rounded-md bg-subtle flex items-center justify-center size-sm font-body" style={boxStyle}>5</div>
    <div className="shrink-0 rounded-md bg-subtle flex items-center justify-center size-sm font-body" style={boxStyle}>6</div>
    <div className="shrink-0 rounded-md bg-subtle flex items-center justify-center size-sm font-body" style={boxStyle}>7</div>
    <div className="shrink-0 rounded-md bg-subtle flex items-center justify-center size-sm font-body" style={boxStyle}>8</div>
  </div>
);

/**
 * 기본 ScrollArea
 *
 * ScrollArea는 Radix UI를 기반으로 한 스타일된 스크롤 영역 컴포넌트입니다.
 */
export const Default: Story = {
  args: {
    orientation: 'vertical',
    maxHeight: 200,
    className: 'rounded-md border-default',
    style: { width: 250 },
    children: <VerticalContent />,
  },
  parameters: {
    controls: { disable: false },
  },
};

/**
 * 세로 스크롤
 */
export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    maxHeight: 200,
    className: 'rounded-md border-default',
    style: { width: 250 },
    children: <VerticalContent />,
  },
};

/**
 * 가로 스크롤
 */
export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
    maxWidth: 300,
    className: 'rounded-md border-default',
    children: <HorizontalContent />,
  },
};

/**
 * 양방향 스크롤
 */
export const Both: Story = {
  args: {
    orientation: 'both',
    maxHeight: 200,
    maxWidth: 300,
    className: 'rounded-md border-default',
    children: (
      <div className="padding-16" style={{ width: 500 }}>
        <VerticalContent />
      </div>
    ),
  },
};
