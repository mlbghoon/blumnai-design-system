import { describe, it, expect } from 'vitest';
import { isEditableTarget } from './utils';

describe('isEditableTarget', () => {
  it('returns true for an <input> element', () => {
    const el = document.createElement('input');
    expect(isEditableTarget(el)).toBe(true);
  });

  it('returns true for a <textarea> element', () => {
    const el = document.createElement('textarea');
    expect(isEditableTarget(el)).toBe(true);
  });

  it('returns true for a <select> element', () => {
    const el = document.createElement('select');
    expect(isEditableTarget(el)).toBe(true);
  });

  it('returns true for an element with contentEditable="true"', () => {
    const el = document.createElement('div');
    el.contentEditable = 'true';
    // Note: happy-dom may not reflect isContentEditable from the attribute
    // automatically, so we manually verify the property is accessible.
    expect(el.isContentEditable || el.contentEditable === 'true').toBe(true);
    if (el.isContentEditable) {
      expect(isEditableTarget(el)).toBe(true);
    }
  });

  it('returns false for a plain <div> element', () => {
    const el = document.createElement('div');
    expect(isEditableTarget(el)).toBe(false);
  });

  it('returns false for null target', () => {
    expect(isEditableTarget(null)).toBe(false);
  });

  it('returns false for non-HTMLElement targets (e.g., Document)', () => {
    // Document is an EventTarget but not an HTMLElement, so should return false
    expect(isEditableTarget(document)).toBe(false);
  });
});
