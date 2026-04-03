# 인터랙션 (Interaction)

## 1. 호버 상태

| 요소 유형 | 호버 패턴 |
|-----------|-----------|
| 리스트 아이템 | `hover:bg-subtle transition-colors` |
| 버튼 (ghost) | `hover:bg-muted transition-colors` |
| 아이콘 버튼 | `hover:bg-muted rounded-md transition-colors` |
| 링크/텍스트 | `hover:text-blue-600 transition-colors` |
| 카드 | `hover:shadow-sm transition-shadow` |

## 2. 트랜지션 규칙

> **변경되는 속성만 명시한다.** `transition-all` 사용 금지 — 불필요한 속성까지 감시하여 성능 저하 및 의도치 않은 애니메이션 발생.

```
✅ transition-colors                           → 색상 변경 시
✅ transition-shadow                           → 그림자 변경 시
✅ transition-transform                        → transform 관련 변경 시
✅ transition-[scale,background-color]         → 복합 변경 시 (변경 속성만 명시)
❌ transition-all                              → 금지 (모든 속성 감시)
❌ 트랜지션 없는 인터랙티브 요소                → 금지 (뚝 끊기는 느낌)
```

duration: 기본 `duration-150`. 명시 불필요.

## 3. Scale on Press

> 버튼 클릭 시 미세한 scale-down으로 촉각적 피드백을 준다.

```
✅ active:scale-[0.96]                → 표준 press 피드백
❌ active:scale-[0.94] 이하           → 과장됨, 금지
❌ scale 없는 버튼                     → 허용 (static 버튼에는 적용하지 않음)
```

- CSS transition으로 구현 (interruptible — 중간에 놓으면 자연스럽게 복귀)
- 모든 버튼에 필수가 아님 — 모션이 산만해지는 곳에서는 생략 가능

```tsx
// Tailwind
<button className="transition-transform duration-150 ease-out active:scale-[0.96]">

// static 버튼 (scale 비적용)
<button className="transition-transform duration-150 ease-out">
```

## 4. 최소 히트 영역

> 인터랙티브 요소는 **최소 40×40px** 히트 영역을 확보한다 (WCAG 44×44px 권장).

시각적으로 작은 요소는 pseudo-element로 히트 영역 확장:

```css
.small-button {
  position: relative;
}
.small-button::after {
  content: "";
  position: absolute;
  inset: -8px; /* 시각 크기 + 16px = 최소 40px */
}
```

- 인접한 인터랙티브 요소 간 히트 영역이 겹치지 않도록 주의
- 아이콘 버튼(`ControlButton`)은 DS가 히트 영역을 보장하므로 별도 처리 불필요

## 5. Transitions vs Keyframes

> **인터랙티브 상태 변경은 CSS transition**, **1회성 시퀀스는 keyframe animation**.

| | CSS Transitions | CSS Keyframes |
|---|---|---|
| **중단 가능** | O — 중간에 방향 전환 가능 | X — 처음부터 재시작 |
| **용도** | hover, toggle, open/close | enter 애니메이션, 로딩 |
| **duration** | 남은 거리에 비례 | 고정 |

```
✅ 토글, 드로어, 아코디언  → transition (중단 시 자연스러운 복귀)
✅ 페이지 진입, 리스트 등장 → keyframe (1회성 시퀀스)
❌ 인터랙티브 요소에 keyframe → 금지 (닫기 중 재열기 시 끊김)
```

## 6. Enter 애니메이션 (Split & Stagger)

> 큰 컨테이너를 통째로 애니메이션하지 않는다. **의미 단위로 분리**하고 **시차**를 둔다.

1. **Split**: 제목, 설명, 버튼 등 논리적 그룹으로 분리
2. **Stagger**: 그룹 간 ~100ms 딜레이
3. **효과**: `opacity 0→1` + `translateY(12px→0)` + `blur(4px→0)`

```css
.stagger-item {
  opacity: 0;
  transform: translateY(12px);
  filter: blur(4px);
  animation: fadeInUp 400ms ease-out forwards;
}
.stagger-item:nth-child(1) { animation-delay: 0ms; }
.stagger-item:nth-child(2) { animation-delay: 100ms; }
.stagger-item:nth-child(3) { animation-delay: 200ms; }

@keyframes fadeInUp {
  to { opacity: 1; transform: translateY(0); filter: blur(0); }
}
```

