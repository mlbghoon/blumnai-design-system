import { describe, it, expect, vi, beforeAll } from 'vitest';
import { fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RiCheckLine, RiCheckFill, RiAddLine } from '@remixicon/react';

import { Icon } from '../Icon';
import { renderIconAndWait, preloadRemixicon } from './test-utils';

beforeAll(async () => {
  // Pre-load @remixicon/react so dynamic-string registry lookup is sync from the first test.
  await preloadRemixicon();
});

describe('<Icon> — dynamic-string API (back-compat)', () => {
  it('renders with iconType tuple', async () => {
    const { container } = await renderIconAndWait(
      <Icon iconType={['system', 'check']} size={24} />
    );
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it('renders fill variant when isFill=true', async () => {
    const { container } = await renderIconAndWait(
      <Icon iconType={['system', 'check']} isFill size={24} />
    );
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it('renders fallback for unknown iconType', async () => {
    const { container } = await renderIconAndWait(
      <Icon iconType={['system', 'definitely-not-an-icon-name'] as never} size={24} />
    );
    expect(container.querySelector('svg')).toBeFalsy();
    const fallback = container.querySelector('div[style*="display: inline-block"]');
    expect(fallback).toBeTruthy();
  });

  it('passes size to underlying component', async () => {
    const { container } = await renderIconAndWait(
      <Icon iconType={['system', 'check']} size={48} />
    );
    const svg = container.querySelector('svg');
    expect(svg).toBeTruthy();
    expect(svg?.getAttribute('width')).toBe('48');
    expect(svg?.getAttribute('height')).toBe('48');
  });

  it('resolves color tokens to CSS vars (passed as svg fill)', async () => {
    const { container } = await renderIconAndWait(
      <Icon iconType={['system', 'check']} color="default" />
    );
    const svg = container.querySelector('svg');
    // Remixicon components apply `color` as the SVG `fill` attribute.
    expect(svg?.getAttribute('fill')).toBe('var(--icon-default)');
  });

  it('passes raw CSS color through unchanged', async () => {
    const { container } = await renderIconAndWait(
      <Icon iconType={['system', 'check']} color="#FF0000" />
    );
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('fill')).toBe('#FF0000');
  });
});

describe('<Icon> — direct-import API', () => {
  it('renders with icon prop (RiCheckLine)', async () => {
    const { container } = await renderIconAndWait(<Icon icon={RiCheckLine} size={24} />);
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it('renders fill variant when icon={RiCheckFill}', async () => {
    const { container } = await renderIconAndWait(<Icon icon={RiCheckFill} size={24} />);
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it('renders synchronously (no Suspense fallback) since icon prop is the component itself', async () => {
    const { container } = await renderIconAndWait(<Icon icon={RiAddLine} />);
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it('passes size to direct-import component', async () => {
    const { container } = await renderIconAndWait(<Icon icon={RiCheckLine} size={32} />);
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('width')).toBe('32');
  });

  it('resolves color tokens for direct-import path too', async () => {
    const { container } = await renderIconAndWait(
      <Icon icon={RiCheckLine} color="success" />
    );
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('fill')).toBe('var(--icon-success)');
  });

  it('forwards arbitrary CSS color', async () => {
    const { container } = await renderIconAndWait(
      <Icon icon={RiCheckLine} color="#00FF00" />
    );
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('fill')).toBe('#00FF00');
  });
});

describe('<Icon> — shared behavior', () => {
  it('handles onClick when not disabled (iconType)', async () => {
    const onClick = vi.fn();
    const { container } = await renderIconAndWait(
      <Icon iconType={['system', 'check']} onClick={onClick} />
    );
    const svg = container.querySelector('svg');
    expect(svg).toBeTruthy();
    if (svg) await userEvent.click(svg);
    expect(onClick).toHaveBeenCalled();
  });

  it('handles onClick when not disabled (icon prop)', async () => {
    const onClick = vi.fn();
    const { container } = await renderIconAndWait(
      <Icon icon={RiCheckLine} onClick={onClick} />
    );
    const svg = container.querySelector('svg');
    expect(svg).toBeTruthy();
    if (svg) await userEvent.click(svg);
    expect(onClick).toHaveBeenCalled();
  });

  it('disabled icon does NOT pass onClick to underlying component (iconType)', async () => {
    const onClick = vi.fn();
    const { container } = await renderIconAndWait(
      <Icon iconType={['system', 'check']} onClick={onClick} disabled />
    );
    const svg = container.querySelector('svg');
    // Use fireEvent to bypass userEvent's pointer-events:none check.
    // Even if a click reaches the SVG, the handler should NOT have been wired up.
    if (svg) fireEvent.click(svg);
    expect(onClick).not.toHaveBeenCalled();
    // Also verify pointer-events:none is set as a defense-in-depth.
    const style = svg?.getAttribute('style') ?? '';
    expect(style).toContain('pointer-events: none');
  });

  it('disabled icon does NOT pass onClick to underlying component (icon prop)', async () => {
    const onClick = vi.fn();
    const { container } = await renderIconAndWait(
      <Icon icon={RiCheckLine} onClick={onClick} disabled />
    );
    const svg = container.querySelector('svg');
    if (svg) fireEvent.click(svg);
    expect(onClick).not.toHaveBeenCalled();
    const style = svg?.getAttribute('style') ?? '';
    expect(style).toContain('pointer-events: none');
  });

  it('forwards className', async () => {
    const { container } = await renderIconAndWait(
      <Icon icon={RiCheckLine} className="custom-class" />
    );
    expect(container.querySelector('svg.custom-class')).toBeTruthy();
  });
});

describe('<Icon> — DS-specific props must not leak to DOM (regression)', () => {
  it('does NOT forward iconType to the underlying svg', async () => {
    const { container } = await renderIconAndWait(
      <Icon iconType={['system', 'check']} size={24} />
    );
    const svg = container.querySelector('svg');
    expect(svg).toBeTruthy();
    // Critical: iconType must NOT appear as an attribute on the rendered SVG.
    expect(svg?.hasAttribute('iconType')).toBe(false);
    expect(svg?.hasAttribute('icontype')).toBe(false);
  });

  it('does NOT forward isFill to the underlying svg', async () => {
    const { container } = await renderIconAndWait(
      <Icon iconType={['system', 'check']} isFill size={24} />
    );
    const svg = container.querySelector('svg');
    expect(svg?.hasAttribute('isFill')).toBe(false);
    expect(svg?.hasAttribute('isfill')).toBe(false);
  });

  it('does NOT forward icon (component reference) to the underlying svg', async () => {
    const { container } = await renderIconAndWait(<Icon icon={RiCheckLine} />);
    const svg = container.querySelector('svg');
    expect(svg?.hasAttribute('icon')).toBe(false);
  });

  it('does NOT forward disabled to the underlying svg', async () => {
    const { container } = await renderIconAndWait(<Icon icon={RiCheckLine} disabled />);
    const svg = container.querySelector('svg');
    // `disabled` is not a valid SVG attribute. Should not appear.
    expect(svg?.hasAttribute('disabled')).toBe(false);
  });
});

describe('<Icon> — Phase 0 alias (font-sans)', () => {
  it('aliases font-sans to RiFontSansSerif (Phase 0 audit decision)', async () => {
    const { container } = await renderIconAndWait(
      <Icon iconType={['editor', 'font-sans']} size={24} />
    );
    expect(container.querySelector('svg')).toBeTruthy();
  });
});
