import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '@/lib/utils';

interface SliderThumbProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Thumb> {
  disabled?: boolean;
  showTooltip?: boolean;
  tooltipValue?: string;
}

const SliderThumb = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Thumb>,
  SliderThumbProps
>(({ className, disabled, showTooltip, tooltipValue, ...props }, ref) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);

  const showValue = showTooltip && (isHovered || isFocused) && tooltipValue;

  return (
    <SliderPrimitive.Thumb
      ref={ref}
      className={cn(
        'relative block width-16 height-16 rounded-full',
        'focus-visible:outline-none',
        'transition-colors',
        disabled
          ? 'bg-subtle border-default cursor-not-allowed'
          : 'bg-card border-darker cursor-grab active:cursor-grabbing',
        !disabled && 'slider-thumb-shadow',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      {...props}
    >
      {showValue && (
        <div
          className={cn(
            'absolute left-1/2 -translate-x-1/2 bottom-full margin-b-4',
            'bg-inverted rounded-xs',
            'padding-x-4 padding-y-2',
            'font-body size-xs font-medium text-inverted-default',
            'whitespace-nowrap',
            'pointer-events-none'
          )}
        >
          {tooltipValue}
        </div>
      )}
    </SliderPrimitive.Thumb>
  );
});

SliderThumb.displayName = 'SliderThumb';

export { SliderThumb };
