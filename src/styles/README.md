# 스타일 시스템

이 문서는 BlumnAI 디자인 시스템의 스타일링 시스템을 설명합니다. Figma 토큰, CSS 변수, Tailwind, 유틸리티 클래스 간의 관계를 다룹니다.

## 개요

스타일링 시스템은 Figma 디자인과 코드 구현 간의 일관성을 보장하는 **토큰 우선(token-first)** 접근 방식을 따릅니다:

```
Figma 변수 → JS 토큰 → CSS 변수 → 유틸리티 클래스 → 컴포넌트
```

## 디렉토리 구조

```
src/
├── tokens/                    # JS 토큰 (Tailwind 설정용)
│   ├── color.ts
│   ├── spacing.ts
│   ├── radius.ts
│   ├── typography.ts
│   ├── effects.ts
│   └── index.ts
│
├── styles/
│   ├── tokens/               # CSS 변수 정의
│   │   ├── colors.css        # 색상 변수 (--bg-*, --text-*, --border-*)
│   │   ├── typography.css    # 타이포그래피 변수 (--size-*, --weight-*, --line-height-*)
│   │   ├── spacing.css       # 여백 변수 (--spacing-*)
│   │   ├── radius.css        # 모서리 변수 (--radius-*, --card-*)
│   │   └── fonts.css         # 폰트 패밀리 정의
│   │
│   └── utilities.css         # CSS 변수를 사용하는 유틸리티 클래스
│
└── index.css                 # 메인 진입점 (모든 토큰 + 유틸리티 import)
```

## 커스텀 유틸리티 클래스를 사용하는 이유

Tailwind CSS는 자체 여백 스케일을 사용하여 유틸리티 클래스를 생성합니다 (예: `py-2` = `0.5rem`). 하지만 우리 디자인 시스템은 **Figma의 정확한 픽셀 값**을 사용합니다 (예: `--spacing-2` = `2px`).

충돌을 피하고 Figma와 정확히 일치하는 스타일링을 위해 **커스텀 유틸리티 클래스**를 정의합니다:

1. Tailwind 충돌을 피하기 위한 다른 네이밍 규칙 사용
2. CSS 변수를 직접 참조
3. Figma 변수명과 정확히 일치

## 토큰 카테고리

### 1. 여백 (Spacing)

**CSS 변수** (`spacing.css`):
```css
:root {
  --spacing-none: 0px;
  --spacing-1: 1px;
  --spacing-2: 2px;
  --spacing-4: 4px;
  --spacing-6: 6px;
  --spacing-8: 8px;
  /* ... */
}
```

**유틸리티 클래스** (`utilities.css`):
| 클래스 | CSS 속성 | 값 |
|-------|---------|-----|
| `padding-2` | `padding` | `var(--spacing-2)` (2px) |
| `padding-4` | `padding` | `var(--spacing-4)` (4px) |
| `padding-x-4` | `padding-left`, `padding-right` | `var(--spacing-4)` |
| `padding-y-2` | `padding-top`, `padding-bottom` | `var(--spacing-2)` |
| `gap-2` | `gap` | `var(--spacing-2)` |
| `gap-4` | `gap` | `var(--spacing-4)` |

**사용 예시:**
```tsx
// Figma: padding: var(--2, 2px) var(--4, 4px); gap: var(--2, 2px);
<div className="padding-y-2 padding-x-4 gap-2">
```

### 2. 모서리 (Border Radius)

**CSS 변수** (`radius.css`):
```css
:root {
  /* 글로벌 Radius */
  --radius-none: 0px;
  --radius-2xs: 2px;
  --radius-xs: 4px;
  --radius-sm: 6px;
  --radius-md: 8px;
  /* ... */

  /* 카드 Radius */
  --card-none: 0px;
  --card-xs: 4px;
  --card-sm: 8px;
  --card-md: 12px;
  --card-lg: 16px;
}
```

