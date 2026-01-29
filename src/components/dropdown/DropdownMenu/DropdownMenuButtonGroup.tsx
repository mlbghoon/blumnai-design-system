import { forwardRef } from 'react';

import { cn } from '../../../utils/cn';

import { BUTTON_GROUP_CONFIG } from 'constants/dropdown/DropdownMenu/DropdownMenu.constants';
import type { DropdownMenuButtonGroupProps } from './DropdownMenu.types';

/**
 * DropdownMenuButtonGroup 컴포넌트
 *
 * 드롭다운 메뉴 내에 여러 버튼을 그룹으로 배치할 때 사용합니다.
 */
export const DropdownMenuButtonGroup = forwardRef<HTMLDivElement, DropdownMenuButtonGroupProps>(({
  children,
  className,
  ...props
}, ref) => {
  const containerClassName = cn(
    BUTTON_GROUP_CONFIG.container,
    className
  );

  return (
    <div
      ref={ref}
      role="group"
      className={containerClassName}
      {...props}
    >
      {children}
    </div>
  );
});

DropdownMenuButtonGroup.displayName = 'DropdownMenuButtonGroup';
