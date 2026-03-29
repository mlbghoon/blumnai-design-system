import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';

import { Checkbox } from '../Checkbox';
import { CheckboxCard } from '../CheckboxCard';
import { CheckboxList } from '../CheckboxList';
import type { CheckboxListItem } from '../CheckboxList.types';

const meta: Meta<typeof Checkbox> = {
  title: 'DataEntry/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
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
          detail: `false: 체크 안됨\ntrue: 체크됨\n'indeterminate': 부분 선택`,
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
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: '체크박스 크기',
      table: {
        type: {
          summary: 'CheckboxSize',
          detail: `'sm' | 'md' | 'lg'`,
        },
        defaultValue: { summary: "'md'" },
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
        defaultValue: { summary: "'square'" },
      },
    },
    checkboxPosition: {
      control: 'select',
      options: ['left', 'right', 'off'],
      description: '체크박스 위치 (라벨 기준)',
      table: {
        type: {
          summary: 'CheckboxPosition',
          detail: `'left' | 'right' | 'off'`,
        },
        defaultValue: { summary: "'left'" },
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
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

/**
 * 기본 Checkbox
 *
 * 이 스토리에서 컴포넌트의 모든 props를 테스트할 수 있습니다.
 */
export const Default: Story = {
  args: {
    checked: false,
    label: 'Label',
    description: '',
    size: 'sm',
    shape: 'square',
    checkboxPosition: 'left',
    checkboxStyle: 'default',
    disabled: false,
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const [checked, setChecked] = useState<boolean | 'indeterminate'>(args.checked ?? false);
    const description = args.description || undefined;

    React.useEffect(() => {
      setChecked(args.checked ?? false);
    }, [args.checked]);

    return (
      <Checkbox
        checked={checked}
        onCheckedChange={setChecked}
        label={args.label}
        description={description}
        size={args.size}
        shape={args.shape}
        checkboxPosition={args.checkboxPosition}
        checkboxStyle={args.checkboxStyle}
        disabled={args.disabled}
      />
    );
  },
};

/**
 * 모든 변형 비교
 *
 * Checkbox, CheckboxCard, CheckboxList 3가지 변형을 한눈에 비교합니다.
 */
export const AllVariants: Story = {
  args: {
    checked: false,
    label: 'Label',
    description: '',
    checkboxPosition: 'left',
    checkboxStyle: 'default',
    disabled: false,
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const [basicChecked, setBasicChecked] = useState(false);
    const [cardChecked, setCardChecked] = useState(false);
    const [listItems, setListItems] = useState<CheckboxListItem[]>([
      { id: '1', title: '옵션 1', description: '옵션 1에 대한 설명', checked: true },
      { id: '2', title: '옵션 2', description: '옵션 2에 대한 설명', checked: false },
      { id: '3', title: '옵션 3', checked: false },
    ]);

    const handleListItemChange = (id: string, checked: boolean) => {
      setListItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, checked } : item))
      );
    };

    return (
      <div className="flex flex-col ds-gap-32 max-w-md">
        <div>
          <h3 className="size-sm font-medium text-default [margin-bottom:48px]">Checkbox</h3>
          <Checkbox
            checked={basicChecked}
            onCheckedChange={(checked) => setBasicChecked(checked === true)}
            label={args.label}
            description={args.description || undefined}
            checkboxPosition={args.checkboxPosition}
            checkboxStyle={args.checkboxStyle}
            disabled={args.disabled}
          />
        </div>

        <div>
          <h3 className="size-sm font-medium text-default [margin-bottom:48px]">CheckboxCard</h3>
          <CheckboxCard
            title="카드 제목"
            description="제목과 설명이 있는 체크박스 카드입니다."
            checked={cardChecked}
            onCheckedChange={setCardChecked}
            checkboxStyle={args.checkboxStyle}
            disabled={args.disabled}
          />
        </div>

        <div>
          <h3 className="size-sm font-medium text-default [margin-bottom:48px]">CheckboxList</h3>
          <CheckboxList
            items={listItems.map((item) => ({
              ...item,
              disabled: args.disabled,
            }))}
            onItemChange={handleListItemChange}
            checkboxStyle={args.checkboxStyle}
          />
        </div>
      </div>
    );
  },
};
