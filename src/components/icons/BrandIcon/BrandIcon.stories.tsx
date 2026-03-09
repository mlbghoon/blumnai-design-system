import { useRef } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { BrandIcon } from './BrandIcon';
import type { BrandType } from './BrandIcon.types';

const meta: Meta<typeof BrandIcon> = {
  title: 'Icons/BrandIcon',
  component: BrandIcon,
  tags: ['autodocs'],
  argTypes: {
    brandType: {
      control: 'select',
      options: [
        'adobe', 'affinity designer', 'after effects', 'airbnb', 'algorand', 'aliexpress',
        'angular', 'apple', 'apple music', 'arc', 'arc browser', 'asana', 'binance', 'bing',
        'bitcoin', 'blender', 'bluesky', 'bnb', 'bootstrap', 'canva', 'cash app', 'chatgpt',
        'chrome', 'chromium', 'claude', 'clerk', 'cody', 'coinbase', 'copilot', 'custom ai',
        'deepseek', 'digitalocean', 'discord', 'docker', 'doge', 'dotenv', 'dropbox', 'dub',
        'edge', 'elysiajs', 'ethereum', 'facebook', 'figma', 'firefox', 'framer', 'gimp',
        'github', 'gitlab', 'gnail', 'google', 'google drive', 'hashnode', 'illustrator',
        'instatus', 'json', 'layers', 'leap wallet', 'lemon squeezy', 'lightroom', 'linear',
        'litecoin', 'mastercard', 'mastodon', 'matic', 'messenger', 'meta', 'metamask',
        'monero', 'nextjs', 'notion', 'obsidian', 'onedrive', 'opensea', 'opera', 'password',
        'patreon', 'paypal', 'perplexity', 'photoshop', 'pinterest', 'pitch', 'polar',
        'product hunt', 'raycast', 'react', 'reddit', 'ruby', 'safari', 'shopify', 'sketch',
        'skype', 'solana', 'sort ui', 'spotify', 'steam', 'supabase', 'swift', 'tailwind css',
        'telegram', 'tether', 'threads', 'todoist', 'ton', 'tron', 'trust', 'twitch',
        'unreal engine', 'v0', 'vercel', 'visa', 'vue', 'webflow', 'whop', 'windows',
        'wordpress', 'xrp', 'youtube',
      ],
      description: '표시할 브랜드 또는 로고의 타입을 설정합니다. Figma 레이어 이름과 일치하는 브랜드 이름을 사용합니다',
      table: {
        type: {
          summary: 'BrandType',
          detail: `Figma 레이어 이름과 일치하는 브랜드 이름
예시: 'github', 'react', 'figma', 'discord'`,
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
  },
};

export default meta;
type Story = StoryObj<typeof BrandIcon>;

/**
 * 기본 BrandIcon
 *
 * BrandIcon 컴포넌트는 `ref`와 `className` prop을 지원합니다.
 * - `ref`: SVG 요소에 직접 접근 가능
 * - `className`: 커스텀 스타일 클래스 추가 가능
 */
export const Default: Story = {
  args: {
    brandType: 'github',
    size: 24,
    className: '',
  },
  render: function Render(args) {
    const iconRef = useRef<SVGSVGElement>(null);
    return <BrandIcon ref={iconRef} {...args} />;
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      {[16, 20, 24, 32, 40, 48].map((size) => (
        <div key={size} style={{ textAlign: 'center' }}>
          <BrandIcon brandType="react" size={size} />
          <div style={{ fontSize: '12px', marginTop: '4px' }}>{size}px</div>
        </div>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const SocialMedia: Story = {
  render: function Render() {
    const brands: { brandType: BrandType; label: string }[] = [
      { brandType: 'facebook', label: 'Facebook' },
      { brandType: 'youtube', label: 'YouTube' },
      { brandType: 'threads', label: 'Threads' },
      { brandType: 'discord', label: 'Discord' },
      { brandType: 'reddit', label: 'Reddit' },
      { brandType: 'twitch', label: 'Twitch' },
      { brandType: 'bluesky', label: 'Bluesky' },
    ];
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '24px' }}>
        {brands.map(({ brandType, label }) => (
          <div key={brandType} style={{ textAlign: 'center' }}>
            <BrandIcon brandType={brandType} size={40} />
            <div style={{ fontSize: '12px', marginTop: '8px', color: 'var(--text-subtle)' }}>
              {label}
            </div>
          </div>
        ))}
      </div>
    );
  },
  parameters: { controls: { disable: true } },
};
