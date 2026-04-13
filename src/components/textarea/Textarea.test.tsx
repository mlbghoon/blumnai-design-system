import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Textarea } from './Textarea';

describe('Textarea — character count accessibility', () => {
  it('announces count via aria-live="polite" in the no-toolbar branch', () => {
    const { container } = render(
      <Textarea showCount maxLength={100} defaultValue="hello" />,
    );
    const live = container.querySelector('[aria-live="polite"]');
    expect(live).not.toBeNull();
    expect(live?.textContent).toContain('5/100');
  });

  it('announces count via aria-live="polite" in the toolbar branch', () => {
    const { container } = render(
      <Textarea showCount maxLength={100} defaultValue="hi" showToolbar />,
    );
    const live = container.querySelector('[aria-live="polite"]');
    expect(live).not.toBeNull();
    expect(live?.textContent).toContain('2/100');
  });
});

describe('Textarea — height bounds with toolbar', () => {
  it('applies maxHeight when showToolbar + maxRows are both set (regression)', () => {
    const { container } = render(
      <Textarea showToolbar maxRows={6} minRows={3} defaultValue="hi" />,
    );
    const textarea = container.querySelector('textarea');
    expect(textarea).not.toBeNull();
    // Previously (pre-fix): maxHeight was dropped silently when toolbar present.
    // Post-fix: maxHeight equals maxRows * lineHeight(20) = 120px
    expect(textarea?.style.maxHeight).toBe('120px');
  });

  it('applies minHeight when showToolbar + minRows are both set (regression)', () => {
    const { container } = render(
      <Textarea showToolbar minRows={4} defaultValue="hi" />,
    );
    const textarea = container.querySelector('textarea');
    expect(textarea).not.toBeNull();
    // Previously (pre-fix): minHeight was dropped silently when toolbar present.
    // Post-fix: minHeight equals minRows * lineHeight(20) = 80px
    expect(textarea?.style.minHeight).toBe('80px');
  });

  it('still applies minHeight in the no-toolbar branch (existing behavior)', () => {
    const { container } = render(
      <Textarea minRows={2} defaultValue="hi" />,
    );
    const textarea = container.querySelector('textarea');
    expect(textarea).not.toBeNull();
    expect(textarea?.style.minHeight).toBe('40px');
  });
});
