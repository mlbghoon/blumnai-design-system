import { useRef } from 'react';
import { RiAddLine, RiSearchLine, RiSettingsLine } from '../../icons/Icon';

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
      { type: 'label', label: '레이블', caption: '캡션' },
      { type: 'divider' },
      { type: 'item', label: '항목 1', caption: '설명 1', indicatorColor: '#437dfc' },
      { type: 'item', label: '항목 2', caption: '설명 2', indicatorColor: '#4fc660' },
      { type: 'item', label: '항목 3', caption: '설명 3', indicatorColor: '#f38f36' },
      { type: 'divider' },
      { type: 'text', text: '간단한 텍스트 콘텐츠입니다.' },
    ] as TooltipItemData[],
    minWidth: undefined,
    className: '',
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const tooltipRef = useRef<HTMLDivElement>(null);
    return (
      <AdvancedTooltip
        ref={tooltipRef}
        items={args.items}
        minWidth={args.minWidth}
        className={args.className}
      />
    );
  },
};

export const WithOnlyLabel: Story = {
  render: () => (
    <AdvancedTooltip
      items={[
        { type: 'label', label: '헤더', caption: '서브헤더' },
      ] as TooltipItemData[]}
    />
  ),
};

export const WithDividers: Story = {
  render: () => (
    <AdvancedTooltip
      items={[
        { type: 'label', label: '섹션 1' },
        { type: 'divider' },
        { type: 'item', label: '항목', caption: '캡션', indicatorColor: '#437dfc' },
        { type: 'divider' },
        { type: 'text', text: '일반 텍스트 콘텐츠' },
      ] as TooltipItemData[]}
    />
  ),
};

export const WithIcons: Story = {
  render: () => (
    <AdvancedTooltip
      items={[
        { type: 'label', label: '액션', caption: '사용 가능' },
        { type: 'divider' },
        { type: 'item', label: '설정', caption: '구성하기', icon: RiSettingsLine },
        { type: 'item', label: '검색', caption: '항목 찾기', icon: RiSearchLine },
        { type: 'item', label: '새로 추가', caption: '항목 만들기', icon: RiAddLine },
        { type: 'divider' },
        { type: 'text', text: '계속하려면 액션을 선택하세요.' },
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
            { type: 'label', label: '제목' },
            { type: 'text', text: '짧은 텍스트' },
          ] as TooltipItemData[]}
        />
        <div style={{ fontSize: '10px', marginTop: '8px', color: 'var(--text-muted)' }}>minWidth: 200</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <AdvancedTooltip
          minWidth={280}
          items={[
            { type: 'label', label: '제목' },
            { type: 'text', text: '짧은 텍스트' },
          ] as TooltipItemData[]}
        />
        <div style={{ fontSize: '10px', marginTop: '8px', color: 'var(--text-muted)' }}>minWidth: 280</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <AdvancedTooltip
          minWidth={360}
          items={[
            { type: 'label', label: '제목' },
            { type: 'text', text: '짧은 텍스트' },
          ] as TooltipItemData[]}
        />
        <div style={{ fontSize: '10px', marginTop: '8px', color: 'var(--text-muted)' }}>minWidth: 360</div>
      </div>
    </div>
  ),
};
