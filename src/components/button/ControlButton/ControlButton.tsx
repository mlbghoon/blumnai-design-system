import { forwardRef, useMemo } from 'react';

import { Icon } from '../../icons/Icon';
import { cn } from '../../../utils/cn';

import { SIZE_CONFIG, STYLE_CONFIG, SHAPE_CONFIG, CONTAINER_BASE, DISABLED_STYLE } from 'constants/button/ControlButton/ControlButton.constants';
import type { ControlButtonProps } from './ControlButton.types';

/**
 * ControlButton 컴포넌트
 *
 * 미디어 컨트롤(재생, 일시정지, 건너뛰기 등)을 위한 아이콘 전용 버튼입니다.
 * Default, Inverted 스타일과 sm, md, lg 크기를 지원합니다.
 * Figma 디자인을 기반으로 구현되었습니다.
 */
export const ControlButton = forwardRef<HTMLButtonElement, ControlButtonProps>(({
  style = 'default',
  size = 'md',
  shape = 'rounded',
  icon,
  disabled = false,
  className,
  'aria-label': ariaLabel,
  ...props
}, ref) => {
  const sizeClasses = SIZE_CONFIG.button[size] ?? SIZE_CONFIG.button.md;
  const iconSize = SIZE_CONFIG.icon[size] ?? 16;
  const shapeClasses = SHAPE_CONFIG[shape] ?? SHAPE_CONFIG.rounded;

  const styleClasses = useMemo(() => {
    const config = STYLE_CONFIG[style];
    if (!config) return STYLE_CONFIG.default.base;
    if (disabled) return DISABLED_STYLE;
    return `${config.base} ${config.states} ${config.focus}`;
  }, [style, disabled]);

  const containerClassName = cn(
    CONTAINER_BASE,
    sizeClasses,
    shapeClasses,
    styleClasses,
    className
  );

  const getIconColor = () => {
    const config = STYLE_CONFIG[style] ?? STYLE_CONFIG.default;
    if (disabled) return config.disabledIconColor;
    return config.iconColor;
  };

  return (
    <button
      ref={ref}
      type="button"
      disabled={disabled}
      className={containerClassName}
      aria-label={ariaLabel}
      {...props}
    >
      <Icon
        iconType={icon}
        size={iconSize}
        color={getIconColor()}
      />
    </button>
  );
});

ControlButton.displayName = 'ControlButton';
