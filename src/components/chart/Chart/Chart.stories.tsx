import type { Meta, StoryObj } from '@storybook/react-vite';

import { BarChart } from '../BarChart/BarChart';
import { DonutChart } from '../DonutChart/DonutChart';
import { LineChart } from '../LineChart/LineChart';
import { PieChart } from '../PieChart/PieChart';
import type { ChartConfig } from './Chart.types';

const meta: Meta = {
  title: 'DataDisplay/Chart',
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

// Sample data
const barChartData = [
  { month: 'Jan', sales: 100 },
  { month: 'Feb', sales: 150 },
  { month: 'Mar', sales: 120 },
  { month: 'Apr', sales: 180 },
  { month: 'May', sales: 200 },
  { month: 'Jun', sales: 160 },
];

const lineChartData = [
  { month: 'Jan', revenue: 100 },
  { month: 'Feb', revenue: 150 },
  { month: 'Mar', revenue: 120 },
  { month: 'Apr', revenue: 180 },
  { month: 'May', revenue: 200 },
  { month: 'Jun', revenue: 160 },
];

const pieChartData = [
  { category: '카테고리 A', value: 30 },
  { category: '카테고리 B', value: 45 },
  { category: '카테고리 C', value: 25 },
];

const salesConfig: ChartConfig = {
  sales: { label: '매출', color: 'var(--chart-2)' },
};

const revenueConfig: ChartConfig = {
  revenue: { label: '수익', color: 'var(--chart-1)' },
};

const pieConfig: ChartConfig = {
  '카테고리 A': { label: '카테고리 A', color: 'var(--chart-1)' },
  '카테고리 B': { label: '카테고리 B', color: 'var(--chart-2)' },
  '카테고리 C': { label: '카테고리 C', color: 'var(--chart-3)' },
};

const twoConfig: ChartConfig = {
  '카테고리 A': { label: '카테고리 A', color: 'var(--chart-2)' },
  '카테고리 B': { label: '카테고리 B', color: 'var(--chart-4)' },
};

/**
 * 기본 차트
 *
 * 이 스토리에서 기본적인 막대 차트를 확인할 수 있습니다.
 */
export const Default: Story = {
  parameters: {
    controls: { disable: false },
  },
  render: function Render() {
    return (
      <BarChart
        data={barChartData}
        xAxis={{ dataKey: 'month' }}
        yAxis={{ dataKey: 'sales' }}
        dataKey="sales"
        config={salesConfig}
        width={600}
        height={400}
      />
    );
  },
};

export const BarChartDefault: Story = {
  render: () => (
    <BarChart
      data={barChartData}
      xAxis={{ dataKey: 'month' }}
      yAxis={{ dataKey: 'sales' }}
      dataKey="sales"
      config={salesConfig}
      width={600}
      height={400}
    />
  ),
};

export const LineChartDefault: Story = {
  render: () => (
    <LineChart
      data={lineChartData}
      xAxis={{ dataKey: 'month' }}
      yAxis={{ dataKey: 'revenue' }}
      dataKey="revenue"
      config={revenueConfig}
      width={600}
      height={400}
    />
  ),
};

export const LineChartWithArea: Story = {
  render: () => (
    <LineChart
      data={lineChartData}
      xAxis={{ dataKey: 'month' }}
      yAxis={{ dataKey: 'revenue' }}
      dataKey="revenue"
      config={revenueConfig}
      width={600}
      height={400}
      showArea
    />
  ),
};

export const LineChartNoPoints: Story = {
  render: () => (
    <LineChart
      data={lineChartData}
      xAxis={{ dataKey: 'month' }}
      yAxis={{ dataKey: 'revenue' }}
      dataKey="revenue"
      config={revenueConfig}
      width={600}
      height={400}
      showPoints={false}
    />
  ),
};

export const PieChartDefault: Story = {
  render: () => (
    <PieChart
      data={pieChartData}
      dataKey="value"
      nameKey="category"
      config={pieConfig}
      width={400}
      height={400}
    />
  ),
};

export const PieChartWithLegend: Story = {
  render: () => (
    <PieChart
      data={pieChartData}
      dataKey="value"
      nameKey="category"
      config={pieConfig}
      width={400}
      height={400}
      showLegend
    />
  ),
};

export const DonutChartDefault: Story = {
  render: () => (
    <DonutChart
      data={pieChartData}
      dataKey="value"
      nameKey="category"
      config={pieConfig}
      width={400}
      height={400}
      innerRadius={80}
      outerRadius={150}
      centerLabel="합계"
      centerValue="$20,000"
    />
  ),
};

export const DonutChartWithLegend: Story = {
  render: () => (
    <DonutChart
      data={pieChartData}
      dataKey="value"
      nameKey="category"
      config={pieConfig}
      width={400}
      height={400}
      innerRadius={80}
      outerRadius={150}
      showLegend
    />
  ),
};

export const HalfPieChart: Story = {
  render: () => (
    <PieChart
      data={pieChartData}
      dataKey="value"
      nameKey="category"
      config={pieConfig}
      width={280}
      outerRadius={140}
      isHalf
    />
  ),
};

export const HalfDonutChart: Story = {
  render: () => (
    <DonutChart
      data={pieChartData.slice(0, 2)}
      dataKey="value"
      nameKey="category"
      config={twoConfig}
      width={280}
      innerRadius={80}
      outerRadius={140}
      centerLabel="라벨"
      centerValue="$20,000"
      isHalf
    />
  ),
};

export const AllCharts: Story = {
  render: () => (
    <div className="flex flex-col ds-gap-32">
      <div>
        <h3 className="margin-b-16 size-lg font-semibold">막대 차트</h3>
        <BarChart
          data={barChartData}
          xAxis={{ dataKey: 'month' }}
          yAxis={{ dataKey: 'sales' }}
          dataKey="sales"
          config={salesConfig}
          width={600}
          height={400}
        />
      </div>
      <div>
        <h3 className="margin-b-16 size-lg font-semibold">라인 차트</h3>
        <LineChart
          data={lineChartData}
          xAxis={{ dataKey: 'month' }}
          yAxis={{ dataKey: 'revenue' }}
          dataKey="revenue"
          config={revenueConfig}
          width={600}
          height={400}
        />
      </div>
      <div>
        <h3 className="margin-b-16 size-lg font-semibold">파이 차트</h3>
        <PieChart
          data={pieChartData}
          dataKey="value"
          nameKey="category"
          config={pieConfig}
          width={400}
          height={400}
        />
      </div>
      <div>
        <h3 className="margin-b-16 size-lg font-semibold">도넛 차트</h3>
        <DonutChart
          data={pieChartData}
          dataKey="value"
          nameKey="category"
          config={pieConfig}
          width={400}
          height={400}
          innerRadius={80}
          outerRadius={150}
        />
      </div>
    </div>
  ),
};
