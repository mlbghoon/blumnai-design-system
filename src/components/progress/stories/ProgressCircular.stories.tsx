import { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { ProgressCircular } from '../ProgressCircular';
import type { ProgressCircularProps } from '../Progress.types';

const meta: Meta<ProgressCircularProps> = {
  title: 'Feedback/Progress/Circular',
  component: ProgressCircular,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  argTypes: {
    value: {
      control: 'number',
      description: '현재 진행률 (0-100). undefined면 불확정 상태',
      table: {
        type: {
          summary: 'number',
          detail: '0-100 사이의 숫자. undefined면 indeterminate 상태',
        },
      },
    },
    max: {
      control: 'number',
      description: '최대값',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '100' },
      },
    },
    variant: {
      control: 'select',
      options: ['default', 'success', 'failed'],
      description: '진행 바 변형 (색상 상태)',
      table: {
        type: {
          summary: 'ProgressCircularVariant',
          detail: "'default' | 'success' | 'failed'",
        },
        defaultValue: { summary: 'default' },
      },
    },
    color: {
      control: 'select',
      options: [
        'gray',
        'brand',
        'red',
        'orange',
        'amber',
        'yellow',
        'lime',
        'green',
        'emerald',
        'teal',
        'cyan',
        'sky',
        'blue',
        'indigo',
        'violet',
        'purple',
        'fuchsia',
        'pink',
        'rose',
      ],
      description: '진행 바 색상 (variant가 default일 때만 적용)',
      table: {
        type: {
          summary: 'ProgressColor',
          detail:
            "'gray' | 'brand' | ... (variant가 'default'일 때만 적용)",
        },
        defaultValue: { summary: 'gray' },
      },
    },
    shape: {
      control: 'select',
      options: ['full', 'half'],
      description: '진행 바 모양',
      table: {
        type: {
          summary: 'ProgressCircularShape',
          detail: "'full' | 'half'",
        },
        defaultValue: { summary: 'full' },
      },
    },
    showLabel: {
      control: 'boolean',
      description: '중앙 라벨 표시 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    size: {
      control: 'number',
      description: '진행 바 크기 (px)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '96' },
      },
    },
    strokeWidth: {
      control: 'number',
      description: '트랙 두께 (px)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '8' },
      },
    },
    formatValue: {
      description: '값 포맷 함수',
      table: {
        type: {
          summary: '(value: number) => string',
          detail: "예: (v) => `${v}%`",
        },
      },
    },
    caption: {
      control: 'text',
      description: '캡션 텍스트 (진행 바 아래)',
      table: {
        type: { summary: 'string' },
      },
    },
    error: {
      control: 'text',
      description: '에러 상태 또는 메시지',
      table: {
        type: {
          summary: 'boolean | string',
          detail: 'true = 에러 스타일만, string = 에러 메시지 표시',
        },
      },
    },
    success: {
      control: 'text',
      description: '성공 상태 또는 메시지',
      table: {
        type: {
          summary: 'boolean | string',
          detail: 'true = 성공 스타일만, string = 성공 메시지 표시',
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<ProgressCircularProps>;

/**
 * 기본 원형 진행 바
 *
 * 원형 진행 바의 기본 형태입니다.
 */
export const Default: Story = {
  args: {
    value: 60,
    max: 100,
    variant: 'default',
    color: 'gray',
    shape: 'full',
    showLabel: true,
    size: 96,
    strokeWidth: 8,
    caption: '',
    error: '',
    success: '',
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const caption = args.caption || undefined;
    const error = args.error || undefined;
    const success = args.success || undefined;
    return (
      <ProgressCircular
        value={args.value}
        max={args.max}
        variant={args.variant}
        color={args.color}
        shape={args.shape}
        showLabel={args.showLabel}
        size={args.size}
        strokeWidth={args.strokeWidth}
        formatValue={args.formatValue}
        caption={caption}
        error={error}
        success={success}
      />
    );
  },
};

/**
 * 반원 모양
 *
 * shape="half"로 반원 형태의 진행 바를 표시합니다.
 */
export const HalfCircle: Story = {
  render: function Render() {
    return (
      <div className="flex ds-gap-24 items-end">
        <ProgressCircular shape="half" value={25} />
        <ProgressCircular shape="half" value={50} />
        <ProgressCircular shape="half" value={75} />
        <ProgressCircular shape="half" value={100} color="green" />
      </div>
    );
  },
};

/**
 * 상태 변형
 *
 * variant를 통해 성공/실패 상태를 표시합니다.
 */
export const Variants: Story = {
  render: function Render() {
    return (
      <div className="flex ds-gap-24 items-center">
        <div className="flex flex-col items-center ds-gap-8">
          <ProgressCircular variant="default" value={60} />
          <span className="font-body size-sm text-muted">기본</span>
        </div>
        <div className="flex flex-col items-center ds-gap-8">
          <ProgressCircular variant="success" value={100} />
          <span className="font-body size-sm text-muted">성공</span>
        </div>
        <div className="flex flex-col items-center ds-gap-8">
          <ProgressCircular variant="failed" value={35} />
          <span className="font-body size-sm text-muted">실패</span>
        </div>
      </div>
    );
  },
};

/**
 * 캡션 텍스트
 *
 * 진행 바 아래에 설명 텍스트를 표시합니다.
 */
export const WithCaption: Story = {
  render: function Render() {
    return (
      <div className="flex ds-gap-24">
        <ProgressCircular value={20} color="red" caption="JavaScript" />
        <ProgressCircular value={45} color="blue" caption="TypeScript" />
        <ProgressCircular value={80} color="green" caption="Python" />
        <ProgressCircular value={65} color="violet" caption="React" />
      </div>
    );
  },
};

/**
 * 색상 변형
 */
export const Colors: Story = {
  render: function Render() {
    return (
      <div className="flex flex-wrap ds-gap-24">
        <ProgressCircular color="gray" value={60} />
        <ProgressCircular color="brand" value={60} />
        <ProgressCircular color="blue" value={60} />
        <ProgressCircular color="green" value={60} />
        <ProgressCircular color="red" value={60} />
        <ProgressCircular color="violet" value={60} />
      </div>
    );
  },
};

/**
 * 다양한 크기
 */
export const Sizes: Story = {
  render: function Render() {
    return (
      <div className="flex ds-gap-24 items-center">
        <ProgressCircular size={48} strokeWidth={4} value={60} />
        <ProgressCircular size={64} strokeWidth={6} value={60} />
        <ProgressCircular size={96} strokeWidth={8} value={60} />
        <ProgressCircular size={128} strokeWidth={10} value={60} />
      </div>
    );
  },
};

/**
 * 라벨 없음
 */
export const WithoutLabel: Story = {
  render: function Render() {
    return (
      <div className="flex ds-gap-24 items-center">
        <ProgressCircular showLabel={false} value={25} />
        <ProgressCircular showLabel={false} value={50} />
        <ProgressCircular showLabel={false} value={75} />
        <ProgressCircular showLabel={false} value={100} />
      </div>
    );
  },
};

/**
 * 진행 단계 (0% ~ 100%)
 */
export const AllProgress: Story = {
  render: function Render() {
    return (
      <div className="flex flex-wrap ds-gap-16">
        {[0, 25, 50, 75, 100].map((v) => (
          <ProgressCircular key={v} value={v} />
        ))}
      </div>
    );
  },
};

/**
 * 애니메이션 데모
 *
 * 진행률이 자동으로 증가하는 예제입니다.
 */
export const Animated: Story = {
  render: function Render() {
    const [value, setValue] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setValue((prev) => (prev >= 100 ? 0 : prev + 1));
      }, 50);
      return () => clearInterval(interval);
    }, []);

    return (
      <div className="flex ds-gap-24 items-center">
        <ProgressCircular value={value} color="brand" />
        <ProgressCircular value={value} shape="half" color="brand" />
      </div>
    );
  },
};

