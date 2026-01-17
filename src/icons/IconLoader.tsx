import { forwardRef, Suspense, useMemo } from 'react';

import type { Props } from './Icon.types';
import { iconRegistry, type IconType } from './icon-registry';

/**
 * 아이콘 타입 이름을 레지스트리 형식에 맞게 정규화합니다.
 * Figma 이름(공백 포함)을 레지스트리 형식(언더스코어 또는 케밥 케이스)으로 변환합니다.
 * 
 * @param input - Figma 또는 케밥 케이스 형식의 아이콘 이름
 * @returns 레지스트리 키와 일치하는 정규화된 이름
 * 
 * @example
 * normalizeIconType("virgin islands") -> "virgin_islands"
 * normalizeIconType("VIRGIN ISLANDS") -> "virgin_islands"
 * normalizeIconType("arrow-down-icon") -> "arrow-down-icon"
 * normalizeIconType("arrow down") -> "arrow_down"
 */
function normalizeIconType(input: string): string {
  return String(input)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/[^a-z0-9_-]/g, '')
    .replace(/_+/g, '_')
    .replace(/-+/g, '-')
    .replace(/^[_-]|[_-]$/g, '');
}


interface IconLoaderProps extends Omit<Props, 'children'> {
  /** 
   * 아이콘 타입 이름. 다음 형식을 지원합니다:
   * - "-icon" 접미사가 있는 케밥 케이스: "file-code-sm-icon", "arrow-down-icon"
   * - 접미사 없는 케밥 케이스 (자동으로 "-icon" 추가): "at-fill", "arrow-down"
   * - 공백이 있는 Figma 이름 (언더스코어로 변환): "virgin islands", "arrow down"
   * - 언더스코어가 있는 Figma 이름: "virgin_islands", "arrow_down"
   * 
   * 이름은 자동으로 정규화되어 매칭되므로 다음을 사용할 수 있습니다:
   * - "at-fill" 또는 "at-fill-icon" (둘 다 작동)
   * - "virgin islands" 또는 "virgin_islands" 또는 "VIRGIN ISLANDS"
   * - "arrow-down-icon" 또는 "arrow down icon" 또는 "arrow_down"
   */
  type: string;
  /** 아이콘 로딩 중 표시할 폴백 요소 */
  fallback?: React.ReactNode;
}

/**
 * 타입 이름으로 아이콘을 동적으로 로드하는 IconLoader 컴포넌트.
 * 
 * 케밥 케이스 타입 이름을 사용하여 아이콘을 로드하는 편리한 API를 제공하며,
 * 성능 향상을 위해 자동 지연 로딩을 사용합니다.
 * 
 * @example
 * ```tsx
 * import { IconLoader } from 'blumnai-design-system';
 * 
 * // "-icon" 접미사가 있는 케밥 케이스 사용
 * <IconLoader type="file-code-sm-icon" size={24} title="Code" />
 * <IconLoader type="arrow-down-icon" size={24} />
 * 
 * // 접미사 없는 케밥 케이스 사용 (자동으로 "-icon" 추가)
 * <IconLoader type="at-fill" size={24} />
 * <IconLoader type="arrow-down" size={24} />
 * 
 * // Figma 이름 사용 (공백이 자동으로 언더스코어로 변환)
 * <IconLoader type="virgin islands" size={24} />
 * <IconLoader type="VIRGIN ISLANDS" size={24} />
 * <IconLoader type="arrow down" size={24} />
 * 
 * // ref 사용 예시
 * const iconRef = useRef<SVGSVGElement>(null);
 * <IconLoader ref={iconRef} type="arrow-down-icon" size={24} />
 * ```
 */
export const IconLoader = forwardRef<SVGSVGElement, IconLoaderProps>(({
  type,
  fallback,
  size,
  ...iconProps
}, ref) => {
  const normalizedType = useMemo(() => normalizeIconType(type), [type]);
  const IconComponent = useMemo(() => {
    let component: React.ComponentType<Props> | undefined = iconRegistry[normalizedType as IconType] || iconRegistry[type as IconType];

    if (!component && !normalizedType.endsWith('-icon')) {
      const withSuffix = `${normalizedType}-icon`;
      component = iconRegistry[withSuffix as IconType];
    }

    if (!component && normalizedType.includes('_')) {
      const withHyphens = normalizedType.replace(/_/g, '-');
      if (!withHyphens.endsWith('-icon')) {
        component = iconRegistry[`${withHyphens}-icon` as IconType];
      } else {
        component = iconRegistry[withHyphens as IconType];
      }
    }

    if (!component && normalizedType.includes('-') && !normalizedType.endsWith('-icon')) {
      const withUnderscores = normalizedType.replace(/-/g, '_');
      component = iconRegistry[withUnderscores as IconType];
    }

    return component;
  }, [normalizedType, type]);

  const defaultFallback = useMemo(() => (
    <div
      style={{
        width: size || 24,
        height: size || 24,
        display: 'inline-block'
      }}
    />
  ), [size]);

  if (!IconComponent) {
    console.warn(
      `Icon type "${type}" (normalized: "${normalizedType}") not found in registry. ` +
      `Available types: ${Object.keys(iconRegistry).slice(0, 10).join(', ')}...`
    );
    return fallback || null;
  }

  return (
    <Suspense fallback={fallback || defaultFallback}>
      <IconComponent {...iconProps} size={size} ref={ref} />
    </Suspense>
  );
});

IconLoader.displayName = 'IconLoader';
