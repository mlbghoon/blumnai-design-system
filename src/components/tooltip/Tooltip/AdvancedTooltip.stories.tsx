import { useRef } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { AdvancedTooltip } from './AdvancedTooltip';

import type { TooltipItemData } from './Tooltip.types';

const meta: Meta<typeof AdvancedTooltip> = {
  title: 'DataDisplay/Tooltip/AdvancedTooltip',
  component: AdvancedTooltip,
  parameters: {
    layout: 'centered',
    controls: { disable: true },
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: 'object',
      description: '툴팁에 표시할 아이템 배열',
      table: {
        type: {
          summary: 'TooltipItemData[]',
          detail: `각 아이템의 type: 'label' | 'item' | 'divider' | 'text'`,
        },
      },
    },
    minWidth: {
      control: 'number',
      description: '툴팁의 최소 너비 (픽셀)',
      table: {
        type: { summary: 'number' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof AdvancedTooltip>;

/**
 * 기본 AdvancedTooltip
 *
 * AdvancedTooltip 컴포넌트는 `ref`와 `className` prop을 지원합니다.
 * - `ref`: DOM 요소에 직접 접근 가능
 * - `className`: 커스텀 스타일 클래스 추가 가능
 */
export const Default: Story = {
  args: {
    items: [
      { type: 'label', label: 'Label', caption: 'Caption' },
      { type: 'divider' },
      { type: 'item', label: 'Item 1', caption: 'Description 1', indicatorColor: '#437dfc' },
      { type: 'item', label: 'Item 2', caption: 'Description 2', indicatorColor: '#4fc660' },
      { type: 'item', label: 'Item 3', caption: 'Description 3', indicatorColor: '#f38f36' },
      { type: 'divider' },
      { type: 'text', text: 'The quick brown fox jumps over a lazy dog.' },
    ] as TooltipItemData[],
    className: '',
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const tooltipRef = useRef<HTMLDivElement>(null);
    return <AdvancedTooltip ref={tooltipRef} {...args} />;
  },
};

export const WithOnlyLabel: Story = {
  render: () => (
    <AdvancedTooltip
      items={[
        { type: 'label', label: 'Header', caption: 'Subheader' },
      ] as TooltipItemData[]}
    />
  ),
};

export const WithDividers: Story = {
  render: () => (
    <AdvancedTooltip
      items={[
        { type: 'label', label: 'Section 1' },
        { type: 'divider' },
        { type: 'item', label: 'Item', caption: 'Caption', indicatorColor: '#437dfc' },
        { type: 'divider' },
        { type: 'text', text: 'Plain text content' },
      ] as TooltipItemData[]}
    />
  ),
};

export const WithIcons: Story = {
  render: () => (
    <AdvancedTooltip
      items={[
        { type: 'label', label: 'Actions', caption: 'Available' },
        { type: 'divider' },
        { type: 'item', label: 'Settings', caption: 'Configure', icon: ['system', 'settings'] },
        { type: 'item', label: 'Search', caption: 'Find items', icon: ['system', 'search'] },
        { type: 'item', label: 'Add new', caption: 'Create item', icon: ['system', 'add'] },
        { type: 'divider' },
        { type: 'text', text: 'Select an action to proceed.' },
      ] as TooltipItemData[]}
    />
  ),
};

export const MinWidth: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
      <div style={{ textAlign: 'center' }}>
        <AdvancedTooltip
          minWidth={200}
          items={[
            { type: 'label', label: 'Title' },
            { type: 'text', text: 'Short text' },
          ] as TooltipItemData[]}
        />
        <div style={{ fontSize: '10px', marginTop: '8px', color: 'var(--text-muted)' }}>minWidth: 200</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <AdvancedTooltip
          minWidth={280}
          items={[
            { type: 'label', label: 'Title' },
            { type: 'text', text: 'Short text' },
          ] as TooltipItemData[]}
        />
        <div style={{ fontSize: '10px', marginTop: '8px', color: 'var(--text-muted)' }}>minWidth: 280</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <AdvancedTooltip
          minWidth={360}
          items={[
            { type: 'label', label: 'Title' },
            { type: 'text', text: 'Short text' },
          ] as TooltipItemData[]}
        />
        <div style={{ fontSize: '10px', marginTop: '8px', color: 'var(--text-muted)' }}>minWidth: 360</div>
      </div>
    </div>
  ),
};
