// 크기 설정 조회 테이블
export const SIZE_CONFIG = {
  // 텍스트 스타일 (fontSize/lineHeight)
  text: {
    sm: 'size-xs line-height-leading-4',      // 12px / 16px
    md: 'size-sm line-height-leading-5',      // 14px / 20px
    lg: 'size-md line-height-leading-6',      // 16px / 24px
  },
  // 아이콘 크기 (Figma 기준: 모든 크기에서 16px)
  icon: {
    sm: 16,
    md: 16,
    lg: 16,
  },
  // 갭 (Figma 기준: 모든 크기에서 4px)
  gap: {
    sm: 'ds-gap-4',
    md: 'ds-gap-4',
    lg: 'ds-gap-4',
  },
  // 레터 스페이싱
  letterSpacing: {
    sm: 'letter-spacing-tracking-tight',   // -0.6px
    md: 'letter-spacing-tracking-tight',   // -0.6px
    lg: 'letter-spacing-tracking-normal',  // 0
  },
} as const;

// 기본 컨테이너 클래스
export const CONTAINER_BASE = 'inline-flex items-center font-medium bg-transparent no-underline hover:no-underline transition-all duration-200 focus:outline-none' as const;

// 타입 설정: 텍스트 색상, 아이콘 색상
export const TYPE_CONFIG = {
  default: {
    text: 'text-default',
    hoverText: 'hover:text-subtle',
    iconColor: 'var(--icon-default-muted)',
  },
  muted: {
    text: 'text-muted',
    hoverText: 'hover:text-subtle',
    iconColor: 'var(--icon-default-muted)',
  },
  informative: {
    text: 'text-informative',
    hoverText: 'hover:text-informative',
    iconColor: 'var(--icon-informative)',
  },
} as const;

// 비활성화 스타일
export const DISABLED_STYLE = {
  text: 'text-hint cursor-not-allowed',
  iconColor: 'var(--icon-default-disabled)',
} as const;

// 호버 스타일 (컨테이너용 - 언더라인은 라벨에만 적용)
export const HOVER_STYLE = '' as const;
