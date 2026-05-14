// Main icon entry — direct-import API only (v2.0+).
//
// The tuple form (`<Icon iconType={['cat','name']} />`) was removed in v2.0.0 to keep
// `import('@remixicon/react')` out of the import graph reachable from main. Consumers
// who still need the tuple API can import from
// `@blumnai-studio/blumnai-design-system/icons/icon-legacy`.

export { Icon } from './Icon';
export type {
  IconColor,
  IconProps,
  IconPropsWithComponent,
  RemixiconLikeComponent,
} from './Icon.types';

export { isRemixiconComponent, renderIconProp } from './iconProp';
export type { IconProp, IconPropOrNode, RenderIconPropOptions } from './iconProp';

// Re-export all Remixicon icons for the direct-import API.
// Tree-shaking is enabled via `sideEffects: ["*.css", "dist/*.css"]` in package.json.
export * from '@remixicon/react';
