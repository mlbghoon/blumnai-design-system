import { forwardRef, useCallback, useMemo, useState } from 'react';

import { ArrowDownIcon } from '../../icons/Icon/icons/arrows';
import { cn } from '../../../utils/cn';
import {
  BOX_SHADOW,
  STYLE_BASE_CLASSES,
  STYLE_HOVER_CLASSES,
  STYLE_OPEN_CLASSES,
} from '../../../constants/accordion/AccordionItem/AccordionItem.constants';

import type { AccordionItemProps } from './AccordionItem.types';

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
  className,
  headerProps,
  ...restProps
}, ref) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  const handleToggle = useCallback(() => {
    if (disabled) return;

    if (isControlled) {
      controlledOnToggle?.();
    } else {
      setInternalIsOpen((prev) => !prev);
    }
  }, [disabled, isControlled, controlledOnToggle]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleToggle();
      }
    },
    [handleToggle]
  );

  const containerClassName = useMemo(() => {
    const canHover = isHovered && !isOpen && !disabled;
    const hasShadow = style === 'default';

    return cn(
      'w-full flex flex-col transition-all duration-200 ease-in-out',
      STYLE_BASE_CLASSES[style],
      hasShadow && BOX_SHADOW,
      canHover && STYLE_HOVER_CLASSES[style],
      isOpen && STYLE_OPEN_CLASSES[style],
      className
    );
  }, [style, isOpen, isHovered, disabled, className]);

  const headerClassName = useMemo(
    () =>
      cn(
        'flex items-center justify-between w-full gap-2 cursor-pointer select-none outline-none border-none bg-transparent p-0',
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
        'flex items-center justify-center w-6 h-6 shrink-0 icon-default-muted',
        'transition-all duration-200 ease-in-out',
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
      <button
        type="button"
        className={headerClassName}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        aria-expanded={isOpen}
        aria-disabled={disabled}
        {...headerProps}
      >
        <span className="flex-1 text-base font-medium leading-6 text-left text-default">
          {header}
        </span>
        <span className={iconClassName}>
          <ArrowDownIcon size={20} />
        </span>
      </button>
      <div className={contentClassName}>
        <div className="overflow-hidden"><div className="padding-y-8 size-md font-normal line-height-leading-6 text-subtle">{children}</div></div>
      </div>
    </div>
  );
});

AccordionItem.displayName = 'AccordionItem';
