# Bundle verification harness

이 디렉터리는 **v2.0 직접-import API가 약속한 ~2.5MB chunk 절감을 회귀 없이 유지하는지** 확인하는 더미 Vite 프로젝트 모음입니다.

## 구성

| 디렉터리 | 시나리오 |
|---|---|
| `preflight-direct/` | `<Icon icon={RiCheckLine}>` direct-import API만 사용. `remixicon-*.js` async chunk가 **emit되지 않아야** 함. |
| `preflight-legacy/` | `…/icons/icon-legacy` 의 tuple-form `<Icon iconType={['system','check']}>` 사용. async chunk가 **emit되어야** 함 (opt-in legacy 경로 정상 동작 확인). |

## 실행

루트에서:

```bash
npm run build:lib        # DS dist/ 새로 빌드
npm run verify:bundle    # 두 프로젝트 install + build + chunk presence 검증
```

수동으로 따로 돌리려면:

```bash
cd tests/bundle/preflight-direct
npm install --legacy-peer-deps
npx vite build
ls dist/assets/   # async chunk 없어야 함

cd ../preflight-legacy
npm install --legacy-peer-deps
npx vite build
ls dist/assets/   # remixicon-*.js (~2.4MB) 있어야 함
```

## 기대 결과 (v2.0)

| Build | Main bundle | Async chunk |
|---|---|---|
| `preflight-direct` | ~146KB (gz ~47KB) | **없음** |
| `preflight-legacy` | ~246KB (gz ~70KB) | **~2,443KB (gz ~495KB)** |

직접-import 빌드에 `remixicon-*.js` 같은 chunk가 등장하면 회귀 — DS 어딘가에서 `import('@remixicon/react')` 가 메인 entry 그래프로 흘러들었다는 신호입니다.

## CI 통합 (향후)

지금은 로컬 스크립트만 제공합니다. 향후 GitHub Actions workflow에 추가해서 PR 마다 자동 실행하는 게 목표입니다.
