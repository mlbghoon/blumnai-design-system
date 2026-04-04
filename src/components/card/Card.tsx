import * as React from 'react';
import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import type {
  CardProps,
  CardHeaderProps,
  CardTitleProps,
  CardDescriptionProps,
  CardContentProps,
  CardFooterProps,
  CardGroupProps,
} from './Card.types';

const cardVariants = cva(
  'rounded-lg bg-state-secondary text-default',
  {
    variants: {
      variant: {
        default: 'border-default shadow-card',
        outline: 'border-default',
        ghost: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, interactive, onClick, onKeyDown, ...props }, ref) => {
    const handleKeyDown = interactive
      ? (e: React.KeyboardEvent<HTMLDivElement>) => {
          onKeyDown?.(e);
          if (e.defaultPrevented) return;
          if ((e.key === 'Enter' || e.key === ' ') && !e.repeat) {
            e.preventDefault();
            (e.currentTarget as HTMLElement).click();
          }
        }
      : onKeyDown;

    return (
      <div
        ref={ref}
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        className={cn(
          cardVariants({ variant }),
          interactive && 'cursor-pointer hover:shadow-modal-sm transition-shadow focus-visible:shadow-component-focus focus-visible:outline-none',
          className
        )}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        {...props}
      />
    );
  }
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col ds-gap-6 padding-24', className)}
      {...props}
    />
  )
);
CardHeader.displayName = 'CardHeader';

const GRID_COLS = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
} as const;

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, as: Tag = 'h3', ...props }, ref) => (
    <Tag
      ref={ref}
      className={cn(
        'size-lg font-body font-semibold line-height-leading-6 letter-spacing-tracking-tight',
        className
      )}
      {...props}
    />
  )
);
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('size-sm font-body text-muted line-height-leading-5', className)}
      {...props}
    />
  )
);
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('padding-24 [padding-top:0]', className)}
      {...props}
    />
  )
);
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center padding-24 [padding-top:0]', className)}
      {...props}
    />
  )
);
CardFooter.displayName = 'CardFooter';

const CardGroup = React.forwardRef<HTMLDivElement, CardGroupProps>(
  ({ className, columns = 3, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('grid ds-gap-16', GRID_COLS[columns], className)}
      {...props}
    />
  )
);
CardGroup.displayName = 'CardGroup';

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardGroup,
};
