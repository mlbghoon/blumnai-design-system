import type { Meta, StoryObj } from '@storybook/react';

import { FilterButton } from '../FilterButton';

const meta: Meta<typeof FilterButton> = {
  title: 'Components/Button/FilterButton',
  component: FilterButton,
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'md', 'lg'],
      description: '필터 버튼의 크기',
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
      description: '필터 버튼의 모양',
      table: {
        type: {
          summary: 'FilterButtonShape',
          detail: `'rounded' | 'pill'`,
        },
      },
    },
    icon: {
      control: 'object',
      description: '필터 아이콘용 아이콘 타입 튜플',
      table: {
        type: {
          summary: 'IconType',
          detail: `[category, name] 튜플 형식
예시: ['system', 'filter']
기본값: ['system', 'filter']`,
        },
      },
    },
    label: {
      control: 'text',
      description: '필터 버튼의 라벨 텍스트',
      table: {
        type: { summary: 'string' },
      },
    },
    selected: {
      control: 'boolean',
      description: '버튼이 선택되어 있는지 여부',
      table: {
        type: { summary: 'boolean' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '버튼이 비활성화되어 있는지 여부',
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
    label: 'Filter',
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
    <div className="flex flex-wrap gap-12 items-center">
      <FilterButton label="Filter" size="xs" />
      <FilterButton label="Filter" size="md" />
      <FilterButton label="Filter" size="lg" />
    </div>
  ),
};

/**
 * 모든 형태
 */
export const AllShapes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-12 items-center">
      <FilterButton label="Rounded" shape="rounded" />
      <FilterButton label="Pill" shape="pill" />
    </div>
  ),
};

/**
 * 선택 상태
 */
export const Selected: Story = {
  render: () => (
    <div className="flex flex-wrap gap-12 items-center">
      <FilterButton label="Unselected" selected={false} />
      <FilterButton label="Selected" selected={true} />
    </div>
  ),
};

/**
 * 상태
 */
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-16">
      <div className="flex flex-wrap gap-12 items-center">
        <span className="text-muted size-sm width-80">Default:</span>
        <FilterButton label="Normal" />
        <FilterButton label="Selected" selected />
        <FilterButton label="Disabled" disabled />
      </div>
      <div className="flex flex-wrap gap-12 items-center">
        <span className="text-muted size-sm width-80">Pill:</span>
        <FilterButton label="Normal" shape="pill" />
        <FilterButton label="Selected" shape="pill" selected />
        <FilterButton label="Disabled" shape="pill" disabled />
      </div>
    </div>
  ),
};

/**
 * 커스텀 아이콘
 */
export const WithCustomIcon: Story = {
  render: () => (
    <div className="flex flex-wrap gap-12 items-center">
      <FilterButton label="Filter" icon={['system', 'filter']} />
      <FilterButton label="Settings" icon={['system', 'settings']} />
      <FilterButton label="Search" icon={['system', 'search']} />
    </div>
  ),
};
