import type { MouseEvent } from 'react';
import { forwardRef, useMemo } from 'react';

import { Icon, parseIconTypeWithFill } from '../../icons/Icon';
import type { IconTypeWithFill } from '../../icons/Icon/Icon.types';
import { cn } from '../../../utils/cn';

import type { BreadcrumbsProps } from './Breadcrumbs.types';

const isIconTypeWithFill = (icon: unknown): icon is IconTypeWithFill =>
  Array.isArray(icon) &&
  (icon.length === 2 || icon.length === 3) &&
  typeof icon[0] === 'string' &&
  typeof icon[1] === 'string';

/**
 * Breadcrumbs 컴포넌트
 *
 * 계층 구조에서 사용자의 현재 위치를 보여주는 내비게이션 브레드크럼 경로를 표시합니다.
 * 다양한 크기, 구분자, 아이템 축소 기능을 지원합니다.
 */
export const Breadcrumbs = forwardRef<HTMLElement, BreadcrumbsProps>(({
  items,
  size = 'sm',
  separator = 'slash',
  maxItems,
  darkMode = false,
  className,
  ...props
}, ref) => {
  const visibleItems = useMemo(() => {
    if (!maxItems || items.length <= maxItems) {
      return items;
    }

    const firstItem = items[0];
    const lastItems = items.slice(-(maxItems - 1));
    return [firstItem, { label: '...', disabled: true }, ...lastItems] as typeof items;
  }, [items, maxItems]);

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
      if (isIconTypeWithFill(item.icon)) {
        const { iconType, isFill } = parseIconTypeWithFill(item.icon);
        return (
          <span className="inline-flex items-center shrink-0">
            <Icon
              iconType={iconType}
              isFill={isFill}
              size={iconSize}
              color={darkMode ? '#ffffffb2' : '#4e4e55'}
            />
          </span>
        );
      }
      return <span className="inline-flex items-center shrink-0">{item.icon}</span>;
    }

    return null;
  };

  return (
    <nav
      ref={ref}
      aria-label="Breadcrumb"
      className={cn('flex items-center', className)}
      {...props}
    >
      <ol className="flex items-center gap-2 list-none">
        {visibleItems.map((item, index) => {
          const isLast = index === visibleItems.length - 1;
          const isClickable = (!!item.href || !!item.onClick) && !item.disabled && !isLast;

          const handleClick = (e: MouseEvent) => {
            if (item.onClick) {
              e.preventDefault();
              item.onClick();
            }
          };

          return (
            <li
              key={item.href ?? `${item.label}-${index}`}
              className={cn('flex items-center gap-2', sizeClasses)}
            >
              {isClickable ? (
                <a
                  href={item.href || '#'}
                  onClick={handleClick}
                  className={cn(
                    'flex items-center gap-1 hover:underline',
                    'text-default',
                    !item.href && item.onClick && 'cursor-pointer'
                  )}
                >
                  {renderIcon(item)}
                  {item.label}
                </a>
              ) : (
                <span
                  className={cn(
                    'flex items-center gap-1',
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
