# 간격 체계 (Spacing)

## 1. Spacing 선택 가이드

AI가 간격을 결정할 때 아래 기준을 따른다.

### 요소 간 간격 (gap)

| 관계 | 권장 간격 | 클래스 | 예시 |
| ---- | -------- | ------ | ---- |
| 같은 그룹 내 인접 요소 | 4~8px | `ds-gap-4` ~ `ds-gap-8` | 아이콘 + 라벨, 뱃지 나열 |
| 관련 그룹 간 | 12~16px | `ds-gap-12` ~ `ds-gap-16` | 폼 필드 간, 리스트 아이템 간 |
| 독립 섹션 간 | 20~32px | `ds-gap-20` ~ `ds-gap-32` | 카드 그룹 간, 페이지 섹션 간 |

### 컴포넌트 내부 padding

| 밀도 | 권장 간격 | 클래스 | 적용 대상 |
| ---- | -------- | ------ | -------- |
| compact (sm) | 4~6px | `padding-4` ~ `padding-6` | 인라인 뱃지, 아이콘 버튼, 컴팩트 카드 |
| default (md) | 8~12px | `padding-8` ~ `padding-12` | 기본 카드, 리스트 아이템, 필터 탭 |
| comfortable (lg) | 16~24px | `padding-16` ~ `padding-24` | 모달, 폼 섹션, 대형 패널 |

### 수직 리듬 (섹션 간격)

| 관계 | 권장 간격 | 클래스 | 비고 |
| ---- | -------- | ------ | ---- |
| 같은 섹션 내 요소 간 | 8~12px | `ds-gap-8` ~ `ds-gap-12` | 텍스트 + 보조 텍스트 등 |
| 폼 필드 간 | 16~20px | `ds-gap-16` ~ `ds-gap-20` | Input, Select 등 반복 필드 |
| 섹션 ↔ 섹션 | 24~32px | `ds-gap-24` ~ `ds-gap-32` | 구분선 또는 시각적 구획 경계 |
| 페이지 최상위 블록 간 | 32px 이상 | `ds-gap-32` 또는 프로젝트 레이아웃 | 히어로 ↔ 콘텐츠 등 |

---

## 2. DS Spacing 변수

DS는 `--spacing-*` CSS 변수를 제공하며, 숫자가 곧 px 값이다.

| CSS 변수 | 값 | DS 유틸리티 클래스 |
| -------- | --- | ----------------- |
| `--spacing-none` | 0px | `padding-0` |
| `--spacing-1` | 1px | `padding-1` |
| `--spacing-2` | 2px | `padding-2` |
| `--spacing-4` | 4px | `padding-4` |
| `--spacing-6` | 6px | `padding-6` |
| `--spacing-8` | 8px | `padding-8` |
| `--spacing-10` | 10px | `padding-10` |
| `--spacing-12` | 12px | `padding-12` |
| `--spacing-16` | 16px | `padding-16` |
| `--spacing-20` | 20px | `padding-20` |
| `--spacing-24` | 24px | `padding-24` |

### DS 방향별 유틸리티 — Padding

| 방향 | DS 클래스 | 지원 값 (px) | 커버리지 |
| ---- | -------- | ----------- | ------- |
| 전체 | `padding-*` | 0~24 (11단계) | **완전** |
| 좌우 | `padding-x-*` | 0~16 (10단계) | **주력 범위 완전** |
| 상하 | `padding-y-*` | 0~16 (9단계) | **주력 범위 완전** |
| 좌 | `padding-l-*` | 2,4,6,8,10,12,32 | 제한적 |
| 우 | `padding-r-*` | 4,6,8,10,12 | 제한적 |
| 상 | `padding-t-*` | 4, 16만 | **매우 제한적** |
| 하 | `padding-b-*` | 4, 16만 | **매우 제한적** |

> **pt-\*, pb-\***: DS 지원이 극히 제한적이므로 Tailwind 유지. 무리하게 전환하지 않는다.

### DS 방향별 유틸리티 — Gap

`ds-gap-*` 접두사를 사용한다. Tailwind `gap-*`은 사용하지 않는다.

| DS 클래스 | 값 |
| -------- | --- |
| `ds-gap-0` | 0px |
| `ds-gap-1` | 1px |
| `ds-gap-2` | 2px |
| `ds-gap-4` | 4px |
| `ds-gap-6` | 6px |
| `ds-gap-8` | 8px |
| `ds-gap-10` | 10px |
| `ds-gap-12` | 12px |
| `ds-gap-16` | 16px |
| `ds-gap-20` | 20px |
| `ds-gap-24` | 24px |
| `ds-gap-32` | 32px |

```
❌ gap-4, gap-8          → ds-gap-* 사용
❌ gap-[6px]             → ds-gap-6 사용
✅ 반응형: md:ds-gap-0, sm:ds-gap-8
```

