import type { Meta, StoryObj } from '@storybook/react-vite';

import { StatusDot } from './StatusDot';

const meta: Meta<typeof StatusDot> = {
  title: 'DataDisplay/StatusDot',
  component: StatusDot,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { disable: true },
  },
  argTypes: {
    color: {
      control: 'select',
      options: ['green', 'red', 'orange', 'gray'],
      description: '상태 색상',
      table: {
        type: {
          summary: 'StatusDotColor',
          detail: `'green' | 'red' | 'orange' | 'gray'`,
        },
      },
    },
    label: {
      control: 'text',
      description: '상태 라벨',
      table: {
        type: { summary: 'string' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: '컴포넌트 크기',
      table: {
        type: {
          summary: 'StatusDotSize',
          detail: `'sm' | 'md'`,
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatusDot>;

/**
 * 기본 StatusDot
 *
 * 이 스토리에서 컴포넌트의 모든 props를 테스트할 수 있습니다.
 */
export const Default: Story = {
  args: {
    color: 'green',
    label: '활성',
    size: 'md',
  },
  parameters: {
    controls: { disable: false },
  },
};

/**
 * 모든 색상
 */
export const AllColors: Story = {
  render: () => (
    <div className="flex flex-col ds-gap-12">
      <StatusDot color="green" label="활성" />
      <StatusDot color="red" label="오류" />
      <StatusDot color="orange" label="경고" />
      <StatusDot color="gray" label="비활성" />
    </div>
  ),
};

/**
 * 크기 비교
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col ds-gap-12">
      <StatusDot color="green" label="소형" size="sm" />
      <StatusDot color="green" label="중형" size="md" />
    </div>
  ),
};

/**
 * 라벨 없이 도트만
 */
export const DotOnly: Story = {
  render: () => (
    <div className="flex items-center ds-gap-12">
      <StatusDot color="green" />
      <StatusDot color="red" />
      <StatusDot color="orange" />
      <StatusDot color="gray" />
    </div>
  ),
};
