import type { Meta, StoryObj } from '@storybook/react';

import { AccordionGroup } from './AccordionGroup';
import type { AccordionGroupItem } from './AccordionGroup.types';

const meta = {
  title: 'Components/Accordion/AccordionGroup',
  component: AccordionGroup,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: 'object',
      description: 'AccordionItem 데이터 배열',
    },
    spacing: {
      control: 'number',
      description: '아이템 간 간격 (px)',
    },
    style: {
      control: 'select',
      options: ['default', 'soft', 'ghost', 'line'],
      description: '모든 아이템에 적용할 스타일 variant',
    },
    darkMode: {
      control: 'boolean',
      description: '다크 모드 활성화 여부',
    },
    allowMultiple: {
      control: 'boolean',
      description: '여러 아이템을 동시에 열 수 있는지 여부',
    },
  },
} satisfies Meta<typeof AccordionGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItems: AccordionGroupItem[] = [
  {
    header: 'Can I cancel my subscription at any time?',
    children: 'Yes, you can cancel your subscription at any time directly from your account settings.',
  },
  {
    header: 'What payment methods do you accept?',
    children: 'We accept all major credit cards, PayPal, and bank transfers. All payments are processed securely.',
  },
  {
    header: 'How do I update my billing information?',
    children: 'You can update your billing information at any time by going to Settings > Billing in your account dashboard.',
  },
];

export const Group: Story = {
  args: {
    items: sampleItems,
    spacing: 8,
    style: 'default',
    darkMode: false,
    allowMultiple: true,
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
        header: 'First Item (Opened)',
        children: 'This accordion item is opened by default.',
        isOpen: true,
      },
      {
        header: 'Second Item (Closed)',
        children: 'This accordion item is closed by default.',
      },
      {
        header: 'Third Item (Opened)',
        children: 'This accordion item is also opened by default.',
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
        header: 'Normal Accordion',
        children: 'This is a normal accordion item.',
      },
      {
        header: 'Opened Accordion',
        children: 'This accordion item is opened.',
        isOpen: true,
      },
      {
        header: 'Disabled Accordion',
        children: 'This accordion item is disabled.',
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
    allowMultiple: false,
  },
};

export const GroupDarkMode: Story = {
  args: {
    items: sampleItems,
    spacing: 8,
    style: 'default',
    darkMode: true,
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
  render: (args) => (
    <div
      style={{
        padding: '24px',
        backgroundColor: '#18181b',
        borderRadius: '8px',
      }}
    >
      <AccordionGroup {...args} />
    </div>
  ),
};

export const GroupAllVariants: Story = {
  args: {
    items: sampleItems,
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '800px' }}>
      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>Default Style Group</h3>
        <AccordionGroup items={sampleItems} spacing={8} style="default" />
      </div>

      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>Soft Style Group</h3>
        <AccordionGroup items={sampleItems} spacing={8} style="soft" />
      </div>

      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>Ghost Style Group</h3>
        <AccordionGroup items={sampleItems} spacing={8} style="ghost" />
      </div>

      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>Line Style Group</h3>
        <AccordionGroup items={sampleItems} spacing={8} style="line" />
      </div>
    </div>
  ),
};

export const GroupLongContent: Story = {
  args: {
    items: [
      {
        header: 'Short Content',
        children: 'This is a short answer.',
      },
      {
        header: 'Long Content',
        children:
          'This is a much longer answer that contains multiple paragraphs and detailed information. It demonstrates how the accordion handles longer content gracefully. The content area will expand to accommodate all the text, and users can scroll if needed.',
      },
      {
        header: 'Very Long Content',
        children: (
          <div>
            <p>This accordion item contains very long content with multiple paragraphs.</p>
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
