import type { Meta, StoryObj } from '@storybook/react-vite';

import avatarPlaceholderIcon from '../../../assets/avatar-placeholder-icon.png';

import { AvatarButton } from '../AvatarButton';

const meta: Meta<typeof AvatarButton> = {
  title: 'Actions/Button/AvatarButton',
  component: AvatarButton,
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  tags: ['autodocs'],
  argTypes: {
    buttonStyle: {
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
      table: {
        type: { summary: 'string' },
      },
    },
    tailIcon: {
      control: 'object',
      description: '라벨 뒤에 표시되는 아이콘',
      table: {
        type: {
          summary: 'AvatarButtonIconType | ReactNode',
          detail: `[category, name] 또는 [category, name, isFill] 튜플 형식
예시: ['arrows', 'arrow-down-s']
예시: ['arrows', 'chevron-down', true] (채워진 아이콘)
카테고리: system, arrows, media, editor, health, business 등`,
        },
      },
    },
    disabled: {
      control: 'boolean',
      description: '버튼 비활성화 여부',
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
    onClick: {
      action: 'clicked',
      description: '버튼 클릭 시 호출되는 콜백 함수',
      table: {
        type: { summary: '(event: MouseEvent) => void' },
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
type Story = StoryObj<typeof AvatarButton>;

/**
 * 기본 아바타 버튼
 *
 * AvatarButton 컴포넌트는 `ref`와 `className` prop을 지원합니다.
 * - `ref`: button 요소에 직접 접근 가능
 * - `className`: 커스텀 스타일 클래스 추가 가능
 * - `asChild`: Radix Slot 패턴으로 자식 요소를 버튼으로 렌더링
 */
export const Default: Story = {
  args: {
    avatar: avatarPlaceholderIcon,
    label: 'Button',
    buttonStyle: 'default',
    size: 'lg',
    alt: undefined,
    tailIcon: ['arrows', 'arrow-down-s'],
    disabled: false,
    asChild: false,
    width: undefined,
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
    <div className="flex flex-wrap ds-gap-12 items-center">
      <AvatarButton avatar={avatarPlaceholderIcon} label="Default" buttonStyle="default" tailIcon={['arrows', 'arrow-down-s']} />
      <AvatarButton avatar={avatarPlaceholderIcon} label="Dashed" buttonStyle="dashed" tailIcon={['arrows', 'arrow-down-s']} />
      <AvatarButton avatar={avatarPlaceholderIcon} label="Soft" buttonStyle="soft" tailIcon={['arrows', 'arrow-down-s']} />
    </div>
  ),
};

/**
 * 모든 크기
 */
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap ds-gap-12 items-center">
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
    <div className="flex flex-col ds-gap-16">
      <div className="flex flex-wrap ds-gap-12 items-center">
        <AvatarButton avatar={avatarPlaceholderIcon} label="Default" tailIcon={['arrows', 'arrow-down-s']} />
        <AvatarButton avatar={avatarPlaceholderIcon} label="Disabled" tailIcon={['arrows', 'arrow-down-s']} disabled />
      </div>
      <div className="flex flex-wrap ds-gap-12 items-center">
        <AvatarButton avatar={avatarPlaceholderIcon} label="Dashed" buttonStyle="dashed" tailIcon={['arrows', 'arrow-down-s']} />
        <AvatarButton avatar={avatarPlaceholderIcon} label="Disabled" buttonStyle="dashed" tailIcon={['arrows', 'arrow-down-s']} disabled />
      </div>
      <div className="flex flex-wrap ds-gap-12 items-center">
        <AvatarButton avatar={avatarPlaceholderIcon} label="Soft" buttonStyle="soft" tailIcon={['arrows', 'arrow-down-s']} />
        <AvatarButton avatar={avatarPlaceholderIcon} label="Disabled" buttonStyle="soft" tailIcon={['arrows', 'arrow-down-s']} disabled />
      </div>
    </div>
  ),
};

/**
 * 아이콘 없음
 */
export const WithoutIcon: Story = {
  render: () => (
    <div className="flex flex-wrap ds-gap-12 items-center">
      <AvatarButton avatar={avatarPlaceholderIcon} label="No Icon" />
      <AvatarButton avatar={avatarPlaceholderIcon} label="With Icon" tailIcon={['arrows', 'arrow-down-s']} />
    </div>
  ),
};
