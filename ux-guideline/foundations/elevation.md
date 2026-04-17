# 그림자 & 깊이 (Shadow & Depth)

## 1. Elevation 단계

> **원칙: DS가 제공하는 shadow 유틸리티만 사용한다.**
> DS에는 글로벌 shadow 4종 + 컴포넌트 shadow가 정의되어 있다.
> Tailwind 기본 `shadow-sm`, `shadow-md`, `shadow-lg` 등은 DS에 정의되어 있지 않으므로 사용하지 않는다.
> **대부분의 UI는 shadow 없이 구성한다.** shadow는 위계 구분이나 부유가 필요한 경우에만 선택적으로 적용한다.

| DS 클래스 | 의미 | 용도 | 예시 |
|-----------|------|------|------|
| (없음) | **바닥** — 기본 상태 | 대부분의 UI. 카드, 패널, 리스트 등 평면 요소 | 일반 카드, 설정 패널, 리스트 아이템 |
| `shadow-card` | **미세한 구분** — 같은 평면 안에서 위계를 표현해야 할 때 optional로 사용 | 1개 페이지 안에 위계가 다른 카드가 산재하는 경우, 강조가 필요한 일부 카드에만 선택 적용 | 요금 페이지의 주요 status card (강조), 나머지 일반 카드는 no shadow |
| `shadow-modal-sm` | **부유** — 페이지 위에 떠 있는 요소 | 드롭다운, 팝오버, 플로팅 버튼 등 페이지 표면에서 분리된 요소 | Select 드롭다운, 알림 팝오버, FAB |
| `shadow-modal-md` | **오버레이** — 상호작용 상태에서 강조가 필요한 경우 | 모달, 다이얼로그 등 사용자의 작업 흐름을 일시 중단하는 요소 | Dialog, ConfirmAlert, 설정 모달 |
| `shadow-modal-lg` | **최상위** — 사용자의 시선을 완전히 집중시켜야 하는 주요 오버레이 | 일시적으로 주요한 정보를 표시하는 높은 레이어, 대형 모달 | 복합 설정 모달, 풀스크린에 가까운 오버레이 |

## 2. DS Shadow 토큰

### 글로벌 Shadow

`src/styles/utilities.css`에 `@utility`로 정의. 수동으로 적용하는 shadow.

| 클래스 | box-shadow 값 | 용도 |
|--------|--------------|------|
| `shadow-card` | `0 1px 2px rgba(0,0,0,0.05)`, `inset 0 -1px 0 rgba(0,0,0,0.1)` | 카드 기본 — 미세한 깊이 + 하단 인셋 라인 |
| `shadow-modal-sm` | 4단계 레이어드 (`1px→12px`) + `1px border-default ring` | 팝오버, 작은 드롭다운 |
| `shadow-modal-md` | 5단계 레이어드 (`1px→12px`) + `1px border-default ring` | 일반 모달 |
| `shadow-modal-lg` | 6단계 레이어드 (`1px→16px`) + `1px border-default ring` | 대형 모달 |

> modal 계열 shadow는 `border-default` ring을 포함하므로 별도 border 추가 불필요.

### 컴포넌트 Shadow (DS 자동 적용)

폼 컴포넌트(Input, Select, Textarea)에 DS가 자동 적용. **수동으로 추가하지 않는다.**

| 클래스 | 용도 |
|--------|------|
| `shadow-components-default` | 기본 상태 — 미세 drop shadow + 1px border |
| `shadow-component-focus` | 일반 포커스 — focus ring + highlight border |
| `shadow-component-input-focus` | 입력 필드 포커스 — highlight ring + input border |
| `shadow-component-destructive-focus` | 에러 포커스 — destructive focus ring |
| `shadow-component-input-focus-error` | 입력 필드 에러 포커스 |
| `shadow-component-misc-focus` | 기타 포커스 (checkbox 등) |

## 3. 사용 규칙

1. **DS shadow만 사용**: `shadow-card`, `shadow-modal-sm/md/lg`만 사용. Tailwind 기본 `shadow-sm`, `shadow-md`, `shadow-lg`는 DS에 정의되지 않음
2. **elevation 역전 금지**: 같은 컨테이너 안에서 자식이 부모보다 낮은 shadow를 가지면 안 됨
3. **다크 모드 자동 대응**: DS shadow는 투명도 기반(`rgba`)이므로 다크 모드에서 별도 처리 불필요
4. **커스텀 shadow 금지**: DS에 정의된 shadow 외에 임의 `box-shadow` 추가 금지

```
✅ shadow-card                     → 카드 깊이
✅ shadow-modal-sm                 → 팝오버, 드롭다운
✅ shadow-modal-md                 → 일반 모달
✅ shadow-modal-lg                 → 대형 모달
✅ shadow-components-default       → DS 폼 컴포넌트 (자동 적용)
❌ shadow-sm, shadow-md, shadow-lg → DS에 없음, 사용 금지
❌ shadow-[custom]                 → 임의 shadow 금지
```

## 4. Shadow > Border 원칙

> 카드/버튼의 **깊이 표현**에는 border 대신 **shadow**를 사용한다.

- Shadow는 투명도 기반이라 어떤 배경에서도 자연스러움
- Border는 특정 배경에서만 어울림 (다크모드에서 깨지기 쉬움)
- **레이아웃 구분선**(divider, separator)에는 여전히 border 사용 — shadow 적용 금지

```
✅ 카드 깊이 → shadow-card (border 대신)
✅ 떠있는 요소 → shadow-modal-sm
✅ 레이아웃 구분 → border-default
❌ 카드 깊이를 border로 표현 → shadow 사용
❌ 구분선을 shadow로 표현 → border 사용
```

## 5. 이미지 아웃라인

> 이미지에 미세한 인셋 아웃라인을 추가하여 배경과의 깊이감을 확보한다.

```css
img {
  outline: 1px solid rgba(0, 0, 0, 0.1);
  outline-offset: -1px;
}
```

- `outline-offset: -1px` — 이미지 내부에 아웃라인이 그려져 레이아웃 시프트 없음
- 모든 이미지에 기계적으로 적용하지 않음 — 배경과 구분이 필요한 경우에만

## 6. z-index 규칙

| 레이어 | z-index | 용도 |
|--------|---------|------|
| 기본 콘텐츠 | `z-0` ~ `z-10` | 일반 UI |
| 사이드 오버레이 | `z-40` | SideTabOverlay 등 |
| 팝오버/드롭다운 | `z-50` | DS Popover, Tooltip |
| 모달/다이얼로그 | `z-[10000]` | DS Dialog |
| 툴팁 (모달 위) | `z-[10001]` | 임시 오버라이드 |

**새 z-index 추가 시 이 테이블 업데이트 필수.**
