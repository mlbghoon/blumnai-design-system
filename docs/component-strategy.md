# Blumnai Design System: 컴포넌트 전략 가이드

## 문서 개요

본 문서는 Blumnai Design System 개발 시 **SortUI(Figma 디자인 소스)**와 **shadcn/ui(React 컴포넌트 라이브러리)**를 효과적으로 활용하기 위한 전략적 가이드라인을 제시합니다.

---

## 1. 기술 스택 비교

### 1.1 SortUI

| 항목 | 설명 |
|------|------|
| **유형** | Premium Figma & Framer UI Kit |
| **역할** | 디자인 소스 (Source of Truth) |
| **React 코드** | 제공하지 않음 - 직접 구현 필요 |
| **장점** | 픽셀 퍼펙트 디자인, 다크/라이트 테마, Figma Variables 지원 |
| **라이선스** | 상용 라이선스 (1회 구매, 평생 업데이트) |

### 1.2 shadcn/ui

| 항목 | 설명 |
|------|------|
| **유형** | React 컴포넌트 라이브러리 (Copy & Paste) |
| **역할** | 복잡한 인터랙션 컴포넌트의 기반 코드 |
| **접근성** | Radix UI 기반의 완전한 ARIA 지원 |
| **키보드 네비게이션** | 모든 컴포넌트에 구현됨 |
| **스타일링** | Tailwind CSS + CVA (Class Variance Authority) |
| **커스터마이징** | 소스 코드를 직접 수정하는 방식 |
| **라이선스** | MIT (무료, 상용 사용 가능) |

### 1.3 핵심 차이점

