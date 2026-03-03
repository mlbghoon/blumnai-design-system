# 계획: 디자인 시스템 배포 전략

> **참고**: 구현 전 팀 검토를 위해 이 계획을 `docs/distribution-plan-ko.md`에 저장했습니다.

## 개요

blumnai-design-system을 회사 전체에 배포하기 위한 설정:
- **프론트엔드 개발자**: 프라이빗 npm 레지스트리를 통해 설치
- **디자이너**: Storybook 문서 + Figma 연동 접근

---

## 파트 1: 개발자용 NPM 패키지

### 1.1 라이브러리 진입점 생성

모든 공개 컴포넌트를 내보내는 `src/index.ts` 생성:

```ts
// 컴포넌트
export * from './components/button';
export * from './components/input';
export * from './components/checkbox';
// ... 모든 컴포넌트

// 아이콘
export * from './components/icons';

// 훅
export * from './hooks';

// 타입
export type { ... } from './components/...';
```

### 1.2 Vite 라이브러리 빌드 설정

`vite.config.ts`에 라이브러리 빌드 모드 추가:

```ts
import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const isLibraryBuild = mode === 'lib';

  return {
    plugins: [react()],
    build: isLibraryBuild
      ? {
          lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            formats: ['es', 'cjs'],
          },
          rollupOptions: {
            external: (id) => {
              // 상대/절대 경로가 아닌 모든 import를 external 처리 (node_modules)
              if (id.startsWith('.') || path.isAbsolute(id)) return false;
              return true;
            },
            output: [
              {
                format: 'es',
                dir: 'dist',
                entryFileNames: '[name].mjs',
                preserveModules: true,
                preserveModulesRoot: 'src',
              },
              {
                format: 'cjs',
                dir: 'dist',
                entryFileNames: '[name].cjs',
                exports: 'named',
                preserveModules: true,
                preserveModulesRoot: 'src',
              },
            ],
          },
          sourcemap: true,
          cssCodeSplit: false,
          copyPublicDir: false,
          minify: 'esbuild',
        }
      : {},
  };
});
```

### 1.3 package.json 업데이트

```json
{
  "name": "@blumnai-studio/blumnai-design-system",
  "version": "1.0.0",
  "private": false,
  "type": "module",
  "main": "./dist/index.cjs",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.mjs",
      "require": "./dist/index.cjs"
    },
    "./*": {
      "import": "./dist/*.mjs",
      "require": "./dist/*.cjs"
    },
    "./styles": "./dist/blumnai-design-system.css"
  },
  "files": [
    "dist",
    "README.md"
  ],
  "peerDependencies": {
    "react": "^18.0.0 || ^19.0.0",
    "react-dom": "^18.0.0 || ^19.0.0"
  },
  "scripts": {
    "build:lib": "vite build --mode lib",
    "prepublishOnly": "npm run build:lib"
  },
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  }
}
```

### 1.4 vite-plugin-dts 추가

```bash
npm install -D vite-plugin-dts
```

### 1.5 GitHub Packages 설정

> **결정사항**: 프라이빗 npm 호스팅으로 **GitHub Packages** 사용

GitHub Packages는 GitHub 저장소에서 직접 npm 패키지를 호스팅합니다. 프라이빗 repo는 무료, 설정 쉬움.

**1단계: package.json 업데이트**

```json
{
  "name": "@blumnai-studio/blumnai-design-system",
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  }
}
```

**2단계: 프로젝트 루트에 `.npmrc` 파일 생성**

```ini
@blumnai-studio:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

**3단계: Personal Access Token 생성**

1. GitHub.com → 프로필 → Settings → Developer settings
2. "Personal access tokens" → "Tokens (classic)" 클릭
3. "Generate new token (classic)" 클릭
4. 이름: "npm-publish"
5. 권한 선택:
   - `write:packages` (게시용)
   - `read:packages` (다운로드용)
   - `delete:packages` (선택사항)
6. "Generate token" 클릭
7. **토큰 즉시 복사!**

**4단계: 토큰 저장**

쉘 프로필 (`~/.zshrc` 또는 `~/.bashrc`)에 추가:
```bash
export GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

실행:
```bash
source ~/.zshrc
```

**5단계: 게시**

