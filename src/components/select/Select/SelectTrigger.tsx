import { forwardRef } from 'react';

import { Icon } from '../../icons/Icon';
import { cn } from '../../../utils/cn';

import type { SelectSize, SelectStyle } from '../Select.types';
import { SIZE_CONFIG, STYLE_CONFIG, STATE_CONFIG, TRIGGER_BASE } from 'constants/select/Select/Select.constants';
import type { IconType } from '../../icons/Icon/Icon.types';

export interface SelectTriggerProps {
  children: React.ReactNode;
  size?: SelectSize;
  selectStyle?: SelectStyle;
  state?: 'default' | 'disabled' | 'error' | 'success';
  leadIcon?: IconType;
  isOpen?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(({
  children,
  size = 'sm',
  selectStyle = 'default',
  state = 'default',
  leadIcon,
  isOpen = false,
  disabled = false,
  onClick,
  className,
}, ref) => {
  const sizeConfig = SIZE_CONFIG[size];
  const styleConfig = STYLE_CONFIG[selectStyle];

  const iconColor = disabled
    ? 'default-disabled'
    : state === 'error'
      ? 'destructive'
      : state === 'success'
        ? 'success'
        : 'default-subtle';

  const triggerClassName = cn(
    TRIGGER_BASE,
    sizeConfig.container,
    leadIcon ? sizeConfig.paddingWithLeadIcon : sizeConfig.padding,
    sizeConfig.gap,
    sizeConfig.text,
    styleConfig.base,
    !disabled && styleConfig.focus,
    state === 'error' && 'border-destructive',
    state === 'success' && 'border-success',
    state === 'disabled' && STATE_CONFIG.disabled.bg,
    state === 'disabled' && STATE_CONFIG.disabled.border,
    disabled ? 'cursor-not-allowed' : 'cursor-pointer',
    className
  );

  return (
    <button
      ref={ref}
      type="button"
      role="combobox"
      aria-expanded={isOpen}
      aria-haspopup="listbox"
      disabled={disabled}
      onClick={onClick}
      className={triggerClassName}
    >
      {leadIcon && (
        <Icon
          iconType={leadIcon}
          size={sizeConfig.iconSize}
          color={iconColor}
          className="flex-shrink-0"
          isFill
        />
      )}

      <div className="flex-1 min-w-0 text-left">
        {children}
      </div>

      <Icon
        iconType={['arrows', 'expand-up-down']}
        size={sizeConfig.iconSize}
        color={iconColor}
        className="flex-shrink-0"
      />
    </button>
  );
});

SelectTrigger.displayName = 'SelectTrigger';
