import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { MonthPicker } from '../MonthPicker';
import { Button } from '../../button/Button';

const meta: Meta<typeof MonthPicker> = {
  title: 'DataEntry/MonthPicker',
  component: MonthPicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  argTypes: {
    value: {
      control: false,
      description: '선택된 월',
      table: {
        type: { summary: 'Date' },
      },
    },
    onChange: {
      action: 'changed',
      description: '월 변경 시 호출되는 콜백',
      table: {
        type: { summary: '(date: Date) => void' },
      },
    },
    minDate: {
      control: 'date',
      description: '선택 가능한 최소 날짜',
      table: {
        type: { summary: 'Date' },
      },
    },
    maxDate: {
      control: 'date',
      description: '선택 가능한 최대 날짜',
      table: {
        type: { summary: 'Date' },
      },
    },
    disabledFuture: {
      control: 'boolean',
      description: '미래 월 비활성화',
      table: {
        type: { summary: 'boolean' },
      },
    },
    locale: {
      control: 'select',
      options: ['ko', 'en'],
      description: '로케일',
      table: {
        type: { summary: 'string' },
      },
    },
    label: {
      control: 'text',
      description: '라벨 텍스트',
      table: {
        type: { summary: 'string' },
      },
    },
    error: {
      control: 'text',
      description: '에러 상태 또는 메시지',
      table: {
        type: { summary: 'boolean | string' },
      },
    },
    supportText: {
      control: 'text',
      description: '보조 텍스트',
      table: {
        type: { summary: 'string' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
      table: {
        type: { summary: 'boolean' },
      },
    },
    hideCalendarIcon: {
      control: 'boolean',
      description: '입력 필드 우측의 캘린더 아이콘 버튼을 숨깁니다. 기본 입력 모드에서는 아이콘이 캘린더를 여는 유일한 클릭 타깃이므로, 숨길 경우 pickerOnly / 제어 모드(open) / trigger 와 함께 사용하세요',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    showQuickPresets: {
      control: 'boolean',
      description: '빠른 선택 프리셋 표시 여부',
      table: {
        type: { summary: 'boolean' },
      },
    },
    presets: {
      control: false,
      description: '빠른 선택 프리셋 목록',
      table: {
        type: { summary: 'MonthPickerPreset[]' },
      },
    },
    showActions: {
      control: 'boolean',
      description: 'true일 때 적용/취소 버튼이 표시되며 `onChange`는 "적용" 클릭 시에만 발생 (commit-on-apply)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    open: {
      control: 'boolean',
      description: '제어 모드 팝오버 오픈 상태. `onOpenChange`와 함께 사용해야 합니다',
      table: { type: { summary: 'boolean' } },
    },
    onOpenChange: {
      action: 'openChange',
      description: '팝오버 오픈 상태 변경 콜백',
      table: { type: { summary: '(open: boolean) => void' } },
    },
    trigger: {
      control: false,
      description: '소비자가 제공하는 트리거 엘리먼트. 전달 시 DS는 자체 입력 필드 + InputWrapper를 렌더링하지 않습니다',
      table: { type: { summary: 'ReactElement' } },
    },
    defaultMonth: {
      control: false,
      description: '팝오버가 처음 열릴 때 포커스할 월. `value`가 있으면 `value`가 우선합니다',
      table: { type: { summary: 'Date' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MonthPicker>;

/**
 * 기본 MonthPicker
 *
 * 이 스토리에서 컴포넌트의 모든 props를 테스트할 수 있습니다.
 */
export const Default: Story = {
  args: {
    label: '월 선택',
    locale: 'ko',
    disabled: false,
    hideCalendarIcon: false,
    disabledFuture: false,
    showQuickPresets: false,
    showActions: false,
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const [value, setValue] = useState<Date | undefined>();
    return (
      <div style={{ width: 300 }}>
        <MonthPicker
          label={args.label}
          locale={args.locale}
          disabled={args.disabled}
          hideCalendarIcon={args.hideCalendarIcon}
          disabledFuture={args.disabledFuture}
          showQuickPresets={args.showQuickPresets}
          showActions={args.showActions}
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};

/**
 * 값이 설정된 상태
 */
export const WithValue: Story = {
  render: function Render() {
    const [value, setValue] = useState<Date | undefined>(new Date(2025, 2, 1));
    return (
      <div style={{ width: 300 }}>
        <MonthPicker
          label="월 선택"
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};

/**
 * 빠른 선택 프리셋
 */
export const WithQuickPresets: Story = {
  render: function Render() {
    const [value, setValue] = useState<Date | undefined>();
    return (
      <div style={{ width: 300 }}>
        <MonthPicker
          label="월 선택"
          value={value}
          onChange={setValue}
          showQuickPresets
        />
      </div>
    );
  },
};

/**
 * 미래 월 비활성화
 */
export const DisabledFuture: Story = {
  render: function Render() {
    const [value, setValue] = useState<Date | undefined>();
    return (
      <div style={{ width: 300 }}>
        <MonthPicker
          label="월 선택"
          value={value}
          onChange={setValue}
          disabledFuture
        />
      </div>
    );
  },
};

/**
 * 에러 상태
 */
export const WithError: Story = {
  render: function Render() {
    const [value, setValue] = useState<Date | undefined>();
    return (
      <div style={{ width: 300 }}>
        <MonthPicker
          label="월 선택"
          value={value}
          onChange={setValue}
          error="월을 선택해 주세요"
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
    <div style={{ width: 300 }}>
      <MonthPicker
        label="월 선택"
        disabled
      />
    </div>
  ),
};

/**
 * 영문 로케일
 */
export const EnglishLocale: Story = {
  render: function Render() {
    const [value, setValue] = useState<Date | undefined>();
    return (
      <div style={{ width: 300 }}>
        <MonthPicker
          label="Month"
          value={value}
          onChange={setValue}
          locale="en"
        />
      </div>
    );
  },
};

/**
 * Picker Only 모드
 *
 * 입력 필드에 직접 타이핑할 수 없고, 클릭 시 캘린더만 열립니다.
 */
export const PickerOnly: Story = {
  render: function Render() {
    const [value, setValue] = useState<Date | undefined>();
    return (
      <div style={{ width: 300 }}>
        <MonthPicker
          label="월 선택 (Picker Only)"
          value={value}
          onChange={setValue}
          pickerOnly
        />
      </div>
    );
  },
};

/**
 * 적용/취소 버튼 (commit-on-apply)
 *
 * `showActions={true}`일 때 `onChange`는 "적용" 클릭 시에만 발생합니다.
 * 취소 / 외부 클릭 / ESC로 닫으면 드래프트가 폐기되고 `onChange`는 발생하지 않습니다.
 *
 * **테스트 방법:**
 * 1. 월을 하나 클릭 (그리드에서 선택 스타일이 바뀌지만 아직 commit은 아님)
 * 2. "취소" 또는 외부 클릭 → 아래 "마지막 커밋 값"은 바뀌지 않아야 함
 * 3. 다시 열면 원래 커밋 값이 선택되어 있어야 함 (드래프트 초기화)
 * 4. 월을 클릭하고 "적용" 클릭 → 커밋 값이 갱신됨
 */
export const ShowActions: Story = {
  render: function Render() {
    const [value, setValue] = useState<Date | undefined>(new Date(2025, 2, 1));
    const [changeCount, setChangeCount] = useState(0);
    return (
      <div className="flex flex-col ds-gap-16" style={{ width: 320 }}>
        <MonthPicker
          label="월 선택 (commit-on-apply)"
          value={value}
          onChange={(d) => {
            setValue(d);
            setChangeCount((c) => c + 1);
          }}
          showActions
          showQuickPresets
        />
        <div className="font-body size-sm text-muted">
          마지막 커밋 값:{' '}
          <span className="text-default font-medium">
            {value ? `${value.getFullYear()}.${String(value.getMonth() + 1).padStart(2, '0')}` : '(없음)'}
          </span>
        </div>
        <div className="font-body size-sm text-muted">
          onChange 호출 횟수: <span className="text-default font-medium">{changeCount}</span>
        </div>
      </div>
    );
  },
};

/**
 * 외부 트리거 + 제어 오픈 상태
 *
 * 소비자가 자체 트리거(Button)를 제공하고 팝오버 오픈 상태를 외부에서 제어합니다.
 * `trigger` 제공 시 DS의 기본 입력 필드 + InputWrapper는 렌더링되지 않습니다.
 */
export const ExternalTrigger: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<Date | undefined>(new Date());
    const fmt = (d: Date | undefined) =>
      d ? `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}` : '월 선택';
    return (
      <div className="flex flex-col ds-gap-16" style={{ width: 280 }}>
        <MonthPicker
          open={open}
          onOpenChange={setOpen}
          value={value}
          onChange={setValue}
          trigger={<Button buttonStyle="secondary">{fmt(value)}</Button>}
        />
        <div className="font-body size-sm text-muted">
          오픈: <span className="text-default font-medium">{String(open)}</span>
        </div>
      </div>
    );
  },
};

/**
 * 외부 트리거 + commit-on-apply
 *
 * `trigger` + `showActions` 조합. "적용" 클릭 시에만 onChange가 발생합니다.
 */
export const ExternalTriggerWithActions: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<Date | undefined>(new Date());
    const [changeCount, setChangeCount] = useState(0);
    const fmt = (d: Date | undefined) =>
      d ? `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}` : '월 선택';
    return (
      <div className="flex flex-col ds-gap-16" style={{ width: 280 }}>
        <MonthPicker
          open={open}
          onOpenChange={setOpen}
          value={value}
          onChange={(d) => {
            setValue(d);
            setChangeCount((c) => c + 1);
          }}
          showActions
          trigger={<Button buttonStyle="secondary">{fmt(value)}</Button>}
        />
        <div className="font-body size-sm text-muted">
          onChange 호출 횟수: <span className="text-default font-medium">{changeCount}</span>
        </div>
      </div>
    );
  },
};

/**
 * defaultMonth — 초기 포커스 연도 제어
 *
 * `value`가 없을 때 팝오버가 처음 열릴 때 포커스할 월을 지정합니다 (연도만 반영).
 */
export const DefaultMonth: Story = {
  render: function Render() {
    const [value, setValue] = useState<Date | undefined>();
    return (
      <div style={{ width: 300 }}>
        <MonthPicker
          label="지난해 기준 열림"
          value={value}
          onChange={setValue}
          defaultMonth={new Date(new Date().getFullYear() - 1, 0, 1)}
        />
      </div>
    );
  },
};

/**
 * minDate/maxDate — typed input 경계 검증 (월 단위)
 *
 * 경계 밖 연/월을 직접 타이핑하면 error 상태로 표시되고 `onChange`가 호출되지 않습니다.
 * 포커스가 완전 이탈하면 이전 유효값으로 자동 복구됩니다.
 *
 * 경계는 월 단위로 정규화 — `maxDate`에 일 단위가 포함돼도 같은 월은 모두 in-bounds.
 *
 * 시나리오:
 * - 미래 월 타이핑 → error + onChange 호출 안 됨
 * - 12개월 이전 월 타이핑 → 동일
 * - 경계 월의 아무 일 → in-bounds
 */
export const MinMaxTypedInputValidation: Story = {
  render: function Render() {
    const today = new Date();
    const minDate = new Date(today.getFullYear(), today.getMonth() - 12, 1);
    const [value, setValue] = useState<Date | undefined>();
    return (
      <div style={{ width: 300 }}>
        <MonthPicker
          label="조회 월"
          supportText="최근 12개월 이내"
          minDate={minDate}
          maxDate={today}
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};

/**
 * 크기 비교
 *
 * sm / lg 사이즈를 비교합니다.
 */
export const AllSizes: Story = {
  render: function Render() {
    const [v1, setV1] = useState<Date | undefined>();
    const [v2, setV2] = useState<Date | undefined>();
    return (
      <div className="flex flex-col ds-gap-16" style={{ width: 300 }}>
        <MonthPicker label="sm (기본)" size="sm" value={v1} onChange={setV1} />
        <MonthPicker label="lg" size="lg" value={v2} onChange={setV2} />
      </div>
    );
  },
};
