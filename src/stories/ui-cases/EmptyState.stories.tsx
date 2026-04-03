import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../../components/button/Button';
import { EmptyState } from '../../components/empty-state';

const meta: Meta = {
  title: 'UI Cases/04. 빈 상태',
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
    docs: {
      description: {
        component: `
### Primary 색상 배치 가이드

빈 상태(Empty State) 화면에서 primary 색상의 올바른 사용법을 보여주는 케이스입니다.

**핵심 규칙:**
- 빈 상태 전체가 1개 컨테이너 → primary CTA 최대 1개
- 아이콘/일러스트에 primary 색상 사용 금지
- 보조 액션은 secondary
- 상단 헤더의 CTA와 중복 시 하나만 primary
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * ### 올바른 예시 — 단일 CTA
 *
 * - 빈 상태의 유일한 액션 [프로젝트 추가하기] → `primary`
 * - 아이콘은 `text-muted` 계열 (primary 아님)
 * - 헤더의 [+ 새 프로젝트]는 빈 상태에서 숨기거나 `secondary`로 낮춤
 *
 * **전체 화면 primary 합계: 1개**
 */
export const SingleCTA: Story = {
  render: () => (
    <div className="flex flex-col h-[500px] bg-default">
      <div className="flex items-center justify-between padding-x-24 padding-y-16 border-b border-default">
        <h1 className="font-body size-lg font-semibold text-default">프로젝트</h1>
        <Button buttonStyle="secondary" size="sm" leadIcon={['system', 'add']}>
          새 프로젝트
        </Button>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <EmptyState
          icon={['system', 'add-box']}
          title="아직 등록된 프로젝트가 없습니다"
          description="새 프로젝트를 추가하여 시작해 보세요"
          action={
            <Button buttonStyle="primary" size="md" leadIcon={['system', 'add']}>
              프로젝트 추가하기
            </Button>
          }
        />
      </div>
    </div>
  ),
};

/**
 * ### 올바른 예시 — 주요 + 보조 CTA
 *
 * - [새 항목 등록] → `primary` (빈 상태를 벗어나는 주요 CTA)
 * - [검색 초기화] → `secondary` (대안 경로)
 *
 * **전체 화면 primary 합계: 1개**
 */
export const DualCTA: Story = {
  render: () => (
    <div className="flex flex-col h-[500px] bg-default">
      <div className="flex items-center justify-between padding-x-24 padding-y-16 border-b border-default">
        <h1 className="font-body size-lg font-semibold text-default">검색 결과</h1>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <EmptyState
          icon={['system', 'search', false]}
          title="검색 결과가 없습니다"
          description="다른 키워드로 검색하거나 새 항목을 등록해 보세요"
          action={
            <div className="flex ds-gap-8">
              <Button buttonStyle="secondary" size="md">검색 초기화</Button>
              <Button buttonStyle="primary" size="md">새 항목 등록</Button>
            </div>
          }
        />
      </div>
    </div>
  ),
};

/**
 * ### 잘못된 예시
 *
 * 아래 화면의 문제점:
 * - 헤더의 [+ 새 프로젝트]가 primary + 빈 상태의 [추가하기]도 primary → 중복
 * - [가이드 보기]까지 primary → 같은 컨테이너에 primary 2개
 * - 전체 primary 합계 **3개** (규칙 위반)
 */
export const Wrong: Story = {
  render: function Render() {
    const [showWarning, setShowWarning] = useState(true);

    return (
      <div className="relative">
        {showWarning && (
          <div className="absolute top-0 left-0 right-0 z-10 bg-state-destructive-subtle padding-12 flex items-center justify-between">
            <span className="font-body size-sm font-medium text-state-destructive">
              이 화면은 primary 남용의 잘못된 예시입니다 — 헤더 + 빈 상태에서 primary 중복
            </span>
            <Button buttonStyle="ghost" size="2xs" onClick={() => setShowWarning(false)}>닫기</Button>
          </div>
        )}

        <div className={`flex flex-col h-[500px] bg-default ${showWarning ? 'padding-t-16' : ''}`}>
          <div className="flex items-center justify-between padding-x-24 padding-y-16 border-b border-default">
            <h1 className="font-body size-lg font-semibold text-default">프로젝트</h1>
            <Button buttonStyle="primary" size="sm" leadIcon={['system', 'add']}>
              새 프로젝트
            </Button>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <EmptyState
              icon={['system', 'add-box']}
              title="아직 등록된 프로젝트가 없습니다"
              description="프로젝트를 추가하거나 가이드를 확인해 보세요"
              action={
                <div className="flex ds-gap-8">
                  <Button buttonStyle="primary" size="md">가이드 보기</Button>
                  <Button buttonStyle="primary" size="md" leadIcon={['system', 'add']}>추가하기</Button>
                </div>
              }
            />
          </div>
        </div>
      </div>
    );
  },
};
