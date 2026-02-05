import { forwardRef, useMemo } from 'react';

import { Icon, parseIconTypeWithFill } from '../../icons/Icon';
import type { IconTypeWithFill } from '../../icons/Icon/Icon.types';
import { cn } from '../../../utils/cn';

import type { BreadcrumbsProps } from './Breadcrumbs.types';

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
  // Determine visible items (handle maxItems collapsing)
  const visibleItems = useMemo(() => {
    if (!maxItems || items.length <= maxItems) {
      return items;
    }

    // Show first item, ellipsis, and last maxItems - 1 items
    const firstItem = items[0];
    const lastItems = items.slice(-(maxItems - 1));
    return [firstItem, { label: '...', disabled: true }, ...lastItems] as typeof items;
  }, [items, maxItems]);

  // Separator character/text based on separator type
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

  // Icon size based on breadcrumb size
  const iconSize = size === 'sm' ? 16 : 18;

  // Size classes - using Figma typography values
  const sizeClasses = size === 'sm'
    ? 'text-sm leading-5 font-medium tracking-[-0.6px]'
    : 'text-base leading-6 font-medium tracking-[-0.6px]';

  // Render icon or image for breadcrumb item
  const renderIcon = (item: typeof items[0]) => {
    if (item.image) {
      return (
        <span className="inline-flex items-center shrink-0">
          <img
            src={item.image}
            alt=""
            className="rounded-full object-cover border border-[#27272a1a]"
            style={{ width: iconSize, height: iconSize }}
          />
        </span>
      );
    }

    if (item.icon) {
      // Check if icon is an IconTypeWithFill tuple [category, name] or [category, name, isFill]
      if (Array.isArray(item.icon) && (item.icon.length === 2 || item.icon.length === 3) && typeof item.icon[0] === 'string' && typeof item.icon[1] === 'string') {
        const { iconType, isFill } = parseIconTypeWithFill(item.icon as IconTypeWithFill);
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

          const handleClick = (e: React.MouseEvent) => {
            if (item.onClick) {
              e.preventDefault();
              item.onClick();
            }
          };

          return (
            <li
              key={index}
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
