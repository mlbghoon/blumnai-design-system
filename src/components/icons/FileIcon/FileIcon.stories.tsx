import { useRef } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { FileIcon } from './FileIcon';
import type { FileVariant } from './FileIcon.types';

const fileVariants: FileVariant[] = [
  'archive',
  'code',
  'default',
  'image',
  'music',
  'pdf',
  'thumbnail-1:1',
  'thumbnail-4:3',
  'video',
];

const meta: Meta<typeof FileIcon> = {
  title: 'Icons/FileIcon',
  component: FileIcon,
  tags: ['autodocs'],
  argTypes: {
    fileType: {
      control: 'select',
      options: fileVariants,
      description: '표시할 파일 아이콘의 타입을 설정합니다. 압축, 코드, 이미지, 음악, PDF, 썸네일, 비디오 등을 선택할 수 있습니다',
      table: {
        type: {
          summary: 'FileVariant',
          detail: `'archive' | 'code' | 'default' | 'image' | 'music' | 'pdf' | 'thumbnail-1:1' | 'thumbnail-4:3' | 'video'`,
        },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: '파일 아이콘의 크기를 설정합니다. sm(작게), md(보통), lg(크게) 중 선택할 수 있습니다',
      table: {
        type: {
          summary: 'FileSize',
          detail: `'sm' | 'md' | 'lg'
기본값: 'md'`,
        },
      },
    },
    src: {
      control: 'text',
      description: '썸네일 파일 타입에서 표시할 이미지의 소스 URL입니다. thumbnail-1:1 및 thumbnail-4:3 타입에만 적용됩니다',
      table: {
        type: {
          summary: 'string',
          detail: `'thumbnail-1:1' 및 'thumbnail-4:3' 타입에만 적용`,
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof FileIcon>;

/**
 * 기본 FileIcon
 *
 * FileIcon 컴포넌트는 `ref`와 `className` prop을 지원합니다.
 * - `ref`: SVG 요소에 직접 접근 가능
 * - `className`: 커스텀 스타일 클래스 추가 가능
 */
export const Default: Story = {
  args: {
    fileType: 'default',
    size: 'md',
    className: '',
  },
  render: function Render(args) {
    const iconRef = useRef<SVGSVGElement>(null);
    return <FileIcon ref={iconRef} {...args} />;
  },
};

export const AllTypes: Story = {
  render: function Render() {
    const variants: FileVariant[] = ['archive', 'code', 'default', 'image', 'music', 'pdf', 'video'];
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '24px' }}>
        {variants.map((variant) => (
          <div key={variant} style={{ textAlign: 'center' }}>
            <FileIcon fileType={variant} size="lg" />
            <div style={{ fontSize: '12px', marginTop: '8px', color: 'var(--text-subtle)' }}>
              {variant}
            </div>
          </div>
        ))}
      </div>
    );
  },
  parameters: { controls: { disable: true } },
};

export const Sizes: Story = {
  render: function Render() {
    const sizes = ['sm', 'md', 'lg'] as const;
    return (
      <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-end' }}>
        {sizes.map((size) => (
          <div key={size} style={{ textAlign: 'center' }}>
            <FileIcon fileType="default" size={size} />
            <div style={{ fontSize: '12px', marginTop: '8px', color: 'var(--text-subtle)' }}>
              {size}
            </div>
          </div>
        ))}
      </div>
    );
  },
  parameters: { controls: { disable: true } },
};

export const Thumbnails: Story = {
  render: function Render() {
    const sizes = ['sm', 'md', 'lg'] as const;
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '48px' }}>
        <div>
          <h4 style={{ marginBottom: '16px', color: 'var(--text-subtle)' }}>1:1 썸네일</h4>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-end' }}>
            {sizes.map((size) => (
              <div key={size} style={{ textAlign: 'center' }}>
                <FileIcon
                  fileType="thumbnail-1:1"
                  size={size}
                  src="https://picsum.photos/100/100"
                />
                <div style={{ fontSize: '12px', marginTop: '8px' }}>{size}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 style={{ marginBottom: '16px', color: 'var(--text-subtle)' }}>4:3 썸네일</h4>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-end' }}>
            {sizes.map((size) => (
              <div key={size} style={{ textAlign: 'center' }}>
                <FileIcon
                  fileType="thumbnail-4:3"
                  size={size}
                  src="https://picsum.photos/133/100"
                />
                <div style={{ fontSize: '12px', marginTop: '8px' }}>{size}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
  parameters: { controls: { disable: true } },
};
