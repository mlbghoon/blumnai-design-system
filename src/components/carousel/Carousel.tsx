/* eslint-disable react-refresh/only-export-components */
'use client';

import * as React from 'react';
import useEmblaCarousel from 'embla-carousel-react';

import { cn } from '../../lib/utils';
import { ControlButton } from '../button/ControlButton';

import type {
  CarouselApi,
  CarouselProps,
  CarouselContentProps,
  CarouselItemProps,
  CarouselNavProps,
  CarouselIndicatorsProps,
  CarouselContextProps,
} from './Carousel.types';

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

export function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />');
  }
  return context;
}

export const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      orientation = 'horizontal',
      opts,
      setApi,
      plugins,
      gap = 16,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === 'horizontal' ? 'x' : 'y',
      },
      plugins
    );
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);

    const onSelect = React.useCallback((emblaApi: CarouselApi) => {
      if (!emblaApi) return;
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    }, []);

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev();
    }, [api]);

    const scrollNext = React.useCallback(() => {
      api?.scrollNext();
    }, [api]);

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === 'ArrowRight') {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext]
    );

    React.useEffect(() => {
      if (api && setApi) {
        setApi(api);
      }
    }, [api, setApi]);

    React.useEffect(() => {
      if (!api) return;

      onSelect(api);
      api.on('reInit', onSelect);
      api.on('select', onSelect);

      return () => {
        api.off('select', onSelect);
      };
    }, [api, onSelect]);

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api,
          opts,
          orientation:
            orientation || (opts?.axis === 'y' ? 'vertical' : 'horizontal'),
          gap,
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn('relative', className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  }
);
Carousel.displayName = 'Carousel';

export const CarouselContent = React.forwardRef<
  HTMLDivElement,
  CarouselContentProps
>(({ className, style, ...props }, ref) => {
  const { carouselRef, orientation, gap } = useCarousel();

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          'flex',
          orientation === 'horizontal' ? 'flex-row' : 'flex-col',
          className
        )}
        style={{ gap, ...style }}
        {...props}
      />
    </div>
  );
});
CarouselContent.displayName = 'CarouselContent';

export const CarouselViewport = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('relative', className)} {...props} />
));
CarouselViewport.displayName = 'CarouselViewport';

export const CarouselItem = React.forwardRef<HTMLDivElement, CarouselItemProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn('min-w-0 shrink-0 grow-0 basis-full', className)}
      {...props}
    />
  )
);
CarouselItem.displayName = 'CarouselItem';

export const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  CarouselNavProps
>(({ className, style, ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev, opts } = useCarousel();
  const isDisabled = opts?.loop ? false : !canScrollPrev;

  const positionStyle = orientation === 'horizontal'
    ? { left: -20, top: '50%', transform: 'translateY(-50%)' }
    : { top: -20, left: '50%', transform: 'translateX(-50%) rotate(90deg)' };

  return (
    <ControlButton
      ref={ref}
      icon={['arrows', 'arrow-left']}
      shape="circle"
      size="lg"
      disabled={isDisabled}
      onClick={scrollPrev}
      aria-label="Previous slide"
      className={cn('absolute', className)}
      style={{ ...positionStyle, ...style }}
      {...props}
    />
  );
});
CarouselPrevious.displayName = 'CarouselPrevious';

export const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  CarouselNavProps
>(({ className, style, ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext, opts } = useCarousel();
  const isDisabled = opts?.loop ? false : !canScrollNext;

  const positionStyle = orientation === 'horizontal'
    ? { right: -20, top: '50%', transform: 'translateY(-50%)' }
    : { bottom: -20, left: '50%', transform: 'translateX(-50%) rotate(90deg)' };

  return (
    <ControlButton
      ref={ref}
      icon={['arrows', 'arrow-right']}
      shape="circle"
      size="lg"
      disabled={isDisabled}
      onClick={scrollNext}
      aria-label="Next slide"
      className={cn('absolute', className)}
      style={{ ...positionStyle, ...style }}
      {...props}
    />
  );
});
CarouselNext.displayName = 'CarouselNext';

export const CarouselIndicators = React.forwardRef<
  HTMLDivElement,
  CarouselIndicatorsProps
>(({ className, variant = 'dot', ...props }, ref) => {
  const { api } = useCarousel();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);

  React.useEffect(() => {
    if (!api) return;

    setScrollSnaps(api.scrollSnapList());

    const onSelect = () => {
      setSelectedIndex(api.selectedScrollSnap());
    };

    api.on('select', onSelect);
    onSelect();

    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  if (variant === 'dot') {
    return (
      <div
        ref={ref}
        className={cn('flex items-center justify-center gap-8', className)}
        {...props}
      >
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            type="button"
            className={cn(
              'width-10 height-10 rounded-full transition-colors cursor-pointer',
              index === selectedIndex
                ? 'bg-state-primary'
                : 'bg-state-soft hover:bg-state-soft-hover'
            )}
            onClick={() => api?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === selectedIndex ? 'true' : undefined}
          />
        ))}
      </div>
    );
  }

  if (variant === 'line') {
    return (
      <div
        ref={ref}
        className={cn('flex items-center justify-center gap-4', className)}
        {...props}
      >
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            type="button"
            className={cn(
              'height-4 rounded-full transition-all cursor-pointer',
              index === selectedIndex
                ? 'width-24 bg-state-primary'
                : 'width-16 bg-state-soft hover:bg-state-soft-hover'
            )}
            onClick={() => api?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === selectedIndex ? 'true' : undefined}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={cn(
        'flex items-center justify-center gap-4 font-body size-sm',
        className
      )}
      {...props}
    >
      <span className="text-default font-medium">{selectedIndex + 1}</span>
      <span className="text-muted">/</span>
      <span className="text-muted">{scrollSnaps.length}</span>
    </div>
  );
});
CarouselIndicators.displayName = 'CarouselIndicators';
