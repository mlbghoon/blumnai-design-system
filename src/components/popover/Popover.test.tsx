import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Popover, PopoverTrigger, PopoverContent } from './Popover';
import { getAnimationClasses } from './Popover.animations';
import type { PopoverAnimation } from './Popover.types';

describe('getAnimationClasses', () => {
  it('returns empty string for "none"', () => {
    expect(getAnimationClasses('none')).toBe('');
  });

  it('returns fade + zoom + directional slide for "default"', () => {
    const classes = getAnimationClasses('default');
    expect(classes).toContain('fade-in-0');
    expect(classes).toContain('fade-out-0');
    expect(classes).toContain('zoom-in-95');
    expect(classes).toContain('zoom-out-95');
    expect(classes).toContain('slide-in-from-top-[8px]');
  });

  it('returns fade only for "fade"', () => {
    const classes = getAnimationClasses('fade');
    expect(classes).toContain('fade-in-0');
    expect(classes).toContain('fade-out-0');
    expect(classes).not.toContain('zoom');
    expect(classes).not.toContain('slide');
  });

  it('returns fade + strong zoom for "scale"', () => {
    const classes = getAnimationClasses('scale');
    expect(classes).toContain('fade-in-0');
    expect(classes).toContain('zoom-in-80');
    expect(classes).toContain('zoom-out-80');
    expect(classes).not.toContain('slide');
  });

  it('returns custom expand class for "slide"', () => {
    const classes = getAnimationClasses('slide');
    expect(classes).toBe('popover-anim-slide');
    expect(classes).not.toContain('animate-in');
  });

  it('includes animate-in/animate-out base for tw-animate presets', () => {
    const presets: PopoverAnimation[] = ['default', 'fade', 'scale'];
    for (const preset of presets) {
      const classes = getAnimationClasses(preset);
      expect(classes).toContain('data-[state=open]:animate-in');
      expect(classes).toContain('data-[state=closed]:animate-out');
    }
  });
});

describe('PopoverContent', () => {
  const renderPopover = (contentProps: Record<string, unknown> = {}) => {
    render(
      <Popover defaultOpen>
        <PopoverTrigger>열기</PopoverTrigger>
        <PopoverContent {...contentProps}>
          <p>콘텐츠</p>
        </PopoverContent>
      </Popover>,
    );
  };

  it('renders with default animation classes', () => {
    renderPopover();
    const content = screen.getByText('콘텐츠').closest('[data-radix-popper-content-wrapper] > *')!;
    expect(content.className).toContain('fade-in-0');
    expect(content.className).toContain('zoom-in-95');
  });

  it('renders with no animation classes when animation="none"', () => {
    renderPopover({ animation: 'none' });
    const content = screen.getByText('콘텐츠').closest('[data-radix-popper-content-wrapper] > *')!;
    expect(content.className).not.toContain('animate-in');
    expect(content.className).not.toContain('fade-in-0');
  });

  it('applies animationDuration as inline style for fade preset', () => {
    renderPopover({ animation: 'fade', animationDuration: 400 });
    const content = screen.getByText('콘텐츠').closest('[data-radix-popper-content-wrapper] > *') as HTMLElement;
    expect(content.style.animationDuration).toBe('400ms');
  });

  it('does not apply animationDuration when animation="none"', () => {
    renderPopover({ animation: 'none', animationDuration: 400 });
    const content = screen.getByText('콘텐츠').closest('[data-radix-popper-content-wrapper] > *') as HTMLElement;
    expect(content.style.animationDuration).toBe('');
  });
});
