# 마이그레이션 가이드

## 버전 호환 매트릭스

| DS 버전 | React | Node | Tailwind | 패키지 스코프 |
|---------|-------|------|----------|--------------|
| 1.5.x   | 18+   | 20+  | v4 (DS 내부; 소비자는 v3/v4 모두 호환) | `@blumnai-studio` |
| 1.1.x   | 18+   | 20+  | v4       | `@blumnai-studio` |
| 1.0.x   | 18+   | 20+  | v4       | `@blumnai-studio` |
| 0.2.x   | 18+   | 18+  | v4       | `@mlbghoon` |

---

## v1.10.x → v1.10.12 (`CheckboxList` / `RadioGroup` / `SwitchList` / `InputOTP` 의 `className` 타깃 변경)

### 한 줄 요약

> **`className` 이 이제 항상 컴포넌트의 최상위 DOM 엘리먼트에 적용됩니다.** `caption` 이 있는 `CheckboxList` / `RadioGroup` / `SwitchList`, 그리고 `InputOTP` 에서 `className` 이 붙는 위치가 바뀝니다. 대부분의 코드는 수정 불필요.

### `CheckboxList` / `RadioGroup` / `SwitchList`

`caption`(또는 문자열 `error` / `success`) 이 지정되면 컴포넌트는 caption 까지 포함하려고 바깥에 `<div class="flex flex-col">` 래퍼를 하나 더 렌더합니다.

| | 기존 (≤ 1.10.11) | 변경 후 (1.10.12) |
|---|---|---|
| `caption` 없음 | `className` → group 엘리먼트 | 동일 (변화 없음) |
| `caption` 있음 | `className` → **안쪽 group** | `className` → **바깥 래퍼** |

시각적 결과는 같거나 더 나아지므로 대부분 마이그레이션이 필요 없습니다. **`caption` 을 쓰면서 `className` 으로 group 의 레이아웃 자체를 덮어쓰던 경우만** 영향을 받습니다:

```tsx
// 기존: className 이 group(RadioGroupPrimitive.Root)에 붙어서 가로 배치가 먹혔음
<RadioGroup className="flex-row" caption="...">     // ❌ 1.10.12 부터는 바깥 래퍼에 붙음

// 변경 후: 레이아웃은 prop 으로 제어
<RadioGroup orientation="horizontal" caption="..."> // ✅
```

`CheckboxList` / `SwitchList` 의 group 레이아웃은 `listStyle` prop 으로 제어합니다.

### `InputOTP`

`className` 이 `input-otp` 의 **시각적으로 숨겨진 내부 `<input>`** → 라벨 + 슬롯 행 + 에러 메시지를 감싸는 **최상위 `<div>`** 로 변경. 슬롯들이 나열되는 행 컨테이너는 기존 그대로 `containerClassName`. 숨겨진 input 에 직접 className 을 주던 경우는 거의 없으므로 사실상 영향 없음.

### 영향 없는 변경 (참고)

- **`Table.wrapperClassName` 추가** — `Table` 의 `className` → `<table>` 동작은 그대로. 최상위 래퍼(스크롤 영역 + 페이지네이션 + 로딩 오버레이) 에 스타일을 주려면 새 `wrapperClassName` 사용. (additive, breaking 아님)
- **Radix prop 타입 내부 정의 변경** — `ComponentPropsWithoutRef<typeof XPrimitive.Y>` → Radix export 타입(`DropdownMenuContentProps` 등) 직접 사용으로 `TS2590` 회피. 컴파일 타임 타입만 변경, 런타임/공개 API 동일.

---

## v1.10.x → v1.10.6 (모든 icon prop 에 Remixicon component 사용 — 강력 권장)

### 한 줄 요약

> **이제부터 모든 컴포넌트에서 `leadIcon` / `tailIcon` / `icon` 같은 prop 에 `RiCheckLine` 같은 Remixicon 컴포넌트 참조를 사용하세요.** Tuple form (`['system', 'check']`) 은 여전히 동작하지만 dev 콘솔에 deprecation 경고가 출력됩니다.

