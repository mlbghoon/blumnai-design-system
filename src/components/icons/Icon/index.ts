export { Icon } from './Icon';
export { parseIconTypeWithFill } from './Icon.types';
export type { IconCategory, IconColor, IconProps, IconType, IconTypeWithFill, RemixiconLikeComponent } from './Icon.types';
export { isIconTuple, isRemixiconComponent, renderIconProp } from './iconProp';
export type { IconProp, IconPropOrNode, RenderIconPropOptions } from './iconProp';
export { preloadIconCategory, preloadIcons } from './ui-icon-registry';

// Re-export all Remixicon icons for the direct-import API.
// Consumers can do: `import { Icon, RiCheckLine } from '@blumnai-studio/blumnai-design-system';`
// Tree-shaking is enabled via `sideEffects: ["*.css", "dist/*.css"]` in package.json.
export * from '@remixicon/react';
