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
      description: '아바타 버튼의 시각적 스타일을 설정합니다. default(기본 테두리), dashed(점선 테두리), soft(부드러운 배경) 중 선택할 수 있습니다',
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
      description: '아바타 버튼의 크기를 설정합니다. sm(작게), lg(크게) 중 선택할 수 있습니다',
      table: {
        type: {
          summary: 'AvatarButtonSize',
          detail: `'sm' | 'lg'`,
        },
      },
    },
    avatar: {
      control: 'text',
      description: '아바타에 표시할 이미지의 URL 경로입니다',
      table: {
        type: { summary: 'string' },
      },
    },
    alt: {
      control: 'text',
      description: '아바타 이미지를 불러올 수 없을 때 표시되는 대체 텍스트입니다. 접근성을 위해 제공하는 것이 좋습니다',
      table: {
        type: { summary: 'string' },
      },
    },
    label: {
      control: 'text',
      description: '아바타 옆에 표시되는 라벨 텍스트입니다',
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
    label: '버튼',
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
