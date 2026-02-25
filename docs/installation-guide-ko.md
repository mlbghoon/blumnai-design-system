# 디자인 시스템 설치 가이드

> 팀원을 위한 `@mbisolution/blumnai-design-system` 패키지 설치 안내서

---

## 1단계: GitHub Personal Access Token 생성

1. [GitHub.com](https://github.com) 로그인
2. 우측 상단 프로필 아이콘 클릭 → **Settings** 클릭
3. 왼쪽 메뉴 맨 아래 **Developer settings** 클릭
4. **Personal access tokens** → **Tokens (classic)** 클릭
5. **Generate new token (classic)** 클릭
6. 설정:
   - **Note**: `design-system` (토큰 이름, 아무거나 가능)
   - **Expiration**: 원하는 만료일 선택 (예: 90 days)
   - **Select scopes**: `read:packages` 체크 ✅ (이것만 있으면 됩니다)
7. 맨 아래 **Generate token** 클릭
8. ⚠️ **`ghp_`로 시작하는 토큰이 표시됩니다 → 지금 바로 복사하세요!** 페이지를 벗어나면 다시 볼 수 없습니다.

---

## 2단계: 토큰을 컴퓨터에 저장

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
echo "@mbisolution:registry=https://npm.pkg.github.com" >> ~/.npmrc
```
```bash
echo "//npm.pkg.github.com/:_authToken=YOUR_TOKEN" >> ~/.npmrc
```

**확인:** `cat ~/.npmrc` 실행 후 **정확히 아래 두 줄만** 보이면 성공:
```
@mbisolution:registry=https://npm.pkg.github.com
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
Add-Content -Path "$env:USERPROFILE\.npmrc" -Value "@mbisolution:registry=https://npm.pkg.github.com"
```
```powershell
Add-Content -Path "$env:USERPROFILE\.npmrc" -Value "//npm.pkg.github.com/:_authToken=YOUR_TOKEN"
```

**확인:** `Get-Content "$env:USERPROFILE\.npmrc"` 실행 후 **정확히 아래 두 줄만** 보이면 성공:
```
@mbisolution:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=ghp_xxxx...
```

만약 같은 줄이 여러 번 반복된다면, 파일을 초기화하세요:
```powershell
Remove-Item "$env:USERPROFILE\.npmrc"
```
그리고 위의 `Add-Content` 명령어 두 줄을 다시 실행하세요.

> **참고:** `$env:USERPROFILE`은 보통 `C:\Users\본인이름` 폴더입니다.

</details>

> **중요**: 이 파일은 홈 폴더에 저장됩니다. 프로젝트 폴더가 아닙니다. 이 파일은 절대 git에 커밋하지 마세요.

---

## 3단계: 패키지 설치

디자인 시스템을 사용할 프로젝트 폴더에서 실행:

```bash
npm install @mbisolution/blumnai-design-system --legacy-peer-deps
```

---

## 4단계: CSS 불러오기 (필수)

프로젝트의 진입점 파일(예: `main.tsx`, `App.tsx`, `layout.tsx`)에 아래 한 줄을 추가:

```tsx
import '@mbisolution/blumnai-design-system/styles';
```

> 이 줄은 **한 번만** 추가하면 됩니다. 모든 컴포넌트의 스타일이 포함되어 있습니다.

---

## 5단계: 컴포넌트 사용

```tsx
import { Button, Input, Checkbox, InfoBox } from '@mbisolution/blumnai-design-system';

function MyPage() {
  return (
    <div>
      <Button buttonStyle="primary">저장</Button>
      <Input variant="default" label="이름" placeholder="이름을 입력하세요" />
      <InfoBox variant="info" title="안내">안내 메시지입니다.</InfoBox>
    </div>
  );
}
```

---

## 문제 해결

| 에러 | 원인 | 해결 |
|------|------|------|
| `401 Unauthorized` | 토큰이 없거나 만료됨 | `cat ~/.npmrc`으로 토큰 확인. 만료된 경우 1단계부터 다시 진행 |
| `404 Not Found` | `~/.npmrc`에 레지스트리 설정 없음 | 2단계의 첫 번째 `echo` 명령어 확인 |
| `EPERM` / 권한 에러 | 토큰에 `read:packages` 권한 없음 | GitHub에서 토큰 권한 확인 |
| `ERESOLVE` peer dep 에러 | React 버전 충돌 | `--legacy-peer-deps` 플래그 추가하여 설치 |
| 줄이 중복으로 보임 | `echo` 명령어를 여러 번 실행 | `rm ~/.npmrc` 후 2단계 다시 진행 |
