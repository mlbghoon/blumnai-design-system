import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { InfoBox } from './InfoBox';
import type { InfoBoxProps } from './InfoBox.types';

const meta: Meta<InfoBoxProps> = {
  title: 'Feedback/InfoBox',
  component: InfoBox,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'info', 'success', 'warning', 'error'],
      description: '인포박스의 색상 변형',
      table: {
        type: {
          summary: 'InfoBoxVariant',
          detail: "'default' | 'info' | 'success' | 'warning' | 'error'",
        },
        defaultValue: { summary: 'default' },
      },
    },
    styleType: {
      control: 'select',
      options: ['default', 'subtle'],
      description: '외관 스타일. subtle은 인디케이터 바 없이 컴팩트하게 표시',
      table: {
        type: {
          summary: 'InfoBoxStyle',
          detail: "'default' | 'subtle'",
        },
        defaultValue: { summary: 'default' },
      },
    },
    icon: {
      control: 'object',
      description: '커스텀 아이콘. 미지정 시 variant에 따라 기본 아이콘이 표시됩니다',
      table: {
        type: {
          summary: 'IconType',
          detail: "[category, name] 튜플. 예: ['system', 'information']",
        },
      },
    },
    title: {
      control: 'text',
      description: '제목 텍스트 (선택)',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    children: {
      control: 'text',
      description: '본문 내용',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    visible: {
      control: 'boolean',
      description: '표시 여부. false면 렌더링하지 않습니다',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    closable: {
      control: 'boolean',
      description: '닫기 버튼 표시 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    collapsible: {
      control: 'boolean',
      description: '접을 수 있는 상태 (title 필수)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    defaultOpen: {
      control: 'boolean',
      description: 'collapsible일 때 초기 열림 상태',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    onClose: {
      action: 'closed',
      description: '닫기 버튼 클릭 시 호출되는 콜백 함수',
      table: {
        type: { summary: '() => void' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<InfoBoxProps>;

/**
 * 기본 InfoBox
 *
 * InfoBox 컴포넌트는 `ref`와 `className` prop을 지원합니다.
 * variant에 따라 배경색, 인디케이터, 아이콘이 자동으로 변경됩니다.
 */
export const Default: Story = {
  args: {
    variant: 'default',
    styleType: 'default',
    title: '',
    children: '참고할 수 있는 안내 메시지입니다.',
    visible: true,
    closable: false,
    collapsible: false,
    defaultOpen: true,
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const title = args.title || undefined;
    return (
      <div style={{ width: 400 }}>
        <InfoBox
          variant={args.variant}
          styleType={args.styleType}
          icon={args.icon}
          title={title}
          visible={args.visible}
          closable={args.closable}
          collapsible={args.collapsible}
          defaultOpen={args.defaultOpen}
          onClose={args.onClose}
        >
          {args.children}
        </InfoBox>
      </div>
    );
  },
};

/**
 * 모든 Variant
 *
 * 5가지 variant별 기본 스타일을 비교합니다.
 */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col ds-gap-12" style={{ width: 400 }}>
      <InfoBox variant="default">기본 안내 메시지입니다.</InfoBox>
      <InfoBox variant="info">참고할 수 있는 정보입니다.</InfoBox>
      <InfoBox variant="success">작업이 성공적으로 완료되었습니다.</InfoBox>
      <InfoBox variant="warning">주의가 필요한 사항입니다.</InfoBox>
      <InfoBox variant="error">오류가 발생했습니다. 다시 시도해 주세요.</InfoBox>
    </div>
  ),
};

/**
 * Subtle 스타일
 *
 * `styleType="subtle"`은 인디케이터 바 없이 회색 배경으로 컴팩트하게 표시됩니다.
 */
export const Subtle: Story = {
  render: () => (
    <div className="flex flex-col ds-gap-12" style={{ width: 400 }}>
      <InfoBox styleType="subtle" title="안내">
        이 기능은 베타 버전입니다. 예상치 못한 동작이 발생할 수 있습니다.
      </InfoBox>
      <InfoBox styleType="subtle" title="참고">
        <ul style={{ margin: 0, paddingLeft: '14px' }}>
          <li>첫 번째 항목입니다</li>
          <li>두 번째 항목입니다</li>
          <li>세 번째 항목입니다</li>
        </ul>
      </InfoBox>
    </div>
  ),
};

/**
 * 제목 포함
 *
 * title prop으로 굵은 제목 텍스트를 표시합니다.
 */
export const WithTitle: Story = {
  render: () => (
    <div className="flex flex-col ds-gap-12" style={{ width: 400 }}>
      <InfoBox variant="info" title="안내">
        이 기능은 베타 버전입니다. 예상치 못한 동작이 발생할 수 있습니다.
      </InfoBox>
      <InfoBox variant="warning" title="주의">
        이 작업은 되돌릴 수 없습니다. 신중하게 진행해 주세요.
      </InfoBox>
      <InfoBox variant="error" title="오류 발생">
        서버 연결에 실패했습니다. 네트워크 상태를 확인해 주세요.
      </InfoBox>
    </div>
  ),
};

/**
 * 접을 수 있는 InfoBox
 *
 * `collapsible` prop으로 제목 클릭 시 내용을 접고 펼 수 있습니다.
 */
export const Collapsible: Story = {
  render: () => (
    <div className="flex flex-col ds-gap-12" style={{ width: 400 }}>
      <InfoBox variant="info" title="안내사항" collapsible>
        <ul style={{ margin: 0, paddingLeft: '14px' }}>
          <li>첫 번째 항목입니다</li>
          <li>두 번째 항목입니다</li>
          <li>세 번째 항목입니다</li>
        </ul>
      </InfoBox>
      <InfoBox variant="warning" title="주의사항" collapsible defaultOpen={false}>
        접혀 있는 상태로 시작합니다. 클릭하여 펼칠 수 있습니다.
      </InfoBox>
      <InfoBox styleType="subtle" title="참고" collapsible>
        Subtle 스타일의 접을 수 있는 InfoBox입니다.
      </InfoBox>
    </div>
  ),
};

/**
 * 닫기 버튼
 *
 * closable prop으로 닫기 버튼을 표시합니다.
 */
export const Closable: Story = {
  render: function Render() {
    const [visible, setVisible] = useState(true);

    return (
      <div className="flex flex-col ds-gap-12" style={{ width: 400 }}>
        {visible ? (
          <InfoBox variant="info" title="알림" closable onClose={() => setVisible(false)}>
            이 메시지는 닫기 버튼으로 숨길 수 있습니다.
          </InfoBox>
        ) : (
          <button
            onClick={() => setVisible(true)}
            style={{
              padding: '8px 16px',
              fontSize: '13px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              background: 'var(--bg-state-primary)',
              color: '#fff',
            }}
          >
            다시 표시
          </button>
        )}
        <InfoBox variant="warning" closable>
          닫기 버튼이 있는 경고 메시지입니다.
        </InfoBox>
      </div>
    );
  },
};

/**
 * 커스텀 아이콘
 *
 * icon prop으로 기본 아이콘 대신 원하는 아이콘을 지정합니다.
 */
export const CustomIcon: Story = {
  render: () => (
    <div className="flex flex-col ds-gap-12" style={{ width: 400 }}>
      <InfoBox variant="info" icon={['others', 'lightbulb']}>
        커스텀 아이콘을 사용한 안내 메시지입니다.
      </InfoBox>
      <InfoBox variant="success" icon={['system', 'shield-check']}>
        보안 인증이 완료되었습니다.
      </InfoBox>
    </div>
  ),
};
