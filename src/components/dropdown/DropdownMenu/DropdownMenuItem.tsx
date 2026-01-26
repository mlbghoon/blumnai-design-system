import { forwardRef } from 'react';

import { Badge } from '../../badge/Badge';
import { Icon } from '../../icons/Icon';
import { cn } from '../../../utils/cn';

import {
  ITEM_CONTAINER_BASE,
  ITEM_INNER_BASE,
  ITEM_SIZE_CONFIG,
  ITEM_STATE_CONFIG,
  CAPTION_CONFIG,
} from './DropdownMenu.constants';
import type { DropdownMenuItemProps } from './DropdownMenu.types';

/**
 * DropdownMenuItem 컴포넌트
 *
 * 드롭다운 메뉴의 개별 아이템입니다.
 * 아이콘, 라벨, 캡션, 단축키 등을 지원합니다.
 */
export const DropdownMenuItem = forwardRef<HTMLDivElement, DropdownMenuItemProps>(({
  label,
  size = 'default',
  leadIcon,
  tailIcon,
  caption,
  description,
  shortcut,
  disabled = false,
  onClick,
  className,
  ...props
}, ref) => {
  const sizeConfig = ITEM_SIZE_CONFIG[size];

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
    ITEM_CONTAINER_BASE,
    className
  );

  const innerClassName = cn(
    ITEM_INNER_BASE,
    sizeConfig.height,
    sizeConfig.padding,
    sizeConfig.gap,
    // Apply default bg, hover bg, and active bg separately so they all work
    disabled ? ITEM_STATE_CONFIG.disabled.bg : ITEM_STATE_CONFIG.default.bg,
    !disabled && ITEM_STATE_CONFIG.hover.bg,
    !disabled && ITEM_STATE_CONFIG.active.bg,
    disabled ? 'cursor-not-allowed' : 'cursor-pointer',
  );

  const labelClassName = cn(
    'font-body',
    sizeConfig.text,
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
        {/* 리드 아이콘 */}
        {leadIcon && (
          <div className={cn('flex items-center justify-center flex-shrink-0', sizeConfig.iconFrame, sizeConfig.iconFrameBg)}>
            <Icon
              iconType={leadIcon}
              size={sizeConfig.iconSize}
              color={iconColor}
            />
          </div>
        )}

        {/* 라벨 영역 */}
        {size === 'large' && description ? (
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
          <div className={cn('flex items-center justify-center flex-shrink-0', sizeConfig.iconFrame)}>
            <Icon
              iconType={tailIcon}
              size={sizeConfig.iconSize}
              color={iconColor}
            />
          </div>
        )}
      </div>
    </div>
  );
});

DropdownMenuItem.displayName = 'DropdownMenuItem';
