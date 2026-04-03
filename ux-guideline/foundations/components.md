# DS 컴포넌트 사용 규칙

## 기본 선택 원칙

- 새 UI를 만들 때 **먼저 DS 컴포넌트를 찾는다.** 직접 구현은 DS에 없을 때만.
- 정보 나열은 **플랫**, 클릭 유도/강조가 필요하면 **카드**(shadow-card).
- 텍스트 라벨이 충분하면 **툴팁을 붙이지 않는다.**
- 리스트 구분 방식은 **gap 또는 divider 중 하나만** 쓴다.
- 모달은 **fit-content** 기본, 오버플로우 시 내부 스크롤.

## 1. 필수 DS 사용 (직접 구현 금지)

| UI 요소 | DS 컴포넌트 | 비고 |
|---------|-------------|------|
| 버튼 | `Button`, `ControlButton`, `LinkButton` | variant, size prop 활용 |
| 입력 필드 | `Input` (12개 variant) | type prop으로 변형 |
| 선택 | `Select`, `Combobox`, `VirtualSelect` | |
| 체크박스/라디오 | `Checkbox`, `Radio`, `Switch` | |
| 탭 | `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` | |
| 다이얼로그 | `Dialog`, `AlertDialog`, `ConfirmDialog` | |
| 툴팁 | `TooltipTrigger` | |
| 팝오버 | `Popover` | |
| 아바타 | `Avatar`, `AvatarGroup` | |
| 뱃지/칩 | `Badge`, `Chip` | |
| 스크롤 영역 | `ScrollArea` | |
| 아이콘 | `Icon` (from DS) | lucide-react도 허용 |
| 토스트 | `toast()` | |
| 날짜 선택 | `DatePicker`, `DateRangePicker` | |
| 데이터 그리드 | `DataGrid` | |

## 2. 모달 사이즈

### 기본 높이: `fit-content`

모달(Dialog)의 세로 크기는 콘텐츠에 맞춘다. 고정 높이를 지정하지 않는다.

### 오버플로우 처리

콘텐츠가 브라우저 뷰포트 높이를 초과할 경우:

```
max-height: calc(100vh - 48px)   /* 상하 24px 마진 */
overflow-y: auto                  /* 내부 스크롤 */
```

Tailwind 적용:
```html
<DialogContent className="max-h-[calc(100vh-48px)]">
  <DialogScrollArea>
    ...콘텐츠...
  </DialogScrollArea>
</DialogContent>
```

### 복합 UI 모달

디테일한 설정을 위해 복합적인 UI를 가지는 모달도 동일한 규칙을 따른다:
- 세로: `fit-content` (기본) → 뷰포트 초과 시 `max-h-[calc(100vh-48px)]` + 스크롤
- 가로: 콘텐츠 복잡도에 따라 `width` prop 조정 (DS Dialog 기본값 우선)

## 3. 툴팁 (Tooltip)

### 원칙: DS `TooltipTrigger` 사용

HTML `title` 속성 대신 DS `TooltipTrigger`를 사용한다.

| | HTML `title` | DS `TooltipTrigger` |
|---|---|---|
| 스타일 | 브라우저 기본 (제어 불가) | DS 테마 연동 |
| 위치 제어 | 불가 | `placement` prop |
| 딜레이 | 브라우저 기본 (~400ms) | `delay` prop |
| 리치 콘텐츠 | 텍스트만 | ReactNode (아이콘, 뱃지 등) |
| 단축키 표시 | 불가 | `badge` prop |

### 기본 사용법

```tsx
{/* 텍스트 툴팁 */}
<TooltipTrigger content="저장">
  <Button leadIcon={<Icon iconType={['system', 'save']} />} />
</TooltipTrigger>

{/* 단축키 포함 */}
<TooltipTrigger content="저장" badge="⌘S">
  <Button leadIcon={<Icon iconType={['system', 'save']} />} />
</TooltipTrigger>

{/* 위치 지정 */}
<TooltipTrigger content="설정" placement="bottom">
  <Button />
</TooltipTrigger>
```

### 기본값 (DS 기본 유지)

| prop | 기본값 | 비고 |
|------|--------|------|
| `placement` | `top` | 트리거 위에 표시 |
| `delay` | `200` | ms 단위, 즉시 표시 방지 |
| `maxWidth` | `240` | px 단위 |
| `sideOffset` | `8` | 트리거와의 거리(px) |

