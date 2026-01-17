import type { Meta, StoryObj } from '@storybook/react';

import { AccordionItem } from './AccordionItem';

const meta = {
  title: 'Components/Accordion/AccordionItem',
  component: AccordionItem,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    style: {
      control: 'select',
      options: ['default', 'soft', 'ghost', 'line'],
    },
    isOpen: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    darkMode: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof AccordionItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    header: 'Accordion Item Header',
    children: 'This is the content of the accordion item. It can contain any React node.',
    style: 'default',
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

export const DarkMode: Story = {
  args: {
    header: 'Dark Mode Accordion',
    children: 'This accordion is displayed in dark mode.',
    style: 'default',
    darkMode: true,
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
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
