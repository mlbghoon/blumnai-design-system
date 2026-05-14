// 아이콘 컴포넌트
export { Icon } from './Icon';
export { BrandIcon } from './BrandIcon';
export { CursorIcon } from './CursorIcon';
export { FileIcon } from './FileIcon';
export { FlagIcon } from './FlagIcon';
export { IsometricIcon } from './IsometricIcon';

// 타입
// v2.0 — main entry는 direct-import only.
// Tuple-related types (`IconType`, `IconTypeWithFill`, `parseIconTypeWithFill`,
// `preloadIcons`, `preloadIconCategory`, `IconCategory`)는 v2.0에서
// `…/icons/icon-legacy`로 이동했습니다.
export type { IconProps, RemixiconLikeComponent } from './Icon';

// Remixicon direct-import API: re-export all Ri* components for tree-shake-friendly usage.
// Consumers: `import { RiCheckLine, RiAddFill } from '@blumnai-studio/blumnai-design-system';`
export * from '@remixicon/react';
export type { BrandIconProps, BrandType } from './BrandIcon';
export type { CursorIconProps, CursorType } from './CursorIcon';
export type { FileIconProps, FileVariant, FileSize } from './FileIcon';
export type { CountryCode, FlagIconProps } from './FlagIcon';
export type { IsometricIconType, IsometricIconProps, IsometricView } from './IsometricIcon';
