// 기본 컨테이너 클래스
export const CONTAINER_BASE = 'inline-flex items-center font-medium cursor-pointer transition-all duration-200 focus:outline-none' as const;

// 크기 설정 (Figma 기준: 단일 크기)
export const SIZE_CONFIG = {
  // 텍스트 스타일 (fontSize/lineHeight)
  text: 'size-sm line-height-leading-5',      // 14px / 20px
  // 아이콘 크기
  icon: 16,
  // 갭
  gap: 'ds-gap-4',                               // 4px
  // 패딩
  padding: 'padding-x-10 padding-y-6',        // 10px / 6px
  // 레터 스페이싱
  letterSpacing: 'letter-spacing-tracking-tight',  // -0.6px
  // 코너 라디우스
  radius: 'rounded-sm',                       // 6px
} as const;

// 라벨 텍스트 정렬 설정
export const ALIGN_CONFIG = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
} as const;

// 상태 설정
export const STATE_CONFIG = {
  default: {
    bg: 'bg-input',
    border: 'card-border-default',
    text: 'text-default',
    iconColor: 'var(--icon-default-muted)',
  },
  hover: {
    bg: 'hover:bg-input-soft',
  },
  active: {
    bg: 'active:bg-muted',
  },
  focus: {
    ring: '', // Focus handled by card-border-default:focus-visible CSS rule
  },
  opened: {
    bg: 'bg-input',
    border: 'card-border-default',
    text: 'text-default',
    iconColor: 'var(--icon-default-muted)',
  },
} as const;

// 비활성화 스타일
export const DISABLED_STYLE = {
  container: 'bg-state-disabled border-default text-hint cursor-not-allowed',
  iconColor: 'var(--icon-default-disabled)',
} as const;

// 뱃지(단축키) 스타일
export const BADGE_STYLE = {
  container: 'inline-flex items-center justify-center border-default rounded-xs padding-x-4',
  text: 'size-xs line-height-leading-4 text-subtle',
  size: 'height-20',  // 20px height
} as const;
