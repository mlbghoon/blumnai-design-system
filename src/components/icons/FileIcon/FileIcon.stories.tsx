import { useEffect, useRef } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

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
  title: 'Components/Icons/FileIcon',
  component: FileIcon,
  tags: ['autodocs'],
  argTypes: {
    fileType: {
      control: 'select',
      options: fileVariants,
      description: '표시할 파일 타입 변형',
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
      description: '아이콘 크기',
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
      description: '썸네일 타입용 이미지 소스 URL',
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

    useEffect(() => {
      if (iconRef.current) {
        console.log('FileIcon ref:', iconRef.current);
      }
    }, []);

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
          <h4 style={{ marginBottom: '16px', color: 'var(--text-subtle)' }}>1:1 Thumbnail</h4>
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
          <h4 style={{ marginBottom: '16px', color: 'var(--text-subtle)' }}>4:3 Thumbnail</h4>
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
