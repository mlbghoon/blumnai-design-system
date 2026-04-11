import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('renders with label', () => {
    render(<Checkbox label="동의합니다" />);
    expect(screen.getByText('동의합니다')).toBeInTheDocument();
  });

  it('renders with description', () => {
    render(<Checkbox label="알림" description="이메일로 알림을 받습니다" />);
    expect(screen.getByText('이메일로 알림을 받습니다')).toBeInTheDocument();
  });

  it('calls onCheckedChange when clicked', async () => {
    const onCheckedChange = vi.fn();
    render(<Checkbox label="체크" onCheckedChange={onCheckedChange} />);
    await userEvent.click(screen.getByText('체크'));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('toggles from checked to unchecked', async () => {
    const onCheckedChange = vi.fn();
    render(<Checkbox label="체크" checked onCheckedChange={onCheckedChange} />);
    await userEvent.click(screen.getByText('체크'));
    expect(onCheckedChange).toHaveBeenCalledWith(false);
  });

  it('does not fire when disabled', async () => {
    const onCheckedChange = vi.fn();
    render(<Checkbox label="비활성" disabled onCheckedChange={onCheckedChange} />);
    await userEvent.click(screen.getByText('비활성'));
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it('renders unchecked by default', () => {
    render(<Checkbox label="기본" />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('data-state', 'unchecked');
  });

  it('renders checked state', () => {
    render(<Checkbox label="선택됨" checked />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('data-state', 'checked');
  });

  it('renders indeterminate state', () => {
    render(<Checkbox label="부분선택" checked="indeterminate" />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('data-state', 'indeterminate');
  });

  describe('checkboxPosition="off"', () => {
    it('renders only the checkbox element without label', () => {
      render(<Checkbox checkboxPosition="off" label="숨김" />);
      expect(screen.queryByText('숨김')).not.toBeInTheDocument();
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('warns in dev mode when label/error props are passed with off', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      render(<Checkbox checkboxPosition="off" label="라벨" error="에러" />);
      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining('checkboxPosition="off"')
      );
      warnSpy.mockRestore();
    });

    it('still fires onCheckedChange when off', async () => {
      const onCheckedChange = vi.fn();
      render(<Checkbox checkboxPosition="off" onCheckedChange={onCheckedChange} />);
      await userEvent.click(screen.getByRole('checkbox'));
      expect(onCheckedChange).toHaveBeenCalledWith(true);
    });
  });
});
