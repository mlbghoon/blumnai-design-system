import { describe, it, expect, afterEach } from 'vitest';
import { Editor } from '@tiptap/core';
import { toStyle, INLINE_STYLES, HEADING_STYLES } from '../extensions';
import { buildExtensions } from '../useHtmlEditor';
import { DEFAULT_FEATURES } from '../HtmlEditor.constants';
import type { HtmlEditorFeature } from '../HtmlEditor.types';

const createEditor = (content = '') => {
  return new Editor({
    extensions: buildExtensions(new Set<HtmlEditorFeature>(DEFAULT_FEATURES)),
    content,
  });
};

describe('toStyle', () => {
  it('빈 객체는 빈 문자열 반환', () => {
    expect(toStyle({})).toBe('');
  });

  it('단일 선언', () => {
    expect(toStyle({ color: 'red' })).toBe('color: red');
  });

  it('복수 선언을 `; ` 로 연결', () => {
    expect(toStyle({ color: 'red', 'font-size': '12px' })).toBe(
      'color: red; font-size: 12px',
    );
  });

  it('삽입 순서 유지', () => {
    const out = toStyle({ a: '1', b: '2', c: '3' });
    expect(out).toBe('a: 1; b: 2; c: 3');
  });
});

// Pure data tests — verifies the INLINE_STYLES / HEADING_STYLES records have the
// exact property/value pairs we expect. Independent of jsdom's CSSOM serialization,
// which normalizes some properties and drops others with var() values in a way that
// does NOT happen in real browsers.
describe('INLINE_STYLES declarations', () => {
  it('bulletList: disc + padding-left 24px', () => {
    expect(INLINE_STYLES.bulletList).toEqual({
      'list-style-type': 'disc',
      'padding-left': '24px',
    });
  });

  it('orderedList: decimal + padding-left 24px', () => {
    expect(INLINE_STYLES.orderedList).toEqual({
      'list-style-type': 'decimal',
      'padding-left': '24px',
    });
  });

  it('listItem: margin-top 0.25em', () => {
    expect(INLINE_STYLES.listItem).toEqual({ 'margin-top': '0.25em' });
  });

  it('blockquote: border-left + color + italic', () => {
    expect(INLINE_STYLES.blockquote).toEqual({
      'border-left': '3px solid var(--border-default, #e5e7eb)',
      'padding-left': '12px',
      color: 'var(--text-subtle, #6b7280)',
      'font-style': 'italic',
    });
  });

  it('codeBlock: bg + radius 8px + font-family + overflow', () => {
    expect(INLINE_STYLES.codeBlock).toEqual({
      background: 'var(--bg-muted, #f3f4f6)',
      'border-radius': '8px',
      padding: '12px',
      'font-family': 'var(--font-code, monospace)',
      'font-size': '0.875rem',
      'overflow-x': 'auto',
    });
  });

  it('code (inline): bg + radius 4px + padding 2px 4px', () => {
    expect(INLINE_STYLES.code).toEqual({
      background: 'var(--bg-muted, #f3f4f6)',
      'border-radius': '4px',
      padding: '2px 4px',
      'font-family': 'var(--font-code, monospace)',
      'font-size': '0.875em',
    });
  });

  it('link: text-link + underline', () => {
    expect(INLINE_STYLES.link).toEqual({
      color: 'var(--text-link, #2563eb)',
      'text-decoration': 'underline',
    });
  });

  it('image: max-width + height auto + block + margin', () => {
    expect(INLINE_STYLES.image).toEqual({
      'max-width': '100%',
      height: 'auto',
      display: 'block',
      margin: '0.5em 0',
    });
  });
});

describe('HEADING_STYLES per-level declarations', () => {
  it.each([
    [1, '2rem', '1.3'],
    [2, '1.5rem', '1.3'],
    [3, '1.25rem', '1.4'],
    [4, '1.125rem', '1.4'],
    [5, '1rem', '1.5'],
    [6, '0.875rem', '1.5'],
  ] as const)('h%i: font-size %s, font-weight 600, line-height %s', (level, size, lh) => {
    expect(HEADING_STYLES[level]).toEqual({
      'font-size': size,
      'font-weight': '600',
      'line-height': lh,
    });
  });
});

// Integration smoke — wires INLINE_STYLES/HEADING_STYLES through TipTap and
// confirms style attributes ARE emitted on the expected elements. We assert
// presence-of-style rather than exact contents to sidestep jsdom's CSSOM
// normalization (which drops some var() values that real browsers keep).
describe('Editor integration — style attrs present on output', () => {
  let editor: Editor | null = null;

  afterEach(() => {
    editor?.destroy();
    editor = null;
  });

  it('ul/li emit style attrs', () => {
    editor = createEditor('<ul><li>a</li></ul>');
    const html = editor.getHTML();
    expect(html).toMatch(/<ul[^>]*style="[^"]+"/);
    expect(html).toMatch(/<li[^>]*style="[^"]+"/);
  });

  it('ol/li emit style attrs', () => {
    editor = createEditor('<ol><li>a</li></ol>');
    const html = editor.getHTML();
    expect(html).toMatch(/<ol[^>]*style="[^"]+"/);
  });

  it('blockquote emits style attr', () => {
    editor = createEditor('<blockquote><p>q</p></blockquote>');
    expect(editor.getHTML()).toMatch(/<blockquote[^>]*style="[^"]+"/);
  });

  it('pre emits style attr', () => {
    editor = createEditor('<pre><code>x</code></pre>');
    expect(editor.getHTML()).toMatch(/<pre[^>]*style="[^"]+"/);
  });

  it('link emits style attr', () => {
    editor = createEditor('<p><a href="https://example.com">x</a></p>');
    expect(editor.getHTML()).toMatch(/<a[^>]*style="[^"]+"/);
  });

  it('image emits style attr', () => {
    editor = createEditor('<img src="https://example.com/x.png" />');
    expect(editor.getHTML()).toMatch(/<img[^>]*style="[^"]+"/);
  });

  it.each([1, 2, 3, 4, 5, 6] as const)(
    'h%i emits style attr with font-size',
    (level) => {
      editor = createEditor(`<h${level}>x</h${level}>`);
      const html = editor.getHTML();
      expect(html).toMatch(new RegExp(`<h${level}[^>]*style="[^"]+"`));
      // font-size survives jsdom CSSOM; assert exact per-level value
      expect(html).toContain(`font-size: ${HEADING_STYLES[level]['font-size']}`);
    },
  );
});

describe('Round-trip', () => {
  let editor: Editor | null = null;

  afterEach(() => {
    editor?.destroy();
    editor = null;
  });

  it('unstyled in → styled out (migration path): ul gains list-style-type', () => {
    editor = createEditor('<ul><li>x</li></ul>');
    expect(editor.getHTML()).toContain('list-style-type: disc');
  });

  it('styled in → styled out without duplication', () => {
    editor = createEditor(
      '<ul style="list-style-type: disc; padding-left: 24px"><li style="margin-top: 0.25em">x</li></ul>',
    );
    const html = editor.getHTML();
    expect(html.match(/list-style-type/g)?.length).toBe(1);
    expect(html.match(/padding-left/g)?.length).toBe(1);
  });
});