```text
┌─────────────────────────────────────────────────────────────────┐
│                        역할 분담                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   SortUI (Figma)              shadcn/ui (React)                │
│   ┌─────────────┐             ┌─────────────┐                  │
│   │   디자인    │             │   인터랙션   │                  │
│   │   스펙      │      +      │   로직      │                  │
│   │   토큰      │             │   접근성    │                  │
│   └─────────────┘             └─────────────┘                  │
│         │                           │                          │
│         └───────────┬───────────────┘                          │
│                     ▼                                          │
│            ┌─────────────────┐                                 │
│            │  Blumnai Design │                                 │
│            │     System      │                                 │
│            └─────────────────┘                                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. 컴포넌트 분류 전략

### 2.1 분류 기준

컴포넌트를 구현 방식에 따라 두 가지 카테고리로 분류합니다:

| 카테고리 | 설명 | 판단 기준 |
|----------|------|-----------|
| **A. shadcn 기반** | shadcn/ui를 베이스로 사용 | 복잡한 인터랙션, 접근성 요구사항 높음 |
| **B. 자체 구현** | SortUI 디자인 기반 직접 구현 | 단순한 스타일링, 이미 구현됨 |

---

## 3. 카테고리 A: shadcn/ui 기반 구현 권장

다음 컴포넌트들은 **복잡한 동작 로직과 접근성 요구사항**으로 인해 shadcn/ui를 기반으로 구현하는 것을 권장합니다.

### 3.1 날짜/시간 관련

| 컴포넌트 | shadcn 사용 이유 | 핵심 기능 |
|----------|-----------------|-----------|
| **Calendar** | 날짜 계산, 로케일, 범위 선택 | react-day-picker 기반, 키보드 네비게이션 |
| **Date Picker** | Calendar + Popover + Input 통합 | 날짜 포맷팅, 유효성 검사 |
| **Date Range Picker** | 복잡한 범위 선택 로직 | 시작/종료일 상태 관리 |

### 3.2 선택/입력 관련

| 컴포넌트 | shadcn 사용 이유 | 핵심 기능 |
|----------|-----------------|-----------|
| **Select** | 키보드 탐색, 타입어헤드, 스크롤 | Radix Select 기반 |
| **VirtualSelect** | 대량 옵션(1,000+) 가상화 | `@tanstack/react-virtual` 기반, 성능 최적화 |
| **Combobox** | 검색, 필터링, 비동기 로딩 | 검색 가능한 Select |
| **Input OTP** | 복사/붙여넣기, 자동 포커스 이동 | input-otp 라이브러리 기반 |
| **Input** | 유효성 검사, 마스킹, 다양한 variant | 통합된 입력 컴포넌트 |
| **Textarea** | 자동 리사이즈, 문자 수 제한 | 텍스트 영역 |
| **Pagination** | 페이지 로직, 키보드 탐색 | 페이지네이션 |

### 3.3 오버레이/팝업 관련

| 컴포넌트 | shadcn 사용 이유 | 핵심 기능 |
|----------|-----------------|-----------|
| **Dialog/Modal** | 포커스 트랩, 포털, ESC 키 처리 | Radix Dialog 기반, 스크롤 잠금 |
| **Sheet/Drawer** | 슬라이드 애니메이션, 포커스 관리 | Vaul 라이브러리 기반 |
| **Popover** | 위치 계산, 충돌 감지 | Radix Popover 기반 |
| **Tooltip** | 지연 로직, 위치 계산 | Radix Tooltip 기반 |
| **Hover Card** | 링크 미리보기, 지연 표시 | Radix Hover Card 기반 |

### 3.4 메뉴/네비게이션 관련

| 컴포넌트 | shadcn 사용 이유 | 핵심 기능 |
|----------|-----------------|-----------|
| **Dropdown Menu** | 서브메뉴, 키보드 탐색, 체크 상태 | Radix Dropdown Menu 기반 |
| **Context Menu** | 우클릭 처리, 위치 계산 | Radix Context Menu 기반 |
| **Navigation Menu** | 복잡한 hover/focus 상태 | Radix Navigation Menu 기반 |
| **Menubar** | 데스크톱 앱 스타일 메뉴 | Radix Menubar 기반 |

### 3.5 데이터 표시 관련

| 컴포넌트 | shadcn 사용 이유 | 핵심 기능 |
|----------|-----------------|-----------|
| **Data Table** | 정렬, 필터링, 페이지네이션, 선택 | TanStack Table 기반 |
| **Carousel** | 스와이프, 터치 지원, 자동 재생 | Embla Carousel 기반 |
| **Chart** | 다양한 차트 타입, 반응형 | Recharts 기반 |

### 3.6 폼/입력 관련

| 컴포넌트 | shadcn 사용 이유 | 핵심 기능 |
|----------|-----------------|-----------|
| **Slider** | 드래그, 키보드, 범위, ARIA | Radix Slider 기반 |
| **Tabs** | 키보드 탐색, ARIA, 포커스 관리 | Radix Tabs 기반 |
| **Accordion** | ARIA, 키보드 탐색, 애니메이션 | Radix Accordion 기반 |
| **Collapsible** | 확장/축소 애니메이션 | Radix Collapsible 기반 |
| **Radio Group** | 키보드 탐색, 그룹 상태 관리 | Radix Radio Group 기반 |

### 3.7 알림/피드백 관련

| 컴포넌트 | shadcn 사용 이유 | 핵심 기능 |
|----------|-----------------|-----------|
| **Toast/Sonner** | 큐 관리, 스택킹, 자동 닫기 | Sonner 라이브러리 기반 |
| **Alert Dialog** | 확인/취소 흐름, 포커스 관리 | Radix Alert Dialog 기반 |
| **Alert** | 다양한 variant, 액션 버튼 | 알림 메시지 |

### 3.8 레이아웃 관련

| 컴포넌트 | shadcn 사용 이유 | 핵심 기능 |
|----------|-----------------|-----------|
| **Resizable** | 드래그 리사이즈, 키보드 지원 | react-resizable-panels 기반 |
| **Scroll Area** | 크로스 브라우저 커스텀 스크롤바 | Radix Scroll Area 기반 |
| **Sidebar** | 반응형, 축소/확장, 지속 상태 | 복잡한 레이아웃 로직 |

---

## 4. 카테고리 B: 자체 구현 권장 (SortUI 기반)

다음 컴포넌트들은 **단순한 스타일링 중심**이거나 **이미 충분히 구현되어 있어** 직접 구현하는 것이 효율적입니다.

### 4.1 이미 구현된 컴포넌트 (유지)

| 컴포넌트 | 현재 상태 | 비고 |
|----------|----------|------|
| **Button** | ✅ 완료 | 7가지 스타일, 5가지 사이즈, 아이콘/로딩/단축키 지원 |
| **LinkButton** | ✅ 완료 | 폴리모픽 (button/anchor), 외부 링크 아이콘 |
| **AvatarButton** | ✅ 완료 | Avatar + Label 조합 |
| **ControlButton** | ✅ 완료 | 미디어 컨트롤용 아이콘 버튼 |
| **FilterButton** | ✅ 완료 | 토글/선택 상태 지원 |
| **ButtonGroup** | ✅ 완료 | 세그먼트 컨트롤 스타일 |
| **Avatar** | ✅ 완료 | 8가지 사이즈, 이니셜/이미지/빈 상태, 상태 배지 |
| **AvatarGroup** | ✅ 완료 | 스태킹, +N 오버레이 |
| **Badge** | ✅ 완료 | 상태 표시 |
| **Chip** | ✅ 완료 | 태그/필터 |
| **Accordion** | ✅ 완료 | 4가지 variant, 다크 모드 |
| **Breadcrumbs** | ✅ 완료 | 경로 탐색 |
| **Checkbox** | ✅ 완료 | Card, List, WithText 변형 포함 |
| **Radio** | ✅ 완료 | 라디오 버튼 |
| **Tooltip** | ✅ 완료 | 기본 툴팁 |
| **Popover** | ✅ 완료 | Radix 기반 팝오버 |
| **Chart** | ✅ 완료 | Bar, Line, Pie, Donut |
| **Input** | ✅ 완료 | default, password, textarea variant 지원 |
| **Select** | ✅ 완료 | 단일 선택, 다중 선택, 태그 모드 지원 |
| **Dropdown** | ✅ 완료 | Radix 기반 드롭다운 메뉴 |
| **Dialog** | ✅ 완료 | Radix 기반 모달 |
| **AlertDialog** | ✅ 완료 | 확인/취소 다이얼로그 |
| **Calendar** | ✅ 완료 | 날짜 선택, 범위 선택 지원 |
| **DatePicker** | ✅ 완료 | Calendar + Popover + Input 통합 |
| **DateRangePicker** | ✅ 완료 | 날짜 범위 선택 |
| **Slider** | ✅ 완료 | Radix 기반 슬라이더 |
| **Pagination** | ✅ 완료 | numbered, dot, simple variant 지원 |
| **Divider** | ✅ 완료 | 구분선 |
| **Table** | ✅ 완료 | compositional 패턴, 페이지네이션, 스크롤/고정 헤더 |
| **DataGrid** | ✅ 완료 | TanStack Table 기반, 정렬/필터/페이지네이션/컬럼 리사이즈/컬럼 재정렬 자동 관리 |
| **Scroll Area** | ✅ 완료 | Radix 기반 커스텀 스크롤바 |
| **Sheet** | ✅ 완료 | 사이드 패널/드로어 |
| **Sidebar** | ✅ 완료 | 네비게이션 사이드바, 접힘/펼침 지원 |
| **Switch** | ✅ 완료 | 토글 스위치 |
| **Stepper** | ✅ 완료 | 수평/수직, number/icon/dot 인디케이터, 18색상, 클릭 네비게이션 |
| **Tabs** | ✅ 완료 | pill, segmented, underline 변형 지원 |
| **Toast** | ✅ 완료 | Sonner 기반 알림 토스트 |
| **FileInput** | ✅ 완료 | 파일 업로드, 드래그 앤 드롭 지원 |

### 4.2 신규 구현 시 자체 개발 권장

| 컴포넌트 | 이유 | 복잡도 |
|----------|------|--------|
| **Card** | 컨테이너 스타일링만 필요 | 낮음 |
| **Separator** | 단순 구분선 | 매우 낮음 |
| **Skeleton** | CSS 애니메이션 | 낮음 |
| **Spinner** | SVG 애니메이션 | 낮음 |
| **Progress** (기본) | 단순 진행 표시 | 낮음 |
| **Typography** | CSS 클래스 | 낮음 |
| **Kbd** | 키보드 표시 스타일링 | 낮음 |
| **Empty** | 빈 상태 메시지 | 낮음 |
| **Toggle/Toggle Group** | 토글 버튼 스타일링 | 낮음 |

### 4.3 아이콘 시스템 (자체 구현 완료)

현재 구현된 아이콘 시스템은 shadcn의 Lucide 아이콘보다 훨씬 풍부합니다:

| 아이콘 타입 | 수량 | 비고 |
|------------|------|------|
| **Icon** (RemixIcon) | 23개 카테고리 | 레이지 로딩, 타입 안전 튜플 포맷 |
| **BrandIcon** | 122개 | 브랜드/로고 아이콘 |
| **IsometricIcon** | 310+개 | 3D 아이소메트릭 스타일 |
| **FileIcon** | 30개 | 파일 타입별 아이콘 |
| **FlagIcon** | 250+개 | 국가 플래그 |
| **CursorIcon** | 6개 | 커서 아이콘 |

---

## 5. 디자인 토큰 변환 가이드

### 5.1 Typography 변환

| shadcn 기본 | Blumnai 디자인 시스템 |
|-------------|----------------------|
| `text-xs` | `size-xs` |
| `text-sm` | `size-sm` |
| `text-base` | `size-md` |
| `text-lg` | `size-lg` |
| `leading-none` | `line-height-leading-3` |
| `leading-normal` | `line-height-leading-5` |
| `tracking-tight` | `letter-spacing-tracking-tight` |

### 5.2 Spacing 변환

| shadcn 기본 | Blumnai 디자인 시스템 | 값 |
|-------------|----------------------|-----|
| `p-1` | `padding-4` | 4px |
| `p-2` | `padding-8` | 8px |
| `p-3` | `padding-12` | 12px |
| `p-4` | `padding-16` | 16px |
| `px-4` | `padding-x-16` | 16px |
| `py-2` | `padding-y-8` | 8px |
| `gap-2` | `gap-8` | 8px |
| `gap-4` | `gap-16` | 16px |
| `h-9` | `height-36` | 36px |
| `h-10` | `height-40` | 40px |

### 5.3 Color 변환

| shadcn 기본 | Blumnai 디자인 시스템 |
|-------------|----------------------|
| `bg-primary` | `bg-state-primary` |
| `bg-secondary` | `bg-state-secondary` |
| `bg-destructive` | `bg-state-destructive` |
| `bg-muted` | `bg-muted` |
| `bg-accent` | `bg-state-soft` |
| `border` | `border-default` |
| `ring` | `border-highlight` |
| `text-muted-foreground` | `text-muted` |

---

## 6. 우선순위 로드맵

### Phase 1: 핵심 인터랙션 컴포넌트 ✅ 완료

1. ~~**Select** - 드롭다운 선택~~
2. ~~**Dialog** - 모달 다이얼로그~~
3. ~~**Popover** - 팝오버~~
4. ~~**Dropdown Menu** - 드롭다운 메뉴~~

### Phase 2: 폼 컴포넌트 ✅ 완료

1. ~~**Calendar** - 달력~~
2. ~~**Date Picker** - 날짜 선택~~
3. **Combobox** - 자동완성 입력 (미완료)
4. ~~**Slider** - 슬라이더~~

### Phase 3: 고급 컴포넌트 ✅ 완료

1. ~~**Data Table** - 데이터 테이블~~
2. ~~**Toast** - 알림 토스트~~
3. ~~**Sheet** - 사이드 시트~~

### Phase 4: 레이아웃 컴포넌트 ✅ 대부분 완료

1. ~~**Tabs** - 탭~~
2. **Navigation Menu** - 네비게이션 (미완료)
3. ~~**Sidebar** - 사이드바~~
4. **Resizable** - 리사이즈 패널 (미완료)

### Phase 5: 남은 컴포넌트 (다음 구현 대상)

1. ~~**Combobox** - 자동완성 입력 (검색 가능한 Select)~~
2. **Navigation Menu** - 네비게이션 메뉴
3. **Resizable** - 리사이즈 패널
4. **Context Menu** - 우클릭 메뉴
5. **Carousel** - 이미지 슬라이더
6. **Card** - 카드 컴포넌트
7. **Skeleton** - 로딩 스켈레톤
8. **Progress** - 진행 표시줄
9. ~~**VirtualSelect** - 대량 옵션 가상화 Select (`@tanstack/react-virtual` 기반)~~

---

## 7. 결론

Blumnai Design System은 **SortUI의 디자인 품질**과 **shadcn/ui의 기술적 완성도**를 결합하여 구축됩니다.

- **복잡한 인터랙션**: shadcn/ui를 기반으로 접근성과 사용성 확보
- **시각적 디자인**: SortUI 스펙을 정확히 반영
- **일관된 토큰**: 디자인 시스템 토큰으로 통일

이 전략을 통해 **개발 효율성**과 **디자인 품질**을 동시에 달성할 수 있습니다.

---

*문서 작성일: 2026-01-31*
*최종 업데이트: 2026-02-06*
*작성: Blumnai Design System Team*
