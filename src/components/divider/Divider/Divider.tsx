import type { CSSProperties } from 'react';
import { forwardRef } from 'react';

import { cn } from '@/lib/utils';
import { renderIconProp } from '../../icons/Icon';
import { Button } from '../../button/Button';

import {
  LINE_BASE,
  LINE_VERTICAL,
  LINE_DASHED,
  CONTENT_BASE,
  CONTENT_TEXT,
  ICON_CONTAINER,
  ICON_SIZE,
  ICON_COLOR,
  CONTAINER_BASE,
  CONTAINER_VERTICAL,
  CONTAINER_WITH_CONTENT,
  CONTAINER_VERTICAL_WITH_CONTENT,
  SPACING_HORIZONTAL,
  SPACING_VERTICAL,
} from 'constants/divider/Divider/Divider.constants';
import type { DividerProps } from './Divider.types';

/**
 * Divider 컴포넌트
 *
 * 콘텐츠 섹션을 시각적으로 구분하는 수평 구분선입니다.
 * 텍스트, 아이콘, 버튼과 함께 사용할 수 있습니다.
 *
 * @example
 * ```tsx
 * <Divider />
 * <Divider type="text-center" label="or" />
 * ```
 */
export const Divider = forwardRef<HTMLDivElement, DividerProps>(
  (
    {
      type = 'default',
      orientation = 'horizontal',
      lineStyle = 'default',
      spacing = 'lg',
      spacingOverride,
      label,
      icon,
      buttonLabel,
      buttonLeadIcon,
      buttonTailIcon,
      buttonBadge,
      onButtonClick,
      children,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const isDashed = lineStyle === 'dashed';
    const isVertical = orientation === 'vertical';

    const lineClassName = cn(
      isVertical ? LINE_VERTICAL : LINE_BASE,
      isDashed && LINE_DASHED
    );

    const contentClassName = cn(
      CONTENT_BASE,
      CONTENT_TEXT
    );

    const hasOverride = spacingOverride !== undefined;
    const spacingClass = hasOverride
      ? undefined
      : isVertical
        ? SPACING_VERTICAL[spacing]
        : SPACING_HORIZONTAL[spacing];

    const spacingStyle: CSSProperties | undefined = hasOverride
      ? isVertical
        ? { paddingInline: `${spacingOverride}px` }
        : { paddingBlock: `${spacingOverride}px` }
      : undefined;

    const mergedStyle = spacingStyle
      ? { ...spacingStyle, ...style }
      : style;

    const renderContent = () => {
      if (children) {
        return <span className={contentClassName}>{children}</span>;
      }

      if (type.startsWith('text-') && label) {
        return <span className={contentClassName}>{label}</span>;
      }

      if (type.startsWith('icon-') && icon) {
        return (
          <span className={ICON_CONTAINER}>
            {renderIconProp(icon, { size: ICON_SIZE, color: ICON_COLOR })}
          </span>
        );
      }

      if (type.startsWith('button-') && buttonLabel) {
        return (
          <Button
            size="xs"
            buttonStyle="secondary"
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
    const hasInteractiveContent = type.startsWith('button-');

    if (type === 'default' || !content) {
      return (
        <div
          ref={ref}
          role="separator"
          aria-orientation={orientation}
          className={cn(isVertical ? CONTAINER_VERTICAL : CONTAINER_BASE, spacingClass, className)}
          style={mergedStyle}
          {...props}
        >
          <div className={lineClassName} />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        role={hasInteractiveContent ? 'presentation' : 'separator'}
        aria-orientation={hasInteractiveContent ? undefined : orientation}
        className={cn(isVertical ? CONTAINER_VERTICAL_WITH_CONTENT : CONTAINER_WITH_CONTENT, spacingClass, className)}
        style={mergedStyle}
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
