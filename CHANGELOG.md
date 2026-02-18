# Changelog

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

- 서브패스 임포트 지원: `import { Button } from '@mbisolution/blumnai-design-system/button'`
- 소비자 프로젝트를 위한 최적화 가이드 (README.md)

### Notes

- CSS는 별도 임포트를 권장합니다:
  `import '@mbisolution/blumnai-design-system/styles';`
