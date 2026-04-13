import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('renders children', () => {
    render(<Button>저장</Button>);
    expect(screen.getByRole('button', { name: '저장' })).toBeInTheDocument();
  });

  it('fires onClick', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>클릭</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('does not fire onClick when disabled', async () => {
    const onClick = vi.fn();
    render(<Button disabled onClick={onClick}>비활성</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
    await userEvent.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('does not fire onClick when loading', async () => {
    const onClick = vi.fn();
    render(<Button loading onClick={onClick}>로딩</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
    expect(btn).toHaveAttribute('aria-busy', 'true');
    await userEvent.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('renders with type="submit"', () => {
    render(<Button type="submit">제출</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it('renders shortcut badge', () => {
    render(<Button shortcut="⌘K">검색</Button>);
    expect(screen.getByText('⌘K')).toBeInTheDocument();
  });

  it('supports fullWidth', () => {
    render(<Button fullWidth>전체</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('w-full');
  });

  it('forwards ref', () => {
    const ref = vi.fn();
    render(<Button ref={ref}>Ref</Button>);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLButtonElement));
  });

  describe('color / colorOverride', () => {
    it('color prop produces the same output as colorOverride (equivalence)', () => {
      const { container: c1 } = render(<Button color="red">X</Button>);
      const { container: c2 } = render(<Button colorOverride="red">X</Button>);
      const b1 = c1.querySelector('button');
      const b2 = c2.querySelector('button');
      expect(b1?.getAttribute('style')).toBe(b2?.getAttribute('style'));
      expect(b1?.className).toBe(b2?.className);
    });

    it('color takes precedence over colorOverride when both are passed', () => {
      const { container: both } = render(
        <Button color="red" colorOverride="blue">
          X
        </Button>,
      );
      const { container: colorOnly } = render(<Button color="red">X</Button>);
      const { container: overrideOnly } = render(<Button colorOverride="blue">X</Button>);
      const bothBtn = both.querySelector('button');
      const colorBtn = colorOnly.querySelector('button');
      const overrideBtn = overrideOnly.querySelector('button');

      // Both-set should match color-only (color wins)
      expect(bothBtn?.getAttribute('style')).toBe(colorBtn?.getAttribute('style'));
      // Both-set should NOT match override-only (override loses)
      expect(bothBtn?.getAttribute('style')).not.toBe(overrideBtn?.getAttribute('style'));
    });
  });
});
