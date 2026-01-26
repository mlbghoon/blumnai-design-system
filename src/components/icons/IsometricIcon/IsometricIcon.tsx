import { forwardRef, useState, useEffect } from 'react';
import type { ComponentType } from 'react';

import type { IsometricIconProps } from './IsometricIcon.types';
import type { IsometricIconType } from './isometric-icon-data';
import { iconTypeToName } from './isometric-icon-data';
import type { IsometricSvgProps } from './icons/isometric.types';

/** 로딩된 아이소메트릭 아이콘 컴포넌트 캐시 */
const isoIconCache = new Map<string, ComponentType<IsometricSvgProps>>();

/** 컴포넌트 이름 생성 */
function getComponentName(iconType: IsometricIconType, view: 'top' | 'left'): string | null {
  const pascalName = iconTypeToName[iconType];
  if (!pascalName) return null;
  const pascalView = view === 'top' ? 'Top' : 'Left';
  return `Iso${pascalName}${pascalView}Icon`;
}

/**
 * 아이소메트릭 아이콘 컴포넌트
 * top/left 뷰 시점의 아이소메트릭 스타일 아이콘 표시
 * 번들 최적화를 위해 모든 아이콘 지연 로딩
 */
export const IsometricIcon = forwardRef<SVGSVGElement, IsometricIconProps>(({
  iconType,
  view = 'top',
  size = 24,
  className,
  fillColor = 'default',
  strokeColor = 'accent',
  ...props
}, ref) => {
  const [Component, setComponent] = useState<ComponentType<IsometricSvgProps> | null>(() => {
    const componentName = getComponentName(iconType, view);
    if (!componentName) return null;
    return isoIconCache.get(componentName) ?? null;
  });

  useEffect(() => {
    const componentName = getComponentName(iconType, view);
    if (!componentName) {
      setComponent(null);
      return;
    }

    const cached = isoIconCache.get(componentName);
    if (cached) {
      setComponent(() => cached);
      return;
    }

    let cancelled = false;
    import(`./icons/${componentName}.tsx`)
      .then(m => {
        if (!cancelled) {
          const LoadedComponent = m[componentName] as ComponentType<IsometricSvgProps>;
          isoIconCache.set(componentName, LoadedComponent);
          setComponent(() => LoadedComponent);
        }
      })
      .catch(() => {
        if (!cancelled) {
          console.warn(`IsometricIcon: Failed to load icon "${iconType}" with view "${view}"`);
          setComponent(null);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [iconType, view]);

  if (!Component) {
    return (
      <div
        style={{
          width: size,
          height: size,
          display: 'inline-block',
        }}
      />
    );
  }

  return (
    <Component
      ref={ref}
      size={size}
      className={className}
      fillColor={fillColor}
      strokeColor={strokeColor}
      {...props}
    />
  );
});

IsometricIcon.displayName = 'IsometricIcon';
