import { forwardRef, Suspense, lazy, createElement } from 'react';
import type { ComponentType } from 'react';

import type { IconColor, IconProps, IconCategory } from './Icon.types';
import type { Props as IconWrapperProps } from './IconWrapper.types';

/** 카테고리 타입명을 실제 폴더명으로 매핑 */
const categoryToFolder: Record<IconCategory, string> = {
  arrows: 'arrows',
  buildings: 'buildings',
  business: 'business',
  communication: 'communication',
  design: 'design',
  development: 'development',
  device: 'device',
  document: 'document',
  editor: 'editor',
  finance: 'finance',
  food: 'food',
  health: 'health & medical',
  map: 'map',
  media: 'media',
  others: 'others',
  system: 'system',
  user: 'user & faces',
  weather: 'weather',
};

/** kebab-case를 PascalCase로 변환: 'arrow-down' -> 'ArrowDown' */
function kebabToPascal(str: string): string {
  return str
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

/** 지연 로딩된 아이콘 컴포넌트 캐시. 리렌더링 시 새 컴포넌트 생성 방지 */
const iconCache = new Map<string, ComponentType<IconWrapperProps>>();

/** 아이콘 캐시 키 생성 */
function getIconCacheKey(category: IconCategory, iconName: string, isFill: boolean): string | null {
  const folder = categoryToFolder[category];
  if (!folder) return null;
  const pascalName = kebabToPascal(iconName);
  const componentName = isFill ? `${pascalName}FillIcon` : `${pascalName}Icon`;
  return `${folder}/${componentName}`;
}

/** 지연 로딩 아이콘 컴포넌트가 캐시에 존재하도록 보장 */
function ensureIconInCache(category: IconCategory, iconName: string, isFill: boolean): void {
  const cacheKey = getIconCacheKey(category, iconName, isFill);
  if (!cacheKey || iconCache.has(cacheKey)) return;

  const folder = categoryToFolder[category];
  const pascalName = kebabToPascal(iconName);
  const componentName = isFill ? `${pascalName}FillIcon` : `${pascalName}Icon`;

  const LazyComponent = lazy(() =>
    import(`./icons/${folder}/${componentName}.tsx`)
      .then(m => ({ default: m[componentName] as ComponentType<IconWrapperProps> }))
      .catch(() => ({ default: (() => null) as unknown as ComponentType<IconWrapperProps> }))
  );

  iconCache.set(cacheKey, LazyComponent);
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

/** 캐시된 지연 로딩 아이콘을 렌더링하는 내부 컴포넌트 */
const LazyIconRenderer = forwardRef<SVGSVGElement, {
  cacheKey: string;
  size: number;
  color: string | undefined;
  className: string | undefined;
  focusable: boolean | undefined;
  restProps: Record<string, unknown>;
}>(({ cacheKey, size, color, className, focusable, restProps }, ref) => {
  const CachedIcon = iconCache.get(cacheKey);
  if (!CachedIcon) return null;
  return createElement(CachedIcon, {
    ref,
    size,
    color,
    className,
    focusable,
    ...restProps,
  });
});

LazyIconRenderer.displayName = 'LazyIconRenderer';

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
  const [category, iconName] = iconType;

  ensureIconInCache(category, iconName, isFill);

  const cacheKey = getIconCacheKey(category, iconName, isFill);

  const fallback = (
    <div
      style={{
        width: size,
        height: size,
        display: 'inline-block',
      }}
    />
  );

  if (!cacheKey || !iconCache.has(cacheKey)) {
    return fallback;
  }

  const resolvedColor = resolveColor(color);
  const focusableBool = focusable === true || focusable === 'true' ? true : focusable === false || focusable === 'false' ? false : undefined;

  return (
    <Suspense fallback={fallback}>
      <LazyIconRenderer
        ref={ref}
        cacheKey={cacheKey}
        size={size}
        color={resolvedColor}
        className={className}
        focusable={focusableBool}
        restProps={restProps}
      />
    </Suspense>
  );
});

Icon.displayName = 'Icon';
