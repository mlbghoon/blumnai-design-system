# 디자인 시스템 설치 가이드

> 팀원을 위한 `@mbisolution/blumnai-design-system` 패키지 설치 안내서

---

## 1단계: GitHub Personal Access Token 생성

1. **github.com** 접속 → 우측 상단 프로필 사진 클릭 → **Settings** 클릭
2. 좌측 사이드바 맨 아래 **Developer settings** 클릭
3. **Personal access tokens** → **Tokens (classic)** 클릭
4. **Generate new token** → **Generate new token (classic)** 클릭
5. 설정:
   - **Note**: `blumnai-design-system` (토큰 이름, 아무거나 가능)
   - **Expiration**: `No expiration` (만료 없음) 또는 원하는 기간 선택
   - **Select scopes**: `read:packages` 체크 ✅ (이것만 있으면 됩니다)
6. 맨 아래 **Generate token** 클릭
7. `ghp_` 로 시작하는 토큰이 표시됨 → **즉시 복사** (이 화면을 나가면 다시 볼 수 없음)

---

## 2단계: 토큰을 컴퓨터에 저장

터미널을 열고 아래 명령어 실행:

**macOS (zsh):**

```bash
echo '//npm.pkg.github.com/:_authToken=여기에_복사한_토큰_붙여넣기' >> ~/.npmrc
```

**Windows (PowerShell):**

```powershell
Add-Content -Path "$env:USERPROFILE\.npmrc" -Value "//npm.pkg.github.com/:_authToken=여기에_복사한_토큰_붙여넣기"
```

예시 (실제 토큰으로 교체):

```bash
echo '//npm.pkg.github.com/:_authToken=ghp_abc123def456' >> ~/.npmrc
```

> **중요**: 이 파일은 홈 폴더(`~/.npmrc`)에 저장됩니다. 프로젝트 폴더가 아닙니다. 이 파일은 절대 git에 커밋하지 마세요.

---

## 3단계: 프로젝트에 `.npmrc` 파일 추가

디자인 시스템을 사용할 프로젝트 **루트 폴더**에 `.npmrc` 파일을 생성합니다:

```ini
@mbisolution:registry=https://npm.pkg.github.com
```

이 파일은 npm에게 `@mbisolution` 스코프의 패키지를 GitHub Packages에서 가져오라고 알려줍니다.

> 이 파일은 git에 커밋해도 됩니다 (토큰 정보 없음).

---

## 4단계: 패키지 설치

```bash
npm install @mbisolution/blumnai-design-system
```

---

## 5단계: 코드에서 사용

```tsx
// CSS를 한 번만 import (보통 App.tsx 또는 main.tsx에서)
import '@mbisolution/blumnai-design-system/styles';

// 컴포넌트 import
import { Button, Input, Checkbox } from '@mbisolution/blumnai-design-system';

function MyPage() {
  return (
    <div>
      <Button buttonStyle="primary">저장</Button>
      <Input variant="default" label="이름" placeholder="이름을 입력하세요" />
    </div>
  );
}
```

---

## 문제 해결

| 에러 | 원인 | 해결 |
|------|------|------|
| `401 Unauthorized` | 토큰이 없거나 잘못됨 | `~/.npmrc` 파일에 토큰이 있는지 확인 |
| `404 Not Found` | 프로젝트 `.npmrc`가 없음 | 프로젝트 루트에 `.npmrc` 파일 추가 (3단계) |
| `EPERM` / 권한 에러 | 토큰에 `read:packages` 권한 없음 | GitHub에서 토큰 권한 확인 |
