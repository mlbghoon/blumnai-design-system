import { useEffect, useRef } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { AvatarGroup } from './AvatarGroup';

const meta = {
  title: 'Components/Avatar/AvatarGroup',
  component: AvatarGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
      description: '그룹 내 모든 아바타의 크기',
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
      description: '아바타의 겹침 순서',
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
      description: '아바타 props 배열',
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
      description: '+N 표시 전 표시할 최대 아바타 수',
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
    className: '',
  },
  render: function Render(args) {
    const groupRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (groupRef.current) {
        console.log('AvatarGroup ref:', groupRef.current);
      }
    }, []);

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

