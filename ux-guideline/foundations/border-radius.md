# 보더 & 라운딩 (Border & Radius)

## 1. 보더 규칙

DS는 alpha 기반 보더 변수를 제공한다. 라이트/다크 테마 자동 대응.

### DS 보더 강도

| DS 클래스 | 변수 | alpha | 용도 |
|-----------|------|-------|------|
| `border-default` | `--border-default` | ~10% | **기본 보더** (대부분의 구분선, 카드) |
| `border-darker` | `--border-darker` | ~15% | 약간 강한 보더 (선택 요소, 강조 구분) |
| `border-strong` | `--border-strong` | ~25% | 강한 보더 (명확한 영역 구분) |

### DS 시맨틱 보더

| DS 클래스 | 용도 |
|-----------|------|
| `border-destructive` | 에러, 삭제 |
| `border-informative` | 정보, 링크 |
| `border-success` | 성공, 완료 |
| `border-warning` | 경고, 주의 |
| `border-accent` | 브랜드 강조 |
| `border-highlight` | 포커스/선택 상태 |

### 방향별 보더

| DS 클래스 | 설명 |
|-----------|------|
| `border-b-default` | 하단 구분선 (헤더-바디) |
| `border-t-default` | 상단 구분선 |
| `border-l-default` / `border-r-default` | 좌/우 구분선 |
| `border-b-darker` / `border-l-darker` 등 | darker 강도 방향별 |

> DS 보더 클래스는 `border-style:solid` + `border-width:1px` + `border-color`를 모두 포함한다.
> Tailwind의 `border border-gray-200` 대신 **DS `border-default` 하나로 대체** 가능.

```
✅ border-default                   → DS 기본 보더 (alpha 기반, 테마 대응)
✅ border-b-default                 → DS 하단 구분선
✅ border-destructive               → DS 에러 보더
❌ border border-gray-200           → DS border-default로 대체
❌ border-gray-300, border-gray-100 → DS 강도 변수 (darker, strong) 사용
```

## 2. Shape 규칙: rounded vs pill

### 판단 기준

**기본은 `rounded`**. 대부분의 UI 요소(버튼, 입력, 탭 등)는 `rounded`를 사용한다.

**`pill`은 태그를 감싸는 디자인에만 사용한다.** 짧은 텍스트 라벨을 알약형으로 감싸서 독립된 단위로 보여주는 경우가 pill의 유일한 용도이다.

| 요소 성격              | shape       | 이유                                      |
|------------------------|-------------|-------------------------------------------|
| 액션 버튼, 폼 요소     | **rounded** | UI 프레임의 일부 — 페이지 톤과 통일       |
| 탭, 네비게이션         | **rounded** | 구조적 요소 — 각진 형태가 자연스러움      |
| 태그, 라벨, 상태 뱃지  | **pill**    | 독립된 텍스트 단위 — 알약형이 구분감 제공 |
| 필터 칩 (선택/해제)    | **pill**    | 태그와 동일한 성격 — 개별 항목 강조       |

```
pill을 쓸지 판단하는 질문:
"이 요소가 짧은 텍스트를 태그처럼 감싸는 디자인인가?"
→ Yes → pill
→ No  → rounded
```

### 컴포넌트별 적용

| DS 컴포넌트    | shape 옵션                   | 기본값      | 규칙                              |
|----------------|------------------------------|-------------|-----------------------------------|
| `Button`       | `'rounded'` \| `'pill'`     | `'rounded'` | **rounded 사용** — pill 금지      |
| `ControlButton`| `'rounded'` \| `'circle'`   | `'rounded'` | **rounded 사용**                  |
| `Badge`        | `'rounded'` \| `'pill'`     | `'rounded'` | 태그 용도면 **pill**, 그 외 rounded |
| `Chip`         | `'rounded'` \| `'pill'`     | `'rounded'` | 태그/필터 용도면 **pill**         |
| `FilterButton` | `'rounded'` \| `'pill'`     | `'rounded'` | 태그형 필터면 **pill**            |
| `TabsList`     | `'rounded'` \| `'pill'`     | —           | **rounded 사용** — pill 금지      |

```
✅ <Button shape="rounded">              → 기본값, shape prop 생략 가능
❌ <Button shape="pill">                  → 버튼에 pill 금지
✅ <Badge shape="pill">New</Badge>        → 태그형 라벨 — pill 적합
✅ <Chip shape="pill">React</Chip>        → 태그 — pill 적합
✅ <Chip shape="rounded">React</Chip>     → 태그가 아닌 선택 UI — rounded
❌ <TabsList shape="pill">                → 탭에 pill 금지
```

## 3. 라운딩 규칙

**DS의 `rounded-*` 유틸리티 클래스를 사용한다.** DS가 `--radius-*` CSS 변수로 값을 관리하며, Tailwind 기본 `rounded-*`를 오버라이드한다.

### DS Radius 스케일

| DS 클래스 | CSS 변수 | 값 |
|-----------|----------|-----|
| `rounded-2xs` | `--radius-2xs` | 2px |
| `rounded-xs` | `--radius-xs` | 4px |
| `rounded-sm` | `--radius-sm` | **6px** |
| `rounded-md` | `--radius-md` | 8px |
| `rounded-lg` | `--radius-lg` | 12px |
| `rounded-xl` | `--radius-xl` | 16px |
| `rounded-2xl` | `--radius-2xl` | 24px |
| `rounded-3xl` | `--radius-3xl` | 28px |
| `rounded-full` | `--radius-full` | 9999px |

