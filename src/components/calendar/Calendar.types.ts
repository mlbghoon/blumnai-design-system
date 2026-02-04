import type {
  PropsBase,
  PropsSingle,
  PropsMulti,
  PropsRange,
  PropsSingleRequired,
  PropsMultiRequired,
  PropsRangeRequired,
} from 'react-day-picker';

/**
 * 캘린더 스타일 변형
 */
export type CalendarStyle = 'default' | 'bordered';

/**
 * 캘린더 캡션 레이아웃
 */
export type CaptionLayout =
  | 'month-centered'
  | 'month-left'
  | 'label'
  | 'dropdown'
  | 'dropdown-months'
  | 'dropdown-years';

/**
 * 캘린더 컴포넌트 기본 Props (captionLayout 제외)
 */
type CalendarPropsBase = Omit<PropsBase, 'captionLayout'> & {
  /**
   * 캘린더 스타일
   * @default 'bordered'
   */
  calendarStyle?: CalendarStyle;
  /**
   * 월/년 헤더 표시 방식
   * @default 'month-centered'
   */
  captionLayout?: CaptionLayout;
};

/**
 * 캘린더 컴포넌트 Props (모든 선택 모드 지원)
 */
export type CalendarProps = CalendarPropsBase &
  (
    | PropsSingle
    | PropsSingleRequired
    | PropsMulti
    | PropsMultiRequired
    | PropsRange
    | PropsRangeRequired
    | { mode?: undefined; required?: undefined }
  );
