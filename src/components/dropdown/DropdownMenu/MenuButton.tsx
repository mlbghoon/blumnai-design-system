import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';

import { Button } from '../../button/Button';
import type { IconType } from '../../icons/Icon/Icon.types';

export interface MenuButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'style'> {
  /**
   * 버튼 라벨
   */
  label: string;
  /**
   * 버튼 앞에 표시되는 아이콘
   */
  leadIcon?: IconType;
  /**
   * 버튼 뒤에 표시되는 아이콘
   */
  tailIcon?: IconType;
}

/**
 * MenuButton 컴포넌트
 *
 * 드롭다운 메뉴 내에서 사용되는 버튼입니다.
 * DropdownMenuButtonGroup 내에서 사용하거나 단독으로 사용할 수 있습니다.
 * Button 컴포넌트를 사용합니다.
 */
export const MenuButton = forwardRef<HTMLButtonElement, MenuButtonProps>(({
  label,
  leadIcon,
  tailIcon,
  disabled = false,
  className,
  ...props
}, ref) => {
  return (
    <Button
      ref={ref}
      style="secondary"
      size="sm"
      leadIcon={leadIcon}
      tailIcon={tailIcon}
      disabled={disabled}
      className={className}
      {...props}
    >
      {label}
    </Button>
  );
});

MenuButton.displayName = 'MenuButton';
