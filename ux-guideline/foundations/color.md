# 색상 체계 (Color System)

## 1. 원칙: CSS 변수 우선

**하드코딩된 Tailwind 색상 클래스 사용을 최소화하고, CSS 변수(`var(--app-*)`)를 사용한다.**

이유: 4개 테마(Light-A, Dark, Theme-B Light, Theme-B Dark)에서 모두 올바르게 표시되어야 한다.

## 2. 레이아웃 영역별 배경색

> CSS 변수(`--app-*`)를 Tailwind v4 `@theme`로 등록하여 클린 유틸리티 클래스로 사용.
> `bg-[var(--app-*)]` 형태의 arbitrary value 사용 금지 → `bg-app-*` 클래스 사용.

| 영역 | CSS 변수 | Tailwind 클래스 |
|------|----------|-----------------|
| 전체 컨테이너 | `--app-container-bg` | `bg-app-container` |
| GNB 배경 | `--app-gnb-bg` | `bg-app-gnb` |
| GNB 텍스트 | `--app-gnb-text` | `text-app-gnb-text` |
| GNB 보더 | `--app-gnb-border` | `border-app-gnb-border` |
| 사이드바 | `--app-sidebar-bg` | `bg-app-sidebar` |
| 대화방 헤더 | `--app-room-header-bg` | `bg-app-room-header` |
| 대화방 본문 | `--app-room-body-bg` | `bg-app-room-body` |
| 컴포저 | `--app-composer-bg` | `bg-app-composer` |
| 참조패널-정보 | `--app-ref-info-bg` | `bg-app-ref-info` |
| 참조패널-컨택 | `--app-ref-contact-bg` | `bg-app-ref-contact` |
| 참조패널-이력 | `--app-ref-history-bg` | `bg-app-ref-history` |
| 참조패널-연동 | `--app-ref-integration-bg` | `bg-app-ref-integration` |
| 참조패널-어시스턴트 | `--app-ref-assistant-bg` | `bg-app-ref-assistant` |
| 참조패널-기본 | `--app-ref-default-bg` | `bg-app-ref-default` |
| 우측 네비 | `--app-right-nav-bg` | `bg-app-right-nav` |
| 모달 | `--app-modal-bg` | `bg-app-modal` |
| 검색 | `--app-search-bg` | `bg-app-search` |
| 공지 배경 | `--app-notice-bg` | `bg-app-notice` |
| 공지 텍스트 | `--app-notice-text` | `text-app-notice-text` |

```
✅ bg-app-container            → 레이아웃 컨테이너 배경
✅ bg-app-ref-info              → 참조 패널 탭별 배경
✅ text-app-gnb-text            → GNB 전용 텍스트 색상
✅ border-app-gnb-border        → GNB 전용 보더 색상
❌ bg-[var(--app-container-bg)] → bg-app-container로 대체 (arbitrary value 금지)
```

## 3. DS 배경색 클래스

> **원칙: 의도된 디자인이 아닌 모든 배경색은 `bg-default`를 사용한다.**
> Light 모드에서 흰색, Dark 모드에서 어두운 색을 자동 적용.
> **의도적 디자인이라 하더라도, DS 변수로 대체 가능하면 DS 변수를 우선 사용한다.**
> 하드코딩은 채팅 말풍선·데이터 기반 색상 맵 등 DS 토큰으로 표현할 수 없는 특수 케이스에만 허용.

### DS 배경색 토큰 맵

| DS 클래스 | Light | Dark | 대체 대상 | 용도 | 현재 적용 |
|-----------|-------|------|-----------|------|-----------|
| `bg-default` | `#fff` | `#18181b` | `bg-white` | **기본 배경** — 카드, 패널, 콘텐츠 | 148건 |
| `bg-subtle` | `#fafafa` | `#111115` | `bg-gray-50` | 약간 어두운 배경 — 호버 기본 | 151건 |
| `bg-muted` | `#f4f4f5` | `#09090b` | `bg-gray-100/200/300/400` | 뮤트 배경 — 구분, 토글 OFF, 핸들 | 139건 |
| `bg-card` | `#fff` | `#222225` | `bg-white` (카드) | 카드 전용 — elevated surface | 8건 |
| `bg-overlay` | alpha | alpha | `bg-black/xx` | 모달 딤, 드롭존 오버레이 | 5건 |
| `bg-inverted` | `#18181b` | `#fff` | `bg-gray-800/900` | 반전 배경 — 툴팁, 다크 헤더, 선택 강조 | 5건 |
| `bg-state-disabled` | `#27272a14` | `#ffffff14` | `bg-gray-300/400` (disabled) | 비활성 상태 — disabled 버튼/뱃지 | 2건 |
| `bg-transparent` | — | — | — | 투명 배경 | 11건 |
| `bg-primary` | — | — | — | 프라이머리 액션 | 9건 |

