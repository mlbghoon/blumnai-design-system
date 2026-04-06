# Changelog

## [1.1.17] - 2026-04-06

### Added

- **Shadow CSS variables**: `--shadow-card`, `--shadow-modal-sm/md/lg`, `--shadow-component-default`, `--shadow-components-default`, `--shadow-component-focus`, `--shadow-component-misc-focus`, `--shadow-component-destructive-focus`, `--shadow-component-input-focus`, `--shadow-component-input-focus-error` — CSS-in-JS (Emotion) 소비자가 직접 사용 가능
- **Badge text color variables**: `--text-badge-red/orange/lime/green/cyan/blue/violet/fuchsia/pink/neutral` — 4개 테마 모두 정의
- **`src/styles/tokens/shadow.css`**: 새 토큰 파일

### Changed

- Shadow `@utility` 클래스들이 이제 `var(--shadow-*)` 참조 (기존 하드코딩 값 대신). 기능 변경 없음

## [1.1.16] - 2026-04-06

### Added

- **Divider `spacing` prop**: 구분선 주변 여백 크기를 `sm`(8px), `md`(12px), `lg`(16px), `xl`(24px)로 선택 가능 (`@default 'lg'`)
- **Divider `spacingOverride` prop**: px 단위로 여백 직접 지정. 설정 시 `spacing` 값 무시
- **`DividerSpacing` 타입** re-export
- **`padding-x-24` 유틸리티 클래스** 추가

### Changed

- **Divider 기본 여백 변경 (Breaking)**: 24px → 16px. 기존 24px 유지하려면 `spacing="xl"` 사용

### Stories

- Default 스토리에 `spacing`/`spacingOverride` 컨트롤 추가
- `Spacing`, `SpacingWithContent`, `SpacingOverride` 스토리 3개 추가

## [1.1.14] - 2026-04-04

### Fixed

- **DS 컴포넌트 전체 감사 (50개 컴포넌트)**: UX 가이드라인 위반 28건 수정
  - **font-weight**: `font-bold` → `font-semibold` (Dialog, EventCalendar, Combobox)
  - **shadow**: Tailwind `shadow-sm/md/lg` 및 커스텀 `shadow-[...]` → DS 토큰 (`shadow-card`, `shadow-modal-sm/md`, `shadow-component-default`) 적용 (Card, DragOverlay, Sheet, InputOTP, NavigationMenu, Sidebar, Checkbox, Radio, RadioCard, Switch, Chart)
  - **color**: `bg-white` → CSS 변수 `var(--icon-white-default)` (VirtualSelectItem)
  - **transition**: `transition-all` → 변경 속성만 명시 (`transition-colors`, `transition-transform`, `transition-[width]` 등) (Button ×5, Accordion ×2, Carousel, Progress, ProgressCircular ×2, InputOTP, Tabs)
  - **spacing**: Tailwind arbitrary `w-[Npx]`/`h-[Npx]` → DS `width-*`/`height-*` 유틸리티 (Slider 계열 9개 파일)

## [1.1.13] - 2026-04-04

### Added

- **UX 가이드라인 훅 (`ux-guide-inject.sh`)**: 컴포넌트 소스 파일(`.tsx`, `.css`, `.scss`) 편집 시 매번 UX 체크리스트 자동 주입. `hook-checklist.txt`에서 동적으로 규칙 로드.
- **스킬 제안 훅 (`skill-suggest.sh`)**: 사용자 프롬프트 키워드 감지하여 관련 스킬 자동 제안 (8개 스킬 매핑).
- **완료 검증 훅 (`completion-check.sh`)**: 컴포넌트 완료 선언 시 typecheck/lint 미실행이면 차단.
- **UX 가이드라인 스킬 (`ux-guidelines`)**: `ux-guideline/foundations/` 9개 문서의 인덱스 + 빠른 결정 테이블.
- **`hook-checklist.txt`**: 훅이 매번 읽는 UX 규칙 체크리스트. 가이드라인 변경 시 이 파일만 수정.

### Changed

- **AI.md 대폭 축소** (3,768줄 → ~640줄, 83% 감소): Props 테이블 제거 (agents가 `.types.ts` 직접 읽음), Quick Reference Table 15개 항목 추가, 잘못된 import 경로 3곳 수정 (Form/CellAvatar/CellBadge).
- **CLAUDE.md 축소** (1,151줄 → ~248줄, 78% 감소): 스토리북 상세 규칙 → 스킬로 이동, shadcn 불필요 참조 삭제.
- **`font-bold` 금지로 통일**: UX 가이드라인 따름 — `font-normal`(400), `font-medium`(500), `font-semibold`(600)만 허용.
- **`design-system-rules` 스킬 중복 제거**: CLAUDE.md와 겹치던 typography/spacing/colors 섹션 삭제 (139줄 → ~50줄). shadcn 교체 테이블만 유지.
- **`storybook-story` 스킬 강화**: CLAUDE.md에 있던 전체 스토리 규칙 병합 (Single Source of Truth).

### Removed

- **`AGENTS.md`**: CLAUDE.md와 동일한 복사본, 삭제.
- **`.claude/skills/story/`**: `storybook-story/`와 중복 스킬, 삭제.

## [1.1.12] - 2026-04-03

### Added

- **단위 테스트 인프라**: `vitest` + `@testing-library/react` + `happy-dom` 테스트 환경 구축. `npm run test`로 실행, `npm run test:watch`로 워치 모드 지원.
- **Button/Checkbox/Tabs 인터랙션 테스트**: 22개 테스트 케이스 — 클릭, 비활성화, 로딩 상태, 체크박스 토글/indeterminate, 탭 전환/키보드 탐색 등 핵심 상호작용 검증.
- **MIGRATION.md**: 버전별 마이그레이션 가이드 문서. 0.2.x→1.0.0 스코프 이관, 1.0.x→1.1.x 변경 사항, FAQ (Dialog 내 Select 포탈, CSS 레이어, spacing 충돌 등).
- **Storybook GitHub Pages 배포**: `main` 브랜치 push 시 자동으로 GitHub Pages에 Storybook 배포.

### Changed

- **아이콘 카탈로그 재생성**: `ICONS.md` 및 `icon-catalog.ts` — 3,782개 아이콘 across 24개 카테고리로 업데이트. `generate-icon-catalog.mjs`가 `.ts` 확장자 인식하도록 수정.
- **Storybook 설정 정리**: `.storybook/main.ts` — 순환 청크, 미사용 optimizeDeps, no-op 플러그인 등 173줄의 불필요한 설정 제거 (235줄 → 62줄).

### Fixed

- **JSDoc 정리**: DatePicker 중복 JSDoc 제거, Form에 `@example` 추가. 전체 15개 주요 컴포넌트 JSDoc 품질 검증 완료.
- **react-hook-form 타입체크 실패 수정**: optional peerDep인 `react-hook-form`, `@hookform/resolvers`, `zod`를 devDependencies에 추가. 로컬/CI에서 `npm run typecheck` 항상 통과.

## [1.1.11] - 2026-04-03

### Fixed

- **CSS 빌드 출력 경로 수정**: `cssCodeSplit: true` 전환으로 빌드 CSS 파일명이 `blumnai-design-system.css` → `index.css`로 변경되었으나, `package.json` exports와 `strip-css-layers.mjs`가 이전 파일명을 참조하고 있던 문제 수정. `import '@blumnai-studio/blumnai-design-system/styles'`가 정상 동작하도록 복구.

## [1.1.10] - 2026-04-03

### Added

- **TruncatedText 컴포넌트**: 텍스트가 잘릴 때만 자동으로 DS 툴팁을 표시하는 유틸리티 컴포넌트. Select/MultiSelect 옵션에서 사용.
- **아이콘 프리로드 API**: `preloadIconCategory(category)`, `preloadIcons(iconTypes)` 함수 export 추가. 소비자가 아이콘 카테고리를 미리 로드할 수 있음.
- **번들 분석 도구**: `npm run analyze` 명령으로 `rollup-plugin-visualizer` 트리맵 생성 (`bundle-analysis.html`)
- **README 번들 최적화 섹션**: 아이콘 지연 로딩 방식, 서브패스 임포트 가이드, 번들 분석 사용법 문서 추가

### Changed

- **아이콘 파일 JSX → createElement 변환**: 모든 아이콘 카테고리 파일(`.tsx`)을 `.ts`(createElement) 형식으로 변환. Vite dev server에서 Babel JSX 트랜스폼을 우회하여 esbuild만 사용.
  - UI 아이콘: 19개 카테고리 파일, 3,058개 컴포넌트
  - 플래그 아이콘: `all.ts`, 260개 컴포넌트
  - 아이소메트릭 아이콘: 8개 청크 파일, 311개 컴포넌트
  - 파일 아이콘: `all.ts`, 27개 컴포넌트 (썸네일 조건부 렌더링 포함)
- **공유 SVG 파서 모듈**: `scripts/lib/svg-to-create-element.mjs` — 플래그/아이소메트릭/파일 아이콘 제너레이터가 공유하는 재귀적 SVG-to-createElement 변환기
- **UI 아이콘 레지스트리 스캐너**: `.ts`와 `.tsx` 모두 인식하도록 필터 업데이트
- **빌드: CSS 코드 스플릿 활성화**: `cssCodeSplit: true`로 변경하여 컴포넌트별 CSS 분리
- **Select/MultiSelect/Combobox 옵션 텍스트 툴팁**: 기존 `title` 속성 기반 네이티브 툴팁을 `TruncatedText` 컴포넌트(DS 툴팁)로 교체
- **Select/MultiSelect/Combobox PortalContainerProvider**: 드롭다운 내부에 중첩된 floating 컴포넌트(툴팁 등)의 z-index 스태킹 수정

### Fixed

- **Storybook 아이콘 로딩 속도 대폭 개선**: `storybook:react-docgen-plugin`이 수백 개 export가 있는 아이콘 데이터 파일을 Babel AST로 파싱하며 10-20초 소요되던 문제 수정. 아이콘 데이터 파일을 docgen에서 제외하여 1초 이내로 단축.

### Performance

- **Avatar/Skeleton**: `React.memo` 래핑으로 불필요한 리렌더 방지
- **TooltipTrigger**: 3개 타이머 ref를 1개로 통합, `zIndex` prop 추가
- **Textarea**: 커서 위치 계산용 mirror div를 매번 생성/제거하지 않고 재사용
- **Tabs**: `ResizeObserver` 콜백을 `requestAnimationFrame`으로 디바운스
- **SidebarProvider**: 키보드 단축키 리스너를 `toggleRef`로 안정화, 리렌더마다 리스너 재등록 방지
- **TimeColumn**: 이중 `requestAnimationFrame` → 단일 RAF로 간소화

## [1.1.9] - 2026-04-02

### Fixed

