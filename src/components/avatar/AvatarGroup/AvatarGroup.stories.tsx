import { useRef } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { AvatarGroup } from './AvatarGroup';

const meta = {
  title: 'DataDisplay/Avatar/AvatarGroup',
  component: AvatarGroup,
  parameters: {
    layout: 'centered',
    controls: { disable: true },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
      description: '그룹 내 모든 아바타의 크기를 설정합니다. 2xs(가장 작게)부터 3xl(가장 크게)까지 선택할 수 있습니다',
      table: {
        type: {
          summary: 'AvatarSize',
          detail: `'2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'`,
        },
      },
    },
    stacking: {
      control: 'select',
      options: ['last-on-top', 'first-on-top'],
      description: '아바타가 겹쳐 표시될 때의 순서를 설정합니다. last-on-top은 마지막 아바타가 위에, first-on-top은 첫 번째 아바타가 위에 표시됩니다',
      table: {
        type: {
          summary: 'AvatarGroupStacking',
          detail: `'last-on-top' | 'first-on-top'

- last-on-top: 마지막 아바타가 위에 표시됨 (z-index 증가)
- first-on-top: 첫 번째 아바타가 위에 표시됨 (z-index 감소)`,
        },
      },
    },
    avatars: {
      control: 'object',
      description: '그룹에 표시할 아바타 목록입니다. 각 항목에 variant, initials, src 등을 설정할 수 있습니다',
      table: {
        type: {
          summary: 'AvatarProps[]',
          detail: `각 아바타 속성:
- variant: 'initials' | 'userpic' | 'empty'
- initials?: string
- src?: string
- alt?: string
- shape?: 'circular' | 'rounded'
- color?: string

참고: AvatarGroup에서는 상태 배지가 지원되지 않음`,
        },
      },
    },
    max: {
      control: 'number',
      description: '한 번에 표시할 최대 아바타 수입니다. 초과하는 아바타는 "+N" 형태로 요약 표시됩니다',
      table: {
        type: {
          summary: 'number',
          detail: '미제공 시 모든 아바타가 표시됨',
        },
      },
    },
  },
} satisfies Meta<typeof AvatarGroup>;

export default meta;
type Story = StoryObj<typeof AvatarGroup>;

const sampleAvatars = [
  { variant: 'initials' as const, initials: 'JD' },
  { variant: 'initials' as const, initials: 'AB' },
  { variant: 'initials' as const, initials: 'CD' },
  { variant: 'initials' as const, initials: 'EF' },
];

/**
 * 기본 AvatarGroup
 *
 * AvatarGroup 컴포넌트는 `ref`와 `className` prop을 지원합니다.
 * - `ref`: DOM 요소에 직접 접근 가능
 * - `className`: 커스텀 스타일 클래스 추가 가능
 */
export const Default: Story = {
  args: {
    size: 'md',
    stacking: 'last-on-top',
    avatars: sampleAvatars,
    max: undefined,
    className: '',
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const groupRef = useRef<HTMLDivElement>(null);
    return <AvatarGroup ref={groupRef} {...args} />;
  },
};

export const LastOnTop: Story = {
  parameters: { controls: { disable: true } },
  args: {
    size: 'md',
    stacking: 'last-on-top',
    avatars: sampleAvatars,
  },
};

export const FirstOnTop: Story = {
  parameters: { controls: { disable: true } },
  args: {
    size: 'md',
    stacking: 'first-on-top',
    avatars: sampleAvatars,
  },
};

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span>2xs</span>
        <AvatarGroup size="2xs" avatars={sampleAvatars} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span>xs</span>
        <AvatarGroup size="xs" avatars={sampleAvatars} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span>sm</span>
        <AvatarGroup size="sm" avatars={sampleAvatars} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span>md</span>
        <AvatarGroup size="md" avatars={sampleAvatars} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span>lg</span>
        <AvatarGroup size="lg" avatars={sampleAvatars} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span>xl</span>
        <AvatarGroup size="xl" avatars={sampleAvatars} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span>2xl</span>
        <AvatarGroup size="2xl" avatars={sampleAvatars} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span>3xl</span>
        <AvatarGroup size="3xl" avatars={sampleAvatars} />
      </div>
    </div>
  ),
};

export const WithMax: Story = {
  parameters: { controls: { disable: true } },
  args: {
    size: 'md',
    stacking: 'last-on-top',
    avatars: [
      { variant: 'initials' as const, initials: 'JD' },
      { variant: 'initials' as const, initials: 'AB' },
      { variant: 'initials' as const, initials: 'CD' },
      { variant: 'initials' as const, initials: 'EF' },
      { variant: 'initials' as const, initials: 'GH' },
      { variant: 'initials' as const, initials: 'IJ' },
    ],
    max: 4,
  },
};

export const MixedVariants: Story = {
  parameters: { controls: { disable: true } },
  args: {
    size: 'md',
    stacking: 'last-on-top',
    avatars: [
      { variant: 'initials' as const, initials: 'JD' },
      { variant: 'userpic' as const, src: 'https://i.pravatar.cc/150?img=12', alt: 'User 1' },
      { variant: 'empty' as const },
      { variant: 'initials' as const, initials: 'AB' },
    ],
  },
};

