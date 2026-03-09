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
      description: '현재 진행률을 0부터 100 사이의 숫자로 설정합니다. 값을 지정하지 않으면 진행률을 알 수 없는 불확정(indeterminate) 상태로 표시됩니다',
      table: {
        type: {
          summary: 'number',
          detail: '0-100 사이의 숫자. undefined면 indeterminate 상태',
        },
      },
    },
    max: {
      control: 'number',
      description: '진행률의 최대값을 설정합니다. 기본값은 100이며, value가 이 값에 도달하면 100% 완료를 나타냅니다',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '100' },
      },
    },
    variant: {
      control: 'select',
      options: ['linear', 'dashed'],
      description: '진행 바의 모양을 설정합니다. linear(연속된 막대), dashed(세그먼트로 나뉜 막대) 중 선택할 수 있습니다',
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
      description: '진행 바의 채워진 부분 색상을 설정합니다. 19가지 색상 중 선택할 수 있으며, 기본값은 gray입니다',
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
      description: '진행 바 왼쪽 상단에 표시되는 라벨 텍스트입니다. 작업의 이름이나 상태를 나타냅니다',
      table: {
        type: { summary: 'string' },
      },
    },
    showValue: {
      control: 'boolean',
      description: 'true로 설정하면 진행 바 오른쪽 상단에 현재 진행률 값(예: "60%")이 표시됩니다',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    formatValue: {
      description: '진행률 값의 표시 형식을 변경하는 함수입니다. 기본 "%"대신 "3/10 tasks" 같은 커스텀 형식을 사용할 수 있습니다',
      table: {
        type: {
          summary: '(value: number) => string',
          detail: "예: (v) => `${v}%`",
        },
      },
    },
    caption: {
      control: 'text',
      description: '진행 바 아래에 표시되는 보조 설명 텍스트입니다. 상세한 진행 정보를 제공합니다 (예: "7개 중 3개 파일 업로드됨")',
      table: {
        type: { summary: 'string' },
      },
    },
    error: {
      control: 'text',
      description: '에러 상태를 설정합니다. true로 설정하면 에러 스타일만 적용되고, 문자열을 전달하면 빨간색 에러 메시지가 표시됩니다',
      table: {
        type: {
          summary: 'boolean | string',
          detail: 'true = 에러 스타일만, string = 에러 메시지 표시',
        },
      },
    },
    success: {
      control: 'text',
      description: '성공 상태를 설정합니다. true로 설정하면 성공 스타일만 적용되고, 문자열을 전달하면 초록색 성공 메시지가 표시됩니다',
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
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const caption = args.caption || undefined;
    const error = args.error || undefined;
    const success = args.success || undefined;
    return (
      <div style={{ width: 320 }}>
        <Progress
          value={args.value}
          max={args.max}
          variant={args.variant}
          color={args.color}
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
          label="파일 업로드"
          showValue
          value={45}
          caption="7개 중 3개 파일 업로드됨"
        />
        <Progress
          label="저장소"
          showValue
          value={75}
          caption="100GB 중 75GB 사용됨"
          color="brand"
        />
        <Progress
          variant="dashed"
          label="온보딩"
          showValue
          value={60}
          caption="10단계 중 6단계 완료"
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
        <Progress color="gray" label="Gray (기본)" showValue value={60} />
        <Progress color="brand" label="Brand" showValue value={60} />
        <Progress color="blue" label="파란색" showValue value={60} />
        <Progress color="green" label="초록색" showValue value={60} />
        <Progress color="red" label="빨간색" showValue value={60} />
        <Progress color="violet" label="보라색" showValue value={60} />
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
          label="저장소 사용량"
          showValue
          value={75}
          formatValue={(v) => `${v}/100GB`}
        />
        <Progress
          label="작업 완료"
          showValue
          value={40}
          formatValue={(v) => `${Math.round((v / 100) * 10)}/10개 작업`}
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
          error="업로드에 실패했습니다. 다시 시도해 주세요."
        />
        <Progress
          variant="dashed"
          label="처리 중"
          showValue
          value={30}
          error="연결이 끊어졌습니다"
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
          caption="기본 회색 캡션 텍스트"
        />
        <Progress
          label="성공 메시지"
          showValue
          value={100}
          color="green"
          success="성공적으로 완료되었습니다!"
        />
        <Progress
          label="에러 메시지"
          showValue
          value={35}
          color="red"
          error="문제가 발생했습니다"
        />
      </div>
    );
  },
};
