import { forwardRef, useCallback, useId, useMemo, useState } from 'react';

import { RiArrowDownLine } from '@remixicon/react';
import { cn } from '@/lib/utils';
import {
  BOX_SHADOW,
  STYLE_BASE_CLASSES,
  STYLE_HOVER_CLASSES,
  STYLE_OPEN_CLASSES,
  STYLE_PADDING_CLASSES,
} from '../../../constants/accordion/AccordionItem/AccordionItem.constants';

import type { AccordionItemProps, AccordionItemStyle, AccordionPadding } from './AccordionItem.types';

function getPaddingClass(style: AccordionItemStyle, padding?: AccordionPadding): string {
  if (padding === undefined) return STYLE_PADDING_CLASSES[style];
  if (style === 'line') return `padding-y-${padding} padding-x-0`;
  return `padding-${padding}`;
}

/**
 * AccordionItem 컴포넌트
 *
 * 확장되거나 축소될 수 있는 단일 아코디언 아이템입니다.
 * 4가지 스타일 variant(default, soft, ghost, line)를 지원하며,
 * 테마는 CSS 변수를 통해 자동으로 적용됩니다.
 */
export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(({
  style = 'default',
  isOpen: controlledIsOpen,
  onToggle: controlledOnToggle,
  header,
  children,
  disabled = false,
  defaultIsOpen,
  headingLevel = 3,
  className,
  headerProps,
  padding,
  ...restProps
}, ref) => {
  const [internalIsOpen, setInternalIsOpen] = useState(defaultIsOpen ?? false);
  const [isHovered, setIsHovered] = useState(false);
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;
  const uniqueId = useId();
  const buttonId = `accordion-button-${uniqueId}`;
  const panelId = `accordion-panel-${uniqueId}`;

  const handleToggle = useCallback(() => {
    if (disabled) return;

    const newIsOpen = !isOpen;
    if (isControlled) {
      controlledOnToggle?.(newIsOpen);
    } else {
      setInternalIsOpen(newIsOpen);
      controlledOnToggle?.(newIsOpen);
    }
  }, [disabled, isControlled, isOpen, controlledOnToggle]);

  const containerClassName = useMemo(() => {
    const canHover = isHovered && !isOpen && !disabled;
    const hasShadow = style === 'default';

    return cn(
      'w-full flex flex-col transition-[background-color,border-color,box-shadow] duration-200 ease-in-out',
      STYLE_BASE_CLASSES[style],
      getPaddingClass(style, padding),
      hasShadow && BOX_SHADOW,
      canHover && STYLE_HOVER_CLASSES[style],
      isOpen && STYLE_OPEN_CLASSES[style],
      className
    );
  }, [style, isOpen, isHovered, disabled, className, padding]);

  const headerClassName = useMemo(
    () =>
      cn(
        'flex items-center justify-between w-full ds-gap-2 cursor-pointer select-none outline-none border-none bg-transparent padding-0',
        'text-default transition-colors duration-200 ease-in-out',
        'focus-visible:shadow-component-misc-focus focus-visible:rounded-sm',
        !disabled && 'hover:text-default',
        disabled && 'cursor-not-allowed opacity-50'
      ),
    [disabled]
  );

  const iconClassName = useMemo(
    () =>
      cn(
        'flex items-center justify-center width-24 height-24 shrink-0 icon-default-muted',
        'transition-transform duration-200 ease-in-out',
        isOpen && 'rotate-180'
      ),
    [isOpen]
  );

  const contentClassName = useMemo(
    () =>
      cn(
        'grid transition-[grid-template-rows,opacity] duration-300 ease-in-out',
        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
      ),
    [isOpen]
  );

  return (
    <div
      ref={ref}
      className={containerClassName}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...restProps}
    >
      <div role="heading" aria-level={headingLevel}>
        <button
          id={buttonId}
          type="button"
          className={headerClassName}
          onClick={handleToggle}
          disabled={disabled}
          aria-expanded={isOpen}
          aria-controls={panelId}
          aria-disabled={disabled}
          {...headerProps}
        >
          <span className="flex-1 font-body size-md font-medium line-height-leading-6 text-left text-default">
            {header}
          </span>
          <span className={iconClassName}>
            <RiArrowDownLine size={20} />
          </span>
        </button>
      </div>
      <div id={panelId} role="region" aria-labelledby={buttonId} className={contentClassName} aria-hidden={!isOpen} {...(!isOpen && { inert: true })}>
        <div className="overflow-hidden"><div className="padding-y-8 font-body size-md font-normal line-height-leading-6 text-subtle">{children}</div></div>
      </div>
    </div>
  );
});

AccordionItem.displayName = 'AccordionItem';
