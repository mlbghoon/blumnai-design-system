import { useRef, useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import type { Props } from './Icon.types';
import { IconLoader } from './IconLoader';
import { color, radius } from '../tokens';

const meta: Meta<Props> = {
  title: 'Icons',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: '추가 CSS 클래스 이름',
    },
    size: {
      control: { type: 'number', min: 8, max: 128, step: 1 },
      description: '아이콘 크기(px)',
    },
    title: {
      control: 'text',
      description: '스크린 리더를 위한 접근성 레이블',
    },
    color: {
      control: 'color',
      description: '아이콘 색상 (파일, 브랜드, 플래그 아이콘에는 사용 불가 - 고정 색상)',
      table: {
        category: 'Styling',
      },
    },
    cursor: {
      control: { type: 'select' },
      options: ['default', 'pointer', 'not-allowed', 'wait', 'text', 'move', 'grab', 'grabbing'],
      description: '커서 스타일 (모든 아이콘에서 사용 가능)',
      table: {
        category: 'Styling',
      },
    },
  },
};

const WithRefExample = () => {
  const iconRef = useRef<SVGSVGElement>(null);
  const [info, setInfo] = useState('크기 측정 중...');

  useEffect(() => {
    if (iconRef.current) {
      const updateInfo = () => {
        if (iconRef.current) {
          const rect = iconRef.current.getBoundingClientRect();
          setInfo(`크기: ${Math.round(rect.width)} × ${Math.round(rect.height)}px`);
        }
      };

      updateInfo();
      const resizeObserver = new ResizeObserver(updateInfo);
      resizeObserver.observe(iconRef.current);

      return () => resizeObserver.disconnect();
    }
  }, []);

  const handleMeasure = () => {
    if (iconRef.current) {
      const rect = iconRef.current.getBoundingClientRect();
      setInfo(`크기: ${Math.round(rect.width)} × ${Math.round(rect.height)}px\n위치: (${Math.round(rect.x)}, ${Math.round(rect.y)})`);
    }
  };

  const handleScrollIntoView = () => {
    iconRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleFocus = () => {
    iconRef.current?.focus();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center', padding: '24px' }}>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        gap: '16px',
        padding: '24px',
        border: `1px solid ${color.border.default}`,
        borderRadius: radius.global.md,
        background: color.bg.default,
        minHeight: '200px'
      }}>
        <IconLoader 
          ref={iconRef}
          type="arrow-down-icon" 
          size={48}
          title="Arrow Down"
          color={color.text.muted}
          cursor="pointer"
        />
        <div 
          style={{ 
            fontSize: '14px', 
            color: color.text.subtle,
            fontFamily: 'monospace',
            padding: '8px 12px',
            background: color.bg.subtle,
            borderRadius: radius.global.sm,
            whiteSpace: 'pre-line',
            textAlign: 'center'
          }}
        >
          {info}
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button
            onClick={handleMeasure}
            style={{
              padding: '8px 16px',
              fontSize: '13px',
              background: color.bg.state.primary,
              color: color.text.white.default,
              border: 'none',
              borderRadius: radius.global.sm,
              cursor: 'pointer'
            }}
          >
            크기 측정
          </button>
          <button
            onClick={handleScrollIntoView}
            style={{
              padding: '8px 16px',
              fontSize: '13px',
              background: color.bg.state.primary,
              color: color.text.white.default,
              border: 'none',
              borderRadius: radius.global.sm,
              cursor: 'pointer'
            }}
          >
            스크롤 이동
          </button>
          <button
            onClick={handleFocus}
            style={{
              padding: '8px 16px',
              fontSize: '13px',
              background: color.bg.state.primary,
              color: color.text.white.default,
              border: 'none',
              borderRadius: radius.global.sm,
              cursor: 'pointer'
            }}
          >
            포커스
          </button>
        </div>
      </div>
      <div style={{ 
        fontSize: '13px', 
        color: color.text.subtle,
        textAlign: 'center',
        maxWidth: '500px',
        lineHeight: '1.6'
      }}>
        <p style={{ marginBottom: '8px', fontWeight: 600 }}>ref 사용 예시:</p>
        <pre style={{ 
          background: color.bg.subtle, 
          padding: '12px', 
          borderRadius: radius.global.sm,
          fontSize: '12px',
          overflow: 'auto',
          textAlign: 'left'
        }}>
{`const iconRef = useRef<SVGSVGElement>(null);

<IconLoader 
  ref={iconRef} 
  type="arrow-down-icon" 
  size={48} 
/>

// DOM 접근 예시
iconRef.current?.getBoundingClientRect();
iconRef.current?.scrollIntoView();
iconRef.current?.focus();`}
        </pre>
        <p style={{ marginTop: '12px', fontSize: '12px', color: color.text.muted }}>
          참고: ref는 Storybook Controls에 추가할 수 없습니다. ref는 React의 특수 기능이며 prop이 아닙니다.
        </p>
      </div>
    </div>
  );
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 인터랙티브 컨트롤이 있는 기본 아이콘.
 * 아이콘은 카테고리별로 구성되어 `src/icons/index.ts`에서 내보내집니다.
 * 모든 아이콘은 일관된 크기와 접근성을 위해 기본 `Icon` 컴포넌트를 사용합니다.
 */
