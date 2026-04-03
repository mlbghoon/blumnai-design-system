# DS 컴포넌트 사용 규칙

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
