// Legacy icon entry — preserves the v1.10.x tuple API (`<Icon iconType={[...]} />`,
// tuple-supporting `renderIconProp`, registry-backed `preloadIcons`, etc.).
//
// Consumers using the tuple API after v2.0 should import from
// `@blumnai-studio/blumnai-design-system/icons/icon-legacy`. The main entry's `Icon`
// is direct-only (component-ref) so it can be tree-shaken without dragging
// `@remixicon/react` into the consumer bundle as a 2.5MB async chunk.

export { Icon } from './Icon.legacy';
export {
  isIconTuple,
  isRemixiconComponent,
  renderIconProp,
} from './iconProp.legacy';
export type {
  IconProp,
  IconPropOrNode,
  RenderIconPropOptions,
} from './iconProp.legacy';

// Tuple-related types and helpers — runtime-meaningful for the v1.x API.
// These are intentionally NOT exported from the main entry in v2.0 so consumers
// who don't need them avoid pulling tuple semantics into their type surface.
export {
  parseIconTypeWithFill,
} from '../Icon.types';
export type {
  IconCategory,
  IconType,
  IconTypeWithFill,
} from '../Icon.types';

// Non-tuple types — also exported from the main entry (these are shared between
// direct-only and tuple-supporting `Icon`s; re-exported here for convenience so
// consumers on the legacy path don't need to mix imports from two entries).
export type {
  IconColor,
  IconProps,
  IconPropsWithComponent,
  RemixiconLikeComponent,
} from '../Icon.types';

// Registry-backed preload helpers. Calling these warms up `@remixicon/react` so the
// dynamic chunk is fetched before first render.
export { preloadIconCategory, preloadIcons } from './ui-icon-registry';

// Re-export all Remixicon icons — kept for consumers who want everything from
// the legacy entry. The main entry also re-exports these (tree-shake friendly).
export * from '@remixicon/react';
