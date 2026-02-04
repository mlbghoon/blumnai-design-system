import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '@/lib/utils';
import type { SliderColor } from '../Slider.types';

interface SliderTrackProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Track> {
  children?: React.ReactNode;
}

const SliderTrack = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Track>,
  SliderTrackProps
>(({ className, children, ...props }, ref) => {
  return (
    <SliderPrimitive.Track
      ref={ref}
      className={cn(
        'relative w-full h-[4px] grow rounded-full bg-basic-gray-alpha-10',
        className
      )}
      {...props}
    >
      {children}
    </SliderPrimitive.Track>
  );
});

SliderTrack.displayName = 'SliderTrack';

const RANGE_COLOR_MAP: Record<SliderColor, string> = {
  gray: 'bg-basic-gray-accent',
  brand: 'bg-state-brand',
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

interface SliderRangeFilledProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Range> {
  color?: SliderColor;
}

const SliderRangeFilled = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Range>,
  SliderRangeFilledProps
>(({ className, color = 'gray', ...props }, ref) => {
  return (
    <SliderPrimitive.Range
      ref={ref}
      className={cn('absolute h-full', RANGE_COLOR_MAP[color], className)}
      {...props}
    />
  );
});

SliderRangeFilled.displayName = 'SliderRangeFilled';

export { SliderTrack, SliderRangeFilled, RANGE_COLOR_MAP };
