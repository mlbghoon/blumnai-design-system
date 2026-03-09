import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

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
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

/**
 * 모든 변형 비교
 *
 * Checkbox, CheckboxCard, CheckboxList 3가지 변형을 한눈에 비교합니다.
 */
export const AllVariants: Story = {
  args: {
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
            label="제목"
            description="설명"
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
