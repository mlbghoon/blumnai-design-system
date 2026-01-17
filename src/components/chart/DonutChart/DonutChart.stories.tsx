import type { Meta, StoryObj } from '@storybook/react';

import { DonutChart } from './DonutChart';

const meta: Meta<typeof DonutChart> = {
  title: 'Components/Chart/DonutChart',
  component: DonutChart,
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
    innerRadius: {
      control: { type: 'number', min: 20, max: 200, step: 10 },
    },
    outerRadius: {
      control: { type: 'number', min: 50, max: 300, step: 10 },
    },
    centerLabel: {
      control: 'text',
    },
    centerValue: {
      control: 'text',
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
type Story = StoryObj<typeof DonutChart>;

const defaultData = [
  { category: 'Category A', value: 30 },
  { category: 'Category B', value: 45 },
  { category: 'Category C', value: 25 },
];

const twoCategoryData = [
  { category: 'Category A', value: 70 },
  { category: 'Category B', value: 30 },
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
    innerRadius: 80,
    outerRadius: 150,
    showLegend: false,
    darkMode: false,
  },
};

export const WithCenterText: Story = {
  args: {
    data: defaultData,
    dataKey: 'value',
    nameKey: 'category',
    colors: ['#437dfc', '#44ba82', '#f59e0b'],
    width: 400,
    height: 400,
    innerRadius: 80,
    outerRadius: 150,
    centerLabel: 'Total',
    centerValue: '$20,000',
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
    innerRadius: 80,
    outerRadius: 150,
    showLegend: true,
    darkMode: false,
  },
};

export const WithCenterTextAndLegend: Story = {
  args: {
    data: defaultData,
    dataKey: 'value',
    nameKey: 'category',
    colors: ['#437dfc', '#44ba82', '#f59e0b'],
    width: 400,
    height: 400,
    innerRadius: 80,
    outerRadius: 150,
    centerLabel: 'Total',
    centerValue: '$20,000',
    showLegend: true,
    darkMode: false,
  },
};

export const TwoCategories: Story = {
  args: {
    data: twoCategoryData,
    dataKey: 'value',
    nameKey: 'category',
    colors: ['#44ba82', '#3eb5d7'],
    width: 400,
    height: 400,
    innerRadius: 80,
    outerRadius: 150,
    centerLabel: 'Label',
    centerValue: '$20,000',
    showLegend: false,
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
    innerRadius: 80,
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
    innerRadius: 80,
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
    innerRadius: 80,
    outerRadius: 150,
    showLegend: false,
    darkMode: true,
  },
};

export const DarkModeWithCenterText: Story = {
  args: {
    data: defaultData,
    dataKey: 'value',
    nameKey: 'category',
    colors: ['#437dfc', '#44ba82', '#f59e0b'],
    width: 400,
    height: 400,
    innerRadius: 80,
    outerRadius: 150,
    centerLabel: 'Total',
    centerValue: '$20,000',
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
    innerRadius: 80,
    outerRadius: 150,
    showLegend: true,
    darkMode: true,
  },
};

export const HalfChart: Story = {
  args: {
    data: twoCategoryData,
    dataKey: 'value',
    nameKey: 'category',
    colors: ['#44ba82', '#3eb5d7'],
    width: 280,
    innerRadius: 80,
    outerRadius: 140,
    centerLabel: 'Label',
    centerValue: '$20,000',
    isHalf: true,
    showLegend: false,
    darkMode: false,
  },
};

export const HalfChartWithLegend: Story = {
  args: {
    data: twoCategoryData,
    dataKey: 'value',
    nameKey: 'category',
    colors: ['#44ba82', '#3eb5d7'],
    width: 280,
    innerRadius: 80,
    outerRadius: 140,
    centerLabel: 'Label',
    centerValue: '$20,000',
    isHalf: true,
    showLegend: true,
    darkMode: false,
  },
};

export const HalfChartMultipleCategories: Story = {
  args: {
    data: multipleData,
    dataKey: 'value',
    nameKey: 'category',
    colors: ['#437dfc', '#44ba82', '#f59e0b', '#3eb5d7'],
    width: 280,
    innerRadius: 80,
    outerRadius: 140,
    isHalf: true,
    showLegend: false,
    darkMode: false,
  },
};

export const HalfChartDarkMode: Story = {
  args: {
    data: twoCategoryData,
    dataKey: 'value',
    nameKey: 'category',
    colors: ['#44ba82', '#3eb5d7'],
    width: 280,
    innerRadius: 80,
    outerRadius: 140,
    centerLabel: 'Label',
    centerValue: '$20,000',
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
    innerRadius: 120,
    outerRadius: 250,
    centerLabel: 'Total',
    centerValue: '$20,000',
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
    innerRadius: 50,
    outerRadius: 100,
    showLegend: false,
    darkMode: false,
  },
};

export const ThinDonut: Story = {
  args: {
    data: defaultData,
    dataKey: 'value',
    nameKey: 'category',
    colors: ['#437dfc', '#44ba82', '#f59e0b'],
    width: 400,
    height: 400,
    innerRadius: 130,
    outerRadius: 150,
    centerLabel: 'Total',
    centerValue: '$20,000',
    showLegend: false,
    darkMode: false,
  },
};

export const ThickDonut: Story = {
  args: {
    data: defaultData,
    dataKey: 'value',
    nameKey: 'category',
    colors: ['#437dfc', '#44ba82', '#f59e0b'],
    width: 400,
    height: 400,
    innerRadius: 50,
    outerRadius: 150,
    centerLabel: 'Total',
    centerValue: '$20,000',
    showLegend: false,
    darkMode: false,
  },
};