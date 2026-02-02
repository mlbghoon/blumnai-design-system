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
  checked?: boolean;
  /**
   * 비활성화 상태
   */
  disabled?: boolean;
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
   * 아이템 체크 상태 변경 핸들러
   */
  onItemChange?: (id: string, checked: boolean) => void;
  /**
   * 추가 클래스명
   */
  className?: string;
}
