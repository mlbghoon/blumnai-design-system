import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { PasswordInput } from './PasswordInput';

describe('PasswordInput — loading state', () => {
  it('hides the visibility toggle and renders spinner when loading', () => {
    const { container } = render(
      <PasswordInput loading value="secret" showToggle />,
    );
    expect(container.querySelector('svg.animate-spin')).not.toBeNull();
    // The show/hide toggle button should not be rendered when loading
    expect(screen.queryByRole('button', { name: /password/i })).toBeNull();
  });
});