- **Select/MultiSelect/VirtualSelect 트리거 텍스트 ellipsis**: 트리거 내부 span이 inline이라 `text-overflow: ellipsis`가 미적용되던 문제 수정. `block truncate` 클래스 추가로 긴 옵션 라벨이 `...`으로 올바르게 잘림.
- **Select/MultiSelect/VirtualSelect 옵션 라벨 잘림 + 툴팁**: 드롭다운 옵션 텍스트가 컨테이너를 넘어 클리핑되던 문제 수정. 옵션에 `truncate` + `title` 속성 추가하여 ellipsis 처리 및 네이티브 툴팁 표시.
- **MultiSelect/VirtualSelect ScrollArea → plain div 교체**: Radix ScrollArea 내부 `display: table` 래퍼가 콘텐츠 너비를 확장시켜 옵션 truncation이 동작하지 않던 문제 수정. `overflow-y-auto overflow-x-hidden scrollbar-thin` div로 교체.
- **Select/MultiSelect/VirtualSelect 검색 입력 테두리**: `border-b border-default`가 모든 방향에 테두리를 적용하던 문제 수정. `border-b-default`로 변경하여 하단만 테두리 표시.
- **VirtualSelect 무한 스크롤 로딩 인디케이터**: 데이터 로딩 중 시각적 피드백 없던 문제 수정. 기존 옵션 유지하면서 하단에 스피너 표시. 옵션이 없을 때만 전체 스피너 표시.

## [1.1.8] - 2026-04-02

### Fixed

- **Select 트리거 오버플로우 (relative 래퍼)**: `InputWrapper` 내부 `<div className="relative">` 래퍼에 `min-w-0` 추가. flex 컨테이너 안에서 트리거가 부모 너비를 초과하던 문제 수정.

## [1.1.7] - 2026-04-02

### Fixed

- **Select 트리거 텍스트 오버플로우**: 옵션 라벨이 트리거 너비보다 길 때 텍스트가 넘치던 문제 수정. `line-clamp-1` → `truncate`로 변경하여 ellipsis 처리.

## [1.1.6] - 2026-04-02

### Fixed

- **MultiSelectProps showActions 타입 누락**: `Select variant="multi-select"`에서 `showActions`, `applyLabel`, `cancelLabel` props가 TypeScript 타입에 누락되어 있던 문제 수정. 런타임은 정상 동작했으나 TS에서 에러 발생했음.

## [1.1.5] - 2026-04-02

### Added

- **MultiSelect/VirtualSelect showActions**: 적용 버튼 모드. `showActions={true}` 설정 시 체크박스 클릭이 즉시 반영되지 않고, 하단 '적용'/'취소' 버튼으로 일괄 반영. `applyLabel`, `cancelLabel` 커스텀 가능.

## [1.1.4] - 2026-04-02

### Added

- **VirtualSelect onSearchChange**: 서버사이드 검색 콜백. 설정 시 클라이언트 필터링 비활성화, 소비자가 options 배열 직접 제어 가능.

### Changed

- **Select 드롭다운 스크롤바 스타일링**: `scrollbar-thin` 유틸리티 클래스 적용으로 브라우저 기본 스크롤바 대신 DS 테마 스크롤바 표시
- **MultiSelect ScrollArea 적용**: 드롭다운 옵션 목록을 DS `ScrollArea` 컴포넌트로 래핑, 일관된 커스텀 스크롤바 표시
- **Combobox ScrollArea 적용**: 드롭다운 스크롤 컨테이너를 DS `ScrollArea`로 교체, 커스텀 스크롤바 + 기존 상하 스크롤 버튼 유지

## [1.1.3] - 2026-04-02

### Added

- **VirtualSelect InfiniteScroll 스토리**: `onLoadMore` 무한 스크롤 기능 데모 스토리 추가
- **VirtualSelect argTypes 보완**: `onLoadMore`, `loadMoreThreshold` Storybook 컨트롤 문서 추가

## [1.1.2] - 2026-04-02

### Added

- **VirtualSelect onLoadMore**: 무한 스크롤 지원. 스크롤이 목록 하단에 도달하면 `onLoadMore` 콜백 호출. `loadMoreThreshold` (기본 5)로 발동 시점 조절 가능.

## [1.1.1] - 2026-04-02

### Added

- **EventCalendar 컴포넌트**: FullCalendar 대체용 월간 캘린더 그리드 컴포넌트
  - `renderDayContent` — 날짜별 커스텀 JSX 렌더링 (DayContext: isOutsideMonth, isToday, isWeekend, isDisabled 제공)
  - `dayCellClassName` — 날짜별 셀 className 콜백
  - `headerActions` — 헤더 오른쪽 커스텀 콘텐츠 슬롯
  - `month` / `onMonthChange` — controlled 월 상태
  - `onDateClick` — 날짜 클릭 콜백
  - `size` 프리셋 (`compact` 80px / `default` 120px / `large` 160px) 및 `cellHeight` 커스텀
  - `weekStartsOn` — 주 시작 요일 설정 (기본 일요일)
  - `locale` — date-fns Locale 지원 (기본 한국어)
  - `disabledDate` — 비활성 날짜 콜백
  - `formatMonthLabel` — 월 라벨 포맷 커스텀
  - 주말 컬럼 배경 틴트 (일요일: 빨강, 토요일: 파랑)
  - 오늘 날짜 파란 원형 인디케이터
  - 키보드 접근성 (`role="grid"`, `gridcell`, Enter/Space)
  - `React.memo` DayCell, `useMemo`/`useCallback` 성능 최적화
  - `forwardRef` 지원
  - Storybook 스토리 9개 (Default, WithCustomContent, WithHeaderActions, Compact, Large, WithDisabledDates, MondayStart, FourRowMonth, SixRowMonth)

## [1.0.65] - 2026-03-29

### Fixed

- **Select clearable 버튼 위치 수정**: 절대 위치(absolute)로 chevron 아이콘과 겹치던 clear 버튼을 트리거 내부 flex 레이아웃으로 이동. 모든 Select 컴포넌트 clear 버튼에 `cursor-pointer` 추가.
- **Checkbox 라벨 정렬 수정**: description이 없을 때 `items-center`로 체크박스와 라벨 수직 정렬 개선
- **Checkbox size별 라벨 크기 연동**: `size` prop에 따라 라벨/설명 텍스트 크기 자동 조정 (sm→size-sm, md→size-md, lg→size-lg)

### Changed

- **Storybook 스토리 컨트롤 보강**:
  - **Select**: `labelPosition`, `clearable`, `loading`, `selectType` 컨트롤 추가
  - **Checkbox**: `size`, `shape` 컨트롤 추가, `checkboxPosition`에 `'off'` 옵션 추가, `checked` 컨트롤 동작 수정
  - **Divider**: `orientation` 컨트롤 추가
  - **Chip**: `disabled` 컨트롤 추가, `{...args}` 스프레드 제거
  - **Resizable**: `defaultSize`, `minSize`, `maxSize`, `collapsible`, `collapsedSize` 컨트롤 추가
- **Storybook 구조 수정**: 6개 아이콘 스토리에 `layout: 'padded'` 추가, DnD Patterns에 `tags: ['autodocs']` 추가

## [1.0.64] - 2026-03-27

### Changed

- **기본 텍스트 한국어화**: 모든 컴포넌트의 영문 기본값(placeholder, 에러 메시지 등)을 한국어로 변환
  - **Select / MultiSelect / VirtualSelect**: `'Select...'` → `'선택...'`, `'Search...'` → `'검색...'`, `'No results found'` → `'검색 결과 없음'`
  - **Combobox**: `'No search results'` → `'검색 결과 없음'`, `'Your search did not match any results.'` → `'검색 결과와 일치하는 항목이 없습니다.'`, `Add "value"` → `"value" 추가`
  - **RadixMultiSelect / VirtualSelect**: `'N selected'` → `'N개 선택됨'`, `'+N more'` → `'+N개 더'`
  - **FileUploadArea**: `'Drop your files here, or'` → `'파일을 여기에 놓거나'`, `'click to browse'` → `'클릭하여 찾아보기'`, 에러 메시지 한국어화
  - **Dropdown**: `'Search...'` → `'검색...'`
  - **AvatarGroup**: `'N more'` → `'N개 더'`

## [1.0.63] - 2026-03-27

### Changed

- **성능 최적화**: 전체 컴포넌트 성능 개선
  - **DataGrid 행 가상화**: 100행 초과 시 `@tanstack/react-virtual` 기반 자동 가상화. DOM 노드 수 대폭 감소로 대용량 테이블 렌더링 성능 향상.
  - **DataGridRow / DataGridCell**: `React.memo` 적용으로 형제/부모 리렌더 시 불필요한 하위 렌더링 방지
  - **TableTooltip 컨텍스트 메모이제이션**: `'use no memo'` 프라그마 제거, `useMemo`로 컨텍스트 값 안정화. 1000+ 소비자 리렌더 방지.
  - **CellText 복사 타임아웃 정리**: `setTimeout` 누수 수정. 언마운트 시 `copyTimeoutRef` 클린업 추가.
  - **VirtualSelectItem 콜백 안정화**: `handleClick`에 `useCallback` 적용, `onSelect`를 `(id: string) => void`로 변경하여 안정적인 참조 전달
  - **VirtualSelect / Combobox / RadixMultiSelect**: `triggerClassName`에 `useMemo` 적용, 매 렌더마다 `cn()` 재계산 방지
  - **SidebarPrimitives**: `setOpen` 콜백에서 `open` 의존성 제거 (`openRef` 패턴). 토글 캐스케이드 중단, 키다운 리스너 재등록 방지.
  - **Icon / Badge / Chip / StatusDot**: `React.memo` 적용으로 리스트 내 불필요한 리렌더 방지
  - **DropdownInput**: 드롭다운 닫힘 상태에서 `mousedown` 글로벌 리스너 미등록

## [1.0.62] - 2026-03-27

### Fixed

- **PortalContainerContext 전체 적용**: 모든 플로팅/오버레이 컴포넌트에 `PortalContainerContext` 패턴 통일. Dialog/Sheet/Drawer/Popover 내부에서 Select, Combobox, DropdownMenu, Tooltip 등 사용 시 포탈이 부모 컨테이너 안에 렌더링되어 z-index 충돌, 포커스 트랩 충돌, 이중 floating-ui 위치 계산 문제 해결.
  - **Provider 추가**: `Popover`, `Sheet`, `Drawer`, `AlertDialog` — 자식 플로팅 컴포넌트가 부모 컨테이너 안으로 포탈
  - **Consumer 추가**: `DropdownMenu`, `ContextMenu`, `HoverCard`, `Menubar` — `usePortalContainer()` 자동 소비
  - **createPortal 수정**: `TooltipTrigger`, `DropdownInput`, `TableTooltip` — `document.body` 하드코딩 제거, 컨텍스트 컨테이너 우선 사용

### Changed

- **AI.md**: TooltipTrigger `content` ReactNode 사용 시 `<Tooltip>` 래퍼 필요 안내 추가, CellText `onCopy` prop 반영

