import { forwardRef } from 'react';

import { Avatar } from '../../avatar/Avatar';
import { Icon } from '../../icons/Icon';
import { cn } from '../../../utils/cn';

import {
  MENU_ITEM_CONTAINER_BASE,
  MENU_ITEM_INNER_BASE,
  MENU_ITEM_SIZE_CONFIG,
  MENU_ITEM_STATE_CONFIG,
} from 'constants/select/Select/Select.constants';

export interface SelectMenuItemAvatarProps {
  label: string;
  avatarSrc?: string;
  avatarAlt?: string;
  description?: string;
  disabled?: boolean;
  selected?: boolean;
  focused?: boolean;
  onClick?: () => void;
  className?: string;
}

export const SelectMenuItemAvatar = forwardRef<HTMLDivElement, SelectMenuItemAvatarProps>(({
  label,
  avatarSrc,
  avatarAlt,
  description,
  disabled = false,
  selected = false,
  focused = false,
  onClick,
  className,
}, ref) => {
  const sizeConfig = description ? MENU_ITEM_SIZE_CONFIG.large : MENU_ITEM_SIZE_CONFIG.default;

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && !disabled && onClick) {
      e.preventDefault();
      onClick();
    }
  };

  const containerClassName = cn(
    MENU_ITEM_CONTAINER_BASE,
    className
  );

  const innerClassName = cn(
    MENU_ITEM_INNER_BASE,
    sizeConfig.height,
    sizeConfig.padding,
    sizeConfig.gap,
    disabled ? MENU_ITEM_STATE_CONFIG.disabled.bg : MENU_ITEM_STATE_CONFIG.default.bg,
    !disabled && MENU_ITEM_STATE_CONFIG.hover.bg,
    !disabled && MENU_ITEM_STATE_CONFIG.active.bg,
    !disabled && focused && 'shadow-component-focus',
    disabled ? 'cursor-not-allowed' : 'cursor-pointer',
  );

  const labelClassName = cn(
    'font-body',
    sizeConfig.text,
    disabled ? MENU_ITEM_STATE_CONFIG.disabled.text : MENU_ITEM_STATE_CONFIG.default.text,
    'flex-1 truncate'
  );

  return (
    <div
      ref={ref}
      role="option"
      aria-selected={selected}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={containerClassName}
    >
      <div className={innerClassName}>
        <Avatar
          size={description ? 'sm' : '2xs'}
          src={avatarSrc}
          alt={avatarAlt || label}
          className="flex-shrink-0"
        />

        {description ? (
          <div className="flex flex-col flex-1 min-w-0 padding-x-4 gap-1">
            <span className={labelClassName}>{label}</span>
            <span className={cn(
              'font-body size-xs line-height-leading-4 letter-spacing-tracking-tight',
              disabled ? 'text-hint' : 'text-muted',
              'truncate'
            )}>
              {description}
            </span>
          </div>
        ) : (
          <div className="flex-1 min-w-0 padding-x-4">
            <span className={labelClassName}>{label}</span>
          </div>
        )}

        {selected && (
          <div className="flex items-center justify-center flex-shrink-0 width-20 height-20">
            <Icon
              iconType={['system', 'check']}
              size={16}
              color={disabled ? 'default-disabled' : 'primary'}
            />
          </div>
        )}
      </div>
    </div>
  );
});

SelectMenuItemAvatar.displayName = 'SelectMenuItemAvatar';
