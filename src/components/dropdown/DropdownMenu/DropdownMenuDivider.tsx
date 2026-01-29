import { forwardRef } from 'react';

import { cn } from '../../../utils/cn';

import { DIVIDER_CONFIG } from 'constants/dropdown/DropdownMenu/DropdownMenu.constants';
import type { DropdownMenuDividerProps } from './DropdownMenu.types';

/**
 * DropdownMenuDivider 컴포넌트
 *
 * 드롭다운 메뉴의 구분선입니다.
 * 메뉴 아이템들 사이에 시각적 구분을 줄 때 사용합니다.
 */
export const DropdownMenuDivider = forwardRef<HTMLDivElement, DropdownMenuDividerProps>(({
  className,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      role="separator"
      className={cn(DIVIDER_CONFIG.container, className)}
      {...props}
    >
      <div className={DIVIDER_CONFIG.line} />
    </div>
  );
});

DropdownMenuDivider.displayName = 'DropdownMenuDivider';