### hover 배경색

| DS 클래스 | 대체 대상 | 용도 | 현재 적용 |
|-----------|-----------|------|-----------|
| `hover:bg-subtle` | `hover:bg-gray-50` | 기본 호버 | 88건 |
| `hover:bg-muted` | `hover:bg-gray-100/200` | 강한 호버 | 73건 |

### 앱 레이아웃 변수

| 변수 | 용도 | 현재 적용 |
|------|------|-----------|
| `bg-[var(--app-container-bg)]` | 전체 컨테이너 | 9건 |
| `bg-[var(--app-notice-bg)]` | 공지 영역 | 9건 |
| `bg-[var(--app-ref-*-bg)]` | 참조 패널 (info/contact/history/integration/assistant/default) | 12건 |
| `bg-[var(--app-*-bg)]` | 기타 레이아웃 (sidebar, room, gnb, composer, search 등) | 7건 |

### 변환 규칙

```
✅ bg-default                → 기본 흰색 배경 (테마 대응)
✅ bg-subtle                 → 약간 어두운 배경
✅ bg-muted                  → 뮤트 배경 (강한 구분, 토글 OFF, 리사이즈 핸들, 플레이스홀더)
✅ bg-overlay                → 모달 딤, 드롭존 오버레이
✅ bg-inverted               → 툴팁, 다크 헤더, 선택 강조
✅ bg-state-disabled          → 비활성 상태 버튼/뱃지
✅ bg-card                   → 카드/패널 배경
❌ bg-white                  → bg-default
❌ bg-gray-50                → bg-subtle
❌ bg-gray-100               → bg-muted
❌ bg-gray-200               → bg-muted 또는 --app-* 변수
❌ bg-gray-300/400 (비활성)   → bg-state-disabled
❌ bg-gray-300/400 (장식)     → bg-muted
❌ bg-gray-800/900            → bg-inverted
❌ bg-black/xx                → bg-overlay
```

## 4. 허용되는 하드코딩 색상

### 의도적 디자인의 판단 기준

하드코딩 색상이 허용되려면 다음 **3가지 중 최소 1개**를 충족해야 한다:

1. **기능구분과 직결** — 특정 기능이나 카테고리를 색상으로 구분 (예: 상태 플래그 색상 맵)
2. **statement 표현** — ON/OFF, active/inactive 등 명시적 상태를 표현 (예: 토글 활성 색상)
3. **디자인 skin 역할** — 브랜드, 테마, 아이덴티티를 표현하는 색상 (예: 브랜드 아바타 색상)

> **위 기준을 충족하더라도 DS 변수로 대체 가능하면 DS 변수를 우선 사용.**
> 하드코딩은 DS 토큰으로 표현할 수 없는 **특수 케이스**에만 허용.

예시:
- 토글 OFF 트랙 → `bg-muted` (DS) ✅ — 하드코딩 `bg-gray-300` 불필요
- 선택 강조 (dark) → `bg-inverted` (DS) ✅ — 하드코딩 `bg-gray-800` 불필요
- 상태 플래그 색상 맵 (`bg-red-500`, `bg-gray-500` 등) → DS 토큰 없음, 하드코딩 허용 ✅

### 허용 목록 (DS 토큰으로 대체 불가한 특수 케이스만)

| 용도 | 허용 클래스 | 현재 건수 |
|------|-------------|-----------|
| 상태: 긴급/에러 | `bg-red-*` | 52건 |
| 상태: 성공 | `bg-green-*` | 41건 |
| 상태: 경고 | `bg-amber-*`, `bg-yellow-*` | 39건 |
| 상태: 정보/강조 | `bg-blue-*` | 166건 |
| 상태: 보라 계열 | `bg-violet-*`, `bg-purple-*` | 54건 |
| 상태: 기타 유색 | `bg-orange-*`, `bg-pink-*`, `bg-teal-*`, `bg-sky-*` 등 | 68건 |
| 상태 플래그 fallback | `bg-gray-500` | 2건 (특수 케이스) |
| 채팅 말풍선 | 개별 색상 | 채널별 말풍선 배경 등 |
| 그라데이션 | `bg-gradient-to-*` | 6건 |

