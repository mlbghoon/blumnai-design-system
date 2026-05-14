# 코드 리뷰: v1.10.15 + v2.0.0 (`578c8735` + `f4da4558`)

## 개요

소비자 빌드에서 `~2.5MB` 짜리 `remixicon-*.js` async chunk를 제거하기 위한 2단계 마이그레이션.

- **v1.10.15** (publish 완료): soft deprecation 패치 — dev `console.warn` + `@deprecated` JSDoc + 공지 문서. **비파괴**.
- **v2.0.0** (로컬 커밋 `f4da4558`만, push X): 메인 entry에서 tuple-form API를 완전 제거. 새 `…/icons/icon-legacy` sub-entry가 pre-2.0 동작을 보존. DS 내부 ~25개 컴포넌트 마이그레이션, `CellIcon` 공개 API 변경 (`iconType` → `icon`), Button/Tabs/Dropdown 등 prop 타입 narrowing, TS를 우회한 tuple에 대한 런타임 가드, 번들 검증 하니스 추가.

**Diff 통계 (v1.10.13 baseline 대비):** 131 파일, +2,033 / −720 줄. typecheck + lint + 284 tests 모두 통과. 번들 측정으로 목표 달성 확인: direct 146KB vs legacy 2,689KB.

---

## ✅ 강점

- **Pre-flight verification 우선** — 코딩 전에 `@remixicon/react`의 `sideEffects: false`와 Vite tree-shake 동작을 실제 빌드로 검증
- **`…/icons/icon-legacy` 하드 경계** — `import('@remixicon/react')`을 호출하는 유일한 site인 `legacy/ui-icon-registry.tsx`가 메인 entry의 import 그래프에서 완전 격리됨
- **non-TS 경로용 런타임 가드** — `as any` / JS-only / API 응답에서 온 데이터로 tuple이 흘러들어왔을 때 조용히 실패하지 않고 dev throw / prod fallback + 로그
- **합리적인 escape hatch** — 마이그레이션 중인 소비자가 `1.10.x` pin 또는 `icon-legacy` import로 동작은 보장
- **포괄적인 문서** — MIGRATION.md에 번들러 매트릭스, 두 마이그레이션 경로, heavy-icon 가이드, rollback 절차까지 다 들어감
- **JSDoc strikethrough 전략** — v1.10.15에서 `@deprecated` JSDoc이 IDE hover에 v2.0 안내 표시. silent surprise 위험 감소

---

## ⚠️ 이슈 및 위험요소 (심각도순)

### 🔴 High — publish 전에 고쳐야 할 정확성 갭

**1. Codemod CLI surface가 문서와 안 맞음 (correctness)**

- `MIGRATION.md`는 소비자에게 `npx blumnai-icon-codemod migrate ./src`와 `npx blumnai-icon-codemod escape ./src`를 실행하라고 안내
- 실제 `scripts/icon-codemod/cli.cjs`는 `migrate` / `escape` 서브커맨드 dispatch가 없음 — 그냥 args를 `jscodeshift`에 forward
- plan에 있던 `transform-escape.cjs`는 만들어진 적이 없음
- **영향:** 문서대로 명령어 친 소비자는 jscodeshift의 혼란스러운 에러 메시지를 받게 됨. 두 가지 선택:
  - 서브커맨드 dispatch + `transform-escape.cjs` 추가 (plan 준수, 작업량 많음)
  - 또는 MIGRATION.md를 현재 동작에 맞게 정정: `npx blumnai-icon-codemod ./src` (단일 모드)
- **권장:** `migrate`만이라도 alias로 인식하는 얇은 CLI shim 추가, `escape`는 "coming soon"으로 문서화. v2.0 publish 전에 처리 권장.

**2. Codemod가 `CellIcon iconType → icon`을 처리하지 않음**

