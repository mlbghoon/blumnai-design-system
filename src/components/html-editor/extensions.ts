import { mergeAttributes } from '@tiptap/core';
import { Heading } from '@tiptap/extension-heading';

type StyleDecl = Record<string, string>;

export function toStyle(decl: StyleDecl): string {
  return Object.entries(decl)
    .map(([k, v]) => `${k}: ${v}`)
    .join('; ');
}

export const INLINE_STYLES = {
  bulletList: {
    'list-style-type': 'disc',
    'padding-left': '24px',
  },
  orderedList: {
    'list-style-type': 'decimal',
    'padding-left': '24px',
  },
  listItem: {
    'margin-top': '0.25em',
  },
  blockquote: {
    'border-left': '3px solid var(--border-default, #e5e7eb)',
    'padding-left': '12px',
    color: 'var(--text-subtle, #6b7280)',
    'font-style': 'italic',
  },
  codeBlock: {
    background: 'var(--bg-muted, #f3f4f6)',
    'border-radius': '8px',
    padding: '12px',
    'font-family': 'var(--font-code, monospace)',
    'font-size': '0.875rem',
    'overflow-x': 'auto',
  },
  code: {
    background: 'var(--bg-muted, #f3f4f6)',
    'border-radius': '4px',
    padding: '2px 4px',
    'font-family': 'var(--font-code, monospace)',
    'font-size': '0.875em',
  },
  link: {
    color: 'var(--text-link, #2563eb)',
    'text-decoration': 'underline',
  },
  image: {
    'max-width': '100%',
    height: 'auto',
    display: 'block',
    margin: '0.5em 0',
  },
} satisfies Record<string, StyleDecl>;

export const HEADING_STYLES: Record<1 | 2 | 3 | 4 | 5 | 6, StyleDecl> = {
  1: { 'font-size': '2rem', 'font-weight': '600', 'line-height': '1.3' },
  2: { 'font-size': '1.5rem', 'font-weight': '600', 'line-height': '1.3' },
  3: { 'font-size': '1.25rem', 'font-weight': '600', 'line-height': '1.4' },
  4: { 'font-size': '1.125rem', 'font-weight': '600', 'line-height': '1.4' },
  5: { 'font-size': '1rem', 'font-weight': '600', 'line-height': '1.5' },
  6: { 'font-size': '0.875rem', 'font-weight': '600', 'line-height': '1.5' },
};

// Per-level style must be the LAST argument to mergeAttributes so the
// style-property merge lets it win over any option-level override.
export const StyledHeading = Heading.extend({
  renderHTML({ node, HTMLAttributes }) {
    const level = (this.options.levels.includes(node.attrs.level)
      ? node.attrs.level
      : this.options.levels[0]) as 1 | 2 | 3 | 4 | 5 | 6;
    return [
      `h${level}`,
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        style: toStyle(HEADING_STYLES[level]),
      }),
      0,
    ];
  },
});
