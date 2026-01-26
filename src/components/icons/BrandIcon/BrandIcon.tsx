import { forwardRef } from 'react';

import { brandRegistry } from './brand-registry';
import type { BrandIconProps } from './BrandIcon.types';

/** 브랜드/로고 아이콘 컴포넌트. Figma 디자인과 동일하게 표시 */
export const BrandIcon = forwardRef<SVGSVGElement, BrandIconProps>(({
  brandType,
  size = 24,
  className,
  ...props
}, ref) => {
  const Component = brandRegistry[brandType];

  if (!Component) {
    console.warn(`BrandIcon: Unknown brand "${brandType}"`);
    return null;
  }

  return (
    <Component
      ref={ref}
      size={size}
      className={className}
      {...props}
    />
  );
});

BrandIcon.displayName = 'BrandIcon';
