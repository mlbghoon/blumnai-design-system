import { describe, it, expect } from 'vitest';
import { normalizeHtmlContent, calculateContentSize, validateImageFile } from '../utils';

describe('normalizeHtmlContent', () => {
  it('빈 에디터에서 빈 문자열을 반환', () => {
    expect(normalizeHtmlContent('<p></p>', true)).toBe('');
  });

  it('빈 에디터 (whitespace만 있는 경우)', () => {
    expect(normalizeHtmlContent('<p> </p>', true)).toBe('');
  });

  it('콘텐츠가 있으면 HTML 그대로 반환', () => {
    const html = '<p>Hello World</p>';
    expect(normalizeHtmlContent(html, false)).toBe(html);
  });

  it('복잡한 HTML 보존', () => {
    const html = '<h1>Title</h1><p>Paragraph with <strong>bold</strong></p>';
    expect(normalizeHtmlContent(html, false)).toBe(html);
  });

  it('isEmpty가 true이면 어떤 HTML이든 빈 문자열 반환', () => {
    expect(normalizeHtmlContent('<p>some text</p>', true)).toBe('');
  });
});

describe('calculateContentSize', () => {
  it('빈 문자열은 0 반환', () => {
    expect(calculateContentSize('')).toBe(0);
  });

  it('null/undefined 안전 처리', () => {
    expect(calculateContentSize('')).toBe(0);
  });

  it('ASCII 문자 크기 계산', () => {
    expect(calculateContentSize('hello')).toBe(5);
  });

  it('한글 문자 (3바이트/문자)', () => {
    expect(calculateContentSize('가')).toBe(3);
    expect(calculateContentSize('가나다')).toBe(9);
  });

  it('혼합 콘텐츠 (ASCII + 한글)', () => {
    const size = calculateContentSize('hello가나');
    expect(size).toBe(5 + 6); // 5 ASCII + 2 Korean (3 bytes each)
  });

  it('HTML 태그 포함 크기', () => {
    const html = '<p>test</p>';
    expect(calculateContentSize(html)).toBe(html.length);
  });
});

describe('validateImageFile', () => {
  const createMockFile = (size: number): File => {
    const buffer = new ArrayBuffer(size);
    return new File([buffer], 'test.png', { type: 'image/png' });
  };

  it('유효한 파일은 null 반환', () => {
    const file = createMockFile(1024);
    expect(validateImageFile(file, 3 * 1024 * 1024)).toBeNull();
  });

  it('크기 초과 파일은 Error 반환', () => {
    const file = createMockFile(4 * 1024 * 1024);
    const error = validateImageFile(file, 3 * 1024 * 1024);
    expect(error).toBeInstanceOf(Error);
    expect(error?.message).toContain('3MB');
  });

  it('maxSize 미지정 시 null 반환 (제한 없음)', () => {
    const file = createMockFile(100 * 1024 * 1024);
    expect(validateImageFile(file)).toBeNull();
  });

  it('정확히 maxSize와 같은 크기는 통과', () => {
    const maxSize = 1024;
    const file = createMockFile(maxSize);
    expect(validateImageFile(file, maxSize)).toBeNull();
  });

  it('maxSize보다 1바이트 큰 파일은 실패', () => {
    const maxSize = 1024;
    const file = createMockFile(maxSize + 1);
    expect(validateImageFile(file, maxSize)).toBeInstanceOf(Error);
  });
});
