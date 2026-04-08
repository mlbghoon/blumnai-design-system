import { forwardRef } from 'react';

import { cn } from '../../../utils/cn';
import { Icon, parseIconTypeWithFill } from '../../icons/Icon';
import type { EmptyStateProps, EmptyStateSize, EmptyStateVariant } from './EmptyState.types';

const SIZE_CONFIG: Record<EmptyStateSize, { icon: number; title: string; description: string; gap: string; textGap: string }> = {
  xs: {
    icon: 24,
    title: 'font-body size-xs line-height-leading-4 font-medium text-default',
    description: 'font-body size-xs line-height-leading-4 text-muted',
    gap: 'ds-gap-4',
    textGap: 'ds-gap-1',
  },
  sm: {
    icon: 32,
    title: 'font-body size-sm line-height-leading-5 font-medium text-default',
    description: 'font-body size-xs line-height-leading-4 text-muted',
    gap: 'ds-gap-8',
    textGap: 'ds-gap-2',
  },
  md: {
    icon: 40,
    title: 'font-body size-md line-height-leading-6 font-medium text-default',
    description: 'font-body size-sm line-height-leading-5 text-muted',
    gap: 'ds-gap-12',
    textGap: 'ds-gap-4',
  },
  lg: {
    icon: 56,
    title: 'font-body size-lg line-height-leading-6 font-semibold text-default',
    description: 'font-body size-md line-height-leading-6 text-muted',
    gap: 'ds-gap-16',
    textGap: 'ds-gap-6',
  },
};

const VARIANT_CLASSES: Record<EmptyStateVariant, string> = {
  default: '',
  inline: 'padding-y-8',
  fill: 'width-full height-full padding-24',
};

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ icon, illustration, title, description, action, variant = 'default', size = 'md', className, ...props }, ref) => {
    const config = SIZE_CONFIG[size];

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col items-center justify-center text-center',
          config.gap,
          VARIANT_CLASSES[variant],
          className
        )}
        {...props}
      >
        {illustration ? (
          <div className="flex items-center justify-center">
            {illustration}
          </div>
        ) : icon ? (() => {
          const { iconType, isFill } = parseIconTypeWithFill(icon);
          return (
            <Icon
              iconType={iconType}
              isFill={isFill}
              size={config.icon}
              color="default-muted"
            />
          );
        })() : null}
        <div className={cn('flex flex-col items-center', config.textGap)}>
          <span className={config.title}>{title}</span>
          {description && (
            <span className={config.description}>{description}</span>
          )}
        </div>
        {action && (
          <div className={size === 'xs' ? 'margin-t-8' : 'margin-t-24'}>
            {action}
          </div>
        )}
      </div>
    );
  }
);

EmptyState.displayName = 'EmptyState';