## 7. Exit 애니메이션

> Exit는 Enter보다 **작고 빠르게**. 사용자의 시선은 이미 다음으로 이동 중.

```
✅ opacity 0 + translateY(-12px)  → 작은 고정 이동 (방향감 유지)
✅ duration 150ms (enter의 절반)   → 빠르게 사라짐
❌ translateY(-100%) + scale(0.5)  → 과장된 exit, 시선 빼앗김
❌ exit 애니메이션 없음 (display:none) → 맥락 단절
```

## 8. 아이콘 애니메이션

> 상태 변경/hover로 아이콘이 나타나거나 사라질 때, 토글이 아닌 **연속적 전환**을 사용한다.

**고정 값 (일탈 금지):**

| 속성 | 값 |
|------|-----|
| scale | `0.25` → `1` |
| opacity | `0` → `1` |
| filter | `blur(4px)` → `blur(0)` |
| transition | `spring, duration: 0.3, bounce: 0` |

| 애니메이션 적용 | 애니메이션 미적용 |
|----------------|------------------|
| hover 시 나타나는 액션 아이콘 | 고정 네비게이션 아이콘 |
| 상태 변경 아이콘 (play→pause) | 장식 아이콘 |
| 컨텍스트 툴바 아이콘 | 항상 보이는 아이콘 |

**Motion 미사용 시**: 두 아이콘을 모두 DOM에 두고 CSS cross-fade (absolute positioning).

## 9. Page Load 애니메이션 스킵

> 기본 상태로 이미 표시되는 요소는 **첫 렌더 시 애니메이션하지 않는다**.

- Motion 사용 시: `<AnimatePresence initial={false}>`
- 적용 대상: 아이콘 swap, 토글, 탭 — 페이지 로드 시 기본 상태인 것들
- 비적용: 페이지 hero stagger, 로딩 상태 등 첫 진입 애니메이션이 의도된 것

## 10. 레이어 팝업 노출 방식

> 모든 레이어 팝업(Dialog, Modal, Popover, Drawer 등)의 **기본 노출 방식은 dissolve + 중앙 노출**이다.

- **dissolve**: opacity 0→1 페이드 인 (DS Dialog 기본 동작)
- **중앙 노출**: 뷰포트 정중앙에 표시
- 별도 지정이 없으면 이 기본을 따른다

**예외 — 특정 위치 노출이 필요한 경우:**
- 사용자가 의도적으로 특정 위치(예: 클릭한 요소 근처, 화면 하단 등)에 노출을 원하는 경우
- AI는 해당 케이스를 감지하면 **사용자에게 질문**하여 위치/방향을 확인한 후 구현

```
✅ Dialog, Modal        → dissolve + 중앙 (기본)
✅ Popover              → 트리거 요소 기준 위치 (Popover 고유 동작)
✅ Drawer               → 방향 지정 시 slide (사용자 지정)
❌ 지정 없이 slide/특수 위치 → 금지 (기본 dissolve+중앙 사용)
```

## 11. 성능

### Transition 속성 명시

> `transition: all` 및 Tailwind `transition` 숏핸드 사용 금지.

```
✅ transition-colors                        → 색상만 변경
✅ transition-transform                     → transform만 변경
✅ transition-[scale,background-color]      → 복합 (변경 속성만 나열)
❌ transition-all / transition (숏핸드)     → 모든 속성 감시 → 성능 저하
```

### `will-change` 사용

> GPU 합성 가능 속성에만 **선택적으로** 적용. 남용 금지.

```
✅ will-change: transform, opacity, filter  → GPU 합성 가능
❌ will-change: width, height, color        → GPU 합성 불가, 메모리만 소모
❌ 다수 요소에 will-change 일괄 적용        → 레이어 과다 → 메모리 낭비
```

- 첫 프레임 끊김이 관찰될 때만 적용
- 모던 브라우저는 대부분 자동 최적화하므로 기본적으로 불필요
