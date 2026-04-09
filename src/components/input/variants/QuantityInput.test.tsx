import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { QuantityInput } from './QuantityInput';

describe('QuantityInput — loading state', () => {
  it('disables the increment and decrement buttons when loading', () => {
    render(<QuantityInput value={5} min={0} max={10} loading />);
    const increment = screen.getByRole('button', { name: 'Increase value' });
    const decrement = screen.getByRole('button', { name: 'Decrease value' });
    expect(increment).toBeDisabled();
    expect(decrement).toBeDisabled();
  });

  it('disables the input and sets aria-busy when loading', () => {
    render(<QuantityInput value={5} loading />);
    const input = screen.getByRole('spinbutton');
    expect(input).toBeDisabled();
    expect(input).toHaveAttribute('aria-busy', 'true');
  });
});
