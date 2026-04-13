import { describe, it, expect } from 'vitest';
import { resolveCaption } from './resolveCaption';

describe('resolveCaption', () => {
  it('returns all false/undefined when no args', () => {
    const result = resolveCaption();
    expect(result).toEqual({ hasError: false, hasSuccess: false, captionText: undefined, showCaption: false });
  });

  it('detects error from boolean true', () => {
    const result = resolveCaption(true);
    expect(result.hasError).toBe(true);
    expect(result.hasSuccess).toBe(false);
    expect(result.showCaption).toBe(false);
  });

  it('detects error from non-empty string', () => {
    const result = resolveCaption('에러 메시지');
    expect(result.hasError).toBe(true);
    expect(result.captionText).toBe('에러 메시지');
    expect(result.showCaption).toBe(true);
  });

  it('detects success from boolean true', () => {
    const result = resolveCaption(false, true);
    expect(result.hasError).toBe(false);
    expect(result.hasSuccess).toBe(true);
    expect(result.showCaption).toBe(false);
  });

  it('detects success from non-empty string', () => {
    const result = resolveCaption(false, '성공');
    expect(result.hasSuccess).toBe(true);
    expect(result.captionText).toBe('성공');
    expect(result.showCaption).toBe(true);
  });

  it('shows caption when only caption is provided', () => {
    const result = resolveCaption(false, false, '도움말');
    expect(result.hasError).toBe(false);
    expect(result.hasSuccess).toBe(false);
    expect(result.captionText).toBe('도움말');
    expect(result.showCaption).toBe(true);
  });

  it('error string takes priority over success string and caption', () => {
    const result = resolveCaption('에러', '성공', '도움말');
    expect(result.hasError).toBe(true);
    expect(result.hasSuccess).toBe(true);
    expect(result.captionText).toBe('에러');
  });

  it('success string takes priority over caption', () => {
    const result = resolveCaption(false, '성공', '도움말');
    expect(result.captionText).toBe('성공');
  });

  it('error boolean true with caption shows caption in error style', () => {
    const result = resolveCaption(true, false, '도움말');
    expect(result.hasError).toBe(true);
    expect(result.captionText).toBe('도움말');
    expect(result.showCaption).toBe(true);
  });

  it('treats empty string error as no error', () => {
    const result = resolveCaption('');
    expect(result.hasError).toBe(false);
    expect(result.showCaption).toBe(false);
  });
});
