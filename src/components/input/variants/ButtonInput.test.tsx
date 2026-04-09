import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ButtonInput } from './ButtonInput';

describe('ButtonInput — loading state', () => {
  it('disables the inline action button when loading', () => {
    render(
      <ButtonInput
        buttonLabel="Search"
        onButtonClick={() => {}}
        loading
        value="query"
      />,
    );
    const button = screen.getByRole('button', { name: 'Search' });
    expect(button).toBeDisabled();
  });

  it('renders spinner in the tail slot when loading', () => {
    const { container } = render(
      <ButtonInput
        buttonLabel="Search"
        onButtonClick={() => {}}
        loading
        value="query"
        onClear={() => {}}
      />,
    );
    expect(container.querySelector('svg.animate-spin')).not.toBeNull();
    expect(screen.queryByRole('button', { name: 'Clear input' })).toBeNull();
  });
});