## [1.0.61] - 2026-03-25

### Added

- **CellText `onCopy` 콜백**: `copyable` 사용 시 복사 성공 후 호출되는 `onCopy?: (value: string) => void` 콜백 추가. 토스트 알림 등 소비자 측 사이드 이펙트 처리 가능.

## [1.0.60] - 2026-03-25

### Fixed

- **DataGrid CellText 복사 아이콘 호버 범위**: 행 전체 호버 시 모든 복사 아이콘이 표시되던 문제 수정. `group/cell` 스코핑으로 해당 셀 호버 시에만 복사 아이콘 표시.
- **DataGrid CellText 복사 클릭 시 행 클릭 동시 발생**: 복사 버튼 클릭 시 `stopPropagation`으로 `onRowClick` 이벤트 전파 방지. 복사와 행 클릭이 상호 배타적으로 동작.
- **Input 스토리 size 옵션 누락**: 모든 Input 변형 스토리에서 `size` argTypes 옵션에 `'xs'`가 누락되어 Storybook에서 선택 불가했던 문제 수정.

## [1.0.59] - 2026-03-25

### Added

- **TooltipTrigger `asChild` prop**: 래퍼 `<span>` 없이 자식 요소에 직접 이벤트 핸들러와 ref를 병합. Radix `Slot` 기반으로 구현.
- **Button `tooltip` / `tooltipPlacement` props**: 버튼에 호버 툴팁을 간편하게 추가. 내부적으로 `<TooltipTrigger asChild>`를 사용하여 DOM에 래퍼 없이 적용. `tooltipPlacement`로 위치 지정 (`'top'` | `'bottom'` | `'left'` | `'right'`, 기본값 `'top'`).
- **Textarea 툴바 Button 컴포넌트 적용**: 툴바 액션(첨부, 음성입력, 제출 포함)을 raw `<button>`에서 `Button` 컴포넌트로 교체. `buttonStyle`, `colorOverride`, `tooltip` prop을 통해 버튼 스타일·색상·툴팁을 자유롭게 제어 가능.

## [1.0.58] - 2026-03-24

### Added

- **MonthPicker/MonthRangePicker 키보드 입력 지원**: YYYY.MM 세그먼트 입력 추가. 숫자 직접 입력, 자동 이동(year→month), 화살표/Tab 키 탐색, blur 시 자동 패딩 지원. 달력 아이콘 클릭으로 기존 팝오버 그리드도 사용 가능.

### Fixed

- **MonthPicker/MonthRangePicker 포커스 링 스타일**: DatePicker와 동일한 `shadow-component-input-focus` 스타일로 변경 (기존: Tailwind ring-2).
- **MonthPicker/MonthRangePicker 연도 버튼 임의값 제거**: `hover:bg-[var(--bg-state-ghost-hover)]` → `hover:bg-state-ghost-hover`.

## [1.0.57] - 2026-03-24

### Added

- **TimePicker/TimeRangePicker `size="xs"` 지원**: 기존 `'sm'`(32px) / `'lg'`(36px) 외에 `'xs'`(28px) 크기 추가. DataGrid 테이블 셀 등 높이가 제한된 환경에서 사용. 세그먼트 입력, 구분자, AM/PM 버튼, 아이콘 모두 xs 크기에 맞게 축소.

## [1.0.56] - 2026-03-23

### Added

- **Badge `closeColor` prop**: 닫기 아이콘의 색상을 badge 색상과 별도로 지정 가능. 예: `<Badge color="blue" closeIcon closeColor="neutral" />`
- **onClick 시 cursor-pointer 자동 적용**: Badge, Avatar, AvatarGroup, StatusDot — `onClick` prop이 전달되면 자동으로 `cursor: pointer` 스타일 적용.

## [1.0.55] - 2026-03-23

### Fixed

- **Select 빈 문자열 value 처리**: `id: ''`인 옵션이 있어도 Radix 런타임 에러 없이 정상 동작. 내부적으로 sentinel 값으로 매핑하여 `value=""`, `defaultValue=""`, `options: [{ id: '', label: '전체' }]` 패턴을 안전하게 지원. `onChange` 콜백에는 원본 빈 문자열이 전달됨.

## [1.0.54] - 2026-03-22

### Added

- **TimePicker/TimeRangePicker `showActions` prop**: 취소/적용 버튼 표시 옵션 추가. 활성화 시 draft 상태로 변경 사항을 버퍼링하고, 적용 클릭 시에만 값이 반영됨.
- **TimePicker/TimeRangePicker `minuteStep`/`secondStep` props**: 분/초 간격 제어. 예: `minuteStep={5}` → 0, 5, 10, ..., 55.
- **TabsList `activeTextColor`/`activeUnderlineColor` props**: underline 변형에서 활성 탭의 텍스트 색상과 언더라인 색상을 개별 제어 가능. 기존 `activeColor`(둘 다 동시 설정)도 하위 호환 유지.

### Changed

- **TimeRangePicker 레이아웃**: 탭 UI를 제거하고 시작/종료 패널을 나란히(side-by-side) 표시하는 레이아웃으로 변경.
- **TimePicker/TimeRangePicker 프리셋 위치**: 빠른 선택 버튼을 하단에서 좌측 사이드바로 이동 (DatePicker와 동일한 패턴).
- **TimePicker/TimeRangePicker 팝오버 패딩**: `![padding:0]`으로 PopoverContent 기본 패딩을 정확히 오버라이드 (DatePicker와 동일).

### Fixed

- **MonthPicker/MonthRangePicker 선택 월 텍스트 색상**: 존재하지 않는 `--text-on-color` CSS 변수를 `text-white-default`로 교체.
- **TimePicker/TimeRangePicker 액션 버튼 CSS**: 불필요한 `border-t` 제거, 적용 버튼 텍스트 `text-white` → `text-white-default`.
- **Drawer 드래그 핸들 제거**: 모든 방향(상/하/좌/우)의 드래그 핸들 바 제거.
- **Drawer/Sheet 닫기 버튼 위치**: `right:20px/top:20px` → `right:16px/top:16px`으로 조정. DrawerHeader에 `padding-right:48px`, SheetHeader에 `padding-right:32px` 추가하여 닫기 버튼과 제목 겹침 방지.
- **Drawer 제목 위치**: DrawerHeader `padding-top:24px`로 제목을 아래로 이동.

## [1.0.52] - 2026-03-21

### Fixed

- **TimePicker/TimeRangePicker 한국어 레이블**: 컬럼 헤더를 한국어로 변경 (Hour→시, Min→분, Sec→초, AM/PM→오전/오후). 기본 빠른선택 옵션도 한국어로 변경 (Now→현재, Morning→오전, Business Hours→업무시간 등).
- **TimePicker 스크롤 중앙 정렬**: 팝오버 열릴 때 선택된 항목이 스크롤 영역 중앙에 위치하도록 변경 (`block: 'nearest'` → `block: 'center'`).

## [1.0.51] - 2026-03-21

### Added

- **TimePicker/TimeRangePicker 스크롤 컬럼 팝오버**: 시계 아이콘 클릭 시 항상 스크롤 가능한 컬럼 피커(시, 분, 선택적 초, 선택적 AM/PM) 팝오버가 열림. 기존에는 `showQuickSelect` 활성화 시에만 동작했으나, 이제 항상 컬럼 피커가 표시됨. `showQuickSelect` 활성화 시 컬럼 아래에 빠른 선택 버튼도 함께 표시.
- **TimeRangePicker 탭 UI**: 컬럼 피커 팝오버에 "시작/종료" 탭(Segmented 변형) 추가. 각 탭에서 독립적으로 시간 선택 가능.
- **TimePickerPanel/TimeColumn 공유 컴포넌트**: 내부 공유 모듈(`shared/`) 추출. `TimeColumn`은 `React.memo` 래핑, `ScrollArea` 기반 스크롤, 선택 항목 자동 스크롤 지원.
- **TabsList `gap` prop**: underline 변형 전용 탭 간격 설정 (px 단위). 미설정 시 size 기반 기본값 사용 (sm: 12px, lg: 16px).

### Changed

- **Tabs underline `size="lg"` 폰트 크기**: underline 변형에서 `size="lg"` 사용 시 트리거 폰트가 `size-sm`(14px)에서 `size-md`(16px)로 변경.

### Refactored

- **TimePicker 유틸리티 통합**: `TimeInput.tsx`와 `TimeRangeInput.tsx`에서 중복된 9개 유틸리티 함수를 `shared/time-utils.ts`로 추출. 코드 중복 제거.

## [1.0.50] - 2026-03-21

### Added

- **`line-height-leading-none` 유틸리티**: `line-height: 1` (상대값) 토큰 및 CSS 유틸리티 클래스 추가. Badge, Button 단축키, Sidebar 메뉴 단축키 등 아이콘/텍스트 컨테이너에 사용.
- **`InputContext`**: `InputWrapper`가 제공하는 React Context 추가 (`useInputContext()` 훅). InputWrapper 내부의 깊은 자식 컴포넌트가 `captionId`, `errorId`, `required` 상태를 참조할 수 있도록 지원. Provider 없이 사용해도 안전 (`undefined` 반환).
- **Accordion 루트 `index.ts`**: `AccordionGroup`, `AccordionItem` 및 타입을 단일 진입점에서 re-export. `import { AccordionGroup, AccordionItem } from '…/accordion'` 가능.
- **Storybook Default 스토리 10개 추가**: AccordionGroup, Chart, Checkbox, DnD Patterns, DrawerSheet Comparison, Form, SignupForm, Select, DataGridCells, DataGridComponents에 인터랙티브 Default 스토리 추가.

### Fixed

- **Select/MultiSelect `aria-describedby` 누락 수정**: `RadixSelect`와 `RadixMultiSelect` 트리거에 `aria-describedby` 추가. 캡션/에러 텍스트를 스크린 리더가 읽을 수 있도록 수정 (WCAG 1.3.1).
- **Select/MultiSelect `aria-required` 누락 수정**: 필수 Select 필드에 `aria-required` 속성 추가 (WCAG 3.3.2).
- **Slider `aria-labelledby` 누락 수정**: Slider 라벨과 컨트롤을 `aria-labelledby`로 연결. 스크린 리더가 라벨을 읽을 수 있도록 수정 (WCAG 1.3.1).
- **Input/Password/Textarea `aria-required` 추가**: 필수 입력 필드에 명시적 `aria-required` 속성 추가.
- **`leading-none` DS 위반 수정**: Badge (4곳), Button (1곳), SidebarMenuItem (1곳)에서 Tailwind `leading-none`을 DS `line-height-leading-none`으로 교체. 타이포그래피 100% DS 준수 달성.
- **InputWrapper 캡션 ID 일관성**: InputWrapper가 `useId()`로 안정적인 ID를 생성하여 캡션/에러 요소에 `id` 부여. 기존 `inputId` 기반 패턴과 호환.