export const Default: Story = {
  render: (args) => (
    <IconLoader type={'arrow-down-icon'} {...args} />
  ),
  args: {
    size: 24,
    title: 'Arrow Down Icon',
    color: color.text.muted,
    cursor: 'default',
  },
};

/**
 * 사용 가능한 모든 아이콘 카테고리 개요.
 * 아이콘은 카테고리별로 구성되어 `src/icons/index.ts`에서 내보내집니다.
 * 모든 아이콘은 일관된 크기와 접근성을 위해 기본 `Icon` 컴포넌트를 사용합니다.
 */
export const Categories: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', padding: '24px', maxWidth: '1200px' }}>
      <div>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 600 }}>Icon Categories</h2>
        <p style={{ marginBottom: '24px', color: color.text.subtle, fontSize: '14px', lineHeight: '1.5' }}>
          Our icon library is organized into categories for easy discovery. Most icons support customizable colors and sizes, 
          while some categories (Brands, Flags, File Icons) have fixed colors to maintain brand consistency.
        </p>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
        gap: '24px' 
      }}>
        <div style={{ padding: '16px', border: `1px solid ${color.border.default}`, borderRadius: radius.global.md }}>
          <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: 600 }}>Arrows (178 icons)</h3>
          <p style={{ marginBottom: '12px', fontSize: '13px', color: color.text.subtle }}>
            Directional arrows, navigation indicators, and movement icons.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <IconLoader type="arrow-down-icon" size={20} title="Arrow Down" />
            <IconLoader type="arrow-up-icon" size={20} title="Arrow Up" />
            <IconLoader type="arrow-left-icon" size={20} title="Arrow Left" />
            <IconLoader type="arrow-right-icon" size={20} title="Arrow Right" />
          </div>
        </div>

        <div style={{ padding: '16px', border: `1px solid ${color.border.default}`, borderRadius: radius.global.md }}>
          <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: 600 }}>System (332 icons)</h3>
          <p style={{ marginBottom: '12px', fontSize: '13px', color: color.text.subtle }}>
            UI controls, actions, and interface elements.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <IconLoader type="add-icon" size={20} title="Add" />
            <IconLoader type="check-icon" size={20} title="Check" />
            <IconLoader type="close-icon" size={20} title="Close" />
            <IconLoader type="search-icon" size={20} title="Search" />
            <IconLoader type="settings-icon" size={20} title="Settings" />
          </div>
        </div>

        <div style={{ padding: '16px', border: `1px solid ${color.border.default}`, borderRadius: radius.global.md }}>
          <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: 600 }}>Business (210 icons)</h3>
          <p style={{ marginBottom: '12px', fontSize: '13px', color: color.text.subtle }}>
            Charts, analytics, and business-related icons.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <IconLoader type="bar-chart-icon" size={20} title="Bar Chart" />
            <IconLoader type="pie-chart-icon" size={20} title="Pie Chart" />
            <IconLoader type="line-chart-icon" size={20} title="Line Chart" />
          </div>
        </div>

        <div style={{ padding: '16px', border: `1px solid ${color.border.default}`, borderRadius: radius.global.md }}>
          <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: 600 }}>Device (172 icons)</h3>
          <p style={{ marginBottom: '12px', fontSize: '13px', color: color.text.subtle }}>
            Electronic devices, hardware, and technology icons.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <IconLoader type="cellphone-icon" size={20} title="Cellphone" />
            <IconLoader type="computer-icon" size={20} title="Computer" />
            <IconLoader type="tablet-icon" size={20} title="Tablet" />
          </div>
        </div>

        <div style={{ padding: '16px', border: `1px solid ${color.border.default}`, borderRadius: radius.global.md }}>
          <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: 600 }}>Document (232 icons)</h3>
          <p style={{ marginBottom: '12px', fontSize: '13px', color: color.text.subtle }}>
            Files, documents, and content-related icons.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <IconLoader type="article-icon" size={20} title="Article" />
            <IconLoader type="book-icon" size={20} title="Book" />
            <IconLoader type="file-icon" size={20} title="File" />
          </div>
        </div>

        <div style={{ padding: '16px', border: `1px solid ${color.border.default}`, borderRadius: radius.global.md }}>
          <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: 600 }}>Communication (78 icons)</h3>
          <p style={{ marginBottom: '12px', fontSize: '13px', color: color.text.subtle }}>
            Messaging, email, and communication icons.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <IconLoader type="mail-icon" size={20} title="Mail" />
            <IconLoader type="message-icon" size={20} title="Message" />
            <IconLoader type="phone-icon" size={20} title="Phone" />
          </div>
        </div>

        <div style={{ padding: '16px', border: `1px solid ${color.border.default}`, borderRadius: radius.global.md }}>
          <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: 600 }}>User & Faces (126 icons)</h3>
          <p style={{ marginBottom: '12px', fontSize: '13px', color: color.text.subtle }}>
            User profiles, avatars, and people-related icons.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <IconLoader type="user-icon" size={20} title="User" />
            <IconLoader type="user-add-icon" size={20} title="User Add" />
          </div>
        </div>

        <div style={{ padding: '16px', border: `1px solid ${color.border.default}`, borderRadius: radius.global.md }}>
          <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: 600 }}>Buildings (62 icons)</h3>
          <p style={{ marginBottom: '12px', fontSize: '13px', color: color.text.subtle }}>
            Architecture, locations, and building-related icons.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <IconLoader type="home-icon" size={20} title="Home" />
            <IconLoader type="building-icon" size={20} title="Building" />
          </div>
        </div>

        <div style={{ padding: '16px', border: `1px solid ${color.border.default}`, borderRadius: radius.global.md }}>
          <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: 600 }}>Weather (82 icons)</h3>
          <p style={{ marginBottom: '12px', fontSize: '13px', color: color.text.subtle }}>
            Weather conditions and climate icons.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <IconLoader type="cloud-icon" size={20} title="Cloud" />
            <IconLoader type="sun-icon" size={20} title="Sun" />
            <IconLoader type="moon-icon" size={20} title="Moon" />
          </div>
        </div>

        <div style={{ padding: '16px', border: `1px solid ${color.border.default}`, borderRadius: radius.global.md }}>
          <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: 600 }}>Brands (119 icons)</h3>
          <p style={{ marginBottom: '12px', fontSize: '13px', color: color.text.subtle }}>
            Company logos and brand icons. <strong>Fixed colors.</strong>
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <IconLoader type="brand-apple-icon" size={20} title="Apple" />
            <IconLoader type="brand-google-icon" size={20} title="Google" />
          </div>
        </div>

        <div style={{ padding: '16px', border: `1px solid ${color.border.default}`, borderRadius: radius.global.md }}>
          <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: 600 }}>Flags (260 icons)</h3>
          <p style={{ marginBottom: '12px', fontSize: '13px', color: color.text.subtle }}>
            Country flags. <strong>Fixed colors.</strong>
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <IconLoader type="flag-ad-icon" size={20} title="Andorra" />
            <IconLoader type="flag-unitedstates-icon" size={20} title="United States" />
          </div>
        </div>

        <div style={{ padding: '16px', border: `1px solid ${color.border.default}`, borderRadius: radius.global.md }}>
          <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: 600 }}>Other Categories</h3>
          <p style={{ marginBottom: '12px', fontSize: '13px', color: color.text.subtle }}>
            Additional categories include: Design (216), Development (62), Editor (148), Finance (172), 
            Food (30), Health & Medical (76), Isometric (318), Logos (276), Map (170), Media (288), 
            Others (148), File Icons (27), and Cursors (6).
          </p>
        </div>
      </div>
    </div>
  ),
};