**유틸리티 클래스:**
| 클래스 | CSS 속성 | 값 |
|-------|---------|-----|
| `rounded-2xs` | `border-radius` | `var(--radius-2xs)` (2px) |
| `rounded-xs` | `border-radius` | `var(--radius-xs)` (4px) |
| `rounded-card-xs` | `border-radius` | `var(--card-xs)` (4px) |
| `rounded-card-sm` | `border-radius` | `var(--card-sm)` (8px) |

**사용 예시:**
```tsx
// Figma: border-radius: var(--Card-xs, 4px);
<div className="rounded-card-xs">
```

### 3. 색상 (Colors)

**CSS 변수** (`colors.css`):
```css
:root {
  /* 배경 */
  --bg-default: #ffffff;
  --bg-card: #ffffff;
  --bg-subtle: #fafafa;

  /* 텍스트 */
  --text-default: #18181b;
  --text-subtle: #4e4e55;
  --text-muted: rgba(255, 255, 255, 0.50);

  /* 테두리 */
  --border-default: rgba(255, 255, 255, 0.10);
  --border-darker: rgba(0, 0, 0, 0.15);
}
```

**유틸리티 클래스:**
| 클래스 | CSS 속성 | 값 |
|-------|---------|-----|
| `bg-card` | `background-color` | `var(--bg-card)` |
| `bg-default` | `background-color` | `var(--bg-default)` |
| `text-subtle` | `color` | `var(--text-subtle)` |
| `text-muted` | `color` | `var(--text-muted)` |
| `border-darker` | `border-color` | `var(--border-darker)` |

**사용 예시:**
```tsx
// Figma: background: var(--bg-card); color: var(--text-subtle);
<div className="bg-card text-subtle">
```

### 4. 타이포그래피 (Typography)

**CSS 변수** (`typography.css`):
```css
:root {
  /* 폰트 크기 */
  --size-xs: 12px;
  --size-sm: 14px;
  --size-md: 16px;

  /* 줄 높이 */
  --line-height-leading-4: 16px;
  --line-height-leading-5: 20px;

  /* 자간 */
  --letter-spacing-tracking-tight: -0.8px;
  --letter-spacing-tracking-normal: -0.6px;

  /* 폰트 굵기 */
  --weight-normal: 400;
  --weight-medium: 500;
}
```

**유틸리티 클래스:**
| 클래스 | CSS 속성 | 값 |
|-------|---------|-----|
| `size-xs` | `font-size` | `var(--size-xs)` (12px) |
| `size-sm` | `font-size` | `var(--size-sm)` (14px) |
| `line-height-leading-4` | `line-height` | `var(--line-height-leading-4)` (16px) |
| `letter-spacing-tracking-normal` | `letter-spacing` | `var(--letter-spacing-tracking-normal)` (-0.6px) |

**사용 예시:**
```tsx
// Figma: font-size: var(--size-xs); line-height: var(--line-height-leading-4); letter-spacing: var(--letter-spacing-tracking-normal);
<span className="size-xs line-height-leading-4 letter-spacing-tracking-normal">
```

### 5. 그림자 (Shadows)

**CSS 변수** (`effects.ts`에서 정의, `utilities.css`에서 사용):
```css
.shadow-card {
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 1px,
              inset 0px -1px 0px rgba(0, 0, 0, 0.10);
}

.shadow-modal-sm {
  box-shadow: 0px 1px 1px -0.5px rgba(0, 0, 0, 0.04),
              0px 3px 3px -1.5px rgba(0, 0, 0, 0.04),
              0px 6px 6px -3px rgba(0, 0, 0, 0.04),
              0px 12px 12px -6px rgba(0, 0, 0, 0.04),
              0px 0px 0px 1px var(--border-default);
}
```

## 네이밍 규칙 요약

| Figma 변수 | CSS 변수 | 유틸리티 클래스 |
|-----------|---------|---------------|
| `--2` | `--spacing-2` | `padding-2`, `gap-2` |
| `--4` | `--spacing-4` | `padding-4`, `padding-x-4` |
| `--Card-xs` | `--card-xs` | `rounded-card-xs` |
| `--2xs` | `--radius-2xs` | `rounded-2xs` |
| `--bg-card` | `--bg-card` | `bg-card` |
| `--text-subtle` | `--text-subtle` | `text-subtle` |
| `--size-xs` | `--size-xs` | `size-xs` |
| `--line-height-leading-4` | `--line-height-leading-4` | `line-height-leading-4` |
| `--letter-spacing-tracking-normal` | `--letter-spacing-tracking-normal` | `letter-spacing-tracking-normal` |

