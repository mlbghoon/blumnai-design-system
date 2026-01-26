import { forwardRef } from 'react';

import { Avatar } from '../../avatar/Avatar';
import { Badge } from '../../badge/Badge';
import { Icon } from '../../icons/Icon';
import { cn } from '../../../utils/cn';

import {
  AVATAR_ITEM_CONFIG,
  ITEM_STATE_CONFIG,
  CAPTION_CONFIG,
} from './DropdownMenu.constants';
import type { DropdownMenuAvatarProps } from './DropdownMenu.types';

/**
 * DropdownMenuAvatar 컴포넌트
 *
 * 드롭다운 메뉴의 아바타가 있는 아이템입니다.
 * 아이콘 대신 사용자 아바타를 표시합니다.
 */
export const DropdownMenuAvatar = forwardRef<HTMLDivElement, DropdownMenuAvatarProps>(({
  label,
  avatarSrc,
  avatarAlt,
  tailIcon,
  caption,
  shortcut,
  disabled = false,
  onClick,
  className,
  ...props
}, ref) => {
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
    AVATAR_ITEM_CONFIG.container,
    className
  );

  const innerClassName = cn(
    AVATAR_ITEM_CONFIG.inner,
    disabled ? ITEM_STATE_CONFIG.disabled.bg : ITEM_STATE_CONFIG.default.bg,
    !disabled && ITEM_STATE_CONFIG.hover.bg,
    !disabled && ITEM_STATE_CONFIG.active.bg,
    disabled ? 'cursor-not-allowed' : 'cursor-pointer',
  );

  const labelClassName = cn(
    'font-body',
    AVATAR_ITEM_CONFIG.text,
    disabled ? ITEM_STATE_CONFIG.disabled.text : ITEM_STATE_CONFIG.default.text,
    'flex-1 truncate'
  );

  const captionClassName = cn(
    CAPTION_CONFIG.container,
    CAPTION_CONFIG.text,
    disabled ? ITEM_STATE_CONFIG.disabled.captionText : ITEM_STATE_CONFIG.default.captionText
  );

  const iconColor = disabled
    ? ITEM_STATE_CONFIG.disabled.iconColor
    : ITEM_STATE_CONFIG.default.iconColor;

  return (
    <div
      ref={ref}
      role="menuitem"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={containerClassName}
      {...props}
    >
      <div className={innerClassName}>
        {/* 아바타 */}
        <Avatar
          variant={avatarSrc ? 'userpic' : 'initials'}
          size="xs"
          shape="rounded"
          src={avatarSrc}
          alt={avatarAlt || label}
          initials={avatarAlt || label}
        />

        {/* 라벨 영역 */}
        <div className="flex-1 min-w-0 padding-x-4">
          <span className={labelClassName}>{label}</span>
        </div>

        {/* 캡션 */}
        {caption && (
          <span className={captionClassName}>{caption}</span>
        )}

        {/* 단축키 뱃지 */}
        {shortcut && (
          <Badge
            size="sm"
            color="neutral"
            border
            label={shortcut}
          />
        )}

        {/* 테일 아이콘 */}
        {tailIcon && (
          <div className="flex items-center justify-center flex-shrink-0 width-20 height-20">
            <Icon
              iconType={tailIcon}
              size={16}
              color={iconColor}
            />
          </div>
        )}
      </div>
    </div>
  );
});

DropdownMenuAvatar.displayName = 'DropdownMenuAvatar';
