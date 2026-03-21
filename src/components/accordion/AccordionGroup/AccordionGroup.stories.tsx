import { useRef } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { AccordionGroup } from './AccordionGroup';
import type { AccordionGroupItem } from './AccordionGroup.types';

const meta = {
  title: 'Layout/Accordion',
  component: AccordionGroup,
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: 'object',
      description: '아코디언에 표시할 아이템 목록입니다. 각 아이템은 header(헤더)와 children(내용)을 포함합니다',
      table: {
        type: {
          summary: 'AccordionGroupItem[]',
          detail: `각 아이템 속성:
- header: ReactNode (필수)
- children: ReactNode (필수)
- style?: AccordionItemStyle
- isOpen?: boolean
- disabled?: boolean
- onToggle?: () => void`,
        },
      },
    },
    spacing: {
      control: 'number',
      description: '아코디언 아이템 사이의 세로 간격을 픽셀 단위로 설정합니다. 기본값은 8px입니다',
      table: {
        type: {
          summary: 'number',
          detail: '기본값: 8',
        },
      },
    },
    style: {
      control: 'select',
      options: ['default', 'soft', 'ghost', 'line'],
      description: '모든 아이템에 공통으로 적용되는 시각적 스타일입니다. 개별 아이템에서 별도 스타일을 지정하면 해당 아이템만 덮어씁니다',
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
    onToggle: {
      action: 'toggled',
      description: '아이템이 열리거나 닫힐 때 호출되는 콜백. id와 새 열림 상태(isOpen)가 전달됩니다. 제어 모드에서 사용합니다',
      table: {
        type: {
          summary: '(id: string, isOpen: boolean) => void',
        },
      },
    },
    allowMultipleOpen: {
      control: 'boolean',
      description: 'true로 설정하면 여러 아이템을 동시에 펼칠 수 있습니다. false로 설정하면 하나를 열 때 다른 아이템이 자동으로 닫힙니다',
      table: {
        type: {
          summary: 'boolean',
          detail: `true: 여러 아이템을 독립적으로 열 수 있음
false: 하나를 열면 다른 것이 닫힘`,
        },
      },
    },
  },
} satisfies Meta<typeof AccordionGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItems: AccordionGroupItem[] = [
  {
    header: '구독을 언제든지 취소할 수 있나요?',
    children: '네, 계정 설정에서 언제든지 구독을 직접 취소할 수 있습니다.',
  },
  {
    header: '어떤 결제 수단을 지원하나요?',
    children: '주요 신용카드, PayPal, 계좌이체를 지원합니다. 모든 결제는 안전하게 처리됩니다.',
  },
  {
    header: '결제 정보는 어떻게 변경하나요?',
    children: '계정 대시보드의 설정 > 결제 메뉴에서 언제든지 결제 정보를 변경할 수 있습니다.',
  },
];

/**
 * 기본 AccordionGroup
 *
 * 이 스토리에서 컴포넌트의 모든 props를 테스트할 수 있습니다.
 */
export const Default: Story = {
  args: {
    items: sampleItems,
    spacing: 8,
    style: 'default',
    allowMultipleOpen: true,
    className: '',
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    return (
      <AccordionGroup
        items={args.items}
        spacing={args.spacing}
        style={args.style}
        allowMultipleOpen={args.allowMultipleOpen}
        className={args.className}
      />
    );
  },
};

/**
 * ref 지원 AccordionGroup
 *
 * AccordionGroup 컴포넌트는 `ref`와 `className` prop을 지원합니다.
 * - `ref`: DOM 요소에 직접 접근 가능
 * - `className`: 커스텀 스타일 클래스 추가 가능
 */
export const Group: Story = {
  args: {
    items: sampleItems,
    spacing: 8,
    style: 'default',
    allowMultipleOpen: true,
    className: '',
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const groupRef = useRef<HTMLDivElement>(null);
    return <AccordionGroup ref={groupRef} {...args} />;
  },
};

