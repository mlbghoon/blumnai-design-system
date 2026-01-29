import { forwardRef } from 'react';

import { Button } from '../../button/Button';
import { cn } from '../../../utils/cn';

import { BUTTON_CONTAINER_CONFIG } from 'constants/dropdown/DropdownMenu/DropdownMenu.constants';
import type { DropdownMenuButtonProps } from './DropdownMenu.types';

/**
 * DropdownMenuButton 컴포넌트
 *
 * 드롭다운 메뉴 내에 버튼 스타일의 아이템을 렌더링합니다.
 * Button 컴포넌트를 사용합니다.
 */
export const DropdownMenuButton = forwardRef<HTMLDivElement, DropdownMenuButtonProps>(({
  label,
  buttonStyle = 'secondary',
  leadIcon,
  tailIcon,
  disabled = false,
  onClick,
  className,
  ...props
}, ref) => {
  const containerClassName = cn(
    BUTTON_CONTAINER_CONFIG.container,
    disabled ? 'cursor-not-allowed' : 'cursor-pointer',
    className
  );

  return (
    <div
      ref={ref}
      role="presentation"
      className={containerClassName}
      {...props}
    >
      <Button
        style={buttonStyle}
        size="sm"
        leadIcon={leadIcon}
        tailIcon={tailIcon}
        disabled={disabled}
        onClick={onClick}
        fullWidth
      >
        {label}
      </Button>
    </div>
  );
});

DropdownMenuButton.displayName = 'DropdownMenuButton';
