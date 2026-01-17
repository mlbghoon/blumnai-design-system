# BlumnAI Design System

BlumnAI Design System은 BlumnAI 제품 전반에서 사용되는 **공통 UI 컴포넌트와 디자인 규칙을 관리하기 위한 React 기반 디자인 시스템**입니다.

본 프로젝트는 디자이너(Figma / Sort UI)와 프런트엔드 개발자 간의 일관된 협업을 목표로 하며, Storybook을 통해 문서화됩니다.

---

## 📦 기술 스택

- **React + TypeScript**
- **Vite**
- **Storybook (v8.4.x)**
- **Vanilla Extract (CSS-in-TypeScript)**
- **Sort UI (Figma Design Source)**

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
 │   ├─ accordion/     # Accordion 컴포넌트
 │   │   └─ AccordionItem/
 │   │       ├─ AccordionItem.tsx
 │   │       ├─ AccordionItem.css.ts
 │   │       ├─ AccordionItem.types.ts
 │   │       └─ index.ts
 │   │
 │   └─ avatar/        # Avatar 컴포넌트
 │       ├─ Avatar/
 │       │   ├─ Avatar.tsx
 │       │   ├─ Avatar.css.ts
 │       │   ├─ Avatar.types.ts
 │       │   └─ index.ts
 │       ├─ AvatarGroup/
 │       │   ├─ AvatarGroup.tsx
 │       │   ├─ AvatarGroup.css.ts
 │       │   ├─ AvatarGroup.types.ts
 │       │   └─ index.ts
 │       └─ index.ts
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
 ├─ styles/            # 글로벌 스타일
 │   └─ global.css.ts
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

### Figma REST API 사용 (필수)

대량 export는 Figma Desktop MCP rate limit을 피하기 위해 **Figma REST API(PAT)**를 사용합니다.

```bash
export FIGMA_TOKEN="<your_figma_pat>"
```

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
node scripts/fetch-figma-brands.mjs
node scripts/generate-brands-icons.mjs
node scripts/regenerate-icons-index.mjs
```

- **File Icons**

```bash
node scripts/fetch-figma-file-icons.mjs
node scripts/generate-file-icons.mjs
node scripts/regenerate-icons-index.mjs
```

- **Cursors**

```bash
node scripts/fetch-figma-cursors.mjs
node scripts/generate-cursors-icons.mjs
node scripts/regenerate-icons-index.mjs
```

- **Isometric Icons**

```bash
# frameName: "Top" or "Left"
node scripts/fetch-figma-isometric-top.mjs Top
node scripts/fetch-figma-isometric-top.mjs Left
node scripts/generate-isometric-icons.mjs
node scripts/regenerate-icons-index.mjs
```

- **Flags (ISO code 기반)**

```bash
node scripts/fetch-figma-flags.mjs
node scripts/generate-flags-icons.mjs
node scripts/regenerate-icons-index.mjs
```

## 🧩 컴포넌트 작성 규칙

1. 컴포넌트는 반드시 **Figma(Sort UI)에 존재해야 합니다**
2. 모든 컴포넌트는 Storybook 스토리를 포함해야 합니다
3. props는 명확한 TypeScript 타입으로 정의합니다
4. 접근성(aria, keyboard navigation)을 고려해야 합니다
5. 스타일은 Vanilla Extract만 사용합니다
6. **토큰 사용 필수**: 하드코딩된 색상/값 대신 `tokens/`에서 import한 토큰 사용

### 현재 구현된 컴포넌트

- **Accordion**: 확장/축소 가능한 아코디언 아이템 (4가지 variant: default, soft, ghost, line, dark mode 지원)
- **Avatar**: 사용자 아바타 (3가지 variant: initials, userpic, empty, 8가지 size, 2가지 shape, status badge 지원)
- **AvatarGroup**: 여러 아바타를 겹쳐서 표시 (stacking 모드, +N 오버레이 지원)

---

## 📘 Storybook

Storybook은 디자인 시스템의 **공식 문서**입니다.

### 실행

```bash
npm run storybook
```

### 빌드

```bash
npm run build-storybook
```

---

## 🚫 금지 사항

- 컴포넌트 내부에서 하드코딩된 스타일 값 사용
- Figma에 없는 컴포넌트 생성
- Storybook 없이 컴포넌트 추가
- 테마 과도한 확장 (v1은 단일 테마만 허용)

---

## 🛠 개발 환경

- Node.js: **v20.12.x**
- npm: **v10.x**

⚠️ Node 버전 제한으로 인해 Storybook은 **8.4.x 버전으로 고정**되어 있습니다.

---

## 📌 참고

- 본 디자인 시스템은 **내부 사용 목적**이며, 외부 배포를 목표로 하지 않습니다.
- Sort UI는 디자인 레퍼런스로 사용되며, 라이선스 정책을 준수합니다.

---

## 👥 협업 가이드

- 디자이너: Figma(Sort UI) 컴포넌트 및 토큰 관리
- 개발자: 토큰 → 컴포넌트 → Storybook 순서로 구현

---

BlumnAI Design System은 **일관성, 유지보수성, 확장성**을 최우선 가치로 합니다.
