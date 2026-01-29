import { forwardRef } from 'react';

import { Icon } from '../../icons/Icon';
import { Badge } from '../../badge/Badge';
import { cn } from '../../../utils/cn';

import type { SelectMenuItemProps } from '../Select.types';
import {
  MENU_ITEM_CONTAINER_BASE,
  MENU_ITEM_INNER_BASE,
  MENU_ITEM_SIZE_CONFIG,
  MENU_ITEM_STATE_CONFIG,
} from 'constants/select/Select/Select.constants';

export const SelectMenuItem = forwardRef<HTMLDivElement, SelectMenuItemProps>(({
  label,
  variant = 'default',
  selectType = 'default',
  leadIcon,
  description,
  badge,
  disabled = false,
  selected = false,
  focused = false,
  onClick,
  className,
  ...props
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

  const iconColor = disabled
    ? MENU_ITEM_STATE_CONFIG.disabled.iconColor
    : MENU_ITEM_STATE_CONFIG.default.iconColor;

  const renderLeadContent = () => {
    if (selectType === 'checkbox') {
      return (
        <div className={cn(
          'relative width-16 height-16 rounded-default overflow-hidden flex-shrink-0',
          disabled
            ? 'bg-checkbox-disabled border-default'
            : selected
              ? 'border-none bg-checkbox-active'
              : 'border-darker bg-checkbox-default'
        )}>
          {selected && (
            <div className="absolute flex items-center justify-center" style={{ inset: '1px' }}>
              <svg
                width="8"
                height="8"
                viewBox="0 0 8 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 4L3 6L7 2"
                  stroke={disabled ? 'var(--icon-default-disabled)' : '#FFFFFF'}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}
        </div>
      );
    }

    if (selectType === 'radio') {
      return (
        <div className={cn(
          'width-16 height-16 rounded-full border flex-shrink-0 flex items-center justify-center',
          disabled
            ? 'bg-checkbox-disabled border-default'
            : selected
              ? 'border-none bg-checkbox-active'
              : 'border-darker bg-checkbox-default'
        )}>
          {selected && (
            <div
              className="width-6 height-6 rounded-full"
              style={{ backgroundColor: disabled ? 'var(--icon-default-disabled)' : '#FFFFFF' }}
            />
          )}
        </div>
      );
    }

    if (leadIcon) {
      return (
        <div className={cn('flex items-center justify-center flex-shrink-0', sizeConfig.iconFrame)}>
          <Icon
            iconType={leadIcon}
            size={sizeConfig.iconSize}
            color={iconColor}
            isFill
          />
        </div>
      );
    }

    return null;
  };

  const renderTrailContent = () => {
    if (selectType === 'default' && selected) {
      return (
        <div className="flex items-center justify-center flex-shrink-0 width-20 height-20">
          <Icon
            iconType={['system', 'check']}
            size={16}
            color={disabled ? 'default-disabled' : 'primary'}
          />
        </div>
      );
    }

    if (badge) {
      return (
        <Badge
          size="sm"
          color="neutral"
          border
          label={badge}
        />
      );
    }

    return null;
  };

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
      {...props}
    >
      <div className={innerClassName}>
        {renderLeadContent()}

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

        {renderTrailContent()}
      </div>
    </div>
  );
});

SelectMenuItem.displayName = 'SelectMenuItem';
