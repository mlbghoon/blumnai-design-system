import type { Locale } from 'date-fns';

export type EventCalendarSize = 'compact' | 'default' | 'large';

export interface DayContext {
  isOutsideMonth: boolean;
  isToday: boolean;
  isWeekend: boolean;
  isDisabled: boolean;
}

export interface EventCalendarProps {
  /** 표시할 월 (controlled, 미지정 시 내부 상태 사용) */
  month?: Date;
  /** 월 변경 콜백 */
  onMonthChange?: (date: Date) => void;
  /** 날짜 클릭 콜백 */
  onDateClick?: (date: Date) => void;
  /** 커스텀 셀 콘텐츠 렌더링 */
  renderDayContent?: (date: Date, context: DayContext) => React.ReactNode;
  /** 날짜별 셀 className 콜백 */
  dayCellClassName?: (date: Date, context: DayContext) => string | undefined;
  /** 헤더 오른쪽 영역 커스텀 콘텐츠 */
  headerActions?: React.ReactNode;
  /** 셀 높이 (px), size 프리셋보다 우선 */
  cellHeight?: number;
  /** 크기 프리셋 */
  size?: EventCalendarSize;
  /** 로케일 (default: ko) */
  locale?: Locale;
  /** 주 시작 요일 (0=일, 1=월, default: 0) */
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /** 비활성 날짜 판별 콜백 */
  disabledDate?: (date: Date) => boolean;
  /** 월 라벨 포맷 함수 (default: 'yyyy년 MM월') */
  formatMonthLabel?: (date: Date, locale: Locale) => string;
  /** 추가 className */
  className?: string;
}
