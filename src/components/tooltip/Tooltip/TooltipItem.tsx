import { forwardRef, type HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';
import { Icon, parseIconTypeWithFill } from '../../icons/Icon';
import type { IconTypeWithFill } from '../../icons/Icon';

import type { TooltipItemType } from './Tooltip.types';

export type { TooltipItemType } from './Tooltip.types';

export interface TooltipItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * 툴팁 아이템 타입
   * - `divider`: 구분선
   * - `label`: 라벨 및 캡션
   * - `item`: 인디케이터/아이콘, 라벨, 캡션
   * - `text`: 텍스트
   */
  type: TooltipItemType;
  /** 라벨 텍스트 */
  label?: string;
  /** 캡션 텍스트 */
  caption?: string;
  /** 인디케이터 색상 (hex 또는 색상명) */
  indicatorColor?: string;
  /** 아이콘 타입 */
  icon?: IconTypeWithFill;
  /** 텍스트 내용 */
  text?: string;
}

/**
 * 툴팁 아이템 컴포넌트
 */
export const TooltipItem = forwardRef<HTMLDivElement, TooltipItemProps>(
  (
    {
      type,
      label,
      caption,
      indicatorColor,
      icon,
      text,
      className,
      ...props
    },
    ref
  ) => {
    if (type === 'divider') {
      return (
        <div
          ref={ref}
          className={cn(
            'self-stretch',
            'padding-y-2 padding-x-4',
            'flex items-center justify-start ds-gap-8',
            'relative',
            className
          )}
          {...props}
        >
          <div className="flex-1 h-px bg-basic-gray-alpha-10" />
        </div>
      );
    }

    if (type === 'text') {
      return (
        <div
          ref={ref}
          className={cn('self-stretch padding-y-2 padding-x-4 flex items-center justify-start ds-gap-8', className)}
          {...props}
        >
          <span className="flex-1 font-body size-xs line-height-leading-4 font-normal letter-spacing-tracking-normal text-muted">
            {text}
          </span>
        </div>
      );
    }

    if (type === 'label') {
      return (
        <div
          ref={ref}
          className={cn('self-stretch padding-y-2 padding-x-4 flex items-center justify-between ds-gap-8', className)}
          {...props}
        >
          {label && (
            <span className="flex-1 font-body size-xs line-height-leading-4 font-medium letter-spacing-tracking-normal text-default">
              {label}
            </span>
          )}
          {caption && (
            <span className="font-body size-xs line-height-leading-4 font-normal letter-spacing-tracking-normal text-muted">
              {caption}
            </span>
          )}
        </div>
      );
    }

    if (type === 'item') {
      return (
        <div
          ref={ref}
          className={cn('self-stretch padding-y-2 padding-x-4 flex items-center justify-start ds-gap-6', className)}
          {...props}
        >
          {indicatorColor && (
            <div className="width-16 height-16 flex flex-col items-center justify-center flex-shrink-0">
              <div
                className="width-8 height-8 rounded-2xs flex-shrink-0"
                style={{ backgroundColor: indicatorColor }}
              />
            </div>
          )}
          {icon && !indicatorColor && (() => {
            const { iconType, isFill } = parseIconTypeWithFill(icon);
            return (
              <div className="width-16 height-16 flex flex-col items-center justify-center flex-shrink-0">
                <Icon iconType={iconType} isFill={isFill} size={14} />
              </div>
            );
          })()}
          {label && (
            <span className="flex-1 font-body size-xs line-height-leading-4 font-medium letter-spacing-tracking-normal text-subtle">
              {label}
            </span>
          )}
          {caption && (
            <span className="size-xs font-body line-height-leading-4 font-normal letter-spacing-tracking-normal text-muted">
              {caption}
            </span>
          )}
        </div>
      );
    }

    return null;
  }
);

TooltipItem.displayName = 'TooltipItem';
