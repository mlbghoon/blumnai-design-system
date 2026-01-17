import type { Meta, StoryObj } from '@storybook/react';

import { CheckboxCard } from './CheckboxCard';

const meta: Meta<typeof CheckboxCard> = {
  title: 'Components/Checkbox/CheckboxCard',
  component: CheckboxCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    background: {
      control: 'select',
      options: ['default', 'soft'],
      description: '배경 스타일',
    },
    border: {
      control: 'select',
      options: ['default', 'selected'],
      description: '테두리 스타일',
    },
    checkboxPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: '체크박스 위치',
    },
    layout: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: '레이아웃 방향',
    },
    size: {
      control: 'select',
      options: ['2xs', 'xs', 'sm', 'md', 'lg'],
      description: '체크박스 크기',
    },
    checkboxStyle: {
      control: 'select',
      options: ['default', 'with-shadow'],
      description: '체크박스 스타일',
    },
    darkMode: {
      control: 'boolean',
      description: '다크 모드',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
    },
    checked: {
      control: 'boolean',
      description: '체크 상태',
    },
  },
};

export default meta;
type Story = StoryObj<typeof CheckboxCard>;

/**
 * 기본 카드 (체크박스 오른쪽)
 */
export const Default: Story = {
  args: {
    title: 'Title',
    description: 'Description',
    sections: [
      {
        title: 'Supporter',
        description: 'Supporter description',
      },
    ],
    checked: false,
    background: 'default',
    border: 'default',
    checkboxPosition: 'right',
    checkboxStyle: 'with-shadow',
  },
};

/**
 * 선택된 카드
 */
export const Selected: Story = {
  args: {
    title: 'Title',
    description: 'Description',
    sections: [
      {
        title: 'Supporter',
        description: 'Supporter description',
      },
    ],
    checked: true,
    background: 'default',
    border: 'selected',
    checkboxPosition: 'right',
    checkboxStyle: 'with-shadow',
  },
};

/**
 * 체크박스 왼쪽
 */
export const CheckboxLeft: Story = {
  args: {
    title: 'Title',
    description: 'Description',
    sections: [
      {
        title: 'Supporter',
        description: 'Supporter description',
      },
    ],
    checked: false,
    background: 'default',
    border: 'default',
    checkboxPosition: 'left',
    checkboxStyle: 'with-shadow',
  },
};

/**
 * Soft 배경
 */
export const SoftBackground: Story = {
  args: {
    title: 'Title',
    description: 'Description',
    sections: [
      {
        title: 'Supporter',
        description: 'Supporter description',
      },
    ],
    checked: false,
    background: 'soft',
    border: 'default',
    checkboxPosition: 'right',
    checkboxStyle: 'with-shadow',
  },
};

/**
 * Soft 배경 + 선택됨
 */
export const SoftBackgroundSelected: Story = {
  args: {
    title: 'Title',
    description: 'Description',
    sections: [
      {
        title: 'Supporter',
        description: 'Supporter description',
      },
    ],
    checked: true,
    background: 'soft',
    border: 'selected',
    checkboxPosition: 'right',
    checkboxStyle: 'with-shadow',
  },
};

/**
 * 비활성화 상태
 */
export const Disabled: Story = {
  args: {
    title: 'Title',
    description: 'Description',
    sections: [
      {
        title: 'Supporter',
        description: 'Supporter description',
      },
    ],
    checked: false,
    disabled: true,
    background: 'default',
    border: 'default',
    checkboxPosition: 'right',
    checkboxStyle: 'with-shadow',
  },
};

/**
 * 비활성화 + 체크됨
 */
export const DisabledChecked: Story = {
  args: {
    title: 'Title',
    description: 'Description',
    sections: [
      {
        title: 'Supporter',
        description: 'Supporter description',
      },
    ],
    checked: true,
    disabled: true,
    background: 'default',
    border: 'default',
    checkboxPosition: 'right',
    checkboxStyle: 'with-shadow',
  },
};

