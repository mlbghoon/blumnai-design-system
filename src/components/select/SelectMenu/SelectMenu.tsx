import { forwardRef } from 'react';

import { cn } from '../../../utils/cn';
import { MENU_CONTAINER_BASE, MENU_SIZE_CONFIG } from 'constants/select/Select/Select.constants';

export interface SelectMenuProps {
  children: React.ReactNode;
  width?: number | string;
  maxHeight?: number | string;
  hasSearch?: boolean;
  className?: string;
}

export const SelectMenu = forwardRef<HTMLDivElement, SelectMenuProps>(({
  children,
  width,
  maxHeight = 300,
  hasSearch = false,
  className,
}, ref) => {
  const containerClassName = cn(
    MENU_CONTAINER_BASE,
    MENU_SIZE_CONFIG.minWidth,
    MENU_SIZE_CONFIG.maxWidth,
    hasSearch ? 'padding-b-4' : MENU_SIZE_CONFIG.padding,
    'overflow-y-auto overflow-x-hidden scrollbar-thin',
    className
  );

  const styleObj: React.CSSProperties = {};
  if (width) {
    styleObj.width = typeof width === 'number' ? `${width}px` : width;
  }
  if (maxHeight) {
    styleObj.maxHeight = typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight;
  }

  return (
    <div
      ref={ref}
      role="listbox"
      className={containerClassName}
      style={styleObj}
    >
      {children}
    </div>
  );
});

SelectMenu.displayName = 'SelectMenu';