### 이건 breaking change 가 아닙니다

기존 tuple 코드는 **그대로 작동합니다.** API 가 widening 된 것 뿐 — 새 형식과 기존 형식을 모두 받습니다. 다만 다음 이유로 마이그레이션을 강력 권장합니다:

- **Tree-shaking** — 직접 import 한 아이콘만 번들에 포함 (페이지당 ~1KB/아이콘 vs 전체 카탈로그 chunk)
- **타입 안전성** — TypeScript 가 오타를 빌드 타임에 잡아냄 (tuple 은 런타임에야 missing icon 으로 드러남)
- **Suspense flicker 없음** — dynamic-string API 는 첫 렌더에 lazy chunk 를 기다리지만, component ref 는 즉시 렌더
- **IDE auto-import** — `RiCh...` 만 쳐도 `RiCheckLine` 자동 완성
- **Dev console deprecation warning** — tuple form 을 쓰면 매 unique tuple 마다 한 번씩 경고 출력 (production 빌드에서는 dead-code elimination 으로 제거됨)

### 마이그레이션

**자동 (권장):**

```bash
npx blumnai-icon-codemod --dry --print ./src   # 미리보기
npx blumnai-icon-codemod ./src                 # 실제 변환
```

Codemod 가 처리하는 prop 들 (DS 컴포넌트 어디든):
- `iconType` (`<Icon>` 의 dynamic API; 이건 `icon` 으로 prop 이름까지 변경됨)
- `icon` (Chip, Badge, Avatar, ControlButton, FilterButton, Divider, InfoBox, Tooltip, EmptyState, FileUpload, Breadcrumbs, Stepper, NavigationMenu, Sidebar, Tabs item icon, ...)
- `leadIcon` (Button, LinkButton, Input, Select, Combobox, Menubar, ContextMenu, Dropdown, Tabs, Sidebar, ...)
- `tailIcon` (위와 동일)
- `buttonLeadIcon`, `buttonTailIcon` (Input ButtonInput variant, Divider button variant)

**Before / After:**

```tsx
// Before
<Button leadIcon={['system', 'add']}>추가</Button>
<Input leadIcon={['system', 'search']} placeholder="검색..." />
<Chip icon={['health', 'heart', true]} label="찜" />
<ControlButton icon={['system', 'settings']} aria-label="설정" />
<Icon iconType={['system', 'check']} size={16} />

// After (codemod 자동 적용 — Ri* import 까지 추가됨)
import { Button, Input, Chip, ControlButton, Icon,
         RiAddLine, RiSearchLine, RiHeartFill, RiSettingsLine, RiCheckLine }
       from '@blumnai-studio/blumnai-design-system';

<Button leadIcon={RiAddLine}>추가</Button>
<Input leadIcon={RiSearchLine} placeholder="검색..." />
<Chip icon={RiHeartFill} label="찜" />
<ControlButton icon={RiSettingsLine} aria-label="설정" />
<Icon icon={RiCheckLine} size={16} />
```

### Codemod 가 건드리지 않는 코드

정적 literal 이 아닌 경우 — 변수, 삼항, 함수 호출:

```tsx
// 이런 동적 코드는 그대로 둠 (계속 작동)
const iconName = getIconForStatus(status);
<Button leadIcon={iconName}>...</Button>

<Button leadIcon={isLoading ? ['system', 'loader'] : ['system', 'check']}>...</Button>
```

동적 lookup 이 정말 필요하면 dynamic-string back-compat path 가 계속 작동합니다. 다만 dev 콘솔 경고는 계속 뜨므로, 가능한 경우 `const RiCmp = isLoading ? RiLoaderLine : RiCheckLine` 처럼 컴포넌트 참조로 분기하는 것을 권장.

### 자주 쓰는 매핑

