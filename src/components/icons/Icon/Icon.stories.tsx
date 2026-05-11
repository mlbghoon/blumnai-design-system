import { useRef, useState, useMemo } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  RiCheckLine,
  RiCheckFill,
  RiAddLine,
  RiCloseLine,
  RiSearchLine,
  RiArrowDownLine,
  RiHeartFill,
  RiStarFill,
} from '@remixicon/react';

import * as RemixiconAll from '@remixicon/react';
import type { ComponentType } from 'react';

import { Icon } from './Icon';
import { getIconNamesByCategory } from './ui-icon-registry';
import { REMIXICON_EXPORT_MAP } from './remixicon-export-map';
import type { RemixiconLikeComponent } from './Icon.types';

const RemixiconRegistry = RemixiconAll as unknown as Record<string, ComponentType<{ size?: number | string; color?: string; className?: string }>>;
const kebabToRegistryKey = (s: string) => s.replace(/-/g, '').toLowerCase();

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
    layout: 'padded',
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
    disabled: {
      control: 'boolean',
      description: '비활성화 상태 (onClick 무시, cursor: not-allowed)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
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
    disabled: false,
    className: '',
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const iconRef = useRef<SVGSVGElement>(null);
    const iconType = args.iconType ?? (['system', 'add'] as const);
    return (
      <Icon
        ref={iconRef}
        iconType={iconType}
        size={args.size}
        disabled={args.disabled}
        className={args.className}
      />
    );
  },
};

/**
 * Resolve a manifest entry (`category` + `name` + optional `isFill`) to a Remixicon
 * component reference using the auto-generated export map. Returns `null` if the
 * icon name has no matching Ri* export.
 */
function resolveRemixicon(name: string, isFill: boolean): { component: RemixiconLikeComponent; exportName: string } | null {
  const key = kebabToRegistryKey(name) + (isFill ? 'fill' : '');
  const exportName = REMIXICON_EXPORT_MAP[key];
  if (!exportName) return null;
  const component = RemixiconRegistry[exportName];
  if (!component) return null;
  return { component, exportName };
}

