# Changelog

## [1.9.26] - 2026-05-06

### Fixed — `Dialog` / `AlertDialog` 에 브라우저 기본 focus outline 이 모달 전체에 그려지던 문제

`DialogContent` 와 `AlertDialogContent` root 에 `focus:outline-none` 누락. Radix 는 두 컴포넌트에 `tabindex=-1` 을 설정하고 focus trap 의 fallback target 으로 사용함. 사용자가 다이얼로그 내부에서 focus 를 가진 요소가 사라지면 (예: 검색 후 빈 결과로 input 이 disabled 되거나, 비동기 unmount, focusable child 없는 빈 상태), Radix 가 focus 를 DialogContent 로 떨어뜨리고 → 브라우저 기본 `outline: auto` 가 모달 박스 전체에 굵은 ring 으로 그려짐.

DialogContent / AlertDialogContent 자체는 인터랙티브 요소가 아니므로 `focus:outline-none` 으로 outline 제거 (close 버튼 등 자식 인터랙티브 요소들은 자체 focus ring 유지). 동일 컴포넌트의 close 버튼은 이미 같은 패턴 적용 중이라 root 만 누락된 상태였음 — 일관성도 개선됨.

영향 받던 시나리오 (모든 컨슈머에 해당):
- 다이얼로그 안 input 이 검색 중 disabled → focus 잃음 → 빈 결과로 focusable child 없음
- 비동기 처리로 focused 요소 unmount
- 빈 상태 (empty list, no data) 다이얼로그
- 위 어떤 경우든 focus trap 이 DialogContent 로 fallback 시 outline 표시됨

- `src/components/dialog/Dialog.tsx`
- `src/components/dialog/AlertDialog.tsx`

## [1.9.25] - 2026-05-06

### Changed — `ProportionBar` / `PieChart` / `DonutChart` 툴팁을 단일 행으로 통합

기존 툴팁이 헤더(이름) + 항목(이름 + 값) + 항목(퍼센트) 의 3+ 행 구조라 동일한 데이터가 중복 표시됨. 단일 행 (이름 + 퍼센트) 으로 정리.

```
// 이전
[Header] 카테고리 A
[Divider]
● 카테고리 A   30
● 30.0%

// 이후
● 카테고리 A   30.0%
```

영향 컴포넌트:
- `ProportionBar` — 세그먼트 호버 툴팁
- `PieChart` — 슬라이스 호버 툴팁 (`PieTooltipAdapter`)
- `DonutChart` — 슬라이스 호버 툴팁 (`PieTooltipAdapter` 공유)

`Bar` / `Line` / `Combo` 차트의 `ChartTooltipAdapter` 는 헤더가 x축 값 (시리즈와 다른 정보) 이라 중복이 없어 변경 없음.

`renderTooltip` 커스텀 prop 은 그대로 유지 — 기존 형식이 필요한 컨슈머는 override 가능.

- `src/components/chart/ProportionBar/ProportionBar.tsx`
- `src/components/chart/Chart/ChartTooltipAdapter.tsx`

## [1.9.24] - 2026-05-06

### Fixed — `ScrollArea` 내부에서 자식의 `truncate` 가 동작하지 않던 문제

Radix `ScrollAreaPrimitive.Viewport` 는 children 을 내부적으로 `<div style="min-width: 100%; display: table">` 로 감쌈. `display: table` 은 wrapper 너비를 children 의 intrinsic max 로 인플레이트시키므로, 안에 있는 `w-full` 자식이 viewport 너비가 아닌 가장 긴 콘텐츠 너비에 맞춰지고, 그 자식 안의 `truncate` (white-space: nowrap + text-overflow: ellipsis) 도 동작하지 않음. 결과적으로 long text 는 ellipsis 없이 popover 의 `overflow-hidden` 에 의해 그대로 잘림.

**영향 받던 컴포넌트:** `Combobox`, `RadixSelect` 의 옵션 리스트 (긴 라벨 ellipsis 안 됨), 기타 ScrollArea 안에 truncate 자식이 있는 모든 위치.

**Fix:** `orientation === 'vertical'` (기본값) 일 때 viewport 의 자식 div 에 `[&>div]:!block` 를 적용하여 Radix 의 inline `display: table` 을 `block` 으로 오버라이드. `display: block` 은 자식이 viewport 너비에 맞춰지므로 안쪽의 `truncate` 가 정상 동작. 수평/양방향 ScrollArea (`orientation === 'horizontal' | 'both'`) 는 horizontal overflow 감지를 위해 `table` 동작을 그대로 유지.

```tsx
// 이전: 긴 옵션 라벨이 ellipsis 없이 잘려서 표시됨
<Combobox options={[
  { id: '1', label: 'Extremely long option label that will not fit in this dropdown' },
  ...
]} />

// 이후: 정상적으로 "Extremely long option label that will not f..." 로 truncate
```

- `src/components/scroll-area/ScrollArea.tsx`

## [1.9.23] - 2026-04-30

### Fixed — `TimePicker` 패널 우측에 빈 컬럼 너비만큼의 여백이 발생하던 문제

24h + `showSeconds=false` + `showQuickSelect=false` + `showActions=true` 조합에서 popover panel 우측에 빈 공간이 발생. 원인: 액션 버튼 row (`취소`/`적용` ~108px) 가 panel container 의 너비를 인플레이트시키지만, 시/분 두 컬럼 (~84px) 은 `flex` + `ds-gap-4` 만 적용되어 좌측에 모여 있어 우측에 ~24px 의 시각적 빈 공간 발생.

**Fix:** `TimePickerPanel` 의 컬럼 row 에 `justify-between` 적용. 이제 액션 버튼 (혹은 다른 sibling) 으로 인해 panel container 너비가 컬럼 합보다 커질 때 컬럼들이 양 끝으로 분산되어 빈 공간을 자연스럽게 메꿈.

영향 받는 케이스:
- 컬럼 합 < panel container 너비 (e.g., 액션 버튼 row 가 더 넓을 때) → 컬럼들이 분산되어 균등 배치
- 컬럼 합 == panel container 너비 (e.g., showSeconds 또는 12h 모드) → 시각적 변화 없음
- TimePickerPanel 단독 사용 (popover 밖) → sibling 이 없으므로 시각적 변화 없음

- `src/components/time-picker/shared/TimePickerPanel.tsx`

## [1.9.22] - 2026-04-30

### Changed (Breaking) — `DataGrid` / `Table` 헤더 정렬 기본값 → `center` + `align` 과 분리

테이블 헤더의 정렬 동작이 셀(body) 정렬과 독립적으로 결정됩니다. 헤더 기본값은 `'center'`, 셀 기본값은 `'left'`.

**이전 동작 (v1.9.21 이하)**
- `DataGrid` 헤더 정렬: `meta.headerAlign ?? meta.align ?? 'left'` — 헤더가 `align` 을 따라감
- `Table` 의 `TableHead`: 항상 `text-left` 고정

**변경 후 동작 (v1.9.22+)**
- `DataGrid` 헤더 정렬: `meta.headerAlign ?? 'center'` — 헤더는 `headerAlign` 만 봄, `align` 영향 없음
- `Table` 의 `TableHead`: 기본 `text-center`, `className` 으로 override 가능 (`<TableHead className="text-left">`)
- `meta.align` 은 이제 셀(body) 에만 영향

**왜:** 일반적인 데이터 테이블에서 헤더는 가운데, 셀은 데이터 타입에 맞게 (텍스트는 left, 숫자는 right 등) 정렬하는 패턴이 표준. 기존 cascade 동작은 `align: 'right'` 같은 셀 기준 정렬이 헤더까지 따라가는 부작용이 있었음.

**컨슈머 영향:**
- 헤더가 가운데 정렬로 바뀜 — 디자인 검토 필요
- 기존에 `align: 'right'` 만 지정하고 헤더도 right 가 되길 원했다면 → 이제 명시적으로 `headerAlign: 'right'` 추가 필요
- 기존에 모든 헤더가 left 였다면 → `headerAlign: 'left'` 명시 또는 디자인 변경 수용

```tsx
// 이전 (v1.9.21 이하): 헤더와 셀 모두 right
{ accessorKey: 'amount', meta: { align: 'right' } }

// 이후 (v1.9.22+): 셀만 right, 헤더는 center (기본)
{ accessorKey: 'amount', meta: { align: 'right' } }

// 이후 (v1.9.22+): 헤더와 셀 모두 right — 명시적으로 둘 다 지정
{ accessorKey: 'amount', meta: { align: 'right', headerAlign: 'right' } }
```

- `src/components/table/DataGrid.types.ts`
- `src/components/table/components/DataGridHeader.tsx`
- `src/components/table/Table.tsx`

## [1.9.21] - 2026-04-30

### Fixed — `DonutChart` 툴팁이 중앙 라벨 뒤로 가려지던 z-index 이슈

`DonutChart` 의 중앙 라벨 (`centerLabel` / `centerValue` / 큰 퍼센트 텍스트) 이 차트와 같은 `relative` 부모 안에 absolute 로 형제 배치되어 있고, Recharts 툴팁도 absolute. 둘 다 z-index 미지정이라 DOM 순서대로 페인트됨 → 중앙 라벨이 더 늦은 sibling 이라 툴팁 위로 덮음. Recharts `<Tooltip>` 에 `wrapperStyle={{ zIndex: 10 }}` 추가하여 툴팁이 항상 위로.

- `src/components/chart/DonutChart/DonutChart.tsx`

### Added — `ProportionBar` 세그먼트 툴팁

`ProportionBar` 의 각 세그먼트에 호버 툴팁이 추가됨. 표시 내용:
- 세그먼트 이름
- 값 (`valueFormatter` / `valueSuffix` 적용)
- 전체 대비 비율 (%)

`PieTooltipAdapter` 와 동일한 visual 구조로 다른 차트들과 일관성 유지. Hidden / 0-width 세그먼트는 툴팁 wrap 을 건너뜀.

```tsx
// 기존 코드 그대로 — 자동으로 툴팁 활성화
<ProportionBar data={[
  { name: '상담사 종료', value: 152, color: '#4fc660' },
  { name: '매니저 종료', value: 66, color: '#9b6efc' },
  // ...
]} />
```

- `src/components/chart/ProportionBar/ProportionBar.tsx`

### Changed — `Combobox` / `RadixSelect` 선택 체크 아이콘 색상: 텍스트 색상과 동일

v1.9.20 에서 `'informative'` (브랜드 블루) 로 바꿨던 체크 아이콘을 `'default'` (테마 대응 텍스트 색) 로 다시 변경. 라이트 모드에서 검정, 다크 모드에서 흰색 — 옵션 텍스트와 동일한 색상.

근거: 사용자 피드백 — 체크가 텍스트와 같은 색일 때 시각적 통일감이 더 자연스러움. v1.9.20 의 다크 모드 invisible 이슈는 그대로 해결됨 (`'default'` 도 테마 대응 토큰).

- `src/components/select/Combobox/Combobox.tsx`
- `src/components/select/RadixSelect.tsx`

### Added — `RadioGroup` 전용 Storybook 스토리

`RadioGroup` 의 그룹 레벨 props (`error`, `success`, `caption`, `required`, `orientation`, `disabled`, `value` / `defaultValue` / `onValueChange`, `name`) 를 명시적으로 보여주는 11 개 스토리. 기존 `RadioDefault` (개별 Radio props) 와 `RadioList` (data-driven wrapper) 에 더해 `DataEntry / Radio / RadioGroup` 위계를 분리하여 컴포넌트 구분이 명확해짐.

스토리: Default (controls), Horizontal, WithCaption, WithError, WithSuccess, Required, DisabledGroup, PartiallyDisabled, Uncontrolled, Controlled, WithDescription.

- `src/components/radio/stories/RadioGroup.stories.tsx` (신규)

## [1.9.20] - 2026-04-29

### Fixed — Combobox / Select 선택 체크 아이콘이 다크 테마에서 보이지 않던 문제

`Combobox` 와 `RadixSelect` 의 선택 표시 체크 아이콘이 존재하지 않는 토큰 (`--icon-primary`) 을 참조하고 있어 SVG 가 색상 없이 렌더링됨. 라이트 모드에선 검정 (브라우저 기본값) 으로 표시되어 그럭저럭 보였지만 다크 모드에선 같은 검정이 어두운 배경에 묻혀 사실상 invisible.

`'primary'` 는 Icon 의 `colorTokens` set 에 없어 raw 문자열 그대로 전달 → 유효하지 않은 CSS 색상값 → SVG 기본값 (검정). 디자인 의도는 명백히 "브랜드 색의 체크" 였으므로 `'informative'` (`#437dfc` light, `#9ac4fe` dark — 테마 대응) 로 교체.

**시각적 변화:**
- 라이트 모드: 검정 체크 → 파란 체크 (디자인 시스템 컨벤션과 일치)
- 다크 모드: 보이지 않던 검정 체크 → 밝은 파란 체크 (이번 수정의 본래 목적)

영향 컴포넌트:
- `Combobox` — 선택 항목 (default variant, checkbox/radio 미사용)
- `RadixSelect` — 5 곳 (Single / MultiSelect / Tags / Avatar / Default 모두)

- `src/components/select/Combobox/Combobox.tsx`
- `src/components/select/RadixSelect.tsx`

## [1.9.19] - 2026-04-29

### Changed — Toast 메시지에서 `\n` 줄바꿈 지원

`TOAST_MESSAGE_STYLE` 에 `whitespace-pre-line` 추가. 이제 `message` 문자열에 포함된 `\n` 이 실제 줄바꿈으로 렌더링됨.

```tsx
// 1줄 — 기존과 동일
toast.warning('템플릿이 존재하지 않습니다.');

// 2줄 — 신규: \n 이 줄바꿈으로 렌더링
toast.warning('해당 계정에 등록된 템플릿이 존재하지 않습니다.\n템플릿을 등록 후 다운로드하세요.');
```

`whitespace-pre-line` 특성: 명시적 `\n` 만 줄바꿈, 연속 공백은 collapse 됨 (단순 텍스트 wrapping 동작은 그대로).

- `src/constants/toast/toast.constants.ts`
- `src/components/toast/Toast.stories.tsx` — `MultiLineMessage` 스토리 추가

## [1.9.18] - 2026-04-28

### Added — `TabsTrigger` `badgeColor` prop

`TabsTrigger` 의 배지 색상을 `Badge` 컴포넌트와 동일한 색상 토큰으로 지정 가능. 미지정 시 기존 muted 스타일 유지 (호환).

```tsx
// 기존 (muted) — 변경 없음
<TabsTrigger badge={3}>받은편지함</TabsTrigger>

// 신규 — 색상 지정
<TabsTrigger badge={3} badgeColor="red">긴급</TabsTrigger>
<TabsTrigger badge={12} badgeColor="blue">신규</TabsTrigger>
<TabsTrigger badge={5} badgeColor="green">완료</TabsTrigger>
```

지원 색상: `red`, `orange`, `amber`, `yellow`, `lime`, `green`, `emerald`, `teal`, `cyan`, `sky`, `blue`, `indigo`, `violet`, `purple`, `fuchsia`, `pink`, `rose`, `neutral`, `white` (Badge 와 동일).

- `src/components/tabs/Tabs.types.ts`
- `src/components/tabs/Tabs.tsx`
- `src/components/tabs/stories/Tabs.stories.tsx` — `WithColoredBadges` 스토리 추가

## [1.9.17] - 2026-04-28

### Changed — `minmax(<min>px, <max>)` 컬럼 너비도 컬럼 가상화 활성

v1.9.15 의 안전장치가 너무 보수적이어서 `meta.width: 'minmax(270px, 1fr)'` 같은 fluid 너비를 쓰면 컬럼 가상화가 자동 비활성화되었음. 이번에 `minmax(Npx, ...)` 패턴은 deterministic 으로 처리하도록 완화.

**근거:** `1fr` 류 max 는 "남는 공간이 있을 때만" 확장됨. 남는 공간이 있다 = 가로 스크롤 없음 = 모든 컬럼이 viewport 안에 있음 → 가상화로 unmount 할 컬럼이 없음. 컬럼 가상화가 실제로 의미 있는 경우 (총 너비 > viewport, 가로 스크롤 활성) 는 모든 `minmax()` 컬럼이 정확히 min 값에 고정되어 위치 추정이 실제와 일치.

**효과:** `minmax(<min>px, 1fr)` 처럼 "최소 너비 보장 + 남는 공간 균등 분배" 패턴을 쓰면서도 30+ 컬럼에서 컬럼 가상화 혜택을 받을 수 있음.

여전히 가상화 자동 비활성 대상: `1fr` 단독, `auto`, `%`, `minmax(0, 1fr)` (min 이 px 가 아님) 등.

```tsx
// v1.9.16 까지: 컬럼 가상화 OFF (안전장치 작동)
// v1.9.17+:    컬럼 가상화 ON (총 너비 > viewport 일 때 정확히 동작)
columns: [{ meta: { width: 'minmax(270px, 1fr)' } }, ...]
```

- `src/components/table/hooks/useColumnVirtualization.ts`

## [1.9.16] - 2026-04-28

### Fixed — `DataGrid` 행 가상화 활성 시 컬럼 가상화가 silent 하게 무시되던 문제

`DataGridBody` 의 행 가상화 분기 (`rows.length > virtualizationThreshold.rows`, 기본 100) 에서 `DataGridRow` 에 `visibleColumnIndices` 를 전달하지 않고 있었음. 결과적으로 행 100개 + 컬럼 30개를 동시에 넘기면 행은 viewport 만큼만 마운트되지만, **각 행 내부에서는 모든 컬럼이 렌더링** 됨 — 컬럼 가상화 효과가 사라짐.

비가상화 분기 (line 99) 와 padding row 분기는 이미 `visibleColumnIndices` 를 올바르게 사용하고 있었음. 가상화 분기에 누락된 한 줄을 추가.

