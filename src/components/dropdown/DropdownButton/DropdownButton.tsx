import { forwardRef, useMemo } from 'react';

import { Icon } from '../../icons/Icon';
import { cn } from '../../../utils/cn';

import {
  CONTAINER_BASE,
  SIZE_CONFIG,
  ALIGN_CONFIG,
  STATE_CONFIG,
  DISABLED_STYLE,
  BADGE_STYLE,
} from 'constants/dropdown/DropdownButton/DropdownButton.constants';
import type { DropdownButtonProps } from './DropdownButton.types';

/**
 * DropdownButton 컴포넌트
 *
 * 드롭다운 메뉴를 열기 위한 버튼입니다.
 * 라벨, 아이콘, 단축키 뱃지를 지원합니다.
 * Figma 디자인을 기반으로 구현되었습니다.
 */
export const DropdownButton = forwardRef<HTMLButtonElement, DropdownButtonProps>(({
  label,
  isOpen = false,
  align = 'center',
  leadIcon,
  tailIcon = ['arrows', 'arrow-down-s'],
  shortcut,
  disabled = false,
  width,
  className,
  children,
  ...props
}, ref) => {
  const alignClasses = ALIGN_CONFIG[align] ?? ALIGN_CONFIG.center;

  const stateClasses = useMemo(() => {
    if (disabled) {
      return DISABLED_STYLE.container;
    }

    const baseState = isOpen ? STATE_CONFIG.opened : STATE_CONFIG.default;
    return cn(
      baseState.bg,
      baseState.border,
      baseState.text,
      STATE_CONFIG.hover.bg,
      STATE_CONFIG.active.bg,
      STATE_CONFIG.focus.ring
    );
  }, [disabled, isOpen]);

  const iconColor = useMemo(() => {
    if (disabled) return DISABLED_STYLE.iconColor;
    const baseState = isOpen ? STATE_CONFIG.opened : STATE_CONFIG.default;
    return baseState.iconColor;
  }, [disabled, isOpen]);

  const containerClassName = cn(
    CONTAINER_BASE,
    SIZE_CONFIG.text,
    SIZE_CONFIG.gap,
    SIZE_CONFIG.padding,
    SIZE_CONFIG.letterSpacing,
    SIZE_CONFIG.radius,
    stateClasses,
    className
  );

  const widthStyle = width !== undefined
    ? { width: typeof width === 'number' ? `${width}px` : width }
    : undefined;

  return (
    <button
      ref={ref}
      type="button"
      disabled={disabled}
      aria-expanded={isOpen}
      aria-haspopup="listbox"
      className={containerClassName}
      style={widthStyle}
      {...props}
    >
      {leadIcon && (
        <Icon
          iconType={leadIcon}
          size={SIZE_CONFIG.icon}
          color={iconColor}
          className="flex-shrink-0"
        />
      )}

      <span className={cn('flex-1 min-w-0 truncate', alignClasses)}>{label}</span>

      {shortcut && (
        <span className={cn(BADGE_STYLE.container, BADGE_STYLE.size, 'flex-shrink-0')}>
          <span className={BADGE_STYLE.text}>{shortcut}</span>
        </span>
      )}

      {tailIcon && (
        <Icon
          iconType={tailIcon}
          size={SIZE_CONFIG.icon}
          color={iconColor}
          className={cn(
            'flex-shrink-0 transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      )}
    </button>
  );
});

DropdownButton.displayName = 'DropdownButton';
