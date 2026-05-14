import { isValidElement, type ReactNode } from 'react';

import { Icon } from './Icon';
import type { IconColor, RemixiconLikeComponent } from './Icon.types';
import { handleLegacyTupleAtRuntime, looksLikeLegacyTuple } from './_legacyTupleGuard';

/**
 * Direct-import-only icon prop union.
 *
 * - `RemixiconLikeComponent` — `RiCheckLine` 같은 component 참조 (권장)
 *
 * @note v1.x's tuple form (`['system', 'check']`) was removed in v2.0.0. Use
 * `RemixiconLikeComponent` or import from `…/icons/icon-legacy` if you need it.
 *
 * @example
 * leadIcon={RiCheckLine}
 */
export type IconProp = RemixiconLikeComponent;

/**
 * 호출부가 ReactNode passthrough 도 허용할 때 쓰는 union.
 */
export type IconPropOrNode = IconProp | ReactNode;

/**
 * 값이 `RemixiconLikeComponent` (Ri*Line / Ri*Fill 같은 component 참조) 인지 판별.
 *
 * function component 또는 forwardRef/memo exotic component 를 감지.
 * React element (이미 렌더된 JSX) 와 tuple 은 false.
 */
export function isRemixiconComponent(value: unknown): value is RemixiconLikeComponent {
  if (typeof value === 'function') return true;
  if (typeof value !== 'object' || value === null) return false;
  if (Array.isArray(value)) return false;
  if (isValidElement(value)) return false;
  return '$$typeof' in value && ('render' in value || 'type' in value || 'compare' in value);
}

export interface RenderIconPropOptions {
  size?: number;
  color?: IconColor | string;
  className?: string;
}

/**
 * Icon prop 을 React 노드로 렌더.
 *
 * - component (Ri*Line 등) → `<Icon icon={...} />`
 * - ReactNode → 그대로 (span 래핑)
 * - falsy → null
 *
 * @note v1.x tuple form was removed in v2.0.0. tuple at runtime → dev throw / prod fallback.
 */
export function renderIconProp(
  icon: IconPropOrNode | undefined,
  options: RenderIconPropOptions = {},
): ReactNode {
  if (!icon) return null;
  const { size, color, className } = options;

  if (looksLikeLegacyTuple(icon)) {
    handleLegacyTupleAtRuntime('renderIconProp');
    return null;
  }

  if (isRemixiconComponent(icon)) {
    return <Icon icon={icon} size={size} color={color as IconColor | undefined} className={className} />;
  }

  const wrapperClassName = ['inline-flex items-center', className].filter(Boolean).join(' ');

  if (typeof icon === 'string' || typeof icon === 'number') {
    return <span className={wrapperClassName}>{icon}</span>;
  }

  if (!isValidElement(icon)) return null;
  return <span className={wrapperClassName}>{icon}</span>;
}