export const GroupWithCustomSpacing: Story = {
  args: {
    items: sampleItems,
    spacing: 16,
    style: 'default',
  },
};

export const GroupSoftStyle: Story = {
  args: {
    items: sampleItems,
    spacing: 8,
    style: 'soft',
  },
};

export const GroupGhostStyle: Story = {
  args: {
    items: sampleItems,
    spacing: 8,
    style: 'ghost',
  },
};

export const GroupLineStyle: Story = {
  args: {
    items: sampleItems,
    spacing: 8,
    style: 'line',
  },
};

export const GroupWithOpenedItems: Story = {
  args: {
    items: [
      {
        header: '첫 번째 항목 (열림)',
        children: '이 아코디언 항목은 기본적으로 열려 있습니다.',
        isOpen: true,
      },
      {
        header: '두 번째 항목 (닫힘)',
        children: '이 아코디언 항목은 기본적으로 닫혀 있습니다.',
      },
      {
        header: '세 번째 항목 (열림)',
        children: '이 아코디언 항목도 기본적으로 열려 있습니다.',
        isOpen: true,
      },
    ],
    spacing: 8,
    style: 'default',
  },
};

export const GroupWithMixedStates: Story = {
  args: {
    items: [
      {
        header: '일반 아코디언',
        children: '일반 상태의 아코디언 항목입니다.',
      },
      {
        header: '열린 아코디언',
        children: '이 아코디언 항목은 열려 있습니다.',
        isOpen: true,
      },
      {
        header: '비활성 아코디언',
        children: '이 아코디언 항목은 비활성화되어 있습니다.',
        disabled: true,
      },
    ],
    spacing: 8,
    style: 'default',
  },
};

export const GroupSingleOpen: Story = {
  args: {
    items: sampleItems,
    spacing: 8,
    style: 'default',
    allowMultipleOpen: false,
  },
  name: 'GroupSingleOpen (allowMultipleOpen: false)',
};

export const GroupMultipleOpen: Story = {
  args: {
    items: sampleItems,
    spacing: 8,
    style: 'default',
    allowMultipleOpen: true,
  },
  name: 'GroupMultipleOpen (allowMultipleOpen: true)',
};

export const GroupDarkMode: Story = {
  args: {
    items: sampleItems,
    spacing: 8,
    style: 'default',
  },
  decorators: [
    (Story) => (
      <div data-theme="dark" style={{ padding: '24px', backgroundColor: 'var(--bg-default)', borderRadius: '8px' }}>
        <Story />
      </div>
    ),
  ],
};

export const GroupAllVariants: Story = {
  args: {
    items: sampleItems,
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '800px' }}>
      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>Default 스타일 그룹</h3>
        <AccordionGroup items={sampleItems} spacing={8} style="default" />
      </div>

      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>Soft 스타일 그룹</h3>
        <AccordionGroup items={sampleItems} spacing={8} style="soft" />
      </div>

      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>Ghost 스타일 그룹</h3>
        <AccordionGroup items={sampleItems} spacing={8} style="ghost" />
      </div>

      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>Line 스타일 그룹</h3>
        <AccordionGroup items={sampleItems} spacing={8} style="line" />
      </div>
    </div>
  ),
};

export const GroupLongContent: Story = {
  args: {
    items: [
      {
        header: '짧은 내용',
        children: '이것은 짧은 답변입니다.',
      },
      {
        header: '긴 내용',
        children:
          '이것은 여러 단락과 상세한 정보를 포함하는 훨씬 더 긴 답변입니다. 아코디언이 긴 콘텐츠를 어떻게 우아하게 처리하는지 보여줍니다. 콘텐츠 영역은 모든 텍스트를 수용하도록 확장되며, 필요한 경우 스크롤할 수 있습니다.',
      },
      {
        header: '매우 긴 내용',
        children: (
          <div>
            <p>이 아코디언 항목은 여러 단락으로 구성된 매우 긴 내용을 포함합니다.</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
              laborum.
            </p>
          </div>
        ),
      },
    ],
    spacing: 8,
    style: 'default',
  },
};
