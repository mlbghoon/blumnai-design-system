# Changelog

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
