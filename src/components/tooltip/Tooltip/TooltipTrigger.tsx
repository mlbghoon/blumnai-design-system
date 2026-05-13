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
import { AdvancedTooltip } from './AdvancedTooltip';
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
  /**
   * Dialog 안에서 Tooltip 사용 시 레이아웃 이슈 회피용 escape.
   *
   * Dialog는 내부적으로 `PortalContainerProvider`로 자신의 `DialogContent`(grid + padding + gap)를
   * portal 타겟으로 지정합니다. 이 컨텍스트 안에서 Tooltip이 portal되면 레이아웃(padding, 멀티라인 wrapping 등)이
   * 왜곡되는 경우가 보고됨.
   *
   * `true`로 지정하면:
   * - PortalContainerContext / `container` prop을 무시하고 `document.body`로 강제 portal
   * - `zIndex` 미지정 시 `10200` 자동 적용 (DS Dialog z-10000, Select dropdown z-10100 위에 안전하게 겹쳐짐)
   *
   * @default false
   */
  escapePortalContext?: boolean;
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
  escapePortalContext = false,
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

  // Tooltip 또는 AdvancedTooltip을 직접 넘긴 경우 이중 wrapper(중첩 카드) 방지
  const isAlreadyTooltip = isValidElement(content) &&
    (content.type === Tooltip || content.type === AdvancedTooltip);

  const tooltipContent = isAlreadyTooltip ? (
    content
  ) : (
    <Tooltip badge={badge} maxWidth={maxWidth} width={width} minWidth={minWidth}>
      {content}
    </Tooltip>
  );

  const shouldShow = isOpen && !disabled && anchor !== null;

  // escapePortalContext 우선: 항상 document.body + zIndex 10200
  // container 명시 다음: undefined → context, null → body 강제, HTMLElement → 그대로
  const effectivePortalTarget = escapePortalContext
    ? null
    : container === undefined ? portalContainer : container;
  const usingContextContainer =
    !escapePortalContext && container === undefined && portalContainer !== null;
  // 10200 은 DS 내부 floating 컴포넌트 z-index 들 (Dialog 10000, Select dropdown 10100) 위.
  const defaultZIndex = escapePortalContext ? 10200 : usingContextContainer ? 10 : 50;

  const portalElement = shouldShow &&
    typeof document !== 'undefined' &&
    createPortal(
      <div
        ref={setFloating}
        id={tooltipId}
        role="tooltip"
        className="blumnai-floating-content blumnai-tooltip-content"
        style={{
          ...floatingStyles,
          zIndex: zIndex ?? defaultZIndex,
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