> ⚠️ 이 프로젝트는 `GITHUB_TOKEN_BLUMNAI` 환경 변수를 사용합니다.

```bash
source ~/.zshrc 2>/dev/null; npm publish
```

**팀원이 설치하려면:**

**1. GitHub Personal Access Token 생성**

1. [GitHub.com](https://github.com) 로그인
2. 우측 상단 프로필 아이콘 클릭 → **Settings** 클릭
3. 왼쪽 메뉴 맨 아래 **Developer settings** 클릭
4. **Personal access tokens** → **Tokens (classic)** 클릭
5. **Generate new token (classic)** 클릭
6. Note(이름)에 `design-system` 입력
7. **Expiration**: 원하는 만료일 선택 (예: 90 days)
8. 권한에서 `read:packages`에 체크 ✅
9. 맨 아래 **Generate token** 클릭
10. ⚠️ **생성된 토큰(`ghp_`로 시작)을 지금 바로 복사하세요!** 페이지를 벗어나면 다시 볼 수 없습니다.

**2. 홈 폴더에 `.npmrc` 파일 만들기**

아래에서 본인 운영체제에 맞는 방법을 따라하세요.
`YOUR_TOKEN` 부분만 위에서 복사한 토큰으로 바꿔주세요.

> ⚠️ **토큰을 갱신할 때:** 이미 `.npmrc` 파일이 있다면, 아래 명령어를 다시 실행하면 줄이 중복으로 추가됩니다.
> 토큰을 바꿀 때는 기존 `.npmrc` 파일을 먼저 삭제하고 다시 만드세요.
> - 맥/리눅스: `rm ~/.npmrc` 후 아래 명령어 실행
> - 윈도우: `Remove-Item "$env:USERPROFILE\.npmrc"` 후 아래 명령어 실행

<details>
<summary><b>🍎 맥(macOS) / 리눅스(Linux)</b></summary>

**Terminal** 앱을 열고 아래 명령어를 **한 줄씩** 실행:

```bash
echo "@blumnai-studio:registry=https://npm.pkg.github.com" >> ~/.npmrc
```
```bash
echo "//npm.pkg.github.com/:_authToken=YOUR_TOKEN" >> ~/.npmrc
```

**확인:** `cat ~/.npmrc` 실행 후 **정확히 아래 두 줄만** 보이면 성공:
```
@blumnai-studio:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=ghp_xxxx...
```

만약 같은 줄이 여러 번 반복된다면, 파일을 초기화하세요:
```bash
rm ~/.npmrc
```
그리고 위의 `echo` 명령어 두 줄을 다시 실행하세요.

</details>

<details>
<summary><b>🪟 윈도우(Windows)</b></summary>

**PowerShell**을 열고 아래 명령어를 **한 줄씩** 실행:

```powershell
Add-Content -Path "$env:USERPROFILE\.npmrc" -Value "@blumnai-studio:registry=https://npm.pkg.github.com"
```
```powershell
Add-Content -Path "$env:USERPROFILE\.npmrc" -Value "//npm.pkg.github.com/:_authToken=YOUR_TOKEN"
```

**확인:** `Get-Content "$env:USERPROFILE\.npmrc"` 실행 후 **정확히 아래 두 줄만** 보이면 성공:
```
@blumnai-studio:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=ghp_xxxx...
```

만약 같은 줄이 여러 번 반복된다면, 파일을 초기화하세요:
```powershell
Remove-Item "$env:USERPROFILE\.npmrc"
```
그리고 위의 `Add-Content` 명령어 두 줄을 다시 실행하세요.

</details>

> **참고:** `$env:USERPROFILE`은 보통 `C:\Users\본인이름` 폴더입니다.

</details>

> **이 명령어가 하는 일:** 홈 폴더에 `.npmrc`라는 설정 파일을 만들어서,
> npm이 `@blumnai-studio` 패키지를 GitHub에서 다운로드할 수 있도록 인증 정보를 저장합니다.

**3. 프로젝트에 설치**

본인 프로젝트 폴더에서 실행:
```bash
npm install @blumnai-studio/blumnai-design-system --legacy-peer-deps
```

**4. CSS 불러오기 (필수)**

프로젝트의 진입점 파일(예: `main.tsx`, `App.tsx`, `layout.tsx`)에 아래 한 줄을 추가:
```tsx
import '@blumnai-studio/blumnai-design-system/styles';
```

**5. 컴포넌트 사용**
```tsx
import { Button, Input } from '@blumnai-studio/blumnai-design-system';
```

---

#### 중요: 토큰을 절대 커밋하지 마세요!

프로젝트 `.npmrc`는 `${GITHUB_TOKEN}` 환경 변수를 사용합니다. 각 개발자가 자신의 토큰을 로컬에 설정합니다.

---

## 파트 2: 디자이너용 Storybook 배포

### 2.1 배포 옵션

| 옵션 | 장점 | 단점 |
|--------|------|------|
| **Chromatic** | Storybook 전용, 비주얼 테스팅 포함 | 프라이빗은 유료 |
| **Vercel** | 무료, 쉬운 GitHub 연동 | 유료 아니면 공개 |
| **내부 호스팅** | 완전한 제어, 프라이빗 | 인프라 필요 |
| **GitHub Pages** | 무료, 자동화 | 공개만 가능 |

**권장사항**: 회사 내부 호스팅에 배포하거나 팀 접근 권한이 있는 Vercel/Netlify 사용.

### 2.2 빌드 명령어

이미 설정됨:
```bash
npm run build-storybook  # storybook-static/에 출력
```

### 2.3 배포 스크립트 (Vercel 사용 시)

`vercel.json` 추가:
```json
{
  "buildCommand": "npm run build-storybook",
  "outputDirectory": "storybook-static",
  "framework": null
}
```

---

## 파트 3: Figma-코드 동기화 (이미 구현됨)

프로젝트에 이미 있는 것:
- `scripts/fetch-figma.mjs` - Figma에서 컴포넌트 스펙 가져오기
- `src/tokens/`의 Figma와 동기화된 디자인 토큰
- 색상, 타이포그래피, 간격 토큰

**디자이너용**: Figma 파일 링크와 토큰이 코드로 흐르는 방식 문서화.

---

## 파트 4: 선택적 CI/CD (GitHub Actions)

나중에 자동화하기로 결정하면 `.github/workflows/release.yml` 생성:

```yaml
name: Release

on:
  push:
    tags:
      - 'v*'

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          registry-url: 'https://npm.pkg.github.com'

      - run: npm ci
      - run: npm run typecheck
      - run: npm run lint
      - run: npm run build:lib

      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

---

## 구현 단계

### 1단계: 라이브러리 설정 (필수)
1. [ ] `src/index.ts` 진입점 생성
2. [ ] `vite-plugin-dts` 설치
3. [ ] `vite.config.ts` 라이브러리 빌드 설정 추가
4. [ ] `package.json` exports와 퍼블리싱 설정 추가
5. [ ] `.npmrc` 프라이빗 레지스트리 설정 생성
6. [ ] 빌드 테스트: `npm run build:lib`
7. [ ] 다른 프로젝트에서 로컬 설치 테스트

### 2단계: 문서화 (필수)
1. [ ] 선택한 플랫폼에 Storybook 배포
2. [ ] 팀에 Storybook URL 공유
3. [ ] 개발자용 설치 안내 문서화:
   ```bash
   npm install @blumnai-studio/blumnai-design-system --legacy-peer-deps
   ```
   ```tsx
   import { Button, Input } from '@blumnai-studio/blumnai-design-system';
   import '@blumnai-studio/blumnai-design-system/styles';
   ```

### 3단계: 자동화 (선택, 나중에)
1. [ ] 자동 퍼블리싱용 GitHub Actions 설정
2. [ ] 시맨틱 버저닝 설정 (semantic-release 또는 수동)
3. [ ] CHANGELOG.md 추가

---

## 생성/수정할 파일

| 파일 | 작업 |
|------|--------|
| `src/index.ts` | 생성 - 라이브러리 진입점 |
| `vite.config.ts` | 수정 - 라이브러리 빌드 설정 추가 |
| `package.json` | 수정 - exports, files, peerDeps 추가 |
| `.npmrc` | 생성 - 프라이빗 레지스트리 설정 |
| `vercel.json` 또는 호스팅 설정 | 생성 - Storybook 배포 |
| `.github/workflows/release.yml` | 생성 (선택) - CI/CD |

---

## 검증

1. **빌드 테스트**: `npm run build:lib`가 `dist/`에 `.mjs` (ESM), `.cjs` (CJS), `.d.ts` 파일 생성
2. **로컬 테스트**: 테스트 프로젝트에 설치하고 컴포넌트 import
3. **Storybook**: 배포된 URL 접속하여 모든 컴포넌트 렌더링 확인
4. **퍼블리시 테스트**: `npm publish --dry-run`으로 패키지 내용 확인

---

## 크로스 프로젝트 호환성

이 계획은 다양한 환경을 처리합니다:

### Node.js 버전 (16, 18, 20+)
✅ **문제 없음** - 컴파일된 출력(ESM/CJS)은 Node 전용 API 없이 표준 JavaScript 사용. Node 16+ 호환.

### React 버전 (18.x, 19.x)
✅ **처리됨** `peerDependencies` 통해:
```json
"peerDependencies": {
  "react": "^18.0.0 || ^19.0.0",
  "react-dom": "^18.0.0 || ^19.0.0"
}
```
각 프로젝트는 자체 React 버전 사용; 디자인 시스템은 React를 번들하지 않음.

### 다양한 번들러 (Vite, Webpack, Next.js 등)
✅ **처리됨** 듀얼 포맷 출력 통해:
- `.mjs` (ESM) - Vite, 모던 번들러, Next.js용
- `.cjs` (CommonJS) - 이전 Webpack, Jest, Node require()용

두 포맷이 `dist/`에 다른 확장자로 공존. `exports` 필드가 번들러에게 어떤 포맷을 사용할지 알려줌:
```json
"exports": {
  ".": {
    "import": "./dist/index.mjs",   // import용 ESM
    "require": "./dist/index.cjs",  // require()용 CJS
    "types": "./dist/index.d.ts"
  }
}
```

### CSS 호환성
✅ **범용** - CSS는 일반 `.css` 파일로 출력, 어디서나 작동:
```tsx
import '@blumnai-studio/blumnai-design-system/styles';
```

### TypeScript 버전
✅ **처리됨** - 미리 컴파일된 `.d.ts` 파일은 TypeScript 4.7+ 모든 버전에서 작동.

---

## 개발자 사용법 (최종 결과)

```bash
# 설치
npm install @blumnai-studio/blumnai-design-system --legacy-peer-deps

# 코드에서
import { Button, Input, Checkbox } from '@blumnai-studio/blumnai-design-system';
import '@blumnai-studio/blumnai-design-system/styles';

function App() {
  return <Button style="primary">클릭하세요</Button>;
}
```

### 호환 환경:
- **Vite** 프로젝트
- **Next.js** (App Router & Pages Router)
- **Create React App** (Webpack)
- **Remix**
- **모든 React 프로젝트**

---

## v0.2.34 — 마이그레이션 갭 기능

happytalk-front 프로젝트에서 커스텀 UI / happytalk-design-guide(hdg) 마이그레이션을 지원하기 위해 12개의 새로운 기능이 추가되었습니다.

### 새 컴포넌트

#### InfoBox (콜아웃)

변형 색상, 인디케이터 바, 아이콘, 선택적 제목, 닫기 버튼을 갖춘 정적 인라인 정보/콜아웃 박스입니다.

```tsx
import { InfoBox } from '@blumnai-studio/blumnai-design-system';

<InfoBox variant="info" title="안내">
  안내 메시지입니다.
</InfoBox>

<InfoBox variant="warning" closable onClose={() => {}}>
  닫기 버튼이 있는 경고 메시지입니다.
</InfoBox>

<InfoBox variant="error">
  에러 상세 내용입니다.
</InfoBox>
```

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `variant` | `'default' \| 'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | 색상 변형 |
| `icon` | `IconType` | 변형별 기본 아이콘 | 기본 아이콘 재정의 |
| `visible` | `boolean` | `true` | 표시/숨김 |
| `title` | `ReactNode` | — | 선택적 제목 |
| `closable` | `boolean` | `false` | 닫기 버튼 표시 |
| `onClose` | `() => void` | — | 닫기 콜백 |
| `children` | `ReactNode` | 필수 | 본문 내용 |

### 향상된 Props

#### ConfirmDialog `description` → ReactNode

`description`이 이제 `ReactNode`를 지원합니다 (기존에는 `string`만 가능). 볼드 텍스트 등 스타일링된 텍스트를 사용할 수 있습니다.

```tsx
<ConfirmDialog
  title="사용자 삭제"
  description={<>정말 <strong>홍길동</strong>님을 삭제하시겠습니까?</>}
/>
```

#### Select `renderOption`

셀렉트 옵션 항목의 커스텀 렌더링을 지원합니다. 모든 변형(default, avatar, multi-select, tags)에서 동작합니다.

```tsx
<Select
  variant="default"
  options={options}
  renderOption={(option, isSelected) => (
    <div className="flex items-center ds-gap-8">
      <Avatar size="2xs" src={option.avatarSrc} />
      <span>{option.label}</span>
      {isSelected && <Icon iconType={['system', 'check']} size={16} />}
    </div>
  )}
/>
```

#### Select `minWidth`

```tsx
<Select minWidth={200} options={options} />
<Select minWidth="15rem" options={options} />
```

#### Checkbox `size` + `shape`

```tsx
<Checkbox size="sm" />   {/* 16×16 (기본값) */}
<Checkbox size="md" />   {/* 20×20 */}
<Checkbox size="lg" />   {/* 24×24 */}

<Checkbox shape="square" />  {/* 기본값 */}
<Checkbox shape="round" />   {/* 원형 */}
```

#### Switch `size`

```tsx
<Switch size="sm" />   {/* 32×20 트랙 (기본값) */}
<Switch size="md" />   {/* 40×24 트랙 */}
<Switch size="lg" />   {/* 48×28 트랙 */}
```

#### Input `xs` 사이즈

```tsx
<Input variant="default" size="xs" />  {/* 28px 높이 */}
<Input variant="default" size="sm" />  {/* 32px 높이 (기본값) */}
<Input variant="default" size="lg" />  {/* 36px 높이 */}
```

#### TooltipTrigger `sideOffset` / `alignOffset`

```tsx
<TooltipTrigger content="툴팁" sideOffset={12} alignOffset={4}>
  <button>마우스를 올려보세요</button>
</TooltipTrigger>
```

| Prop | 타입 | 기본값 |
|------|------|--------|
| `sideOffset` | `number` | `8` |
| `alignOffset` | `number` | `0` |

#### Tooltip `width` / `minWidth`

```tsx
<TooltipTrigger content="넓은 툴팁" width={300} minWidth={200}>
  <button>마우스를 올려보세요</button>
</TooltipTrigger>
```

#### Dialog `fullScreen`

```tsx
<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent fullScreen>
    {/* 모바일용 전체 화면 콘텐츠 */}
  </DialogContent>
</Dialog>
```

#### Pagination `size`

```tsx
<Pagination size="sm" page={1} totalPages={10} onPageChange={setPage} />
<Pagination size="lg" page={1} totalPages={10} onPageChange={setPage} />  {/* 기본값 */}
```

| 사이즈 | 항목 | 점 | 네비게이션 | 텍스트 |
|--------|------|-----|-----------|--------|
| `sm` | 28×28 | 8×8 | 28×28 | size-xs |
| `lg` | 32×32 | 10×10 | 32×32 | size-sm |

#### DataGrid 컬럼 헤더 툴팁

```tsx
const columns = [
  {
    accessorKey: 'name',
    header: '이름',
    meta: {
      headerTooltip: '사용자의 전체 이름',
    },
  },
];
```

### 새 Export 목록

```ts
// 새 컴포넌트
export { InfoBox } from '@blumnai-studio/blumnai-design-system';
export type { InfoBoxProps, InfoBoxVariant } from '@blumnai-studio/blumnai-design-system';

// 새 타입
export type {
  CheckboxSize,      // 'sm' | 'md' | 'lg'
  CheckboxShape,     // 'square' | 'round'
  SwitchSize,        // 'sm' | 'md' | 'lg'
  PaginationSize,    // 'sm' | 'lg'
} from '@blumnai-studio/blumnai-design-system';

// InputSize에 'xs' 추가: 'xs' | 'sm' | 'lg'
```