이제 두 축 가상화가 함께 동작 — `virtualizationThreshold={{ rows: N, columns: M }}` 가 의도대로 작동:

```tsx
// 1000 rows × 50 columns 그리드 — 행/컬럼 양쪽 모두 가상화
<DataGrid data={largeData} columns={manyColumns} />
```

- `src/components/table/components/DataGridBody.tsx`

## [1.9.15] - 2026-04-28

### Fixed — `DataGrid` 컬럼 가상화가 `minmax()` / `1fr` 너비를 silent 하게 깨뜨리던 문제

`useColumnVirtualization` 의 `parseWidth` 가 `^(\d+(?:\.\d+)?)(px)?$` 만 매칭하고 나머지는 모두 150px 로 폴백하고 있었음. `meta.width: 'minmax(100px, 1fr)'` / `'1fr'` 같은 fluid 너비를 쓰는 컨슈머는 컬럼이 30개 (`virtualizationThreshold.columns` 기본값) 를 넘는 순간 우측 컬럼이 렌더링되지 않고 horizontal scroll 로도 복구되지 않음.

**수정 내용:**
- `minmax(<min>px, <max>)` → `<min>` 을 floor estimate 로 파싱
- 컬럼 중 하나라도 픽셀로 정확히 결정 불가능한 너비 (`1fr`, `auto`, `%`, 파싱 실패 등) 가 있으면 컬럼 가상화를 자동으로 비활성화 — 잘못된 위치 추정으로 컬럼이 사라지는 것을 방지
- `columnSizing` 으로 측정된 너비가 있으면 그대로 deterministic 으로 처리

**컨슈머 영향:**
- 기존에 `virtualizationThreshold={{ columns: 100 }}` 같은 stopgap 을 적용한 곳은 제거 가능 (DS 가 자동 판단)
- 컬럼 수가 많고 모두 `Npx` 로 명시한 경우 가상화는 그대로 동작

```tsx
// fluid 너비여도 안전 — 자동으로 가상화 off
<DataGrid columns={[
  { id: 'a', meta: { width: 'minmax(100px, 1fr)' } },
  { id: 'b', meta: { width: '1fr' } },
  // ...30+ columns
]} />
```

- `src/components/table/hooks/useColumnVirtualization.ts`

## [1.9.14] - 2026-04-28

### Fixed — `CellText` `tooltip` + `copyable` 동시 사용 시 tooltip 미동작

`copyable=true` 분기가 button 을 그대로 반환하면서 tooltip wiring (`elementRef`, `onMouseEnter/Leave`, `TooltipTrigger` wrap) 을 모두 건너뛰고 있었음. 결과적으로 `<CellText tooltip copyable />` 형태로 함께 지정해도 tooltip 이 표시되지 않음.

수정 후:
- `copyable` 일 때 button 에도 `elementRef` 와 hover 핸들러를 부착
- `useTableTooltip` 컨텍스트 (예: `DataGrid`) 가 있으면 싱글톤 tooltip, 없으면 `TooltipTrigger` 로 wrap

```tsx
// 이제 정상 동작 — 호버 시 tooltip + 클릭 시 복사
<CellText value={longText} tooltip copyable />
```

- `src/components/table/cells/CellText.tsx`

## [1.9.13] - 2026-04-28

### Fixed — `DataGrid` `fitLimitRowHeight` 가 `pagination={false}` 일 때 동작하지 않던 문제

`pagination !== false` 가드가 padding row 계산을 막고 있어, `pagination={false}` 와 함께 쓰면 `fitLimitRowHeight` 가 no-op 이었음. `paginationInfo.limit` 은 pagination 활성 여부와 무관하게 항상 채워지므로(미지정 시 기본 10, 또는 명시한 `limit` prop 값), 가드를 제거.

이제 `pagination={false}` + `limit={N}` + `fitLimitRowHeight` 조합에서 바디가 `N × rowHeight` 로 고정되며, 데이터가 부족하면 placeholder 행으로 채워짐 — prop 의 본래 의도대로 동작.

```tsx
// 이제 정상 동작
<DataGrid
  pagination={false}
  limit={10}
  rowHeight="36px"
  fitLimitRowHeight
  data={fewRows}
/>
```

- `src/components/table/DataGrid.tsx`

## [1.9.12] - 2026-04-26

### Changed (Breaking) — `DateRangePicker` 기본 모드: `onChange` 는 범위 완성 시점에만 발생

**v1.9.8 의 "revert-on-partial-close" 패치를 commit-on-completion 시맨틱으로 정식화.** 기본 모드 (`showActions=false`) 의 `onChange` 발화 시점이 `MonthRangePicker` 와 동일하게 정렬됨.

**이전 동작 (v1.9.11 이하)**
- 첫 클릭: `onChange({from: date, to: date})` 즉시 발화 (RDP 의 단일일 완성 범위)
- 두 번째 클릭: `onChange({from, to})` 발화
- 두 번째 클릭 없이 닫음: `onChange(snapshot)` 으로 revert 발화 (v1.9.8 부터)

**변경 후 동작 (v1.9.12+)**
- 첫 클릭: 내부 `stagedValue` 만 업데이트, **`onChange` 미발화**
- 두 번째 클릭 (= 범위 완성): `onChange({from, to})` 한 번만 발화, 팝오버 자동 닫힘
- 두 번째 클릭 없이 닫음: `onChange` 미발화 (parent value 변경 없음)

**세부**
- 캘린더는 항상 `stagedValue` 를 표시 (이전: 기본 모드는 `value`, showActions 모드는 `stagedValue`).
- `useEffect (open 전환)` 가 stagedValue 를 value 와 동기화 — 열 때 / 닫을 때 모두.
- `showActions` 모드 (확인 버튼 사용) 는 동작 변경 없음 — confirm 시점에만 `onChange`.
- `resetOnSelect=true` (기본) 동작 그대로 유지 — 완성 범위 + 클릭 = 새 시작일.

**호환성**
- 부분 선택 (single-day staging) 을 외부에서 관찰하던 컨슈머는 더 이상 그 시그널을 받지 못함. 대부분의 경우 의도하지 않은 transient 값이었으므로 영향 없음.
- `MonthRangePicker` 가 이미 사용 중이던 패턴이라 두 컴포넌트의 시맨틱이 일치.

