import { forwardRef } from 'react';

import { cn } from '../../../utils/cn';
import { Icon, parseIconTypeWithFill } from '../../icons/Icon';
import type { EmptyStateProps, EmptyStateSize } from './EmptyState.types';

const SIZE_CONFIG: Record<EmptyStateSize, { icon: number; title: string; description: string; gap: string }> = {
  sm: {
    icon: 32,
    title: 'font-body size-sm line-height-leading-5 font-medium text-default',
    description: 'font-body size-xs line-height-leading-4 text-muted',
    gap: 'ds-gap-8',
  },
  md: {
    icon: 40,
    title: 'font-body size-md line-height-leading-6 font-medium text-default',
    description: 'font-body size-sm line-height-leading-5 text-muted',
    gap: 'ds-gap-12',
  },
};

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ icon, title, description, action, size = 'md', className, ...props }, ref) => {
    const config = SIZE_CONFIG[size];

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col items-center justify-center text-center',
          config.gap,
          className
        )}
        {...props}
      >
        {icon && (() => {
          const { iconType, isFill } = parseIconTypeWithFill(icon);
          return (
            <Icon
              iconType={iconType}
              isFill={isFill}
              size={config.icon}
              color="default-muted"
            />
          );
        })()}
        <div className={cn('flex flex-col items-center', size === 'sm' ? 'ds-gap-2' : 'ds-gap-4')}>
          <span className={config.title}>{title}</span>
          {description && (
            <span className={config.description}>{description}</span>
          )}
        </div>
        {action && (
          <div className="margin-t-24">
            {action}
          </div>
        )}
      </div>
    );
  }
);

EmptyState.displayName = 'EmptyState';
