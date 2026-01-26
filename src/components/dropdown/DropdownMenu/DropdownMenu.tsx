import { forwardRef } from 'react';

import { cn } from '../../../utils/cn';

import {
  MENU_CONTAINER_BASE,
  MENU_SIZE_CONFIG,
} from './DropdownMenu.constants';
import type { DropdownMenuProps } from './DropdownMenu.types';

/**
 * DropdownMenu 컴포넌트
 *
 * 드롭다운 메뉴의 컨테이너입니다.
 * DropdownMenuItem, DropdownMenuLabel, DropdownMenuDivider 등을 자식으로 받습니다.
 * Figma 디자인을 기반으로 구현되었습니다.
 */
export const DropdownMenu = forwardRef<HTMLDivElement, DropdownMenuProps>(({
  children,
  width,
  className,
  ...props
}, ref) => {
  const containerClassName = cn(
    MENU_CONTAINER_BASE,
    MENU_SIZE_CONFIG.minWidth,
    MENU_SIZE_CONFIG.maxWidth,
    MENU_SIZE_CONFIG.padding,
    className
  );

  const widthStyle = width !== undefined
    ? { width: typeof width === 'number' ? width : width }
    : undefined;

  return (
    <div
      ref={ref}
      role="menu"
      className={containerClassName}
      style={widthStyle}
      {...props}
    >
      {children}
    </div>
  );
});

DropdownMenu.displayName = 'DropdownMenu';