/**
 * Indeterminate 상태
 */
export const Indeterminate: Story = {
  args: {
    title: 'Title',
    description: 'Description',
    sections: [
      {
        title: 'Supporter',
        description: 'Supporter description',
      },
    ],
    indeterminate: true,
    background: 'default',
    border: 'selected',
    checkboxPosition: 'right',
    checkboxStyle: 'with-shadow',
  },
};

/**
 * 다크 모드
 */
export const DarkMode: Story = {
  args: {
    title: 'Title',
    description: 'Description',
    sections: [
      {
        title: 'Supporter',
        description: 'Supporter description',
      },
    ],
    checked: false,
    background: 'default',
    border: 'default',
    checkboxPosition: 'right',
    checkboxStyle: 'with-shadow',
    darkMode: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

/**
 * 다크 모드 + 선택됨
 */
export const DarkModeSelected: Story = {
  args: {
    title: 'Title',
    description: 'Description',
    sections: [
      {
        title: 'Supporter',
        description: 'Supporter description',
      },
    ],
    checked: true,
    background: 'default',
    border: 'selected',
    checkboxPosition: 'right',
    checkboxStyle: 'with-shadow',
    darkMode: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

/**
 * Horizontal 레이아웃 (기본)
 */
export const Horizontal: Story = {
  args: {
    title: 'Title',
    description: 'Description',
    sections: [
      {
        title: 'Supporter',
        description: 'Supporter description',
      },
    ],
    checked: false,
    layout: 'horizontal',
    background: 'default',
    border: 'default',
    checkboxPosition: 'right',
    checkboxStyle: 'with-shadow',
  },
};

/**
 * Horizontal 레이아웃 + 선택됨
 */
export const HorizontalSelected: Story = {
  args: {
    title: 'Title',
    description: 'Description',
    sections: [
      {
        title: 'Supporter',
        description: 'Supporter description',
      },
    ],
    checked: true,
    layout: 'horizontal',
    background: 'default',
    border: 'selected',
    checkboxPosition: 'right',
    checkboxStyle: 'with-shadow',
  },
};

/**
 * Horizontal 레이아웃 + 체크박스 왼쪽
 */
export const HorizontalCheckboxLeft: Story = {
  args: {
    title: 'Title',
    description: 'Description',
    sections: [
      {
        title: 'Supporter',
        description: 'Supporter description',
      },
    ],
    checked: false,
    layout: 'horizontal',
    background: 'default',
    border: 'default',
    checkboxPosition: 'left',
    checkboxStyle: 'with-shadow',
  },
};

/**
 * Horizontal 레이아웃 + Soft 배경
 */
export const HorizontalSoftBackground: Story = {
  args: {
    title: 'Title',
    description: 'Description',
    sections: [
      {
        title: 'Supporter',
        description: 'Supporter description',
      },
    ],
    checked: false,
    layout: 'horizontal',
    background: 'soft',
    border: 'default',
    checkboxPosition: 'right',
    checkboxStyle: 'with-shadow',
  },
};

/**
 * Horizontal 레이아웃 + 비활성화
 */
export const HorizontalDisabled: Story = {
  args: {
    title: 'Title',
    description: 'Description',
    sections: [
      {
        title: 'Supporter',
        description: 'Supporter description',
      },
    ],
    checked: false,
    disabled: true,
    layout: 'horizontal',
    background: 'default',
    border: 'default',
    checkboxPosition: 'right',
    checkboxStyle: 'with-shadow',
  },
};

/**
 * Horizontal 레이아웃 + 비활성화 + 체크됨
 */
export const HorizontalDisabledChecked: Story = {
  args: {
    title: 'Title',
    description: 'Description',
    sections: [
      {
        title: 'Supporter',
        description: 'Supporter description',
      },
    ],
    checked: true,
    disabled: true,
    layout: 'horizontal',
    background: 'default',
    border: 'default',
    checkboxPosition: 'right',
    checkboxStyle: 'with-shadow',
  },
};
