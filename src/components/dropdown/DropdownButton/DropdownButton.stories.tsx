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
      type: { required: true },
      table: {
        type: { summary: 'string' },
      },
    },
    isOpen: {
      control: 'boolean',
      description: '드롭다운이 열려있는 상태인지 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: '라벨 텍스트 정렬 (아이콘은 항상 우측 고정)',
      table: {
        type: {
          summary: 'DropdownButtonAlign',
          detail: `'left' | 'center' | 'right'`,
        },
        defaultValue: { summary: 'center' },
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
          detail: `[category, name] 튜플 형식`,
        },
        defaultValue: { summary: "['arrows', 'arrow-down-s']" },
      },
    },
    shortcut: {
      control: 'text',
      description: '단축키 표시 (예: "/")',
      table: {
        type: { summary: 'string' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    width: {
      control: 'text',
      description: '버튼 너비 (픽셀 숫자 또는 CSS 값)',
      table: {
        type: { summary: 'number | string' },
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
    align: 'center',
    width: undefined,
  },
  render: (args) => {
    // Convert width from string input to number if it's a numeric string
    const width = args.width
      ? /^\d+$/.test(String(args.width))
        ? Number(args.width)
        : args.width
      : undefined;

    return (
      <DropdownButton
        {...args}
        width={width}
      />
    );
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
 * 정렬 (고정 너비에서 효과 확인)
 */
export const Alignments: Story = {
  render: () => (
    <div className="flex flex-col gap-12">
      <DropdownButton label="Left Aligned" align="left" width={200} />
      <DropdownButton label="Center Aligned" align="center" width={200} />
      <DropdownButton label="Right Aligned" align="right" width={200} />
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
