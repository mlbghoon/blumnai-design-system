import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { ProportionBar } from './ProportionBar';

const testData = [
  { name: '응대 전 이탈', value: 75, color: '#ff6b6b' },
  { name: '자동 종료', value: 25, color: '#868e96' },
];

describe('ProportionBar', () => {
  it('renders segments proportionally', () => {
    const { container } = render(<ProportionBar data={testData} showLegend={false} />);
    const segments = container.querySelectorAll('.h-full');
    expect(segments).toHaveLength(2);
  });

  it('shows totalLabel and totalValue', () => {
    render(<ProportionBar data={testData} totalLabel="총상담" totalValue="4" showLegend={false} />);
    expect(screen.getByText('총상담')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
  });

  it('interactive legend toggles segment visibility', async () => {
    const { container } = render(
      <ProportionBar data={testData} legendInteractive showLegend />
    );
    const legendButtons = container.querySelectorAll('[role="button"]');
    expect(legendButtons).toHaveLength(2);

    await userEvent.click(screen.getByText('응대 전 이탈'));
    const segments = container.querySelectorAll('.h-full');
    const firstSegment = segments[0] as HTMLElement;
    expect(firstSegment.style.width).toBe('0%');
  });

  it('animated=false disables transitions', () => {
    const { container } = render(
      <ProportionBar data={testData} animated={false} showLegend={false} />
    );
    const segment = container.querySelector('.h-full') as HTMLElement;
    expect(segment.style.transition).toBe('none');
  });

  it('valueSuffix appends to legend values', () => {
    render(<ProportionBar data={testData} valueSuffix="%" showLegend />);
    expect(screen.getByText('75%')).toBeInTheDocument();
    expect(screen.getByText('25%')).toBeInTheDocument();
  });
});
