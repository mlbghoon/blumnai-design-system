import type { Meta, StoryObj } from '@storybook/react-vite';

import { EmptyState } from './EmptyState';
import { Button } from '../../button/Button';

const meta: Meta<typeof EmptyState> = {
  title: 'Feedback/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { disable: true },
  },
  argTypes: {
    icon: {
      control: 'object',
      description: '빈 상태 영역 상단에 표시되는 아이콘입니다. [카테고리, 아이콘명] 형식으로 전달합니다',
      table: {
        type: { summary: 'IconTypeWithFill' },
      },
    },
    title: {
      control: 'text',
      description: '빈 상태의 주요 메시지를 나타내는 제목 텍스트입니다',
      table: {
        type: { summary: 'string' },
      },
    },
    description: {
      control: 'text',
      description: '제목 아래에 표시되는 보조 설명 텍스트입니다. 사용자에게 다음 행동을 안내하는 데 활용합니다',
      table: {
        type: { summary: 'string' },
      },
    },
    action: {
      control: false,
      description: '설명 아래에 표시되는 액션 영역입니다. 주로 Button 컴포넌트를 배치하여 사용자가 새 항목을 추가하는 등의 동작을 유도합니다',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: '빈 상태 컴포넌트의 전체 크기를 설정합니다. sm(작게), md(보통) 중 선택할 수 있습니다',
      table: {
        type: {
          summary: 'EmptyStateSize',
          detail: `'sm' | 'md'`,
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

/**
 * 기본 EmptyState
 *
 * 이 스토리에서 컴포넌트의 모든 props를 테스트할 수 있습니다.
 */
export const Default: Story = {
  args: {
    icon: ['system', 'search'],
    title: '검색 결과가 없습니다',
    description: '다른 키워드로 다시 검색해 보세요.',
    size: 'md',
  },
  parameters: {
    controls: { disable: false },
  },
};

/**
 * 액션 버튼 포함
 */
export const WithAction: Story = {
  render: () => (
    <EmptyState
      icon={['business', 'inbox']}
      title="데이터가 없습니다"
      description="새로운 항목을 추가하여 시작하세요."
      action={<Button size="md">항목 추가</Button>}
    />
  ),
};

/**
 * 아이콘 없이
 */
export const WithoutIcon: Story = {
  render: () => (
    <EmptyState
      title="표시할 내용이 없습니다"
      description="나중에 다시 확인해 주세요."
    />
  ),
};

/**
 * 작은 크기
 */
export const Small: Story = {
  render: () => (
    <EmptyState
      icon={['system', 'search']}
      title="결과 없음"
      description="검색어를 변경해 보세요."
      size="sm"
    />
  ),
};

/**
 * 제목만
 */
export const TitleOnly: Story = {
  render: () => (
    <EmptyState title="비어 있습니다" />
  ),
};