| Tuple | Ri 컴포넌트 |
|-------|------------|
| `['system', 'add']` | `RiAddLine` |
| `['system', 'add', true]` | `RiAddFill` |
| `['system', 'check']` | `RiCheckLine` |
| `['system', 'close']` | `RiCloseLine` |
| `['system', 'search']` | `RiSearchLine` |
| `['system', 'settings']` | `RiSettingsLine` |
| `['system', 'menu']` | `RiMenuLine` |
| `['system', 'delete-bin']` | `RiDeleteBinLine` |
| `['system', 'edit']` | `RiEditLine` |
| `['system', 'eye']` / `'eye-off'` | `RiEyeLine` / `RiEyeOffLine` |
| `['arrows', 'arrow-right']` | `RiArrowRightLine` |
| `['arrows', 'arrow-down-s']` | `RiArrowDownSLine` |
| `['health', 'heart', true]` | `RiHeartFill` |
| `['user', 'user']` | `RiUserLine` |
| `['business', 'star', true]` | `RiStarFill` |

전체 매핑은 Storybook 의 `Components / Icons / Icon / Category` 페이지에서 검색 가능 (모든 아이콘에 `Ri*` 이름 표시).

### 새로운 export

```tsx
import {
  // 이미 있던 것
  Icon, RiCheckLine /* 등 모든 Ri* */,

  // v1.10.6 신규
  renderIconProp,           // 유틸: tuple/component/ReactNode 를 React 노드로 렌더
  isIconTuple,              // 유틸: tuple 인지 판별
  isRemixiconComponent,     // 유틸: Ri* component 인지 판별
  type IconProp,            // IconTypeWithFill | RemixiconLikeComponent
  type IconPropOrNode,      // IconProp | ReactNode
  type RenderIconPropOptions,
} from '@blumnai-studio/blumnai-design-system';
```

`renderIconProp` 은 custom 컴포넌트에서 icon-shape prop 을 받아 렌더할 때 유용:

```tsx
function MyCustomCard({ icon }: { icon?: IconPropOrNode }) {
  return (
    <div>
      {renderIconProp(icon, { size: 20, color: 'default-subtle' })}
      <span>...</span>
    </div>
  );
}
```

---

## v1.9.x → v1.10.0 (Remixicon-derived icon subpath import 제거)

### 요약

DS 가 자체 SVG 카피본을 유지하지 않고 `@remixicon/react` 를 직접 사용하도록 변경됨. 18 개 Remixicon-derived 카테고리의 subpath import 가 제거됨.

### 변경 시그널

빌드 시 다음과 같은 에러:

```
Module not found: Can't resolve '@blumnai-studio/blumnai-design-system/icons/system'
Module not found: Can't resolve '@blumnai-studio/blumnai-design-system/icons/arrows'
... (등 18개 카테고리)
```

### 영향받는 카테고리 (제거됨)

`arrows`, `buildings`, `business`, `communication`, `design`, `development`, `device`, `document`, `editor`, `finance`, `food`, `health`, `map`, `media`, `others`, `system`, `user`, `weather`

### 영향받지 **않는** subpath (그대로 사용 가능)

- `icons/logos` — DS-custom 로고
- `icons/flags` — DS 자체 국가 깃발 시스템 (`<FlagIcon>`)
- `icons/brands` — DS 자체 브랜드 시스템 (`<BrandIcon>`)
- `icons/isometric` — DS 자체 isometric 일러스트
- `icons/file-icons` — DS 자체 파일 타입 아이콘
- `icons/cursors` — DS 자체 커서 아이콘

### 마이그레이션 단계

#### 옵션 A — `<Icon iconType=...>` 로 전환 (가장 안전)

```tsx
// Before
import { CheckIcon } from '@blumnai-studio/blumnai-design-system/icons/system';
<CheckIcon size={16} />

// After
import { Icon } from '@blumnai-studio/blumnai-design-system';
<Icon iconType={['system', 'check']} size={16} />
```

