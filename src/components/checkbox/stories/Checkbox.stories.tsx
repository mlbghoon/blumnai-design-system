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

/**
 * 에러 상태
 *
 * error 문자열을 전달하면 에러 메시지가 하단에 표시되고 체크박스 테두리가 빨간색으로 변합니다.
 */
export const WithError: Story = {
  render: function Render() {
    const [checked, setChecked] = useState(false);
    return (
      <div className="flex flex-col ds-gap-24">
        <Checkbox
          checked={checked}
          onCheckedChange={(c) => setChecked(c === true)}
          label="이용약관 동의"
          error="필수 항목입니다"
        />
        <Checkbox
          checked={checked}
          onCheckedChange={(c) => setChecked(c === true)}
          label="이용약관 동의"
          description="서비스 이용을 위해 반드시 동의해야 합니다"
          error="필수 항목입니다"
          required
        />
      </div>
    );
  },
};

/**
 * 성공 상태
 *
 * success 문자열을 전달하면 성공 메시지가 하단에 표시되고 체크박스 테두리가 초록색으로 변합니다.
 */
export const WithSuccess: Story = {
  render: function Render() {
    return (
      <Checkbox
        checked
        label="이메일 수신 동의"
        success="설정이 저장되었습니다"
      />
    );
  },
};

/**
 * 캡션 텍스트
 *
 * caption을 전달하면 기본 스타일의 도움말 텍스트가 하단에 표시됩니다.
 */
export const WithCaption: Story = {
  render: function Render() {
    return (
      <Checkbox
        label="마케팅 정보 수신"
        caption="이메일, SMS 등으로 마케팅 정보를 받습니다"
      />
    );
  },
};

/**
 * 필수 표시
 *
 * required를 전달하면 라벨 옆에 빨간 별표가 표시됩니다.
 */
export const Required: Story = {
  render: function Render() {
    return (
      <div className="flex flex-col ds-gap-24">
        <Checkbox label="필수 동의 항목" required />
        <Checkbox label="선택 동의 항목" />
      </div>
    );
  },
};

/**
 * 에러 boolean (테두리만)
 *
 * error={true}만 전달하면 에러 메시지 없이 테두리 색상만 변합니다.
 * caption이 함께 있으면 caption이 에러 스타일로 표시됩니다.
 */
export const ErrorBooleanOnly: Story = {
  render: function Render() {
    return (
      <div className="flex flex-col ds-gap-24">
        <Checkbox label="에러 테두리만" error />
        <Checkbox label="에러 + 캡션" error caption="이 항목을 확인해 주세요" />
      </div>
    );
  },
};
