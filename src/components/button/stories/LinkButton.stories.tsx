import type { Meta, StoryObj } from '@storybook/react';

import { LinkButton } from '../LinkButton';

const meta: Meta<typeof LinkButton> = {
  title: 'Components/Button/LinkButton',
  component: LinkButton,
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  tags: ['autodocs'],
  argTypes: {
    linkType: {
      control: 'select',
      options: ['default', 'muted', 'informative'],
      description: '링크 버튼의 타입',
      table: {
        type: {
          summary: 'LinkButtonType',
          detail: `'default' | 'muted' | 'informative'`,
        },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: '링크 버튼의 크기',
      table: {
        type: {
          summary: 'LinkButtonSize',
          detail: `'sm' | 'md' | 'lg'`,
        },
      },
    },
    leadIcon: {
      control: 'object',
      description: '라벨 앞에 표시되는 아이콘',
      table: {
        type: {
          summary: 'LinkButtonIconType | ReactNode',
          detail: `[category, name] 튜플 형식
예시: ['system', 'link']`,
        },
      },
    },
    tailIcon: {
      control: 'object',
      description: '라벨 뒤에 표시되는 아이콘',
      table: {
        type: {
          summary: 'LinkButtonIconType | ReactNode',
          detail: `[category, name] 튜플 형식
예시: ['system', 'external-link']
기본값: ['system', 'external-link']`,
        },
      },
    },
    label: {
      control: 'text',
      description: '링크 버튼의 라벨 텍스트',
      table: {
        type: { summary: 'string' },
      },
    },
    href: {
      control: 'text',
      description: '이동할 URL (anchor로 렌더링됨)',
      table: {
        type: { summary: 'string' },
      },
    },
    openInNewTab: {
      control: 'boolean',
      description: '새 탭에서 링크 열기',
      table: {
        type: { summary: 'boolean' },
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
type Story = StoryObj<typeof LinkButton>;

/**
 * 기본 링크 버튼
 *
 * LinkButton 컴포넌트는 `ref`와 `className` prop을 지원합니다.
 * - `ref`: button/anchor 요소에 직접 접근 가능
 * - `className`: 커스텀 스타일 클래스 추가 가능
 * - `asChild`: Radix Slot 패턴으로 자식 요소를 버튼으로 렌더링
 */
export const Default: Story = {
  args: {
    label: 'Preview',
    linkType: 'default',
    size: 'md',
    leadIcon: undefined,
    tailIcon: ['system', 'external-link'],
    href: undefined,
    openInNewTab: false,
    disabled: false,
    asChild: false,
    width: undefined,
  },
  parameters: {
    controls: { disable: false },
  },
};

/**
 * 모든 타입
 */
export const AllTypes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-16 items-center">
      <LinkButton label="Default" linkType="default" />
      <LinkButton label="Muted" linkType="muted" />
      <LinkButton label="Informative" linkType="informative" />
    </div>
  ),
};

/**
 * 모든 크기
 */
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-12 items-center">
      <LinkButton label="Small" size="sm" />
      <LinkButton label="Medium" size="md" />
      <LinkButton label="Large" size="lg" />
    </div>
  ),
};

/**
 * 아이콘 위치
 */
export const IconPositions: Story = {
  render: () => (
    <div className="flex flex-wrap gap-12 items-center">
      <LinkButton label="Lead Icon" leadIcon={['system', 'link']} tailIcon={undefined} />
      <LinkButton label="Tail Icon" tailIcon={['system', 'external-link']} />
      <LinkButton label="Both Icons" leadIcon={['system', 'link']} tailIcon={['system', 'external-link']} />
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
        <LinkButton label="Normal" linkType="default" />
        <LinkButton label="Disabled" linkType="default" disabled />
      </div>
      <div className="flex flex-wrap gap-12 items-center">
        <span className="text-muted size-sm width-80">Muted:</span>
        <LinkButton label="Normal" linkType="muted" />
        <LinkButton label="Disabled" linkType="muted" disabled />
      </div>
      <div className="flex flex-wrap gap-12 items-center">
        <span className="text-muted size-sm width-80">Informative:</span>
        <LinkButton label="Normal" linkType="informative" />
        <LinkButton label="Disabled" linkType="informative" disabled />
      </div>
    </div>
  ),
};

/**
 * 링크로 사용
 */
export const WithHref: Story = {
  render: () => (
    <div className="flex flex-wrap gap-12 items-center">
      <LinkButton label="Open Link" href="https://example.com" />
      <LinkButton label="Open in New Tab" href="https://example.com" openInNewTab />
    </div>
  ),
};
