import { forwardRef, useMemo } from 'react';

import { Icon } from '../../icons/Icon';
import { cn } from '../../../utils/cn';

import {
  SIZE_CONFIG,
  SHAPE_CONFIG,
  CONTAINER_BASE,
  STATE_CONFIG,
  DISABLED_STYLE,
} from 'constants/button/FilterButton/FilterButton.constants';
import type { FilterButtonProps } from './FilterButton.types';

/**
 * FilterButton 컴포넌트
 *
 * 필터링 작업을 위한 특수 버튼입니다.
 * xs, md, lg 크기와 rounded, pill 형태를 지원합니다.
 * Figma 디자인을 기반으로 구현되었습니다.
 */
export const FilterButton = forwardRef<HTMLButtonElement, FilterButtonProps>(({
  size = 'md',
  shape = 'rounded',
  selected = false,
  disabled = false,
  label,
  icon = ['system', 'filter'],
  className,
  ...props
}, ref) => {
  const textClasses = SIZE_CONFIG.text[size] ?? SIZE_CONFIG.text.md;
  const gapClasses = SIZE_CONFIG.gap[size] ?? SIZE_CONFIG.gap.md;
  const paddingClasses = SIZE_CONFIG.padding[size] ?? SIZE_CONFIG.padding.md;
  const letterSpacingClasses = SIZE_CONFIG.letterSpacing[size] ?? SIZE_CONFIG.letterSpacing.md;
  const iconSize = SIZE_CONFIG.icon[size] ?? 16;
  const shapeClasses = SHAPE_CONFIG[shape] ?? SHAPE_CONFIG.rounded;

  const stateClasses = useMemo(() => {
    if (disabled) {
      return selected ? DISABLED_STYLE.selected : DISABLED_STYLE.unselected;
    }

    const baseState = selected ? STATE_CONFIG.selected : STATE_CONFIG.unselected;
    return cn(
      baseState.bg,
      baseState.border,
      baseState.text,
      STATE_CONFIG.hover.bg,
      STATE_CONFIG.active.bg,
      STATE_CONFIG.focus.ring
    );
  }, [disabled, selected]);

  const iconColor = useMemo(() => {
    if (disabled) return DISABLED_STYLE.iconColor;
    const baseState = selected ? STATE_CONFIG.selected : STATE_CONFIG.unselected;
    return baseState.iconColor;
  }, [disabled, selected]);

  const containerClassName = cn(
    CONTAINER_BASE,
    shapeClasses,
    textClasses,
    gapClasses,
    paddingClasses,
    letterSpacingClasses,
    stateClasses,
    className
  );

  return (
    <button
      ref={ref}
      type="button"
      disabled={disabled}
      className={containerClassName}
      {...props}
    >
      <Icon
        iconType={icon}
        size={iconSize}
        color={iconColor}
      />
      <span>{label}</span>
    </button>
  );
});

FilterButton.displayName = 'FilterButton';
