import { forwardRef, useMemo, isValidElement } from 'react';

import { Icon } from '../../icons/Icon';
import type { IconType } from '../../icons/Icon/Icon.types';
import { cn } from '../../../utils/cn';

import { SIZE_CONFIG, STYLE_CONFIG, SHORTCUT_STYLE, CONTAINER_BASE, TEXT_STYLE, DISABLED_STYLE } from 'constants/button/Button/Button.constants';
import type { ButtonProps, ButtonIconType } from './Button.types';

/**
 * Button 컴포넌트
 *
 * 다양한 스타일, 변형, 크기, 모양을 지원하는 버튼 컴포넌트입니다.
 * Primary, Secondary, Destructive, Ghost, Soft, Dashed 스타일과
 * Default, IconOnly 변형을 지원합니다.
 * Figma 디자인을 기반으로 구현되었습니다.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  style = 'primary',
  variant = 'default',
  size = 'md',
  shape = 'rounded',
  type = 'button',
  leadIcon,
  tailIcon,
  shortcut,
  loading = false,
  disabled = false,
  fullWidth = false,
  width,
  className,
  children,
  ...props
}, ref) => {
  const isIconOnly = variant === 'iconOnly';
  const isInvertedStyle = style === 'primary' || style === 'destructive';

  const sizeClasses = useMemo(() => {
    const config = isIconOnly ? SIZE_CONFIG.button.iconOnly : SIZE_CONFIG.button.default;
    return config[size] ?? config.md;
  }, [size, isIconOnly]);

  const styleClasses = useMemo(() => {
    const config = STYLE_CONFIG[style];
    if (!config) return 'bg-state-primary text-white border border-transparent';
    if (loading) return `${config.loading} cursor-wait`;
    if (disabled) return config.base;
    return `${config.base} ${config.states} ${config.focus}`;
  }, [style, loading, disabled]);

  const iconSizeConfig = isIconOnly ? SIZE_CONFIG.icon.iconOnly : SIZE_CONFIG.icon.default;
  const iconSize = iconSizeConfig[size] ?? 16;
  const shapeClasses = shape === 'pill' ? 'rounded-full' : 'rounded-md';
  const shortcutClasses = SIZE_CONFIG.shortcut[size] ?? SIZE_CONFIG.shortcut.md;
  const widthStyle = width !== undefined ? { width: typeof width === 'number' ? `${width}px` : width } : undefined;

  const containerClassName = cn(
    CONTAINER_BASE,
    shapeClasses,
    sizeClasses,
    styleClasses,
    !isIconOnly && TEXT_STYLE,
    isIconOnly && 'aspect-square',
    fullWidth && !isIconOnly && 'w-full',
    disabled && DISABLED_STYLE,
    className
  );

  const getIconColor = () => {
    if (disabled) return 'var(--icon-default-disabled)';
    if (isInvertedStyle) return 'var(--icon-white-default)';
    return 'var(--icon-default-muted)';
  };

  const renderLoadingSpinner = () => (
    <span className="inline-flex items-center">
      <svg
        className="animate-spin"
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="32" strokeDashoffset="32" opacity="0.3" />
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="32" strokeDashoffset="24" />
      </svg>
    </span>
  );

  const renderIcon = (icon: ButtonIconType | React.ReactNode) => {
    if (!icon) return null;
    if (typeof icon === 'object' && !Array.isArray(icon) && Object.keys(icon as object).length === 0) return null;

    if (Array.isArray(icon) && (icon.length === 2 || icon.length === 3) && typeof icon[0] === 'string' && typeof icon[1] === 'string') {
      const fillValue = icon[2] as boolean | string | undefined;
      const isFill = icon.length === 3 && (fillValue === true || fillValue === 'true');
      return <Icon iconType={[icon[0], icon[1]] as IconType} isFill={isFill} size={iconSize} color={getIconColor()} />;
    }

    if (!isValidElement(icon)) return null;
    return <span className="inline-flex items-center">{icon}</span>;
  };

  const renderShortcut = () => {
    if (!shortcut) return null;
    return (
      <span className={cn('inline-flex items-center justify-center leading-none', shortcutClasses, isInvertedStyle ? SHORTCUT_STYLE.inverted : SHORTCUT_STYLE.light)}>
        {shortcut}
      </span>
    );
  };

  return (
    <button ref={ref} type={type} disabled={disabled} className={containerClassName} style={widthStyle} {...props}>
      {isIconOnly ? (
        loading ? renderLoadingSpinner() : renderIcon(leadIcon)
      ) : (
        <>
          {loading ? renderLoadingSpinner() : leadIcon && renderIcon(leadIcon)}
          {children}
          {shortcut && renderShortcut()}
          {tailIcon && renderIcon(tailIcon)}
        </>
      )}
    </button>
  );
});

Button.displayName = 'Button';