장점: dynamic-string API 변경 없음. 모든 기존 아이콘 이름 그대로 사용 가능.
단점: 첫 사용 시 ~1MB lazy chunk 1회 로드 (이후 캐시).

#### 옵션 B — 직접 import (tree-shaking 권장)

```tsx
// Before
import { CheckIcon, ArrowDownIcon } from '@blumnai-studio/blumnai-design-system/icons/system';
<CheckIcon size={16} />
<ArrowDownIcon size={16} />

// After
import { Icon, RiCheckLine, RiArrowDownLine } from '@blumnai-studio/blumnai-design-system';
<Icon icon={RiCheckLine} size={16} />
<Icon icon={RiArrowDownLine} size={16} />
```

장점: 사용한 아이콘만 번들에 포함 (페이지당 ~1KB/icon).
단점: import 이름 변경 필요 (kebab-case → PascalCase + `Ri` prefix + `Line`/`Fill` suffix).

#### 옵션 C — Codemod 사용 (대량 마이그레이션)

DS 패키지에 내장된 codemod 를 사용합니다. `npm install @blumnai-studio/blumnai-design-system@1.10.2` 이후 즉시 사용 가능:

```bash
# Dry-run (변경 없이 결과 미리보기)
npx blumnai-icon-codemod --dry --print ./src

# 실제 변환
npx blumnai-icon-codemod ./src
```

내부적으로 `jscodeshift` 를 사용하며, 모든 추가 인자는 jscodeshift 로 그대로 전달됩니다.

**변환 대상:** `<Icon iconType={['system', 'check']}>` 처럼 정적 literal 튜플.
**건너뛰는 패턴:** 변수 / 조건문 / 함수 호출로 동적 결정되는 `iconType`. 이런 곳은 dynamic-string back-compat 으로 계속 동작합니다.

### 이름 변환 규칙

`<category>/<kebab-name>` → `Ri<PascalCase>{Line|Fill}`

- `system/check` → `RiCheckLine`
- `system/check-double` → `RiCheckDoubleLine`
- `arrows/arrow-down` → `RiArrowDownLine`
- `system/check` (`isFill={true}`) → `RiCheckFill`

### Breaking 아닌 변경

- `<Icon iconType={...}>` API 는 그대로 동작 (back-compat)
- `BrandIcon`, `FlagIcon`, `IsometricIcon`, `FileIcon`, `CursorIcon` 변경 없음
- 메인 entry (`from '@blumnai-studio/blumnai-design-system'`) 의 모든 export 그대로 유지

---

## v1.9.21 → v1.9.22 (`DataGrid` / `Table` 헤더 정렬 기본값 변경 + `align` 분리)

### 요약

테이블 헤더 정렬이 셀(body) 정렬과 독립적으로 결정됩니다. 헤더 기본값이 `'left'` 에서 `'center'` 로 변경되고, `meta.align` 은 더 이상 헤더에 영향을 주지 않습니다.

### 변경 시그널

- `DataGrid` 의 헤더가 가운데 정렬로 표시됨 (이전엔 왼쪽)
- `meta: { align: 'right' }` 만 지정한 컬럼의 헤더가 더 이상 right 가 아니라 center
- `Table` 컴포넌트의 `TableHead` 가 가운데 정렬됨 (이전엔 왼쪽)

### 마이그레이션 단계

#### 1. 헤더와 셀이 같은 정렬을 유지해야 하는 컬럼 — `headerAlign` 명시

```tsx
// Before
{ accessorKey: 'amount', meta: { align: 'right' } }

// After — 헤더도 right 로 유지하려면 명시 필요
{ accessorKey: 'amount', meta: { align: 'right', headerAlign: 'right' } }
```

#### 2. 헤더를 left 로 유지해야 하는 컬럼

```tsx
// Before — 자동으로 left
{ accessorKey: 'name' }

// After — center 가 기본이므로 left 를 원하면 명시
{ accessorKey: 'name', meta: { headerAlign: 'left' } }
```

