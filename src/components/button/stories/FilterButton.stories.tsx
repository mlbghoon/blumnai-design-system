import type { Meta, StoryObj } from '@storybook/react-vite';
import { RiFilterLine, RiSearchLine, RiSettingsLine } from '../../icons/Icon';

import { FilterButton } from '../FilterButton';

const meta: Meta<typeof FilterButton> = {
  title: 'Actions/Button/FilterButton',
  component: FilterButton,
  parameters: {
    layout: 'centered',
    controls: { disable: true },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'md', 'lg'],
      description: '필터 버튼의 크기를 설정합니다. xs(작게), md(보통), lg(크게) 중 선택할 수 있습니다',
      table: {
        type: {
          summary: 'FilterButtonSize',
          detail: `'xs' | 'md' | 'lg'`,
        },
      },
    },
    shape: {
      control: 'select',
      options: ['rounded', 'pill'],
      description: '필터 버튼의 외곽선 모양을 설정합니다. rounded는 둥근 모서리, pill은 완전히 둥근 알약 형태입니다',
      table: {
        type: {
          summary: 'FilterButtonShape',
          detail: `'rounded' | 'pill'`,
        },
      },
    },
    icon: {
      control: 'object',
      description: '필터 버튼에 표시할 아이콘 (Remixicon `Ri*` component 권장, tuple form 은 deprecated). 미지정 시 기본 필터 아이콘이 표시됩니다',
      table: {
        type: {
          summary: 'IconType',
          detail: `Remixicon component (권장, tree-shakeable):
  icon={RiFilter3Line}
  icon={RiEqualizerLine}

또는 tuple form (deprecated, dev console warning):
  icon={['system', 'filter']}

기본값: 필터 아이콘`,
        },
      },
    },
    label: {
      control: 'text',
      description: '필터 버튼에 표시되는 라벨 텍스트입니다',
      table: {
        type: { summary: 'string' },
      },
    },
    selected: {
      control: 'boolean',
      description: 'true로 설정하면 버튼이 선택된 상태로 표시되어 활성화된 필터임을 나타냅니다',
      table: {
        type: { summary: 'boolean' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'true로 설정하면 버튼이 비활성화되어 클릭할 수 없고, 시각적으로 흐리게 표시됩니다',
      table: {
        type: { summary: 'boolean' },
      },
    },
    asChild: {
      control: 'boolean',
      description: 'true일 경우 자식 요소를 버튼으로 렌더링 (Radix Slot 패턴)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    width: {
      control: 'text',
      description: '버튼의 커스텀 너비 (예: "200", "100%", "auto")',
      table: {
        type: { summary: 'string | number' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof FilterButton>;

/**
 * 기본 FilterButton
 *
 * FilterButton 컴포넌트는 `ref`와 `className` prop을 지원합니다.
 * - `ref`: button 요소에 직접 접근 가능
 * - `className`: 커스텀 스타일 클래스 추가 가능
 * - `asChild`: Radix Slot 패턴으로 자식 요소를 버튼으로 렌더링
 */
export const Default: Story = {
  args: {
    label: '필터',
    size: 'md',
    shape: 'rounded',
    icon: ['system', 'filter'],
    selected: false,
    disabled: false,
    asChild: false,
    width: undefined,
  },
  parameters: {
    controls: { disable: false },
  },
};

/**
 * 모든 크기
 */
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap ds-gap-12 items-center justify-center">
      <FilterButton label="필터" size="xs" />
      <FilterButton label="필터" size="md" />
      <FilterButton label="필터" size="lg" />
    </div>
  ),
};

/**
 * 모든 형태
 */
export const AllShapes: Story = {
  render: () => (
    <div className="flex flex-wrap ds-gap-12 items-center justify-center">
      <FilterButton label="둥근 모서리" shape="rounded" />
      <FilterButton label="알약형" shape="pill" />
    </div>
  ),
};

/**
 * 선택 상태
 */
export const Selected: Story = {
  render: () => (
    <div className="flex flex-wrap ds-gap-12 items-center justify-center">
      <FilterButton label="미선택" selected={false} />
      <FilterButton label="선택됨" selected={true} />
    </div>
  ),
};

/**
 * 상태
 */
export const States: Story = {
  render: () => (
    <div className="flex flex-col ds-gap-16">
      <div className="flex flex-wrap ds-gap-12 items-center justify-center">
        <span className="text-muted size-sm width-80">Default:</span>
        <FilterButton label="기본" />
        <FilterButton label="선택됨" selected />
        <FilterButton label="비활성화" disabled />
      </div>
      <div className="flex flex-wrap ds-gap-12 items-center justify-center">
        <span className="text-muted size-sm width-80">Pill:</span>
        <FilterButton label="Normal" shape="pill" />
        <FilterButton label="선택됨" shape="pill" selected />
        <FilterButton label="비활성화" shape="pill" disabled />
      </div>
    </div>
  ),
};

/**
 * 커스텀 아이콘
 */
export const WithCustomIcon: Story = {
  render: () => (
    <div className="flex flex-wrap ds-gap-12 items-center justify-center">
      <FilterButton label="필터" icon={RiFilterLine} />
      <FilterButton label="설정" icon={RiSettingsLine} />
      <FilterButton label="검색" icon={RiSearchLine} />
    </div>
  ),
};
