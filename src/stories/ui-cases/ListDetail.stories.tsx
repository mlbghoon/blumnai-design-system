import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../../components/button/Button';
import { Input } from '../../components/input/Input';
import { Badge } from '../../components/badge/Badge';
import { Divider } from '../../components/divider';

const meta: Meta = {
  title: 'UI Cases/01. 리스트 + 상세',
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
    docs: {
      description: {
        component: `
### Primary 색상 배치 가이드

리스트 + 상세 화면에서 primary 색상의 올바른 사용법을 보여주는 케이스입니다.

**핵심 규칙:**
- 헤더 영역에 primary CTA 1개 (새 항목 추가)
- 상세 패널에 primary CTA 1개 (저장)
- 리스트 아이템 내 액션은 ghost
- 전체 화면 primary 합계: **2개**
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const MOCK_ITEMS = [
  { id: 1, name: '프로젝트 A', status: '진행 중', date: '2026-03-28' },
  { id: 2, name: '프로젝트 B', status: '완료', date: '2026-03-25' },
  { id: 3, name: '프로젝트 C', status: '대기', date: '2026-03-20' },
  { id: 4, name: '프로젝트 D', status: '진행 중', date: '2026-03-18' },
];

const statusColor = (status: string) => {
  switch (status) {
    case '진행 중': return 'blue' as const;
    case '완료': return 'green' as const;
    case '대기': return 'neutral' as const;
    default: return 'neutral' as const;
  }
};

/**
 * ### 올바른 예시
 *
 * - 헤더: [+ 새 프로젝트] → `primary` (이 화면의 핵심 CTA)
 * - 상세 패널: [저장] → `primary` (패널 내 핵심 CTA)
 * - [수정], [삭제] → `secondary`, `ghost` (보조 액션)
 * - 리스트 아이템 → 클릭만, 내부에 primary 버튼 없음
 *
 * **전체 화면 primary 합계: 2개**
 */
export const Correct: Story = {
  render: function Render() {
    const [selected, setSelected] = useState(MOCK_ITEMS[0]);

    return (
      <div className="flex flex-col h-[600px] bg-default">
        {/* 헤더 */}
        <div className="flex items-center justify-between padding-x-24 padding-y-16 border-b border-default">
          <h1 className="font-body size-lg font-semibold text-default">프로젝트 관리</h1>
          <Button buttonStyle="primary" size="sm" leadIcon={['system', 'add']}>
            새 프로젝트
          </Button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* 리스트 */}
          <div className="w-[320px] border-r border-default overflow-y-auto">
            {MOCK_ITEMS.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelected(item)}
                className={`flex items-center justify-between padding-x-16 padding-y-12 cursor-pointer transition-colors border-b border-default ${
                  selected.id === item.id ? 'bg-subtle' : 'hover:bg-subtle'
                }`}
              >
                <div className="flex flex-col ds-gap-4">
                  <span className="font-body size-sm font-medium text-default">{item.name}</span>
                  <span className="font-body size-xs text-muted">{item.date}</span>
                </div>
                <Badge color={statusColor(item.status)} size="sm" label={item.status} />
              </div>
            ))}
          </div>

          {/* 상세 패널 */}
          <div className="flex-1 flex flex-col">
            <div className="padding-24">
              <div className="flex items-center justify-between">
                <h2 className="font-body size-md font-semibold text-default">{selected.name}</h2>
                <Badge color={statusColor(selected.status)} label={selected.status} />
              </div>
              <p className="font-body size-sm text-subtle margin-t-24">
                프로젝트에 대한 상세 설명이 여기에 표시됩니다. 이 영역에서는 프로젝트의 세부 정보를 확인하고 수정할 수 있습니다.
              </p>
            </div>

            <Divider />

            <div className="padding-24 flex flex-col ds-gap-16">
              <Input variant="default" label="프로젝트명" value={selected.name} readOnly />
              <Input variant="default" label="시작일" value={selected.date} readOnly />
            </div>

            <div className="flex-1" />

            {/* 푸터 액션 */}
            <div className="flex items-center justify-end ds-gap-8 padding-24 border-t border-default">
              <Button buttonStyle="ghost" size="sm">삭제</Button>
              <Button buttonStyle="secondary" size="sm">수정</Button>
              <Button buttonStyle="primary" size="sm">저장</Button>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

/**
 * ### 잘못된 예시
 *
 * 아래 화면의 문제점:
 * - 리스트 아이템마다 [보기] primary 버튼 → 4개 초과
 * - 상세 패널에 [수정], [저장] 모두 primary → 같은 컨테이너에 2개
 * - 헤더에도 [새 프로젝트] primary → 전체 primary 합계 **7개** (규칙 위반)
 */
export const Wrong: Story = {
  render: function Render() {
    const [selected, setSelected] = useState(MOCK_ITEMS[0]);
    const [showWarning, setShowWarning] = useState(true);

    return (
      <div className="relative">
        {showWarning && (
          <div className="absolute top-0 left-0 right-0 z-10 bg-state-destructive-subtle padding-12 flex items-center justify-between">
            <span className="font-body size-sm font-medium text-state-destructive">
              이 화면은 primary 남용의 잘못된 예시입니다 — 전체 primary 요소 7개
            </span>
            <Button buttonStyle="ghost" size="2xs" onClick={() => setShowWarning(false)}>닫기</Button>
          </div>
        )}

        <div className={`flex flex-col h-[600px] bg-default ${showWarning ? 'padding-t-16' : ''}`}>
          {/* 헤더 */}
          <div className="flex items-center justify-between padding-x-24 padding-y-16 border-b border-default">
            <h1 className="font-body size-lg font-semibold text-default">프로젝트 관리</h1>
            <Button buttonStyle="primary" size="sm" leadIcon={['system', 'add']}>
              새 프로젝트
            </Button>
          </div>

          <div className="flex flex-1 overflow-hidden">
            {/* 리스트 - 각 아이템에 primary 버튼 (잘못됨) */}
            <div className="w-[320px] border-r border-default overflow-y-auto">
              {MOCK_ITEMS.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelected(item)}
                  className={`flex items-center justify-between padding-x-16 padding-y-12 cursor-pointer transition-colors border-b border-default ${
                    selected.id === item.id ? 'bg-subtle' : 'hover:bg-subtle'
                  }`}
                >
                  <div className="flex flex-col ds-gap-4">
                    <span className="font-body size-sm font-medium text-default">{item.name}</span>
                    <span className="font-body size-xs text-muted">{item.date}</span>
                  </div>
                  <Button buttonStyle="primary" size="2xs">보기</Button>
                </div>
              ))}
            </div>

            {/* 상세 패널 - 수정, 저장 모두 primary (잘못됨) */}
            <div className="flex-1 flex flex-col">
              <div className="padding-24">
                <h2 className="font-body size-md font-semibold text-default">{selected.name}</h2>
                <p className="font-body size-sm text-subtle margin-t-24">
                  프로젝트에 대한 상세 설명이 여기에 표시됩니다.
                </p>
              </div>
              <div className="flex-1" />
              <div className="flex items-center justify-end ds-gap-8 padding-24 border-t border-default">
                <Button buttonStyle="primary" size="sm">수정</Button>
                <Button buttonStyle="primary" size="sm">저장</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
};
