import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './Tabs';

function renderTabs(props: { defaultValue?: string; onValueChange?: (v: string) => void } = {}) {
  return render(
    <Tabs defaultValue={props.defaultValue ?? 'tab1'} onValueChange={props.onValueChange}>
      <TabsList>
        <TabsTrigger value="tab1">탭 1</TabsTrigger>
        <TabsTrigger value="tab2">탭 2</TabsTrigger>
        <TabsTrigger value="tab3" disabled>탭 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">내용 1</TabsContent>
      <TabsContent value="tab2">내용 2</TabsContent>
      <TabsContent value="tab3">내용 3</TabsContent>
    </Tabs>
  );
}

describe('Tabs', () => {
  it('renders default tab content', () => {
    renderTabs();
    expect(screen.getByText('내용 1')).toBeVisible();
    expect(screen.queryByText('내용 2')).not.toBeInTheDocument();
  });

  it('switches tab on click', async () => {
    renderTabs();
    await userEvent.click(screen.getByRole('tab', { name: '탭 2' }));
    expect(screen.getByText('내용 2')).toBeVisible();
    expect(screen.queryByText('내용 1')).not.toBeInTheDocument();
  });

  it('calls onValueChange when tab clicked', async () => {
    const onValueChange = vi.fn();
    renderTabs({ onValueChange });
    await userEvent.click(screen.getByRole('tab', { name: '탭 2' }));
    expect(onValueChange).toHaveBeenCalledWith('tab2');
  });

  it('does not switch to disabled tab', async () => {
    const onValueChange = vi.fn();
    renderTabs({ onValueChange });
    await userEvent.click(screen.getByRole('tab', { name: '탭 3' }));
    expect(onValueChange).not.toHaveBeenCalled();
    expect(screen.getByText('내용 1')).toBeVisible();
  });

  it('renders active state on selected tab', () => {
    renderTabs();
    expect(screen.getByRole('tab', { name: '탭 1' })).toHaveAttribute('data-state', 'active');
    expect(screen.getByRole('tab', { name: '탭 2' })).toHaveAttribute('data-state', 'inactive');
  });

  it('navigates tabs with keyboard', async () => {
    const onValueChange = vi.fn();
    renderTabs({ onValueChange });
    const tab1 = screen.getByRole('tab', { name: '탭 1' });
    tab1.focus();
    await userEvent.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: '탭 2' })).toHaveFocus();
  });
});
