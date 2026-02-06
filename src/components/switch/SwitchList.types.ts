import type { SwitchColor } from './Switch.types';

/**
 * SwitchList 스타일
 */
export type SwitchListStyle = 'default' | 'bordered';

/**
 * SwitchList 아이템
 */
export interface SwitchListItem {
  /**
   * 아이템 고유 ID
   */
  id: string;
  /**
   * 스위치 제목
   */
  title: string;
  /**
   * 스위치 설명 (선택)
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
 * SwitchList Props
 */
export interface SwitchListProps {
  /**
   * 스위치 아이템 목록
   */
  items: SwitchListItem[];
  /**
   * 리스트 스타일
   * @default 'default'
   */
  listStyle?: SwitchListStyle;
  /**
   * 스위치 색상
   * @default 'green'
   */
  color?: SwitchColor;
  /**
   * 아이템 체크 상태 변경 핸들러
   */
  onItemChange?: (id: string, checked: boolean) => void;
  /**
   * 추가 클래스명
   */
  className?: string;
}
