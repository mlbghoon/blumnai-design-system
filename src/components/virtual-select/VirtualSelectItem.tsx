import * as React from 'react';

import { cn } from '@/lib/utils';
import { Icon, parseIconTypeWithFill } from '../icons/Icon';
import { Avatar } from '../avatar/Avatar';
import { Badge } from '../badge/Badge';
import { MENU_ITEM_SIZE_CONFIG } from '@/constants/select/Select/Select.constants';
import type { SelectOption, SelectType } from '../select/Select.types';

interface VirtualSelectItemProps {
  option: SelectOption;
  selected: boolean;
  focused: boolean;
  disabled?: boolean;
  isMulti: boolean;
  selectType?: SelectType;
  onSelect: (id: string) => void;
  style: React.CSSProperties;
}

const VirtualSelectItem = React.memo<VirtualSelectItemProps>(
  ({ option, selected, focused, disabled = false, isMulti, selectType = 'default', onSelect, style }) => {
    const sizeConfig = option.description
      ? MENU_ITEM_SIZE_CONFIG.large
      : MENU_ITEM_SIZE_CONFIG.default;

    const iconColor = option.iconColor
      ?? (disabled ? 'var(--icon-default-disabled)' : 'var(--icon-default)');

    const handleClick = React.useCallback(() => {
      if (!disabled) onSelect(option.id);
    }, [disabled, onSelect, option.id]);

    const renderSelectionIndicator = () => {
      if (isMulti || selectType === 'checkbox') {
        return (
          <div
            className={cn(
              'relative width-16 height-16 rounded-default overflow-hidden flex-shrink-0 transition-colors',
              disabled
                ? 'bg-checkbox-disabled border-default'
                : selected
                  ? 'border-none bg-checkbox-active'
                  : 'border-darker bg-checkbox-default'
            )}
          >
            {selected && (
              <div
                className="absolute flex items-center justify-center"
                style={{ inset: '1px' }}
              >
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
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
          <div
            className={cn(
              'relative width-16 height-16 rounded-full overflow-hidden flex-shrink-0 transition-colors',
              disabled
                ? 'bg-checkbox-disabled border-default'
                : selected
                  ? 'border-none bg-checkbox-active'
                  : 'border-darker bg-checkbox-default'
            )}
          >
            {selected && (
              <div className="absolute flex items-center justify-center" style={{ inset: '1px' }}>
                <div className="width-8 height-8 rounded-full bg-white" />
              </div>
            )}
          </div>
        );
      }

      return null;
    };

    const renderLeadContent = () => {
      if (option.avatarSrc) {
        return (
          <Avatar
            variant="userpic"
            size={option.description ? 'sm' : '2xs'}
            src={option.avatarSrc}
            alt={option.label}
            className="flex-shrink-0"
          />
        );
      }

      if (option.leadIcon) {
        const { iconType, isFill } = parseIconTypeWithFill(option.leadIcon);
        return (
          <div className={cn('flex items-center justify-center flex-shrink-0', sizeConfig.iconFrame)}>
            <Icon iconType={iconType} size={sizeConfig.iconSize} color={iconColor} isFill={isFill} />
          </div>
        );
      }

      return null;
    };

    const renderDefaultCheck = () => {
      if (!isMulti && selectType === 'default' && selected) {
        return (
          <div className="flex items-center justify-center width-20 height-20 flex-shrink-0">
            <Icon iconType={['system', 'check']} size={16} color="primary" />
          </div>
        );
      }
      return null;
    };

    const indicator = renderSelectionIndicator();

    return (
      <div
        role="option"
        aria-selected={selected}
        aria-disabled={disabled}
        data-focused={focused || undefined}
        id={`vs-item-${option.id}`}
        onClick={handleClick}
        className="flex w-full padding-x-4"
        style={style}
      >
        <div
          className={cn(
            'flex items-center w-full rounded-xs transition-colors duration-150',
            sizeConfig.height,
            sizeConfig.padding,
            sizeConfig.gap,
            disabled
              ? 'bg-transparent cursor-not-allowed'
              : 'bg-transparent hover:bg-state-ghost-hover active:bg-state-ghost-hover cursor-pointer',
            !disabled && focused && 'shadow-component-focus'
          )}
        >
          {indicator}
          {renderLeadContent()}

          {option.description ? (
            <div className="flex flex-col flex-1 min-w-0 padding-x-4 ds-gap-1">
              <span
                className={cn(
                  'font-body',
                  sizeConfig.text,
                  disabled ? 'text-hint' : 'text-default',
                  'flex-1 truncate'
                )}
              >
                {option.label}
              </span>
              <span
                className={cn(
                  'font-body size-xs line-height-leading-4 letter-spacing-tracking-tight truncate',
                  disabled ? 'text-hint' : 'text-muted'
                )}
              >
                {option.description}
              </span>
            </div>
          ) : (
            <div className="flex-1 min-w-0 padding-x-4">
              <span
                className={cn(
                  'font-body block',
                  sizeConfig.text,
                  disabled ? 'text-hint' : 'text-default',
                  'truncate'
                )}
              >
                {option.label}
              </span>
            </div>
          )}

          {option.badge && (
            <Badge size="sm" color="neutral" border label={option.badge} />
          )}

          {renderDefaultCheck()}
        </div>
      </div>
    );
  }
);
VirtualSelectItem.displayName = 'VirtualSelectItem';

export { VirtualSelectItem };
