import { forwardRef } from 'react';

import { cn } from '../../../utils/cn';
import { Icon } from '../../icons/Icon';
import { Button } from '../../button/Button';

import {
  LINE_BASE,
  LINE_DASHED,
  CONTENT_BASE,
  CONTENT_TEXT,
  ICON_CONTAINER,
  ICON_SIZE,
  ICON_COLOR,
  CONTAINER_BASE,
  CONTAINER_WITH_CONTENT,
} from 'constants/divider/Divider/Divider.constants';
import type { IconType } from '../../icons/Icon/Icon.types';
import type { DividerProps } from './Divider.types';

/**
 * Divider 컴포넌트
 *
 * 콘텐츠 섹션을 시각적으로 구분하는 수평 구분선입니다.
 * 텍스트, 아이콘, 버튼과 함께 사용할 수 있습니다.
 */
export const Divider = forwardRef<HTMLDivElement, DividerProps>(
  (
    {
      type = 'default',
      lineStyle = 'default',
      label,
      icon,
      buttonLabel,
      buttonLeadIcon,
      buttonTailIcon,
      buttonBadge,
      onButtonClick,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const isDashed = lineStyle === 'dashed';

    const lineClassName = cn(
      LINE_BASE,
      isDashed && LINE_DASHED
    );

    const contentClassName = cn(
      CONTENT_BASE,
      CONTENT_TEXT
    );

    const renderContent = () => {
      if (children) {
        return <span className={contentClassName}>{children}</span>;
      }

      if (type.startsWith('text-') && label) {
        return <span className={contentClassName}>{label}</span>;
      }

      if (type.startsWith('icon-') && icon) {
        const isFill = icon.length === 3 && icon[2] === true;
        const iconType = [icon[0], icon[1]] as IconType;
        return (
          <span className={ICON_CONTAINER}>
            <Icon iconType={iconType} isFill={isFill} size={ICON_SIZE} color={ICON_COLOR} />
          </span>
        );
      }

      if (type.startsWith('button-') && buttonLabel) {
        return (
          <Button
            size="xs"
            style="secondary"
            leadIcon={buttonLeadIcon}
            tailIcon={buttonTailIcon}
            shortcut={buttonBadge}
            onClick={onButtonClick}
          >
            {buttonLabel}
          </Button>
        );
      }

      return null;
    };

    const content = renderContent();
    const position = type.split('-')[1] as 'left' | 'center' | 'right' | undefined;

    if (type === 'default' || !content) {
      return (
        <div
          ref={ref}
          role="separator"
          className={cn(CONTAINER_BASE, className)}
          {...props}
        >
          <div className={lineClassName} />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        role="separator"
        className={cn(CONTAINER_WITH_CONTENT, className)}
        {...props}
      >
        {position === 'left' && (
          <>
            {content}
            <div className={lineClassName} />
          </>
        )}
        {position === 'center' && (
          <>
            <div className={lineClassName} />
            {content}
            <div className={lineClassName} />
          </>
        )}
        {position === 'right' && (
          <>
            <div className={lineClassName} />
            {content}
          </>
        )}
      </div>
    );
  }
);

Divider.displayName = 'Divider';
