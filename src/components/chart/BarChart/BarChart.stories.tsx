import type { Meta, StoryObj } from '@storybook/react';

import { BarChart } from './BarChart';

const meta: Meta<typeof BarChart> = {
  title: 'Components/Chart/BarChart',
  component: BarChart,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    width: {
      control: { type: 'number', min: 200, max: 1200, step: 50 },
    },
    height: {
      control: { type: 'number', min: 200, max: 800, step: 50 },
    },
    barSize: {
      control: { type: 'number', min: 8, max: 80, step: 4 },
    },
    gap: {
      control: { type: 'number', min: 0, max: 32, step: 2 },
    },
    showGrid: {
      control: 'boolean',
    },
    darkMode: {
      control: 'boolean',
    },
    colors: {
      control: 'object',
    },
  },
};

export default meta;
type Story = StoryObj<typeof BarChart>;

// Sample data
const defaultData = [
  { month: 'Jan', sales: 100 },
  { month: 'Feb', sales: 150 },
  { month: 'Mar', sales: 120 },
  { month: 'Apr', sales: 180 },
  { month: 'May', sales: 200 },
  { month: 'Jun', sales: 160 },
];

export const Default: Story = {
  args: {
    data: defaultData,
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'sales' },
    dataKey: 'sales',
    colors: ['#44ba82'],
    width: 600,
    height: 400,
    // barSize and gap not provided - will be calculated dynamically
    showGrid: true,
    darkMode: false,
  },
};

export const MultipleColors: Story = {
  args: {
    data: defaultData,
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'sales' },
    dataKey: 'sales',
    colors: ['#437dfc', '#44ba82', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'],
    width: 600,
    height: 400,
    barSize: 24,
    gap: 8,
    showGrid: true,
    darkMode: false,
  },
};

export const DarkMode: Story = {
  args: {
    data: defaultData,
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'sales' },
    dataKey: 'sales',
    colors: ['#44ba82'],
    width: 600,
    height: 400,
    barSize: 24,
    gap: 8,
    showGrid: true,
    darkMode: true,
  },
};

export const NoGrid: Story = {
  args: {
    data: defaultData,
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'sales' },
    dataKey: 'sales',
    colors: ['#44ba82'],
    width: 600,
    height: 400,
    barSize: 24,
    gap: 8,
    showGrid: false,
    darkMode: false,
  },
};

export const CustomSizes: Story = {
  args: {
    data: defaultData,
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'sales' },
    dataKey: 'sales',
    colors: ['#44ba82'],
    width: 800,
    height: 500,
    barSize: 32,
    gap: 12,
    showGrid: true,
    darkMode: false,
  },
};

export const LargeDataset: Story = {
  args: {
    data: [
      { month: 'Jan', sales: 100 },
      { month: 'Feb', sales: 150 },
      { month: 'Mar', sales: 120 },
      { month: 'Apr', sales: 180 },
      { month: 'May', sales: 200 },
      { month: 'Jun', sales: 160 },
      { month: 'Jul', sales: 220 },
      { month: 'Aug', sales: 190 },
      { month: 'Sep', sales: 240 },
      { month: 'Oct', sales: 210 },
      { month: 'Nov', sales: 180 },
      { month: 'Dec', sales: 250 },
    ],
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'sales' },
    dataKey: 'sales',
    colors: ['#437dfc', '#44ba82'],
    width: 800,
    height: 400,
    barSize: 20,
    gap: 4,
    showGrid: true,
    darkMode: false,
  },
};

export const DynamicSizing: Story = {
  args: {
    data: defaultData,
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'sales' },
    dataKey: 'sales',
    colors: ['#44ba82'],
    width: 600,
    height: 400,
    // barSize and gap not provided - will be calculated dynamically
    showGrid: true,
    darkMode: false,
  },
};

export const CustomBarSizeOnly: Story = {
  args: {
    data: defaultData,
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'sales' },
    dataKey: 'sales',
    colors: ['#44ba82'],
    width: 600,
    height: 400,
    barSize: 40,
    // gap not provided - will be calculated dynamically
    showGrid: true,
    darkMode: false,
  },
};

export const CustomGapOnly: Story = {
  args: {
    data: defaultData,
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'sales' },
    dataKey: 'sales',
    colors: ['#44ba82'],
    width: 600,
    height: 400,
    // barSize not provided - will be calculated dynamically
    gap: 16,
    showGrid: true,
    darkMode: false,
  },
};

export const StackedBars: Story = {
  args: {
    data: [
      { month: 'Jan', value1: 100, value2: 150 },
      { month: 'Feb', value1: 120, value2: 180 },
      { month: 'Mar', value1: 80, value2: 200 },
      { month: 'Apr', value1: 90, value2: 170 },
      { month: 'May', value1: 110, value2: 190 },
      { month: 'Jun', value1: 130, value2: 160 },
    ],
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'value1' },
    stacked: true,
    stackedKeys: ['value1', 'value2'],
    colors: ['#F27313', '#2D766F'],
    width: 600,
    height: 400,
    showGrid: true,
    darkMode: false,
  },
};

export const StackedBarsWithCustomColors: Story = {
  args: {
    data: [
      { month: 'Jan', value1: 100, value2: 150 },
      { month: 'Feb', value1: 120, value2: 180 },
      { month: 'Mar', value1: 80, value2: 200 },
      { month: 'Apr', value1: 90, value2: 170 },
      { month: 'May', value1: 110, value2: 190 },
      { month: 'Jun', value1: 130, value2: 160 },
    ],
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'value1' },
    stacked: true,
    stackedKeys: ['value1', 'value2'],
    // Using object mapping for custom colors per key
    stackedColors: {
      value1: '#F27313',
      value2: '#2D766F',
    },
    width: 600,
    height: 400,
    showGrid: true,
    darkMode: false,
  },
};

export const StackedBarsWithArrayColors: Story = {
  args: {
    data: [
      { month: 'Jan', value1: 100, value2: 150 },
      { month: 'Feb', value1: 120, value2: 180 },
      { month: 'Mar', value1: 80, value2: 200 },
      { month: 'Apr', value1: 90, value2: 170 },
      { month: 'May', value1: 110, value2: 190 },
      { month: 'Jun', value1: 130, value2: 160 },
    ],
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'value1' },
    stacked: true,
    stackedKeys: ['value1', 'value2'],
    // Using array mapping (index-based)
    stackedColors: ['#F27313', '#2D766F'],
    width: 600,
    height: 400,
    showGrid: true,
    darkMode: false,
  },
};
