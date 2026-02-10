import { forwardRef, Suspense, createElement } from 'react';
import type { ComponentType } from 'react';

import type { IconColor, IconProps } from './Icon.types';
import type { Props as IconWrapperProps } from './IconWrapper.types';
import { uiIconRegistry } from './ui-icon-registry';

/** kebab-case를 소문자로 변환 (하이픈 제거): 'arrow-down' -> 'arrowdown' */
function kebabToRegistryKey(str: string): string {
  return str.replace(/-/g, '').toLowerCase();
}

/** CSS 변수로 변환할 색상 토큰 목록 */
const colorTokens = new Set([
  'default', 'default-subtle', 'default-muted', 'default-disabled',
  'inverted-default', 'inverted-subtle', 'inverted-muted', 'inverted-disabled',
  'white-default', 'white-subtle', 'white-muted', 'white-disabled',
  'black-default', 'black-subtle', 'black-muted', 'black-disabled',
  'destructive', 'informative', 'success', 'warning',
]);

/**
 * 색상 해석: 토큰은 CSS 변수로 변환, CSS 색상값은 그대로 전달
 * - 토큰: 'default' -> 'var(--icon-default)'
 * - CSS 색상: '#fff', 'rgb()' -> 그대로 사용
 */
const resolveColor = (color: IconColor | undefined): string | undefined => {
  if (!color) return undefined;
  if (colorTokens.has(color)) {
    return `var(--icon-${color})`;
  }
  return color;
};

/**
 * 카테고리별 UI 아이콘 컴포넌트
 * [category, name] 튜플 형식으로 타입 안전한 아이콘 선택 지원
 * 번들 최적화를 위해 모든 아이콘 지연 로딩
 */
export const Icon = forwardRef<SVGSVGElement, IconProps>(({
  iconType,
  isFill = false,
  size = 24,
  color,
  className,
  focusable,
  ...restProps
}, ref) => {
  const [_category, iconName] = iconType;

  const registryKey = kebabToRegistryKey(iconName) + (isFill ? 'fill' : '');
  const LazyIcon = uiIconRegistry[registryKey] as ComponentType<IconWrapperProps> | undefined;

  const fallback = (
    <div
      style={{
        width: size,
        height: size,
        display: 'inline-block',
      }}
    />
  );

  if (!LazyIcon) {
    return fallback;
  }

  const resolvedColor = resolveColor(color);
  const focusableBool = focusable === true || focusable === 'true' ? true : focusable === false || focusable === 'false' ? false : undefined;

  return (
    <Suspense fallback={fallback}>
      {createElement(LazyIcon, {
        ref,
        size,
        color: resolvedColor,
        className,
        focusable: focusableBool,
        ...restProps,
      })}
    </Suspense>
  );
});

Icon.displayName = 'Icon';
