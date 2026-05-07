import { render, waitFor } from '@testing-library/react';
import type { ReactElement } from 'react';

/**
 * Pre-load `@remixicon/react` AND warm up the DS registry cache. Use in a `beforeAll`.
 *
 * Calls `preloadIconCategory` so the registry's internal `remixiconModule` cache is populated.
 * Without this, the very first dynamic-string `<Icon iconType=...>` render in a test will
 * still hit the lazy/Suspense fallback because the registry only learns about the loaded
 * module after the first lazy resolution settles.
 */
export async function preloadRemixicon(): Promise<void> {
  const registry = await import('../ui-icon-registry');
  // Trigger the registry's lazy import. Then wait one microtask cycle for promise to resolve.
  registry.preloadIconCategory('system');
  await import('@remixicon/react');
  // One more microtask to ensure the registry's `remixiconModule` global is populated.
  await new Promise((resolve) => setTimeout(resolve, 0));
}

/**
 * Render an `<Icon>` and wait for the SVG to appear (or the fallback `<div>` for unknown icons).
 *
 * For the dynamic-string API, the `@remixicon/react` chunk must be loaded. Call
 * `preloadRemixicon()` in `beforeAll` of test suites that exercise this path.
 *
 * The helper waits up to the test timeout for either:
 *   - `<svg>` element present (icon resolved and rendered)
 *   - fallback `<div style="display: inline-block">` (unknown icon — also a stable render state)
 */
export async function renderIconAndWait(ui: ReactElement) {
  const result = render(ui);
  await waitFor(() => {
    const root = result.container;
    if (root.querySelector('svg')) return;
    if (root.querySelector('div[style*="display: inline-block"]')) return;
    throw new Error('Icon not yet rendered');
  });
  return result;
}
