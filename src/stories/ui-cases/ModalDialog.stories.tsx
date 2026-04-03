import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../../components/button/Button';
import { Input } from '../../components/input/Input';
import { Select } from '../../components/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from '../../components/dialog';

const meta: Meta = {
  title: 'UI Cases/05. 모달 / 다이얼로그',
  parameters: {
    layout: 'centered',
    controls: { disable: true },
    docs: {
      description: {
        component: `
### Primary 색상 배치 가이드

모달/다이얼로그에서 primary 색상의 올바른 사용법을 보여주는 케이스입니다.

**핵심 규칙:**
- 모달은 그 자체가 1개 컨테이너 → primary 최대 1개
- 삭제/위험 확인은 primary가 아닌 \`destructive\`
- 정보 확인용 [닫기]는 \`secondary\`
- 취소는 항상 \`secondary\`
- 버튼 순서: [취소(secondary)] [확인(primary 또는 destructive)]
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * ### 폼 다이얼로그 — 올바른 예시
 *
 * - [취소] → `secondary`
 * - [등록] → `primary` (긍정적 핵심 액션)
 *
 * **모달 내 primary: 1개**
 */
export const FormDialog: Story = {
  render: function Render() {
    const [open, setOpen] = useState(true);

    return (
      <>
        <Button buttonStyle="secondary" onClick={() => setOpen(true)}>폼 다이얼로그 열기</Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>새 항목 등록</DialogTitle>
              <DialogDescription>새로운 항목의 정보를 입력해 주세요.</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col ds-gap-16 padding-y-16">
              <Input variant="default" label="이름" placeholder="항목 이름을 입력하세요" />
              <Input variant="default" label="설명" placeholder="항목에 대한 설명을 입력하세요" />
              <Select
                variant="default"
                label="카테고리"
                placeholder="선택하세요"
                options={[
                  { id: 'general', label: '일반' },
                  { id: 'important', label: '중요' },
                  { id: 'urgent', label: '긴급' },
                ]}
              />
            </div>
            <DialogFooter>
              <Button buttonStyle="secondary" onClick={() => setOpen(false)}>취소</Button>
              <Button buttonStyle="primary" onClick={() => setOpen(false)}>등록</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );
  },
};

/**
 * ### 삭제 확인 — 올바른 예시
 *
 * - [취소] → `secondary`
 * - [삭제] → `destructive` (위험 액션은 primary가 아님)
 *
 * **모달 내 primary: 0개 (destructive 사용)**
 */
export const DeleteConfirm: Story = {
  render: function Render() {
    const [open, setOpen] = useState(true);

    return (
      <>
        <Button buttonStyle="secondary" onClick={() => setOpen(true)}>삭제 확인 열기</Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>항목 삭제</DialogTitle>
              <DialogDescription>
                이 항목을 삭제하시겠습니까? 삭제된 항목은 복구할 수 없습니다.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button buttonStyle="secondary" onClick={() => setOpen(false)}>취소</Button>
              <Button buttonStyle="destructive" onClick={() => setOpen(false)}>삭제</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );
  },
};

/**
 * ### 정보 표시 — 올바른 예시
 *
 * - [닫기] → `secondary` (단순 닫기에 primary 불필요)
 *
 * **모달 내 primary: 0개**
 */
export const InfoDialog: Story = {
  render: function Render() {
    const [open, setOpen] = useState(true);

    return (
      <>
        <Button buttonStyle="secondary" onClick={() => setOpen(true)}>정보 다이얼로그 열기</Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>상세 정보</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col ds-gap-12 padding-y-16">
              <div className="flex justify-between">
                <span className="font-body size-sm text-muted">이름</span>
                <span className="font-body size-sm font-medium text-default">홍길동</span>
              </div>
              <div className="flex justify-between">
                <span className="font-body size-sm text-muted">이메일</span>
                <span className="font-body size-sm font-medium text-default">hong@example.com</span>
              </div>
              <div className="flex justify-between">
                <span className="font-body size-sm text-muted">등록일</span>
                <span className="font-body size-sm font-medium text-default">2026-03-15</span>
              </div>
              <div className="flex justify-between">
                <span className="font-body size-sm text-muted">상태</span>
                <span className="font-body size-sm font-medium text-default">활성</span>
              </div>
            </div>
            <DialogFooter>
              <Button buttonStyle="secondary" onClick={() => setOpen(false)}>닫기</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );
  },
};

/**
 * ### 잘못된 예시 — 삭제에 primary 사용
 *
 * 아래 화면의 문제점:
 * - 삭제 확인에 `primary` 사용 → 위험 액션에는 `destructive`를 써야 함
 * - 사용자가 삭제를 긍정적 액션으로 오인할 수 있음
 */
export const WrongDelete: Story = {
  render: function Render() {
    const [open, setOpen] = useState(true);
    const [showWarning, setShowWarning] = useState(true);

    return (
      <>
        <Button buttonStyle="secondary" onClick={() => { setOpen(true); setShowWarning(true); }}>
          잘못된 삭제 다이얼로그 열기
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            {showWarning && (
              <div className="bg-state-destructive-subtle padding-8 rounded-sm flex items-center justify-between">
                <span className="font-body size-xs font-medium text-state-destructive">
                  잘못된 예시: 삭제에 primary 사용
                </span>
                <Button buttonStyle="ghost" size="2xs" onClick={() => setShowWarning(false)}>✕</Button>
              </div>
            )}
            <DialogHeader>
              <DialogTitle>항목 삭제</DialogTitle>
              <DialogDescription>
                이 항목을 삭제하시겠습니까? 삭제된 항목은 복구할 수 없습니다.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button buttonStyle="ghost" onClick={() => setOpen(false)}>취소</Button>
              <Button buttonStyle="primary" onClick={() => setOpen(false)}>삭제</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );
  },
};

/**
 * ### 잘못된 예시 — 닫기에 primary 사용
 *
 * 아래 화면의 문제점:
 * - 정보 표시용 모달에서 [닫기]를 primary로 만듦
 * - 단순 닫기에는 primary가 불필요
 */
export const WrongInfo: Story = {
  render: function Render() {
    const [open, setOpen] = useState(true);
    const [showWarning, setShowWarning] = useState(true);

    return (
      <>
        <Button buttonStyle="secondary" onClick={() => { setOpen(true); setShowWarning(true); }}>
          잘못된 정보 다이얼로그 열기
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            {showWarning && (
              <div className="bg-state-destructive-subtle padding-8 rounded-sm flex items-center justify-between">
                <span className="font-body size-xs font-medium text-state-destructive">
                  잘못된 예시: 닫기에 primary 사용
                </span>
                <Button buttonStyle="ghost" size="2xs" onClick={() => setShowWarning(false)}>✕</Button>
              </div>
            )}
            <DialogHeader>
              <DialogTitle>상세 정보</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col ds-gap-12 padding-y-16">
              <div className="flex justify-between">
                <span className="font-body size-sm text-muted">이름</span>
                <span className="font-body size-sm font-medium text-default">홍길동</span>
              </div>
              <div className="flex justify-between">
                <span className="font-body size-sm text-muted">이메일</span>
                <span className="font-body size-sm font-medium text-default">hong@example.com</span>
              </div>
            </div>
            <DialogFooter>
              <Button buttonStyle="primary" onClick={() => setOpen(false)}>닫기</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );
  },
};