### 라운딩 3단계 규칙

> **핵심 원리: 감싸는 깊이가 깊을수록 radius가 커진다.**
> 말단 요소 → 컨테이너 → 콘텐츠 블록 순으로 라운딩 값이 증가한다.

| 용도 | DS 클래스 | 값 | 예시 |
|------|-----------|-----|------|
| **말단 요소** | **`rounded-sm`** | **6px** | 버튼, 칩, 뱃지, 입력필드 |
| **컨테이너** | **`rounded-md`** | **8px** | 말단 요소들을 감싸는 래퍼 |
| **콘텐츠 블록** | **`rounded-lg`** | **12px** | 말풍선, 카드, 패널, 알림 박스 (p-3 이상 패딩) |
| 모달, 오버레이 | `rounded-lg` | 12px | Dialog, 드롭다운, 팝오버 (absolute + shadow) |
| 아바타, 알약형 | `rounded-full` | 9999px | 원형 프로필, pill 뱃지 |

```
✅ rounded-sm                      → 작은 요소 (6px)
✅ rounded-md                      → 컨테이너 (8px)
✅ rounded-lg                      → 콘텐츠 블록, 모달/오버레이 (12px)
✅ rounded-full                    → 원형/알약형
❌ Tailwind의 rounded (접미사 없음) → rounded-sm 명시 사용
❌ rounded-[Npx] 임의값            → DS 스케일에서 선택
❌ 같은 유형에 다른 라운딩 적용     → 통일
```

### Concentric Border Radius (동심 라운딩)

> **생성 기본 규칙은 sm → md → lg 3단계다.**
> `outerRadius = innerRadius + padding`은 중첩 라운딩이 어색할 때만 사용하는 **검토 공식**이다.

내부 요소와 외부 컨테이너의 radius가 동일하면 시각적으로 어긋나 보인다. 외부 radius를 내부 radius + 사이 간격만큼 키워야 자연스러운 동심원을 이룬다.

```
예: 내부 버튼 rounded-sm(6px), 컨테이너 padding-8(8px)
→ 외부 컨테이너: 6 + 8 = 14px ≈ rounded-lg(12px) 또는 rounded-xl(16px)
```

- 기본 생성: 말단 요소 `rounded-sm` → 래퍼 `rounded-md` → 콘텐츠 블록 `rounded-lg`
- 공식 검토: 중첩 라운딩이 유난히 답답하거나 들떠 보일 때만 `outerRadius = innerRadius + padding`으로 검토
- DS 스케일에 정확한 값이 없으면 가장 가까운 단계(`sm`, `md`, `lg`) 중 시각적으로 더 자연스러운 쪽을 선택

### Optical Alignment (시각적 정렬)

> 기하학적 중앙과 시각적 중앙은 다르다. **눈에 맞춰 정렬**한다.

- 아이콘 버튼: 아이콘 쪽 padding을 텍스트 쪽보다 **2px 줄임**
- 재생(▶) 버튼: 삼각형을 **2px 우측으로** 시프트
- 비대칭 아이콘: 컴포넌트 margin이 아닌 **SVG 레벨에서 조정**

### DS 컴포넌트 기본 radius와 가이드라인 정합성

> DS 컴포넌트가 내부적으로 적용하는 radius가 가이드라인과 다른 경우, `index.css`에서 오버라이드한다.

| DS 컴포넌트 | 요소 | DS 기본 | 가이드라인 | 상태 |
|-------------|------|---------|-----------|------|
| **Button** `shape=rounded` | 버튼 전체 | `rounded-md` (8px) | `rounded-sm` (6px) | 오버라이드 적용 |
| **Input** (Default/AddOn/Button/Dropdown) | 입력 래퍼 | `rounded-md` (8px) | `rounded-sm` (6px) | 오버라이드 적용 |
| **ControlButton** `shape=rounded` | 아이콘 버튼 | `rounded-xs` (4px) | 미니 요소 유지 | DS 유지 |
| **FilterButton** `shape=rounded` | 필터 버튼 | `rounded-sm` (6px) | `rounded-sm` (6px) | ✅ 일치 |
| **TabsTrigger** | 탭 버튼 | `rounded-sm` (6px) | `rounded-sm` (6px) | ✅ 일치 |
| **TabsList** segmented | 탭 컨테이너 | `rounded-md` (8px) | `rounded-md` (8px) | ✅ 일치 |
| **Textarea** | 텍스트 영역 | `rounded-lg` (12px) | 콘텐츠 블록 | ✅ 일치 |
| **Select** dropdown | 드롭다운 패널 | `rounded-lg` (12px) | 콘텐츠 블록 | ✅ 일치 |
| **Select** item | 항목 | `rounded-sm` (6px) | 말단 요소 | ✅ 일치 |
| **Dialog** | 모달 패널 | `rounded-lg` (12px) | 모달/오버레이 | ✅ 일치 |
| **Card** | 카드 래퍼 | `rounded-lg` (12px) | 콘텐츠 블록 | ✅ 일치 |
