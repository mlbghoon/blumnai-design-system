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
  '2xs': 'width-20 height-20',
  xs: 'width-24 height-24',
  sm: 'width-28 height-28',
  md: 'width-36 height-36',
  lg: 'width-44 height-44',
  xl: 'width-52 height-52',
  '2xl': 'width-60 height-60',
  '3xl': 'width-68 height-68',
};

export const RING_SIZE_CLASSES: Record<AvatarSize, string> = {
  '2xs': 'width-20 height-20',
  xs: 'width-24 height-24',
  sm: 'width-28 height-28',
  md: 'width-36 height-36',
  lg: 'width-44 height-44',
  xl: 'width-52 height-52',
  '2xl': 'width-60 height-60',
  '3xl': 'width-68 height-68',
};

export const IMAGE_SIZE_CLASSES: Record<AvatarSize, string> = {
  '2xs': 'width-16 height-16',
  xs: 'width-20 height-20',
  sm: 'width-24 height-24',
  md: 'width-32 height-32',
  lg: 'width-40 height-40',
  xl: 'width-48 height-48',
  '2xl': 'width-56 height-56',
  '3xl': 'width-64 height-64',
};

// 이니셜 타이포그래피 - Figma 기준 line-height 값 적용
export const INITIALS_TYPOGRAPHY_CLASSES: Record<AvatarSize, string> = {
  '2xs': 'size-xs line-height-leading-4',
  xs: 'size-xs line-height-leading-4',
  sm: 'size-xs line-height-leading-4',
  md: 'size-sm line-height-leading-5',
  lg: 'size-sm line-height-leading-5',
  xl: 'size-md line-height-leading-6',
  '2xl': 'size-lg line-height-leading-7',
  '3xl': 'size-xl line-height-leading-7',
};

// 자간 - xl만 0, 나머지는 -0.6px
export const INITIALS_LETTER_SPACING: Record<AvatarSize, string> = {
  '2xs': 'letter-spacing-tracking-normal',
  xs: 'letter-spacing-tracking-normal',
  sm: 'letter-spacing-tracking-normal',
  md: 'letter-spacing-tracking-normal',
  lg: 'letter-spacing-tracking-normal',
  xl: '',
  '2xl': 'letter-spacing-tracking-normal',
  '3xl': 'letter-spacing-tracking-normal',
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
  '2xs': 'rounded-sm',
  xs: 'rounded-md',
  sm: 'rounded-md',
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
    default: 'bg-basic-gray-accent',
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
  'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full';

export const IMAGE_CLASSES = 'max-w-none object-cover size-full';
