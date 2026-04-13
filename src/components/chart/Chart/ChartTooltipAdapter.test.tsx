import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ChartTooltipAdapter } from './ChartTooltipAdapter';

const defaultProps = {
  active: true,
  payload: [{ dataKey: 'value', value: 100, color: '#f00', name: 'A' }],
  label: 'Jan',
  getLabel: (key: string) => key,
  getColor: () => '#000',
};

describe('ChartTooltipAdapter', () => {
  it('renderTooltip returns unwrapped content by default', () => {
    render(
      <ChartTooltipAdapter
        {...defaultProps}
        renderTooltip={() => <span data-testid="custom">커스텀</span>}
      />
    );
    const custom = screen.getByTestId('custom');
    expect(custom.parentElement?.className).not.toContain('rounded-card-xs');
  });

  it('renderTooltip returns wrapped content when wrapCustomTooltip=true', () => {
    render(
      <ChartTooltipAdapter
        {...defaultProps}
        renderTooltip={() => <span data-testid="custom">커스텀</span>}
        wrapCustomTooltip
      />
    );
    const custom = screen.getByTestId('custom');
    expect(custom.parentElement?.className).toContain('rounded-card-xs');
  });

  it('uses tooltipValueFormatter for default tooltip values', () => {
    render(
      <ChartTooltipAdapter
        {...defaultProps}
        tooltipValueFormatter={(v) => `$${v.toLocaleString()}`}
      />
    );
    expect(screen.getByText('$100')).toBeInTheDocument();
  });

  it('uses getTooltipLabel instead of getLabel for tooltip items', () => {
    render(
      <ChartTooltipAdapter
        {...defaultProps}
        getTooltipLabel={() => '툴팁 전용 라벨'}
      />
    );
    expect(screen.getByText('툴팁 전용 라벨')).toBeInTheDocument();
  });

  it('falls back to getLabel when getTooltipLabel is not provided', () => {
    render(
      <ChartTooltipAdapter
        {...defaultProps}
        getLabel={() => '기본 라벨'}
      />
    );
    expect(screen.getByText('기본 라벨')).toBeInTheDocument();
  });
});