## [1.0.49] - 2026-03-20

### Fixed

- **Textarea `showCount` + toolbar 통합**: `showCount`와 `showToolbar`(또는 `onAttach`/`onSubmit` 등)를 함께 사용할 때, 글자 수가 별도 div 대신 툴바 우측에 표시되도록 수정. 기존에는 툴바가 있으면 카운트가 숨겨졌으나, 이제 툴바 trailing 영역에 자연스럽게 렌더링됨.

## [1.0.48] - 2026-03-20

### Added

- **`labelWidth` prop**: 모든 폼 컴포넌트에 `labelWidth` prop 추가 (`string | number`). `labelPosition="left"`일 때 라벨 너비를 고정하여 여러 가로 폼 필드의 라벨을 정렬할 수 있음. 숫자는 px, 문자열은 CSS 값으로 사용 (예: `100`, `"120px"`, `"8rem"`).

### Fixed

- **Select `labelPosition` 미전달 수정**: `Select.tsx` 래퍼가 `labelPosition`을 내부 컴포넌트에 전달하지 않던 버그 수정. 모든 variant(default, avatar, multi-select, tags)에서 `labelPosition`과 `labelWidth` 정상 전달.

## [1.0.47] - 2026-03-19

### Added

- **Tabs `animatedIndicator` prop**: 모든 탭 변형(Segmented, Pill, Underline)에 슬라이딩 인디케이터 애니메이션 추가. `animatedIndicator` prop으로 활성화하면 탭 전환 시 인디케이터가 0.3s ease 트랜지션으로 부드럽게 이동. MutationObserver로 `data-state` 변경 감지, ResizeObserver로 크기 변경 반영. 초기 렌더링 시 깜빡임 방지.
- **`label` ReactNode 지원**: Input, Select, Combobox, VirtualSelect, Textarea, DatePicker, TimePicker 등 모든 폼 컴포넌트의 `label` prop이 `string` 뿐만 아니라 `ReactNode`도 지원. 아이콘, 툴팁 등 커스텀 라벨 렌더링 가능.
- **`labelPosition` prop**: 모든 폼 컴포넌트에 `labelPosition` prop 추가 (`'top'` | `'left'`). `'left'`로 설정하면 라벨이 입력 필드 좌측에 인라인으로 배치됨. 검색/필터 폼의 가로 레이아웃에 유용.

## [1.0.46] - 2026-03-19

### Fixed

- **Select/Popover/Dropdown inside Dialog**: Dialog 내부에서 Select, Popover, DatePicker 등의 드롭다운이 Dialog 오버레이 뒤에 렌더링되어 접근 불가능하던 문제 수정. `PortalContainerContext`를 도입하여 Dialog가 자신의 콘텐츠 요소를 포탈 컨테이너로 제공하고, 하위 플로팅 컴포넌트가 이를 자동으로 사용하도록 변경. z-index 변경 없이 DOM 계층을 올바르게 구성하는 방식으로 해결.

## [1.0.45] - 2026-03-19

### Added

- **Select `size="xs"` (24px)**: 좁은 툴바/사이드바용 초소형 크기 추가. height-24, size-xs, padding-x-6 padding-y-4, 14px 아이콘.

## [1.0.44] - 2026-03-19

### Added

- **DateRangePicker `triggerVariant` prop**: `'compact'` 옵션 추가. 좁은 컨테이너에서 날짜 범위를 포맷된 텍스트로 표시하며, 공간 부족 시 말줄임(...) 처리. 전체 트리거가 클릭 가능한 버튼으로 동작하여 캘린더 팝오버를 열 수 있음.

## [1.0.43] - 2026-03-19

### Added

- **ScrollArea `fillViewport` prop**: 뷰포트 내부 래퍼에 `height: 100%`를 적용하여 자식 요소가 `min-height: 100%`로 뷰포트를 채울 수 있도록 지원. Radix 내부 `display: table` 래퍼의 특성을 활용하여 콘텐츠가 짧을 때는 뷰포트를 채우고 길 때는 자연스럽게 확장.

## [1.0.42] - 2026-03-19

### Fixed

- **ResizableHandle vertical 방향 핸들 미표시 수정**: `after:inset-x-0`이 Tailwind v4에서 `--spacing: initial` 설정 시 CSS를 생성하지 않아 vertical 방향 `::after` 라인이 width 0으로 렌더링되던 문제 수정. `after:left-0 after:right-0`으로 대체. `bg-border-darker`/`bg-border-strong`도 유효하지 않은 Tailwind 유틸리티였으므로 `bg-[var(--border-darker)]`/`bg-[var(--border-strong)]` arbitrary value로 교체.

## [1.0.41] - 2026-03-19

### Fixed

- **ResizableHandle vertical orientation 0px 높이 수정**: vertical 방향에서 핸들이 0px로 렌더링되던 문제 수정. `min-h-[4px]` 추가.

## [1.0.40] - 2026-03-19

### Added

- **ResizableHandle `lineColor` / `lineWidth` props**: 구분선 색상과 두께를 커스터마이즈할 수 있는 props 추가. CSS 커스텀 프로퍼티를 통해 `::after` pseudo-element에 적용.

## [1.0.39] - 2026-03-19

### Fixed

- **DropdownInput 좁은 컨테이너 레이아웃 수정**: 드롭다운 트리거에 `flex-shrink-0` 추가, 구분선에 `flex-shrink-0` 추가, 입력 영역에 `min-w-0 overflow-hidden` 추가하여 좁은 flex 컨테이너에서 구분선 사라짐/아이콘 넘침 방지.

## [1.0.38] - 2026-03-19

### Fixed

- **Select `renderOption` 체크 인디케이터 자동 포함**: `renderOption` 사용 시 선택된 아이템에 체크마크 인디케이터가 자동으로 표시되도록 수정. 기존에는 커스텀 렌더링 시 인디케이터가 누락됨.

## [1.0.37] - 2026-03-19

### Added

- **Select `renderValue` prop**: 트리거에 선택된 값을 커스텀 렌더링하는 함수 추가. `renderOption`과 함께 사용하여 드롭다운 옵션과 트리거 표시를 독립적으로 커스터마이즈 가능. default, avatar 변형 지원.

## [1.0.36] - 2026-03-19

### Fixed

- **INPUT_WRAPPER_BASE overflow-hidden 제거**: v1.0.34에서 추가된 `overflow-hidden`이 DropdownInput 내부 구분선과 아이콘을 잘라내는 문제 수정. `min-w-0`만으로 flex shrink 충분.

## [1.0.35] - 2026-03-19

### Fixed

- **Select 트리거 텍스트 말줄임 수정**: 선택된 값이 길 때 ellipsis 없이 잘리던 문제 수정. `SelectTrigger` 내부 값 span에 `truncate` 클래스 추가.

## [1.0.34] - 2026-03-19

### Fixed

- **InputWrapper flex shrink 버그 수정**: flex 컨테이너 내에서 Input/Select/DropdownInput이 축소되지 않고 overflow되는 문제 수정. `INPUT_CONTAINER_BASE`에 `min-w-0`, `INPUT_WRAPPER_BASE`에 `min-w-0 overflow-hidden` 추가.

## [1.0.33] - 2026-03-19

### Added

- **Select/Combobox `contentWidth` prop**: 드롭다운 콘텐츠(옵션 목록)의 너비를 트리거 너비와 독립적으로 제어하는 `contentWidth` prop 추가. 숫자(px) 또는 문자열(CSS 값) 지원. 모든 Select 변형(default, avatar, multi-select, tags)과 Combobox에 적용.

## [1.0.32] - 2026-03-11

### Added

- **InfoBox `collapsible` / `defaultOpen` prop**: 제목 클릭으로 내용을 접고 펼 수 있는 기능 추가. 셰브론 아이콘으로 상태 표시.
- **InfoBox `styleType="subtle"` prop**: 좌측 인디케이터 바 없이 회색 배경으로 컴팩트하게 표시하는 스타일 추가.
- **InfoBox 스토리 업데이트**: Subtle, Collapsible 스토리 추가. Default 스토리에 새 props 컨트롤 추가.

## [1.0.31] - 2026-03-11

### Fixed

- **typesVersions 와일드카드 제거**: `"*": ["dist/*.d.ts"]` 패턴이 bare import 경로를 `dist/dist/index.d.ts.d.ts`로 이중 해석하는 문제 수정. 모든 컴포넌트에 명시적 엔트리가 있으므로 와일드카드 불필요.

## [1.0.30] - 2026-03-11

### Added

- **InfoBox 스토리 추가**: InfoBox 컴포넌트 Storybook 스토리 추가 (Default, AllVariants, WithTitle, Closable, CustomIcon)
- **누락된 subpath export 7개 추가**: `accordion`, `aspect-ratio`, `dnd`, `empty-state`, `info-box`, `status-dot`, `stepper` — `package.json`의 `exports`와 `typesVersions`에 추가

### Improved

- **Icon Category 스토리 최적화**: 18개 카테고리를 동시 로드하던 방식에서 탭 선택 시 1개 카테고리만 로드하도록 변경. 카테고리별 전체 아이콘 표시. `getIconNamesByCategory()` 헬퍼 추가.

## [1.0.29] - 2026-03-11

### Added

- **Progress `gradient` prop**: `gradient` prop 추가 (linear variant 전용). CSS 그라디언트 문자열을 지정하면 `color` 대신 커스텀 그라디언트가 적용됩니다.
  ```tsx
  <Progress value={65} gradient="linear-gradient(90deg, #f9d508 0%, #74c2fd 100%)" />
  ```

## [1.0.28] - 2026-03-11

### Fixed

- **반원형 차트 범례 클리핑 수정**: PieChart/DonutChart의 `isHalf + showLegend` 조합에서 차트 상단이 잘리는 문제 수정. `svgHeight` 계산 시 범례 여부에 따라 패딩 동적 조정.

## [1.0.27] - 2026-03-10

### Performance

- **아이콘 번들 최적화**: Icon 컴포넌트에서 isometric 아이콘 카테고리 분리 (Icon/icons/index.ts에서 제거, generate-icons.mjs EXCLUDED_CATEGORIES에 추가). 소비자가 `<Icon>` 사용 시 3MB isometric 데이터가 로드되지 않음. `<IsometricIcon>`은 별도 경로로 정상 동작.
- **아이콘 barrel export 제거**: Icon/icons/index.ts의 18개 카테고리 `export *` 제거. 아이콘은 ui-icon-registry.tsx를 통해 카테고리별 온디맨드 로딩. Icon entry point 145KB→0KB 감소. Storybook 시작 속도 개선.
- **Tooltip 키프레임 CSS 이동**: TooltipTrigger의 런타임 `useEffect` 동적 `<style>` 주입 제거. `@keyframes tooltip-enter`를 src/index.css `@theme inline` 블록으로 이동 (accordion, progress, shimmer와 동일 패턴). SSR 안전, 첫 렌더 시 즉시 사용 가능.

