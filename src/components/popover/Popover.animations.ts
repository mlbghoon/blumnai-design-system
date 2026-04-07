import { cn } from '@/lib/utils';
import type { PopoverAnimation } from './Popover.types';

const ANIMATION_BASE = 'data-[state=open]:animate-in data-[state=closed]:animate-out';

const DEFAULT_SLIDE =
  'data-[side=bottom]:slide-in-from-top-[8px] data-[side=left]:slide-in-from-right-[8px] data-[side=right]:slide-in-from-left-[8px] data-[side=top]:slide-in-from-bottom-[8px]';

const ANIMATION_PRESETS: Record<
  Exclude<PopoverAnimation, 'none'>,
  string
> = {
  default: cn(
    ANIMATION_BASE,
    'data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
    'data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
    DEFAULT_SLIDE,
  ),
  fade: cn(
    ANIMATION_BASE,
    'data-[state=open]:fade-in-0',
    'data-[state=closed]:fade-out-0',
  ),
  scale: cn(
    ANIMATION_BASE,
    'data-[state=open]:fade-in-0 data-[state=open]:zoom-in-80',
    'data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-80',
  ),
  slide: 'popover-anim-slide',
};

export function getAnimationClasses(animation: PopoverAnimation): string {
  if (animation === 'none') return '';
  return ANIMATION_PRESETS[animation];
}