/**
 * Sample icons from various categories.
 * Icons are organized by category and exported from `src/icons/index.ts`.
 * All icons use the base `Icon` component with consistent sizing and accessibility.
 */
export const Overview: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', padding: '24px', maxWidth: '1200px' }}>
      <section>
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>Arrows</h3>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <IconLoader type="arrow-down-icon" size={24} title="Arrow Down" />
          <IconLoader type="arrow-up-icon" size={24} title="Arrow Up" />
          <IconLoader type="arrow-left-icon" size={24} title="Arrow Left" />
          <IconLoader type="arrow-right-icon" size={24} title="Arrow Right" />
        </div>
      </section>

      <section>
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>System</h3>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <IconLoader type="add-icon" size={24} title="Add" />
          <IconLoader type="check-icon" size={24} title="Check" />
          <IconLoader type="close-icon" size={24} title="Close" />
          <IconLoader type="search-icon" size={24} title="Search" />
          <IconLoader type="settings-icon" size={24} title="Settings" />
        </div>
      </section>

      <section>
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>Business</h3>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <IconLoader type="bar-chart-icon" size={24} title="Bar Chart" />
          <IconLoader type="pie-chart-icon" size={24} title="Pie Chart" />
          <IconLoader type="line-chart-icon" size={24} title="Line Chart" />
        </div>
      </section>

      <section>
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>Device</h3>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <IconLoader type="cellphone-icon" size={24} title="Cellphone" />
          <IconLoader type="computer-icon" size={24} title="Computer" />
          <IconLoader type="tablet-icon" size={24} title="Tablet" />
        </div>
      </section>

      <section>
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>Document</h3>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <IconLoader type="article-icon" size={24} title="Article" />
          <IconLoader type="book-icon" size={24} title="Book" />
          <IconLoader type="file-icon" size={24} title="File" />
        </div>
      </section>

      <section>
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>Communication</h3>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <IconLoader type="mail-icon" size={24} title="Mail" />
          <IconLoader type="message-icon" size={24} title="Message" />
          <IconLoader type="phone-icon" size={24} title="Phone" />
        </div>
      </section>

      <section>
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>User & Faces</h3>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <IconLoader type="user-icon" size={24} title="User" />
          <IconLoader type="user-add-icon" size={24} title="User Add" />
        </div>
      </section>

      <section>
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>Buildings</h3>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <IconLoader type="home-icon" size={24} title="Home" />
          <IconLoader type="building-icon" size={24} title="Building" />
        </div>
      </section>

      <section>
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>Weather</h3>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <IconLoader type="cloud-icon" size={24} title="Cloud" />
          <IconLoader type="sun-icon" size={24} title="Sun" />
          <IconLoader type="moon-icon" size={24} title="Moon" />
        </div>
      </section>

      <section>
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>Brands (Fixed Colors)</h3>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <IconLoader type="brand-apple-icon" size={24} title="Apple" />
          <IconLoader type="brand-google-icon" size={24} title="Google" />
        </div>
      </section>

      <section>
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>Flags (Fixed Colors)</h3>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <IconLoader type="flag-ad-icon" size={24} title="Andorra" />
          <IconLoader type="flag-unitedstates-icon" size={24} title="United States" />
        </div>
      </section>

      <section>
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>Cursors</h3>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <IconLoader type="cursor-pointer-icon" size={24} title="Pointer" />
        </div>
      </section>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center', padding: '24px' }}>
      <IconLoader type="arrow-down-icon" size={16} title="16px" />
      <IconLoader type="arrow-down-icon" size={24} title="24px" />
      <IconLoader type="arrow-down-icon" size={32} title="32px" />
      <IconLoader type="arrow-down-icon" size={48} title="48px" />
    </div>
  ),
};

