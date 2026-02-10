# Contributing to BlumnAI Design System

BlumnAI Design System 개발에 참여하기 위한 가이드입니다.

---

## 기술 스택

- **React + TypeScript**
- **Vite**
- **Storybook (v8.4.x)**
- **Tailwind CSS** (커스텀 유틸리티 클래스 + CSS 변수 기반)
- **Sort UI (Figma Design Source)**

---

## 빠른 시작

### 필수 요구사항

- Node.js: **v20.12.x**
- npm: **v10.x**

### 설치

```bash
git clone https://github.com/mbisolution/blumnai-design-system.git
cd blumnai-design-system

npm install

# 아이콘 생성 (빌드 전 필수)
npm run generate:icons

# 개발 서버 실행
npm run dev
```

### Storybook 실행

```bash
npm run storybook        # 개발 서버 실행 (http://localhost:6006)
npm run build-storybook  # 정적 빌드
```

⚠️ Node 버전 제한으로 인해 Storybook은 **8.4.x 버전으로 고정**되어 있습니다.

---

## 프로젝트 목표

- 단일 글로벌 테마 기반 디자인 시스템 구축
- 디자인 토큰 중심(Token-first) 스타일링
- Figma(Sort UI)와 코드 간 1:1 매핑
- 재사용 가능하고 접근성 있는 UI 컴포넌트 제공
- Storybook을 통한 컴포넌트 문서화

---

## 폴더 구조

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
 │   ├─ <category>/    # 카테고리별 폴더 (arrows, brands, flags, ...)
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

## 디자인 토큰 규칙

- 모든 색상, 여백, radius, typography는 **tokens 폴더에서만 정의**합니다.
- 컴포넌트 내부에서 **raw 값(px, hex, rem 등)을 직접 사용하지 않습니다**.
- Figma(Sort UI)의 변수 구조를 최대한 그대로 반영합니다.

---

## 스타일링 시스템

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

> 📖 자세한 내용은 [`src/styles/README.md`](./src/styles/README.md)를 참조하세요.

---

## Icons (SVG → React Components)

아이콘은 **SVG 파일을 소스로 사용하여 React 컴포넌트를 자동 생성**합니다.

### 아이콘 구조

- **`src/icons/svg-source/`**: SVG 소스 파일 (source of truth)
- **`src/icons/<category>/`**: 자동 생성된 React 컴포넌트
- **`src/icons/source/`**: 기존 JSON 메타데이터 (보존됨)

### 아이콘 생성 워크플로우

1. Figma에서 SVG 내보내기 → `src/icons/svg-source/{category}/` 폴더에 저장 (kebab-case)
2. `npm run generate:icons` 실행
3. 자동으로 TSX 컴포넌트 + `index.ts` 생성

### 아이콘 생성 규칙

- **파일명 → 컴포넌트명 변환**: kebab-case → PascalCase (예: `arrow-down.svg` → `ArrowDownIcon`)
- **SVG 정규화**: `width`/`height` 제거, `viewBox` 보장, `fill` 보존
- **자동 생성 파일**: `// This file is auto-generated. Do not edit manually.` 주석 포함

### 아이콘 스크립트

```bash
npm run generate:icons              # SVG 기반 아이콘 생성 (권장)
npm run extract:icons               # 기존 TSX에서 SVG 추출 (마이그레이션용)
npm run generate:ui-icon-registry   # 아이콘 레지스트리 생성
```

---

## 컴포넌트 작성 규칙

1. 컴포넌트는 반드시 **Figma(Sort UI)에 존재해야 합니다**
2. 모든 컴포넌트는 Storybook 스토리를 포함해야 합니다
3. props는 명확한 TypeScript 타입으로 정의합니다
4. 접근성(aria, keyboard navigation)을 고려해야 합니다
5. 스타일은 Tailwind CSS 유틸리티 클래스와 CSS 변수를 사용합니다
6. **토큰 사용 필수**: 하드코딩된 색상/값 대신 `tokens/`에서 import한 토큰 사용

---

## 금지 사항

- 컴포넌트 내부에서 하드코딩된 스타일 값 사용
- Figma에 없는 컴포넌트 생성
- Storybook 없이 컴포넌트 추가
- 테마 과도한 확장 (정의된 4가지 테마만 사용)

---

## NPM 스크립트

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
npm run generate:ui-icon-registry   # 아이콘 레지스트리 생성
```

### 빌드 전 자동 실행
- `prebuild`: 아이콘 생성 → 아이콘 레지스트리 생성
- `prestorybook`: 아이콘 생성 → 아이콘 레지스트리 생성

---

## 리소스

- **GitHub Repository**: [mbisolution/blumnai-design-system](https://github.com/mbisolution/blumnai-design-system)
- **Figma Design Source**: Sort UI (내부 접근)

---

## 참고

- 본 디자인 시스템은 **내부 사용 목적**이며, 외부 배포를 목표로 하지 않습니다.
- Sort UI는 디자인 레퍼런스로 사용되며, 라이선스 정책을 준수합니다.
- 모든 컴포넌트는 Figma(Sort UI)에 존재하는 디자인을 기반으로 구현됩니다.

---

## 협업 가이드

- 디자이너: Figma(Sort UI) 컴포넌트 및 토큰 관리
- 개발자: 토큰 → 컴포넌트 → Storybook 순서로 구현
