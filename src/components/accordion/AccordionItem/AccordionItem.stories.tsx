import { useRef } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { AccordionItem } from './AccordionItem';

const meta = {
  title: 'Layout/Accordion/Item',
  component: AccordionItem,
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  tags: ['autodocs'],
  argTypes: {
    style: {
      control: 'select',
      options: ['default', 'soft', 'ghost', 'line'],
      description: '아코디언의 시각적 스타일을 설정합니다. default(테두리+그림자), soft(은은한 배경), ghost(최소 배경), line(하단 테두리) 중 선택합니다',
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
      description: 'true로 설정하면 아코디언 아이템이 펼쳐진 상태로 표시됩니다. 초기 열림 상태나 제어 모드에서 사용합니다',
      table: {
        type: {
          summary: 'boolean',
        },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'true로 설정하면 아코디언 아이템이 비활성화되어 클릭해도 열리거나 닫히지 않습니다',
      table: {
        type: {
          summary: 'boolean',
        },
      },
    },
    header: {
      control: 'text',
      description: '아코디언 상단에 표시되는 헤더 콘텐츠입니다. 질문이나 제목 등을 텍스트 또는 ReactNode로 전달합니다',
      table: {
        type: {
          summary: 'ReactNode',
        },
      },
    },
    children: {
      control: 'text',
      description: '아코디언이 펼쳐졌을 때 표시되는 본문 콘텐츠입니다. 답변이나 상세 내용을 텍스트 또는 ReactNode로 전달합니다',
      table: {
        type: {
          summary: 'ReactNode',
        },
      },
    },
    defaultIsOpen: {
      control: 'boolean',
      description: '비제어 모드에서 초기 열림 상태를 지정합니다. isOpen이 없을 때 사용됩니다',
      table: {
        type: { summary: 'boolean' },
      },
    },
    headingLevel: {
      control: 'select',
      options: [2, 3, 4, 5, 6],
      description: '헤더의 WAI-ARIA heading 레벨 (h2~h6). 접근성을 위해 페이지 구조에 맞는 레벨을 선택합니다',
      table: {
        type: {
          summary: '2 | 3 | 4 | 5 | 6',
        },
        defaultValue: { summary: '3' },
      },
    },
    onToggle: {
      action: 'toggled',
      description: '아코디언이 열리거나 닫힐 때 호출되는 콜백 함수입니다. 현재 열림 상태(isOpen)가 인자로 전달됩니다',
      table: {
        type: {
          summary: '(isOpen: boolean) => void',
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
    header: '아코디언 항목 제목',
    children: '아코디언 항목의 내용입니다. 어떤 React 노드든 포함할 수 있습니다.',
    style: 'default',
    isOpen: false,
    disabled: false,
    defaultIsOpen: false,
    headingLevel: 3,
    className: '',
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const accordionRef = useRef<HTMLDivElement>(null);
    return <AccordionItem ref={accordionRef} {...args} />;
  },
};

export const Soft: Story = {
  args: {
    header: 'Soft 스타일 아코디언',
    children: '은은한 배경이 적용된 soft 스타일 변형입니다.',
    style: 'soft',
  },
};

export const Ghost: Story = {
  args: {
    header: 'Ghost 스타일 아코디언',
    children: '최소한의 배경이 적용된 ghost 스타일 변형입니다.',
    style: 'ghost',
  },
};

export const Line: Story = {
  args: {
    header: 'Line 스타일 아코디언',
    children: '하단 테두리만 표시되는 line 스타일 변형입니다.',
    style: 'line',
  },
};

export const Opened: Story = {
  args: {
    header: '열린 아코디언',
    children: '이 아코디언은 기본적으로 열려 있습니다.',
    style: 'default',
    isOpen: true,
  },
};

export const Disabled: Story = {
  args: {
    header: '비활성 아코디언',
    children: '이 아코디언은 비활성화되어 열거나 닫을 수 없습니다.',
    style: 'default',
    disabled: true,
  },
};


/**
 * Heading 레벨
 *
 * headingLevel prop으로 WAI-ARIA heading 레벨을 지정합니다.
 */
export const HeadingLevels: Story = {
  args: {
    header: 'Heading 레벨 비교',
    children: 'Heading 레벨을 비교합니다.',
    style: 'default',
  },
  render: () => (
    <div className="flex flex-col ds-gap-16" style={{ maxWidth: '600px' }}>
      <AccordionItem header="headingLevel=2 (h2)" headingLevel={2} style="default">
        h2 레벨의 아코디언 헤더입니다.
      </AccordionItem>
      <AccordionItem header="headingLevel=3 (h3, 기본)" headingLevel={3} style="default">
        h3 레벨의 아코디언 헤더입니다 (기본값).
      </AccordionItem>
      <AccordionItem header="headingLevel=4 (h4)" headingLevel={4} style="default">
        h4 레벨의 아코디언 헤더입니다.
      </AccordionItem>
    </div>
  ),
};

export const AllVariants: Story = {
  args: {
    header: '모든 변형',
    children: '모든 아코디언 스타일 변형을 보여줍니다.',
    style: 'default',
  },
  render: () => (
    <div className="flex flex-col ds-gap-16" style={{ maxWidth: '600px' }}>
      <AccordionItem header="Default 스타일" style="default">
        테두리와 그림자가 있는 기본 스타일 아코디언입니다.
      </AccordionItem>
      <AccordionItem header="Soft 스타일" style="soft">
        은은한 배경이 적용된 soft 스타일 아코디언입니다.
      </AccordionItem>
      <AccordionItem header="Ghost 스타일" style="ghost">
        최소한의 배경이 적용된 ghost 스타일 아코디언입니다.
      </AccordionItem>
      <AccordionItem header="Line 스타일" style="line">
        하단 테두리만 표시되는 line 스타일 아코디언입니다.
      </AccordionItem>
    </div>
  ),
};
