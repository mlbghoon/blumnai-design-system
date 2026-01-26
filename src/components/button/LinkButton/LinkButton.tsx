import { forwardRef, useMemo, isValidElement } from 'react';

import { Icon } from '../../icons/Icon';
import type { IconType } from '../../icons/Icon/Icon.types';
import { cn } from '../../../utils/cn';

import { SIZE_CONFIG, TYPE_CONFIG, CONTAINER_BASE, DISABLED_STYLE, HOVER_STYLE } from './LinkButton.constants';
import type { LinkButtonProps, LinkButtonIconType } from './LinkButton.types';

/**
 * LinkButton 컴포넌트
 *
 * 외부 링크용 버튼으로, 일반적으로 외부 링크 아이콘과 함께 사용됩니다.
 * Default, Muted, Informative 타입과 sm, md, lg 크기를 지원합니다.
 * Figma 디자인을 기반으로 구현되었습니다.
 */
export const LinkButton = forwardRef<HTMLElement, LinkButtonProps>(({
  type = 'default',
  size = 'md',
  label,
  href,
  openInNewTab = false,
  leadIcon,
  tailIcon = ['system', 'external-link'],
  disabled = false,
  className,
  ...props
}, ref) => {
  const textClasses = SIZE_CONFIG.text[size] ?? SIZE_CONFIG.text.md;
  const gapClasses = SIZE_CONFIG.gap[size] ?? SIZE_CONFIG.gap.md;
  const letterSpacingClasses = SIZE_CONFIG.letterSpacing[size] ?? SIZE_CONFIG.letterSpacing.md;
  const iconSize = SIZE_CONFIG.icon[size] ?? 16;

  const typeConfig = TYPE_CONFIG[type] ?? TYPE_CONFIG.default;

  const styleClasses = useMemo(() => {
    if (disabled) {
      return DISABLED_STYLE.text;
    }
    return `${typeConfig.text} ${typeConfig.hoverText} ${HOVER_STYLE}`;
  }, [disabled, typeConfig]);

  const getIconColor = useMemo(() => {
    if (disabled) return DISABLED_STYLE.iconColor;
    return typeConfig.iconColor;
  }, [disabled, typeConfig]);

  const containerClassName = cn(
    'group',
    CONTAINER_BASE,
    textClasses,
    gapClasses,
    letterSpacingClasses,
    styleClasses,
    className
  );

  const renderIcon = (icon: LinkButtonIconType | React.ReactNode) => {
    if (!icon) return null;
    if (typeof icon === 'object' && !Array.isArray(icon) && Object.keys(icon as object).length === 0) return null;

    if (Array.isArray(icon) && (icon.length === 2 || icon.length === 3) && typeof icon[0] === 'string' && typeof icon[1] === 'string') {
      const fillValue = icon[2] as boolean | string | undefined;
      const isFill = icon.length === 3 && (fillValue === true || fillValue === 'true');
      return <Icon iconType={[icon[0], icon[1]] as IconType} isFill={isFill} size={iconSize} color={getIconColor} />;
    }

    if (!isValidElement(icon)) return null;
    return <span className="inline-flex items-center">{icon}</span>;
  };

  const content = (
    <>
      {leadIcon && renderIcon(leadIcon)}
      <span className={cn('relative', !disabled && 'link-label-hover')}>{label}</span>
      {tailIcon && renderIcon(tailIcon)}
    </>
  );

  if (href && !disabled) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        target={openInNewTab ? '_blank' : undefined}
        rel={openInNewTab ? 'noopener noreferrer' : undefined}
        className={containerClassName}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type="button"
      disabled={disabled}
      className={containerClassName}
      {...props}
    >
      {content}
    </button>
  );
});

LinkButton.displayName = 'LinkButton';
