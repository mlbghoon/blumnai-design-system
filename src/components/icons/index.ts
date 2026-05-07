// 아이콘 컴포넌트
export { Icon } from './Icon';
export { BrandIcon } from './BrandIcon';
export { CursorIcon } from './CursorIcon';
export { FileIcon } from './FileIcon';
export { FlagIcon } from './FlagIcon';
export { IsometricIcon } from './IsometricIcon';

// 타입
export type { IconCategory, IconProps, IconType, IconTypeWithFill, RemixiconLikeComponent } from './Icon';
export { parseIconTypeWithFill, preloadIconCategory, preloadIcons } from './Icon';

// Remixicon direct-import API: re-export all Ri* components for tree-shake-friendly usage.
// Consumers: `import { RiCheckLine, RiAddFill } from '@blumnai-studio/blumnai-design-system';`
export * from '@remixicon/react';
export type { BrandIconProps, BrandType } from './BrandIcon';
export type { CursorIconProps, CursorType } from './CursorIcon';
export type { FileIconProps, FileVariant, FileSize } from './FileIcon';
export type { CountryCode, FlagIconProps } from './FlagIcon';
export type { IsometricIconType, IsometricIconProps, IsometricView } from './IsometricIcon';
