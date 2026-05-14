import { isValidElement, type ReactNode } from 'react';

import { Icon } from './Icon';
import { parseIconTypeWithFill } from './Icon.types';
import type { IconColor, IconType, IconTypeWithFill, RemixiconLikeComponent } from './Icon.types';
import { REMIXICON_EXPORT_MAP } from './remixicon-export-map';

declare const process: { env: { NODE_ENV?: string } } | undefined;

/**
 * 어떤 형태의 icon prop 값이라도 받는 union.
 *
 * - `IconType` / `IconTypeWithFill` — `[category, name]` / `[category, name, isFill]` 튜플 (dynamic-string back-compat)
 * - `RemixiconLikeComponent` — `RiCheckLine` 같은 component 참조 (tree-shaking 권장)
 *
 * @deprecated tuple form (`IconTypeWithFill`) will be removed in v2.0.0. Use a Remixicon
 * component reference (e.g., `RiCheckLine`). Run `npx blumnai-icon-codemod ./src` to migrate.
 * After v2.0.0 this type narrows to `RemixiconLikeComponent` only; the tuple form moves to
 * `@blumnai-studio/blumnai-design-system/icons/icon-legacy`. See MIGRATION.md.
 *
 * @example
 * leadIcon={['system', 'check']}    // ⚠️ deprecated, removed in v2.0.0
 * leadIcon={['system', 'check', true]} // ⚠️ deprecated, removed in v2.0.0
 * leadIcon={RiCheckLine}            // ✅ recommended
 */
export type IconProp = IconTypeWithFill | RemixiconLikeComponent;

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

/**
 * Tuple `[category, name]` / `[category, name, isFill]` 형태인지 판별.
 */
export function isIconTuple(value: unknown): value is IconTypeWithFill {
  return (
    Array.isArray(value) &&
    (value.length === 2 || value.length === 3) &&
    typeof value[0] === 'string' &&
    typeof value[1] === 'string'
  );
}

/**
 * Dev 모드에서 legacy tuple form 사용 시 한 번만 경고 (per unique tuple).
 *
 * 가능하면 매핑 테이블에서 정확한 `Ri*` component 이름을 찾아 마이그레이션 예시까지 출력.
 * `process.env.NODE_ENV === 'production'` 일 때는 동작하지 않으며, 소비자의 번들러
 * (Vite/webpack 등) 가 이 분기를 dead-code 로 제거함.
 */
const seenLegacyTuples = new Set<string>();

function warnLegacyIconTuple(icon: IconTypeWithFill): void {
  const isDev = typeof process !== 'undefined' && process?.env?.NODE_ENV !== 'production';
  if (!isDev) return;

  const key = icon.join('|');
  if (seenLegacyTuples.has(key)) return;
  seenLegacyTuples.add(key);

  const [cat, name, isFill] = icon;
  const lookupKey = String(name).replace(/-/g, '').toLowerCase() + (isFill === true ? 'fill' : '');
  const recommended = REMIXICON_EXPORT_MAP[lookupKey];
  const replacement = recommended
    ? `\`${recommended}\` (import { ${recommended} } from '@blumnai-studio/blumnai-design-system')`
    : 'a Remixicon component reference (e.g. RiCheckLine)';

  const tupleParts: string[] = [`'${cat}'`, `'${name}'`];
  if (isFill === true) tupleParts.push('true');
  const tupleStr = `[${tupleParts.join(', ')}]`;

  console.warn(
    `[blumnai-design-system] icon prop tuple ${tupleStr} is deprecated and will be removed in v2.0.0. ` +
    `Replace with ${replacement}. ` +
    `Run \`npx blumnai-icon-codemod ./src\` to auto-migrate, ` +
    `or import from '@blumnai-studio/blumnai-design-system/icons/icon-legacy' as an escape hatch. ` +
    `See MIGRATION.md.`
  );
}

export interface RenderIconPropOptions {
  size?: number;
  color?: IconColor | string;
  className?: string;
  /**
   * Tuple 형식에 isFill 이 포함되어 있지 않을 때 fallback. Tuple 의 3번째 요소가 우선.
   */
  isFill?: boolean;
}

/**
 * Icon prop 을 React 노드로 렌더.
 *
 * - tuple → `<Icon iconType={...} isFill={...} />`
 * - component (Ri*Line 등) → `<Icon icon={...} />`
 * - ReactNode → 그대로 (span 래핑)
 * - falsy → null
 */
export function renderIconProp(
  icon: IconPropOrNode | undefined,
  options: RenderIconPropOptions = {},
): ReactNode {
  if (!icon) return null;
  const { size, color, className, isFill: fallbackIsFill } = options;

  if (isIconTuple(icon)) {
    warnLegacyIconTuple(icon);
    const { iconType, isFill } = parseIconTypeWithFill(icon);
    return (
      <Icon
        iconType={iconType as IconType}
        isFill={isFill || fallbackIsFill}
        size={size}
        color={color as IconColor | undefined}
        className={className}
      />
    );
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
