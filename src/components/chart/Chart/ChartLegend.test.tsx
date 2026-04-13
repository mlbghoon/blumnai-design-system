import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { ChartLegend } from './ChartLegend';

const items = [
  { key: 'a', label: '시리즈 A', color: '#f00' },
  { key: 'b', label: '시리즈 B', color: '#0f0' },
  { key: 'c', label: '시리즈 C', color: '#00f' },
];

describe('ChartLegend', () => {
  it('renders all items from items prop', () => {
    render(<ChartLegend items={items} />);
    expect(screen.getByText('시리즈 A')).toBeInTheDocument();
    expect(screen.getByText('시리즈 B')).toBeInTheDocument();
    expect(screen.getByText('시리즈 C')).toBeInTheDocument();
  });

  it('hidden items show with opacity 0.4 and #ccc dot', () => {
    const hiddenSeries = new Set(['b']);
    const { container } = render(<ChartLegend items={items} hiddenSeries={hiddenSeries} interactive />);
    const legendItems = container.querySelectorAll('[role="button"]');
    const hiddenItem = legendItems[1];
    expect(hiddenItem).toHaveStyle({ opacity: '0.4' });
    const dot = hiddenItem.querySelector('div[aria-hidden="true"]');
    expect(dot).toHaveStyle({ backgroundColor: '#ccc' });
  });

  it('click fires onToggle when interactive', async () => {
    const onToggle = vi.fn();
    render(<ChartLegend items={items} interactive onToggle={onToggle} />);
    await userEvent.click(screen.getByText('시리즈 B'));
    expect(onToggle).toHaveBeenCalledWith('b');
  });

  it('position="right" renders vertically', () => {
    const { container } = render(<ChartLegend items={items} position="right" />);
    const wrapper = container.querySelector('[role="list"]');
    expect(wrapper?.className).toContain('flex-col');
  });

  it('valueFormatter displays formatted values', () => {
    const itemsWithValues = items.map((item, i) => ({ ...item, value: (i + 1) * 100 }));
    render(
      <ChartLegend
        items={itemsWithValues}
        valueFormatter={(v) => `${v}%`}
      />
    );
    expect(screen.getByText('100%')).toBeInTheDocument();
    expect(screen.getByText('200%')).toBeInTheDocument();
    expect(screen.getByText('300%')).toBeInTheDocument();
  });
});
