// 크기 설정 조회 테이블
export const SIZE_CONFIG = {
  // 버튼 컨테이너 크기
  button: {
    sm: 'width-16 height-16',
    md: 'width-20 height-20',
    lg: 'width-24 height-24',
  },
  // 아이콘 크기 (Figma 기준)
  icon: {
    sm: 14,
    md: 16,
    lg: 16,
  },
} as const;

// 기본 컨테이너 클래스
export const CONTAINER_BASE = 'inline-flex items-center justify-center transition-all duration-200 focus:outline-none' as const;

// 모양 설정
export const SHAPE_CONFIG = {
  rounded: 'rounded-xs',
  circle: 'rounded-full',
} as const;

// 스타일 설정: 기본, hover+active 상태, focus
export const STYLE_CONFIG = {
  default: {
    base: 'bg-transparent',
    states: 'hover:bg-state-ghost-hover active:bg-state-ghost-press',
    focus: 'focus-visible:shadow-component-misc-focus',
    iconColor: 'var(--icon-default-muted)',
    disabledIconColor: 'var(--icon-default-disabled)',
  },
  inverted: {
    base: 'bg-transparent',
    states: 'hover:bg-white/[0.08] active:bg-white/[0.15]',
    focus: 'focus-visible:shadow-component-misc-focus',
    iconColor: 'var(--icon-white-default)',
    disabledIconColor: 'var(--icon-white-disabled)',
  },
} as const;

// 비활성화 스타일
export const DISABLED_STYLE = 'bg-transparent cursor-not-allowed' as const;
