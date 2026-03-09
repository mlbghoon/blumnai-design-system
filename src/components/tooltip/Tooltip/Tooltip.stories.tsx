import { useRef } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { Tooltip } from './Tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'DataDisplay/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    controls: { disable: true },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: '툴팁의 콘텐츠',
      table: {
        type: {
          summary: 'ReactNode',
          detail: '툴팁에 표시할 텍스트 또는 React 엘리먼트',
        },
      },
    },
    badge: {
      control: 'text',
      description: '툴팁 텍스트 옆에 표시할 배지 텍스트',
      table: {
        type: {
          summary: 'string',
          detail: '선택적 배지 텍스트 (예: 키보드 단축키용 "/")',
        },
      },
    },
    maxWidth: {
      control: 'number',
      description: '툴팁의 최대 너비 (픽셀)',
      table: {
        type: {
          summary: 'number',
          detail: '기본값: 240',
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

/**
 * 기본 Tooltip
 *
 * Tooltip 컴포넌트는 `ref`와 `className` prop을 지원합니다.
 * - `ref`: DOM 요소에 직접 접근 가능
 * - `className`: 커스텀 스타일 클래스 추가 가능
 */
export const Default: Story = {
  args: {
    children: '툴팁 텍스트',
    className: '',
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const tooltipRef = useRef<HTMLDivElement>(null);
    return <Tooltip ref={tooltipRef} {...args} />;
  },
};

export const WithBadge: Story = {
  render: () => <Tooltip badge="/">툴팁 텍스트</Tooltip>,
};

export const MaxWidth: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <Tooltip maxWidth={160}>maxWidth 160px — 좁은 너비로 텍스트가 더 자주 줄 바꿈됩니다.</Tooltip>
        <div style={{ fontSize: '10px', marginTop: '8px', color: 'var(--text-muted)' }}>maxWidth: 160</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Tooltip maxWidth={240}>maxWidth 240px — 기본값으로 균형 잡힌 텍스트 너비를 제공합니다.</Tooltip>
        <div style={{ fontSize: '10px', marginTop: '8px', color: 'var(--text-muted)' }}>maxWidth: 240 (기본값)</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Tooltip maxWidth={320}>maxWidth 320px — 넓은 너비로 한 줄에 더 많은 텍스트를 표시할 수 있습니다.</Tooltip>
        <div style={{ fontSize: '10px', marginTop: '8px', color: 'var(--text-muted)' }}>maxWidth: 320</div>
      </div>
    </div>
  ),
};
