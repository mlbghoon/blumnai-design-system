import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { InlineFieldWrapper } from './InlineFieldWrapper';

describe('InlineFieldWrapper', () => {
  const defaultProps = {
    labelLineHeight: 'height-20',
    labelTextClassName: 'size-sm line-height-leading-5',
    descTextClassName: 'size-sm line-height-leading-5',
  };

  it('renders bare children when no label or description', () => {
    const { container } = render(
      <InlineFieldWrapper {...defaultProps}>
        <input data-testid="control" />
      </InlineFieldWrapper>
    );
    expect(screen.getByTestId('control')).toBeInTheDocument();
    expect(container.querySelector('label')).toBeNull();
  });

  it('renders label with control in a label element', () => {
    render(
      <InlineFieldWrapper {...defaultProps} label="테스트 라벨">
        <input data-testid="control" />
      </InlineFieldWrapper>
    );
    expect(screen.getByText('테스트 라벨')).toBeInTheDocument();
    expect(screen.getByTestId('control').closest('label')).toBeTruthy();
  });

  it('renders description below label', () => {
    render(
      <InlineFieldWrapper {...defaultProps} label="라벨" description="설명 텍스트">
        <input />
      </InlineFieldWrapper>
    );
    expect(screen.getByText('설명 텍스트')).toBeInTheDocument();
  });

  it('shows required asterisk when required is true and label exists', () => {
    render(
      <InlineFieldWrapper {...defaultProps} label="필수 필드" required>
        <input />
      </InlineFieldWrapper>
    );
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('does not show required asterisk when no label', () => {
    const { container } = render(
      <InlineFieldWrapper {...defaultProps} required>
        <input />
      </InlineFieldWrapper>
    );
    expect(container.textContent).not.toContain('*');
  });

  it('renders error caption text', () => {
    render(
      <InlineFieldWrapper {...defaultProps} label="라벨" error="에러 메시지">
        <input />
      </InlineFieldWrapper>
    );
    expect(screen.getByText('에러 메시지')).toBeInTheDocument();
  });

  it('renders success caption text', () => {
    render(
      <InlineFieldWrapper {...defaultProps} label="라벨" success="성공 메시지">
        <input />
      </InlineFieldWrapper>
    );
    expect(screen.getByText('성공 메시지')).toBeInTheDocument();
  });

  it('renders plain caption', () => {
    render(
      <InlineFieldWrapper {...defaultProps} label="라벨" caption="도움말">
        <input />
      </InlineFieldWrapper>
    );
    expect(screen.getByText('도움말')).toBeInTheDocument();
  });

  it('does not wrap in div when no caption is needed', () => {
    const { container } = render(
      <InlineFieldWrapper {...defaultProps} label="라벨">
        <input />
      </InlineFieldWrapper>
    );
    // Root element should be <label>, not <div>
    expect(container.firstElementChild?.tagName).toBe('LABEL');
  });

  it('wraps in div when caption is shown', () => {
    const { container } = render(
      <InlineFieldWrapper {...defaultProps} label="라벨" error="에러">
        <input />
      </InlineFieldWrapper>
    );
    // Root should be <div> wrapping <label> + caption
    expect(container.firstElementChild?.tagName).toBe('DIV');
    expect(container.querySelector('label')).toBeTruthy();
  });

  it('applies disabled text styles', () => {
    render(
      <InlineFieldWrapper {...defaultProps} label="라벨" disabled>
        <input />
      </InlineFieldWrapper>
    );
    const labelSpan = screen.getByText('라벨');
    expect(labelSpan.className).toContain('text-hint');
  });
});
