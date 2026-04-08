'use no memo';

import {
  useState,
  useCallback,
  useRef,
  useEffect,
  useId,
  isValidElement,
  type ReactNode,
  type ReactElement,
} from 'react';
import { Slot } from '@radix-ui/react-slot';
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
import { usePortalContainer } from '../../../utils/PortalContainerContext';

export interface TooltipTriggerProps {
  /**
   * 툴팁을 트리거하는 요소
   */
  children: ReactElement;
  /**
   * 툴팁에 표시할 내용.
   * - string/number: 자동으로 `<Tooltip>`로 감쌈 (배경/패딩/화살표 자동 적용)
   * - ReactNode: 자동 감쌈. 단, 이미 `<Tooltip>` 엘리먼트면 그대로 사용
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
   * 메인 축 오프셋 (px)
   * @default 8
   */
  sideOffset?: number;
  /**
   * 크로스 축 오프셋 (px)
   * @default 0
   */
  alignOffset?: number;
  /**
   * 툴팁 너비 (px)
   */
  width?: number;
  /**
   * 툴팁 최소 너비 (px)
   */
  minWidth?: number;
  /**
   * 제어 모드: 열림 상태
   */
  open?: boolean;
  /**
   * 제어 모드: 열림 상태 변경 콜백
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * true일 경우 래퍼 span 없이 자식 요소에 직접 이벤트 핸들러와 ref를 병합
   * @default false
   */
  asChild?: boolean;
  /**
   * 툴팁 포탈 z-index 오버라이드.
   * 미지정 시 PortalContainerContext가 있으면 10, 없으면 50.
   */
  zIndex?: number;
  /**
   * 포탈 컨테이너 명시적 지정.
   * - `undefined` (기본): PortalContainerContext 사용 → 없으면 document.body
   * - `null`: Context 무시하고 강제로 document.body 포탈
   * - `HTMLElement`: 해당 엘리먼트로 포탈 (overflow:hidden 컨테이너 탈출용)
   */
  container?: HTMLElement | null;
}

export function TooltipTrigger({
  children,
  content,
  badge,
  placement = 'top',
  delay = 200,
  disabled = false,
  maxWidth = 240,
  sideOffset = 8,
  alignOffset = 0,
  width,
  minWidth,
  open: controlledOpen,
  onOpenChange,
  asChild = false,
  zIndex,
  container,
}: TooltipTriggerProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const [floating, setFloating] = useState<HTMLDivElement | null>(null);
  const timersRef = useRef<{ hover: ReturnType<typeof setTimeout> | null; close: ReturnType<typeof setTimeout> | null; touch: ReturnType<typeof setTimeout> | null }>({ hover: null, close: null, touch: null });
  const tooltipId = useId();
  const portalContainer = usePortalContainer();

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
    middleware: [offset({ mainAxis: sideOffset, crossAxis: alignOffset }), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
    elements: {
      reference: anchor,
      floating,
    },
  });

  const cancelClose = useCallback(() => {
    if (timersRef.current.close) {
      clearTimeout(timersRef.current.close);
      timersRef.current.close = null;
    }
  }, []);

  const scheduleOpen = useCallback(() => {
    if (disabled) return;
    cancelClose();
    if (timersRef.current.hover) clearTimeout(timersRef.current.hover);
    timersRef.current.hover = setTimeout(() => setIsOpen(true), delay);
  }, [disabled, delay, setIsOpen, cancelClose]);

  const scheduleClose = useCallback(() => {
    if (timersRef.current.hover) {
      clearTimeout(timersRef.current.hover);
      timersRef.current.hover = null;
    }
    cancelClose();
    timersRef.current.close = setTimeout(() => setIsOpen(false), 100);
  }, [setIsOpen, cancelClose]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen) {
      setIsOpen(false);
    }
  }, [isOpen, setIsOpen]);

  const handleTouchStart = useCallback(() => {
    if (disabled) return;
    if (timersRef.current.touch) clearTimeout(timersRef.current.touch);
    timersRef.current.touch = setTimeout(() => setIsOpen(true), 500);
  }, [disabled, setIsOpen]);

  const handleTouchEnd = useCallback(() => {
    if (timersRef.current.touch) {
      clearTimeout(timersRef.current.touch);
      timersRef.current.touch = null;
    }
    if (isOpen) setIsOpen(false);
  }, [isOpen, setIsOpen]);

  const handleTouchMove = useCallback(() => {
    if (timersRef.current.touch) {
      clearTimeout(timersRef.current.touch);
      timersRef.current.touch = null;
    }
  }, []);

  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      if (timers.hover) clearTimeout(timers.hover);
      if (timers.close) clearTimeout(timers.close);
      if (timers.touch) clearTimeout(timers.touch);
    };
  }, []);

  const isAlreadyTooltip = isValidElement(content) && content.type === Tooltip;

  const tooltipContent = isAlreadyTooltip ? (
    content
  ) : (
    <Tooltip badge={badge} maxWidth={maxWidth} width={width} minWidth={minWidth}>
      {content}
    </Tooltip>
  );

  const shouldShow = isOpen && !disabled && anchor !== null;

  // container 명시 우선: undefined → context, null → body 강제, HTMLElement → 그대로
  const effectivePortalTarget =
    container === undefined ? portalContainer : container;
  const usingContextContainer = container === undefined && portalContainer !== null;

  const portalElement = shouldShow &&
    typeof document !== 'undefined' &&
    createPortal(
      <div
        ref={setFloating}
        id={tooltipId}
        role="tooltip"
        style={{
          ...floatingStyles,
          zIndex: zIndex ?? (usingContextContainer ? 10 : 50),
          animation: 'tooltip-enter 150ms ease-out',
        }}
        onMouseEnter={cancelClose}
        onMouseLeave={scheduleClose}
      >
        {tooltipContent}
      </div>,
      effectivePortalTarget ?? document.body
    );

  if (asChild) {
    return (
      <>
        <Slot
          ref={setAnchor}
          onMouseEnter={scheduleOpen}
          onMouseLeave={scheduleClose}
          onFocus={scheduleOpen}
          onBlur={scheduleClose}
          onKeyDown={handleKeyDown}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchMove={handleTouchMove}
          aria-describedby={shouldShow ? tooltipId : undefined}
        >
          {children}
        </Slot>
        {portalElement}
      </>
    );
  }

  return (
    <>
      <span
        ref={setAnchor}
        onMouseEnter={scheduleOpen}
        onMouseLeave={scheduleClose}
        onFocus={scheduleOpen}
        onBlur={scheduleClose}
        onKeyDown={handleKeyDown}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
        aria-describedby={shouldShow ? tooltipId : undefined}
        className="block min-w-0"
      >
        {children}
      </span>
      {portalElement}
    </>
  );
}

TooltipTrigger.displayName = 'TooltipTrigger';
