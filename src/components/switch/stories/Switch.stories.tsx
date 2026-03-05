import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, useEffect } from 'react';

import { Switch } from '../Switch';
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
      options: ['green', 'blue', 'red', 'orange', 'violet', 'cyan', 'pink'],
      description: '활성화 시 스위치 색상',
      table: {
        type: {
          summary: 'SwitchColor',
          detail: `'green' | 'blue' | 'red' | 'orange' | 'violet' | 'cyan' | 'pink'`,
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
    const colors: SwitchColor[] = ['green', 'blue', 'red', 'orange', 'violet', 'cyan', 'pink'];
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
        label="Enable notifications"
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
        label="Marketing emails"
        description="Receive emails about new products and features."
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
          label="Switch on left (default)"
          description="The switch is positioned on the left side."
          switchPosition="left"
        />
        <Switch
          checked={checked2}
          onCheckedChange={setChecked2}
          label="Switch on right"
          description="The switch is positioned on the right side."
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
        label="Disabled (unchecked)"
        description="This switch is disabled and unchecked."
      />
      <Switch
        checked={true}
        disabled
        label="Disabled (checked)"
        description="This switch is disabled and checked."
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
          <h3 className="size-sm font-medium text-default [margin-bottom:48px]">Default States</h3>
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
          <h3 className="size-sm font-medium text-default [margin-bottom:48px]">Disabled States</h3>
          <div className="flex ds-gap-24">
            <Switch checked={false} disabled />
            <Switch checked={true} disabled />
          </div>
        </div>

        <div>
          <h3 className="size-sm font-medium text-default [margin-bottom:48px]">With Labels</h3>
          <div className="flex flex-col ds-gap-16">
            <Switch
              checked={states.defaultOff}
              onCheckedChange={handleChange('defaultOff')}
              label="Off state"
              description="This switch is currently off."
            />
            <Switch
              checked={states.defaultOn}
              onCheckedChange={handleChange('defaultOn')}
              label="On state"
              description="This switch is currently on."
            />
          </div>
        </div>
      </div>
    );
  },
};
