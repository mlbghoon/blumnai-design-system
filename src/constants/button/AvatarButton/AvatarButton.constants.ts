// 크기 설정 조회 테이블
export const SIZE_CONFIG = {
  // 버튼 컨테이너 크기
  button: {
    sm: 'height-28 padding-y-4 padding-l-4 padding-r-8 ds-gap-4',
    lg: 'height-32 padding-y-6 padding-l-6 padding-r-12 ds-gap-6',
  },
  // 아바타 크기 (Figma 기준 20x20 = Avatar 'xs')
  avatar: {
    sm: 'xs',
    lg: 'xs',
  },
  // 아이콘 크기
  icon: {
    sm: 20,
    lg: 20,
  },
} as const;

// 기본 컨테이너 클래스
export const CONTAINER_BASE = 'inline-flex items-center rounded-full transition-all duration-200 focus:outline-none' as const;

// 텍스트 스타일
export const TEXT_STYLE = 'font-body size-sm line-height-leading-5 font-medium letter-spacing-tracking-normal' as const;

// 스타일 설정: 기본, hover+active 상태, focus, disabled
export const STYLE_CONFIG = {
  default: {
    base: 'bg-state-secondary text-default border-darker',
    states: 'hover:bg-state-secondary-hover active:bg-state-secondary-press',
    focus: 'focus-visible:shadow-component-focus',
    disabled: 'bg-state-disabled text-hint border-default cursor-not-allowed',
  },
  dashed: {
    base: 'bg-state-secondary text-default border border-dashed border-darker',
    states: 'hover:bg-state-secondary-hover active:bg-state-secondary-press',
    focus: 'focus-visible:shadow-component-focus',
    disabled: 'bg-state-disabled text-hint border border-dashed border-default cursor-not-allowed',
  },
  soft: {
    base: 'bg-state-soft text-default border-none',
    states: 'hover:bg-state-soft-hover active:bg-state-soft-press',
    focus: 'focus-visible:shadow-component-misc-focus',
    disabled: 'bg-muted text-hint border-none cursor-not-allowed',
  },
} as const;
