import type { Meta, StoryObj } from '@storybook/react-vite';

import { BarList } from './BarList';

const meta: Meta<typeof BarList> = {
  title: 'DataDisplay/Chart/BarList',
  component: BarList,
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  tags: ['autodocs'],
  argTypes: {
    data: {
      control: 'object',
      description: '바 리스트에 표시할 데이터 배열입니다. 각 항목은 name, value, color(선택)를 포함합니다',
      table: {
        type: {
          summary: 'BarListItem[]',
          detail: `{ name: string; value: number; color?: string }[]`,
        },
      },
    },
    valueFormatter: {
      control: false,
      description: '값을 커스텀 포맷하는 함수입니다',
      table: {
        type: { summary: '(value: number) => string' },
      },
    },
    valueSuffix: {
      control: 'text',
      description: '값 뒤에 붙는 단위 텍스트입니다 (예: "건", "%")',
      table: {
        type: { summary: 'string' },
      },
    },
    showCount: {
      control: 'number',
      description: '접기 전 표시할 항목 수입니다. 데이터가 이 수보다 많으면 접기/펼치기 버튼이 표시됩니다',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '5' },
      },
    },
    color: {
      control: 'text',
      description: '기본 바 색상입니다. 개별 항목에 color가 없을 때 사용됩니다',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'var(--chart-1)'" },
      },
    },
    fillColor: {
      control: 'text',
      description: '바 채우기 색상입니다. 미지정 시 color 기반 alpha 값이 사용됩니다',
      table: {
        type: { summary: 'string' },
      },
    },
    maxHeight: {
      control: 'number',
      description: '스크롤 컨테이너의 최대 높이를 px 단위로 설정합니다',
      table: {
        type: { summary: 'number' },
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
    className: {
      control: 'text',
      description: '추가 CSS 클래스를 지정합니다',
      table: {
        type: { summary: 'string' },
      },
    },
    onItemClick: {
      control: false,
      description: '항목 클릭 시 호출되는 콜백 함수입니다',
      table: {
        type: { summary: '(item: BarListItem, index: number) => void' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof BarList>;

const sampleData = [
  { name: '카테고리 A', value: 1234 },
  { name: '카테고리 B', value: 980 },
  { name: '카테고리 C', value: 756 },
  { name: '카테고리 D', value: 432 },
  { name: '카테고리 E', value: 210 },
];

/**
 * 기본 BarList
 *
 * 바 리스트 컴포넌트의 기본 형태입니다.
 */
export const Default: Story = {
  args: {
    data: sampleData,
    valueSuffix: undefined,
    showCount: 5,
    color: undefined,
    fillColor: undefined,
    maxHeight: undefined,
    animated: true,
    className: undefined,
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    return (
      <BarList
        data={args.data}
        valueSuffix={args.valueSuffix}
        showCount={args.showCount}
        color={args.color}
        fillColor={args.fillColor}
        maxHeight={args.maxHeight}
        animated={args.animated}
        className={args.className}
      />
    );
  },
};

/**
 * 값 포맷터
 *
 * valueFormatter를 사용하여 값에 천 단위 구분자를 적용합니다.
 */
export const WithValueFormatter: Story = {
  render: () => (
    <BarList
      data={sampleData}
      valueFormatter={(value) => value.toLocaleString()}
      showCount={5}
      animated={true}
    />
  ),
};

/**
 * 접기/펼치기
 *
 * showCount보다 데이터가 많을 때 접기/펼치기 기능이 활성화됩니다.
 */
export const WithCollapse: Story = {
  render: () => (
    <BarList
      data={[
        { name: '상담 완료', value: 1500 },
        { name: '응대 전 이탈', value: 1200 },
        { name: '자동 종료', value: 980 },
        { name: '전환 상담', value: 756 },
        { name: '대기 중', value: 620 },
        { name: '봇 상담', value: 510 },
        { name: '콜백 요청', value: 340 },
        { name: '기타', value: 180 },
      ]}
      showCount={5}
      animated={true}
    />
  ),
};

/**
 * 단위 텍스트
 *
 * valueSuffix를 사용하여 값 뒤에 단위를 표시합니다.
 */
export const WithSuffix: Story = {
  render: () => (
    <BarList
      data={sampleData}
      valueSuffix="건"
      showCount={5}
      animated={true}
    />
  ),
};

/**
 * 커스텀 색상
 *
 * color와 fillColor를 사용하여 바 색상을 커스터마이즈합니다.
 */
export const CustomColors: Story = {
  render: () => (
    <BarList
      data={sampleData}
      color="var(--chart-3)"
      fillColor="var(--chart-3)"
      showCount={5}
      animated={true}
    />
  ),
};

/**
 * 최대 높이 제한
 *
 * maxHeight를 설정하여 스크롤 가능한 컨테이너로 만듭니다.
 */
export const WithMaxHeight: Story = {
  render: () => (
    <BarList
      data={[
        { name: '상담 완료', value: 1500 },
        { name: '응대 전 이탈', value: 1200 },
        { name: '자동 종료', value: 980 },
        { name: '전환 상담', value: 756 },
        { name: '대기 중', value: 620 },
        { name: '봇 상담', value: 510 },
        { name: '콜백 요청', value: 340 },
        { name: '이메일 문의', value: 280 },
        { name: '채팅 문의', value: 220 },
        { name: '기타', value: 180 },
      ]}
      maxHeight={200}
      showCount={10}
      animated={true}
    />
  ),
};
