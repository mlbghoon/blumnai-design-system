import { forwardRef, createContext, useContext, useCallback, useMemo } from 'react';
import { cn } from '../../lib/utils';
import { Icon, renderIconProp, RiCheckLine } from '../icons/Icon';
import type { IconProp } from '../icons/Icon';
import type {
  StepperProps,
  StepItem,
  StepStatus,
  StepperSize,
  StepperColor,
  StepperIndicatorType,
  StepperOrientation,
  StepperHorizontalAlign,
  StepperVerticalAlign,
  StepperIndicatorPosition,
} from './Stepper.types';


interface StepperContextValue {
  orientation: StepperOrientation;
  indicatorType: StepperIndicatorType;
  size: StepperSize;
  color: StepperColor;
  horizontalAlign: StepperHorizontalAlign;
  verticalAlign: StepperVerticalAlign;
  indicatorPosition: StepperIndicatorPosition;
  clickable: boolean;
  showCheckOnCompleted: boolean;
  onStepClick?: (index: number) => void;
  totalSteps: number;
}

const StepperContext = createContext<StepperContextValue>({
  orientation: 'horizontal',
  indicatorType: 'number',
  size: 'md',
  color: 'blue',
  horizontalAlign: 'center',
  verticalAlign: 'left',
  indicatorPosition: 'top',
  clickable: false,
  showCheckOnCompleted: false,
  totalSteps: 0,
});


const INDICATOR_SIZE_MAP: Record<StepperSize, string> = {
  sm: 'width-24 height-24',
  md: 'width-32 height-32',
  lg: 'width-40 height-40',
};

const INDICATOR_TEXT_MAP: Record<StepperSize, string> = {
  sm: 'size-xs line-height-leading-4',
  md: 'size-sm line-height-leading-5',
  lg: 'size-md line-height-leading-6',
};

const ICON_SIZE_MAP: Record<StepperSize, number> = {
  sm: 14,
  md: 16,
  lg: 20,
};

const COLOR_BG_MAP: Record<StepperColor, string> = {
  gray: 'bg-basic-gray-accent',
  red: 'bg-basic-red-accent',
  orange: 'bg-basic-orange-accent',
  amber: 'bg-basic-amber-accent',
  yellow: 'bg-basic-yellow-accent',
  lime: 'bg-basic-lime-accent',
  green: 'bg-basic-green-accent',
  emerald: 'bg-basic-emerald-accent',
  teal: 'bg-basic-teal-accent',
  cyan: 'bg-basic-cyan-accent',
  sky: 'bg-basic-sky-accent',
  blue: 'bg-basic-blue-accent',
  indigo: 'bg-basic-indigo-accent',
  violet: 'bg-basic-violet-accent',
  purple: 'bg-basic-purple-accent',
  fuchsia: 'bg-basic-fuchsia-accent',
  pink: 'bg-basic-pink-accent',
  rose: 'bg-basic-rose-accent',
};


function resolveStatus(
  index: number,
  activeStep: number,
  step: StepItem,
): StepStatus {
  if (step.error) return 'error';
  if (index < activeStep) return 'completed';
  if (index === activeStep) return 'active';
  return 'pending';
}


function NumberIndicator({
  index,
  status,
}: {
  index: number;
  status: StepStatus;
}) {
  const { size, color, showCheckOnCompleted, clickable } = useContext(StepperContext);

  const showCheck = status === 'completed' && showCheckOnCompleted;

  const bgClass = cn(
    status === 'active' && COLOR_BG_MAP[color],
    status === 'completed' && COLOR_BG_MAP[color],
    status === 'error' && 'bg-basic-red-accent',
    status === 'pending' && 'bg-subtle border-darker',
  );

  const textClass = cn(
    status === 'pending' ? 'text-default' : 'text-white-default',
  );

  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-full shrink-0 transition-opacity',
        'font-body font-semibold',
        INDICATOR_SIZE_MAP[size],
        INDICATOR_TEXT_MAP[size],
        bgClass,
        textClass,
        clickable && 'group-hover/step:opacity-80',
      )}
    >
      {showCheck ? (
        <Icon icon={RiCheckLine} size={ICON_SIZE_MAP[size]} />
      ) : (
        index + 1
      )}
    </div>
  );
}