- `transform.cjs`의 mode 1은 `<Icon ...>` 컴포넌트 이름에만 매치 (`elementName === 'Icon'`), `<CellIcon ...>`는 아님
- CellIcon은 DS에서 유일하게 **prop 이름 자체가 바뀐** 컴포넌트 (다른 것들은 `icon`/`leadIcon` 등 그대로)
- `<CellIcon iconType={[...]}>` 사용하는 소비자가 migrate codemod 돌려도 변환 안 됨 → v2.0에서 TS 에러
- **영향:** Table을 많이 쓰는 소비자(많을 가능성)가 마이그레이션 cliff를 만남
- **권장:** `transform.cjs`를 확장해서 `<CellIcon iconType={...}>` → `<CellIcon icon={...}>` 도 같은 `Ri*` lookup으로 변환. fixture 추가. ~30줄.

**3. DRY 위반: `looksLikeLegacyTuple` + `handleLegacyTupleAtRuntime` + `prodTupleErrorLogged` 중복**

- 똑같은 역할의 helper가 `Icon.tsx` (44–73 라인)와 `iconProp.tsx` (46–74 라인)에 따로 존재
- `prodTupleErrorLogged` module-scope flag도 각각 따로 → 소비자가 prod에서 **2번 에러 로그** 볼 수 있음 (docs는 1번이라고 함)
- 에러 메시지도 미묘하게 다름 ("rendering invisible fallback" vs "rendering null" — 후자는 사실 부정확. `Icon.tsx`는 span 렌더, null 아님)
- **권장:** `src/components/icons/Icon/_legacyTupleGuard.ts` 로 추출 (`looksLikeLegacyTuple` 하나, `handleLegacyTupleAtRuntime` 하나, flag 하나). 두 call site 모두 import.

**4. `shared.ts` 추출 (plan-review 3-A) 미실행**

- `colorTokens`, `resolveColor`가 `Icon.tsx`와 `legacy/Icon.legacy.tsx`에 **동일 복제**
- 이건 plan-review에서 명시적으로 결정한 항목 (3-A: "shared.ts로 helper 추출, legacy는 main의 IconDirect 재사용")
- **영향:** 한쪽에 색상 토큰 추가하는 순간 drift 발생 → main과 legacy 렌더링이 silent하게 달라짐
- **권장:** `src/components/icons/Icon/shared.ts` 생성해서 `colorTokens`, `resolveColor`, `kebabToRegistryKey` 다 넣고, `Icon.tsx`와 `legacy/Icon.legacy.tsx` 둘 다 import. ~30분 작업.

### 🟡 Medium — UX / 유지보수에 영향

**5. 4개 컴포넌트 타입에 dead `leadIconFill`/`tailIconFill`/`iconFill` prop 남음**

- Dropdown / ContextMenu / Menubar / NavigationMenu 의 타입에 여전히 boolean prop 선언돼 있음
- 구현은 `_` prefix로 destructure해서 lint만 silence — **런타임에 조용히 무시됨**
- 타입은 받음 + 런타임 무동작 = 최악 조합. 소비자는 동작한다고 오해
- **권장:** 타입에 `@deprecated v2.0.x에서 제거 — fill 변형은 이제 import 이름으로 선택 (RiCheckFill vs RiCheckLine); 이 prop은 no-op` 추가하거나, 타입에서도 완전히 제거 (작은 추가 breaking).

**6. `SidebarMenuItem.renderIcon`이 런타임 가드 안 쓰고 tuple을 silent하게 drop**

- `Icon`과 `renderIconProp`은 둘 다 tuple 입력 시 `handleLegacyTupleAtRuntime` 호출
- `SidebarMenuItem.renderIcon` (73–93 라인)은 component도 element도 아닌 입력에 그냥 null 반환 — silent
- 일관성 깨짐: `<Button leadIcon={tuple}>`은 dev에서 throw, `<SidebarMenuItem icon={tuple}>`은 조용히 사라짐
- **권장:** (추출된) `_legacyTupleGuard`를 여기서도 사용해서 일관성 확보

**7. `prodTupleErrorLogged` flag가 HMR 경계 너머에서 per-module**

