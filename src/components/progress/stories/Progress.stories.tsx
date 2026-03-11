import { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Progress } from '../Progress';
import type { ProgressProps } from '../Progress.types';

const meta: Meta<ProgressProps> = {
  title: 'Feedback/Progress',
  component: Progress,
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
      options: ['linear', 'dashed'],
      description: '진행 바 변형',
      table: {
        type: {
          summary: 'ProgressVariant',
          detail: "'linear' | 'dashed'",
        },
        defaultValue: { summary: 'linear' },
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
      description: '진행 바 색상',
      table: {
        type: {
          summary: 'ProgressColor',
          detail:
            "'gray' | 'brand' | 'red' | 'orange' | 'amber' | 'yellow' | 'lime' | 'green' | 'emerald' | 'teal' | 'cyan' | 'sky' | 'blue' | 'indigo' | 'violet' | 'purple' | 'fuchsia' | 'pink' | 'rose'",
        },
        defaultValue: { summary: 'gray' },
      },
    },
    label: {
      control: 'text',
      description: '라벨 텍스트',
      table: {
        type: { summary: 'string' },
      },
    },
    showValue: {
      control: 'boolean',
      description: '진행률 표시 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
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
    gradient: {
      control: 'text',
      description: 'CSS 그라디언트 문자열 (linear variant 전용). 지정 시 color 대신 적용',
      table: {
        type: {
          summary: 'string',
          detail: "예: 'linear-gradient(90deg, #f9d508 0%, #74c2fd 100%)'",
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<ProgressProps>;

/**
 * 기본 진행 바
 *
 * 선형 진행 바의 기본 형태입니다.
 */
export const Default: Story = {
  args: {
    value: 60,
    max: 100,
    variant: 'linear',
    color: 'gray',
    label: '진행률',
    showValue: true,
    caption: '',
    error: '',
    success: '',
    gradient: '',
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const caption = args.caption || undefined;
    const error = args.error || undefined;
    const success = args.success || undefined;
    const gradient = args.gradient || undefined;
    return (
      <div style={{ width: 320 }}>
        <Progress
          value={args.value}
          max={args.max}
          variant={args.variant}
          color={args.color}
          gradient={gradient}
          label={args.label}
          showValue={args.showValue}
          formatValue={args.formatValue}
          caption={caption}
          error={error}
          success={success}
        />
      </div>
    );
  },
};

/**
 * Dashed 변형
 *
 * 세그먼트로 나뉜 진행 바입니다.
 */
export const Dashed: Story = {
  render: function Render() {
    return (
      <div className="flex flex-col ds-gap-24" style={{ width: 320 }}>
        <Progress variant="dashed" label="10단계 중 3단계" showValue value={30} />
        <Progress variant="dashed" label="10단계 중 7단계" showValue value={70} />
        <Progress variant="dashed" label="완료" showValue value={100} color="green" />
      </div>
    );
  },
};

/**
 * 라벨과 값 표시
 */
export const WithLabelAndValue: Story = {
  render: function Render() {
    return (
      <div className="flex flex-col ds-gap-24" style={{ width: 320 }}>
        <Progress label="업로드 중..." showValue value={45} />
        <Progress label="처리 중" showValue value={80} />
        <Progress label="완료" showValue value={100} color="green" />
      </div>
    );
  },
};

/**
 * 캡션 텍스트
 *
 * 진행 바 아래에 추가 설명을 표시합니다.
 */
export const WithCaption: Story = {
  render: function Render() {
    return (
      <div className="flex flex-col ds-gap-24" style={{ width: 320 }}>
        <Progress
          label="파일 업로드 중"
          showValue
          value={45}
          caption="3 of 7 files uploaded"
        />
        <Progress
          label="스토리지"
          showValue
          value={75}
          caption="75GB of 100GB used"
          color="brand"
        />
        <Progress
          variant="dashed"
          label="온보딩"
          showValue
          value={60}
          caption="Step 6 of 10 completed"
        />
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
      <div className="flex flex-col ds-gap-24" style={{ width: 320 }}>
        <Progress color="gray" label="회색 (기본)" showValue value={60} />
        <Progress color="brand" label="브랜드" showValue value={60} />
        <Progress color="blue" label="파랑" showValue value={60} />
        <Progress color="green" label="초록" showValue value={60} />
        <Progress color="red" label="빨강" showValue value={60} />
        <Progress color="violet" label="보라" showValue value={60} />
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
      <div className="flex flex-col ds-gap-16" style={{ width: 320 }}>
        {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((v) => (
          <Progress key={v} showValue value={v} />
        ))}
      </div>
    );
  },
};

/**
 * 불확정 상태 (Indeterminate)
 *
 * value가 undefined일 때 표시되는 애니메이션 상태입니다.
 */
export const Indeterminate: Story = {
  render: function Render() {
    return (
      <div style={{ width: 320 }}>
        <Progress label="로딩 중..." />
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
      <div style={{ width: 320 }}>
        <Progress label="다운로드 중..." showValue value={value} color="brand" />
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
      <div className="flex flex-col ds-gap-24" style={{ width: 320 }}>
        <Progress
          label="스토리지 사용량"
          showValue
          value={75}
          formatValue={(v) => `${v}/100GB`}
        />
        <Progress
          label="완료된 작업"
          showValue
          value={40}
          formatValue={(v) => `${Math.round((v / 100) * 10)}/10 tasks`}
        />
      </div>
    );
  },
};

/**
 * Dashed 빈 상태
 *
 * 아직 진행되지 않은 상태를 표시합니다.
 */
export const DashedEmpty: Story = {
  render: function Render() {
    return (
      <div style={{ width: 320 }}>
        <Progress variant="dashed" label="시작 전" showValue value={0} />
      </div>
    );
  },
};

/**
 * 에러 상태
 *
 * 업로드 실패 등 에러 상황에서 빨간색 메시지를 표시합니다.
 */
export const ErrorState: Story = {
  render: function Render() {
    return (
      <div className="flex flex-col ds-gap-24" style={{ width: 320 }}>
        <Progress
          label="업로드 중..."
          showValue
          value={45}
          color="red"
          error="업로드 실패. 다시 시도하세요."
        />
        <Progress
          variant="dashed"
          label="처리 중"
          showValue
          value={30}
          error="연결 끊김"
        />
      </div>
    );
  },
};

/**
 * 성공 상태
 *
 * 작업 완료 시 초록색 메시지를 표시합니다.
 */
export const SuccessState: Story = {
  render: function Render() {
    return (
      <div className="flex flex-col ds-gap-24" style={{ width: 320 }}>
        <Progress
          label="업로드 완료"
          showValue
          value={100}
          color="green"
          success="모든 파일이 성공적으로 업로드되었습니다"
        />
        <Progress
          variant="dashed"
          label="완료"
          showValue
          value={100}
          color="green"
          success="10단계 중 10단계 완료"
        />
      </div>
    );
  },
};

/**
 * 에러/성공 상태 비교
 *
 * 에러와 성공 상태의 텍스트 색상을 비교합니다.
 * 에러가 성공보다 우선순위가 높습니다.
 */
export const ErrorAndSuccessStates: Story = {
  render: function Render() {
    return (
      <div className="flex flex-col ds-gap-24" style={{ width: 320 }}>
        <Progress
          label="일반 캡션"
          showValue
          value={50}
          caption="일반 회색 캡션 텍스트"
        />
        <Progress
          label="성공 메시지"
          showValue
          value={100}
          color="green"
          success="성공적으로 완료되었습니다!"
        />
        <Progress
          label="오류 메시지"
          showValue
          value={35}
          color="red"
          error="문제가 발생했습니다"
        />
      </div>
    );
  },
};

/**
 * 그라디언트
 *
 * `gradient` prop으로 CSS 그라디언트를 적용합니다.
 * 지정 시 `color` 대신 그라디언트가 사용됩니다.
 */
export const Gradient: Story = {
  render: function Render() {
    return (
      <div className="flex flex-col ds-gap-24" style={{ width: 320 }}>
        <Progress
          label="토큰 사용량"
          showValue
          value={65}
          gradient="linear-gradient(90deg, #f9d508 0%, #74c2fd 100%)"
        />
        <Progress
          label="진행률"
          showValue
          value={80}
          gradient="linear-gradient(90deg, #34d399 0%, #3b82f6 100%)"
        />
      </div>
    );
  },
};
