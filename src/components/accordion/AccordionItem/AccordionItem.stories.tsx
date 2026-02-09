import { useRef } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { AccordionItem } from './AccordionItem';

const meta = {
  title: 'Layout/Accordion/Item',
  component: AccordionItem,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    style: {
      control: 'select',
      options: ['default', 'soft', 'ghost', 'line'],
      description: '아코디언의 시각적 스타일 변형',
      table: {
        type: {
          summary: 'AccordionItemStyle',
          detail: `'default' | 'soft' | 'ghost' | 'line'

- default: 테두리와 그림자
- soft: 은은한 배경
- ghost: 최소한의 배경
- line: 하단 테두리만`,
        },
      },
    },
    isOpen: {
      control: 'boolean',
      description: '아코디언 아이템이 펼쳐져 있는지 여부',
      table: {
        type: {
          summary: 'boolean',
        },
      },
    },
    disabled: {
      control: 'boolean',
      description: '아코디언 아이템이 비활성화되어 있는지 여부',
      table: {
        type: {
          summary: 'boolean',
        },
      },
    },
    header: {
      control: 'text',
      description: '헤더 콘텐츠 (질문/제목)',
      table: {
        type: {
          summary: 'ReactNode',
        },
      },
    },
    children: {
      control: 'text',
      description: '펼쳐졌을 때 표시되는 콘텐츠 (답변/본문)',
      table: {
        type: {
          summary: 'ReactNode',
        },
      },
    },
    onToggle: {
      action: 'toggled',
      description: '아코디언 토글 시 호출되는 콜백 함수',
      table: {
        type: {
          summary: '() => void',
        },
      },
    },
  },
} satisfies Meta<typeof AccordionItem>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 AccordionItem
 *
 * AccordionItem 컴포넌트는 `ref`와 `className` prop을 지원합니다.
 * - `ref`: DOM 요소에 직접 접근 가능
 * - `className`: 커스텀 스타일 클래스 추가 가능
 */
export const Default: Story = {
  args: {
    header: 'Accordion Item Header',
    children: 'This is the content of the accordion item. It can contain any React node.',
    style: 'default',
    className: '',
  },
  render: function Render(args) {
    const accordionRef = useRef<HTMLDivElement>(null);
    return <AccordionItem ref={accordionRef} {...args} />;
  },
};

export const Soft: Story = {
  args: {
    header: 'Soft Style Accordion',
    children: 'This accordion uses the soft style variant with a subtle background.',
    style: 'soft',
  },
};

export const Ghost: Story = {
  args: {
    header: 'Ghost Style Accordion',
    children: 'This accordion uses the ghost style variant with minimal background.',
    style: 'ghost',
  },
};

export const Line: Story = {
  args: {
    header: 'Line Style Accordion',
    children: 'This accordion uses the line style variant with a bottom border only.',
    style: 'line',
  },
};

export const Opened: Story = {
  args: {
    header: 'Opened Accordion',
    children: 'This accordion is opened by default.',
    style: 'default',
    isOpen: true,
  },
};

export const Disabled: Story = {
  args: {
    header: 'Disabled Accordion',
    children: 'This accordion is disabled and cannot be toggled.',
    style: 'default',
    disabled: true,
  },
};


export const AllVariants: Story = {
  args: {
    header: 'All Variants',
    children: 'This story shows all accordion variants.',
    style: 'default',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px' }}>
      <AccordionItem header="Default Style" style="default">
        Default style accordion with border and shadow.
      </AccordionItem>
      <AccordionItem header="Soft Style" style="soft">
        Soft style accordion with subtle background.
      </AccordionItem>
      <AccordionItem header="Ghost Style" style="ghost">
        Ghost style accordion with minimal background.
      </AccordionItem>
      <AccordionItem header="Line Style" style="line">
        Line style accordion with bottom border only.
      </AccordionItem>
    </div>
  ),
};
