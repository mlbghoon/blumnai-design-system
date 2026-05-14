import { forwardRef, memo, Suspense, createElement, useMemo } from 'react';
import type { ComponentType } from 'react';

import type { IconColor, LegacyIconProps, RemixiconLikeComponent } from '../Icon.types';
import type { Props as IconWrapperProps } from '../IconWrapper.types';
import { kebabToRegistryKey, resolveColor } from '../shared';
import { getIconSync, getIconLazy, hasIcon } from './ui-icon-registry';

// Re-export Remixicon so codemod-rewritten imports of `from '../icons/Icon/Icon'` work.
// (The DS public API is `from '@blumnai-studio/blumnai-design-system'` which goes through the
// index files, but DS-internal imports often point at this Icon.tsx file directly.)
// eslint-disable-next-line react-refresh/only-export-components
export * from '@remixicon/react';

/**
 * 카테고리별 UI 아이콘 컴포넌트.
 *
 * 두 가지 API 지원:
 * 1. **Dynamic-string (back-compat)**: `<Icon iconType={['system', 'check']} />`
 *    런타임에 registry 에서 lookup → lazy 로 `@remixicon/react` chunk 로드.
 * 2. **Direct-import (권장)**: `<Icon icon={RiCheckLine} />`
 *    Tree-shake 가능, FCP 빠름. 단, `icon` prop 은 module 최상위 import 한 안정적인 component
 *    참조여야 함 (인라인 함수 X).
 *
 * 두 API 의 다른 props (size, color, className, disabled, onClick) 는 동일.
 * Color 토큰 해석 (`'default'` → `var(--icon-default)`) 은 양쪽 모두에서 작동.
 */
export const Icon = memo(forwardRef<SVGSVGElement, LegacyIconProps>((props, ref) => {
  // Pull all DS-specific props out of the rest-spread so they don't leak onto the
  // underlying <svg> element as DOM attributes (which would trigger React warnings).
  // Cast through a permissive shape because the discriminated union doesn't allow
  // destructuring all keys directly.
  const {
    iconType,
    icon,
    isFill = false,
    size = 24,
    color,
    className,
    focusable,
    disabled = false,
    onClick,
    style,
    ...restProps
  } = props as Omit<LegacyIconProps, never> & {
    iconType?: import('../Icon.types').IconType;
    icon?: RemixiconLikeComponent;
    isFill?: boolean;
    focusable?: boolean | 'true' | 'false';
  };

  // Direct-import path: render the passed component directly with token-resolved color.
  if (icon) {
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
  }

  const fallback = (
    <div
      style={{
        width: size,
        height: size,
        display: 'inline-block',
      }}
    />
  );

  if (!iconType) {
    // Neither `iconType` nor `icon` provided. Render fallback to keep layout stable.
    return fallback;
  }

  const [, iconName] = iconType;
  const registryKey = kebabToRegistryKey(iconName) + (isFill ? 'fill' : '');

  if (!hasIcon(registryKey)) {
    return fallback;
  }

  const resolvedColor = resolveColor(color);
  const focusableBool = focusable === true || focusable === 'true' ? true : focusable === false || focusable === 'false' ? false : undefined;

  const cursorValue = disabled ? 'not-allowed' : onClick ? 'pointer' : undefined;
  const mergedStyle = disabled ? { ...style, pointerEvents: 'none' as const } : style;

  // 동기 경로 우선: 카테고리가 이미 로드된 경우 즉시 렌더링 (suspend 없음)
  // 비동기 경로: 카테고리 미로드 시 lazy 컴포넌트 사용
  const IconComponent = (getIconSync(registryKey) || getIconLazy(registryKey)) as ComponentType<IconWrapperProps> | null;
  if (!IconComponent) {
    return fallback;
  }

  return (
    <Suspense fallback={fallback}>
      {createElement(IconComponent, {
        ref,
        size,
        color: resolvedColor,
        className,
        focusable: focusableBool,
        cursor: cursorValue,
        onClick: disabled ? undefined : onClick,
        style: mergedStyle,
        ...restProps,
      })}
    </Suspense>
  );
}));

Icon.displayName = 'Icon';

/**
 * Direct-import variant. Internal — not exported.
 * Wraps the user-provided component with DS-standard prop translation:
 * - `color` token → `var(--icon-{token})`
 * - `disabled` → `cursor: not-allowed` + `pointer-events: none`
 * - `onClick` → `cursor: pointer` (when not disabled)
 *
 * Memo-friendly: the resolved style/color objects are computed via useMemo so
 * referential identity is stable across renders with the same props.
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