### Fixed

- **Storybook 스토리 버그 수정**: Toast Default 스토리가 5개 변형 대신 단일 컨트롤 가능한 ToastContent 렌더링. ContextMenu width 컨트롤 `control: 'text'`→`control: 'number'`. ContextMenu alignOffset argType 제거 (컨텍스트 메뉴에서 효과 없음). union 타입 표시 수정: container/toastId 등 argType에 `table.type.summary` 추가.

## [1.0.26] - 2026-03-10

### Improved

- **Storybook 스토리 한국어화**: 전체 104개 스토리 파일의 argTypes description을 비개발자도 이해할 수 있는 상세 한국어로 보강. 영어 예시 데이터(라벨, 설명, 옵션명 등)를 한국어로 변환.
- **Storybook 성능 개선**: Storybook dev 메모리 한도 4GB→8GB, HMR 타임아웃 30s→60s 설정 추가.

### Fixed

- **ButtonInput 스토리 버그 수정**: `WithInputTailIcon`/`WithInputBothIcons` 스토리에서 존재하지 않는 `tailIcon` prop 사용 → 올바른 `buttonTailIcon` 사용으로 수정. 오해의 소지가 있는 스토리명 변경.
- **CSS 클래스 오타 수정**: DefaultInput/ShortcutInput의 `KeyboardShortcutBinding` 스토리에서 `"margin-0size-sm"` → `"margin-0 size-sm"` (스페이스 누락).
- **Chart 개요 페이지 autodocs 수정**: meta `component: BarChart` 제거로 잘못된 props 테이블 방지.
- **PasswordInput 강도 스토리 개선**: `WithStrengthAuto` 스토리에 상태 연동 추가 (low→에러, medium→에러+부족항목 안내, high→성공).
- **중복 스토리 제거**: ButtonInput(`TailButton`), AddOnInput(`SeparateAddOn`, `Discount`), Chart(`BarChartMultipleColors`).
- **Select 임의 색상 제거**: `CustomRenderOption` 스토리의 `bg-[#...]` → DS 시맨틱 `bg-basic-*-accent` 클래스.

### Added

- **누락 스토리 추가**: Select(clearable, loading, optionGroups, renderOption), SwitchList(showToggleAll), Tabs(scrollable, closable, animated), Dialog(fullScreen), Toast(action), Skeleton(animation, count), InputOTP(error, label), Textarea(fieldSizing, autoResize), FileUpload(maxFileSize), Dropdown(maxHeight, loading), Radio(size), Slider(showTicks), Accordion(headingLevel, defaultIsOpen, onToggle), HoverCard/Tooltip argTypes 추가 등.
- **Controls 컨벤션 정리**: Icon, Badge, Avatar, Accordion, Menubar, Chart, Select, Checkbox 등 ~15개 파일에 `controls: { disable: true }` 메타 설정 + Default 스토리에 `controls: { disable: false }` 추가.
- **argType 옵션 수정**: CheckboxDefault `checkboxPosition`, RadioDefault `radioPosition`에 누락된 `'off'` 옵션 추가.

## [1.0.25] - 2026-03-09

### Fixed

- **Chart 커스텀 툴팁 컨테이너 스타일 누락 수정**: `renderTooltip` 사용 시 배경/그림자/테두리 없이 콘텐츠만 표시되는 문제. 커스텀 툴팁 출력을 기본 툴팁과 동일한 컨테이너(`bg-card`, `shadow-modal-sm`, `rounded-card-xs`, `padding-4`)로 감싸도록 수정. `ChartTooltipAdapter`와 `PieTooltipAdapter` 모두 적용.

## [1.0.24] - 2026-03-09

### Fixed

- **LineChart X축 라벨 잘림 수정**: 첫 번째/마지막 데이터 포인트의 X축 라벨이 차트 영역을 벗어나 잘리는 문제. XAxis에 `padding={{ left: 20, right: 20 }}` 추가로 양쪽 여백 확보.

## [1.0.23] - 2026-03-09

### Fixed

- **ComboChart 듀얼 Y축 + 전체 0 데이터에서 그리드/Y축 라벨 미표시 수정**: Recharts 3 내부 버그 — 스택 바 데이터가 모두 0이면 도메인을 `undefined`로 폐기하여 스케일/틱/그리드 라인 전체가 렌더링되지 않는 문제. YAxis에 `dataKey`와 `allowDataOverflow` 추가로 도메인 계산 폴백 경로를 확보하고 정적 도메인 `[0, max(N,1)]`을 직접 계산하여 적용.

## [1.0.22] - 2026-03-09

### Fixed

- **Chart 그리드 라인 렌더링 수정**: `strokeDasharray=""` (무효 SVG 값) → `"3 3"` (대시 라인)으로 변경하여 그리드 라인 렌더링. CartesianGrid에 `syncWithTicks` 추가로 Y축 틱과 동기화. ComboChart에 `yAxisId="0"` 추가로 다중 축에서 그리드 라인 정상 표시.
- **`--chart-grid-line` 토큰 가시성 개선**: `var(--border-default)` (10% 투명도) → `var(--border-darker)` (15% 투명도)로 변경.

## [1.0.21] - 2026-03-08

### Fixed

- **Chart 엣지 케이스 강화**: LineChart, ComboChart, PieChart, DonutChart에 `data ?? []` null 가드 추가. `data`가 `null`/`undefined`일 때 크래시 방지.
- **Line/Area `connectNulls` 추가**: LineChart, ComboChart의 Line/Area 컴포넌트에 `connectNulls` 적용. Y값이 누락된 데이터 포인트가 있을 때 라인이 끊기지 않고 연속 렌더링.
- **엣지 케이스 스토리 추가**: 모든 차트 타입에 EmptyData, AllZeroValues, SingleDataPoint, MissingYValues 스토리 추가로 엣지 케이스 검증 가능.

## [1.0.20] - 2026-03-08

### Fixed

- **Chart y축 도메인 `domain` 미지정 시에도 최소 범위 보장**: 1.0.19의 도메인 수정이 `domain: 'auto'` 명시 시에만 적용되던 문제. `domain`이 `undefined`(미지정)인 경우에도 `[0, max(dataMax, 1)]`로 최소 상한 보장. LineChart, BarChart, ComboChart 모두 적용.

## [1.0.19] - 2026-03-08

### Fixed

- **Chart y축 도메인 전체 0 데이터 처리**: 모든 데이터 값이 0일 때 y축 도메인이 `[0, 0]`으로 계산되어 그리드 라인과 눈금이 사라지던 문제 수정. `domain: 'auto'`일 때 최소 상한을 1로 보장하여 `[0, 1]` 범위 표시. LineChart, BarChart, ComboChart 모두 적용.

## [1.0.18] - 2026-03-08

### Fixed

- **MultiSelect `selectedText` 단일 항목 무시 버그**: 1개 항목만 선택되었을 때 `selectedText` 콜백이 호출되지 않고 항상 항목 라벨이 표시되던 문제 수정. `selectedText`가 제공되면 선택 개수와 관계없이 항상 호출됨.

## [1.0.17] - 2026-03-08

### Improved

- **DataGrid 정렬 아이콘 기본 비활성화**: `sorting` 또는 `onSortingChange` prop이 없으면 모든 컬럼의 정렬 아이콘이 표시되지 않도록 변경. TanStack Table의 `enableSorting: true` 기본값을 오버라이드하여, 정렬 기능을 사용하지 않는 테이블에서 불필요한 정렬 아이콘이 나타나지 않음.

## [1.0.16] - 2026-03-08

### Improved

- **DateRangePicker `maxDate` 초기 월 표시 개선**: `maxDate`가 현재 월 이내일 때, 캘린더가 `[이전 월] [현재 월]`을 표시하도록 변경. 기존에는 `[현재 월] [다음 월]`로 표시되어 다음 월이 전부 비활성화되던 문제 개선. `numberOfMonths >= 2`일 때만 적용.

## [1.0.15] - 2026-03-08

### Added

- **Select/Combobox `tailIcon` prop**: 트리거 라벨 뒤, 화살표 앞에 아이콘을 배치하는 `tailIcon` prop 추가. Select (default/avatar/multi-select/tags), Combobox 모든 변형에서 사용 가능. `IconTypeWithFill` 타입.

### Fixed

- **Select/Combobox/VirtualSelect 옵션 텍스트 ellipsis 미표시**: 체크박스/체크아이콘이 공간을 차지하여 라벨이 밀릴 때, 텍스트가 ellipsis 없이 잘리던 문제 수정. 라벨 `<span>`에 `block` 추가하여 `text-overflow: ellipsis`가 정상 작동하도록 개선.

## [1.0.12] - 2026-03-05

### Improved

- **VirtualSelect 성능 최적화**: 중복 `selectableOptions` 메모 제거, `props`/`multiProps` 객체 대신 개별 값을 useCallback 의존성으로 사용하여 메모이제이션 정상 작동. `optionsMap`(O(1) 조회), `navigableIndexMap`(렌더 루프 내 O(1) 조회) 추가로 대량 옵션 리스트 성능 개선.
- **Stepper context 메모이제이션**: `contextValue`를 `useMemo`로 감싸서 불필요한 자식 컴포넌트 리렌더 방지.
- **DataGridHeader 리사이즈 안정성**: `onColumnSizingChange`를 ref로 저장하여 리사이즈 드래그 중 effect 재생성 방지. `useMergeRefs` 훅 적용.
- **MonthPicker/MonthRangePicker 공통 유틸 추출**: `MONTHS_KO`, `MONTHS_EN`, `formatYearMonth`, `isMonthDisabled`를 `calendar/utils.ts`로 분리하여 코드 중복 제거. MonthRangePicker에서 `getDisplayRange()` 36회 호출을 `useMemo` 1회로 최적화.

### Added

