import * as React from 'react';
import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import type { SkeletonProps } from './Skeleton.types';

const skeletonVariants = cva(
  'bg-muted',
  {
    variants: {
      variant: {
        default: 'rounded-md',
        circular: 'rounded-full',
        text: 'rounded-sm',
      },
      animation: {
        pulse: 'motion-safe:animate-pulse',
        wave: 'motion-safe:animate-shimmer overflow-hidden relative',
        none: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      animation: 'pulse',
    },
  }
);

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant, width, height, style, animation = 'pulse', count, ...props }, ref) => {
    const sizeStyle: React.CSSProperties = {
      ...(width !== undefined && {
        width: typeof width === 'number' ? `${width}px` : width,
      }),
      ...(height !== undefined && {
        height: typeof height === 'number' ? `${height}px` : height,
      }),
      ...style,
    };

    const computedStyle = Object.keys(sizeStyle).length > 0 ? sizeStyle : undefined;

    if (count && count > 1) {
      return (
        <div className="flex flex-col ds-gap-8" aria-hidden="true">
          {Array.from({ length: count }, (_, i) => (
            <div
              key={i}
              ref={i === 0 ? ref : undefined}
              className={cn(skeletonVariants({ variant, animation }), className)}
              style={computedStyle}
              {...(i === 0 ? props : {})}
            />
          ))}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        aria-hidden="true"
        className={cn(skeletonVariants({ variant, animation }), className)}
        style={computedStyle}
        {...props}
      />
    );
  }
);
Skeleton.displayName = 'Skeleton';

export { Skeleton };