export const WithControls: Story = {
  render: (args) => {
    return <IconLoader type={'arrow-down-icon'} {...args} />;
  },
  args: {
    size: 24,
    title: 'Arrow Down Icon',
    color: color.text.muted,
    cursor: 'pointer',
    className: '',
  },
};

export const RestrictedIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px' }}>
      <section>
        <h3 style={{ marginBottom: '16px' }}>File Icons (Fixed Colors)</h3>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <IconLoader type="file-pdf-sm-icon" size={24} title="PDF Small" cursor="pointer" />
          <IconLoader type="file-pdf-md-icon" size={24} title="PDF Medium" cursor="pointer" />
          <IconLoader type="file-pdf-lg-icon" size={24} title="PDF Large" cursor="pointer" />
          <IconLoader type="file-image-sm-icon" size={24} title="Image Small" cursor="pointer" />
          <IconLoader type="file-code-sm-icon" size={24} title="Code Small" cursor="pointer" />
        </div>
        <h3 style={{ marginBottom: '16px', marginTop: '24px' }}>Brands (Fixed Colors)</h3>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <IconLoader type="brand-apple-icon" size={24} title="Apple" cursor="pointer" />
          <IconLoader type="brand-google-icon" size={24} title="Google" cursor="pointer" />
        </div>
        <h3 style={{ marginBottom: '16px', marginTop: '24px' }}>Flags (Fixed Colors)</h3>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <IconLoader type="flag-ad-icon" size={24} title="Andorra" cursor="pointer" />
          <IconLoader type="flag-unitedstates-icon" size={24} title="United States" cursor="pointer" />
        </div>
        <p style={{ fontSize: '14px', color: color.text.subtle, marginTop: '8px' }}>
          File, Brands, and Flags icons have fixed colors.
        </p>
      </section>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center', padding: '24px' }}>
      <IconLoader type="arrow-down-icon" size={24} title="Default" color={color.text.muted} />
      <IconLoader type="arrow-down-icon" size={24} title="Primary" color={color.bg.state.primary} />
      <IconLoader type="arrow-down-icon" size={24} title="Success" color={color.text.success} />
      <IconLoader type="arrow-down-icon" size={24} title="Error" color={color.text.destructive} />
      <IconLoader type="arrow-down-icon" size={24} title="Warning" color={color.text.warning} />
    </div>
  ),
};