/**
 * 커스텀 포맷
 */
export const CustomFormat: Story = {
  render: function Render() {
    return (
      <div className="flex ds-gap-24 items-center">
        <ProgressCircular
          value={75}
          size={120}
          formatValue={(v) => `${v}°C`}
        />
        <ProgressCircular
          value={80}
          size={120}
          formatValue={(v) => `${Math.round((v / 100) * 8)}/8`}
        />
      </div>
    );
  },
};

/**
 * 반원 변형들
 *
 * 반원 모양의 다양한 상태입니다.
 */
export const HalfVariants: Story = {
  render: function Render() {
    return (
      <div className="flex ds-gap-24 items-end">
        <div className="flex flex-col items-center ds-gap-8">
          <ProgressCircular shape="half" variant="default" value={60} />
          <span className="font-body size-sm text-muted">기본</span>
        </div>
        <div className="flex flex-col items-center ds-gap-8">
          <ProgressCircular shape="half" variant="success" value={100} />
          <span className="font-body size-sm text-muted">성공</span>
        </div>
        <div className="flex flex-col items-center ds-gap-8">
          <ProgressCircular shape="half" variant="failed" value={35} />
          <span className="font-body size-sm text-muted">실패</span>
        </div>
      </div>
    );
  },
};

/**
 * 불확정 상태 (Indeterminate)
 *
 * value가 undefined일 때 표시되는 회전 애니메이션 상태입니다.
 */
export const Indeterminate: Story = {
  render: function Render() {
    return (
      <div className="flex ds-gap-24 items-center">
        <ProgressCircular color="gray" />
        <ProgressCircular color="brand" />
        <ProgressCircular shape="half" color="blue" />
      </div>
    );
  },
};

/**
 * 에러 상태
 *
 * 작업 실패 시 빨간색 메시지를 표시합니다.
 * variant="failed"와 함께 사용하면 바 색상도 빨간색이 됩니다.
 */
export const ErrorState: Story = {
  render: function Render() {
    return (
      <div className="flex ds-gap-24">
        <ProgressCircular
          value={35}
          variant="failed"
          error="업로드 실패"
        />
        <ProgressCircular
          value={20}
          color="red"
          error="연결 끊김"
        />
        <ProgressCircular
          shape="half"
          value={45}
          variant="failed"
          error="오류"
        />
      </div>
    );
  },
};

/**
 * 성공 상태
 *
 * 작업 완료 시 초록색 메시지를 표시합니다.
 * variant="success"와 함께 사용하면 바 색상도 초록색이 됩니다.
 */
export const SuccessState: Story = {
  render: function Render() {
    return (
      <div className="flex ds-gap-24">
        <ProgressCircular
          value={100}
          variant="success"
          success="완료!"
        />
        <ProgressCircular
          value={100}
          color="green"
          success="모두 완료"
        />
        <ProgressCircular
          shape="half"
          value={100}
          variant="success"
          success="완료"
        />
      </div>
    );
  },
};

/**
 * 에러/성공 상태 비교
 *
 * 캡션, 성공, 에러 메시지의 색상을 비교합니다.
 */
export const ErrorAndSuccessStates: Story = {
  render: function Render() {
    return (
      <div className="flex ds-gap-24">
        <ProgressCircular value={50} caption="일반 캡션" />
        <ProgressCircular value={100} variant="success" success="성공 메시지" />
        <ProgressCircular value={35} variant="failed" error="오류 메시지" />
      </div>
    );
  },
};