#### 3. `Table` 컴포넌트의 `TableHead`

```tsx
// Before — text-left 가 디폴트
<TableHead>이름</TableHead>

// After — text-center 가 디폴트, 왼쪽 정렬은 className 으로 명시
<TableHead className="text-left">이름</TableHead>
```

### 왜

일반적인 데이터 테이블에서 헤더는 가운데, 셀은 데이터 타입에 맞게 정렬 (텍스트는 left, 숫자는 right) 하는 패턴이 표준. 기존 cascade 동작 (`headerAlign ?? align ?? 'left'`) 은 셀 기준 정렬이 헤더로 전파되는 부작용이 있어, 헤더만 가운데로 두려면 모든 컬럼에 `headerAlign: 'center'` 를 넣어야 했음.

---

## v1.9.11 → v1.9.12 (`DateRangePicker` `onChange` on completion)

### 요약

기본 모드 (`showActions=false`) 의 `DateRangePicker` 가 더 이상 부분 선택 (첫 클릭) 에서 `onChange` 를 발화하지 않습니다. `onChange` 는 사용자가 두 번째 날짜 (= 범위 완성) 를 클릭한 시점에 한 번만 호출됩니다. 이는 `MonthRangePicker` 가 이미 사용하던 commit-on-completion 시맨틱과 정렬된 것입니다.

### 변경 시그널

| 이벤트 | v1.9.11 이하 | v1.9.12+ |
|---|---|---|
| 첫 날짜 클릭 | `onChange({from, to: from})` 즉시 | (no fire) |
| 두 번째 날짜 클릭 | `onChange({from, to})` | `onChange({from, to})` |
| 두 번째 클릭 없이 닫음 | `onChange(snapshot)` revert (v1.9.8+) | (no fire) |

### 영향 받는 케이스

대부분의 컨슈머는 영향 없음. 영향 가능 케이스:

1. **부분 선택을 시각적으로 외부 표시:** 예) `value` 를 별도 sidebar 에 미리 보기. 이전에는 첫 클릭 시점에 single-day 범위가 잠깐 표시됐다가 사라짐 (revert 또는 두번째 클릭 시 갱신). 이제는 두 번째 클릭 후에만 표시됨.

2. **첫 클릭에 분석 이벤트 / 로깅 트리거:** 이전에는 onChange 가 호출되어 분석 이벤트가 자동 발화. 이제는 호출되지 않음 → 별도 이벤트 핸들러 필요.

### 마이그레이션

대부분: 코드 변경 불필요. 더 깔끔한 시맨틱.

부분 선택을 관찰하고 싶으면 `showActions={true}` 로 전환하여 사용자에게 명시적인 확인 단계를 부여하거나, 별도 prop 추가가 필요하면 issue 등록 부탁드립니다.

### 이전 동작이 필요하면

이전 동작 (단일일 즉시 발화 + 닫힘 시 revert) 으로 돌릴 수 있는 prop 은 제공되지 않습니다. 필요시 issue 등록.

---

## 1.4.x → 1.5.x (Table / DataGrid 기본 폰트·행 높이 변경)

### 요약

Table과 DataGrid의 기본 폰트 크기가 `xs`(12px) → `sm`(14px)로, 기본 행 높이가 `32px` → `36px`로 변경되었습니다. `Cell*` 프리미티브(CellText, CellDate 등)를 Table/DataGrid 외부에서 단독 사용하는 경우에도 기본값이 `sm`으로 이동합니다.

### 이전 외관을 그대로 유지하려면

Table/DataGrid 루트에 `fontSize="xs"`를 전달하세요. 폰트 12px와 행 높이 32px가 모두 복원됩니다.

```tsx
// 변경 전 (v1.4.x) — 암묵적 xs + 32px 행
<Table>...</Table>
<DataGrid data={data} columns={columns} />

// 변경 후에도 동일한 외관 (v1.5.0+)
<Table fontSize="xs">...</Table>
<DataGrid data={data} columns={columns} fontSize="xs" />
```

