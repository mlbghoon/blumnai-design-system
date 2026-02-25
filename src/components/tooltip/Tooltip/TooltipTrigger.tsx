'use no memo';

import {
  useState,
  useCallback,
  useRef,
  useEffect,
  useId,
  type ReactNode,
  type ReactElement,
} from 'react';
import { createPortal } from 'react-dom';
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  type Placement,
} from '@floating-ui/react';

import { Tooltip } from './Tooltip';

export interface TooltipTriggerProps {
  /**
   * 툴팁을 트리거하는 요소
   */
  children: ReactElement;
  /**
   * 툴팁에 표시할 내용 (문자열 또는 ReactNode)
   */
  content: ReactNode;
  /**
   * 배지 텍스트 (간단한 Tooltip과 함께 사용)
   */
  badge?: string;
  /**
   * 툴팁 위치
   * @default 'top'
   */
  placement?: Placement;
  /**
   * 호버 지연 시간 (ms)
   * @default 200
   */
  delay?: number;
  /**
   * 툴팁 비활성화 여부
   */
  disabled?: boolean;
  /**
   * 툴팁 최대 너비 (px)
   * @default 240
   */
  maxWidth?: number;
  /**
   * 제어 모드: 열림 상태
   */
  open?: boolean;
  /**
   * 제어 모드: 열림 상태 변경 콜백
   */
  onOpenChange?: (open: boolean) => void;
}

export function TooltipTrigger({
  children,
  content,
  badge,
  placement = 'top',
  delay = 200,
  disabled = false,
  maxWidth = 240,
  open: controlledOpen,
  onOpenChange,
}: TooltipTriggerProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const [floating, setFloating] = useState<HTMLDivElement | null>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tooltipId = useId();

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

  const setIsOpen = useCallback(
    (value: boolean) => {
      if (isControlled) {
        onOpenChange?.(value);
      } else {
        setUncontrolledOpen(value);
      }
    },
    [isControlled, onOpenChange]
  );

  const { floatingStyles } = useFloating({
    open: isOpen && anchor !== null,
    placement,
    middleware: [offset(8), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
    elements: {
      reference: anchor,
      floating,
    },
  });

  const cancelCloseTimeout = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (disabled) return;
    cancelCloseTimeout();

    hoverTimeoutRef.current = setTimeout(() => {
      setIsOpen(true);
    }, delay);
  }, [disabled, delay, setIsOpen, cancelCloseTimeout]);

  const startCloseTimeout = useCallback(() => {
    cancelCloseTimeout();
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 100);
  }, [setIsOpen, cancelCloseTimeout]);

  const handleMouseLeave = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    startCloseTimeout();
  }, [startCloseTimeout]);

  const handleFocus = useCallback(() => {
    if (disabled) return;
    cancelCloseTimeout();
    hoverTimeoutRef.current = setTimeout(() => {
      setIsOpen(true);
    }, delay);
  }, [disabled, delay, setIsOpen, cancelCloseTimeout]);

  const handleBlur = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    startCloseTimeout();
  }, [startCloseTimeout]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen) {
      setIsOpen(false);
    }
  }, [isOpen, setIsOpen]);

  const touchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleTouchStart = useCallback(() => {
    if (disabled) return;
    touchTimeoutRef.current = setTimeout(() => {
      setIsOpen(true);
    }, 500);
  }, [disabled, setIsOpen]);

  const handleTouchEnd = useCallback(() => {
    if (touchTimeoutRef.current) {
      clearTimeout(touchTimeoutRef.current);
      touchTimeoutRef.current = null;
    }
    if (isOpen) {
      setIsOpen(false);
    }
  }, [isOpen, setIsOpen]);

  const handleTouchMove = useCallback(() => {
    if (touchTimeoutRef.current) {
      clearTimeout(touchTimeoutRef.current);
      touchTimeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
      if (touchTimeoutRef.current) {
        clearTimeout(touchTimeoutRef.current);
      }
    };
  }, []);

  const isSimpleContent = typeof content === 'string' || typeof content === 'number';

  const tooltipContent = isSimpleContent ? (
    <Tooltip badge={badge} maxWidth={maxWidth}>
      {content}
    </Tooltip>
  ) : (
    content
  );

  const shouldShow = isOpen && !disabled && anchor !== null;

  return (
    <>
      <span
        ref={setAnchor}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
        aria-describedby={shouldShow ? tooltipId : undefined}
        className="block min-w-0"
      >
        {children}
      </span>
      {shouldShow &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            ref={setFloating}
            id={tooltipId}
            role="tooltip"
            style={{
              ...floatingStyles,
              zIndex: 50,
              animation: 'tooltip-enter 150ms ease-out',
            }}
            onMouseEnter={cancelCloseTimeout}
            onMouseLeave={startCloseTimeout}
          >
            <style>{`@keyframes tooltip-enter { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }`}</style>
            {tooltipContent}
          </div>,
          document.body
        )}
    </>
  );
}

TooltipTrigger.displayName = 'TooltipTrigger';
