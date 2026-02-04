import { useEffect, useRef } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import avatarPlaceholderIcon from '../../../assets/avatar-placeholder-icon.png';

import { Breadcrumbs } from './Breadcrumbs';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: 'object',
      description: '표시할 브레드크럼 아이템 배열',
      table: {
        type: {
          summary: 'BreadcrumbItem[]',
          detail: `각 아이템 속성:
- label: string (필수) - 표시할 텍스트
- href?: string - URL/경로 (링크로 만듦)
- icon?: IconType | ReactNode - 이 아이템의 아이콘
- image?: string - 아바타 변형용 이미지 URL
- disabled?: boolean - 이 아이템 비활성화
- onClick?: () => void - 클릭 시 호출되는 콜백 (href보다 우선)`,
        },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'lg'],
      description: '브레드크럼의 크기',
      table: {
        type: {
          summary: 'BreadcrumbsSize',
          detail: `'sm' | 'lg'
기본값: 'sm'`,
        },
      },
    },
    separator: {
      control: 'select',
      options: ['slash', 'chevron', 'dot', 'arrow'],
      description: '브레드크럼 아이템 사이의 구분자 타입',
      table: {
        type: {
          summary: 'BreadcrumbsSeparator',
          detail: `'slash' | 'chevron' | 'dot' | 'arrow'
기본값: 'slash'`,
        },
      },
    },
    maxItems: {
      control: 'number',
      description: '"..."으로 축소하기 전 표시할 최대 아이템 수',
      table: {
        type: {
          summary: 'number',
          detail: '미제공 시 모든 아이템이 표시됨',
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

const sampleItems = [
  { label: 'Home', href: '/', icon: 'folder-open-fill' },
  { label: 'Products', href: '/products' },
  { label: 'Category', href: '/products/category' },
  { label: 'Current Page' },
];

const itemsWithIcons = [
  { label: 'Label', icon: 'folder-open-fill' },
  { label: 'Label' },
  { label: 'Label' },
];

const itemsWithImages = [
  { label: 'Label', image: avatarPlaceholderIcon },
  { label: 'Label' },
  { label: 'Label' },
];

/**
 * 기본 Breadcrumbs
 *
 * Breadcrumbs 컴포넌트는 `ref`와 `className` prop을 지원합니다.
 * - `ref`: DOM 요소에 직접 접근 가능
 * - `className`: 커스텀 스타일 클래스 추가 가능
 */
export const Default: Story = {
  args: {
    items: sampleItems,
    size: 'sm',
    separator: 'slash',
    className: '',
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const breadcrumbsRef = useRef<HTMLElement>(null);

    useEffect(() => {
      if (breadcrumbsRef.current) {
        console.log('Breadcrumbs ref:', breadcrumbsRef.current);
      }
    }, []);

    return <Breadcrumbs ref={breadcrumbsRef} {...args} />;
  },
};

export const WithMaxItems: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Level 1', href: '/level1' },
      { label: 'Level 2', href: '/level2' },
      { label: 'Level 3', href: '/level3' },
      { label: 'Level 4', href: '/level4' },
      { label: 'Current Page' },
    ],
    size: 'sm',
    separator: 'slash',
    maxItems: 3,
  },
};

export const AllSeparators: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {(['slash', 'chevron', 'dot'] as const).map((separator) => (
        <div key={separator} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ width: '100px', textTransform: 'capitalize', fontSize: '12px', color: '#6f6f77' }}>{separator}</span>
          <Breadcrumbs items={sampleItems} separator={separator} size="sm" />
        </div>
      ))}
    </div>
  ),
};

export const DifferentPathLengths: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {(['slash', 'chevron', 'dot'] as const).map((separator) => (
        <div key={separator} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <span style={{ fontSize: '12px', color: '#6f6f77', marginBottom: '4px', textTransform: 'capitalize' }}>
            {separator} separator
          </span>
          {[2, 3, 4, 5, 6].map((length) => {
            const items = Array.from({ length }, (_, i) => ({
              label: 'Label',
              ...(i < length - 1 ? { href: `#${i}` } : {}),
            }));
            return (
              <Breadcrumbs key={length} items={items} separator={separator} size="sm" />
            );
          })}
        </div>
      ))}
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Breadcrumbs items={sampleItems} size="sm" />
      <Breadcrumbs items={sampleItems} size="lg" />
    </div>
  ),
};


export const WithIcons: Story = {
  args: {
    items: itemsWithIcons,
    size: 'sm',
    separator: 'slash',
  },
};

export const WithImages: Story = {
  args: {
    items: itemsWithImages,
    size: 'sm',
    separator: 'slash',
  },
};

/**
 * onClick 핸들러 사용
 *
 * 각 브레드크럼 아이템에 onClick 핸들러를 제공하여 프로그래밍 방식으로 네비게이션을 처리할 수 있습니다.
 * onClick이 제공되면 href가 있어도 기본 네비게이션이 방지되고 onClick이 호출됩니다.
 */
export const WithOnClick: Story = {
  render: () => (
    <Breadcrumbs
      items={[
        {
          label: 'Home',
          icon: ['buildings', 'home'],
          onClick: () => console.log('Home clicked'),
        },
        {
          label: 'Products',
          onClick: () => console.log('Products clicked'),
        },
        {
          label: 'Category',
          onClick: () => console.log('Category clicked'),
        },
        { label: 'Current Page' },
      ]}
      size="sm"
      separator="slash"
    />
  ),
};