- **MonthPicker**: 단일 월 선택 컴포넌트. MonthRangePicker와 동일한 UI로 단일 월만 선택. `showQuickPresets` prop으로 빠른 선택 프리셋(이번 달, 지난 달, 3개월 전 등) 지원. `disabledFuture`, `minDate`, `maxDate`, `locale` 등 기존 월 선택 옵션 모두 지원.
- **MonthRangePicker Quick Presets**: `showQuickPresets` + `presets` props 추가. 기본 프리셋: 최근 3개월, 최근 6개월, 최근 1년, 올해, 작년. DatePicker/DateRangePicker와 동일한 QuickPresets 사이드바 패턴 적용.
- **Breadcrumb collapse dropdown**: `maxItems`로 축소된 브레드크럼의 "..." 클릭 시 숨겨진 아이템을 DropdownMenu로 표시. 기존 인라인 확장 동작을 드롭다운으로 교체.
- **Combobox `filterFunction`**: 커스텀 필터 함수 prop 추가. 기본 label+description 매칭 대신 이메일, ID 등 다중 필드 검색 로직을 소비자가 직접 제공 가능. 미지정 시 기존 동작 유지.
- **Slider/SliderRange Vertical Orientation**: `orientation="vertical"` prop으로 세로 방향 슬라이더 지원. `height` prop으로 세로 높이 지정 (기본 200px). 썸 툴팁이 우측에 표시되고, 눈금(ticks)이 트랙 우측에 배치. Slider와 SliderRange만 지원 (Input/DataRange 변형은 수평 전용).
- **Radio Size Prop**: `size` prop (`'sm'`|`'md'`|`'lg'`, 기본 `'sm'`)으로 라디오 크기 지원. Checkbox와 동일한 크기 체계: sm=16px, md=20px, lg=24px. 인디케이터 dot과 라벨 래퍼가 비례 확대. RadioList도 `size` prop 지원.
- **DataGrid Column Resize**: `enableColumnResize` prop으로 컬럼 헤더 경계를 드래그하여 너비를 조절할 수 있는 기능 추가. `columnSizing`/`onColumnSizingChange`로 제어 모드 지원. 최소 너비 50px, fr/minmax 컬럼은 첫 드래그 시 현재 픽셀 너비로 자동 변환. 컬럼 재정렬(`enableColumnReorder`) 및 스티키 컬럼과 호환.
- **DataGrid FullFeaturedCombination 스토리**: 정렬, 행 선택, 컬럼 재정렬, 컬럼 리사이즈, 고정 컬럼, 페이지네이션을 모두 조합한 풀 기능 스토리를 마지막에 배치. 기존 `ColumnReorderWithStickyColumns`, `ColumnResizeWithReorder` 등 개별 조합 스토리를 통합.

### Fixed

- **DataGrid 클라이언트 사이드 정렬 동작 안 함**: `onSortingChange`를 전달하면 `isServerSide`가 `true`로 판정되어 `getSortedRowModel`이 비활성화되고 `manualSorting: true`가 설정되던 버그 수정. 정렬 아이콘은 변경되지만 실제 데이터가 재정렬되지 않던 문제. `isServerSide` 판정을 `onPageChange` 존재 여부만으로 변경.
- **DataGrid 컬럼 재정렬 시 드래그 아이콘 분리**: 드래그 리스너를 헤더 셀 전체가 아닌 드래그 아이콘에만 적용하여 클릭(정렬)과 드래그(재정렬)를 분리.
- **Stepper**: 멀티 스텝 프로세스 인디케이터 컴포넌트. 수평/수직 방향, 3가지 인디케이터 타입(number, icon, dot), 3가지 크기(sm/md/lg), 18가지 색상, 클릭 네비게이션, 에러 상태, 완료 체크 아이콘 지원. 데이터 기반 API(`steps` 배열)로 사용.
- **Switch `onLabel`/`offLabel`**: 트랙 내부에 ON/OFF 텍스트 라벨 표시. 라벨 사용 시 트랙이 자동으로 확장되어 텍스트 공간 확보 (sm 32→40px, md 40→52px, lg 48→60px). 색맹 사용자 접근성 향상.
- **VirtualSelect**: 대량 옵션(1,000+)을 가상화하여 렌더링하는 새 컴포넌트. `@tanstack/react-virtual` 기반으로 화면에 보이는 항목만 DOM에 렌더링하여 성능 최적화. 단일/다중 선택, 검색, 전체 선택, 키보드 탐색 지원. 기존 Select 컴포넌트와 동일한 시각적 스타일링 및 DS ScrollArea 적용.

## [1.0.11] - 2026-03-05

### Fixed

- **Button secondary `colorOverride`**: secondary 스타일에서 colorOverride 적용 시 배경색은 유지하고 텍스트/아이콘/보더 색상만 변경되도록 수정

### Improved

- **Storybook 컨트롤 누락 수정**: Button(`colorOverride`), Switch(`size`, `loading`), Checkbox(`size`, `shape`) 컨트롤을 Default 스토리에 추가

## [1.0.10] - 2026-03-05

### Fixed

- **Textarea 리사이즈 핸들**: 커스텀 SVG 그립 아이콘을 제거하고 브라우저 네이티브 리사이즈 핸들만 사용하도록 변경

## [1.0.9] - 2026-03-05

### Fixed

- **Button `shrink-0 whitespace-nowrap`**: 버튼이 flex 컨테이너에서 축소되거나 텍스트가 줄바꿈되는 문제 수정. `shrink-0`과 `whitespace-nowrap`을 기본 스타일에 추가
- **Textarea 중복 리사이즈 핸들**: 커스텀 SVG 그립 아이콘과 브라우저 기본 리사이즈 핸들이 동시에 표시되는 문제 수정. 커스텀 그립이 있을 때 네이티브 핸들을 숨김

## [1.0.8] - 2026-03-04

### Fixed

- **Dialog/AlertDialog z-index**: 오버레이와 컨텐츠의 z-index를 `50`에서 `10000`으로 상향. 소비자 앱의 고정 네비게이션(`z-index: 999`) 위에 다이얼로그가 표시되도록 수정

## [1.0.7] - 2026-03-04

### Added

- **DialogTitle `weight` prop**: `DialogTitle`에 `weight` prop 추가 (`'medium' | 'semibold' | 'bold'`). 타이틀의 font-weight를 조절 가능
- **DialogContent `overlayClassName` prop**: `DialogContent`에 `overlayClassName` prop 추가. 오버레이(배경) 스타일을 커스터마이즈 가능 (예: `overlayClassName="bg-black/50"`)

## [1.0.6] - 2026-03-04

### Added

- **Radio `labelWeight` prop**: `Radio`에 `labelWeight` prop 추가 (`'normal' | 'medium'`). 라벨 텍스트의 font-weight를 조절하여 시각적 계층 구조 구현 가능

## [1.0.5] - 2026-03-04

### Added

- **Input `dropdownWidth` prop**: lead-dropdown/tail-dropdown 변형에 `dropdownWidth` prop 추가. 드롭다운 트리거 너비를 고정하여 옵션 변경 시 레이아웃 시프트 방지

## [1.0.4] - 2026-03-04

### Added

- **Radio `align` prop**: `Radio`에 `align` prop 추가 (`'start' | 'center'`). 라벨이 폼 컨트롤 등 복잡한 요소일 때 라디오 버튼을 수직 중앙 정렬 가능

## [1.0.3] - 2026-03-04

### Added

- **Tabs `activeColor` prop**: `TabsList`에 `activeColor` prop 추가. underline 변형에서 활성 탭의 텍스트 및 언더라인 색상을 커스터마이즈 가능 (예: `activeColor="#5988fe"`)

## [1.0.2] - 2026-03-04

### Fixed

- **Pagination disabled cursor**: 비활성화된 PaginationNav 버튼의 자식 Icon에 `pointer-events-none` 추가. 소비자 프로젝트의 글로벌 `button { cursor: pointer }` 스타일이 아이콘의 커서를 덮어쓰던 문제 수정

## [1.0.1] - 2026-03-04

### Fixed

- **DataGrid CellText 정렬**: `CellText`가 `block w-full`로 셀 전체를 차지해 부모의 `justify-center`/`justify-end`가 시각적으로 적용되지 않던 문제 수정. `text-center`/`text-right`를 CellText 자체에 적용하도록 변경
- **DataGrid headerAlign**: `ColumnMeta`에 `headerAlign` 속성 추가. 헤더와 셀의 정렬을 독립적으로 설정 가능

### Added

- `DataGridCellContext` — 셀 정렬 정보를 하위 컴포넌트에 전달하는 React Context
- `useCellAlign` hook — CellText 등 셀 내부 컴포넌트에서 정렬 정보를 읽는 hook
- `CellAlign` type export

## [1.0.0] - 2026-03-03

### Changed

- **패키지 스코프 이관**: `@mlbghoon/blumnai-design-system` → `@blumnai-studio/blumnai-design-system`
- **GitHub 리포지토리 이관**: `mlbghoon/blumnai-design-system` → `BlumnAI-Studio/blumnai-design-system`
- **인증 토큰 변경**: `GITHUB_TOKEN_MLBGHOON` → `GITHUB_TOKEN_BLUMNAI`
- 듀얼 리모트(origin + company) 구조를 단일 리모트(origin → BlumnAI-Studio) 구조로 단순화

### Migration

```bash
# 1. .npmrc에 새 스코프 추가
@blumnai-studio:registry=https://npm.pkg.github.com

# 2. 패키지 교체
npm uninstall @mlbghoon/blumnai-design-system --legacy-peer-deps
npm install @blumnai-studio/blumnai-design-system@1.0.0 --legacy-peer-deps

# 3. 소스코드 import 경로 일괄 변경
# @mlbghoon/blumnai-design-system → @blumnai-studio/blumnai-design-system
```

## [0.2.46] - 2026-03-03

### Deprecated

- **패키지 이관 안내**: `@mlbghoon/blumnai-design-system`은 `@blumnai-studio/blumnai-design-system`으로 이관되었습니다. 이 버전이 `@mlbghoon` 스코프의 마지막 릴리스입니다. 향후 업데이트는 새로운 스코프에서만 제공됩니다.

## [0.2.42] - 2026-02-27

### Added

- **BrandIcon `android`** — Android 로봇(bugdroid) 브랜드 아이콘 추가. `apple`, `windows`와 함께 FA 브랜드 아이콘 완전 대체 가능

## [0.2.40] - 2026-02-27

### Added

- **Textarea `autoResize`** — 입력 내용에 따라 자동으로 높이 조절, maxRows 없이 무한 확장
- **StatusDot** (신규 컴포넌트) — 상태 표시 컬러 도트 + 라벨
  - `color`: `'green' | 'red' | 'orange' | 'gray'`
  - `label`: 선택적 텍스트 라벨
  - `size`: `'sm' | 'md'`
- **EmptyState** (신규 컴포넌트) — 빈 상태 표시
  - `icon`: IconTypeWithFill 형식 아이콘
  - `title`, `description`: 텍스트 콘텐츠
  - `action`: 액션 영역 (보통 Button)
  - `size`: `'sm' | 'md'`
- **BarChart `layout`** — 가로 막대 차트 지원
  - `layout="horizontal"`: 축 교환, 바 radius 방향 전환, 카테고리 라벨 여백 자동 조정
- **Combobox `highlightSearch`** — 검색어 키워드 하이라이트
  - 옵션 라벨 및 설명에서 검색어와 일치하는 부분을 굵게 표시
  - 기본 활성화 (`highlightSearch={true}`)
- **MonthRangePicker** (신규 컴포넌트) — 월 범위 선택기
  - 연도 네비게이션 + 4×3 월 그리드
  - 범위 선택 (시작/끝 하이라이트, 호버 프리뷰)
  - `disabledFuture`, `minDate`, `maxDate` 제약 조건
  - `locale`: `'ko' | 'en'` 로케일 지원

## [0.2.38] - 2026-02-26

### Added