function IconIndicator({
  status,
  icon,
}: {
  status: StepStatus;
  icon?: StepItem['icon'];
}) {
  const { size, color, showCheckOnCompleted, clickable } = useContext(StepperContext);

  const showCheck = status === 'completed' && showCheckOnCompleted;
  const displayIcon: IconProp = showCheck
    ? RiCheckLine
    : icon ?? RiCheckLine;

  const bgClass = cn(
    status === 'active' && COLOR_BG_MAP[color],
    status === 'completed' && COLOR_BG_MAP[color],
    status === 'error' && 'bg-basic-red-accent',
    status === 'pending' && 'bg-subtle border-darker',
  );

  const iconColor = status === 'pending' ? 'default' : undefined;

  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-full shrink-0 transition-opacity',
        INDICATOR_SIZE_MAP[size],
        bgClass,
        status !== 'pending' && 'text-white-default',
        clickable && 'group-hover/step:opacity-80',
      )}
    >
      {renderIconProp(displayIcon, { size: ICON_SIZE_MAP[size], color: iconColor })}
    </div>
  );
}


function DotIndicator({ status }: { status: StepStatus }) {
  const { color, clickable } = useContext(StepperContext);

  const isActive = status === 'active' || status === 'completed';

  const bgClass = cn(
    isActive && COLOR_BG_MAP[color],
    status === 'error' && 'bg-basic-red-accent',
    status === 'pending' && 'bg-subtle border-darker',
  );

  return (
    <div
      className={cn(
        'rounded-full shrink-0 transition-opacity',
        isActive || status === 'error'
          ? 'width-16 height-16'
          : 'width-10 height-10',
        bgClass,
        clickable && 'group-hover/step:opacity-80',
      )}
    />
  );
}


function ConnectorLine({
  filled,
  isLast,
}: {
  filled: boolean;
  isLast: boolean;
}) {
  const { orientation, color } = useContext(StepperContext);

  if (isLast) return null;

  if (orientation === 'vertical') {
    return (
      <div
        className="flex-1"
        style={{
          minHeight: 24,
          borderLeftWidth: filled ? 2 : 1,
          borderLeftStyle: 'solid',
          borderLeftColor: filled
            ? `var(--bg-basic-${color}-accent)`
            : 'var(--border-default)',
        }}
      />
    );
  }

  return (
    <div
      className="flex-1"
      style={{
        minWidth: 16,
        height: filled ? 2 : 1,
        backgroundColor: filled
          ? `var(--bg-basic-${color}-accent)`
          : 'var(--border-darker)',
      }}
    />
  );
}


function StepIndicator({
  index,
  status,
  icon,
}: {
  index: number;
  status: StepStatus;
  icon?: StepItem['icon'];
}) {
  const { indicatorType, clickable, onStepClick } = useContext(StepperContext);

  const handleClick = useCallback(() => {
    if (clickable) onStepClick?.(index);
  }, [clickable, onStepClick, index]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (clickable && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        onStepClick?.(index);
      }
    },
    [clickable, onStepClick, index],
  );

  let indicator: React.ReactNode;
  switch (indicatorType) {
    case 'icon':
      indicator = <IconIndicator status={status} icon={icon} />;
      break;
    case 'dot':
      indicator = <DotIndicator status={status} />;
      break;
    default:
      indicator = <NumberIndicator index={index} status={status} />;
  }

  if (!clickable) return <>{indicator}</>;

  return (
    <button
      type="button"
      className="cursor-pointer group/step"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={`Step ${index + 1}`}
    >
      {indicator}
    </button>
  );
}


function VerticalStepItem({
  step,
  index,
  status,
}: {
  step: StepItem;
  index: number;
  status: StepStatus;
}) {
  const { size, verticalAlign, totalSteps } =
    useContext(StepperContext);

  const isLast = index === totalSteps - 1;

  const indicatorColWidth =
    size === 'sm' ? 'width-24' : size === 'lg' ? 'width-40' : 'width-32';

  const indicatorColumn = (
    <div
      className={cn(
        'flex flex-col items-center',
        indicatorColWidth,
        'shrink-0',
      )}
    >
      <StepIndicator index={index} status={status} icon={step.icon} />
      <ConnectorLine filled={status === 'completed'} isLast={isLast} />
    </div>
  );

  const contentColumn = (
    <div className={cn('flex flex-col flex-1 ds-gap-2', 'padding-t-4')}>
      <div className="flex flex-col ds-gap-1">
        <div className="flex items-center ds-gap-4">
          <span
            className={cn(
              'font-body font-medium size-md line-height-leading-6',
              status === 'active' ? 'text-default' : 'text-subtle',
            )}
          >
            {step.label}
          </span>
          {step.supportText && (
            <span className="font-body size-sm line-height-leading-5 text-muted">
              {step.supportText}
            </span>
          )}
        </div>
        {step.caption && (
          <span className="font-body size-sm line-height-leading-5 text-muted">
            {step.caption}
          </span>
        )}
      </div>
      {step.children && status === 'active' && (
        <div className="padding-y-8">{step.children}</div>
      )}
    </div>
  );

  const isReversed = verticalAlign === 'right';

  return (
    <div
      role="listitem"
      aria-current={status === 'active' ? 'step' : undefined}
      className={cn(
        'flex',
        isReversed ? 'flex-row-reverse' : 'flex-row',
        'ds-gap-12',
      )}
    >
      {indicatorColumn}
      {contentColumn}
    </div>
  );
}


