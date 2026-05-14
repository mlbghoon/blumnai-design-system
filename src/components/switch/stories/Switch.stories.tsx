import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, useEffect } from 'react';

import { Switch } from '../Switch';
import { Icon, RiCheckLine, RiCloseLine, RiSunFill, RiMoonFill } from '../../icons/Icon';
import type { SwitchColor } from '../Switch.types';

const meta: Meta<typeof Switch> = {
  title: 'DataEntry/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  argTypes: {
    checked: {
      control: 'boolean',
      description: '스위치 상태',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
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
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: '스위치 크기',
      table: {
        type: {
          summary: 'SwitchSize',
          detail: `'sm' | 'md' | 'lg'`,
        },
        defaultValue: { summary: 'sm' },
      },
    },
    loading: {
      control: 'boolean',
      description: '로딩 상태 — 스피너를 표시하고 인터랙션을 비활성화',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    color: {
      control: 'select',
      options: ['gray', 'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose'],
      description: '활성화 시 스위치 색상',
      table: {
        type: {
          summary: 'SwitchColor',
          detail: `'gray' | 'red' | 'orange' | 'amber' | 'yellow' | 'lime' | 'green' | 'emerald' | 'teal' | 'cyan' | 'sky' | 'blue' | 'indigo' | 'violet' | 'purple' | 'fuchsia' | 'pink' | 'rose'`,
        },
        defaultValue: { summary: 'green' },
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
    switchPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: '스위치 위치 (라벨 기준)',
      table: {
        type: {
          summary: 'SwitchPosition',
          detail: `'left' | 'right'`,
        },
        defaultValue: { summary: 'left' },
      },
    },
    onLabel: {
      control: 'text',
      description: '활성화 시 트랙 내 표시 텍스트',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    offLabel: {
      control: 'text',
      description: '비활성화 시 트랙 내 표시 텍스트',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    trackWidth: {
      control: 'number',
      description: '라벨 표시 시 트랙 너비 (px). 미지정 시 사이즈별 기본값 사용',
      table: {
        type: { summary: 'number' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

/**
 * 기본 스위치
 *
 * 이 스토리에서 Switch의 모든 props를 테스트할 수 있습니다.
 */
export const Default: Story = {
  args: {
    checked: false,
    disabled: false,
    size: 'sm',
    loading: false,
    color: 'green',
    label: '',
    description: '',
    switchPosition: 'left',
    onLabel: '',
    offLabel: '',
    trackWidth: undefined,
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const [checked, setChecked] = useState(args.checked);
    useEffect(() => {
      setChecked(args.checked);
    }, [args.checked]);
    const label = args.label || undefined;
    const description = args.description || undefined;
    const onLabel = args.onLabel || undefined;
    const offLabel = args.offLabel || undefined;
    return (
      <Switch
        checked={checked}
        onCheckedChange={setChecked}
        disabled={args.disabled}
        size={args.size}
        loading={args.loading}
        color={args.color}
        label={label}
        description={description}
        switchPosition={args.switchPosition}
        onLabel={onLabel}
        offLabel={offLabel}
        trackWidth={args.trackWidth}
      />
    );
  },
};

/**
 * 색상 변형
 *
 * `color` prop으로 활성화 시 스위치 색상을 변경할 수 있습니다.
 */
export const Colors: Story = {
  render: function Render() {
    const colors: SwitchColor[] = ['gray', 'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose'];
    const [states, setStates] = useState<Record<SwitchColor, boolean>>(
      Object.fromEntries(colors.map((c) => [c, true])) as Record<SwitchColor, boolean>
    );

    return (
      <div className="flex flex-col ds-gap-16">
        {colors.map((color) => (
          <div key={color} className="flex items-center ds-gap-16">
            <Switch
              checked={states[color]}
              onCheckedChange={(checked) => setStates((prev) => ({ ...prev, [color]: checked }))}
              color={color}
            />
            <span className="font-body size-sm text-default capitalize">{color}</span>
          </div>
        ))}
      </div>
    );
  },
};

/**
 * 라벨이 있는 스위치
 */
export const WithLabel: Story = {
  render: function Render() {
    const [checked, setChecked] = useState(false);
    return (
      <Switch
        checked={checked}
        onCheckedChange={setChecked}
        label="알림 활성화"
      />
    );
  },
};

/**
 * 라벨과 설명이 있는 스위치
 */
export const WithDescription: Story = {
  render: function Render() {
    const [checked, setChecked] = useState(false);
    return (
      <Switch
        checked={checked}
        onCheckedChange={setChecked}
        label="마케팅 이메일"
        description="새 제품 및 기능에 대한 이메일을 받습니다."
      />
    );
  },
};

/**
 * 스위치 위치 변형
 *
 * `switchPosition` prop으로 스위치를 라벨 왼쪽 또는 오른쪽에 배치할 수 있습니다.
 */
export const PositionVariants: Story = {
  render: function Render() {
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(true);
    return (
      <div className="flex flex-col ds-gap-24">
        <Switch
          checked={checked1}
          onCheckedChange={setChecked1}
          label="왼쪽 스위치 (기본값)"
          description="스위치가 왼쪽에 위치합니다."
          switchPosition="left"
        />
        <Switch
          checked={checked2}
          onCheckedChange={setChecked2}
          label="오른쪽 스위치"
          description="스위치가 오른쪽에 위치합니다."
          switchPosition="right"
        />
      </div>
    );
  },
};

/**
 * 비활성화 상태
 */
export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col ds-gap-24">
      <Switch
        checked={false}
        disabled
        label="비활성화 (꺼짐)"
        description="이 스위치는 비활성화되어 있고 꺼져 있습니다."
      />
      <Switch
        checked={true}
        disabled
        label="비활성화 (켜짐)"
        description="이 스위치는 비활성화되어 있고 켜져 있습니다."
      />
    </div>
  ),
};

/**
 * 모든 상태 비교
 */
export const AllStates: Story = {
  render: function Render() {
    const [states, setStates] = useState({
      defaultOff: false,
      defaultOn: true,
    });

    const handleChange = (key: keyof typeof states) => (checked: boolean) => {
      setStates((prev) => ({ ...prev, [key]: checked }));
    };

    return (
      <div className="flex flex-col ds-gap-24">
        <div>
          <h3 className="size-sm font-medium text-default [margin-bottom:48px]">기본 상태</h3>
          <div className="flex ds-gap-24">
            <Switch
              checked={states.defaultOff}
              onCheckedChange={handleChange('defaultOff')}
            />
            <Switch
              checked={states.defaultOn}
              onCheckedChange={handleChange('defaultOn')}
            />
          </div>
        </div>

        <div>
          <h3 className="size-sm font-medium text-default [margin-bottom:48px]">비활성화 상태</h3>
          <div className="flex ds-gap-24">
            <Switch checked={false} disabled />
            <Switch checked={true} disabled />
          </div>
        </div>

        <div>
          <h3 className="size-sm font-medium text-default [margin-bottom:48px]">라벨 포함</h3>
          <div className="flex flex-col ds-gap-16">
            <Switch
              checked={states.defaultOff}
              onCheckedChange={handleChange('defaultOff')}
              label="꺼짐 상태"
              description="현재 스위치가 꺼져 있습니다."
            />
            <Switch
              checked={states.defaultOn}
              onCheckedChange={handleChange('defaultOn')}
              label="켜짐 상태"
              description="현재 스위치가 켜져 있습니다."
            />
          </div>
        </div>
      </div>
    );
  },
};

/**
 * 트랙 라벨
 *
 * `onLabel`과 `offLabel`로 트랙 내부에 ON/OFF 텍스트를 표시할 수 있습니다.
 */
export const WithTrackLabels: Story = {
  render: function Render() {
    const [smChecked, setSmChecked] = useState(false);
    const [mdChecked, setMdChecked] = useState(true);
    const [lgChecked, setLgChecked] = useState(false);

    return (
      <div className="flex flex-col ds-gap-24">
        <div className="flex items-center ds-gap-16">
          <Switch
            size="sm"
            checked={smChecked}
            onCheckedChange={setSmChecked}
            onLabel="ON"
            offLabel="OFF"
          />
          <span className="font-body size-sm text-subtle">Small</span>
        </div>
        <div className="flex items-center ds-gap-16">
          <Switch
            size="md"
            checked={mdChecked}
            onCheckedChange={setMdChecked}
            onLabel="ON"
            offLabel="OFF"
          />
          <span className="font-body size-sm text-subtle">Medium</span>
        </div>
        <div className="flex items-center ds-gap-16">
          <Switch
            size="lg"
            checked={lgChecked}
            onCheckedChange={setLgChecked}
            onLabel="ON"
            offLabel="OFF"
          />
          <span className="font-body size-sm text-subtle">Large</span>
        </div>
      </div>
    );
  },
};

/**
 * 트랙 라벨 + 색상
 *
 * 다양한 색상과 트랙 라벨을 함께 사용한 예시입니다.
 */
export const WithTrackLabelsColors: Story = {
  render: function Render() {
    const colors: SwitchColor[] = ['gray', 'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose'];
    const [states, setStates] = useState<Record<SwitchColor, boolean>>(
      Object.fromEntries(colors.map((c) => [c, true])) as Record<SwitchColor, boolean>
    );

    return (
      <div className="flex flex-col ds-gap-16">
        {colors.map((color) => (
          <div key={color} className="flex items-center ds-gap-16">
            <Switch
              size="lg"
              checked={states[color]}
              onCheckedChange={(checked) => setStates((prev) => ({ ...prev, [color]: checked }))}
              color={color}
              onLabel="ON"
              offLabel="OFF"
            />
            <span className="font-body size-sm text-default capitalize">{color}</span>
          </div>
        ))}
      </div>
    );
  },
};

/**
 * 에러 상태
 *
 * error 문자열을 전달하면 에러 메시지가 하단에 표시되고 스위치 트랙에 에러 아웃라인이 적용됩니다.
 */
export const WithError: Story = {
  render: function Render() {
    const [checked, setChecked] = useState(false);
    return (
      <div className="flex flex-col ds-gap-24">
        <Switch
          checked={checked}
          onCheckedChange={setChecked}
          label="알림 활성화"
          error="이 설정은 필수입니다"
        />
        <Switch
          checked={checked}
          onCheckedChange={setChecked}
          label="알림 활성화"
          description="중요한 알림을 받으려면 활성화하세요"
          error="이 설정은 필수입니다"
          required
        />
      </div>
    );
  },
};

/**
 * 성공 상태
 */
export const WithSuccess: Story = {
  render: function Render() {
    return (
      <Switch
        checked
        label="2단계 인증"
        success="보안 설정이 활성화되었습니다"
      />
    );
  },
};

/**
 * 캡션 텍스트
 */
export const WithCaption: Story = {
  render: function Render() {
    return (
      <Switch
        label="자동 백업"
        caption="매일 자정에 자동으로 백업됩니다"
      />
    );
  },
};

/**
 * 필수 표시
 */
export const Required: Story = {
  render: function Render() {
    return (
      <div className="flex flex-col ds-gap-24">
        <Switch label="필수 설정" required />
        <Switch label="선택 설정" />
      </div>
    );
  },
};

/**
 * 에러 boolean (아웃라인만)
 */
export const ErrorBooleanOnly: Story = {
  render: function Render() {
    return (
      <div className="flex flex-col ds-gap-24">
        <Switch label="에러 아웃라인만" error />
        <Switch label="에러 + 캡션" error caption="이 설정을 확인해 주세요" />
      </div>
    );
  },
};

/**
 * 썸 아이콘
 *
 * `thumbIcon`으로 토글 핸들 내부에 아이콘을 표시할 수 있습니다.
 * 함수를 전달하면 checked 상태에 따라 다른 아이콘을 표시합니다.
 */
export const WithThumbIcon: Story = {
  render: function Render() {
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(true);
    const [checked3, setChecked3] = useState(false);

    return (
      <div className="flex flex-col ds-gap-24">
        <div className="flex items-center ds-gap-16">
          <Switch
            size="md"
            checked={checked1}
            onCheckedChange={setChecked1}
            thumbIcon={(c) => (
              <Icon
                icon={c ? RiCheckLine : RiCloseLine}
                size={12}
                color="default-muted"
              />
            )}
          />
          <span className="font-body size-sm text-subtle">상태별 아이콘 (✓ / ✕)</span>
        </div>
        <div className="flex items-center ds-gap-16">
          <Switch
            size="lg"
            checked={checked2}
            onCheckedChange={setChecked2}
            thumbIcon={
              <Icon icon={RiCheckLine} size={14} color="default-muted" />
            }
          />
          <span className="font-body size-sm text-subtle">고정 아이콘 (✓)</span>
        </div>
        <div className="flex items-center ds-gap-16">
          <Switch
            size="lg"
            checked={checked3}
            onCheckedChange={setChecked3}
            color="blue"
            thumbIcon={(c) => (
              <Icon
                icon={c ? RiSunFill : RiMoonFill}
                size={14}
                color="default-muted"
              />
            )}
          />
          <span className="font-body size-sm text-subtle">테마 토글 (☀ / ☽)</span>
        </div>
      </div>
    );
  },
};

/**
 * 커스텀 트랙 너비
 *
 * `trackWidth`로 라벨이 있는 스위치의 트랙 너비를 자유롭게 조절할 수 있습니다.
 * 썸 위치와 라벨 영역이 자동으로 계산됩니다.
 */
export const CustomTrackWidth: Story = {
  render: function Render() {
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(true);
    const [checked3, setChecked3] = useState(false);

    return (
      <div className="flex flex-col ds-gap-24">
        <div className="flex items-center ds-gap-16">
          <Switch
            size="sm"
            checked={checked1}
            onCheckedChange={setChecked1}
            onLabel="ON"
            offLabel="OFF"
          />
          <span className="font-body size-sm text-subtle">기본 (44px)</span>
        </div>
        <div className="flex items-center ds-gap-16">
          <Switch
            size="sm"
            checked={checked2}
            onCheckedChange={setChecked2}
            onLabel="ON"
            offLabel="OFF"
            trackWidth={52}
          />
          <span className="font-body size-sm text-subtle">trackWidth={'{52}'}</span>
        </div>
        <div className="flex items-center ds-gap-16">
          <Switch
            size="md"
            checked={checked3}
            onCheckedChange={setChecked3}
            onLabel="활성"
            offLabel="비활성"
            trackWidth={72}
          />
          <span className="font-body size-sm text-subtle">한글 라벨 trackWidth={'{72}'}</span>
        </div>
      </div>
    );
  },
};