## 전체 예시

**Figma CSS:**
```css
.tooltip {
  display: inline-flex;
  padding: var(--2, 2px) var(--4, 4px);
  justify-content: center;
  align-items: center;
  gap: var(--2, 2px);
  border-radius: var(--Card-xs, 4px);
  background: var(--bg-card, #222225);
  box-shadow: /* shadow-modal-sm */;
}

.tooltip-text {
  color: var(--text-subtle);
  font-size: var(--size-xs, 12px);
  font-weight: var(--weight-medium, 500);
  line-height: var(--line-height-leading-4, 16px);
  letter-spacing: var(--letter-spacing-tracking-normal, -0.6px);
}
```

**React 컴포넌트:**
```tsx
<div className="inline-flex items-center justify-center padding-y-2 padding-x-4 gap-2 rounded-card-xs bg-card shadow-modal-sm">
  <span className="size-xs font-medium line-height-leading-4 letter-spacing-tracking-normal text-subtle">
    Tooltip text
  </span>
</div>
```

## 새 토큰 추가하기

1. `src/styles/tokens/` 하위의 적절한 파일에 **CSS 변수 추가**
2. `src/styles/utilities.css`에 **유틸리티 클래스 추가**
3. (Tailwind 설정이 필요한 경우) `src/tokens/`에 **JS 토큰 업데이트**

## 테마 시스템

### 지원 테마

4가지 테마를 지원하며, HTML 요소의 `data-theme` 속성으로 전환합니다:

| 테마 | 선택자 | 설명 |
|-----|--------|------|
| Theme-A Light | `:root` (기본값) | 기본 라이트 테마 |
| Theme-A Dark | `[data-theme="dark"]` | 기본 다크 테마 |
| Theme-B Light | `[data-theme="theme-b-light"]` | 대체 라이트 테마 (웜톤) |
| Theme-B Dark | `[data-theme="theme-b-dark"]` | 대체 다크 테마 (웜톤) |

### 테마 적용 방법

```tsx
// 방법 1: HTML 속성으로 적용
<html data-theme="dark">
  <body>
    {/* 전체 앱에 다크 테마 적용 */}
  </body>
</html>

// 방법 2: 특정 영역에만 적용
<div data-theme="dark">
  {/* 이 영역만 다크 테마 */}
</div>

// 방법 3: JavaScript로 동적 전환
document.documentElement.setAttribute('data-theme', 'dark');
```

### 테마 구조 (`colors.css`)

```css
/* Theme-A Light (기본값) */
:root {
  --bg-card: #ffffff;
  --text-default: #111115;
  --border-default: rgba(39, 39, 42, 0.10);
  /* ... */
}

/* Theme-A Dark */
[data-theme="dark"] {
  --bg-card: #222225;
  --text-default: #ffffff;
  --border-default: rgba(255, 255, 255, 0.10);
  /* ... */
}

/* Theme-B Light */
[data-theme="theme-b-light"] {
  --bg-card: #ffffff;
  --text-default: #1c1917;
  /* ... 웜톤 색상 */
}

/* Theme-B Dark */
[data-theme="theme-b-dark"] {
  --bg-card: #301108;
  --text-default: #ffffff;
  /* ... 웜톤 색상 */
}
```

### 테마 작동 원리

1. **CSS 변수 재정의**: 각 테마는 동일한 CSS 변수명을 다른 값으로 재정의합니다
2. **자동 적용**: 유틸리티 클래스는 CSS 변수를 참조하므로, 테마 전환 시 자동으로 색상이 변경됩니다
3. **컴포넌트 독립성**: 컴포넌트는 테마를 인식할 필요 없이 `bg-card`, `text-default` 등의 시맨틱 클래스만 사용합니다

