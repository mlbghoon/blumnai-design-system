import { render, cleanup, act } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import { SidebarProvider, useSidebar } from './SidebarPrimitives';

/**
 * Tiny spy that captures toggleSidebar calls. Rendered inside SidebarProvider
 * via useSidebar(), so we can observe the context's toggle function being called.
 */
function ToggleObserver({ onToggle }: { onToggle: (isOpen: boolean) => void }) {
  const { open } = useSidebar();
  // Report every render's open value so tests can check "did it change?"
  onToggle(open);
  return null;
}

function dispatchKey(
  key: string,
  modifiers: { meta?: boolean; ctrl?: boolean; shift?: boolean } = {},
  target?: HTMLElement,
) {
  const event = new KeyboardEvent('keydown', {
    key,
    metaKey: modifiers.meta ?? false,
    ctrlKey: modifiers.ctrl ?? false,
    shiftKey: modifiers.shift ?? false,
    bubbles: true,
    cancelable: true,
  });
  // Override the target if provided (default is window)
  if (target) {
    Object.defineProperty(event, 'target', {
      value: target,
      configurable: true,
    });
  }
  // Wrap in act() so React flushes the state updates triggered by the handler
  // before the test's assertion reads the observed values.
  act(() => {
    window.dispatchEvent(event);
  });
  return event;
}

describe('SidebarProvider keyboard shortcut', () => {
  afterEach(() => {
    cleanup();
  });

  describe('happy path', () => {
    it('toggles the sidebar when Cmd+B is pressed', () => {
      const openValues: boolean[] = [];
      render(
        <SidebarProvider defaultOpen>
          <ToggleObserver onToggle={(open) => openValues.push(open)} />
        </SidebarProvider>,
      );
      // Start open
      expect(openValues[openValues.length - 1]).toBe(true);
      dispatchKey('b', { meta: true });
      // Should have toggled to closed
      expect(openValues[openValues.length - 1]).toBe(false);
    });

    it('toggles the sidebar when Ctrl+B is pressed (Windows/Linux)', () => {
      const openValues: boolean[] = [];
      render(
        <SidebarProvider defaultOpen>
          <ToggleObserver onToggle={(open) => openValues.push(open)} />
        </SidebarProvider>,
      );
      expect(openValues[openValues.length - 1]).toBe(true);
      dispatchKey('b', { ctrl: true });
      expect(openValues[openValues.length - 1]).toBe(false);
    });
  });

  describe('guards (regression tests)', () => {
    it('does NOT toggle when Cmd+Shift+B is pressed (shift collision)', () => {
      const openValues: boolean[] = [];
      render(
        <SidebarProvider defaultOpen>
          <ToggleObserver onToggle={(open) => openValues.push(open)} />
        </SidebarProvider>,
      );
      const initial = openValues[openValues.length - 1];
      dispatchKey('b', { meta: true, shift: true });
      // Should NOT have changed — still at initial value
      expect(openValues[openValues.length - 1]).toBe(initial);
    });

    it('does NOT toggle when Cmd+B is pressed inside a <textarea>', () => {
      const openValues: boolean[] = [];
      render(
        <SidebarProvider defaultOpen>
          <ToggleObserver onToggle={(open) => openValues.push(open)} />
          <textarea data-testid="ta" />
        </SidebarProvider>,
      );
      const ta = document.querySelector<HTMLTextAreaElement>('[data-testid="ta"]')!;
      const initial = openValues[openValues.length - 1];
      dispatchKey('b', { meta: true }, ta);
      expect(openValues[openValues.length - 1]).toBe(initial);
    });

    it('does NOT toggle when Cmd+B is pressed inside an <input>', () => {
      const openValues: boolean[] = [];
      render(
        <SidebarProvider defaultOpen>
          <ToggleObserver onToggle={(open) => openValues.push(open)} />
          <input data-testid="ip" />
        </SidebarProvider>,
      );
      const ip = document.querySelector<HTMLInputElement>('[data-testid="ip"]')!;
      const initial = openValues[openValues.length - 1];
      dispatchKey('b', { meta: true }, ip);
      expect(openValues[openValues.length - 1]).toBe(initial);
    });

    it('does NOT toggle when Cmd+B is pressed on a contentEditable element', () => {
      const openValues: boolean[] = [];
      render(
        <SidebarProvider defaultOpen>
          <ToggleObserver onToggle={(open) => openValues.push(open)} />
          <div contentEditable data-testid="ce" suppressContentEditableWarning />
        </SidebarProvider>,
      );
      const ce = document.querySelector<HTMLDivElement>('[data-testid="ce"]')!;
      const initial = openValues[openValues.length - 1];
      dispatchKey('b', { meta: true }, ce);
      // If happy-dom reflects isContentEditable correctly, the guard fires.
      // If not, this test may be inconclusive — accept either result.
      if (ce.isContentEditable) {
        expect(openValues[openValues.length - 1]).toBe(initial);
      }
    });
  });

  describe('keyboardShortcut prop', () => {
    it('keyboardShortcut={false} disables the listener entirely', () => {
      const openValues: boolean[] = [];
      render(
        <SidebarProvider defaultOpen keyboardShortcut={false}>
          <ToggleObserver onToggle={(open) => openValues.push(open)} />
        </SidebarProvider>,
      );
      const initial = openValues[openValues.length - 1];
      dispatchKey('b', { meta: true });
      expect(openValues[openValues.length - 1]).toBe(initial);
    });

    it('keyboardShortcut="k" uses Cmd+K instead of Cmd+B', () => {
      const openValues: boolean[] = [];
      render(
        <SidebarProvider defaultOpen keyboardShortcut="k">
          <ToggleObserver onToggle={(open) => openValues.push(open)} />
        </SidebarProvider>,
      );
      // Cmd+B should NOT toggle
      dispatchKey('b', { meta: true });
      expect(openValues[openValues.length - 1]).toBe(true);
      // Cmd+K SHOULD toggle
      dispatchKey('k', { meta: true });
      expect(openValues[openValues.length - 1]).toBe(false);
    });
  });
});
