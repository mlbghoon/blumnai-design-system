import { BG, BORDER, BORDER_STYLE, TEXT } from 'constants/common/token-classes';

import type { AvatarSize, AvatarShape, AvatarVariant } from 'components/avatar/Avatar/Avatar.types';

// 사이즈별 크기 (px)
export const sizes = {
  '2xs': { image: 16, ring: 20, statusBadge: 8 },
  xs: { image: 20, ring: 24, statusBadge: 10 },
  sm: { image: 24, ring: 28, statusBadge: 12 },
  md: { image: 32, ring: 36, statusBadge: 12 },
  lg: { image: 40, ring: 44, statusBadge: 16 },
  xl: { image: 48, ring: 52, statusBadge: 16 },
  '2xl': { image: 56, ring: 60, statusBadge: 18 },
  '3xl': { image: 64, ring: 68, statusBadge: 20 },
} as const;

export const CONTAINER_SIZE_CLASSES: Record<AvatarSize, string> = {
  '2xs': 'size-[20px]',
  xs: 'size-[24px]',
  sm: 'size-[28px]',
  md: 'size-[36px]',
  lg: 'size-[44px]',
  xl: 'size-[52px]',
  '2xl': 'size-[60px]',
  '3xl': 'size-[68px]',
};

export const RING_SIZE_CLASSES: Record<AvatarSize, string> = {
  '2xs': 'size-[20px]',
  xs: 'size-[24px]',
  sm: 'size-[28px]',
  md: 'size-[36px]',
  lg: 'size-[44px]',
  xl: 'size-[52px]',
  '2xl': 'size-[60px]',
  '3xl': 'size-[68px]',
};

export const IMAGE_SIZE_CLASSES: Record<AvatarSize, string> = {
  '2xs': 'size-[16px]',
  xs: 'size-[20px]',
  sm: 'size-[24px]',
  md: 'size-[32px]',
  lg: 'size-[40px]',
  xl: 'size-[48px]',
  '2xl': 'size-[56px]',
  '3xl': 'size-[64px]',
};

// 이니셜 타이포그래피 - leading-none으로 flexbox 중앙정렬 최적화
export const INITIALS_TYPOGRAPHY_CLASSES: Record<AvatarSize, string> = {
  '2xs': 'text-[12px] leading-none',
  xs: 'text-[12px] leading-none',
  sm: 'text-[12px] leading-none',
  md: 'text-[14px] leading-none',
  lg: 'text-[14px] leading-none',
  xl: 'text-[16px] leading-none',
  '2xl': 'text-[18px] leading-none',
  '3xl': 'text-[20px] leading-none',
};

// 자간 - xl만 0, 나머지는 -0.6px
export const INITIALS_LETTER_SPACING: Record<AvatarSize, string> = {
  '2xs': 'tracking-[-0.6px]',
  xs: 'tracking-[-0.6px]',
  sm: 'tracking-[-0.6px]',
  md: 'tracking-[-0.6px]',
  lg: 'tracking-[-0.6px]',
  xl: 'tracking-[0px]',
  '2xl': 'tracking-[-0.6px]',
  '3xl': 'tracking-[-0.6px]',
};

// 폰트 메트릭 보정 - 브라우저와 Figma 렌더링 차이 보정
export const INITIALS_VERTICAL_OFFSET: Record<AvatarSize, string> = {
  '2xs': '-translate-y-[0.5px]',
  xs: '-translate-y-[0.5px]',
  sm: '-translate-y-[0.5px]',
  md: '-translate-y-[0.5px]',
  lg: '-translate-y-[0.5px]',
  xl: 'translate-y-[0px]',
  '2xl': 'translate-y-[0px]',
  '3xl': 'translate-y-[0px]',
};

export const statusBadgePositions = {
  '2xs': { circular: { x: -2, y: -2 }, rounded: { x: -2, y: -2 } },
  xs: { circular: { x: -3, y: -3 }, rounded: { x: -3, y: -3 } },
  sm: { circular: { x: -3, y: -3 }, rounded: { x: -3, y: -3 } },
  md: { circular: { x: -2, y: -2 }, rounded: { x: -2, y: -2 } },
  lg: { circular: { x: -2, y: -2 }, rounded: { x: -2, y: -2 } },
  xl: { circular: { x: -2, y: -2 }, rounded: { x: -2, y: -2 } },
  '2xl': { circular: { x: -1, y: -1 }, rounded: { x: -1, y: -1 } },
  '3xl': { circular: { x: 0, y: 0 }, rounded: { x: 0, y: 0 } },
} as const;

export const CONTAINER_BASE_CLASSES = 'relative inline-flex shrink-0 p-0.5';

// 링 래퍼 - 컨테이너 중앙에 배치
export const RING_BASE_CLASSES = 'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 shrink-0';

export const RING_BG_CLASS = BG.default;

export const RING_SHAPE_CLASSES_CIRCULAR = 'rounded-full';

export const RING_ROUNDED_RADIUS_CLASSES: Record<AvatarSize, string> = {
  '2xs': 'rounded-[6px]',
  xs: 'rounded-[8px]',
  sm: 'rounded-[8px]',
  md: 'rounded-[10px]',
  lg: 'rounded-[10px]',
  xl: 'rounded-[10px]',
  '2xl': 'rounded-[10px]',
  '3xl': 'rounded-[10px]',
};

// 이미지 컨테이너 - 링 안쪽에 중앙 정렬
export const IMAGE_CONTAINER_BASE_CLASSES =
  `absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-clip ${BORDER_STYLE.border} border-solid flex items-center justify-center shrink-0`;

export const IMAGE_CONTAINER_SHAPE_CLASSES: Record<AvatarShape, string> = {
  circular: 'rounded-full',
  rounded: 'rounded-[6px]',
};

export const IMAGE_CONTAINER_BORDER_CLASS = BORDER.default;

export const IMAGE_CONTAINER_BG_CLASSES: Record<AvatarVariant, { default: string; withColor?: string }> = {
  initials: {
    default: 'bg-[#6f6f77]',
    withColor: '',
  },
  userpic: {
    default: BG.muted,
  },
  empty: {
    default: BG.transparent,
  },
};

export const INITIALS_TEXT_BASE_CLASSES = `relative text-center ${TEXT.whiteDefault} font-medium select-none uppercase font-["Spoqa_Han_Sans_Neo",sans-serif] not-italic`;

export const INITIALS_POSITION_CLASSES: Record<AvatarSize, string> = {
  '2xs': '',
  xs: '',
  sm: '',
  md: '',
  lg: '',
  xl: '',
  '2xl': '',
  '3xl': '',
};

export const IMAGE_WRAPPER_CLASSES =
  'absolute aspect-[16/16] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full';

export const IMAGE_CLASSES = 'max-w-none object-cover size-full';
