import { forwardRef, useRef, useEffect, useCallback } from 'react';

import { cn } from '../../../utils/cn';
import { Icon } from '../../icons/Icon/Icon';

export interface DropdownMenuSearchProps {
  /**
   * 현재 검색 값
   */
  value?: string;
  /**
   * 검색 값 변경 시 호출되는 콜백
   */
  onChange?: (value: string) => void;
  /**
   * 플레이스홀더 텍스트
   * @default 'Search...'
   */
  placeholder?: string;
  /**
   * 마운트 시 자동으로 포커스할지 여부
   * @default true
   */
  autoFocus?: boolean;
  /**
   * 추가 className
   */
  className?: string;
}

// Search input styles - based on Figma node 4237:281144
// Height: 36px, white bg, bottom border at 15% opacity (border-darker)
// Container: padding-x-8, itemSpacing 6
const SEARCH_CONTAINER_STYLE = 'flex items-center w-full height-36 padding-x-8 gap-6 bg-default border-b-darker rounded-t-lg' as const;
const SEARCH_INPUT_STYLE = 'flex-1 min-w-0 bg-transparent outline-none font-body size-sm line-height-leading-5 letter-spacing-tracking-tight text-default placeholder:text-hint' as const;

/**
 * DropdownMenuSearch 컴포넌트
 *
 * 드롭다운 메뉴 헤더에서 사용하기 위해 설계된 검색 입력 필드입니다.
 * 검색 아이콘, 지우기 버튼, 은은한 배경 스타일을 제공합니다.
 */
export const DropdownMenuSearch = forwardRef<HTMLInputElement, DropdownMenuSearchProps>(({
  value = '',
  onChange,
  placeholder = 'Search...',
  autoFocus = true,
  className,
}, ref) => {
  const internalRef = useRef<HTMLInputElement>(null);
  const inputRef = ref || internalRef;

  // Auto-focus on mount
  useEffect(() => {
    if (autoFocus && typeof inputRef !== 'function' && inputRef.current) {
      // Use setTimeout to ensure focus after dropdown animation
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 10);
      return () => clearTimeout(timer);
    }
  }, [autoFocus, inputRef]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  }, [onChange]);

  const handleClear = useCallback(() => {
    onChange?.('');
    if (typeof inputRef !== 'function' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [onChange, inputRef]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    // Prevent closing dropdown when typing
    e.stopPropagation();

    // Clear on Escape if there's a value, otherwise let it bubble
    if (e.key === 'Escape' && value) {
      e.preventDefault();
      handleClear();
    }
  }, [value, handleClear]);

  return (
    <div className={cn(SEARCH_CONTAINER_STYLE, className)}>
      <Icon
        iconType={['system', 'search']}
        size={16}
        color="default-subtle"
        className="flex-shrink-0"
      />
      <input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={SEARCH_INPUT_STYLE}
        role="searchbox"
        aria-label={placeholder}
      />
      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="flex-shrink-0 flex items-center justify-center hover:bg-state-ghost-hover rounded-xs transition-colors"
          aria-label="Clear search"
        >
          <Icon
            iconType={['system', 'close-circle']}
            size={16}
            color="default-subtle"
          />
        </button>
      )}
    </div>
  );
});

DropdownMenuSearch.displayName = 'DropdownMenuSearch';
