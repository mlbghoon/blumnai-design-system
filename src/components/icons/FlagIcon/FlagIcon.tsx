import { forwardRef, Suspense } from 'react';
import type { ComponentType } from 'react';

import { getFlagSync, getFlagLazy, hasFlag } from './flag-registry';
import type { FlagIconProps } from './FlagIcon.types';
import type { Props } from '../Icon/IconWrapper.types';

/** 국가/지역 플래그 아이콘 컴포넌트. TypeScript 자동완성 지원 */
export const FlagIcon = forwardRef<SVGSVGElement, FlagIconProps>(({
  country,
  size = 24,
  className,
  ...props
}, ref) => {
  const fallback = (
    <div
      style={{
        width: size,
        height: size,
        display: 'inline-block',
      }}
    />
  );

  if (!hasFlag(country)) {
    console.warn(`FlagIcon: Unknown country "${country}"`);
    return fallback;
  }

  const IconComponent = (getFlagSync(country) || getFlagLazy(country)) as ComponentType<Props> | null;
  if (!IconComponent) {
    return fallback;
  }

  return (
    <Suspense fallback={fallback}>
      <IconComponent
        ref={ref}
        size={size}
        className={className}
        {...props}
      />
    </Suspense>
  );
});

FlagIcon.displayName = 'FlagIcon';
