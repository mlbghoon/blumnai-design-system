import type { HTMLAttributes, ReactNode } from 'react';

import type { AccordionItemStyle } from '../AccordionItem/AccordionItem.types';

/**
 * AccordionGroup 아이템 데이터
 */
export interface AccordionGroupItem {
  /** 고유 식별자 (가능하면 제공하여 안정적인 key/상태 유지) */
  id?: string;
  /** 헤더 내용 (질문) */
  header: ReactNode;
  /** 열렸을 때 표시될 내용 (답변) */
  children: ReactNode;
  /** 아코디언 아이템의 스타일 variant */
  style?: AccordionItemStyle;
  /** 아코디언 아이템이 열려있는지 여부 */
  isOpen?: boolean;
  /** 아코디언 아이템이 비활성화되어 있는지 여부 */
  disabled?: boolean;
  /** 아이템별 토글 콜백 */
  onToggle?: () => void;
  /** 추가 CSS 클래스 이름 */
  className?: string;
}

/**
 * AccordionGroup props
 */
export interface AccordionGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'style'> {
  /** AccordionItem 데이터 배열 */
  items: AccordionGroupItem[];
  /** 아이템 간 간격 (px) */
  spacing?: number;
  /** 모든 아이템에 적용할 스타일 variant (개별 아이템에 style이 없을 때 사용) */
  style?: AccordionItemStyle;
  /** 
   * 여러 아이템을 동시에 열 수 있는지 여부
   * - true: 여러 아이템을 독립적으로 동시에 열 수 있음 (각 아이템을 개별적으로 열고 닫을 수 있음)
   * - false: 한 번에 하나의 아이템만 열 수 있음 (새 아이템을 열면 이전 아이템이 닫힘)
   */
  allowMultipleOpen?: boolean;
  /** 추가 CSS 클래스 이름 */
  className?: string;
}
