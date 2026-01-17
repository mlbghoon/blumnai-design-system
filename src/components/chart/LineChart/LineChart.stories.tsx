import type { Meta, StoryObj } from '@storybook/react';

import { LineChart } from './LineChart';

const meta: Meta<typeof LineChart> = {
  title: 'Components/Chart/LineChart',
  component: LineChart,
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
    showArea: {
      control: 'boolean',
    },
    showPoints: {
      control: 'boolean',
    },
    strokeWidth: {
      control: { type: 'number', min: 1, max: 10, step: 1 },
    },
    showGrid: {
      control: 'boolean',
    },
    darkMode: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof LineChart>;

const defaultData = [
  { month: 'Jan', revenue: 100 },
  { month: 'Feb', revenue: 150 },
  { month: 'Mar', revenue: 120 },
  { month: 'Apr', revenue: 180 },
  { month: 'May', revenue: 200 },
  { month: 'Jun', revenue: 160 },
];

const largeData = [
  { month: 'Jan', revenue: 120 },
  { month: 'Feb', revenue: 180 },
  { month: 'Mar', revenue: 150 },
  { month: 'Apr', revenue: 220 },
  { month: 'May', revenue: 250 },
  { month: 'Jun', revenue: 200 },
  { month: 'Jul', revenue: 280 },
  { month: 'Aug', revenue: 300 },
  { month: 'Sep', revenue: 270 },
  { month: 'Oct', revenue: 320 },
  { month: 'Nov', revenue: 290 },
  { month: 'Dec', revenue: 350 },
];

const sparseData = [
  { month: 'Jan', revenue: 100 },
  { month: 'Apr', revenue: 180 },
  { month: 'Jul', revenue: 200 },
  { month: 'Oct', revenue: 160 },
];

export const Default: Story = {
  args: {
    data: defaultData,
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'revenue' },
    dataKey: 'revenue',
    colors: ['#437dfc'],
    width: 600,
    height: 400,
    showArea: false,
    showPoints: true,
    strokeWidth: 2,
    showGrid: true,
    darkMode: false,
  },
};

export const WithArea: Story = {
  args: {
    data: defaultData,
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'revenue' },
    dataKey: 'revenue',
    colors: ['#437dfc'],
    width: 600,
    height: 400,
    showArea: true,
    showPoints: true,
    strokeWidth: 2,
    showGrid: true,
    darkMode: false,
  },
};

export const NoPoints: Story = {
  args: {
    data: defaultData,
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'revenue' },
    dataKey: 'revenue',
    colors: ['#437dfc'],
    width: 600,
    height: 400,
    showArea: false,
    showPoints: false,
    strokeWidth: 2,
    showGrid: true,
    darkMode: false,
  },
};

export const AreaNoPoints: Story = {
  args: {
    data: defaultData,
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'revenue' },
    dataKey: 'revenue',
    colors: ['#437dfc'],
    width: 600,
    height: 400,
    showArea: true,
    showPoints: false,
    strokeWidth: 2,
    showGrid: true,
    darkMode: false,
  },
};

export const ThickLine: Story = {
  args: {
    data: defaultData,
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'revenue' },
    dataKey: 'revenue',
    colors: ['#437dfc'],
    width: 600,
    height: 400,
    showArea: false,
    showPoints: true,
    strokeWidth: 4,
    showGrid: true,
    darkMode: false,
  },
};

export const ThinLine: Story = {
  args: {
    data: defaultData,
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'revenue' },
    dataKey: 'revenue',
    colors: ['#437dfc'],
    width: 600,
    height: 400,
    showArea: false,
    showPoints: true,
    strokeWidth: 1,
    showGrid: true,
    darkMode: false,
  },
};

export const NoGrid: Story = {
  args: {
    data: defaultData,
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'revenue' },
    dataKey: 'revenue',
    colors: ['#437dfc'],
    width: 600,
    height: 400,
    showArea: false,
    showPoints: true,
    strokeWidth: 2,
    showGrid: false,
    darkMode: false,
  },
};

export const DarkMode: Story = {
  args: {
    data: defaultData,
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'revenue' },
    dataKey: 'revenue',
    colors: ['#437dfc'],
    width: 600,
    height: 400,
    showArea: false,
    showPoints: true,
    strokeWidth: 2,
    showGrid: true,
    darkMode: true,
  },
};

export const DarkModeWithArea: Story = {
  args: {
    data: defaultData,
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'revenue' },
    dataKey: 'revenue',
    colors: ['#437dfc'],
    width: 600,
    height: 400,
    showArea: true,
    showPoints: true,
    strokeWidth: 2,
    showGrid: true,
    darkMode: true,
  },
};

export const LargeDataset: Story = {
  args: {
    data: largeData,
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'revenue' },
    dataKey: 'revenue',
    colors: ['#437dfc'],
    width: 800,
    height: 400,
    showArea: false,
    showPoints: true,
    strokeWidth: 2,
    showGrid: true,
    darkMode: false,
  },
};

export const LargeDatasetWithArea: Story = {
  args: {
    data: largeData,
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'revenue' },
    dataKey: 'revenue',
    colors: ['#437dfc'],
    width: 800,
    height: 400,
    showArea: true,
    showPoints: true,
    strokeWidth: 2,
    showGrid: true,
    darkMode: false,
  },
};

export const SparseData: Story = {
  args: {
    data: sparseData,
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'revenue' },
    dataKey: 'revenue',
    colors: ['#437dfc'],
    width: 600,
    height: 400,
    showArea: false,
    showPoints: true,
    strokeWidth: 2,
    showGrid: true,
    darkMode: false,
  },
};

export const LargeSize: Story = {
  args: {
    data: defaultData,
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'revenue' },
    dataKey: 'revenue',
    colors: ['#437dfc'],
    width: 1000,
    height: 600,
    showArea: false,
    showPoints: true,
    strokeWidth: 2,
    showGrid: true,
    darkMode: false,
  },
};

export const SmallSize: Story = {
  args: {
    data: defaultData,
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'revenue' },
    dataKey: 'revenue',
    colors: ['#437dfc'],
    width: 400,
    height: 300,
    showArea: false,
    showPoints: true,
    strokeWidth: 2,
    showGrid: true,
    darkMode: false,
  },
};

export const DifferentColor: Story = {
  args: {
    data: defaultData,
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'revenue' },
    dataKey: 'revenue',
    colors: ['#44ba82'],
    width: 600,
    height: 400,
    showArea: false,
    showPoints: true,
    strokeWidth: 2,
    showGrid: true,
    darkMode: false,
  },
};

export const DifferentColorWithArea: Story = {
  args: {
    data: defaultData,
    xAxis: { dataKey: 'month' },
    yAxis: { dataKey: 'revenue' },
    dataKey: 'revenue',
    colors: ['#f59e0b'],
    width: 600,
    height: 400,
    showArea: true,
    showPoints: true,
    strokeWidth: 2,
    showGrid: true,
    darkMode: false,
  },
};