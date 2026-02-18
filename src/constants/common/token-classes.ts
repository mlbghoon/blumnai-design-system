/**
 * 토큰 기반 Tailwind CSS 클래스 이름
 * 이 클래스들은 src/index.css에 정의된 CSS 변수에 대응됩니다
 * 모든 클래스는 현재 테마(라이트/다크)에 자동으로 적응합니다
 */

// Background 토큰 클래스
export const BG = {
  default: 'bg-default',
  subtle: 'bg-subtle',
  muted: 'bg-muted',
  inverted: 'bg-inverted',
  accent: 'bg-accent', // Fixed color for avatar initials (#6f6f77)
  card: 'bg-card',
  cardSubtle: 'bg-card-subtle',
  cardInverted: 'bg-card-inverted',
  transparent: 'bg-transparent',
} as const;

// Background State 토큰 클래스
export const BG_STATE = {
  soft: 'bg-state-soft',
  softHover: 'bg-state-soft-hover',
  softPress: 'bg-state-soft-press',
  ghost: 'bg-state-ghost',
  ghostHover: 'bg-state-ghost-hover',
  ghostPress: 'bg-state-ghost-press',
  ghostInverted: 'bg-state-ghost-inverted',
  ghostHoverInverted: 'bg-state-ghost-hover-inverted',
  ghostPressInverted: 'bg-state-ghost-press-inverted',
  primary: 'bg-state-primary',
  primaryHover: 'bg-state-primary-hover',
  primaryPress: 'bg-state-primary-press',
  secondary: 'bg-state-secondary',
  secondaryHover: 'bg-state-secondary-hover',
  secondaryPress: 'bg-state-secondary-press',
} as const;

// Border 토큰 클래스
export const BORDER = {
  default: 'border-default',
  darker: 'border-darker',
  strong: 'border-strong',
  inverted: 'border-inverted',
  accent: 'border-accent',
  accentInverted: 'border-accent-inverted',
  destructive: 'border-destructive',
  informative: 'border-informative',
  success: 'border-success',
  warning: 'border-warning',
} as const;

// Text 토큰 클래스
export const TEXT = {
  default: 'text-default',
  subtle: 'text-subtle',
  muted: 'text-muted',
  hint: 'text-hint',
  invertedDefault: 'text-inverted-default',
  invertedSubtle: 'text-inverted-subtle',
  invertedMuted: 'text-inverted-muted',
  invertedHint: 'text-inverted-hint',
  whiteDefault: 'text-white-default',
  whiteSubtle: 'text-white-subtle',
  whiteMuted: 'text-white-muted',
  whiteHint: 'text-white-hint',
  destructive: 'text-destructive',
  success: 'text-success',
  warning: 'text-warning',
  informative: 'text-informative',
} as const;

// 공통 Layout 클래스
export const LAYOUT = {
  flex: 'flex',
  flexCol: 'flex flex-col',
  flexCenter: 'flex items-center justify-center',
  wFull: 'w-full',
  hFull: 'h-full',
} as const;

// 공통 Spacing 클래스
export const SPACING = {
  p6: 'padding-24',
  py6: '[padding-block:24px]',
  px0: 'padding-x-0',
  pt2: '[padding-top:8px]',
} as const;

// Border Radius 토큰 클래스
// Structured by size, then by Figma mode (default, rounded, full, none)
// Each mode corresponds to a Figma variable mode:
// - default: "Default" mode in Figma
// - rounded: "Rounded" mode in Figma
// - full: "Full" mode in Figma
// - none: "None" mode in Figma
// All classes include the 'rounded-' prefix to work with Tailwind's borderRadius config
export const RADIUS = {
  none: {
    default: 'rounded-radius-none',
    rounded: 'rounded-radius-none',
    full: 'rounded-radius-none',
    none: 'rounded-radius-none',
  },
  '2xs': {
    default: 'rounded-radius-2xs',
    rounded: 'rounded-radius-2xs-rounded',
    full: 'rounded-radius-2xs-full',
    none: 'rounded-radius-2xs-none',
  },
  xs: {
    default: 'rounded-radius-xs',
    rounded: 'rounded-radius-xs-rounded',
    full: 'rounded-radius-xs-full',
    none: 'rounded-radius-xs-none',
  },
  sm: {
    default: 'rounded-radius-sm',
    rounded: 'rounded-radius-sm-rounded',
    full: 'rounded-radius-sm-full',
    none: 'rounded-radius-sm-none',
  },
  md: {
    default: 'rounded-radius-md',
    rounded: 'rounded-radius-md-rounded',
    full: 'rounded-radius-md-full',
    none: 'rounded-radius-md-none',
  },
  lg: {
    default: 'rounded-radius-lg',
    rounded: 'rounded-radius-lg-rounded',
    full: 'rounded-radius-lg-full',
    none: 'rounded-radius-lg-none',
  },
  xl: {
    default: 'rounded-radius-xl',
    rounded: 'rounded-radius-xl-rounded',
    full: 'rounded-radius-xl-full',
    none: 'rounded-radius-xl-none',
  },
  '2xl': {
    default: 'rounded-radius-2xl',
    rounded: 'rounded-radius-2xl-rounded',
    full: 'rounded-radius-2xl-full',
    none: 'rounded-radius-2xl-none',
  },
  '3xl': {
    default: 'rounded-radius-3xl',
    rounded: 'rounded-radius-3xl-rounded',
    full: 'rounded-radius-3xl-full',
    none: 'rounded-radius-3xl-none',
  },
  full: {
    default: 'rounded-radius-full',
    rounded: 'rounded-radius-full-rounded',
    full: 'rounded-radius-full-full',
    none: 'rounded-radius-full-none',
  },
  // Card radius tokens
  card: {
    none: {
      default: 'rounded-radius-card-none',
      rounded: 'rounded-radius-card-none',
      full: 'rounded-radius-card-none',
      none: 'rounded-radius-card-none',
    },
    xs: {
      default: 'rounded-radius-card-xs',
      rounded: 'rounded-radius-card-xs-rounded',
      full: 'rounded-radius-card-xs-full',
      none: 'rounded-radius-card-xs-none',
    },
    sm: {
      default: 'rounded-radius-card-sm',
      rounded: 'rounded-radius-card-sm-rounded',
      full: 'rounded-radius-card-sm-full',
      none: 'rounded-radius-card-sm-none',
    },
    md: {
      default: 'rounded-radius-card-md',
      rounded: 'rounded-radius-card-md-rounded',
      full: 'rounded-radius-card-md-full',
      none: 'rounded-radius-card-md-none',
    },
    lg: {
      default: 'rounded-radius-card-lg',
      rounded: 'rounded-radius-card-lg-rounded',
      full: 'rounded-radius-card-lg-full',
      none: 'rounded-radius-card-lg-none',
    },
  },
} as const;

// 공통 Border 스타일 클래스
export const BORDER_STYLE = {
  border: 'border',
  border0: 'border-0',
  borderB: 'border-b',
} as const;

// Effects (Shadows) 토큰 클래스
// Flattened structure for easier use, similar to BG, TEXT, BORDER
export const SHADOWS = {
  // Global shadows
  card: 'shadow-card',
  modalSm: 'shadow-modal-sm',
  modalMd: 'shadow-modal-md',
  modalLg: 'shadow-modal-lg',
  // Component shadows
  componentDefault: 'shadow-component-default',
  componentFocus: 'shadow-component-focus',
  componentDestructiveFocus: 'shadow-component-destructive-focus',
  componentInputFocus: 'shadow-component-input-focus',
} as const;