### 새 기본값 (sm) 적용 시

별도 조치 없이 `v1.5.0+`로 업그레이드하면 `sm` / 36px가 자동 적용됩니다.

```tsx
// v1.5.0+ 기본값: 14px / 36px
<Table>...</Table>
<DataGrid data={data} columns={columns} />

// 더 큰 크기 (16px / 40px)
<Table fontSize="md">...</Table>
<DataGrid data={data} columns={columns} fontSize="md" />
```

### 명시적 `rowHeight` / `headerHeight`

`fontSize` 기본 행 높이보다 우선합니다. 기존에 `rowHeight="40px"` 등을 지정하고 있었다면 그대로 유지됩니다.

```tsx
<DataGrid fontSize="md" rowHeight="56px" headerHeight="56px" /> // 56px 우선
```

### `Cell*` 프리미티브 단독 사용

Table/DataGrid 밖에서 `CellText`, `CellDate` 등을 직접 렌더링하는 경우 Context 기본값(`sm`)이 적용됩니다. 이전처럼 `xs`로 고정하려면 상위를 Provider로 감싸세요.

```tsx
import { TableFontSizeContext } from '@blumnai-studio/blumnai-design-system/table';

<TableFontSizeContext.Provider value="xs">
  <CellText value="..." />
</TableFontSizeContext.Provider>
```

---

## 0.2.x → 1.0.0 (패키지 스코프 이관)

v1.0.0에서 패키지 스코프가 `@mlbghoon` → `@blumnai-studio`로 변경되었습니다.

### 1. `.npmrc` 업데이트

```ini
@blumnai-studio:registry=https://npm.pkg.github.com
```

### 2. 패키지 교체

```bash
npm uninstall @mlbghoon/blumnai-design-system --legacy-peer-deps
npm install @blumnai-studio/blumnai-design-system@latest --legacy-peer-deps
```

### 3. import 경로 변경

TypeScript 소스(.ts/.tsx)에서 import 경로를 일괄 변경합니다.

```bash
# macOS (BSD sed)
find src -type f \( -name '*.ts' -o -name '*.tsx' \) \
  -exec sed -i '' 's/@mlbghoon\/blumnai-design-system/@blumnai-studio\/blumnai-design-system/g' {} +

# Linux (GNU sed)
find src -type f \( -name '*.ts' -o -name '*.tsx' \) \
  -exec sed -i 's/@mlbghoon\/blumnai-design-system/@blumnai-studio\/blumnai-design-system/g' {} +
```

---

## 1.1.x → 1.2.x

### Chart `renderTooltip` 래퍼 변경

v1.1.x에서는 `renderTooltip` 콜백의 반환값이 자동으로 카드 스타일 래퍼(`rounded-card-xs padding-4 bg-card shadow-modal-sm`)로 감싸졌습니다.
v1.2.0부터 커스텀 툴팁은 **래퍼 없이 직접 렌더링**됩니다.

```tsx
// 이전 동작이 필요한 경우
<LineChart
  renderTooltip={(params) => <MyTooltip {...params} />}
  wrapCustomTooltip  // ← 이전 래퍼 유지
/>
```

기존 `renderTooltip` 사용 시 래퍼를 자체적으로 포함하고 있었다면 변경 불필요합니다.
래퍼에 의존하고 있었다면 `wrapCustomTooltip` prop을 추가하세요.

---

## 1.0.x → 1.1.x

### 주요 변경 사항

#### CSS 빌드 파일명 변경 (v1.1.10 → v1.1.11)

v1.1.10에서 `cssCodeSplit: true`가 적용되면서 CSS 파일명이 변경되었습니다.
**v1.1.11 이상을 사용하면 자동으로 해결됩니다** — `package.json` exports가 업데이트되었습니다.

```tsx
// 변경 없음 — 이 import는 v1.1.11+에서 정상 동작
import '@blumnai-studio/blumnai-design-system/styles';
```

