import { createRef, useRef } from 'react';
import type { MutableRefObject } from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { composeRefs } from './compose-refs';

describe('composeRefs', () => {
  it('calls callback refs with the node', () => {
    const cb1 = vi.fn();
    const cb2 = vi.fn();
    const node = document.createElement('div');

    const merged = composeRefs<HTMLDivElement>(cb1, cb2);
    merged(node);

    expect(cb1).toHaveBeenCalledWith(node);
    expect(cb2).toHaveBeenCalledWith(node);
  });

  it('sets .current on object refs', () => {
    const ref1 = createRef<HTMLDivElement>();
    const ref2 = createRef<HTMLDivElement>();
    const node = document.createElement('div');

    const merged = composeRefs<HTMLDivElement>(ref1, ref2);
    merged(node);

    expect(ref1.current).toBe(node);
    expect(ref2.current).toBe(node);
  });

  it('handles a mix of callback and object refs', () => {
    const cb = vi.fn();
    const obj = createRef<HTMLSpanElement>();
    const node = document.createElement('span');

    const merged = composeRefs<HTMLSpanElement>(cb, obj);
    merged(node);

    expect(cb).toHaveBeenCalledWith(node);
    expect(obj.current).toBe(node);
  });

  it('tolerates undefined refs in the list', () => {
    const cb = vi.fn();
    const node = document.createElement('div');

    const merged = composeRefs<HTMLDivElement>(undefined, cb, undefined);
    expect(() => merged(node)).not.toThrow();
    expect(cb).toHaveBeenCalledWith(node);
  });

  it('tolerates null refs in the list', () => {
    const cb = vi.fn();
    const node = document.createElement('div');

    const merged = composeRefs<HTMLDivElement>(null, cb, null);
    expect(() => merged(node)).not.toThrow();
    expect(cb).toHaveBeenCalledWith(node);
  });

  it('tolerates an empty rest-args list (no-op, no crash)', () => {
    const merged = composeRefs<HTMLDivElement>();
    expect(() => merged(document.createElement('div'))).not.toThrow();
    expect(() => merged(null)).not.toThrow();
  });

  it('handles React node→null→node re-registration cycle during mount/unmount', () => {
    const cb = vi.fn();
    const obj: MutableRefObject<HTMLDivElement | null> = { current: null };

    // A component that mounts a div with a composed ref, then unmounts it.
    const Mounted = () => {
      const localRef = useRef<HTMLDivElement>(null);
      return <div ref={composeRefs<HTMLDivElement>(cb, obj, localRef)} data-testid="node" />;
    };

    const { unmount, getByTestId } = render(<Mounted />);
    const node = getByTestId('node');

    // After mount: all three refs saw the node
    expect(cb).toHaveBeenCalledWith(node);
    expect(obj.current).toBe(node);

    // After unmount: refs should have been called with null (React's cleanup contract)
    unmount();
    expect(cb).toHaveBeenLastCalledWith(null);
    expect(obj.current).toBeNull();
  });
});
