# BlumnAI Design System

React 기반 UI 컴포넌트 라이브러리입니다. 40+ 컴포넌트, 4가지 테마, 접근성 지원.

[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?style=flat-square&logo=github)](https://github.com/mlbghoon/blumnai-design-system)

---

## 설치

### 1. GitHub Personal Access Token 생성

이 패키지는 GitHub Packages에 배포됩니다. 설치하려면 `read:packages` 권한이 있는 토큰이 필요합니다.

1. [github.com](https://github.com) → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. **Generate new token (classic)** 클릭
3. `read:packages` 체크 → Generate token
4. `ghp_`로 시작하는 토큰을 복사

### 2. 토큰을 `~/.npmrc`에 저장

```bash
# macOS / Linux
echo '//npm.pkg.github.com/:_authToken=YOUR_TOKEN' >> ~/.npmrc

# Windows (PowerShell)
Add-Content -Path "$env:USERPROFILE\.npmrc" -Value "//npm.pkg.github.com/:_authToken=YOUR_TOKEN"
```

> **주의**: `~/.npmrc`는 홈 폴더에 저장됩니다. 절대 git에 커밋하지 마세요.

### 3. 프로젝트에 `.npmrc` 파일 추가

프로젝트 루트에 `.npmrc` 파일 생성:

```ini
@mlbghoon:registry=https://npm.pkg.github.com
```

> 이 파일은 git에 커밋해도 됩니다 (토큰 정보 없음).

### 4. 패키지 설치

```bash
npm install @mlbghoon/blumnai-design-system --legacy-peer-deps
```

---

## 사용법

### CSS 임포트 (필수)

앱 진입점에서 CSS를 한 번 임포트합니다:

```tsx
// app/layout.tsx 또는 _app.tsx 또는 main.tsx
import '@mlbghoon/blumnai-design-system/styles';
```

### 컴포넌트 사용

```tsx
import { Button, Input, Icon, Badge } from '@mlbghoon/blumnai-design-system';

export default function MyPage() {
  return (
    <div>
      <Button buttonStyle="primary" size="md">
        <Icon iconType={['system', 'add']} size={16} />
        새로 만들기
      </Button>

      <Input variant="default" label="이름" placeholder="이름을 입력하세요" />

      <Badge variant="success">활성</Badge>
    </div>
  );
}
```

---

## 서브패스 임포트 (권장)

빌드 속도 최적화를 위해 서브패스 임포트를 사용할 수 있습니다:

```tsx
// 전체 임포트 (호환됨)
import { Button } from '@mlbghoon/blumnai-design-system';

// 서브패스 임포트 (더 빠른 빌드)
import { Button } from '@mlbghoon/blumnai-design-system/button';
```

| 서브패스 | 포함 컴포넌트 |
|---------|-------------|
| `/avatar` | Avatar, AvatarGroup |
| `/badge` | Badge |
| `/breadcrumbs` | Breadcrumbs |
| `/button` | Button, ControlButton, FilterButton, AvatarButton, LinkButton, ButtonGroup |
| `/calendar` | Calendar, DatePicker, DateRangePicker |
| `/card` | Card, CardHeader, CardTitle, CardContent, CardFooter |
| `/carousel` | Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, CarouselIndicators |
| `/chart` | Chart, BarChart, LineChart, PieChart, DonutChart |
| `/checkbox` | Checkbox, CheckboxCard, CheckboxList |
| `/chip` | Chip |
| `/collapsible` | Collapsible, CollapsibleTrigger, CollapsibleContent |
| `/context-menu` | ContextMenu |
| `/dialog` | Dialog, AlertDialog, ConfirmDialog |
| `/divider` | Divider |
| `/drawer` | Drawer, Sheet |
| `/dropdown` | DropdownMenu |
| `/file-upload` | FileUploadArea, FileUploadCard |
| `/form` | Form, FormField, FormControl, FormItem, FormError |
| `/hover-card` | HoverCard, HoverCardTrigger, HoverCardContent |
| `/info-box` | InfoBox |
| `/icons` | 모든 아이콘 컴포넌트 |
| `/icons/icon` | Icon (UI 아이콘) |
| `/icons/brand` | BrandIcon |
| `/icons/flag` | FlagIcon |
| `/icons/file` | FileIcon |
| `/input` | Input |
| `/input-otp` | InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator |
| `/menubar` | Menubar, MenubarMenu, MenubarTrigger, MenubarContent |
| `/navigation-menu` | NavigationMenu, NavigationMenuList, NavigationMenuItem |
| `/pagination` | Pagination |
| `/popover` | Popover, PopoverTrigger, PopoverContent |
| `/progress` | Progress, ProgressCircular |
| `/radio` | Radio, RadioGroup, RadioCard, RadioList |
| `/resizable` | ResizablePanelGroup, ResizablePanel, ResizableHandle |
| `/scroll-area` | ScrollArea |
| `/select` | Select, Combobox |
| `/sidebar` | Sidebar, SidebarContent, SidebarMenu |
| `/skeleton` | Skeleton |
| `/slider` | Slider, SliderRange, SliderInput, SliderRangeInput, DataRangeSlider, DataRangeSliderInput |
| `/switch` | Switch, SwitchList |
| `/table` | Table, DataGrid, CellText, CellBadge, CellAvatar, CellProgress, CellLink, CellIcon, CellDate, CellDateRange |
| `/tabs` | Tabs, TabsList, TabsTrigger, TabsContent |
| `/textarea` | Textarea |
| `/time-picker` | TimePicker, TimeRangePicker, TimeInput, TimeRangeInput |
| `/toast` | toast |
| `/tooltip` | TooltipTrigger, AdvancedTooltip |
| `/styles` | CSS 스타일시트 |

---

## 테마

4가지 테마를 지원하며, `data-theme` 속성으로 전환합니다:

| 테마 | 속성 값 | 설명 |
|-----|--------|------|
| Theme-A Light | (기본값) | 기본 라이트 테마 |
| Theme-A Dark | `data-theme="dark"` | 기본 다크 테마 |
| Theme-B Light | `data-theme="theme-b-light"` | 대체 라이트 테마 |
| Theme-B Dark | `data-theme="theme-b-dark"` | 대체 다크 테마 |

```tsx
// 테마 적용
<html data-theme="dark">
  {/* 다크 테마 적용 */}
</html>
```

---

## 호환성

### 지원 환경

| 환경 | 상태 | 비고 |
|------|------|------|
| Next.js 13+ App Router (RSC) | 그대로 사용 가능 | `"use client"` 자동 포함 |
| Next.js 13+ / Vite / webpack 5 | 그대로 사용 가능 | `exports` 필드 지원 |
| Next.js 12 (webpack 5) | 그대로 사용 가능 | 프록시 디렉터리 자동 폴백 |
| TypeScript `moduleResolution: "node"` | 그대로 사용 가능 | `typesVersions` 자동 폴백 |
| TypeScript `moduleResolution: "bundler"` / `"node16"` | 그대로 사용 가능 | `exports` 필드 지원 |

### 동작 원리

서브패스 임포트(`@mlbghoon/blumnai-design-system/button`)는 3가지 해상도 메커니즘으로 지원됩니다:

1. **`exports` 필드** — 최신 번들러/Node.js에서 사용 (최우선)
2. **프록시 디렉터리** — `button/package.json` → `../dist/components/button/index.mjs` (레거시 webpack 폴백)
3. **`typesVersions`** — TypeScript `moduleResolution: "node"` 환경에서 타입 해상도

대부분의 프로젝트에서 **추가 설정 없이** 작동합니다.

### Next.js 12 + legacy 플러그인 (next-images 등)

`next-images` 같은 레거시 webpack 플러그인이 모듈 해상도를 방해하는 경우, `next.config.js`에 다음을 추가하세요:

```js
module.exports = {
  webpack(config) {
    // exports 필드 해상도 지원
    if (!config.resolve.conditionNames) {
      config.resolve.conditionNames = ['import', 'module', 'require', 'node', 'default'];
    }

    // ... 기존 webpack 설정 ...
    return config;
  },
};
```

> **참고**: `next-images`는 Next.js 10부터 내장 이미지 처리로 대체되었습니다. 가능하면 제거를 권장합니다.

---

## 문제 해결

| 에러 | 원인 | 해결 |
|------|------|------|
| `401 Unauthorized` | 토큰이 없거나 잘못됨 | `~/.npmrc` 파일에 토큰 확인 |
| `404 Not Found` | 프로젝트 `.npmrc`가 없음 | 프로젝트 루트에 `.npmrc` 파일 추가 |
| `EPERM` / 권한 에러 | 토큰에 `read:packages` 권한 없음 | GitHub에서 토큰 권한 확인 |
| `Module not found: Can't resolve '...button'` | 번들러가 `exports` 필드 미지원 | 위 "호환성" 섹션 참조 |
| `Cannot find module ... type declarations` | TypeScript가 `exports` 필드 미지원 | `typesVersions`로 자동 해결됨. 패키지 업데이트 확인 |

---

## 업데이트 알림 설정

새 버전이 출시되면 빠르게 반영할 수 있도록 Dependabot을 설정하는 것을 권장합니다.

프로젝트에 `.github/dependabot.yml` 파일을 추가하세요:

```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    allow:
      - dependency-name: "@mlbghoon/blumnai-design-system"
    registries:
      - github-packages

registries:
  github-packages:
    type: npm-registry
    url: https://npm.pkg.github.com
    token: ${{ secrets.GITHUB_TOKEN }}
```

> Dependabot이 매주 새 버전을 확인하고, 업데이트가 있으면 자동으로 PR을 생성합니다.

---

## 참고 자료

- **[AI.md](./AI.md)** — 전체 컴포넌트 레퍼런스 (AI 에이전트 & 개발자용)
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** — 개발 참여 가이드
- **Storybook** — 인터랙티브 컴포넌트 문서 (로컬에서 `npm run storybook`으로 실행)