> v1.1.10을 사용 중이라면 v1.1.11 이상으로 업데이트하세요.

#### 아이콘 파일 형식 변경 (v1.1.10)

아이콘 카테고리 파일이 `.tsx` (JSX) → `.ts` (createElement)로 변환되었습니다.

- **소비자 영향 없음** — import 경로에 확장자가 포함되지 않으므로 코드 변경 불필요
- 빌드 출력은 동일합니다
- Storybook dev server에서 아이콘 로딩 속도가 ~13초 → ~1초로 개선

#### Select/MultiSelect 옵션 툴팁 변경 (v1.1.10)

옵션 텍스트가 잘릴 때 표시되는 툴팁이 브라우저 네이티브(`title` 속성) → DS 커스텀 툴팁(`TruncatedText`)으로 변경되었습니다.

- **소비자 영향 없음** — 자동 적용됩니다
- 스타일이 DS 테마와 일치합니다

#### TooltipTrigger `content` 자동 감싸기 (v1.1.23)

`TooltipTrigger`의 `content` prop이 string/number뿐 아니라 **모든 ReactNode**를 자동으로 `<Tooltip>` 컨테이너로 감쌉니다. 이전에는 ReactNode를 넘길 때 직접 `<Tooltip>`을 작성해야 배경/패딩/화살표가 적용되었습니다.

**역호환:** 이미 `<Tooltip>` 엘리먼트를 직접 넘기는 코드는 그대로 동작합니다 — 내부에서 `content.type === Tooltip`을 감지해 이중 감싸기를 방지합니다.

```tsx
// Before (v1.1.22 이하) — ReactNode는 직접 Tooltip으로 감싸야 했음
<TooltipTrigger
  content={
    <Tooltip>
      <div>커스텀 내용</div>
    </Tooltip>
  }
>
  <button>호버</button>
</TooltipTrigger>

// After (v1.1.23+) — 자동 감싸기
<TooltipTrigger content={<div>커스텀 내용</div>}>
  <button>호버</button>
</TooltipTrigger>

// 직접 Tooltip을 넘기는 기존 코드도 그대로 동작 (이중 감싸기 없음)
<TooltipTrigger content={<Tooltip badge="NEW">커스텀</Tooltip>}>
  <button>호버</button>
</TooltipTrigger>
```

**주의:** 이전에 ReactNode를 그냥 넘겨서 **배경 없이 raw 노드만 노출**되는 것을 의도한 코드가 있다면, 이제 자동으로 Tooltip 컨테이너로 감싸지므로 시각적으로 달라질 수 있습니다. 그러한 의도라면 직접 wrapper 엘리먼트를 사용하세요.

#### Select 옵션 `tooltip` prop 추가 (v1.1.23)

`SelectOption`에 `tooltip` 및 `tooltipPlacement` 속성이 추가되었습니다. 옵션 호버 시 자동으로 DS 툴팁이 표시되며, `disabled: true` 옵션에서도 동작하므로 비활성화 사유 안내에 적합합니다.

```tsx
<Select
  options={[
    {
      id: 'auto',
      label: '자동선택',
      tooltip: '시스템이 가장 적합한 옵션을 자동으로 선택합니다.',
      tooltipPlacement: 'right',
    },
    {
      id: 'pro',
      label: 'Pro 전용',
      disabled: true,
      tooltip: 'Pro 플랜에서만 사용 가능합니다.',
    },
  ]}
/>
```

- **소비자 영향 없음** — 신규 prop, 미사용 시 동작 변화 없음

#### Input `maxLength` 브라우저 enforcement 활성화 (v1.1.25)

`Input`이 받은 `maxLength` prop을 inner `<input>` DOM 엘리먼트로 forward하지 않던 버그를 수정했습니다. 이전까지 `maxLength`는 `showCount`와 함께 카운터 표시(`{현재}/{max}`)에만 사용되고, 사용자는 제한을 초과해 입력/붙여넣기할 수 있었습니다.

