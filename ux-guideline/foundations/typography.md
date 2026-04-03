# 타이포그래피 (Typography)

## 1. 텍스트 크기 규칙

**DS의 `size-*` 유틸리티 클래스를 사용한다.** Tailwind의 `text-xs`/`text-sm` 등은 사용하지 않는다.

| 용도 | DS 클래스 | 크기 | 비고 |
|------|-----------|------|------|
| 캡션, 뱃지, 메타데이터 | `size-xs` | 12px | 보조 정보 |
| 본문, 라벨, 목록 아이템 | `size-sm` | 14px | **기본값** (가장 많이 사용) |
| 섹션 제목, 강조 텍스트 | `size-md` | 16px | 소제목, 강조 |
| 페이지/패널 제목 | `size-lg` | 18px | 최상위 제목 |
| 큰 제목 (드물게) | `size-xl` | 20px | 특수 경우만 |

> 전체 DS 크기: `size-xs`(12) → `size-sm`(14) → `size-md`(16) → `size-lg`(18) → `size-xl`(20) → `size-2xl`(24) → `size-3xl`(30) ...

## 2. 금지 패턴

```
❌ text-xs, text-sm, text-base, text-lg   → DS size-* 클래스 사용
❌ text-[10px], text-[11px], text-[13px]  → 임의 픽셀값 금지
❌ font-bold 남용                          → 아래 굵기 규칙 참조
```

## 3. 폰트 굵기 (font-weight)

3단계만 사용한다:

| 용도 | 클래스 | weight | 설명 |
|------|--------|--------|------|
| 일반 텍스트, 본문, 목록 | `font-normal` | **400** | 기본값 (생략 가능) |
| 버튼, Input 라벨, 폼 라벨 | `font-medium` | **500** | 버튼 텍스트 + 입력 필드 라벨 |
| 섹션 제목, 패널 제목, 강조 | `font-semibold` | **600** | 제목/헤딩 계열 |

```
❌ font-light (300)   → 사용 금지
❌ font-bold (700)    → 사용 금지 (font-semibold로 대체)
❌ font-extrabold     → 사용 금지
```

## 4. 텍스트 줄바꿈

| 속성 | Tailwind | 용도 | 제한 |
|------|----------|------|------|
| `text-wrap: balance` | `text-balance` | 제목, 짧은 텍스트 — 줄 간 길이 균등 분배 | Chromium 6줄, Firefox 10줄 이하 |
| `text-wrap: pretty` | `text-pretty` | 본문, 긴 텍스트 — 마지막 줄 orphan 방지 | 줄 수 제한 없음 |

## 5. 폰트 스무딩

> macOS에서 텍스트 렌더링을 선명하게 한다. **루트에 1회 적용** (개별 요소에 적용하지 않음).

```css
html {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

다른 플랫폼에서는 무시되므로 안전하게 전역 적용 가능.

## 6. Tabular Numbers

> 동적으로 변하는 숫자(카운터, 가격, 타이머)에는 `tabular-nums`를 적용하여 레이아웃 시프트를 방지한다.

```
✅ font-[tabular-nums]  → 카운터, 가격, 타이머 등 변동 숫자
❌ 정적 숫자에 tabular-nums → 불필요
```