- "prod에서 1번만 로그" 보증은 모듈 identity에 의존. tree-shaken 소비자 빌드에서 모듈이 두 번 인스턴스화될 수 있음 (tuple 경로 각각 import 시)
- 사소하지만, doc의 "one-time `console.error`" 주장은 과장된 측면
- **권장:** #3을 고치면 (shared flag) 자연 해결, 또는 doc 표현 약화

**8. 번들 하니스 (`tests/bundle/preflight-{direct,legacy}/`) 가 CI에 연결 안 됨**

- Plan 9-A는 자동 guardrail을 요구. 이 하니스는 그 seed지만 현재:
  - GH Actions 통합 없음
  - npm 스크립트 없음
  - `tests/bundle/README.md` 없음
- `file:../../..` deps는 로컬 OK지만 다른 데로 옮기면 깨짐
- **권장:** `npm run verify:bundle` 스크립트 + 짧은 README 추가. CI 연결은 별도 follow-up PR로.

**9. Visual regression (plan 12-A) 미실행**

- 내부 마크업이 마이그레이션된 컴포넌트 25개 (대부분 기계적 변환 — `iconType={[…]}` → `icon={Ri*}`)
- pre-2.0 baseline에 대한 스크린샷 diff 없음
- 위험은 낮지만(렌더링 결과는 동일해야 함) 검증 안 됨
- **권장:** publish 전에 `visual-test` skill로 마이그레이션된 컴포넌트 스토리 검증

### 🟢 Low — 사소함 / cosmetic

**10. `iconProp.tsx` 로그 메시지가 "rendering null"이라고 함**

