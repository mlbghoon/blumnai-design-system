import { forwardRef } from 'react';

import { Icon, parseIconTypeWithFill } from '../../icons/Icon';
import { cn } from '../../../utils/cn';

import type { ChipColor, ChipProps, ChipShape, ChipStyle } from './Chip.types';

const getBadgeBgClass = (color: ChipColor): string => {
  if (color === 'neutral') return 'bg-badge-gray';
  return `bg-badge-${color}`;
};

const getSubtleBgClass = (color: ChipColor): string => {
  if (color === 'neutral') return 'bg-basic-gray-subtle';
  return `bg-basic-${color}-subtle`;
};

const getColorTextClass = (color: ChipColor): string => {
  if (color === 'neutral') return 'text-subtle';
  return `text-basic-${color}-strong`;
};

/**
 * Chip 컴포넌트
 *
 * 작은 정보나 태그를 표시하는 컴포넌트입니다.
 *
 * @example
 * <Chip label="Tag" size="md" style="default" />
 */
export const Chip = forwardRef<HTMLDivElement, ChipProps>(
  (
    {
      label,
      icon,
      variant = 'default',
      style = 'default',
      shape = 'rounded',
      size = 'md',
      selected = false,
      color,
      className,
      ...props
    },
    ref
  ) => {
    const iconOnly = variant === 'iconOnly';
    // Size styles
    const sizeStyles = {
      sm: {
        padding: iconOnly ? 'min-height-24 min-width-24' : 'padding-x-6 padding-y-4',
        textSize: 'font-body size-xs line-height-leading-4',
        iconSize: 16,
      },
      md: {
        padding: iconOnly ? 'min-height-28 min-width-28' : 'padding-x-8 padding-y-4',
        textSize: 'font-body size-sm line-height-leading-5',
        iconSize: 16,
      },
      lg: {
        padding: iconOnly ? 'min-height-32 min-width-32' : 'padding-x-10 padding-y-6',
        textSize: 'font-body size-sm line-height-leading-5',
        iconSize: iconOnly ? 20 : 16,
      },
    };

    const currentSize = sizeStyles[size];

    type StyleEntry = {
      base: string;
      hover: string;
      press: string;
      text: string;
      icon: string;
      border: string;
    };

    const txt = color ? getColorTextClass(color) : '';

    const styleStyles: Record<ChipStyle, StyleEntry> = color
      ? {
          default: { base: getBadgeBgClass(color), hover: '', press: '', text: txt, icon: txt, border: 'border-darker' },
          soft: { base: getBadgeBgClass(color), hover: '', press: '', text: txt, icon: txt, border: '' },
          ghost: { base: 'bg-state-ghost', hover: 'hover:bg-state-ghost-hover', press: 'active:bg-state-ghost-press', text: txt, icon: txt, border: '' },
          ghostMuted: { base: 'bg-state-ghost', hover: 'hover:bg-state-ghost-hover', press: 'active:bg-state-ghost-press', text: txt, icon: txt, border: '' },
        }
      : {
          default: {
            base: 'bg-state-secondary',
            hover: 'hover:bg-state-secondary-hover',
            press: 'active:bg-state-secondary-press',
            text: 'text-muted group-hover-text-subtle',
            icon: 'icon-default-muted group-hover-icon-default-subtle',
            border: 'border-darker',
          },
          soft: {
            base: 'bg-state-soft',
            hover: 'hover:bg-state-soft-hover',
            press: 'active:bg-state-soft-press',
            text: 'text-muted group-hover-text-subtle',
            icon: 'icon-default-muted group-hover-icon-default-subtle',
            border: '',
          },
          ghost: {
            base: 'bg-state-ghost',
            hover: 'hover:bg-state-ghost-hover',
            press: 'active:bg-state-ghost-press',
            text: 'text-muted group-hover-text-subtle',
            icon: 'icon-default-muted group-hover-icon-default-subtle',
            border: '',
          },
          ghostMuted: {
            base: 'bg-state-ghost',
            hover: 'hover:bg-state-ghost-hover',
            press: 'active:bg-state-ghost-press',
            text: 'text-muted group-hover-text-subtle',
            icon: 'icon-default-muted group-hover-icon-default-subtle',
            border: '',
          },
        };

    const currentStyle = styleStyles[style];

    const selectedStyles: Record<ChipStyle, StyleEntry> = color
      ? {
          default: { base: getSubtleBgClass(color), hover: '', press: '', text: txt, icon: txt, border: 'border-darker' },
          soft: { base: getSubtleBgClass(color), hover: '', press: '', text: txt, icon: txt, border: '' },
          ghost: { base: getSubtleBgClass(color), hover: '', press: '', text: txt, icon: txt, border: '' },
          ghostMuted: { base: 'bg-state-soft', hover: 'hover:bg-state-soft-hover', press: 'active:bg-state-soft-press', text: txt, icon: txt, border: '' },
        }
      : {
          default: { base: 'bg-badge-blue', hover: '', press: '', text: 'text-basic-blue-strong', icon: 'text-basic-blue-accent', border: 'border-darker' },
          soft: { base: 'bg-badge-blue', hover: '', press: '', text: 'text-basic-blue-strong', icon: 'text-basic-blue-accent', border: '' },
          ghost: { base: 'bg-badge-blue', hover: '', press: '', text: 'text-basic-blue-strong', icon: 'text-basic-blue-accent', border: '' },
          ghostMuted: { base: 'bg-state-soft', hover: 'hover:bg-state-soft-hover', press: 'active:bg-state-soft-press', text: 'text-basic-blue-strong', icon: 'text-basic-blue-accent', border: '' },
        };

    const currentSelectedStyle = selected ? selectedStyles[style] : null;

    // Shape styles
    const shapeStyles: Record<ChipShape, string> = {
      rounded: 'rounded-sm',
      pill: 'rounded-full',
    };

    // Focus styles
    const focusStyles = 'focus-ring';

    // Get styles based on selected state
    const activeStyle = selected && currentSelectedStyle ? currentSelectedStyle : currentStyle;

    // Fixed height based on Figma to ensure consistency across styles
    const fixedHeightClass = iconOnly
      ? size === 'sm'
        ? 'height-24'
        : size === 'md'
          ? 'height-28'
          : 'height-32'
      : size === 'sm'
        ? 'height-24'
        : size === 'md'
          ? 'height-28'
          : 'height-32';

    const containerClassName = cn(
      'inline-flex items-center justify-center ds-gap-4',
      'box-border',
      'cursor-pointer select-none group',
      'transition-colors duration-150',
      currentSize.padding,
      fixedHeightClass,
      !iconOnly && 'min-width-32',
      activeStyle.base,
      activeStyle.border,
      shapeStyles[shape],
      activeStyle.hover,
      activeStyle.press,
      focusStyles,
      className
    );


    return (
      <div ref={ref} className={containerClassName} role="button" tabIndex={0} {...props}>
        {icon && (
          <span
            className={cn(
              'inline-flex items-center justify-center shrink-0',
              'transition-colors duration-150',
              activeStyle.icon
            )}
          >
            {(() => {
              const { iconType, isFill } = parseIconTypeWithFill(icon);
              return <Icon iconType={iconType} size={currentSize.iconSize} isFill={isFill} />;
            })()}
          </span>
        )}

        {!iconOnly && label && (
          <span
            className={`${cn(
              'shrink-0 transition-colors duration-150',
              currentSize.textSize
            )} ${activeStyle.text}`}
          >
            {label}
          </span>
        )}
      </div>
    );
  }
);

Chip.displayName = 'Chip';