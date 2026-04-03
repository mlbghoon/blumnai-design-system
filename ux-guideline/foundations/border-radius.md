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

## 2. 버튼 Shape 규칙

**모든 버튼은 `rounded` (DS 기본값)를 사용한다.** `pill`은 의도적 케이스에만 허용.

| DS 컴포넌트 | shape 옵션 | 기본값 | 규칙 |
|-------------|-----------|--------|------|
| `Button` | `'rounded'` \| `'pill'` | `'rounded'` | **rounded 사용** (pill 금지, 의도적 예외만 허용) |
| `ControlButton` | `'rounded'` \| `'circle'` | `'rounded'` | **rounded 사용** |
| `Badge` | `'rounded'` \| `'pill'` | `'rounded'` | **rounded 사용** |
| `TabsList` | `'rounded'` \| `'pill'` | — | 컨텍스트에 따라 선택 |

```
✅ <Button shape="rounded">      → 기본값, shape prop 생략 가능
❌ <Button shape="pill">          → 의도적 예외가 아니면 금지
✅ <ControlButton shape="rounded"> → 기본값, shape prop 생략 가능
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

> **중첩된 라운딩 요소에서: `outerRadius = innerRadius + padding`**

내부 요소와 외부 컨테이너의 radius가 동일하면 시각적으로 어긋나 보인다. 외부 radius를 내부 radius + 사이 간격만큼 키워야 자연스러운 동심원을 이룬다.

```
예: 내부 버튼 rounded-sm(6px), 컨테이너 padding-8(8px)
→ 외부 컨테이너: 6 + 8 = 14px ≈ rounded-lg(12px) 또는 rounded-xl(16px)
```

- 3단계 규칙(sm→md→lg)이 대부분의 경우 자연스럽게 이 원칙을 충족
- 커스텀 레이아웃에서 중첩 라운딩이 어색하면 이 공식으로 검증

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

## 4. 리스트 패턴

UI 디자인에서 리스트는 크게 **2가지 유형**으로 구분한다.

### 유형 1: Data Table List

> **DS Table 컴포넌트를 적용한다.** 별도의 커스텀 스타일링 불필요.

정형화된 열(column) 기반 데이터를 표시할 때 사용.

### 유형 2: Card List

자유로운 레이아웃의 카드형 아이템을 나열할 때 사용. **2가지 서브타입**이 있다.

| 서브타입 | 아이템 간 | 결정 사항 |
|----------|-----------|-----------|
| **Gap 리스트** | `gap-*` / `space-y-*`로 분리 | gap 크기 + 개별 카드 radius 적용 여부 |
| **Gapless 리스트** | 밀착 (gap 없음) | 내부 padding + 전체 컨테이너 radius 적용 여부 |

**Gap 리스트**: 아이템 사이에 공간이 있어 각 아이템이 독립적으로 보임.
- 개별 아이템에 `rounded-*` 적용 가능
- 아이템 간 간격과 개별 radius는 디자이너+AI가 케이스별 판단

**Gapless 리스트**: 아이템이 밀착되어 하나의 연속된 영역으로 보임.
- 개별 아이템이 아닌 **전체 컨테이너**에 `rounded-*` 적용
- 내부 아이템은 `padding-*`으로 영역 확보, 필요시 `border-b-default`로 구분
- 내부 padding과 컨테이너 radius는 디자이너+AI가 케이스별 판단

### Default 원칙

> **디자이너 지침이 없을 때는 default 값을 우선 사용한다.**
> 면(面)을 구분해야 하는 케이스에만 `bg-muted`를 적용한다.

- gap/padding 등 구체적 수치는 디자이너+AI가 케이스별 판단
- 면 구분이 불필요하면 배경색 없이 간격/padding만으로 구분
- 면 구분이 필요하면 `bg-muted` 적용 (Gap: 개별 카드 / Gapless: 컨테이너)

```
✅ Gap 리스트    → 개별 아이템 radius, gap으로 구분
✅ Gapless 리스트 → 컨테이너 radius, 내부 padding + 선택적 border-b
✅ 면 구분 필요 시 → bg-muted 적용
❌ 같은 리스트에 gap + border-b 혼용 → 구분 방법은 하나만 사용
❌ 면 구분 불필요한 곳에 bg-muted 남용 → default 값 우선
```

## 5. 카드 & 컨테이너 강조도 가이드

> **원칙: 카드/컨테이너형 레이아웃 요소에 shadow와 border를 무조건 적용하지 않는다.**
> 모달 내부가 아닌 일반 레이아웃에서 카드형 요소를 구성할 때, **사용자의 의도에 맞는 강조도**를 먼저 확인한다.

### 강조도 2단계

| 모드 | 스타일 | 용도 |
|------|--------|------|
| **강조 (Emphasized)** | `shadow-component-default` + `border-default` | 독립적으로 돋보여야 하는 카드, 클릭 유도 요소, 중요 정보 블록 |
| **플랫 (Flat)** | shadow 없음, border 없음 또는 `border-b-default`로 구분 | 정보 나열, 설정 패널, 연속된 콘텐츠 영역 |

```
✅ 강조 카드 → shadow-component-default + border-default + rounded-lg
✅ 플랫 카드 → bg-subtle 또는 bg-default + padding만으로 영역 구분
✅ 플랫 리스트 → border-b-default로 아이템 간 구분
❌ 모든 카드에 일괄 shadow 적용 → 강조도 확인 후 적용
❌ 비전문가 사용자에게 radius/shadow 수치를 직접 질문
```

### AI 에이전트 워크플로우

카드/컨테이너 레이아웃을 새로 구성할 때 아래 순서를 따른다:

1. **사용자 의도 확인**: "이 영역을 강조해서 눈에 띄게 할까요, 플랫하게 배치할까요?" 식으로 질문
2. **강조** 선택 시 → `shadow-component-default` + `border-default` + `rounded-lg` 적용
3. **플랫** 선택 시 → shadow/border 없이 `bg-subtle` 또는 padding으로 영역 구분
4. radius/shadow 수치를 직접 묻지 않고, 위 2단계 중 선택하도록 유도

> **주의**: 이 가이드는 일반 레이아웃의 카드/컨테이너에 적용. 모달(`shadow-modal-*`)과 팝오버(`shadow-lg`)는 elevation 규칙을 따른다.
