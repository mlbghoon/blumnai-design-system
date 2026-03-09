import { useRef } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { ButtonGroup } from '../ButtonGroup';

const meta: Meta<typeof ButtonGroup> = {
  title: 'Actions/Button/ButtonGroup',
  component: ButtonGroup,
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: 'object',
      description: '버튼 그룹에 표시할 아이템 배열입니다. 각 아이템에 라벨, 아이콘, 뱃지 등을 설정할 수 있습니다',
      table: {
        type: {
          summary: 'ButtonGroupItem[]',
          detail: `각 아이템 속성:
- label?: ReactNode
- icon?: IconType | ReactNode (예: ['system', 'settings'])
- tailIcon?: IconType | ReactNode (오른쪽 아이콘)
- badge?: string
- disabled?: boolean
- onClick?: () => void`,
        },
      },
    },
    size: {
      control: 'select',
      options: ['2xs', 'xs', 'sm', 'md', 'lg'],
      description: '그룹 내 모든 버튼의 크기를 설정합니다. 2xs(가장 작게)부터 lg(크게)까지 선택할 수 있습니다',
      table: {
        type: {
          summary: 'ButtonGroupSize',
          detail: `'2xs' | 'xs' | 'sm' | 'md' | 'lg'`,
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

const defaultItems = [
  { label: '작게' },
  { label: '보통' },
  { label: '크게' },
];

/**
 * 기본 ButtonGroup
 *
 * ButtonGroup 컴포넌트는 `ref`와 `className` prop을 지원합니다.
 * - `ref`: DOM 요소에 직접 접근 가능
 * - `className`: 커스텀 스타일 클래스 추가 가능
 */
export const Default: Story = {
  args: {
    items: defaultItems,
    size: 'sm',
    className: '',
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const groupRef = useRef<HTMLDivElement>(null);
    return <ButtonGroup ref={groupRef} {...args} />;
  },
};

/**
 * 아이콘 포함
 */
export const WithIcons: Story = {
  args: {
    items: [
      { label: '실시간 미리보기', icon: ['system', 'eye'] },
      { icon: ['system', 'settings'], ariaLabel: 'Settings' },
    ],
    size: 'sm',
  },
};

/**
 * 뱃지 포함
 */
export const WithBadge: Story = {
  args: {
    items: [
      { label: '다운로드', icon: ['system', 'download'], badge: '3 MB' },
      { label: '2K' },
    ],
    size: 'sm',
  },
};

/**
 * Tail 아이콘 포함
 */
export const WithTailIcon: Story = {
  args: {
    items: [
      { label: '이슈 닫기', icon: ['system', 'close-circle'], tailIcon: ['arrows', 'chevron-down'] },
      { icon: ['system', 'settings'], ariaLabel: 'Settings' },
    ],
    size: 'sm',
  },
};

/**
 * 모든 크기
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col ds-gap-16">
      <ButtonGroup items={defaultItems} size="lg" />
      <ButtonGroup items={defaultItems} size="md" />
      <ButtonGroup items={defaultItems} size="sm" />
      <ButtonGroup items={defaultItems} size="xs" />
      <ButtonGroup items={defaultItems} size="2xs" />
    </div>
  ),
};

/**
 * 아이콘만
 */
export const IconOnly: Story = {
  args: {
    items: [
      { icon: ['editor', 'bold'], ariaLabel: 'Bold' },
      { icon: ['editor', 'italic'], ariaLabel: 'Italic' },
      { icon: ['editor', 'underline'], ariaLabel: 'Underline' },
      { icon: ['editor', 'strikethrough'], ariaLabel: 'Strikethrough' },
    ],
    size: 'sm',
  },
};

/**
 * 비활성화
 */
export const Disabled: Story = {
  args: {
    items: [
      { label: 'Label', icon: ['system', 'add'], badge: '8', tailIcon: ['arrows', 'chevron-down'] },
      { label: 'Label', icon: ['system', 'add'], badge: '8', tailIcon: ['arrows', 'chevron-down'], disabled: true },
      { icon: ['system', 'settings'], ariaLabel: 'Settings', disabled: true },
    ],
    size: 'sm',
  },
};
