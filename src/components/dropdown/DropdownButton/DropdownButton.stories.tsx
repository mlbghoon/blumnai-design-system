import type { Meta, StoryObj } from '@storybook/react';

import { DropdownButton } from './DropdownButton';

const meta: Meta<typeof DropdownButton> = {
  title: 'Components/Dropdown/DropdownButton',
  component: DropdownButton,
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: '드롭다운 버튼의 라벨 텍스트',
      table: {
        type: { summary: 'string' },
      },
    },
    isOpen: {
      control: 'boolean',
      description: '드롭다운이 열려있는 상태인지 여부',
      table: {
        type: { summary: 'boolean' },
      },
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: '컨텐츠 정렬 방향',
      table: {
        type: {
          summary: 'DropdownButtonAlign',
          detail: `'left' | 'center' | 'right'`,
        },
      },
    },
    leadIcon: {
      control: 'object',
      description: '라벨 앞에 표시되는 아이콘',
      table: {
        type: {
          summary: 'IconType',
          detail: `[category, name] 튜플 형식`,
        },
      },
    },
    tailIcon: {
      control: 'object',
      description: '라벨 뒤에 표시되는 아이콘',
      table: {
        type: {
          summary: 'IconType',
          detail: `[category, name] 튜플 형식
기본값: ['arrows', 'chevron-down']`,
        },
      },
    },
    shortcut: {
      control: 'text',
      description: '단축키 표시',
      table: {
        type: { summary: 'string' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
      table: {
        type: { summary: 'boolean' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DropdownButton>;

/**
 * 기본 DropdownButton
 *
 * DropdownButton 컴포넌트는 `ref`와 `className` prop을 지원합니다.
 * - `ref`: button 요소에 직접 접근 가능
 * - `className`: 커스텀 스타일 클래스 추가 가능
 */
export const Default: Story = {
  args: {
    label: 'Dropdown',
    align: 'left',
  },
  parameters: {
    controls: { disable: false },
  },
};

/**
 * 리드 아이콘 포함
 */
export const WithLeadIcon: Story = {
  render: () => (
    <div className="flex flex-wrap gap-12 items-center">
      <DropdownButton label="Dropdown" leadIcon={['system', 'settings']} />
      <DropdownButton label="Select" leadIcon={['system', 'filter']} />
    </div>
  ),
};

/**
 * 단축키 표시
 */
export const WithShortcut: Story = {
  render: () => (
    <div className="flex flex-wrap gap-12 items-center">
      <DropdownButton label="Dropdown" shortcut="/" />
      <DropdownButton label="Command" leadIcon={['development', 'command']} shortcut="⌘K" />
    </div>
  ),
};

/**
 * 정렬
 */
export const Alignments: Story = {
  render: () => (
    <div className="flex flex-col gap-12">
      <DropdownButton label="Left Aligned" align="left" />
      <DropdownButton label="Center Aligned" align="center" />
      <DropdownButton label="Right Aligned" align="right" />
    </div>
  ),
};

/**
 * 상태
 */
export const States: Story = {
  render: () => (
    <div className="flex flex-wrap gap-12 items-center">
      <DropdownButton label="Default" />
      <DropdownButton label="Opened" isOpen />
      <DropdownButton label="Disabled" disabled />
    </div>
  ),
};

/**
 * 전체 옵션
 */
export const FullOptions: Story = {
  render: () => (
    <div className="flex flex-wrap gap-12 items-center">
      <DropdownButton
        label="Dropdown"
        leadIcon={['system', 'settings']}
        shortcut="/"
      />
      <DropdownButton
        label="Dropdown"
        leadIcon={['system', 'settings']}
        shortcut="/"
        isOpen
      />
    </div>
  ),
};
