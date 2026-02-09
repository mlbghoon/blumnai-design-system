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
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    dts({ include: ['src'], exclude: ['src/App.tsx', 'src/main.tsx', '**/*.stories.tsx'] })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'BlumnaiDesignSystem',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'cjs'}`
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        },
        preserveModules: true,
        preserveModulesRoot: 'src'
      }
    },
    sourcemap: true,
    cssCodeSplit: true
  }
});
```

### 1.3 package.json 업데이트

```json
{
  "name": "@mbisolution/blumnai-design-system",
  "version": "1.0.0",
  "private": false,
  "type": "module",
  "main": "./dist/index.cjs",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.cjs",
      "types": "./dist/index.d.ts"
    },
    "./styles": "./dist/style.css"
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
  "name": "@mbisolution/blumnai-design-system",
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  }
}
```

**2단계: 프로젝트 루트에 `.npmrc` 파일 생성**

```
@mbisolution:registry=https://npm.pkg.github.com
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
```bash
npm run build:lib
npm publish
```

**팀원이 설치하려면:**

1. 자신의 GitHub 토큰 생성 (`read:packages` 권한)
2. `~/.npmrc` (홈 폴더)에 추가:
```
//npm.pkg.github.com/:_authToken=ghp_본인_토큰_여기에
```
3. 설치:
```bash
npm install @mbisolution/blumnai-design-system
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
   npm install @mbisolution/blumnai-design-system
   ```
   ```tsx
   import { Button, Input } from '@mbisolution/blumnai-design-system';
   import '@mbisolution/blumnai-design-system/styles';
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

1. **빌드 테스트**: `npm run build:lib`가 `.mjs`, `.cjs`, `.d.ts` 파일이 있는 `dist/` 생성
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

package.json의 `exports` 필드가 번들러에게 어떤 포맷을 사용할지 알려줌:
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
import '@mbisolution/blumnai-design-system/styles';
```

### TypeScript 버전
✅ **처리됨** - 미리 컴파일된 `.d.ts` 파일은 TypeScript 4.7+ 모든 버전에서 작동.

---

## 개발자 사용법 (최종 결과)

```bash
# 설치
npm install @mbisolution/blumnai-design-system

# 코드에서
import { Button, Input, Checkbox } from '@mbisolution/blumnai-design-system';
import '@mbisolution/blumnai-design-system/styles';

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
