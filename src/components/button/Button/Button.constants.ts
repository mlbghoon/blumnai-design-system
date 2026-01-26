// 크기 설정 조회 테이블
export const SIZE_CONFIG = {
  // 버튼 컨테이너 크기
  button: {
    iconOnly: {
      '2xs': 'width-24 height-24',
      'xs': 'width-28 height-28',
      'sm': 'width-32 height-32',
      'md': 'width-36 height-36',
      'lg': 'width-40 height-40',
    },
    default: {
      '2xs': 'height-24 size-xs line-height-leading-4 padding-x-6 padding-y-4 gap-4',
      'xs': 'height-28 size-sm line-height-leading-5 padding-x-8 padding-y-4 gap-4',
      'sm': 'height-32 size-sm line-height-leading-5 padding-x-10 padding-y-6 gap-4',
      'md': 'height-36 size-sm line-height-leading-5 padding-x-12 padding-y-8 gap-6',
      'lg': 'height-40 size-sm line-height-leading-5 padding-x-14 padding-y-10 gap-6',
    },
  },
  // 아이콘 크기 (Figma 기준) - default와 iconOnly 변형에 따라 다름
  icon: {
    default: { '2xs': 16, 'xs': 16, 'sm': 16, 'md': 16, 'lg': 18 },
    iconOnly: { '2xs': 16, 'xs': 16, 'sm': 20, 'md': 20, 'lg': 20 },
  },
  // 단축키 뱃지 크기 (Figma 기준, 유틸리티 클래스 사용)
  shortcut: {
    '2xs': 'min-w-[16px] height-16 size-xs padding-x-4 rounded-xs',
    'xs': 'min-w-[16px] height-16 size-xs padding-x-4 rounded-xs',
    'sm': 'min-w-[20px] height-20 size-xs padding-x-4 rounded-xs',
    'md': 'min-w-[20px] height-20 size-xs padding-x-4 rounded-xs',
    'lg': 'min-w-[20px] height-20 size-xs padding-x-4 rounded-xs',
  },
} as const;

// 단축키 색상 설정
export const SHORTCUT_STYLE = {
  light: 'bg-muted border border-default text-subtle',
  inverted: 'bg-[#ffffff1a] border border-[#ffffff33] text-white',
} as const;

// 기본 컨테이너 클래스
export const CONTAINER_BASE = 'inline-flex items-center justify-center transition-all duration-200 focus:outline-none' as const;

// 기본 변형(iconOnly 아님)의 텍스트 스타일
export const TEXT_STYLE = 'font-medium letter-spacing-tracking-normal' as const;

// 비활성화 상태 스타일
export const DISABLED_STYLE = 'bg-state-disabled text-hint cursor-not-allowed' as const;

// 스타일 설정: 기본, hover+active 상태, focus, loading
export const STYLE_CONFIG = {
  primary: {
    base: 'bg-state-primary text-white border border-transparent',
    states: 'hover:bg-state-primary-hover active:bg-state-primary-press',
    focus: 'focus-visible:shadow-component-focus',
    loading: 'bg-state-primary-loading text-white border border-transparent',
  },
  secondary: {
    base: 'bg-state-secondary text-default border-default',
    states: 'hover:bg-state-secondary-hover active:bg-state-secondary-press',
    focus: 'focus-visible:shadow-component-focus',
    loading: 'bg-state-secondary-loading text-default border-default',
  },
  destructive: {
    base: 'bg-state-destructive text-white border border-transparent',
    states: 'hover:bg-state-destructive-hover active:bg-state-destructive-press',
    focus: 'focus-visible:shadow-component-destructive-focus',
    loading: 'bg-state-destructive-loading text-white border border-transparent',
  },
  ghost: {
    base: 'bg-state-ghost text-subtle border border-transparent',
    states: 'hover:bg-state-ghost-hover active:bg-state-ghost-press',
    focus: 'focus-visible:shadow-component-misc-focus',
    loading: 'bg-state-ghost-loading text-subtle border border-transparent',
  },
  ghostMuted: {
    base: 'bg-state-ghost text-muted border border-transparent',
    states: 'hover:bg-state-ghost-hover active:bg-state-ghost-press',
    focus: 'focus-visible:shadow-component-misc-focus',
    loading: 'bg-state-ghost-loading text-subtle border border-transparent',
  },
  soft: {
    base: 'bg-state-soft text-subtle border border-transparent',
    states: 'hover:bg-state-soft-hover active:bg-state-soft-press',
    focus: 'focus-visible:shadow-component-misc-focus',
    loading: 'bg-state-soft-loading text-subtle border border-transparent',
  },
  dashed: {
    base: 'bg-state-secondary text-default border border-dashed border-default',
    states: 'hover:bg-state-secondary-hover active:bg-state-secondary-press',
    focus: 'focus-visible:shadow-component-misc-focus',
    loading: 'bg-state-secondary-loading text-default border border-dashed border-default',
  },
} as const;
