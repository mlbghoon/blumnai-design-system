// 크기 설정 조회 테이블
export const SIZE_CONFIG = {
  // 텍스트 스타일 (fontSize/lineHeight)
  text: {
    xs: 'size-xs line-height-leading-4',      // 12px / 16px
    md: 'size-sm line-height-leading-5',      // 14px / 20px
    lg: 'size-sm line-height-leading-5',      // 14px / 20px
  },
  // 아이콘 크기 (Figma 기준: 모든 크기에서 16px)
  icon: {
    xs: 16,
    md: 16,
    lg: 16,
  },
  // 갭 (Figma 기준: 모든 크기에서 4px)
  gap: {
    xs: 'ds-gap-4',
    md: 'ds-gap-4',
    lg: 'ds-gap-4',
  },
  // 패딩 (Figma 기준: horizontal / vertical)
  padding: {
    xs: 'padding-x-6 padding-y-4',   // 6px / 4px
    md: 'padding-x-8 padding-y-4',   // 8px / 4px
    lg: 'padding-x-10 padding-y-6',  // 10px / 6px
  },
  // 레터 스페이싱 (모든 크기에서 -0.6px)
  letterSpacing: {
    xs: 'letter-spacing-tracking-tight',
    md: 'letter-spacing-tracking-tight',
    lg: 'letter-spacing-tracking-tight',
  },
} as const;

// 형태 설정
export const SHAPE_CONFIG = {
  rounded: 'rounded-sm',    // 6px
  pill: 'rounded-full',     // 9999px
} as const;

// 기본 컨테이너 클래스
export const CONTAINER_BASE = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none' as const;

// 상태 설정
export const STATE_CONFIG = {
  // 미선택 상태: 점선 테두리
  unselected: {
    bg: 'bg-input',
    border: 'border-dashed border-darker',
    text: 'text-subtle',
    iconColor: 'var(--icon-default-muted)',
  },
  // 선택 상태: 실선 테두리 (card-border-default 사용)
  selected: {
    bg: 'bg-input',
    border: 'card-border-default',
    text: 'text-subtle',
    iconColor: 'var(--icon-default-muted)',
  },
  hover: {
    bg: 'hover:bg-input-soft',
  },
  active: {
    bg: 'active:bg-muted',
  },
  focus: {
    ring: 'focus-visible:shadow-component-focus',
  },
} as const;

// 비활성화 스타일
export const DISABLED_STYLE = {
  // 미선택 비활성화: 점선 테두리
  unselected: 'bg-state-disabled border-dashed border-default text-hint cursor-not-allowed',
  // 선택 비활성화: 실선 테두리
  selected: 'bg-state-disabled card-border-default text-hint cursor-not-allowed',
  iconColor: 'var(--icon-default-disabled)',
} as const;