- 실제로 `renderIconProp`은 null 반환 — 이 메시지는 정확
- 다만 *Icon.tsx*는 "rendering invisible fallback" — 의미는 같지만 비대칭이라 두 helper를 분리할 이유가 없다는 신호 (#3 참조)

**11. `legacy/index.ts`가 `IconColor`, `IconProps`, `RemixiconLikeComponent`를 `../Icon.types`에서 re-export**

- "하드 경계" 를 plan에 적었지만 이 타입들은 tuple 전용 아니고 main+legacy 공용
- 수용 가능 — 런타임 비용 0인 type re-export. 다만 코멘트가 "Tuple 타입 — icon-legacy 하드 경계에 따라 이동"이라고 적혀있는 위치 바로 아래에 non-tuple 타입 re-export가 와서 약간 오해의 소지

**12. `docs/plans/v2-icon-split-plan.md` (458줄)가 커밋에 포함됨**

- npm에는 안 실림 (`files` 가 `docs/` 미포함)
- 역사적 기록으로 유용; 가능하면 "기록된 plan; 편집하지 말 것" 헤더 추가

**13. `Switch.types.ts` @example에 `RiCheckLine`/`RiCloseLine`/`RiSunFill`/`RiMoonFill`이 import 라인 없이 등장**

- docstring 문자열이라 실제 코드 아님. 괜찮지만 copy-paste 시 약간 불친절

**14. `IconPropsWithComponent`가 main entry에서만 export, legacy에선 안 됨**

- legacy entry를 명시적으로 쓰는 소비자가 기대할 수도 있음. 사소함 — 그들은 `LegacyIconProps` 사용 가능

---

## Performance

- ✅ 목표 달성 (검증됨): direct-only 경로 ~144KB, async chunk 없음
- ✅ Tree-shaking 검증 (grep으로 `viewBox` 개수 == 1 — direct bundle에 아이콘 1개만)
- ✅ `export * from '@remixicon/react'` 올바르게 보존 (`sideEffects` 설정과 함께)
- ⚠️ Heavy-icon 사용자(200+ icons)는 chunk 절감 효과 없고 lazy-loading 잃음 — MIGRATION.md에 가이드 명시
- ⚠️ 메인 `Icon`은 style/cursor용 `useMemo` 유지 — referential stability 보존

---

## Security

- 런타임 가드는 `process.env.NODE_ENV` 체크 — 표준 패턴, 안전
- 새 dynamic import / eval / 사용자 입력 경로 없음
- Codemod (jscodeshift)는 빌드타임 전용 — 런타임 노출 없음

---

## 테스트 커버리지

- ✅ 기존 284 tests 모두 통과
- ✅ Legacy unit tests를 `legacy/__tests__/` 로 이동 (registry / preload / Icon iconType 테스트 유지)
- ❌ direct-only `Icon`의 런타임 가드 신규 테스트 없음 (plan 12-A) — "dev에서 tuple throw", "prod에서 1번 로그 + fallback" 검증 필요
- ❌ `renderIconProp`의 direct-only 경로 + tuple 입력 테스트 없음
- ❌ Codemod fixture 추가 없음 (plan 10-A: CellIcon, negative case, prop name 커버리지, idempotency)
- ❌ `escape` codemod fixture 없음 (모드 자체가 없으니까)
- ❌ CI bundle-size guardrail 미연결

---

## Publish 전 권장 체크리스트

v2.0 push 전에:

1. **필수:** Codemod CLI 서브커맨드 dispatch 수정 (Issue #1) 또는 docs에서 `migrate`/`escape` 표현 제거
2. **필수:** Codemod에 `<CellIcon iconType={...}>` 처리 추가 (Issue #2)
3. **권장:** `_legacyTupleGuard.ts` (#3) 와 `shared.ts` (#4) 추출 — 둘 합쳐서 ~1시간 작업
4. **권장:** 런타임 가드 unit test 추가 (#7 관련 이슈도 implicit하게 커버)
5. **권장:** 마이그레이션된 stories에 visual regression 실행 (#9)
6. **하면 좋음:** 타입에서 `*Fill` boolean prop deprecate (#5), SidebarMenuItem 가드 일관화 (#6)
7. **하면 좋음:** `tests/bundle/README.md` + `verify:bundle` npm 스크립트 (#8)

1, 2, 3, 4번만 blocker로 간주. 나머지는 quality improvement — v2.0 자체가 시급하면 v2.0.1로 미뤄도 됨.

---

## 종합 평가

**아키텍처는 견고함, 문서화 잘 됨, 목표 검증됨.** 가장 시급한 두 항목 (codemod CLI surface + CellIcon codemod 처리)은 doc/UX 정확성 문제 — 코드 자체는 동작하지만 광고된 마이그레이션 도구가 실제 동작과 완전히 일치하지 않음. DRY misses (`shared.ts` + legacy tuple guard)는 실제이지만 격리됨; 소비자 노출 버그보다는 유지보수 마찰을 만드는 수준.

**🔴 항목들은 push 전에 고치고, 그 후 merge 권장.**

---

## 핵심 요약 (TL;DR)

| 분류 | 항목 | 영향 |
|---|---|---|
| 🔴 #1 | Codemod CLI `migrate`/`escape` 서브커맨드 미구현 | 문서대로 한 사용자가 에러 봄 |
| 🔴 #2 | Codemod가 `<CellIcon iconType=>` 미처리 | Table 사용자 수동 마이그레이션 필요 |
| 🔴 #3 | Tuple guard 로직이 두 파일에 중복 | prod에서 2번 로그 발생 가능 |
| 🔴 #4 | `colorTokens`/`resolveColor` 가 main+legacy에 복제 | 토큰 drift 위험 |
| 🟡 #5 | 4개 컴포넌트의 `*Fill` props가 dead 상태 | 사용자 오해 |
| 🟡 #6 | `SidebarMenuItem`이 tuple silent drop | 일관성 깨짐 |
| 🟡 #7 | `prodTupleErrorLogged`가 모듈마다 분리 | 로그 1회 보증 약함 |
| 🟡 #8 | 번들 하니스 CI 미연결 | 회귀 감지 안 됨 |
| 🟡 #9 | Visual regression 미실행 | 시각 차이 검증 안 됨 |
| 🟢 #10–14 | 메시지 비일관, 코멘트 오해, 사소한 export 누락 | cosmetic |