**영향 범위:** `maxLength`를 prop으로 넘기는 모든 `Input` variant (`Default`, `Password`, `AddOn`, `Button`, `Shortcut`, `Dropdown`). `Textarea`는 이미 올바르게 forward하고 있어 변경 없음.

**Before (v1.1.24 이하):**

```tsx
<Input showCount maxLength={15} value={v} onChange={(e) => setV(e.target.value)} />
// 사용자가 30자 입력 → 카운터: "30/15", state: "30자 문자열" (제한 없음)
```

**After (v1.1.25+):**

```tsx
<Input showCount maxLength={15} value={v} onChange={(e) => setV(e.target.value)} />
// 사용자는 15자까지만 입력/붙여넣기 가능 (브라우저 레벨 enforcement)
```

**잠재적 영향:** 기존에 `maxLength`를 카운터 표시 *전용*으로만 의도하고 enforcement를 원치 않았다면 동작이 달라집니다. 카운터만 표시하고 enforcement는 원치 않는 경우, `maxLength`를 빼고 별도의 길이 표시 로직을 직접 구현하세요. 다만 이 케이스는 거의 없을 것으로 판단합니다 — 대부분 consumer는 enforcement를 기대하고 `maxLength`를 사용합니다.

**Migration:** 일반적으로 추가 작업 없음. 기존에 `onChange`에서 `.slice(0, maxLength)` workaround를 추가했다면 이제 제거해도 됩니다.

```tsx
// workaround 제거 가능
- onChange={(e) => setV(e.target.value.slice(0, 15))}
+ onChange={(e) => setV(e.target.value)}
```

---

## 자주 묻는 마이그레이션 질문

### Dialog 내부에서 Select/Popover가 뒤에 렌더링됩니다

v1.0.46에서 `PortalContainerContext`가 도입되었습니다. v1.0.46+ 사용 시 자동으로 해결됩니다.

v1.0.46 미만이라면 업데이트하세요:

```bash
npm install @blumnai-studio/blumnai-design-system@latest --legacy-peer-deps
```

### Select에서 빈 문자열 value를 사용하면 에러가 발생합니다

v1.0.55에서 수정되었습니다. `id: ''`인 옵션을 안전하게 사용할 수 있습니다:

```tsx
<Select
  options={[
    { id: '', label: '전체' },
    { id: '1', label: '옵션 1' },
  ]}
/>
```

### Tailwind spacing 클래스가 DS와 충돌합니다

DS는 `--spacing: initial`을 설정하여 Tailwind의 기본 spacing 클래스(`gap-*`, `p-*`, `m-*`)를 비활성화합니다. 이는 **DS 빌드 CSS에만 적용**됩니다.

소비자 프로젝트에서는:
- Tailwind 기본 spacing 클래스(`p-4`, `gap-8` 등)가 정상 동작합니다
- DS 유틸리티 클래스(`padding-16`, `ds-gap-8` 등)는 DS 컴포넌트 내부에서 사용됩니다
- 충돌이 없도록 DS는 접두사가 붙은 클래스(`ds-gap-*`, `padding-*`)를 사용합니다

### DS CSS가 내 프로젝트 스타일을 덮어씁니다

DS CSS는 의도적으로 `@layer`를 사용하지 않습니다 (unlayered). CSS 명세에 따라 unlayered CSS가 layered CSS보다 우선합니다.

프로젝트에서 넓은 요소 선택자(`button {}`, `svg {}`)를 사용하고 있다면:

```css
/* 해결책: 요소 선택자를 @layer로 감싸기 */
@layer base {
  button {
    cursor: pointer;
  }
}
```

### `--legacy-peer-deps`가 필요한 이유

일부 peer dependency 버전이 엄격하게 매칭되지 않을 수 있습니다. `--legacy-peer-deps`는 npm이 peer dependency 충돌을 무시하도록 합니다. 이는 안전하며 DS 사용에 영향을 주지 않습니다.
