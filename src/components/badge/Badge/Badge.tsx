import { forwardRef, memo, useMemo } from 'react';

import avatarPlaceholderIcon from '../../../assets/avatar-placeholder-icon.png';
import { Icon, parseIconTypeWithFill } from '../../icons/Icon';
import { cn } from '@/lib/utils';

import type { BadgeColor, BadgeProps } from './Badge.types';

const BADGE_PLACEHOLDER_IMAGE = avatarPlaceholderIcon;

const getBgClass = (color: BadgeColor, hasBorder: boolean): string => {
  if (color === 'white') return '';
  if (color === 'neutral') {
    return hasBorder ? 'bg-badge-default' : 'bg-badge-gray';
  }
  return `bg-badge-${color}`;
};

const getTextColor = (color: BadgeColor): string => {
  if (color === 'white') return 'var(--text-dark-subtle)';
  if (color === 'neutral') {
    return 'var(--text-subtle)';
  }
  return `var(--bg-basic-${color}-strong)`;
};

const getDotColor = (color: BadgeColor): string => {
  if (color === 'white') return 'var(--text-dark-subtle)';
  if (color === 'neutral') {
    return 'var(--text-subtle)';
  }
  return `var(--bg-basic-${color}-accent)`;
};

const getIconColor = (color: BadgeColor): string => {
  if (color === 'white') return 'var(--text-dark-subtle)';
  if (color === 'neutral') {
    return 'var(--icon-default-muted)';
  }
  return `var(--bg-basic-${color}-strong)`;
};

/**
 * Badge 컴포넌트
 *
 * 텍스트, 아이콘, 이미지 또는 점이 있는 작은 배지를 표시합니다.
 * 다양한 변형, 크기, 색상, 모양을 지원합니다.
 * 색상은 현재 테마(라이트/다크 모드)에 자동으로 적응합니다.
 *
 * @example
 * <Badge label="New" color="blue" size="md" />
 */
export const Badge = memo(forwardRef<HTMLDivElement, BadgeProps>(({
  variant = 'default',
  size = 'sm',
  color = 'neutral',
  shape = 'rounded',
  border = false,
  closeIcon = false,
  closeColor,
  closeDisabled = false,
  label,
  icon,
  image,
  imageAlt,
  onClose,
  onClick,
  className,
  style,
  ...props
}, ref) => {

  const containerClassName = useMemo(() => {
    const classes = [
      'relative inline-flex items-center justify-center ds-gap-4',
      'font-body font-medium whitespace-nowrap',
    ];

    if (onClick) {
      classes.push('cursor-pointer');
    }

    if (size === 'sm') {
      classes.push('min-height-20 padding-y-2 padding-x-6 size-xs line-height-leading-4 letter-spacing-tracking-normal');
    } else {
      classes.push('min-height-24 padding-y-4 padding-x-8 size-sm line-height-leading-4 letter-spacing-tracking-normal');
    }

    if (shape === 'pill') {
      classes.push('rounded-full');
    } else {
      classes.push('rounded-sm');
    }

    classes.push(getBgClass(color, border));

    if (color === 'white') {
      classes.push('border-solid border-[1px]');
    } else if (border) {
      classes.push('border-badge-default');
    }

    if (className) {
      classes.push(className);
    }

    return cn(...classes);
  }, [size, shape, color, border, onClick, className]);

  const iconSize = size === 'sm' ? 12 : 14;

  const parsedIcon = variant === 'icon' && icon ? parseIconTypeWithFill(icon) : null;

  const combinedStyle: React.CSSProperties = {
    color: getTextColor(color),
    ...(color === 'white' ? {
      backgroundColor: 'var(--bg-basic-white-accent)',
      borderColor: 'var(--border-default)',
    } : {}),
    ...style,
  };

  return (
    <div ref={ref} className={containerClassName} style={combinedStyle} onClick={onClick} {...props}>
      {parsedIcon && (
        <span className="inline-flex items-center shrink-0 line-height-leading-none">
          <Icon iconType={parsedIcon.iconType} size={iconSize} color={getIconColor(color)} isFill={parsedIcon.isFill} />
        </span>
      )}

      {variant === 'image' && (
        <span
          className="inline-flex items-center shrink-0 overflow-hidden rounded-full line-height-leading-none border-darker"
          style={{
            width: `${iconSize}px`,
            height: `${iconSize}px`,
          }}
        >
          <img
            src={image || BADGE_PLACEHOLDER_IMAGE}
            alt={imageAlt ?? ''}
            className="object-cover rounded-full"
          />
        </span>
      )}

      {variant === 'dot' && (
        <span
          className="inline-flex items-center shrink-0 rounded-full line-height-leading-none"
          style={{
            width: `${iconSize - 6}px`,
            height: `${iconSize - 6}px`,
            backgroundColor: getDotColor(color),
          }}
        />
      )}

      {(variant === 'default' || label) && <span className="shrink-0 line-height-leading-none">{label}</span>}

      {closeIcon && (
        <button
          type="button"
          className={cn(
            'flex items-center justify-center shrink-0 padding-0 border-0 bg-transparent focus:outline-none focus-visible:shadow-component-misc-focus rounded-full',
            closeDisabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer hover:opacity-80'
          )}
          onClick={onClose}
          disabled={closeDisabled}
          aria-disabled={closeDisabled}
          aria-label="Close badge"
        >
          <Icon iconType={['system', 'close']} size={iconSize} color={getIconColor(closeColor ?? color)} />
        </button>
      )}
    </div>
  );
}));

Badge.displayName = 'Badge';