**디자이너 별도 지침 없으면 기본값 사용.**

### 툴팁 적용 대상

```
✅ 아이콘 전용 버튼 (iconOnly)        → 필수 (접근성)
✅ 잘린 텍스트 (truncate/ellipsis)    → 필수 (전체 텍스트 확인)
✅ 단축키가 있는 액션                  → badge prop 활용
✅ 상태 표시 아이콘/뱃지               → 상태 설명
❌ 텍스트 라벨이 충분한 버튼           → 불필요
❌ 이미 설명이 있는 요소               → 중복 금지
```

### 콘텐츠 작성 규칙

- **간결하게**: 1줄, 최대 2줄. 긴 설명은 툴팁이 아닌 별도 UI로
- **동사형**: "저장", "삭제", "새 탭 열기" (명사형 "저장 버튼" ❌)
- **현재 상태 반영**: 토글 버튼은 현재 상태가 아닌 **클릭 시 동작** 표시
  ```tsx
  // ✅ 현재 좋아요 → 클릭하면 해제
  <TooltipTrigger content="좋아요 취소">
  // ❌ 현재 상태 설명
  <TooltipTrigger content="좋아요됨">
  ```

## 4. DS 컴포넌트 스타일 오버라이드 최소화

```
✅ className prop으로 외부 간격(margin) 조정       → 허용
✅ DS variant/size prop으로 스타일 변경              → 권장
❌ DS 내부 구조를 CSS 셀렉터로 강제 오버라이드       → 최소화
❌ DS 컴포넌트를 감싸서 완전히 다른 스타일 적용       → 금지
```

## 5. 리스트 패턴

UI 디자인에서 리스트는 크게 **2가지 유형**으로 구분한다.

### 유형 1: Data Table List

> **DS Table 컴포넌트를 적용한다.** 별도의 커스텀 스타일링 불필요.

정형화된 열(column) 기반 데이터를 표시할 때 사용.

### 유형 2: Card List

자유로운 레이아웃의 카드형 아이템을 나열할 때 사용. **2가지 서브타입**이 있다.

| 서브타입 | 아이템 간 | 결정 사항 |
| -------- | --------- | --------- |
| **Gap 리스트** | `ds-gap-*`로 분리 | gap 크기 + 개별 카드 radius 적용 여부 |
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

## 6. 카드 & 컨테이너 강조도 가이드

> **원칙: 카드/컨테이너형 레이아웃 요소에 shadow와 border를 무조건 적용하지 않는다.**
> 모달 내부가 아닌 일반 레이아웃에서 카드형 요소를 구성할 때, **사용자의 의도에 맞는 강조도**를 먼저 확인한다.

### 강조도 2단계

| 모드 | 스타일 | 용도 |
| ---- | ------ | ---- |
| **강조 (Emphasized)** | `shadow-card` + `border-default` | 독립적으로 돋보여야 하는 카드, 클릭 유도 요소, 중요 정보 블록 |
| **플랫 (Flat)** | shadow 없음, border 없음 또는 `border-b-default`로 구분 | 정보 나열, 설정 패널, 연속된 콘텐츠 영역 |

```
✅ 강조 카드 → shadow-card + border-default + rounded-lg
✅ 플랫 카드 → bg-subtle 또는 bg-default + padding만으로 영역 구분
✅ 플랫 리스트 → border-b-default로 아이템 간 구분
❌ 모든 카드에 일괄 shadow 적용 → 강조도 확인 후 적용
❌ 비전문가 사용자에게 radius/shadow 수치를 직접 질문
```

### AI 에이전트 워크플로우

카드/컨테이너 레이아웃을 새로 구성할 때 아래 순서를 따른다:

1. **사용자 의도 확인**: "이 영역을 강조해서 눈에 띄게 할까요, 플랫하게 배치할까요?" 식으로 질문
2. **강조** 선택 시 → `shadow-card` + `border-default` + `rounded-lg` 적용
3. **플랫** 선택 시 → shadow/border 없이 `bg-subtle` 또는 padding으로 영역 구분
4. radius/shadow 수치를 직접 묻지 않고, 위 2단계 중 선택하도록 유도

> **주의**: 이 가이드는 일반 레이아웃의 카드/컨테이너에 적용. 모달(`shadow-modal-md`)과 팝오버(`shadow-modal-sm`)는 elevation 규칙을 따른다.