- **Recharts 마이그레이션** — 모든 차트 컴포넌트 내부를 커스텀 SVG에서 Recharts로 전면 교체
  - 기존 DS props API 100% 하위 호환 유지
  - `recharts` v3.7.0 production dependency 추가 (소비 프로젝트에서 ECharts 대체 시 번들 크기 순감소)
- **ComboChart** (신규 컴포넌트) — Bar + Line 혼합 차트
  - `barSeries` / `lineSeries` 배열로 시리즈 구성
  - `stack` prop으로 바 스태킹 지원
  - 듀얼 Y축: `yAxis`를 배열로 전달 시 왼쪽/오른쪽 축 자동 생성
  - `lineSeries[i].yAxisIndex`로 라인을 특정 Y축에 바인딩
  - `lineSeries[i].showArea`로 영역 채우기 지원
- **renderTooltip** — 모든 차트에 커스텀 툴팁 콜백 추가
  - `(params: ChartTooltipParams | PieTooltipParams) => ReactNode`
  - 미제공 시 `AdvancedTooltip` 기본 렌더링
- **BarChart**: `barRadius` prop 추가 — 바 모서리 둥글기 (스태킹 시 최상위 세그먼트만 적용)
- **LineChart**: `smooth` prop 추가 — `type="monotone"` 곡선 보간
- **DonutChart**: `showCenterOnHover` prop 추가 — 호버 시 슬라이스 이름/값을 중앙에 표시
- **ChartAxisConfig** 확장: `tickCount`, `interval`, `show` props 추가
- PieChart/DonutChart 툴팁에서 하드코딩된 영문 문자열('Value', 'Percentage') 제거 → `renderTooltip`으로 완전 커스터마이징 가능

### Infrastructure

- `useChartConfig` 공유 훅 — `getLabel`/`getColor` 로직 DRY 추출
- `ChartTooltipAdapter` / `PieTooltipAdapter` — Recharts payload → DS 타입 변환 어댑터
- `ChartLegend` — DS 스타일 커스텀 범례 렌더러 (square/circle 인디케이터)
- `Chart.tsx`에서 커스텀 `ResizeObserver` 제거 → Recharts `ResponsiveContainer` 사용

### New Exports

- `ComboChart`, `ComboChartProps`, `ComboBarSeries`, `ComboLineSeries`
- `ChartTooltipParams`, `PieTooltipParams`

### Stories

- BarChart: `WithBarRadius`, `StackedWithRadius`, `CustomTickCount`, `CustomTooltip` 추가
- LineChart: `SmoothLine`, `SmoothWithArea`, `MultiLineSmoothWithArea`, `CustomTickCount`, `CustomTooltip` 추가
- DonutChart: `CenterOnHover`, `CustomTooltip` 추가
- ComboChart: `Default`, `DualYAxis`, `StackedBarsWithLine`, `LineWithArea`, `CustomTooltip` 신규

## [0.2.37] - 2026-02-25

### Documentation

- **AI.md 전체 감사 및 수정** — 소스 코드 대비 150+ 누락 props 추가, 12개 잘못된 정보 수정
  - Button `colorOverride` (18색) 등 주요 props 문서화
  - Checkbox `indeterminate` 팬텀 prop 제거 → `checked="indeterminate"` 올바른 사용법으로 수정
  - Dropdown의 "CheckboxItem/RadioItem 없음" 오류 삭제 — 실제로 둘 다 존재
  - Toast: `BlumnaiToaster` 컴포넌트 추가, sonner 직접 임포트 대신 DS 컴포넌트 사용 권장
  - AlertDialog vs ConfirmDialog 비교 섹션의 뒤바뀐 설명 수정
  - InfoBox variant 기본값 `'info'` → `'default'` 수정
  - TimeInput 기본값 수정: `timeFormat` '12h'→'24h', `size` 'lg'→'sm'
  - IsometricIcon 3개 기본값 수정
  - CursorIcon 신규 섹션 추가 (미문서화 컴포넌트)
  - DnD (Drag and Drop) 신규 섹션 추가 (7개 컴포넌트 + 2개 훅)
  - TimePicker/TimeRangePicker 섹션 전면 재작성 (7→22 props, 5→23 props)
  - 40+ 컴포넌트의 label/description 타입 `string` → `ReactNode` 수정
  - Quick Reference Table, Component Categories, Keywords, Subpath Imports 업데이트

## [0.2.36] - 2026-02-25

### Fixed

- react-hook-form, @hookform/resolvers, zod를 `peerDependencies`에 추가 — dist 코드가 react-hook-form을 import하므로 의존성 선언 필요
  - `peerDependenciesMeta`의 `optional: true`와 함께 사용하여 Form 미사용 프로젝트에서는 설치 불필요
  - 넓은 버전 범위 (`^7.0.0`)로 TS 4.x 프로젝트는 `7.53.x`, TS 5+ 프로젝트는 최신 버전 선택 가능

## [0.2.35] - 2026-02-25

### Fixed

- `typesVersions` catch-all `"*"` 패턴이 메인 엔트리 해석을 가로채던 문제 수정 — `"."` 엔트리 추가로 `moduleResolution: "node"` 환경에서 `dist/.d.ts` 경로 오류 해결
- `optionalDependencies`에서 react-hook-form, @hookform/resolvers, zod 제거 — TS 4.x 프로젝트에서 `const` 타입 파라미터 파싱 오류 방지
  - `peerDependenciesMeta`의 `optional: true`로 충분; Form 컴포넌트 사용 시 수동 설치 필요

## [0.2.34] - 2026-02-25

### Added

- **InfoBox**: 새 컴포넌트 — 인라인 정보/콜아웃 박스 (`variant`: default, info, success, warning, error)
  - 인디케이터 바, 아이콘, 선택적 제목, 닫기 버튼 지원
  - Toast와 동일한 시맨틱 색상 팔레트 재사용
  - `role="status"` (info/success/default), `role="alert"` (warning/error) 접근성 지원
- Checkbox: `size` prop 추가 (`'sm'` | `'md'` | `'lg'`, 기본값 `'sm'`)
- Checkbox: `shape` prop 추가 (`'square'` | `'round'`, 기본값 `'square'`)
- Switch: `size` prop 추가 (`'sm'` | `'md'` | `'lg'`, 기본값 `'sm'`)
- Input: `'xs'` 사이즈 추가 (28px 높이) — `InputSize`에 `'xs'` 포함
- Select: `renderOption` prop 추가 — 드롭다운 옵션 커스텀 렌더링 (모든 variant 지원)
- Select: `minWidth` prop 추가 (`string | number`)
- TooltipTrigger: `sideOffset` (기본값 8), `alignOffset` (기본값 0) prop 추가
- TooltipTrigger / Tooltip: `width`, `minWidth` prop 추가
- Dialog: `fullScreen` prop 추가 — 전체 화면 모달 (모바일용)
- Pagination: `size` prop 추가 (`'sm'` | `'lg'`, 기본값 `'lg'`)
- DataGrid: `ColumnMeta`에 `headerTooltip` prop 추가 — 컬럼 헤더 툴팁

### Changed

- ConfirmDialog: `description` 타입 `string` → `ReactNode` (하위 호환)

### New Exports

- `InfoBox`, `InfoBoxProps`, `InfoBoxVariant`
- `CheckboxSize`, `CheckboxShape`
- `SwitchSize`
- `PaginationSize`

## [0.2.31] - 2026-02-23

### Added

- DataGrid: `enableColumnReorder` prop — 컬럼 헤더 드래그로 순서 변경
  - `columnOrder`, `onColumnOrderChange` controlled/uncontrolled 상태 지원
  - Sticky 컬럼 및 select 컬럼은 고정 (드래그 불가)
  - 정렬과 동시 사용 가능 (클릭=정렬, 드래그=재정렬)
  - `ColumnOrderState` 타입 export
- DataGrid: `WithColumnReorder`, `WithStickyAndReorder` 스토리 추가
- Form: `SignupForm` 복합 폼 스토리 추가

### Fixed

- Dialog: 닫기 버튼 위치 보정 (`right-4 top-4` → `right:20px top:20px`)
- Sheet: 닫기 버튼 위치 보정 (Dialog와 동일)
- Sheet: `onOpenAutoFocus` prop 전달 지원, 기본값으로 자동 포커스 방지

## [0.2.30] - 2026-02-19

### Changed

- Chip: `color` prop이 선택/비선택 모든 상태에 적용
  - 비선택: `bg-badge-{color}` 배경 + 컬러 텍스트/아이콘
  - 선택: `bg-basic-{color}-subtle` 배경 (더 진한 파스텔) + 컬러 텍스트/아이콘
  - ghost/ghostMuted 비선택: 투명 배경 유지, 텍스트/아이콘만 컬러 적용
  - `color` 미설정 시 기존 동작 유지 (회색 비선택, 파랑 선택)
- Chip: `color` prop 기본값 제거 (`'blue'` → `undefined`)

### Added

- Badge/Chip 색상 8종 추가: `amber`, `yellow`, `emerald`, `teal`, `sky`, `indigo`, `purple`, `rose` (10 → 18색)
  - `BadgeColor`, `ChipColor` 타입에 반영
  - Dropdown, Table CellBadge 등 `BadgeColor` 참조 컴포넌트 자동 적용

## [0.2.29] - 2026-02-18

### Added

- MultiSelect: `showSelectAll` prop 추가 — 드롭다운 상단에 전체 선택 체크박스 표시
  - 전체 선택 / 전체 해제 토글 (체크/인터미디에이트/빈 상태)
  - 검색 활성화 시 필터된 옵션에만 적용
  - `maxSelections` 설정 시 자동으로 숨김
  - 키보드 내비게이션 지원 (Select All이 첫 번째 항목)
- MultiSelect: `selectAllLabel` prop 추가 — 전체 선택 라벨 커스터마이징 (기본값: `'전체 선택'`)

## [0.2.28] - 2026-02-18

### Added

- Textarea: 항상 커스텀 스크롤바 적용 (`scrollbar-thin` 유틸리티 클래스)
  - `maxRows` 없이도 네이티브 스크롤바가 디자인 시스템 스타일로 표시
  - `maxRows` 설정 시 ScrollArea 기반 커스텀 스크롤바 + 커서 위치 자동 추적
- DatePicker / DateRangePicker: `showActions` prop 추가 — 확인/취소 버튼 모드
  - `showActions={true}` 시 선택 후 팝오버가 닫히지 않고 하단에 확인/취소 버튼 표시
  - 확인: 선택값 적용 후 닫기, 취소: 열기 전 값으로 복원 후 닫기
  - `confirmLabel`, `cancelLabel` prop으로 버튼 라벨 커스터마이징 가능
- DatePicker / DateRangePicker: `WithActions`, `WithActionsAndPresets` 스토리 추가

## [0.2.26] - 2026-02-18

### Changed