### DS 방향별 유틸리티 — Margin

| 방향 | DS 클래스 | 지원 값 (px) |
| ---- | -------- | ----------- |
| 전체 | `margin-0` | 0만 |
| 좌우 | `margin-x-*` | 2, 8, 14 |
| 상하 | `margin-y-*` | 4, 16 |
| 상 | `margin-t-*` | 24, 32 |
| 우 | `margin-r-*` | 4, 16, 24 |
| 좌 | `margin-l-*` | 2 |

> margin은 DS 지원 범위가 제한적이다. DS에 해당 값이 있으면 DS 클래스를 사용하고, 없으면 Tailwind `m-*` 유지.

## 3. Tailwind → DS 패딩 맵핑

> **전환 원칙**: `p-*`, `px-*`, `py-*`는 DS로 전환. `pt-*`, `pb-*`, `pl-*`, `pr-*`는 DS에 해당 값이 있을 때만 전환, 없으면 Tailwind 유지.

### 전체 패딩 (`p-*` → `padding-*`) — 전환율 97%

| Tailwind | px | DS 클래스 | 용도 |
| -------- | --- | -------- | ---- |
| `p-0.5` | 2px | `padding-2` | 아이콘 버튼 내부, 미세 여백 |
| `p-1` | 4px | `padding-4` | 컴팩트 버튼, 인라인 요소 |
| `p-1.5` | 6px | `padding-6` | 사이드바 카드, 작은 카드 |
| `p-2` | 8px | `padding-8` | **기본 내부 간격**, 필터 탭, 리스트 아이템 |
| `p-2.5` | 10px | `padding-10` | 약간 여유있는 카드 |
| `p-3` | 12px | `padding-12` | **콘텐츠 블록** — 말풍선, 카드, 패널, 알림 |
| `p-4` | 16px | `padding-16` | 넉넉한 카드, 폼 섹션 |
| `p-5` | 20px | `padding-20` | 모달 내부, 대형 공지 |
| `p-6` | 24px | `padding-24` | 모달 본문, 대형 에디터 영역 |
| `p-8` | 32px | — | Tailwind 유지 (DS 미지원) |

### 좌우 패딩 (`px-*` → `padding-x-*`) — 전환율 95%

| Tailwind | px | DS 클래스 | 비고 |
| -------- | --- | -------- | ---- |
| `px-1` ~ `px-4` | 4~16px | `padding-x-4` ~ `padding-x-16` | 전환 가능 |
| `px-5` | 20px | — | Tailwind 유지 |
| `px-6` | 24px | — | Tailwind 유지 |

### 상하 패딩 (`py-*` → `padding-y-*`) — 전환율 96%

| Tailwind | px | DS 클래스 | 비고 |
| -------- | --- | -------- | ---- |
| `py-0.5` ~ `py-4` | 2~16px | `padding-y-2` ~ `padding-y-16` | 전환 가능 |
| `py-6` | 24px | — | Tailwind 유지 |
| `py-8` | 32px | — | Tailwind 유지 |

### 개별 방향 (`pt/pb/pl/pr`) — 선택적 전환

DS 지원 값이 있는 경우만 전환. 나머지는 Tailwind 유지.

```
✅ pt-1 (4px) → padding-t-4     ✅ pb-4 (16px) → padding-b-16
✅ pl-2.5 (10px) → padding-l-10  ✅ pr-1 (4px) → padding-r-4
❌ pt-2, pt-3, pb-2, pb-3 등 → Tailwind 유지 (DS 미지원)
```

> **자주 쓰이는 조합**: `px-3 py-2` (121+120건) → `padding-x-12 padding-y-8`

## 4. 영역별 표준 간격

| 영역 | 현재 (Tailwind) | DS 전환 대상 | 참조 |
| ---- | -------------- | ----------- | ---- |
| 카드 좌우 여백 | `px-3` | `padding-x-12` | `PANEL_CARD_EDGE_PADDING_X` |
| 참조패널 콘텐츠 | `px-1.5 py-2` | `padding-x-6 padding-y-8` | `REFERENCE_AREA_CONTENT_PADDING` |
| 사이드바 카드 | `p-1.5` | `padding-6` | `SIDEBAR_CARD_PADDING` |
| 사이드바 카드(컴팩트) | `p-2` | `padding-8` | `SIDEBAR_CARD_COMPACT_PADDING` |
| 사이드바 리스트 간격 | `space-y-2` | (Tailwind 유지) | `SIDEBAR_CARD_LIST_GAP` |
| 사이드바 섹션 간격 | `mt-2` | (Tailwind 유지) | `SIDEBAR_SECTION_SPACING` |

> **`src/features/layout/panelSpacing.ts`** 에 정의된 상수를 우선 사용할 것.
