import { forwardRef, Suspense } from 'react';
import type { ComponentType } from 'react';

import { getBrandSync, getBrandLazy, hasBrand } from './brand-registry';
import type { BrandIconProps } from './BrandIcon.types';
import type { Props } from '../Icon/IconWrapper.types';

/** 브랜드/로고 아이콘 컴포넌트. Figma 디자인과 동일하게 표시 */
export const BrandIcon = forwardRef<SVGSVGElement, BrandIconProps>(({
  brandType,
  size = 24,
  className,
  ...props
}, ref) => {
  if (!hasBrand(brandType)) {
    console.warn(`BrandIcon: Unknown brand "${brandType}"`);
    return null;
  }

  const fallback = <div style={{ width: size, height: size, display: 'inline-block' }} />;

  const IconComponent = (getBrandSync(brandType) || getBrandLazy(brandType)) as ComponentType<Props> | null;
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

BrandIcon.displayName = 'BrandIcon';
