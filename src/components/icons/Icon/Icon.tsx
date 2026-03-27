import { forwardRef, memo, Suspense, createElement } from 'react';
import type { ComponentType } from 'react';

import type { IconColor, IconProps } from './Icon.types';
import type { Props as IconWrapperProps } from './IconWrapper.types';
import { getIconSync, getIconLazy, hasIcon } from './ui-icon-registry';

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
 * 번들 최적화를 위해 카테고리 단위 지연 로딩
 */
export const Icon = memo(forwardRef<SVGSVGElement, IconProps>(({
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

  const fallback = (
    <div
      style={{
        width: size,
        height: size,
        display: 'inline-block',
      }}
    />
  );

  if (!hasIcon(registryKey)) {
    return fallback;
  }

  const resolvedColor = resolveColor(color);
  const focusableBool = focusable === true || focusable === 'true' ? true : focusable === false || focusable === 'false' ? false : undefined;

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
        ...restProps,
      })}
    </Suspense>
  );
}));

Icon.displayName = 'Icon';
