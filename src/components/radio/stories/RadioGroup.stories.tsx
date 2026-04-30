import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Radio, RadioGroup } from '../Radio';
import type { RadioGroupProps } from '../Radio.types';

const meta: Meta<RadioGroupProps> = {
  title: 'DataEntry/Radio/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { disable: true },
  },
  argTypes: {
    value: {
      control: 'text',
      description: '선택된 값 (제어 모드 — 보통 onValueChange와 함께 사용)',
      table: { type: { summary: 'string' } },
    },
    defaultValue: {
      control: 'text',
      description: '초기 선택 값 (비제어 모드)',
      table: { type: { summary: 'string' } },
    },
    onValueChange: {
      action: 'valueChanged',
      description: '값 변경 시 호출되는 콜백',
      table: { type: { summary: '(value: string) => void' } },
    },
    disabled: {
      control: 'boolean',
      description: '그룹 전체 비활성화 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: '라디오 그룹 정렬 방향',
      table: {
        type: { summary: "'vertical' | 'horizontal'" },
        defaultValue: { summary: 'vertical' },
      },
    },
    name: {
      control: 'text',
      description: 'form 제출 시 사용되는 name 속성',
      table: { type: { summary: 'string' } },
    },
    required: {
      control: 'boolean',
      description: '필수 입력 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    error: {
      control: 'text',
      description: '에러 상태 — 문자열이면 caption 위치에 에러 메시지로 표시',
      table: { type: { summary: 'boolean | string' } },
    },
    success: {
      control: 'text',
      description: '성공 상태 — 문자열이면 caption 위치에 성공 메시지로 표시',
      table: { type: { summary: 'boolean | string' } },
    },
    caption: {
      control: 'text',
      description: '그룹 아래 설명 텍스트 (error/success 가 있으면 그쪽이 우선)',
      table: { type: { summary: 'string' } },
    },
  },
};

export default meta;
type Story = StoryObj<RadioGroupProps>;

const baseOptions = [
  { value: 'option1', label: '옵션 A' },
  { value: 'option2', label: '옵션 B' },
  { value: 'option3', label: '옵션 C' },
];

/**
 * 기본 RadioGroup
 *
 * 그룹 레벨 props (error / success / caption / required / orientation / disabled) 를 모두 컨트롤로 노출합니다.
 * RadioGroup 은 `<Radio>` 자식들을 감싸는 컨테이너 역할이며, RadioList 와 달리 직접 자식을 조립합니다.
 */
export const Default: Story = {
  args: {
    defaultValue: 'option1',
    disabled: false,
    orientation: 'vertical',
    required: false,
    name: 'example-group',
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
      <RadioGroup
        defaultValue={args.defaultValue}
        disabled={args.disabled}
        orientation={args.orientation}
        required={args.required}
        name={args.name}
        caption={caption}
        error={error}
        success={success}
        onValueChange={args.onValueChange}
      >
        {baseOptions.map((opt) => (
          <Radio key={opt.value} value={opt.value} label={opt.label} />
        ))}
      </RadioGroup>
    );
  },
};

/**
 * 가로 정렬 (`orientation="horizontal"`)
 *
 * 옵션이 적고 한 줄에 표시할 공간이 있을 때 사용합니다.
 */
export const Horizontal: Story = {
  render: () => (
    <RadioGroup defaultValue="option1" orientation="horizontal">
      <Radio value="option1" label="네" />
      <Radio value="option2" label="아니오" />
      <Radio value="option3" label="모르겠음" />
    </RadioGroup>
  ),
};

/**
 * 그룹 캡션 (`caption`)
 *
 * 라디오 그룹 아래에 보조 설명 텍스트를 표시합니다.
 */
export const WithCaption: Story = {
  render: () => (
    <RadioGroup defaultValue="option1" caption="선택지를 한 가지 골라주세요.">
      {baseOptions.map((opt) => (
        <Radio key={opt.value} value={opt.value} label={opt.label} />
      ))}
    </RadioGroup>
  ),
};

/**
 * 에러 상태 (`error`)
 *
 * `error` 가 문자열이면 caption 위치에 에러 메시지로 표시되고, 라디오에 에러 스타일이 적용됩니다.
 * `error={true}` 로 메시지 없이 스타일만 적용도 가능.
 */
