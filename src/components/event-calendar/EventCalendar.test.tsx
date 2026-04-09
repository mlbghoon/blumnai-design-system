import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { enUS, ko } from 'date-fns/locale';
import { EventCalendar } from './EventCalendar';

describe('EventCalendar — aria-label locale awareness', () => {
  it('renders English aria-labels when locale=enUS (no Korean characters)', () => {
    render(<EventCalendar month={new Date(2026, 3, 9)} locale={enUS} />);
    const cells = screen.getAllByRole('gridcell');
    expect(cells.length).toBeGreaterThan(0);
    for (const cell of cells) {
      const label = cell.getAttribute('aria-label') ?? '';
      expect(label).not.toMatch(/[년월일]/);
    }
    // Sanity: at least one cell should contain an English month name
    const hasEnglishMonth = cells.some((c) =>
      /(January|February|March|April|May|June|July|August|September|October|November|December)/.test(
        c.getAttribute('aria-label') ?? '',
      ),
    );
    expect(hasEnglishMonth).toBe(true);
  });

  it('renders Korean aria-labels when locale=ko (preserves existing behavior)', () => {
    render(<EventCalendar month={new Date(2026, 3, 9)} locale={ko} />);
    const cells = screen.getAllByRole('gridcell');
    const hasKoreanDay = cells.some((c) =>
      /\d+일/.test(c.getAttribute('aria-label') ?? ''),
    );
    expect(hasKoreanDay).toBe(true);
  });
});
