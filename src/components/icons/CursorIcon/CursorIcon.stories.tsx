import { useRef } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { CursorIcon } from './CursorIcon';
import type { CursorType } from './CursorIcon.types';

const meta: Meta<typeof CursorIcon> = {
  title: 'Icons/CursorIcon',
  component: CursorIcon,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  argTypes: {
    cursorType: {
      control: 'select',
      options: ['arrow', 'hand-closed', 'hand-open', 'not-allowed', 'pointer', 'text'],
      description: '표시할 커서 아이콘의 타입을 설정합니다. 화살표, 손, 포인터, 텍스트 등의 커서 모양을 선택할 수 있습니다',
      table: {
        type: {
          summary: 'CursorType',
          detail: `'arrow' | 'hand-closed' | 'hand-open' | 'not-allowed' | 'pointer' | 'text'`,
        },
      },
    },
    size: {
      control: { type: 'number', min: 12, max: 64, step: 4 },
      description: '아이콘의 크기를 픽셀 단위로 설정합니다. 기본값은 24px입니다',
      table: {
        type: {
          summary: 'number',
          detail: '기본값: 24',
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CursorIcon>;

/**
 * 기본 CursorIcon
 *
 * CursorIcon 컴포넌트는 `ref`와 `className` prop을 지원합니다.
 * - `ref`: SVG 요소에 직접 접근 가능
 * - `className`: 커스텀 스타일 클래스 추가 가능
 */
export const Default: Story = {
  args: {
    cursorType: 'arrow',
    size: 24,
    className: '',
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const iconRef = useRef<SVGSVGElement>(null);
    return <CursorIcon ref={iconRef} {...args} />;
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      {[16, 20, 24, 32, 40, 48].map((size) => (
        <div key={size} style={{ textAlign: 'center' }}>
          <CursorIcon cursorType="pointer" size={size} />
          <div style={{ fontSize: '12px', marginTop: '4px' }}>{size}px</div>
        </div>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const AllCursors: Story = {
  render: function Render() {
    const cursors: CursorType[] = ['arrow', 'hand-closed', 'hand-open', 'not-allowed', 'pointer', 'text'];
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '24px' }}>
        {cursors.map((cursor) => (
          <div key={cursor} style={{ textAlign: 'center' }}>
            <CursorIcon cursorType={cursor} size={32} />
            <div style={{ fontSize: '12px', marginTop: '8px', color: 'var(--text-subtle)' }}>
              {cursor}
            </div>
          </div>
        ))}
      </div>
    );
  },
  parameters: { controls: { disable: true } },
};
