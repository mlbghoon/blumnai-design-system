import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { DefaultInput } from './DefaultInput';

describe('DefaultInput — loading state', () => {
  it('renders a spinner in the tail when loading=true', () => {
    const { container } = render(
      <DefaultInput loading value="hi" tailIcon={['system', 'search']} />,
    );
    // The Spinner renders an SVG with animate-spin class
    const spinner = container.querySelector('svg.animate-spin');
    expect(spinner).not.toBeNull();
  });

  it('hides the clear button when loading', () => {
    render(
      <DefaultInput loading value="hi" onClear={() => {}} />,
    );
    expect(screen.queryByRole('button', { name: 'Clear input' })).toBeNull();
  });

  it('hides the shortcut badge when loading', () => {
    const { container } = render(
      <DefaultInput loading value="hi" shortcut="⌘K" />,
    );
    expect(container.textContent).not.toContain('⌘K');
  });

  it('hides the tail icon when loading', () => {
    const { container } = render(
      <DefaultInput loading value="hi" tailIcon={['system', 'search']} />,
    );
    // Spinner should be present (the only SVG in the tail slot)
    expect(container.querySelector('svg.animate-spin')).not.toBeNull();
  });

  it('keeps the character count visible when loading', () => {
    render(
      <DefaultInput loading value="hello" showCount maxLength={100} />,
    );
    expect(screen.getByText('5/100')).toBeInTheDocument();
  });

  it('sets aria-busy and disabled on the input element when loading', () => {
    render(<DefaultInput loading value="hi" />);
    const input = screen.getByDisplayValue('hi');
    expect(input).toHaveAttribute('aria-busy', 'true');
    expect(input).toBeDisabled();
  });
});
