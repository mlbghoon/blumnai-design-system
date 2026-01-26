import { forwardRef } from 'react';

import { cn } from '../../../utils/cn';

import { MENU_CAPTION_CONFIG } from './DropdownMenu.constants';
import type { DropdownMenuCaptionProps } from './DropdownMenu.types';

/**
 * DropdownMenuCaption 컴포넌트
 *
 * 드롭다운 메뉴 내에 설명 텍스트를 표시합니다.
 */
export const DropdownMenuCaption = forwardRef<HTMLDivElement, DropdownMenuCaptionProps>(({
  children,
  className,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      role="presentation"
      className={cn(MENU_CAPTION_CONFIG.container, className)}
      {...props}
    >
      <span className={MENU_CAPTION_CONFIG.text}>{children}</span>
    </div>
  );
});

DropdownMenuCaption.displayName = 'DropdownMenuCaption';
