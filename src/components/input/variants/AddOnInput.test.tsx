import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AddOnInput } from './AddOnInput';

describe('AddOnInput — loading state', () => {
  it('renders spinner and hides clear button in the INLINE add-on path (inline=true)', () => {
    const { container } = render(
      <AddOnInput
        inline
        prefix="https://"
        suffix=".com"
        loading
        value="example"
        onClear={() => {}}
      />,
    );
    expect(container.querySelector('svg.animate-spin')).not.toBeNull();
    expect(screen.queryByRole('button', { name: 'Clear input' })).toBeNull();
  });

  it('renders spinner and hides clear button in the GROUPED add-on path (inline=false)', () => {
    const { container } = render(
      <AddOnInput
        prefix="$"
        suffix="USD"
        loading
        value="100"
        onClear={() => {}}
      />,
    );
    expect(container.querySelector('svg.animate-spin')).not.toBeNull();
    expect(screen.queryByRole('button', { name: 'Clear input' })).toBeNull();
  });
});
