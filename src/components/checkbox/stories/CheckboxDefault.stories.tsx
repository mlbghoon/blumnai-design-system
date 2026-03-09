import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Checkbox } from '../Checkbox';
import type { CheckboxProps } from '../Checkbox.types';

const meta: Meta<CheckboxProps> = {
  title: 'DataEntry/Checkbox/CheckboxDefault',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { disable: true },
  },
  argTypes: {
    checked: {
      control: 'select',
      options: [false, true, 'indeterminate'],
      description: '체크 상태',
      table: {
        type: {
          summary: 'boolean | "indeterminate"',
          detail: `false: 체크 안됨
true: 체크됨
'indeterminate': 부분 선택`,
        },
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
    checkboxPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: '체크박스 위치 (라벨 기준)',
      table: {
        type: {
          summary: 'CheckboxPosition',
          detail: `'left' | 'right'`,
        },
        defaultValue: { summary: 'left' },
      },
    },
    checkboxStyle: {
      control: 'select',
      options: ['default', 'with-shadow'],
      description: '스타일 변형',
      table: {
        type: {
          summary: 'CheckboxStyle',
          detail: `'default' | 'with-shadow'`,
        },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: '체크박스 크기',
      table: {
        type: {
          summary: 'CheckboxSize',
          detail: `'sm' | 'md' | 'lg'`,
        },
        defaultValue: { summary: 'sm' },
      },
    },
    shape: {
      control: 'select',
      options: ['square', 'round'],
      description: '체크박스 모양',
      table: {
        type: {
          summary: 'CheckboxShape',
          detail: `'square' | 'round'`,
        },
        defaultValue: { summary: 'square' },
      },
    },
    onCheckedChange: {
      action: 'checkedChange',
      description: '체크 상태 변경 콜백',
      table: {
        type: { summary: '(checked: boolean | "indeterminate") => void' },
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
type Story = StoryObj<CheckboxProps>;

// ============================================================================
// BASIC
// ============================================================================

/**
 * 기본 Checkbox
 *
 * 이 스토리에서 Checkbox의 모든 props를 테스트할 수 있습니다.
 * 클릭, Space, Enter 키로 체크 상태를 변경할 수 있습니다.
 */
export const Default: Story = {
  args: {
    disabled: false,
    label: '제목',
    description: '',
    checkboxPosition: 'left',
    checkboxStyle: 'default',
    size: 'sm',
    shape: 'square',
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const [checked, setChecked] = useState(false);
    const description = args.description || undefined;

    return (
      <Checkbox
        checked={checked}
        onCheckedChange={(checked) => setChecked(checked === true)}
        disabled={args.disabled}
        label={args.label}
        description={description}
        checkboxPosition={args.checkboxPosition}
        checkboxStyle={args.checkboxStyle}
        size={args.size}
        shape={args.shape}
      />
    );
  },
};

/**
 * 라벨 없는 체크박스
 */
export const WithoutLabel: Story = {
  args: {
    checked: false,
  },
};

/**
 * 라벨 있는 체크박스
 */
export const WithLabel: Story = {
  args: {
    checked: false,
    label: '이용약관에 동의합니다',
  },
};

/**
 * 라벨과 설명 텍스트
 */
export const WithDescription: Story = {
  args: {
    checked: false,
    label: '제목',
    description: '설명',
  },
};

/**
 * 모든 상태 (설명 포함)
 *
 * 일반 상태와 비활성화 상태의 체크박스를 모두 보여줍니다.
 */
export const AllStatesWithDescription: Story = {
  render: () => (
    <div className="flex flex-col ds-gap-24">
      <div className="flex ds-gap-24">
        <Checkbox checked={false} label="제목" description="설명" />
        <Checkbox checked={true} label="제목" description="설명" />
        <Checkbox checked="indeterminate" label="제목" description="설명" />
      </div>
      <div className="flex ds-gap-24">
        <Checkbox disabled checked={false} label="Title" description="Description" />
        <Checkbox disabled checked={true} label="Title" description="Description" />
        <Checkbox disabled checked="indeterminate" label="Title" description="Description" />
      </div>
    </div>
  ),
};

// ============================================================================
// STATES
// ============================================================================

/**
 * 체크 상태
 */
export const CheckedStates: Story = {
  render: () => (
    <div className="flex flex-col ds-gap-16">
      <Checkbox checked={false} label="미체크" />
      <Checkbox checked={true} label="체크됨" />
      <Checkbox checked="indeterminate" label="부분 선택" />
    </div>
  ),
};

/**
 * 비활성화 상태
 */
export const DisabledStates: Story = {
  render: () => (
    <div className="flex flex-col ds-gap-16">
      <Checkbox disabled checked={false} label="비활성 미체크" />
      <Checkbox disabled checked={true} label="비활성 체크됨" />
      <Checkbox disabled checked="indeterminate" label="비활성 부분 선택" />
    </div>
  ),
};

// ============================================================================
// STYLES
// ============================================================================

/**
 * 기본 스타일
 */
export const StyleDefault: Story = {
  render: () => (
    <div className="flex flex-col ds-gap-16">
      <Checkbox checked={false} checkboxStyle="default" label="기본 스타일 (미체크)" />
      <Checkbox checked={true} checkboxStyle="default" label="기본 스타일 (체크됨)" />
    </div>
  ),
};

/**
 * 그림자 스타일
 */
export const StyleWithShadow: Story = {
  render: () => (
    <div className="flex flex-col ds-gap-16">
      <Checkbox checked={false} checkboxStyle="with-shadow" label="그림자 스타일 (미체크)" />
      <Checkbox checked={true} checkboxStyle="with-shadow" label="그림자 스타일 (체크됨)" />
    </div>
  ),
};

// ============================================================================
// POSITIONS
// ============================================================================

/**
 * 체크박스 위치
 */
export const CheckboxPositions: Story = {
  render: () => (
    <div className="flex flex-col ds-gap-16">
      <Checkbox checked={false} checkboxPosition="left" label="왼쪽 체크박스" description="기본 위치" />
      <Checkbox checked={true} checkboxPosition="right" label="오른쪽 체크박스" description="대체 위치" />
    </div>
  ),
};

// ============================================================================
// INTERACTIVE
// ============================================================================

/**
 * 다중 선택
 */
export const MultipleSelection: Story = {
  render: function Render() {
    const [selected, setSelected] = useState<string[]>(['option1']);

    const handleChange = (value: string) => (checked: boolean | 'indeterminate') => {
      if (checked === true) {
        setSelected((prev) => [...prev, value]);
      } else {
        setSelected((prev) => prev.filter((v) => v !== value));
      }
    };

    return (
      <div className="flex flex-col ds-gap-12">
        <Checkbox
          checked={selected.includes('option1')}
          onCheckedChange={handleChange('option1')}
          label="옵션 1"
        />
        <Checkbox
          checked={selected.includes('option2')}
          onCheckedChange={handleChange('option2')}
          label="옵션 2"
        />
        <Checkbox
          checked={selected.includes('option3')}
          onCheckedChange={handleChange('option3')}
          label="옵션 3"
        />
        <p className="size-xs text-muted margin-t-32">선택됨: {selected.join(', ') || '없음'}</p>
      </div>
    );
  },
};

/**
 * 전체 선택
 */
export const SelectAll: Story = {
  render: function Render() {
    const [items, setItems] = useState([
      { id: '1', label: '항목 1', checked: true },
      { id: '2', label: '항목 2', checked: false },
      { id: '3', label: '항목 3', checked: true },
    ]);

    const allChecked = items.every((item) => item.checked);
    const someChecked = items.some((item) => item.checked);
    const parentState: boolean | 'indeterminate' = allChecked
      ? true
      : someChecked
        ? 'indeterminate'
        : false;

    const handleParentChange = (checked: boolean | 'indeterminate') => {
      const newChecked = checked === true;
      setItems((prev) => prev.map((item) => ({ ...item, checked: newChecked })));
    };

    const handleItemChange = (id: string) => (checked: boolean | 'indeterminate') => {
      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, checked: checked === true } : item
        )
      );
    };

    return (
      <div className="flex flex-col ds-gap-12">
        <Checkbox
          checked={parentState}
          onCheckedChange={handleParentChange}
          label="전체 선택"
        />
        <div className="flex flex-col ds-gap-8" style={{ marginLeft: '24px' }}>
          {items.map((item) => (
            <Checkbox
              key={item.id}
              checked={item.checked}
              onCheckedChange={handleItemChange(item.id)}
              label={item.label}
            />
          ))}
        </div>
      </div>
    );
  },
};
