import type { Meta, StoryObj } from '@storybook/react-vite';
import { RiExternalLinkLine, RiLink } from '../../icons/Icon';

import { LinkButton } from '../LinkButton';

const meta: Meta<typeof LinkButton> = {
  title: 'Actions/Button/LinkButton',
  component: LinkButton,
  parameters: {
    layout: 'centered',
    controls: { disable: true },
  },
  tags: ['autodocs'],
  argTypes: {
    linkType: {
      control: 'select',
      options: ['default', 'muted', 'informative'],
      description: '링크 버튼의 시각적 타입을 설정합니다. default(기본 색상), muted(흐린 색상), informative(파란색 강조) 중 선택할 수 있습니다',
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
      description: '링크 버튼의 크기를 설정합니다. sm(작게), md(보통), lg(크게) 중 선택할 수 있습니다',
      table: {
        type: {
          summary: 'LinkButtonSize',
          detail: `'sm' | 'md' | 'lg'`,
        },
      },
    },
    leadIcon: {
      control: 'object',
      description: '라벨 앞에 표시되는 아이콘 (Remixicon `Ri*` component reference)',
      table: {
        type: {
          summary: 'LinkButtonIconType | ReactNode',
          detail: `Remixicon component (v2.0+ direct-import only, tree-shakeable):
  leadIcon={RiLinkM}
  leadIcon={RiFileTextLine}

NOTE: v1.x tuple form은 v2.0.0에서 제거됐습니다.

또는 ReactNode (이미 렌더된 JSX)`,
        },
      },
    },
    tailIcon: {
      control: 'object',
      description: '라벨 뒤에 표시되는 아이콘 (Remixicon `Ri*` component reference)',
      table: {
        type: {
          summary: 'LinkButtonIconType | ReactNode',
          detail: `Remixicon component (v2.0+ direct-import only, tree-shakeable):
  tailIcon={RiExternalLinkLine}
  tailIcon={RiArrowRightLine}

NOTE: v1.x tuple form은 v2.0.0에서 제거됐습니다.

또는 ReactNode (이미 렌더된 JSX)

기본값: 외부 링크 아이콘`,
        },
      },
    },
    label: {
      control: 'text',
      description: '링크 버튼에 표시되는 라벨 텍스트입니다',
      table: {
        type: { summary: 'string' },
      },
    },
    href: {
      control: 'text',
      description: '클릭 시 이동할 URL입니다. 설정하면 버튼이 anchor 태그로 렌더링됩니다',
      table: {
        type: { summary: 'string' },
      },
    },
    openInNewTab: {
      control: 'boolean',
      description: 'true로 설정하면 링크를 새 브라우저 탭에서 엽니다',
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
    label: '미리보기',
    linkType: 'default',
    size: 'md',
    leadIcon: undefined,
    tailIcon: RiExternalLinkLine,
    href: undefined,
    openInNewTab: false,
    disabled: false,
    asChild: false,
    width: undefined,
    onClick: undefined,
  },
  parameters: {
    controls: { disable: false },
  },
  render: (args) => (
    <LinkButton
      label={args.label}
      linkType={args.linkType}
      size={args.size}
      leadIcon={args.leadIcon}
      tailIcon={args.tailIcon}
      href={args.href}
      openInNewTab={args.openInNewTab}
      disabled={args.disabled}
      asChild={args.asChild}
      width={args.width}
      onClick={args.onClick}
    />
  ),
};

/**
 * 모든 타입
 */
export const AllTypes: Story = {
  render: () => (
    <div className="flex flex-wrap ds-gap-16 items-center justify-center">
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
    <div className="flex flex-wrap ds-gap-12 items-center justify-center">
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
    <div className="flex flex-wrap ds-gap-12 items-center justify-center">
      <LinkButton label="앞 아이콘" leadIcon={RiLink} tailIcon={undefined} />
      <LinkButton label="뒤 아이콘" tailIcon={RiExternalLinkLine} />
      <LinkButton label="양쪽 아이콘" leadIcon={RiLink} tailIcon={RiExternalLinkLine} />
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
        <LinkButton label="Normal" linkType="default" />
        <LinkButton label="Disabled" linkType="default" disabled />
      </div>
      <div className="flex flex-wrap ds-gap-12 items-center justify-center">
        <span className="text-muted size-sm width-80">Muted:</span>
        <LinkButton label="Normal" linkType="muted" />
        <LinkButton label="Disabled" linkType="muted" disabled />
      </div>
      <div className="flex flex-wrap ds-gap-12 items-center justify-center">
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
    <div className="flex flex-wrap ds-gap-12 items-center justify-center">
      <LinkButton label="링크 열기" href="https://example.com" />
      <LinkButton label="새 탭에서 열기" href="https://example.com" openInNewTab />
    </div>
  ),
};
