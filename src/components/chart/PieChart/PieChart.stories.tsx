import type { Meta, StoryObj } from '@storybook/react';

import { PieChart } from './PieChart';

const meta: Meta<typeof PieChart> = {
  title: 'Components/Chart/PieChart',
  component: PieChart,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    width: {
      control: { type: 'number', min: 200, max: 800, step: 50 },
    },
    height: {
      control: { type: 'number', min: 200, max: 800, step: 50 },
    },
    outerRadius: {
      control: { type: 'number', min: 50, max: 300, step: 10 },
    },
    showLegend: {
      control: 'boolean',
    },
    darkMode: {
      control: 'boolean',
    },
    isHalf: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof PieChart>;

const defaultData = [
  { category: 'Category A', value: 30 },
  { category: 'Category B', value: 45 },
  { category: 'Category C', value: 25 },
];

const multipleData = [
  { category: 'Category A', value: 25 },
  { category: 'Category B', value: 30 },
  { category: 'Category C', value: 20 },
  { category: 'Category D', value: 15 },
  { category: 'Category E', value: 10 },
];

export const Default: Story = {
  args: {
    data: defaultData,
    dataKey: 'value',
    nameKey: 'category',
    colors: ['#437dfc', '#44ba82', '#f59e0b'],
    width: 400,
    height: 400,
    outerRadius: 150,
    showLegend: false,
    darkMode: false,
  },
};

export const WithLegend: Story = {
  args: {
    data: defaultData,
    dataKey: 'value',
    nameKey: 'category',
    colors: ['#437dfc', '#44ba82', '#f59e0b'],
    width: 400,
    height: 400,
    outerRadius: 150,
    showLegend: true,
    darkMode: false,
  },
};

export const MultipleCategories: Story = {
  args: {
    data: multipleData,
    dataKey: 'value',
    nameKey: 'category',
    colors: ['#437dfc', '#44ba82', '#f59e0b', '#ef4444', '#8b5cf6'],
    width: 400,
    height: 400,
    outerRadius: 150,
    showLegend: false,
    darkMode: false,
  },
};

export const MultipleCategoriesWithLegend: Story = {
  args: {
    data: multipleData,
    dataKey: 'value',
    nameKey: 'category',
    colors: ['#437dfc', '#44ba82', '#f59e0b', '#ef4444', '#8b5cf6'],
    width: 400,
    height: 400,
    outerRadius: 150,
    showLegend: true,
    darkMode: false,
  },
};

export const DarkMode: Story = {
  args: {
    data: defaultData,
    dataKey: 'value',
    nameKey: 'category',
    colors: ['#437dfc', '#44ba82', '#f59e0b'],
    width: 400,
    height: 400,
    outerRadius: 150,
    showLegend: false,
    darkMode: true,
  },
};

export const DarkModeWithLegend: Story = {
  args: {
    data: defaultData,
    dataKey: 'value',
    nameKey: 'category',
    colors: ['#437dfc', '#44ba82', '#f59e0b'],
    width: 400,
    height: 400,
    outerRadius: 150,
    showLegend: true,
    darkMode: true,
  },
};

export const HalfChart: Story = {
  args: {
    data: multipleData,
    dataKey: 'value',
    nameKey: 'category',
    colors: ['#437dfc', '#44ba82', '#f59e0b', '#3eb5d7'],
    width: 280,
    outerRadius: 140,
    isHalf: true,
    showLegend: false,
    darkMode: false,
  },
};

export const HalfChartWithLegend: Story = {
  args: {
    data: multipleData,
    dataKey: 'value',
    nameKey: 'category',
    colors: ['#437dfc', '#44ba82', '#f59e0b', '#3eb5d7'],
    width: 280,
    outerRadius: 140,
    isHalf: true,
    showLegend: true,
    darkMode: false,
  },
};

export const HalfChartDarkMode: Story = {
  args: {
    data: multipleData,
    dataKey: 'value',
    nameKey: 'category',
    colors: ['#437dfc', '#44ba82', '#f59e0b', '#3eb5d7'],
    width: 280,
    outerRadius: 140,
    isHalf: true,
    showLegend: false,
    darkMode: true,
  },
};

export const LargeSize: Story = {
  args: {
    data: defaultData,
    dataKey: 'value',
    nameKey: 'category',
    colors: ['#437dfc', '#44ba82', '#f59e0b'],
    width: 600,
    height: 600,
    outerRadius: 250,
    showLegend: false,
    darkMode: false,
  },
};

export const SmallSize: Story = {
  args: {
    data: defaultData,
    dataKey: 'value',
    nameKey: 'category',
    colors: ['#437dfc', '#44ba82', '#f59e0b'],
    width: 250,
    height: 250,
    outerRadius: 100,
    showLegend: false,
    darkMode: false,
  },
};