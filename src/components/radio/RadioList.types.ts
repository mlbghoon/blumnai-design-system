import type { RadioSize, RadioStyle } from './Radio.types';

/**
 * RadioList 스타일
 */
export type RadioListStyle = 'default' | 'bordered';

/**
 * RadioList 아이템
 */
export interface RadioListItem {
  /**
   * 아이템 value (RadioGroup 내에서 고유해야 함)
   */
  value: string;
  /**
   * 라디오 제목
   */
  title: string;
  /**
   * 라디오 설명 (선택)
   */
  description?: string;
  /**
   * 비활성화 상태
   */
  disabled?: boolean;
}

/**
 * RadioList Props
 */
export interface RadioListProps {
  /**
   * 라디오 아이템 목록
   */
  items: RadioListItem[];
  /**
   * 현재 선택된 값 (제어 모드)
   */
  value?: string;
  /**
   * 초기 선택 값 (비제어 모드)
   */
  defaultValue?: string;
  /**
   * 값 변경 핸들러
   */
  onValueChange?: (value: string) => void;
  /**
   * 리스트 스타일
   * @default 'default'
   */
  listStyle?: RadioListStyle;
  /**
   * 라디오 크기
   * @default 'sm'
   */
  size?: RadioSize;
  /**
   * 라디오 버튼 스타일
   * @default 'with-shadow'
   */
  radioStyle?: RadioStyle;
  /**
   * 전체 비활성화 여부
   * @default false
   */
  disabled?: boolean;
  /**
   * 에러 상태 - true면 에러 스타일 적용, 문자열이면 캡션으로 에러 메시지 표시
   */
  error?: boolean | string;
  /**
   * 성공 상태 - true면 성공 스타일 적용, 문자열이면 캡션으로 성공 메시지 표시
   */
  success?: boolean | string;
  /**
   * 리스트 아래에 표시되는 설명 텍스트
   */
  caption?: string;
  /**
   * 추가 클래스명
   */
  className?: string;
}
