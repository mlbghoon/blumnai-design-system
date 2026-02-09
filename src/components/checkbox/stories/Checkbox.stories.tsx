import type { Meta, StoryObj } from '@storybook/react';
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
      { id: '1', title: 'Option 1', description: 'Description for option 1', checked: true },
      { id: '2', title: 'Option 2', description: 'Description for option 2', checked: false },
      { id: '3', title: 'Option 3', checked: false },
    ]);

    const handleListItemChange = (id: string, checked: boolean) => {
      setListItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, checked } : item))
      );
    };

    return (
      <div className="flex flex-col gap-32 max-w-md">
        <div>
          <h3 className="size-sm font-medium text-default mb-12">Checkbox</h3>
          <Checkbox
            checked={basicChecked}
            onCheckedChange={(checked) => setBasicChecked(checked === true)}
            label="Title"
            description="Description"
            checkboxStyle={args.checkboxStyle}
            disabled={args.disabled}
          />
        </div>

        <div>
          <h3 className="size-sm font-medium text-default mb-12">CheckboxCard</h3>
          <CheckboxCard
            title="Card Title"
            description="This is a checkbox card with title and description."
            checked={cardChecked}
            onCheckedChange={setCardChecked}
            checkboxStyle={args.checkboxStyle}
            disabled={args.disabled}
          />
        </div>

        <div>
          <h3 className="size-sm font-medium text-default mb-12">CheckboxList</h3>
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
