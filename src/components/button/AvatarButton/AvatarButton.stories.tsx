import type { Meta, StoryObj } from '@storybook/react';

import avatarPlaceholderIcon from '../../../assets/avatar-placeholder-icon.png';

import { AvatarButton } from './AvatarButton';

const meta: Meta<typeof AvatarButton> = {
  title: 'Components/Button/AvatarButton',
  component: AvatarButton,
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  tags: ['autodocs'],
  argTypes: {
    style: {
      control: 'select',
      options: ['default', 'dashed', 'soft'],
      description: '아바타 버튼의 스타일 변형',
      table: {
        type: {
          summary: 'AvatarButtonStyle',
          detail: `'default' | 'dashed' | 'soft'`,
        },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'lg'],
      description: '아바타 버튼의 크기',
      table: {
        type: {
          summary: 'AvatarButtonSize',
          detail: `'sm' | 'lg'`,
        },
      },
    },
    avatar: {
      control: 'text',
      description: '아바타 이미지 URL',
      type: { required: true },
      table: {
        type: { summary: 'string' },
      },
    },
    alt: {
      control: 'text',
      description: '아바타 이미지의 대체 텍스트',
      table: {
        type: { summary: 'string' },
      },
    },
    label: {
      control: 'text',
      description: '아바타 버튼의 라벨 텍스트',
      type: { required: true },
      table: {
        type: { summary: 'string' },
      },
    },
    tailIcon: {
      control: 'object',
      description: '라벨 뒤에 표시되는 아이콘',
      table: {
        type: { summary: 'AvatarButtonIconType | ReactNode' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '버튼 비활성화 여부',
      table: {
        type: { summary: 'boolean' },
      },
    },
    onClick: {
      action: 'clicked',
      description: '버튼 클릭 시 호출되는 콜백 함수',
      table: {
        type: { summary: '(event: MouseEvent) => void' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof AvatarButton>;

/**
 * 기본 아바타 버튼
 *
 * AvatarButton 컴포넌트는 `ref`와 `className` prop을 지원합니다.
 * - `ref`: button 요소에 직접 접근 가능
 * - `className`: 커스텀 스타일 클래스 추가 가능
 */
export const Default: Story = {
  args: {
    avatar: avatarPlaceholderIcon,
    label: 'Button',
    style: 'default',
    size: 'lg',
    tailIcon: ['arrows', 'arrow-down-s'],
  },
  parameters: {
    controls: { disable: false },
  },
};

/**
 * 모든 스타일
 */
export const AllStyles: Story = {
  render: () => (
    <div className="flex flex-wrap gap-12 items-center">
      <AvatarButton avatar={avatarPlaceholderIcon} label="Default" style="default" tailIcon={['arrows', 'arrow-down-s']} />
      <AvatarButton avatar={avatarPlaceholderIcon} label="Dashed" style="dashed" tailIcon={['arrows', 'arrow-down-s']} />
      <AvatarButton avatar={avatarPlaceholderIcon} label="Soft" style="soft" tailIcon={['arrows', 'arrow-down-s']} />
    </div>
  ),
};

/**
 * 모든 크기
 */
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-12 items-center">
      <AvatarButton avatar={avatarPlaceholderIcon} label="Small" size="sm" tailIcon={['arrows', 'arrow-down-s']} />
      <AvatarButton avatar={avatarPlaceholderIcon} label="Large" size="lg" tailIcon={['arrows', 'arrow-down-s']} />
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
        <AvatarButton avatar={avatarPlaceholderIcon} label="Default" tailIcon={['arrows', 'arrow-down-s']} />
        <AvatarButton avatar={avatarPlaceholderIcon} label="Disabled" tailIcon={['arrows', 'arrow-down-s']} disabled />
      </div>
      <div className="flex flex-wrap gap-12 items-center">
        <AvatarButton avatar={avatarPlaceholderIcon} label="Dashed" style="dashed" tailIcon={['arrows', 'arrow-down-s']} />
        <AvatarButton avatar={avatarPlaceholderIcon} label="Disabled" style="dashed" tailIcon={['arrows', 'arrow-down-s']} disabled />
      </div>
      <div className="flex flex-wrap gap-12 items-center">
        <AvatarButton avatar={avatarPlaceholderIcon} label="Soft" style="soft" tailIcon={['arrows', 'arrow-down-s']} />
        <AvatarButton avatar={avatarPlaceholderIcon} label="Disabled" style="soft" tailIcon={['arrows', 'arrow-down-s']} disabled />
      </div>
    </div>
  ),
};

/**
 * 아이콘 없음
 */
export const WithoutIcon: Story = {
  render: () => (
    <div className="flex flex-wrap gap-12 items-center">
      <AvatarButton avatar={avatarPlaceholderIcon} label="No Icon" />
      <AvatarButton avatar={avatarPlaceholderIcon} label="With Icon" tailIcon={['arrows', 'arrow-down-s']} />
    </div>
  ),
};
