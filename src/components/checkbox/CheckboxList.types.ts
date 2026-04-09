import type { CheckboxStyle } from './Checkbox.types';

/**
 * CheckboxList 스타일
 */
export type CheckboxListStyle = 'default' | 'bordered';

/**
 * CheckboxList 아이템
 */
export interface CheckboxListItem {
  /**
   * 아이템 고유 ID
   */
  id: string;
  /**
   * 체크박스 제목
   */
  title: string;
  /**
   * 체크박스 설명 (선택)
   */
  description?: string;
  /**
   * 체크 상태
   */
  checked?: boolean | 'indeterminate';
  /**
   * 비활성화 상태
   */
  disabled?: boolean;
  /**
   * 폼 필드 값
   */
  value?: string;
}

/**
 * CheckboxList Props
 */
export interface CheckboxListProps {
  /**
   * 체크박스 아이템 목록
   */
  items: CheckboxListItem[];
  /**
   * 리스트 스타일
   * @default 'default'
   */
  listStyle?: CheckboxListStyle;
  /**
   * 체크박스 스타일
   * @default 'with-shadow'
   */
  checkboxStyle?: CheckboxStyle;
  /**
   * 폼 필드 이름 (모든 체크박스에 적용)
   */
  name?: string;
  /**
   * 아이템 체크 상태 변경 핸들러
   */
  onItemChange?: (id: string, checked: boolean) => void;
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
