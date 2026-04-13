import type { Meta, StoryObj } from '@storybook/react-vite';

import { ProportionBar } from './ProportionBar';

const meta: Meta<typeof ProportionBar> = {
  title: 'DataDisplay/Chart/ProportionBar',
  component: ProportionBar,
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  tags: ['autodocs'],
  argTypes: {
    data: {
      control: 'object',
      description: '비율 바에 표시할 데이터 배열입니다. 각 항목은 name, value, color를 포함합니다',
      table: {
        type: {
          summary: 'ProportionBarItem[]',
          detail: `{ name: string; value: number; color: string }[]`,
        },
      },
    },
    totalLabel: {
      control: 'text',
      description: '상단에 표시되는 총계 라벨입니다',
      table: {
        type: { summary: 'string' },
      },
    },
    totalValue: {
      control: 'text',
      description: '상단에 표시되는 총계 값입니다',
      table: {
        type: { summary: 'string' },
      },
    },
    valueSuffix: {
      control: 'text',
      description: '값 뒤에 붙는 단위 텍스트입니다 (예: "%", "건")',
      table: {
        type: { summary: 'string' },
      },
    },
    valueFormatter: {
      control: false,
      description: '범례 값을 커스텀 포맷하는 함수입니다',
      table: {
        type: {
          summary: '(value: number, name: string) => string',
        },
      },
    },
    showLegend: {
      control: 'boolean',
      description: '범례 표시 여부를 설정합니다',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    legendPosition: {
      control: 'select',
      options: ['bottom', 'right'],
      description: '범례의 위치를 설정합니다. bottom은 바 아래, right는 바 오른쪽에 표시됩니다',
      table: {
        type: {
          summary: "'bottom' | 'right'",
        },
        defaultValue: { summary: "'right'" },
      },
    },
    legendInteractive: {
      control: 'boolean',
      description: '범례 항목 클릭으로 세그먼트를 토글할 수 있는지 여부입니다',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    animated: {
      control: 'boolean',
      description: '바 애니메이션 활성화 여부입니다',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    variant: {
      control: 'select',
      options: ['default', 'unstyled'],
      description: '컨테이너 스타일 변형입니다. default는 카드 스타일, unstyled는 배경/패딩 없음',
      table: {
        type: {
          summary: "'default' | 'unstyled'",
        },
        defaultValue: { summary: "'default'" },
      },
    },
    height: {
      control: 'number',
      description: '바의 높이를 px 단위로 설정합니다',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '40' },
      },
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스를 지정합니다',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProportionBar>;

const sampleData = [
  { name: '응대 전 이탈', value: 75, color: 'var(--chart-4)' },
  { name: '자동 종료', value: 25, color: 'var(--chart-7)' },
];

/**
 * 기본 ProportionBar
 *
 * 비율 바 컴포넌트의 기본 형태입니다.
 */
export const Default: Story = {
  args: {
    data: sampleData,
    totalLabel: undefined,
    totalValue: undefined,
    valueSuffix: undefined,
    showLegend: true,
    legendPosition: 'right',
    legendInteractive: false,
    animated: true,
    variant: 'default',
    height: 40,
    className: undefined,
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    return (
      <ProportionBar
        data={args.data}
        totalLabel={args.totalLabel}
        totalValue={args.totalValue}
        valueSuffix={args.valueSuffix}
        showLegend={args.showLegend}
        legendPosition={args.legendPosition}
        legendInteractive={args.legendInteractive}
        animated={args.animated}
        variant={args.variant}
        height={args.height}
        className={args.className}
      />
    );
  },
};

/**
 * 총계 정보 표시
 *
 * totalLabel과 totalValue를 사용하여 상단에 총계 정보를 표시합니다.
 */
export const WithTotalInfo: Story = {
  render: () => (
    <ProportionBar
      data={sampleData}
      totalLabel="총상담"
      totalValue="4"
      valueSuffix="%"
      showLegend={true}
      legendPosition="right"
      animated={true}
      variant="default"
      height={40}
    />
  ),
};

/**
 * 인터랙티브 범례
 *
 * 범례 항목을 클릭하여 해당 세그먼트를 토글할 수 있습니다.
 */
export const InteractiveLegend: Story = {
  render: () => (
    <ProportionBar
      data={sampleData}
      showLegend={true}
      legendInteractive={true}
      legendPosition="right"
      animated={true}
      variant="default"
      height={40}
    />
  ),
};

/**
 * 오른쪽 범례 + 값 포맷터
 *
 * legendPosition="right"와 valueFormatter를 함께 사용하는 예시입니다.
 */
export const RightLegend: Story = {
  render: () => (
    <ProportionBar
      data={sampleData}
      showLegend={true}
      legendPosition="right"
      valueFormatter={(value) => `${value.toLocaleString()}건`}
      animated={true}
      variant="default"
      height={40}
    />
  ),
};

/**
 * 다중 세그먼트
 *
 * 5개 이상의 세그먼트를 가진 비율 바입니다.
 */
export const MultipleSegments: Story = {
  render: () => (
    <ProportionBar
      data={[
        { name: '상담 완료', value: 35, color: 'var(--chart-1)' },
        { name: '응대 전 이탈', value: 20, color: 'var(--chart-2)' },
        { name: '자동 종료', value: 15, color: 'var(--chart-3)' },
        { name: '전환 상담', value: 12, color: 'var(--chart-4)' },
        { name: '대기 중', value: 10, color: 'var(--chart-5)' },
        { name: '기타', value: 8, color: 'var(--chart-7)' },
      ]}
      showLegend={true}
      legendPosition="bottom"
      animated={true}
      variant="default"
      height={40}
    />
  ),
};

/**
 * Unstyled 변형
 *
 * variant="unstyled"로 컨테이너 스타일 없이 바만 표시합니다.
 */
export const Unstyled: Story = {
  render: () => (
    <ProportionBar
      data={sampleData}
      showLegend={true}
      legendPosition="right"
      animated={true}
      variant="unstyled"
      height={40}
    />
  ),
};

/**
 * 애니메이션 비활성화
 *
 * animated=false로 애니메이션 없이 즉시 렌더링합니다.
 */
export const NoAnimation: Story = {
  render: () => (
    <ProportionBar
      data={sampleData}
      showLegend={true}
      legendPosition="right"
      animated={false}
      variant="default"
      height={40}
    />
  ),
};
