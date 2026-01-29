/**
 * DropdownMenu 컴포넌트 상수
 *
 * Figma 디자인 기반 설정값
 */

// 메뉴 컨테이너 기본 스타일
export const MENU_CONTAINER_BASE = 'flex flex-col bg-card rounded-lg shadow-modal-sm' as const;

// 메뉴 컨테이너 사이즈 설정
export const MENU_SIZE_CONFIG = {
  minWidth: 'min-width-200',
  maxWidth: 'max-width-320',
  padding: 'padding-y-4',
} as const;

// 메뉴 아이템 컨테이너 기본 스타일
export const ITEM_CONTAINER_BASE = 'flex w-full padding-x-4' as const;

// 메뉴 아이템 내부 컨테이너 기본 스타일
export const ITEM_INNER_BASE = 'flex items-center w-full rounded-xs transition-colors duration-150' as const;

// 메뉴 아이템 사이즈 설정
export const ITEM_SIZE_CONFIG = {
  default: {
    height: 'height-32',
    padding: 'padding-6',
    gap: 'gap-4',
    iconSize: 16 as const,
    iconFrame: 'width-20 height-20',
    iconFrameBg: '',
    text: 'size-sm line-height-leading-5 letter-spacing-tracking-tight',
  },
  large: {
    height: 'min-height-50',
    padding: 'padding-x-8 padding-y-6',
    gap: 'gap-4',
    iconSize: 20 as const,
    iconFrame: 'width-36 height-36',
    iconFrameBg: 'bg-muted rounded-full',
    text: 'size-sm line-height-leading-5 letter-spacing-tracking-tight',
  },
} as const;

// 메뉴 아이템 상태별 스타일
export const ITEM_STATE_CONFIG = {
  default: {
    bg: 'bg-transparent',
    text: 'text-default',
    captionText: 'text-muted',
    iconColor: 'var(--icon-default)',
  },
  hover: {
    bg: 'hover:bg-state-ghost-hover',
  },
  active: {
    bg: 'active:bg-state-ghost-hover',
    text: 'text-default',
  },
  disabled: {
    bg: 'bg-transparent',
    text: 'text-hint',
    captionText: 'text-hint',
    iconColor: 'var(--icon-default-disabled)',
  },
} as const;

// 라벨(섹션 헤더) 스타일
export const LABEL_CONFIG = {
  container: 'flex w-full padding-x-4',
  inner: 'flex items-center w-full padding-x-6 padding-y-4',
  text: 'font-body size-xs line-height-leading-4 letter-spacing-tracking-tight font-medium text-muted',
} as const;

// 디바이더 스타일
export const DIVIDER_CONFIG = {
  container: 'flex w-full padding-x-4 padding-y-2',
  line: 'w-full h-px bg-muted',
} as const;

// 바로가기 뱃지 스타일
export const SHORTCUT_BADGE_CONFIG = {
  container: 'inline-flex items-center justify-center bg-card border-default rounded-sm padding-2',
  text: 'font-code size-xs line-height-leading-4 letter-spacing-tracking-normal text-muted',
} as const;

// 캡션 스타일
export const CAPTION_CONFIG = {
  container: 'flex-shrink-0 padding-x-2',
  text: 'font-body size-sm line-height-leading-5 letter-spacing-tracking-tight',
} as const;

// 버튼 컨테이너 스타일
export const BUTTON_CONTAINER_CONFIG = {
  container: 'flex w-full padding-x-12 padding-y-8',
} as const;

// 버튼 그룹 컨테이너 스타일
export const BUTTON_GROUP_CONFIG = {
  container: 'flex w-full items-center justify-between padding-x-12 padding-y-8 gap-8',
} as const;

// 메뉴 내 버튼 스타일
export const MENU_BUTTON_CONFIG = {
  base: 'inline-flex items-center justify-center rounded-xs border-darker bg-card transition-colors duration-150',
  hover: 'hover:bg-muted',
  padding: 'padding-x-10 padding-y-4',
  gap: 'gap-4',
  text: 'font-body size-sm line-height-leading-5 letter-spacing-tracking-tight text-default',
  disabled: {
    bg: 'bg-muted',
    text: 'text-hint',
    cursor: 'cursor-not-allowed',
  },
  shadow: 'shadow-button-subtle',
} as const;

// 캡션 (텍스트 단락) 스타일
export const MENU_CAPTION_CONFIG = {
  container: 'flex w-full padding-x-12 padding-y-4',
  text: 'font-body size-sm line-height-leading-5 letter-spacing-tracking-tight text-muted',
} as const;

// 아바타 아이템 스타일
export const AVATAR_ITEM_CONFIG = {
  container: 'flex w-full padding-x-4',
  inner: 'flex items-center w-full rounded-xs transition-colors duration-150 padding-6 gap-4',
  avatarSize: 20,
  avatarFrame: 'width-20 height-20 rounded-full overflow-hidden flex-shrink-0',
  text: 'size-sm line-height-leading-5 letter-spacing-tracking-tight',
} as const;

// 유저바 스타일
export const USERBAR_CONFIG = {
  container: 'flex w-full items-center padding-x-12 padding-y-4 gap-8',
  avatarSize: 32,
  avatarFrame: 'width-32 height-32 rounded-full overflow-hidden flex-shrink-0',
  labelContainer: 'flex flex-col flex-1 min-w-0',
  name: 'font-body size-sm line-height-leading-5 letter-spacing-tracking-tight text-default truncate',
  description: 'font-body size-xs line-height-leading-4 letter-spacing-tracking-tight text-muted truncate',
  badge: 'inline-flex items-center padding-x-4 padding-y-2 rounded-sm border-default bg-card font-body size-xs line-height-leading-4 letter-spacing-tracking-tight text-muted',
} as const;