자세한 내용은 [MIGRATION.md](./MIGRATION.md#v1911--v1912-daterangepicker-onchange-on-completion) 참고.

## [1.9.11] - 2026-04-26

### Changed — DS 가이드라인 위반 정리 (token 사용 일관화)

전수 audit 후 production 컴포넌트의 가이드라인 위반 사항을 일괄 수정. API / 시각 동작 변경 없음.

**새 토큰 추가**
- `width-1` (1px), `width-72` (72px), `width-160` (160px) — `src/styles/utilities.css`
- `margin-l-4` (4px) — `src/styles/utilities.css`
- `--shadow-inset-highlight` (Radio / RadioCard 의 1px white-25% inset accent) — `src/styles/tokens/shadow.css`

**Tailwind 원시 색 → DS 토큰 (`text-white` → `text-white-default`)**
- `stepper/Stepper.tsx` (×2)
- `dialog/Dialog.tsx`, `dialog/AlertDialog.tsx`, `dialog/AlertDialogPrimitives.tsx`
- `switch/Switch.tsx`

**Overlay (`bg-black/80` → `bg-overlay`, Dialog 와 일관)**
- `drawer-sheet/Drawer.tsx`, `drawer-sheet/Sheet.tsx`

**Transition 명시 (`transition-all` 제거, 변경 속성만 지정)**
- `calendar/Calendar.tsx` → `transition-colors`
- `table/cells/CellProgress.tsx` → `transition-[width]`

**Inline boxShadow → CSS var**
- `radio/Radio.tsx`, `radio/RadioCard.tsx` → `var(--shadow-inset-highlight)`

**Arbitrary px → DS 토큰**
- `time-picker/TimeInput.tsx`, `time-picker/TimeRangeInput.tsx`: `ml-[4px]` → `margin-l-4`
- `slider/SliderInput.tsx`, `slider/SliderRangeInput.tsx` (×2): `w-[72px]` → `width-72`
- `slider/SliderTicks.tsx`: `w-[1px]` → `width-1`
- `calendar/QuickPresets.tsx`: `w-[160px]` → `width-160`

**Stories — 금지된 `font-bold` → `font-semibold`** (`font-light/bold/extrabold` 는 가이드라인상 금지)
- `form/SignupForm.stories.tsx` (×4), `navigation-menu/NavigationMenu.stories.tsx`, `drawer-sheet/Drawer.stories.tsx`, `table/DataGrid.stories.tsx` (×9), `table/Table.stories.tsx` (×4)

## [1.9.10] - 2026-04-26

### Changed — DS font-family 유틸리티에 `!important` 적용

`font-headline` / `font-body` / `font-quote` / `font-code` 의 `font-family` 선언에 `!important` 추가. 컨슈머 프로젝트의 전역 / 리셋 / 프레임워크 스타일이 DS 의 폰트 패밀리를 우회 적용하지 못하도록 보호.

- 영향 범위: `font-family` 한 속성에만 적용. `font-size` / `font-weight` / `font-style` 등 다른 폰트 속성에는 영향 없음.
- 다른 폰트 토큰 (size, weight, line-height) 은 기존대로 override 가능.

## [1.9.9] - 2026-04-26

### Fixed — `Select` inside `Dialog` 시각적 이슈 (다이얼로그 시프트 / 드롭다운 클립)

Consumer 보고 (`happytalk-front`): DS `Select` 를 DS `Dialog` 안에서 열 때 두 가지 시각 이슈 — (a) 다이얼로그 컨텐츠 전체가 스크롤바 폭(약 17px) 만큼 우측으로 밀림 (b) 드롭다운이 다이얼로그 영역 밖으로 클립됨.

원인: 이전엔 `Select.Content` 가 `usePortalContainer()` 컨텍스트를 사용해 Dialog 의 contentEl 로 포털했는데, Dialog 의 `transform` 으로 인해 contentEl 이 containing-block 이 되고 `overflow-hidden` 이 드롭다운을 클립. 또한 `Dialog.Content` 와 `Select.Content` 가 각자 `react-remove-scroll` 을 활성화하면서 `body` 패딩 보정 충돌이 발생.

- v1.9.1 에서 `DropdownInput` 에 적용했던 패턴을 `Select` 에도 동일 적용 — **항상 `document.body` 로 포털**, **`z-[10100]`** (Dialog `z-[10000]` 위로 스택).
  - `SelectPrimitive.Portal` / `PopoverPrimitive.Portal` (searchable 경로) 에서 `container={contextContainer ?? undefined}` 제거 → 기본 (body) 포털.
  - `SelectContent` / Popover content 의 `z-[100]` → `z-[10100]`.
- Dialog 밖에서의 동작은 변경 없음 (기존에도 body 포털로 동작).
- API 변경 없음, 컨슈머 코드 수정 불필요.

## [1.9.8] - 2026-04-25

### Added — `DateRangePicker` / `MonthRangePicker` `resetOnSelect` prop (default `true`)

Consumer 피드백 (`happytalk-front`): 완성된 범위가 표시된 상태에서 사용자가 시작일을 새 날짜로 옮기려면 같은 날을 두 번 클릭해야 하는 어색한 UX. 원인은 react-day-picker v9 의 `addToRange` 가 완성 범위 + 클릭을 "가까운 끝점 확장" 으로 해석하기 때문 — 시작일 뒤쪽의 어떤 날짜를 클릭해도 그 날짜가 새 `to` 가 되고 `from` 은 박혀 있음. React Aria / Mantine 등이 채택한 "완성된 범위 + 클릭 = 새 범위 시작" 패턴으로 통일.

- **`resetOnSelect?: boolean`** (default `true`) — `DateRangePicker` 와 `MonthRangePicker` 양쪽에 추가
  - `true`: 팝오버를 새로 연 직후 (selectionPhase = `idle`) 에 이미 완성된 범위가 있는 상태에서 클릭이 들어오면, 그 클릭을 "새 시작일" 로 해석. 기존 `to` 는 비워지고 다음 클릭으로 새 `to` 결정
  - `false`: 기존 동작 유지 (RDP `addToRange` / MonthRangePicker 에서는 가까운 끝점 확장)
  - **`'idle'` 게이트 중요**: RDP 는 빈 상태 첫 클릭에 `{from, to: date}` 단일일 완성 범위를 만들기 때문에 phase 가 즉시 `selecting-end` 로 진입. 이 게이트 덕분에 빈 상태 → 두 클릭으로 정상 범위 완성이 깨지지 않음
- 기존 시그니처 호환: `triggerDate` 는 RDP `OnSelectHandler` 가 항상 두 번째 인자로 전달하던 값이라 wrapper 측 onSelect 시그니처만 보강
- RDP 자체의 `resetOnSelect` (v9.14.0+) 에 의존하지 않고 wrapper 에서 구현 — 설치된 9.13.0 기준에서 그대로 동작, dep bump 불필요

### Fixed — `DateRangePicker` 부분 선택 후 외부 닫기 시 원래 값으로 revert

기존: 사용자가 시작일만 클릭하고 외부 클릭 / ESC 로 캘린더를 닫으면 RDP 의 첫 클릭 단일일 범위 (`{from, to: date}`) 가 이미 `onChange` 로 부모에 전파되어 의도치 않게 값이 바뀌어 있었음.

- 팝오버 open 시점의 `value` 를 `snapshotRef` 로 캡처. `selectionPhase === 'selecting-end'` (= 시작일만 골라진 상태) 에서 닫히면 `onChange(snapshotRef.current)` 로 revert
- snapshot 캡처를 `handleOpenChange` 가 아닌 **`open` 전환 useEffect** 로 이동. 기존엔 Radix 의 `onOpenChange` 콜백 안에서만 캡처 → input 의 캘린더 아이콘 클릭 (`handleOpenCalendar` → `setOpen(true)`) 이 그 콜백을 우회해 snapshot 이 stale (mount 시점 초기값, 보통 `undefined`) 로 남아 revert 가 빈 값으로 되던 버그도 동시에 해결
- `valueRef` 도입으로 항상 최신 `value` snapshot. handleOpenChange 의 `value` 의존성 제거
- 완성된 범위 (`from + to`) 를 새로 선택한 경우는 phase 가 `idle` 로 돌아가므로 revert 안 함 — 정상 커밋
- `showActions` 모드 동작은 그대로 (취소 / 외부 / ESC 모두 항상 snapshot revert)
- `MonthRangePicker` 는 부분 선택을 내부 `tempRange` 에만 보관하고 완성 시점에만 `onChange` 발생하므로 추가 변경 불필요

## [1.9.7] - 2026-04-24

### Added — DataGrid `fitLimitRowHeight` prop

Consumer 요청 (`happytalk-front`): Dialog 안에서 `DataGrid` 를 `limit={10}` 으로 쓸 때, 마지막 페이지에 행이 적게 남으면 Dialog 전체 높이가 줄어드는 문제. 기존에는 `minHeight="460px"` / `maxHeight="460px"` 같은 매직 넘버로 우회했지만, `limit × rowHeight` 와 정확히 맞추기 어렵고 `rowHeight` 변경 시 값이 어긋남.

- **`fitLimitRowHeight?: boolean`** (default `false`) — 바디 영역(헤더·페이지네이션 제외) 을 `limit` 개 행 분량으로 고정. 마지막 페이지에 행이 부족하면 `(limit - rows.length)` 개의 빈 placeholder 행이 뒤에 채워집니다.
  - Placeholder 행은 실제 행과 동일한 `rowHeight` · 셀 보더(`border-r` / `border-b`) · sticky 컬럼 포지션을 유지해, 마지막 페이지도 중간 페이지와 시각적으로 동일합니다.
  - Placeholder 는 `aria-hidden` 처리되어 screen reader 는 skip 합니다.
  - `getRowHeight` (동적 행 높이) 와 함께 사용 불가. 둘 다 설정되면 `fitLimitRowHeight` 는 무시되고 dev `console.warn` 출력.
  - `pagination={false}` 일 때는 자동으로 비활성.
- 이전 패턴과의 비교:
  ```tsx
  // Before — 매직 넘버 수동 계산
  <DataGrid limit={10} rowHeight="36px" minHeight="460px" maxHeight="460px" />

  // After — DataGrid 가 limit × rowHeight 를 스스로 계산
  <DataGrid limit={10} rowHeight="36px" fitLimitRowHeight />
  ```

### Storybook

- **DataGrid Default** — `fitLimitRowHeight` 컨트롤(argType + args + render) 추가. 토글로 on/off 전환해 마지막 페이지 동작을 바로 확인 가능.

## [1.9.6] - 2026-04-24

### Added — HtmlEditor `showContentSize` prop + content-size indicator decoupling

Consumer 요청 (`happytalk-front`): "모든 `HtmlEditor` 에 '0 Bytes / 5 MB' 같은 크기 인디케이터를 켤 수 있게 해달라. 단, `onContentSizeChange` 콜백과 독립적으로."

- **`showContentSize?: boolean`** (default `false`) — 에디터 하단 우측의 내장 크기 인디케이터 표시 여부
  - `maxContentSize` 가 설정되어 있으면 `"X / max"` 포맷, 없으면 `"X"` (current only)
  - `contentSize >= maxContentSize` 이면 인디케이터 텍스트 + **에디터 외곽 테두리** 모두 `text-destructive` / `border-destructive` 로 전환 (consumer 의 `error` prop 과 동일한 시각 상태). 사용자가 제출 전에 시각적으로 인지 가능
  - 바이트 포맷: `Bytes → KB → MB → GB` (이전엔 GB tier 없었음)
- **`onContentSizeChange` 콜백과 완전 분리** — 두 prop 이 이제 독립적. 콜백만 / 인디케이터만 / 둘 다 자유롭게 선택
- 내부 debounced 크기 계산은 둘 중 하나라도 켜져 있으면 동작

### Changed — `onContentSizeChange` 단독으로는 더 이상 인디케이터 표시 안 함 (soft breaking)

- 이전 v1.9.5 까지: `onContentSizeChange` 를 넘기면 **부작용으로** 인디케이터가 자동 표시 (문서화 안 됨)
- v1.9.6 부터: 인디케이터는 `showContentSize={true}` 로 명시적 opt-in
- **Migration**: 인디케이터가 보이던 consumer 는 `showContentSize` 를 추가. 콜백만 쓰던 consumer 는 아무 변경 불필요
- 런타임 에러 없음 — 인디케이터가 조용히 사라질 뿐. 이 결합은 문서화된 적이 없어서 소수 consumer 만 영향받을 것으로 예상

### Changed — `maxContentSize` 없이 인디케이터 사용 시 fallback 동작 수정

- 이전: max 가 없어도 하드코딩된 `"/ 5 MB"` 가 suffix 로 붙었음 (항상 잘못된 값)
- 변경: max 가 없으면 current 값만 표시 (`"123 Bytes"`). 의미상 정확

### Storybook

- **`ContentSize`** (업데이트) — `showContentSize` + `onContentSizeChange` 같이 사용하는 예시. 에디터 하단 우측 내장 인디케이터 + 외부 텍스트 표시 동시에
- **`ContentSizeOverLimit`** (신규) — `maxContentSize={200}` + 미리 채워진 콘텐츠로 한도 초과 상태 즉시 확인. 빨간 테두리 + 빨간 인디케이터
- **`ContentSizeNoMax`** (신규) — `showContentSize` 만, `maxContentSize` 없음 → current 만 표시

## [1.9.5] - 2026-04-24

### Fixed — HtmlEditor 출력 HTML 이 Consumer B (뷰어) 측에서 스타일 없이 렌더되던 문제

`HtmlEditor` 에서 작성·저장된 HTML 을 **다른 consumer 앱이 `dangerouslySetInnerHTML` 로 렌더할 때** 목록 마커 / 헤딩 크기 / 인용 줄 / 코드 배경 / 링크 색 / 이미지 크기가 모두 사라지던 문제. 두 층으로 수정.

**Editor 측 (DS 자체가 consumer 에서 정상 동작)**

- `HtmlEditor.css` 가 `dist/index.css` 에 번들되지 않아 consumer 가 DS 를 설치해도 에디터 스타일이 적용 안 됨 → 순서 없는 목록 토글 등이 "먹히지 않는 것처럼" 보임 (실제로는 `<ul>` 로 토글되지만 Tailwind Preflight 가 `list-style: none` 으로 초기화)
  - 원인: `vite.config.ts` 의 `treeshake.moduleSideEffects: false` 가 `HtmlEditor.tsx` 의 `import './HtmlEditor.css'` side-effect 를 제거. 이 패턴을 쓰는 컴포넌트가 `HtmlEditor` 하나뿐이라 다른 CSS 는 문제 없었음
  - 해결: `src/index.css` 에 `@import "./components/html-editor/HtmlEditor.css"` 추가. 메인 CSS 번들에 포함되어 `dist/index.css` 한 번만 import 하는 기존 consumer 는 코드 변경 없이 즉시 작동

**뷰어 측 (다른 consumer 가 DS CSS 없이도 HTML 을 정상 렌더)**

- `editor.getHTML()` 출력이 각 노드에 inline `style="..."` 를 동반하도록 TipTap extension 재구성
  - `src/components/html-editor/extensions.ts` (신규): `toStyle` helper + `INLINE_STYLES` per-node 선언 + 6단계 heading 별 font-size 맵을 가진 `StyledHeading` (`Heading.extend` 에서 `renderHTML` override, per-level style 을 `mergeAttributes` 마지막 인자로 전달해 option-level override 를 이기게 함)
  - `useHtmlEditor.ts`: extension 구성을 `buildExtensions(features, placeholder)` 로 추출 (headless 테스트 가능). StarterKit 의 `bulletList / orderedList / listItem / blockquote / codeBlock / code` 각각에 `HTMLAttributes.style` 주입. `heading` 은 StarterKit 에서 disable 하고 `StyledHeading.configure({ levels: [1..6] })` 로 교체. `Link` / `Image` 도 `HTMLAttributes.style` 주입
  - 색/크기 값은 모두 `var(--token, #hex)` 형태로 fallback 포함 → DS 토큰이 있으면 테마 적용, 없으면 하드코딩된 hex 사용. 가장 중요한 타협점: 인라인 스타일 방식은 viewer-side 에서 DS 의존성 0 달성
- `HtmlEditor.css` 슬림 — inline style 이 담당하는 규칙 (heading 크기, blockquote, pre, 목록, 링크, 이미지) 제거. 에디터 전용 규칙 (focus/outline 리셋, placeholder, disabled/readonly, sibling margin) 은 유지. `pre code` 리셋과 중첩 목록 depth (`ul ul` `circle` 등) 는 `!important` 로 유지 — inline `background` / `list-style-type` 이 자식 요소에 직접 걸려 있어 descendant selector 가 specificity 로 못 이김
- **Sanitizer 주의사항**: stored HTML 을 DOMPurify 등으로 정제하는 consumer 는 allowlist 에 `ul, ol, li, h1-h6, blockquote, pre, code, a, img` 의 `style` 속성 + `span` (TextStyle/Color) / `mark` (Highlight) 를 포함해야 함
- **`calculateContentSize` / `maxContentSize` 의미 변화**: 같은 입력 콘텐츠가 inline style 만큼 (~20-40%) 더 크게 측정됨. 타이트한 `maxContentSize` 를 쓰던 consumer 는 한도 상향 검토 필요. 5MB 같은 넉넉한 한도는 영향 없음
- **Tests**: `extensions.test.ts` (신규) — 32 케이스 (`toStyle` 유닛, `INLINE_STYLES` / `HEADING_STYLES` 순수 데이터 검증, 각 노드에서 `editor.getHTML()` 에 `style` 속성이 출력되는지 + 헤딩 font-size 값 정확도, 라운드트립 중복 방지)

### Fixed — HtmlEditor Toolbar 우측 고정 영역 하단 정렬 (회귀)

- 가로 스크롤바 (`offsetScrollbars` 로 viewport 하단 10px 여백) 가 생기는 좌측 스크롤 영역 과 오른쪽 고정 영역 (undo/redo + code view) 의 하단선이 어긋나 보이던 문제. 우측 고정 div 에 `style={{ paddingBottom: 10 }}` 추가해 ScrollArea 의 내부 gutter 와 일치시킴

### Fixed — DropdownInput 옵션 클릭이 `Dialog disableOutsideClose` 안에서 먹히지 않던 문제

- **증상**: `Input variant="lead-dropdown" / "tail-dropdown"` 이 DS `Dialog` (with `disableOutsideClose`) 안에 있을 때, 드롭다운 옵션 클릭이 아무 반응 없음 + 옵션 hover 시 `cursor: pointer` 도 안 먹음
- **원인**: `createPortal(menu, document.body)` 로 dialog 서브트리 밖에 붙은 메뉴가 Radix `DismissableLayer` 의 `disableOutsidePointerEvents: true` (modal Dialog 가 항상 설정) 에 의한 `body { pointer-events: none }` 의 희생자가 됨. Radix 는 layer stack 에 등록된 DismissableLayer 에만 `pointer-events: auto` 를 inline 으로 복원하는데, 평범한 div 로 portal 된 메뉴는 layer 가 아니라 차단됨
- **해결**: portal 내부 메뉴 컨테이너를 `DismissableLayerBranch` 가 아니라 `DismissableLayer` 로 감쌈. Dialog layer 위에 스택되어 pointer-events 가 복원되고 option click 이 정상 동작. ESC 키는 dropdown 이 자체 처리 (상위 Dialog 로 propagate 막음)
- `@radix-ui/react-dismissable-layer` 를 transitive 의존성에서 **direct dependency 로 승격** (`^1.1.11`)

### Fixed — Dialog 가 작은 뷰포트에서 헤더/푸터가 잘리던 문제 (회귀)

- **증상**: `HtmlEditor` 포함 큰 폼을 담은 Dialog (예: 헬프데스크 등록) 를 작은 브라우저 창에서 열면, `fixed + translate(-50%, -50%)` 센터링 + 높이 제약 없음 때문에 콘텐츠가 뷰포트 위아래로 같이 삐져 나감. X 버튼과 하단 액션 버튼 모두에 접근 불가. 페이지 스크롤도 `position: fixed` 라 안 먹힘
- **해결 — 3-region flex 레이아웃**
  - `DialogContent` (non-fullScreen) 가 `max-height: calc(100vh - 32px)` + `overflow-hidden` + `flex flex-col` 컨테이너가 됨
  - React child introspection 으로 `DialogHeader` / `DialogFooter` 를 뽑아내 **스크롤 영역 바깥** 의 flex-col 자식으로 렌더 → 절대 뷰포트 밖으로 안 나감
  - 나머지 children 은 내부 body wrapper (`flex-1 min-h-0 overflow-y-auto padding-x-24 padding-y-16`) 안으로 들어가 스크롤만 담당
  - 바디 wrapper 는 DS ScrollArea 대신 native `overflow-y-auto` + `::-webkit-scrollbar` / `scrollbar-width: thin` 커스텀 (Radix ScrollArea Viewport 가 `h-full` + flex-computed height 조합에서 일부 브라우저에서 0 으로 수축되는 이슈 회피). 시각 스타일은 DS ScrollArea 와 동일한 얇은 rounded thumb + hover 강조
- **레이아웃 보존**: DialogHeader 는 `padding-x-24` + inline `paddingTop: 24 / paddingBottom: 0`, Body wrapper 는 `padding-y-16` 으로 스크롤 안쪽 breathing room + gap, DialogFooter 는 `padding-x-24` + inline `paddingTop: 0 / paddingBottom: 24`. 총 간격은 기존 `padding-24 + grid gap-16` 과 동일 (24 / 16 / 16 / 24)
- **Close 버튼** 은 outer DialogContent 의 `absolute top-20 right-20` 로 스크롤 영역 바깥에 배치 → 스크롤과 무관하게 항상 우상단 고정
- **Consumer 변경 불필요**: `<DialogHeader>` / `<DialogFooter>` 슬롯을 쓰는 기존 consumer 는 업그레이드만 하면 자동 적용. 슬롯을 안 쓰면 fullScreen 과 동일한 fallback (모든 children 이 body 로) 으로 동작하므로 기존 짧은 Dialog 는 변화 없음
- Reporter: happytalk-front / 헬프데스크 등록 화면

### Fixed — DataGridCell `align: 'center' | 'right'` 가 실제로 적용 안 되던 버그

- `meta.align` 으로 컬럼 정렬을 주면 셀의 outer flex 에 `justify-center / justify-end` 가 붙지만, 내부 content wrapper 가 `w-full text-ellipsis whitespace-nowrap` 이라 항상 100% 폭을 차지해 `justify-*` 가 시각적으로 의미 없어짐. 결과적으로 텍스트는 항상 왼쪽 정렬
- inner wrapper 에 `text-center` / `text-right` 을 추가해 실제 텍스트 정렬을 반영 (ellipsis 동작도 유지)

### Added — FileUploadCard `hideFilename` + 유연한 썸네일 폭

- **`hideFilename?: boolean`**: 기존 `hideSize` 와 한 쌍. 파일명 행을 숨겨 썸네일·상태·액션만 남기는 슬림 카드용
- **썸네일 폭이 이미지 원본 비율에 맞춰 유연**: `thumbnail` 이 제공되면 높이는 고정, 폭은 **1:1 (최소) ~ 1:3 (최대)** 사이에서 자동. 이미지 `onLoad` 에서 `naturalWidth/naturalHeight` 로 종횡비를 읽어 clamp 한 값을 container 의 `aspect-ratio` 에 적용. 3:1 보다 긴 원본은 `object-fit: cover` 로 1:3 에서 가운데 크롭
- 썸네일이 없는 (아이콘) 경우는 기존과 동일한 1:1 정사각형
- `FILE_UPLOAD_CARD_THUMBNAIL_HEIGHT_PX` (lg=40, sm=32) + `FILE_UPLOAD_CARD_THUMBNAIL_MAX_ASPECT` (3) 상수 추가
- **Storybook**: `DataEntry/FileUpload → CardHideSize` 에 `hideFilename` / `hideFilename + hideSize` 두 예시 추가. `CardThumbnailResponsive` (신규) 에 1:1 / 2:1 / 5:1 (clamp) / 1:2 세로 (clamp) 네 케이스 비교

## [1.9.3] - 2026-04-23

### Added — FileUploadCard (bridge: `hideSize` / optional size)

- **`FileUploadCard` 에 `hideSize?: boolean` prop 추가**. 메타 행에서 파일 크기 span 과 구분자(`|`)를 함께 숨기고 status 라벨(Uploaded 등)만 남깁니다. 디자인상 특정 화면에서 크기를 일부러 감추고 싶을 때 사용
- **`FileInfo.size` 를 `size?: number` (optional) 로 변경**. 서버에서 불러온 항목처럼 크기를 모르는 경우 생략 가능 — 미지정 시 메타 행의 size span 이 자동으로 숨겨짐
- 소비자 워크어라운드 제거: 기존에는 `size: 0` 을 강제로 넘기고 `:has()` CSS 로 억지로 숨기던 패턴이 필요했음. 이제 prop/optional 타입으로 깔끔히 처리
- **Storybook**: `DataEntry/FileUpload → CardHideSize` — 기본(크기 표시) / `hideSize` / `file.size` 미지정 세 가지 상태 비교

### Fixed — HtmlEditor 본문 테두리 (case 2 후속 조치)

v1.9.2 의 ScrollArea viewport outline 억제에 더해 ProseMirror 레이어에서도 테두리가 나올 수 있는 두 경로를 추가로 차단

- **`.ProseMirror-selectednode` outline 제거** — `prosemirror-view` 기본 CSS 에 `outline: 2px solid #8cf` 규칙이 있음. 사용자가 Escape+방향키, 삼중 클릭, 또는 특정 focus 경로로 NodeSelection 상태가 되면 이 규칙이 발동해 본문 전체를 감싸는 2px 사각형이 나타남 (스크린샷/줌 레벨에 따라 짙은 회색/검은색처럼 보이기도 함). HtmlEditor 범위에서 `outline: none` 으로 덮어씀
- **`.ProseMirror-focused` 클래스 기반 리셋 추가** — TipTap 이 포커스된 에디터에 이 클래스를 부착. 일부 user-agent / 3rd-party stylesheet 이 이 클래스를 타겟해 outline 을 그리는 경우 대비해 pseudo-class(`:focus`) 리셋과 별개로 클래스 단위로도 명시적 리셋

## [1.9.2] - 2026-04-23

### Fixed — HtmlEditor

- **Toolbar 가로 스크롤바가 우측 아이콘과 겹치던 문제**. 툴바 버튼이 많아 가로 스크롤이 생기면 Radix ScrollArea 의 horizontal scrollbar thumb 가 아이콘 위에 떠서 시각적 충돌
  - `Toolbar.tsx` 의 `<ScrollArea orientation="horizontal">` 에 `offsetScrollbars` 추가. viewport 하단에 scrollbar 크기만큼의 padding 이 들어가 thumb 가 아이콘 아래 별도 영역에 놓임 (1.9.0 BarList 수정과 동일 패턴)
- **본문 선택/텍스트 입력 시 에디터 본문 주위에 1px 테두리가 생기던 문제** (Windows Chrome/Edge 에서 주로 발생). 원인: `HtmlEditor` 는 `EditorContent` 를 `<ScrollArea>` 로 감싸는데, Radix ScrollArea 의 `Viewport` 가 a11y 를 위해 `tabIndex={0}` 을 가지고 있음. 에디터 본문 클릭 시 focus 가 Viewport 를 거쳐 contenteditable 로 가며, Windows 브라우저는 비인터랙티브 요소에도 default focus ring 을 그림. 기존 CSS 는 `.ProseMirror` / `[contenteditable]` 에만 outline 을 제거했고 Viewport 엘리먼트는 놓치고 있었음
  - `HtmlEditor.css` 에 `.blumnai-html-editor [data-radix-scroll-area-viewport]:focus` 대상 outline/box-shadow 제거 규칙 추가. HtmlEditor 범위 내로 scoped 되어 다른 ScrollArea 소비자 (키보드 focus ring 이 필요한 곳) 는 영향 없음

### Fixed — Searchable Select truncate 툴팁 클립 문제

- **Searchable `Select` (또는 `Combobox`) 옵션의 긴 라벨을 hover 했을 때 `TruncatedText` 의 툴팁이 popover 의 `overflow: hidden` 뷰포트 안에 portal 되어 잘리던 문제**. 원인: `RadixSelect` 의 searchable popover 가 `<PortalContainerProvider value={contentEl}>` 로 자식 floating 들의 portal 타겟을 popover content 로 설정. Tooltip 이 그 컨텍스트를 상속해서 popover 안쪽으로 portal → ScrollArea viewport 에 의해 clipping
  - `TruncatedText.tsx` 의 `<TooltipTrigger>` 에 `escapePortalContext` 추가. 이 prop 은 기존에 이 시나리오 대비로 만들어져 있었고, 툴팁을 `document.body` + `z-index: 10001` 로 강제해 popover stacking/overflow 를 완전히 벗어나게 함
  - 영향: Select-계열 드롭다운 아이템의 truncate 툴팁 모두 (RadixSelect searchable items, RadixMultiSelect items)

### Case 3 진단 (변경 없음)

사용자 리포트 "HtmlEditor 에서 BlockTypeDropdown 의 heading 선택 + bullet/ordered list 버튼 적용 안됨" — 코드 경로 상 문제 없음 (`editor.chain().focus().toggleHeading/toggleBulletList().run()` 표준 TipTap 호출, StarterKit 에 해당 extensions 등록됨). 추측: Dialog 의 focus trap 이나 Popover open 시 editor selection 이 collapsed 되어 command 가 no-op 이 되는 상호작용 버그일 수 있음. 재현 확보 후 후속 태스크로 처리 예정.

## [1.9.1] - 2026-04-23

### Fixed — Charts (follow-up to v1.9.0 `tooltipTrigger="item"`)

- **LineChart / BarChart / ComboChart — `tooltipTrigger="item"` 이 실제로 동작하도록 수정**. v1.9.0 은 Recharts `shared={false}` 에 의존했는데, LineChart / BarChart / ComposedChart 는 내부적으로 `allowedTooltipTypes = ['axis']` 를 강제하여 `shared={false}` 가 무시됩니다 (payload 에 항상 전체 시리즈 포함). 결과적으로 v1.9.0 의 `tooltipTrigger="item"` 은 ScatterChart / PieChart / FunnelChart 에서만 동작했고, 가장 많이 쓰이는 LineChart 에서는 no-op 이었습니다
  - **LineChart**: `onMouseMove` 에서 `activeCoordinate.y` (커서 픽셀 Y) + `activeTooltipIndex` (현재 X 인덱스) 로 **커서 Y 에 가장 가까운 시리즈**를 계산해 payload 필터링. activeDot onMouseEnter/Leave 핸들러 대신 nearest-by-Y 방식이어서 점 사이 빈 공간에서도 자연스럽게 추적됨
  - **BarChart**: 각 `<Bar>` 의 `onMouseEnter` / `onMouseLeave` 로 호버 중인 bar dataKey 추적 (stacked 포함)
  - **ComboChart**: bar 는 BarChart 와 동일한 hover 추적. line/area 는 dual-axis + 혼합 차트에서 nearest-by-Y 를 정확히 구현하기 어려워 일단 제거 (추후 별도 지원 예정)
  - `ChartTooltipAdapter` 에 `tooltipTrigger` / `activeDataKey` prop 추가. 추적 실패 시 전체 payload 로 fallback 하여 툴팁이 완전히 사라지지 않게 처리
  - `shared={tooltipTrigger !== 'item'}` override 제거 — Recharts 가 무시하므로 의미 없고, 툴팁 좌표 계산 간섭만 유발
  - 추가 수정: `activeTooltipIndex` 는 Recharts 3.x 내부적으로 `String(activeIndex)` 로 문자열 변환되므로 `Number()` 코어시안 필요. 이 하나 때문에 초기 구현이 no-op 이었음
- **Storybook 스토리 추가**: `DataDisplay/LineChart` 하위 `TooltipTriggerItem` — 점이 아닌 라인 영역 위 hover 시에도 가장 가까운 시리즈만 툴팁에 표시되는지 확인

### Fixed — DropdownInput (Dialog 내부 portal 위치)

- **`Input variant="lead-dropdown" / "tail-dropdown"` 이 Dialog 안에서 옵션 메뉴가 화면 우측으로 튀거나 Dialog 뒤에 숨던 버그 수정**. 세 가지 문제가 겹쳤음
  - **Bug A (좌표계 혼동)**: `getBoundingClientRect()` (viewport 기준) 에 `window.scrollY` / `scrollX` 를 더해 놓고 `position: fixed` (역시 viewport 기준) 로 배치 → 스크롤된 페이지에서 드롭다운이 추가 offset 만큼 어긋남. 스크롤 오프셋 덧셈 제거
  - **Bug B (transform containing-block)**: CSS 스펙상 `transform` / `filter` / `perspective` 를 가진 선조가 있으면 `position: fixed` 가 viewport 가 아닌 그 선조 기준으로 배치됨. Dialog 는 내용을 `transform: translate(-50%, -50%)` 로 중앙 정렬하므로 드롭다운 portal 이 `PortalContainerProvider` 를 구독하면 Dialog 의 transform 서브트리 안에 붙어 좌표가 엉망이 됨. Portal target 을 **항상 `document.body`** 로 고정하고 `usePortalContainer()` 구독 제거
  - **Bug C (stacking)**: 위 수정 후 Portal 이 Dialog 서브트리 밖 `document.body` 에 붙게 되면서 Dialog (`z-[10000]`) 에 가려지는 문제. `DROPDOWN_MENU_BASE` 의 `z-50` → `z-[10100]` 로 bump. DropdownInput 만 이 상수를 사용 → 다른 컴포넌트 영향 없음
- 참고: 근본적으로는 `createPortal` + 수동 좌표 계산을 `Radix Popover` 기반으로 바꾸는 것이 정석 (다른 DS floating 컴포넌트와 동일한 stacking 전략). 당장은 band-aid 로 스코프 유지, 리팩터는 후속 태스크로
- **Storybook 스토리 추가**: `DataEntry/Input/DropdownInput` 하위 `InsideDialog` — Dialog 안의 lead-dropdown 옵션이 트리거 바로 아래, Dialog 위에 표시되는지 확인

### Fixed — Searchable Select (긴 옵션 라벨 ellipsis)

- **`Select searchable=true` 에서 긴 옵션 라벨이 `…` 없이 드롭다운 가장자리를 넘어 잘리던 버그 수정**. 원인은 `CommandPrimitive.Item` 에 `min-w-0` 가 없어 flex child 의 기본 `min-width: auto` 때문에 긴 라벨이 `w-full` 을 뚫고 자라면서 truncate 체인이 끊어진 것
  - `SearchableSelectItem` 의 `CommandPrimitive.Item` className 에 `min-w-0` 추가
  - 라벨 래퍼에 `style={{ width: 0 }}` 추가 (일부 브라우저의 `flex-basis: 0%` 불안정 대비 — belt & suspenders)
  - trailing `Badge` 을 `flex-shrink-0` 로 감싸 라벨의 flex 공간을 침범하지 않도록
- **Storybook 스토리 추가**: `DataEntry/Select` 하위 `SearchableLongLabels` — `contentWidth={240}` + 긴 라벨들로 ellipsis + hover tooltip 확인

### Added — Select / Combobox 포지셔닝 정리 (non-breaking, docs-only)

두 컴포넌트가 ARIA 상 서로 다른 두 패턴을 구현한다는 점을 문서/JSDoc 에서 명확히 했습니다. **런타임 동작 변경 없음.**

- **`Select`**: "클릭해서 여는 picker" (WAI-ARIA *Select-Only Combobox*, Radix Select 기반). 폼 필드의 기본 선택 UI
- **`Combobox`**: "editable 입력 + 자동완성" (WAI-ARIA *Editable Combobox with List Autocomplete*, Popover + cmdk 기반). 타이핑이 주 상호작용일 때
- `Select.searchable` prop 에 `@deprecated` JSDoc 추가 — 동작은 유지되나 새 코드에서는 `Combobox` 사용 권장
- `Select.tsx` / `Combobox.tsx` 컴포넌트 JSDoc 에 "언제 무엇을 쓸까" 결정 매트릭스 추가 (IDE hover + Storybook autodocs 에 노출)
- `Select.stories.tsx` / `ComboboxDefault.stories.tsx` meta 에 `parameters.docs.description.component` 로 같은 결정 매트릭스 추가
- `AI.md` Quick Reference 표와 Selection 결정 플로우 업데이트

### Added — Carousel

- **`CarouselPrevious` / `CarouselNext` 에 `size?: ControlButtonSize` prop 추가**, 기본값 기존 `'lg'` (24px) → **`'xl'` (32px)** 로 변경. 캐러셀 네비게이션 아이콘이 너무 작다는 피드백 반영. 이전 크기로 돌리려면 `<CarouselPrevious size="lg" />`
- `CarouselNavProps` 를 `ButtonHTMLAttributes<HTMLButtonElement>` alias 에서 `interface` 로 승격하고 `size` 추가
- `DataDisplay/Carousel → Default` 스토리에 `arrowSize` 컨트롤 추가 (Navigation 카테고리, `sm / md / lg / xl`)

### Added — ControlButton

- **신규 size `'xl'`** (32×32 container, 20px icon). 기존 `sm` (16/14) / `md` (20/16) / `lg` (24/16) 스케일 확장. Carousel 의 새 기본값이 사용
- `ControlButtonSize` 타입에 `'xl'` 추가 (non-breaking)

### Fixed — Buttons 중 `cursor-pointer` 누락

`cursor: pointer` 가 enabled 상태에서 빠져있던 사이트들 일괄 추가. disabled 상태의 `cursor-not-allowed` 는 모두 기존과 동일

- **`ControlButton`** — base CVA 에 `cursor-pointer`
- **`AvatarButton`** — base CVA 에 `cursor-pointer`
- **`LinkButton`** — base CVA 에 `cursor-pointer` (기본 `<a>` 는 브라우저가 pointer 를 주지만 `asChild` 로 `<button>` 렌더 시 빠지는 경우 대비)
- **`Dropdown` 의 `MenuButton`** — enabled 상태에 `cursor-pointer` (기존엔 `disabled:cursor-not-allowed` 만)
- **`SidebarTrigger`** — `cursor-pointer` (Sidebar rail 의 `cursor-w-resize` 는 의도된 리사이즈 커서라 유지)

## [1.9.0] - 2026-04-23

### Added — Charts

- **`tooltipTrigger` prop** (`'hover' | 'click' | 'item'`, default `'hover'`) — 모든 Recharts 기반 차트 (LineChart / BarChart / ComboChart / DonutChart / PieChart) 의 툴팁 트리거 모드 제어.
  - `'hover'` (기본) — 축 호버 시 같은 x 좌표의 모든 시리즈가 payload 에 포함됨 (Recharts 기본 동작)
  - `'item'` — **개별 데이터 포인트 호버 시에만 표시**, payload 에는 호버된 시리즈 하나만 포함됨. 내부적으로 Recharts `shared={false}` 로 매핑. 다수 시리즈 겹침 상황에서 특정 라인/바만 집중해서 보고 싶을 때 사용 (consumer 요청: 10+ 플로우 LineChart 에서 개별 라인 포커스)
  - `'click'` — 클릭 시 표시. Recharts `trigger="click"` 으로 매핑
  - `'item'` 모드에서는 cursor (점선 십자선) 도 자동 비활성화
  - `renderTooltip` 사용 시 `items` 배열이 trigger 모드에 맞춰 필터링됨

### Fixed — Charts

- **`BarList` — 확장 시 스크롤바가 우측 값 숫자를 가리던 문제**: `maxHeight` + "더보기" 확장 시 내부 `ScrollArea` 가 `offsetScrollbars` 없이 렌더되어 vertical scrollbar thumb 가 right-aligned value 숫자와 겹쳤습니다 (특히 값이 3자리 이상일 때 잘려 보임)
  - 수정: `ScrollArea` 에 `offsetScrollbars` prop 추가. viewport 에 scrollbar 만큼의 padding-right 가 적용되어 숫자가 겹치지 않습니다

### Changed — Select / Combobox / VirtualSelect

- **트리거 chevron 아이콘 동적화** — 기존 정적 `expand-up-down` (이중 삼각형) → 드롭다운 상태에 따라 **`arrow-down-s` (닫힘) / `arrow-up-s` (열림)** 으로 토글. Table/DataGrid 정렬 표시용 `expand-up-down` 는 그대로 유지 (용도 다름)
- 적용 범위: `Combobox`, `RadixSelect` (searchable + non-searchable 양쪽), `RadixMultiSelect`, `VirtualSelect`

### Added — Combobox (Select 기능 패리티)

Combobox 가 Select 에 있던 모든 기능을 지원하도록 확장. 새로운 variant 와 다수의 props 추가.

#### 신규 variant

- **`variant="multi-select"`** — 태그로 펼치지 않고 **"N selected"** 컴팩트 표시. `showActions` (적용/취소 버튼 모드), `showSelectAll` (전체 선택), `canApply` 등 MultiSelect 전용 props 지원. Combobox 의 4번째 variant (기존: default / avatar / tags → default / avatar / **multi-select** / tags)

#### `ComboboxBaseProps` 신규 props

- **`clearable`** (`boolean`, default `false`) — 선택된 값이 있을 때 X 버튼 표시, 클릭 시 선택 초기화 (single → `''`, multi/tags → `[]`)
- **`loading`** (`boolean`, default `false`) — 드롭다운 내 스피너 표시 (async fetch 등)
- **`leadIcon`** (`IconTypeWithFill`) — 트리거 앞쪽 아이콘 (옵션 내 leadIcon 과 별개)
- **`minWidth`** (`string | number`) — 트리거 최소 너비
- **`searchPlaceholder`** (`string`) — 검색 중일 때 플레이스홀더 (미지정 시 `placeholder` 사용)
- **`optionGroups`** (`ComboboxOptionGroup[]`) — 그룹 라벨 + 옵션 ID 목록으로 옵션들을 섹션별로 묶어 표시. 그룹에 속하지 않은 옵션은 마지막에 ungrouped 섹션으로 렌더
- **`renderOption`** (`(option, isSelected) => ReactNode`) — 옵션 커스텀 렌더링
- **`renderValue`** (`(option) => ReactNode`) — 트리거에 선택된 값 커스텀 렌더링 (single-select)
- **`size="xs"`** — 24px 높이, 12px 텍스트 (SIZE_CONFIG 는 이미 xs 를 지원했으나 Combobox 타입에서 누락되어 있었음)

#### `ComboboxOption` 신규 필드

- **`tooltip`** (`ReactNode`) — 옵션 호버 툴팁. `disabled: true` 옵션에서도 작동하여 비활성화 사유 안내에 유용
- **`tooltipPlacement`** (`'top' | 'right' | 'bottom' | 'left'`, default `'right'`)

#### Variant 별 신규 props

- **`DefaultComboboxProps`**:
  - `defaultValue` (`string`) — 비제어 모드 초기값
  - `selectType` (`'default' | 'checkbox' | 'radio'`, default `'default'`) — 선택 표시 방식. default (check 아이콘) / checkbox / radio
- **`AvatarComboboxProps`**: `defaultValue`
- **`TagsComboboxProps`**: `defaultValue`
- **`MultiSelectComboboxProps`** (신규 variant):
  - `defaultValue`, `value[]`, `onChange`, `onCreate`
  - `maxSelections` — 최대 선택 개수 하드 캡
  - `selectedText` (`string | (count) => string`, `'{count}'` 치환) — 트리거 요약 텍스트 커스텀
  - `showSelectAll` + `selectAllLabel` — "전체 선택" 옵션 (indeterminate 상태 지원)
  - `showActions` + `applyLabel` / `cancelLabel` — 적용/취소 버튼 모드 (즉시 반영 X, 일괄 commit). Cancel 또는 apply 없이 닫으면 pending 상태 revert
  - `canApply` (`(pending, committed) => boolean`) — 적용 버튼 활성화 조건. 미지정 시 기본값은 "변경 사항이 있을 때만" (pending !== committed)

#### 비제어 모드

모든 variant (default / avatar / multi-select / tags)에서 `value` 없이 `defaultValue` 만 전달하면 Combobox 가 내부 상태를 관리합니다. `onChange` 는 여전히 호출되어 외부 리스너 사용 가능.

### Changed — Combobox

- **Stories 재편** — 기존 단일 `Combobox.stories.tsx` 를 삭제하고 `stories/` 서브폴더로 variant 별 분리:
  - `stories/ComboboxDefault.stories.tsx` — `DataEntry/Combobox/Default` (28 stories)
  - `stories/ComboboxAvatar.stories.tsx` — `DataEntry/Combobox/Avatar` (11 stories)
  - `stories/ComboboxMultiSelect.stories.tsx` — `DataEntry/Combobox/Multi-select` (15 stories)
  - `stories/ComboboxTags.stories.tsx` — `DataEntry/Combobox/Tags` (14 stories)
  - `stories/_fixtures.ts` — 공용 옵션 데이터 (fruits, users, frameworks, tech groups 등)

### Internal

- `Combobox.tsx` 에 `TooltipTrigger` import 추가 (option.tooltip 지원)
- `Combobox.tsx` 에 `Button` import 추가 (multi-select showActions 의 Apply/Cancel 버튼)
- 내부 pending/committed state 분리 — multi-select showActions 모드에서 선택 지연 반영 지원
- select-all 체크박스는 allSelected → check, someSelected → indeterminate (가로바), none → 빈 상태로 렌더

## [1.8.0] - 2026-04-22

### Added (PR #9 — Badge / Chip / Tabs / Button / Dropdown)

- **`Badge`**
  - `sm` 사이즈 센터링 수정: 자식 span의 개별 `margin-*` 및 비대칭 `padding-l/r` 제거 → 컨테이너에 `ds-gap-4` + 대칭 `padding-x-6`(sm) / `padding-x-8`(lg) 적용
  - **`white` 컬러 추가**: `var(--bg-basic-white-accent)` 배경 + `var(--text-dark-subtle)` 텍스트 + `var(--border-default)` 테두리 (raw hex 사용 X, 모두 토큰)
- **`Chip` `customIcon` prop** (`ReactNode`) — `icon` 대신 커스텀 ReactNode를 아이콘 자리에 렌더. `BrandIcon`/`FlagIcon`/외부 SVG/이미지 등 사용 가능
- **`Tabs`** — `TabsTrigger`에 `cursor-pointer` 적용 (hover 시 클릭 커서)
- **`Button` `color="black"`** — 소셜 로그인 등에 사용. 4개 테마(A-Light/Dark, B-Light/Dark)에 `--bg-basic-black-*` 토큰 고정값으로 추가 (dark 테마 반투명 값 없음 — 모든 테마 동일). 기존 `getColorOverrideVars` + `LOADING_STYLE` 패턴과 동일하게 `WHITE_INVERTED_STYLE` 맵으로 상태 분기 (하드코딩 hex → 토큰 참조)
- **`Dropdown` `DropdownMenuContent`에 `isSearch` prop** — `true` 설정 시 상단에 검색 UI 자동 렌더. `onSearch` / `searchValue` / `searchPlaceholder` props로 외부 필터링 처리. 기존 `DropdownMenuSearch` sub-component와 호환

### Design tokens (PR #9)

- `colors.css`: `--bg-basic-black-*`, `--bg-basic-white-*`, `--text-dark-*` 토큰 4개 테마 **고정값**으로 추가 (Option A — dark 테마 적응 안 함, "black"/"white" 이름대로 항상 동일)

### Fixed — `Table stickyFooter`

- **배경색 회색 톤 복원** — v1.7.1에서 sticky footer 배경을 `var(--bg-default)` (흰색)로 설정했지만, `TableFooter` 기본은 `bg-muted/50` 회색이므로 opaque 전환 시에도 회색을 유지해야 합니다. 흰색이 되면 header와 동일해져 summary 행 식별이 어려웠습니다
  - 수정: `.table-sticky-footer tfoot tr/td/th` 배경색을 `var(--bg-default)` → `var(--bg-muted)` 로 변경
- **footer 경계선 두꺼워지는 문제** — `TableFooter`는 이미 `<tfoot>`에 `border-t-default` 를 적용하는데, v1.7.1 CSS 규칙이 `tfoot > tr:first-child > td/th` 에도 `border-top: 1px solid var(--border-default)` 를 추가해 2px 로 보였습니다 (특히 스크롤 최하단에서 두드러짐)
  - 수정: 중복된 `border-top` rule 제거. `tfoot` 자체의 `border-t-default` 만 사용

## [1.7.1] - 2026-04-22

### Fixed

- **`Table stickyFooter` — 투명 배경으로 body 행이 비쳐 보이던 문제**: v1.7.0에서 `stickyFooter` 적용 시 Tailwind arbitrary variant `[&_tfoot_td]:bg-default`를 사용했으나, `bg-default`는 `src/styles/utilities.css`에 정의된 커스텀 CSS 유틸리티이지 Tailwind가 생성하는 유틸리티가 아닙니다. Tailwind arbitrary variant는 RHS가 Tailwind 유틸리티일 때만 rule을 emit하므로, 해당 클래스가 실제로 CSS에 포함되지 않아 `tfoot` 셀이 여전히 `bg-muted/50` (반투명) 상태였습니다
  - 수정: Tailwind arbitrary variant 대신 plain CSS class `.table-sticky-footer`를 `src/styles/utilities.css`에 직접 추가. `tfoot`, `tfoot tr/td/th`, `first-child > td/th`에 `sticky`/`z-index`/`background-color: var(--bg-default)`/`border-top` 적용. DS CSS 변수를 직접 참조하므로 빌드 시 올바른 rule이 emit됨 (`.table-sticky-footer tfoot { background-color: var(--bg-default) }` 실제 확인됨)

## [1.7.0] - 2026-04-22

### Added — `Table` / `DataGrid`

- **`Table` `stickyFooter` prop** — `<tfoot>`를 ScrollArea viewport 하단에 고정. `stickyHeader`와 동시 사용 가능. QA "합계 행 항상 노출" 요구사항 지원.
  - 구현 메모: `TableFooter`의 기본 스타일이 `bg-muted/50` (반투명) 이므로 sticky 시 body 행이 비쳐보입니다. 이를 방지하기 위해 `stickyFooter` 활성 시 `tfoot` 내 `tr`/`td`/`th` 셀에 `bg-default`를 강제 적용 (`[&_tfoot_td]:bg-default` 등), 첫 번째 footer 행에는 `border-top`을 추가해 헤더와 시각적 구분
- **`Table` `viewportRef` prop** — 내부 ScrollArea의 스크롤 viewport에 대한 ref. programmatic scroll 제어(특정 행으로 scroll, 상단 복귀 등)에 사용
- **`TableCell` `truncate` prop** (additive, default `false`) — 단일 라인 말줄임표. `overflow: hidden; text-overflow: ellipsis; white-space: nowrap` + `max-width: 0` 적용. 컬럼 너비가 지정된 상태에서 사용. 미지정 시 기존 wrap 동작 유지 (non-breaking)
- **`CellText` `copyValue` prop** — `copyable` 사용 시 복사 payload를 `value`가 아닌 별도 문자열로 지정. display는 truncate한 짧은 텍스트, copy는 원문 전체 같은 split 케이스용
- **`DataGrid` `footerRow` prop** (`Record<columnId, ReactNode>`) — 하단 sticky 요약/합계 행. 컬럼 너비·sticky 포지션 공유하며 viewport 하단에 고정
- **`DataGrid` `overscan` prop** (`number | { rows?: number; columns?: number }`, default `10` rows / `2` columns) — 가상화 overscan 축별 튜닝
- **`DataGrid` `virtualizationThreshold` prop** (`number | { rows?: number; columns?: number }`, default `{ rows: 100, columns: 30 }`) — 가상화 활성 임계값. 소규모 데이터셋에서 가상화 강제 테스트나, 컬럼 많은 그리드의 행 임계값 낮추기
- **`DataGrid` 수평 컬럼 가상화** — 컬럼 수가 `virtualizationThreshold.columns`를 초과하면 활성. viewport 내 컬럼만 마운트 + overscan. sticky 컬럼은 항상 렌더. `enableColumnResize`, `enableColumnReorder`, `columnSizing`과 호환. 내부 구현: `useColumnVirtualization` hook + CSS grid `gridColumn` 명시 배치
- **`DataGrid` `viewportRef` prop** — `Table`과 동일. programmatic scroll 제어용

### Internal

- `DataGridBody` — hardcoded `VIRTUALIZATION_THRESHOLD = 100`, `overscan = 10` → props로 노출
- 신규 파일: `src/components/table/components/DataGridFooter.tsx`, `src/components/table/hooks/useColumnVirtualization.ts`

## [1.6.13] - 2026-04-22

### Fixed

- **`VirtualSelect` searchable — 닫은 후 재오픈 시 검색 결과가 초기화되지 않던 문제**: 소비자가 `onSearchChange`를 전달하면 VirtualSelect는 내부 필터링을 건너뛰고 부모가 전달한 `options`을 그대로 사용합니다 (server-side filtering 패턴). 기존 close 경로는 내부 `searchQuery` 상태만 `''`로 초기화하고 `onSearchChange?.('')` 호출을 생략했기 때문에, 부모는 여전히 이전 쿼리로 필터링된 `options`을 보유하게 되어 재오픈 시 input은 비어있지만 리스트는 필터링된 상태로 보였습니다
  - 수정: `VirtualSelect.tsx` `setOpen` 의 close 분기에서 `onSearchChange?.('')`도 함께 호출 → 부모가 쿼리를 리셋하여 전체 옵션을 다시 로드. 내부 clear 버튼(line 554)이 이미 동일한 패턴(`setSearchQuery('') + onSearchChange?.('')`)을 사용하고 있었으므로 close 경로와 일관성 확보

## [1.6.12] - 2026-04-22

### Fixed

- **`MultiSelect` searchable — 선택된 항목이 검색에서 필터링되지 않던 문제**: v1.6.9 이전부터 `filteredOptions`에 `selectedSet.has(option.id) ||` 조건이 있어서, 이미 선택된 옵션은 검색 쿼리와 무관하게 항상 리스트에 표시되었습니다. 보이는 영역이 선택된 항목들로 채워져 있을 때 사용자가 타이핑해도 리스트가 변하지 않아 "검색이 동작하지 않는다"고 오인할 수 있었습니다
  - 수정: `RadixMultiSelect.tsx` `filteredOptions` 필터에서 선택 여부 조건 제거 — 선택 여부와 관계없이 label/description이 쿼리에 매치되는 항목만 표시. 선택 상태는 체크박스로 이미 시각적으로 전달되므로 필터링해도 혼란 없음
- **`Select` searchable — 긴 라벨 truncate 보강 (1.6.11 follow-up)**: cmdk의 내부 `cmdk-list-sizer` wrapper가 natural width로 확장되어 Popover trigger width 밖으로 리스트가 삐져나오는 케이스가 남아있었습니다
  - 수정: `CommandPrimitive.List`의 `cmdk-list-sizer` 자식에도 `w-full min-w-0 max-w-full`를 강제 ( `[&>[cmdk-list-sizer]]:*` 유틸리티 ), 부모 padding wrapper에도 `max-w-full` 추가

## [1.6.11] - 2026-04-22

### Fixed

- **`Select` searchable — 옵션 클릭이 동작하지 않던 문제 (1.6.10 regression)**: cmdk `CommandPrimitive.Item`은 `data-disabled` 속성을 `"true"` / `"false"` 값과 무관하게 **항상** 설정합니다. Tailwind의 `data-[disabled]:pointer-events-none` 선택자는 속성 값이 아니라 **속성 존재 여부**에만 반응하므로, 모든 아이템에 `pointer-events: none`이 적용되어 클릭이 차단되고 있었습니다
  - 수정: `data-[disabled]:*` 선택자 대신 `option.disabled ? 'pointer-events-none ...' : '...'` 조건부 className 사용
- **`Select` searchable — 긴 라벨 텍스트가 truncate되지 않던 문제**: cmdk의 내부 `List`와 `list-sizer` wrapper에 width 제약이 없어서 긴 라벨이 popover 너비를 넘어 확장되었습니다 (`--radix-popover-trigger-width`로 Content는 제한되지만 내부 sizer가 natural width로 확장)
  - 수정: `CommandPrimitive` 루트에 `w-full min-w-0 overflow-hidden`, `CommandPrimitive.List`와 padding wrapper에 `w-full min-w-0` 추가 → 각 레벨이 popover 너비로 shrink 가능하고 `TruncatedText`의 `truncate`가 정상 동작

### Notes

- Truncated label의 hover-to-tooltip은 1.6.10부터 이미 정상 동작 (각 `SearchableSelectItem`이 `<TruncatedText tooltipContent={option.label}>` 사용 — overflow 감지 시 자동 툴팁 표시). 옵션별 커스텀 tooltip은 `option.tooltip` prop으로 제공 가능

## [1.6.10] - 2026-04-22

### Fixed

- **`Select` searchable — 한글 IME 포커스 탈취 근본 해결 (아키텍처 재구성)**: 기존에는 Radix Select 기반으로 구현되어 있었는데, Radix Select의 `focusSelectedItem` useEffect가 drop open 후 ~29ms 뒤에 선택된 Item으로 DOM 포커스를 이동시키며 한글 IME 조합 세션을 파괴하던 문제가 있었습니다. 어떤 bounce-back / redirect 방식으로도 해결 불가능 — 포커스가 input을 떠나는 순간 브라우저가 `compositionend`를 발생시켜 조합이 중단되기 때문. 근본적으로 해결하기 위해 **searchable mode만** Popover + cmdk(Command primitive) 아키텍처로 재구성했습니다
  - **DOM 포커스는 항상 input에 유지** — cmdk는 roving focus 대신 `aria-selected`로 하이라이트 관리 (MUI Autocomplete, Ant Design Select와 같은 패턴)
  - **키보드 네비게이션 그대로** — ArrowDown/ArrowUp은 하이라이트만 이동 (input은 포커스 유지), Enter로 선택, Escape로 닫기
  - **공용 API 변경 없음** — `options`, `optionGroups`, `renderOption`, `renderValue`, `variant`, `clearable`, `loading`, `tooltip`, `selectType='checkbox'/'radio'` 등 모든 기존 기능 동일하게 동작
  - **Non-searchable Select는 완전히 기존 그대로** — Radix Select 기반 유지, visual regression 없음
  - 내부적으로 신규 `SearchableSelectItem` 컴포넌트(cmdk `CommandPrimitive.Item` 기반) 추가 — `ExtendedSelectItem`의 모든 시각적 기능(checkbox/radio/check indicator, avatar, icon, description, badge, tooltip) 보존
  - Dialog portal integration(`PortalContainerContext`) 유지
  - `onOpenAutoFocus={(e) => { e.preventDefault(); inputRef.current?.focus(); }}` — 팝업 열림 시 input이 즉시 포커스를 받아 Radix의 focus-trap 개입 여지 차단

### Notes

- Radix Select 2.2.6는 `Select.Content`에 `onOpenAutoFocus` prop을 제공하지 않고(`onCloseAutoFocus`만 있음) 내부 `focusSelectedItem` 로직이 항상 실행됩니다. 소비자가 이를 override할 수 있는 방법이 없어 searchable 기능은 구조적으로 다른 primitive(Popover+cmdk)로 재구성하는 것이 유일한 해결책이었습니다
- MultiSelect / VirtualSelect(Combobox)는 이미 각자 구조가 달라(MultiSelect는 Popover, VirtualSelect는 Popover+cmdk) 영향 없음

## [1.6.9] - 2026-04-22

### Added

- **`Select` searchable — `선택됨` pinned section**: 검색어가 현재 선택된 옵션의 label/description과 매치되지 않을 때 해당 옵션을 드롭다운 상단의 `선택됨` 그룹에 divider와 함께 고정 표시합니다. 사용자가 검색 중에도 "현재 선택한 옵션"을 잃어버리지 않고 인지할 수 있게 합니다
  - MultiSelect / Combobox는 체크박스(또는 trigger의 `N개 선택됨`)가 이미 선택 상태를 전달하므로 pinned section을 적용하지 않음 — 많은 항목 선택 시 드롭다운이 비대해지는 문제 회피
- **`TabsList` — `size` prop이 모든 variant에 적용**: 기존에는 `size`가 `variant="underline"`에만 반영되고 `segmented`/`pill`은 항상 hardcoded (height-28). 이제 세 variant 모두 `sm`/`lg` 지원
  - Segmented/Pill `size="lg"`: `height-40 padding-x-12 padding-y-8 ds-gap-6` + 본문 `size-md line-height-leading-6` + icon 16px
  - Segmented/Pill `size="sm"` (default): 기존과 동일 — visual regression 없음
  - `TabsListProps.size` JSDoc 업데이트: "탭 크기 (underline 변형에만 적용)" → "탭 크기 (모든 variant에 적용)"

### Fixed

- **`Select` / `MultiSelect` / `VirtualSelect` searchable — 선택된 옵션이 필터에서 사라지던 문제 (한글 IME 포커스 탈취 근본 원인)**: `searchable` 필터가 현재 선택된 옵션(`option.id === value` 또는 `selectedValues.includes(option.id)`)을 label/description 매치 여부와 상관없이 항상 포함하도록 수정. 기존에는 `전체` 같은 sentinel 옵션이 선택된 상태에서 한글을 타이핑하면 해당 Item이 unmount → Radix roving focus가 남은 Item으로 이동 → IME 조합 중단으로 첫 음절만 입력되던 문제의 근본 원인이었습니다
  - Combobox는 default filter branch에만 적용 (consumer-supplied `filterFunction`은 소비자가 authority)
  - MultiSelect는 pending + committed 값 모두 보존 (action buttons 편집 중에도 정상)
- **`MultiSelect` searchable — 검색 입력창에서 스페이스바가 동작하지 않던 문제**: MultiSelect의 outer wrapper `handleKeyDown`이 popover open 상태에서 스페이스바를 intercept해서 focused Item을 toggle하는데, 검색 input에 `onKeyDown` 가드가 없어 스페이스가 parent로 bubble → `preventDefault` → input이 공백을 받지 못하던 문제. RadixSelect와 동일하게 non-nav 키에 대해 `stopPropagation()` 추가. 이제 스페이스가 검색어에 정상 입력됩니다

## [1.6.8] - 2026-04-22

### Fixed

- **`Select` / `MultiSelect` searchable — 1.6.7 IME 수정 후 첫 글자만 입력되고 포커스가 이탈하는 regression**: 1.6.7에서 제거한 `onChange`의 `setTimeout(() => input.focus(), 0)`가 실은 두 가지 역할을 겸하고 있었습니다 — (1) IME 조합 세션 중단(버그), (2) Radix Select Content의 item focus-trap이 키스트로크마다 빼앗는 포커스를 되돌려주기(기능). (1)을 제거하자 (2)가 깨지면서 한 글자 입력 후 포커스가 Item으로 이동, 이후 입력이 불가능했습니다
  - **수정 방식**: `onCompositionStart` / `onCompositionEnd`로 조합 상태를 `isComposingRef`에 추적하고, `onChange`에서 `isComposingRef.current === false`일 때만 refocus `setTimeout` 실행
  - 한글 조합 중에는 refocus를 건너뛰어 IME 조합이 깨지지 않고, 조합 종료 후(또는 영어 등 non-IME)에는 refocus로 focus-trap regression 방지
  - 영향: `RadixSelect.tsx`, `RadixMultiSelect.tsx` — `VirtualSelect`(Combobox)는 cmdk 기반으로 영향 없음

## [1.6.7] - 2026-04-22

### Added

- **`DialogContent` — `container?: HTMLElement | null` prop**: 다이얼로그(overlay+content)를 `document.body`가 아닌 특정 DOM 서브트리에 portal로 마운트할 수 있는 escape hatch. 오른쪽 패널 등 특정 영역 내부로 다이얼로그를 시각적으로 스코프하고 싶을 때 사용합니다
  - 미지정 시 기존 동작(document.body)과 동일 — additive, non-breaking
  - 내부적으로 `DialogPortal container={...}`에 그대로 전달 (Radix pass-through)
  - 소비자는 타겟 엘리먼트의 CSS(position/overflow)를 직접 관리해야 합니다 — DS는 portal 위치만 결정

### Fixed

- **`Select` / `MultiSelect` searchable — 한글 IME 첫 글자 손실**: `searchable` 모드 검색 입력에서 `onChange` 핸들러마다 `setTimeout(() => input.focus(), 0)`로 강제 refocus하던 동작이 한글(일본어 가나/중국어 병음 등 IME 기반 언어 공통)의 활성 조합 세션을 중단시켜 `compositionend`가 조기 발생, 진행 중이던 음절이 폐기되는 문제 수정. onChange의 refocus를 제거 (`autoFocus`로 이미 초기 포커스가 보장되며, 입력 중 포커스를 뺏는 요소가 없어 불필요)
  - 영향: 모든 `<Select searchable>`, `<MultiSelect searchable>` — 한글 입력 시 첫 음절부터 필터가 정상 동작
  - Clear 버튼(X)의 refocus는 유지 — 버튼 클릭이 실제로 포커스를 이동시키므로 복귀가 필요 (조합 중이 아닌 상황)
- **`BarList` — `maxHeight` prop이 `expanded` 상태에서만 적용되던 버그**: `showCount`보다 데이터가 적거나 같아서 "더보기" 버튼이 노출되지 않는 경우(`WithMaxHeight` 스토리: `showCount={10}` + 10 items) `expanded`가 끝까지 `false`라 `maxHeight`가 무시되던 문제. 이제 `maxHeight`가 설정되면 상태와 무관하게 항상 적용됩니다
- **`BarList` — 네이티브 스크롤바 대신 DS `ScrollArea` 사용**: 기존에는 `overflowY: 'auto'`로 브라우저 기본 스크롤바가 그대로 노출돼 DS 스타일과 이질적이었습니다. 이제 `maxHeight` 설정 시 DS `ScrollArea`로 래핑되며 `type="always"`로 스크롤바가 항상 표시됩니다

### Notes

- Dialog `container` 사용 예:
  ```tsx
  const [targetEl, setTargetEl] = useState<HTMLElement | null>(null);
  useEffect(() => { setTargetEl(document.querySelector('.ticket-detail') as HTMLElement); }, []);
  <Dialog open={open} onOpenChange={setOpen}>
    <DialogContent container={targetEl ?? undefined}>...</DialogContent>
  </Dialog>
  ```

## [1.6.6] - 2026-04-21

### Added

- **basic color `-wash` tier (emerald/blue/purple)**: `-subtle`보다 한 단계 옅은 새 tier 추가. 라이트 테마에서는 거의 흰색에 가까운 파스텔 wash, 다크 테마에서는 near-black에 hue 힌트가 들어간 배경으로 자동 전환되어 파스텔 그라디언트 데코레이션의 dark-mode readability 이슈를 해소합니다
  - 4개 테마 전체 커버: `:root`, `[data-theme="dark"]`, `[data-theme="theme-b-light"]`, `[data-theme="theme-b-dark"]`
  - CSS 변수: `--bg-basic-{emerald,blue,purple}-wash`
  - Tailwind 유틸: `bg-basic-emerald-wash`, `bg-basic-blue-wash`, `bg-basic-purple-wash`
  - 라이트 값: `#f5fefb` / `#f6f9ff` / `#f7f5ff` (near-white with hue hint)
  - 다크 값: `#122e24` / `#141e3c` / `#22123a` (near-black with hue hint)
- **`ux-guideline/foundations/color.md` §7 업데이트**: basic color tier 구조 표 + 파스텔 wash/그라디언트 데코레이션 판단 플로우 추가

### Notes

- 현재 3개 hue(emerald/blue/purple)만 제공 — 추가 hue 필요 시 별도 요청
- 다크 값은 엔지니어링 판단으로 제공된 초안 — 필요 시 디자이너 검토 후 micro-adjust 가능

## [1.6.5] - 2026-04-21

### Added

- **`TooltipTrigger` — `escapePortalContext?: boolean` prop**: Dialog 안에서 Tooltip 사용 시 발생하는 레이아웃 왜곡(asymmetric padding, 멀티라인 dead space 등)을 피하기 위한 escape hatch. `true`로 지정하면:
  - `PortalContainerContext` 및 `container` prop을 무시하고 `document.body`로 강제 portal
  - `zIndex` 미지정 시 `10001` 자동 적용 (DS Dialog z-10000 위에 겹침)
  - 기존 동작 불변 (default `false`) — opt-in

### Notes

- 근본 원인(Dialog의 `PortalContainerProvider`가 DialogContent의 grid/padding/gap 컨텍스트를 portal 타겟으로 사용)은 Tooltip/Select/Popover 등 모든 floating 컴포넌트에 잠재적 영향. 이번 PR은 Tooltip만 targeted fix — Select/Popover는 현재 동일 사용 패턴에서 문제 보고 없음. 추후 Dialog-side neutral wrapper로 범용 해결하는 것은 별도 PR 범위
- Storybook: `DataDisplay/Tooltip/TooltipTrigger` → `InsideDialog` 스토리에서 기본 vs `escapePortalContext` 비교 가능

## [1.6.4] - 2026-04-21

### Fixed

- **DatePicker / DateRangePicker / MonthPicker / MonthRangePicker — typed input의 `minDate`/`maxDate` 검증 누락**: 기존에는 `minDate`/`maxDate`가 캘린더 팝업에만 적용되고 직접 키보드 입력(MM/DD/YYYY 세그먼트)에는 적용되지 않아, 예컨대 `maxDate={new Date()}`로 미래 조회를 막은 경우에도 사용자가 미래 날짜를 타이핑하면 `onChange`에 그대로 전달됐습니다. 이제 4개 picker 모두 typed input 경로에서도 경계를 강제합니다.
  - **동작**: 경계 밖 값이 완성되면 `onChange` 호출 없이 input이 error state(붉은 border)로 표시되고, 포커스가 완전히 이탈하면 segment display가 이전 유효 `value`로 자동 복구됩니다
  - **Range picker**: from/to 각 side 독립 검증 — 한쪽만 완성되고 경계 밖이어도 즉시 거부
  - **MonthPicker/MonthRangePicker**: 경계 비교는 월 단위로 정규화(`minDate`/`maxDate`에 일 단위가 포함돼도 같은 월은 모두 in-bounds)

### Added

- **`DateInput` / `DateRangeInput` — `minDate`/`maxDate` props**: 내부 Input 컴포넌트도 경계 검증을 받도록 prop 추가 (상위 Picker에서 자동 전달됨)
- **`useSegmentInput` 훅 — `externalInvalid?: boolean` 옵션**: picker-level 검증 결과를 훅의 `hasInvalidDate`와 OR 합성
- **`src/components/calendar/utils/bounds.ts`** 공용 유틸: `isOutOfBounds`, `isOutOfBoundsMonth` 순수 함수
- **Storybook**: `DatePicker` / `DateRangePicker` / `MonthPicker` / `MonthRangePicker` 에 각 `MinMaxTypedInputValidation` 스토리 추가
- **유닛 테스트**: `bounds.test.ts` (11 cases), `useSegmentInput.test.ts` (전체 스위트 — 19 cases)

### Changed

- **`TooltipTrigger` — `content`로 `AdvancedTooltip`을 직접 전달 시 이중 wrapper(중첩 카드) 방지**: 기존에는 `content.type === Tooltip`만 검사하여 `AdvancedTooltip`을 넘기면 외부 `<Tooltip>`으로 한 번 더 감싸 두 개의 카드(bg-card + shadow-modal-sm + rounded-card-xs)가 중첩 렌더링됨. 이제 `Tooltip` 또는 `AdvancedTooltip` 둘 다 감지하여 단일 wrapper만 렌더
- **`Select` trigger — `ds-gap-0` → Button과 동일한 `ds-gap-4`/`ds-gap-6` 으로 통일**: `leadIcon`/`tailIcon`이 placeholder/value 텍스트에 붙어 보이는 시각 이슈 해결. DS 내 Button(`ds-gap-4`/`6`) 정합성 확보
  - xs: `ds-gap-0` → `ds-gap-4`
  - sm: `ds-gap-0` → `ds-gap-4`
  - lg: `ds-gap-0` → `ds-gap-6`
  - 소폭 Visual change: leadIcon/tailIcon 없는 Select도 value↔chevron 간격이 4-6px 넓어짐 (기존 ellipsis truncation 동작은 그대로)

### Notes

- **staging(showActions) 플로우는 이번 PR에서 변경하지 않음**: typed input은 기존과 동일하게 `showActions=true`일 때도 staging을 우회하여 즉시 `onChange`를 호출합니다. 이 문제는 별도 논의 대상
- **성능 주의**: `minDate`/`maxDate`를 inline `new Date()`로 전달하면 렌더마다 새 참조가 생성되어 내부 callback identity가 갱신됩니다. 성능이 민감한 컨텍스트에서는 `useMemo`로 안정화 권장

## [1.6.3] - 2026-04-21

### Changed

- **`INPUT_CONTAINER_BASE`에 `max-w-full` 추가 (방어적 폭 clamp)**: `InputWrapper` 루트(수평/수직 라벨 모두 적용) 컨테이너가 flex 부모의 할당된 너비를 초과해 렌더링되지 않도록 `max-width: 100%`를 상시 적용
  - 배경: password variant 등 `flex-shrink: 0` 인 trailing adornment(eye 토글 버튼)가 포함된 Input 두 개를 `justify-content: space-between; width: 100%` flex row에 나란히 배치한 경우, Windows Chromium 환경에서 intrinsic content-size가 할당된 flex slot을 미세하게 초과하여 Dialog 위치가 우측으로 밀리는 현상이 보고됨. `min-w-0`만으로는 borderline 케이스에서 flex 알고리즘이 content-based size를 선호할 수 있어 보완 필요
  - `max-width: 100%`는 요소가 부모 content-box를 초과할 때만 동작 — 일반적인 Input 렌더링에는 영향 없음
  - 동작 변경 가능성: 소비자가 `width="Npx"` 로 부모 컨테이너보다 큰 값을 지정한 경우 기존에는 오버플로우 렌더링되던 것이 부모 너비로 clamp됨. 필요시 해당 인스턴스에 `className="max-w-none"` 로 opt-out 가능 (breaking 아님 — 기존에도 오버플로우는 의도치 않은 동작으로 간주)
  - Bootstrap `.form-control`, Tailwind Forms plugin 등에서 동일한 방어 패턴 적용 중

## [1.6.2] - 2026-04-20

### Added

- **Input `lead-dropdown` / `tail-dropdown` — clickable button icon**: 단일 Input으로 "dropdown + 키워드 + 검색(magnifier) 버튼 클릭" 패턴 표현 가능
  - `lead-dropdown` 에 `buttonTailIcon?: IconTypeWithFill` + `onButtonClick?: () => void` + `buttonDisabled?: boolean` 추가 (오른쪽에 클릭 가능한 아이콘 버튼)
  - `tail-dropdown` 에 `buttonLeadIcon?: IconTypeWithFill` + `onButtonClick?` + `buttonDisabled?` 추가 (왼쪽에 클릭 가능한 아이콘 버튼)
  - 우선순위: `buttonTailIcon`/`buttonLeadIcon` 지정 시 장식용 `tailIcon`/`leadIcon` 및 `onClear` clear 버튼은 숨겨짐
  - 기존 `tailIcon`/`leadIcon` 단독 사용 동작 변경 없음
- **Storybook:** `DropdownInput` 에 `LeadDropdownWithTailButton` + `TailDropdownWithLeadButton` 스토리 추가

## [1.6.1] - 2026-04-20

### Added

- **DatePicker / DateRangePicker / MonthPicker / MonthRangePicker — `defaultMonth?: Date` prop**: `value`가 없을 때 팝오버가 처음 열릴 때 포커스할 월을 지정합니다
  - `value` 있으면 `value`(또는 `value.from`) 우선 — 기존 동작 변경 없음
  - 주 용도: 과거 데이터 조회 필터 UX. `maxDate={new Date()}` + `defaultMonth={startOfMonth(subMonths(new Date(), 1))}` 조합으로 DateRangePicker 기본 2패널이 "지난달/이번달"로 열려 두 패널 모두 선택 가능 (기존에는 "이번달/다음달"이어서 다음달이 전부 비활성)
  - react-day-picker의 기존 `defaultMonth` prop을 그대로 forward — 내부 로직 추가 없음
- **Storybook:** 4개 피커 각각 `DefaultMonth` 스토리 추가 (DateRangePicker는 `DefaultMonthForPastFilter`)

## [1.6.0] - 2026-04-20

### Added

- **MonthPicker / MonthRangePicker — `showActions` prop** (commit-on-apply semantics): `true`일 때 팝오버 하단에 적용/취소 버튼이 표시되며 `onChange`는 "적용" 클릭 시에만 발생. 취소 / 외부 클릭 / ESC로 닫으면 드래프트가 폐기되고 `onChange`는 발생하지 않음
  - TimePicker / TimeRangePicker / DatePicker / DateRangePicker은 이전 버전부터 동일한 `showActions` prop 지원. v1.6.0에서 나머지 두 월 선택 컴포넌트에도 동일 API 추가로 6개 피커 전체가 commit-on-apply 시맨틱 제공
  - MonthRangePicker의 경우, 중간 선택(from만 고른 상태)에서 취소하면 선택 상태도 함께 초기화됨
- **DatePicker / DateRangePicker / MonthPicker / MonthRangePicker — 외부 트리거 + 제어 오픈 상태 API**: 소비자가 자체 트리거(`<Button>` 등)를 제공하고 팝오버 오픈 상태를 외부에서 제어할 수 있습니다
  - `open?: boolean` — 제어 모드 팝오버 오픈 상태
  - `onOpenChange?: (open: boolean) => void` — 오픈 상태 변경 콜백. 모든 닫기 경로(Apply/Cancel/외부 클릭/ESC/자동 닫기)에서 호출됨
  - `trigger?: ReactElement` — 소비자가 제공하는 트리거 엘리먼트. Radix `Slot`으로 ref + onClick 병합. 전달 시 DS의 기본 입력 필드 + `InputWrapper`는 렌더링되지 않음 (`label`, `supportText`, `caption`, `error`, `success`, `width`, `className`, `pickerOnly` 무시)
  - `open`만 전달하고 `onOpenChange`를 전달하지 않으면 개발 모드에서 `console.warn` 발생 (팝오버가 닫히지 않는 문제 조기 감지)
  - 사용 예: 소비 프로젝트가 자체 디자인 시스템의 Button 스타일을 유지하면서 DatePicker를 팝오버로만 사용하는 경우 (e.g. `FlowDatePicker` 마이그레이션 패턴)
  - 새 내부 훅 `useControllableOpen` 추가 (controlled/uncontrolled 상태 병합 + 안정적인 setter identity + 개발 경고)

## [1.5.2] - 2026-04-20

### Added

- **`DialogScrollArea` — `viewportRef` / `onScrollPositionChange` prop forwarding**: 기존에는 내부 `ScrollArea`의 스크롤 관련 API가 `DialogScrollArea`에서 차단되어 programmatic scroll 제어나 스크롤 위치 감지가 불가능했음
  - `viewportRef?: Ref<HTMLDivElement>` — 스크롤 뷰포트 엘리먼트 ref (예: `viewportRef.current?.scrollTo({ top: 0 })`)
  - `onScrollPositionChange?: ({ x, y }) => void` — rAF 쓰로틀링된 스크롤 위치 콜백
  - 두 prop 모두 underlying `<ScrollArea>`로 그대로 전달됨. 기존 `maxHeight`, `className` 동작 변경 없음

## [1.5.1] - 2026-04-20

### Fixed

- **Transform utility 이중 적용 해결 (Tailwind v3 소비자 호환성)**: DS가 Tailwind v4로 빌드될 때 방출하던 `rotate-*`, `translate-*`, `scale-*`, `skew-*`, `transform*` 유틸리티 클래스가 소비 프로젝트의 Tailwind v3 같은 이름 유틸리티와 충돌하던 문제 수정. v4는 `rotate:`, `translate:` 등 개별 CSS 속성을 사용하고 v3는 `transform:` 합성을 사용하는데, 둘이 서로 다른 CSS 속성이라 브라우저가 두 효과를 합성하여 `rotate-180`이 360도로 돌거나 `-translate-x-1/2`가 -100% 이동하던 증상
- 해결: 빌드 후처리 스크립트(`scripts/prefix-transform-classes.mjs`)가 `dist/index.css`의 해당 선택자와 `dist/**/*.mjs`의 className 문자열을 `ds-` 접두사 버전(`ds-rotate-180`, `-ds-translate-x-1/2`, `hover:ds-scale-110` 등)으로 리네임. 소비자는 설정 변경 없이 자동 해결됨
- 범위: transform 계열만. 그 외 유틸리티(`rounded-lg`, `bg-*`, `flex` 등)는 v3/v4가 같은 CSS 속성을 설정하므로 cascade로 해결되어 기능적 버그 없음. 근본적 격리는 `src/future-plans/tailwind-isolation-v2.md` 참고 (v2.0 계획)

## [1.5.0] - 2026-04-20

### Added

- **Table/DataGrid `fontSize` prop**: `'xs' | 'sm' | 'md'` 옵션 추가. 셀 / 헤더 / `Cell*` 프리미티브(`CellText`, `CellAvatar`, `CellDate`, `CellDateRange`, `CellIcon`, `CellProgress`, `CellLink`) 전체에 내부 Context로 전파
  - `xs`: 12px 텍스트 / 행 32px (이전 동작)
  - `sm`: 14px 텍스트 / 행 36px (신규 기본값)
  - `md`: 16px 텍스트 / 행 40px
  - 명시적 `rowHeight` / `headerHeight` (혹은 `TableHead/TableCell`의 `style.height`)는 여전히 `fontSize` 기본 높이보다 우선
- **`TableFontSize` 타입 export**: Table/DataGrid 모두에서 재수출

### Changed (BREAKING)

- **Table/DataGrid 기본 폰트 크기 변경**: `size-xs` (12px) → `size-sm` (14px)
- **Table/DataGrid 기본 행 높이 변경**: `32px` → `36px` (헤더/데이터 행 모두)
- **`Cell*` 프리미티브 기본 폰트**: Table/DataGrid 외부에서 단독 사용 시에도 기본값이 `sm`으로 이동
- 마이그레이션: 이전 외관 유지가 필요하면 `fontSize="xs"`를 루트에 전달. 자세한 내용은 MIGRATION.md 참고

## [1.4.14] - 2026-04-18

### Changed

- **Shadow 토큰 시스템 통합**: `shadow-component-default`와 `shadow-components-default`를 하나의 `shadow-components-default`로 통합. 기존 border + box-shadow 이중 적용 방식을 단일 box-shadow(`inset border + outer shadow + inset bottom line`)로 변경
- **`shadow-card` 토큰 조정**: outer shadow 강도 완화(`0.05 → 0.025`), inset bottom line 강화(`0.1 → 0.15`)하여 더 자연스러운 카드 입체감
- **`shadow-components-button` 신규 토큰**: Button secondary 전용 shadow 분리
- **`shadow-components-default-destructive` 신규 토큰**: destructive 상태 컴포넌트용 shadow 토큰 추가 (`border-destructive` 사용)

### Fixed

- **ButtonGroup 자식 key 경고**: `renderBadge`, `renderIcon` 함수에서 반환하는 요소에 key가 없어 React 경고가 발생하던 문제 수정. 불필요한 wrapper `<span>` 제거 및 key를 직접 전달
- **ButtonGroup shadow 하드코딩 제거**: 인라인 shadow 값을 `shadow-components-button` 토큰으로 교체

## [1.4.13] - 2026-04-16

### Added

- **PortalContainerProvider 서브경로 export**: `@blumnai-studio/blumnai-design-system/portal-container`로 직접 import 가능. 기존에는 barrel import만 가능하여 ESLint 서브경로 규칙 위반 우회 필요했음

## [1.4.12] - 2026-04-16

### Fixed

- **Dropdown 테두리 Popover 스펙 통일**: Dropdown 메뉴에 `border-default`(CSS 테두리)와 `shadow-modal-sm`(shadow 테두리)가 이중 적용되던 문제 수정. `border-default` 제거하여 Popover와 동일한 스타일로 통일
- **Input/Textarea/Select shadow 스타일 통일**: `shadow-component-default`(inset box-shadow) → `shadow-components-default`로 변경하여 Button secondary와 동일한 하단 라인 이펙트 적용
- **Pill 버튼 shadow 하단 라인 삐져나옴**: `shadow-components-default`의 `::after` 가상 요소가 pill(`rounded-full`) 버튼의 곡선 경계를 넘어 표시되던 문제 수정. `::after` 방식을 `inset box-shadow`로 변경하여 모든 border-radius에서 자연스럽게 클리핑
- **DataGrid 셀 내 Input 포커스 링 잘림**: 셀 내부 `truncate`(`overflow: hidden`)가 Input/Switch 등의 포커스 링을 잘라내던 문제 수정. `overflow: clip` + `overflowClipMargin: 4px`로 변경하여 텍스트 말줄임은 유지하면서 포커스 링 표시

## [1.4.10] - 2026-04-16

### Fixed

- **BarList 라벨 말줄임 처리**: `labelWidth`보다 긴 라벨이 여러 줄로 줄바꿈되던 문제 수정. `truncate`로 말줄임 처리하고, 호버 시 툴팁으로 전체 텍스트 표시
- **BarList 바 호버 툴팁 추가**: 바 호버 시 차트 스타일 툴팁(색상 인디케이터 + 항목명 + 값) 표시. LineChart 등 다른 차트 컴포넌트와 동일한 UX 제공
- **scrollbar-thin 스크롤바 색상 수정**: `scrollbar-color`(Firefox 표준)가 `var(--text-muted)` 100% 불투명도로 설정되어 스크롤바가 너무 어둡던 문제 수정. webkit thumb과 동일하게 `color-mix(20%)` 적용. MultiSelect, Select, Dropdown, Menubar, ContextMenu, Textarea 등 모든 `scrollbar-thin` 사용 컴포넌트에 일괄 적용

## [1.4.8] - 2026-04-16

### Fixed

- **ScrollArea 스크롤바 색상 통일**: ScrollArea 썸 색상을 `bg-border`(불투명)에서 `color-mix(text-muted 20%)`로 변경하여 `scrollbar-thin`과 동일한 스타일 적용. 호버 시 35%로 밝아짐
- **Menubar/ContextMenu/Dropdown 스크롤바**: `scrollbar-thin` 클래스 추가하여 네이티브 스크롤바 대신 DS 스타일 스크롤바 적용

## [1.4.7] - 2026-04-16

### Added

- **Switch `thumbIcon` prop**: 썸(토글 핸들) 내부에 아이콘 표시. `ReactNode` 또는 `(checked: boolean) => ReactNode` 함수로 상태별 아이콘 지원
- **Switch `trackWidth` prop**: 라벨 트랙 너비를 px 단위로 커스텀 설정. 썸 위치와 라벨 영역이 자동 계산
- **Switch 색상 확장**: 7색 → 18색 (gray, amber, yellow, lime, emerald, teal, sky, indigo, purple, fuchsia, rose 추가). 전체 Tailwind 크로매틱 팔레트 지원
- **FileUploadArea `compact` prop**: 가로 레이아웃 + 축소된 패딩/아이콘으로 높이를 줄인 컴팩트 모드

### Fixed

- **Switch 라벨 모드 위치 계산 리팩토링**: 하드코딩된 translate/labelWidth 값 제거. `trackWidth`, `thumbSize`, `thumbOffset` 3개 값에서 모든 위치를 동적 계산 (inline style 사용)
- **DataGrid 셀 포커스 링 잘림 (v2)**: `overflow-clip` → `overflow-visible`로 변경. 내부 `truncate` 래퍼가 텍스트 오버플로를 처리하므로 셀 레벨 overflow 제약 불필요
- **FileUploadArea 다크모드 배경색**: `bg-default` → `bg-input`으로 변경하여 Input 컴포넌트와 다크모드 배경색 일치

## [1.4.6] - 2026-04-15

### Fixed

- **Input lead-dropdown 옵션 폰트 크기**: 드롭다운 메뉴 옵션 텍스트가 입력 필드 크기와 무관하게 항상 `size-sm`(14px)으로 표시되던 문제 수정. 이제 `xs`→`size-xs`, `sm`/`lg`→`size-sm`으로 입력 필드 텍스트 크기와 일치
- **Switch OFF 텍스트 간격 및 정렬**: `sm` 사이즈에서 "OFF" 텍스트가 비좁고 약 2px 아래로 치우치던 문제 수정. 라벨 트랙 너비 40→44px 확장, 텍스트 수직 정렬 보정 (`marginTop: -1`)
- **DataGrid 셀 포커스 링 잘림**: 셀의 `overflow-hidden`이 Input, Switch 등 인터랙티브 요소의 포커스 링(box-shadow)을 잘라내던 문제 수정. `overflow-clip` + `overflowClipMargin: 3px`로 변경
- **HtmlEditor 포커스 시 파란 테두리**: ProseMirror 에디터 포커스 시 파란 outline/border가 표시되던 문제 수정. `.tiptap`, `[contenteditable]` 셀렉터 추가 및 `!important`로 소비자 전역 스타일 우선순위 확보

## [1.4.5] - 2026-04-15

### Fixed

- **Button secondary 로딩 스피너 검은 원**: Spinner SVG `<circle>`에 `fill="none"` 누락 → secondary 등 밝은 배경 버튼에서 로딩 시 검은 원이 표시되던 버그 수정

## [1.4.4] - 2026-04-15

### Added

- **Checkbox `captionPosition` prop**: `'bottom'`(기본) 또는 `'right'` — 캡션을 라벨 오른쪽에 인라인으로 표시. `InlineFieldWrapper`에도 동일 prop 추가되어 Switch, Radio 등에서도 사용 가능

### Fixed

- **DataGrid `minmax()` 컬럼 ellipsis 미작동**: `minmax()` 너비 사용 시 셀 텍스트가 줄바꿈되던 버그 수정. 셀 내부에 truncate 래퍼 추가 + inline `minWidth: 0`으로 CSS Grid 축소 보장
- **HtmlEditor ProseMirror 포커스 링**: 에디터 영역 클릭/포커스 시 브라우저 기본 outline/box-shadow 표시되던 문제 수정
- **HtmlEditor 빈 영역 클릭 시 포커스**: 에디터 콘텐츠 영역의 빈 공간 클릭 시에도 에디터에 포커스 적용

## [1.4.2] - 2026-04-15

### Added

- **TimePicker/TimeRangePicker `pickerOnly` prop**: `pickerOnly={true}` 시 입력 세그먼트 비활성화, 클릭 시 패널 열림 (DatePicker의 `pickerOnly`와 동일 패턴)
- **TimePicker/TimeRangePicker `hideClockIcon` prop**: 시계 아이콘 숨기기
- **TimePicker/TimeRangePicker 기본 너비**: minWidth 자동 적용 (TimePicker: 105px/85px, TimeRangePicker: 190px/170px — 아이콘 유무에 따라)
- **Icon `disabled` prop**: `disabled={true}` 시 onClick 무시, cursor: not-allowed 적용
- **Icon 자동 cursor: pointer**: `onClick` 전달 시 자동으로 cursor: pointer 적용
- **Chart `UNSTYLED_CHART_MARGIN`**: `variant="unstyled"` 시 더 타이트한 기본 마진 적용

### Fixed

- **pickerOnly 더블 파이어 버그**: TimePicker, TimeRangePicker, MonthPicker, MonthRangePicker, DatePicker, DateRangePicker — pickerOnly 모드에서 클릭 시 패널이 열렸다 즉시 닫히던 버그 수정 (onFocus + onClick 이중 토글)
- **Calendar/Time 아이콘 cursor: pointer 누락**: DateInput, DateRangeInput, MonthInput, MonthRangeInput, TimeInput, TimeRangeInput — 아이콘 버튼에 cursor: pointer 추가
- **Chart 포커스 링**: 마우스 클릭 시 Recharts SVG에 표시되던 브라우저 포커스 링 제거 (`:focus:not(:focus-visible)` 적용). 키보드 접근성은 유지
- **Chart 기본 마진 최적화**: `{ top: 20, right: 25, bottom: 10, left: 0 }` — 좌측은 Recharts 자동 계산에 위임, 불필요한 60px 좌측 마진 제거
- **Chart Y축 상단 레이블 잘림**: YAxis `padding={{ top: 15 }}` + domain 5% 여유 적용
- **Chart 범례 우측 배치 시 간격**: `ChartWithLegend` gap 4px → 16px
- **IconWrapper cursor 오버라이드**: cursor prop이 undefined일 때 style의 cursor를 덮어쓰던 버그 수정

## [1.4.1] - 2026-04-13

### Fixed

- **DonutChart 반원(isHalf) 중앙 라벨 위치**: 라벨이 도넛 아크 위/겹쳐 표시되던 버그 수정. 기존 수식 `(outerR + innerR) / 2`는 링 두께의 중간점(아크 안)을 계산 → `svgHeight - innerRadius * 0.4`로 변경하여 도넛 구멍 내부에 정확히 배치
- **DonutChart `halfPadding` 불필요한 여백**: `legendPosition='right'`일 때도 하단 범례용 80px 패딩이 적용되던 문제 수정. 우측 범례 시 20px로 축소
- **DonutChart `footnote` 위치**: 범례가 우측일 때 footnote가 차트+범례 전체 아래에 표시되던 문제 수정. `ChartWithLegend`에 `footer` prop 추가하여 범례 컬럼 하단에 배치

## [1.4.0] - 2026-04-13

### Added

- **`HtmlEditor` 컴포넌트** (신규): Tiptap 기반 WYSIWYG HTML 에디터. `react-draft-wysiwyg` 대체용
  - **텍스트 서식**: Bold, Italic, Underline, Strikethrough
  - **블록 타입**: 표준, 제목1-6, 인용, Code (드롭다운)
  - **목록**: 순서 없는 목록, 순서 있는 목록
  - **텍스트 정렬**: 왼쪽, 가운데, 오른쪽, 양쪽 정렬 (`compactToolbar` 시 드롭다운으로 축소)
  - **컬러 피커**: 글꼴색 / 배경색 탭 (28색 기본 팔레트, 커스텀 가능)
  - **링크**: 링크 제목 + URL 입력, 별도 링크 제거 버튼
  - **이미지**: 파일 업로드 (드래그 앤 드롭) + URL 입력 탭, 최대 크기 제한 + 인라인 에러
  - **서식 제거**, **실행 취소/다시 실행** (Ctrl+Z/Y)
  - **HTML 소스 코드 뷰**: Dialog 모달로 raw HTML 편집
  - **콘텐츠 크기 표시**: 바이트 카운터 (debounced 300ms)
  - **하이브리드 값 모델**: `defaultValue` (비제어) + `value` (제어)
  - **`features` prop**: 툴바 기능 개별 on/off
  - **`compactToolbar` prop**: 정렬을 드롭다운으로 축소
  - **`HtmlEditorRef`**: `editor`, `focus()`, `getHTML()` 노출
  - **InputWrapper 통합**: label, caption, required, error, success 지원
  - **FormControl 연동**: react-hook-form 자동 에러 주입
  - **ScrollArea**: 에디터 콘텐츠 + 툴바 수평 스크롤
  - **한글 IME**: Tiptap/ProseMirror 네이티브 처리 (Draft.js 워크어라운드 불필요)
  - **SSR 안전**: `immediatelyRender: false` 설정
  - **Optional peerDependencies**: Tiptap 패키지는 HtmlEditor 사용 시에만 설치 필요
  - **Storybook**: Default, WithLabel, Controlled, Uncontrolled, CustomFeatures, ImageUpload, ContentSize, States, PreloadedContent (9 stories)
  - **Unit tests**: `normalizeHtmlContent`, `calculateContentSize`, `validateImageFile` (16 tests)

## [1.3.2] - 2026-04-13

### Fixed (CRITICAL)

- **Interactive Legend 영구 숨김 버그**: 범례 항목 클릭 시 항목이 사라지고 복원 불가능하던 버그 수정. Recharts `<Legend>` payload 의존 제거 → 외부 범례 렌더링으로 전면 재설계
- **Pie/Donut 숨김 시 세그먼트 재분배**: 숨긴 세그먼트의 공간을 나머지가 채워서 항상 100% 원형 유지
- **우측 범례 레이아웃 오버플로우**: `legendPosition="right"` 시 차트 고정 width가 flex 레이아웃과 충돌하던 문제 수정. 우측 범례 시 차트가 가용 공간에 맞게 축소

### Added

- **`ProportionBar` 컴포넌트** (신규): 비율 표시 수평 바. 대시보드 통계용. interactive legend, animated, variant, totalLabel/totalValue 지원
- **`legendPosition` prop** (모든 차트): `'bottom' | 'right'` — 우측 범례로 대시보드 레이아웃 지원
- **`legendValueFormatter` prop** (모든 차트): 범례 항목에 포맷된 값 표시
- **`renderLegend` prop** (모든 차트): 커스텀 범례 UI 렌더링. `{ items, hiddenSeries, toggleSeries }` 를 받아 자체 범례 구현 가능
- **`BarList.labelWidth` prop**: 바 리스트 라벨 영역 너비 커스텀 (기본 64px)
- **Storybook**: ProportionBar (7), BarList (6), 차트 feature stories (18), 캘린더 PickerOnly (4) 추가

### Changed

- **`ChartLegend` 전면 리팩터**: Recharts payload 의존 제거. `items: LegendItem[]` prop 기반. position/value/interactive 지원
- **`useInteractiveLegend` hook**: 의존성 수정 + orphan key 자동 정리
- **Pie/Donut 애니메이션**: `animationDuration={800}` (기본 1500ms → 800ms)

## [1.3.0] - 2026-04-12

### Added — Chart Feature Gaps (소비자 마이그레이션 지원)

- **Interactive Legend** (`legendInteractive` prop): 클릭으로 시리즈 토글. 마지막 시리즈 숨기기 방지. 숨긴 항목 opacity 0.4, dot 색상 #ccc. 모든 차트 컴포넌트 지원
- **BarList 컴포넌트** (신규): 수평 바 리스트. collapse/expand, 값 포맷터, valueSuffix, maxHeight 스크롤, 항목 클릭 콜백 지원
- **Animation Control** (`animated` prop): false 설정 시 모든 Recharts 애니메이션 비활성화 (PDF 캡처용). 모든 차트 + BarList 지원
- **Chart Wrapper Variant** (`variant` prop): `'unstyled'` 설정 시 배경/그림자/라운드 제거 (카드 내부 임베딩용)
- **Tooltip Value Formatter** (`tooltipValueFormatter` prop): 숫자 값 커스텀 포맷 (예: `toLocaleString('ko-KR')`)
- **Tooltip Label Alias** (`ChartConfigItem.tooltipLabel`): 범례와 다른 툴팁 전용 라벨
- **DonutChart Footnote** (`footnote` prop): 차트 하단 각주 텍스트
- **Margin Control** (`margin` prop): Recharts 차트 영역 마진 커스텀 설정
- **Theme-aware Strokes**: Pie/Donut 세그먼트 + Line/Combo dot stroke가 `var(--bg-card)` 사용 (다크 모드 호환)

### Added — 기타

- **`MonthPicker` / `MonthRangePicker` — `width` prop 추가**
- **`MonthPicker` / `MonthRangePicker` — `size` prop 추가** (`'sm' | 'lg'`)
- **`pickerOnly` prop** (MonthPicker, MonthRangePicker, DatePicker, DateRangePicker)
- **Color Alpha 토큰 세분화**: 17개 색상 × 3 레벨 × 4 테마 = 204개 토큰

### Fixed

- **InfoBox 레이아웃**: 제목 중복 제거, 줄바꿈 지원, 아이콘 정렬
- **PieChart / DonutChart 오버플로우**: outerRadius 자동 클램핑
- **DonutChart half 모드 중앙 라벨**: 범례와 겹치지 않도록 위치 수정
- **Chart Storybook Controls**: 누락 prop 연결 (BarChart 8개, DonutChart 4개, ComboChart 1개)
- **CodeRabbit round 2**: ComboChart Y축 음수, prepublishOnly 강화, icon cleanup 범위 제한

## [1.2.0] - 2026-04-11

### Fixed

- **`Checkbox` `checkboxPosition="off"` 무시되던 버그**: `off` 설정 시 `left`로 강제되던 문제 수정. 이제 `off` 시 체크박스 요소만 렌더링 (InlineFieldWrapper 바이패스). dev 모드에서 `off` + label/error 동시 사용 시 경고 출력
- **Chart `renderTooltip` override 깨지던 버그**: 커스텀 툴팁이 불필요한 카드 래퍼에 감싸지던 문제 수정. 이제 기본적으로 래퍼 없이 직접 렌더링. `wrapCustomTooltip` prop으로 이전 동작 유지 가능
- **`DragOverlay` Dialog 내부 렌더링 버그**: `document.body` 고정 대신 `usePortalContainer()` 사용으로 Dialog 내부에서도 정상 동작
- **`LineChart` Y축 음수 데이터 지원**: auto domain에서 하한이 0으로 고정되어 음수 데이터가 잘리던 문제 수정. 이제 `Math.min(dataMin, 0)` 사용
- **`@hookform/resolvers` peerDep 호환성**: `^3.10.0` → `^3.10.0 || ^5.0.0`으로 v5 지원
- **`package.json` files 배열 누락**: `accordion`, `aspect-ratio`, `dnd`, `empty-state`, `event-calendar`, `info-box`, `status-dot`, `stepper` subpath proxy 디렉터리 추가
- **CSS 클래스 공백 누락**: 여러 story 파일에서 `"margin-0size-sm"` → `"margin-0 size-sm"` 등 공백 누락으로 클래스가 적용되지 않던 문제 수정 (18건)
- **isometric icon 생성 스크립트 속성 순서 의존 버그**: `strokeOpacity` 제거 로직이 `stroke` 속성 순서에 의존하던 문제 → pre-scan 방식으로 변경
- **`DatePicker` / `DateRangePicker` 들여쓰기 불일치**: `labelWidth` prop 들여쓰기 수정

### Added

- **`wrapCustomTooltip` prop** (Chart 컴포넌트): `renderTooltip` 사용 시 기본 카드 래퍼 적용 여부 제어 (default: `false`)
- **`AccordionPadding` 타입에 `20` 추가**: DS spacing scale 완전 지원
- **테스트 추가**: Checkbox `off` 동작 (3건), ChartTooltipAdapter wrap 동작 (2건), DragOverlay 포탈 fallback (1건)

### Changed

- **`DialogTitle` `weight="bold"` deprecated**: 내부적으로 `semibold`와 동일하게 처리. 향후 제거 예정
- **SVG 파서 개선**: namespace 속성 (`xlink:href`) 및 단일 따옴표 지원 추가
- **Storybook 규칙 일괄 적용**: 24개 story 파일에서 `{...args}` spread 제거 → 명시적 prop 전달. Three Places Rule 위반 5건 수정. `font-mono` → `font-code` 변경
- **`RadioList`**: `defaultValue` 및 `size` prop이 `RadioGroup`/`RadioItem`에 올바르게 전달되도록 수정
- **`EventCalendar`**: DayCell memo 비교에 `locale` 추가
- **`tailwind.config.js`**: `text-destructive` 중복 제거 (utilities.css 수동 유틸리티 우선)

### Documentation

- **`MIGRATION.md`**: `sed` 명령어 macOS/Linux 분리 안내 + 1.1.x → 1.2.x 마이그레이션 섹션 추가
- **`README.md`**: 아이콘 import 경로 예시를 실제 패키지 경로로 수정
- **`CHANGELOG.md`**: `sliently` → `silently` 오타 수정
- **`Checkbox.stories.tsx`**: size 기본값 문서 `'md'` → `'sm'` 수정

## [1.1.27] - 2026-04-10

### Documentation (PR #4 by @moodzmz)

- **`ux-guideline/foundations/typography.md`** (+48 lines)
  - 새 섹션 **"선택 원칙 (권장이며 강제가 아님)"** — 각 size 단계가 의미하는 정보 역할(`xs` 보조/메타, `sm` 기본 정보, `md` 영역 입구, `lg+` 단일 앵커) 정의 + 단계 선택 시 자가 질문 가이드
  - 새 섹션 **"권장에서 벗어나도 좋은 신호"** — 정보 밀도 높은 표/리스트, 빈 상태/온보딩, KPI 카드 등에서 default 사이즈를 벗어나도 되는 케이스
  - 새 섹션 **"시맨틱 헤딩 (h1 단일성)"** — 페이지당 `<h1>` 단 1개만 사용 (GA/GTM/SEO 파서가 페이지 식별 anchor로 사용). 시각적 강조와 시맨틱 위계 분리 원칙
- **`ux-guideline/foundations/color.md`** — 우선순위 규칙과 결정 기준 정제
- **`ux-guideline/foundations/components.md`** — "어떤 컴포넌트를 언제 쓸지" 결정 룰 강화
- **`ux-guideline/foundations/border-radius.md`** — 작은 룰 정제
- **`ux-guideline/foundations/spacing.md`** — 3줄 추가
- **`ux-guideline/일관성-가이드라인.md`** (+112 lines) — AI 에이전트가 읽는 메인 가이드라인 문서. 결정 룰을 더 명시적으로, 모호함 줄이고 예시 보강

### Added (PR #4 by @moodzmz)

- **UI Sample 갤러리 페이지** (`ux-guideline/UI Sample.tsx`, 829 lines + `src/main.tsx`, `vite.config.ts`)
  - Vite dev 서버에서 실행 가능한 living pattern library
  - 실행: `npm run dev` → `http://localhost:5173`
  - 추상적인 가이드라인 텍스트 대신 실제 DS 컴포넌트 조합을 시각적으로 브라우징
  - **소비자에게 export되지 않음** — 내부 디자인 도구 (`src/main.tsx` / `index.html`은 npm 패키지에 포함되지 않음)

## [1.1.26] - 2026-04-09

### Added

- **`Checkbox` / `Switch` / `Radio` / `RadioGroup` 폼 필드 검증 props**: 모든 인라인 폼 컨트롤이 `Input` / `Textarea`와 동일한 검증 API를 지원합니다
  - `error?: boolean | string` — `true`면 에러 스타일만 적용, 문자열이면 캡션으로 에러 메시지 표시
  - `success?: boolean | string` — 성공 상태 (에러와 동일한 패턴)
  - `caption?: string` — 컨트롤 하단에 표시되는 도움말 텍스트
  - `required?: boolean` — 라벨 옆에 빨간 별표 표시
  - 에러/성공 시 Checkbox와 Radio는 테두리가 `border-destructive` / `border-success`로 변경
  - Switch는 트랙에 `outline-destructive` / `outline-success` inset outline 적용 (신규 DS 유틸리티)
  - `RadioGroup`에 전달하면 Radio Context를 통해 자식 Radio 아이템의 테두리까지 전파되며, 캡션은 그룹 하단에 한 번만 렌더링됨
  - `CheckboxList` / `SwitchList` / `RadioList`는 그룹 레벨 `error` / `success` / `caption` 지원
- **`Button.color` prop (canonical)**: Badge/Switch/Avatar와 일관된 네이밍. `colorOverride`도 계속 동작하지만 `@deprecated` 표시 — 둘 다 전달 시 `color`가 우선. 런타임 경고 없음 (JSDoc only)
- **`Input` / `Textarea.loading?: boolean`**: 모든 Input variant와 Textarea에서 로딩 상태 지원. `true`일 때 tail 영역(Input) 또는 toolbar(Textarea)에 스피너 표시, 컨트롤은 `disabled` 처리되고 `aria-busy` 설정. 에러/성공 상태와 병존 가능 (비동기 validation 중 retry 등)
- **`Spinner` 내부 primitive** (`src/lib/spinner`): Button / Input / Textarea 등 로딩 상태가 필요한 컴포넌트에서 공통으로 사용하는 2-circle SVG. `src/index.ts`에서 공개 export되지 않음 (내부 전용)
- **`InlineFieldWrapper` 내부 컴포넌트** (`src/components/input/shared/InlineFieldWrapper`): Checkbox/Switch/Radio가 공유하는 라벨+설명+필수+캡션 레이아웃. DRY 정리로 중복 JSX 제거
- **`resolveCaption` 유틸리티** (`src/components/input/shared/resolveCaption`): `error > success > caption` 우선순위 해석 로직. `InputWrapper`와 폼 필드 전반에서 사용
- **DS 유틸리티 `.outline-destructive` / `.outline-success`**: `.outline-darker`와 동일한 패턴의 inset outline (1px solid, -1px offset). Switch 에러/성공 상태용

### Changed

- **`Button`의 `colorOverride` → `color` deprecation path**: `ButtonProps.colorOverride`에 `@deprecated` JSDoc 추가. 기존 consumer는 그대로 동작 (breaking change 아님)
- **`InputWrapper` 내부 리팩터링**: 인라인으로 작성되어 있던 caption 해석 로직을 `resolveCaption` 유틸리티로 추출. 동작 변경 없음

### Fixed

- **`Switch` 불필요한 `descriptionId` `aria-describedby`**: 설명 텍스트가 항상 같은 `<label>` 내부에 시각적으로 인접해 있어 aria 링크가 중복이었음. `InlineFieldWrapper` 마이그레이션과 함께 제거

### Stories

- **Checkbox**: `WithError`, `WithSuccess`, `WithCaption`, `Required`, `ErrorBooleanOnly` 추가
- **Switch**: 동일한 5개 스토리 추가
- **Radio**: RadioGroup 레벨 `WithError`, `WithSuccess`, `WithCaption`, `ErrorBooleanOnly` 추가

### Tests

- `resolveCaption.test.ts` (10 cases) — 우선순위, boolean/string 변형, edge cases
- `InlineFieldWrapper.test.tsx` (11 cases) — label, description, required, caption 상태, conditional wrapper
- `RadioGroup.test.tsx` (5 cases) — 컨텍스트 전파, 그룹 레벨 캡션, aria 속성
- 총 26 tests 추가, 기존 94 + 신규 26 = 120 all passing

## [1.1.25] - 2026-04-08

### Fixed

- **`Input` `maxLength` prop이 inner `<input>` 엘리먼트로 전달되지 않던 버그**: `maxLength`는 카운터 표시(`showCount`)에만 사용되고 실제 브라우저 레벨 enforcement가 누락되어, 사용자가 제한을 초과해 입력/붙여넣기할 수 있었음 (e.g. `330/100`, `63/15`). 모든 Input variant에서 `maxLength`를 DOM input에 forward하도록 수정
  - 영향 variant: `Default`, `Password`, `AddOn` (grouped + inline), `Button`, `Shortcut`, `Dropdown`
  - `Textarea`는 이미 올바르게 전달하고 있어 변경 없음
  - API 변경 없음, 순수 behavior 수정 (`maxLength` 타입은 이미 `InputHTMLAttributes<HTMLInputElement>`에서 상속)

## [1.1.24] - 2026-04-08

### Added

- **`MultiSelectProps.canApply`**: showActions 모드에서 적용 버튼의 활성화 조건을 직접 지정하는 predicate. `(pending, committed) => boolean`. 기본값은 "변경 사항이 있을 때만 활성화" (`!arraysEqual(pending, committed)`)
  - 예: `canApply={(pending) => pending.length > 0}` — 빈 commit 방지

### Fixed

- **`Select` wrapper가 multi-select / tags variant에서 `showActions` / `applyLabel` / `cancelLabel` prop을 drop하던 버그**: wrapper가 prop을 명시적으로 enumerate하면서 누락. `<Select variant="multi-select" showActions />`가 silently 동작하지 않던 문제 해결
  - 추가로 `defaultValue`, `maxVisibleTags`, `overflowText` 등 다른 prop들도 동일한 위험이 있었음
  - 재발 방지: wrapper를 spread 패턴으로 리팩터링 (`{...rest}` forward) → 이후 `MultiSelectProps` / `TagsSelectProps`에 prop을 추가하면 자동으로 forward됨
- **`Select` 적용 버튼 disabled 상태**: `applyDisabled` 시 `disabled` 속성과 `opacity-50 cursor-not-allowed` 스타일 적용, hover 효과 제거, onClick 단락(short-circuit)

### Stories

- MultiSelect: `WithApplyActions`, `WithApplyCanApplyPredicate` 스토리 추가

## [1.1.23] - 2026-04-08

### Added

- **`SelectOption.tooltip` / `tooltipPlacement`**: 옵션 호버 시 표시되는 DS 툴팁. `disabled` 옵션에서도 동작하므로 비활성화 사유 안내에 적합. `ReactNode` 자동 감싸기 지원
- **`SelectOptionTooltipPlacement` 타입** (`'top' | 'right' | 'bottom' | 'left'`)
- **`TooltipTrigger.container` prop**: 포탈 컨테이너 명시적 지정 (`undefined` = context, `null` = body 강제, `HTMLElement` = 명시). overflow-hidden 컨테이너를 탈출해야 할 때 사용
- **`TruncatedText.disableTooltip` prop**: 외부에서 별도 툴팁을 제공할 때 내부 오버플로우 툴팁을 비활성화하여 충돌 방지
- **`ExtendedSelectItemProps.disableLabelTooltip`**, **`MultiSelectItemProps.disableLabelTooltip`** (internal)

### Changed

- **`TooltipTrigger.content` 자동 감싸기**: ReactNode를 자동으로 `<Tooltip>`으로 감싸 배경/패딩/화살표가 적용됨. 이미 `<Tooltip>` 엘리먼트면 그대로 사용 (이중 감싸기 방지)
- **Select/MultiSelect `renderOption` 타이포그래피 패리티**: 커스텀 `renderOption` 사용 시 기본 아이템과 동일한 `font-body size-sm line-height-leading-5 text-default` 클래스 자동 적용
- **Select sr-only ItemText 견고성**: Tailwind preflight가 없는 환경에서도 시각적으로 숨김 처리되도록 인라인 visually-hidden 스타일 적용

### Fixed

- 옵션 `tooltip`이 Select 드롭다운(`overflow:hidden`)에 의해 잘리지 않도록 `container={null}` + `zIndex={101}`로 body 포탈 처리

### Migration

- 자세한 내용은 [MIGRATION.md](./MIGRATION.md#tooltiptrigger-content-자동-감싸기-v1123) 참조

## [1.1.22] - 2026-04-08

### Added

- **EmptyState `illustration` prop**: 커스텀 일러스트레이션 (SVG, img, 애니메이션 등)을 icon 대신 렌더링. `ReactNode` 타입
- **EmptyState `variant` prop**: 레이아웃 프리셋 (`'default' | 'inline' | 'fill'`). inline은 컴팩트 패딩, fill은 전체 높이
- **EmptyState `size` 확장**: 기존 `'sm' | 'md'`에서 `'xs' | 'sm' | 'md' | 'lg'`로 확장
- **`EmptyStateVariant` 타입** export

### Stories

- EmptyState Default 스토리에 `illustration`, `variant` 컨트롤 추가
- `size` 옵션을 `['xs', 'sm', 'md', 'lg']`로 확장
- 신규 스토리: `WithIllustration`, `InlineVariant`, `FillVariant`, `ExtraSmall`, `Large`

## [1.1.21] - 2026-04-08

### Added

- **ControlButton `isFill` 지원**: `icon` prop이 3-tuple `[category, name, boolean]` 형식 지원 (`IconTypeWithFill`). 채워진 아이콘 사용 가능
- **ControlButton `colorOverride` prop**: Button과 동일한 `ButtonColor` 팔레트 (18색)로 아이콘 색상 오버라이드. 배경/호버 스타일에는 영향 없음

### Stories

- ControlButton Default 스토리에 `colorOverride`, `className` 컨트롤 추가
- `icon` argType에 `IconTypeWithFill` 설명 추가

## [1.1.20] - 2026-04-08

### Changed

- **Select trigger gap → 0px**: 모든 사이즈(xs/sm/lg)의 트리거 내부 gap을 0으로 변경하여 텍스트 영역 확보
- **Textarea minHeight 계산 수정**: paddingY 이중 계산 제거 (패딩은 wrapper에 적용되므로 textarea minHeight에서 제외)

## [1.1.19] - 2026-04-07

### Added

- **AccordionItem `padding` prop**: 컨테이너 패딩을 px 단위로 커스텀 (`AccordionPadding`: 0 | 1 | 2 | 4 | 6 | 8 | 10 | 12 | 16 | 24). 미지정 시 기본 24px
- **AccordionGroup `padding` prop**: 그룹 전체 기본 패딩. 개별 아이템의 `padding`이 우선
- **AccordionGroupItem `padding`**: 아이템별 패딩 오버라이드
- **`AccordionPadding` 타입** export
- **AccordionItem 테스트**: 패딩 기본값, 커스텀 패딩, line variant 패딩, 그룹 전파, 아이템 오버라이드 테스트

### Stories

- AccordionItem/AccordionGroup Default 스토리에 `padding` 컨트롤 추가

## [1.1.18] - 2026-04-07

### Added

- **PopoverContent `animation` prop**: 애니메이션 프리셋 선택 (`'default' | 'fade' | 'scale' | 'slide' | 'none'`)
  - `default`: fade + zoom + 방향별 슬라이드 (기존 동작)
  - `fade`: 페이드 인/아웃만
  - `scale`: fade + zoom (80% → 100%)
  - `slide`: 위→아래 clip-path 확장 애니메이션 (`fadeInDown`/`fadeOutUp` 스타일)
  - `none`: 즉시 표시/숨김
- **PopoverContent `animationDuration` prop**: 애니메이션 지속 시간 커스텀 (ms 단위)
- **`PopoverAnimation` 타입** export
- **`popover-anim-slide` CSS 유틸리티**: clip-path 기반 확장/축소 키프레임 애니메이션

### Stories

- Default 스토리에 `animation`/`animationDuration` 컨트롤 추가
- `AnimationPresets` 스토리 추가 — 5개 프리셋 시각적 비교

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