export const WithError: Story = {
  render: () => (
    <div className="flex flex-col ds-gap-24">
      <RadioGroup error="필수 항목입니다. 한 가지를 선택해주세요.">
        {baseOptions.map((opt) => (
          <Radio key={opt.value} value={opt.value} label={opt.label} />
        ))}
      </RadioGroup>
      <RadioGroup error defaultValue="option1">
        {baseOptions.map((opt) => (
          <Radio key={opt.value} value={opt.value} label={opt.label} />
        ))}
      </RadioGroup>
    </div>
  ),
};

/**
 * 성공 상태 (`success`)
 *
 * 검증 통과 후 확인 피드백 등에 사용합니다.
 */
export const WithSuccess: Story = {
  render: () => (
    <RadioGroup defaultValue="option1" success="선택이 저장되었습니다.">
      {baseOptions.map((opt) => (
        <Radio key={opt.value} value={opt.value} label={opt.label} />
      ))}
    </RadioGroup>
  ),
};

/**
 * 필수 입력 (`required`)
 *
 * form 제출 시 그룹 단위로 필수 검증이 적용됩니다.
 * (시각적 별표 표시는 라벨이 있는 경우에만 — RadioGroup 자체는 라벨을 받지 않음)
 */
export const Required: Story = {
  render: () => (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        alert('submitted');
      }}
      className="flex flex-col ds-gap-12"
    >
      <RadioGroup name="plan" required caption="플랜을 선택해주세요.">
        <Radio value="basic" label="Basic" />
        <Radio value="pro" label="Pro" />
        <Radio value="enterprise" label="Enterprise" />
      </RadioGroup>
      <button
        type="submit"
        className="self-start padding-x-12 padding-y-6 bg-state-primary text-default rounded-sm border-0 cursor-pointer"
      >
        제출 (선택 안 하고 제출하면 브라우저 검증)
      </button>
    </form>
  ),
};

/**
 * 그룹 전체 비활성화 (`disabled`)
 *
 * 개별 Radio 의 `disabled` prop 보다 우선 적용됩니다.
 */
export const DisabledGroup: Story = {
  render: () => (
    <RadioGroup defaultValue="option2" disabled>
      {baseOptions.map((opt) => (
        <Radio key={opt.value} value={opt.value} label={opt.label} />
      ))}
    </RadioGroup>
  ),
};

/**
 * 일부 옵션만 비활성화
 *
 * 그룹은 활성, 특정 Radio 만 disabled 로 비활성화.
 */
export const PartiallyDisabled: Story = {
  render: () => (
    <RadioGroup defaultValue="option1">
      <Radio value="option1" label="옵션 A" />
      <Radio value="option2" label="옵션 B (비활성)" disabled />
      <Radio value="option3" label="옵션 C" />
    </RadioGroup>
  ),
};

/**
 * 비제어 모드 (`defaultValue`)
 *
 * 초기값만 지정하고 내부에서 상태를 관리합니다. 부모가 값을 추적할 필요가 없을 때 사용.
 */
export const Uncontrolled: Story = {
  render: () => (
    <RadioGroup defaultValue="option2">
      {baseOptions.map((opt) => (
        <Radio key={opt.value} value={opt.value} label={opt.label} />
      ))}
    </RadioGroup>
  ),
};

/**
 * 제어 모드 (`value` + `onValueChange`)
 *
 * 부모가 상태를 소유하고 RadioGroup 에 값을 주입합니다. 값을 다른 곳에서도 사용해야 할 때.
 */
export const Controlled: Story = {
  render: function Render() {
    const [value, setValue] = useState('option1');
    return (
      <div className="flex flex-col ds-gap-12">
        <RadioGroup value={value} onValueChange={setValue}>
          {baseOptions.map((opt) => (
            <Radio key={opt.value} value={opt.value} label={opt.label} />
          ))}
        </RadioGroup>
        <p className="font-body size-sm text-muted">선택된 값: {value}</p>
      </div>
    );
  },
};

/**
 * description 이 있는 옵션
 *
 * 각 Radio 가 라벨 아래에 부가 설명을 가질 수 있습니다.
 * RadioList 의 `items` 배열 기반 API 를 쓰지 않고 RadioGroup 으로 직접 조립할 때 유용.
 */
export const WithDescription: Story = {
  render: () => (
    <RadioGroup defaultValue="basic">
      <Radio value="basic" label="Basic" description="개인 사용자용 기본 기능" />
      <Radio value="pro" label="Pro" description="팀 협업, 무제한 프로젝트" />
      <Radio value="enterprise" label="Enterprise" description="전담 지원, SAML, SSO" />
    </RadioGroup>
  ),
};