```tsx
// 테마와 무관하게 동일한 클래스 사용
<div className="bg-card text-default border-default">
  {/* 라이트 테마: 흰색 배경, 검정 텍스트 */}
  {/* 다크 테마: 어두운 배경, 흰색 텍스트 */}
</div>
```

### 테마별 색상 예시

| CSS 변수 | Theme-A Light | Theme-A Dark | Theme-B Light | Theme-B Dark |
|---------|---------------|--------------|---------------|--------------|
| `--bg-card` | `#ffffff` | `#222225` | `#ffffff` | `#301108` |
| `--text-default` | `#111115` | `#ffffff` | `#1c1917` | `#ffffff` |
| `--border-default` | `rgba(39,39,42,0.10)` | `rgba(255,255,255,0.10)` | `rgba(28,25,23,0.10)` | `rgba(255,255,255,0.10)` |

## Tailwind 통합

Tailwind는 다음 용도로 계속 사용됩니다:
- 레이아웃 유틸리티 (`flex`, `inline-flex`, `items-center`, `justify-center` 등)
- 디스플레이 유틸리티 (`hidden`, `block` 등)
- 포지션 유틸리티 (`relative`, `absolute` 등)
- 충돌하지 않는 사이징 유틸리티 (`w-4`, `h-4`, `min-h-5` 등)

커스텀 유틸리티가 Tailwind를 오버라이드하는 항목:
- 여백 (`padding-*`, `gap-*`)
- 모서리 (`rounded-*`)
- 색상 (`bg-*`, `text-*`, `border-*`)
- 타이포그래피 (`size-*`, `line-height-*`, `letter-spacing-*`)

## shadcn/ui 통합

### CSS 변수 브릿지

shadcn/ui는 `--primary`, `--background` 등의 CSS 변수를 사용합니다. 우리 디자인 시스템과 연동하기 위해 `shadcn-bridge.css`에서 매핑합니다:

**파일**: `src/styles/tokens/shadcn-bridge.css`

```css
:root {
  /* shadcn 변수 → 우리 토큰 */
  --background: var(--bg-default);
  --foreground: var(--text-default);
  --primary: var(--bg-state-primary);
  --primary-foreground: var(--text-white-default);
  --muted: var(--bg-muted);
  --muted-foreground: var(--text-muted);
  --border: var(--border-default);
  /* ... */
}
```

### 매핑 테이블

| shadcn 변수 | 우리 토큰 | 라이트 모드 값 |
|------------|----------|--------------|
| `--background` | `--bg-default` | #FFFFFF |
| `--foreground` | `--text-default` | #111115 |
| `--primary` | `--bg-state-primary` | #437DFC |
| `--primary-foreground` | `--text-white-default` | #FFFFFF |
| `--secondary` | `--bg-state-secondary` | #FFFFFF |
| `--muted` | `--bg-muted` | #F4F4F5 |
| `--muted-foreground` | `--text-muted` | #6F6F77 |
| `--accent` | `--bg-state-soft` | rgba(39,39,42,0.06) |
| `--destructive` | `--bg-state-destructive` | #E74341 |
| `--border` | `--border-default` | rgba(39,39,42,0.1) |
| `--ring` | `--border-highlight` | rgba(101,160,253,0.4) |

### shadcn 컴포넌트 커스터마이징

shadcn 컴포넌트 추가 후, 다음 클래스를 교체해야 합니다:

| shadcn 클래스 | 교체할 클래스 |
|--------------|-------------|
| `text-sm` | `size-sm` |
| `text-lg` | `size-lg` |
| `leading-*` | `line-height-leading-*` |
| `tracking-*` | `letter-spacing-tracking-*` |
| `p-4` | `padding-16` |
| `px-4` | `padding-x-16` |
| `py-2` | `padding-y-8` |
| `gap-2` | `gap-8` |
| `h-9` | `height-36` |
| `h-10` | `height-40` |

### shadcn 컴포넌트 위치

- 컴포넌트: `src/components/ui/`
- 훅: `src/hooks/`
- 브릿지 CSS: `src/styles/tokens/shadcn-bridge.css`