export const Cursors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center', padding: '24px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <IconLoader type="arrow-down-icon" size={24} title="Default" cursor="default" />
        <span style={{ fontSize: '12px' }}>default</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <IconLoader type="arrow-down-icon" size={24} title="Pointer" cursor="pointer" />
        <span style={{ fontSize: '12px' }}>pointer</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <IconLoader type="arrow-down-icon" size={24} title="Not Allowed" cursor="not-allowed" />
        <span style={{ fontSize: '12px' }}>not-allowed</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <IconLoader type="arrow-down-icon" size={24} title="Grab" cursor="grab" />
        <span style={{ fontSize: '12px' }}>grab</span>
      </div>
    </div>
  ),
};

/**
 * IconLoader 컴포넌트는 타입 이름으로 아이콘을 로드할 수 있게 해줍니다.
 * 
 * 다음 형식을 지원합니다:
 * - 케밥 케이스 형식: "arrow-down-icon", "file-code-sm-icon"
 * - Figma 이름 (공백이 언더스코어로 변환): "virgin islands" → "virgin_islands", "arrow down" → "arrow_down"
 * 
 * 아래 컨트롤에 아이콘 이름을 입력하여 테스트하세요! 이름은 자동으로 정규화됩니다.
 * 
 * @example
 * ```tsx
 * import { IconLoader } from 'blumnai-design-system';
 * 
 * // 케밥 케이스 사용
 * <IconLoader type="file-code-sm-icon" size={24} title="Code Small" cursor="pointer" />
 * <IconLoader type="arrow-down-icon" size={24} title="Arrow Down" />
 * 
 * // Figma 이름 사용 (공백이 자동으로 언더스코어로 변환)
 * <IconLoader type="virgin islands" size={24} />
 * <IconLoader type="VIRGIN ISLANDS" size={24} />
 * <IconLoader type="arrow down" size={24} />
 * ```
 */
