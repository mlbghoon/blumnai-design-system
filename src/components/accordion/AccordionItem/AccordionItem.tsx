import { forwardRef, useCallback, useState } from 'react';

import { ArrowDownIcon } from '../../../icons/arrows/ArrowDownIcon';
import { cn } from '../../../utils/cn';

import type { AccordionItemProps } from './AccordionItem.types';

/**
 * AccordionItem 컴포넌트
 *
 * 확장되거나 축소될 수 있는 단일 아코디언 아이템입니다.
 * 4가지 스타일 variant(default, soft, ghost, line)와 다크 모드를 지원합니다.
 */
export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(({
  style = 'default',
  isOpen: controlledIsOpen,
  onToggle: controlledOnToggle,
  header,
  children,
  disabled = false,
  darkMode = false,
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

  // variant, 상태, 다크 모드에 따라 컨테이너 클래스 이름 생성
  const getContainerClassName = () => {
    const baseClasses = 'w-full flex flex-col transition-all duration-200 ease-in-out';

    if (style === 'default') {
      return cn(
        baseClasses,
        'bg-white border rounded-lg p-6',
        'border-[rgba(39,39,42,0.1)]',
        '[box-shadow:0px_1px_2px_rgba(0,0,0,0.05),inset_0px_-1px_0px_rgba(0,0,0,0.1)]',
        isHovered && !isOpen && !disabled && 'bg-[#fafafa]',
        isOpen && 'bg-white border-[rgba(39,39,42,0.1)]',
        darkMode && 'bg-[rgba(255,255,255,0.04)] border-[rgba(255,255,255,0.1)]',
        darkMode && isHovered && !isOpen && !disabled && 'bg-[rgba(255,255,255,0.04)]',
        darkMode && isOpen && 'bg-[rgba(255,255,255,0.04)] border-[rgba(255,255,255,0.1)]',
        className
      );
    } else if (style === 'soft') {
      return cn(
        baseClasses,
        'bg-[rgba(39,39,42,0.06)] rounded-lg p-6',
        isHovered && !isOpen && !disabled && 'bg-[rgba(39,39,42,0.08)]',
        isOpen && 'bg-white border border-[rgba(39,39,42,0.1)] [box-shadow:0px_1px_2px_rgba(0,0,0,0.05),inset_0px_-1px_0px_rgba(0,0,0,0.1)]',
        darkMode && 'bg-[rgba(255,255,255,0.04)]',
        darkMode && isHovered && !isOpen && !disabled && 'bg-[rgba(255,255,255,0.04)]',
        darkMode && isOpen && 'bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.1)] [box-shadow:0px_1px_2px_0px_rgba(0,0,0,0.05),inset_0px_-1px_0px_0px_rgba(0,0,0,0.1)]',
        className
      );
    } else if (style === 'ghost') {
      return cn(
        baseClasses,
        'bg-transparent rounded-lg p-6',
        isHovered && !isOpen && !disabled && 'bg-[rgba(39,39,42,0.06)]',
        isOpen && 'bg-white border border-[rgba(39,39,42,0.1)] [box-shadow:0px_1px_2px_rgba(0,0,0,0.05),inset_0px_-1px_0px_rgba(0,0,0,0.1)]',
        darkMode && 'bg-[rgba(255,255,255,0.04)]',
        darkMode && isHovered && !isOpen && !disabled && 'bg-[rgba(255,255,255,0.04)]',
        darkMode && isOpen && 'bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.1)] [box-shadow:0px_1px_2px_0px_rgba(0,0,0,0.05),inset_0px_-1px_0px_0px_rgba(0,0,0,0.1)]',
        className
      );
    } else if (style === 'line') {
      return cn(
        baseClasses,
        'bg-transparent border-0 border-b rounded-none py-6 px-0',
        'border-[rgba(39,39,42,0.1)]',
        isHovered && !isOpen && !disabled && 'border-b-[rgba(39,39,42,0.25)]',
        isOpen && 'border-b-[rgba(39,39,42,0.1)]',
        darkMode && 'border-b-[rgba(255,255,255,0.1)]',
        darkMode && isHovered && !isOpen && !disabled && 'border-b-[rgba(255,255,255,0.1)]',
        darkMode && isOpen && 'border-b-[rgba(255,255,255,0.1)]',
        className
      );
    }

    return cn(baseClasses, className);
  };

  const getHeaderClassName = () => {
    return cn(
      'flex items-center justify-between w-full gap-2 cursor-pointer select-none outline-none border-none bg-transparent p-0',
      'text-[#111115] transition-colors duration-200 ease-in-out',
      !disabled && 'hover:text-[#111115]',
      disabled && 'cursor-not-allowed opacity-50',
      darkMode && 'text-white'
    );
  };

  const getIconClassName = () => {
    return cn(
      'flex items-center justify-center w-6 h-6 shrink-0 text-[#6f6f77]',
      'transition-transform transition-colors duration-200 ease-in-out',
      isOpen && 'rotate-180 text-[#6f6f77]',
      darkMode && 'text-[rgba(255,255,255,0.7)]',
      darkMode && isOpen && 'text-[rgba(255,255,255,0.7)]'
    );
  };

  const getContentClassName = () => {
    return cn(
      'overflow-hidden transition-all duration-300 ease-in-out max-h-0 opacity-0',
      isOpen && 'max-h-[1000px] opacity-100'
    );
  };

  const getContentInnerClassName = () => {
    return cn(
      'pt-2 text-base font-normal leading-6 text-[#4e4e55]',
      darkMode && 'text-[rgba(255,255,255,0.7)]'
    );
  };

  return (
    <div
      ref={ref}
      className={getContainerClassName()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...restProps}
    >
      <button
        type="button"
        className={getHeaderClassName()}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        aria-expanded={isOpen}
        aria-disabled={disabled}
        {...headerProps}
      >
        <span
          className={cn(
            'flex-1 text-base font-medium leading-6 text-left',
            darkMode ? 'text-white' : 'text-[#111115]'
          )}
        >
          {header}
        </span>
        <span className={getIconClassName()}>
          <ArrowDownIcon size={20} />
        </span>
      </button>
      <div className={getContentClassName()}>
        <div className={getContentInnerClassName()}>{children}</div>
      </div>
    </div>
  );
});

AccordionItem.displayName = 'AccordionItem';
