import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../../components/button/Button';
import { Input } from '../../components/input/Input';
import { Switch } from '../../components/switch';
import { Divider } from '../../components/divider';

const meta: Meta = {
  title: 'UI Cases/02. 설정 / 폼',
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
    docs: {
      description: {
        component: `
### Primary 색상 배치 가이드

설정/폼 화면에서 primary 색상의 올바른 사용법을 보여주는 케이스입니다.

**핵심 규칙:**
- Primary는 최종 저장 버튼 **1개에만** 사용
- 섹션별 저장 버튼을 두지 않음
- 토글/스위치는 DS 컴포넌트 사용 (primary 버튼 아님)
- 초기화/취소는 secondary 또는 ghost
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * ### 올바른 예시
 *
 * - 하단에 [저장] 1개만 primary
 * - [취소]는 secondary
 * - 토글은 DS Switch 컴포넌트
 * - 섹션 간 구분은 간격 + Divider
 *
 * **전체 화면 primary 합계: 1개**
 */
export const Correct: Story = {
  render: function Render() {
    const [emailNotif, setEmailNotif] = useState(true);
    const [pushNotif, setPushNotif] = useState(false);
    const [marketingNotif, setMarketingNotif] = useState(false);

    return (
      <div className="flex flex-col h-[700px] bg-default">
        {/* 헤더 */}
        <div className="padding-x-24 padding-y-16 border-b border-default">
          <h1 className="font-body size-lg font-semibold text-default">설정</h1>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="max-w-[600px] mx-auto padding-24">
            {/* 프로필 섹션 */}
            <section className="flex flex-col ds-gap-16">
              <h2 className="font-body size-md font-semibold text-default">프로필 정보</h2>
              <Input variant="default" label="이름" placeholder="홍길동" defaultValue="홍길동" />
              <Input variant="default" label="이메일" placeholder="hong@example.com" defaultValue="hong@example.com" />
              <Input variant="default" label="전화번호" placeholder="010-1234-5678" />
            </section>

            <Divider className="margin-y-4" />

            {/* 알림 섹션 */}
            <section className="flex flex-col ds-gap-16">
              <h2 className="font-body size-md font-semibold text-default">알림 설정</h2>
              <div className="flex flex-col ds-gap-12">
                <div className="flex items-center justify-between padding-y-8">
                  <div className="flex flex-col ds-gap-2">
                    <span className="font-body size-sm font-medium text-default">이메일 알림</span>
                    <span className="font-body size-xs text-muted">중요 업데이트를 이메일로 받습니다</span>
                  </div>
                  <Switch checked={emailNotif} onCheckedChange={setEmailNotif} />
                </div>
                <div className="flex items-center justify-between padding-y-8">
                  <div className="flex flex-col ds-gap-2">
                    <span className="font-body size-sm font-medium text-default">푸시 알림</span>
                    <span className="font-body size-xs text-muted">브라우저 푸시 알림을 받습니다</span>
                  </div>
                  <Switch checked={pushNotif} onCheckedChange={setPushNotif} />
                </div>
                <div className="flex items-center justify-between padding-y-8">
                  <div className="flex flex-col ds-gap-2">
                    <span className="font-body size-sm font-medium text-default">마케팅 수신</span>
                    <span className="font-body size-xs text-muted">프로모션 및 이벤트 정보를 받습니다</span>
                  </div>
                  <Switch checked={marketingNotif} onCheckedChange={setMarketingNotif} />
                </div>
              </div>
            </section>

            <Divider className="margin-y-4" />

            {/* 보안 섹션 */}
            <section className="flex flex-col ds-gap-16">
              <h2 className="font-body size-md font-semibold text-default">보안</h2>
              <Input variant="password" label="현재 비밀번호" placeholder="현재 비밀번호 입력" />
              <Input variant="password" label="새 비밀번호" placeholder="새 비밀번호 입력" />
            </section>
          </div>
        </div>

        {/* 하단 액션 */}
        <div className="flex items-center justify-end ds-gap-8 padding-x-24 padding-y-16 border-t border-default">
          <Button buttonStyle="secondary" size="md">취소</Button>
          <Button buttonStyle="primary" size="md">저장</Button>
        </div>
      </div>
    );
  },
};

/**
 * ### 잘못된 예시
 *
 * 아래 화면의 문제점:
 * - 각 섹션마다 [저장] primary 버튼 → primary 3개
 * - [초기화] 버튼도 primary → primary 4개
 * - 전체 primary 합계 **4개** (불필요한 분산)
 */
export const Wrong: Story = {
  render: function Render() {
    const [showWarning, setShowWarning] = useState(true);

    return (
      <div className="relative">
        {showWarning && (
          <div className="absolute top-0 left-0 right-0 z-10 bg-state-destructive-subtle padding-12 flex items-center justify-between">
            <span className="font-body size-sm font-medium text-state-destructive">
              이 화면은 primary 남용의 잘못된 예시입니다 — 섹션마다 primary 저장 버튼
            </span>
            <Button buttonStyle="ghost" size="2xs" onClick={() => setShowWarning(false)}>닫기</Button>
          </div>
        )}

        <div className={`flex flex-col h-[700px] bg-default ${showWarning ? 'padding-t-16' : ''}`}>
          <div className="padding-x-24 padding-y-16 border-b border-default">
            <h1 className="font-body size-lg font-semibold text-default">설정</h1>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="max-w-[600px] mx-auto padding-24">
              {/* 프로필 - 개별 저장 (잘못됨) */}
              <section className="flex flex-col ds-gap-16">
                <h2 className="font-body size-md font-semibold text-default">프로필 정보</h2>
                <Input variant="default" label="이름" placeholder="홍길동" />
                <Input variant="default" label="이메일" placeholder="hong@example.com" />
                <div className="flex justify-end">
                  <Button buttonStyle="primary" size="sm">저장</Button>
                </div>
              </section>

              <Divider className="margin-y-4" />

              {/* 알림 - 개별 저장 (잘못됨) */}
              <section className="flex flex-col ds-gap-16">
                <h2 className="font-body size-md font-semibold text-default">알림 설정</h2>
                <div className="flex flex-col ds-gap-8">
                  <div className="flex items-center justify-between padding-y-8">
                    <span className="font-body size-sm font-medium text-default">이메일 알림</span>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between padding-y-8">
                    <span className="font-body size-sm font-medium text-default">푸시 알림</span>
                    <Switch />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button buttonStyle="primary" size="sm">저장</Button>
                </div>
              </section>

              <Divider className="margin-y-4" />

              {/* 보안 - 개별 저장 + 초기화도 primary (잘못됨) */}
              <section className="flex flex-col ds-gap-16">
                <h2 className="font-body size-md font-semibold text-default">보안</h2>
                <Input variant="password" label="현재 비밀번호" placeholder="현재 비밀번호 입력" />
                <Input variant="password" label="새 비밀번호" placeholder="새 비밀번호 입력" />
                <div className="flex justify-end ds-gap-8">
                  <Button buttonStyle="primary" size="sm">초기화</Button>
                  <Button buttonStyle="primary" size="sm">저장</Button>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    );
  },
};
