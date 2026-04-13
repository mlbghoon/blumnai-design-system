import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Radio, RadioGroup } from './Radio';

describe('RadioGroup error/success/caption', () => {
  it('renders error caption below the group', () => {
    render(
      <RadioGroup error="선택은 필수입니다">
        <Radio value="a" label="옵션 A" />
        <Radio value="b" label="옵션 B" />
      </RadioGroup>
    );
    expect(screen.getByText('선택은 필수입니다')).toBeInTheDocument();
  });

  it('propagates error border to unchecked Radio items via context', () => {
    const { container } = render(
      <RadioGroup error>
        <Radio value="a" label="옵션 A" />
        <Radio value="b" label="옵션 B" />
      </RadioGroup>
    );
    const radioButtons = container.querySelectorAll('[role="radio"]');
    radioButtons.forEach((btn) => {
      expect(btn.className).toContain('border-destructive');
    });
  });

  it('does not apply error border when no error', () => {
    const { container } = render(
      <RadioGroup>
        <Radio value="a" label="옵션 A" />
        <Radio value="b" label="옵션 B" />
      </RadioGroup>
    );
    const radioButtons = container.querySelectorAll('[role="radio"]');
    radioButtons.forEach((btn) => {
      expect(btn.className).toContain('border-darker');
      expect(btn.className).not.toContain('border-destructive');
    });
  });

  it('sets aria-invalid on the group when error is truthy', () => {
    render(
      <RadioGroup error="에러" data-testid="group">
        <Radio value="a" label="A" />
      </RadioGroup>
    );
    const group = screen.getByRole('radiogroup');
    expect(group).toHaveAttribute('aria-invalid', 'true');
  });

  it('sets aria-required when required is true', () => {
    render(
      <RadioGroup required data-testid="group">
        <Radio value="a" label="A" />
      </RadioGroup>
    );
    const group = screen.getByRole('radiogroup');
    expect(group).toHaveAttribute('aria-required', 'true');
  });
});
