import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { BarList } from './BarList';

const testData = [
  { name: 'A', value: 100 },
  { name: 'B', value: 80 },
  { name: 'C', value: 60 },
  { name: 'D', value: 40 },
  { name: 'E', value: 20 },
  { name: 'F', value: 10 },
  { name: 'G', value: 5 },
];

describe('BarList', () => {
  it('renders all items when count <= showCount', () => {
    render(<BarList data={testData.slice(0, 3)} />);
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.getByText('C')).toBeInTheDocument();
  });

  it('collapses and shows toggle when count > showCount', () => {
    render(<BarList data={testData} showCount={5} />);
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('E')).toBeInTheDocument();
    expect(screen.queryByText('F')).not.toBeInTheDocument();
    expect(screen.getByText('더보기 (+2)')).toBeInTheDocument();
  });

  it('expands and collapses on toggle click', async () => {
    render(<BarList data={testData} showCount={5} />);

    await userEvent.click(screen.getByText('더보기 (+2)'));
    expect(screen.getByText('F')).toBeInTheDocument();
    expect(screen.getByText('G')).toBeInTheDocument();
    expect(screen.getByText('접어두기')).toBeInTheDocument();

    await userEvent.click(screen.getByText('접어두기'));
    expect(screen.queryByText('F')).not.toBeInTheDocument();
  });

  it('applies value formatter', () => {
    render(
      <BarList
        data={[{ name: 'Test', value: 1234 }]}
        valueFormatter={(v) => v.toLocaleString('ko-KR')}
      />
    );
    expect(screen.getByText('1,234')).toBeInTheDocument();
  });

  it('fires click handler with correct item', async () => {
    const onClick = vi.fn();
    render(<BarList data={testData.slice(0, 3)} onItemClick={onClick} />);

    await userEvent.click(screen.getByText('B'));
    expect(onClick).toHaveBeenCalledWith({ name: 'B', value: 80 }, 1);
  });
});
