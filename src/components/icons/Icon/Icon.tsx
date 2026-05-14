import { forwardRef, memo, useMemo } from 'react';

import type { IconColor, IconProps, RemixiconLikeComponent } from './Icon.types';
import { handleLegacyTupleAtRuntime, looksLikeLegacyTuple } from './_legacyTupleGuard';
import { resolveColor } from './shared';

// Re-export Remixicon so consumers can `import { Icon, RiCheckLine } from
// '@blumnai-studio/blumnai-design-system/icons/icon'` in one shot. With
// `sideEffects: ["*.css", "dist/*.css"]` in package.json, this re-export is
// tree-shakeable: only the icons the consumer actually names are bundled.
// eslint-disable-next-line react-refresh/only-export-components
export * from '@remixicon/react';

/**
 * 카테고리별 UI 아이콘 컴포넌트 (direct-import API only).
 *
 * `icon` prop 은 module 최상위 import 한 안정적인 component 참조여야 합니다 (인라인 함수 X).
 * Color 토큰 (`'default'` → `var(--icon-default)`), `disabled` (`cursor: not-allowed` +
 * `pointer-events: none`), `onClick` (`cursor: pointer`) 가 자동 처리됩니다.
 *
 * @example
 * ```tsx
 * import { Icon, RiCheckLine } from '@blumnai-studio/blumnai-design-system';
 * <Icon icon={RiCheckLine} size={16} color="default" />
 * ```
 *
 * @note tuple form (`iconType={['cat','name']}`) was removed in v2.0.0.
 * Import from `…/icons/icon-legacy` if you need it.
 */
export const Icon = memo(forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  const {
    icon,
    size = 24,
    color,
    className,
    focusable,
    disabled = false,
    onClick,
    style,
    // Allow rest props (e.g., aria-*, data-*) to pass through to the SVG element.
    ...restProps
  } = props as IconProps & {
    focusable?: boolean | 'true' | 'false';
    // Tolerate legacy iconType being passed at runtime (e.g., from JS / API data)
    // so we can guard with a helpful error instead of silently dropping.
    iconType?: unknown;
  };

  // Runtime guard: tuple form removed in v2.0.0.
  if (looksLikeLegacyTuple((props as { iconType?: unknown }).iconType)) {
    handleLegacyTupleAtRuntime('icon-prop');
    return (
      <span
        style={{ display: 'inline-block', width: size, height: size }}
        aria-hidden="true"
      />
    );
  }

  if (!icon) {
    // No icon provided — render fallback to keep layout stable.
    return (
      <span
        style={{ display: 'inline-block', width: size, height: size }}
        aria-hidden="true"
      />
    );
  }

  return (
    <IconDirect
      ref={ref}
      component={icon}
      size={size}
      color={color}
      className={className}
      focusable={focusable}
      disabled={disabled}
      onClick={onClick}
      style={style}
      {...restProps}
    />
  );
}));

Icon.displayName = 'Icon';

/**
 * Internal — renders a passed component with DS-standard prop translation:
 * - `color` token → `var(--icon-{token})`
 * - `disabled` → `cursor: not-allowed` + `pointer-events: none`
 * - `onClick` → `cursor: pointer` (when not disabled)
 *
 * Memo-friendly: resolved style/color are computed via `useMemo` so referential
 * identity is stable across renders with the same props.
 */
interface IconDirectProps extends Omit<React.SVGProps<SVGSVGElement>, 'children' | 'cursor' | 'color'> {
  component: RemixiconLikeComponent;
  size: number;
  color?: IconColor;
  className?: string;
  focusable?: boolean | 'true' | 'false';
  disabled: boolean;
}

const IconDirect = memo(forwardRef<SVGSVGElement, IconDirectProps>((props, ref) => {
  const {
    component: Component,
    size,
    color,
    className,
    focusable,
    disabled,
    onClick,
    style,
    ...restProps
  } = props;

  const resolvedColor = useMemo(() => resolveColor(color), [color]);

  const mergedStyle = useMemo<React.CSSProperties | undefined>(() => {
    const cursorValue = disabled ? 'not-allowed' : onClick ? 'pointer' : undefined;
    const styleWithCursor: React.CSSProperties | undefined = cursorValue
      ? { ...style, cursor: cursorValue }
      : style;
    if (disabled) {
      return { ...(styleWithCursor ?? {}), pointerEvents: 'none' };
    }
    return styleWithCursor;
  }, [disabled, onClick, style]);

  const focusableBool = focusable === true || focusable === 'true'
    ? true
    : focusable === false || focusable === 'false'
      ? false
      : undefined;

  // Cast to a permissive component type — RemixiconLikeComponent is structural, but the
  // exact prop shape varies per library (e.g., @remixicon/react accepts SVG props extras).
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ComponentAny = Component as any;

  return (
    <ComponentAny
      ref={ref}
      size={size}
      color={resolvedColor}
      className={className}
      focusable={focusableBool}
      onClick={disabled ? undefined : onClick}
      style={mergedStyle}
      {...restProps}
    />
  );
}));

IconDirect.displayName = 'IconDirect';
