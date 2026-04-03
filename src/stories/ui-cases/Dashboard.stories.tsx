import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../../components/button/Button';
import { Badge } from '../../components/badge/Badge';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '../../components/card';
import { Divider } from '../../components/divider';

const meta: Meta = {
  title: 'UI Cases/03. 대시보드',
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
    docs: {
      description: {
        component: `
### Primary 색상 배치 가이드

대시보드 화면에서 primary 색상의 올바른 사용법을 보여주는 케이스입니다.

**핵심 규칙:**
- 헤더의 핵심 CTA 1개만 primary
- 통계 숫자에 primary 색상 사용 금지
- 카드 내부 탐색 링크는 ghost
- 전체 화면 primary 합계: **1개**
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const StatCard = ({ label, value, sub }: { label: string; value: string; sub?: string }) => (
  <div className="flex-1 bg-subtle rounded-lg padding-20">
    <span className="font-body size-xs text-muted">{label}</span>
    <div className="margin-t-24">
      <span className="font-body size-2xl font-semibold text-default">{value}</span>
    </div>
    {sub && <span className="font-body size-xs text-muted">{sub}</span>}
  </div>
);

const RECENT_ITEMS = [
  { name: '김OO', time: '10분 전', status: '진행 중' },
  { name: '이OO', time: '25분 전', status: '대기' },
  { name: '박OO', time: '1시간 전', status: '완료' },
  { name: '최OO', time: '2시간 전', status: '진행 중' },
];

const NOTICES = [
  { title: '시스템 점검 안내', date: '2026-04-05' },
  { title: '신규 기능 업데이트 v2.3', date: '2026-04-01' },
  { title: '보안 패치 적용 완료', date: '2026-03-28' },
];

/**
 * ### 올바른 예시
 *
 * - 헤더: [새 프로젝트] → `primary` (유일한 핵심 CTA)
 * - 통계 카드 숫자 → `text-default` (primary 아님)
 * - [전체 보기], [리포트 보기] → `ghost` (보조 탐색)
 *
 * **전체 화면 primary 합계: 1개**
 */
export const Correct: Story = {
  render: () => (
    <div className="flex flex-col h-[700px] bg-default">
      {/* 헤더 */}
      <div className="flex items-center justify-between padding-x-24 padding-y-16 border-b border-default">
        <h1 className="font-body size-lg font-semibold text-default">대시보드</h1>
        <Button buttonStyle="primary" size="sm" leadIcon={['system', 'add']}>
          새 프로젝트
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto padding-24">
        {/* 통계 카드 */}
        <div className="flex ds-gap-16">
          <StatCard label="총 상담" value="1,234" sub="전월 대비 +12%" />
          <StatCard label="진행 중" value="56" sub="8건 신규" />
          <StatCard label="완료" value="1,178" sub="완료율 95.5%" />
        </div>

        {/* 콘텐츠 카드 */}
        <div className="flex ds-gap-16 margin-t-24">
          {/* 최근 상담 */}
          <Card className="flex-1">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="size-md">최근 상담</CardTitle>
                <Button buttonStyle="ghost" size="2xs">전체 보기</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col">
                {RECENT_ITEMS.map((item, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between padding-y-10">
                      <div className="flex items-center ds-gap-8">
                        <div className="width-32 height-32 rounded-full bg-subtle flex items-center justify-center">
                          <span className="font-body size-xs text-muted">{item.name.charAt(0)}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-body size-sm font-medium text-default">{item.name}</span>
                          <span className="font-body size-xs text-muted">{item.time}</span>
                        </div>
                      </div>
                      <Badge
                        size="sm"
                        color={item.status === '진행 중' ? 'blue' : item.status === '완료' ? 'green' : 'neutral'}
                        label={item.status}
                      />
                    </div>
                    {i < RECENT_ITEMS.length - 1 && <Divider />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 공지사항 */}
          <Card className="flex-1">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="size-md">공지사항</CardTitle>
                <Button buttonStyle="ghost" size="2xs">전체 보기</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col">
                {NOTICES.map((notice, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between padding-y-10">
                      <span className="font-body size-sm text-default">{notice.title}</span>
                      <span className="font-body size-xs text-muted">{notice.date}</span>
                    </div>
                    {i < NOTICES.length - 1 && <Divider />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  ),
};

/**
 * ### 잘못된 예시
 *
 * 아래 화면의 문제점:
 * - 통계 카드의 "진행 중" 숫자를 primary 색상으로 강조
 * - 각 카드마다 [자세히 보기] primary 버튼
 * - 헤더에도 [새 프로젝트] primary
 * - 전체 primary 합계 **5개** (규칙 위반)
 */
export const Wrong: Story = {
  render: function Render() {
    const [showWarning, setShowWarning] = useState(true);

    return (
      <div className="relative">
        {showWarning && (
          <div className="absolute top-0 left-0 right-0 z-10 bg-state-destructive-subtle padding-12 flex items-center justify-between">
            <span className="font-body size-sm font-medium text-state-destructive">
              이 화면은 primary 남용의 잘못된 예시입니다 — 숫자 강조 + 카드마다 primary 버튼
            </span>
            <Button buttonStyle="ghost" size="2xs" onClick={() => setShowWarning(false)}>닫기</Button>
          </div>
        )}

        <div className={`flex flex-col h-[700px] bg-default ${showWarning ? 'padding-t-16' : ''}`}>
          <div className="flex items-center justify-between padding-x-24 padding-y-16 border-b border-default">
            <h1 className="font-body size-lg font-semibold text-default">대시보드</h1>
            <Button buttonStyle="primary" size="sm" leadIcon={['system', 'add']}>
              새 프로젝트
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto padding-24">
            {/* 통계 카드 - 숫자에 primary 색상 (잘못됨) */}
            <div className="flex ds-gap-16">
              <div className="flex-1 bg-subtle rounded-lg padding-20">
                <span className="font-body size-xs text-muted">총 상담</span>
                <div className="margin-t-24">
                  <span className="font-body size-2xl font-semibold text-default">1,234</span>
                </div>
              </div>
              <div className="flex-1 bg-subtle rounded-lg padding-20">
                <span className="font-body size-xs text-muted">진행 중</span>
                <div className="margin-t-24">
                  <span className="font-body size-2xl font-semibold text-state-primary">56</span>
                </div>
              </div>
              <div className="flex-1 bg-subtle rounded-lg padding-20">
                <span className="font-body size-xs text-muted">완료</span>
                <div className="margin-t-24">
                  <span className="font-body size-2xl font-semibold text-default">1,178</span>
                </div>
              </div>
            </div>

            <div className="flex ds-gap-16 margin-t-24">
              <Card className="flex-1">
                <CardHeader>
                  <CardTitle className="size-md">최근 상담</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col ds-gap-8">
                    <span className="font-body size-sm text-muted">최근 항목 4건</span>
                  </div>
                  <div className="margin-t-24">
                    <Button buttonStyle="primary" size="sm">자세히 보기</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="flex-1">
                <CardHeader>
                  <CardTitle className="size-md">팀 성과</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col ds-gap-8">
                    <span className="font-body size-sm text-muted">이번 달 리포트</span>
                  </div>
                  <div className="margin-t-24">
                    <Button buttonStyle="primary" size="sm">리포트 보기</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="flex-1">
                <CardHeader>
                  <CardTitle className="size-md">공지사항</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col ds-gap-8">
                    <span className="font-body size-sm text-muted">새 공지 2건</span>
                  </div>
                  <div className="margin-t-24">
                    <Button buttonStyle="primary" size="sm">전체 보기</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  },
};
