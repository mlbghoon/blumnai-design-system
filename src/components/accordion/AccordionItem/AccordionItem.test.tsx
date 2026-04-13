import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { AccordionItem } from './AccordionItem';
import { AccordionGroup } from '../AccordionGroup';

describe('AccordionItem padding', () => {
  it('uses default padding-24 when padding prop is not set', () => {
    const { container } = render(
      <AccordionItem header="Title">Content</AccordionItem>
    );
    const el = container.firstElementChild!;
    expect(el.className).toContain('padding-24');
  });

  it('applies custom padding class when padding prop is set', () => {
    const { container } = render(
      <AccordionItem header="Title" padding={12}>Content</AccordionItem>
    );
    const el = container.firstElementChild!;
    expect(el.className).toContain('padding-12');
    expect(el.className).not.toContain('padding-24');
  });

  it('applies padding-y and padding-x-0 for line style with custom padding', () => {
    const { container } = render(
      <AccordionItem header="Title" style="line" padding={12}>Content</AccordionItem>
    );
    const el = container.firstElementChild!;
    expect(el.className).toContain('padding-y-12');
    expect(el.className).toContain('padding-x-0');
    expect(el.className).not.toContain('[padding-block:24px]');
  });

  it('uses default line padding when padding prop is not set on line style', () => {
    const { container } = render(
      <AccordionItem header="Title" style="line">Content</AccordionItem>
    );
    const el = container.firstElementChild!;
    expect(el.className).toContain('[padding-block:24px]');
    expect(el.className).toContain('padding-x-0');
  });
});

describe('AccordionGroup padding', () => {
  const items = [
    { id: '1', header: 'Q1', children: 'A1' },
    { id: '2', header: 'Q2', children: 'A2' },
  ];

  it('propagates group-level padding to all items', () => {
    const { container } = render(
      <AccordionGroup items={items} padding={8} />
    );
    const accordionItems = container.querySelectorAll('[class*="padding-8"]');
    expect(accordionItems.length).toBe(2);
  });

  it('item-level padding overrides group-level padding', () => {
    const itemsWithPadding = [
      { id: '1', header: 'Q1', children: 'A1', padding: 4 as const },
      { id: '2', header: 'Q2', children: 'A2' },
    ];
    const { container } = render(
      <AccordionGroup items={itemsWithPadding} padding={16} />
    );
    const groupEl = container.firstElementChild!;
    const item1 = groupEl.children[0];
    const item2 = groupEl.children[1];
    expect(item1.className).toContain('padding-4');
    expect(item1.className).not.toContain('padding-16');
    expect(item2.className).toContain('padding-16');
  });
});
