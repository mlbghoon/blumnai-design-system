import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { TimePicker } from '../TimePicker';
import { TimeInput } from '../TimePicker';
import type { TimePickerProps, TimeValue } from '../time-picker.types';

const meta: Meta<TimePickerProps> = {
  title: 'DataEntry/TimePicker',
  component: TimePicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { disable: true },
  },
  argTypes: {
    timePickerStyle: {
      control: 'select',
      options: ['default', 'shadow', 'soft'],
      description: '시간 선택기의 시각적 스타일을 설정합니다. default(기본), shadow(그림자), soft(부드러운) 중 선택할 수 있습니다',
      table: {
        type: { summary: 'TimePickerStyle', detail: "'default' | 'shadow' | 'soft'" },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'lg'],
      description: '시간 선택기의 크기를 설정합니다. sm(작게), lg(크게) 중 선택할 수 있습니다',
      table: {
        type: { summary: 'TimePickerSize', detail: "'sm' | 'lg'" },
        defaultValue: { summary: 'sm' },
      },
    },
    timeFormat: {
      control: 'select',
      options: ['12h', '24h'],
      description: '시간 표시 형식을 설정합니다. 12h(12시간 AM/PM), 24h(24시간) 중 선택할 수 있습니다',
      table: {
        type: { summary: 'TimeFormat', detail: "'12h' | '24h'" },
        defaultValue: { summary: '24h' },
      },
    },
    showSeconds: {
      control: 'boolean',
      description: 'true로 설정하면 시, 분 외에 초 단위까지 선택할 수 있습니다',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    label: {
      control: 'text',
      description: '입력 필드 위에 표시되는 라벨 텍스트입니다',
      table: { type: { summary: 'string' } },
    },
    required: {
      control: 'boolean',
      description: 'true로 설정하면 라벨 옆에 필수 표시(*)가 나타납니다',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    supportText: {
      control: 'text',
      description: '라벨 오른쪽에 표시되는 보조 텍스트입니다. 선택 사항 안내 등에 사용합니다',
      table: { type: { summary: 'string' } },
    },
    caption: {
      control: 'text',
      description: '입력 필드 아래에 표시되는 설명 텍스트입니다. 사용 안내나 형식 정보를 제공합니다',
      table: { type: { summary: 'string' } },
    },
    error: {
      control: 'text',
      description: '에러 상태를 표시합니다. true는 에러 스타일만, 문자열은 에러 메시지를 함께 표시합니다',
      table: { type: { summary: 'boolean | string' } },
    },
    success: {
      control: 'text',
      description: '성공 상태를 표시합니다. true는 성공 스타일만, 문자열은 성공 메시지를 함께 표시합니다',
      table: { type: { summary: 'boolean | string' } },
    },
    disabled: {
      control: 'boolean',
      description: 'true로 설정하면 시간 선택기가 비활성화되어 클릭이나 입력을 할 수 없습니다',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    showQuickSelect: {
      control: 'boolean',
      description: 'true로 설정하면 자주 사용하는 시간을 빠르게 선택할 수 있는 옵션 목록이 표시됩니다',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: 'Popover 정렬',
      table: {
        type: { summary: 'PopoverAlign', detail: "'start' | 'center' | 'end'" },
        defaultValue: { summary: 'start' },
      },
    },
    width: {
      control: 'text',
      description: '입력 필드 컨테이너의 커스텀 너비 (숫자는 px, 문자열은 그대로 사용)',
      table: {
        type: { summary: 'string | number', detail: '예: 200, "100%", "20rem"' },
      },
    },
    quickSelectOptions: {
      control: false,
      description: '빠른 선택 옵션 목록 (showQuickSelect와 함께 사용)',
      table: {
        type: {
          summary: 'QuickSelectOption[]',
          detail: `{ label: string; value: TimeValue }[]`,
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<TimePickerProps>;

/**
 * 기본 시간 선택기
 *
 * Controls를 사용하여 다양한 옵션을 테스트할 수 있습니다.
 */
export const Default: Story = {
  args: {
    label: '시간',
    timePickerStyle: 'default',
    size: 'sm',
    timeFormat: '24h',
    showSeconds: false,
    showQuickSelect: false,
    width: 200,
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const [time, setTime] = useState<TimeValue | undefined>();
    return (
      <TimePicker
        label={args.label}
        timePickerStyle={args.timePickerStyle}
        size={args.size}
        timeFormat={args.timeFormat}
        showSeconds={args.showSeconds}
        showQuickSelect={args.showQuickSelect}
        required={args.required}
        supportText={args.supportText}
        caption={args.caption}
        error={args.error}
        success={args.success}
        disabled={args.disabled}
        align={args.align}
        width={args.width}
        value={time}
        onChange={setTime}
      />
    );
  },
};

/**
 * TimeInput 기본
 *
 * TimeInput은 TimePicker의 내부 입력 컴포넌트입니다.
 */
export const TimeInputDefault: Story = {
  render: function Render() {
    const [time, setTime] = useState<TimeValue | undefined>();
    return (
      <div style={{ width: 160 }}>
        <TimeInput
          value={time}
          onChange={setTime}
        />
      </div>
    );
  },
};

/**
 * 시간 포맷
 */
export const TimeFormats: Story = {
  render: function Render() {
    const [time24, setTime24] = useState<TimeValue | undefined>({ hour: 14, minute: 30 });
    const [time12, setTime12] = useState<TimeValue | undefined>({ hour: 14, minute: 30 });
    return (
      <div className="flex flex-col ds-gap-16" style={{ width: 200 }}>
        <TimePicker
          label="24시간 형식"
          timeFormat="24h"
          value={time24}
          onChange={setTime24}
        />
        <TimePicker
          label="12시간 형식"
          timeFormat="12h"
          value={time12}
          onChange={setTime12}
        />
      </div>
    );
  },
};

/**
 * 초 표시
 */
export const WithSeconds: Story = {
  render: function Render() {
    const [time, setTime] = useState<TimeValue | undefined>({ hour: 9, minute: 30, second: 45 });
    return (
      <div style={{ width: 220 }}>
        <TimePicker
          label="초 포함 시간"
          showSeconds
          value={time}
          onChange={setTime}
        />
      </div>
    );
  },
};

/**
 * 크기 변형
 */
export const Sizes: Story = {
  render: function Render() {
    const [timeSm, setTimeSm] = useState<TimeValue | undefined>();
    const [timeLg, setTimeLg] = useState<TimeValue | undefined>();
    return (
      <div className="flex flex-col ds-gap-16" style={{ width: 200 }}>
        <TimePicker
          label="작게 (sm)"
          size="sm"
          value={timeSm}
          onChange={setTimeSm}
        />
        <TimePicker
          label="크게 (lg)"
          size="lg"
          value={timeLg}
          onChange={setTimeLg}
        />
      </div>
    );
  },
};

/**
 * 스타일 변형
 */
export const Styles: Story = {
  render: function Render() {
    const [time1, setTime1] = useState<TimeValue | undefined>();
    const [time2, setTime2] = useState<TimeValue | undefined>();
    const [time3, setTime3] = useState<TimeValue | undefined>();
    return (
      <div className="flex flex-col ds-gap-16" style={{ width: 200 }}>
        <TimePicker
          label="Default"
          timePickerStyle="default"
          value={time1}
          onChange={setTime1}
        />
        <TimePicker
          label="Shadow"
          timePickerStyle="shadow"
          value={time2}
          onChange={setTime2}
        />
        <TimePicker
          label="Soft"
          timePickerStyle="soft"
          value={time3}
          onChange={setTime3}
        />
      </div>
    );
  },
};

/**
 * 라벨과 캡션
 */
export const WithLabelAndCaption: Story = {
  render: function Render() {
    const [time, setTime] = useState<TimeValue | undefined>();
    return (
      <div style={{ width: 200 }}>
        <TimePicker
          label="회의 시간"
          required
          supportText="필수"
          caption="회의 시간을 선택해주세요"
          value={time}
          onChange={setTime}
        />
      </div>
    );
  },
};

/**
 * 빠른 선택
 */
export const WithQuickSelect: Story = {
  render: function Render() {
    const [time, setTime] = useState<TimeValue | undefined>();
    return (
      <div style={{ width: 200 }}>
        <TimePicker
          label="시간 선택"
          showQuickSelect
          value={time}
          onChange={setTime}
        />
      </div>
    );
  },
};

/**
 * 커스텀 빠른 선택 옵션
 */
export const CustomQuickSelect: Story = {
  render: function Render() {
    const [time, setTime] = useState<TimeValue | undefined>();
    const customOptions = [
      { label: '아침 8시', value: { hour: 8, minute: 0 } },
      { label: '점심 12시', value: { hour: 12, minute: 0 } },
      { label: '오후 3시', value: { hour: 15, minute: 0 } },
      { label: '저녁 6시', value: { hour: 18, minute: 0 } },
    ];
    return (
      <div style={{ width: 200 }}>
        <TimePicker
          label="업무 시간"
          showQuickSelect
          quickSelectOptions={customOptions}
          value={time}
          onChange={setTime}
        />
      </div>
    );
  },
};

/**
 * 비활성화 상태
 */
export const Disabled: Story = {
  render: function Render() {
    return (
      <div style={{ width: 200 }}>
        <TimePicker
          label="시간"
          disabled
          value={{ hour: 9, minute: 30 }}
        />
      </div>
    );
  },
};

/**
 * 에러 상태
 */
export const ErrorState: Story = {
  render: function Render() {
    const [time, setTime] = useState<TimeValue | undefined>();
    return (
      <div style={{ width: 200 }}>
        <TimePicker
          label="시간"
          error="시간을 선택해주세요"
          value={time}
          onChange={setTime}
        />
      </div>
    );
  },
};

/**
 * 성공 상태
 */
export const SuccessState: Story = {
  render: function Render() {
    return (
      <div style={{ width: 200 }}>
        <TimePicker
          label="시간"
          success="시간이 선택되었습니다"
          value={{ hour: 14, minute: 0 }}
        />
      </div>
    );
  },
};

/**
 * 12시간 포맷 (초 포함)
 */
export const TwelveHourWithSeconds: Story = {
  render: function Render() {
    const [time, setTime] = useState<TimeValue | undefined>({ hour: 14, minute: 30, second: 15 });
    return (
      <div style={{ width: 240 }}>
        <TimePicker
          label="시간 (12시간 + 초)"
          timeFormat="12h"
          showSeconds
          value={time}
          onChange={setTime}
        />
      </div>
    );
  },
};

/**
 * 제어 컴포넌트
 */
export const Controlled: Story = {
  render: function Render() {
    const [time, setTime] = useState<TimeValue | undefined>({ hour: 9, minute: 0 });

    const formatTime = (t: TimeValue | undefined) => {
      if (!t) return '없음';
      const h = String(t.hour).padStart(2, '0');
      const m = String(t.minute).padStart(2, '0');
      const s = t.second !== undefined ? `:${String(t.second).padStart(2, '0')}` : '';
      return `${h}:${m}${s}`;
    };

    return (
      <div className="flex flex-col ds-gap-16" style={{ width: 200 }}>
        <TimePicker
          label="제어 시간"
          value={time}
          onChange={setTime}
        />
        <div className="font-body size-sm text-muted">
          선택된 시간: {formatTime(time)}
        </div>
        <button
          type="button"
          onClick={() => {
            const now = new Date();
            setTime({ hour: now.getHours(), minute: now.getMinutes() });
          }}
          className="padding-x-12 padding-y-6 bg-primary text-primary-foreground rounded-md size-sm"
        >
          현재 시간으로 설정
        </button>
      </div>
    );
  },
};
