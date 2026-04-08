# 마이그레이션 가이드

## 버전 호환 매트릭스

| DS 버전 | React | Node | Tailwind | 패키지 스코프 |
|---------|-------|------|----------|--------------|
| 1.1.x   | 18+   | 20+  | v4       | `@blumnai-studio` |
| 1.0.x   | 18+   | 20+  | v4       | `@blumnai-studio` |
| 0.2.x   | 18+   | 18+  | v4       | `@mlbghoon` |

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

모든 소스 파일에서 import 경로를 일괄 변경합니다.

```bash
# macOS/Linux
find src -type f \( -name '*.ts' -o -name '*.tsx' \) \
  -exec sed -i '' 's/@mlbghoon\/blumnai-design-system/@blumnai-studio\/blumnai-design-system/g' {} +
```

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
