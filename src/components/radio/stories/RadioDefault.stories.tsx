import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Radio, RadioGroup } from '../Radio';
import type { RadioProps } from '../Radio.types';

const meta: Meta<RadioProps> = {
  title: 'DataEntry/Radio/RadioDefault',
  component: Radio,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { disable: true },
  },
  argTypes: {
    value: {
      control: 'text',
      description: 'Radio value (RadioGroup 내에서 고유해야 함)',
      table: {
        type: { summary: 'string' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    label: {
      control: 'text',
      description: '라벨 텍스트 (Title)',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    description: {
      control: 'text',
      description: '라벨 아래 설명 텍스트',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    radioPosition: {
      control: 'select',
      options: ['left', 'right', 'off'],
      description: '라디오 버튼 위치 (라벨 기준)',
      table: {
        type: {
          summary: 'RadioPosition',
          detail: `'left' | 'right' | 'off'`,
        },
        defaultValue: { summary: 'left' },
      },
    },
    radioStyle: {
      control: 'select',
      options: ['default', 'with-shadow'],
      description: '스타일 변형',
      table: {
        type: {
          summary: 'RadioStyle',
          detail: `'default' | 'with-shadow'`,
        },
        defaultValue: { summary: 'default' },
      },
    },
    align: {
      control: 'select',
      options: ['start', 'center'],
      description: '라벨과 라디오 버튼의 수직 정렬',
      table: {
        type: {
          summary: "'start' | 'center'",
        },
        defaultValue: { summary: 'start' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: '라디오 버튼 크기',
      table: {
        type: {
          summary: 'RadioSize',
          detail: `'sm' | 'md' | 'lg'`,
        },
        defaultValue: { summary: 'sm' },
      },
    },
    labelWeight: {
      control: 'select',
      options: ['normal', 'medium'],
      description: '라벨 텍스트의 font-weight',
      table: {
        type: {
          summary: "'normal' | 'medium'",
        },
        defaultValue: { summary: 'medium' },
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<RadioProps>;

// ============================================================================
// BASIC
// ============================================================================

/**
 * 기본 Radio
 *
 * 이 스토리에서 Radio의 모든 props를 테스트할 수 있습니다.
 * RadioGroup 내에서 단일 선택만 허용됩니다.
 */
export const Default: Story = {
  args: {
    value: 'option1',
    disabled: false,
    label: '제목',
    description: '',
    radioPosition: 'left',
    radioStyle: 'default',
    size: 'sm',
    align: 'start',
    labelWeight: 'medium',
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const [value, setValue] = useState(args.value);
    const description = args.description || undefined;

    return (
      <RadioGroup value={value} onValueChange={setValue}>
        <Radio
          value={args.value}
          disabled={args.disabled}
          label={args.label}
          description={description}
          radioPosition={args.radioPosition}
          radioStyle={args.radioStyle}
          size={args.size}
          align={args.align}
          labelWeight={args.labelWeight}
        />
        <Radio
          value="option2"
          disabled={args.disabled}
          label="옵션 2"
          radioPosition={args.radioPosition}
          radioStyle={args.radioStyle}
          size={args.size}
          align={args.align}
          labelWeight={args.labelWeight}
        />
        <Radio
          value="option3"
          disabled={args.disabled}
          label="옵션 3"
          radioPosition={args.radioPosition}
          radioStyle={args.radioStyle}
          size={args.size}
          align={args.align}
          labelWeight={args.labelWeight}
        />
      </RadioGroup>
    );
  },
};

/**
 * 라벨 있는 라디오
 */
export const WithLabel: Story = {
  render: function Render() {
    const [value, setValue] = useState('');
    return (
      <RadioGroup value={value} onValueChange={setValue}>
        <Radio value="option1" label="이용약관에 동의합니다" />
      </RadioGroup>
    );
  },
};

/**
 * 라벨과 설명 텍스트
 */
export const WithDescription: Story = {
  render: function Render() {
    const [value, setValue] = useState('');
    return (
      <RadioGroup value={value} onValueChange={setValue}>
        <Radio value="option1" label="제목" description="설명" />
      </RadioGroup>
    );
  },
};

/**
 * 모든 상태 (설명 포함)
 *
 * 일반 상태와 비활성화 상태의 라디오를 모두 보여줍니다.
 */
export const AllStatesWithDescription: Story = {
  render: function Render() {
    const [value1, setValue1] = useState('checked');
    const [value2, setValue2] = useState('disabled-checked');

    return (
      <div className="flex flex-col ds-gap-24">
        <RadioGroup value={value1} onValueChange={setValue1} className="flex flex-row ds-gap-24">
          <Radio value="unchecked" label="제목" description="설명" />
          <Radio value="checked" label="제목" description="설명" />
        </RadioGroup>
        <RadioGroup value={value2} onValueChange={setValue2} className="flex flex-row ds-gap-24">
          <Radio value="disabled-unchecked" disabled label="제목" description="설명" />
          <Radio value="disabled-checked" disabled label="제목" description="설명" />
        </RadioGroup>
      </div>
    );
  },
};

// ============================================================================
// STATES
// ============================================================================

/**
 * 체크 상태
 */
export const CheckedStates: Story = {
  render: function Render() {
    const [value, setValue] = useState('checked');
    return (
      <RadioGroup value={value} onValueChange={setValue} className="flex flex-col ds-gap-16">
        <Radio value="unchecked" label="선택 안 됨" />
        <Radio value="checked" label="선택됨" />
      </RadioGroup>
    );
  },
};

/**
 * 비활성화 상태
 */
export const DisabledStates: Story = {
  render: function Render() {
    const [value, setValue] = useState('disabled-checked');
    return (
      <RadioGroup value={value} onValueChange={setValue} className="flex flex-col ds-gap-16">
        <Radio value="disabled-unchecked" disabled label="비활성 선택 안 됨" />
        <Radio value="disabled-checked" disabled label="비활성 선택됨" />
      </RadioGroup>
    );
  },
};

// ============================================================================
// STYLES
// ============================================================================

/**
 * 기본 스타일
 */
export const StyleDefault: Story = {
  render: function Render() {
    const [value, setValue] = useState('checked');
    return (
      <RadioGroup value={value} onValueChange={setValue} className="flex flex-col ds-gap-16">
        <Radio value="unchecked" radioStyle="default" label="기본 스타일 (선택 안 됨)" />
        <Radio value="checked" radioStyle="default" label="기본 스타일 (선택됨)" />
      </RadioGroup>
    );
  },
};

/**
 * 그림자 스타일
 */
export const StyleWithShadow: Story = {
  render: function Render() {
    const [value, setValue] = useState('checked');
    return (
      <RadioGroup value={value} onValueChange={setValue} className="flex flex-col ds-gap-16">
        <Radio value="unchecked" radioStyle="with-shadow" label="그림자 스타일 (선택 안 됨)" />
        <Radio value="checked" radioStyle="with-shadow" label="그림자 스타일 (선택됨)" />
      </RadioGroup>
    );
  },
};

// ============================================================================
// LABEL WEIGHT
// ============================================================================

/**
 * 라벨 굵기
 *
 * labelWeight prop으로 라벨의 font-weight를 조절합니다.
 */
export const LabelWeight: Story = {
  render: function Render() {
    const [value, setValue] = useState('normal');
    return (
      <RadioGroup value={value} onValueChange={setValue} className="flex flex-col ds-gap-16">
        <Radio value="medium" label="font-medium (기본)" labelWeight="medium" />
        <Radio value="normal" label="font-normal (가벼운 텍스트)" labelWeight="normal" />
      </RadioGroup>
    );
  },
};

// ============================================================================
// POSITIONS
// ============================================================================

/**
 * 라디오 버튼 위치
 */
export const RadioPositions: Story = {
  render: function Render() {
    const [value, setValue] = useState('right');
    return (
      <RadioGroup value={value} onValueChange={setValue} className="flex flex-col ds-gap-16">
        <Radio value="left" radioPosition="left" label="라디오 왼쪽" description="기본 위치" />
        <Radio value="right" radioPosition="right" label="라디오 오른쪽" description="대체 위치" />
      </RadioGroup>
    );
  },
};

// ============================================================================
// INTERACTIVE
// ============================================================================

/**
 * 수직 정렬
 *
 * align="center"로 라벨이 복잡한 요소(폼 컨트롤 등)일 때 라디오 버튼을 수직 중앙 정렬합니다.
 */
export const AlignCenter: Story = {
  render: function Render() {
    const [value, setValue] = useState('option1');
    return (
      <div className="flex flex-col ds-gap-24">
        <div>
          <p className="font-body size-sm text-muted margin-b-8">align=&quot;start&quot; (기본)</p>
          <RadioGroup value={value} onValueChange={setValue}>
            <Radio value="option1" align="start" label="짧은 라벨" />
            <Radio value="option2" align="start" label={<span className="font-body size-sm">여러 줄이 포함된<br />긴 라벨 텍스트</span>} />
          </RadioGroup>
        </div>
        <div>
          <p className="font-body size-sm text-muted margin-b-8">align=&quot;center&quot;</p>
          <RadioGroup value={value} onValueChange={setValue}>
            <Radio value="option1" align="center" label="짧은 라벨" />
            <Radio value="option2" align="center" label={<span className="font-body size-sm">여러 줄이 포함된<br />긴 라벨 텍스트</span>} />
          </RadioGroup>
        </div>
      </div>
    );
  },
};

/**
 * 단일 선택
 *
 * RadioGroup 내에서 하나의 옵션만 선택할 수 있습니다.
 */
export const SingleSelection: Story = {
  render: function Render() {
    const [value, setValue] = useState('option1');

    return (
      <div className="flex flex-col ds-gap-12">
        <RadioGroup value={value} onValueChange={setValue}>
          <Radio value="option1" label="옵션 1" />
          <Radio value="option2" label="옵션 2" />
          <Radio value="option3" label="옵션 3" />
        </RadioGroup>
        <p className="size-xs text-muted margin-t-32">선택됨: {value || '없음'}</p>
      </div>
    );
  },
};

/**
 * 크기 비교
 *
 * sm, md, lg 세 가지 크기를 비교합니다.
 */
export const Sizes: Story = {
  render: function Render() {
    const [value, setValue] = useState('sm');
    return (
      <div className="flex flex-col ds-gap-24">
        <div>
          <p className="font-body size-sm text-muted margin-b-8">size=&quot;sm&quot;</p>
          <RadioGroup value={value} onValueChange={setValue}>
            <Radio value="sm" size="sm" label="소형 라디오" />
          </RadioGroup>
        </div>
        <div>
          <p className="font-body size-sm text-muted margin-b-8">size=&quot;md&quot;</p>
          <RadioGroup value={value} onValueChange={setValue}>
            <Radio value="md" size="md" label="중형 라디오" />
          </RadioGroup>
        </div>
        <div>
          <p className="font-body size-sm text-muted margin-b-8">size=&quot;lg&quot;</p>
          <RadioGroup value={value} onValueChange={setValue}>
            <Radio value="lg" size="lg" label="대형 라디오" />
          </RadioGroup>
        </div>
      </div>
    );
  },
};

/**
 * 에러 상태
 *
 * RadioGroup에 error 문자열을 전달하면 에러 메시지가 그룹 하단에 표시되고
 * 선택되지 않은 라디오 버튼의 테두리가 빨간색으로 변합니다.
 */
export const WithError: Story = {
  render: function Render() {
    const [value, setValue] = useState('');
    return (
      <RadioGroup value={value} onValueChange={setValue} error="항목을 선택해 주세요" required>
        <Radio value="a" label="옵션 A" />
        <Radio value="b" label="옵션 B" />
        <Radio value="c" label="옵션 C" />
      </RadioGroup>
    );
  },
};

/**
 * 성공 상태
 */
export const WithSuccess: Story = {
  render: function Render() {
    return (
      <RadioGroup value="a" success="선택이 완료되었습니다">
        <Radio value="a" label="옵션 A" />
        <Radio value="b" label="옵션 B" />
      </RadioGroup>
    );
  },
};

/**
 * 캡션 텍스트
 */
export const WithCaption: Story = {
  render: function Render() {
    const [value, setValue] = useState('a');
    return (
      <RadioGroup value={value} onValueChange={setValue} caption="하나의 옵션만 선택할 수 있습니다">
        <Radio value="a" label="옵션 A" />
        <Radio value="b" label="옵션 B" />
      </RadioGroup>
    );
  },
};

/**
 * 에러 boolean (테두리만)
 */
export const ErrorBooleanOnly: Story = {
  render: function Render() {
    const [value, setValue] = useState('');
    return (
      <div className="flex flex-col ds-gap-24">
        <RadioGroup value={value} onValueChange={setValue} error>
          <Radio value="a" label="에러 테두리만" />
          <Radio value="b" label="옵션 B" />
        </RadioGroup>
        <RadioGroup value={value} onValueChange={setValue} error caption="이 항목을 확인해 주세요">
          <Radio value="a" label="에러 + 캡션" />
          <Radio value="b" label="옵션 B" />
        </RadioGroup>
      </div>
    );
  },
};
