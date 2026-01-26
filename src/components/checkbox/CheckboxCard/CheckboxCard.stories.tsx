import { useEffect, useRef } from 'react';

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
      description: '배경 스타일 변형',
      table: {
        type: {
          summary: 'CheckboxCardBackground',
          detail: `'default' | 'soft'`,
        },
      },
    },
    checkboxPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: '체크박스의 위치',
      table: {
        type: {
          summary: 'CheckboxCardPosition',
          detail: `'left' | 'right'`,
        },
      },
    },
    layout: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: '카드 콘텐츠의 레이아웃 방향',
      table: {
        type: {
          summary: 'CheckboxCardLayout',
          detail: `'vertical' | 'horizontal'

- vertical: 콘텐츠가 세로로 쌓임
- horizontal: 콘텐츠가 가로로 흐름`,
        },
      },
    },
    checkboxStyle: {
      control: 'select',
      options: ['default', 'with-shadow'],
      description: '체크박스 스타일 변형',
      table: {
        type: {
          summary: 'CheckboxStyle',
          detail: `'default' | 'with-shadow'`,
        },
      },
    },
    disabled: {
      control: 'boolean',
      description: '체크박스가 비활성화되어 있는지 여부',
      table: {
        type: {
          summary: 'boolean',
        },
      },
    },
    checked: {
      control: 'boolean',
      description: '체크박스가 체크되어 있는지 여부',
      table: {
        type: {
          summary: 'boolean',
        },
      },
    },
    title: {
      control: 'text',
      description: '카드 제목',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    description: {
      control: 'text',
      description: '카드 설명',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    sections: {
      control: 'object',
      description: '추가 섹션 (예: Supporter 정보)',
      table: {
        type: {
          summary: 'CheckboxCardSection[]',
          detail: `각 섹션 속성:
- title: string
- description: string`,
        },
      },
    },
    onChange: {
      action: 'changed',
      description: '체크박스 상태 변경 시 호출되는 콜백 함수',
      table: {
        type: {
          summary: '(checked: boolean) => void',
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CheckboxCard>;

/**
 * 기본 카드 (체크박스 오른쪽)
 *
 * CheckboxCard 컴포넌트는 `ref`와 `className` prop을 지원합니다.
 * - `ref`: DOM 요소에 직접 접근 가능
 * - `className`: 커스텀 스타일 클래스 추가 가능
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
    checkboxPosition: 'right',
    checkboxStyle: 'with-shadow',
    className: '',
  },
  render: (args) => {
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (cardRef.current) {
        console.log('CheckboxCard ref:', cardRef.current);
      }
    }, []);

    return <CheckboxCard ref={cardRef} {...args} />;
  },
};

/**
 * 선택된 카드 (체크 시 자동으로 파란 테두리)
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
    checkboxPosition: 'right',
    checkboxStyle: 'with-shadow',
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
    checkboxPosition: 'right',
    checkboxStyle: 'with-shadow',
  },
};
