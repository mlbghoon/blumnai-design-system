import type { Meta, StoryObj } from '@storybook/react-vite';
import { RiBookmarkLine, RiInboxLine, RiSearchLine } from '../../icons/Icon';

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
      description: '빈 상태 영역 상단에 표시되는 아이콘 (Remixicon `Ri*` component 권장, tuple form 은 deprecated)',
      table: {
        type: {
          summary: 'IconProp',
          detail: `Remixicon component (권장, tree-shakeable):
  icon={RiInboxLine}
  icon={RiFolderOpenLine}
  icon={RiStarFill}

또는 tuple form (deprecated, dev console warning):
  icon={['system', 'inbox']}
  icon={['document', 'folder-open', true]}`,
        },
      },
    },
    illustration: {
      control: false,
      description: '커스텀 일러스트레이션 (SVG, img, 애니메이션 등). icon 대신 렌더링됩니다',
      table: {
        type: { summary: 'ReactNode' },
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
    variant: {
      control: 'select',
      options: ['default', 'inline', 'fill'],
      description: '레이아웃 프리셋입니다. default(기본), inline(컴팩트), fill(전체 높이) 중 선택합니다',
      table: {
        type: {
          summary: 'EmptyStateVariant',
          detail: `'default' | 'inline' | 'fill'`,
        },
      },
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: '빈 상태 컴포넌트의 전체 크기를 설정합니다. xs(매우 작게), sm(작게), md(보통), lg(크게) 중 선택할 수 있습니다',
      table: {
        type: {
          summary: 'EmptyStateSize',
          detail: `'xs' | 'sm' | 'md' | 'lg'`,
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
    variant: 'default',
    size: 'md',
    illustration: undefined,
    action: undefined,
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
      icon={RiInboxLine}
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
      icon={RiSearchLine}
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

/**
 * 커스텀 일러스트레이션
 *
 * icon 대신 SVG, img 등 커스텀 비주얼을 표시합니다.
 */
export const WithIllustration: Story = {
  render: () => (
    <EmptyState
      illustration={
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="2" opacity="0.2" />
          <path d="M28 42L36 50L52 30" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.3" />
        </svg>
      }
      title="상담방을 선택해주세요."
      description="좌측에서 상담방을 선택하면 내용을 확인할 수 있습니다."
    />
  ),
};

/**
 * 인라인 변형
 *
 * 작은 컨테이너 내부에서 컴팩트하게 표시됩니다.
 */
export const InlineVariant: Story = {
  render: () => (
    <div style={{ width: 300, border: '1px solid var(--color-border-default)' }}>
      <EmptyState
        variant="inline"
        size="sm"
        icon={RiBookmarkLine}
        title="등록된 태그가 없습니다."
      />
    </div>
  ),
};

/**
 * 전체 높이 변형
 *
 * 페이지 레벨 빈 상태에서 전체 높이를 채웁니다.
 */
export const FillVariant: Story = {
  render: () => (
    <div style={{ width: 600, height: 400, border: '1px solid var(--color-border-default)' }}>
      <EmptyState
        variant="fill"
        size="lg"
        illustration={
          <svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="48" cy="48" r="44" stroke="currentColor" strokeWidth="2" opacity="0.15" />
            <circle cx="48" cy="48" r="28" stroke="currentColor" strokeWidth="2" opacity="0.1" />
            <path d="M36 48L44 56L60 36" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.25" />
          </svg>
        }
        title="상담방을 선택해주세요."
        description="좌측에서 상담방을 선택하면 내용을 확인할 수 있습니다."
        action={<Button size="md">새 상담 시작</Button>}
      />
    </div>
  ),
};

/**
 * XS 크기
 *
 * 가장 작은 사이즈로, 좁은 패널이나 목록 항목 내부에서 사용합니다.
 */
export const ExtraSmall: Story = {
  render: () => (
    <EmptyState
      icon={RiSearchLine}
      title="결과 없음"
      size="xs"
    />
  ),
};

/**
 * LG 크기
 *
 * 가장 큰 사이즈로, 페이지 중심 빈 상태에 적합합니다.
 */
export const Large: Story = {
  render: () => (
    <EmptyState
      icon={RiSearchLine}
      title="검색 결과가 없습니다"
      description="다른 키워드로 다시 검색해 보세요. 필터를 변경하거나 새로운 검색어를 입력해 주세요."
      size="lg"
      action={<Button size="lg">다시 검색</Button>}
    />
  ),
};
