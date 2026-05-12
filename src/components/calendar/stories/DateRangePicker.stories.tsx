import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { addDays, addMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, subMonths } from 'date-fns';
import { ko, enUS, ja, zhCN } from 'date-fns/locale';
import type { Locale } from 'date-fns';
import type { DateRange } from 'react-day-picker';

import { DateRangePicker } from '../DatePicker';
import type { DateRangePickerProps, QuickPreset } from '../DatePicker.types';
import { Button } from '../../button/Button';

const LOCALE_MAP: Record<string, Locale> = {
  ko: ko,
  en: enUS,
  ja: ja,
  zh: zhCN,
};

type StoryProps = Omit<DateRangePickerProps, 'locale'> & { locale: string };

const meta: Meta<StoryProps> = {
  title: 'DataEntry/DateRangePicker',
  component: DateRangePicker as unknown as React.ComponentType<StoryProps>,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { disable: true },
  },
  argTypes: {
    datePickerStyle: {
      control: 'select',
      options: ['default', 'shadow', 'soft'],
      description: '날짜 선택기 스타일',
      table: {
        type: { summary: 'DatePickerStyle', detail: "'default' | 'shadow' | 'soft'" },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'lg'],
      description: '날짜 선택기 크기',
      table: {
        type: { summary: 'DatePickerSize', detail: "'sm' | 'lg'" },
        defaultValue: { summary: 'sm' },
      },
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
    hideCalendarIcon: {
      control: 'boolean',
      description: '입력 필드 우측의 캘린더 아이콘 버튼을 숨깁니다. 기본 입력 모드에서는 아이콘이 캘린더를 여는 유일한 클릭 타깃이므로, 숨길 경우 pickerOnly / 제어 모드(open) / trigger 와 함께 사용하세요',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    showQuickPresets: {
      control: 'boolean',
      description: '빠른 프리셋 표시 여부',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    numberOfMonths: {
      control: 'number',
      description: '표시할 월 개수',
      table: { type: { summary: 'number' }, defaultValue: { summary: '2' } },
    },
    dateFormat: {
      control: 'select',
      options: ['yyyy.MM.dd', 'yyyy-MM-dd', 'yyyy/MM/dd', 'MM/dd/yyyy', 'dd/MM/yyyy'],
      description: '날짜 포맷',
      table: { type: { summary: 'DateFormat' }, defaultValue: { summary: 'yyyy.MM.dd' } },
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
        type: { summary: 'string | number', detail: '예: 320, "100%", "20rem"' },
      },
    },
    captionLayout: {
      control: 'select',
      options: ['month-centered', 'month-left', 'label', 'dropdown', 'dropdown-months', 'dropdown-years'],
      description: '캘린더 캡션 레이아웃',
      table: {
        type: {
          summary: 'CaptionLayout',
          detail: "'month-centered' | 'month-left' | 'label' | 'dropdown' | 'dropdown-months' | 'dropdown-years'",
        },
        defaultValue: { summary: 'month-centered' },
      },
    },
    locale: {
      control: 'select',
      options: ['ko', 'en', 'ja', 'zh'],
      description: '로케일',
      table: {
        type: { summary: 'string', detail: "'ko' | 'en' | 'ja' | 'zh'" },
        defaultValue: { summary: 'ko' },
      },
    },
    showActions: {
      control: 'boolean',
      description: '확인/취소 버튼 표시 여부',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    open: {
      control: 'boolean',
      description: '제어 모드 팝오버 오픈 상태. `onOpenChange`와 함께 사용해야 합니다',
      table: { type: { summary: 'boolean' } },
    },
    onOpenChange: {
      action: 'openChange',
      description: '팝오버 오픈 상태 변경 콜백. 모든 닫기 경로에서 호출됩니다',
      table: { type: { summary: '(open: boolean) => void' } },
    },
    trigger: {
      control: false,
      description: '소비자가 제공하는 트리거 엘리먼트. 전달 시 DS는 자체 입력 필드 + InputWrapper를 렌더링하지 않습니다',
      table: { type: { summary: 'ReactElement' } },
    },
    defaultMonth: {
      control: false,
      description: '캘린더 팝오버가 처음 열릴 때 포커스할 월. `value.from`이 있으면 그것이 우선합니다',
      table: { type: { summary: 'Date' } },
    },
    confirmLabel: {
      control: 'text',
      description: '확인 버튼 라벨',
      table: { type: { summary: 'string' }, defaultValue: { summary: '확인' } },
    },
    cancelLabel: {
      control: 'text',
      description: '취소 버튼 라벨',
      table: { type: { summary: 'string' }, defaultValue: { summary: '취소' } },
    },
    triggerVariant: {
      control: 'select',
      options: ['default', 'compact'],
      description: '트리거 변형 (compact: 좁은 컨테이너용 텍스트 표시)',
      table: {
        type: { summary: 'DatePickerTriggerVariant', detail: "'default' | 'compact'" },
        defaultValue: { summary: 'default' },
      },
    },
    presets: {
      control: false,
      description: '커스텀 빠른 프리셋 목록 (showQuickPresets와 함께 사용)',
      table: {
        type: {
          summary: 'QuickPreset[]',
          detail: `{ label: string; getValue: () => DateRange }[]`,
        },
        defaultValue: {
          summary: '7개 프리셋',
          detail: `[
  { label: '오늘', getValue: () => ({ from: startOfDay(new Date()), to: endOfDay(new Date()) }) },
  { label: '어제', getValue: () => ({ from: startOfDay(addDays(new Date(), -1)), to: endOfDay(addDays(new Date(), -1)) }) },
  { label: '최근 7일', getValue: () => ({ from: addDays(new Date(), -6), to: new Date() }) },
  { label: '최근 30일', getValue: () => ({ from: addDays(new Date(), -29), to: new Date() }) },
  { label: '최근 3개월', getValue: () => ({ from: addMonths(new Date(), -3), to: new Date() }) },
  { label: '최근 6개월', getValue: () => ({ from: addMonths(new Date(), -6), to: new Date() }) },
  { label: '최근 1년', getValue: () => ({ from: addMonths(new Date(), -12), to: new Date() }) },
]`,
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<StoryProps>;

/**
 * 기본 날짜 범위 선택기
 *
 * Controls를 사용하여 다양한 옵션을 테스트할 수 있습니다.
 */
export const Default: Story = {
  args: {
    label: '날짜 범위',
    labelPosition: 'top',
    labelWidth: undefined,
    datePickerStyle: 'default',
    size: 'sm',
    showQuickPresets: false,
    showActions: false,
    numberOfMonths: 2,
    dateFormat: 'yyyy.MM.dd',
    locale: 'ko',
    captionLayout: 'month-centered',
    triggerVariant: 'default',
    width: 300,
    required: false,
    supportText: '',
    caption: '',
    error: '',
    success: '',
    disabled: false,
    hideCalendarIcon: false,
    align: 'start',
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const [range, setRange] = useState<DateRange | undefined>();
    const locale = LOCALE_MAP[args.locale] || ko;
    return (
      <DateRangePicker
        label={args.label}
        labelPosition={args.labelPosition}
        labelWidth={args.labelWidth}
        datePickerStyle={args.datePickerStyle}
        size={args.size}
        showQuickPresets={args.showQuickPresets}
        showActions={args.showActions}
        confirmLabel={args.confirmLabel || undefined}
        cancelLabel={args.cancelLabel || undefined}
        numberOfMonths={args.numberOfMonths}
        dateFormat={args.dateFormat}
        required={args.required}
        supportText={args.supportText}
        caption={args.caption}
        error={args.error}
        success={args.success}
        disabled={args.disabled}
        hideCalendarIcon={args.hideCalendarIcon}
        align={args.align}
        locale={locale}
        captionLayout={args.captionLayout}
        triggerVariant={args.triggerVariant}
        width={args.width}
        value={range}
        onChange={setRange}
      />
    );
  },
};

/**
 * 빠른 프리셋
 */
export const WithQuickPresets: Story = {
  render: function Render() {
    const [range, setRange] = useState<DateRange | undefined>();
    return (
      <div style={{ width: 320 }}>
        <DateRangePicker
          label="날짜 범위"
          showQuickPresets
          value={range}
          onChange={setRange}
        />
      </div>
    );
  },
};

/**
 * 단일 월 표시
 */
export const SingleMonth: Story = {
  render: function Render() {
    const [range, setRange] = useState<DateRange | undefined>();
    return (
      <div style={{ width: 320 }}>
        <DateRangePicker
          label="날짜 범위"
          numberOfMonths={1}
          value={range}
          onChange={setRange}
        />
      </div>
    );
  },
};

/**
 * 두 달 표시 (기본값)
 */
export const TwoMonths: Story = {
  render: function Render() {
    const [range, setRange] = useState<DateRange | undefined>();
    return (
      <div style={{ width: 320 }}>
        <DateRangePicker
          label="날짜 범위"
          numberOfMonths={2}
          value={range}
          onChange={setRange}
        />
      </div>
    );
  },
};

/**
 * 커스텀 프리셋
 */
export const WithCustomPresets: Story = {
  render: function Render() {
    const [range, setRange] = useState<DateRange | undefined>();

    const customPresets: QuickPreset[] = [
      {
        label: '이번 주',
        getValue: () => ({
          from: startOfWeek(new Date(), { weekStartsOn: 1 }),
          to: endOfWeek(new Date(), { weekStartsOn: 1 }),
        }),
      },
      {
        label: '이번 달',
        getValue: () => ({
          from: startOfMonth(new Date()),
          to: endOfMonth(new Date()),
        }),
      },
      {
        label: '다음 달',
        getValue: () => ({
          from: startOfMonth(addMonths(new Date(), 1)),
          to: endOfMonth(addMonths(new Date(), 1)),
        }),
      },
      {
        label: '다음 90일',
        getValue: () => ({
          from: new Date(),
          to: addDays(new Date(), 90),
        }),
      },
    ];

    return (
      <div style={{ width: 320 }}>
        <DateRangePicker
          label="날짜 범위"
          showQuickPresets
          presets={customPresets}
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
        <DateRangePicker
          label="날짜 범위"
          disabled
          value={{ from: new Date(), to: addDays(new Date(), 7) }}
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
    const [range, setRange] = useState<DateRange | undefined>();
    return (
      <div style={{ width: 320 }}>
        <DateRangePicker
          label="날짜 범위"
          error="날짜 범위를 선택해주세요"
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
        <DateRangePicker
          label="날짜 범위"
          success="날짜 범위가 선택되었습니다"
          value={{ from: new Date(), to: addDays(new Date(), 7) }}
        />
      </div>
    );
  },
};

/**
 * 최소/최대 날짜 제한
 */
export const WithMinMaxDates: Story = {
  render: function Render() {
    const [range, setRange] = useState<DateRange | undefined>();
    return (
      <div style={{ width: 320 }}>
        <DateRangePicker
          label="날짜 범위"
          caption="오늘부터 60일 이내만 선택 가능"
          minDate={new Date()}
          maxDate={addDays(new Date(), 60)}
          value={range}
          onChange={setRange}
        />
      </div>
    );
  },
};

/**
 * 한국어 로케일
 */
export const KoreanLocale: Story = {
  render: function Render() {
    const [range, setRange] = useState<DateRange | undefined>();
    return (
      <div style={{ width: 320 }}>
        <DateRangePicker
          label="날짜 범위"
          locale={ko}
          showQuickPresets
          value={range}
          onChange={setRange}
        />
      </div>
    );
  },
};

/**
 * 확인/취소 버튼
 *
 * `showActions`를 사용하면 날짜 범위 선택 후 확인/취소 버튼으로 적용 여부를 결정할 수 있습니다.
 */
export const WithActions: Story = {
  render: function Render() {
    const [range, setRange] = useState<DateRange | undefined>();
    return (
      <div style={{ width: 320 }}>
        <DateRangePicker
          label="날짜 범위"
          showActions
          value={range}
          onChange={setRange}
        />
        <div className="font-body size-sm text-muted margin-t-16">
          시작: {range?.from?.toLocaleDateString() ?? '없음'}<br />
          종료: {range?.to?.toLocaleDateString() ?? '없음'}
        </div>
      </div>
    );
  },
};

/**
 * 확인/취소 + 빠른 프리셋
 */
export const WithActionsAndPresets: Story = {
  render: function Render() {
    const [range, setRange] = useState<DateRange | undefined>();
    return (
      <div style={{ width: 320 }}>
        <DateRangePicker
          label="날짜 범위"
          showActions
          showQuickPresets
          value={range}
          onChange={setRange}
        />
      </div>
    );
  },
};

/**
 * Compact 트리거
 *
 * `triggerVariant="compact"`를 사용하면 좁은 컨테이너에서 날짜 범위를 텍스트로 표시합니다.
 * 공간이 부족하면 텍스트가 말줄임(...)으로 처리됩니다.
 */
export const Compact: Story = {
  render: function Render() {
    const [range, setRange] = useState<DateRange | undefined>({
      from: new Date(),
      to: addDays(new Date(), 7),
    });
    return (
      <div style={{ width: 200 }}>
        <DateRangePicker
          label="기간"
          triggerVariant="compact"
          value={range}
          onChange={setRange}
        />
      </div>
    );
  },
};

/**
 * Compact + Select 조합
 *
 * 좁은 사이드바에서 Select와 DateRangePicker를 함께 사용하는 예시입니다.
 */
export const CompactWithSelect: Story = {
  render: function Render() {
    const [range, setRange] = useState<DateRange | undefined>({
      from: new Date(),
      to: addDays(new Date(), 7),
    });
    return (
      <div style={{ width: 300, display: 'flex', gap: 8, alignItems: 'flex-end' }}>
        <div style={{ width: 90, flexShrink: 0 }}>
          <select
            className="w-full height-32 padding-x-8 border-darker rounded-sm bg-input font-body size-sm"
          >
            <option>전체</option>
            <option>상담</option>
            <option>문의</option>
          </select>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <DateRangePicker
            triggerVariant="compact"
            size="sm"
            dateFormat="yyyy-MM-dd"
            value={range}
            onChange={setRange}
          />
        </div>
      </div>
    );
  },
};

/**
 * 제어 컴포넌트
 */
export const Controlled: Story = {
  render: function Render() {
    const [range, setRange] = useState<DateRange | undefined>({
      from: new Date(),
      to: addDays(new Date(), 7),
    });
    return (
      <div className="flex flex-col ds-gap-16" style={{ width: 320 }}>
        <DateRangePicker
          label="날짜 범위 (제어)"
          value={range}
          onChange={setRange}
        />
        <div className="font-body size-sm text-muted">
          시작: {range?.from?.toLocaleDateString() ?? '없음'}<br />
          종료: {range?.to?.toLocaleDateString() ?? '없음'}
        </div>
        <button
          type="button"
          onClick={() => setRange({ from: new Date(), to: addDays(new Date(), 7) })}
          className="padding-x-12 padding-y-6 bg-primary text-primary-foreground rounded-md size-sm"
        >
          오늘부터 7일로 설정
        </button>
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
    const [range, setRange] = useState<DateRange | undefined>();
    return (
      <div style={{ width: 350 }}>
        <DateRangePicker
          label="기간 선택 (Picker Only)"
          value={range}
          onChange={setRange}
          pickerOnly
        />
      </div>
    );
  },
};

/**
 * 외부 트리거 + 제어 오픈 상태
 *
 * 소비자가 자체 트리거(Button)를 제공하고 팝오버 오픈 상태를 외부에서 제어합니다.
 * `FlowDatePicker` 마이그레이션의 주된 사용 패턴입니다.
 */
export const ExternalTrigger: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);
    const [range, setRange] = useState<DateRange | undefined>({
      from: new Date(),
      to: addDays(new Date(), 6),
    });
    const fmt = (d: Date | undefined) => (d ? d.toLocaleDateString('ko-KR') : '—');
    return (
      <div className="flex flex-col ds-gap-16" style={{ width: 360 }}>
        <DateRangePicker
          open={open}
          onOpenChange={setOpen}
          value={range}
          onChange={setRange}
          trigger={
            <Button buttonStyle="secondary">
              {fmt(range?.from)} ~ {fmt(range?.to)}
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
 * `trigger` + `showActions` 조합. "적용" 클릭 시에만 onChange가 발생하여
 * GraphQL refetch 등이 한 번만 트리거됩니다.
 */
export const ExternalTriggerWithActions: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);
    const [range, setRange] = useState<DateRange | undefined>({
      from: new Date(),
      to: addDays(new Date(), 6),
    });
    const [changeCount, setChangeCount] = useState(0);
    const fmt = (d: Date | undefined) => (d ? d.toLocaleDateString('ko-KR') : '—');
    return (
      <div className="flex flex-col ds-gap-16" style={{ width: 360 }}>
        <DateRangePicker
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
              {fmt(range?.from)} ~ {fmt(range?.to)}
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
 * defaultMonth — 초기 포커스 월 제어 (과거 조회 필터 UX)
 *
 * `maxDate={today}`로 미래 날짜를 막은 검색 필터에서 `defaultMonth={startOfMonth(subMonths(today, 1))}`를
 * 전달하면 2패널 중 오른쪽 패널이 현재월이 되어 두 패널 모두 액션 가능합니다.
 * `defaultMonth` 미지정 시 기존 동작(현재월/다음월) 유지.
 */
export const DefaultMonthForPastFilter: Story = {
  render: function Render() {
    const today = new Date();
    const [range, setRange] = useState<DateRange | undefined>();
    return (
      <div style={{ width: 350 }}>
        <DateRangePicker
          label="조회 기간 (지난달 기준으로 열림)"
          value={range}
          onChange={setRange}
          maxDate={today}
          defaultMonth={startOfMonth(subMonths(today, 1))}
        />
      </div>
    );
  },
};

/**
 * minDate/maxDate — typed input 경계 검증 (각 side 독립 판정)
 *
 * from/to 각각에 대해 경계 밖 값을 타이핑하면 error 상태로 표시되고 `onChange`가 호출되지 않습니다.
 * 포커스가 완전 이탈하면 양 side 모두 이전 유효값으로 복구됩니다.
 *
 * 시나리오:
 * - to 에 미래 날짜 타이핑 → error + onChange 호출 안 됨
 * - from 만 완성 + 30일 이전 날짜 → to 완성 전에도 이미 error
 * - 양쪽 모두 경계 내 → 정상 통과
 */
export const MinMaxTypedInputValidation: Story = {
  render: function Render() {
    const today = new Date();
    const [range, setRange] = useState<DateRange | undefined>();
    return (
      <div style={{ width: 380 }}>
        <DateRangePicker
          label="조회 기간"
          caption="최근 30일 이내만 허용. 미래/과거 날짜 타이핑은 거부됩니다."
          minDate={addDays(today, -30)}
          maxDate={today}
          value={range}
          onChange={setRange}
        />
      </div>
    );
  },
};