- `gap-*` 유틸리티 클래스를 `ds-gap-*`로 전체 리네이밍 — 소비 프로젝트의 Tailwind `gap-*`와 충돌 방지
- `@theme`에 `--spacing: initial` 설정 — Tailwind v4의 multiplicative spacing 유틸리티 생성 비활성화
- 빌드된 CSS 크기 ~1.3MB → 148KB (~90% 감소)

### Fixed

- 소비 프로젝트에서 Tailwind spacing 클래스(`gap-8`, `mt-4`, `px-4` 등)와 DS 유틸리티가 충돌하던 문제 수정
- 30+ 컴포넌트의 표준 Tailwind spacing 클래스를 DS 유틸리티로 변환 (`mt-4` → `margin-t-16`, `px-4` → `padding-x-16`, `w-6` → `width-24` 등)
- `SidebarPrimitives`의 position 클래스를 spacing 독립적 값으로 변환 (`top-4` → `[top:16px]`)

### Added

- `ds-gap-*` 유틸리티: `ds-gap-0` ~ `ds-gap-96` (responsive variant 지원)
- Margin 유틸리티: `margin-x-*`, `margin-y-*`, `margin-t-*`, `margin-r-*`, `margin-l-*`
- Padding 유틸리티: `padding-t-*`, `padding-b-*`
- Position 유틸리티: `inset-0`, `inset-y-0`, `top-0`, `right-0`, `bottom-0`, `left-0`
- `min-w-0`, `min-h-0`, `min-width-36`, `min-width-40` 유틸리티

## [0.2.25] - 2026-02-18

### Added

- Button: `colorOverride` prop 추가

## [0.2.24] - 2026-02-17

### Fixed

- Select: `ExtendedSelect`가 `option.iconColor`를 `ExtendedSelectItem`에 전달하지 않던 문제 수정
- MultiSelect: `RadixMultiSelect`가 `option.iconColor`를 사용하지 않던 문제 수정

### Added

- `SelectOption` 인터페이스에 `iconColor` prop 추가

## [0.2.23] - 2026-02-17

### Fixed

- ScrollArea: viewport에 `max-w-full` 추가 — 콘텐츠가 컨테이너 밖으로 넘치지 않도록 제한
- Sidebar: `SidebarMenuButton` 및 `menuItemVariants`에 `cursor-pointer` 추가

### Added

- Select: `ExtendedSelectItemProps`에 `iconColor` prop 추가 (DropdownMenuItem과 동일)
- Combobox: `ComboboxOption`에 `iconColor` prop 추가

## [0.2.22] - 2026-02-17

### Fixed

- ScrollArea: flex-child 레이아웃 지원 — 부모 flex 컨테이너가 높이를 결정하는 경우 스크롤이 정상 작동하도록 `min-h-0` (root) 및 `h-full` (viewport) 추가

### Added

- Input: 모든 텍스트 기반 variant에 `showCount` + `maxLength` 글자 수 카운터 지원 추가 (Default, Password, Shortcut, AddOn, Button, Dropdown)
- ~250개 이상 누락된 타입 export 추가 (Input, Select, Combobox, Checkbox, Radio, Switch, Form, Popover, Tabs, Table, Icons, Chart, DnD 등)
- BadgeColor, BadgeSize, BadgeShape 타입 export 추가

## [0.2.20] - 2026-02-17

### Fixed

- ConfirmDialog, SimpleAlertDialog 및 타입(ConfirmDialogProps, ConfirmDialogVariant, SimpleAlertDialogProps) 패키지 export 누락 수정

### Added

- AccordionGroup: 그룹 레벨 `onToggle(id, isOpen)` 콜백 추가 — controlled mode 지원

## [0.2.19] - 2026-02-12

### Documentation

- SidebarProvider: `defaultOpen`, `open`, `onOpenChange` props 추가
- Popover root: `open`, `onOpenChange`, `defaultOpen`, `modal` props 추가
- DropdownMenuLabel: `caption`, `inset` props 추가
- IsometricIcon: 160개 타입 값 전체 목록 추가
- ColumnDef `meta` 구체적 사용 예제 추가
- Toast: `<Toaster />` 필수 설정 및 `label` 표시 전용 명확화
- deprecated `noResultsText` 제거 → `emptyStateTitle`/`emptyStateDescription` 사용

## [0.2.18] - 2026-02-12

### Documentation

- **AI.md를 단일 소스로 통합** — 중복 파일 5개 삭제
  - `src/COMPONENTS.md`, `src/PROPS.md`, `src/PATTERNS.md` 삭제
  - `skills/.../references/components.md`, `patterns.md` 삭제
- 섹션 인덱스에서 깨지기 쉬운 줄 번호 제거, 섹션명 기반 검색으로 변경
- Calendar, useSidebar, IsometricIcon 타입, PopoverArrow, FilterButton span, ResizableHandle panelRef 등 10개 이슈 수정

## [0.2.17] - 2026-02-12

### Documentation

- AI.md 상단에 섹션 인덱스 + Props Quick Jump 추가
- AI 에이전트가 `### ComponentName`으로 효율적 탐색 가능

## [0.2.16] - 2026-02-12

### Documentation

- 전체 문서 감사: 70+ 누락 props 추가, 모든 버그 수정
- README.md 서브패스 테이블 AI.md와 동기화
- FileUpload → FileUploadArea/FileUploadCard 전체 수정
- DataGrid props 테이블 완전 재작성
- CellBadge, CellAvatar 예제 수정

## [0.2.15] - 2026-02-12

### Documentation

- 9개 문서 이슈 수정
- README에 Staying Updated 섹션 추가

## [0.2.14] - 2026-02-12

### Documentation

- 40개 누락 props, 패턴, 수정사항 추가
- LinkButton, ControlButton, ButtonGroup, CheckboxList/Card, RadioList/Card, SwitchList, AdvancedTooltip 등 props 추가
- Combobox, RadioCard, Sidebar layout, DataGrid filtering, DatePicker presets, Chart, Skeleton loading 패턴 추가
- ICONS.md 생성 스크립트: 청크 파일 스캔 및 수동 편집 보존 기능 추가

## [0.2.13] - 2026-02-12

### Changed

- **Storybook 8.4.7 → 9.1.17** 업그레이드
- npm audit 취약점 해결

## [0.2.12] - 2026-02-12

### Added

- 빌드 시 모든 컴포넌트 `.mjs` 파일에 `"use client"` 지시문 자동 주입
  - Next.js 13+ App Router에서 별도 설정 없이 사용 가능

### Fixed

- Toast, Badge, Avatar, Tooltip, ContextMenu, Chip API 문서 정확도 수정
- AI.md에 17개 누락 컴포넌트 섹션 추가

## [0.2.11] - 2026-02-12

### Fixed

- dist에 누락된 `index.mjs` 파일 추가 (Rollup 최적화로 제거되던 문제)
- npm 패키지명과 충돌하는 프록시 디렉터리 건너뛰기 (`input-otp`)
- Next.js 12 프로젝트에서 'Module not found' 오류 해결

## [0.2.10] - 2026-02-12

### Added

- 서브패스 프록시 디렉터리 생성 (예: `button/package.json`)
  - `exports` 필드 미지원 번들러에서도 서브패스 임포트 동작
  - Next.js 12 + next-images + webpack 4 호환성 확보

## [0.2.9] - 2026-02-12

### Added

- `typesVersions` 필드 추가
  - TypeScript `moduleResolution: "node"` 환경에서 서브패스 타입 자동 해결

## [0.2.8] - 2026-02-11

### Performance

- 아이콘 로딩 시스템 전면 개편: 개별 파일 → 청크 기반 지연 로딩
  - BrandIcon: 389KB 단일 파일 → 8개 알파벳 청크 (25-68KB), 초기 로드 ~6배 감소
  - FlagIcon, FileIcon, CursorIcon도 동일 패턴 적용
  - 요청된 아이콘이 포함된 청크만 로드

### Added

- ICONS.md 아이콘 카탈로그 및 자동 생성 스크립트

### Fixed

- AccordionItem, Sheet 마이너 수정

## [0.2.7] - 2026-02-10

### Added

- `useKeyboardShortcut` 훅 추가
- `shortcut` prop: Button, Input, ContextMenu, Dropdown, Menubar, SidebarMenuItem에 추가
- 혼합 기호+텍스트 단축키 파싱 지원 (예: `⌘+⇧+K`)

### Fixed

- Button 스피너 fill 오타 수정 (`'blact'` → `var(--bg-default)`)
- Input focus 단축키: 이미 포커스된 상태에서 중복 실행 방지

## [0.2.6] - 2026-02-10

### Fixed

- Border 유틸리티 클래스가 `border-style: solid`를 명시적으로 설정
  - Tailwind preflight 없이도 독립적으로 동작
- Button 로딩 스피너 배경색 `fill: var(--bg-default)` 적용
- `focus-within-ring` CSS 변수 직접 사용으로 단순화

## [0.2.5] - 2026-02-10

### Changed

- 빌드된 CSS에서 `@layer` 래퍼 제거 (specificity 보장)
  - 소비 프로젝트의 글로벌 CSS보다 항상 높은 우선순위 확보

### Fixed

- Button 로딩 상태 레이아웃 안정화 (relative positioning)
- `width` prop 권장사항 Button JSDoc에 추가

### Added

- skills 폴더, AGENTS.md, llms.txt, GitHub Copilot instructions

## [0.2.3] - 2026-02-10

### Fixed

- 4개 JSDoc 예제 prop명 오류 수정 (Pagination, DataRangeSlider, FileUploadArea, FilterButton)
- 9개 컴포넌트에 누락된 `@example` 태그 추가

## [0.2.2] - 2026-02-10

### Added

- **AI.md**: AI 에이전트 및 개발자용 통합 컴포넌트 레퍼런스
- README.md를 소비자용 설치/사용 가이드로 재구성
- CONTRIBUTING.md 내부 개발 가이드 추가
- 25+ 컴포넌트에 JSDoc + IDE 툴팁 추가

## [0.2.0] - 2026-02-10

### Performance

- **패키지 크기 128MB → ~40MB** (70% 감소)
  - 소스맵 파일(.map) 배포 패키지에서 제외 (-48MB)
  - 아이콘 개별 .d.ts 파일 제외 (-18MB, -6,800 파일)
  - 선언문 소스맵(.d.ts.map) 비활성화 (-4,462 파일)

- **개발 서버 시작 시간 개선**
  - BrandIcon, FileIcon 레지스트리를 React.lazy()로 전환 (지연 로딩)
  - Icon.mjs 글로브 맵 제거 (318KB → ~5KB)
  - Tailwind CSS 컨텐츠 스캔 범위 축소 (CSS 1.3MB → ~0.8MB)

### Added

- 서브패스 임포트 지원: `import { Button } from '@mlbghoon/blumnai-design-system/button'`
- 소비자 프로젝트를 위한 최적화 가이드 (README.md)

### Notes

- CSS는 별도 임포트를 권장합니다:
  `import '@mlbghoon/blumnai-design-system/styles';`
