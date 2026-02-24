import * as React from 'react';
import { useState } from 'react';
import { Group, Panel, Separator } from 'react-resizable-panels';

import { cn } from '@/lib/utils';
import { Icon } from '@/components/icons/Icon';
import type {
  ResizablePanelGroupProps,
  ResizablePanelProps,
  ResizableHandleProps,
} from './Resizable.types';

const GripDotsIcon = () => (
  <svg
    width="6"
    height="14"
    viewBox="0 0 6 14"
    fill="currentColor"
    aria-hidden="true"
  >
    <circle cx="1.5" cy="1.5" r="1.5" />
    <circle cx="1.5" cy="7" r="1.5" />
    <circle cx="1.5" cy="12.5" r="1.5" />
    <circle cx="4.5" cy="1.5" r="1.5" />
    <circle cx="4.5" cy="7" r="1.5" />
    <circle cx="4.5" cy="12.5" r="1.5" />
  </svg>
);

const CollapseButton = ({
  onClick,
  isCollapsed,
  direction,
  orientation,
  position = 'center',
}: {
  onClick: () => void;
  isCollapsed: boolean;
  direction: 'before' | 'after';
  orientation: 'horizontal' | 'vertical';
  position?: 'start' | 'center' | 'end' | number;
}) => {
  const getIcon = () => {
    if (orientation === 'horizontal') {
      if (direction === 'before') {
        return isCollapsed ? <Icon iconType={['arrows', 'arrow-drop-right']} size={12} /> : <Icon iconType={['arrows', 'arrow-drop-left']} size={12} />;
      }
      return isCollapsed ? <Icon iconType={['arrows', 'arrow-drop-left']} size={12} /> : <Icon iconType={['arrows', 'arrow-drop-right']} size={12} />;
    }
    if (direction === 'before') {
      return isCollapsed ? <Icon iconType={['arrows', 'arrow-drop-down']} size={12} /> : <Icon iconType={['arrows', 'arrow-drop-up']} size={12} />;
    }
    return isCollapsed ? <Icon iconType={['arrows', 'arrow-drop-up']} size={12} /> : <Icon iconType={['arrows', 'arrow-drop-down']} size={12} />;
  };

  const getPositionStyles = (): React.CSSProperties | undefined => {
    if (typeof position === 'number') {
      return orientation === 'horizontal'
        ? { top: `${position}px` }
        : { left: `${position}px` };
    }
    return undefined;
  };

  const getPositionClasses = () => {
    if (typeof position === 'number') {
      return '';
    }
    if (orientation === 'horizontal') {
      switch (position) {
        case 'start':
          return 'top-[16px]';
        case 'end':
          return 'bottom-[16px]';
        default:
          return 'top-1/2 -translate-y-1/2';
      }
    }
    switch (position) {
      case 'start':
        return 'left-[16px]';
      case 'end':
        return 'right-[16px]';
      default:
        return 'left-1/2 -translate-x-1/2';
    }
  };

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={cn(
        'z-20 absolute flex items-center justify-center cursor-pointer',
        'width-16 height-16 rounded-full',
        'bg-card border-darker hover:bg-subtle',
        'transition-colors duration-150',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-highlight',
        'text-muted hover:text-default',
        getPositionClasses()
      )}
      style={getPositionStyles()}
      aria-expanded={!isCollapsed}
      aria-label={isCollapsed ? 'Expand panel' : 'Collapse panel'}
    >
      {getIcon()}
    </button>
  );
};

const ResizablePanelGroupContext = React.createContext<{ orientation: 'horizontal' | 'vertical' }>({
  orientation: 'horizontal',
});

const ResizablePanelGroup = React.forwardRef<
  HTMLDivElement,
  ResizablePanelGroupProps
>(({ className, orientation = 'horizontal', ...props }, ref) => (
  <ResizablePanelGroupContext.Provider value={{ orientation }}>
    <Group
      className={cn('flex h-full w-full', className)}
      elementRef={ref as React.Ref<HTMLDivElement | null>}
      orientation={orientation}
      {...props}
    />
  </ResizablePanelGroupContext.Provider>
));
ResizablePanelGroup.displayName = 'ResizablePanelGroup';

const ResizablePanel = Panel as React.FC<ResizablePanelProps>;
ResizablePanel.displayName = 'ResizablePanel';

const ResizableHandle = ({
  withHandle,
  variant = 'line',
  collapseButton,
  collapseButtonPosition = 'center',
  panelRef,
  isCollapsed: isCollapsedProp,
  onCollapseChange,
  className,
  ...props
}: ResizableHandleProps) => {
  const isHidden = variant === 'hidden';
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const isCollapsed = isCollapsedProp ?? internalCollapsed;
  const { orientation } = React.useContext(ResizablePanelGroupContext);

  const handleCollapse = () => {
    if (!panelRef?.current) return;

    if (isCollapsed) {
      panelRef.current.expand();
    } else {
      panelRef.current.collapse();
    }

    const newState = !isCollapsed;
    setInternalCollapsed(newState);
    onCollapseChange?.(newState);
  };

  return (
    <Separator
      className={cn(
        'group/handle relative flex items-center justify-center overflow-visible',
        'after:absolute after:transition-colors after:duration-150',
        orientation === 'horizontal'
          ? 'after:inset-y-0 after:left-1/2 after:w-[2px] after:-translate-x-1/2'
          : 'after:inset-x-0 after:top-1/2 after:h-[2px] after:-translate-y-1/2',
        'focus-visible:outline-none focus-visible:after:bg-border-highlight',
        isHidden
          ? 'after:bg-transparent hover:after:bg-muted active:after:bg-border-darker'
          : 'after:bg-muted hover:after:bg-border-darker active:after:bg-border-strong',
        className
      )}
      {...props}
    >
      {withHandle && variant === 'pill' && (
        <div
          className={cn(
            'z-10 rounded-full',
            orientation === 'horizontal' ? 'width-4 height-32' : 'width-32 height-4',
            'bg-muted group-hover/handle:bg-border-darker group-active/handle:bg-border-strong',
            'transition-colors duration-150'
          )}
        />
      )}
      {withHandle && variant === 'dots' && (
        <div
          className={cn(
            'z-10 flex items-center justify-center',
            orientation === 'horizontal' ? 'width-16 height-24' : 'width-24 height-16',
            'rounded-sm',
            'bg-card border-darker',
            'text-hint group-hover/handle:text-muted',
            'transition-colors duration-150'
          )}
        >
          <div className={orientation === 'vertical' ? 'rotate-90' : ''}>
            <GripDotsIcon />
          </div>
        </div>
      )}
      {withHandle && variant === 'line' && (
        <div
          className={cn(
            'z-10 rounded-full',
            orientation === 'horizontal' ? 'width-8 height-32' : 'width-32 height-8',
            'bg-border-darker group-hover/handle:bg-border-strong',
            'transition-colors duration-150'
          )}
        />
      )}
      {collapseButton && panelRef && (
        <CollapseButton
          onClick={handleCollapse}
          isCollapsed={isCollapsed}
          direction={collapseButton}
          orientation={orientation}
          position={collapseButtonPosition}
        />
      )}
    </Separator>
  );
};
ResizableHandle.displayName = 'ResizableHandle';

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
