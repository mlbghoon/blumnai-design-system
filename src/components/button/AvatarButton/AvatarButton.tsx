import { forwardRef, useMemo, isValidElement } from 'react';

import { Avatar } from '../../avatar/Avatar';
import { Icon } from '../../icons/Icon';
import type { IconType } from '../../icons/Icon/Icon.types';
import { cn } from '../../../utils/cn';

import { SIZE_CONFIG, STYLE_CONFIG, CONTAINER_BASE, TEXT_STYLE } from 'constants/button/AvatarButton/AvatarButton.constants';
import type { AvatarButtonProps, AvatarButtonIconType } from './AvatarButton.types';

/**
 * AvatarButton 컴포넌트
 *
 * 아바타 이미지와 라벨 텍스트를 포함하는 버튼 컴포넌트입니다.
 * Default, Dashed, Soft 스타일과 sm, lg 크기를 지원합니다.
 * Figma 디자인을 기반으로 구현되었습니다.
 */
export const AvatarButton = forwardRef<HTMLButtonElement, AvatarButtonProps>(({
  style = 'default',
  size = 'lg',
  avatar,
  alt,
  label,
  tailIcon,
  disabled = false,
  className,
  ...props
}, ref) => {
  const sizeClasses = SIZE_CONFIG.button[size] ?? SIZE_CONFIG.button.lg;
  const avatarSize = SIZE_CONFIG.avatar[size] ?? '2xs';
  const iconSize = SIZE_CONFIG.icon[size] ?? 20;

  const styleClasses = useMemo(() => {
    const config = STYLE_CONFIG[style];
    if (!config) return STYLE_CONFIG.default.base;
    if (disabled) return config.disabled;
    return `${config.base} ${config.states} ${config.focus}`;
  }, [style, disabled]);

  const containerClassName = cn(
    CONTAINER_BASE,
    sizeClasses,
    styleClasses,
    TEXT_STYLE,
    className
  );

  const getIconColor = () => {
    if (disabled) return 'var(--icon-default-disabled)';
    return 'var(--icon-default-muted)';
  };

  const renderIcon = (icon: AvatarButtonIconType | React.ReactNode) => {
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

  return (
    <button
      ref={ref}
      type="button"
      disabled={disabled}
      className={containerClassName}
      {...props}
    >
      <Avatar
        variant="userpic"
        size={avatarSize}
        shape="circular"
        src={avatar}
        alt={alt}
        ring={false}
      />
      <span>{label}</span>
      {tailIcon && renderIcon(tailIcon)}
    </button>
  );
});

AvatarButton.displayName = 'AvatarButton';