function HorizontalStepItem({
  step,
  index,
  status,
}: {
  step: StepItem;
  index: number;
  status: StepStatus;
}) {
  const {
    horizontalAlign,
    indicatorPosition,
    indicatorType,
    size,
    totalSteps,
  } = useContext(StepperContext);

  const isLast = index === totalSteps - 1;

  const textAlignClass =
    horizontalAlign === 'center'
      ? 'text-center items-center'
      : horizontalAlign === 'right'
        ? 'text-right items-end'
        : 'text-left items-start';

  const rowHeightClass =
    indicatorType === 'dot'
      ? 'height-16'
      : INDICATOR_SIZE_MAP[size].split(' ')[1];

  const indicatorRow = (
    <div className={cn('flex flex-row items-center w-full', rowHeightClass)}>
      {index > 0 && (
        <ConnectorLine filled={status === 'completed' || status === 'active'} isLast={false} />
      )}
      <StepIndicator index={index} status={status} icon={step.icon} />
      {!isLast && (
        <ConnectorLine filled={status === 'completed'} isLast={false} />
      )}
    </div>
  );

  const contentSection = (
    <div className={cn('flex flex-col ds-gap-1 padding-x-4', textAlignClass)}>
      <div className="flex flex-col ds-gap-1">
        <span
          className={cn(
            'font-body font-medium size-md line-height-leading-6',
            status === 'active' ? 'text-default' : 'text-subtle',
          )}
        >
          {step.label}
        </span>
        {step.supportText && (
          <span className="font-body size-sm line-height-leading-5 text-muted">
            {step.supportText}
          </span>
        )}
      </div>
      {step.caption && (
        <span className="font-body size-sm line-height-leading-5 text-muted">
          {step.caption}
        </span>
      )}
    </div>
  );

  const isBottom = indicatorPosition === 'bottom';

  return (
    <div
      role="listitem"
      aria-current={status === 'active' ? 'step' : undefined}
      className={cn(
        'flex flex-1',
        isBottom ? 'flex-col-reverse' : 'flex-col',
        'ds-gap-8',
      )}
    >
      {indicatorRow}
      {contentSection}
    </div>
  );
}


export const Stepper = forwardRef<HTMLDivElement, StepperProps>(
  (
    {
      steps,
      activeStep = 0,
      orientation = 'horizontal',
      indicatorType = 'number',
      size = 'md',
      color = 'blue',
      horizontalAlign = 'center',
      verticalAlign = 'left',
      indicatorPosition = 'top',
      clickable = false,
      onStepClick,
      showCheckOnCompleted = false,
      className,
      ...props
    },
    ref,
  ) => {
    const contextValue = useMemo<StepperContextValue>(() => ({
      orientation,
      indicatorType,
      size,
      color,
      horizontalAlign,
      verticalAlign,
      indicatorPosition,
      clickable,
      showCheckOnCompleted,
      onStepClick,
      totalSteps: steps.length,
    }), [orientation, indicatorType, size, color, horizontalAlign, verticalAlign, indicatorPosition, clickable, showCheckOnCompleted, onStepClick, steps.length]);

    return (
      <StepperContext.Provider value={contextValue}>
        <div
          ref={ref}
          role="list"
          aria-orientation={orientation}
          className={cn(
            'flex',
            orientation === 'vertical' ? 'flex-col' : 'flex-row',
            className,
          )}
          {...props}
        >
          {steps.map((step, index) => {
            const status = resolveStatus(index, activeStep, step);

            return orientation === 'vertical' ? (
              <VerticalStepItem
                key={index}
                step={step}
                index={index}
                status={status}
              />
            ) : (
              <HorizontalStepItem
                key={index}
                step={step}
                index={index}
                status={status}
              />
            );
          })}
        </div>
      </StepperContext.Provider>
    );
  },
);

Stepper.displayName = 'Stepper';
