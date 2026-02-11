import { forwardRef, Suspense } from 'react';
import type { ComponentType } from 'react';

import type { IsometricIconProps } from './IsometricIcon.types';
import type { IsometricSvgProps } from './icons/isometric.types';
import { getIsoSync, getIsoLazy, hasIso } from './isometric-registry';

/**
 * 아이소메트릭 아이콘 컴포넌트
 * top/left 뷰 시점의 아이소메트릭 스타일 아이콘 표시
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
  const registryKey = `${iconType}-${view}`;

  const fallback = (
    <div
      style={{
        width: size,
        height: size,
        display: 'inline-block',
      }}
    />
  );

  if (!hasIso(registryKey)) {
    console.warn(`IsometricIcon: Unknown icon "${iconType}" with view "${view}"`);
    return fallback;
  }

  const IconComponent = (getIsoSync(registryKey) || getIsoLazy(registryKey)) as ComponentType<IsometricSvgProps> | null;
  if (!IconComponent) {
    return fallback;
  }

  return (
    <Suspense fallback={fallback}>
      <IconComponent
        ref={ref}
        size={size}
        className={className}
        fillColor={fillColor}
        strokeColor={strokeColor}
        {...props}
      />
    </Suspense>
  );
});

IsometricIcon.displayName = 'IsometricIcon';
