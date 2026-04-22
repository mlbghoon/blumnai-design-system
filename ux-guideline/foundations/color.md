# 색상 체계 (Color System)

## 1. 원칙: DS 토큰 우선, Tailwind 보조

**기본값:**
- 배경은 `bg-default`, 보조 배경은 `bg-subtle`, 뮤트 배경은 `bg-muted`
- 텍스트는 `text-default`, 보조 텍스트는 `text-subtle`, 설명/캡션은 `text-muted`
- 보더는 `border-default`, 강한 구분은 `border-darker`

**무채색(gray 계열)은 반드시 DS 시맨틱 토큰을 사용한다.**
그 외 유채색은 DS 시맨틱 토큰에 없는 브랜드 표현, 데이터 시각화, 이미지 데코레이션, 특수 구분 케이스에 Tailwind 클래스를 사용할 수 있다.
유채색은 화면의 구조를 대신하지 않고, 의미 있는 포인트나 구분을 보강하는 용도로 사용한다.

### 우선순위

색상 선택은 **영역 판단이 먼저**다. 영역을 정한 뒤 토큰을 고른다.

```
영역 판단
  ├─ 앱 레이아웃 영역인가? (GNB, 사이드바, 대화방, 컴포저, 모달 등)
  │    └─ YES → 앱 레이아웃 토큰     bg-app-container, bg-app-gnb, bg-app-sidebar …
  └─ 일반 surface인가? (카드, 패널, 콘텐츠, 리스트 등)
       └─ YES → DS 시맨틱 토큰       bg-default, text-subtle, border-default …

시맨틱 토큰에 없는 유채색만 → Tailwind 유채색 (bg-blue-500, text-red-600 등)
─────────────────────────────────────────────────────────
금지   Tailwind 무채색     bg-white, bg-gray-*, text-gray-*, border-gray-*
금지   arbitrary 색상값    bg-[#437DFC], text-[rgba(…)]
```

**이유:** 4개 테마(Light-A, Dark, Theme-B Light, Theme-B Dark)에서 모두 올바르게 표시되어야 한다.
무채색은 테마마다 값이 달라지므로 DS 변수가 필수이고, 유채색은 테마 간 차이가 작아 Tailwind로 충분하다.

## 2. DS 배경색 토큰

> **기본 원칙:** 의도된 디자인이 아닌 모든 배경색은 `bg-default`를 사용한다.
> Light 모드에서 흰색, Dark 모드에서 어두운 색을 자동 적용.

| DS 클래스 | Light | Dark | 대체 대상 | 용도 |
|-----------|-------|------|-----------|------|
| `bg-default` | `#fff` | `#18181b` | `bg-white` | **기본 배경** — 카드, 패널, 콘텐츠 |
| `bg-subtle` | `#fafafa` | `#111115` | `bg-gray-50` | 약간 어두운 배경 — 호버 기본 |
| `bg-muted` | `#f4f4f5` | `#09090b` | `bg-gray-100/200/300/400` | 뮤트 배경 — 구분, 토글 OFF, 핸들 |
| `bg-card` | `#fff` | `#222225` | `bg-white` (카드) | 카드 전용 — elevated surface |
| `bg-overlay` | alpha | alpha | `bg-black/xx` | 모달 딤, 드롭존 오버레이 |
| `bg-inverted` | `#18181b` | `#fff` | `bg-gray-800/900` | 반전 배경 — 툴팁, 다크 헤더, 선택 강조 |
| `bg-state-disabled` | `#27272a14` | `#ffffff14` | `bg-gray-300/400` (disabled) | 비활성 상태 — disabled 버튼/뱃지 |
| `bg-transparent` | — | — | — | 투명 배경 |
| `bg-primary` | — | — | — | 프라이머리 액션 |

### hover 배경색

| DS 클래스 | 대체 대상 | 용도 |
|-----------|-----------|------|
| `hover:bg-subtle` | `hover:bg-gray-50` | 기본 호버 |
| `hover:bg-muted` | `hover:bg-gray-100/200` | 강한 호버 |

## 3. 텍스트 색상

