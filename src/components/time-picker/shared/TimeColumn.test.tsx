import { render } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { TimeColumn } from './TimeColumn';

const SAMPLE_ITEMS = Array.from({ length: 24 }, (_, i) => ({
  value: i,
  label: String(i).padStart(2, '0'),
}));

describe('TimeColumn — scroll behavior', () => {
  let scrollIntoViewSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    // Ensure scrollIntoView exists on the prototype so spyOn can install a spy
    // (happy-dom may not define it by default).
    if (typeof Element.prototype.scrollIntoView !== 'function') {
      Element.prototype.scrollIntoView = function noop() {};
    }
    scrollIntoViewSpy = vi.spyOn(Element.prototype, 'scrollIntoView');
  });

  afterEach(() => {
    scrollIntoViewSpy.mockRestore();
  });

  it('does NOT call Element.prototype.scrollIntoView (regression for page-jump bug)', async () => {
    render(
      <TimeColumn
        label="Hour"
        items={SAMPLE_ITEMS}
        selectedValue={12}
        onSelect={() => {}}
      />,
    );
    // requestAnimationFrame fires asynchronously in jsdom/happy-dom. Wait a tick.
    await new Promise((resolve) => setTimeout(resolve, 20));
    expect(scrollIntoViewSpy).not.toHaveBeenCalled();
  });

  it('renders without throwing when a selectedValue is provided', () => {
    expect(() =>
      render(
        <TimeColumn
          label="Minute"
          items={SAMPLE_ITEMS}
          selectedValue={30}
          onSelect={() => {}}
        />,
      ),
    ).not.toThrow();
  });

  it('renders without throwing when selectedValue is undefined (no effect runs)', () => {
    expect(() =>
      render(
        <TimeColumn
          label="Hour"
          items={SAMPLE_ITEMS}
          selectedValue={undefined}
          onSelect={() => {}}
        />,
      ),
    ).not.toThrow();
  });
});
