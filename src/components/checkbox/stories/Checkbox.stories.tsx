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
      description: '체크박스의 현재 상태입니다. false(체크 안됨), true(체크됨), indeterminate(부분 선택) 중 하나를 설정할 수 있습니다',
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
      description: 'true로 설정하면 체크박스가 비활성화되어 클릭이나 키보드 입력을 할 수 없습니다',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    label: {
      control: 'text',
      description: '체크박스 옆에 표시되는 제목 텍스트입니다. 문자열 또는 ReactNode를 전달할 수 있습니다',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    description: {
      control: 'text',
      description: '라벨 아래에 표시되는 부가 설명 텍스트입니다. 옵션에 대한 추가 정보를 제공할 때 사용합니다',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    checkboxPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: '라벨을 기준으로 체크박스의 위치를 설정합니다. left(왼쪽), right(오른쪽) 중 선택할 수 있습니다',
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
      description: '체크박스의 외관 스타일을 설정합니다. default(기본), with-shadow(그림자 효과) 중 선택할 수 있습니다',
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
            description="제목과 설명이 포함된 체크박스 카드입니다."
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
