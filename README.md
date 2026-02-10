# BlumnAI Design System

BlumnAI Design System은 BlumnAI 제품 전반에서 사용되는 **공통 UI 컴포넌트와 디자인 규칙을 관리하기 위한 React 기반 디자인 시스템**입니다.

본 프로젝트는 디자이너(Figma / Sort UI)와 프런트엔드 개발자 간의 일관된 협업을 목표로 하며, Storybook을 통해 문서화됩니다.

[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?style=flat-square&logo=github)](https://github.com/mbisolution/blumnai-design-system)

---

## 📦 기술 스택

- **React + TypeScript**
- **Vite**
- **Storybook (v8.4.x)**
- **Tailwind CSS** (커스텀 유틸리티 클래스 + CSS 변수 기반)
- **Sort UI (Figma Design Source)**

---

## 🚀 빠른 시작

### 필수 요구사항

- Node.js: **v20.12.x**
- npm: **v10.x**

⚠️ Node 버전 제한으로 인해 Storybook은 **8.4.x 버전으로 고정**되어 있습니다.

### 설치

```bash
# 저장소 클론
git clone https://github.com/mbisolution/blumnai-design-system.git
cd blumnai-design-system

# 의존성 설치
npm install

# 아이콘 생성 (빌드 전 필수)
npm run generate:icons

# 개발 서버 실행
npm run dev
```

### Storybook 실행

```bash
# Storybook 개발 서버 실행
npm run storybook

# Storybook 빌드
npm run build-storybook
```

---

## 📥 프로젝트에서 사용하기 (소비자 가이드)

### 설치

```bash
npm install @mbisolution/blumnai-design-system --legacy-peer-deps
```

### CSS 임포트

CSS는 반드시 별도로 임포트해야 합니다:

```tsx
// app/layout.tsx 또는 _app.tsx
import '@mbisolution/blumnai-design-system/styles';
```

### 컴포넌트 사용

```tsx
import { Button, Icon, Badge } from '@mbisolution/blumnai-design-system';

export default function MyPage() {
  return (
    <Button buttonStyle="primary" size="md">
      <Icon iconType={['system', 'add']} size={16} />
      새로 만들기
    </Button>
  );
}
```

### 최적화된 임포트 (권장)

빠른 빌드 시간을 위해 서브패스 임포트를 사용할 수 있습니다:

```tsx
// 전체 임포트 (기존 방식 — 호환됨)
import { Button } from '@mbisolution/blumnai-design-system';

// 서브패스 임포트 (권장 — 더 빠른 빌드)
import { Button } from '@mbisolution/blumnai-design-system/button';
import { Icon } from '@mbisolution/blumnai-design-system/icons/icon';
```

서브패스 임포트를 사용하면 번들러가 필요한 컴포넌트만 처리하므로 개발 서버 시작 시간이 크게 단축됩니다.

### 사용 가능한 서브패스

| 서브패스 | 포함 컴포넌트 |
|---------|-------------|
| `/button` | Button, ControlButton, FilterButton, AvatarButton, LinkButton, ButtonGroup |
| `/input` | Input |
| `/select` | Select, Combobox |
| `/checkbox` | Checkbox, CheckboxCard, CheckboxList |
| `/radio` | Radio, RadioGroup, RadioCard, RadioList |
| `/switch` | Switch, SwitchList |
| `/dialog` | Dialog, AlertDialog |
| `/tabs` | Tabs, TabsList, TabsTrigger, TabsContent |
| `/table` | Table, DataGrid |
| `/icons/icon` | Icon (UI 아이콘) |
| `/icons/brand` | BrandIcon |
| `/icons/flag` | FlagIcon |
| `/icons/file` | FileIcon |
| `/icons` | 모든 아이콘 컴포넌트 |
| `/styles` | CSS 스타일시트 |

---

## 🎯 프로젝트 목표

- 단일 글로벌 테마 기반 디자인 시스템 구축
- 디자인 토큰 중심(Token-first) 스타일링
- Figma(Sort UI)와 코드 간 1:1 매핑
- 재사용 가능하고 접근성 있는 UI 컴포넌트 제공
- Storybook을 통한 컴포넌트 문서화

---

## 📁 폴더 구조

```txt
src/
 ├─ components/        # UI 컴포넌트
 │   ├─ button/        # Button 컴포넌트
 │   │   ├─ Button.tsx
 │   │   ├─ Button.types.ts
 │   │   ├─ ButtonGroup.tsx
 │   │   ├─ ButtonGroup.types.ts
 │   │   ├─ index.ts
 │   │   └─ stories/   # Storybook 스토리
 │   │
 │   └─ table/         # Table 컴포넌트
 │       ├─ Table.tsx
 │       ├─ Table.types.ts
 │       ├─ DataGrid.tsx
 │       ├─ DataGrid.types.ts
 │       ├─ index.ts
 │       ├─ components/ # 내부 서브 컴포넌트
 │       ├─ hooks/      # 관련 훅
 │       └─ stories/    # Storybook 스토리
 │
 ├─ tokens/            # 디자인 토큰 (colors, spacing, radius 등)
 │   ├─ color.ts
 │   ├─ spacing.ts
 │   ├─ radius.ts
 │   ├─ effects.ts
 │   ├─ typography.ts
 │   ├─ source/        # Figma(Sort UI)에서 추출한 raw snapshot (json)
 │   └─ index.ts
 │
 ├─ icons/             # 아이콘 시스템 (SVG snapshot -> React components)
 │   ├─ Icon.tsx
 │   ├─ Icon.types.ts
 │   ├─ <category>/    # 카테고리별 폴더 (arrows, brands, flags, isometricIcon, ...)
 │   ├─ source/        # SVG raw snapshot (json)
 │   └─ index.ts
 │
 ├─ styles/            # 글로벌 스타일 및 유틸리티
 │   ├─ tokens/        # CSS 변수 정의
 │   ├─ utilities.css  # 커스텀 유틸리티 클래스
 │   └─ globals.css    # 글로벌 CSS
 │
 ├─ index.ts
 └─ main.tsx

.storybook/            # Storybook 설정
scripts/               # Figma/Remix 기반 아이콘 및 토큰 유틸 스크립트
```

---

## 🎨 디자인 토큰 규칙

- 모든 색상, 여백, radius, typography는 **tokens 폴더에서만 정의**합니다.
- 컴포넌트 내부에서 **raw 값(px, hex, rem 등)을 직접 사용하지 않습니다**.
- Figma(Sort UI)의 변수 구조를 최대한 그대로 반영합니다.

---

## 🎯 스타일링 시스템

본 프로젝트는 **Figma 토큰 → CSS 변수 → 유틸리티 클래스** 구조로 스타일링합니다.

### 토큰 구조

```
src/tokens/               # JS 토큰 (Tailwind 설정용)
src/styles/tokens/        # CSS 변수 (런타임 스타일용)
src/styles/utilities.css  # 유틸리티 클래스
```

### 유틸리티 클래스 네이밍 규칙

Tailwind 기본 클래스와의 충돌을 피하기 위해 **Figma 변수명과 일치하는 커스텀 유틸리티 클래스**를 사용합니다:

| 카테고리 | 클래스 예시 | CSS 변수 |
|---------|------------|----------|
| 여백 | `padding-4`, `padding-x-4`, `gap-4` | `--spacing-4` |
| 모서리 | `rounded-card-xs`, `rounded-2xs` | `--card-xs`, `--radius-2xs` |
| 색상 | `bg-card`, `text-subtle`, `border-darker` | `--bg-card`, `--text-subtle`, `--border-darker` |
| 타이포그래피 | `size-xs`, `line-height-leading-4`, `letter-spacing-tracking-normal` | `--size-xs`, `--line-height-leading-4`, `--letter-spacing-tracking-normal` |

### 사용 예시

```tsx
// Figma 스펙과 1:1 매칭되는 클래스 사용
<div className="padding-y-2 padding-x-4 gap-2 rounded-card-xs bg-card">
  <span className="size-xs line-height-leading-4 text-subtle">Label</span>
</div>
```

> 📖 자세한 내용은 [`src/styles/README.md`](./src/styles/README.md)를 참조하세요.

### 테마 시스템

4가지 테마를 지원하며, `data-theme` 속성으로 전환합니다:

| 테마 | 속성 값 | 설명 |
|-----|--------|------|
| Theme-A Light | (기본값) | 기본 라이트 테마 |
| Theme-A Dark | `data-theme="dark"` | 기본 다크 테마 |
| Theme-B Light | `data-theme="theme-b-light"` | 대체 라이트 테마 |
| Theme-B Dark | `data-theme="theme-b-dark"` | 대체 다크 테마 |

```tsx
// 테마 적용 예시
<html data-theme="dark">
  {/* 다크 테마 적용 */}
</html>
```

---

## 🧩 Icons (SVG → React Components)

아이콘은 **SVG 파일을 소스로 사용하여 React 컴포넌트를 자동 생성**합니다.

### 아이콘 구조

- **`src/icons/svg-source/`**: SVG 소스 파일 (source of truth)
  - 카테고리별 폴더 구조 (arrows, brands, flags, etc.)
  - 파일명은 kebab-case (예: `arrow-down.svg`, `brand-apple.svg`)
- **`src/icons/<category>/`**: 자동 생성된 React 컴포넌트
  - 각 SVG 파일에서 TSX 컴포넌트 자동 생성
  - 카테고리별 `index.ts` 자동 생성
  - 루트 `src/icons/index.ts`에서 전체 re-export
- **`src/icons/source/`**: 기존 JSON 메타데이터 (보존됨)

### 아이콘 생성 워크플로우

1. **Figma에서 SVG 내보내기**
   - Figma에서 아이콘을 SVG로 내보내기
   - `src/icons/svg-source/{category}/` 폴더에 저장
   - 파일명은 kebab-case로 작성 (예: `arrow-down-circle.svg`)

2. **아이콘 생성**
   ```bash
   npm run generate:icons
   ```
   - SVG 파일을 읽어서 TSX 컴포넌트 자동 생성
   - 컴포넌트명은 자동으로 PascalCase로 변환 (예: `ArrowDownCircleIcon`)
   - 모든 카테고리의 `index.ts` 파일 자동 업데이트

3. **기존 TSX에서 SVG 추출** (마이그레이션용, 최초 1회만 실행)
   ```bash
   npm run extract:icons
   ```
   - 기존 TSX 파일에서 SVG 내용 추출
   - `src/icons/svg-source/`에 저장

### 아이콘 생성 규칙

- **파일명 → 컴포넌트명 변환**: kebab-case → PascalCase
  - `arrow-down.svg` → `ArrowDownIcon`
  - `collapse-diagonal2fill.svg` → `CollapseDiagonal2FillIcon`
- **SVG 정규화**: 
  - `width`/`height` 속성 제거 (Icon 컴포넌트의 `size` prop으로 처리)
  - `viewBox` 및 `xmlns` 속성 보장
  - 자식 요소의 `fill` 속성 보존 (outline 아이콘의 `fill="none"`, 브랜드 아이콘의 고정 색상 등)
- **자동 생성 파일**: 모든 생성된 파일에는 `// This file is auto-generated. Do not edit manually.` 주석 포함

### 기존 아이콘 시스템 (레거시)

일부 아이콘은 여전히 JSON 스냅샷 기반으로 생성됩니다:

- **`src/icons/source/`**: 원본 SVG snapshot (json)
  - Sort UI: `sortui.flags.json`, `sortui.brands.json`, `sortui.file-icons.json`, `sortui.cursors.json`, `isocons.isometric.*.json`
  - Remix Icons: `remix.<category>.<line|fill>.json`


### 자주 쓰는 스크립트

- **SVG 기반 아이콘 생성** (권장)

```bash
# SVG 파일 추가 후 컴포넌트 생성
npm run generate:icons
```

- **기존 TSX에서 SVG 추출** (마이그레이션용)

```bash
npm run extract:icons
```

- **레거시: Icons index 재생성**

```bash
node scripts/regenerate-icons-index.mjs
```

- **레거시: Brands**

```bash
node scripts/generate-brands-icons.mjs
node scripts/regenerate-icons-index.mjs
```

- **File Icons**

```bash
node scripts/generate-file-icons.mjs
node scripts/regenerate-icons-index.mjs
```

- **Cursors**

```bash
node scripts/generate-cursors-icons.mjs
node scripts/regenerate-icons-index.mjs
```

- **Isometric Icons**

```bash
node scripts/generate-isometric-icons.mjs
node scripts/regenerate-icons-index.mjs
```

- **Flags (ISO code 기반)**

```bash
node scripts/generate-flags-icons.mjs
node scripts/regenerate-icons-index.mjs
```

## 🧩 컴포넌트 작성 규칙

1. 컴포넌트는 반드시 **Figma(Sort UI)에 존재해야 합니다**
2. 모든 컴포넌트는 Storybook 스토리를 포함해야 합니다
3. props는 명확한 TypeScript 타입으로 정의합니다
4. 접근성(aria, keyboard navigation)을 고려해야 합니다
5. 스타일은 Tailwind CSS 유틸리티 클래스와 CSS 변수를 사용합니다
6. **토큰 사용 필수**: 하드코딩된 색상/값 대신 `tokens/`에서 import한 토큰 사용

### 현재 구현된 컴포넌트

#### 레이아웃 & 네비게이션
- **Accordion**: 확장/축소 가능한 아코디언 아이템 (4가지 variant: default, soft, ghost, line, dark mode 지원)
- **AccordionGroup**: 아코디언 그룹 컴포넌트
- **Breadcrumbs**: 경로 탐색 컴포넌트
- **Divider**: 구분선 컴포넌트

#### 사용자 인터페이스
- **Avatar**: 사용자 아바타 (3가지 variant: initials, userpic, empty, 8가지 size, 2가지 shape, status badge 지원)
- **AvatarGroup**: 여러 아바타를 겹쳐서 표시 (stacking 모드, +N 오버레이 지원)
- **Badge**: 상태 표시 배지 컴포넌트
- **Chip**: 태그/필터용 칩 컴포넌트
- **Tooltip**: 툴팁 컴포넌트
- **Popover**: 팝오버 컴포넌트

#### 버튼
- **Button**: 기본 버튼 컴포넌트
- **AvatarButton**: 아바타가 포함된 버튼
- **ControlButton**: 컨트롤 버튼
- **FilterButton**: 필터 버튼
- **LinkButton**: 링크 스타일 버튼
- **ButtonGroup**: 버튼 그룹 컴포넌트

#### 폼 컴포넌트
- **Input**: 텍스트 입력 컴포넌트 (default, password, textarea variant 지원)
- **Checkbox**: 체크박스 컴포넌트
- **CheckboxCard**: 카드 형태 체크박스
- **CheckboxList**: 체크박스 리스트
- **CheckboxWithText**: 텍스트가 포함된 체크박스
- **Radio**: 라디오 버튼 컴포넌트
- **Select**: 셀렉트/드롭다운 컴포넌트 (단일 선택, 다중 선택, 태그 모드 지원)
- **Dropdown**: 드롭다운 메뉴 컴포넌트
- **Slider**: 슬라이더 컴포넌트

#### 날짜/시간
- **Calendar**: 달력 컴포넌트
- **DatePicker**: 날짜 선택 컴포넌트
- **DateRangePicker**: 날짜 범위 선택 컴포넌트

#### 테이블
- **Table**: HTML 테이블 기반 컴포넌트 (compositional 패턴, rowSpan/colSpan 지원, 페이지네이션, 스크롤/고정 헤더, 로딩 상태)
- **DataGrid**: 데이터 그리드 컴포넌트 (TanStack Table 기반, 정렬/필터/페이지네이션 자동 관리, 행 선택, 서버사이드 모드)

#### 다이얼로그
- **Dialog**: 다이얼로그/모달 컴포넌트
- **AlertDialog**: 확인/취소 다이얼로그 컴포넌트

#### 페이지네이션
- **Pagination**: 페이지네이션 컴포넌트 (numbered, dot, simple variant 지원)

#### 차트
- **Chart**: 기본 차트 컴포넌트
- **BarChart**: 막대 차트
- **LineChart**: 선 차트
- **PieChart**: 원형 차트
- **DonutChart**: 도넛 차트

---

## 📘 Storybook

Storybook은 디자인 시스템의 **공식 문서 및 컴포넌트 라이브러리**입니다.

모든 컴포넌트는 Storybook을 통해 문서화되며, 각 컴포넌트의 variant, props, 사용 예시를 확인할 수 있습니다.

### 접근 방법

- **로컬 개발**: `npm run storybook` 실행 후 `http://localhost:6006` 접속
- **정적 빌드**: `npm run build-storybook` 실행 후 `storybook-static/` 폴더 배포

---

## 🚫 금지 사항

- 컴포넌트 내부에서 하드코딩된 스타일 값 사용
- Figma에 없는 컴포넌트 생성
- Storybook 없이 컴포넌트 추가
- 테마 과도한 확장 (정의된 4가지 테마만 사용)

---

## 📦 NPM 스크립트

### 개발
```bash
npm run dev              # Vite 개발 서버 실행
npm run build            # 프로덕션 빌드
npm run preview          # 빌드 미리보기
npm run typecheck        # TypeScript 타입 체크
npm run lint             # ESLint 실행
```

### Storybook
```bash
npm run storybook        # Storybook 개발 서버 실행
npm run build-storybook  # Storybook 정적 빌드
```

### 아이콘 생성
```bash
npm run generate:icons              # SVG 기반 아이콘 생성 (권장)
npm run extract:icons               # 기존 TSX에서 SVG 추출
npm run generate:icon-registry      # 아이콘 레지스트리 생성
```

### 빌드 전 자동 실행
- `prebuild`: 아이콘 생성 → 아이콘 레지스트리 생성
- `prestorybook`: 아이콘 생성 → 아이콘 레지스트리 생성

---

---

## 🔗 리소스

- **GitHub Repository**: [mbisolution/blumnai-design-system](https://github.com/mbisolution/blumnai-design-system)
- **Figma Design Source**: Sort UI (내부 접근)
- **Storybook**: 로컬 실행 또는 정적 빌드

## 📌 참고

- 본 디자인 시스템은 **내부 사용 목적**이며, 외부 배포를 목표로 하지 않습니다.
- Sort UI는 디자인 레퍼런스로 사용되며, 라이선스 정책을 준수합니다.
- 모든 컴포넌트는 Figma(Sort UI)에 존재하는 디자인을 기반으로 구현됩니다.

---

## 👥 협업 가이드

- 디자이너: Figma(Sort UI) 컴포넌트 및 토큰 관리
- 개발자: 토큰 → 컴포넌트 → Storybook 순서로 구현

---

BlumnAI Design System은 **일관성, 유지보수성, 확장성**을 최우선 가치로 합니다.
