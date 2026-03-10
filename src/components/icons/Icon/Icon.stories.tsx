import { useRef } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { Icon } from './Icon';
import type { IconCategory, IconType } from './Icon.types';

const iconColorOptions = [
  'default',
  'default-subtle',
  'default-muted',
  'default-disabled',
  'inverted-default',
  'inverted-subtle',
  'inverted-muted',
  'inverted-disabled',
  'white-default',
  'white-subtle',
  'white-muted',
  'white-disabled',
  'black-default',
  'black-subtle',
  'black-muted',
  'black-disabled',
  'destructive',
  'informative',
  'success',
  'warning',
] as const;

const meta: Meta<typeof Icon> = {
  title: 'Icons/Icon',
  component: Icon,
  tags: ['autodocs'],
  parameters: {
    controls: { disable: true },
  },
  argTypes: {
    iconType: {
      control: { type: 'object' },
      description: '[category, name] 튜플 형식의 아이콘 타입',
      table: {
        type: {
          summary: 'IconType',
          detail: `[category, name] 튜플 형식:
- category: 'arrows' | 'buildings' | 'business' | 'communication' | 'design' | 'development' | 'device' | 'document' | 'editor' | 'finance' | 'food' | 'health' | 'map' | 'media' | 'others' | 'system' | 'user' | 'weather'
- name: string (카테고리 내 아이콘 이름)

예시:
['system', 'add']
['arrows', 'arrow-down']
['media', 'play']`,
        },
      },
    },
    size: {
      control: { type: 'number', min: 12, max: 64, step: 4 },
      description: '아이콘의 크기를 픽셀 단위로 설정합니다. 기본값은 24px입니다',
      table: {
        type: {
          summary: 'number',
          detail: '기본값: 24',
        },
      },
    },
    isFill: {
      control: 'boolean',
      description: 'true로 설정하면 아이콘을 채워진(fill) 스타일로 표시합니다. 기본값은 선 스타일입니다',
      table: {
        type: {
          summary: 'boolean',
          detail: '기본값: false',
        },
      },
    },
    color: {
      control: 'select',
      options: iconColorOptions,
      description: '아이콘의 색상을 설정합니다. 디자인 시스템 색상 토큰 또는 CSS 색상 값을 사용할 수 있습니다',
      table: {
        type: {
          summary: 'IconColor',
          detail: `IconColorToken | string

토큰: 'default', 'default-subtle', 'default-muted', 'default-disabled', 'inverted-*', 'white-*', 'black-*', 'destructive', 'informative', 'success', 'warning'

또는 '#fff', 'rgb()' 등의 CSS 색상 값`,
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

/**
 * 기본 Icon
 *
 * Icon 컴포넌트는 `ref`와 `className` prop을 지원합니다.
 * - `ref`: SVG 요소에 직접 접근 가능
 * - `className`: 커스텀 스타일 클래스 추가 가능
 */
export const Default: Story = {
  args: {
    iconType: ['system', 'add'],
    size: 24,
    className: '',
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const iconRef = useRef<SVGSVGElement>(null);
    return <Icon ref={iconRef} {...args} />;
  },
};

const categoryExamples: Record<IconCategory, string[]> = {
  arrows: ['arrow-down', 'arrow-up', 'arrow-left', 'arrow-right'],
  buildings: ['building', 'home', 'store', 'hospital'],
  business: ['briefcase', 'calendar', 'mail', 'bookmark'],
  communication: ['chat-1', 'chat-2', 'message', 'discuss'],
  design: ['brush', 'edit', 'palette', 'artboard'],
  development: ['code', 'terminal', 'bug', 'git-branch'],
  device: ['computer', 'smartphone', 'tablet', 'tv'],
  document: ['file', 'folder', 'file-text', 'file-copy'],
  editor: ['bold', 'italic', 'underline', 'strikethrough'],
  finance: ['bank-card', 'money-dollar-circle', 'exchange-dollar', 'wallet'],
  food: ['cake', 'restaurant', 'cup', 'goblet'],
  health: ['heart-pulse', 'heart', 'capsule', 'first-aid-kit'],
  map: ['map-pin', 'map', 'compass', 'earth'],
  media: ['play', 'pause', 'stop', 'volume-up'],
  others: ['bell', 'lightbulb', 'key', 'umbrella'],
  system: ['settings', 'search', 'add', 'delete-bin'],
  user: ['user', 'user-add', 'group', 'team'],
  weather: ['sun', 'moon', 'cloud-windy', 'cloudy'],
};

export const Category: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {(Object.entries(categoryExamples) as [IconCategory, string[]][]).map(([category, iconNames]) => (
        <div key={category} style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div style={{ width: '120px', fontSize: '13px', fontWeight: 500, color: 'var(--text-default)' }}>
            {category}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 100px)', gap: '8px' }}>
            {iconNames.map((iconName) => (
              <div key={iconName} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Icon iconType={[category, iconName] as IconType} size={20} />
                <div style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>
                  {iconName}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const Size: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      {[16, 20, 24, 32, 40, 48].map((size) => (
        <div key={size} style={{ textAlign: 'center' }}>
          <Icon iconType={['system', 'add']} size={size} />
          <div style={{ fontSize: '12px', marginTop: '4px' }}>{size}px</div>
        </div>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const IsFill: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <Icon iconType={['system', 'checkbox']} size={32} />
        <div style={{ fontSize: '12px', marginTop: '4px' }}>default</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon iconType={['system', 'checkbox']} isFill size={32} />
        <div style={{ fontSize: '12px', marginTop: '4px' }}>fill</div>
      </div>
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const Color: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <Icon iconType={['system', 'add']} size={32} color="default" />
        <div style={{ fontSize: '10px', marginTop: '4px' }}>default</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon iconType={['system', 'add']} size={32} color="default-subtle" />
        <div style={{ fontSize: '10px', marginTop: '4px' }}>subtle</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon iconType={['system', 'add']} size={32} color="informative" />
        <div style={{ fontSize: '10px', marginTop: '4px' }}>informative</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon iconType={['system', 'add']} size={32} color="success" />
        <div style={{ fontSize: '10px', marginTop: '4px' }}>success</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon iconType={['system', 'add']} size={32} color="warning" />
        <div style={{ fontSize: '10px', marginTop: '4px' }}>warning</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon iconType={['system', 'add']} size={32} color="destructive" />
        <div style={{ fontSize: '10px', marginTop: '4px' }}>destructive</div>
      </div>
    </div>
  ),
  parameters: { controls: { disable: true } },
};
