import type { MouseEvent } from 'react';
import { forwardRef, useMemo } from 'react';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '../../dropdown';
import { renderIconProp } from '../../icons/Icon';
import { cn } from '@/lib/utils';

import type { BreadcrumbsProps } from './Breadcrumbs.types';

const ELLIPSIS_MARKER = '__breadcrumb_ellipsis__';

/**
 * Breadcrumbs 컴포넌트
 *
 * 계층 구조에서 사용자의 현재 위치를 보여주는 내비게이션 브레드크럼 경로를 표시합니다.
 * 다양한 크기, 구분자, 아이템 축소 기능을 지원합니다.
 *
 * @example
 * ```tsx
 * <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Products' }]} />
 * ```
 */
export const Breadcrumbs = forwardRef<HTMLElement, BreadcrumbsProps>(({
  items,
  size = 'sm',
  separator = 'slash',
  maxItems,
  className,
  ...props
}, ref) => {
  const effectiveMaxItems = maxItems && maxItems >= 3 ? maxItems : undefined;

  const hiddenItems = useMemo(() => {
    if (!effectiveMaxItems || items.length <= effectiveMaxItems) return [];
    return items.slice(1, -(effectiveMaxItems - 2));
  }, [items, effectiveMaxItems]);

  const visibleItems = useMemo(() => {
    if (!effectiveMaxItems || items.length <= effectiveMaxItems) {
      return items;
    }

    const firstItem = items[0];
    const lastItems = items.slice(-(effectiveMaxItems - 2));
    return [firstItem, { label: ELLIPSIS_MARKER, disabled: true }, ...lastItems] as typeof items;
  }, [items, effectiveMaxItems]);

  const separatorChar = useMemo(() => {
    switch (separator) {
      case 'chevron':
        return '>';
      case 'dot':
        return '•';
      case 'arrow':
        return '→';
      case 'slash':
      default:
        return '/';
    }
  }, [separator]);

  const iconSize = size === 'sm' ? 16 : 18;

  const sizeClasses = size === 'sm'
    ? 'size-sm line-height-leading-5 font-medium letter-spacing-tracking-normal'
    : 'size-md line-height-leading-6 font-medium letter-spacing-tracking-normal';

  const renderIcon = (item: typeof items[0]) => {
    if (item.image) {
      return (
        <span className="inline-flex items-center shrink-0">
          <img
            src={item.image}
            alt=""
            className="rounded-full object-cover border-default"
            style={{ width: iconSize, height: iconSize }}
          />
        </span>
      );
    }

    if (item.icon) {
      return (
        <span className="inline-flex items-center shrink-0">
          {renderIconProp(item.icon, { size: iconSize, color: 'default' })}
        </span>
      );
    }

    return null;
  };

  return (
    <nav
      ref={ref}
      aria-label="Breadcrumb"
      className={cn('flex items-center font-body', className)}
      {...props}
    >
      <ol className="flex items-center ds-gap-2 list-none">
        {visibleItems.map((item, index) => {
          const isLast = index === visibleItems.length - 1;
          const isClickable = (!!item.href || !!item.onClick) && !item.disabled && !isLast;
          const isEllipsis = item.label === ELLIPSIS_MARKER;

          const handleClick = (e: MouseEvent) => {
            if (item.onClick) {
              e.preventDefault();
              item.onClick();
            }
          };

          return (
            <li
              key={item.href ?? `${item.label}-${index}`}
              className={cn('flex items-center ds-gap-2', sizeClasses)}
            >
              {isEllipsis ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      aria-label="Show hidden breadcrumbs"
                      className={cn(
                        'flex items-center ds-gap-1 cursor-pointer',
                        'text-default hover:underline',
                        'bg-transparent border-none padding-0 font-inherit'
                      )}
                    >
                      &hellip;
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" sideOffset={4}>
                    {hiddenItems.map((hiddenItem, i) => (
                      <DropdownMenuItem
                        key={hiddenItem.href ?? `hidden-${i}`}
                        disabled={hiddenItem.disabled}
                        onClick={() => {
                          if (hiddenItem.onClick) {
                            hiddenItem.onClick();
                          } else if (hiddenItem.href) {
                            window.location.href = hiddenItem.href;
                          }
                        }}
                      >
                        {hiddenItem.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : isClickable && item.href ? (
                <a
                  href={item.href}
                  onClick={handleClick}
                  className={cn(
                    'flex items-center ds-gap-1 hover:underline',
                    'text-default'
                  )}
                >
                  {renderIcon(item)}
                  {item.label}
                </a>
              ) : isClickable && item.onClick ? (
                <button
                  type="button"
                  onClick={() => item.onClick!()}
                  className={cn(
                    'flex items-center ds-gap-1 hover:underline',
                    'text-default cursor-pointer',
                    'bg-transparent border-none padding-0 font-inherit'
                  )}
                >
                  {renderIcon(item)}
                  {item.label}
                </button>
              ) : (
                <span
                  className={cn(
                    'flex items-center ds-gap-1',
                    isLast ? 'text-subtle' : 'text-default',
                    item.disabled && 'cursor-default opacity-60'
                  )}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {renderIcon(item)}
                  {item.label}
                </span>
              )}

              {!isLast && (
                <span
                  className="text-subtle"
                  aria-hidden="true"
                >
                  {separatorChar}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
});

Breadcrumbs.displayName = 'Breadcrumbs';