| DS 클래스 | Light | Dark | 대체 대상 | 용도 |
|-----------|-------|------|-----------|------|
| `text-default` | `#111115` | `#fff` | `text-gray-900/800` | 기본 텍스트 |
| `text-subtle` | `#4e4e55` | `#ffffffb2` | `text-gray-700/600` | 보조 텍스트 |
| `text-muted` | `#6f6f77` | `#ffffff80` | `text-gray-500` | 설명, 캡션 |
| `text-hint` | `#27272a4d` | `#ffffff4d` | `text-gray-400/300` | 힌트, 플레이스홀더 |

hover 변환: `hover:text-gray-600` → `hover:text-subtle`

## 4. 보더 색상

| DS 클래스 | 대체 대상 | 용도 |
|-----------|-----------|------|
| `border-default` | `border-gray-200/300` | 기본 보더 |
| `border-darker` | `border-gray-300` (강한 구분) | 강한 보더 |
| `border-strong` | `border-gray-400/500` | 가장 강한 보더 |

## 5. 아이콘 색상

> `<Icon>` 컴포넌트의 `color` prop에는 DS 아이콘 토큰을 사용한다.
> 토큰을 전달하면 `var(--icon-{token})`으로 변환되어 테마에 자동 대응.

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
4. **유채색 하드코딩 비허용**: 기본적으로 허용하지 않으며, 브랜드 컬러나 시맨틱 토큰에 없는 유채색만 예외적으로 허용
5. **gray 계열 하드코딩 금지**: `color="#6b7280"` 등 → DS 토큰으로 대체

## 6. 앱 레이아웃 영역별 배경색

> CSS 변수(`--app-*`)를 Tailwind v4 `@theme`로 등록하여 `bg-app-*` 클래스로 사용.
> `bg-[var(--app-*)]` arbitrary value 사용 금지.

| 영역 | Tailwind 클래스 |
|------|-----------------|
| 전체 컨테이너 | `bg-app-container` |
| GNB 배경 | `bg-app-gnb` |
| GNB 텍스트 | `text-app-gnb-text` |
| GNB 보더 | `border-app-gnb-border` |
| 사이드바 | `bg-app-sidebar` |
| 대화방 헤더 | `bg-app-room-header` |
| 대화방 본문 | `bg-app-room-body` |
| 컴포저 | `bg-app-composer` |
| 참조패널 | `bg-app-ref-{info,contact,history,integration,assistant,default}` |
| 우측 네비 | `bg-app-right-nav` |
| 모달 | `bg-app-modal` |
| 검색 | `bg-app-search` |
| 공지 | `bg-app-notice`, `text-app-notice-text` |

## 7. 판단 기준 요약

```
질문: 이 색상에 DS 토큰이 있는가?
  ├─ YES → DS 토큰 사용 (bg-default, text-subtle, border-darker …)
  └─ NO
      ├─ 무채색(gray)인가?
      │   └─ YES → DS 토큰 중 가장 가까운 것을 사용 (§2~4 참조)
      └─ 유채색인가?
          ├─ 거의 흰색에 가까운 파스텔 wash/그라디언트 데코레이션인가?
          │   └─ YES → `bg-basic-{hue}-wash` 사용 (다크 테마에서 near-black 색상으로 자동 전환)
          │           지원 hue: emerald, blue, purple (필요 시 추가 요청)
          └─ 그 외 브랜드 표현, 데이터 시각화, 이미지 데코레이션, 특수 구분 케이스 → Tailwind 클래스 사용
```

### basic color tier 구조

각 hue는 5단계 tier를 가집니다 (아래로 갈수록 더 진함):

| Tier | 라이트 용도 | 다크 용도 | 비고 |
|------|------|------|------|
| `-wash` | 거의 흰색(#f5-f7 영역) | 거의 검은색 + hue 힌트 | 파스텔 wash / 그라디언트 데코 (현재 emerald/blue/purple만 제공) |
| `-subtle` | 연한 파스텔 | 중간 어두운 hue | 배경 강조, 칩, 뱃지 bg |
| `-accent` | 포화된 hue | 포화된 hue | 아이콘, 액션 버튼 |
| `-strong` | 짙은 hue | 밝은 hue | 강조 텍스트, hover |
| `-contrast` | 가장 진한 hue | 가장 밝은 hue | 반전 시나리오 |
