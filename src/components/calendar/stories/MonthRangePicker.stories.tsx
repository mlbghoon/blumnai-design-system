import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { MonthRangePicker } from '../MonthRangePicker';
import type { MonthRange } from '../MonthRangePicker';
import { Button } from '../../button/Button';

const meta: Meta<typeof MonthRangePicker> = {
  title: 'DataEntry/MonthRangePicker',
  component: MonthRangePicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  argTypes: {
    value: {
      control: false,
      description: '선택된 월 범위',
      table: {
        type: { summary: 'MonthRange' },
      },
    },
    onChange: {
      action: 'changed',
      description: '월 범위 변경 시 호출되는 콜백',
      table: {
        type: { summary: '(range: MonthRange) => void' },
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
        type: { summary: 'MonthRangePreset[]' },
      },
    },
    showActions: {
      control: 'boolean',
      description: 'true일 때 적용/취소 버튼이 표시되며 `onChange`는 "적용" 클릭 시에만 발생 (commit-on-apply). 중간 선택(from만 고른 상태) 후 취소하면 선택 상태도 초기화됨',
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
      description: '팝오버가 처음 열릴 때 포커스할 월. `value.from`이 있으면 그것이 우선합니다',
      table: { type: { summary: 'Date' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MonthRangePicker>;

/**
 * 기본 MonthRangePicker
 *
 * 이 스토리에서 컴포넌트의 모든 props를 테스트할 수 있습니다.
 */
export const Default: Story = {
  args: {
    label: '기간 선택',
    locale: 'ko',
    disabled: false,
    disabledFuture: false,
    showQuickPresets: false,
    showActions: false,
    presets: [],
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const [value, setValue] = useState<MonthRange>({});
    return (
      <div style={{ width: 300 }}>
        <MonthRangePicker
          label={args.label}
          locale={args.locale}
          disabled={args.disabled}
          disabledFuture={args.disabledFuture}
          showQuickPresets={args.showQuickPresets}
          showActions={args.showActions}
          presets={args.presets}
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
    const [value, setValue] = useState<MonthRange>({
      from: new Date(2025, 0, 1),
      to: new Date(2025, 5, 1),
    });
    return (
      <div style={{ width: 300 }}>
        <MonthRangePicker
          label="기간 선택"
          value={value}
          onChange={setValue}
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
    const [value, setValue] = useState<MonthRange>({});
    return (
      <div style={{ width: 300 }}>
        <MonthRangePicker
          label="기간 선택"
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
    const [value, setValue] = useState<MonthRange>({});
    return (
      <div style={{ width: 300 }}>
        <MonthRangePicker
          label="기간 선택"
          value={value}
          onChange={setValue}
          error="기간을 선택해 주세요"
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
      <MonthRangePicker
        label="기간 선택"
        disabled
      />
    </div>
  ),
};

/**
 * 빠른 선택 프리셋
 */
export const WithQuickPresets: Story = {
  render: function Render() {
    const [value, setValue] = useState<MonthRange>({});
    return (
      <div style={{ width: 300 }}>
        <MonthRangePicker
          label="기간 선택"
          value={value}
          onChange={setValue}
          showQuickPresets
        />
      </div>
    );
  },
};

/**
 * 영문 로케일
 */
export const EnglishLocale: Story = {
  render: function Render() {
    const [value, setValue] = useState<MonthRange>({});
    return (
      <div style={{ width: 300 }}>
        <MonthRangePicker
          label="Period"
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
    const [value, setValue] = useState<MonthRange>({});
    return (
      <div style={{ width: 300 }}>
        <MonthRangePicker
          label="기간 선택 (Picker Only)"
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
 *
 * **테스트 시나리오:**
 * 1. **정상 커밋**: 시작월 → 종료월 선택 후 "적용" → 커밋 값 갱신, onChange 1회
 * 2. **Cancel-discards**: 범위 선택 후 "취소" → 커밋 값 유지, onChange 발생 안 함
 * 3. **Mid-selection cancel**: 시작월만 클릭한 상태에서 "취소" → 드래프트 폐기, 다시 열면 `selecting='from'`으로 초기화
 * 4. **외부 클릭**: 선택 도중 팝오버 바깥 클릭 → 취소와 동일하게 폐기
 */
export const ShowActions: Story = {
  render: function Render() {
    const [value, setValue] = useState<MonthRange>({
      from: new Date(2025, 0, 1),
      to: new Date(2025, 5, 1),
    });
    const [changeCount, setChangeCount] = useState(0);

    const formatMonth = (d: Date | undefined) =>
      d ? `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}` : '—';

    return (
      <div className="flex flex-col ds-gap-16" style={{ width: 360 }}>
        <MonthRangePicker
          label="기간 선택 (commit-on-apply)"
          value={value}
          onChange={(r) => {
            setValue(r);
            setChangeCount((c) => c + 1);
          }}
          showActions
          showQuickPresets
        />
        <div className="font-body size-sm text-muted">
          마지막 커밋 범위:{' '}
          <span className="text-default font-medium">
            {formatMonth(value.from)} ~ {formatMonth(value.to)}
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
 * 소비자 Button으로 열고 팝오버 오픈 상태를 외부에서 제어합니다.
 */
export const ExternalTrigger: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);
    const [range, setRange] = useState<MonthRange>({
      from: new Date(2025, 0, 1),
      to: new Date(2025, 5, 1),
    });
    const fmt = (d: Date | undefined) =>
      d ? `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}` : '—';
    return (
      <div className="flex flex-col ds-gap-16" style={{ width: 360 }}>
        <MonthRangePicker
          open={open}
          onOpenChange={setOpen}
          value={range}
          onChange={setRange}
          trigger={
            <Button buttonStyle="secondary">
              {fmt(range.from)} ~ {fmt(range.to)}
            </Button>
          }
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
    const [range, setRange] = useState<MonthRange>({
      from: new Date(2025, 0, 1),
      to: new Date(2025, 5, 1),
    });
    const [changeCount, setChangeCount] = useState(0);
    const fmt = (d: Date | undefined) =>
      d ? `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}` : '—';
    return (
      <div className="flex flex-col ds-gap-16" style={{ width: 360 }}>
        <MonthRangePicker
          open={open}
          onOpenChange={setOpen}
          value={range}
          onChange={(r) => {
            setRange(r);
            setChangeCount((c) => c + 1);
          }}
          showActions
          trigger={
            <Button buttonStyle="secondary">
              {fmt(range.from)} ~ {fmt(range.to)}
            </Button>
          }
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
 * `value.from`이 없을 때 팝오버가 처음 열릴 때 포커스할 연도를 지정합니다.
 */
export const DefaultMonth: Story = {
  render: function Render() {
    const [value, setValue] = useState<MonthRange>({});
    return (
      <div style={{ width: 300 }}>
        <MonthRangePicker
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
 * minDate/maxDate — typed input 경계 검증 (월 단위, 각 side 독립 판정)
 *
 * from/to 각각에 대해 경계 밖 연/월을 타이핑하면 error 상태로 표시되고 `onChange`가 호출되지 않습니다.
 * 포커스 완전 이탈 시 양 side 모두 이전 유효값으로 복구됩니다.
 *
 * 시나리오:
 * - to 에 미래 월 타이핑 → error + onChange 호출 안 됨
 * - from 에 12개월 이전 월 → error
 * - 경계 내 범위 → 정상 통과 (from > to 이면 자동 swap)
 */
export const MinMaxTypedInputValidation: Story = {
  render: function Render() {
    const today = new Date();
    const minDate = new Date(today.getFullYear(), today.getMonth() - 12, 1);
    const [value, setValue] = useState<MonthRange>({});
    return (
      <div style={{ width: 380 }}>
        <MonthRangePicker
          label="조회 기간"
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
