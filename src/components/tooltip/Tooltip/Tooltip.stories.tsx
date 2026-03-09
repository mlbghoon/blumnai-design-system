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
      description: '툴팁 내부에 표시할 콘텐츠입니다. 텍스트 문자열 또는 React 엘리먼트를 전달할 수 있습니다',
      table: {
        type: {
          summary: 'ReactNode',
          detail: '툴팁에 표시할 텍스트 또는 React 엘리먼트',
        },
      },
    },
    badge: {
      control: 'text',
      description: '툴팁 텍스트 옆에 작은 배지로 표시되는 텍스트입니다. 주로 키보드 단축키를 표시하는 데 사용합니다 (예: "/")',
      table: {
        type: {
          summary: 'string',
          detail: '선택적 배지 텍스트 (예: 키보드 단축키용 "/")',
        },
      },
    },
    maxWidth: {
      control: 'number',
      description: '툴팁의 최대 너비를 픽셀 단위로 설정합니다. 기본값은 240px이며, 콘텐츠가 이 너비를 초과하면 자동으로 줄바꿈됩니다',
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
        <Tooltip maxWidth={160}>좁은 maxWidth(160px)를 적용한 툴팁으로 텍스트가 더 빠르게 줄바꿈됩니다</Tooltip>
        <div style={{ fontSize: '10px', marginTop: '8px', color: 'var(--text-muted)' }}>maxWidth: 160</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Tooltip maxWidth={240}>기본 maxWidth(240px)를 적용한 툴팁으로 균형 잡힌 텍스트 너비를 제공합니다</Tooltip>
        <div style={{ fontSize: '10px', marginTop: '8px', color: 'var(--text-muted)' }}>maxWidth: 240 (default)</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Tooltip maxWidth={320}>넓은 maxWidth(320px)를 적용한 툴팁으로 한 줄에 더 많은 텍스트를 표시할 수 있습니다</Tooltip>
        <div style={{ fontSize: '10px', marginTop: '8px', color: 'var(--text-muted)' }}>maxWidth: 320</div>
      </div>
    </div>
  ),
};