## 5. 텍스트 색상 (text-gray → DS 토큰)

> **원칙: `text-gray-*` 하드코딩 금지 → DS 시맨틱 텍스트 토큰 사용.**

| DS 클래스 | Light | Dark | 대체 대상 | 용도 |
|-----------|-------|------|-----------|------|
| `text-default` | `#111115` | `#fff` | `text-gray-900`, `text-gray-800` | 기본 텍스트 |
| `text-subtle` | `#4e4e55` | `#ffffffb2` | `text-gray-700`, `text-gray-600` | 보조 텍스트 |
| `text-muted` | `#6f6f77` | `#ffffff80` | `text-gray-500` | 설명, 캡션 |
| `text-hint` | `#27272a4d` | `#ffffff4d` | `text-gray-400`, `text-gray-300` | 힌트, 플레이스홀더 |

hover 변환: `hover:text-gray-600` → `hover:text-subtle` (동일 매핑)

## 6. 보더 색상 (border-gray → DS 토큰)

> **`border-gray-*` 하드코딩 금지 → DS 시맨틱 보더 토큰 사용.**

| DS 클래스 | 대체 대상 | 용도 |
|-----------|-----------|------|
| `border-default` | `border-gray-200`, `border-gray-300` | 기본 보더 |
| `border-darker` | `border-gray-300` (강한 구분) | 강한 보더 |
| `border-strong` | `border-gray-400`, `border-gray-500` | 가장 강한 보더 |

## 7. 아이콘 색상 (Icon Color)

> **원칙: `<Icon>` 컴포넌트의 `color` prop에는 DS 아이콘 토큰을 사용한다.**

DS `Icon`은 `color` prop으로 **토큰 문자열** 또는 **CSS 색상값**을 받는다.
토큰을 전달하면 `var(--icon-{token})`으로 변환되어 테마(Light/Dark)에 자동 대응한다.

### 기본(Default) 계열

| 토큰 | Light | 용도 | 텍스트 대응 |
|------|-------|------|-------------|
| `default` | `#111115` | 기본 아이콘 | `text-default` |
| `default-subtle` | `#4e4e55` | 보조 아이콘 | `text-subtle` |
| `default-muted` | `#6f6f77` | 설명/캡션 아이콘 | `text-muted` |
| `default-disabled` | `#27272a40` | 비활성 아이콘 | — |

### 반전(Inverted) / 고정(White·Black) 계열

| 토큰 | 값 | 용도 |
|------|----|------|
| `inverted-default` | 테마 반전 | 반전 배경 위 아이콘 |
| `white-default` | `#fff` | 다크 배경 (GNB, 뱃지 등) |
| `black-default` | `#111115` | 고정 다크 아이콘 |

> 각 계열에 `-subtle`, `-muted`, `-disabled` 변형 존재 (총 16개 토큰).

### 시맨틱(Semantic) 계열

| 토큰 | Light | 용도 |
|------|-------|------|
| `destructive` | `#e74341` | 오류, 삭제, 차단 |
| `informative` | `#437dfc` | 정보, 안내 |
| `success` | `#4fc660` | 성공, 완료 |
| `warning` | `#f27313` | 경고, 주의 |

### 사용 규칙

1. **`color` 미지정 시**: 부모 CSS `color`를 상속 — 일반적으로 텍스트와 같은 색
2. **텍스트와 나란한 아이콘**: 텍스트 토큰 계층과 동일하게 맞춤 (`text-default` ↔ `default`, `text-subtle` ↔ `default-subtle`)
3. **시맨틱 상태 아이콘**: 반드시 시맨틱 토큰 사용 (`destructive`, `success` 등)
4. **하드코딩 hex 허용**: 유색(blue, red 등) 브랜드 컬러나 시맨틱 토큰에 없는 색상만 허용
5. **gray 계열 하드코딩 금지**: `color="#6b7280"` 등 → DS 토큰으로 대체

## 8. 금지 요약

- `bg-white`, `bg-gray-*`, `bg-black` → DS bg 토큰
- `text-gray-*` → DS text 토큰 (`text-default` / `text-subtle` / `text-muted` / `text-hint`)
- `border-gray-*` → DS border 토큰 (`border-default` / `border-darker` / `border-strong`)
- `bg-[var(--app-*)]` arbitrary value → `bg-app-*` 클린 클래스 (§2)
