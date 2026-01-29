import { forwardRef } from 'react';

import { cn } from '../../../utils/cn';

import {
  MENU_CONTAINER_BASE,
  MENU_SIZE_CONFIG,
} from 'constants/dropdown/DropdownMenu/DropdownMenu.constants';
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
  maxHeight = 300,
  className,
  ...props
}, ref) => {
  const containerClassName = cn(
    MENU_CONTAINER_BASE,
    width === undefined && MENU_SIZE_CONFIG.minWidth,
    width === undefined && MENU_SIZE_CONFIG.maxWidth,
    MENU_SIZE_CONFIG.padding,
    'overflow-y-auto overflow-x-hidden scrollbar-thin',
    className
  );

  const styleObj: React.CSSProperties = {};
  if (width !== undefined) {
    styleObj.width = typeof width === 'number' ? `${width}px` : width;
  }
  if (maxHeight) {
    styleObj.maxHeight = typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight;
  }

  return (
    <div
      ref={ref}
      role="menu"
      className={containerClassName}
      style={styleObj}
      {...props}
    >
      {children}
    </div>
  );
});

DropdownMenu.displayName = 'DropdownMenu';
