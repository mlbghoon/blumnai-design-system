import { forwardRef, Suspense } from 'react';

import { flagRegistry } from './flag-registry';
import type { FlagIconProps } from './FlagIcon.types';

/** 국가/지역 플래그 아이콘 컴포넌트. TypeScript 자동완성 지원 */
export const FlagIcon = forwardRef<SVGSVGElement, FlagIconProps>(({
  country,
  size = 24,
  className,
  ...props
}, ref) => {
  const Component = flagRegistry[country];

  const fallback = (
    <div
      style={{
        width: size,
        height: size,
        display: 'inline-block',
      }}
    />
  );

  if (!Component) {
    console.warn(`FlagIcon: Unknown country "${country}"`);
    return fallback;
  }

  return (
    <Suspense fallback={fallback}>
      <Component
        ref={ref}
        size={size}
        className={className}
        {...props}
      />
    </Suspense>
  );
});

FlagIcon.displayName = 'FlagIcon';
