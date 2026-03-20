import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { TimeRangePicker } from '../TimeRangePicker';
import { TimeRangeInput } from '../TimeRangePicker';
import type { TimeRangePickerProps, TimeRange, TimeValue } from '../time-picker.types';

const meta: Meta<TimeRangePickerProps> = {
  title: 'DataEntry/TimeRangePicker',
  component: TimeRangePicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { disable: true },
  },
  argTypes: {
    timePickerStyle: {
      control: 'select',
      options: ['default', 'shadow', 'soft'],
      description: '시간 범위 선택기 스타일',
      table: {
        type: { summary: 'TimePickerStyle', detail: "'default' | 'shadow' | 'soft'" },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'lg'],
      description: '시간 범위 선택기 크기',
      table: {
        type: { summary: 'TimePickerSize', detail: "'sm' | 'lg'" },
        defaultValue: { summary: 'sm' },
      },
    },
    timeFormat: {
      control: 'select',
      options: ['12h', '24h'],
      description: '시간 포맷',
      table: {
        type: { summary: 'TimeFormat', detail: "'12h' | '24h'" },
        defaultValue: { summary: '24h' },
      },
    },
    showSeconds: {
      control: 'boolean',
      description: '초 표시 여부',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    label: {
      control: 'text',
      description: '라벨 텍스트',
      table: { type: { summary: 'string' } },
    },
    labelPosition: {
      control: 'select',
      options: ['top', 'left'],
      description: '라벨 위치 (top: 상단, left: 좌측 인라인)',
      table: {
        type: {
          summary: 'LabelPosition',
          detail: `'top' | 'left'`,
        },
        defaultValue: { summary: 'top' },
      },
    },
    labelWidth: {
      control: 'text',
      description: '라벨 너비 (labelPosition="left"일 때 사용, 여러 필드 정렬용)',
      table: {
        type: { summary: 'string | number', detail: '예: 100, "120px", "8rem"' },
      },
    },
    required: {
      control: 'boolean',
      description: '필수 입력 여부',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    supportText: {
      control: 'text',
      description: '라벨 옆 보조 텍스트',
      table: { type: { summary: 'string' } },
    },
    caption: {
      control: 'text',
      description: '입력 필드 아래 설명 텍스트',
      table: { type: { summary: 'string' } },
    },
    error: {
      control: 'text',
      description: '에러 상태 또는 에러 메시지',
      table: { type: { summary: 'boolean | string' } },
    },
    success: {
      control: 'text',
      description: '성공 상태 또는 성공 메시지',
      table: { type: { summary: 'boolean | string' } },
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    showQuickSelect: {
      control: 'boolean',
      description: '빠른 선택 표시 여부',
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
        type: { summary: 'string | number', detail: '예: 300, "100%", "20rem"' },
      },
    },
    quickSelectOptions: {
      control: false,
      description: '빠른 범위 선택 옵션 목록 (showQuickSelect와 함께 사용)',
      table: {
        type: {
          summary: 'QuickRangeSelectOption[]',
          detail: `{ label: string; value: TimeRange }[]`,
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<TimeRangePickerProps>;

/**
 * 기본 시간 범위 선택기
 *
 * Controls를 사용하여 다양한 옵션을 테스트할 수 있습니다.
 */
export const Default: Story = {
  args: {
    label: '시간 범위',
    labelPosition: 'top',
    labelWidth: undefined,
    timePickerStyle: 'default',
    size: 'sm',
    timeFormat: '24h',
    showSeconds: false,
    showQuickSelect: false,
    width: 320,
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const [range, setRange] = useState<TimeRange | undefined>();
    return (
      <TimeRangePicker
        label={args.label}
        labelPosition={args.labelPosition}
        labelWidth={args.labelWidth}
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
        value={range}
        onChange={setRange}
      />
    );
  },
};

/**
 * TimeRangeInput 기본
 *
 * TimeRangeInput은 TimeRangePicker의 내부 입력 컴포넌트입니다.
 */
export const TimeRangeInputDefault: Story = {
  render: function Render() {
    const [range, setRange] = useState<TimeRange | undefined>();
    return (
      <div style={{ width: 280 }}>
        <TimeRangeInput
          value={range}
          onChange={setRange}
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
    const [range24, setRange24] = useState<TimeRange | undefined>({
      start: { hour: 9, minute: 0 },
      end: { hour: 17, minute: 0 },
    });
    const [range12, setRange12] = useState<TimeRange | undefined>({
      start: { hour: 9, minute: 0 },
      end: { hour: 17, minute: 0 },
    });
    return (
      <div className="flex flex-col ds-gap-16" style={{ width: 380 }}>
        <TimeRangePicker
          label="24시간 형식"
          timeFormat="24h"
          value={range24}
          onChange={setRange24}
        />
        <TimeRangePicker
          label="12시간 형식"
          timeFormat="12h"
          value={range12}
          onChange={setRange12}
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
    const [range, setRange] = useState<TimeRange | undefined>({
      start: { hour: 9, minute: 30, second: 0 },
      end: { hour: 17, minute: 30, second: 0 },
    });
    return (
      <div style={{ width: 380 }}>
        <TimeRangePicker
          label="시간 범위 (초 포함)"
          showSeconds
          value={range}
          onChange={setRange}
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
    const [rangeSm, setRangeSm] = useState<TimeRange | undefined>();
    const [rangeLg, setRangeLg] = useState<TimeRange | undefined>();
    return (
      <div className="flex flex-col ds-gap-16" style={{ width: 320 }}>
        <TimeRangePicker
          label="소형 (sm)"
          size="sm"
          value={rangeSm}
          onChange={setRangeSm}
        />
        <TimeRangePicker
          label="대형 (lg)"
          size="lg"
          value={rangeLg}
          onChange={setRangeLg}
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
    const [range1, setRange1] = useState<TimeRange | undefined>();
    const [range2, setRange2] = useState<TimeRange | undefined>();
    const [range3, setRange3] = useState<TimeRange | undefined>();
    return (
      <div className="flex flex-col ds-gap-16" style={{ width: 320 }}>
        <TimeRangePicker
          label="기본"
          timePickerStyle="default"
          value={range1}
          onChange={setRange1}
        />
        <TimeRangePicker
          label="그림자"
          timePickerStyle="shadow"
          value={range2}
          onChange={setRange2}
        />
        <TimeRangePicker
          label="소프트"
          timePickerStyle="soft"
          value={range3}
          onChange={setRange3}
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
    const [range, setRange] = useState<TimeRange | undefined>();
    return (
      <div style={{ width: 320 }}>
        <TimeRangePicker
          label="근무 시간"
          required
          supportText="필수"
          caption="근무 시간을 선택하세요"
          value={range}
          onChange={setRange}
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
    const [range, setRange] = useState<TimeRange | undefined>();
    return (
      <div style={{ width: 320 }}>
        <TimeRangePicker
          label="시간 범위 선택"
          showQuickSelect
          value={range}
          onChange={setRange}
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
    const [range, setRange] = useState<TimeRange | undefined>();
    const customOptions = [
      {
        label: '오전 근무',
        value: { start: { hour: 9, minute: 0 }, end: { hour: 13, minute: 0 } },
      },
      {
        label: '오후 근무',
        value: { start: { hour: 14, minute: 0 }, end: { hour: 18, minute: 0 } },
      },
      {
        label: '야간 근무',
        value: { start: { hour: 22, minute: 0 }, end: { hour: 6, minute: 0 } },
      },
      {
        label: '점심시간',
        value: { start: { hour: 12, minute: 0 }, end: { hour: 13, minute: 0 } },
      },
    ];
    return (
      <div style={{ width: 320 }}>
        <TimeRangePicker
          label="근무 시간"
          showQuickSelect
          quickSelectOptions={customOptions}
          value={range}
          onChange={setRange}
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
      <div style={{ width: 320 }}>
        <TimeRangePicker
          label="시간 범위"
          disabled
          value={{
            start: { hour: 9, minute: 0 },
            end: { hour: 17, minute: 0 },
          }}
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
    const [range, setRange] = useState<TimeRange | undefined>();
    return (
      <div style={{ width: 320 }}>
        <TimeRangePicker
          label="시간 범위"
          error="시간 범위를 선택해주세요"
          value={range}
          onChange={setRange}
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
      <div style={{ width: 320 }}>
        <TimeRangePicker
          label="시간 범위"
          success="시간 범위가 선택되었습니다"
          value={{
            start: { hour: 9, minute: 0 },
            end: { hour: 17, minute: 0 },
          }}
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
    const [range, setRange] = useState<TimeRange | undefined>({
      start: { hour: 9, minute: 30, second: 0 },
      end: { hour: 17, minute: 30, second: 0 },
    });
    return (
      <div style={{ width: 480 }}>
        <TimeRangePicker
          label="시간 범위 (12시간 + 초)"
          timeFormat="12h"
          showSeconds
          value={range}
          onChange={setRange}
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
    const [range, setRange] = useState<TimeRange | undefined>({
      start: { hour: 9, minute: 0 },
      end: { hour: 17, minute: 0 },
    });

    const formatTime = (t: TimeValue | undefined) => {
      if (!t) return '--:--';
      const h = String(t.hour).padStart(2, '0');
      const m = String(t.minute).padStart(2, '0');
      return `${h}:${m}`;
    };

    const formatRange = (r: TimeRange | undefined) => {
      if (!r) return '없음';
      return `${formatTime(r.start)} - ${formatTime(r.end)}`;
    };

    return (
      <div className="flex flex-col ds-gap-16" style={{ width: 320 }}>
        <TimeRangePicker
          label="제어 시간 범위"
          value={range}
          onChange={setRange}
        />
        <div className="font-body size-sm text-muted">
          선택된 범위: {formatRange(range)}
        </div>
        <button
          type="button"
          onClick={() => {
            setRange({
              start: { hour: 9, minute: 0 },
              end: { hour: 18, minute: 0 },
            });
          }}
          className="padding-x-12 padding-y-6 bg-primary text-primary-foreground rounded-md size-sm"
        >
          업무 시간으로 설정
        </button>
      </div>
    );
  },
};