export const IconLoaderExample: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', padding: '24px', maxWidth: '1200px' }}>
      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>Interactive IconLoader</h3>
        <p style={{ marginBottom: '16px', fontSize: '14px', color: color.text.subtle, lineHeight: '1.5' }}>
          Type any icon name in the controls below. You can use:
        </p>
        <ul style={{ marginBottom: '24px', fontSize: '14px', color: color.text.subtle, paddingLeft: '20px', lineHeight: '1.8' }}>
          <li>Kebab-case: <code style={{ background: color.bg.subtle, padding: '2px 6px', borderRadius: '4px' }}>arrow-down-icon</code></li>
          <li>Figma names with spaces: <code style={{ background: color.bg.subtle, padding: '2px 6px', borderRadius: '4px' }}>virgin islands</code> or <code style={{ background: color.bg.subtle, padding: '2px 6px', borderRadius: '4px' }}>arrow down</code></li>
          <li>Figma names with underscores: <code style={{ background: color.bg.subtle, padding: '2px 6px', borderRadius: '4px' }}>virgin_islands</code></li>
        </ul>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          gap: '16px',
          padding: '24px',
          border: `1px solid ${color.border.default}`,
          borderRadius: radius.global.md,
          background: color.bg.default
        }}>
          <IconLoader type={args.type || 'arrow-down-icon'} {...args} />
          <div style={{ 
            fontSize: '12px', 
            color: color.text.subtle,
            textAlign: 'center',
            maxWidth: '400px',
            wordBreak: 'break-word'
          }}>
            Type: <code style={{ background: color.bg.subtle, padding: '2px 6px', borderRadius: '4px' }}>{args.type || 'arrow-down-icon'}</code>
          </div>
        </div>
      </div>
      
      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>Example Icons</h3>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <IconLoader type="file-code-sm-icon" size={24} title="Code Small" cursor="pointer" />
            <span style={{ fontSize: '12px', textAlign: 'center' }}>file-code-sm-icon</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <IconLoader type="arrow-down-icon" size={24} title="Arrow Down" cursor="pointer" />
            <span style={{ fontSize: '12px', textAlign: 'center' }}>arrow-down-icon</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <IconLoader type="home-icon" size={24} title="Home" cursor="pointer" />
            <span style={{ fontSize: '12px', textAlign: 'center' }}>home-icon</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <IconLoader type="virgin islands" size={24} title="Virgin Islands" cursor="pointer" />
            <span style={{ fontSize: '12px', textAlign: 'center' }}>"virgin islands"</span>
          </div>
        </div>
      </div>
    </div>
  ),
  args: {
    type: 'arrow-down-icon',
    size: 48,
    title: 'Icon from Figma',
    color: color.text.muted,
    cursor: 'default',
  },
  argTypes: {
    type: {
      control: 'text',
      description: '아이콘 타입 이름. 케밥 케이스(예: "arrow-down-icon") 또는 공백이 있는 Figma 이름(예: "virgin islands", "arrow down")을 지원합니다. 공백은 자동으로 언더스코어로 변환됩니다.',
      table: {
        category: 'Icon',
      },
    },
    size: {
      control: { type: 'number', min: 8, max: 128, step: 1 },
      description: '아이콘 크기(px)',
      table: {
        category: 'Icon',
      },
    },
    title: {
      control: 'text',
      description: '스크린 리더를 위한 접근성 레이블',
      table: {
        category: 'Icon',
      },
    },
    color: {
      control: 'color',
      description: '아이콘 색상 (파일, 브랜드, 플래그 아이콘에는 사용 불가 - 고정 색상)',
      table: {
        category: 'Styling',
      },
    },
    cursor: {
      control: { type: 'select' },
      options: ['default', 'pointer', 'not-allowed', 'wait', 'text', 'move', 'grab', 'grabbing'],
      description: '커서 스타일 (모든 아이콘에서 사용 가능)',
      table: {
        category: 'Styling',
      },
    },
  },
};

/**
 * ref를 사용한 아이콘 예시.
 * ref를 통해 아이콘의 DOM 요소에 접근하여 크기 측정, 스크롤, 애니메이션 등을 수행할 수 있습니다.
 */
export const WithRef: Story = {
  render: () => <WithRefExample />,
};