export const Category: Story = {
  render: function Render() {
    const allByCategory = useMemo(() => getIconNamesByCategory(), []);
    // 20 categories from REMIXICON_CATEGORY_MANIFEST (Remixicon 4.9 full set).
    // Includes 'logos' and 'game & sports' which the legacy `IconCategory` type
    // doesn't cover — that's fine because we render via the component API now.
    const registryCategories = Object.keys(allByCategory).sort();
    const [selectedRegistry, setSelectedRegistry] = useState(registryCategories[0]);
    const [variant, setVariant] = useState<'line' | 'fill'>('line');
    const iconNames = useMemo(() => allByCategory[selectedRegistry] ?? [], [allByCategory, selectedRegistry]);

    const renderedIcons = useMemo(() => {
      return iconNames
        .map((iconName) => ({ iconName, resolved: resolveRemixicon(iconName, variant === 'fill') }))
        .filter((x): x is { iconName: string; resolved: NonNullable<ReturnType<typeof resolveRemixicon>> } => x.resolved !== null);
    }, [iconNames, variant]);

    const missing = iconNames.length - renderedIcons.length;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {registryCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedRegistry(cat)}
              style={{
                padding: '4px 10px',
                fontSize: '12px',
                fontWeight: selectedRegistry === cat ? 600 : 400,
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                background: selectedRegistry === cat ? 'var(--bg-state-primary)' : 'var(--bg-subtle)',
                color: selectedRegistry === cat ? '#fff' : 'var(--text-default)',
              }}
            >
              {cat} ({allByCategory[cat]?.length ?? 0})
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-muted)' }}>
          <button
            type="button"
            onClick={() => setVariant(variant === 'line' ? 'fill' : 'line')}
            style={{
              padding: '4px 10px',
              fontSize: '12px',
              fontWeight: 500,
              borderRadius: '6px',
              border: '1px solid var(--border-default)',
              cursor: 'pointer',
              background: 'var(--bg-card)',
              color: 'var(--text-default)',
            }}
          >
            Variant: {variant === 'line' ? 'Line (RiXxxLine)' : 'Fill (RiXxxFill)'}
          </button>
          <span>
            {renderedIcons.length} icon{renderedIcons.length === 1 ? '' : 's'}
            {missing > 0 ? ` (${missing} missing in current Remixicon build)` : ''}
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '8px' }}>
          {renderedIcons.map(({ iconName, resolved }) => (
            <div
              key={iconName}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 8px',
                borderRadius: '6px',
                border: '1px solid var(--border-default)',
                background: 'var(--bg-card)',
              }}
              title={iconName}
            >
              <Icon icon={resolved.component} size={20} color="default" />
              <div
                style={{
                  fontSize: '11px',
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                  color: 'var(--text-subtle)',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {resolved.exportName}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
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

/**
 * onClick이 있으면 자동으로 cursor: pointer가 적용됩니다.
 * disabled 시 클릭이 무시되고 cursor: not-allowed가 적용됩니다.
 */
export const Clickable: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <Icon iconType={['system', 'refresh']} size={32} onClick={() => alert('clicked!')} />
        <div style={{ fontSize: '10px', marginTop: '4px' }}>onClick</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon iconType={['system', 'refresh']} size={32} onClick={() => alert('clicked!')} disabled />
        <div style={{ fontSize: '10px', marginTop: '4px' }}>disabled</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon iconType={['system', 'refresh']} size={32} />
        <div style={{ fontSize: '10px', marginTop: '4px' }}>no onClick</div>
      </div>
    </div>
  ),
  parameters: { controls: { disable: true } },
};

/**
 * Direct-import API (권장 — tree-shake 가능)
 *
 * `@remixicon/react` 의 component 를 직접 prop 으로 전달하면 사용한 아이콘만 번들에 포함됩니다.
 * Module 최상위에서 import 한 안정적인 component 참조여야 함 (인라인 함수 X).
 *
 * Color 토큰 (`'default'`, `'success'` 등) 도 `<Icon iconType=...>` 와 동일하게 작동합니다.
 *
 * ```tsx
 * import { Icon, RiCheckLine } from '@blumnai-studio/blumnai-design-system';
 *
 * <Icon icon={RiCheckLine} size={16} color="default" />
 * <Icon icon={RiHeartFill} size={20} color="destructive" />
 * ```
 */
export const DirectImport: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h4 style={{ fontSize: '12px', marginBottom: '8px', color: 'var(--text-muted)' }}>기본 — Line variants</h4>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Icon icon={RiCheckLine} size={24} />
          <Icon icon={RiAddLine} size={24} />
          <Icon icon={RiCloseLine} size={24} />
          <Icon icon={RiSearchLine} size={24} />
          <Icon icon={RiArrowDownLine} size={24} />
        </div>
      </div>

      <div>
        <h4 style={{ fontSize: '12px', marginBottom: '8px', color: 'var(--text-muted)' }}>Fill variants</h4>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Icon icon={RiCheckFill} size={24} />
          <Icon icon={RiHeartFill} size={24} color="destructive" />
          <Icon icon={RiStarFill} size={24} color="warning" />
        </div>
      </div>

      <div>
        <h4 style={{ fontSize: '12px', marginBottom: '8px', color: 'var(--text-muted)' }}>Color tokens</h4>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <Icon icon={RiCheckLine} size={32} color="default" />
            <div style={{ fontSize: '10px', marginTop: '4px' }}>default</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Icon icon={RiCheckLine} size={32} color="informative" />
            <div style={{ fontSize: '10px', marginTop: '4px' }}>informative</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Icon icon={RiCheckLine} size={32} color="success" />
            <div style={{ fontSize: '10px', marginTop: '4px' }}>success</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Icon icon={RiCheckLine} size={32} color="warning" />
            <div style={{ fontSize: '10px', marginTop: '4px' }}>warning</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Icon icon={RiCheckLine} size={32} color="destructive" />
            <div style={{ fontSize: '10px', marginTop: '4px' }}>destructive</div>
          </div>
        </div>
      </div>

      <div>
        <h4 style={{ fontSize: '12px', marginBottom: '8px', color: 'var(--text-muted)' }}>
          Sizes — 12 / 16 / 20 / 24 / 32 / 48
        </h4>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Icon icon={RiCheckLine} size={12} />
          <Icon icon={RiCheckLine} size={16} />
          <Icon icon={RiCheckLine} size={20} />
          <Icon icon={RiCheckLine} size={24} />
          <Icon icon={RiCheckLine} size={32} />
          <Icon icon={RiCheckLine} size={48} />
        </div>
      </div>

      <div>
        <h4 style={{ fontSize: '12px', marginBottom: '8px', color: 'var(--text-muted)' }}>
          Disabled + onClick
        </h4>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Icon icon={RiCheckLine} size={24} onClick={() => alert('clicked')} />
          <Icon icon={RiCheckLine} size={24} disabled />
          <Icon icon={RiCheckLine} size={24} disabled onClick={() => alert('disabled — should not fire')} />
        </div>
      </div>
    </div>
  ),
  parameters: { controls: { disable: true } },
};

/**
 * 두 API 비교 — 같은 시각 결과
 *
 * 좌: dynamic-string API (`iconType`) - 런타임 lookup, 1MB lazy chunk
 * 우: direct-import API (`icon`) - tree-shake 가능, 1KB per icon
 *
 * 시각적으로 동일해야 함.
 */
export const ApiComparison: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', maxWidth: '600px' }}>
      <div>
        <h4 style={{ fontSize: '12px', marginBottom: '12px', color: 'var(--text-muted)' }}>
          Dynamic-string (back-compat)
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Icon iconType={['system', 'check']} size={20} color="default" />
          <Icon iconType={['system', 'add']} size={20} color="informative" />
          <Icon iconType={['system', 'close']} size={20} color="destructive" />
          <Icon iconType={['health', 'heart']} isFill size={20} color="destructive" />
        </div>
      </div>
      <div>
        <h4 style={{ fontSize: '12px', marginBottom: '12px', color: 'var(--text-muted)' }}>
          Direct-import (recommended)
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Icon icon={RiCheckLine} size={20} color="default" />
          <Icon icon={RiAddLine} size={20} color="informative" />
          <Icon icon={RiCloseLine} size={20} color="destructive" />
          <Icon icon={RiHeartFill} size={20} color="destructive" />
        </div>
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
